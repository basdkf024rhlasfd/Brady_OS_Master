---
name: mception-navigator
description: >
  Browser-native portal navigator for mception.ai. When Brady is in Chrome on mception.ai,
  orients to current page, scans cross-system context (Calendar, Gmail, Notion), and presents
  a prioritized action menu with guided browser navigation. Runs exclusively in Claude in Chrome.

  Trigger: "what should I do next", "navigate mception", "portal check", "what needs attention",
  "next actions", "where should I go", "show me what needs attention", "mception tour".

  Context trigger: automatically relevant when the active Chrome tab is on mception.ai or
  localhost:3000 (portal dev).

  Complements morning-sweep (which gathers) by helping Brady EXECUTE in the browser.
  Morning sweep is the producer; navigator is the consumer and executor.
trust_tier: T0
---

# mception Navigator

Browser-side action guide for mception.ai. Brady opens Chrome, lands on the portal, and this
skill tells him exactly what to do next — then navigates him there.

## Why This Exists

Morning sweep produces a priority-ordered brief every day. But when Brady sits down at the portal
mid-afternoon (or any time), the sweep is hours old. He needs a fresh read on what's actionable
RIGHT NOW, surfaced in the context of whatever page he's already looking at, with one-click
navigation to the next move.

This skill fills the gap between "I know what matters" (morning sweep) and "I'm doing it"
(browser execution).

## Execution Environment

**Runs on:** Claude in Chrome (browser MCP)
**Does NOT run on:** CoWork, Claude Desktop, Claude Code CLI
**Browser access:** `claude-in-chrome` MCP tools (tabs, navigation, page reading, element finding)
**Cross-system access:** Google Calendar, Gmail, Notion, Granola/Otter (via their MCP integrations)

---

## Phase 0: ORIENT (Silent — Determine Current State)

Before generating any output, silently establish context:

1. **`tabs_context_mcp`** — What tabs are open? Which is active?
2. **`read_page`** or **`get_page_text`** — Read the current portal page content
3. **Detect environment:**
   - `mception.ai` → production
   - `localhost:3000` → local dev (note: some features may differ)
   - Neither → tell Brady and offer to navigate to mception.ai
4. **Determine current page** — Parse the URL path to identify which project/section is active
5. **Time of day** — Morning (before noon) vs. afternoon vs. evening shifts priority weighting
6. **Day of week** — Weekend shifts away from client work, toward family/personal

---

## Phase 1: SCAN (Gather Cross-System Context — No Output Yet)

Pull data from available MCP integrations. If any source is unavailable, skip it and note the gap.

### 1.1 Google Calendar
- `list_events` — Today's remaining events + tomorrow's first 3
- Flag: conflicts, prep needed, open gaps > 90 min

### 1.2 Gmail
- `search_threads` — Unread threads from known client contacts and high-priority senders
- Flag: anything needing a reply that's > 4 hours old

### 1.3 Notion
- `notion-search` — Active project status in Client Projects DB and Internal Projects DB
- Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`) for unprocessed items (Status="Not Started")
- Flag: overdue tasks, stale projects, unprocessed pulse notes

### 1.4 Current Page Inspection
- What is Brady already looking at? Read the visible content.
- If on a project page, check for obvious issues: stale data, missing content, broken UI elements
- If on the portal home, note which projects have recent activity

### 1.5 Granola/Otter (if available)
- `list_meetings` — Recent recordings with unprocessed action items

---

## Phase 2: PRIORITIZE (Score and Categorize Actions)

Every detected action gets scored 1–10 and placed in one of four buckets:

### Scoring Criteria
- **Urgency** (0–3): Time-bound? Overdue? Meeting in < 2 hours?
- **Impact** (0–3): Client-facing? Revenue-bearing? Family safety?
- **Effort** (0–2): Quick win (< 5 min) gets +2; deep work gets +0
- **Context** (0–2): Is Brady already on the relevant page? +2 if yes

### Action Buckets

**Task Closure (red)** — Client deliverables, project milestones, follow-ups
- Examples: "STIHL daily briefing hasn't been generated," "Mark Schmulen needs CMO agent update,"
  "Panda deck is in draft," "Jeff's email needs a reply"

**System Improvements (gold)** — UI bugs, config changes, feature gaps on mception.ai
- Examples: "Grocery list page has a layout issue," "Content engine needs a publish button,"
  "School hub calendar showing stale data," "Chat config needs updating"

**Calendar Organization (blue)** — Scheduling gaps, prep needed, conflicts
- Examples: "2-hour gap at 2 PM — block for deep work," "Tomorrow's STIHL call needs pre-read,"
  "School pickup conflicts with 3:30 call"

**Content/Publishing (green)** — LinkedIn drafts, whitepaper publishing, content queue
- Examples: "3 LinkedIn drafts queued in content engine," "Weekly recap hasn't been published,"
  "Innovation lab has unsent idea briefs"

---

## Phase 3: REPORT (Present the Action Menu)

Output format:

```
══════════════════════════════════════════════════
MCEPTION NAVIGATOR — [time] CT
══════════════════════════════════════════════════
You're on: /[current-path] ([Project Name])
Next event: "[event name]" at [time] ([Xh Xm from now])

