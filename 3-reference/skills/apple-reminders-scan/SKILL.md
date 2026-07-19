---
name: apple-reminders-scan
agent: Finn (0-agents/custom-built-agents/finn.md)
description: >
  Scans Apple Reminders for incomplete items in Finn's domain (financial, family ops,
  logistics). Classifies each item, logs to Streaming Notes, updates family KB files,
  and marks completed items done in Apple Reminders via osascript.

  TRIGGER whenever Brady says: "scan reminders", "check reminders", "clear my reminders",
  "what's in reminders", "process reminders", "Finn check reminders", or any variation
  asking Finn to review Apple Reminders.

  Also runs as Phase 1.10 in morning-sweep (compact mode) and Phase 4.9 in evening-sweep
  (action mode for items flagged by morning).

trust_tier: T1
surfaces: [cowork, claude-code]
version: 0.1
created: 2026-04-22
---

# Apple Reminders Scan

Drains Brady's Apple Reminders of items that belong to Finn — financial tasks, family
logistics, household ops — so they don't sit as noise. Uses `osascript` (macOS-native,
no MCP needed). Logs everything to Streaming Notes and marks qualifying items complete
in Apple Reminders.

## Why This Exists

Brady drops reminders throughout the day — pay this bill, check AFLAC, schedule this
appointment. Without scanning, they accumulate. Finn's job is to drain the ones he owns:
log them, act where possible, and close them in Reminders so only non-Finn items remain.

## Execution Environment

Runs on CoWork (Claude Desktop) on Brady's Mac. Uses `osascript` Bash commands for
all Apple Reminders interactions. No additional MCP or infrastructure required.

## Default Scan Targets

```
Lists: Things To Buy, To do, Lily reminders
Priority: Finn (if this list exists — Brady can create it to drop items directly)
Excluded: Reminders (default list — too large, historical, causes AppleEvent timeouts)
```

Brady can add lists by updating `finn.md`. Never scan the "Reminders" default list
unless Brady explicitly requests it by name.

---

## Pre-Flight

1. Get all list names:
   ```bash
   osascript -e 'tell application "Reminders" to get name of every list'
   ```
2. If a `Finn` list exists, prepend it to the scan targets. Note it in output.
3. Load Finn's reference files for enrichment (read-only, no re-scan):
   - `3-reference/skills/financial-assistant/references/accounts-reference.md`
   - `3-reference/skills/financial-assistant/references/budget-targets.md`
   - `portal/public/family/kb/09-activity-details.md`
   - `portal/public/family/kb/06-logistics-contacts.md`

---

## Phase 1: SCAN (Silent)

Run this AppleScript to read incomplete reminders from all target lists:

```bash
osascript << 'APPLESCRIPT'
tell application "Reminders"
  set output to ""
  set targetLists to {"Things To Buy", "To do", "Lily reminders"}
  repeat with lName in targetLists
    try
      set theList to list lName
      set allRems to every reminder in theList
      repeat with r in allRems
        if completed of r is false then
          set rName to name of r
          set rBody to body of r
          if rBody is missing value then set rBody to ""
          try
            set rDue to due date of r as string
          on error
            set rDue to "none"
          end try
          set output to output & lName & "\t" & rName & "\t" & rBody & "\t" & rDue & "\n"
        end if
      end repeat
    on error e
      set output to output & "SKIP:" & lName & ":" & e & "\n"
    end try
  end repeat
  return output
end tell
APPLESCRIPT
```

Parse tab-separated output into a structured array: `{list, name, body, due_date}`.
Skip any lines starting with `SKIP:` (list not found or permission error) — note them in the log.

---

## Phase 2: CLASSIFY

For each reminder, apply the classification matrix below (match on `name + body` combined,
case-insensitive). Produce one classification record per item.

### Classification Matrix

