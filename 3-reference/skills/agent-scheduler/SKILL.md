---
name: agent-scheduler
description: >
  Creates new scheduled agent skills following Brady OS conventions (Phil/Finn pattern).
  Produces: structured SKILL.md, Notion-backed operating instructions pattern, CLAUDE.md
  registry line, scheduling checklist, and first-run verification protocol.

  TRIGGER whenever Brady says: "create a scheduled agent", "set up a new scheduled skill",
  "I want something to run every night at X", "build me a [name] agent that runs at [time]",
  "new scheduled skill", or any request to build a new recurring automated agent/skill.
---

# Agent Scheduler

SOP for creating, structuring, and launching a new scheduled agent in Brady OS. Follows
the exact conventions established by Phil Pre-Sweep (phased structure) and Finn
(Notion-backed operating instructions). Every scheduled agent created with this skill will
look and behave the same way — same phase pattern, same safety rails, same output conventions,
same first-run checklist.

---

## When to Use This Skill

Use agent-scheduler (not a plain new skill) when the work is:

- **Recurring and unattended** — runs on a cron schedule without Brady triggering it
- **Output feeds another skill** — Phil feeds morning-sweep; Finn feeds morning/weekly-sweep
- **Writes anything autonomously** — any agent that touches Notion, files, or email without Brady review needs the full safety-rail structure

A one-off SOP that Brady manually invokes → plain skill. Something that fires at 4 AM and
touches Notion on its own → agent-scheduler pattern.

---

## Step 1 — Gather Inputs

Before writing anything, prompt Brady for (or infer from context):

| Input | Example | Notes |
|-------|---------|-------|
| Agent name | `phil-pre-sweep` | kebab-case; used in file paths and registry |
| Persona? | Phil / Finn / none | If persona: files go in `0-agents/custom-built-agents/`. If no persona: files go in `3-reference/skills/[name]/` |
| What it reads | Streaming Notes DB, Gmail, Calendar | List every MCP + data source |
| Autonomous writes | Done/Status reconciles only | Be narrow — Brady will tighten further |
| Proposals only | Field normalization, TOP 3 | Never auto-applies |
| Output destinations | Backup file path, Notion row Type, dashboard | All three per run |
| Schedule | `0 9 * * *` UTC = 4 AM CT | Always express in UTC + CT human-readable |
| Consumes by | morning-sweep Phase 1.0b | Which skill reads its output |
| Hard-stop threshold | 20 reconciles | Volume anomaly limit for autonomous writes |

If any input is missing or ambiguous, ask before writing. A bad scope definition is the most
common cause of an agent that does too much on first run.

---

## Step 2 — Choose: Inline SOP vs. Notion-Backed

| Signal | Use Inline | Use Notion-Backed |
|--------|------------|-------------------|
| SOP length | < 60 lines of phases | > 100 lines, multiple run modes |
| Evolution rate | Stable — rarely changes | Will evolve as you learn |
| Run modes | One mode | morning-summary / weekly-summary / full etc. |
| Example | simple nightly file archiver | Finn (4 modes, evolving guardrails) |

**Inline** — write the full phase SOP in the SKILL.md itself. Simpler, everything in one place.

**Notion-backed** — SKILL.md is a thin wrapper (< 100 lines). Full SOP lives in a Notion page
fetched at runtime. Add this block at the top of the SKILL.md body:

```markdown
> **Operating instructions live in Notion.** Fetch page `[PAGE_ID]` at the start of every run.
> Section 0 contains the full SOP: Pre-Flight, Phase 1–N, output templates, guardrails, and
> all run modes. This file is the interface reference only — edit behavior in Notion, not here.
```

And the Conductor routine instruction becomes:
```
You are [Agent Name], Brady Smallwood's [role]. This is a scheduled [description] run.

Fetch Notion page [PAGE_ID]. Section 0 contains your complete operating instructions.

Run in [mode] mode.
```

---

## Step 3 — Phase Structure Template

