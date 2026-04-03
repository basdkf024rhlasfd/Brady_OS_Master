# IVFH HR Strategy Agent — Internal

> **This is the internal project manifest.** It contains Brady's goals, team mechanics, operational details, and the business strategy behind the engagement. Gary never sees this file.
>
> For the customer-facing version (Gary's goals, success criteria, what he receives), see [CUSTOMER.md](CUSTOMER.md).
>
> For the one-page visual summary, see [PROJECT-POSTER.md](PROJECT-POSTER.md).

## Program
[Consulting](../consulting.md) — Work & Business

## Engagement Model
**Tier 2 — Self-Service Assessment (Complimentary Pilot)**

Deploy a workforce intelligence system to IVFH's ~70-person org. Surveys + AI-guided questionnaires — no human interviews, no disruption. Employees respond on their own time. The system generates deliverables on a cadence. Gary gets a leadership dashboard.

This is the default engagement. If the data reveals questions that need deeper investigation (Tier 3: human interviews, financials, comp benchmarking), that's a natural next step — but nothing about this pilot assumes or requires it.

See: [Statement of Work](kb/statement-of-work.md) | [Tier Spectrum](kb/tier-spectrum.md)

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
- **Victory Condition:** Prove the SRP Tier 2 model works as a scalable, repeatable product — deploy a self-service workforce assessment to IVFH's full org, generate actionable deliverables without human interviews, and create the reference implementation for future SRP sales.
- **Key Results:**
  - KR1: Deploy Tier 2 assessment system to IVFH's ~70 employees within 2 weeks of kickoff — Score: _/1.0
  - KR2: System generates org map, skills heat map, SOP drafts, and gap analysis on cadence (Weeks 2/4/6/8) — Score: _/1.0
  - KR3: Gary actively uses system outputs for workforce decisions — Score: _/1.0
  - KR4: Tier 2 data creates natural pull for Tier 3 conversation at Week 8 — Score: _/1.0
- **Leading Indicator:** Does Gary reference the dashboard? Does he forward deliverables to his leadership team? Does he ask "can we go deeper on X?"

### Customer (Gary's Goals)
- **Victory Condition:** Gary sees his organization clearly — who does what, what capabilities exist, where the gaps are — without disrupting operations or scheduling a single interview.
- **Key Results:**
  - KR1: Current-state org map showing role reality vs. titles across all ~70 employees — Score: _/1.0
  - KR2: Skills and capability heat map benchmarked against IVFH-specific role requirements — Score: _/1.0
  - KR3: SOP drafts generated from survey + AI interview data for key roles — Score: _/1.0
  - KR4: Gap analysis that answers Gary's top 3–5 priority questions about his organization — Score: _/1.0

### How They Connect
Brady wins when Gary wins. If Gary is making workforce decisions informed by Tier 2 outputs — and asking "can we go deeper?" — the model is validated and the Tier 3 upsell is earned, not pitched. The reference implementation exists regardless.

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Pre-kickoff: Alignment call with Gary (current)
- Deploy: Tier 2 assessment live within 2 weeks of go
- Deliverable cadence: Weeks 2 / 4 / 6 / 8
- Week 8: Full assessment + Tier 3 conversation if data warrants
- Hard deadlines: None declared, but ERP rebuild and digital expansion are reshaping the org now — earlier is better.

### Brady's Time Commitment
- **Pre-deploy:** ~2 hours — alignment call with Gary, calibrate survey questions and skills taxonomy for IVFH
- **Weeks 1–8:** ~30 min/week — review automated outputs, flag where domain context is missing, async with Austin
- **Week 8:** ~1 hour — review full assessment, advise on Tier 3 recommendation

## Team

### Engagement Team (Client-Facing)

| Person | Role | Entity |
|--------|------|--------|
| Austin | Project Lead & Builder | — |
| Brady Smallwood | Domain Advisor | Sycamore Lane Holdings |
| Brandon Thurman | Expert-in-the-Loop / HR Strategist (Phase 2+) | Thurman Advisory Group |

#### Engagement Roles
- **Austin** is primary liaison with Gary. Deploys and configures the Tier 2 assessment system — surveys, AI-guided follow-ups, automated deliverable generation, leadership dashboard. Owns sprint cadence and scope.
- **Brady** calibrates survey questions, skills taxonomy, and role architecture to IVFH's specific industry context. Reviews automated outputs and flags domain gaps. Available async for operational context questions. Does NOT pull from board materials (see Public Company Firewall below).
- **Brandon** available for Tier 3 engagement if pilot data warrants deeper org design work. Advisory input on Tier 2 assessment design. Primary involvement Tier 3+.

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

IVFH is starting at **Tier 2 (Self-Service Assessment)** — the scalable, product-like engagement that proves the model without heavy consulting overhead. If the data creates pull for Tier 3 (Expert-Led Discovery with Brandon's deeper involvement), that's earned, not pitched.

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
- **Slug:** `gary-schubert`
- **Portal route:** `/gary-schubert`
- **Surface:** Static HTML viewer + markdown KB
- **Approved:** 2026-03-30
- **Allowlist entry:** `3-reference/publishing/mception-ai-projects.yml`
- **Note:** Portal shows SOW, tier spectrum, and engagement overview only. No board materials, no non-public financials, no individual comp data.

## Status
- Phase: **pre-kickoff** (SOW drafted, awaiting alignment call with Gary)
- Engagement model: Tier 2 — Self-Service Assessment (Complimentary Pilot)
- Last updated: 2026-03-30
- Final medal: pending