| Category | Keywords / Patterns |
|---|---|
| `bill_pay` | "pay", "bill", "electric", "water", "gas", "mortgage", "insurance", "subscription", "credit card", "invoice", "statement due", "auto-pay", "COBRA", "TriNet", "Betterment", "529" |
| `financial_lookup` | "check balance", "check account", "how much", "runway", "Monarch", "budget", "spending", "IVFH", "quarterly tax", "estimated payment" |
| `medical_insurance` | "AFLAC", "UHC", "OptumRx", "claim", "copay", "insurance card", "reimbursement", "EOB", "medical bill", "pharmacy" |
| `grocery_logistics` | "grocery", "Walmart", "order food", "groceries", "meal plan", "delivery", "household", "pantry" |
| `family_scheduling` | "appointment", "doctor", "dentist", "orthodontist", "pediatrician", "Dr. Savage", "school", "pick up", "drop off", "camp", "activity", "piano", "BJJ", "choir", "voice", "youth group" |
| `consulting_business` | "invoice", "client", "contract", "Panda", "1915", "pitch deck", "send resume", "follow up" |
| `tax` | "quarterly", "estimated payment", "Stephen Butler", "CPA", "1099", "W-2", "tax" |
| `savings_529` | "529", "contribution", "my529", "college fund", "Lily college", "Faith college" |
| `investment` | "IVFH", "Maxim", "board", "shares", "sell", "insider" |

**Classification record (per reminder):**
- `category`: one of the above, or `skip` if no match
- `finn_territory`: `true` if any category matched (not `skip`)
- `action_type`: `execute` | `log_only` | `flag_high_priority` | `skip`
  - `investment` → always `flag_high_priority`
  - `medical_insurance` → `log_only` (never auto-close)
  - everything else in Finn's domain → `execute` (log + mark complete)
- `confidence`: `high` (strong keyword match) | `medium` (partial or contextual match) | `low` (ambiguous)

**Group results:**
- `finn_actions[]` — `finn_territory: true`, `action_type: execute`, `confidence: high/medium`
- `finn_flags[]` — in-scope but needs Brady's eyes (`flag_high_priority`, `log_only`, or `confidence: low`)
- `skip[]` — out of scope, do not touch

---

## Phase 3: EXECUTE

### Mark-Complete Gate

Only mark a reminder complete in Apple Reminders if ALL of the following:
1. `finn_territory: true`
2. `action_type: execute` (not `flag_high_priority` or `log_only`)
3. `confidence: high` or `medium`
4. Item successfully logged to Streaming Notes first (log, THEN close)

### Mark-Complete AppleScript

**Always use object reference loop — NOT name-string addressing (that pattern errors with -10006):**

```bash
osascript << 'APPLESCRIPT'
tell application "Reminders"
  tell list "LIST_NAME_HERE"
    set allRems to every reminder
    repeat with r in allRems
      if name of r is "REMINDER_NAME_HERE" and completed of r is false then
        set completed of r to true
        exit repeat
      end if
    end repeat
  end tell
end tell
APPLESCRIPT
```

Replace `LIST_NAME_HERE` and `REMINDER_NAME_HERE` at runtime.

### Per-Category Actions

