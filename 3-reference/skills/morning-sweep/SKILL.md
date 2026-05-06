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

  This skill replaces and consolidates: family-daily-brief, email-summary, and news-digest into
  one sequential execution. It is the canonical morning skill.
trust_tier: T1
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
**Local access**: iMessage MCP, file system, Notion MCP, Gmail MCP, Otter MCP, Google Calendar, osascript (iCloud Calendar + Reminders via AppleScript)
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

## Phase 0 — Decision Queue (FIRST THING BRADY SEES)

Run the `daily-decision-queue` skill (`3-reference/skills/daily-decision-queue/SKILL.md`).

Aggregates every pending `approve [agent] [slug]` from Musashi, Heidi, Phil, project-agent standups, and `Type=System Instruction` Streaming Notes into ONE numbered list. Render this BEFORE the TOP 3 / Email / Calendar sections — it's the highest-leverage 30 seconds of Brady's day.

Behavior:
- If queue has 0 items → render `🎯 Decision queue: clear ✅` and continue silently
- If queue has items → render queue at top of sweep output. Brady can reply `approve 1,2,5 | reject 3` before the rest of the sweep, or say `continue` to defer dispositioning to end of sweep.
- Approvals get routed by Phase 0's reply handler — they don't block sweep continuation.

The decision queue is the spine of the dream-state surface — Brady's "open the day with one approve/reject list" requirement. Do NOT skip Phase 0 even if the queue is empty (the explicit "clear ✅" line is the signal that the system checked).

## Phase 0.4 — Monarch CSV Refresh (Auto-Sync to Drive)

Before the Daily Money Check, refresh the Monarch transaction CSV so Finn (here AND in Claude.ai Live Artifact mode) always has fresh data.

**Steps (silent — only output if it fails):**

1. Use `claude-in-chrome` MCP. If a Monarch tab isn't already open, create one at `https://app.monarchmoney.com/transactions`. Brady's Chrome session is persistently authenticated — no login flow.
2. Navigate to Settings > Data > Download transactions. Trigger the download via JS click (Monarch's button doesn't accept a plain `.click()` — use the existing pattern from `0-agents/custom-built-agents/finn.md` → `account-scraping-sop.md`).
3. Wait up to 30s for a file matching `~/Downloads/Transactions_*.csv` (newest by mtime).
4. Copy the file to BOTH locations:
   - `~/Library/CloudStorage/GoogleDrive-brady.smallwood@gmail.com/My Drive/Finn-Exports/monarch-YYYY-MM-DD.csv` (canonical — Claude.ai pulls from here via Google Drive MCP)
   - `3-reference/skills/financial-assistant/data/monarch-YYYY-MM-DD.csv` (local repo copy for Finn-in-Conductor)
