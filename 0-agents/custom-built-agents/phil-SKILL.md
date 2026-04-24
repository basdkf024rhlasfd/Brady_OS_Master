---
name: phil-pre-sweep
trust_tier: T1
description: >
  Phil's 4 AM Notion grooming + morning-sweep primer. Runs daily before the
  6 AM morning sweep. Scans every Notion DB, reconciles deterministic Done/Status
  mismatches, surfaces carryover loops, 7-day horizon, cross-DB coherence flags,
  and proposed TOP 3 candidates. Writes a persistent markdown backup and a
  single Notion "Pre-Sweep Primer" row that morning sweep reads in its new
  Phase 1.0b to start the day with intent instead of a cold scan.

  Trigger this skill whenever Brady says "run phil", "phil sweep", "phil pre-sweep",
  "phil audit", "phil primer", "groom notion", "pre-sweep", "prime the sweep",
  or any variation requesting the daily Notion grooming + morning-sweep primer pass.

  This skill owns the 4 AM daily grooming pass. It does NOT own weekly
  Streaming Notes audits (`streaming-notes-disposition-audit`), daily per-Type
  processing inside morning sweep (`streaming-notes-processor`), or weekly
  project-page audits (`client-project-cleanup`).
---

# Phil Pre-Sweep — Daily Notion Grooming + Morning Sweep Primer

## Doctrine Banner — Read First

This skill is **named for Phil** (the ChatGPT-based coherence agent) but
executes as a **Claudine-tier bounded SOP** in the Conductor / CoWork
environment. Phil the agent remains **non-executing** per Amendment 1 —
he cannot directly operate Notion.

The skill borrows Phil's **lens** (coherence, category errors, assumption
checking, authority-horizon framing) and applies it to a narrow,
deterministic cleanup pass. It does not claim Phil himself writes to
Notion. If the Council rejects the naming pattern at a future doctrine
review, the file renames to `pre-sweep-primer-SKILL.md` with no other
changes.

## Why This Exists

Morning sweep currently starts cold at 6 AM. It rescans every Notion DB
from scratch, re-derives today's priors, and gets no head-start on
carryover loops or the 7-day horizon. Existing cleanup coverage is
weekly (disposition-audit, client-cleanup) or embedded in the sweep
itself (streaming-notes-processor runs as Phase 3.6d, mid-sweep). There
is no pre-sweep daily pass that normalizes fields, reconciles
deterministic mismatches, and pre-computes signal the sweep can start
with.

Phil Pre-Sweep fills that gap. By 4:05 AM: a dated markdown backup
exists, one Notion row is primed for morning sweep to consume, and the
sweep starts Phase 1 with TOP 3 candidates, carryover items, horizon
events, and coherence flags already surfaced.

## Execution Environment

**Runs on:** Conductor remote agent (scheduled via `/schedule`). CoWork
desktop is unreliable at 4 AM (laptop asleep, overnight updates).
GitHub Actions lacks Notion MCP — rule it out.

**Access needed:** Notion MCP, local git repo write access, file system

**Scheduled:** Daily at `0 4 * * *` CT — 4:00 AM

**Expected runtime:** 2–4 minutes

**Notion DB IDs** (canonical from `3-reference/infrastructure-registry.yml`):
- Streaming Notes: `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`
- Routing Log (markdown table on a page, not a DB): `344ed43b-89c5-816a-ab54-ca49ca239748`
- Rules & Preferences: `344ed43b-89c5-813d-bded-f1d5689510e2`
- Internal Projects: `2c2ed43b-89c5-80af-ac9b-ededd48b98e7`
- Client Projects: `c8a6b2d70d9343839a16c950c95a6066`
- Life Events: `c5ce4840162c4702a629081d66492760`

**Output locations:**
- Backup (persistent, gitted): `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md`
- Notion handoff: one new Streaming Notes row per run, `Type="Pre-Sweep Primer"`
- Routing Log: one row documenting the run

## Pre-Flight (Silent)

Run these checks in parallel. If any fail, degrade gracefully — never
crash the morning sweep.

