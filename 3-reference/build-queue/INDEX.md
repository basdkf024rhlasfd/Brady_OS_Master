# Build Queue

Specs that contractors or autonomous agents can pick up and execute without Brady explaining anything verbally.

## How it works

Each spec is a markdown file. Status is encoded in the filename. Pick one up, execute it, rename it when done.

## File naming convention

```
SPEC-NNN-[slug]-[status].md
```

Statuses:
- `open` — available to claim
- `in-progress` — claimed, being worked
- `needs-review` — work complete, waiting for Brady to accept
- `accepted` — Brady confirmed done, spec is closed
- `parked` — deferred, not actively pursued

## How to claim a spec

1. Rename the file from `open` → `in-progress`
2. Open the file and add your name/agent to the `Claimed by` field
3. Work the spec exactly as written. If something is unclear, add a `Blocker` note and leave it in `needs-review` for Brady

## How to submit

1. Rename file from `in-progress` → `needs-review`
2. Add completion notes in the `Notes` field (what you did, any deviations, anything Brady should know)
3. Brady or the designated reviewer will accept or kick back

## Sizing

- **Small** — under 30 minutes
- **Medium** — 30–90 minutes
- **Large** — over 90 minutes

## Trust tiers

- **T1** — internal, reversible, no client-facing surface. Agent can execute autonomously under existing autonomy gates.
- **T2+** — client-facing, outbound, or irreversible. Brady must approve before execution regardless of size.

## Current queue

| Spec | Slug | Size | Tier | Status |
|---|---|---|---|---|
| SPEC-001 | oc-phase-sync | Small | T1 | needs-review |
| SPEC-002 | oc-research-autonomy | Small | T1 | needs-review |
| SPEC-003 | oc-parity-constraints | Small | T1 | needs-review |
| SPEC-004 | platform-capacity-view | Medium | T1 | needs-review |
| SPEC-005 | platform-sow-template | Medium | T1 | needs-review |
| SPEC-006 | platform-library-query | Small | T1 | needs-review |
| SPEC-007 | recon-dicaprio-retool | Medium | T1 | needs-review |
| SPEC-008 | portal-trust-lockdown | Medium | T2+ | needs-review |
| SPEC-009 | sensitive-content-eviction | Large | T2+ | open |
| SPEC-010 | engagement-portal-offer | Medium | T1 | open |
| SPEC-011 | magic-link-analytics | Small | T1 | open |
| SPEC-012 | build-queue-reconciliation | Small | T1 | needs-review |
| SPEC-013 | mception-capture | Medium | T1 | open |
| SPEC-014 | mception-killtest | Small | T1 | open |
| SPEC-015 | mception-steward-skill | Medium | T1 | needs-review |
| SPEC-016 | telly-inbound-bridge | Medium | T1 | open |
| SPEC-017 | mception-loop-wire | Large | T2 | open |

SPEC-008..012 source: `docs/mception-asset-strategy.md` (2026-07-18). Sequencing: 008 → 009; 010's first external send gated on 008; 011 and 012 independent.

---

## Verification Table (SPEC-012, run 2026-08-11)

Every spec below was checked against its target files. `shipped (superseded)` means the
deliverable landed but reality moved past what the spec literally asked for — recorded
honestly rather than marked a plain pass.

| Spec | Verdict | Evidence |
|---|---|---|
| SPEC-001 oc-phase-sync | **shipped (superseded)** | `oc-optimus-SKILL.md:10` reads "Phase 3 — PIVOTED: Whitepaper Offer (April 26)", newer than the spec's requested "Engagement Scope Negotiation (April 23)" — the April 26 CFO pivot overtook it. Service Physics → Known Constraint 8. Jordan Burke → People DB `:94`. |
| SPEC-002 oc-research-autonomy | **shipped** | `oc-optimus-SKILL.md:122` — `## B.5. Research Autonomy Mode` present |
| SPEC-003 oc-parity-constraints | **shipped (superseded)** | Constraints 12 (`:385`) and 13 (`:386`) present verbatim. The requested Scenario A/B capacity constraint exists as Constraint 11, inverted post-pivot: "model only Scenario B." Scenario A (Panda embedded) is dead, so 11 is the correct successor. |
| SPEC-004 platform-capacity-view | **shipped** | `morning-sweep/SKILL.md:131` — `### 1.0d Dual-Engagement Capacity Snapshot` |
| SPEC-005 platform-sow-template | **shipped** | `3-reference/skills/project-agent/SOW-TEMPLATE.md` exists |
| SPEC-006 platform-library-query | **shipped** | "Cross-engagement signal" in `oc-optimus-SKILL.md:110` and `fran-SKILL.md:138` |
| SPEC-007 recon-dicaprio-retool | **shipped** | Trigger boundary, revised trigger line, and "What DiCaprio is NOT" all present in **both** `dicaprio.md` (`:33/:35/:37`) and `dicaprio-SKILL.md` (`:15/:17/:19`) |
| SPEC-015 mception-steward-skill | **shipped** | `3-reference/skills/mception-steward/SKILL.md`, 510 lines, covering all 5 required elements (read-only proposer, immutable eval contract, family-freeze, `approve steward <slug>` lines, "skip this week" as first-class). Registered in `CLAUDE.md` 2026-08-11. Beyond SPEC-012's literal 001–007 scope, included because it is the same drift. |

Also corrected: all eight spec **bodies** said `Status: open` while their filenames said
otherwise. Bodies now match filenames. SPEC-015 was renamed `open` → `needs-review`.

## Pending Acceptance — Brady batch-accept

All eight verified shipped. **Only Brady moves `needs-review` → `accepted`** (INDEX rule);
no agent may make that transition. Reply with the tokens you accept:

1. `approve musashi oc-phase-sync` — SPEC-001 (shipped, superseded by the April 26 pivot)
2. `approve musashi oc-research-autonomy` — SPEC-002
3. `approve musashi oc-parity-constraints` — SPEC-003 (shipped, capacity constraint inverted post-pivot)
4. `approve musashi platform-capacity-view` — SPEC-004
5. `approve musashi platform-sow-template` — SPEC-005
6. `approve musashi platform-library-query` — SPEC-006
7. `approve musashi recon-dicaprio-retool` — SPEC-007
8. `approve musashi mception-steward-skill` — SPEC-015

9. `approve musashi build-queue-reconciliation` — SPEC-012 itself (the reconciliation run that produced this table)

`approve musashi build-queue-batch` accepts all nine at once.

**Fix before accepting SPEC-012:** its deliverable #4 specifies `Type = "Task"` for the
Streaming Notes row, which is not a valid option in that schema. Used `Backlog Item` (matching
the `burt-1` precedent). See the spec's execution record.

**Not verified, still genuinely open:** SPEC-009, 010, 011, 013, 014, 016, 017. SPEC-016
(telly-inbound-bridge) requires code in the external `~/telly-bot/` repo and cannot be
closed from this repo.

**mception self-improving loop (core, SPEC-013..017)** — Brady-approved 2026-07-19. NOTE: the live static-asset exposure fixed by this branch's `proxy.ts` change is the confirmed-urgent slice of **SPEC-008 (portal-trust-lockdown)** via its option (a); family-data eviction is **SPEC-009 (sensitive-content-eviction)** and is NOT duplicated by a loop spec. Loop build order: 013 capture (needs Brady's PostHog key) → 014 kill-test after 1 week → on go: 015 steward + 016 telly bridge → 017 wires it. Plan: `~/.claude/plans/system-instruction-you-are-working-declarative-bengio.md`.
