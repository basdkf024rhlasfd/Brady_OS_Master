# Governance Contracts — Master Index

**Status:** Active
**Established:** 2026-02-02
**Authority:** Agent & Rule Creation Council

---

## What This Is

Master index for all governance contracts within Team Nemuro and the broader OS 2.0 agent system. Contracts enforce the hierarchy through structured information flow.

## Contract Documents

### Enforcement & Amendments

| Document | Purpose |
|----------|---------|
| [Agent Enforcement Rules](agent-enforcement-rules.md) | Global constraint layer for all agent behavior |
| [Amendments (2026-01)](amendments-2026-01.md) | Governance clarifications from real execution |

### Governance Bodies

| Document | Purpose |
|----------|---------|
| [Council Charter](council-charter.md) | First formal governance body; approves agents and rules |

### Hierarchical Contracts (Vertical)

| Document | Relationship | Key Flow |
|----------|-------------|----------|
| [Hierarchical Contracts](hierarchical-contracts.md) | All vertical relationships | Roll-up / Roll-down between levels |

**Contracts Defined:**
- Contract 1: Brady <> Claudine (Commissioner <> Country President)
- Contract 2: Claudine <> Musashi San (Country President <> Head Coach)
- Contract 3: Musashi San <> Yuki Ronin (Head Coach <> Builder)
- Contract 4: Musashi San <> Domain Expert (Head Coach <> Kataribe)

### Peer Contracts (Horizontal)

| Document | Relationship | Key Flow |
|----------|-------------|----------|
| [Peer Contracts](peer-contracts.md) | Peer-to-peer collaboration | Handoff protocols |

**Contracts Defined:**
- Contract 5: Yuki Ronin <> Domain Expert (Working Pair)
- Contract 6: Council Members <> Council Members (Governance Body)

### Information Standards

| Document | Purpose |
|----------|---------|
| [Information Flow Standards](information-flow-standards.md) | Templates and rules for all structured communication |

## Quick Reference: Who Reports to Whom

```
Brady (IOC Commissioner)
    |
    +-- Council (Phil, Cornelius, Musashi San, Claudine)
    |       +-- Governance decisions, agent approval
    |
    +-- Claudine (Country President)
            |
            +-- Musashi San (Head Coach)
                    |
                    +-- Yuki Ronin (Builder)
                    |
                    +-- Domain Expert (Kataribe)
                            +-- MaddieMerchant (Broker Co)
```

## Information Flow Direction

| Flow | Direction | Examples |
|------|-----------|---------|
| **Roll-Up** | Child to Parent | Status reports, escalations, completion reports, requests |
| **Roll-Down** | Parent to Child | Decisions, specs, feedback, authority grants |
| **Handoff** | Peer to Peer | Questions, validation requests, information shares |

## Enforcement

Contracts are enforced through:
1. **Structured formats** — Deviations are visible
2. **Audit trail** — All escalations and decisions documented
3. **Council review** — Quarterly assessment of contract compliance
4. **Commissioner oversight** — Brady retains veto on all governance matters

## Founding Documents

| Document | Location | Purpose |
|----------|----------|---------|
| [OS Doctrine](../os-doctrine.md) | 3-reference | Founding governance doctrine |
| [Olympics Framework](../olympics.md) | 3-reference | OS metaphor and drafting mechanics |
| [Narrative Architecture](../narrative-architecture.md) | 3-reference | Story-driven governance |
