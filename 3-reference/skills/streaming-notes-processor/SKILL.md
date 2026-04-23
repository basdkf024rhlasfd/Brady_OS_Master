---
name: streaming-notes-processor
description: >
  Daily processing pass over Streaming Notes. Where the weekly disposition audit surfaces
  items that have already gone stale, the processor actions items inside their SLA —
  routes System Instructions, drafts Build Request plans, draft-sets Next Actions on Tasks,
  and logs every action to the Routing Log. Measures the daily processing score to
  track movement from 2/10 baseline toward 9/10 target.

  Trigger this skill whenever Brady says "process streaming notes", "run the processor",
  "drain the notes", "clear streaming notes", "process the queue", or any variation
  requesting a processing pass.

  Also wired into morning-sweep as Phase 3.6d (runs daily after Rules & Preferences
  propagation in 3.6b/3.6c). Companion to, not replacement for, the weekly
  streaming-notes-disposition-audit.
trust_tier: T1
---

# Streaming Notes Processor

The daily counterpart to the weekly disposition audit. The audit *surfaces* items
that are already stale; the processor *prevents* staleness by actioning items
inside their per-Type SLA window.

## Why This Exists

Brady captures at 9/10. Processing is 2/10. Items land in Streaming Notes, the
morning sweep reads them, and then most of them sit. The existing morning sweep
Phase 3.6b handles only `Type = "System Instruction"` — every other Type (Build
Request, Pulse Note, Task, To Do, Note, Sweep Feedback, Thread Log) has no
daily owner between capture and the weekly audit.

The processor fills that gap: every non-exempt Type gets examined daily, actioned
if the routing is obvious, drafted-and-surfaced to Brady if it needs judgment.
Every action writes a Routing Log row. Every run emits a processing-score number.

## Execution Environment

- **Runs on:** CoWork (Claude Desktop) on Brady's Mac, and inline inside morning-sweep
- **Access needed:** Notion MCP
- **Streaming Notes DB:** `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`
- **Routing Log page:** `344ed43b-89c5-816a-ab54-ca49ca239748` (see `_shared/routing-log.md`)
- **Rules & Preferences page:** `344ed43b-89c5-813d-bded-f1d5689510e2`
- **Processing paths reference:** `3-reference/skills/_shared/streaming-notes-processing-paths.md`
- **Score log directory:** `1-execution/areas/brady-os/processing-scores/`
- **Expected runtime:** 5–10 minutes

## Phase 1 — Query Open Items

Query Streaming Notes DB for items where:
- `Done != "__YES__"`
- `Status NOT IN ["Complete", "Remove"]`

Exclude:
- Items created in the last 2 hours (too fresh — let them sit one sweep cycle before action)
- `Type = "Daily State"` — lifecycle owned by morning/evening sweep
- `Type = "Keep Handy"` — intentionally persistent
- `Type = "Pin to Top"` — intentionally persistent
- `Type = "Pulse Log"` — auto-archived separately

For each remaining item, capture: `id`, `Name`, `Type`, `Status`, `Priority`,
`Next Action`, `Blockers`, `Created`, `Last Modified`, `Source`, plus the full
content body (for classification).

Compute `age_hours = now - Created` and `stale_hours = now - Last Modified`.

## Phase 2 — Look Up SLA by Type

Consult `3-reference/skills/_shared/streaming-notes-processing-paths.md` to get
per-Type SLA + processing destination. Half-SLA is the action trigger:

| Type | SLA | Half-SLA (action trigger) |
|---|---|---|
| System Instruction | 24h | 12h |
| Build Request | 24h | 12h |
| Sweep Feedback | 24h | 12h |
| Pulse Note | 48h | 24h |
| Task / To Do / Note | 72h | 36h |
| Thread Log | 7d | 3.5d |

Items past half-SLA are eligible for action this run. Items under half-SLA are
"monitoring" — counted but not touched.

## Phase 3 — Action By Type

Action each eligible item per its Type:

### System Instruction — back-stop the morning-sweep handler

If `Type = "System Instruction"` and the morning-sweep Phase 3.6b has not already
handled this item (check Status still "Not Started"), run the same logic:
1. Read rule text.
2. Classify into R&P section (Agent Defaults, Voice, Confidentiality, Topic Rules,
   Client-Specific, Platform-Specific).
3. Append row to the Rules & Preferences page table.
4. Set Status=Complete, Done=__YES__, Action="Move to Context Hub" on the note.
5. Append Routing Log row: `date`, `original_title`, `destination="Rules & Preferences"`, `reason="System Instruction processed"`, `summary=[rule text]`.

### Build Request — draft a dev plan stub

1. Slugify the note title: `streaming-notes-{short-id}-{slug}.md` where `short-id` is
   the last 6 chars of the Notion page ID.
2. Check if a plan already exists at `.context/plans/streaming-notes-{short-id}-*.md`. If yes, skip.
3. Otherwise, generate a plan stub at `.context/plans/streaming-notes-{short-id}-{slug}.md`:

   ```markdown
   # Build Plan — {title}

   **Source:** Streaming Notes {short-id}, created {created_date}
   **Priority:** {priority}

   ## Context
   {full content body of the Streaming Note}

   ## Scope
   TBD — fill before building.

   ## Files to touch
   TBD

   ## Verification
   TBD
   ```

4. Set `Next Action = "Dev plan drafted at .context/plans/streaming-notes-{short-id}-{slug}.md — scope + verify"`.
5. Leave Status as "Not Started" (build is queued, not done).
6. Append Routing Log row: `destination="Dev plan"`, `reason="Build Request queued"`,
   `summary="Stub at .context/plans/streaming-notes-{short-id}-{slug}.md"`.

