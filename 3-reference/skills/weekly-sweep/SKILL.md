---
name: weekly-sweep
description: >
  Brady's Sunday weekly planning sweep — a comprehensive skill that reviews the full week ahead,
  clears the decks from last week, and sets priorities for the next 7 days. Runs Sundays 3-5 PM CT
  from CoWork. Scans all capture surfaces (Gmail, iMessage, Notion, Calendar, Otter, Monarch),
  reviews project status, family logistics for the week, financial obligations, and produces a
  structured weekly plan that gets written back to the calendar event.

  Trigger this skill whenever Brady says "weekly sweep", "weekly planning", "weekly review",
  "sunday sweep", "run the weekly", "plan the week", "week ahead", "what's this week look like",
  or any variation requesting a comprehensive weekly planning session. Also trigger on
  "run the Sunday planning block" or "execute the weekly event".

  This skill complements the daily morning-sweep. Morning sweep = tactical (today). Weekly sweep =
  strategic (the whole week + trajectory check).
trust_tier: T1
---

# Weekly Sweep

Sunday planning block. Two hours to get ahead of the week so every morning sweep starts clean.

## Why This Exists

Without a weekly rhythm, Brady's ADHD brain treats every Monday like a cold start. The daily
morning sweep handles today — this skill handles the week. It catches things that slip between
daily scans: upcoming deadlines, sitter gaps, project drift, financial items, and strategic
priorities that need protected time.
## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac
**Local access**: iMessage MCP, file system, Notion MCP, Gmail MCP, Otter MCP, Google Calendar
**Scheduled**: Sundays, 3:00–5:00 PM CT
**Calendar event**: 📋 Weekly Planning Sweep (recurring)

## Pre-Flight (Silent)

1. Get today's date, confirm it's Sunday (or adjust if running on a different day)
2. Calculate the week window: Monday through Sunday of the upcoming week
3. Approve any pending MCP prompts (Otter, iMessage)
4. **Pull ALL sweep feedback from the week** — Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`),
   Type="Sweep Feedback", Status in ["Not Started", "Applied Once"]. Separate into:
   - **Task Feedback** (Category="Task") — one-time corrections, already applied. Review for patterns.
   - **Prompt Feedback** (Category="Prompt") — process changes that should become permanent.
   Carry these forward to Phase 4.5 (Prompt Evolution).

## Phase 1: LOOK BACK (Clear the Decks)

### 1.1 Last Week's Unfinished Business
- **Notion**: Query Streaming Notes DB for the past 7 days — find any Thread Logs still "In Progress",
  Pulse Notes still "Not Started", System Instructions not executed
- **Build Requests**: Query `Type = "Build Request"`, `Status` in ["Not Started", "In Progress", "Processing"], created in past 7 days. Count completed vs. carried vs. blocked for the LAST WEEK RETRO.
- **Phil Flags**: Any open flags from the week
- **Email**: Search Gmail for anything > 48 hours old that's still in the "Needs Reply" category
  (i.e., stuff the daily sweep flagged but Brady hasn't handled)
- **Texts**: Scan iMessage for any unanswered questions from key contacts in the last 7 days
### 1.2 Week in Review (Quick Retro)
Summarize the past week in 3-5 bullets:
- What got done (completed threads, shipped projects, closed items)
- What slipped (items that carried over)
- Any patterns worth noting (e.g., "You rescheduled 3 times this week — overcommitted?")

## Phase 2: LOOK AHEAD (Plan the Week)

### 2.1 Full Week Calendar Scan
Query ALL three calendars for Monday through Sunday:
- Primary: `primary`
- Secondary: `bradysmallz@gmail.com`
- Family: `family13834007621771747799@group.calendar.google.com`

For each day, produce a time-blocked summary. Flag:
- **Conflicts**: overlapping events
- **Overloaded days**: more than 5 scheduled items or < 2 hours of open time during work hours
- **Empty days**: potential deep work days — suggest protecting them
- **Missing recurring items**: compare against known weekly patterns
- **Prep required**: anything that needs advance work (meetings, presentations, appointments)
- **Sitter coverage**: cross-reference kid logistics with Serena's availability windows

### 2.2 Family Week Ahead
For each kid and Karissa:
- Activities, practices, games, lessons for the week
- Any school events, early dismissals, field trips (check `references/school-calendar.md`)
- Pickup/dropoff logistics — who drives what, when
- Sitter windows needed vs. available
- Birthdays, deadlines, or special events (check calendar)
### 2.2b Sync Family Week Ahead to Portal KB ⚡ MANDATORY

Write the Family Week Ahead section (step 2.2 output) to:
`portal/public/family/kb/11-week-ahead.md` (relative to repo root)

Format as clean markdown:
```markdown
# Week Ahead