5. Prune `Finn-Exports/` to last 14 days (keep weekly snapshots beyond that — every Monday's file).

**Failure handling (do NOT block the sweep):**
- If Chrome MCP is unavailable, Monarch is logged out, or the download times out → write one Streaming Notes row (`Type=Sweep Feedback`, `Priority=Should`, title `"Monarch CSV refresh failed — [reason]"`) and continue. Do NOT surface as a TOP 3 alert; this is plumbing, not a money signal.
- If the most recent file in Drive is <12 hours old, skip the refresh entirely (already fresh).

Render only on failure: `⚠️ Monarch CSV stale ([N] days) — auto-refresh failed, see Streaming Notes`. On success, no output (silent plumbing).

## Phase 0.5 — Daily Money Check (Lightweight, Replaces Old Finn Daily Block)

Claudine runs a 30-second financial sanity check (NOT full Finn). Three things only:
1. Latest Arvest Family Spend balance from Gmail alerts (last 24h)
2. Any single transaction > $500 in last 24h across Gmail order/refund emails
3. Any bill due in next 48h from Calendar + known recurring (SoFi, Truist, COBRA, etc.)

If any of the three fires → surface as one-line alert in TOP 3 candidate list.
If all three are clean → render `💰 Money: stable, no anomalies` and move on.

**Full Finn block (cash flow, runway, consulting AR, IVFH, net worth, deep account analysis) runs WEEKLY only — see weekly-sweep Phase X.** Daily Finn was overkill; cash position doesn't change materially day-to-day, and daily heavy financial output crowded the sweep surface.

## Phase 1: SCAN (Gather Everything — No Output Yet)

Execute all scans before writing anything. Gather raw data into working memory.

### 1.0 Load Rules & Preferences
Fetch the Rules & Preferences page from Reference Layer (page ID `344ed43b-89c5-813d-bded-f1d5689510e2`).
Apply all rules to this sweep's behavior and output. This must run before any other scan or report step.

### 1.0b Load Phil's Pre-Sweep Primer
Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for `Type = "Pre-Sweep Primer"` created today.

**If found:**
- Read the body (the Starter Block written by `phil-pre-sweep`).
- Hold **PROPOSED TOP 3** as priors for Phase 2's TOP 3 (override only with stronger signal from today's full scan).
- Carry **CARRYOVER**, **WITHIN-7-DAY HORIZON**, **CALENDAR HEADLINES**, and **COHERENCE FLAGS** forward into the relevant Phase 2 sections (📋 NOTION STATUS, 📅 CALENDAR, 🔑 TOP 3).
- Note the **CLEANUP EXECUTED** count (Phil's autonomous Done/Status reconciles) in Phase 2's 📋 NOTION STATUS section as `Phil reconciled: [N] items at 4 AM`.
- Note the **CLEANUP PROPOSED** list under 📊 STREAMING NOTES — NEEDS DIRECTION so Brady can one-shot approve.
- At sweep end (Phase 3.6b equivalent timing), mark the primer row `Status = "Complete", Done = "__YES__", Action = "Consumed by morning sweep"`.

**If no primer found:** log `⚠️ No pre-sweep primer today (Phil may not have run)` in the 📋 NOTION STATUS section of the brief and proceed normally. The primer is additive — sweep works identically without it.

Backup archive (full detail, for rollback or investigation): `1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md`.

### 1.0c Load Musashi's Agent Review
Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for `Type = "Musashi Review"` created in the last 24 hours.

**If found:**
- Read the body (the Compact Summary from the `musashi-review` skill).
- Hold the **TOP 3 RECOMMENDATIONS**, **TECH SCAN (top 2)**, and **BIZ IDEAS (top 2)** for Phase 2's new `🗡️ MUSASHI REVIEW` section. Each item arrives with an approval slug like `approve musashi phil-1` or `approve musashi tech-[slug]` — preserve it verbatim.
- Note any recommendations flagged `size: large` or `cost: token-heavy` — these go in the review section with an explicit warning, never auto-executed.
- Do NOT execute any recommendation in this phase. All execution is approval-gated (see Phase 3.4c below).

**If no review found:** log `⚠️ No Musashi review today` in the 🗡️ MUSASHI REVIEW section of the brief and proceed normally. The review is additive — sweep works identically without it.

Backup archive (full scorecard + rationale): `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`.

### 1.0d Dual-Engagement Capacity Snapshot

Read both active engagement PROJECT.md files and the build queue. Generates a compact capacity table held in working memory for Phase 2 output — Brady sees the full picture before Gmail.

1. Read `1-execution/areas/work-and-business/programs/Consulting/Project - Panda/PROJECT.md` — extract: current phase, next open action item with date
2. Read `1-execution/areas/work-and-business/programs/Consulting/Project - 1915 South/PROJECT.md` — extract: current phase, next open action item with date
3. Read `3-reference/build-queue/INDEX.md` — count open specs

Brady hours estimates (hardcoded per phase label):
- Pre-engagement: 5-10h/wk
- Scope negotiation / Whitepaper offer: 5-15h/wk
- Active / embedded: 35-50h/wk
- Advisory / Delayed Start: 8-12h/wk
- Delivery: 20-30h/wk

Output block for Phase 2 (insert in the REPORT section after TOP 3):

```
ENGAGEMENT CAPACITY SNAPSHOT
─────────────────────────────────────────────────────────────
Client         Phase                   Next Touch    Brady Hrs/Wk
─────────────────────────────────────────────────────────────
Panda          [phase]                 [date]        [hours]
1915 South     [phase]                 [date]        [hours]
─────────────────────────────────────────────────────────────
BUILD QUEUE: N open specs
─────────────────────────────────────────────────────────────
```

- If any Next Touch date is today or tomorrow, append `←HOT` to that row.
- If both engagements are in scope-negotiation or active simultaneously, add: `⚠️ Both engagements active — confirm capacity scenario before new commitments.`

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
Query ALL three Google calendars for today AND tomorrow:
- Primary: `primary`
- Secondary: `bradysmallz@gmail.com`
- Family: `family13834007621771747799@group.calendar.google.com`

**Also read local iCloud calendars via osascript** (these don't sync to Google Calendar MCP):
```bash
osascript -e '
tell application "Calendar"
  set todayStart to current date
  set time of todayStart to 0
  set todayEnd to todayStart + (86400 * 2) - 1
  set eventList to {}
  repeat with c in calendars
    repeat with e in (every event of c whose start date >= todayStart and start date <= todayEnd)
      set end of eventList to (name of c) & "|" & (summary of e) & "|" & (start date of e as string)
    end repeat
  end repeat
  return eventList
end tell'
```
Key iCloud calendars to merge in: **Scheduled Reminders**, **Home**, **Luke's calendar**, **Family** (may duplicate Google Family — dedupe by event title+time).

Flag:
- Conflicts (overlapping events — across Google + iCloud sources)
- Gaps that could be used for focused work
- Missing recurring events (compare against known patterns)
- Anything requiring prep (meetings, appointments, kid logistics)

### 1.4b Reminders Scan (iCloud)
Read all incomplete reminders via osascript:
```bash
osascript -e '
tell application "Reminders"
  set output to {}
  repeat with l in every list
    repeat with r in every reminder of l whose completed is false
      set props to {name of r, name of l}
      try
        set end of props to (due date of r as string)
      on error
        set end of props to "no due date"
      end try
      set end of output to props
    end repeat
  end repeat
  return output
end tell'
```
Lists: **Reminders**, **Things To Buy**, **Lily reminders**, **To do**

Surface in the 📅 CALENDAR section:
- Reminders due today or overdue → flag prominently
- Reminders due tomorrow → include in TOMORROW PREVIEW
- Reminders with no due date but in "Reminders" or "To do" lists → include in 📋 NOTION STATUS as a count (e.g., "3 undated Reminders — consider scheduling")
- "Things To Buy" → include in family brief if non-empty
### 1.5 Otter.ai Scan
- Search recent recordings (last 48 hours)
- Parameters: `created_after` in `YYYY/MM/DD` format, `include_shared_meetings: False`, `username: Brady Smallwood`
- Flag any recordings with unprocessed action items or instructions
- Note: requires Mac approval popup — if "No approval received", tell Brady to check for the prompt

### 1.6 Conductor.build / GitHub Scan
- Use web fetch to check `https://conductor.build` dashboard for project changes (if accessible)
- Check GitHub repos for recent commits/PRs (if accessible via web fetch)
- If these aren't reachable from CoWork, note it in the output and skip

### 1.7 Financial Assistant (Morning Summary)
- Run the `financial-assistant` skill in `morning-summary` mode
- Reads Monarch CSV exports from `3-reference/skills/financial-assistant/data/`
- Applies category mappings and budget targets from `references/` files
- Scans Gmail for invoices/receipts/payments (last 7 days)
- Scans Calendar for bills due this week
- Queries Notion consulting pipeline for revenue status
- Reads `COCKPIT_DATA.burnRate`, `.runway`, `.forecast`, `.business` from the generated `data.js` — surface the single-line burn/runway summary in the brief
- Produces the compact `💰 FINANCES` block (see Phase 2 output below)
- If no CSV data exists, falls back to Gmail/Calendar/Notion only with degraded output

### 1.8 Family Brief Data
- Read `references/family-data.md` for school calendars, chore assignments, activities, logistics
- Cross-reference with calendar events for kid-specific activities today
- Check Gmail for any school/teacher/activity emails from last 24 hours

### 1.9 Build Request Detection
Scan two sources for anything that looks like a build/dev request. These get turned into
proposed dev plans that Brady can review and execute in Conductor.build.

**Source A — Telly captures in Streaming Notes DB** (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`)
- Query: (Type = "To Do" OR Tags contains "Product Backlog"), Status = "Not Started", created in last 24 hours
- Also scan Type = "Pulse Note" / "Note" where the Name or body contains build-signal keywords:
  `build`, `deploy`, `create`, `ship`, `app`, `feature`, `fix`, `automate`, `script`, `integrate`,
  `set up`, `wire up`, `add support for`
- For each hit, extract: title, body content, any linked files, source prefix (task/idea/bug/pulse)

**Source B — Google Calendar events (today + tomorrow)**
- Reuse data already gathered in 1.4 — no new API call
- Filter for events whose title or description contains build-signal keywords (same list above),
  OR events explicitly tagged with `[build]` or `[dev]` in the title
- Exclude recurring logistics events (school, chores, Get Ready, Email Catchup)

**Source C — Explicit Build Requests (Streaming Notes)**
- Query: `Type = "Build Request"`, `Status = "Not Started"`
- For each: read the full title and body, extract any target repo/files mentioned
- Apply the autonomy assessment (Scope / Clarity / Risk / Size — see Section 3.4b):
  - **Small** (< 30 min, file edits in Brady OS repos): classify as execute-now
  - **Medium** (30–90 min): classify as queue-evening
  - **Large** (> 90 min / multi-file architectural): classify as queue-conductor
  - **Blocked** (vague, requires external credentials, or touches production): classify as blocked
- Do NOT change Status yet — that happens in 3.4b during the execute phase

### 1.9b Streaming Notes Daily Light Audit

Query Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`) for items where:
- `Last Modified` > 3 days ago
- `Next Action` field is empty
- `Status` NOT IN ["Complete", "Remove"]
- `Type` NOT IN ["Daily State", "Keep Handy", "Pin to Top", "Sweep Feedback"]

Cap at 5 items (oldest first). Store results for the Phase 2 report block.

SLA reference: `3-reference/skills/_shared/streaming-notes-processing-paths.md`

## Phase 2: REPORT (Structured Output)

Now write the brief. Every section is scannable. No fluff.

```
═══════════════════════════════════════════════════
🌅 MORNING SWEEP — [Day], [Month DD, YYYY]
═══════════════════════════════════════════════════
🔑 TOP 3 (what moves the needle today) [seeded from Phil primer where applicable]
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
💰 FINANCES (data through [YYYY-MM-DD])
───────────────────────────────────────────────────
Cash Flow MTD: +$X,XXX (income $XX,XXX / spend $XX,XXX)
🔥 Burn $X,XXX/wk · Runway X mo [color: red/yellow/green] · [forecast note if any]
Consulting Revenue: $XX,XXX of $XX,XXX target (XX%)
⚠️ Over budget: [category] at XXX% ($XXX over)
📬 Outstanding invoices: [client] $X,XXX (sent [date])
📅 Due this week: [bill] $XXX ([day])
[If CSV stale: ⚠️ Monarch data is XX days old — drop a fresh export]
[If no CSV: ⚠️ No Monarch data — Gmail/Calendar/Notion only]
[If runway < 3mo: 🔴 Runway X mo — below 3-month threshold]
───────────────────────────────────────────────────
🔨 PROJECTS
───────────────────────────────────────────────────
[Active projects from Notion Projects DB with status]
[Any Conductor/GitHub changes detected]
[Otter recordings with unprocessed instructions]

───────────────────────────────────────────────────
🔧 BUILD REQUESTS ([N] detected)
───────────────────────────────────────────────────
BUILT THIS MORNING:
• "[title]" — [1-line summary of what was done] — [outcome: complete/partial]
  Files: [list changed files]

QUEUED FOR EVENING:
• "[title]" — [why medium, not small]

QUEUED FOR CONDUCTOR:
• "[title]" — plan at .context/plans/[slug].md

BLOCKED (not auto-buildable):
• "[title]" — [reason: vague / external dependency / production risk]
  → Converted to To Do for Brady

KEYWORD DETECTIONS (from Telly/Calendar, plans drafted):
• [Source: Telly/Calendar] — "[title]" → Dev plan written to .context/plans/[slug].md
  Summary: [1-line description of what the plan proposes]
  Estimated scope: [small / medium / large]

[If none in any category:]
No build requests detected.

───────────────────────────────────────────────────
🎙️ OTTER
───────────────────────────────────────────────────
[Recent recordings — title, date, any flagged action items]
[If any contain detailed instructions: "⚡ Recording '[title]' has instructions to build into a plan — review after sweep."]

───────────────────────────────────────────────────
📊 STREAMING NOTES — NEEDS DIRECTION ([N] items)
───────────────────────────────────────────────────
[For each item from Phase 1.9b scan (oldest first, max 5):]
• **[Name]** | [Type] | [N] days since last touch | Priority: [priority]
  → Set a next action, or say "archive [name]" to close it

[If 0 items: "All active items have next actions set. Pipeline healthy."]

───────────────────────────────────────────────────
🗡️ MUSASHI REVIEW (last night's agent tension pass)
───────────────────────────────────────────────────
[If no Musashi Review row found today: "⚠️ No Musashi review today (Musashi may not have run)." Skip the rest of this section.]

[If review found — surface the Compact Summary in this format:]

SCORECARD: [N] agents scored, avg [X.X]/10. Top: [agent X/10]. Bottom: [agent X/10].

TOP 3 AGENT RECOMMENDATIONS:
1. [agent] [size] — [what + why] → say `approve musashi [slug]-1` to queue dev plan
2. [agent] [size] — [...]   → `approve musashi [slug]-2`
3. [agent] [size] — [...]   → `approve musashi [slug]-3`

TECH SCAN (top 2):
• [tool name + link] — [1-line fit] → `approve musashi tech-[slug]`
• [...] → `approve musashi tech-[slug]`

BIZ IDEAS (top 2):
• [name] — [1-line pitch + economics] → `approve musashi biz-[slug]`
• [...] → `approve musashi biz-[slug]`

[If any recommendation is size:large OR cost:token-heavy, surface it with:]
⚠️ LARGE / TOKEN-HEAVY — requires explicit approval; do NOT approve in a batch.

Full scorecard + rationale: 1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md

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

### 3.4 Generate Dev Plans for Build Requests

For each build request detected in scan 1.9, generate a dev plan file at
`.context/plans/sweep-[YYYY-MM-DD]-[slug].md` in the Brady OS workspace.

**Dev plan template:**
```markdown
# Dev Plan: [Descriptive Name]

> Source: [Telly capture / Calendar event] — [original title]
> Generated: [date] by morning sweep
> Status: Proposed — awaiting Brady's review
> Execute in: conductor.build

## What
[2-3 sentences: what needs to be built, based on the captured request]

## Why
[1-2 sentences: context inferred from the request, related projects, or client work]

## Proposed Steps

### Step 1: [Action]
- **Repo:** [target repo if known, otherwise "TBD — Brady to confirm"]
- **File(s):** [paths if inferable]
- **Action:** [what to create/modify]

### Step 2: [Action]
[repeat as needed]

## Open Questions
- [Anything ambiguous from the original capture that Brady should clarify before executing]

## To Execute
Paste this plan into a Conductor workspace targeting [repo]. Or review and refine first — this is a proposal, not a commitment.
```

**Rules:**
- Keep plans lightweight — propose, don't over-engineer. Brady refines before executing.
- If the request is vague (e.g., "build the thing we talked about"), still generate a plan but
  load the Open Questions section and flag it as `⚠️ Needs clarification` in the BUILD REQUESTS report.
- If the request maps to an existing skill (e.g., "set up intel brief for new client"), reference
  that skill instead of writing steps from scratch.
- After generating the plan, mark the Streaming Notes item Status = "Processing" so it doesn't
  get re-detected tomorrow.
- Build requests with estimated scope "medium" or "large" are candidates for the TOP 3 if nothing
  more urgent is present.

### 3.4b Autonomous Build Execution

For each Build Request classified as **execute-now (small)** in Section 1.9 Source C:

**Autonomy assessment** — before building, verify all four gates pass:
1. **Scope** ✓ if: edits files in Brady OS repos (SKILL.md, configs, YAML, reference files, portal configs, agent profiles). ✗ if: requires a new external service, unconfigured credentials, or production deployment → **blocked**.
2. **Clarity** ✓ if: specific enough to act on without guessing. ✗ if: vague → leave "Not Started", add body note asking Brady to clarify, convert Type to "To Do" → **blocked**.
3. **Risk** ✓ if: reversible via git. ✗ if: affects production deployments, sends external messages, or modifies shared infrastructure → **blocked**.
4. **Size confirmed small** (< 30 min of execution): proceed. If reassessed as medium → queue-evening. If large → Conductor plan.

**Execution protocol:**
1. Set the Streaming Note `Status = "In Progress"`
2. Execute the build using file system MCP — edit files directly in the repo
3. Create a Build Session log in Streaming Notes:
   - Type = "Thread Log"
   - Name = "Build: [request title] — [YYYY-MM-DD]"
   - Tags = ["Build Session", "Auto-Built"]
   - Status = "Complete" (if fully done) or "In Progress" (if partial)
   - Done = "__YES__" only if Status = "Complete"
   - Body:
     ```
     ## What Was Requested
     [Original request text verbatim]
     ## What Was Built
     [Specific files changed and what changed in each]
     ## What's Remaining
     [Anything not completed and why — "none" if fully done]
     ## Outcome
     Scope: small | Outcome: complete / partial / blocked
     ```
4. Mark original Build Request: `Status = "Complete"`, `Done = "__YES__"`
5. If partial: create a NEW Build Request entry for remaining work
   - Type = "Build Request", Status = "Not Started", Tags = ["Carry Forward"]
   - Name = "[original title] — remaining"
   - Body = summary of what was built + what's still needed (full context for next session)
6. Report under 🔧 BUILD REQUESTS in Phase 2 output

**For medium requests (queue-evening):**
- Generate a plan at `.context/plans/sweep-[date]-[slug].md`
- Set Build Request `Status = "Processing"`
- Flag in BUILD REQUESTS output: "Queued for evening sweep — [title]"

**For large requests (queue-conductor):**
- Generate a Conductor plan per the 3.4 template above
- Set Build Request `Status = "Processing"`

**For blocked requests:**
- Change Type to "To Do", add a body note explaining the blocker
- Report under BLOCKED in Phase 2 BUILD REQUESTS output

### 3.4c Musashi Review — Approval-Gated Processing

If a Musashi Review row was loaded in Phase 1.0c, check Brady's response to the
sweep brief for any `approve musashi [slug]` tokens.

**For each approval slug matched:**
1. Find the corresponding recommendation / tech item / biz idea in the review body or backup file at `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`.
2. **Size gate:**
   - **small + reversible + touches only `0-agents/` or `3-reference/skills/`** → eligible for the existing Phase 3.4b autonomous Build Request flow. Run through the same four gates (Scope / Clarity / Risk / Size). If all pass, execute directly. If any fail, fall through to the medium path.
   - **medium** → draft a dev plan at `.context/plans/musashi-[slug].md`, set `Status = "Processing"` on the Musashi Review row, flag it in the brief as "Queued for evening sweep — [slug]".
   - **large or token-heavy** → draft a Conductor plan at `.context/plans/musashi-[slug].md`, set `Status = "Processing"`. Do NOT auto-run even if Brady approved — large means the dev plan itself is expensive to generate. Report: `[slug] queued for Conductor — expected token cost [estimate if known].`
3. After processing all approved items, if any unapproved items remain, leave the Musashi Review row `Status = "In Progress"` so tomorrow's sweep can continue surfacing them. If every item was approved or explicitly declined, mark `Status = "Complete"`, `Done = "__YES__"`.
4. Append one Routing Log row per approved-and-actioned item (per `3-reference/skills/_shared/routing-log.md`): `destination` is the dev plan file or the edit target; `reason` is `Musashi recommendation approved by Brady`; `summary` is the one-line action.

**If no approval slugs in Brady's reply:** do nothing. The review row stays `Not Started` for next sweep. Musashi's proposals are not debt — they compound as optionality.

**Hard rule:** never auto-execute a Musashi recommendation without an approval slug. Even when the item passes every autonomy gate, the slug is required. This is the approval-gate contract Brady set when commissioning the skill.

### 3.5 Report Applied Feedback
If any Sweep Feedback notes were applied in Pre-Flight step 4, report what changed:
```
🔄 APPLIED FEEDBACK:
• [feedback] → [what changed this run]
• [feedback flagged for permanent Section B update] → will be reviewed in weekly sweep
```

### 3.6 Flag Prompt Improvements
If Claudine notices something about this sweep that could be better — a scan that returned nothing
useful, a section that's always empty, a source that should be added — propose it:```
💡 PROMPT IMPROVEMENT SUGGESTION:
[what to change] — [why]
Say "sweep feedback: [approve/modify]" to log it.
```

### 3.6b Process System Instructions
Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`) for `Type = "System Instruction"` AND `Status = "Not Started"`.

For each entry:
1. Read the rule/preference text
2. Determine the correct section in Rules & Preferences (Agent Defaults, Voice, Confidentiality, Topic Rules, Client-Specific, Platform-Specific)
3. Append a new row to that section's table on the Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`): Rule | Date Added | Source (include platform + conversation context)
4. Set the Streaming Note's `Status = "Complete"`, `Done = "__YES__"`, `Action = "Move to Context Hub"`
5. Append a row to the Routing Log per `3-reference/skills/_shared/routing-log.md` (DB `344ed43b-89c5-816a-ab54-ca49ca239748`): `date`, `original_title`, `destination="Rules & Preferences"`, `reason`, `summary`
6. If the rule affects CLAUDE.md or Claudine Onboarding, flag it in the brief output: `⚠️ New rule added: [x]. CLAUDE.md / Onboarding update recommended.`

### 3.6c Propagate Rules to Config Files
If any new System Instructions were processed in step 3.6b:
- Read current `~/.claude/CLAUDE.md`
- Check if the new rule is already represented
- If not, append it to the appropriate section
- Same check for `3-reference/skills/claudine-onboarding/SKILL.md`

This step only ADDS rules. It never removes or modifies existing rules without Brady's explicit instruction.

### 3.6d Run the Streaming Notes Processor
After Rules & Preferences propagation, call the streaming-notes processor
(`3-reference/skills/streaming-notes-processor/SKILL.md`) for the remaining non-System-Instruction
Types (Build Request, Pulse Note, Sweep Feedback, Task, To Do, Note).

- The processor back-stops any System Instruction that 3.6b missed, drafts Build Request plans
  at `.context/plans/streaming-notes-*.md`, auto-routes clear Pulse Notes, queues Sweep Feedback
  for next Pre-Flight, and **drafts** (never auto-sets) Next Action candidates for Task/To Do/Note items.
- It writes one Routing Log row per actioned item and appends a daily score to
  `1-execution/areas/brady-os/processing-scores/YYYY-MM.md`.
- Append the processor's ≤6-line summary block to the sweep brief. Do not repeat items
  already covered in Phase 3.6b.
- If the processor surfaces drafts awaiting Brady's approval, include them under a
  `Drafts awaiting approval:` sub-heading in the brief — Brady replies "apply drafts"
  to commit them.

### 3.7 Pipeline Dashboard
Run the pipeline dashboard skill (`3-reference/skills/pipeline-dashboard/SKILL.md`) to snapshot the Streaming Notes DB. Output the one-line summary in the sweep output.

### 3.8 Config Sync Check
Run the config-sync skill (`3-reference/skills/config-sync/SKILL.md`) as a lightweight drift check.
Compare the Conductor workspace against the Claude Code CLI checkout and `~/.claude/` config.
- If everything is current: output one line — `✅ Config sync: all [N] files current`
- If drift detected: output the summary table (not the full report) and flag it in TOP 3 if critical
- Do not auto-sync — just surface the drift so Brady can fix it when ready

### 3.9 Refresh OS Cockpit
Write an updated `os-cockpit/data.js` in the Brady OS repo (`brady-os-master/muscat/os-cockpit/data.js`).
This file powers the local HTML cockpit dashboard. Use the data already gathered in Phase 1 to populate
all fields — do not re-scan. The file format is `window.COCKPIT_DATA = { ... }` with these sections:

- `generated` — ISO timestamp of this refresh
- `health` — array of 8 scored dimensions (sweep cadence, task progress, capture processing, client delivery, calendar guard, OS integrity, email triage, financial review). Each: `{ name, value, score (0-10), status (green/yellow/red) }`
- `email` — inbox_threads, action_required, starred, last_triage, flagged items
- `calendar` — today and tomorrow arrays of events, plus conflicts
- `capture` — unprocessed_notes, pending_voice_notes, diary_last_entry, pending_transcripts
- `projects` — array of active projects with name, program, status (on-track/watch/in-flight), note
- `actions` — array of action items from the brief with text, due, priority, done (boolean)
- `conductor` — morning_sweep/daily_whitepaper/evening_sweep run status
- `finances` — last_reviewed, balances, alerts
- `deliverables` — recent client deliverables with status (shipped/draft/review)
- `live_projects` — slugs from `3-reference/publishing/mception-ai-projects.yml`
- `email_outbound` — drafts_pending, sent_today, awaiting_reply, key_threads
- `github` — commits_today, open_prs, active_branch, recent commit messages
- `content` — drafts_in_progress, published_this_week, whitepaper_today

Score health dimensions based on scan results:
- 9-10 = green (nominal)
- 6-8 = yellow (watch)
- 0-5 = red (needs attention)

### 3.10 Sync Family Brief to Portal KB ⚡ MANDATORY

Write the Phase 2 Family Brief section (per-kid schedules, logistics, action items) to:
`portal/public/family/kb/10-sweep-state.md` (relative to repo root)

Format as a clean markdown file:
```markdown
# Today's Family Brief

**[Day of week], [Month] [Day], [Year]**

Last updated: [timestamp]

## Today's Schedule

| Time | Event | Who | Notes |
|------|-------|-----|-------|
| ... | ... | ... | ... |

## Action Items

- [ ] ...

## Alerts

- ...
```

Include all per-kid sections, the logistics footer, and any family-related action items.
This file is read by the mception.ai family chatbot — if it's stale, the chatbot can't answer schedule questions.

Also write any family-related open loops or carry-forward items to:
`portal/public/family/kb/12-open-loops.md`

#### Context Layer (20 / 21 / 22) ⚡ MANDATORY

In addition to the state files above, emit or refresh the following context files. These give the family chatbot texture — WHY things are the way they are, not just WHAT is happening.

**`portal/public/family/kb/20-routines.md`** — Recurring patterns and family rhythms.
- Source: Notion Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`) + calendar recurring events observed in Phase 1.4
- Include: school dropoff times, weekly activity schedule, grocery/meal rhythms, Brady's daily cadence, weekend defaults
- Format: `## [Category]\n- [pattern]`
- Overwrite fully each run (this is a snapshot, not a log)

**`portal/public/family/kb/21-decisions-log.md`** — Recent decisions with rationale.
- Source: last 30 days of `~/Documents/Daily-Journal/YYYY/MM/YYYY-MM-DD/decisions.md` files
- Pull all family-related decisions (kids, logistics, meals, household)
- Each entry format:
  ```
  ## YYYY-MM-DD
  **Decision:** [summary]
  **Why:** [rationale]
  **Alternatives considered:** [if any, else omit]
  ```
- Newest entries at top. Trim entries older than 30 days.
- Create the file if it doesn't exist.

**`portal/public/family/kb/22-rejected.md`** — Things tried that didn't work.
- Source: Streaming Notes DB, items where body contains "tried/failed", "didn't work", "stopped working", or are tagged as such
- Filter to family-relevant items only
- Each entry format:
  ```
  ## [Item or Approach]
  **Why rejected:** [reason]
  **Date noted:** [YYYY-MM-DD]
  ```
- Append new entries, preserve existing ones (do not overwrite — this is a growing archive)

**Graceful skip rules:**
- If `portal/public/baden-bagley/kb/` exists and has files beyond `.gitkeep`, apply the same routines/decisions/rejected pattern there
- If `portal/public/innovation-lab/kb/` exists and has files beyond `.gitkeep`, apply the same pattern there
- If source data is unavailable for any file, write the stub with a note: `_No data available — will populate on next sweep run with data._`

### 3.11 mception Action Scan
Run the `mception-action-scanner` skill in compact mode. Read all YAML files in
`portal/src/config/chat-configs/`, extract `dataSources` where status != "ready".

Include the compact one-line summary in the sweep output:
```
MCEPTION: [N] items across [M] pages ([X] not-started, [Y] partial, [Z] recommended)
  Your turn: [brady items]
  Agent queue: [count] per actor
```

If any items have `nextStepActor="brady"`, include them as TOP 3 candidates if nothing
more urgent exists. If any have `nextStepActor="claude-desktop"`, surface them as
candidates for the current session.

### 3.12 Close
Ask one question: "What are you starting with?"

### 3.13 Telly Completion Push

After Brady's close response (or right before asking the close question if he's not at the chat), push a one-line summary to his phone via Telly. Non-critical — never block the sweep if it fails.

