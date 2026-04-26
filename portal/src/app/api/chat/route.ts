import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import {
  buildUnifiedSystemPrompt,
  getChatConfig,
  type ProjectContext,
} from "@/lib/chat/global-chat-engine";
import { getPortalAccess } from "@/lib/portal-access";
import { resolveTools } from "@/lib/chat/tools";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";

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

  // Server-side auth — don't trust client-sent project list, tier, or admin flag
  const access = await getPortalAccess();
  projectContext.tier = access.tier;
  projectContext.isAdmin = access.isAdmin;

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

  // Route via AI Gateway using the `provider/model` string format. In Vercel
  // production this auths via OIDC automatically; in local dev set
  // AI_GATEWAY_API_KEY (or run `vercel env pull`). Replaces the prior direct
  // `anthropic()` provider call so we get unified observability, model
  // failover, and per-call cost tracking via Gateway.
  const gatewayModel = `anthropic/${model}`;

  const result = streamText({
    model: gatewayModel,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: activeConfig.maxOutputTokens,
    tools: hasTools ? tools : undefined,
    stopWhen: hasTools ? stepCountIs(3) : undefined,
    onFinish: ({ usage, finishReason }) => {
      // Phase 4 audit log — structured JSON one-line per turn, queryable in
      // Vercel Logs UI by grep "[AUDIT]". Future upgrade: pipe to durable DB
      // for per-seat monthly budget enforcement (currently log-only).
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
    },
  });

  return result.toUIMessageStreamResponse();
}
