---
name: morning-sweep
description: >
  Brady's canonical morning sweep — a single automated skill that scans every capture surface
  (Gmail, iMessage, Notion, Calendar, Otter.ai, Conductor/GitHub, Monarch), runs the family
  brief, answers Brady's daily questions, drafts email responses, and schedules an email catchup
  block. Designed to run from CoWork on desktop every morning at 6 AM CT.

  Trigger this skill whenever Brady says "morning sweep", "morning update", "get ready",
  "run the sweep", "daily sweep", "run my morning", "morning brief", "what did I miss",
  "catch me up", "full sweep", "update" (before noon CT), or any variation requesting his
  comprehensive morning briefing. Also trigger on "run the Get Ready event" or "execute Get Ready".

  This skill replaces and consolidates: morning mode (AMY), family-daily-brief, email-summary,
  and news-digest into one sequential execution. It is the canonical morning skill.
---

# Morning Sweep

One skill, one execution, every capture surface. Brady opens CoWork, says "morning sweep",
and gets a complete picture of his world in under 5 minutes of reading.

## Why This Exists

Brady has ADHD and 5 kids. Every morning is a cold start against chaos. This skill eliminates
the "what should I check first?" paralysis by sweeping everything, triaging it, and delivering
one structured brief with clear first moves. The system carries him — he doesn't carry the system.
## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac
**Local access**: iMessage MCP, file system, Notion MCP, Gmail MCP, Otter MCP, Google Calendar
**Scheduled**: Daily, triggered manually or via scheduled task at 6:00 AM CT

## Pre-Flight (Silent — Do Not Output)

Before generating any output, silently execute ALL of these in parallel where possible:

1. **Get today's date and day of week** — needed for calendar queries, school logic, greeting
2. **Determine if school day** — check `references/school-calendar.md` for holidays, breaks, early dismissals
3. **Approve any pending MCP prompts** — Otter and iMessage may require Mac-level approval popups
4. **Read unprocessed sweep feedback** — Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`),
   Type="Sweep Feedback", Status="Not Started". These are corrections and improvements Brady logged
   since the last sweep. Apply them to THIS execution:
   - **Task feedback** (e.g., "you missed Mark's email yesterday") → adjust scan behavior for this run
   - **Prompt feedback** (e.g., "stop scanning Conductor") → apply the change now AND flag it for
     the weekly sweep to bake into Section B permanently
   - Mark each processed feedback note Status="Complete" after applying

## Phase 1: SCAN (Gather Everything — No Output Yet)

Execute all scans before writing anything. Gather raw data into working memory.

### 1.1 Gmail Scan
- Search: last 24 hours, skip `category:promotions` and `category:social`
- For each message: read full body (subject lines aren't enough)
- Classify into: 🔴 Needs Reply, 🟡 FYI, 🟢 Low Priority, ⭐ Starred
- For 🔴 emails: draft a reply (store for Phase 2)
- Count totals per category
### 1.2 iMessage Scan
- Search by first name for key contacts: Karissa, Jill, Lily, Faith, Baden, Eric, Mark, Paulette, Brandon, Serena, Mamo
- Window: last 24 hours
- Flag anything that implies a commitment, question, or logistics change
- Note: search by first name only, then use returned phone number for `read_imessages`

### 1.3 Notion Scan
Query the following (use Notion MCP):
- **Daily State**: Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`), Type="Daily State", today's date
- **Active Threads**: same DB, Type="Thread Log", Status="In Progress"
- **Unprocessed Pulse Notes**: Type="Pulse Note", Status="Not Started"
- **Pending System Instructions**: Type="System Instruction", Status="Not Started"
- **Phil Flags**: Needs Review=true OR Phil Score < 4
- **Email Hub**: `9b63f611b5744195b18e9f122579d4e2` — check for queued actions
- **Projects DB**: `2c2ed43b89c580afac9bededd48b98e7` — any status changes since last Daily State

### 1.4 Calendar Scan
Query ALL three calendars for today AND tomorrow:
- Primary: `primary`
- Secondary: `bradysmallz@gmail.com`
- Family: `family13834007621771747799@group.calendar.google.com`

Flag:
- Conflicts (overlapping events)
- Gaps that could be used for focused work
- Missing recurring events (compare against known patterns)
- Anything requiring prep (meetings, appointments, kid logistics)
### 1.5 Otter.ai Scan
- Search recent recordings (last 48 hours)
- Parameters: `created_after` in `YYYY/MM/DD` format, `include_shared_meetings: False`, `username: Brady Smallwood`
- Flag any recordings with unprocessed action items or instructions
- Note: requires Mac approval popup — if "No approval received", tell Brady to check for the prompt

