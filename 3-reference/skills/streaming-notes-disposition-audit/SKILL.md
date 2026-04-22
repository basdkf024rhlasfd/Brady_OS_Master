---
name: streaming-notes-disposition-audit
description: >
  Weekly audit of every open Streaming Notes item. Ensures nothing silently ages past 14 days
  without a decision. Surfaces three buckets — Stale, Needs Next Action, Needs Unblock — and
  produces a disposition report for Brady's review. Does NOT auto-close anything. Brady approves
  all dispositions, then the skill batch-updates Notion.

  Trigger this skill whenever Brady says "streaming notes audit", "disposition audit",
  "what's stale in streaming notes", "nothing gets lost", or "never forget audit".
  Also runs automatically as the final step of the weekly-sweep.

  This skill directly addresses the 2/10 processing score: capture is 9/10, but items
  land and disappear. This is the check that guarantees no item goes more than 7 days
  without a clear next action or an explicit decision to archive.
trust_tier: T1
---

# Streaming Notes Disposition Audit

The forgetting-prevention sweep. Runs weekly. Every item in Streaming Notes either has
a clear next step or gets flagged for Brady's decision. Nothing disappears quietly.

## Why This Exists

Brady captures at 9/10. Processing is 2/10. Items land and sit. Without a weekly audit,
Streaming Notes becomes a graveyard: things Brady intentionally logged — decisions, rules,
ideas, to-dos — age out unresolved. This skill is the check. It runs after weekly-sweep
and guarantees every item is seen within 7 days of going stale.

## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac  
**Access needed**: Notion MCP  
**Streaming Notes DB**: `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`  
**Processing paths + per-Type SLAs**: `3-reference/skills/_shared/streaming-notes-processing-paths.md`  
**Scheduled**: Sunday evening (or as final step of weekly-sweep)  
**Expected runtime**: 10–15 minutes

## Phase 1: Pull All Open Items

Query Streaming Notes for all items where:
- `Done` = false (not "__YES__")
- `Status` NOT IN ["Complete", "Remove"]

Exclude:
- Items created in the last 24 hours (too fresh to audit)
- Type = "Daily State" (handled by morning/evening sweep lifecycle)
- Type = "Pulse Log" (auto-archived separately)

For each item, note:
- Name
- Type
- Status
- Priority
- Next Action (field value, if any)
- Blockers (field value, if any)
- Created Date
- Last Modified
- Days since Last Modified (`today - Last Modified`)

## Phase 2: Bucket Each Item

Assign each item to exactly one bucket:

### Bucket A — STALE (>14 days, no movement)
Definition: `Last Modified` is more than 14 days ago AND `Status` is still "Not Started" or has been "In Progress" with no field changes.

These items need a Brady decision: Keep as-is / Set next action / Archive (mark Remove).

### Bucket B — NEEDS NEXT ACTION (no Next Action field set, past per-Type SLA)
Definition: `Next Action` field is empty AND item is past its SLA threshold (per `3-reference/skills/_shared/streaming-notes-processing-paths.md`):
- System Instruction / Build Request / Sweep Feedback: 24h
- Pulse Note: 48h
- Task / To Do / Note: 72h
- Thread Log: 7d

These items are active but directionless. Brady needs to write a next action or the item will drift into Bucket A.

Exception: Items with Type = "Keep Handy", "Pin to Top", or "Daily State" — skip, they're intentionally persistent.

### Bucket C — NEEDS UNBLOCK (Blocked status, no Blockers field)
Definition: `Status` = "Blocked" AND `Blockers` field is empty.

These items are stalled without explanation. Brady needs to either fill in the blocker or un-block them.

### Bucket D — CLEANUP (Test items, empty names, orphaned logs)
Definition: Name contains test patterns ("test me", "delete me", "NOW TEST", "hgfddfgvbnk"), or item is a photo reference with no context, or Status=Complete with Done=false (sync mismatch).

These can be marked Remove with no Brady review required — present the list but auto-approve is fine.

## Phase 3: Generate Disposition Report

Write the report as a **new Thread Log** in Streaming Notes with:
- Type: Thread Log
- Name: `Disposition Audit — [date]`
- Status: In Progress
- Priority: Must
- Source: Cowork
- Tags: ["Admin", "Work"]

Report format:

