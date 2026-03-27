# CMO AI Agent Scaffold — Design Doc

> Handoff document for building the CMO agent deliverable for Mark Schmulen (Contour).

## Context

Brady is building a CMO AI agent as the first deliverable for his fractional AI advisory practice. Client: Mark Schmulen (CEO/Founder, Contour — real estate tech). First engagement is free as a pilot. Phase 1 deadline: 2026-04-11. Mark is actively hiring a marketer — the CMO agent needs to land before that hire closes the window.

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
  SKILL.md                  ← CMO orchestrator (routes to 4 active sub-agents)
  RESEARCH.md               ← AI CMO landscape 2026 + design tools reference
  INTERVIEW-GUIDE.md        ← Context extraction template (Deliverable #1)
  skills/
    content-marcomms.md      ← Content creation, LinkedIn, email, social
    demand-gen.md            ← SEO, growth, campaigns
    analytics-insights.md    ← Data analysis, reporting, competitive intel
    marketing-ea.md          ← Calendar, coordination, follow-ups
    _open-source-slot.md     ← Placeholder for community agents
    _expansion-slots.md      ← Phase 2 roles (brand, product mktg, creative)
  kb/                        ← Populated via INTERVIEW-GUIDE.md
    manifesto.md
    brand-voice.md
    competitive-landscape.md
    content-history.md
    gtm-strategy.md
```

---

## File Details

### 1. `INTERVIEW-GUIDE.md` (Deliverable #1)
Structured 45-60 minute interview for Brady to run with Mark. Sections:
- Business mission & what Contour does
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
- **Implications for Contour** — startup context, Mark doing his own marketing
- **Design tools reference:** Mermaid for in-codebase diagrams, Excalidraw for planning, Canva for polished client deliverables. Keep external to agent.

### 3. `SKILL.md` (Orchestrator)
- **Identity:** Strategic marketing coordinator for Contour
- **Routing logic:** Classify request → identify sub-agent → provide context → review output
- **Sub-agent registry:** 4 active skills + open-source slot + expansion slots
- **KB references:** Points to `kb/` files
- **Escalation rules:** Budget decisions, public crisis, brand strategy changes, legal/compliance → escalate to Mark
- **Guardrails:** Never publish without approval, never deviate from brand voice, never make budget decisions, never contact external parties
- **MCP connections:** TBD — to be validated with Mark during interview (likely Gmail, Google Calendar)
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
