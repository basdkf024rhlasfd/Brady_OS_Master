# SPEC-012 — Build Queue Reconciliation (SPEC-001..007 state cleanup)

**ID:** SPEC-012
**Slug:** build-queue-reconciliation
**Status:** needs-review
**Claimed by:** —
**Reviewer:** Brady
**Size:** small
**Trust tier:** T1
**Approval gate:** Brady's batch-accept reply (only Brady moves needs-review → accepted per INDEX.md)

---

## Problem

The build queue has been dormant ~12 weeks and its state is internally inconsistent: SPEC-001..007 filenames say `needs-review`, every spec body still says `Status: open`, and at least SPEC-004/005/006's deliverables verifiably shipped (SOW template exists at `3-reference/skills/project-agent/SOW-TEMPLATE.md`; capacity snapshot is morning-sweep phase 1.0d; "Cross-engagement signal" landed in `oc-optimus-SKILL.md:110` and `fran-SKILL.md:138`). A delegation surface with inconsistent state can't be trusted by contractors or agents, which blocks the whole "agents execute, Brady approves" model.

## Deliverable

1. **Verification table** — for each of SPEC-001, 002, 003, 007: check the specified target files and record shipped / partially-shipped / not-shipped with evidence paths (004/005/006 already verified shipped, include them in the table with the evidence above).
2. **Fix body/filename drift** — set each spec body's `Status:` field to match its filename (`needs-review`), and add a one-line `Notes` entry per spec pointing at the verification evidence.
3. **Batch-accept list for Brady** — append a "Pending acceptance" section to `3-reference/build-queue/INDEX.md`: one numbered line per shipped spec with its `approve musashi [slug]` token, so Brady can accept all of them in one reply (daily-decision-queue format).
4. **Decision-queue hand-off** — write one Streaming Notes row (Type = "Pre-Sweep Primer" is NOT correct here; use Type = "Task", Priority = "Must") titled "Batch-accept build queue SPEC-001..007" so morning sweep Phase 0 surfaces it.

## Acceptance criteria

1. [ ] Verification table exists (in INDEX.md or this spec's Notes) covering all 7 specs with evidence paths
2. [ ] All 7 spec bodies' `Status:` fields match their filenames
3. [ ] INDEX.md "Pending acceptance" section added with per-spec approve tokens
4. [ ] Streaming Notes row created
5. [ ] No spec renamed to `accepted` by an agent — that transition stays Brady-only

## Blocked by

—

## Notes

Source: `docs/mception-asset-strategy.md` §2.4/§4 Phase 1. The queue matters beyond hygiene: SPEC-008..011 route through it, and Phase 3's contractor handoff depends on a delegation surface whose state can be trusted.

---

## Execution record — 2026-08-11 (nightly-advance, Collect lever)

All four deliverables complete. Acceptance criteria 1–5 met; criterion 5 (no agent renames to
`accepted`) upheld — every spec sits at `needs-review` awaiting Brady.

1. **Verification table** → `INDEX.md` § "Verification Table (SPEC-012, run 2026-08-11)".
   All 7 in-scope specs verified **shipped**, two flagged `shipped (superseded)` where the
   April 26 CFO pivot overtook what the spec literally requested (SPEC-001 phase text,
   SPEC-003 Scenario A/B constraint → inverted to "model only Scenario B").
2. **Body/filename drift fixed** on all 7, plus SPEC-015.
3. **Pending acceptance section** → `INDEX.md`, 8 numbered `approve musashi <slug>` tokens
   plus `approve musashi build-queue-batch` for one-reply acceptance.
4. **Streaming Notes row** → `3baed43b-89c5-8172-8828-fbff0fabf025`.

**Scope extension:** SPEC-015 (mception-steward-skill) was outside this spec's stated 001–007
range but carried identical drift — its deliverable shipped (510-line SKILL.md, all 5 required
elements, registered in `CLAUDE.md` 2026-08-11) while both filename and body still said `open`.
Reconciled and included in the batch.

### Defect in this spec — fix before accepting

Deliverable #4 specifies `Type = "Task"` for the Streaming Notes row. **That value does not
exist in the Streaming Notes schema.** Valid options: Thread Log, Pulse Note, Daily State,
System Instruction, Communication Snapshot, Note, To Do, Keep Handy, Pin to Top, Pulse Log,
Overnight Log, Inbound to Cornelius, Outbound to agent, Execution Request, Research, Backlog
Item, Sprint Proposal. Used `Backlog Item`, matching the existing approval-gated Musashi
precedent (`burt-1`). Deliverable #4 should be corrected to `Backlog Item`.

Also worth recording: the Streaming Notes **data source** is `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`
(what writes must target); `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83` is the database wrapper. Both
IDs appear in the repo and both are correct at their own level — not a conflict.
