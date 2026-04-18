import { readFileSync } from "fs";
import { join } from "path";
import { getChatConfig, type ChatConfig } from "./chat-config";
import { loadKBFiles } from "./kb-loader";

// ─── Project prompt loading (file-based, cached) ───

const promptCache = new Map<string, string>();
const PROMPTS_DIR = join(process.cwd(), "src/lib/chat/project-prompts");

function loadProjectPrompt(filename: string): string {
  if (promptCache.has(filename)) return promptCache.get(filename)!;
  try {
    const content = readFileSync(join(PROMPTS_DIR, filename), "utf-8").trim();
    promptCache.set(filename, content);
    return content;
  } catch {
    if (filename !== "portal.md") return loadProjectPrompt("portal.md");
    const fallback = "You are a helpful assistant for the mception.ai portal. Be concise and friendly.";
    promptCache.set(filename, fallback);
    return fallback;
  }
}

// ─── System prompt builder ───

export interface ProjectContext {
  project: string;
  route: string;
  configState: Record<string, unknown>;
  isAdmin: boolean;
  mode?: "client" | "operator";
}

export function buildSystemPrompt(
  config: ChatConfig,
  projectContext: ProjectContext,
  userMessage?: string
): string {
  let systemPrompt = loadProjectPrompt(config.prompt);

  // KB injection — config-driven, works for any project
  if (config.kb?.enabled && userMessage) {
    const kbContent = loadKBFiles(userMessage, config.kb);
    if (kbContent) {
      systemPrompt += "\n\n" + kbContent;
    }
  }

  // Inject user config state if enabled
  if (config.configAware) {
    const configEntries = Object.entries(projectContext.configState).filter(
      ([, v]) => v !== null && v !== undefined && v !== ""
    );
    if (configEntries.length > 0) {
      const configStr = configEntries
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      systemPrompt += `\n\nUser's current configuration: ${configStr}`;
    }
  }

  // Admin context
  if (projectContext.isAdmin) {
    systemPrompt +=
      "\n\nThis user is an admin/platform owner. You can be more technical and detailed in your responses.";
  }

  // Operator mode: append cross-project operational context
  if (
    config.operatorMode &&
    projectContext.mode === "operator" &&
    projectContext.isAdmin
  ) {
    const operatorPrompt = loadProjectPrompt("operator.md");
    systemPrompt += "\n\n--- Operator Context ---\n" + operatorPrompt;
  }

  return systemPrompt;
}

/** Re-export for convenience */
export { getChatConfig };