### 1.6 Conductor.build / GitHub Scan
- Use web fetch to check `https://conductor.build` dashboard for project changes (if accessible)
- Check GitHub repos for recent commits/PRs (if accessible via web fetch)
- If these aren't reachable from CoWork, note it in the output and skip

### 1.7 Monarch Capital Scan
- Use web fetch to check `https://app.monarchmoney.com` (if accessible with auth)
- If not accessible (likely — requires login), flag in output: "⚠️ Check Monarch manually — no API access"
- Future: revisit when Monarch releases an API or MCP

### 1.8 Family Brief Data
- Read `references/family-data.md` for school calendars, chore assignments, activities, logistics
- Cross-reference with calendar events for kid-specific activities today
- Check Gmail for any school/teacher/activity emails from last 24 hours

## Phase 2: REPORT (Structured Output)

Now write the brief. Every section is scannable. No fluff.

```
═══════════════════════════════════════════════════
🌅 MORNING SWEEP — [Day], [Month DD, YYYY]
═══════════════════════════════════════════════════
🔑 TOP 3 (what moves the needle today)
1. [most important thing]
2. [second most important]
3. [third most important]

───────────────────────────────────────────────────
📧 EMAIL (X total: X need reply, X FYI, X low)
───────────────────────────────────────────────────

🔴 NEEDS REPLY:
• [Sender] — [1-line summary + what they need] — [draft below]
• ...

🟡 FYI:
• [Sender] — [1-line summary]
• ...

🟢 LOW:
• [count] low-priority emails (promos filtered out)

⭐ STARRED:
• [any starred items]

📝 DRAFT REPLIES:
[For each 🔴 email, show the draft response. Keep it tight — Brady edits and sends.]

→ Scheduling 30-min "Email Catchup" block at [first open slot].

───────────────────────────────────────────────────💬 TEXTS (last 24hrs)
───────────────────────────────────────────────────
• [Contact] — [summary of thread, any open questions or commitments]
• ...
• [if nothing notable: "Nothing requiring action."]

───────────────────────────────────────────────────
📅 CALENDAR — TODAY
───────────────────────────────────────────────────
[Time-ordered list of today's events across all calendars]
⚠️ [any conflicts or gaps flagged]
🔮 TOMORROW PREVIEW: [1-2 line preview of tomorrow's big items]

Trustworthiness: [✅ Looks complete / ⚠️ Potential gaps: (list what's missing)]

───────────────────────────────────────────────────
📋 NOTION STATUS
───────────────────────────────────────────────────
Active Threads: [count] — [names of in-progress threads]
Unprocessed Pulse Notes: [count] — [quick list]
Phil Flags: [any open flags with proposed fixes]
Pending Instructions: [any system instructions not yet executed]

───────────────────────────────────────────────────
💰 FINANCES
───────────────────────────────────────────────────
[Monarch data if accessible, otherwise:]
⚠️ Check Monarch manually — no automated access yet.
[Any financial emails or calendar items surfaced from other scans]
───────────────────────────────────────────────────
🔨 PROJECTS
───────────────────────────────────────────────────
[Active projects from Notion Projects DB with status]
[Any Conductor/GitHub changes detected]
[Otter recordings with unprocessed instructions]

───────────────────────────────────────────────────
🎙️ OTTER
───────────────────────────────────────────────────
[Recent recordings — title, date, any flagged action items]
[If any contain detailed instructions: "⚡ Recording '[title]' has instructions to build into a plan — review after sweep."]

═══════════════════════════════════════════════════
👨‍👩‍👧‍👦 FAMILY BRIEF
═══════════════════════════════════════════════════

[Full family brief per the family-daily-brief skill format]
[See references/family-brief-template.md for structure]

═══════════════════════════════════════════════════
```

## Phase 3: CLOSE & CALENDAR ACTIONS

After delivering the full brief, execute these:

### 3.1 Update Today's Get Ready Event
Find today's 🌅 Get Ready event (recurring daily, 6-7 AM, calendar: Brady.Smallwood) and UPDATE itsdescription. Replace Section A with the full brief output. Preserve Section B (the prompt) unchanged.

The event description should look like:
```
═══ SECTION A: TODAY'S BRIEF ═══
[paste the entire Phase 2 output here]

═══ SECTION B: MORNING PROMPT ═══
[preserved — do not modify unless weekly sweep approves a change]
```