**Week of [Month] [Day]-[Day], [Year]**

Last updated: [timestamp]

## [Day of week] [M/D]
- [time] — [event] ([who]) [notes]

## [Day of week] [M/D]
...

## Open Items This Week
- [ ] ...
```

Include per-kid activities, school events, logistics, sitter windows, and any special events.
This file is read by the mception.ai family chatbot to answer "what's happening this week" questions.

Also refresh `portal/public/family/kb/09-activity-details.md` if any activities have changed
(new class times, dropped activities, new sports/lessons) — compare calendar recurring events
against what's currently in the file.

### 2.3 Project Status Review
Query Notion Projects DB (`2c2ed43b89c580afac9bededd48b98e7`):
- List all active projects with current status
- Flag any that haven't been touched in > 7 days
- Flag any with upcoming deadlines in the next 2 weeks
- Check Conductor.build and GitHub for activity (if accessible)

### 2.4 Financial Week (via Financial Assistant)
- Run the `financial-assistant` skill in `weekly-summary` mode
- Reads Monarch CSV exports from `3-reference/skills/financial-assistant/data/`
- Full analysis: spending by category vs budget, cash flow MTD, consulting revenue,
  upcoming obligations (next 7 days + 30-day horizon), trend detection
- Scans Gmail for invoices/receipts/payments (last 7 days)
- Scans Calendar for all financial events in next 30 days
- Queries Notion consulting pipeline for revenue + pipeline status
- Produces the detailed `💰 FINANCIAL WEEK` block (see Phase 2 output below)
- If no CSV data: falls back to Gmail/Calendar/Notion with degraded output

### 2.5 Otter Review
- Search recordings from the past 7 days
- Flag any with unprocessed action items or instructions
- If instructions exist that should become tasks/projects, list them

### 2.6 Email Cleanup
- Count total unread/unarchived
- Flag any email > 7 days old still needing action
- Identify threads that can be bulk-archived
- Draft replies for the top 3 most overdue items

### 2.7 mception Portal Review
Run the `mception-action-scanner` skill in full mode. Read all YAML files in
`portal/src/config/chat-configs/`, extract `dataSources` where status != "ready".
Include the full report (grouped by status and actor).

Additionally:
- Review whether any "recommended" items should be promoted to "not-started" this week
- Check `git log --since="2 weeks ago" -- portal/src/config/chat-configs/` for items that
  have been "partial" for 2+ weeks without progress — flag as stale
- If any new group pages were added without `dataSources`, note them as candidates for setup

### 2.8 Transparency Audit
- Check `TRANSPARENCY.md` against current repo state
- Look for: new scripts with external reach not yet documented, sensitive data in tracked files, hardcoded IDs not in `infrastructure-registry.yml`, new autonomous behaviors without audit trails
- If drift found, flag it in the Phase 4 report

## Phase 3: SET PRIORITIES

### 3.1 Weekly TOP 5
Based on everything scanned, propose the 5 most important things for the week.
Weight by: deadlines, strategic value (Broker Co / revenue), family obligations, health.
Format:
```
🎯 WEEKLY TOP 5
1. [thing] — why it matters — suggested day/block
2. [thing] — why it matters — suggested day/block
3. [thing] — why it matters — suggested day/block
4. [thing] — why it matters — suggested day/block
5. [thing] — why it matters — suggested day/block
```

### 3.2 Time Blocking Suggestions
Based on calendar gaps and the TOP 5, suggest specific time blocks for focused work.
Don't just say "find time" — say "Tuesday 9-11 AM is open, block it for [X]."

### 3.3 Delegation / Deferral
Identify anything that:
- Can be delegated (to Karissa, Serena, a contractor, an AI agent)
- Should be deferred to next week (not urgent enough for this week's plate)
- Should be killed (it's been sitting for 2+ weeks and nobody cares)

## Phase 4: REPORT

```
═══════════════════════════════════════════════════
📋 WEEKLY SWEEP — Week of [Month DD, YYYY]
═══════════════════════════════════════════════════

📊 LAST WEEK RETRO
• [3-5 bullet summary]
• Carried over: [items that slipped]
🎯 WEEKLY TOP 5
1. [priority] — [day/block suggestion]
2. ...
3. ...
4. ...
5. ...

───────────────────────────────────────────────────
📅 WEEK AT A GLANCE
───────────────────────────────────────────────────

MONDAY [Date]
  [time-blocked events]
  ⚠️ [conflicts or notes]
  💡 [suggested blocks for TOP 5 items]

TUESDAY [Date]
  ...

[continue through Sunday]

