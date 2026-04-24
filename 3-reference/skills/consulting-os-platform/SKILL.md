---
name: consulting-os-platform
description: >
  Build SOP for the Consulting OS Platform — a full agent suite for independent strategy
  consultants and boutique consulting firms. Brady's management OS methodology as the product.
  Standalone Next.js app on Vercel, Clerk auth, Notion data layer, mception.ai portal iframe.
  Published at mception.ai/consulting-os after Webster UAT.

  Trigger this skill when Brady says "consulting platform", "consulting OS", "strategy platform",
  "build the consulting suite", or any request to build out the consulting product.
trust_tier: T1
---

# Consulting OS Platform — Build SOP

Brady's methodology productized. The insight: most consultants are good at the work but run their practices on spreadsheets and chaos. This is the management OS — how decisions get made, not what they are.

## Product Vision

A managed agent suite that runs a consulting engagement from prospect to delivery: scope, research, framework routing, deliverable generation, client comms, engagement health, and revenue visibility. Each client gets their own Project Agent (OC Optimus / Fran pattern). Brady's OS infused at every layer.

**Who pays:** Independent strategy consultants and boutique consulting firms (1-10 person shops) who want enterprise-grade operating infrastructure without hiring a COO. Entry price ~$499/mo, white-label per-client tier at $1,499/mo.

**Brady's asymmetric advantage:** He ran a real COO operation. He's built the methodology live. This isn't theoretical consulting advice — it's a working OS that he operates himself and is now packaging. The demo is the product.

---

## Agent Suite (7 agents)

| Agent | What it does | Primary data source |
|---|---|---|
| **Engagement Scoper** | Turns a prospect into a scoped engagement brief. Timeline, deliverable map, fees, success criteria. | Conversation → Internal Projects DB |
| **Research Agent** | Deep research on client's industry, competitors, org structure, leadership. Produces a structured dossier. | deep-research skill + Exa + Bright Data |
| **Framework Router** | Matches client's problem to Brady's methodology. Authority Horizons, Trust Tiers, Cascading Accountability, Management OS framing. Outputs the right framework for the engagement. | Problem description → methodology library |
| **Deliverable Generator** | Whitepaper, executive briefing, deck from research + framework. Voice-matched, dense, operator-language. | deck-generator + marketing-templates + content-drafter |
| **Client Comms** | Drafts all client emails, follow-ups, status updates, check-ins in Brady's voice. Brady reviews before sending. | Context → Gmail draft |
| **Engagement Health** | Weekly status of each engagement: on track / at risk / blocked. Surfaces to Telly. Uses Cascading Accountability framework internally. | Streaming Notes + Projects DB |
| **Revenue Dashboard** | Pipeline × stage × probability × timing. Integrates with Finn for cash flow context. | Projects DB + Finn |

---

## Brady OS Infused Elements

**The Management OS as core IP:** The product teaches clients how decisions should be made, not what to decide. Authority Horizons, Trust Tiers, and Cascading Accountability are the deployable frameworks. Each engagement starts by mapping the client's decision architecture, not their strategy.

**Project Agent pattern:** Each client gets their own Project Agent instantiated at engagement start (OC Optimus / Fran pattern). The agent knows the full corpus for that client — meeting notes, deliverables, KPIs, relationship map. Template: `3-reference/skills/project-agent/SKILL.md`.

**Doctrine Sync:** Monthly pass to ensure the consulting methodology in the platform stays aligned with the canonical OS governance doc. Prevents drift between what Brady says publicly and how he actually operates.

**Internal-first:** All work starts in Internal Projects DB. Curated output goes to Client Projects DB. Nothing is public until Brady approves.

**Trust Tiers govern automation:**
- T0: Research Agent, Engagement Health scans (read/synthesize)
- T1: Notes capture, project status updates, draft deliverables to local files
- T2: Client Comms drafts, deliverable exports (Brady reviews)
- T3: Outbound to clients, mception.ai publish (per-instance Brady approval)

---

## Build Approach

