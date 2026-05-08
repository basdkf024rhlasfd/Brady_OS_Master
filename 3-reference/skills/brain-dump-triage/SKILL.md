---
name: Brain Dump Triage
description: Process a large unsorted dump of items (Apple Reminders, voice notes, scratch list, etc.) into a one-section-at-a-time Notion checklist with H3 toggles. For when there's too much in active memory and the lift of organizing alone is the blocker.
trigger:
  - "brain dump"
  - "active memory dump"
  - "got too much in my head"
  - "too many things going on"
  - "process my reminders"
  - "triage my list"
  - "I just dumped a bunch of stuff"
  - "organize all of this for me"
  - "drain my reminders"
roster_state: Active
owner: Claudine + Finn
---

# Brain Dump Triage

When Brady's been carrying too much in his head and dumps it all at once, this skill turns the pile into a stress-reducing **Notion checklist with collapsible H3 toggles** so he can work one section at a time.

## When to invoke

Brady's said any of the trigger phrases above OR he's pasted/recorded a >30-item dump and asked for help making sense of it. The volume is the signal — if the list is small (<10 items), just route straight to Streaming Notes; this skill is the *visualizing* tool for big piles.

## Inputs the skill needs

1. **Source of the dump.** In order of preference:
   - Apple Reminders → read directly from SQLite at `~/Library/Group Containers/group.com.apple.reminders/Container_v1/Stores/Data-*.sqlite`. The store with the most rows where `ZCOMPLETED=0` is the iCloud-synced one. Do NOT route through AppleScript / `reminders-cli` — they hit the TCC permission wall and leave Brady mid-flow. Direct SQLite read works around the wall durably.
   - Otter recording → query Otter MCP for recent recordings and `fetch` the transcript.
   - Pasted text → just take it.
   - Markdown / text file → just read it.
2. **Disposition guidance** — this is what turns a pile into a plan. Brady gives this via:
   - A follow-up Otter recording walking through his numbered list with instructions per item.
   - A typed reply.
   - Implicit (skill makes calls based on Claudine + Finn judgment when guidance is sparse).

## Process

### Step 1 — Show full numbered list FIRST, before any organizing

Critical rule: **don't summarize before he's verified your read on each item.** Brady's voice-to-text dumps contain transcription noise and shorthand only he understands. Show every item verbatim, globally numbered (1..N), grouped lightly by domain. Mark interpretation flags inline with `[?]` for items where intent is unclear.

If the user objects to the summary level ("this is too summarized for me to be confident you understood"), expand to full list with originals — never less.

### Step 2 — Wait for disposition guidance

Do NOT pre-route items. Let Brady speak/type his decisions. Common patterns:
- "Group X and Y together"
- "Move to Sunday" / "Tonight at 7pm" / "Tomorrow"
- "Add to Finn list / Amazon list / Walmart list"
- "Delete that group"
- "It's a duplicate of Y"
- "Put in negotiation list"
- "Big decision"

### Step 3 — Apply disposition

Process by destination:

| Disposition | Where it goes |
|---|---|
| Time-locked (specific date/time) | **Calendar event** (primary cal). Recurring → use RRULE. |
| Money / claim / account / sub | **Finn batch** (one of: Insurance, Account closes, Easy wins, At-the-computer, Other paid help) |
| Consumable / grocery sub | Subscription Changes list (Finn maintains) |
| One-off Amazon | Amazon list |
| One-off Walmart | Walmart list |
| Delegation (cleaner/contractor/family) | SOP doc + draft text to recipient |
| Kid chore / paid role | Summer Chores plan with pay table |
| 1915 South / client comp / business | Negotiation roll-up |
| Decision (not action) | Bigger Decisions queue |
| OS / agent build | Musashi queue (Streaming Notes Execution Request) |
| Outdoor / indoor projects | Reordered project list (TOP/MIDDLE/LOWER) |
| Note / memory / not-action | Notes section (no checkbox) |
| Past / irrelevant | Delete |

### Step 4 — Build the Notion checklist page

**Parent page:** Memory Layer (`2c7ed43b89c58084be01e842aa6a0305`) for one-time triages. If Brady asks for it to live somewhere specific, honor that.

**Title pattern:** `Brain Dump Triage — YYYY-MM-DD`

**Page structure (mandatory):**

1. Top callout (blue_bg) — date + intent: "Open one toggle. Close it. Move on."
2. **H3 toggle headings** for every section. Children indented with **TABS** (Notion-flavored markdown requires tabs for toggle children).
3. To-do checkboxes (`- [ ]`) for actionable items. Use `- [x]` for items already completed by the skill (e.g., calendar events created).
4. Drafted texts go inside their relevant toggle as a quote block (`>`) so Brady can copy-paste-send.
5. Bottom callout (green_bg) — reminder that collapsing toggles shrinks the page as he progresses.