This makes the calendar event a living record. Brady can glance at it all day from any device.

### 3.2 Create Email Catchup Event
Add a 30-min "📧 Email Catchup" event at the first open morning slot (after 8 AM).
Include in the description: the count of emails needing reply and who they're from.

### 3.3 Create Any Missing Events
If the scan surfaced commitments from texts, emails, or Notion that aren't on the calendar yet,
create them. Don't ask — just do it and report what was added.

### 3.4 Report Applied Feedback
If any Sweep Feedback notes were applied in Pre-Flight step 4, report what changed:
```
🔄 APPLIED FEEDBACK:
• [feedback] → [what changed this run]
• [feedback flagged for permanent Section B update] → will be reviewed in weekly sweep
```

### 3.5 Flag Prompt Improvements
If Claudine notices something about this sweep that could be better — a scan that returned nothing
useful, a section that's always empty, a source that should be added — propose it:```
💡 PROMPT IMPROVEMENT SUGGESTION:
[what to change] — [why]
Say "sweep feedback: [approve/modify]" to log it.
```

### 3.6 Close
Ask one question: "What are you starting with?"

## Mid-Day Feedback (Anytime)

Brady can give feedback on the sweep at any point during the day. Claudine handles it based on type:

### "sweep feedback: [x]"
1. Classify as Task Feedback or Prompt Feedback:
   - **Task Feedback** (about today's output): "you missed Eric's text", "that TOP 3 was wrong",
     "the email draft for Mark was too formal"
     → Log to Streaming Notes DB: Type="Sweep Feedback", Category="Task", Status="Not Started"
     → Respond: `✓ logged — tomorrow's sweep will account for this`
   - **Prompt Feedback** (about the process): "stop scanning Conductor", "add Slack to the scan",
     "put family brief before email", "scan texts from 48hrs not 24"
     → Log to Streaming Notes DB: Type="Sweep Feedback", Category="Prompt", Status="Not Started"
     → Respond: `✓ logged — applying tomorrow, permanent change reviewed in weekly sweep`

### Implicit feedback
If Brady corrects something during a session that relates to the sweep (e.g., "you always miss
texts from Dax" or "Otter scan is useless"), Claudine should proactively offer to log it:
> "That sounds like sweep feedback. Want me to log it so future sweeps handle it?"

### Feedback lifecycle
1. **Captured** → Streaming Notes, Status="Not Started"
2. **Applied once** → Next morning sweep reads it, applies it, marks Status="Applied Once"3. **Reviewed for permanence** → Weekly sweep reviews all "Applied Once" and "Not Started" Prompt
   Feedback, proposes Section B changes. If Brady approves:
   - Update the 🌅 Get Ready event's Section B with the new prompt
   - Mark feedback Status="Complete"
   - Log the change to Working Style Learnings table in Onboarding Brief
4. **Rejected** → Brady says no → Mark Status="Rejected", note why

## Edge Cases

- **Weekend**: Skip school sections in family brief. Lighter tone. No "Prep kids for school" items.
- **Holiday/break**: Detect from school calendar reference. Adjust family brief accordingly.
- **No emails**: "Inbox zero. Legend." Skip email section.
- **No texts of note**: "Nothing requiring action." One line, move on.
- **Otter approval popup**: If MCP returns "No approval received", output: "⚠️ Otter needs Mac approval — check for the popup in Claude Desktop, then say 'retry otter'."
- **Tool failure**: If any scan fails, report it and move on. Don't block the whole sweep.
- **Late start (after noon)**: Switch to mid-day mode — skip morning logistics, focus on "what's left today" and blockers.

## What This Skill Does NOT Do

- It doesn't send emails or texts (drafts only — Brady sends)
- It DOES update Notion — logs sweep feedback, marks processed feedback as complete
- It DOES update the calendar — writes back to Get Ready event, creates Email Catchup block, and adds missing events from scan
- It does NOT modify Section B of the Get Ready event — only the weekly sweep can do that (with Brady's approval)
- It doesn't make decisions — it surfaces information and suggests, Brady decides
- It doesn't replace the evening capture (PAM) — that's a separate workflow

## Data Dependencies

This skill reads from `references/` at runtime:
- `references/family-data.md` — School calendars, chore assignments, activities, contacts
- `references/school-calendar.md` — Holiday/break/early dismissal schedule
- `references/family-brief-template.md` — Template for the family brief section

If these files are missing or stale, flag it in the output so Brady knows to update them.