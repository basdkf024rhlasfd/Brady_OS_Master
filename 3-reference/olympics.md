# Olympics Framework

How projects spin up, how teams form, and how agents work together.

## The Metaphor

The OS is an Olympic Games. Brady is the Commissioner.

- **Areas** are the broad sport categories (Athletics, Aquatics, etc.)
- **Programs** are the individual sports — long-lived franchises with their own rules, teams, and coaching
- **Projects** are events within a sport — time-bound, with clear success criteria
- **Tasks** are individual plays or routines — atomic, no meaning attached

When an event (Project) is created, a team is formed by **drafting** agents from the roster.

## Drafting

Agents live in Layer 0 as a flat roster. They have identity, expertise, and seniority — but no standing team assignments.

When a Project spins up:

1. **Define the event** — What's the project? What does winning look like? What are the rules?
2. **Select a team template** (optional) — Reusable patterns for common project types (see [Team Templates](../3-reference/team-templates/))
3. **Draft agents** — Pull from both personal agents (`brady-os/0-agents/`) and the community talent pool (repo root directories)
4. **Assign roles** — Each drafted agent gets a project-specific role. This role exists only for this project.
5. **Set interaction rules** — How do agents communicate? Who has authority? How are conflicts resolved?

### Drafting Rules

- An agent can be drafted to multiple projects simultaneously
- Drafting does not change the agent's profile — roles are assigned, not absorbed
- Seniority informs but does not dictate role assignment — a senior agent can play a supporting role if the project calls for it
- Every project needs at least one agent with Day-level authority (someone who can make execution decisions)
- The Commissioner can override any draft decision

### The Talent Pool

```
Personal Agents (brady-os/0-agents/)
  Senior agents who know the OS, know Brady's context,
  and can manage other agents within a project.

Community Agents (repo root: engineering/, marketing/, etc.)
  144+ specialist personas with deep domain expertise.
  Platform-agnostic. Bring their own strategy and knowledge base.
```

When drafting, personal agents typically take leadership or coordination roles because they understand the OS context. Community agents typically fill specialist roles because they bring deep domain expertise.

This is a tendency, not a rule. Any agent can fill any role.

## Team Formation

A project team is defined by:

| Element | Description |
|---------|-------------|
| **Event** | The project name, scope, and success criteria |
| **Roster** | Which agents are drafted |
| **Roles** | What each agent does on this project |
| **Interaction Rules** | How agents communicate and resolve conflict |
| **Authority** | Who has Day/Cycle decision rights within this project |
| **Duration** | How long the team exists (tied to project timeline) |

### Role Assignment

Roles are project-specific labels. Common roles include:

- **Lead** — Owns delivery and coordination
- **Builder** — Executes primary work
- **Reviewer** — QA, pressure-testing, quality assurance
- **Strategist** — Provides direction and decision support
- **Specialist** — Deep expertise on a specific domain

These are suggestions, not a fixed set. Projects can define whatever roles they need.

### Interaction Patterns

Agents on a team interact through the **"Yes And"** principle:
- Accept the premise of what another agent produces
- Build on it constructively
- Flag disagreements as dramatic tension, not blocking objections

Conflict between agents is a feature. An auditor questioning a builder's approach surfaces edge cases. A strategist pushing back on a lead's scope prevents drift. This tension is productive as long as governance authority is respected.

## Team Lifecycle

```
Define Event → Draft Agents → Assign Roles → Execute → Deliver → Disband
                                                 ↑
                                    Cycle reviews happen here
                                    (adjust scope, swap agents, etc.)
```

When a project completes:
- The team disbands
- Agents return to the general roster (Layer 0)
- Lessons learned flow to Layer 2 (Memory) and eventually Layer 3 (Reference)
- Agent profiles are NOT modified based on project outcomes

## Relationship to Programs

Programs are the durable franchises. Projects (events) come and go within them.

A Program may have multiple active Projects, each with its own drafted team. The Program's Sport/Team/Coach doctrine provides the strategic context; the Olympics framework provides the operational mechanics for each Project within it.