**Color coding (consistent across runs):**

| Section | Color |
|---|---|
| Time-locked / calendar | gray_bg |
| Today action queue | red_bg |
| Finn batches | green_bg |
| Subscriptions / shopping | purple_bg |
| Cleaner / household delegations | blue_bg |
| Summer chores / kids paid roles | orange_bg |
| Furniture | brown_bg |
| Outdoor projects | green_bg |
| Indoor re-org | gray_bg |
| Health / appointments | pink_bg |
| OS builds / business | yellow_bg |
| Bigger Decisions | pink_bg |
| Open flags | red |
| Notes / non-action | gray |

**H3 toggle syntax (Notion-flavored):**
```
### Section title {toggle="true" color="green_bg"}
	- [ ] To-do item
	- [ ] Another to-do
```
Children must be indented with TABS, not spaces.

### Step 5 — Create calendar events for time-locked items

For every item with an explicit date/time, create a Google Calendar event on the primary calendar:
- Use `📬 ` style emoji prefix for visual identification
- Description includes source tag: `Source: Apple Reminders triage YYYY-MM-DD`
- Recurring items use `RRULE:FREQ=DAILY` or `RRULE:FREQ=WEEKLY;BYDAY=XX`
- Set popup reminders (`overrideReminders` with method=popup, minutes=0 or 15)

### Step 6 — Save markdown copy to .context/

Write a copy of the master triage to `.context/reminder-triage-YYYY-MM-DD.md` so it's durable in the local repo workspace and Brady can grep it later. `.context/` is gitignored — that's fine, this is a personal artifact.

### Step 7 — Surface open flags

Always end the chat response with the unresolved interpretation flags. Brady's voice-to-text is noisy; never silently assume.

## Outputs (chat response shape)

Keep it tight. The Notion page IS the work product — chat should:
1. Confirm calendar events created (table of new events)
2. Show drafted texts (Karissa, Chelsea, etc.) ready to copy-paste
3. Link to the Notion page
4. Link to the local markdown copy
5. List open flags explicitly
6. Ask the next-move question (a/b/c/d options if relevant)

## Anti-patterns (do NOT)

- **Do NOT tell Brady to do manual things** (paste, screenshot, restart, grant permissions). If a tool wall blocks you, find the durable workaround (SQLite read, CLI install, MCP route). See: System Instruction "Always think future-state, not now-state."
- **Do NOT collapse the list before Brady verifies.** Show full numbered list first, accept correction, then organize.
- **Do NOT auto-route items without disposition guidance** when Brady has indicated he wants to direct each one. Default to action when guidance is sparse, but defer when he's actively giving direction.
- **Do NOT mix the durable skill artifacts with one-time triage data.** The Notion page is the deliverable; the skill itself stays generic.
- **Do NOT skip the Otter check** when Brady says "I just recorded context" — pull the recording and use it as the disposition source.

## Connectors used

| Tool | Purpose |
|---|---|
| Bash + sqlite3 | Direct read of Apple Reminders store |
| Otter MCP (search + fetch) | Pull voice disposition guidance |
| Google Calendar MCP | Create time-locked events |
| Notion MCP (create-pages) | Build the checklist page with H3 toggles |
| Gmail MCP (optional) | Look up context on names/emails Brady references |
| Local Write | Save .context/ markdown copy |

## Related skills

- `streaming-notes-processor` — for routing individual items to Streaming Notes pipeline (this skill produces a Notion checklist; processor handles single-item flow)
- `morning-sweep` — runs daily; if Brady's brain dump *is* the morning context, this skill folds into Phase 0
- `evening-sweep` — closes the day's progress; collapsed toggles show end-of-day state
- `claudine-onboarding` — supplies the Claudine + Finn lens for grouping/judgment

## Self-scoring (Hygiene Heidi)

Score 1-10 each run on:
1. **Faithful read** — did every item show up before organizing? (1-10)
2. **Disposition coverage** — did every directed item land where Brady directed? (1-10)
3. **Visual clarity** — does the Notion page actually feel less stressful than the dump? (1-10)
4. **Durable persistence** — calendar events + Notion page + markdown copy all created? (1-10)
5. **Future-state thinking** — zero "do it yourself" deflections to Brady? (1-10)

Target composite: 9+/10. Below 7 = log to Streaming Notes as Phil flag with proposed fix.
