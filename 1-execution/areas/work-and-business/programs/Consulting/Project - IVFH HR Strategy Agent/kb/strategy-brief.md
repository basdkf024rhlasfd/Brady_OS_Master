# PROJECT: IVFH HR Strategy Agent — AI-Powered Organizational Transformation

**OS Layer:** Execution → Area: Sycamore Lane Holdings (Consulting) → Program: SRP (Strategic Resource Planning) → Project: IVFH HR Strategy Agent
**Project ID:** SRP-IVFH-001
**Status:** Pre-Kickoff — Strategy Brief Complete, Awaiting Alignment Call
**Client:** IVFH (International Foodsource Holdings, OTCQX: IVFH) — ~70-person specialty food distribution company
**Client Sponsor:** Gary Schubert, CEO of IVFH
**Project Lead & Builder:** Austin (primary liaison with Gary, owns build + execution)
**Domain Advisor:** Brady Smallwood (Sycamore Lane Holdings — targeted domain context, not day-to-day build)
**SRP Partner:** Brandon Thurman (Thurman Advisory Group — Expert-in-the-Loop for HR strategy validation, Phase 2+)
**Created:** 2026-03-XX
**Last Updated:** 2026-03-27
**Classification:** FOR INTERNAL USE ONLY — Public company considerations apply (see Section 6)

---

## 1. PROJECT DEFINITION

### 1.1 What This Is

An organizational transformation project that uses AI as its delivery mechanism. Gary (CEO) needs a living system — an "HR Strategy Agent" — that assesses IVFH's ~70-person workforce, maps capabilities, captures organizational knowledge, and supports continuous improvement. This is NOT traditional HR administration. It is strategic workforce intelligence.

### 1.2 The Thesis

The best AI implementations pair deep domain knowledge with strong technical execution. Generic AI tools produce generic frameworks. A specialty food distributor operates nothing like a Fortune 500 CPG company — the workflows, the handoffs, the tribal knowledge, the broker network, the multi-platform retail complexity are all industry-specific. Brady's COO tenure gives the project domain context that would otherwise take weeks of discovery to acquire. Austin builds the system. Brady makes sure it knows how a specialty food company actually works.

### 1.3 Why This Matters to Brady's Business

This is the first real deployment of the SRP (Strategic Resource Planning) model — the joint offering from Sycamore Lane Holdings × Thurman Advisory Group. Doing this well with Gary creates the reference implementation for everything that follows in Brady's consulting practice. It's not a favor — it's an investment in proving the model.

### 1.4 The End State Gary Described

An organization with: clear roles, documented processes, visible handoffs, measurable capabilities, stronger problem routing, less tribal knowledge, better compensation benchmarking, more informed performance management, and a deliberate shift away from excessive manual administration toward higher-value technical and strategic work. "I should be hiring for roles, not people."

---

## 2. TEAM MODEL

### 2.1 Roles & Responsibilities

**Austin — Project Lead & Builder**
- Primary liaison with Gary
- Builds and configures AI agents, prompts, pipelines, and infrastructure
- Conducts employee interviews and captures data
- Implements SOP generation, dashboards, and reporting
- Builds the knowledge graph and routing system
- Owns ongoing maintenance and iteration
- Drives sprint cadence and manages scope

**Brady — Domain Advisor (Sycamore Lane Holdings)**
- Provides initial interview framework and domain-specific questions for Austin to adapt
- Reviews pilot outputs and flags where industry context is missing
- Advises on role architecture informed by IVFH business model
- Defines IVFH-specific skills taxonomy (vs. generic HR frameworks)
- Available async for questions that require operational context
- Periodic check-ins to review direction and suggest adjustments
- Does NOT pull from board materials (see Section 6)

