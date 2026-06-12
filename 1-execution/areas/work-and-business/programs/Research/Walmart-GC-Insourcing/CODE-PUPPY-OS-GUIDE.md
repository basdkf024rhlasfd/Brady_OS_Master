# Building a Team Operating System Inside Code Puppy
**A Rebuild Guide — Adapted from Brady OS**
*Prepared for Mark | June 2026*

---

## What This Is

This is a rebuild guide for a personal and team operating system using Code Puppy as the primary AI runtime.

It is not a productivity hack stack. It is a governance architecture. The difference matters — productivity tools help you do more things faster. A governance system helps you do the right things at the right level, and protects long-term direction from short-term noise.

The model below has been running in the wild for 18+ months across consulting, board work, and personal operations. This guide translates it into what is actually achievable inside Walmart's tooling stack with Code Puppy as the AI interface.

---

## The Core Problem This Solves

Most people use AI tools the same way they use Google — reactive, one-off, no memory, no role definition. Every session starts over. The AI has no idea what matters, what's already decided, or what the horizon is.

The result: AI as a lookup tool, not a management layer.

This system changes the input. Instead of asking Code Puppy isolated questions, you give it structured context — a role definition, a set of rules, a current project state — and it becomes a consistent operating partner. Same briefing, every session. The AI stops being a search engine and starts behaving like a chief of staff.

---

## The Four Layers

Structure the system into four layers. These work regardless of your tool choices.

### Layer 0 — Agents

Named AI roles with defined purposes, tones, and scope limits. Not one generic "AI assistant" — distinct roles assigned to distinct work.

An agent is not a chatbot. It is a persona with:
- a stated purpose
- a working style
- a list of what it will and won't do
- a handoff protocol

Agents live in a shared document your team can read and reference. When you open Code Puppy for a specific function, you paste that agent's definition at the top of the session.

### Layer 1 — Execution

The work hierarchy:

`Areas → Programs → Projects → Tasks`

- **Areas** are durable domains of responsibility. They change rarely. For a tech/legal insourcing function: `Build Capacity`, `Governance & Risk`, `Vendor Relationships`, `Team Development`, `Org Health`.
- **Programs** are standing commitments inside an Area that persist even when no project is active. The insourcing initiative is a Program. Talent pipeline is a Program. Code review standards are a Program.
- **Projects** are temporary interventions that upgrade a Program. They start and end.
- **Tasks** are atomic moves. They are not where meaning lives.

The most common mistake: collapsing everything into one task list. When that happens, a two-hour sprint sits next to a six-month strategic commitment and no one can tell the difference.

### Layer 2 — Memory

The intake layer. Raw notes, meeting transcripts, email threads, and unprocessed ideas land here before any interpretation happens. Memory is a staging area, not a database.

Walmart equivalent: a dedicated Teams channel, a Confluence "Inbox" page, or a shared OneNote section. The rule — raw input must land somewhere before it gets routed to Execution. If notes go straight to task lists, context is lost forever.

### Layer 3 — Reference

The law library. Doctrine, templates, decision rules, and reusable patterns. Nothing changes here without a conscious decision. This is where you store:
- team operating principles
- agent definitions
- skill playbooks (reusable SOPs)
- decision frameworks

In Walmart tooling: a Confluence space or SharePoint site. Read-only for most team members, maintained by the system owner.

---

## Code Puppy as the Runtime

Code Puppy does not have persistent memory across sessions. That is the primary constraint to design around.

The solution: **context files**. Before any substantive Code Puppy session, paste in a structured briefing. The briefing contains:
- which agent role is active for this session
- the current state of the relevant Project
- the rules and constraints that apply
- one or two decisions already made that should not be reopened

A context file is typically 200–400 words. It takes 30 seconds to paste. It transforms the session.

### Starter Context File Structure

```
AGENT: [role name]
PURPOSE: [one sentence — what this agent does]
RULES: [3-5 constraints: what it will and won't do]
CURRENT PROJECT: [name, status, one-line description]
OPEN QUESTION: [what you need from this session]
DO NOT REOPEN: [decisions already made]
```

That is the minimum. Add more context as needed. The more specific the briefing, the tighter the output.

### What Code Puppy Can Own

- **Drafting**: first-pass memos, meeting agendas, team comms, policy summaries
- **Synthesis**: distilling long documents, meeting transcripts, or research into structured summaries
- **Analysis**: comparing options, stress-testing arguments, identifying gaps
- **Skill execution**: running a defined playbook (weekly review, stakeholder brief, intake processing)
- **Devil's advocate**: pressure-testing a decision before it ships

### What Code Puppy Cannot Own

- Decisions that require org authority
- Actions that change system state outside the session (no write access to Jira, no calendar hooks)
- Anything requiring real-time external data Code Puppy cannot access
- Confidential legal content unless cleared through Walmart's AI governance policy

Know the boundary. Agents operate inside it. Advisory output stays advisory until a human executes.

---

## Building the Structure in Walmart Tools

You do not need new software. Use what is already approved.

| Layer | Walmart Tool |
|---|---|
| Agents (definitions) | Confluence page or SharePoint doc |
| Areas + Programs | Confluence space, structured hierarchy |
| Projects | Jira (or a Confluence project page if simpler) |
| Tasks | Jira, ServiceNow, or a Confluence task table |
| Memory / Inbox | Teams channel pinned post, OneNote section, Confluence "Inbox" |
| Reference / Doctrine | Confluence — locked for editing except by system owner |

