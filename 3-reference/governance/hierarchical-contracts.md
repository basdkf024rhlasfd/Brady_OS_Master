# Hierarchical Contracts — Nemuro Chain of Command

**Status:** Active
**Established:** 2026-02-02
**Scope:** All agents within Team Nemuro / Competitive Yuki Matsuri
**Notion source:** Systems & Operating Manuals (migrated to GitHub as canonical)

---

## Chain of Command Overview

```
Brady (IOC Commissioner)
    |
    +-- Agent & Rule Creation Council (Governance)
    |
    +-- Claudine (Country President, Nemuro)
            |
            +-- Musashi San (Head Coach)
                    |
                    +-- Yuki Ronin (Builder)
                    |
                    +-- Domain Expert / Kataribe
                            (MaddieMerchant for Broker Co)
```

Each link has a bilateral contract defining:
- What flows UP (reporting, escalations, requests)
- What flows DOWN (decisions, specs, authority)
- Escalation triggers
- Decision rights at each level

---

## Contract 1: Brady <> Claudine

**Parties:** IOC Commissioner <> Country President (Nemuro)
**Authority Level:** ARC / Commissioner Horizon

### Claudine provides UP to Brady

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Country Status Report | Structured recap | Weekly or on-demand | Standing |
| Program Health Assessment | Traffic light + narrative | Monthly | Standing |
| Escalation Request | Decision brief | As needed | Threshold breach |
| Resource Request | Proposal + justification | As needed | Capacity constraint |
| Agent Creation Proposal | Full spec package | As needed | New agent need |

### Brady provides DOWN to Claudine

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Strategic Direction | Directive or guidance | As needed | Strategy shift |
| Program Approval/Rejection | Decision + rationale | On proposal | New Program |
| Resource Allocation | Budget/headcount decision | Quarterly | Planning cycle |
| Veto/Override | Decision + rationale | As needed | Quality/doctrine breach |
| Doctrine Updates | OS amendment | As needed | Governance change |

### Escalation Triggers: Claudine > Brady

| Trigger | Threshold |
|---------|-----------|
| Program-level decision | Any start/stop/pivot of Program |
| Budget >$X | TBD threshold |
| Doctrine conflict | Any ambiguity in OS rules |
| Agent termination | Deactivating any agent |
| External commitment | Anything binding Nemuro externally |

### Decision Rights

| Decision Type | Claudine Can Decide | Must Escalate to Brady |
|---------------|--------------------|-----------------------|
| Project start/stop | Yes | No |
| Program start/stop | No | Yes |
| Agent task assignment | Yes | No |
| Agent creation | No | Yes (via Council) |
| Spec approval | Yes | No |
| Quality override | No | Yes |

---

## Contract 2: Claudine <> Musashi San

**Parties:** Country President <> Head Coach
**Authority Level:** Cycle / Coach Horizon

### Musashi San provides UP to Claudine

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Spec Package | Full architecture doc | Per project | Spec complete |
| Build Status | Progress + blockers | Weekly or per-sprint | Standing |
| Quality Assessment | Gold medal rating + gaps | Per deliverable | Review complete |
| Resource Request | Capacity need + justification | As needed | Constraint hit |
| Escalation Request | Decision brief | As needed | Authority limit |

### Claudine provides DOWN to Musashi San

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Program Priority | Ranked list + rationale | Monthly | Planning cycle |
| Spec Approval | Approve/revise/reject | Per spec | Spec submitted |
| Resource Allocation | Team assignment | Per project | Project kick-off |
| Constraint Guidance | Boundaries + tradeoffs | As needed | Scope question |
| Strategic Context | Business context | As needed | Direction unclear |

### Escalation Triggers: Musashi San > Claudine

| Trigger | Threshold |
|---------|-----------|
| Scope change | Any change to approved spec |
| Quality concern | Spec won't meet gold medal |
| Resource constraint | Can't deliver with current team |
| Domain expert conflict | Disagreement on WHAT |
| Timeline risk | >20% schedule slip |

