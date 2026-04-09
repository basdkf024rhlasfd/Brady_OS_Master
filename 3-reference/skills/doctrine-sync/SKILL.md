---
name: doctrine-sync
description: >
  Detects drift between OS doctrine/governance sources and agent profiles.
  Reads all canonical doctrine files, reads all agent profiles, and produces
  a drift report showing which agents are stale and what they're missing.
  Optionally generates paste-ready instruction updates for ChatGPT agent surfaces.

  Trigger this skill whenever Brady says "doctrine sync", "check agent knowledge",
  "are agents up to date", "agent drift", "sync agents", "update agents with doctrine",
  or any variation requesting a check on whether agents know the current OS philosophy.
  Also runs as an optional step in the weekly sweep.
---

# Doctrine Sync

Detects when agent profiles have fallen behind OS doctrine. The philosophy expert
shouldn't be the last to know about philosophy changes.

## Why This Exists

Agent profiles are static markdown files. Doctrine evolves. When os-doctrine.md,
governance contracts, amendments, or narrative architecture change, nothing tells
agent profiles they're stale. Brady has to remember — and if he has to remember,
the recursive learning isn't working.

This skill closes the detection loop. It doesn't auto-deploy (ChatGPT agents require
manual paste), but it surfaces exactly what's drifted and what to do about it.

## Execution Environment

**Runs on**: Any Claude surface with file system access (Conductor, Claude Code, CoWork)
**Trigger**: Manual invocation or as part of weekly sweep (Phase 5.8)
**Duration**: ~2 minutes (read-only scan)

## Doctrine Sources (Canonical)

These are the authority files. Agent profiles should reflect their contents:

| File | What It Governs |
|------|----------------|
| `3-reference/os-doctrine.md` | Authority horizons (Day/Cycle/ARC), structural hierarchy, Trust Loop |
| `3-reference/governance/council-charter.md` | Council membership, voting, Gold Medal Test |
| `3-reference/governance/hierarchical-contracts.md` | 4 bilateral contracts, chain of command |
| `3-reference/governance/peer-contracts.md` | Peer collaboration, handoff protocols |
| `3-reference/governance/information-flow-standards.md` | Compression up, expansion down, quality gates |
| `3-reference/governance/agent-enforcement-rules.md` | Single-role compliance, state/narrative separation |
| `3-reference/governance/amendments-2026-01.md` | Execution reality, SOP gatekeeping, platform constraints |
| `3-reference/narrative-architecture.md` | Story-as-compression, Yes And, agents as characters |
| `3-reference/olympics.md` | Drafting rules, flat roster, temporary roles |
| `REBUILD-BRADY-OS.md` | Four-layer model, five core principles |

## Agent Profiles (Scan Targets)

All files in `0-agents/custom-built-agents/*.md` (excluding `_template.md`).

## Knowledge Requirements by Role

Not every agent needs to know everything. Requirements scale with seniority and function:

### Council Members (Phil, Cornelius, Musashi San, Claudine)
Must know:
- Full authority horizons (Day/Cycle/ARC)
- Council charter and their specific role
- All hierarchical and peer contracts
- Information flow standards
- Agent enforcement rules
- All active amendments
- Narrative architecture principles

### Senior Agents (DiCaprio, Bo)
Must know:
- Authority horizons
- Their reporting line and relevant contracts
- Active amendments (especially platform constraints)
- Enforcement rules

### Execution Agents (Yuki Ronin, Kataribe)
Must know:
- Their specific contract(s)
- Relevant enforcement rules
- Active amendments affecting their platform
- Escalation protocols

### Utility Agents (Telly, etc.)
Must know:
- Active amendments affecting their platform
- Their specific operational constraints

## Execution Steps

### Step 1: Read Doctrine Sources
Read all files listed in the Doctrine Sources table. Extract:
- Key concepts and their current definitions
- Contract numbers and parties
- Amendment numbers and rules
- Last-modified dates (via git log)

### Step 2: Read Agent Profiles
Read all agent profiles. For each agent, record:
- Name, seniority, platform, expertise
- What governance concepts are referenced (or missing)
- Whether referenced concepts match current doctrine wording

### Step 3: Compare Against Requirements
For each agent, check their knowledge requirements (based on role category above)
against what their profile actually contains. Flag:
- **Missing**: Required concept not referenced at all
- **Stale**: Concept referenced but wording/structure doesn't match current doctrine
- **Outdated**: References doctrine that has been amended or superseded

### Step 4: Generate Drift Report

```
===============================================
DOCTRINE SYNC REPORT — [Date]
===============================================

DOCTRINE SOURCES (last modified):
  os-doctrine.md          — [date]
  council-charter.md      — [date]
  hierarchical-contracts.md — [date]
  peer-contracts.md       — [date]
  information-flow-standards.md — [date]
  agent-enforcement-rules.md — [date]
  amendments-2026-01.md   — [date]
  narrative-architecture.md — [date]
  olympics.md             — [date]

-----------------------------------------------
AGENT DRIFT SUMMARY
-----------------------------------------------

[Agent Name] — [role category] — [platform]
  Status: [CURRENT | STALE | CRITICAL]
  Missing: [list of missing concepts]
  Stale: [list of outdated references]
  Last profile update: [git date]

[repeat for each agent]

-----------------------------------------------
PRIORITY UPDATES
-----------------------------------------------

1. [Agent] — [what to update] — [why it matters]
2. ...

-----------------------------------------------
PASTE-READY UPDATES (if requested)
-----------------------------------------------

For each agent needing updates, generate the specific
markdown additions/changes to their profile.
```

### Step 5: Surface Results
- If run standalone: Output the full drift report
- If run as part of weekly sweep: Output summary + priority list only
- If Brady requests: Generate paste-ready instruction text for ChatGPT agent surfaces

## What This Skill Does NOT Do

- Does not modify agent profiles automatically (Brady approves changes)
- Does not paste instructions into ChatGPT (manual step)
- Does not modify doctrine sources
- Does not create new agents or governance docs
- Does not run continuously — invoked on-demand or weekly

## Edge Cases

- **New doctrine file added**: Will be missed until added to the Doctrine Sources table above. When adding new governance docs, update this table.
- **Agent removed**: Skip gracefully, don't report drift for deleted agents.
- **Amendment superseded**: If an amendment is folded into a new doctrine version, update the sources table.
- **Platform migration**: If an agent moves platforms (e.g., ChatGPT to Claude), flag that platform-specific constraints may need updating.
