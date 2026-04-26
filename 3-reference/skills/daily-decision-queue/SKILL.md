---
name: daily-decision-queue
trust_tier: T0
description: >
  Brady's "open the day" decision queue. Aggregates every pending approve/change/reject
  item from Musashi, Heidi, Phil, and Streaming Notes into ONE numbered list at the top
  of morning sweep. Brady replies once: `approve 1,2,5 | reject 3 | change 4: smaller scope`.

  Trigger this skill whenever Brady says "decision queue", "open the day", "what needs
  approval", "pending decisions", "approval queue", or any variation requesting a single
  consolidated approve/change/reject list. Runs as Phase 0 of morning sweep before
  anything else loads.

  This skill OWNS the daily approval surface. It does NOT generate recommendations
  (Musashi/Heidi/Phil do that), score agents (Musashi), or audit compliance (Heidi).
  It only aggregates and renders.
---

# Daily Decision Queue — Phase 0 of Morning Sweep

## Why This Exists

Yesterday Musashi produced 9 approve-slugs. Heidi was scheduled to produce more. Phil produced 2-3 flags. **Brady saw none of them in TOP 3** because each agent dumps to its own backup file and morning sweep doesn't aggregate the decision surface.

Result: backup files pile up unread; approval-driven improvement loops never close; Brady's day opens with TOP 3 about Justin Woods + pool party + cash, while 12 OS-level decisions sit untouched.

The fix is brutally simple: **scan every agent backup modified in last 24h, extract every line matching `approve [agent] [slug]`, render as one numbered list with three buttons each.**

## Execution Environment

**Runs on:** First phase of morning sweep (CoWork desktop) OR on-demand from any session.

**Scheduled:** Not independently — fires as Phase 0 of `morning-sweep` SKILL. On-demand via "decision queue" or "open the day".

**Access needed:** File system read only.

**Expected runtime:** < 30 seconds. Pure aggregation, no LLM reasoning.

## Sources Scanned (in priority order)

| Source | Location | Pattern to extract |
|---|---|---|
| Musashi | `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD*.md` (most recent) | `\`approve musashi [a-z0-9-]+\`` |
| Heidi | `1-execution/areas/brady-os/hygiene-heidi-reports/YYYY-MM-DD.md` (most recent) | `\`approve heidi [a-z0-9-]+\`` |
| Phil | `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md` (most recent) | `\`approve phil [a-z0-9-]+\`` |
| Project Agents | `1-execution/areas/brady-os/project-agent-standups/*-YYYY-MM-DD.md` | `\`approve (oc-optimus|fran) [a-z0-9-]+\`` |
| Streaming Notes | DB query: `Type="System Instruction" AND Status="Not Started" AND created < today-1d` | each row = one decision |

For each source: **pull the line containing the approve-slug PLUS the heading it sits under** (so Brady sees context, not just the slug).

## Output Format

```
🎯 DECISION QUEUE — {DATE} ({N} items)

MUSASHI ({n}):
  1. [oc-1]    OC Optimus Phase Sync (SMALL)
  2. [oc-2]    OC Optimus Research Autonomy Mode (SMALL)
  ...

HEIDI ({n}):
  9. [runtime-1]   Fix Heidi's chunked-persistence runtime
  10. [rule2-bulk] Add self-scoring to 6 agent SKILLs
  ...

PHIL ({n}):
  12. [olivia-date] Fix Olivia party date in Life Events DB
  13. [mortgage-close] Close Mortgage Life Event row
  ...

PROJECT AGENTS ({n}):
  14. [oc-optimus standup-1] Resolve Phase 3 SOW response timing
  ...

SYSTEM INSTRUCTIONS ({n}):
  15. [si-04-23] Build/skill run handoff items → Streaming Notes — close (covered)?
  ...

────────────────────────────────────────────────
Reply: `approve 1,2,5 | reject 3,4 | change 6: smaller scope`
Or: `defer 7-10` to push to tomorrow's queue
Or: `clear all` after dispositioning everything else
```

## Phase 1 — Inventory Sources

1. Compute today's date (America/Chicago).
2. For each source in the table above, find the most recent file by mtime:
   - Musashi: `ls -t musashi-reviews/*.md | head -1` (excluding README)
   - Heidi: most recent file in hygiene-heidi-reports/
   - Phil: today's file (or yesterday's if today's hasn't run)
   - Project Agents: today's standup files (one per active project agent)
3. For Streaming Notes: query DB for `Type="System Instruction" AND Status="Not Started"` created in last 7 days.

If a source file doesn't exist or DB is unreachable: skip silently, note `(unavailable)` in output footer.

## Phase 2 — Extract Slugs

For each source file:
1. Grep for `\`approve [agent-name] [a-z0-9-]+\`` pattern.
2. For each match, capture the line + the most recent `###` heading above it (this becomes the title).
3. Strip backticks, normalize spacing.

For Streaming Notes:
1. Pull row `Name`, `Created Date`, `Priority`.
2. Synthesize a slug: `si-{MM-DD}-{first-3-words-kebab}`.
3. Title = row Name.

## Phase 3 — Number and Render

1. Number items globally (1 to N) so Brady can reply with comma-separated numbers.
2. Group by source for visual scanning, but keep numbering continuous.
3. Render output above.

## Phase 4 — Persist

Write the queue to `.context/decision-queue-YYYY-MM-DD.md` so morning sweep Phase 1 can reference it without re-scanning.

When Brady replies with `approve 1,2,5`, the morning sweep (or this skill called again) reads the persisted queue, looks up items 1, 2, 5 by their slugs, and:
- For Musashi/Heidi/Phil items: marks them in their respective backup files (append `[APPROVED 2026-04-25]` after the slug)
- For Streaming Notes: updates the row's Status to "In Progress" and Next Action to the slug + "approved by Brady"
- For rejected items: marks `[REJECTED]` similarly
- For changed items: writes the change note as a new line below the slug

## Phase 5 — Self-Score

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Coverage — all sources scanned? | Skipped >1 | Skipped 1 | All scanned |
| Slug extraction — no missed approve-slugs? | >2 missed | 1 missed | All captured |
| Numbering — continuous, no duplicates? | Errors | n/a | Clean |
| Rendering — Brady-readable, scannable < 30s? | Wall of text | Adequate | Tight |
| Persistence — file written, reply-routing works? | Failed | Partial | Clean |

Self-score: sum = `/10`. If < 8, recommend one improvement for next run.

## Integration with Morning Sweep

In `3-reference/skills/morning-sweep/SKILL.md`, **insert Phase 0 before Phase 1**:

```
## Phase 0 — Decision Queue (NEW)

Run `daily-decision-queue` skill. Render its output as the first thing Brady sees.
If queue has 0 items, render "Decision queue clear ✅" and continue silently.
If queue has items, pause: Brady can reply with approvals before sweep continues,
or say "continue" to defer all decisions to end-of-sweep review.
```

## Why Phase 0 (Not Last)

- Decisions front-loaded = highest-leverage 30 seconds of the day
- Brady's energy is highest at sweep open; approval load belongs there
- If Brady defers, the rest of the sweep still runs
- If Brady approves, the rest of the sweep can incorporate the approvals (e.g., Musashi recs that get approved become Yuki Ronin build queue items in Phase 4)

## Future Enhancements (not v1)

- Telegram delivery via Telly: queue arrives as a Telegram message Brady can reply to inline
- Reply parsing skill: `approve 1,2,5` becomes API calls without a second human pass
- Carryover logic: items unactioned >3 days get auto-flagged "Brady avoiding this?"
