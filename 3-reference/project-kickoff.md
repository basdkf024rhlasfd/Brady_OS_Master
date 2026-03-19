# Project Kickoff Guide

When a new project starts, walk through this guide to stand up all 4 layers. The output is a **project manifest** (`PROJECT.md`) that lives in the project's repo or workspace.

Three speeds — pick the one that fits:

| Speed | When | What to do |
|-------|------|------------|
| **Full kickoff** | New program or high-stakes project | Walk through all steps below |
| **Light kickoff** | Familiar project type | Pick template, draft 2-3 agents, fill in manifest |
| **Instant kickoff** | Solo task or experiment | Just go — retrofit the manifest if it grows |

---

## Step 1 — Define the Customer Problem

This comes first. If you can't articulate the problem, the project isn't ready.

- [ ] **Who specifically?** Not a market segment — a person, role, and context. ("Solo founder, post-revenue, pre-hire, doing their own bookkeeping")
- [ ] **Trigger moment**: When do they feel the pain? What specific moment or event makes it real? ("They open Stripe on Monday morning and can't tell if last week was good or bad without 20 minutes of clicking")
- [ ] **Current workaround**: What do they do today instead? This IS your indirect competitor. ("They export CSVs into a spreadsheet every week")
- [ ] **Cost of status quo**: What does not solving this cost them — in time, money, or energy? ("3 hours/week of manual work, plus decisions made on stale data")
- [ ] **Evidence**: How do you know this is real? Conversations, data, personal experience, market signals. If you can't answer this, the problem might be hypothetical.

---

## Step 2 — Name the Competition

Every project has a competitor. Name it before you draft a team.

- [ ] **Direct competitor**: Who else is building this or serving this market?
- [ ] **Indirect competitor**: What alternative does the customer currently use? (including "do nothing" — often the hardest to beat)
- [ ] **Time as competitor**: If no one's competing yet, the window is the opponent. Good ideas attract fast followers. How long until someone else does this?

The competitor changes everything — urgency, scope, team size, how fast you ship. A project racing a direct competitor gets a different team than one racing a clock.

---

## Step 3 — Set the Scoreboard

Use OKR methodology adapted for project-level work.

### For projects with a customer/end user (consulting, products, services):

Define the **customer scoreboard first**, then the internal scoreboard. You can't build a good product by optimizing for your own KPIs.

- [ ] **Customer Victory Condition** (1 sentence): What does winning look like from the customer's chair?
- [ ] **Customer Key Results** (1-3 max): What outcomes does the customer need? Measured from their perspective.
- [ ] **Internal Victory Condition** (1 sentence): What does gold medal look like for you?
- [ ] **Internal Key Results** (1-3 max, scored 0–1.0):
  - Each must be measurable and time-bound
  - Scoring: **Gold (0.7+)** / **Silver (0.4–0.6)** / **Bronze (0.1–0.3)** / **DNS (0.0)**
- [ ] **Connection**: How do internal KRs follow from customer KRs? If the customer wins, does that naturally lead to your wins?
- [ ] **Leading Indicator** (1 only): One early signal you can check weekly to know if you're on track *before* the Key Results move.

### For internal projects (no external customer):

- [ ] **Victory Condition** (1 sentence): What does gold medal look like? Qualitative and ambitious.
- [ ] **Key Results** (1-3 max, scored 0–1.0):
  - Each must be measurable and time-bound
  - Scoring: **Gold (0.7+)** / **Silver (0.4–0.6)** / **Bronze (0.1–0.3)** / **DNS (0.0)**
- [ ] **Leading Indicator** (1 only): One early signal you can check weekly to know if you're on track *before* the Key Results move.

| Project Type | Example Customer KR | Example Internal KR | Example Leading Indicator |
|---|---|---|---|
| Consulting engagement | Client briefs leadership in <5 min using the surface | Convert to retainer by date | Client opens surface weekly, copies prompts |
| Product launch | Users complete core workflow without help | 500 signups by June 1 | Weekly landing page visits |
| Content project | Reader takes the recommended action | 10K views within 7 days | Draft completion % on schedule |
| MVP build | Tester completes 3 tasks without confusion | Working demo by May 1 | Features merged per week |

The leading indicator is your in-game stat — it tells the coach whether to adjust the play before the final score is locked.

---

## Step 4 — Define the Project (Layer 1: Execution)

- [ ] **Project name**: What is this?
- [ ] **Program**: Which Program does this belong to? (Must be one from `1-execution/programs/`)
- [ ] **Timeline**: Start date, target end date, any hard deadlines
- [ ] **Authority**:
  - Who has **Day-level** authority? (can make execution decisions)
  - Who has **Cycle-level** authority? (can adjust scope, swap agents)
  - **ARC-level** always stays with the Commissioner (Brady)

---

## Step 5 — Draft the Team (Layer 0: Agents)

- [ ] **Choose a team template** (optional): Browse `3-reference/team-templates/` for a matching pattern
- [ ] **Draft agents**: Pull from `0-agents/` (personal) and/or community talent pool (agency-agents repo)
- [ ] **Assign roles**: Each agent gets a project-specific role (Lead, Builder, Reviewer, Strategist, Specialist, or custom)
- [ ] **Set interaction rules**: How do agents communicate? Who reviews whose work? How are disagreements resolved?

Guidelines:
- Every project needs at least one agent with Day-level authority
- Personal agents typically take Lead/coordination roles (they know the OS context)
- Community agents typically fill Specialist roles (they bring domain expertise)
- An agent can be on multiple projects — drafting doesn't change their profile

---

## Step 6 — Set Up Memory (Layer 2: Memory)

Memory = where unstructured thinking, notes, and communication for this project land.

