import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic();

// ============ PROJECT PROMPTS (file-based) ============
const promptCache = new Map<string, string>();
const PROMPTS_DIR = join(process.cwd(), "src/lib/chat/project-prompts");

function loadProjectPrompt(scope: string): string {
  if (promptCache.has(scope)) return promptCache.get(scope)!;
  try {
    const content = readFileSync(join(PROMPTS_DIR, `${scope}.md`), "utf-8").trim();
    promptCache.set(scope, content);
    return content;
  } catch {
    // Fall back to portal prompt
    if (scope !== "portal") return loadProjectPrompt("portal");
    const fallback = "You are a helpful assistant for the mception.ai portal. Be concise and friendly.";
    promptCache.set(scope, fallback);
    return fallback;
  }
}

// ============ SESSION MANAGEMENT ============
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GlobalChatSession {
  sessionId: string;
  project: string;
  messages: ChatMessage[];
  runningSummary?: string;
}

const sessions = new Map<string, GlobalChatSession>();

const RECENT_WINDOW = 4; // Keep last 2 exchanges verbatim
const SUMMARIZE_THRESHOLD = 6; // Start summarizing after 3 exchanges

function getOrCreateSession(
  sessionId: string,
  project: string
): GlobalChatSession {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      sessionId,
      project,
      messages: [],
    });
  }
  return sessions.get(sessionId)!;
}

// ============ SUMMARIZATION ============
async function updateRunningSummary(
  currentSummary: string | undefined,
  userMsg: string,
  assistantMsg: string
): Promise<string> {
  const prompt = currentSummary
    ? `Current summary: ${currentSummary}\n\nNew exchange:\nUser: ${userMsg}\nAssistant: ${assistantMsg}\n\nUpdate the summary. One paragraph, under 100 words. Facts only.`
    : `Summarize this exchange:\nUser: ${userMsg}\nAssistant: ${assistantMsg}\n\nOne paragraph, under 60 words. Facts only.`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content.find((b) => b.type === "text");
  return text && text.type === "text"
    ? text.text.trim()
    : currentSummary || "";
}

function buildMessages(
  allMessages: ChatMessage[],
  runningSummary?: string
): ChatMessage[] {
  if (allMessages.length <= SUMMARIZE_THRESHOLD) {
    return allMessages.map((m) => ({ role: m.role, content: m.content }));
  }

  const recentMessages = allMessages.slice(-RECENT_WINDOW);
  const result: ChatMessage[] = [];

  if (runningSummary) {
    result.push({
      role: "user",
      content: `[Previous conversation: ${runningSummary}]`,
    });
    result.push({
      role: "assistant",
      content: "Understood, I have the context from our earlier conversation.",
    });
  }

  result.push(
    ...recentMessages.map((m) => ({ role: m.role, content: m.content }))
  );
  return result;
}

// ============ MAIN PROCESSING ============
export interface ProjectContext {
  project: string;
  route: string;
  configState: Record<string, unknown>;
  isAdmin: boolean;
  mode?: "client" | "operator";
}

export async function processGlobalChat(
  sessionId: string,
  userMessage: string,
  projectContext: ProjectContext
): Promise<{ response: string }> {
  const session = getOrCreateSession(sessionId, projectContext.project);

  // Add user message
  session.messages.push({ role: "user", content: userMessage });

  // Build system prompt from project context
  const basePrompt = loadProjectPrompt(projectContext.project);

  let systemPrompt = basePrompt;

  // KB injection for Orlando
  if (projectContext.project === "orlando") {
    const kbEnabled = projectContext.configState.kbEnabled !== false;
    if (kbEnabled) {
      const { loadKBFiles } = await import("./kb-loader");
      const kbContent = loadKBFiles(userMessage);
      if (kbContent) {
        systemPrompt += "\n\n" + kbContent;
      }
    }
  }

  // Include config state if present
  const configEntries = Object.entries(projectContext.configState).filter(
    ([, v]) => v !== null && v !== undefined && v !== ""
  );
  if (configEntries.length > 0) {
    const configStr = configEntries
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    systemPrompt += `\n\nUser's current configuration: ${configStr}`;
  }

  if (projectContext.isAdmin) {
    systemPrompt +=
      "\n\nThis user is an admin/platform owner. You can be more technical and detailed in your responses.";
  }

  // Operator mode: append cross-project operational context
  if (projectContext.mode === "operator" && projectContext.isAdmin) {
    const operatorPrompt = loadProjectPrompt("operator");
    systemPrompt += "\n\n--- Operator Context ---\n" + operatorPrompt;
  }

  // Build message history with sliding window
  const conversationHistory = buildMessages(
    session.messages,
    session.runningSummary
  );

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: conversationHistory,
    });

    const textContent = response.content.find((b) => b.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from model");
    }

    const assistantMessage = textContent.text.trim();

    // Add to history
    session.messages.push({ role: "assistant", content: assistantMessage });

    // Update running summary if conversation is long
    if (session.messages.length > SUMMARIZE_THRESHOLD) {
      const oldestInWindow = session.messages.length - RECENT_WINDOW;
      if (oldestInWindow >= 2) {
        const oldUser = session.messages[oldestInWindow - 2];
        const oldAssistant = session.messages[oldestInWindow - 1];
        if (oldUser && oldAssistant) {
          try {
            session.runningSummary = await updateRunningSummary(
              session.runningSummary,
              oldUser.content,
              oldAssistant.content
            );
          } catch (err) {
            console.error("[GLOBAL_CHAT] Summary update failed:", err);
          }
        }
      }
    }

    sessions.set(sessionId, session);

    return { response: assistantMessage };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[GLOBAL_CHAT_ERROR] ${msg}`);
    throw new Error(msg);
  }
}