1. Confirm Notion MCP is available.
2. Confirm git access — `git log -1`.
3. Ensure `1-execution/areas/brady-os/phil-morning-audits/` exists; create if missing.
4. Compute today's date (YYYY-MM-DD, CT) — used for filename + Notion row name + Life Events horizon.
5. Create the backup file at `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md` with an initial header block (`STATUS: running`). Every subsequent step writes into this file first, Notion second. If any Notion write fails, update the header to `STATUS: partial — [reason]` and skip remaining writes.

## Phase 1 — Scan (Read-Only)

Gather raw data from every surface. No writes in this phase.

### 1.1 Streaming Notes full state

Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for items where `Status NOT IN ["Complete", "Remove"]`. Bucket by Type:

- Daily State, Thread Log, Pulse Note, Build Request, System Instruction, Task, To Do, Note, Sweep Feedback, Phil Flag

For each item capture: id, name, Type, Status, Priority, Next Action, Last Modified, Done, Created, Source.

### 1.2 Done / Status reconcile candidates

From 1.1, identify rows where exactly one of these is true:
- `Status = "Complete"` AND `Done != "__YES__"`, OR
- `Done = "__YES__"` AND `Status NOT IN ["Complete", "Remove"]`

These are the ONLY items Phil writes to in Phase 2. Cache the list.

### 1.3 Field normalization candidates (propose only)

From 1.1, identify rows missing any of: `Status`, `Priority`, `Type`.
Capture proposed defaults:
- Missing `Status` → propose `"Not Started"`
- Missing `Priority` → propose `"Should"`
- Missing `Type` → leave blank, flag for Brady review (never auto-propose a Type)

### 1.4 Carryover candidates

From 1.1, identify items where `Status = "In Progress"` AND `Last Modified < yesterday end-of-day`. These are loops that opened and didn't move. Cap at 10 items, oldest first.

### 1.5 Life Events — 7-day horizon

Query Life Events DB (`c5ce4840162c4702a629081d66492760`) for events with start date within [today, today+7 days]. Capture: name, date, days-until, owner, prep status.

### 1.6 Cross-DB coherence flags (read-only)

Apply Phil's lens. Flag (not fix):
- Active Internal or Client Projects with no Streaming Notes activity in the last 7 days (possible stalled project)
- Rules & Preferences rows that look like duplicates or contradictions of existing rows (simple text-similarity check — no LLM-scale inference)
- Routing Log rows from the last 7 days with `destination="Rules & Preferences"` but no corresponding row on the R&P page (possible routing gap)

Cap each category at 5 items. These are PROPOSED flags — Brady dispositions them in morning sweep or weekly sweep.

### 1.7 Proposed TOP 3 candidates

Synthesize from 1.4 (carryover) + 1.5 (horizon within 3 days) + 1.1 (Must-priority open items) + any Phil Flags from 1.6. Pick 3, ranked, with a one-line why for each. This is a PROPOSAL — morning sweep Phase 2 may override with stronger signal from its own scans.

## Phase 2 — Autonomous Writes (Narrow, Deterministic, Reversible)

Phil writes exactly ONE class of thing autonomously: Done/Status reconciles.

### 2.1 Hard stop check

If `len(reconcile_candidates from 1.2) > 20`: abort the reconcile step, write `⚠️ Hard stop: [N] Done/Status mismatches — structural problem, not grooming` into the backup file, and skip to Phase 3. A volume that high signals something broken upstream.

### 2.2 Reconcile Done ↔ Status

For each row in 1.2:
- If `Status = "Complete"` AND `Done != "__YES__"` → set `Done = "__YES__"`
- If `Done = "__YES__"` AND `Status NOT IN ["Complete", "Remove"]` → set `Status = "Complete"`

Log every write to the backup file in an `AUDIT` block: `id | name | before | after`.

### 2.3 Nothing else

Phil writes NOTHING else in this phase. All other grooming is proposed in Phase 3, acted on by Brady or morning sweep.

## Phase 3 — Proposals (No Writes)

Everything in Phase 3 lands in the backup file and in the Notion primer body. Morning sweep reads and acts — or Brady does.

### 3.1 Field normalization proposals
From 1.3. Emit a bulleted list: `[item name] — missing [field], propose [default]`.

### 3.2 Carryover proposals
From 1.4. Emit a bulleted list: `[item name] | [days since last move] | Priority: [priority]`.

### 3.3 7-day horizon
From 1.5. Emit: `[date] ([days] days) | [event name] | owner: [owner] | prep: [status]`.

