# SPEC-016 — Telly Inbound Reply Bridge (close the phone loop)

**ID:** SPEC-016
**Slug:** telly-inbound-bridge
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T1 (internal; reply parsing writes to Notion/backup, no outbound to third parties)
**Approval gate:** Brady approved core plan 2026-07-19

---

## Problem

Today Brady can receive a numbered digest on his phone (Telly outbound push works) but there is no way for his one-line reply to take effect — reply parsing only happens inside a desktop CoWork/morning-sweep session. `daily-decision-queue` lists Telegram delivery + reply parsing as "Future Enhancements (not v1)"; `telly-SKILL.md` §K lists two-way sync as "Not Started." Without this, the loop can't close from the phone.

## Deliverable

Extend the Telly bot (`~/telly-bot/`, Vercel project `telly-bot`, `api/webhook.js`) so an inbound message from Brady's chat ID (8764020256 only) matching the decision-queue grammar — `approve 1,3,5 | reject 2 | change 4: <note> | defer 6 | veto <slug>` — is parsed and actioned:
1. Map the numbers back to slugs via the current `.context/decision-queue-YYYY-MM-DD.md`.
2. Annotate the source gitted backup (`[APPROVED YYYY-MM-DD]` / `[REJECTED]`) and flip the corresponding Streaming Notes rows (Not Started → In Progress for approved; Remove for rejected).
3. Confirm back to Brady in one short Telegram message ("✓ approved 1,3,5 — queued for build").

This upgrades the whole OS's phone-approval surface, not just the mception loop.

## Acceptance criteria

1. [ ] Inbound replies from chat ID 8764020256 only (all other IDs ignored)
2. [ ] Grammar parsed: approve / reject / change / defer / veto with number ranges
3. [ ] Numbers resolve to slugs via the active decision-queue file
4. [ ] Source backup annotated + Streaming Notes rows flipped correctly
5. [ ] One-line confirmation reply sent
6. [ ] Bot token stays in Vercel env / `~/telly-bot/.env.local` — never in code
7. [ ] Failure is non-blocking and logged

## Blocked by

- — (independent; valuable regardless of the loop)

## Notes

Owner: builder (Telly bot is a separate app). Reuses the existing bot token — **no new credential.** Reference: `0-agents/custom-built-agents/telly-SKILL.md` §K, `3-reference/skills/daily-decision-queue/SKILL.md` "Future Enhancements," `3-reference/skills/conductor-push/SKILL.md`.
