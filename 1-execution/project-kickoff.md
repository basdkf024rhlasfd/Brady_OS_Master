# Project Kickoff Guide

When a new project starts, walk through this guide to stand up all 4 layers. The output is a **project manifest** (`PROJECT.md`) that lives in the project's repo or workspace.

---

## Step 1 — Define the Project (Layer 1: Execution)

Answer these before anything else:

- [ ] **Project name**: What is this?
- [ ] **Program**: Which Program does this belong to? (Must be one from `1-execution/programs/`)
- [ ] **One-sentence goal**: What does "done" look like?
- [ ] **Success criteria**: 2-3 measurable outcomes that mean this project succeeded
- [ ] **Timeline**: Start date, target end date, any hard deadlines
- [ ] **Authority**:
  - Who has **Day-level** authority? (can make execution decisions)
  - Who has **Cycle-level** authority? (can adjust scope, swap agents)
  - **ARC-level** always stays with the Commissioner (Brady)

If you can't answer these, the project isn't ready to start.

---

## Step 2 — Draft the Team (Layer 0: Agents)

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

## Step 3 — Set Up Memory (Layer 2: Memory)

Memory = where unstructured thinking, notes, and communication for this project land.

- [ ] **Notion Project page**: Create in the Projects database, linked to the correct Program
- [ ] **Task intake**: Where do new tasks for this project get captured? (Notion Tasks DB, linked to this Project)
- [ ] **Notes location**: Where do meeting notes, voice notes, and diary entries about this project go? (Notion Memory layer, tagged to this Project)
- [ ] **Communication channel**: Where does the team communicate? (Conductor workspace, Claude thread, ChatGPT thread, etc.)

Rule: Memory always lives in Notion. The project repo links to it but does not duplicate it.

---

## Step 4 — Establish Reference (Layer 3: Reference)

Reference = the rules, specs, and structured knowledge for this project.

- [ ] **Project repo/workspace**: Where does the actual work live?
  - Code projects → GitHub repo
  - Non-code projects → Notion workspace or dedicated page
  - Conductor workspace → for multi-agent orchestration
- [ ] **Deliverables location**: Where do outputs get saved? (repo, Notion, shared drive, etc.)
- [ ] **PROJECT.md**: Create the project manifest in the project repo (see template below)
- [ ] **Relevant OS docs**: Link any OS governance docs that apply (team templates, program doctrine, etc.)

---

## Step 5 — Create the Manifest

Copy the template below into a `PROJECT.md` file in your project repo or workspace. Fill it in with answers from Steps 1-4.

---

# PROJECT.md Template

```markdown
# [Project Name]

## Program
[Which Program this belongs to — link to program doctrine in Brady_OS_Master]

## Goal
[One sentence: what does "done" look like?]

## Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

## Timeline
- Start: [date]
- Target end: [date]
- Hard deadlines: [if any]

## Team

| Agent | Role | Profile |
|-------|------|---------|
| [name] | Lead | [link to agent profile in Brady_OS_Master or community repo] |
| [name] | Builder | [link] |
| [name] | Reviewer | [link] |

### Interaction Rules
[How agents communicate, review each other's work, resolve disagreements]

### Authority
- Day (execution decisions): [agent name]
- Cycle (scope/team changes): [agent name or Brady]
- ARC (project kill/pivot): Brady

## Where Things Live

| What | Where |
|------|-------|
| Code / deliverables | [GitHub repo URL] |
| Tasks | [Notion Tasks DB, filtered to this project] |
| Notes / memory | [Notion Memory layer, tagged to this project] |
| Communication | [Conductor workspace / Claude thread / etc.] |
| Project manifest | This file |
| OS governance | [Brady_OS_Master repo URL] |

## Status
- Phase: [not-started / active / blocked / complete]
- Last updated: [date]
```

---

## After Kickoff

- **Day-level**: Execute tasks, follow interaction rules, log notes to Memory
- **Cycle-level**: Review progress, adjust scope or team if needed, update manifest
- **Completion**: Update status to complete, disband team (agents return to roster), capture lessons in Memory, update Program metrics if applicable