### Sweep Feedback — queue for next Pre-Flight

1. Append the feedback text to `.context/sweep-feedback-queue.md` (create if missing)
   with a timestamp and Streaming Note ID header.
2. Next morning sweep reads this file in Pre-Flight Section B (see weekly-sweep
   pattern) and applies.
3. Set Status=Complete, Done=__YES__.
4. Append Routing Log row.

### Pulse Note — route or archive

Check for a "Why" field or classification hint in the content:
- Financial / family / household signal → Finn absorbs (see
  `0-agents/custom-built-agents/finn.md` Streaming Notes watchlist)
- Client-specific signal → route to the project folder in
  `1-execution/areas/work-and-business/programs/Consulting/Project - {name}/`
- System / OS signal → route to `1-execution/areas/brady-os/signals/`
- Unclassifiable → leave for disposition audit

For auto-routed items: set Status=Complete, Done=__YES__, write Routing Log row.
For unclassifiable items: leave Status="Not Started" and add `Next Action = "Classify or archive — surfaced by processor"`.

### Task / To Do / Note — draft Next Action, never auto-set

These need Brady's judgment. The processor drafts, never sets.

1. If `Next Action` is empty:
   - Read the content and propose a candidate Next Action (one line, action verb).
   - Write the candidate to a `proposed_next_actions` list in the report (Phase 5),
     grouped by note ID + title.
   - Do NOT write the candidate into Notion. Brady approves in the brief then runs
     a follow-up "apply the processor drafts" action.
2. If `Next Action` already exists but `stale_hours > 72`:
   - Flag for the disposition audit. Do not touch.

### Thread Log — skip

Evening-sweep owns Thread Log lifecycle. Processor does not touch these.

## Phase 4 — Routing Log & Processing Score

### 4.1 Batch-append Routing Log rows

Collect all actions from Phase 3 and append them in one content_update call to
the Routing Log page per `3-reference/skills/_shared/routing-log.md`. One row per
item actioned (not per item examined).

### 4.2 Compute daily processing score

```
items_entered_today      = count of items with Created in [today_00:00, now)
items_actioned_today     = count of items the processor just moved to Complete/Remove or gave Next Action
items_aged_past_sla      = count of items where stale_hours > per-Type SLA
daily_score              = min(10, round(actioned_today / max(1, aged_past_sla) × 10))
```

Edge cases:
- If `items_aged_past_sla == 0` → score = 10 (nothing stale, perfect).
- If `items_actioned_today == 0` AND items past half-SLA exist → score = 0.

### 4.3 Append to score log

Append one row to `1-execution/areas/brady-os/processing-scores/YYYY-MM.md` with
schema: `| Date | Entered | Actioned | Aged Past SLA | Score |`. Create the file
if missing (with header).

## Phase 5 — Emit Report

≤15 lines. Format:

```
📋 Streaming Notes Processor — {today}
  Queue: {open_count} open / {past_half_sla} past half-SLA / {stale_count} stale (>SLA)
  Actioned: {n_system_instructions} System Instructions, {n_build_requests} Build Requests, {n_pulse} Pulse Notes, {n_sweep_feedback} Sweep Feedback
  Drafted (need Brady): {n_drafts} Next Action candidates for Task/To Do items
  Routing Log: +{rows_appended} rows
  Processing Score: {daily_score}/10 (7-day avg: {avg}/10, baseline was 2/10)

  Drafts awaiting Brady:
    - [{note_title}] → proposed: {candidate_next_action}
    - ...

  {warn_if_any_items_skipped_with_errors}
```

Reply "apply drafts" or "approve all drafts" to write the candidate Next Actions
to Notion. Processor does not do this automatically.

## Phase 6 — Close Loop (optional)

If this run was called inside morning-sweep (Phase 3.6d), append the 6-line
summary block to the sweep brief. Standalone runs output the full report.

## Verification

After a run:
1. Spot-check Routing Log — new rows should be attributable, schema-valid (8 cols).
2. Spot-check one System Instruction processed → R&P page shows new row in correct section.
3. Spot-check one Build Request processed → `.context/plans/streaming-notes-*.md` exists, Next Action set.
4. Confirm score file appended with today's date.
5. No Task/To Do Next Actions were auto-set — only drafted in report.

## Failure modes to watch

- Notion MCP timeout → skip the run, do not partial-apply. Retry next cycle.
- Routing Log table schema drift → fail fast and warn; do not append malformed rows.
- Score file corrupted → rebuild from the last clean monthly file; never lose
  a score day — if in doubt, write to a `.recovery.md` file and surface the conflict.
- Streaming Notes DB naming mismatch (some skills refer to
  `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`, others to `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`)
  — processor uses the one in `_shared/streaming-notes-processing-paths.md`. If
  both return results, consolidate and flag the drift.

## Relationship to other skills

- **morning-sweep Phase 3.6b** handles System Instructions eagerly. Processor is
  the back-stop: if 3.6b missed an item, processor catches it next run.
- **streaming-notes-disposition-audit** is the weekly "nothing gets lost" check.
  Processor handles the daily flow; audit handles the weekly review.
- **Finn** watches Streaming Notes for financial/family signals. Processor
  respects Finn's watchlist — when Finn has absorbed a Pulse Note, processor
  recognizes the Action="Absorbed by Finn" marker and marks Complete.
- **Telly** captures into Streaming Notes. Processor never writes back to Telly.