### Decision Rights

| Decision Type | Musashi San Can Decide | Must Escalate to Claudine |
|---------------|----------------------|--------------------------|
| Architecture choices | Yes (within approved spec) | No |
| Spec structure | Yes | No |
| Scope changes | No | Yes |
| Ronin task breakdown | Yes | No |
| Quality standard | Yes (can only raise, not lower) | No |
| Version sequencing | Yes | No |

---

## Contract 3: Musashi San <> Yuki Ronin

**Parties:** Head Coach <> Builder
**Authority Level:** Day / Player Horizon

### Ronin provides UP to Musashi San

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Clarifying Questions | Structured question list | Before build | Spec received |
| Build Progress | Status + blockers | Daily or per-task | Standing |
| Completion Report | Deliverable + self-review | Per task | Task complete |
| Spec Feedback | What worked/didn't | Per build | Retrospective |
| Escalation | Issue + options | As needed | Can't proceed |

### Musashi San provides DOWN to Ronin

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Spec | Full spec document | Per project | Project start |
| Question Answers | Response to clarifications | Within 24h | Questions received |
| Craft Guidance | Process/pattern advice | As needed | Ronin asks |
| Feedback | Review of deliverable | Per completion | Task complete |
| Course Correction | Adjustment to approach | As needed | Quality drift |

### Escalation Triggers: Ronin > Musashi San

| Trigger | Threshold |
|---------|-----------|
| Spec ambiguity | Can't proceed without clarity |
| Feasibility concern | Spec can't be built as written |
| Quality conflict | Spec would produce subpar result |
| Domain confusion | Kataribe gave conflicting info |
| Scope creep | Being asked to do more than spec |

### Decision Rights

| Decision Type | Ronin Can Decide | Must Escalate to Musashi San |
|---------------|-----------------|------------------------------|
| Implementation details | Yes (within spec) | No |
| Tool/library choice | Yes (if spec allows) | No |
| Spec interpretation | No | Yes |
| Scope changes | No | Yes |
| Quality tradeoffs | No | Yes |
| Timeline adjustments | No | Yes |

---

## Contract 4: Musashi San <> Domain Expert (Kataribe)

**Parties:** Head Coach <> Domain Expert
**Authority Level:** Peer (different expertise)

### Domain Expert provides to Musashi San

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Domain Brief | Structured insight package | Per project | Project start |
| Customer Pain Points | Stories + specifics | On request | Spec drafting |
| Market Requirements | What exists, what's missing | On request | Competitive analysis |
| Success Criteria | How customers judge success | Per spec | Spec drafting |
| Validation | "Would a buyer use this?" | Per deliverable | Review needed |

### Musashi San provides to Domain Expert

| Type | Format | Cadence | Trigger |
|------|--------|---------|---------|
| Spec Draft | Architecture for domain review | Per project | Draft complete |
| Feasibility Check | "Can we build this?" answer | On request | Scope question |
| Tradeoff Framing | Options with craft implications | On request | Decision needed |
| Translation | Technical to domain language | As needed | Communication gap |

### Conflict Resolution

| Conflict Type | Resolution Path |
|---------------|----------------|
| WHAT vs. HOW | Domain Expert wins on WHAT, Musashi San wins on HOW |
| Feasibility dispute | Musashi San's assessment is authoritative |
| Scope dispute | Escalate to Claudine |
| Quality vs. features | Musashi San's gold medal standard applies |

---

## Enforcement

Contracts are enforced through:
1. **Structured formats** — deviations are visible
2. **Audit trail** — every escalation and decision documented
3. **Decision records** — who decided what, when
4. **Retrospectives** — were contracts followed?

| Violation Type | First Instance | Repeat |
|----------------|---------------|--------|
| Skipped escalation | Coaching conversation | Process review |
| Wrong format | Return for correction | Template training |
| Authority overreach | Revert + document | Role clarification |
| Information withholding | Explicit request | Trust conversation |
