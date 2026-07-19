# SPEC-013 — mception Capture Layer (Phase A instrumentation)

**ID:** SPEC-013
**Slug:** mception-capture
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T1 (internal instrumentation, behind Clerk, no visibility change)
**Approval gate:** Brady approved core plan 2026-07-19 (plan file: `~/.claude/plans/system-instruction-you-are-working-declarative-bengio.md`)

---

## Problem

mception.ai is blind — it stores nothing about what visitors click or ask. The self-improving loop's entire input signal doesn't exist. Phase A wires the capture layer only (no loop, no autonomy) so we can run the week-one kill-test (SPEC-014) and find out if a gated portal even produces enough weekly signal before building anything else.

## Deliverable

1. **Chat transcript capture** at the existing insertion point `portal/src/app/api/chat/route.ts` — the `onFinish` hook already logs `[AUDIT]` metadata and is pre-commented "Future upgrade: pipe to durable DB." Extend it to persist the actual Q&A turn (user text + assistant text + project + Clerk userId + a low-confidence/"couldn't answer" flag) to a durable store. Recommended: PostHog LLM analytics via AI SDK v6 `experimental_telemetry: { isEnabled: true }` on the `streamText` call, so chat co-locates with clicks in one store joined by `distinct_id`. (Alternative durable store if PostHog LLM-analytics ingestion is not wired in time: a dedicated Notion DB.)
2. **PostHog product analytics behind Clerk** — add PostHog to `portal/`, `posthog.identify(clerkUserId)` with a `role` person-property (owner/family/friend/client) so N=1 visits are attributable. **Cookieless "always" mode on any public/preview surface; autocapture + session replay behind the Clerk gate with input masking ON** (form inputs never recorded) so family data never lands in a replay.
3. Env vars wired by Musashi Deploy Mode: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, and a PostHog personal API key in the Claude-Code runner env for agent queries. Set as **encrypted** (not sensitive) per webster Runbook 7c; register names in `portal/.env.example`, `3-reference/infrastructure-registry.yml`, and `TRANSPARENCY.md` (new autonomous-telemetry entry).

## Acceptance criteria

1. [ ] Chat turns persist durably (verify: send a test chat, confirm the transcript + userId + project land in the store)
2. [ ] PostHog identifies users by Clerk userId with a `role` person-property
3. [ ] Cookieless on public/preview surfaces; session replay input-masking confirmed ON (verify a replay shows masked form fields)
4. [ ] No family-sensitive text appears in any replay or event payload
5. [ ] Env vars set encrypted across production/preview/development; names registered in `.env.example` + infrastructure-registry + TRANSPARENCY.md
6. [ ] Mandatory UAT (webster Runbook 5): images, chatbots, permissions unaffected
7. [ ] Shipped via PR → merge (audit trail); repo-janitor CI passes

## Blocked by

- **Brady paste #1:** PostHog project key + personal API key (the only new credential in the whole program).
- **Brady paste #2 / reconcile:** Clerk keys are `sensitive`-type and only in the `rabat` worktree → re-set as encrypted or document canonical location so Musashi can deploy without Brady again.

## Notes

Owner: builder (Yuki) for code; **Musashi Deploy Mode** for env vars + deploy. This is the foundation of the whole loop but ships zero user-visible change. Research basis: PostHog = one store for clicks+chat, free tier covers ~10× the traffic, MCP for agent queries, cookieless + masked replays (plan Appendix B). Do NOT add Vercel Web Analytics — it discards visitors at 24h and can't tell family from clients.
