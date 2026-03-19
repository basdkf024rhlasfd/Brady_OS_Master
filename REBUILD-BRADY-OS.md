# Brady OS Rebuild Guide

This document explains how to rebuild the system architecture without exposing private client work, private prompts, or internal personal details.

It is written so someone can recreate the operating system using Claude, ChatGPT, Conductor, Notion, and optionally Google Workspace.

## What This Is

Brady OS is not a productivity stack.

It is a governance system for life and work. Its job is to decide:

- what deserves a permanent place in the system
- what belongs to long-term structure versus short-term execution
- which AI agents do which kinds of work
- where thinking gets stored before it becomes action

## Platform Stance

The OS should work regardless of model or tool choice.

- Agent identity is platform-agnostic. Claude versus ChatGPT is an implementation detail.
- The current working mix is:
  - Claude Desktop as the primary day-to-day interface
  - Conductor for multi-agent orchestration and parallel work
  - Notion as the main persistence layer for structured data and memory
  - ChatGPT as a secondary working environment
  - Google Workspace as an optional operational layer, especially for email and calendar automation
- If Google improves meaningfully, more of the intake and automation layer can move there without changing the OS architecture.

## Core Principles

1. Governance beats productivity.
2. Tasks should not carry identity.
3. Durable meaning lives in Programs, not Projects.
4. Memory should capture raw input before interpretation.
5. Agents are specialists, not mascots.
6. Platform choice should not change the structure of the system.

## The Four Layers

### Layer 0: Agents

The agent roster.

This is where agent identities, roles, and use cases live. Agents are drafted into projects as needed. They do not permanently belong to a project.

### Layer 1: Execution

The hierarchy of work:

`Areas -> Programs -> Projects -> Tasks`

This is where meaning gets separated from motion.

### Layer 2: Memory

The intake layer.

Notes, transcripts, emails, raw observations, and unprocessed ideas land here first. Memory is not the task list. It is the staging area before routing.

### Layer 3: Reference

The law library.

Doctrine, architecture, reward rules, publishing rules, templates, and reusable patterns live here.

## Phil's Framing

Phil should have a heavy presence in the rebuilt system.

Phil is the philosopher and coherence checker. He exists to explain what each layer means and to stop category errors.

### Phil on Areas

"An Area is a durable domain of responsibility. If it disappears, your life loses a whole field of play."

Areas are broad and stable. They should change rarely.

### Phil on Programs

"A Program is a standing commitment inside an Area. It is not a sprint. It is a franchise."

Programs are the unit of meaning. They persist across seasons.

### Phil on Projects

"A Project is a temporary intervention that upgrades a Program. A Project is construction, not identity."

Projects start and end. They should not become permanent containers for meaning.

### Phil on Tasks

"A Task is a move, not a worldview."

Tasks should be small, disposable, and emotionally lightweight.

### Phil's Test: Program or Project?

Use these questions:

- If you stop doing it for 90 days, does the underlying commitment still exist? If yes, it is probably a Program.
- If finishing it creates a before-and-after state, it is probably a Project.
- If it only matters because a Program exists, it is not a Program.

## Folder Structure

Use this exact scaffold:

```text
brady-os/
├── 0-agents/
│   ├── custom-built-agents/
│   │   ├── _template.md
│   │   ├── custom-agent-a.md
│   │   ├── custom-agent-b.md
│   │   ├── custom-agent-c.md
│   │   ├── custom-agent-d.md
│   │   ├── custom-agent-e.md
│   │   ├── custom-agent-f.md
│   │   └── custom-agent-g.md
│   └── imported-agents/
│       ├── engineering/
│       ├── marketing/
│       ├── product/
│       ├── sales/
│       ├── testing/
│       └── ...
├── 1-execution/
│   └── areas/
│       ├── work-and-business/
│       │   ├── work-and-business.md
│       │   └── programs/
│       ├── family-and-relationships/
│       │   ├── family-and-relationships.md
│       │   └── programs/
│       ├── health-and-energy/
│       │   ├── health-and-energy.md
│       │   └── programs/
│       ├── wealth-and-administration/
│       │   ├── wealth-and-administration.md
│       │   └── programs/
│       └── learning-creation-and-play/
│           ├── learning-creation-and-play.md
│           └── programs/
├── 2-memory/
│   └── README.md
├── 3-reference/
│   ├── olympics.md
│   ├── os-doctrine.md
│   ├── narrative-architecture.md
│   ├── rewards.md
│   ├── project-kickoff.md
│   ├── team-templates/
│   └── publishing/
└── README.md
```

## Why Each Execution Level Exists

### Areas

Areas exist to keep life domains MECE enough that nothing important is homeless and nothing gets double-counted.

Recommended Area set:

1. `work-and-business`
2. `family-and-relationships`
3. `health-and-energy`
4. `wealth-and-administration`
5. `learning-creation-and-play`

This set is not metaphysically perfect. It is operationally clean.

### Why these five Areas are MECE enough

