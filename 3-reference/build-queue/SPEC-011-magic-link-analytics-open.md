# SPEC-011 — Magic-Link Tour Open Analytics

**ID:** SPEC-011
**Slug:** magic-link-analytics
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** small
**Trust tier:** T1 (logging only; no visibility or access change)
**Approval gate:** —

---

## Problem

Magic-link tours (`portal/src/lib/magic-link.ts`, `/share/[token]`) are the portal's sales wedge — an interactive proposal instead of a PDF — but they're uninstrumented. Brady can't tell whether a prospect opened a tour, which projects they viewed, or whether tours convert, so the "close-of-meeting artifact" motion can't be measured or improved.

## Deliverable

1. **Open logging** in the `/share/[token]` route (`portal/src/app/(public)/share/`): on each valid token render, emit a structured log line following the existing `[AUDIT]` JSON pattern from the chat route — `{ event: "tour_open", tokenId/jti, slugs, expiry, ts, userAgent }`. No cookies, no third-party analytics, no PII beyond what the request already carries.
2. **Per-project view logging** when the tour visitor navigates between the token's granted projects (same pattern, `event: "tour_view", slug`).
3. **Retrieval path** — document in the file header how to pull these from Vercel runtime logs (`mcp: get_runtime_logs` / dashboard filter on `tour_open`), so weekly-sweep can report: tours minted vs opened vs went-stale.
4. **Weekly-sweep hook** — one line added to `3-reference/skills/weekly-sweep/SKILL.md`'s pipeline/financial section: report tour funnel counts when any tours were active that week.

## Acceptance criteria

1. [ ] Valid token open emits exactly one `tour_open` log line with the fields above
2. [ ] Expired/invalid tokens do NOT emit `tour_open` (they may emit `tour_invalid`)
3. [ ] Project navigation inside a tour emits `tour_view` lines
4. [ ] No new client-side trackers, cookies, or external services
5. [ ] Weekly-sweep SKILL.md line added with the retrieval command
6. [ ] `npm run build` and `npm run lint` pass

## Blocked by

— (independent of SPEC-008, but new tours shouldn't be *minted* until SPEC-008 ships per the lockdown freeze)

## Notes

Source: `docs/mception-asset-strategy.md` §4 Phase 2 / §5 KPI "tour funnel". Keep it boring: log lines + a sweep hook, not a dashboard. A dashboard is only worth building once the funnel shows real volume.