### 3.4 Coherence flags
From 1.6. Emit prose in Phil's voice — short, framed as questions or tensions, not checklists. Example: "Panda project: no Streaming Notes activity in 11 days. Is it stalled, waiting on James, or quietly shipped? The calendar still shows the April 22 meeting live."

### 3.5 Calendar headlines
Query today + tomorrow across all three calendars (same calendars morning sweep uses — primary, bradysmallz@gmail.com, family13834007621771747799@group.calendar.google.com). Surface 1–3 events that look high-signal: client meetings, kid logistics changes, travel, financial deadlines. Skip routine logistics (school, Get Ready, Email Catchup).

### 3.6 Proposed TOP 3
From 1.7. Emit three ranked items with one-line why each.

## Phase 4 — Write Output

Two destinations.

### 4.1 Backup file (persistent, gitted)

Finalize `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md` with this structure:

```markdown
# Phil Pre-Sweep — YYYY-MM-DD

STATUS: complete | partial — [reason]
Runtime: [N] minutes
Generated: [ISO timestamp]

---

## Proposed TOP 3 Candidates
1. [item] — [why]
2. ...
3. ...

## Carryover From Yesterday
- [item] | [N] days since last move | [priority]

## 7-Day Horizon (Life Events)
- [date] ([N] days) | [name] | [owner] | prep: [status]

## Calendar Headlines (today + tomorrow)
- [time] | [title] | [calendar]

## Coherence Flags (Phil's Lens)
[prose paragraphs, not lists]

## Field Normalization Proposed (needs Brady approval)
- [item] — missing [field], propose [default]

## Autonomous Reconciles Executed
| id | name | field | before | after |
|---|---|---|---|---|

## Cross-DB Flags
- **Stalled projects:** ...
- **R&P duplicates/contradictions:** ...
- **Routing Log gaps:** ...

---

_Morning sweep reads the Notion primer row (Streaming Notes, Type="Pre-Sweep Primer", today) in Phase 1.0b. This backup is the full-detail archive — reference it with `git show` if needed._
```

### 4.2 Notion primer row (handoff)

Create ONE new row in Streaming Notes DB:
- `Type = "Pre-Sweep Primer"`
- `Name = "Pre-Sweep Primer — YYYY-MM-DD"`
- `Status = "Not Started"`
- `Priority = "Must"`
- `Source = "Phil Pre-Sweep"`
- Body = the **Starter Block**:

```
## Phil's Pre-Sweep Primer — YYYY-MM-DD

PROPOSED TOP 3:
1. [item] — [why]
2. ...
3. ...

CARRYOVER: [N items]
- [brief list]

WITHIN-7-DAY HORIZON:
- [brief list]

CALENDAR HEADLINES:
- [brief list]

COHERENCE FLAGS:
[1–3 short framings in Phil's voice]

CLEANUP EXECUTED:
- Done/Status reconciled on [N] items

CLEANUP PROPOSED (awaiting Brady):
- [N] items missing Status/Priority — see backup

BACKUP: 1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md
```

## Phase 5 — Routing Log

Append ONE row to the Routing Log page (`344ed43b-89c5-816a-ab54-ca49ca239748`) per `3-reference/skills/_shared/routing-log.md`:

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Original Title | `Phil Pre-Sweep run — YYYY-MM-DD` |
| Original ID | — |
| Source Type | Pre-Sweep Primer |
| Routed To | Streaming Notes (primer row) + `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md` |
| Destination ID | [new primer row page ID] |
| Why | Daily 4 AM grooming + morning-sweep priming |
| Summary | Reconciled [N] Done/Status mismatches; surfaced [N] proposals; proposed TOP 3: [one-line headline]. |

If Phase 2 hit the hard stop (>20 reconciles), include that in the Summary.

## Phase 6 — Report Back

Emit one line to the caller (parity with commissioner-brief, pipeline-dashboard, disposition-audit):

```
Phil Pre-Sweep: [STATUS]. Reconciled [N], proposed [M]. Primer: Streaming Notes / Pre-Sweep Primer — YYYY-MM-DD. Backup: 1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md
```

## Safety Rails