Copy this scaffold and fill in the blanks. Delete phases that don't apply (some agents have no
autonomous writes; skip Phase 2 entirely rather than leaving it empty).

```markdown
## Pre-Flight (Silent)

Run these checks in parallel. If any fail, degrade gracefully.

1. Confirm [MCP tools] are available.
2. Confirm git access — `git log -1`.
3. Ensure `[output dir]` exists; create if missing.
4. Compute today's date (YYYY-MM-DD, CT).
5. Create backup file at `[output path]/YYYY-MM-DD.md` with header `STATUS: running`.
   All subsequent steps write to this file first, Notion second.
   If any Notion write fails: update header to `STATUS: partial — [reason]`, abort further Notion writes.

## Phase 1 — Scan (Read-Only)

Gather raw data. No writes in this phase.

### 1.1 [Data source]
[What to query, what fields to capture, what to bucket by]

### 1.2 [Derived candidates]
[What to identify from 1.1 as candidates for Phase 2 or Phase 3]

## Phase 2 — Autonomous Writes (Narrow, Deterministic, Reversible)

[Agent name] writes exactly ONE class of thing autonomously: [describe].

### 2.1 Hard stop check
If `len([candidates from 1.N]) > [THRESHOLD]`: abort this phase, write
`⚠️ Hard stop: [N] [items] — structural problem, not grooming` to backup file, skip to Phase 3.

### 2.2 [Write action]
For each row in 1.N:
- [condition] → [write action]
Log every write to backup file in an `AUDIT` block: `id | name | before | after`.

### 2.3 Nothing else
[Agent name] writes NOTHING else in this phase.

## Phase 3 — Proposals (No Writes)

Everything in Phase 3 lands in the backup file and Notion primer body only.
[Consuming skill] reads and acts — or Brady does.

### 3.1 [Proposal type]
From 1.N. Emit: [format]

### 3.2 [Proposal type]
From 1.N. Emit: [format]

## Phase 4 — Write Output

Two destinations. Backup file first, always.

### 4.1 Backup file (persistent, gitted)

Finalize `[output path]/YYYY-MM-DD.md`:

\`\`\`markdown
# [Agent Name] — YYYY-MM-DD

STATUS: complete | partial — [reason]
Runtime: [N] minutes
Generated: [ISO timestamp]

---

## [Primary output section]
[content]

## Audit Log
| id | name | field | before | after |
|---|---|---|---|---|
\`\`\`

### 4.2 Notion handoff row

Create ONE new row in [DB Name] (`[DB_ID]`):
- `Type = "[Handoff Type]"`
- `Name = "[Agent Name] — YYYY-MM-DD"`
- `Status = "Not Started"`
- `Priority = "Must"`
- `Source = "[agent-name]"`
- Body = Starter Block:

\`\`\`
## [Agent Name] Primer — YYYY-MM-DD

[KEY SECTION 1]: [N items]
- [brief list]

[KEY SECTION 2]:
- [brief list]

EXECUTED:
- [N] [autonomous actions] completed

PROPOSED (awaiting Brady):
- [N] [proposed actions] — see backup

BACKUP: [output path]/YYYY-MM-DD.md
\`\`\`

## Phase 5 — Routing Log

Append ONE row to Routing Log page (`344ed43b-89c5-816a-ab54-ca49ca239748`)
per `3-reference/skills/_shared/routing-log.md`:

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Original Title | `[Agent Name] run — YYYY-MM-DD` |
| Source Type | [Handoff Type] |
| Routed To | [DB Name] (handoff row) + `[output path]/YYYY-MM-DD.md` |
| Destination ID | [new row page ID] |
| Why | [one-line purpose] |
| Summary | [N] [actions]; [N] proposals; [one-line headline]. |

## Phase 6 — Report Back

Emit one line to the caller:

\`\`\`
[Agent Name]: [STATUS]. [N] [autonomous actions], [M] proposals. Primer: [DB] / [row name]. Backup: [output path]/YYYY-MM-DD.md
\`\`\`
```

---

## Step 4 — Safety Rails (Non-Negotiables)

