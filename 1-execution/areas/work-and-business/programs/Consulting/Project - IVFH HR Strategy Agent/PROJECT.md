# IVFH HR Strategy Agent — Internal

> **This is the internal project manifest.** It contains Brady's goals, team mechanics, operational details, and the business strategy behind the engagement. Gary never sees this file.
>
> For the customer-facing version (Gary's goals, success criteria, what he receives), see [CUSTOMER.md](CUSTOMER.md).
>
> For the one-page visual summary, see [PROJECT-POSTER.md](PROJECT-POSTER.md).

## Program
[Consulting](../consulting.md) — Work & Business

## Customer Problem
- **Who specifically:** Gary Schubert, CEO of IVFH (International Foodsource Holdings, OTCQX: IVFH) — a ~70-person specialty food distribution company. Gary needs a living system that assesses his workforce, maps capabilities, captures organizational knowledge, and supports continuous improvement.
- **Trigger moment:** Gary is running a ~70-person org where roles are built around people, not needs. Tribal knowledge walks out the door when people leave. He can't answer basic questions about who does what, who owns what, or whether the org is structured for where the company is headed (ERP rebuild, digital channel expansion, AI strategy).
- **Current workaround:** Manual HR administration. No structured interviews, no capability mapping, no documented SOPs, no ownership matrix. Leadership decisions based on institutional memory and gut feel. When someone leaves, the replacement discovers processes by trial and error.
- **Cost of status quo:** Tribal knowledge risk (the WBC situation proved what happens when institutional knowledge walks out). Role drift — people do whatever they learned to do, not what the company needs. Broken problem routing — nobody knows who owns what. Compensation decisions disconnected from actual capability. Org structure that doesn't match where the business is going.
- **Evidence:** Direct conversations between Brady and Gary. Gary articulated seven specific priorities and an organizing principle: "I should not be hiring for people. I should be hiring for roles."

## Competition
- **Direct:** Traditional HR consultancies (expensive, slow, generic frameworks that don't understand specialty food distribution). Internal HR doing it manually (no capacity, no methodology).
- **Indirect:** Doing nothing — continuing with institutional memory and ad-hoc role definitions. Generic AI tools producing generic frameworks.
- **Time pressure:** Gary is actively thinking about org redesign. The ERP rebuild, digital channel expansion, and AI strategy all reshape what the org needs to look like. Acting now means the system informs those decisions rather than chasing them.

## Scoreboard

### Internal (Brady's Goals)
- **Victory Condition:** Prove the SRP (Strategic Resource Planning) model works as a repeatable consulting offering — deliver a working HR Strategy Agent system that Gary's team uses, validate the team model (Austin builds, Brady advises, Brandon validates), and capture the reference implementation for future SRP sales.
- **Key Results:**
  - KR1: Deliver Phase 1 foundation (AI interview capture system, pilot SOPs, org map, skills inventory) within 6 weeks of kickoff — Score: _/1.0
  - KR2: Gary actively uses system outputs for workforce decisions (references org map, cites capability data, uses SOPs) — Score: _/1.0
  - KR3: Phase 2 scope confirmed and resourced at Week 6 reassessment — Score: _/1.0
  - KR4: Capture reusable SRP engagement template in Layer 3 — Score: _/1.0
- **Leading Indicator:** Does Gary reference system outputs in conversations with Austin? Does he ask for more, or does Phase 1 sit unused?

### Customer (Gary's Goals)
- **Victory Condition:** IVFH has a living system — an HR Strategy Agent — that gives Gary clear visibility into who does what, what capabilities exist, where knowledge lives, and how to make informed workforce decisions.
- **Key Results:**
  - KR1: Clear current-state org map with role clarity assessment — roles defined by actual work, not titles — Score: _/1.0
  - KR2: Documented SOPs and process maps for pilot roles that capture tribal knowledge, exception handling, and handoffs — Score: _/1.0
  - KR3: Skills and capability inventory benchmarked against role requirements — industry-specific, not generic — Score: _/1.0
  - KR4: Gary can answer "who owns this?" and "what happens if this person leaves?" using system outputs — Score: _/1.0

### How They Connect
Brady wins when Gary wins. If Gary is making workforce decisions informed by system outputs — referencing the org map, citing capability gaps, using SOPs for onboarding — then the SRP model is validated and the reference implementation exists. Internal KR4 (template capture) is a bonus that comes from executing well on delivery.

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Pre-kickoff: Alignment call with Gary, working session with Austin, engagement letter (current)
- Phase 1 start: TBD (pending alignment call)
- Phase 1 delivery: ~6 weeks from kickoff
- Phase 2 scope: Reassess at Week 6
- Hard deadlines: None declared, but ERP rebuild and digital expansion are reshaping the org now — earlier is better.

### Brady's Time Commitment
- **First 10 days:** ~3 hours total — deliver interview framework, skills taxonomy, role architecture notes, one working session with Austin
- **Weeks 2–6:** ~1 hour/week — standing check-in with Austin, review outputs, flag domain gaps
- **After Week 6:** Reassess — taper to ad-hoc if domain context is baked in, or scope Phase 2 with increased involvement

## Team

### Engagement Team (Client-Facing)

| Person | Role | Entity |
|--------|------|--------|
| Austin | Project Lead & Builder | — |
| Brady Smallwood | Domain Advisor | Sycamore Lane Holdings |
| Brandon Thurman | Expert-in-the-Loop / HR Strategist (Phase 2+) | Thurman Advisory Group |

#### Engagement Roles
- **Austin** is primary liaison with Gary. Builds and configures AI agents, prompts, pipelines, and infrastructure. Conducts employee interviews. Implements SOP generation, dashboards, and reporting. Owns sprint cadence and scope.
- **Brady** provides initial interview framework, IVFH-specific skills taxonomy, role architecture notes. Reviews pilot outputs and flags domain gaps. Available async for operational context questions. Does NOT pull from board materials (see Public Company Firewall below).
- **Brandon** calibrates system to IVFH's industry context. Navigates org politics. Validates AI-generated outputs before they reach leadership. Conducts high-stakes conversations. Primary involvement Phase 2+, with advisory input in Phase 1 design.

### Internal Agent Team (Brady's Deliverables)

| Agent | Role | Profile |
|-------|------|---------|
| Musashi San | Product Owner | [musashi.md](../../../../0-agents/custom-built-agents/musashi.md) |
| Claudine (Code) | Builder | [claudine.md](../../../../0-agents/custom-built-agents/claudine.md) — Code mode |
| Phil | Reviewer | [phil.md](../../../../0-agents/custom-built-agents/phil.md) |
| Bo | Ops / Scope Guard | [bo.md](../../../../0-agents/custom-built-agents/bo.md) |

#### Internal Agent Roles
- **Musashi San** owns the quality of Brady's deliverables (interview framework, skills taxonomy, role architecture notes). Ensures they reflect IVFH's reality, not generic HR.
- **Claudine** builds Brady's deliverable documents, structures the frameworks, and formats for handoff to Austin.
- **Phil** pressure-tests deliverables — "would this interview question actually surface tribal knowledge, or does it get a generic answer?"
- **Bo** guards Brady's time commitment. This is a domain advisor role, not a day-to-day build.

### Authority
- Day (execution decisions): Austin (building), Brady (domain calls)
- Cycle (scope/team changes): Brady + Austin
- ARC (project kill/pivot): Brady

## Public Company Firewall

Brady sits on the IVFH Board. IVFH is publicly traded (OTCQX: IVFH). This creates real obligations.

### OFF LIMITS (Board-Sourced Information)
- Non-public financials, projections, or cash flow details
- Individual compensation data (names + pay)
- Board-level strategic discussions, M&A considerations, or legal matters
- Details of any pending litigation or regulatory issues
- Information from board packets, executive sessions, or board-only communications

### WHAT BRADY CONTRIBUTES (General Expertise + CEO-Directed)
- Organizational design frameworks from COO tenure
- Product management methodology
- Deep specialty food/distribution industry knowledge (public, general)
- AI implementation strategy and system architecture input
- Best practices for structured interviews, SOP capture, process documentation
- Information Gary shares directly in consulting capacity — sourced from him as CEO, not from board materials

### THE CLEAN PATH
- Gary decides what operational information to share
- Brady doesn't pull from board materials or use knowledge gained solely through board role
- All deliverables stay internal to IVFH
- Simple engagement letter confirms scope, confidentiality, and the board/consulting firewall

## SRP Connection

This is the first client implementation of **Strategic Resource Planning (SRP)** — the joint offering from Sycamore Lane Holdings x Thurman Advisory Group. Not a favor — an investment in proving the model. Doing this well creates the reference implementation for everything that follows in Brady's consulting practice.

IVFH is operating at roughly the **AI + Expert Advisory** tier, with potential to scale to **AI + Fractional HR Leader** if Phase 2 scope warrants Brandon's deeper involvement.

## Where Things Live

| What | Where |
|------|-------|
| Project planning | Brady OS repo — `1-execution/.../Project - IVFH HR Strategy Agent/` |
| Strategy brief | `kb/strategy-brief.md` in this project directory |
| Delivered artifacts | Austin's build environment (IVFH-internal) |
| Templates captured | Brady OS repo — Layer 3 reference |
| Tasks | Notion (linked to Consulting program) |
| Communication | Conductor workspaces, phone calls |
| Project manifest | This file |
| OS governance | [olympics.md](../../../../3-reference/olympics.md), [consulting-engagement.md](../consulting-engagement.md) |

## Publishing
- Visibility: **private** — public company considerations, no external publication
- Public slug: n/a
- Approval: n/a

## Status
- Phase: **pre-kickoff** (strategy brief complete, awaiting alignment call with Gary)
- Last updated: 2026-03-27
- Final medal: pending