- **Autonomous writes are exactly ONE class:** Done ↔ Status reconciles in Streaming Notes. Nothing else. Every reconcile is logged to the backup file with before/after values for rollback via `git show`.
- **Hard stop at 20 reconciles per run.** Above that threshold, abort the reconcile step and flag — it signals something structural, not grooming.
- **Never touches:** Rules & Preferences page content, Internal/Client Projects page content, Routing Log rows (except appending the one run-summary row), any Task Next Action field, any `Status` other than reconciling a Done mismatch, any Streaming Note body other than the new primer row it creates.
- **Backup-first writes.** The backup file is written before Notion writes. If any Notion write fails mid-run, the file header gets `STATUS: partial — [reason]` and subsequent Notion writes abort gracefully. Morning sweep sees "no primer" and proceeds normally.
- **Graceful no-op.** If Phil Pre-Sweep fails to run entirely (Conductor trigger missed, MCP unavailable), morning sweep logs `⚠️ No pre-sweep primer today` in Phase 1.0b and proceeds with its standard scan. The primer is additive, never a dependency.
- **No duplicate primer rows.** If a `Type="Pre-Sweep Primer"` row already exists for today, Phil overwrites the body in place rather than creating a second row. Morning sweep reads the most recent per-day row.

## Rules

- One run per day under normal flow. Safe to re-run manually — the backup file is overwritten, the Notion primer is overwritten in place.
- The backup file is gitted. Expect one commit per day from the Conductor remote agent on a `phil-pre-sweep/auto` branch (or direct to main if Brady prefers). Brady decides the commit strategy at scheduling time; this skill writes the file either way.
- Phil's **voice** in the Coherence Flags section: prose, short, framed as tensions or questions. No checklists. No pep talks. Non-motivational.
- The skill degrades section-by-section. If the Life Events query fails, the 7-day horizon section reads `_(unavailable this run)_` — the rest still ships.

## Integration with Morning Sweep

Morning sweep has a new **Phase 1.0b** (inserted immediately after Phase 1.0 Rules & Preferences load, before Phase 1.1 Gmail Scan):

> Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for `Type="Pre-Sweep Primer"` created today. If found: read the body, hold PROPOSED TOP 3 as priors for Phase 2's TOP 3 (override only with stronger signal from today's full scan), carry CARRYOVER / HORIZON / COHERENCE FLAGS forward into the relevant Phase 2 sections, and mark the primer `Status=Complete, Done=__YES__` at sweep end. If no primer: log `⚠️ No pre-sweep primer today` in the brief and proceed normally.

Morning sweep's Phase 2 TOP 3 section includes the note `(seeded from Phil primer where applicable)`.

The integration is one-way: Phil writes, morning sweep consumes. Morning sweep does not depend on the primer — it only benefits from it when present.

## Scheduling

Wire the 4 AM trigger via Brady's `/schedule` skill:

```
/schedule
Name: Phil Pre-Sweep
Cron: 0 4 * * *    # 4:00 AM CT daily
Command: invoke phil-pre-sweep skill
```

First 3 days after scheduling: monitor runs manually before trusting unattended. Check the backup file, the Notion primer row, and the Routing Log row after each run.

## What This Skill Does NOT Do

- Does not duplicate `streaming-notes-disposition-audit` (weekly, surfaces stale, Brady dispositions)
- Does not duplicate `streaming-notes-processor` (runs mid-sweep as Phase 3.6d, per-Type SLA actioning)
- Does not duplicate `client-project-cleanup` (weekly Sunday project-page audit)
- Does not write to Rules & Preferences, Projects, Life Events page content, or any Task Next Action field
- Does not send email, render PDF, or publish to mception.ai
- Does not modify morning sweep's Phase 2 TOP 3 — it only proposes; morning sweep decides
- Does not claim Phil-the-agent executed anything (see Doctrine Banner)
- Does not auto-propose a `Type` for Streaming Notes items missing one (Types carry meaning; Brady assigns)

## Data Dependencies

- **Reads:** Streaming Notes DB, Life Events DB, Internal Projects DB, Client Projects DB, Rules & Preferences page, Routing Log page, Google Calendar (3 calendars), local git
- **Writes:** Streaming Notes DB (one primer row per run + N Done/Status reconciles, capped at 20); Routing Log page (one run-summary row); local file at `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md`