───────────────────────────────────────────────────
👨‍👩‍👧‍👦 FAMILY WEEK
───────────────────────────────────────────────────
[Per-kid summary of the week's activities, logistics, and coverage needs]
🚗 Sitter needs: [days/times where coverage is required]

───────────────────────────────────────────────────
🔨 PROJECTS STATUS───────────────────────────────────────────────────
[Active projects with status, last activity, next action]
⚠️ Stale: [anything untouched > 7 days]
🔥 Deadline: [anything due in < 14 days]

───────────────────────────────────────────────────
💰 FINANCIAL
───────────────────────────────────────────────────
[Bills due, upcoming deadlines, Monarch status]

───────────────────────────────────────────────────
📧 EMAIL CLEANUP
───────────────────────────────────────────────────
[Inbox count, overdue items, draft replies for top 3]

───────────────────────────────────────────────────
🎙️ OTTER
───────────────────────────────────────────────────
[Recordings with unprocessed action items]

───────────────────────────────────────────────────
📋 OPEN ITEMS (carried forward)
───────────────────────────────────────────────────
[Unresolved threads, pulse notes, Phil flags]

───────────────────────────────────────────────────
🗑️ KILL / DEFER
───────────────────────────────────────────────────
[Items to drop or push to next week — ask Brady to confirm]
───────────────────────────────────────────────────
🔄 SWEEP FEEDBACK REVIEW
───────────────────────────────────────────────────

TASK FEEDBACK (one-time corrections applied this week):
• [date] — [feedback] → [how it was handled]
• Patterns: [any recurring issues — e.g., "missed texts from X twice" → add X to contact list]

PROMPT CHANGES PROPOSED:
For each Prompt Feedback item, propose the specific change to Section B of the 🌅 Get Ready event:

• FEEDBACK: [what Brady said]
  PROPOSED CHANGE: [exact edit to Section B — show before/after of the affected line]
  STATUS: ⏳ Awaiting approval

[If no feedback this week: "No sweep feedback logged this week. Prompt is stable."]

═══════════════════════════════════════════════════
```

## Phase 5: CALENDAR ACTIONS & PROMPT EVOLUTION

### 5.1 Update the Weekly Planning Event
Find today's 📋 Weekly Planning Sweep event and UPDATE its description with the full Phase 4 output
in Section A. Preserve Section B (the prompt).

### 5.2 Create Time Blocks
For each TOP 5 item that has a suggested day/time, create a calendar event as a focus block.
Title format: `🎯 [Priority Item]`
Description: Brief context on what to do during this block.
### 5.3 Create Missing Events
If scan surfaced commitments (from texts, email, Notion) not yet on the calendar, add them.

### 5.4 Fix Conflicts
If conflicts were found, suggest resolutions. If one is obvious (e.g., move a flex block), do it
and report. If it requires Brady's judgment, ask.

### 5.5 Evolve the Daily Prompt (Section B)
This is the weekly sweep's most important recursive function. For each proposed prompt change:

1. **Present the change** — show the exact before/after edit to Section B
2. **Ask Brady**: "Approve this change to the daily prompt?" (batch all changes into one confirmation)
3. **If approved**:
   - Update the 🌅 Get Ready recurring event's Section B with the new prompt text
   - Mark all related Sweep Feedback notes as Status="Complete"
   - Log the change to the Working Style Learnings table in the Onboarding Brief
     (`2f7ed43b89c58134bdfdc4114b866941`) with source="Weekly Sweep [date]"
   - Report: `✅ Daily prompt updated. Change takes effect tomorrow.`
4. **If rejected**: Mark feedback as Status="Rejected" with Brady's reason
5. **If modified**: Brady tweaks the proposed change → apply the modified version instead

Also check for Claudine-initiated suggestions (from Phase 3.5 of daily sweeps that flagged
improvements). If the same suggestion appeared 3+ times during the week, escalate it here as
a strong recommendation.

### 5.6 Update Weekly Prompt (Self-Improvement)
If the weekly sweep itself needs improvement (e.g., a section is always empty, a scan is useless),
propose changes to Section B of the 📋 Weekly Planning Sweep event using the same approve/reject flow.
### 5.7 Pipeline Dashboard
Run the pipeline dashboard skill (`3-reference/skills/pipeline-dashboard/SKILL.md`) to snapshot the Streaming Notes DB. Output the one-line summary in the sweep output.

### 5.7b Update Canonical Index
Review the Routing Log (`344ed43b-89c5-816a-ab54-ca49ca239748`) for all entries added since the last weekly sweep.

For any routed item that represents durable institutional knowledge — systemic findings, architecture decisions, SOPs, governance changes, client engagement milestones — add it to the Canonical Index page (`344ed43b-89c5-814e-a402-f0646f1ed635`) in the appropriate section (System Governance, Architecture & Skills, Project Records, Client Engagement History, Planning Artifacts).

The Canonical Index is **curated** — not everything that gets routed goes here. Only entries that change how the OS operates or that Brady/agents will need to reference repeatedly.

### 5.7c Review Rules & Preferences
Fetch the Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`). Check for:
- **Contradictory rules** (newer rule overrides older — flag the conflict)
- **Stale rules** that haven't been relevant in 30+ days (flag for removal)
- **Rules that should be promoted** to CLAUDE.md or Onboarding if not already
- **Missing categories** (any repeated feedback pattern that doesn't have a section yet)

Report findings in the weekly sweep output. Do not delete or modify rules without Brady's explicit approval — only flag.

### 5.8 Doctrine Sync Check
Run the doctrine-sync skill (`3-reference/skills/doctrine-sync/SKILL.md`) to detect drift between
OS doctrine/governance and agent profiles. Output the summary + priority list in the sweep report.
If any agent is flagged CRITICAL (council member missing key governance knowledge), escalate to Brady
with paste-ready updates. This is how the OS stays self-aware — doctrine changes get caught weekly,
not when someone notices an agent giving stale advice.

### 5.9 Regenerate OS Context Pack (for Chat Projects)
Run the os-context-pack skill (`3-reference/skills/os-context-pack/SKILL.md`) to produce a
fresh snapshot of Brady's OS state — including **active Category Intel briefs** from the
Notion DB. Outputs both the custom instructions block and the `brady-os-knowledge.md` file.

Report the output paths so Brady can paste/upload them into his Claude Chat Projects before
the week starts. This is how the Chat brainstorm layer stays aligned with canonical
intelligence state without needing Chat to write back to Notion.

### 5.10 Close
- Report all calendar changes made
- Report all prompt changes applied
- Ask: "Anything to adjust before the week starts?"

### 5.11 Weekly Build Review & Large Build Execution

1. **Review the week's build activity**: from the Phase 1.1 scan, count Build Requests completed / partial / blocked / still queued.

2. **Execute large builds now**: For any Build Request still "Not Started" or "Processing" after 7+ days, the weekly sweep is authorized to attempt large-scope builds (> 90 min). Apply the same autonomy assessment (Scope / Clarity / Risk). If clear and safe, build it. If still ambiguous, flag for Brady with a specific question.

3. **Reconcile partial builds**: For Build Requests still "In Progress" (partial), assess whether to continue or break into smaller pieces. If breaking up, create new Build Request entries for each remaining chunk (Type="Build Request", Status="Not Started", Tags=["Carry Forward"]).

4. **For each executed build**, follow the same log protocol as morning sweep 3.4b:
   - Create Thread Log (Name = "Build: [title] — [date]", Tags = ["Build Session", "Auto-Built"])
   - Mark original Build Request complete (or partial + carry-forward new entry)

5. **Add to Phase 4 report:**
   ```
   ───────────────────────────────────────────────────
   🔧 BUILD ACTIVITY (this week)
   ───────────────────────────────────────────────────
   Completed: [N] — [titles]
   Partial / Carry-Forward: [N] — [titles, what's remaining]
   Blocked: [N] — [titles and reasons]
   Built this session: [N] — [titles, files changed]
   In Queue (next week): [N] — [titles, estimated scope]
   ```

## Done/Status Consistency Rule

Whenever this sweep sets `Status = "Complete"` or `Status = "Remove"` on any Streaming Note, ALSO set `Done = "__YES__"`. These two fields must always move together. No exceptions.

## Edge Cases

- **Not Sunday**: If triggered on a different day, still run but note it's a mid-week planning session.
  Adjust the look-back window to "since last weekly sweep."
- **Holiday week**: Flag the holiday, adjust expectations, suggest lighter priorities.
- **Travel week**: If travel events detected, reorganize around travel. Flag packing, logistics.
- **Quarter boundary**: If this is the last week of a quarter, add a "Quarterly Trajectory" section —
  how's progress toward $200K revenue goal?
- **Tool failure**: Report and move on. Never block the whole sweep for one failed scan.

## What This Skill Does NOT Do

- It doesn't send emails or texts (drafts only)
- It DOES update Notion — marks sweep feedback as Complete/Rejected after review
- It DOES update the calendar — writes back to both the weekly AND daily event descriptions, creates focus blocks, adds missing events, resolves simple conflicts
- It DOES evolve the daily prompt — the weekly sweep is the ONLY skill authorized to modify Section B of the 🌅 Get Ready event (with Brady's approval)
- It doesn't make strategic decisions — it proposes, Brady confirms
- It doesn't replace the daily morning sweep — this is the weekly complement

## Data Dependencies

Reads from `references/` at runtime:
- `references/family-data.md` — Family info, contacts, activities
- `references/school-calendar.md` — School schedule