Every scheduled agent must have all five. Document them explicitly in the SKILL.md under a
"Safety Rails" section:

1. **Backup-first writes.** The local file is written before any Notion write. If a Notion
   write fails mid-run, the file header gets `STATUS: partial — [reason]` and subsequent
   Notion writes abort. The consuming skill still gets "no primer" behavior and proceeds
   normally.

2. **Hard stop on volume anomalies.** Pick a threshold appropriate to the agent's domain
   (Phil: 20 reconciles, Finn: configurable). Above threshold, abort autonomous writes and
   flag — it signals something structural upstream, not normal operating variation.

3. **Graceful no-op.** The consuming skill (morning-sweep, etc.) must never depend on this
   agent's output. It only benefits when the output is present. Add a fallback branch to the
   consuming skill: `if no [handoff row today]: log ⚠️ No [agent name] primer today and proceed`.

4. **No duplicate rows.** Before creating any Streaming Notes row, query for an existing row
   with `Type="[Handoff Type]"` and today's date. If found: overwrite the body in place, do
   not create a second row. Morning sweep reads the most recent per-day row.

5. **Narrow write scope.** Spell out explicitly what the agent writes and what it never
   touches. Example: "Writes ONLY: Done/Status reconciles in Streaming Notes (capped at 20),
   one primer row, one Routing Log row, one backup file. Never touches: Rules & Preferences
   content, Project page content, Task Next Action fields."

---

## Step 5 — Output File Convention

All scheduled agents write a dated markdown backup to git. Standard path and structure:

**Path:** `1-execution/areas/brady-os/[agent-name]-[output-type]/YYYY-MM-DD.md`

Examples:
- `1-execution/areas/brady-os/phil-morning-audits/2026-04-23.md`
- `1-execution/areas/brady-os/finn-snapshots/2026-04-23.md`

**Header block (always first):**
```markdown
# [Agent Name] — YYYY-MM-DD

STATUS: complete | partial — [reason]
Runtime: [N] minutes
Generated: [ISO timestamp]

---
```

**Section order (use what applies):**
1. Proposed TOP 3 / primary recommendations
2. Carryover / stale items
3. Horizon / upcoming events
4. Calendar headlines
5. Coherence flags / anomalies (prose, not checklists)
6. Proposals awaiting Brady approval
7. Autonomous Reconciles / Executed Actions (audit log table)
8. Cross-DB / cross-source flags

**Footer (always last):**
```markdown
---

_[Consuming skill] reads the Notion handoff row (Streaming Notes, Type="[Type]", today) in
Phase X.Yb. This backup is the full-detail archive._
```

---

## Step 6 — Streaming Notes Handoff Row Fields

Standard fields for any agent that creates a Streaming Notes row consumed by morning or
weekly sweep:

| Field | Value |
|-------|-------|
| `Type` | Choose a unique type for this agent (e.g., `"Pre-Sweep Primer"`, `"Financial Primer"`) |
| `Name` | `"[Agent Name] — YYYY-MM-DD"` |
| `Status` | `"Not Started"` |
| `Priority` | `"Must"` |
| `Source` | `"[agent-name]"` (kebab-case, matches SKILL.md name) |
| `Done` | leave blank |
| Body | Starter Block (compact — consuming skill reads and expands) |

Consuming skill marks `Status = Complete, Done = __YES__` at end of its run to signal
the row was consumed. This keeps the DB clean and prevents duplicate primer reads.

---

## Step 7 — CLAUDE.md Registry Entry

Add one line to the Skills Registry section in `CLAUDE.md`. Follow the same format as
adjacent entries:

**For an agent with persona** (files in `0-agents/custom-built-agents/`):
```
- **[Agent Name]:** `0-agents/custom-built-agents/[name]-SKILL.md` — [one-line description].
  [Trigger phrases]. Wired into [consuming skill] as Phase X.Yb.
```