- [ ] **Notion Project page**: Create in the Projects database, linked to the correct Program
- [ ] **Task intake**: Where do new tasks for this project get captured? (Notion Tasks DB, linked to this Project)
- [ ] **Notes location**: Where do meeting notes, voice notes, and diary entries about this project go? (Notion Memory layer, tagged to this Project)
- [ ] **Communication channel**: Where does the team communicate? (Conductor workspace, Claude thread, ChatGPT thread, etc.)

Rule: Memory always lives in Notion. The project repo links to it but does not duplicate it.

---

## Step 7 — Establish Reference (Layer 3: Reference)

Reference = the rules, specs, and structured knowledge for this project.

- [ ] **Project repo/workspace**: Where does the actual work live?
  - Code projects → GitHub repo
  - Non-code projects → Notion workspace or dedicated page
  - Conductor workspace → for multi-agent orchestration
- [ ] **Deliverables location**: Where do outputs get saved? (repo, Notion, shared drive, etc.)
- [ ] **PROJECT.md**: Create the project manifest in the project repo (see template below)
- [ ] **Relevant OS docs**: Link any OS governance docs that apply (team templates, program doctrine, etc.)

---

## Step 8 — Create the Manifests

Every project gets a `PROJECT.md`. Projects with a customer or end user also get a `CUSTOMER.md`.

| File | Required? | Audience | Purpose |
|------|-----------|----------|---------|
| `PROJECT.md` | Always | Internal | Your goals, team, authority, financials, learning loop, dirty details |
| `CUSTOMER.md` | When there's a customer | Customer-facing | Their goals, what they receive, how success is measured from their chair |

**The rule:** Design the product around CUSTOMER.md. Manage the engagement around PROJECT.md. If the customer wins, you win. If there's a conflict between customer KRs and internal KRs, customer KRs take priority.

---

# PROJECT.md Template (Internal)

```markdown
# [Project Name] — Internal

> **Internal project manifest.** Contains Brady's goals, team mechanics, and operational details.
> For the customer-facing version, see [CUSTOMER.md](CUSTOMER.md).

## Program
[Which Program this belongs to — link to program doctrine]

## Customer Problem
- **Who specifically:** [person, role, context — not a market segment]
- **Trigger moment:** [when/where do they feel the pain?]
- **Current workaround:** [what do they do today instead?]
- **Cost of status quo:** [time, money, or energy lost]
- **Evidence:** [conversations, data, personal experience — how do you know?]

## Competition
- **Direct:** [who else is building this / serving this market?]
- **Indirect:** [what alternative does the customer use today?]
- **Time pressure:** [how long until someone else does this?]

## Scoreboard

### Customer Goals (define first)
- **Victory Condition:** [what does winning look like from the customer's chair?]
- **Key Results:**
  - KR1: [measurable, from customer's perspective]
  - KR2: [measurable, from customer's perspective]
- **Leading Indicator:** [early signal that customer goals are being met]

### Internal Goals (define second)
- **Victory Condition:** [what does gold medal look like for you?]
- **Key Results:**
  - KR1: [measurable, time-bound] — Score: _/1.0
  - KR2: [measurable, time-bound] — Score: _/1.0
  - KR3: [optional] — Score: _/1.0
- **Leading Indicator:** [one early signal, checked weekly]

### How They Connect
[How do internal KRs follow from customer KRs? If the customer wins, how does that lead to your wins?]

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Start: [date]
- Target end: [date]
- Hard deadlines: [if any]

## Team

| Agent | Role | Profile |
|-------|------|---------|
| [name] | Product Owner | [link] |
| [name] | Builder | [link] |
| [name] | Reviewer | [link] |

### Interaction Rules
[How agents communicate, review each other's work, resolve disagreements]

### Authority
- Day (execution decisions): [agent name]
- Cycle (scope/team changes): [agent name or Brady]
- ARC (project kill/pivot): Brady

## Recursive Learning
[For ongoing engagements: how does the system get smarter? Link to learning framework.]

## Where Things Live

| What | Where |
|------|-------|
| Code / deliverables | [GitHub repo URL] |
| Tasks | [Notion Tasks DB, filtered to this project] |
| Notes / memory | [Notion Memory layer, tagged to this project] |
| Communication | [Conductor workspace / Claude thread / etc.] |
| Internal manifest | This file |
| Customer manifest | [CUSTOMER.md](CUSTOMER.md) |
| OS governance | [Brady_OS_Master repo URL] |

## Status
- Phase: [not-started / active / blocked / complete]
- Last updated: [date]
- Final medal: [pending / Gold / Silver / Bronze / DNS]
```

---

# CUSTOMER.md Template (Customer-Facing)

```markdown
# [Project Name] — What Success Looks Like

## Who This Is For
[Customer name, title, company]

## The Problem We're Solving
[Plain English description of what the customer struggles with today — written from THEIR perspective, not yours. No internal jargon.]

## What You Get
[Section-by-section description of what the customer receives. Each section should answer: what is it, what does it do for me, why should I care?]

## How We Measure Success
[3-5 outcomes that matter from the customer's chair. Each one should follow the pattern:
- **Before:** [what their life looks like today]
- **After:** [what their life looks like with this working]
]

## What This Is Not
[Clear boundaries so expectations are set correctly.]

## How It Works
[Simple description of the ongoing interaction — what happens week to week, how they use it, how it improves.]

## Timeline
[When they get what.]
```

---

## After Kickoff

- **Day-level**: Execute tasks, follow interaction rules, log notes to Memory
- **Cycle-level**: Review progress, adjust scope or team if needed, update manifest
- **Completion**: Update status to complete, disband team (agents return to roster), capture lessons in Memory, update Program metrics if applicable
