# Streaming Notes — Processing Score Log

Daily score computed by the `streaming-notes-processor` skill (and on manual runs).
One markdown file per month. One row per day the processor ran.

## Why this exists

Until 2026-04-23, the "2/10 processing score" was a subjective claim in
`3-reference/skills/_shared/streaming-notes-processing-paths.md`. This directory
makes it measured. The Commissioner Brief and weekly disposition audit read from
here for trend reporting.

## Schema

Each monthly file is a markdown table:

```
| Date | Entered | Actioned | Aged Past SLA | Score |
|---|---:|---:|---:|---:|
| 2026-04-23 | 4 | 3 | 5 | 6 |
```

- **Date** — YYYY-MM-DD of the processor run.
- **Entered** — items with `Created` inside [today 00:00, run time).
- **Actioned** — items moved to Complete/Remove, or given a Next Action this run.
- **Aged Past SLA** — items where `stale_hours > per-Type SLA` at run time.
- **Score** — `min(10, round(Actioned / max(1, Aged Past SLA) × 10))`.
  - Score = 10 when `Aged Past SLA == 0` (nothing stale).
  - Score = 0 when items are past SLA and none were actioned.

## Baseline

- **2026-04-22 baseline:** 2/10 (subjective claim, pre-processor).
- **Target:** 9/10 weekly average.

## File naming

- `YYYY-MM.md` — one file per month, appended daily.
- `README.md` — this file (schema + baseline).

## Writer

- `3-reference/skills/streaming-notes-processor/SKILL.md` — primary writer.

## Readers

- `3-reference/skills/streaming-notes-disposition-audit/SKILL.md` — weekly roll-up.
- `3-reference/skills/commissioner-brief/SKILL.md` — weekly narrative.

## Rules

- Processor appends one row per run. Never overwrites history.
- If the processor run fails partway, it does NOT append a row — partial runs are not scored.
- If two runs happen on the same day, both append (later rows reflect end-of-day state).
- Manual edits: allowed, but log the reason in a comment row above the edit.