**For a pure skill** (files in `3-reference/skills/[name]/`):
```
- **[Skill Name]:** `3-reference/skills/[name]/SKILL.md` — [one-line description].
  [Trigger phrases]. Scheduled: [human-readable cron]. Feeds [consuming skill].
```

Place the entry adjacent to related entries (e.g., a sweep-primer goes near Phil and
morning-sweep; a financial agent goes near Finn).

---

## Step 8 — Scheduling Checklist

Run `/schedule` after the SKILL.md is written and CLAUDE.md is updated.

Required inputs for `/schedule`:
```
Name: [Human-readable name, e.g., "Phil Pre-Sweep"]
Cron: [UTC expression, e.g., "0 9 * * *"]  ← always UTC, convert from CT
Model: claude-sonnet-4-6
Repo: basdkf024rhlasfd/Brady_OS_Master
Branch: main
MCP: [comma-separated: Notion, Google Calendar, Gmail — only what the agent actually needs]
Prompt: [short instruction block — if Notion-backed, just "Fetch [PAGE_ID] Section 0 and run"]
```

After scheduling:
- [ ] Confirm cron fires at the right CT time. **DST: CDT = UTC−5 (Mar–Nov), CST = UTC−6 (Nov–Mar).** Cron is evaluated in UTC and does not shift itself, so a fixed expression drifts by an hour twice a year — record both expressions in the skill and swap at the changeover. Worked example: 8 PM CT → `0 1 * * *` in CDT, `0 2 * * *` in CST.
- [ ] Verify CLAUDE.md registry entry is committed
- [ ] Verify consuming skill has the integration phase + graceful fallback
- [ ] Note the Conductor dashboard URL for the trigger

---

## Step 9 — First-Run Verification Protocol

After the first scheduled (or manual) run, verify all three artifacts in order:

**1. Backup file**
```bash
ls 1-execution/areas/brady-os/[agent-name]-[output-type]/
# Should show YYYY-MM-DD.md with today's date
cat 1-execution/areas/brady-os/[agent-name]-[output-type]/YYYY-MM-DD.md
# STATUS should be "complete" or "partial — [reason]", not "running"
```

**2. Notion handoff row**
- Query Streaming Notes DB for `Type="[Handoff Type]"` created today
- Confirm: row exists, Name has today's date, Status = Not Started, body has Starter Block
- Confirm: no duplicate rows for the same date

**3. Routing Log row**
- Open Routing Log page (`344ed43b-89c5-816a-ab54-ca49ca239748`)
- Confirm: one new row at top with today's date and correct Summary

**Recovery if partial:**
- `STATUS: partial — [reason]` in the backup file means Notion writes failed after the file was written
- Re-run manually (safe — backup file overwrites, Notion primer overwrites in place, Routing Log gets a second row for the same day which is acceptable)
- If the reason is MCP unavailability: check MCP config in Conductor, then re-run

**After 3 clean runs:** mark the trigger as trusted unattended. Remove from active monitoring.

---

## Step 10 — Integration: Wiring the Consuming Skill

If this agent's output feeds another skill, add an integration phase to that skill's SKILL.md.
Standard pattern (modeled on morning-sweep Phase 1.0b):

```markdown
## Phase X.Yb — [Agent Name] Primer

Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for
`Type="[Handoff Type]"` created today.

If found: read the Starter Block body. [Describe how to use each section — e.g., hold
PROPOSED TOP 3 as priors, carry CARRYOVER forward]. Mark `Status=Complete, Done=__YES__`
at end of this skill's run.

If not found: log `⚠️ No [agent name] primer today` and proceed normally.
```

The integration is always **one-way and additive**: the scheduled agent writes, the consuming
skill reads. The consuming skill never depends on the primer — it only benefits when present.

---

## What This Skill Does NOT Do

- Does not write any code or scripts
- Does not create Notion databases or pages (the agent does that at runtime)
- Does not run `/schedule` — Brady does that after review
- Does not make decisions about autonomous write scope — Brady tightens that in Step 1
- Does not guarantee the agent will work correctly — the first-run verification protocol
  catches issues before trusting unattended operation
