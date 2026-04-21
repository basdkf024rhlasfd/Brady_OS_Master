---
name: life-events-review
description: >
  Weekly 90-day look-ahead of Brady's major life events. Surfaces travel, family
  milestones, college apps, financial meetings, medical dates before they become
  week-of scrambles. Produces a three-tier report (Imminent / Near-term / Horizon)
  with countdown, owner, prep status, blockers, and next prep action. Does NOT
  auto-complete prep or edit calendar — it's a surfacing tool, Brady decides.

  Trigger this skill whenever Brady says "life events review", "life events check",
  "events look-ahead", "what's coming up", or "life events audit".
  Also runs automatically as Phase 2.2c of the weekly-sweep.

  Data sources: dedicated Life Events Notion DB (auto-created on first run) +
  Google Calendar (primary, bradysmallz, family). Output writes to the weekly-sweep
  report AND syncs to portal/public/family/kb/15-life-events.md so the family
  chatbot can answer "what's coming up?" questions.
trust_tier: T1
---

# Life Events Review

The weekly life-event look-ahead. Runs Sunday (inside weekly-sweep) or on demand.
Big events (Lily Europe, college apps, Gulf Shores, financial meetings) land on
the calendar but prep drifts. This skill is the check — every event within 90 days
gets a countdown, an owner, a prep-status flag, and a next prep action.

## Why This Exists

Problem: events land, calendar absorbs them, prep doesn't surface until the week-of.
Brady scrambles. This skill guarantees that each life event is seen every Sunday,
with prep status inspected and new prep tasks pushed back into Streaming Notes so
the next morning-sweep surfaces them.

## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac
**Access needed**: Notion MCP, Google Calendar MCP
**Life Events DB**: see `3-reference/infrastructure-registry.yml` key `life_events_db` (auto-created on first run)
**Streaming Notes DB**: `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`
**Calendars**: `primary`, `bradysmallz@gmail.com`, `family13834007621771747799@group.calendar.google.com`
**Portal KB target**: `portal/public/family/kb/15-life-events.md`
**Scheduled**: Sunday (Phase 2.2c of weekly-sweep), or on demand
**Expected runtime**: 3–5 minutes

## Phase 0: Pre-Flight (Silent)

