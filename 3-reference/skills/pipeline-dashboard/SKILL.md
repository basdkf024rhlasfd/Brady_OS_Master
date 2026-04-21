---
trust_tier: T0
---

# Pipeline Dashboard

**Purpose**: Query the Streaming Notes DB and regenerate a live SVG snapshot showing what's sitting at each pipeline stage (In / Processing / Out).

**Triggered by**: Morning sweep, evening sweep, and weekly sweep — runs as a final step after each sweep completes. Can also be run standalone.

**Output**: `.context/streaming-notes-flow-v2.svg` (updated in place)

**Static reference**: `.context/streaming-notes-flow.svg` (v1 — never overwrite)

---

## Step 1: Query Streaming Notes DB

Database ID: `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`

Run three Notion queries in parallel:

### 1a. IN bucket (Status = "Not Started")
```
Filter: Status = "Not Started"
Sort: Created time descending
```
Group results by Type (Pulse Note, To Do, Note, Sweep Feedback, Thread Log, System Instruction, etc.)

### 1b. PROCESSING bucket (Status = "Applied Once" OR "In Progress")
```
Filter: Status IN ["Applied Once", "In Progress"]
Sort: Created time descending
```
Group results by Type.

### 1c. OUT bucket (Status = "Complete" OR "Rejected", last 7 days only)
```
Filter: Status IN ["Complete", "Rejected"] AND Created time >= 7 days ago
Sort: Last edited time descending
```
Group results by Type. Separate Complete from Rejected.

---

## Step 2: Build the counts

For each bucket, calculate:
- **Total item count**
- **Count per Type** (e.g., Pulse Note: 4, To Do: 2, Sweep Feedback: 1)
- **Oldest item age** in the IN bucket (flag if anything > 3 days old)
- **Recent movers** — up to 3 items per bucket, showing Name (truncated to 40 chars) + Type + age

---

## Step 3: Regenerate the SVG

Rewrite `.context/streaming-notes-flow-v2.svg` with the live data. Follow the same three-column layout as the original v2 but replace static descriptions with actual counts and item names.

### Layout spec

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   1. IN          │    │  2. PROCESSING   │    │    3. OUT        │
│   Not Started    │───>│  Applied Once /  │───>│  Complete /      │
│                  │    │  In Progress     │    │  Rejected        │
│  Total: [N]      │    │  Total: [N]      │    │  Total: [N] (7d) │
│                  │    │                  │    │                  │
│  [Type]: [count] │    │  [Type]: [count] │    │  [Type]: [count] │
│  [Type]: [count] │    │  [Type]: [count] │    │  [Type]: [count] │
│  ...             │    │  ...             │    │  ...             │
│                  │    │                  │    │                  │
│  Recent:         │    │  Recent:         │    │  Recent:         │
│  · [name] (age)  │    │  · [name] (age)  │    │  · [name] (age)  │
│  · [name] (age)  │    │  · [name] (age)  │    │  · [name] (age)  │
│  · [name] (age)  │    │  · [name] (age)  │    │  · [name] (age)  │
│                  │    │                  │    │                  │
│  ⚠ Stale: [N]   │    │                  │    │  Rejected: [N]   │
│  (oldest: Xd)    │    │                  │    │                  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### SVG style rules
- Font: Inter / system-ui / sans-serif
- Column backgrounds: IN = light blue (#eff6ff), PROCESSING = light yellow (#fefce8), OUT = light green (#f0fdf4)
- Stale items (>3 days in IN): amber warning badge
- Rejected items: red-tinted row in OUT column
- Timestamp footer: "Last updated: YYYY-MM-DD HH:MM CT — [sweep name]"
- Viewbox: 1100 x 680 (same as v2)

---

## Step 4: Report

After regenerating, output a one-line summary to the sweep:

```
Pipeline: [IN count] waiting → [PROCESSING count] in flight → [OUT count] resolved (7d) | ⚠ [stale count] stale
```

If no stale items, drop the warning.

---

## Edge Cases

- **Empty bucket**: Show "0 items — all clear" in that column
- **Notion query fails**: Keep the existing SVG unchanged, report the failure
- **First run (no existing v2)**: Create from scratch using the layout spec above
- **Very large IN bucket (>20 items)**: Show top 3 recent + "[N] more..." — don't list everything
- **Items with no Name**: Show "[untitled]" with the Type

---

## Routing Log

This skill is read-only — it reports state, it does not disposition items, so it does not write to the Routing Log. If it is ever extended to move, archive, or auto-reject items, each disposition must append a row per `3-reference/skills/_shared/routing-log.md` (DB `344ed43b-89c5-816a-ab54-ca49ca239748`).
