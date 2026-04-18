import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  buildSystemPrompt,
  getChatConfig,
  type ProjectContext,
} from "@/lib/chat/global-chat-engine";

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

  const config = getChatConfig(projectContext.project);

  // Extract last user message text for KB routing
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");
  const queryText =
    lastUserMessage?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? "";

  const systemPrompt = buildSystemPrompt(config, projectContext, queryText);

  const result = streamText({
    model: anthropic(config.model),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: config.maxOutputTokens,
  });

  return result.toUIMessageStreamResponse();
}
