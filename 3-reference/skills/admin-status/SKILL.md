---
name: admin-status
trust_tier: T1
description: >
  Compact OS health snapshot in under 60 seconds. Reads both active engagement
  PROJECT.md files, Streaming Notes pipeline counts, build queue open specs, and
  last git commit. Outputs a single dashboard-style brief. Read-only. No writes.
  Trigger: "status", "/status", "admin status", "os status", "how's the OS doing",
  "quick status", "what's the state of things".
---

# Admin Status Skill

Outputs a compact OS snapshot Brady can read in under 2 minutes. No web calls. No Exa. Reads local files and queries Notion Streaming Notes. Nothing writes.

## When to use

- Start of any session where Brady wants to orient before deciding what to work on
- After a gap of > 1 day to re-orient
- When something feels off and Brady wants a quick system pulse
- Before making a capacity commitment to a client

## Execution

### Step 1 — Read engagement state

Read both project files:
- `1-execution/areas/work-and-business/programs/Consulting/Project - Panda/PROJECT.md`
  - Extract: current phase (from Phase Log section), next open action item with date
- `1-execution/areas/work-and-business/programs/Consulting/Project - 1915 South/PROJECT.md`
  - Extract: current phase, next open action item with date

### Step 2 — Read build queue

Read `3-reference/build-queue/INDEX.md`:
- Count specs with status `open`
- Count specs with status `in-progress`
- Count specs with status `needs-review`

### Step 3 — Query Streaming Notes

Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`):
- Count of items where Status = "Not Started"
- Count of items where Status = "In Progress"
- Count of items where Status = "Blocked"
- List of items where Priority = "Must" AND Status ≠ "Complete" AND Created Date < (today - 3 days) — these are stale Must items

If Notion MCP is unavailable: output `(Streaming Notes unavailable this run)` and proceed with local data.

### Step 4 — Check last commit

Run: `git -C [repo root] log --oneline -1`
Extract: commit date and message (one line).

### Step 5 — Output

```
OS STATUS — [YYYY-MM-DD HH:MM CT]
═══════════════════════════════════════════════════════════════

ACTIVE ENGAGEMENTS
───────────────────────────────────────────────────────────────
Panda          [phase]                [next action + date]
1915 South     [phase]                [next action + date]

[If any next action date is today or tomorrow, append ← HOT]
[If both are in scope-negotiation or active, show:]
⚠️  Both engagements active — confirm capacity scenario before new commitments

PIPELINE (Streaming Notes)
───────────────────────────────────────────────────────────────
Not Started: N  |  In Progress: N  |  Blocked: N
[If any Must-priority items stale > 3 days:]
⚠️  STALE MUSTS: [item name 1], [item name 2]

BUILD QUEUE
───────────────────────────────────────────────────────────────
Open: N  |  In Progress: N  |  Needs Review: N

LAST COMMIT
───────────────────────────────────────────────────────────────
[date] — [commit message, one line]

═══════════════════════════════════════════════════════════════
```

If everything is clean (no HOT dates, no stale Musts, no Blocked items, build queue clear), add one line at the end:
`✓ Clean — no flags.`

If there are flags, list them in a `FLAGS` section before the footer:
```
FLAGS
───────────────────────────────────────────────────────────────
• [flag 1]
• [flag 2]
```

## Safety rails

- Read-only. No file writes, no Notion writes, no git commits.
- If a PROJECT.md file can't be found: output `(PROJECT.md not found — check path)` for that engagement.
- If git log fails: output `(git log unavailable)`.
- Never infer or hallucinate pipeline counts — if Notion is unavailable, say so explicitly.
- Runtime cap: 60 seconds. If any step is taking longer, skip it and note it.

## What this skill does NOT do

- Does not run morning sweep or process Streaming Notes
- Does not invoke project agents or generate SFDRs
- Does not write to Notion, git, or any external system
- Does not replace the full morning sweep — this is a 60-second orientation, not a 45-minute operation