```
# Streaming Notes Disposition Audit — [DATE]
**Total open items scanned:** [N]
**Items flagged:** [N] across [A] stale + [B] needs next action + [C] needs unblock + [D] cleanup

---

## 🔴 BUCKET A — STALE (>14 days, no movement) [N items]
For each item:
- **[Name]** | [Type] | [Priority] | [N] days stale | Created [date]
  - Last known status: [Status]
  - Decision needed: Keep / Set next action / Archive

---

## 🟡 BUCKET B — NEEDS NEXT ACTION (>3 days, empty Next Action field) [N items]
For each item:
- **[Name]** | [Type] | [Priority] | [N] days since last touch
  - Write a next action on this item, or it'll go stale in [X] days

---

## 🟠 BUCKET C — NEEDS UNBLOCK [N items]
For each item:
- **[Name]** | Status: Blocked | [N] days blocked
  - What's blocking it? Fill the Blockers field or un-block.

---

## 🗑️ BUCKET D — CLEANUP (can auto-archive) [N items]
[List of test/orphaned items — these will be marked Remove unless Brady objects]

---
## 🟢 HEALTHY — No action needed [N items]
Items that are active, have next actions set, and moved in the last 3 days.
[Brief count only — no detail needed]
```

## Phase 4: Brady Reviews

Present the report in conversation. Brady responds with dispositions:

For Bucket A items:
- "keep" → no change, set next action if Brady provides one
- "archive" or "done" → set Status=Remove, Done=__YES__
- Brady writes a next action → update Next Action field

For Bucket B items:
- Brady writes a next action → update Next Action field
- "archive" → Status=Remove, Done=__YES__

For Bucket C items:
- Brady names the blocker → update Blockers field
- "unblock" → revert Status to Not Started

For Bucket D items:
- Auto-apply unless Brady says "keep [item name]"

Brady may also say "skip" to defer any item — leave it untouched, it'll reappear next week.

## Phase 5: Batch Update Notion

After Brady confirms dispositions:
1. Apply all status changes via Notion MCP
2. Apply all field updates (Next Action, Blockers)
3. Mark Done=__YES__ on every item set to Complete or Remove (consistency rule)
4. Update the Disposition Report Thread Log: Status → Complete, Done → __YES__
5. Log a one-line summary to the weekly-sweep output:
   ```
   Disposition Audit: [N] items reviewed — [A] archived, [B] got next actions, [C] unblocked, [D] cleaned up. [N] items carried forward.
   ```

## Phase 6: Processing Score

After Phase 5 batch updates, compute:

```
Processing Score = (items actioned this run) / (items open at start of audit) × 10
```

"Actioned" = Status moved to Complete or Remove, OR Next Action field set for the first time.
"Open at start" = total items returned in Phase 1 query (before bucketing).

Append a `## Processing Score` section to the Disposition Audit Thread Log:

```
## Processing Score
Score: [X]/10
Items open: [N] | Items actioned: [N] | Carried forward: [N]
Trend: [▲ improving / ▼ declining / → flat] vs. last audit
```

Target: 9/10. Baseline: 2/10 (set 2026-04-22).

Also include in the weekly-sweep one-line summary:
```
Disposition Audit: [N] items reviewed — [A] archived, [B] got next actions, [C] unblocked, [D] cleaned up. Score: [X]/10.
```

## Rules

- **Never auto-close anything in Bucket A/B/C without Brady's explicit approval.** This is a review tool, not a reaper.
- **Bucket D auto-cleanup is the only exception** — test items and sync mismatches are noise, not decisions.
- If Brady is not available (autonomous run), generate the report and mark it Priority=Must. Surface it in the next morning sweep instead of waiting for Sunday.
- If Notion MCP is unavailable, write the report to `.context/disposition-audit-[date].md` and surface it in the next status check.
- Always set Done=__YES__ when setting Status=Complete or Status=Remove. These two fields move together. No exceptions.

## Done/Status Consistency Rule

Whenever this skill sets `Status = "Complete"` or `Status = "Remove"` on any Streaming Note, ALSO set `Done = "__YES__"`. These two fields must always move together. No exceptions.

## What This Skill Does NOT Do

- Does not move items to other Notion databases (that's the evening sweep's job)
- Does not create Tasks (Brady decides that in conversation)
- Does not delete items — only marks them Remove (soft archive)
- Does not touch items Brady has explicitly flagged "Pin to Top" or "Keep Handy" — those are intentionally persistent
- Does not run more than once per week (running it daily would create noise)

## Integration with Weekly Sweep

This skill runs as the **last step** of the weekly-sweep, after Phase 6 (Build Requests review). It uses the same Streaming Notes query infrastructure. The weekly-sweep output includes the one-line audit summary in its "OPEN ITEMS" section.

If Brady wants to run it standalone outside weekly-sweep, trigger it directly: "run disposition audit" or "streaming notes audit."
