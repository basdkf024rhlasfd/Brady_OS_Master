import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { auth } from "@clerk/nextjs/server";
import {
  buildUnifiedSystemPrompt,
  getChatConfig,
  type ProjectContext,
} from "@/lib/chat/global-chat-engine";
import { getPortalAccess } from "@/lib/portal-access";
import { captureChatAnswer } from "@/lib/analytics/posthog-server";
import { resolveTools } from "@/lib/chat/tools";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

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

  // Server-side auth — don't trust client-sent project list, tier, or admin flag
  const access = await getPortalAccess();
  projectContext.tier = access.tier;
  projectContext.isAdmin = access.isAdmin;

  // Preview tier: chat is suppressed on slugs whose configs reference internal
  // engagement context (agent personas, named clients, KB routing on names).
  // The page is sanitized but the chat config is not — fail closed.
  const PREVIEW_CHAT_BLOCKED: ReadonlySet<string> = new Set(["panda"]);
  if (access.tier === "preview" && PREVIEW_CHAT_BLOCKED.has(projectContext.project)) {
    return new Response(
      JSON.stringify({
        error: "Chat unavailable on this page. Try the Agent Ecosystem overview for context.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // Group-scope enforcement: when the active project is a group id, restrict
  // authorized projects to the intersection of (user's access) ∩ (group members).
  // This prevents the chat from leaking cross-group context (e.g., the
  // panda-engagement chat surfacing Schmulen or Fran research).
  const groupMembers = SIDEBAR_GROUPS.find((g) => g.id === projectContext.project)?.slugs;
  projectContext.authorizedProjects = groupMembers
    ? access.projects.filter((p) => groupMembers.includes(p))
    : access.projects;

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

  // Tier-gated tool resolution — the model literally cannot call tools the
  // user's tier doesn't permit (filtered server-side, not in the prompt).
  const tools = resolveTools(activeConfig.tools ?? [], access.tier);
  const hasTools = Object.keys(tools).length > 0;

  // Audit log context — captured at request start, finalized in onFinish below
  const startMs = Date.now();
  const userEmail = access.emailAddresses[0] ?? "unknown";
  const isGroupRequest = !!groupMembers;

  // Clerk user id for capture distinct_id (SPEC-008). Wrapped defensively: in
  // the dev-bypass path (no Clerk middleware) auth() can throw — fall back to
  // email so capture, when enabled, still attributes the turn.
  let clerkUserId: string | null = null;
  try {
    clerkUserId = (await auth()).userId;
  } catch {
    clerkUserId = null;
  }
  const captureDistinctId = clerkUserId ?? userEmail;

  // Direct anthropic provider — AI Gateway swap reverted because the prod
  // Vercel project doesn't have OIDC enabled and AI_GATEWAY_API_KEY isn't
  // set. Future Phase 4.1: enable Gateway in Vercel project settings + set
  // AI_GATEWAY_API_KEY for local dev, then swap to `anthropic/${model}` to
  // get failover + per-call cost tracking.
  const result = streamText({
    model: anthropic(model),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: activeConfig.maxOutputTokens,
    tools: hasTools ? tools : undefined,
    stopWhen: hasTools ? stepCountIs(3) : undefined,
    onFinish: async ({ text, usage, finishReason }) => {
      // Phase 4 audit log — structured JSON one-line per turn, queryable in
      // Vercel Logs UI by grep "[AUDIT]".
      const auditEntry = {
        ts: new Date().toISOString(),
        userEmail,
        tier: access.tier,
        project: projectContext.project,
        isGroup: isGroupRequest,
        scopeProjects: projectContext.authorizedProjects?.length ?? 0,
        agent: activeConfig.agent ?? null,
        model,
        tokensIn: usage?.inputTokens ?? 0,
        tokensOut: usage?.outputTokens ?? 0,
        cachedTokens: usage?.cachedInputTokens ?? 0,
        reasoningTokens: usage?.reasoningTokens ?? 0,
        durationMs: Date.now() - startMs,
        finishReason,
        toolsAvailable: Object.keys(tools),
      };
      console.log(`[AUDIT] ${JSON.stringify(auditEntry)}`);

      // SPEC-008 durable capture — persist the actual Q&A turn to PostHog so the
      // self-improving loop can see unanswered questions. No-op unless the
      // server POSTHOG_KEY env is present; best-effort so it never breaks the
      // response.
      try {
        await captureChatAnswer({
          project: projectContext.project,
          userEmail,
          distinctId: captureDistinctId,
          question: queryText,
          answer: text,
          tokensIn: usage?.inputTokens ?? 0,
          tokensOut: usage?.outputTokens ?? 0,
          finishReason,
        });
      } catch (err) {
        console.error("[CAPTURE] chat_answer failed", err);
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