```bash
# Source Telly push creds (gitignored)
[ -f ~/.telly-push.env ] && source ~/.telly-push.env
if [ -n "$TELLY_PUSH_URL" ] && [ -n "$TELLY_PUSH_SECRET" ]; then
  MSG="*Morning sweep done.* ${N_PRIORITIES} priorities · ${N_VIP_EMAILS} VIP emails · ${N_THREADS} threads"
  LINK="$BRIEF_URL"  # optional — Notion page / local file URL
  curl -sS -X POST "$TELLY_PUSH_URL" \
    -H "X-Telly-Secret: $TELLY_PUSH_SECRET" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg m "$MSG" --arg l "$LINK" '{message:$m} + (if $l == "" then {} else {link:$l} end)')" \
    > /dev/null || echo "[telly push failed — non-critical]"
fi
```

Fill the variables from the sweep output: `N_PRIORITIES` = count from TOP priorities section, `N_VIP_EMAILS` = VIP emails needing reply, `N_THREADS` = active Notion threads. Omit `LINK` if there's no canonical URL.

### 3.13b Refresh Telly's Knowledge Base

Immediately after the completion push, trigger a Telly KB context refresh so she starts the day with current Rules & Preferences and recent Streaming Notes. Non-critical — never block the sweep if it fails.