- `work-and-business`: profession, income generation, boards, consulting, ventures
- `family-and-relationships`: partner, kids, household, extended family, close relationships
- `health-and-energy`: physical training, sleep, nutrition, mental health, capacity
- `wealth-and-administration`: money, taxes, legal, insurance, paperwork, life admin
- `learning-creation-and-play`: reading, writing, creative projects, hobbies, exploration, travel for its own sake

The goal is not philosophical purity. The goal is durable boundaries.

## Area File Template

Each Area gets one markdown file with:

- name
- ring number
- what winning looks like
- boundary statement
- operating principles
- list of active Programs

## Program Structure

Each Program lives under one Area and gets its own folder or file.

Each Program should define:

- `Sport`: what external game is being played
- `Team`: the durable capability being built
- `Coach`: the system owner for improvement
- `Strategic Outcome`: what this Program is trying to make true over time
- `Operating Principles`
- `Key Metrics`
- `Milestones`

Phil's note:

"A Program is the thing you remain in relationship with, even when no current Project is active."

## Project Structure

Projects should live inside Programs.

Recommended naming:

`Project - [Name]`

Each Project should have:

- `PROJECT.md`: internal operating manifest
- `CUSTOMER.md`: only if there is an external customer or end user
- optional `plans/` folder
- optional `attachments/` folder

A Project should define:

- the problem
- the scoreboard
- timeline
- draft team
- authority
- where code, notes, tasks, and deliverables live

Phil's note:

"If a Project finishes and the reason for caring still remains, the Project belonged to a Program. If nothing remains, it was just a task cluster pretending to matter."

## Authority Horizons

Keep the three horizons intact:

- `Day`: execution decisions
- `Cycle`: system and scope decisions
- `ARC`: long-arc direction and Program-level decisions

This is the main anti-chaos rule of the system.

## Layer 0: Custom Agents

Do not share private agent prompts. Share the roster shape instead.

Use placeholders like this:

- `Custom Agent A`: Chief of Staff and gatekeeper. Compresses messy situations into a few real options. Protects time, boundaries, and scope.
- `Custom Agent B`: Archivist and system operator. Routes information into the correct database, keeps records clean, and maintains the operational memory.
- `Custom Agent C`: Philosopher and coherence auditor. Pressure-tests meaning, assumptions, and whether a decision belongs at the right horizon. This is the Phil role.
- `Custom Agent D`: Trusted advisor. Gives direct judgment, pattern recognition, and strong recommendations when a real decision is needed.
- `Custom Agent E`: Clarity and performance coach. Helps detect misalignment between energy, standards, story, and systems.
- `Custom Agent F`: Synthesis and artifact builder. Produces clear specs, structured observations, and operational drafts across chat, coworking, and code-adjacent workflows.
- `Custom Agent G`: Domain-specific product owner. Created when a particular customer, market, or problem space needs a dedicated point of view.

## Open-Source Agents Currently Used

These are examples of open-source agents that fit well into the system. If you use them, link directly to the profile rather than copying the full text.

- `Frontend Developer`: implementation specialist for web UI and product surfaces.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-frontend-developer.md>
- `Backend Architect`: server, data model, and API design specialist.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-backend-architect.md>
- `SEO Specialist`: technical SEO and organic search specialist.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/marketing/marketing-seo-specialist.md>
- `Trend Researcher`: market intelligence and competitive research specialist.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/product/product-trend-researcher.md>
- `Feedback Synthesizer`: user signal aggregation and learning-loop specialist.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/product/product-feedback-synthesizer.md>
- `Account Strategist`: customer expansion, stakeholder mapping, and retention specialist.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/sales/sales-account-strategist.md>
- `Reality Checker`: final quality gate and evidence-based skeptic.  
  Source: <https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-reality-checker.md>

Primary open-source collection:

<https://github.com/msitarzewski/agency-agents>

## Layer 2: Memory Design

Memory should stay clean and boring.

The purpose of Memory is capture first, interpretation second.

Keep the memory layer separate from project execution and separate from doctrine.

## Clean Notion Database Set

Do not rebuild the messy version. Rebuild the clean version.

### Execution Databases

#### 1. Areas

Properties:

- `Name`
- `Ring`
- `Status`
- `Why It Exists`
- `Boundary`
- `Review Cadence`

#### 2. Programs

Properties:

- `Name`
- `Area` relation
- `Sport`
- `Team`
- `Coach`
- `Status`
- `Strategic Outcome`
- `Review Cadence`
- `Active Projects` rollup

#### 3. Projects

Properties:

- `Name`
- `Program` relation
- `Type`
- `Status`
- `Start Date`
- `Target End`
- `Day Owner`
- `Cycle Owner`
- `Victory Condition`
- `Leading Indicator`
- `Workspace Link`

#### 4. Tasks

Properties:

- `Name`
- `Project` relation
- `Status`
- `Do Date`
- `Priority`
- `Energy`
- `Estimate`
- `Source`
- `Owner`

### Agent Database

#### 5. Agents

Properties:

- `Name`
- `Type` (`Custom` or `Open Source`)
- `Primary Role`
- `Platform`
- `Source Link`
- `When To Use`
- `Status`

### Memory Databases

#### 6. Memory Inbox