1. Read `3-reference/infrastructure-registry.yml`. Look for `life_events_db.id`.
2. If the ID is present and populated, continue to Phase 1.
3. If absent or the placeholder string is still there:
   a. Ask Brady once: "No Life Events DB registered yet. OK to create one under the
      Personal area of Notion? (yes / pick parent page / skip)."
   b. On yes, create the DB via `mcp__claude_ai_Notion__notion-create-database` with
      the schema below. Parent defaults to the Consulting Practice wiki's parent
      (Brady's Personal area) unless Brady picks a different parent page.
   c. Write the returned DB ID into `3-reference/infrastructure-registry.yml` under
      the `life_events_db` key.
   d. Prompt Brady to seed the DB with current known events (Lily Europe, college
      apps, Gulf Shores, upcoming financial meetings). The skill does NOT auto-seed —
      Brady enters them so the schema stays intentional.
   e. Exit this run. Next run reads from the now-populated DB.

### DB schema (first-run creation)

- `Name` — title
- `Date` — date (required)
- `Category` — select: Travel | Family Milestone | Financial | School/Academic | Medical | Other
- `Owner` — multi-select: Brady | Karissa | Lily | Faith | Baden | Isla | Miles | Shared
- `Prep Status` — select: Not Started | Prep In Progress | Imminent | Done
- `Prep Checklist` — rich text (markdown bullet list)
- `Blockers` — rich text
- `Notes` — rich text

## Phase 1: Gather

1. Query `life_events_db` for all entries where `Date` is between today and today+90d.
2. Query Google Calendar (three calendars above) for the same 90-day window.
3. Build a merged event set keyed on Name (fuzzy match) + Date:
   - DB entry only → flag "no calendar event"
   - Calendar event only → flag "not tracked in DB"
   - Both present → normal

## Phase 2: Analyze per Event

For each event compute:

- **Countdown** — `Date - today` in days
- **Tier** — Imminent (≤30d), Near-term (31–60d), Horizon (61–90d)
- **Prep Status** — from DB field
- **Next Prep Action** — first unchecked item in `Prep Checklist`, or "(none set)"
- **Blockers** — from DB field
- **Owner(s)** — from DB field
- **Calendar presence** — flag mismatch

## Phase 3: Generate Report

Output this markdown block. It goes two places: (a) the weekly-sweep Phase 4 report
under `👁️ LIFE EVENTS`, and (b) the portal KB file (Phase 4 below).

```
# Life Events — Next 90 Days
**Scanned:** [N] events in DB + [M] calendar matches
**Flagged:** [X] needing prep attention

---

## 🔴 IMMINENT (≤30 days) [N items]
For each:
- **[Name]** — [Date] (T-[N] days) | Owner: [list] | Status: [Prep Status]
  - Next prep: [first unchecked prep item, or "⚠️ no prep set"]
  - Blockers: [list or "none"]
  - [⚠️ no calendar event / ⚠️ not in DB, if applicable]

---

## 🟡 NEAR-TERM (31–60 days) [N items]
Same format as Imminent.

---

## 🟢 HORIZON (61–90 days) [N items]
Condensed: `- **[Name]** — [Date] (T-[N] days) | [Owner] | [Status]`

---

## ⚠️ MISMATCHES
- Calendar events that should probably be tracked in DB: [list]
- DB events with no calendar entry: [list]
```

## Phase 4: Sync Portal KB ⚡ MANDATORY

Overwrite `portal/public/family/kb/15-life-events.md` with a chatbot-friendly version
of the Phase 3 report. Strip the scan-header and mismatches sections; keep only the
three tiers so the family chatbot can answer "what's coming up?" cleanly.

Format:

```markdown
# Life Events — Next 90 Days

Last updated: [ISO timestamp]

## Imminent (next 30 days)
- **[Name]** — [Date] (in [N] days) — [Owner] — [Prep Status]
  - Next prep: [next action]

## Near-term (31–60 days)
[same format]

## Horizon (61–90 days)
[condensed]
```

## Phase 5: Streaming Notes Write-Back

For each Imminent event (≤30 days) where `Prep Status = "Not Started"` AND
`Next Prep Action` is set, write a Streaming Notes row:

- Type: Task
- Name: `Prep: [Event Name] ([Date])`
- Status: Not Started
- Priority: Must
- Source: Cowork
- Content: full event context + the specific next prep action

This guarantees the next morning-sweep picks it up and surfaces it in Brady's daily brief.

Skip this if the skill already created a Streaming Note for this event within the
last 7 days (check by name prefix `Prep: [Event Name]`).

## Phase 6: One-Line Summary to Weekly Sweep

Append to the weekly-sweep `OPEN ITEMS` block:

```
Life Events: [N] in next 90d — [A] imminent, [B] near-term, [C] horizon. [X] prep tasks pushed to Streaming Notes.
```

## Rules

- **Does NOT auto-seed the DB.** Brady enters events. The skill only reads + reports +
  writes prep tasks to Streaming Notes.
- **Does NOT edit calendar.** Mismatches are reported, not resolved.
- **Does NOT change DB entries** except (optionally) updating `Prep Status` from
  "Not Started" → "Imminent" when countdown ≤ 14 days — and only after Brady confirms
  in conversation.
- **Does NOT run more than once per week** (noise prevention) unless explicitly invoked
  on demand.
- **Does NOT create mception.ai surfaces.** Family portal KB write is internal to the
  Clerk-gated portal only.

## What This Skill Does NOT Do

- Does not auto-create prep checklists (Brady writes them in the DB)
- Does not assign owners
- Does not send reminders externally (email, text) — that's Telly's job if wired later
- Does not cross-reference Client Projects DB (life events are personal, not client work)

## Integration With Weekly Sweep

Runs as Phase 2.2c of weekly-sweep, inserted between 2.2b (Family Week Ahead portal
sync) and 2.3 (Project Status). The weekly-sweep `👁️ LIFE EVENTS` section in Phase 4
output is populated by this skill's Phase 3 report.

Standalone trigger: "life events review", "life events check", "events look-ahead",
"what's coming up", "life events audit".

## Degraded Modes

- If Notion MCP is unavailable: write the report to `.context/life-events-[date].md`
  and surface in next morning-sweep.
- If Google Calendar MCP is unavailable: run DB-only. Report at top: "⚠️ Calendar
  data not available — mismatches not checked."
- If the life_events_db ID is missing AND Brady isn't available to confirm creation:
  write a one-line note to the weekly-sweep output: "Life Events Review skipped —
  DB not registered. Run standalone to set up."