```bash
[ -f ~/.telly-push.env ] && source ~/.telly-push.env
if [ -n "$TELLY_PUSH_URL" ] && [ -n "$TELLY_PUSH_SECRET" ]; then
  REFRESH_URL="${TELLY_PUSH_URL/\/api\/push/\/api\/context-refresh}"
  curl -sS -X POST "$REFRESH_URL" \
    -H "X-Telly-Secret: $TELLY_PUSH_SECRET" \
    -H "Content-Type: application/json" \
    > /dev/null || echo "[telly context refresh failed — non-critical]"
fi
```

This primes Telly's 12-hour cache. If the refresh fails, Telly self-refreshes on her first query of the day.

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

## Done/Status Consistency Rule

Whenever this sweep sets `Status = "Complete"` on any Streaming Note, ALSO set `Done = "__YES__"`. These two fields must always move together. No exceptions. The reverse is also true — if you set `Done = "__YES__"` for a closing action, set `Status` to either `"Complete"` or `"Remove"` (never leave it as `In Progress` or `Not Started`).

## What This Skill Does NOT Do

- It doesn't send emails or texts (drafts only — Brady sends)
- It DOES update Notion — logs sweep feedback, marks processed feedback as complete
- It DOES update the calendar — writes back to Get Ready event, creates Email Catchup block, and adds missing events from scan
- It does NOT modify Section B of the Get Ready event — only the weekly sweep can do that (with Brady's approval)
- It doesn't make decisions — it surfaces information and suggests, Brady decides
- It doesn't replace the evening capture (evening-sweep) — that's a separate workflow

## Data Dependencies

This skill reads from `references/` at runtime:
- `references/family-data.md` — School calendars, chore assignments, activities, contacts
- `references/school-calendar.md` — Holiday/break/early dismissal schedule
- `references/family-brief-template.md` — Template for the family brief section

If these files are missing or stale, flag it in the output so Brady knows to update them.