- **Repo:** New standalone repo (e.g., `mception-consulting`)
- **Stack:** Next.js App Router, Vercel, Clerk auth
- **Data layer:** Notion (Internal Projects DB + Client Projects DB + new Engagement DB)
- **AI:** Claude via Anthropic SDK (claude-sonnet-4-6 for agents, opus-4-7 for deep research and framework routing)
- **Chatbot:** Page Chatbot skill for AI-chat on each page
- **Design:** mception-design-system throughout
- **Auth:** Clerk (no password gates)
- **Reuses:** deep-research, exec-intel-brief, deck-generator, marketing-templates, page-chatbot skills

**Portal integration:**
- Add `consulting-os` slug to `portal/src/config/projects.yml` (post Brady approval)
- ProjectFrame iframe at `mception.ai/consulting-os`
- Webster owns deploy + env var operations

---

## Methodology Library (core IP, to be built)

Brady's frameworks packaged as queryable modules:

| Framework | When to use it |
|---|---|
| **Authority Horizons** | When the client confuses tactical execution with strategic direction (most common problem) |
| **Trust Tiers** | When the client needs to build autonomous operations and stop being the bottleneck |
| **Cascading Accountability** | When the CEO/owner needs a daily briefing system and doesn't have a CoS |
| **Management OS** | When the client needs a complete operating framework — decisions, meetings, reporting |
| **Decision Architecture** | When the client's biggest problem is unclear ownership and slow decisions |

Framework Router takes a problem description → outputs the right framework + a one-page deployment guide for that engagement.

---

## V1 Scope (first build)

V1 ships three agents: Engagement Scoper, Research Agent, Revenue Dashboard. These are the table stakes.

**V1 deliverable:**
1. Engagement Scoper: prospect → scoped brief → Internal Projects DB page
2. Research Agent: client name → structured dossier (industry, competitive, org)
3. Revenue Dashboard: pipeline visibility with probability-weighted revenue

**V2 adds:** Framework Router + Deliverable Generator
**V3 adds:** Client Comms + Engagement Health + Project Agent instantiation per client

---

## Notion DB Structure

New Engagement DB:
- **Engagements** — client, stage (Prospect / Scoping / Active / Delivered / Ongoing), start/end, fees, primary contact, framework applied, health score
- **Deliverables** — linked to engagement, type (whitepaper, deck, briefing), status, due date, file link
- **Contacts** — name, client, role, relationship temperature, last interaction

Integrates with existing Internal Projects DB and Client Projects DB.

---

## Execution Sequence

| Step | What | Owner |
|---|---|---|
| 1 | Create `mception-consulting` GitHub repo | Code agent |
| 2 | Scaffold Next.js + Clerk + Vercel config | Code agent |
| 3 | Set up Notion Engagement DB structure | Brady (Notion) or Code agent via API |
| 4 | Build Engagement Scoper flow | Code agent |
| 5 | Wire Research Agent (deep-research pattern) | Code agent |
| 6 | Build Revenue Dashboard | Code agent |
| 7 | Wire Page Chatbot per agent page | Code agent |
| 8 | Build Methodology Library (framework modules) | Brady writes frameworks, Code builds query layer |
| 9 | Webster UAT | Webster |
| 10 | Add `consulting-os` slug to projects.yml | Brady approval → Webster |
| 11 | Publish to mception.ai/consulting-os | Webster |

---

## Files to Create / Reference

| File | Purpose |
|---|---|
| New repo: `mception-consulting/` | Standalone Vercel app |
| `portal/src/config/projects.yml` | Add `consulting-os` slug after approval |
| `3-reference/skills/project-agent/SKILL.md` | Pattern for per-client Project Agent (V3) |
| `3-reference/skills/deep-research/SKILL.md` | Research Agent pattern |
| `3-reference/skills/deck-generator/SKILL.md` | Deliverable Generator pattern |
| `3-reference/skills/cascading-accountability/SKILL.md` | Framework module reference |
| `0-agents/custom-built-agents/finn.md` | Revenue Dashboard ↔ Finn integration |
| `0-agents/custom-built-agents/webster-SKILL.md` | Deploy + publish operations |

---

## Webster UAT Checklist (before any publish)

Per `feedback_webster_uat_rules.md` — 3 non-negotiables:
1. All images load correctly in production
2. All chatbots respond (Page Chatbot AI endpoint live)
3. Clerk permissions gate access correctly (no client data leaks)
