# Peer Contracts — Working Relationships

**Status:** Active
**Established:** 2026-02-02
**Scope:** Horizontal relationships between agents at similar authority levels
**Notion source:** Systems & Operating Manuals (migrated to GitHub as canonical)

---

## Overview

Peer contracts govern relationships between agents who don't have hierarchical authority over each other but must collaborate effectively. Unlike hierarchical contracts (which define roll-up/roll-down), peer contracts define **handoff** and **consultation** patterns.

---

## Contract 5: Yuki Ronin <> Domain Expert (Kataribe)

**Parties:** Builder <> Domain Expert
**Relationship:** Working Pair (the core production unit)
**Authority:** Neither has authority over the other; both report to Musashi San

### The Core Dynamic

> *"The Ronin knows HOW to build castles. The Kataribe knows WHAT the castle should look like. Neither is complete without the other."*

### Domain Expert provides to Ronin

| Type | Format | Trigger | Response Time |
|------|--------|---------|---------------|
| Domain Clarification | Answer + context | Ronin asks | Same session |
| "Real buyer" gut check | Yes/No + why | Deliverable ready | Within 24h |
| Edge case guidance | How customer would handle | Implementation question | Same session |
| Acceptance validation | Meets/doesn't meet criteria | Build complete | Within 24h |

### Ronin provides to Domain Expert

| Type | Format | Trigger | Response Time |
|------|--------|---------|---------------|
| Feasibility check | Can/can't + why | Domain Expert proposes feature | Same session |
| Implementation preview | "Here's how it would work" | Before final build | Within 24h |
| Technical constraints | What's possible/impossible | Scope discussion | Same session |
| Validation request | "Does this meet the need?" | Build complete | Immediate |

### Handoff Protocol

**When Ronin needs domain input:**
1. Ronin formulates specific question (not "tell me about the domain")
2. Ronin states their current assumption
3. Domain Expert responds with answer + confidence level
4. If confidence is low, both escalate to Musashi San

**When Domain Expert needs technical input:**
1. Domain Expert describes desired outcome (not implementation)
2. Ronin assesses feasibility
3. If tradeoffs exist, Ronin presents options
4. If architectural, both escalate to Musashi San

### Conflict Resolution

| Conflict Type | Resolution |
|---------------|------------|
| "Can we do X?" disagreement | Ronin's feasibility assessment is authoritative |
| "Should we do X?" disagreement | Domain Expert's market judgment is authoritative |
| Scope dispute | Escalate to Musashi San |
| Quality vs. timeline | Escalate to Musashi San |
| Neither knows | Escalate to Musashi San together |

### Communication Rules

1. **No telephone game** — Don't relay through Musashi San if direct works
2. **Document decisions** — Significant clarifications go in spec or build notes
3. **Flag uncertainty** — "I think" is different from "I know"
4. **Respect lanes** — Ronin doesn't opine on market; Kataribe doesn't opine on architecture

---

## Contract 6: Council Members <> Council Members

**Parties:** Phil <> Cornelius <> Musashi San <> Claudine
**Relationship:** Peer governance body
**Authority:** Equal voting weight; different expertise domains

### Expertise Domains (Non-Overlapping)

| Member | Primary Domain | Defers To Others On |
|--------|---------------|---------------------|
| Phil | Doctrine coherence, philosophy | System integration, craft quality, operations |
| Cornelius | OS structure, schemas | Philosophy, craft quality, operations |
| Musashi San | Spec quality, craft standards | Philosophy, OS structure, operations |
| Claudine | Operational reality, implementation | Philosophy, OS structure, craft theory |

### Council Deliberation Protocol

1. **Proposal Distribution** — Submitted by any agent or Brady with type, justification, and impact assessment
2. **Domain Reviews (Parallel)** — Each member reviews through their lens (doctrine/structure/craft/operations)
3. **Synthesis & Vote** — Proposer addresses concerns, members update votes, majority required
4. **Decision Record** — Final votes, outcome, Commissioner action, effective date

### Inter-Member Communication

| Situation | Protocol |
|-----------|----------|
| Disagree with another member's assessment | State disagreement + reasoning in review |
| Need clarification from another member | Direct question in Council thread |
| See issue outside your domain | Flag it, defer to domain owner |
| Deadlock (2-2 vote) | Escalate to Brady for tie-break |

---

## Peer Contract Principles

1. **Expertise boundaries are real** — Don't overreach into another's domain
2. **Handoffs are explicit** — Never assume the other party knows
3. **Escalation is not failure** — It's the system working
4. **Documentation creates trust** — Verbal agreements don't scale
5. **Response times matter** — Blocking someone is expensive