**`bill_pay`:**
- Log to Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`):
  - Type: "Task", Status: "Not Started"
  - Name: `[reminder name]`
  - Body: `[From Apple Reminders — LIST_NAME] Due: DUE_DATE. Category: bill_pay. Auto-logged by Finn.`
  - Tags: ["Finn", "Reminders", "Bill Pay"]
- Cross-check against `financial-assistant` upcoming obligations — if already there, note the duplicate in the body
- Mark complete in Apple Reminders

**`financial_lookup`:**
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Financial"])
- If it's an actionable lookup (balance, runway), execute it in the same session and note the result in the Streaming Note body
- Mark complete in Apple Reminders

**`family_scheduling`:**
- Append to `portal/public/family/kb/12-open-loops.md`
- If it names a specific kid + activity or appointment, update `09-activity-details.md` or `06-logistics-contacts.md` as appropriate
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Family Ops"])
- Mark complete in Apple Reminders

**`grocery_logistics`:**
- If recurring pattern: append to `portal/public/family/kb/14-walmart-subscriptions.md`
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Grocery"])
- Mark complete in Apple Reminders

**`medical_insurance`:** (`log_only` — never auto-close)
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Medical"], Priority: "Must")
- Do NOT mark complete — Brady must submit the claim or take the action
- Move to `finn_flags[]`

**`consulting_business`:**
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Consulting"])
- Mark complete only if it's a log-this or schedule-this task (not an outbound action like "send invoice")
- Outbound actions (send, call, submit) → `log_only`, move to `finn_flags[]`

**`tax`:**
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "Tax"])
- Mark complete only for low-risk lookup tasks; leave open if it requires Brady + Stephen Butler

**`savings_529`:**
- Log to Streaming Notes (Type: "Task", Tags: ["Finn", "Reminders", "529"])
- Mark complete if it's informational; leave open if it requires a contribution action

**`investment`:** (always `flag_high_priority`)
- Log to Streaming Notes (Type: "Task", Priority: "Must", Tags: ["Finn", "Reminders", "IVFH"])
- Do NOT mark complete — insider trading rules, board status check required
- Surface at top of `finn_flags[]` output

---

## Phase 4: LOG SUMMARY

Write one Streaming Note for the full scan run:

```
Type: Thread Log
Name: Reminders Scan — YYYY-MM-DD
Tags: ["Finn", "Reminders Scan", "Auto-Run"]
Status: Complete
Done: __YES__
Body:
  ## Scan Summary
  Lists scanned: [names]
  Total incomplete reminders found: N
  Finn-territory items: N
  Flagged for Brady: N
  Skipped (out of scope): N

  ## Actions Taken
  • [reminder name] — [category] — logged to Streaming Notes — marked complete: yes/no

  ## Flagged for Brady
  • [reminder name] — [category] — [why it needs Brady's eyes]

  ## Marked Complete in Apple Reminders
  [list of reminder names]
```

---

## Phase 5: REPORT

### Standalone Mode (full output)

```
───────────────────────────────────────────────────
APPLE REMINDERS SCAN — [date]
───────────────────────────────────────────────────
Scanned: [list names] ([N] incomplete total)
Finn-territory: [N] items processed
Flagged for Brady: [N] items

PROCESSED (logged + marked complete):
• [reminder name] — [category] → [what Finn did]

FLAGGED (needs your eyes):
• [reminder name] — [category] → [why]

SKIPPED ([N] out of scope):
[brief summary if any are ambiguous]
```

If `Finn` list doesn't exist: include at the bottom —
> Tip: Create a "Finn" list in Apple Reminders to drop items directly for me.

### Compact Mode (for sweep embed)

```
🔔 Reminders: N Finn-territory (N processed · N flagged)
```

If 0 items found: omit the line entirely.
If flagged items exist: surface each as a bullet.

---

## Edge Cases

- **List not found:** skip silently, note in scan summary log
- **AppleEvent timeout on a list:** skip that list, note in log, do not halt the skill
- **Reminder with no name:** skip
- **Duplicate reminder names in same list:** the mark-complete `exit repeat` closes the first match — acceptable behavior
- **Low confidence items:** log but do NOT mark complete — surface in `finn_flags[]` for Brady to confirm
- **"Reminders" default list requested by name:** warn Brady that this list is excluded by default due to size/age. Brady must explicitly confirm before scanning it.

## What This Skill Does NOT Do

- Does not scan the "Reminders" default list without Brady's explicit per-session request
- Does not create new reminders (read + mark-complete only)
- Does not send messages, make calls, or take outbound actions on Brady's behalf
- Does not auto-close medical/insurance items — those need Brady to submit the claim
- Does not auto-close investment (IVFH) items — insider trading rules require Brady's review
