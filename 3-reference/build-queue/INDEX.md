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
| SPEC-001 | oc-phase-sync | Small | T1 | open |
| SPEC-002 | oc-research-autonomy | Small | T1 | open |
| SPEC-003 | oc-parity-constraints | Small | T1 | open |
| SPEC-004 | platform-capacity-view | Medium | T1 | needs-review |
| SPEC-005 | platform-sow-template | Medium | T1 | open |
| SPEC-006 | platform-library-query | Small | T1 | open |
| SPEC-007 | recon-dicaprio-retool | Medium | T1 | open |
