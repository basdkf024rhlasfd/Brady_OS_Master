---
name: evening-sweep
description: >
  Brady's 9 PM evening ritual — archives the day's Get Ready event, morning sweep output,
  whitepaper, and session activity into a structured local file system and Notion log.
  Creates a persistent, searchable daily journal that becomes a growing data source for
  Brady's life, work, and decision history. Future CoWork tasks, morning sweeps, and weekly
  sweeps can reference this archive for context.

  Trigger this skill whenever Brady says "evening sweep", "evening update", "close the day",
  "archive today", "run PAM", "evening mode", "night sweep", "log the day", "journal today",
  "save today", "wind down", or any variation requesting the end-of-day capture. Also trigger
  on "update" or "orchestrate" after 8 PM CT (PAM mode). This skill owns all end-of-day
  archival, journaling, and state-capture workflows.
---

# Evening Sweep

Archive the day. Capture the state. Give Brady permission to stop. Every day becomes a
searchable, referenceable record — a detailed journal that compounds over time.

## Why This Exists

Without an evening capture, tomorrow's morning sweep starts from scratch. Context evaporates
overnight. Decisions made today become "why did I do that?" next month. This skill solves
three problems:

1. **Continuity** — Tomorrow's Claudine knows exactly what happened today
2. **Journal** — A growing personal/professional archive Brady can search, reference, or
   reflect on. Not a diary — a detailed operational log of his life.
3. **Permission to stop** — Brady's ADHD brain doesn't shut off easily. The evening sweep
   is the ritual that says "you're done, the system has it."
## Execution Environment

**Runs on**: CoWork (Claude Desktop) on Brady's Mac
**Scheduled**: Daily at 9:00 PM CT
**Local access**: File system, Notion MCP, Gmail MCP, Google Calendar, iMessage MCP
**Output**: Local files + Notion log entries

## Local File Structure

The evening sweep writes to a structured directory on Brady's Mac. This becomes the
long-term archive that any future CoWork task can query.

```
~/Documents/Daily-Journal/
├── 2026/
│   ├── 03/
│   │   ├── 2026-03-29/
│   │   │   ├── get-ready.md           ← Full Get Ready event (Section A + B)
│   │   │   ├── morning-sweep.md       ← Morning sweep output
│   │   │   ├── daily-brief.pdf        ← Whitepaper PDF (copied from output)
│   │   │   ├── evening-journal.md     ← The main journal entry (this skill writes it)
│   │   │   ├── email-summary.md       ← Email triage summary
│   │   │   ├── calendar-snapshot.md   ← What the calendar looked like today
│   │   │   ├── decisions.md           ← Decisions made today (extracted from sessions)
│   │   │   └── metadata.json          ← Machine-readable index for search
│   │   ├── 2026-03-30/
│   │   │   └── ...
│   │   └── ...
│   └── 04/
│       └── ...
└── index.md                           ← Running index of all journal days
```

**Directory creation**: If any directory in the path doesn't exist, create it silently.
## Workflow

### Phase 1: GATHER (Silent)

Collect everything that happened today. Don't output anything yet.

#### 1.1 Get Ready Event
Read today's 🌅 Get Ready event from the calendar. Extract the full description (Section A
contains the morning sweep output). This is the richest single source for the day.

#### 1.2 Calendar Snapshot
Read all events from today across all 3 calendars. Record:
- What was scheduled vs. what actually happened (if knowable)
- Any events that were added, moved, or cancelled during the day
- Tomorrow's first 3 events (for the "what's coming" section)

#### 1.3 Email Activity
Quick Gmail scan for today:
- How many emails received
- How many sent/replied to
- Any threads still marked 🔴 Needs Reply that weren't handled
- Key threads resolved

#### 1.4 Text Activity
Scan iMessage for today's key conversations (same contact list as morning sweep).
Note: focus on outcomes — "confirmed dinner with Eric at 6" not full transcripts.
#### 1.5 Notion Activity
Query Streaming Notes DB for today:
- Thread Logs created or updated
- Pulse Notes logged
- System Instructions executed
- Daily State entry (if exists)
- Any Phil flags raised or resolved

