# SPEC-017 — Wire the Weekly Loop End-to-End (Phase C deliverable)

**ID:** SPEC-017
**Slug:** mception-loop-wire
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** large
**Trust tier:** T2 (the execution step ships changes to `portal/` — Brady approves each proposal)
**Approval gate:** Brady approved core plan 2026-07-19; whole loop gated on SPEC-014 go

---

## Problem

With capture live (008), the kill-test passed (009), family data clean (010), the Steward SOP written (011), and the phone bridge built (012), the pieces exist but aren't connected. This spec wires the weekly propose-only loop end-to-end — the actual Tuesday-list deliverable.

## Deliverable

The closed weekly loop, everything Brady-gated (no auto-ship, no earned-autonomy tiers):
1. **Saturday:** the Steward (SPEC-015) runs on its Claude-Code scheduled trigger → reads the week's signal → writes a numbered proposal list as `approve steward <slug>` lines to its gitted backup → pushes a Telly digest to Brady's phone.
2. **`daily-decision-queue`** picks up the `approve steward <slug>` lines (add "mception-steward" as a source row to its fixed source table).
3. **Brady replies once** from his phone (SPEC-016 parses it).
4. **Approved proposals execute** via **Musashi Deploy Mode**: each becomes a portal change (KB file add/edit, chat-config tweak, copy fix) shipped as a PR → repo-janitor CI → mandatory UAT (webster Runbook 5) → merge = Vercel auto-deploy. The Steward never holds deploy creds; execution is this separate credentialed step (prompt-injection boundary).
5. **Experiment ledger:** each shipped change is recorded; the next run marks it confirmed/rejected/inconclusive (min-sample humility — never "learn" from N=1).
6. Empty weeks still send the "nothing worth shipping" digest (predictable cadence beats silence).

## Acceptance criteria

1. [ ] End-to-end dry-run: Steward proposes → digest to phone → Brady approves → change ships → verified live, with Brady doing only the one reply
2. [ ] Every proposal is Brady-gated; nothing auto-ships; family/protected surfaces always explicit-approval + family-path UAT
3. [ ] The Steward holds no deploy credentials; Musashi Deploy Mode is the only credentialed executor
4. [ ] `daily-decision-queue` source table includes the Steward backup path
5. [ ] Experiment ledger records shipped changes + next-run verdicts
6. [ ] Empty-week digest fires
7. [ ] New autonomous surface added to TRANSPARENCY.md; passes the next Hygiene Heidi audit

## Blocked by

- SPEC-014 (go), SPEC-009 (sensitive-content-eviction, main), SPEC-015 (Steward SKILL), SPEC-016 (Telly bridge).

## Notes

Owner: **Musashi Deploy Mode** (execution/deploy) + Claudine (orchestration). This is the mission floor — the Tuesday list. Deferred beyond this spec (each its own future decision): earned silent tier, client-facing changelog on the preview tour, automated dissent pass.