**Brandon Thurman — Expert-in-the-Loop / HR Strategist (Thurman Advisory Group)**
- Calibrates the system to IVFH's industry context
- Navigates organizational politics (roles that shouldn't exist, people in wrong seats, comp misalignments)
- Validates AI-generated outputs before they reach leadership
- Conducts high-stakes conversations (performance calibration, role elimination, restructuring)
- Owns cadence in sustained engagement (quarterly re-interviews, annual recalibration)
- Connects workforce strategy to financial outcomes
- Primary involvement: Phase 2+, with advisory input in Phase 1 design

### 2.2 Cadence & Time Commitment (Brady)

**First 10 days:** ~3 hours total
- Deliver initial interview framework
- Draft IVFH-specific skills taxonomy
- Notes on role architecture
- One working session with Austin to walk through domain context

**Weeks 2–6:** ~1 hour/week
- Standing check-in (30 min with Austin, or async review)
- Review what's been built, flag domain gaps, answer questions
- Rest of Austin's week = unblocked execution

**After Week 6:** Reassess
- If domain context is baked in and Austin is rolling → taper to ad-hoc
- If deeper org design questions emerge (target-state architecture, comp benchmarking, workforce optimization) → scope as Phase 2 with increased Brady + Brandon involvement

**The goal:** Front-load highest-value contributions (frameworks, domain context) then get out of Austin's way.

---

## 3. CLIENT CONTEXT — IVFH

### 3.1 Company Profile

- **Full Name:** International Foodsource Holdings
- **Ticker:** OTCQX: IVFH
- **Headcount:** ~70 employees
- **Subsidiaries:** Artisan Specialty Foods, Golden Organics, Digital Channels
- **Business Model:** Specialty food distribution — broker network, airline catering, retail platforms (USF/Sysco, Amazon, Harvest), digital channel expansion
- **CEO:** Gary Schubert
- **Key Initiatives:** ERP rebuild, digital channel expansion, AI strategy, organizational redesign

### 3.2 Organizational Reality (Domain Context)

These are the insights from Brady's COO tenure that shape every workstream:

**Role drift is the default.** At a ~70-person specialty food company, roles exist because of who was hired, not what the company needs. The person originally hired as a customer service rep is now doing item setup, pricing adjustments, and ad-hoc reporting because they learned the systems. Title says one thing; actual work says something different.

**Tribal knowledge is the biggest risk.** Too much knowledge lives in people's heads. When someone leaves, IVFH replaces tribal knowledge rather than transitioning documented process. This creates risk, slows execution, and prevents scale. (The WBC situation is a visceral example of what happens when institutional knowledge walks out the door.)

**Industry-specific skills matter more than generic ones.** The capabilities that predict performance at a specialty food distributor include: item setup proficiency across multiple retailer platforms (each with different spec requirements), pricing logic (cost-plus, promotional, contract), distributor relationship management, digital channel operations, ERP competency, food safety/compliance knowledge, and broker network fluency. A generic HR skills taxonomy misses all of this.

**Workflows are multi-system and exception-heavy.** An item setup process involves the vendor, the broker, the item master system, potentially multiple retail platforms, pricing logic, and compliance documentation. The real knowledge lives in the workarounds and exception handling — not the happy path.

**Problem routing is broken.** Too much depends on a small number of people because no one knows who owns what. A "pricing issue" might involve the pricing analyst, the broker, the digital channel team, or customer service depending on context. A vendor cost change flows differently than a promotional pricing error, which flows differently than a retailer contract renegotiation.

**The org will change shape.** Digital channel expansion (USF, Sysco, Amazon, Harvest), the ERP rebuild, and the AI strategy all change what the org needs to look like. Current-state mapping is necessary but insufficient — the system must also model desired-state and 3-year future-state.

---

## 4. WORKSTREAMS (Gary's Six + Analysis)

### WS1: Role Architecture & Org Mapping

**Gary's Ask:** Identify who works here, what role they're in, what they actually do, and whether the org is built around roles or people. Three views: current-state, desired-state, 3-year future-state.

**Domain Context for the Build:**
- Expect significant title-vs-reality gaps across the organization
- Role clusters to probe: operations/logistics, item setup/product management, pricing/analytics, customer service, digital channel ops, sales/broker relations, compliance/food safety, finance/admin
- The interview system must capture the gap between stated role and actual work — not just record what people say their job is
- Digital channel expansion, ERP rebuild, and AI strategy all reshape the target org

**Brady's Starter Deliverable:** Notes on likely role clusters and where to expect the biggest gaps between titles and actual work.

**Austin Builds:** Org mapping system, interview data processing, current-state visualization, reporting.

**Phase:** 1

---

### WS2: Work Intelligence & SOP Capture

**Gary's Ask:** Structured interviews that go deeper than "I enter data." Capture decisions, handoffs, systems touched, time allocation. Generate SOPs, process maps, handoff documentation.

**Domain Context for the Build:**
- A generic interview gets "I set up items." A domain-informed interview asks: "When a new vendor comes in through the broker network and needs items set up for Sysco vs. Amazon, what's different? Where does it break? Who do you call when the spec sheet doesn't match?"
- The tribal knowledge lives in workarounds and exception handling
- Sensitive information (passwords, credentials, private personnel data) must be excluded or protected by design
- The process must uncover whether work is strategic, critical, administrative, or legacy activity that has never been reevaluated

**Brady's Starter Deliverable:** Initial structured interview framework with IVFH-specific probing questions for the first 3–5 pilot roles.

**Austin Builds:** AI interview capture system, SOP generation engine, process map automation, full org rollout.

**Phase:** 1

---

### WS3: Skills & Capability Inventory

**Gary's Ask:** Clear view of the organization's actual skill base — technical, analytical, operational, commercial. Breadth and depth per individual. Skills aligned to role requirements.

**Domain Context for the Build:**
- Industry-specific skills that matter at IVFH: item setup proficiency across multiple retailer platforms, pricing logic (cost-plus, promotional, contract), distributor relationship management, digital channel operations, ERP competency, food safety/compliance knowledge, broker network fluency
- Also: SQL, PHP, HTML, reporting, analytics, data visualization, PowerPoint, Excel proficiency, systems knowledge, sales capability
- A generic HR skills taxonomy will miss all the industry-specific capabilities
- Skills assessment should distinguish between "knows it exists" and "can do it under pressure when the system breaks"

**Brady's Starter Deliverable:** Draft IVFH-specific skills taxonomy.

**Austin Builds:** Assessment tool, employee-skills mapping, gap analysis dashboards, benchmarking integration.

**Phase:** 1

---

### WS4: Compensation & Role-Fit Benchmarking

**Gary's Ask:** Benchmark current compensation against external market data. Capability-adjusted — not just title-based. KPI ownership and fit-for-role analysis.

**Domain Context for the Build:**
- Politically sensitive — leadership-only deliverable
- IVFH roles often span multiple functions, so benchmarking by job title alone is misleading
- A "pricing analyst" at a specialty food distributor does fundamentally different work than one at a Fortune 500 CPG company
- Compensation should reflect actual capability, market value, and business needs — not just tenure or title

**Sequencing:** AFTER WS1–3. Need role clarity, work intelligence, and capability data before comp benchmarking makes sense.

**Brady's Role:** Industry context on what IVFH roles actually do vs. market titles.
**Brandon's Role:** HR expertise on comp benchmarking methodology, market data interpretation.
**Austin Builds:** Market data integration, capability-adjusted benchmarking reports, leadership dashboard.

**Phase:** 2

---

### WS5: Knowledge Graph & Issue Routing

**Gary's Ask:** Ownership mapping, expert identification, bottleneck analysis, intelligent routing of organizational questions. Employee-facing AND leadership-facing.

**Domain Context for the Build:**
- A "pricing issue" might involve the pricing analyst, the broker, the digital channel team, or customer service depending on context
- A vendor cost change flows differently than a promotional pricing error, which flows differently than a retailer contract renegotiation
- The routing system must understand these distinctions or it sends people to the wrong place — worse than no routing
- Depends on WS1 and WS2 being solid — the knowledge graph is built from SOPs, role architecture, and ownership matrix
- At leadership level: exposes where expertise is concentrated, where bottlenecks exist, where org is too dependent on a handful of people

**Brady's Role:** Map the ownership matrix from operational experience — who owns what at IVFH.
**Austin Builds:** Graph database, routing logic, employee-facing navigation tool, bottleneck analytics.

**Phase:** 2

---

### WS6: Workforce Optimization & Transformation

**Gary's Ask:** CEO's dashboard — where to invest, where to cut, where to automate, where to outsource. Performance visibility, admin-vs-technical mix, long-range workforce design.

**Domain Context for the Build:**
- The answer is never "automate everything"
- Likely recommendations: automate item setup validation, outsource routine compliance documentation, upskill team on digital channel analytics, restructure teams whose work won't exist after ERP rebuild
- These are business judgment calls informed by data — not pure AI outputs
- Two-tier access model: employee-facing outputs are developmental and encouraging; leadership-facing outputs are comprehensive, private, and candid
- Should support annual evaluations, role-fit assessments, development planning
- Must tie workforce decisions to KPIs and cash generation

**Brady's Role:** Strategic triage — automate vs. outsource vs. upskill vs. restructure.
**Brandon's Role:** HR strategy validation, executive coaching on org design decisions, high-stakes conversations.
**Austin Builds:** Visibility dashboards, time allocation analysis, automation opportunity scoring, long-range workforce model.

**Phase:** 2

---

## 5. PHASING

### Phase 1: Foundation (Weeks 1–6)

**Objective:** Prove the model with a focused pilot, then scale.

**Week 0 (Pre-Kickoff):**
- Alignment call with Gary — walk through strategy brief, confirm priorities, agree on information sharing for Phase 1
- Working session with Austin — domain context walkthrough, technical setup, async collaboration workflow (highest-value hour of engagement)
- Simple engagement letter — 1 page confirming scope, confidentiality, board/consulting firewall

**Days 1–10 (Brady's Front-Load):**
- Deliver structured interview framework with IVFH-specific probing questions for 3–5 pilot roles
- Deliver draft IVFH-specific skills taxonomy
- Deliver role architecture notes (role clusters, title-vs-reality gap expectations)

**Weeks 2–4 (Austin Builds):**
- Build AI-powered interview capture system from Brady's spec
- Pilot with 3–5 cross-functional roles: run interviews, generate draft SOPs, validate
- Deliver current-state org map with role clarity assessment

**Weeks 4–6 (Validate & Scale):**
- Validate with Gary and adjust before scaling
- Expand interviews to full organization
- Refine skills taxonomy based on pilot data

**Phase 1 Deliverables:**
- AI interview capture system (deployed)
- Draft SOPs for 3–5 pilot roles
- Current-state org map with role clarity assessment
- Skills & capability inventory (initial)
- Validated interview framework for full org rollout

### Phase 2: Deeper Org Design (Reassess at Week 6)

**Scope depends on what Phase 1 reveals.** Likely candidates:

- Desired-state and 3-year target org architecture
- Knowledge graph and ownership mapping (WS5)
- Comp benchmarking — leadership-only (WS4)
- Workforce optimization recommendations (WS6)
- Brandon Thurman engagement increases (Expert-in-the-Loop for HR strategy)
- Brady's involvement increases if deeper organizational strategy work has appetite

---

## 6. PUBLIC COMPANY FIREWALL

Brady sits on the IVFH Board. IVFH is publicly traded. This creates real obligations.

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

---

## 7. SRP PRODUCTIZATION CONNECTION

This project is the first client implementation of **Strategic Resource Planning (SRP)** — the joint offering from Sycamore Lane Holdings × Thurman Advisory Group.

### What SRP Is
AI + Expert-in-the-Loop model for workforce strategy. The AI does heavy lifting (data capture, pattern recognition, continuous monitoring, report generation). The expert ensures outputs are real, politically navigable, and grounded in how the specific business operates.

### SRP's 5-Stage Framework
1. **Business Strategy Alignment** — 3-year growth vision, KPI framework
2. **Current Talent Assessment** — AI-powered structured interviews, role reality capture
3. **Talent Gap Analysis** — 5-B framework (Build, Buy, Borrow, Bind, Boot)
4. **Future Talent Strategy** — Role architecture, capability targets, comp benchmarking
5. **Monitor, Adjust, Sustain** — Continuous monitoring, quarterly re-interviews, accountability

### SRP Engagement Tiers
| Tier | Description |
|------|-------------|
| **AI Agent Only** | Full AI system, async support. For companies with internal HR leadership who need tooling. |
| **AI + Expert Advisory** | AI system + quarterly expert reviews, validated outputs, leadership briefings. |
| **AI + Fractional HR Leader** | Full engagement — expert embedded in operating rhythm as fractional VP-level HR. |

### IVFH's Position in SRP
IVFH is operating at roughly the **AI + Expert Advisory** tier, with potential to scale to **AI + Fractional HR Leader** if Phase 2 scope warrants Brandon Thurman's deeper involvement.

### Why This Matters
- First reference implementation — proves the model works
- Validates the AI + Expert-in-the-Loop thesis with a real company
- Creates case study material for future SRP sales
- Tests the team model (Austin builds, Brady advises, Brandon validates)
- Informs pricing, scope, and delivery cadence for future clients

---

## 8. TECHNICAL ARCHITECTURE (For Austin)

### What the AI System Needs to Do
- Conduct structured employee interviews and capture work intelligence (decisions, handoffs, systems, time allocation)
- Generate SOPs, process maps, and organizational handoff documentation automatically
- Map current-state organization: who does what, who they depend on, where bottlenecks form
- Build and maintain a skills and capability inventory benchmarked against role requirements
- Surface workforce insights: admin-vs-technical mix, automation opportunities, capability gaps
- Monitor environmental factors (regulatory changes, labor market shifts, industry disruptions) and flag implications
- Provide intelligent issue routing: identify the right owner for a problem, not just the usual person
- Two-tier access model: employee-facing (developmental, encouraging) vs. leadership-facing (comprehensive, private, candid)

### Data Sensitivity Requirements
- Exclude or protect by design: passwords, credentials, private personnel data
- Comp data is leadership-only — never exposed broadly
- Role-fit assessments at leadership level are private
- Employee-facing outputs emphasize development, not judgment
- All data stays internal to IVFH

### Key Technical Decisions (For Austin to Own)
- Interview capture format (voice? text? structured form? AI-guided conversation?)
- SOP generation pipeline (template-based? LLM-generated? hybrid?)
- Knowledge graph architecture (graph DB? relational? vector-based?)
- Dashboard/reporting stack
- Integration with IVFH's existing systems (ERP, item master, retail platforms)
- Deployment model (cloud? on-prem? hybrid?)

---

## 9. BRADY'S STARTER DELIVERABLES (First 10 Days)

### Deliverable 1: Structured Interview Framework

Domain-informed interview questions for 3–5 pilot roles. Not generic HR questions — IVFH-specific probes that capture tribal knowledge, exception handling, workarounds, and the gap between title and actual work.

**Example probes (item setup role):**
- "When a new vendor comes in through the broker network and needs items set up for Sysco vs. Amazon, what's different?"
- "Where does the process break? Who do you call when the spec sheet doesn't match?"
- "What information do you need that you have to go find yourself vs. what's given to you?"
- "Walk me through the last time something went wrong and how you fixed it."
- "Who depends on your work being done correctly? What happens downstream if you're out for a week?"

### Deliverable 2: IVFH-Specific Skills Taxonomy

Industry-calibrated skills inventory. Categories:
- **Platform Proficiency:** Item setup across retailer platforms (Sysco, USF, Amazon, Harvest — each different), ERP modules, internal systems
- **Pricing & Analytics:** Cost-plus logic, promotional pricing, contract pricing, margin analysis, reporting
- **Supply Chain & Distribution:** Vendor management, broker network fluency, logistics, compliance/food safety
- **Digital Channel Operations:** E-commerce platform management, digital catalog maintenance, online order fulfillment
- **Commercial & Relationship:** Customer relationship management, sales, broker liaison, category management
- **Technical:** SQL, PHP, HTML, data visualization, Excel (advanced), PowerPoint, analytics tools
- **Administrative:** Order entry, tracking, documentation, general admin

For each skill: define what "basic," "proficient," and "expert" looks like at IVFH specifically (not generically).

### Deliverable 3: Role Architecture Notes

Notes on likely role clusters, where to expect title-vs-reality gaps, and initial thinking on target-state org direction. Key clusters:
- Operations / Warehouse / Logistics
- Item Setup / Product Management / Catalog
- Pricing / Analytics / Reporting
- Customer Service / Order Management
- Digital Channel / E-Commerce
- Sales / Broker Relations / Category Management
- Compliance / Food Safety / Quality
- Finance / Admin / HR
- IT / Systems / Data
- Leadership / Management

For each: expected gap between title and actual work, likely multi-function overlap, and whether the cluster changes shape under ERP rebuild + digital expansion.

---

## 10. OPEN ACTION ITEMS

| Priority | Item | Owner | Status |
|----------|------|-------|--------|
| **P0** | Alignment call with Gary — confirm priorities, information sharing, go/no-go | Brady + Austin | Not started |
| **P0** | Working session with Austin — domain context walkthrough, tech setup, async workflow | Brady + Austin | Not started |
| **P1** | Draft engagement letter — scope, confidentiality, board/consulting firewall | Brady | Not started |
| **P1** | Deliver structured interview framework (3–5 pilot roles) | Brady | Not started (Day 1–10) |
| **P1** | Deliver IVFH-specific skills taxonomy draft | Brady | Not started (Day 1–10) |
| **P1** | Deliver role architecture notes | Brady | Not started (Day 1–10) |
| **P2** | Austin: Build AI interview capture system from Brady's spec | Austin | Blocked on Brady deliverables |
| **P2** | Austin: Pilot interviews with 3–5 cross-functional roles | Austin | Blocked on system build |
| **P2** | Austin: Generate draft SOPs from pilot interviews | Austin | Blocked on pilot |
| **P3** | Validate Phase 1 outputs with Gary | All | Week 4–6 |
| **P3** | Scope Phase 2 (comp, knowledge graph, workforce optimization) | Brady + Brandon | Week 6 reassessment |

---

## 11. DECISIONS LOG

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03 | Austin leads, Brady advises | Maximize Austin's throughput. Brady's value is domain context, not day-to-day build. |
| 2026-03 | Front-load Brady's contributions in first 10 days | Get the frameworks and domain context in early — they take longest to discover and unlock everything else |
| 2026-03 | Phase 2 scoped at Week 6 reassessment | Don't over-commit. Let Phase 1 data inform what's needed next. |
| 2026-03 | Board/consulting firewall is explicit | Public company. Brady contributes general expertise + CEO-directed info only. No board materials. |
| 2026-03 | Respond in writing only on WBC matters | Separate project. Do NOT let WBC dispute bleed into HR strategy work. |
| 2026-03 | This is the SRP reference implementation | Not a favor — an investment in proving the model. Case study for future sales. |

---

## 12. RISKS & BLOCKERS

| Risk | Severity | Mitigation |
|------|----------|------------|
| Gary doesn't share enough operational info for system to be useful | HIGH | Alignment call explicitly covers what he's comfortable sharing. Engagement letter sets expectations. |
| Generic AI outputs that don't reflect IVFH reality | HIGH | Brady's domain context deliverables in first 10 days. Austin validates every output against industry context. |
| Board/consulting information firewall is breached | HIGH | Explicit engagement letter. Brady self-polices. Gary is the information source, not board materials. |
| Employee resistance to structured interviews | MEDIUM | Frame as developmental, not evaluative. Two-tier access model protects employees. |
| Phase 1 pilot doesn't produce actionable SOPs | MEDIUM | Start with 3–5 roles that have the most tribal knowledge. Validate with Gary before scaling. |
| Comp benchmarking becomes politically toxic | MEDIUM | Leadership-only deliverable. Phase 2 only — after trust is built. Brandon handles high-stakes conversations. |
| Austin capacity constraints | MEDIUM | Brady's front-load reduces Austin's discovery time. Standing check-ins catch blockers early. |
| WBC dispute creates distraction or information contamination | LOW | Separate projects. Explicit decision to not let WBC bleed into HR strategy work. |

---

## 13. RELATED PROJECTS & ENTITIES

| Project / Entity | Relationship |
|------------------|-------------|
| **SRP (Strategic Resource Planning)** | Parent offering. IVFH is the first client implementation. This project validates the SRP model. |
| **Sycamore Lane Holdings** | Brady's entity. SRP is a joint offering with Thurman Advisory Group. |
| **Thurman Advisory Group** | Brandon Thurman's entity. Expert-in-the-Loop for HR strategy. Phase 2+ involvement. |
| **Broker Co** | Brady's main revenue project. No direct connection, but SRP success validates Brady's consulting model alongside Broker Co product model. |
| **WBC Legal Response** | Separate IVFH project (Risk & Governance). NO cross-contamination. The WBC situation is useful context for WHY tribal knowledge capture matters, but the projects are firewalled. |
| **IVFH Board** | Brady's board seat creates the firewall obligations documented in Section 6. |

---

## 14. GARY'S ORIGINAL REQUIREMENTS (Verbatim Summary)

Preserved here so any system ingesting this project has Gary's voice, not just Brady's interpretation.

**Gary's seven priorities:**

1. **Workforce assessment and role clarity.** What roles exist, who sits in them, why, whether roles align with company needs. Current-state, desired-state, future-state distinction.

2. **Capability mapping.** Actual skill base — technical, analytical, operational, commercial. Breadth and depth per individual. Skills aligned to role requirements.

3. **Role fit and capability gap analysis.** Right people in right roles? Missing capabilities? Over-indexed in admin vs. technical/strategic work?

4. **Operating visibility and continuous monitoring.** Where time is spent, how much is admin, where manual entry occurs, where bottlenecks form, where automation/outsourcing makes sense. Understanding workflow reality — not surveillance.

5. **Organizational knowledge capture.** Capture how work is actually performed, how issues are resolved, where manual intervention exists, what pain points affect execution. Retain process intelligence instead of losing it to turnover.

6. **Issue routing and organizational navigation.** Help employees navigate the org intelligently. Identify the right owner for a problem. Recognize related dependencies. At leadership level: expose expertise concentration, bottlenecks, over-dependency.

7. **Performance, development, and workforce planning.** Annual evaluations, role-fit assessments, development planning. Employee-facing = developmental. Leadership-facing = comprehensive, private, candid. Evaluate role necessity, capability gaps, comp alignment, KPI ownership, org fit.

**Gary's organizing principle:** "I should not be hiring for people. I should be hiring for roles. Those roles should be defined by what the company needs to achieve, not by the preferences, limitations, or historical habits of the people currently in them."

---

*This project export was compiled from: IVFH_HR_Strategy_Brief_v3.docx (Brady's strategy brief including Gary's original requirements), SRP_Combined_Pitch.docx (the productized SRP offering), and Brady's OS governance standards. Ready for ingestion into Notion, GitHub, conductor.build, or any AI orchestration system.*