#### 1.6 Session Context
Review the current conversation and any sessions today for:
- Decisions made
- Tasks completed
- Tasks deferred or blocked
- Learnings or calibrations
- Sweep feedback logged

#### 1.7 Whitepaper
Check if today's daily whitepaper PDF exists at the expected output path.
If yes, copy it into today's journal folder.

### Phase 2: WRITE THE JOURNAL

This is the core output — a detailed markdown file that captures the full day.

**File**: `~/Documents/Daily-Journal/YYYY/MM/YYYY-MM-DD/evening-journal.md`
```markdown
# Daily Journal — [Day], [Month DD, YYYY]

## How Today Went
[2-3 sentence overall assessment. Tone: honest, not performative. Was it a productive day?
 A recovery day? A chaotic day? Name it.]

## What Happened

### Morning
[What the morning sweep surfaced. What Brady started with. First moves taken.]

### Midday
[Key work blocks, meetings, calls. What got done vs. what was planned.]

### Afternoon / Evening
[Kid logistics, family events, evening activities. How the day wound down.]

## Decisions Made
[Bullet list of every decision captured today — from sessions, emails, texts, calendar changes.
 Include context for why. These are the most valuable entries for future reference.]

- [Decision]: [context and reasoning]
- ...

## Tasks Completed
- [task] — [outcome]
- ...

## Tasks Deferred / Blocked
- [task] — [reason it didn't happen] — [when it should happen]
- ...

## People Interacted With
[Who Brady talked to today and what about. Not every text — just meaningful interactions.]

- [Name]: [what was discussed or decided]
- ...
## Email Status
- Received: [count]
- Sent/Replied: [count]
- Still needs reply: [list with names]

## Open Loops
[Anything that's unresolved and needs to carry forward to tomorrow.
 These feed directly into tomorrow morning's sweep.]

- [open item] — [next step]
- ...

## Learnings & Notes
[Anything Brady learned, realized, or wants to remember. Working style calibrations,
 business insights, personal reflections. This is the "future Brady will thank you" section.]

## Tomorrow Preview
[First 3 events tomorrow. Any prep needed. One sentence on what the morning sweep
 should prioritize.]

---
*Archived by Claudine at [time] CT*
*Morning sweep: [yes/no]*
*Whitepaper: [yes/no]*
*Jarvis Score: [score if updated today]*
```

### Phase 3: WRITE SUPPORTING FILES

#### 3.1 get-ready.md
Copy the full Get Ready event description (Section A + B) into the journal folder.

#### 3.2 morning-sweep.md
Extract Section A from the Get Ready event and save as a standalone file.
#### 3.3 calendar-snapshot.md
Write today's full calendar as a time-ordered list with notes on what happened.

#### 3.4 email-summary.md
Brief summary of email activity — who, what, resolved/unresolved.

#### 3.5 decisions.md
Standalone file of just the decisions, formatted for easy grep/search later.

#### 3.6 metadata.json
Machine-readable index for programmatic search:
```json
{
  "date": "2026-03-29",
  "day_of_week": "Sunday",
  "morning_sweep": true,
  "whitepaper": true,
  "decisions_count": 3,
  "emails_received": 12,
  "emails_sent": 4,
  "people_interacted": ["Eric Crane", "Karissa", "Mark Schmulen"],
  "open_loops": ["finalize Broker Co pitch", "schedule Luke's camp"],
  "jarvis_score": null,
  "tags": ["family", "broker-co", "calendar-cleanup"],
  "summary": "Productive Sunday. Dropped Baden at airport, picked up Faith..."
}
```

#### 3.7 Update index.md
Append today's entry to `~/Documents/Daily-Journal/index.md`:
```markdown
| 2026-03-29 | Sun | Productive Sunday. Dropped Baden... | 3 decisions | 2 open loops |
```
### Phase 4: LOG TO NOTION

