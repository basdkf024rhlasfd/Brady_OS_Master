# Brady OS

A governance system for life and work on the other side of complexity.

> **Canonical governance doc:** [OS Structure & Philosophy](https://www.notion.so/2b7ed43b89c580849c30fae7382db079) in Notion. This repo implements the architecture; Notion holds the constitution.

## The 4 Layers

### Layer 0 — Agents
A flat roster of agent profiles. Each agent has an identity, expertise, and seniority level — but no permanent reporting lines. Agents can serve on multiple projects simultaneously without changing who they are.

Profiles are platform-agnostic. Where an agent lives (Claude, ChatGPT, Notion AI) is metadata, not identity.

When a project needs a team, agents are drafted from this layer and assigned project-specific roles. Personal agents live in `0-agents/`. The broader talent pool lives in the community directories at the repo root (engineering/, marketing/, sales/, etc.).

### Platform Architecture

| Platform | Role |
|----------|------|
| **Notion** | Persistence layer — databases, memory, structured data, system of record |
| **GitHub** (`Brady_OS_Master`) | Agent profiles, execution scaffolding, reference docs, skills, consulting project files |
| **Claude** (claude.ai + Claude Code) | Runtime AI partner (Claudine identity), thinking, drafting, code |
| **Conductor.build** | Multi-agent orchestration — parallel workspaces, CoWork automation, scheduled sweeps |
| **Google Workspace** | Email/calendar capture, lightweight automation scripts |
| **mception.ai** | Curated client-facing portal (separate repo, published via allowlist) |

→ [Agent Index](0-agents/README.md)
→ [Agent Profile Template](0-agents/custom-built-agents/_template.md)

### Layer 1 — Execution
The hierarchy of work: **Areas → Programs → Projects → Tasks.**

- **Areas** (the 5 Rings) are large, durable life domains. They change rarely.
- **Programs** are long-lived franchises within an Area (Sport / Team / Coach). They persist across seasons.
- **Projects** are time-bound efforts that upgrade a Program. They have start and end points.
- **Tasks** are atomic actions. They carry no meaning, no strategy, no guilt.

When a Project spins up, the **Olympics framework** is used to form a team. This is where agents get drafted, roles get assigned, and interaction rules get defined.

→ [Olympics Framework](1-execution/olympics.md)
→ [Project Kickoff Guide](1-execution/project-kickoff.md)
→ [Areas](1-execution/areas/)
→ [Programs](1-execution/programs/)

### Layer 2 — Memory
Unstructured intake: notes, diary entries, email, voice recordings. This is the thinking layer — where new information arrives before it's been processed or organized.

Memory lives in Notion, not in this repo. It is unstructured by nature.

### Layer 3 — Reference
Rules, governance, structured data, and reusable patterns. The law library.

This includes OS doctrine (authority horizons, Trust Loop), narrative architecture (story as compression), team templates, and the reward system.

→ [OS Doctrine](3-reference/os-doctrine.md)
→ [Narrative Architecture](3-reference/narrative-architecture.md)
→ [Team Templates](3-reference/team-templates/)
→ [Rewards](3-reference/rewards.md)
→ [mception.ai Publishing Policy](3-reference/publishing/mception-ai.md)
→ [mception.ai Publication Allowlist](3-reference/publishing/mception-ai-projects.yml)

## How It All Fits Together

```
Commissioner (Brady)
        │
        │ sets direction at ARC horizon
        ▼
┌─── Layer 3: Reference ───────────────────────────────┐
│  OS Doctrine  │  Team Templates  │  Rewards  │  Rules │
└───────────────────────────────────────────────────────┘
        │ governance flows down
        ▼
┌─── Layer 1: Execution ───────────────────────────────┐
│  Areas → Programs → Projects → Tasks                  │
│                                                       │
│  Olympics Framework: spin up project → draft team →   │
│  assign roles → execute → deliver                     │
└───────────────────────────────────────────────────────┘
        │ drafts from          │ raw input from
        ▼                      ▼
┌─── Layer 0 ──┐    ┌─── Layer 2 ──────────┐
│  Agent Roster │    │  Memory (Notion)      │
│  (this repo)  │    │  notes, diary, voice  │
└───────────────┘    └──────────────────────┘
```

## Three Horizons of Authority

| Horizon | Role | Can Do | Cannot Do |
|---------|------|--------|-----------|
| **Day** | Player | Execute tasks, adapt tactically | Redefine meaning or direction |
| **Cycle** | Coach | Start/stop projects, improve systems | Create or kill Programs |
| **ARC** | Commissioner | Start/end Programs, set strategy | N/A (highest authority) |

The day is forbidden from deciding what matters. That decision was already made at a higher horizon and is protected from short-term noise.

## Core Principles

1. **Governance, not productivity.** The OS exists to assign authority, not optimize throughput.
2. **Programs are franchises, not goals.** They persist across seasons and absorb variability.
3. **Complexity is not the enemy. Unassigned authority is.** Protect slow decisions from fast noise.
4. **Story is compression.** The Olympics metaphor, agent characters, and narrative architecture are cognitive load arbitrage — not decoration.
5. **Trust is earned, not assumed.** As the system proves stable, authority shifts from intuition to structure.
6. **Any system that only works on good days is not a system.**
