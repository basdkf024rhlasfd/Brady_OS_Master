# Phil Pre-Sweep — Morning Audit Backups

Daily 4 AM output from the `phil-pre-sweep` skill
(`0-agents/custom-built-agents/phil-SKILL.md`). One markdown file per day.
The gitted, persistent backup behind the Notion primer row that morning
sweep consumes.

## Why this exists

Morning sweep reads a compact "Pre-Sweep Primer" row in Streaming Notes
(Phase 1.0b). That row carries the essentials. These files carry the
full detail: the AUDIT log of every autonomous reconcile, the raw
proposal lists, the cross-DB coherence flags in Phil's voice, and the
timestamp/runtime metadata.

Use these files to:
- Roll back an autonomous Done/Status write (`git show` the day's file, revert the two-field change in Notion by hand).
- Reconstruct what Phil surfaced on a given day even after the Notion primer is archived.
- Trend grooming volume over time (reconciles per run, proposals per run, stalled-project detection rate).

## File naming

- `YYYY-MM-DD.md` — one file per run (today's date, CT).
- Re-runs overwrite the same-day file.
- `README.md` — this file.

## Schema

Each daily file contains:

- `STATUS` header — `complete` or `partial — [reason]`
- Runtime + generated timestamp
- Proposed TOP 3 Candidates
- Carryover From Yesterday
- 7-Day Horizon (Life Events)
- Calendar Headlines (today + tomorrow)
- Coherence Flags (Phil's Lens — prose)
- Field Normalization Proposed (awaiting Brady approval)
- Autonomous Reconciles Executed (id / name / field / before / after table)
- Cross-DB Flags (stalled projects, R&P duplicates/contradictions, Routing Log gaps)

## Writer

- `0-agents/custom-built-agents/phil-SKILL.md` — primary writer, runs 4 AM daily via Conductor trigger.

## Readers

- `3-reference/skills/morning-sweep/SKILL.md` — reads the companion Notion primer row (Streaming Notes, `Type="Pre-Sweep Primer"`, today) in Phase 1.0b. This backup file is the full-detail archive; the Notion row is the compact handoff.
- Brady — on demand when investigating what Phil surfaced on a past date or reviewing autonomous reconciles for rollback.

## Rules

- The skill writes this file FIRST, Notion writes SECOND. If any Notion write fails, the header becomes `STATUS: partial — [reason]` and subsequent Notion writes abort. Morning sweep sees "no primer" and proceeds normally.
- Re-runs overwrite. The most recent run is canonical for that date.
- Manual edits: allowed, but log the reason in a comment row at the top of the file.
- Never delete these files — they are the audit trail for autonomous Notion writes.
