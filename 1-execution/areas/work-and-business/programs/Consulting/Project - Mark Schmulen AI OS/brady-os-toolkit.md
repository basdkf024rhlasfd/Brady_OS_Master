# Brady OS Toolkit — Packaged for Mark Schmulen

> Curated frameworks from Brady's operating system that give Mark's CMO agent a head start. These aren't theoretical — Brady uses them daily. Mark gets the battle-tested versions.

## What's Included

### 1. OS Doctrine — Governance Horizons
**Source:** `3-reference/os-doctrine.md`
**What Mark gets:** A three-tier decision framework that prevents daily urgency from hijacking strategy.

| Horizon | Role | Mark's Application |
|---------|------|--------------------|
| **The Day — Player** | Execute tasks, adapt tactically | Post the LinkedIn draft, respond to the prospect, run the experiment |
| **The Cycle — Coach** | Improve systems, start/stop projects | Adjust content cadence, swap agent sub-skills, review what's working |
| **The ARC — Commissioner** | Decide where to play and how to win | Add/remove a company from the content strategy, change target market, pivot messaging |

**Key rules for Mark:**
- Never redesign the system on a bad day
- Never trust urgency with strategy
- ARC decisions cannot be made daily
- If a Day decision would bind you for more than 2 weeks, it belongs at the Cycle horizon

**Why this matters for the CMO agent:** The agent operates at Day level. It executes tasks and adapts tactically. It does NOT make strategy decisions, change brand positioning, or commit budget. Those require Mark (Cycle) or Mark + advisor (ARC).

---

### 2. Olympics Framework — How Projects Spin Up
**Source:** `3-reference/olympics.md`
**What Mark gets:** A model for how agents form teams, draft specialists, and disband when done.

**Mark's translation:**
- **Areas** = Mark's business portfolio (PropMatic, Saivory, Jelly Capital)
- **Programs** = Long-lived marketing functions (Content, Demand Gen, Analytics, EA)
- **Projects** = Time-bound campaigns or initiatives ("Q2 LinkedIn push," "Shipley case study")
- **Tasks** = Individual actions ("Draft LinkedIn post," "Scrape competitor site")

**Drafting rules:**
- The CMO orchestrator is the team captain — it drafts sub-agents per request
- Sub-agents (Content, Demand Gen, etc.) are specialists drafted from the roster
- An agent can serve multiple projects simultaneously
- When a project completes, lessons go to memory, agents return to roster

**Why this matters for the CMO agent:** When Mark says "plan a Q2 content push for PropMatic," the orchestrator knows to draft Content + EA + Demand Gen agents, define success criteria, and set a timeline. It's not one agent trying to do everything.

---

### 3. Project Kickoff Scoreboard — Gold/Silver/Bronze
**Source:** `3-reference/project-kickoff.md`
**What Mark gets:** A structured way to define what winning looks like for any marketing initiative.

**The scorecard method:**
1. **Customer Victory Condition** — What does winning look like from the renter's/restaurant's chair?
2. **Customer Key Results** (1-3) — Measurable outcomes from the customer's perspective
3. **Internal Victory Condition** — What does gold medal look like for Mark?
4. **Internal Key Results** (1-3, scored 0-1.0) — Gold (0.7+) / Silver (0.4-0.6) / Bronze (0.1-0.3) / DNS (0.0)
5. **Leading Indicator** — One early signal to check weekly

**Example for Mark's first campaign:**

| Element | Value |
|---------|-------|
| Customer Victory | Property operators discover PropMatic exists and understand why it matters |
| Customer KR1 | 50 operators visit propmatic.co from LinkedIn in Q2 |
| Internal Victory | Mark's LinkedIn becomes a pipeline source for PropMatic |
| Internal KR1 | 4 LinkedIn posts published in April (1/week) — Score: _/1.0 |
| Internal KR2 | 3 inbound DMs from target personas by April 30 — Score: _/1.0 |
| Leading Indicator | Weekly post engagement rate (likes + comments) |

**Why this matters for the CMO agent:** Every campaign the Demand Gen agent plans should include a scoreboard. The agent shouldn't propose "post more on LinkedIn" — it should propose "4 posts/week targeting VP Leasing personas, measured by inbound DMs, gold at 3+ DMs/month."

---

### 4. Voice Profile Template
**Source:** `0-agents/custom-built-agents/content-drafter.md` + `Project - LinkedIn and Substack Content Engine/VOICE-PROFILE.md`
**What Mark gets:** The exact structure Brady uses to train his own content agent. Mark fills in his version.