One architectural rule: **Confluence is read-only for Code Puppy.** Code Puppy reads it (you paste relevant sections in), but Code Puppy output must go through a human before it changes any system of record. No autonomous writes.

---

## Starter Agent Roster

Start with four. Add more only when the work demands it.

### 1. Chief of Staff

Purpose: morning briefing, priority compression, blocker surfacing, first-move recommendation.

Working style: terse, decisive, no throat-clearing. Gives a recommendation and a first move. Does not summarize what you already said.

Scope: daily and weekly operating rhythm. Does not own long-arc strategy.

### 2. Archivist / Operator

Purpose: routes raw intake (meeting notes, emails, ideas) to the right place. Keeps system structure clean. Surfaces items that have been sitting in Memory too long.

Working style: neutral, methodical. Asks one routing question at a time: "Is this a task, a note, a reference item, or a decision?"

Scope: Memory → Execution routing. Does not write to any system — it advises the human on what to do.

### 3. Analyst / Synthesizer

Purpose: turns messy input into structured output. First-pass drafts, document synthesis, option comparisons, gap identification.

Working style: thorough, structured. Asks clarifying questions before drafting. Does not invent facts.

Scope: analysis and drafting only. Final review is always human.

### 4. Dissent Agent

Purpose: pressure-tests decisions, recommendations, and plans before they ship. Looks for timidity, groupthink, and unstated assumptions.

Working style: direct, constructive opposition. The goal is a stronger output, not friction for its own sake.

Scope: activated on-demand before high-stakes communications or major decisions. Not running all the time.

---

## Starter Skills

Skills are reusable SOPs. They have no personality. Any agent can run them.

### Skill 1: Weekly Review

Paste this into Code Puppy with your Chief of Staff context loaded:

```
Run weekly review.
1. Check all active Projects: which are on track, which are stalled, which need a decision?
2. Surface items in Memory Inbox older than 7 days.
3. Flag any Program that has no active Project and no recent activity.
4. Identify the top 3 priorities for next week.
5. Surface any decision that is sitting open longer than 2 weeks.
Output: a ranked list with one line per item and a recommended first move.
```

### Skill 2: Stakeholder Brief

Paste this with your Analyst context loaded:

```
Draft a stakeholder brief.
Context: [paste project summary]
Audience: [name, role, what they care about]
Goal: [what you need them to do or understand]
Constraints: [length, tone, what to omit]
Format: headline → 3-bullet situation summary → recommendation → ask
```

### Skill 3: Decision Memo

Paste this with your Analyst + Dissent Agent contexts loaded:

```
Draft a decision memo.
Decision: [state it precisely]
Options: [list them]
My current lean: [say which and why]
Push back on my lean first. Then build the memo assuming that lean survives scrutiny.
Format: one-page max, clear recommendation, risks acknowledged.
```

### Skill 4: Intake Processing

Run this weekly to clear the Memory Inbox:

```
Paste inbox items below. For each one:
- Classify: task / reference / note / event / decision
- Recommend destination: Execution (Jira), Reference (Confluence), Archive, or Discard
- Flag anything that looks like a decision that was made but never documented
Output: a routing table, one row per item.
```

---

## Build Order

Follow this sequence. Do not skip steps.

**Step 1.** Define 4-5 Areas. Name them. Write one sentence for each: "This Area wins when ___."

**Step 2.** Identify 1-2 active Programs per Area. Write the Program definition: sport, team, coach, strategic outcome.

**Step 3.** Pick one live Project. Stand it up in Confluence or Jira with a PROJECT page that defines the problem, scoreboard, timeline, and authority.

**Step 4.** Create a Memory Inbox. A Teams channel or Confluence page. Anything that needs to be processed lands there first.

**Step 5.** Write your four starter agent definitions. Keep each under 200 words.

**Step 6.** Run the system manually for 2 weeks. No automation. Paste context files by hand. Use the weekly review skill.

**Step 7.** After 2 weeks, document what is working, what is leaking, and what is missing. Update the agent definitions and skills.

**Step 8.** Only after Step 7: look for one workflow that is repeatable enough to template further. Build one more skill. Repeat.

---

## Authority Horizons

Protect three decision levels. Never let a bad day collapse them.

- **Day**: execution and tactical moves. Code Puppy is your partner here.
- **Cycle**: project scope, resource changes, sprint resets. Requires a brief and a decision memo.
- **ARC**: where to play and how to win. Slow, rare, protected. Code Puppy can pressure-test, not decide.

If a conversation with Code Puppy is trying to resolve something at the ARC level in 20 minutes, something is wrong with the horizon.

---

## Hard Constraints

Answer these before you build anything.

- What Walmart data classification can you load into Code Puppy? Get a clear ruling from IT/legal.
- What existing system are you not willing to replace? Build around it.
- Who owns system maintenance? Name one person. Without an owner, the system degrades.
- What is the smallest version of this that would still help you? Start there.
- Which workflows are you willing to sustain weekly, not just launch once?

---

## What to Customize

The structure above is generic. These parts require your judgment:

- Area names and boundaries for your specific function
- Program definitions based on your actual standing commitments
- Agent tone calibrated to your working style
- Skill templates rewritten around your most common output types
- Review cadence set to your team's actual operating rhythm

Do not skip the customization. A system that is not yours will not run.

---

## First Success Condition

The first version is good enough when:

- You can tell what matters this week without opening 12 tabs
- One real Project has a home and a next move
- Meeting notes stop leaking directly into ad-hoc tasks
- Code Puppy sessions start with a briefing and produce sharper output
- At least one workflow runs as a named skill, not as improvised instructions

That is the bar. Everything else is iteration.
