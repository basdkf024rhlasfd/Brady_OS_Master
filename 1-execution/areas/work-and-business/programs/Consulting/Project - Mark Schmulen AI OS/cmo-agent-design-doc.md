# CMO AI Agent Scaffold — Design Doc

> Handoff document for building the CMO agent deliverable for Mark Schmulen (Mark's portfolio).

## Context

Brady is building a CMO AI agent as the first deliverable for his fractional AI advisory practice. Client: Mark Schmulen (CEO/Founder, Mark's portfolio — real estate tech). First engagement is free as a pilot. Phase 1 deadline: 2026-04-11. Mark is actively hiring a marketer — the CMO agent needs to land before that hire closes the window.

The existing Mark Schmulen project (`1-execution/.../Project - Mark Schmulen AI OS/`) has KB docs describing the CMO agent at a high level (`kb/02-cmo-agent.md`, `kb/04-skills-library.md`). This design doc specifies the executable scaffold: orchestrator + 4 active sub-agents, research brief, context extraction interview guide, and kb/ placeholders.

### Council Review (2026-03-27)

The original 15-file design doc was reviewed by Musashi San (Product Owner), Claudine (Judgment), Burt (Consigliere), and Phil (Coherence). Key changes:

1. **Sub-agents trimmed from 7 to 4** — Ship what Mark will use in Week 1 (Content, Growth, Analytics, EA). Brand Strategist, Product Marketing, Creative Director deferred to expansion slots.
2. **Context extraction interview elevated to Deliverable #1** — The scaffold is useless without populated kb/ files. Interview guide is the critical path.
3. **TEMPLATE.md deferred to post-delivery** — Internal IP capture (KR4) happens after Mark has a working system, not during the build.
4. **DESIGN-TOOLS.md folded into RESEARCH.md** — Mark didn't ask for a design tool evaluation. Keep it as a short reference section.
5. **Day 1 Experience added** — Design backwards from the aha moment: Mark types `/content-draft`, gets something in his voice.

---

## Output Structure

All files under:
`1-execution/areas/work-and-business/programs/Consulting/Project - Mark Schmulen AI OS/cmo-agent/`

```
cmo-agent/
  SKILL.md                  ← CMO orchestrator (routes to 5 active sub-agents)
  RESEARCH.md               ← AI CMO landscape 2026 + design tools reference
  INTERVIEW-GUIDE.md        ← Context extraction template (Deliverable #1)
  brady-os-toolkit.md       ← 7 packaged Brady OS frameworks for Mark
  skills/
    content-marcomms.md      ← Content creation, LinkedIn, email, social
    substack-publishing.md   ← Long-form essays, series planning, repurposing
    demand-gen.md            ← SEO, growth, campaigns
    analytics-insights.md    ← Data analysis, reporting, competitive intel
    marketing-ea.md          ← Calendar, coordination, follow-ups
    _open-source-slot.md     ← Placeholder for community agents
    _expansion-slots.md      ← Phase 2 roles (brand, product mktg, creative)
  examples/
    linkedin-posts-draft.md  ← 4 pre-interview example posts (structural reference only)
  kb/                        ← Pre-populated from public + private research
    manifesto.md             ← ✅ Pre-researched (3 companies + cross-cutting)
    brand-voice.md           ← ✅ Pre-researched + private voice DNA analysis
    competitive-landscape.md ← ✅ Pre-researched (competitors per company)
    content-history.md       ← ✅ Pre-researched (platforms, gaps, cadence)
    gtm-strategy.md          ← ✅ Pre-researched (ICP, channels, stack per company)
```

---

## File Details

### 1. `INTERVIEW-GUIDE.md` (Deliverable #1)
Structured 45-60 minute interview for Brady to run with Mark. Sections:
- Business mission & what Mark's portfolio does
- Brand voice (how Mark writes/speaks, tone preferences)
- Competitive landscape (competitors, differentiation)
- Content history (past publications, platforms, what worked)
- GTM strategy (current approach, target audience, channels)
- Tool inventory (daily tools — validates MCP connections)
- Pain points (what to delegate first)

Each section maps to a specific kb/ file. Post-interview checklist included.

### 2. `RESEARCH.md`
- **Where AI handles CMO work well (2026):** content generation, brand voice enforcement, competitive messaging analysis, email sequencing, social content adaptation, campaign analytics, A/B test design, marketing calendar management
- **Where humans remain essential:** brand strategy decisions, creative judgment, stakeholder relationships, crisis comms, budget allocation, market timing
- **CMO direct reports** with AI readiness ratings (high/medium/low)
- **Implications for Mark's portfolio** — startup context, Mark doing his own marketing
- **Design tools reference:** Mermaid for in-codebase diagrams, Excalidraw for planning, Canva for polished client deliverables. Keep external to agent.

### 3. `SKILL.md` (Orchestrator)
- **Identity:** Strategic marketing coordinator for Mark's portfolio
- **Routing logic:** Classify request → identify sub-agent → provide context → review output
- **Sub-agent registry:** 4 active skills + open-source slot + expansion slots
- **KB references:** Points to `kb/` files
- **Escalation rules:** Budget decisions, public crisis, brand strategy changes, legal/compliance → escalate to Mark
- **Guardrails:** Never publish without approval, never deviate from brand voice, never make budget decisions, never contact external parties
- **MCP connections:** 8 tools identified and wired (Gmail, Calendar, Canva, Notion, Bright Data, Granola, Vibe Prospecting, Vercel). Mark's OAuth checklist ready for tomorrow's call.
- **Day 1 Experience:** Mark types `/content-draft "LinkedIn post about [topic]"` → gets a draft in his voice

### 4. `skills/` (4 Active Sub-agents + 2 Slots)

Each sub-agent follows consistent structure: Identity, Instructions, Capabilities, Specialist Agents, Escalation Rules, Reference Files.

**Sub-agent → Imported Agent Mapping:**

| Sub-Agent | Imported Agents Referenced |
|-----------|--------------------------|
| Content & MarComms | marketing-content-creator, marketing-linkedin-content-creator, marketing-social-media-strategist, marketing-podcast-strategist, marketing-tiktok-strategist, marketing-twitter-engager |
| Demand Gen | marketing-growth-hacker, marketing-seo-specialist |
| Analytics & Insights | marketing-growth-hacker |
| Marketing EA | (coordination role, no imports) |
| _open-source-slot | Lists unassigned imported agents (carousel, instagram, short-video) |
| _expansion-slots | Documents Brand Strategist, Product Marketing, Creative Director for Phase 2 activation |

### 5. `kb/` Placeholders
Each file has a header explaining what to populate and which interview questions feed it. These are populated after the Week 1 context extraction interview.

---

## Key Design Decisions

1. **CMO as a focused TEAM** — One orchestrator routes to 4 sub-agents mapped to what Mark actually needs, not a textbook CMO org chart
2. **Sub-agents reference existing imported agents** — Marketing agents in `/0-agents/imported-agents/marketing/` are referenced as specialists, not duplicated
3. **Interview guide is the critical path** — The scaffold is structurally complete but functionally inert without populated kb/ files
4. **Files live with the project** — Primary location is the Mark Schmulen project dir. Template extraction (KR4) happens post-delivery
5. **Expansion slots, not waste** — Deferred roles are documented with clear activation instructions, not deleted
6. **MCP connections validated, not assumed** — Tool inventory confirmed during interview before any integrations are built

## Implementation Sequence

1. ~~Build `INTERVIEW-GUIDE.md`~~ ✅
2. ~~Build `RESEARCH.md`~~ ✅
3. ~~Build `SKILL.md` orchestrator~~ ✅
4. ~~Build 4 active skills + slots~~ ✅
5. ~~Build `kb/` placeholders~~ ✅
6. **Post-delivery:** Extract TEMPLATE.md from the delivered scaffold (KR4)

## Constraints

- Follow Brady OS patterns (agent template format, SKILL.md format, layer structure)
- No scope creep into platform/SaaS — this is files on Mark's machine
- Structure must align with existing `kb/02-cmo-agent.md` and `kb/04-skills-library.md` specs
- All sub-agents must be modular so they can be swapped, upgraded, or reused across clients

## Verification

- All 11 files follow Brady OS patterns
- Sub-agents correctly reference existing imported marketing agents by path
- INTERVIEW-GUIDE.md covers all 5 kb/ fields
- kb/ placeholders have clear prompts tied to interview sections
- Expansion slots document Phase 2 roles with activation instructions
- Day 1 experience is defined and testable

---

## Capability Scorecard

> Scored on **execution reality**, not documentation quality. A perfectly written SKILL.md with no tool bindings and empty KB files cannot score above 2. You get zero credit for architecture that can't move a needle for Mark today.

### How to Read This Scorecard

**Score Bands** — each band has hard gates. You cannot claim a band without meeting its criteria:

| Band | What it means | Hard gate |
|------|--------------|-----------|
| **1–2** | Architecture exists (files, structure, spec) but nothing executes | Files exist with correct structure |
| **3–4** | KB populated, agent generates output, but no tool connections | Real client data in KB files, output sounds like Mark |
| **5–6** | Tool connections live, core workflow executes end-to-end | Mark types command → gets usable output without leaving the agent |
| **7–8** | Output is client-ready, feedback loops working, Mark uses it daily | Mark actually uses it unprompted. Agent improves from corrections |
| **9–10** | Fully autonomous within guardrails, measurable impact on workflow | Quantifiable time saved. Agent self-initiates within approved scope |

**Six scoring dimensions** (each sub-skill is evaluated against all six):

| Criterion | What it measures | Weight |
|-----------|-----------------|--------|
| **Context grounding** | KB files populated with real client data (voice, manifesto, GTM) | High |
| **Tool connectivity** | MCP/API bindings to real systems (Gmail, Calendar, Canva, LinkedIn, analytics) | High |
| **End-to-end execution** | Mark types a command → gets usable output without copy-pasting between tools | High |
| **Output quality** | Output is client-ready: voice match, factual, actionable | Medium |
| **Feedback loop** | Agent learns from corrections, memory persists across sessions | Medium |
| **Guardrails** | Approval gates and escalation rules actually enforced, not just documented | Medium |

---

### Competitive Benchmark: Breadth vs Depth

| Tool | Breadth (functions covered) | Depth (execution capability) | Notes |
|------|----------------------------|------------------------------|-------|
| **Jasper AI** | Narrow (content only) | Deep (8/10) | Best-in-class content gen, brand voice training, Canva/Webflow integrations. Zero demand gen, analytics, or EA. |
| **Copy.ai** | Narrow (content + workflows) | Medium-Deep (7/10) | Strong copy gen, workflow automations, CRM integrations. No analytics, no calendar, no orchestration. |
| **HubSpot AI Agent** | Medium (content + email + CRM) | Medium (6/10) | Lives inside HubSpot ecosystem. Good email/CRM, limited outside its walled garden. No custom voice training. |
| **Lately.ai** | Narrow (social repurposing) | Medium (5/10) | Repurposes long-form into social clips. One trick, does it decently. |
| **Persado** | Narrow (message optimization) | Deep (7/10) | AI-generated marketing language with performance data. Enterprise pricing, narrow use case. |
| **Claude + good prompts** | As wide as you prompt | Shallow (3/10) | Can do anything once, remembers nothing, no tool connections, no persistence. |
| **Mark's CMO Agent (today)** | **Wide (14 sub-skills)** | **Shallow (1.9/10 avg)** | Broadest coverage. Research-backed architecture, KB pre-populated, MCP connections identified. Still no execution. |
| **Mark's CMO Agent (theoretical max)** | **Wide (14 sub-skills)** | **Deep (10/10)** | If fully built: orchestrated multi-agent system with brand voice, tool bindings, memory, and guardrails. No commercial product offers this. |

**The opportunity:** Commercial tools are deep-but-narrow. Mark's agent is broad-but-shallow. The goal is broad-AND-deep — which no off-the-shelf product delivers today.

---

### Sub-Skill Progression Rubric

Each row shows left-to-right progression. **Bold** marks current position. Each column to the right has a specific unlock action with the blocker that must be cleared.

#### Content & MarComms — Aggregate: 2.8/10

##### LinkedIn Post Drafting — Current: 3.0/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Skill file + format rules + imported linkedin-creator agent | brand-voice.md filled from interview. Agent drafts in Mark's voice | LinkedIn scheduling tool connected (Buffer/Hootsuite). Drafts queue for approval | Mark can't distinguish agent posts from his own on blind test. Memory captures his edits | Agent proposes topics from industry trends, self-schedules within approved cadence |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/brand-voice.md` from interview (or pre-research) | Brady (today: scrape LinkedIn) + Mark (validate) | 1 hr prep + 5 min validation |
| → 5-6 | Connect a scheduling/posting tool. No LinkedIn MCP exists — Buffer or manual copy-paste is the ceiling today | Brady (research options) + Mark (OAuth if tool chosen) | 1-2 hrs |
| → 7-8 | Mark reviews 5+ drafts and provides corrections. Agent stores corrections in memory | Mark (async, ~2 min per draft) | 20 min total over 1 week |
| → 9-10 | Agent monitors industry news via Bright Data, proposes weekly topics, auto-queues drafts | Brady (build the trigger loop) | 3-4 hrs |

##### Blog / Long-Form Content — Current: 3.0/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Content-creator agent referenced, output format documented | brand-voice + content-history populated. Agent drafts 1500+ words in Mark's voice | Bright Data for topic research. Notion MCP for draft storage. Checks content-history for duplicates | Mark edits are minimal (<20% rewrite). Voice match confirmed | Auto-researches trending topics, checks against content calendar, drafts proactively |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/brand-voice.md` + `kb/content-history.md` | Brady + Mark (interview) | 1 hr |
| → 5-6 | Wire Bright Data (already available) for research + Notion MCP for draft output | Brady | 1-2 hrs |
| → 7-8 | Mark reviews 3+ long-form drafts, agent learns correction patterns | Mark (async, ~10 min per draft) | 30 min over 2 weeks |
| → 9-10 | Build content pipeline: research → draft → review queue → publish | Brady | 4-5 hrs |

##### Email Campaigns — Current: 1.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Format rules documented (subject <50 chars, sequence structure) | gtm-strategy.md populated with ICP/audience data. Agent drafts sequences for the right personas | Gmail MCP connected (available on Brady's account — needs Mark's OAuth). Can draft and stage emails | A/B tests subject lines. Tracks open/click. Respects send frequency guardrails | Auto-sequences nurture campaigns. Self-adjusts based on engagement data |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/gtm-strategy.md` — need ICP, audience segments, current email approach | Mark (interview, 5 min) | 5 min |
| → 5-6 | Connect Gmail MCP to Mark's Google account (OAuth) | **Mark must do this** (3 min OAuth click) | 3 min |
| → 7-8 | Agent sends 3+ test campaigns, Mark reviews performance | Mark (review results, 5 min/week) | Ongoing |
| → 9-10 | Connect CRM/list data + build send frequency guardrails + auto-A/B testing | Brady + Mark (identify CRM) | 3-4 hrs |

##### Social Media Adaptation — Current: 1.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| 6 specialist agents referenced (social, TikTok, Twitter, podcast, etc.) | KB populated + we know which platforms Mark actively uses | Scheduling tool connected (Buffer/Hootsuite) + platform format rules applied | Agent adapts one piece across platforms correctly. Tracks engagement per platform | Cross-posts automatically. Optimizes timing/format per platform from engagement data |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | **Ask Mark which platforms he uses** — can't even target without this | Mark (interview, 2 min) | 2 min |
| → 5-6 | Connect scheduling tool. No native social MCPs exist — Buffer API or manual | Brady (research) + Mark (OAuth) | 2-3 hrs |
| → 7-8 | Agent adapts 5+ posts across platforms, Mark validates format/tone per channel | Mark (async, 2 min per post) | 15 min over 1 week |
| → 9-10 | Build cross-posting pipeline with engagement tracking | Brady | 4-5 hrs |

---

#### Demand Gen — Aggregate: 2.1/10

##### SEO Audit & Keyword Strategy — Current: 1.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| SEO specialist agent referenced. Pure documentation | gtm-strategy populated. Agent generates keyword list aligned to business goals | Bright Data scrapes competitor sites + keyword data. Can crawl Mark's sites | Prioritized keyword list tied to actual GTM. Recommendations are actionable | Tracks ranking changes over time. Auto-suggests new keyword opportunities |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/gtm-strategy.md` — need target market, current channels | Mark (interview, 5 min) | 5 min |
| → 5-6 | Wire Bright Data (already available) to crawl Mark's sites + competitor sites | Brady | 1-2 hrs |
| → 7-8 | Agent produces 3+ keyword audits, Mark confirms alignment with business priorities | Mark (review, 10 min each) | 30 min |
| → 9-10 | Build recurring crawl schedule + ranking tracker | Brady | 3-4 hrs |

##### Campaign Planning — Current: 2.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Well-structured output format (audience, channels, messaging, budget, metrics) | gtm-strategy + competitive-landscape populated. Plans grounded in reality | Bright Data for market research. Notion for campaign tracking | Plans include realistic timelines, budgets, and success metrics Mark agrees with | Tracks campaigns against metrics. Auto-suggests adjustments |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/gtm-strategy.md` + `kb/competitive-landscape.md` | Mark (interview) + Brady (pre-research competitors today) | 1 hr |
| → 5-6 | Wire Bright Data + Notion MCP for tracking | Brady | 1-2 hrs |
| → 7-8 | Mark runs 2+ campaigns from agent plans, validates feasibility | **Mark must actually execute** | Ongoing |
| → 9-10 | Connect analytics to close the loop: plan → execute → measure → adjust | Brady + Mark (analytics access) | 3-4 hrs |

##### Growth Experiments — Current: 2/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Hypothesis format documented (If/Then/Measured by) | KB populated with baselines and current performance data | Analytics data source connected. Experiment tracking in Notion | Hypotheses generated from real data. Results measured with statistical rigor | Maintains experiment log. Suggests next experiments based on learnings |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Get baseline metrics from Mark — what does he track today, what are the numbers | Mark (interview, 5 min) | 5 min |
| → 5-6 | Connect analytics source + build Notion experiment tracker | Brady + Mark (analytics access) | 2-3 hrs |
| → 7-8 | Run 3+ experiments, validate agent's hypothesis quality and measurement | **Mark must run experiments** | 2-4 weeks |
| → 9-10 | Auto-generate hypotheses from performance trends, maintain learnings DB | Brady | 3-4 hrs |

##### Cold Outreach (DM/Email) — Current: 2.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Elaborate 5-step message structure. Best-documented sub-skill | gtm-strategy populated with ICP. Agent personalizes for target personas | Gmail MCP + Vibe Prospecting (both available). Can research prospects and draft outreach | Personalized from real prospect data. Mark approves before send. Tracks response rates | Auto-identifies prospects, drafts sequences, sends after approval, iterates on response data |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/gtm-strategy.md` — need ICP definition per company | Mark (interview, 5 min) | 5 min |
| → 5-6 | Wire Gmail MCP (Mark OAuth) + Vibe Prospecting (already available) | **Mark must OAuth Gmail** (3 min) + Brady wires Vibe | 1 hr |
| → 7-8 | Agent drafts 10+ outreach messages, Mark reviews before send, tracks responses | Mark (review, 1 min each) | 15 min over 1 week |
| → 9-10 | Agent auto-researches prospects, personalizes deeply, manages cadence | Brady (build pipeline) | 4-5 hrs |

---

#### Analytics & Insights — Aggregate: 1.7/10

##### Campaign Reporting — Current: 1/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Output format documented (headline finding → data → action) | We know Mark's analytics stack and what metrics matter to him | Connected to analytics platforms (GA, social insights, email metrics) | Auto-generates weekly CEO-level reports. Translates data into decisions | Tracks trends. Proactively surfaces anomalies. Suggests actions |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | **Ask Mark what he tracks and where** — analytics stack unknown | Mark (interview, 3 min) | 3 min |
| → 5-6 | Connect analytics data sources (depends entirely on what Mark uses) | **Mark must grant access** + Brady wires | 2-3 hrs |
| → 7-8 | Agent generates 4+ weekly reports, Mark confirms they surface the right insights | Mark (review, 5 min/week) | 20 min over 1 month |
| → 9-10 | Auto-scheduled reports + anomaly detection + trend analysis | Brady | 3-4 hrs |

##### A/B Test Analysis — Current: 1/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Analysis framework documented | We know what Mark tests and how (if at all) | Can ingest test data (CSV upload or API) and perform statistical analysis | Recommends winners with confidence intervals. Suggests next test | Designs tests proactively. Monitors results. Auto-calls winners at significance |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | **Ask Mark if he runs A/B tests at all** — may be N/A for now | Mark (interview, 2 min) | 2 min |
| → 5-6 | Build data ingestion (likely CSV-based to start) | Brady | 1-2 hrs |
| → 7-8 | Agent analyzes 3+ real tests with correct statistical methodology | **Mark must run tests and provide data** | Ongoing |
| → 9-10 | Auto-design experiments based on campaign performance data | Brady | 3-4 hrs |

##### Competitive Intelligence — Current: 3/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Competitive brief format documented. References competitive-landscape KB | competitive-landscape.md populated with real competitors + positioning | Bright Data monitors competitor sites/content. Auto-generates briefs on changes | Briefs surface actionable insights, not just "competitor X posted Y" | Alerts on significant competitor moves. Tracks messaging evolution over time |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/competitive-landscape.md` — Brady pre-researches today, Mark validates | Brady (today) + Mark (2 min validation) | 1 hr + 2 min |
| → 5-6 | Wire Bright Data (already available) for recurring competitor scrapes | Brady | 1-2 hrs |
| → 7-8 | Agent generates 4+ competitive briefs, Mark confirms they're actionable | Mark (review, 5 min each) | 20 min |
| → 9-10 | Build automated monitoring: daily scrape → diff detection → alert on changes | Brady | 3-4 hrs |

---

#### Marketing EA — Aggregate: 1.2/10

##### Content Calendar Management — Current: 1/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Rolling 4-week view documented | We know Mark's current planning process and desired cadence | Google Calendar MCP connected. Agent maintains calendar with content slots | Auto-populates from content pipeline. Sends reminders. Adjusts when deadlines slip | Coordinates across all sub-agents. Balances content mix across companies |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | **Ask Mark how he plans content today** (if at all) and desired posting cadence | Mark (interview, 3 min) | 3 min |
| → 5-6 | Connect Google Calendar MCP to Mark's account | **Mark must OAuth** (3 min click) | 3 min |
| → 7-8 | Agent manages calendar for 2+ weeks, Mark finds it useful | Mark (use it) | Ongoing |
| → 9-10 | Auto-fills calendar from content pipeline, cross-references with company priorities | Brady | 3-4 hrs |

##### Follow-Up Tracking — Current: 1/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Nudge system documented | We know Mark's commitments and tracking style | Notion MCP (available) for persistence + Gmail MCP for context | Tracks commitments with dates. Proactive nudges. Escalates overdue | Integrates across all tools. Auto-creates follow-ups from meetings |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Learn Mark's current follow-up process (or lack thereof) | Mark (interview, 2 min) | 2 min |
| → 5-6 | Build Notion DB for tracking + wire Gmail MCP for context | Brady + **Mark OAuth for Gmail** | 1-2 hrs |
| → 7-8 | Agent tracks 10+ follow-ups accurately, Mark trusts the nudges | Mark (use it for 2+ weeks) | Ongoing |
| → 9-10 | Auto-extracts commitments from meetings (via Granola) and emails | Brady | 3-4 hrs |

##### Meeting Prep — Current: 1.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Brief format documented (<1 page, pulls from KB) | KB populated with company/contact context. Briefs are grounded | Calendar MCP shows upcoming meetings + agent auto-generates briefs | Briefs ready 30 min before. Include past interaction context (Granola) | Auto-triggers. Pulls relevant emails, past meetings, company research |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate KB files (manifesto, competitive landscape, GTM) | Brady + Mark (interview) | 1 hr |
| → 5-6 | Connect Google Calendar MCP + Granola MCP (both available) | **Mark must OAuth Calendar** (3 min) | 3 min + 1 hr wiring |
| → 7-8 | Agent generates briefs for 5+ real meetings, Mark confirms usefulness | Mark (review, 2 min each) | 10 min |
| → 9-10 | Auto-trigger 30 min before meetings + pull Granola transcripts from past meetings with same contact | Brady | 3-4 hrs |

---

#### CMO Orchestrator — Aggregate: 3.0/10

##### Request Routing — Current: 2.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| 6-step routing logic well-designed | Sub-agents have context to generate grounded output | At least 1 sub-agent executes end-to-end. Routing is functional | Routes 95%+ correctly. Handles multi-step requests spanning sub-agents | Self-selects optimal sub-agent combinations. Chains workflows |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate KB files so sub-agents have context | Brady + Mark (interview) | 1 hr |
| → 5-6 | Get any single sub-agent to score 5+ (LinkedIn drafting is fastest path) | Brady | 2-3 hrs |
| → 7-8 | Test routing with 20+ diverse requests, fix misclassifications | Brady | 2-3 hrs |
| → 9-10 | Build multi-step workflows (e.g., research → draft → schedule → track) | Brady | 4-5 hrs |

##### Brand Voice Enforcement — Current: 3.5/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Guardrail documented in SKILL.md | brand-voice.md populated with real examples + anti-patterns | Orchestrator scores every output before presenting to Mark | Rejects/rewrites output that doesn't match voice on blind test | Self-improves voice model from Mark's edits over time |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate `kb/brand-voice.md` — Brady pre-builds from LinkedIn scrape, Mark validates | Brady (today) + Mark (5 min) | 1 hr + 5 min |
| → 5-6 | Add voice-check step to orchestrator routing (score output against brand-voice.md before returning) | Brady | 1-2 hrs |
| → 7-8 | Mark does blind test: 5 agent posts vs 5 of his own. Agent passes if Mark can't reliably tell | **Mark must test** | 15 min |
| → 9-10 | Agent stores every correction and updates voice model automatically | Brady | 2-3 hrs |

##### Quality Review Gate — Current: 2/10

| 1-2: Spec Exists | 3-4: KB Populated | 5-6: Tool Wired | 7-8: Client-Ready | 9-10: Autonomous |
|:-:|:-:|:-:|:-:|:-:|
| **HERE** | | | | |
| Review step + escalation rules documented | KB context enables factual accuracy checks | Gate catches voice mismatches, factual errors, policy violations | Maintains quality log. Mark trusts output enough to approve without heavy editing | Auto-escalates edge cases. Quality improves measurably month-over-month |

| What | Unlock action | Who does it | Effort |
|------|--------------|-------------|--------|
| → 3-4 | Populate KB files so factual checking is possible | Brady + Mark (interview) | 1 hr |
| → 5-6 | Implement review checks in orchestrator (voice score, fact-check against KB, escalation trigger) | Brady | 2-3 hrs |
| → 7-8 | Track quality metrics: % of outputs Mark accepts without edits | Brady | 1-2 hrs |
| → 9-10 | Build quality log + auto-improvement from rejection patterns | Brady | 3-4 hrs |

---

### Aggregate Score

| Component | Score | Weight | Weighted | Change |
|-----------|-------|--------|----------|--------|
| Content & MarComms | 2.8/10 | 30% | 0.84 | +1.3 (KB populated, deep voice DNA from Otter + texts, Substack skill added) |
| Demand Gen | 2.1/10 | 20% | 0.42 | +0.35 (competitors + GTM pre-researched) |
| Analytics & Insights | 1.7/10 | 15% | 0.25 | +0.4 (competitive landscape populated) |
| Marketing EA | 1.2/10 | 15% | 0.18 | +0.2 (manifesto helps meeting prep) |
| CMO Orchestrator | 3.0/10 | 20% | 0.60 | +1.3 (MCP wired, voice DNA deep, Brady OS toolkit packaged) |
| **Total** | | | **2.3/10** | **+0.8 from pre-research + voice analysis** |

**Score as of 2026-04-01 (post pre-research + private voice analysis, pre-interview):**
- Moved from pure architecture (1.5) to research-backed + voice-calibrated architecture (2.3)
- Brand Voice Enforcement jumped to 3.5/10 — private source analysis (Otter transcript, text messages) produced deep rhetorical pattern mapping that most CMO agents never get
- Still in Band 2-3 (architecture with strong context, but nothing executes end-to-end yet)
- Tomorrow's interview + OAuth clicks are the unlock to Band 4-5
- Projected end-of-week score with full execution: **5.0-6.0/10** (tool connections live, first outputs generated, feedback loop started)

---

### Score Unlock Roadmap

Prioritized by how many sub-skill scores move per action:

| Priority | Action | Effort | Skills Unlocked | Score Impact |
|----------|--------|--------|-----------------|-------------|
| **1** | **Pre-research Mark's public content** — scrape LinkedIn, company sites, competitors. Draft KB files before interview | 2-3 hrs (Brady, no Mark needed) | Competitive intel, brand voice, manifesto get partial population | +0.5 avg on 6 skills |
| **2** | **Conduct interview with Mark** — validate pre-research, fill gaps, populate all 5 KB files | 25 min call + 1 hr writeup | ALL 14 sub-skills jump from 1–2 → 3–4 | +2.0 avg across board |
| **3** | **Mark OAuths Gmail + Calendar** — two 3-minute clicks that unlock 7 skills | 6 min (Mark) | Email, outreach, follow-ups, calendar, meeting prep, content calendar, EA | +1.5 on 7 skills |
| **4** | **Wire `/linkedin-post` command end-to-end** — first "it works" moment | 2-3 hrs (Brady) | LinkedIn post drafting (the Day 1 aha) | +3.0 on 1 skill (flagship) |
| **5** | **Wire Bright Data + Vibe Prospecting** into orchestrator (both already authenticated) | 1-2 hrs (Brady) | SEO, competitive intel, blog research, cold outreach, campaign planning | +1.0 on 5 skills |
| **6** | **Build feedback/memory loop** — agent captures Mark's edits | 2-3 hrs (Brady) | All content-producing skills improve over time | +1.0 on 8 skills |
| **7** | **Connect analytics data source** (depends on Mark's stack — ask in interview) | 2-3 hrs (Brady + Mark access) | Campaign reporting, A/B analysis, growth experiments | +2.0 on 3 skills |
| **8** | **Connect Canva MCP** for visual content | 1-2 hrs (Brady) | Social media adaptation, email campaigns | +1.0 on 2 skills |

**Critical path rewritten**: Priority 1 (pre-research) can happen TODAY without Mark. Priority 2 (interview) happens tomorrow. Priority 3 (OAuth clicks) can happen ON the call. Priorities 4-8 can be parallelized after the call.

### What Mark Must Personally Do (Cannot Be Delegated)

| Task | Why only Mark | Effort | When |
|------|--------------|--------|------|
| OAuth Gmail | His Google account, his credentials | 3 min click | On tomorrow's call |
| OAuth Google Calendar | Same | 3 min click | On tomorrow's call |
| Validate brand voice draft | Only he knows if it sounds like him | 5 min redline | On tomorrow's call |
| Correct business descriptions | Public info may be outdated | 5 min corrections | On tomorrow's call |
| Name competitors we missed | Some aren't publicly obvious | 2 min additions | On tomorrow's call |
| Review first 3-5 outputs | Agent needs his corrections to improve | 2 min each, async | Over next 3 days |
| Grant analytics access (if applicable) | His accounts, his credentials | 3-5 min | This week |

**Total Mark effort: ~20 min on call + 15 min async over the week. Everything else is Brady's work.**
