import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  buildUnifiedSystemPrompt,
  getChatConfig,
  type ProjectContext,
} from "@/lib/chat/global-chat-engine";
import { getPortalAccess } from "@/lib/portal-access";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, projectContext } = (await req.json()) as {
    messages: UIMessage[];
    projectContext?: ProjectContext;
  };

  if (!projectContext?.project) {
    return new Response(JSON.stringify({ error: "projectContext.project required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Server-side auth — don't trust client-sent project list
  const access = await getPortalAccess();
  projectContext.authorizedProjects = access.projects;

  // Use active project's model config, fallback to portal
  const activeConfig = getChatConfig(projectContext.project);
  const model = activeConfig.enabled ? activeConfig.model : getChatConfig("portal").model;

  // Extract last user message text for KB routing
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");
  const queryText =
    lastUserMessage?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? "";

  // Gather recent prior user messages for conversation-aware KB routing
  const recentUserMessages = messages
    .filter((m: UIMessage) => m.role === "user")
    .slice(-5)
    .slice(0, -1)
    .map((m: UIMessage) =>
      m.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(" ") ?? ""
    )
    .filter(Boolean);

  const conversationContext = recentUserMessages.length > 0
    ? recentUserMessages.join(" ")
    : undefined;

  const systemPrompt = buildUnifiedSystemPrompt(projectContext, queryText, conversationContext);

  const result = streamText({
    model: anthropic(model),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: activeConfig.maxOutputTokens,
  });

  return result.toUIMessageStreamResponse();
}