──────────────────────────────────────────────────
TOP 3 NEXT MOVES
──────────────────────────────────────────────────
1. [Score X] [bucket color] [Action description]
   → Navigate: /[path] → [what to do there]

2. [Score X] [bucket color] [Action description]
   → Navigate: /[path] → [what to do there]

3. [Score X] [bucket color] [Action description]
   → Navigate: /[path] → [what to do there]

──────────────────────────────────────────────────
FULL ACTION LIST
──────────────────────────────────────────────────

TASK CLOSURE (X items)
• [action] → [navigate to] → [what to do]

SYSTEM IMPROVEMENTS (X items)
• [action] → [navigate to] → [what to do]

CALENDAR (X items)
• [action] → [what to check/fix]

CONTENT (X items)
• [action] → [navigate to] → [what to do]

──────────────────────────────────────────────────
QUICK WINS (< 2 min each)
──────────────────────────────────────────────────
• [thing Brady can do right now]
```

If only 1–2 actions are found, skip the full list and just present the moves directly.

---

## Phase 4: EXECUTE (Guide Brady Through Chosen Actions)

When Brady picks an action (or says "do #1", "next", etc.):

1. **Navigate** — Use `navigate` to go to the right mception.ai page
2. **Confirm** — Use `read_page` to verify the page loaded correctly
3. **Locate** — Use `find` to identify specific elements Brady needs to interact with
4. **Guide** — Tell Brady exactly what to look at, click, or do
5. **Loop** — After completing an action, immediately suggest the next highest-priority move

If Brady says "just navigate" or names a specific page, skip the full scan and go directly.

---

## mception.ai Route Map

### Home
- `/portal` — Dashboard home

### Top-Level Projects
- `/kroger` — Kroger retail intelligence (iframe-local)
- `/content-engine` — Content drafting + publishing (native)
- `/innovation-lab` — Product idea generation (iframe-external → innovation-lab-silk.vercel.app)

### Family
- `/grocery-assistant` — Family food OS, 6 people (native)
  - `/grocery-assistant/list` — Shopping list (default landing)
  - `/grocery-assistant/meal-plan` — Weekly meal plan
  - `/grocery-assistant/pantry` — Pantry inventory
  - `/grocery-assistant/recipes` — Recipe library
  - `/grocery-assistant/dining` — Dining out tracker
  - `/grocery-assistant/scores` — Nutrition scores
  - `/grocery-assistant/budget` — Food budget
  - `/grocery-assistant/requests` — Family requests
- `/school-hub` — School command center, 5 kids (native)
  - `/school-hub/today` — Today's schedule (default landing)
  - `/school-hub/calendar` — Full calendar
  - `/school-hub/action-items` — Action items
  - `/school-hub/directory` — School directory
  - `/school-hub/kids/[kidId]` — Per-kid view
- `/financial-assistant` — Financial cockpit (iframe-local)

### VC / Startup
- `/baden-bagley` — VC portfolio intel (iframe-external)
- `/mark-schmulen` — CMO agent for Contour/PropMatic (iframe-external)

### Panda Engagement
- `/panda` — Panda Restaurant Group ops (iframe-local)
- `/ops-lab` — Operations innovation lab (iframe-external)

### Incubator
- `/stihl` — STIHL USA competitive intel (native)
  - `/stihl/today` — Daily briefings (default landing)
  - `/stihl/competitors` — Competitor profiles
  - `/stihl/digital` — Digital strategy
  - `/stihl/requests` — Client requests
  - `/stihl/artifacts` — Artifact library
  - `/stihl/about` — About
- `/gary` — IVFH fertility clinic (iframe-external)
- `/pauletteai` — Beauty brand advisor (iframe-local)
- `/orlando` — Orlando RE knowledge base (iframe-local)
- `/calculators/moving` — Moving calculator (native)

### Utility (admin/dev)
- `/notes/quick` — Quick notes
- `/notes/advanced` — Advanced queue
- `/dashboards/command-console` — Command console
- `/dashboards/portfolio` — Portfolio scorecard
- `/dashboards/vendor-portal` — Vendor portal
- `/knowledge` — Knowledge base
- `/about` — About page
- `/calculators/birthday` — Birthday planner
- `/calculators/wedding` — Wedding seating
- `/calculators/garage-sale` — Garage sale pricer
- `/calculators/fence-bid` — Fence bid checker

### System
- `Cmd+K` — Global chat panel (project-aware, slash command navigation)
- `/user-profile` — User profile settings
- `/group/[id]` — Group landing pages

---

## MCP Tools Used

| Tool | Purpose |
|------|---------|
| `tabs_context_mcp` | See open tabs, identify active tab |
| `read_page` | Read current page content/structure |
| `get_page_text` | Get text content from current page |
| `navigate` | Go to a specific mception.ai URL |
| `find` | Locate UI elements on the page |
| `computer` | Click, scroll, interact with elements |
| `list_events` (Google Calendar) | Today's remaining events + tomorrow preview |
| `search_threads` (Gmail) | Unread actionable email threads |
| `notion-search` (Notion) | Active project status, unprocessed notes |
| `list_meetings` (Granola) | Recent meeting recordings |

---

## Edge Cases

### Not on mception.ai
If the active tab is not `mception.ai` or `localhost:3000`, tell Brady and offer to navigate there.
Do not attempt to scan a non-portal page as if it were the portal.

### Production vs. Local Dev
Detect from URL. If `localhost:3000`, note that some features may differ from production.
If Brady needs to start the dev server, reference the `mception-local-dev` skill.

### Weekend / Evening
Shift priority weighting:
- Suppress client work items (task closure bucket deprioritized)
- Elevate family projects (grocery, school hub) and personal items (content, calendar)
- Saturday/Sunday: skip client brief checks entirely unless Brady asks

### Iframe Projects
Projects typed `iframe-external` or `iframe-local` render in iframes. The `get_page_text` tool
cannot read inside cross-origin iframes. For these projects:
- Navigate to the page and confirm it loaded
- Note the limitation: "This is an iframe project — I can see the page wrapper but not the embedded content"
- Suggest Brady check the iframe content directly

### Degraded MCP Access
If Gmail, Calendar, Notion, or Granola MCP integrations are unavailable:
- Skip those scan sources
- Note what's missing in the report header: "Scanned: Calendar, Gmail | Unavailable: Notion, Granola"
- Still provide value from browser-only inspection

### "Just Navigate"
If Brady says "go to /stihl" or "take me to grocery list" — skip the full scan/report flow.
Navigate immediately and confirm the page loaded.

---

## What This Skill Does NOT Do

- **Replace morning-sweep** — Morning sweep is the comprehensive daily gather (CoWork). Navigator is browser-side execution guidance.
- **Write to Notion, send emails, or modify files** — It navigates and surfaces information. Brady acts.
- **Run on CoWork or Claude Desktop** — This is exclusively a Claude-in-Chrome skill.
- **Duplicate the global chat (Cmd+K)** — Chat answers questions within a project. Navigator orchestrates across projects and suggests what to do next.
- **Access iMessage or local file system** — Those are CoWork-only tools, not available in Chrome.
- **Make strategic decisions** — It surfaces options. Brady picks.