**Voice Profile Structure:**
```
1. TONE — How Mark sounds (confident? casual? technical? storytelling?)
2. STRUCTURE — Paragraph length, punctuation habits, opening/closing patterns
3. VOCABULARY — Words Mark uses vs. words he avoids
4. CONTENT DNA — What makes Mark's content uniquely Mark's
5. ANTI-PATTERNS — "Never use" list (the most important section)
6. CALIBRATION SENTENCES — 10-15 actual sentences from Mark's writing/speaking
7. PLATFORM NOTES — How voice shifts between LinkedIn, Substack, email
```

**How to build it:**
- Brady pre-drafts from public content (DONE — see `kb/brand-voice.md`)
- Mark redlines on tomorrow's call (15 min)
- Agent stores every correction as a memory file
- Voice profile improves with every piece of content Mark reviews

---

### 5. Content Prompt Templates
**Source:** `Project - LinkedIn and Substack Content Engine/PROMPT-LIBRARY.md`
**What Mark gets:** 8 battle-tested prompt templates adapted for Mark's voice.

| Template | Use Case | Mark's Adaptation |
|----------|----------|-------------------|
| LinkedIn Opinion Post | Industry takes, frameworks | PropMatic thesis, multifamily trends |
| LinkedIn Story Post | Personal narratives | Founder journey, exit stories, Fifth Wall EIR |
| LinkedIn Proof Post | "Here's what I built" | Shipley results, PropMatic demos, MCP wins |
| Substack Thesis Essay | Deep industry arguments | "Delete the Middleman" series |
| Substack Founder Story | Career arc, decisions | NutshellMail → Chirp → PropMatic journey |
| Substack Case Study | Project walkthroughs | Shipley implementation, PropMatic customer stories |
| Substack Thought Leadership | Industry POV | AI search, MCP, restaurant tech disruption |
| Raw-to-Draft Converter | Messy input → clean output | Voice memos, meeting notes, half-formed ideas |

Each template includes: voice rules, anti-patterns, format rules, and a `{RAW_INPUT}` slot for Mark's material.

---

### 6. Narrative Architecture — Story as Compression
**Source:** `3-reference/narrative-architecture.md`
**What Mark gets:** The principle that story is not decoration — story is how you compress complex ideas into memorable content.

**Key concepts for Mark's content:**
- **Character** — Mark is the protagonist. His track record IS the narrative engine.
- **Arc** — Each piece of content moves from a problem state to an insight. Not "here's what I know" but "here's what I discovered."
- **Tension** — The best content has a genuine question the reader doesn't know the answer to. "Will AI search replace listing aggregators?" has tension. "AI is important for real estate" has none.
- **"Yes And"** — When the agent builds on Mark's raw material, it accepts the premise and adds to it. It doesn't redirect or sanitize.

**Why this matters for content quality:** Mark's companies have inherently dramatic stories — a startup challenging billion-dollar aggregators, an AI ordering platform doubling order values for a 330-location chain. The agent should find and amplify that drama, not flatten it into corporate messaging.

---

### 7. Recursive Learning Loop
**Source:** `3-reference/project-kickoff.md` (Recursive Learning section) + OS Doctrine
**What Mark gets:** The system gets smarter every time Mark uses it.

**How it works:**
1. Agent produces output (LinkedIn post, email draft, campaign plan)
2. Mark reviews and corrects ("I'd never say 'synergize'" or "Too long, cut to 200 words")
3. Correction is saved to `memory/` with date and specifics
4. Next time the agent generates content, it loads memory files first
5. Over time, the agent's voice match improves measurably

**The scorecard tracks this:** Brand Voice Enforcement score moves from 1 → 10 as corrections accumulate and the agent stops repeating mistakes.

**Mark's effort:** 2 minutes per review. The agent does the rest.

---

## How to Install This Toolkit

Mark doesn't need to read or understand these frameworks. They're embedded in the agent architecture:

| Framework | Where It Lives in the Agent |
|-----------|---------------------------|
| OS Doctrine | Guardrails + escalation rules in `SKILL.md` |
| Olympics | Sub-agent routing + team formation in orchestrator |
| Scorecard | Campaign planning template in `skills/demand-gen.md` |
| Voice Profile | `kb/brand-voice.md` (loaded on every content request) |
| Prompt Templates | Embedded in `skills/content-marcomms.md` + `skills/substack-publishing.md` |
| Narrative Architecture | Content DNA instructions in each sub-agent |
| Recursive Learning | Memory instructions in `SKILL.md` |

**Mark experiences the frameworks through the agent's behavior. He never has to read a governance document.**