#### 4.1 Create/Update Daily State
In Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`):
- Create or update today's Daily State entry (Type="Daily State")
- Include: summary, decisions, open loops, Jarvis score, tags
- Link to any Thread Logs from today

#### 4.2 Process Unresolved Items
For any open loops or deferred tasks:
- If they should become Notion tasks, create them
- If they're just carry-forward context, note them in the Daily State

#### 4.3 Run Phil's Audit
Score today's log quality (per the standard Phil audit). Flag if < 4.

#### 4.4 Update Jarvis Score (if substantive work happened)
Score the 7 dimensions, compute weighted composite, log to Jarvis Score Log DB.

### Phase 5: CLOSE THE DAY

#### 5.1 Report
Brief in-chat summary:
```
✅ Day archived to ~/Documents/Daily-Journal/2026/03/2026-03-29/
📝 Journal: [2-sentence summary]
📊 Stats: [emails, decisions, open loops]
🔮 Tomorrow: [first event + one priority]

You're done. Go read. 📖
```

#### 5.2 Permission to Stop
End with something that gives Brady permission to close the laptop.
Match the energy — if it was a hard day, acknowledge it. If it was productive, celebrate it.
Don't be saccharine. Be real.
## How Other Skills Access the Archive

### Morning Sweep
The morning sweep can read yesterday's journal to restore context:
```
~/Documents/Daily-Journal/YYYY/MM/YYYY-MM-DD/evening-journal.md
```
Specifically the "Open Loops" and "Tomorrow Preview" sections.

### Weekly Sweep
The weekly sweep reads the last 7 journal entries to build the retro:
```
~/Documents/Daily-Journal/YYYY/MM/YYYY-MM-DD/metadata.json
```
Aggregate: decisions count, open loops patterns, people frequency, tags.

### Any CoWork Task
Any future CoWork task can reference the journal for historical context:
- "What did I decide about X?" → grep decisions.md files
- "When did I last talk to Mark?" → grep metadata.json for people_interacted
- "How was my week?" → read the last 5-7 evening-journal.md files
- "What's my email volume trend?" → aggregate metadata.json email counts

### Search Pattern
For CoWork tasks that need to search the archive:
```bash
# Find all decisions mentioning Broker Co
grep -r "Broker Co" ~/Documents/Daily-Journal/*/decisions.md

# Find all days I interacted with Mark
grep -l "Mark Schmulen" ~/Documents/Daily-Journal/*/metadata.json

# Get last 7 days of summaries
for f in $(ls -d ~/Documents/Daily-Journal/2026/03/2026-03-2*); do
  cat "$f/metadata.json" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['date'], d['summary'])"
done
```
## Edge Cases

- **Brady didn't run morning sweep today**: Note it in the journal. Still archive whatever
  happened — calendar, email, texts. The journal still has value even without a morning sweep.
- **No whitepaper today**: Set `whitepaper: false` in metadata. Don't create a placeholder.
- **Very light day (weekend, sick, vacation)**: Still run. The journal entry can be short:
  "Rest day. No work. Family time." That's still valuable data.
- **Brady gives verbal feedback during evening sweep**: Log it as sweep feedback AND include
  it in the Learnings section of the journal.
- **First run (no existing archive)**: Create the full directory structure from scratch.
  No history to reference — that's fine, it builds from here.
- **Missed a day**: If yesterday has no journal folder, note the gap in today's entry.
  Don't try to reconstruct yesterday — that ship sailed.

## Calendar Guardrails

The evening sweep respects Brady's wind-down:
- **9:00 PM**: Sweep runs. Should take < 5 minutes of Brady's attention.
- **10:50 PM**: Reading/wind-down. The sweep should be LONG done by now.
- **Midnight**: Hard sleep deadline. If the sweep somehow runs late, cut Phase 4 (Notion)
  and just save local files. Notion can catch up tomorrow.

## What This Skill Does NOT Do

- It doesn't plan tomorrow — that's the morning sweep's job
- It doesn't send any messages or emails
- It doesn't modify the calendar (reads only)
- It doesn't replace therapy or real journaling — it's an operational log, not emotional processing
- It DOES write to the local file system (the whole point)
- It DOES write to Notion (Daily State, Jarvis Score)