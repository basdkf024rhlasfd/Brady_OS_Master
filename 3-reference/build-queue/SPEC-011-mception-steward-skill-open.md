# SPEC-011 — The Steward SKILL.md (weekly loop SOP)

**ID:** SPEC-011
**Slug:** mception-steward-skill
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T1 (a new skill doc; the skill itself is read-only/propose-only)
**Approval gate:** Brady approved core plan 2026-07-19; activation gated on SPEC-009 go decision

---

## Problem

Amendment 3: "no SOP = no execution." The weekly loop cannot exist until its SKILL.md is written and approved. The Steward is the agent that reads the week's signal and drafts the proposal list — it must be a **read-only proposer** that never holds deploy credentials (the prompt-injection boundary, since it ingests visitor-typed chat text).

## Deliverable

`3-reference/skills/mception-steward/SKILL.md` (or `0-agents/custom-built-agents/` if instantiated as a named agent), scaffolded via the `agent-scheduler` SOP, cloning the Hygiene-Heidi Saturday pattern. Must specify:
1. **Runner:** Claude.ai Code scheduled trigger (the only git-receipt-proven runner with repo+Notion+push; holds MCPs/memory/governance/`~/brady-os-local`). Weekly cadence; idempotent catch-up for missed weeks.
2. **Read-only proposer:** reads PostHog (via MCP) + chat transcripts + coverage gaps; drafts proposals; writes ONLY to a gitted backup (`1-execution/areas/brady-os/mception-steward/YYYY-MM-DD.md`) with `approve steward <slug>` lines + a Telly digest. Holds NO deploy creds. Execution is a separate step (SPEC-013 → Musashi Deploy Mode).
3. **Immutable eval contract:** the Steward's scoring rubric + the family-freeze rule live in a file it may **read but never edit** (anti-metric-gaming, Thicket lesson).
4. **Family-freeze:** any proposal touching family pages / `family-shared` / protected surfaces (financial-assistant, bucket-system, 1915-south*) is always explicit-approval, never silent, and requires family-path UAT.
5. **"Skip this week" is a first-class success output;** the digest fires even on empty weeks ("nothing worth shipping — here's what I watched").
6. Objective scoring methodology + self-scoring phase + improvement loop (Hygiene Heidi Rules 1–3, or it goes Red at the next Saturday audit).

## Acceptance criteria

1. [ ] SKILL.md exists, `agent-scheduler`-compliant (Pre-Flight → Scan → Propose → Output → Routing Log → Report), with the 5 safety rails
2. [ ] Explicitly read-only/propose-only; no deploy credentials in its scope
3. [ ] Eval contract + family-freeze rule referenced as read-only files
4. [ ] Emits `approve steward <slug>` lines to the decision-queue-scanned backup path + Telly digest
5. [ ] "Skip week" output defined; empty-week behavior specified
6. [ ] Registered in CLAUDE.md Skills Registry + Claudine Skill Registry DB; TRANSPARENCY.md updated
7. [ ] First-run verification + 3-clean-runs-to-trusted noted

## Blocked by

- SPEC-009 go decision (draft may proceed in parallel; do not schedule/activate until the kill-test passes).

## Notes

Owner: Claudine (draft) → Brady approves the SOP. **Name TBD by Brady** (decision-queue item). Everything the Steward proposes is Brady-gated in the core (no earned-autonomy tiers yet — deferred).