The universal intake database.

Properties:

- `Title`
- `Captured At`
- `Source` (`email`, `voice`, `chat`, `manual`, `meeting`)
- `Raw Text`
- `Program` relation
- `Project` relation
- `Routing Decision`
- `Processed`

#### 7. Voice Notes

Properties:

- `Title`
- `Captured At`
- `Transcript`
- `Program` relation
- `Project` relation
- `Needs Task Extraction`
- `Needs Reference Extraction`

#### 8. Email Hub

Properties:

- `Subject`
- `Sender`
- `Received At`
- `Category`
- `Action Code`
- `Related Program`
- `Related Project`
- `Task Created`
- `Archive Status`

#### 9. Daily Notes

Properties:

- `Date`
- `Top 3`
- `Key Decisions`
- `Open Loops`
- `Notes`
- `Tomorrow`

### Optional Database

#### 10. Reference Index

Only use this if Notion becomes the canonical index for doctrine and templates.

Properties:

- `Name`
- `Type`
- `File/URL`
- `Layer`
- `Last Updated`

## Notion Relationships

Keep the relations simple:

- Area -> Programs
- Program -> Projects
- Project -> Tasks
- Program/Project -> Memory Inbox
- Program/Project -> Voice Notes
- Program/Project -> Email Hub

Do not create ten different intake databases unless you have a real routing problem.

## Recommended Notion Views

### Areas

- All Areas
- Needs Review

### Programs

- Active Programs
- By Area
- Needs Cycle Review

### Projects

- Active Projects
- Closing Soon
- By Program

### Tasks

- Today
- This Week
- Waiting
- By Project

### Memory

- Unprocessed Inbox
- Voice Notes Needing Extraction
- Email Requires Action

## Google Workspace Layer

Google should be treated as an automation and coordination layer, not as the doctrine layer.

Use it for:

- email capture
- calendar hygiene
- low-friction scripts
- reminders and summaries

## Recommended Google Apps Script Automations

### 1. GTD Email Triage Script

Goal:

Turn inbox noise into a small set of meaningful action codes.

Suggested labels:

- `Action`
- `Waiting`
- `Read/Review`
- `Reference`
- `Archive`

Suggested workflow:

1. New email arrives.
2. Script checks sender, keywords, and thread context.
3. It applies a suggested label.
4. If labeled `Action`, it writes a record into `Email Hub` or a staging sheet for Notion sync.

### 2. Email-to-Task Capture Script

Goal:

Convert actionable emails into clean task records.

Rules:

- only create a task if the email implies real work
- include source URL back to the thread
- let the user confirm Program or Project if unclear

### 3. Daily Agenda Script

Goal:

Send one clean summary each morning:

- today's calendar
- tasks due today
- meetings without prep notes
- protected focus blocks

### 4. Calendar Hygiene Script

Goal:

Keep the calendar from becoming a lie.

Possible checks:

- flag meetings longer than 60 minutes
- flag back-to-back blocks without buffers
- flag focus blocks that got overwritten
- flag days with too many context switches

### 5. Weekly Review Script

Goal:

Produce a lightweight review digest:

- completed tasks
- active projects
- stale projects
- emails still labeled `Waiting`
- calendar anomalies from the past week

## Calendar Tactics

Keep calendar management simple.

- Use Google Calendar as the live calendar.
- Protect recurring focus blocks.
- Add buffers between important meetings.
- Avoid using the calendar as a guilt museum.
- Use Notion for meaning and commitments. Use Calendar for time.

Phil's note:

"A calendar should describe a real day, not an imagined virtuous one."

## Layer 3: Reference

Rebuild these core docs first:

- `README.md`
- `3-reference/os-doctrine.md`
- `3-reference/olympics.md`
- `3-reference/narrative-architecture.md`
- `3-reference/project-kickoff.md`
- `3-reference/rewards.md`

Optional later:

- team templates
- publishing rules
- customer-facing templates
- recurring review templates

## Minimum Viable Rebuild Order

1. Create the folder scaffold.
2. Write `README.md` with the four-layer model.
3. Write `os-doctrine.md` and define authority horizons.
4. Write `olympics.md` to explain drafting, roles, and team formation.
5. Add the five Area files with boundary statements.
6. Create the clean Notion databases and relations.
7. Add the abstracted custom agent roster.
8. Add links to the open-source agents you actually use.
9. Set up Google Apps Script intake and calendar automation.
10. Start with one real Program and one real Project.

## A Good Initial Stack

If someone wanted to copy the setup with minimal friction:

- `Claude Desktop`: primary thought partner
- `Conductor`: parallel agent work and project orchestration
- `Notion`: system of record for Programs, Projects, Tasks, and Memory
- `ChatGPT`: secondary drafting and advisory environment
- `Google Workspace`: email/calendar capture and light automation

## Final Rule

Do not publish the internal OS wholesale.

Share doctrine, architecture, and rebuild instructions.

Do not share:

- private client materials
- internal project manifests
- personal contact and GTM details
- raw custom agent prompts
- messy operational exhaust

Share the structure. Keep the guts private.
