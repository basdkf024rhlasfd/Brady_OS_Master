---
name: broker-platform
description: >
  Build SOP for the CPG/food Broker Platform — a full agent suite for retail food brokers
  who sell brands into retail chains (Walmart, Kroger, Target). Brady's native domain.
  Standalone Next.js app on Vercel, Clerk auth, Notion data layer, mception.ai portal iframe.
  Published at mception.ai/broker after Webster UAT.

  Trigger this skill when Brady says "broker platform", "build the broker suite",
  "broker agent", or any request to build out the food broker product.
trust_tier: T1
---

# Broker Platform — Build SOP

Brady's primary commercial product. CPG/food brokers have no good AI tools. This is the beachhead.

## Product Vision

A managed agent suite that runs a broker's operation: brand intake, buyer intelligence, pitch generation, category watch, meeting prep, call notes, and pipeline visibility. Brady's OS methodology infused — Authority Horizons govern deal stages, Streaming Notes is the backbone.

**Who pays:** Food brokers (independent reps and small brokerage firms) who sell CPG brands into retail chains. Entry price ~$299/mo, white-label tier at $999/mo.

**Brady's asymmetric advantage:** He's built these relationships. He knows what a Walmart category manager wants to hear. He knows what brokers forget to do. This isn't a generic CRM — it's an operator building a tool he would have used.

---

## Agent Suite (7 agents)

| Agent | What it does | Primary data source |
|---|---|---|
| **Brand Intake** | Onboards a new brand. Extracts category, distribution goals, pricing tier, competitive set, brand brief. Creates a Notion brand page. | Form → Notion |
| **Buyer Intel** | Builds a dossier on a category manager. Their priorities, recent resets, private label strategy, past interactions. | Deep Research + Streaming Notes |
| **Pitch Builder** | Generates a retailer-specific pitch deck. Uses Brady's management OS framing: why this, why now, why us. | Buyer Intel + Brand Intake → deck-generator |
| **Category Watch** | Daily scan of category news, competitive launches, pricing changes, retailer resets. Pushes signal to Streaming Notes. | Exa + Bright Data |
| **Meeting Prep** | Day-before brief for buyer meetings. Synthesizes Buyer Intel + Category Watch + last interaction notes. | Streaming Notes → brief |
| **Call Notes** | Post-meeting capture. Records key asks, next steps, relationship temperature. Routes to Streaming Notes + follow-up queue. | Voice/text → Streaming Notes |
| **Pipeline Dashboard** | Visual overview: all brands × buyers × deal stages × expected commission. Health scores per relationship. | Notion Broker DB |

---

## Brady OS Infused Elements

**Authority Horizons govern deal stages:**
- Day Horizon = call prep and meeting execution
- Cycle Horizon = placement pursuit and reset preparation (1-2 weeks)
- ARC Horizon = portfolio strategy (which brands to carry, which retailers to prioritize)

**Trust Tiers govern automation:**
- T0: Category Watch, Buyer Intel scraping (read/synthesize, no Brady needed)
- T1: Call Notes capture → Streaming Notes, Pipeline status updates
- T2: Pitch deck drafts, buyer emails (Brady reviews before sending)
- T3: Outbound to buyers, published content (per-instance Brady approval)

**Streaming Notes as the backbone:** Every buyer meeting, every placement win, every void flows through Streaming Notes. Phil's nightly grooming catches stale deals. Musashi surfaces relationships at risk.

**Weekly tension pass:** Musashi-style health check on the pipeline — which brands are stale, which buyers haven't been touched in 30 days, which placements are expiring.

---

## Build Approach

- **Repo:** New standalone repo, separate from brady-os (e.g., `mception-broker`)
- **Stack:** Next.js App Router, Vercel, Clerk auth
- **Data layer:** Notion (new Broker DB) + existing Streaming Notes DB
- **AI:** Claude via Anthropic SDK (use claude-sonnet-4-6 for agents, haiku-4-5 for quick lookups)
- **Chatbot:** Page Chatbot skill for AI-chat interface on each page
- **Design:** mception-design-system tokens throughout
- **Auth:** Clerk (no password gates — portal handles all access)

**Portal integration:**
- Add `broker` slug to `portal/src/config/projects.yml` (post Brady approval)
- ProjectFrame iframe at `mception.ai/broker`
- Webster owns deploy + env var operations

---

## V1 Scope (first build)

V1 ships three agents: Brand Intake, Buyer Intel, Pipeline Dashboard. These are the table stakes.

**V1 deliverable:**
1. Brand Intake form → Notion page creation
2. Buyer Intel: search + synthesize a category manager dossier from web + past notes
3. Pipeline Dashboard: visual overview of all brands × buyers in active pursuit

**V2 adds:** Pitch Builder + Category Watch
**V3 adds:** Meeting Prep + Call Notes

---

## Notion DB Structure

New Broker DB needs these tables:
- **Brands** — name, category, distribution goal, pricing tier, retailer targets, contact, status
- **Buyers** — name, retailer, category, title, last interaction, relationship temperature
- **Deals** — brand × buyer, stage (Prospecting / Pitched / Negotiating / Placed / Void), commission, dates
- **Interactions** — meeting notes, call notes, linked to deal

Link Deals → Streaming Notes for daily pipeline pulse.

---

## Execution Sequence

| Step | What | Owner |
|---|---|---|
| 1 | Create `mception-broker` GitHub repo | Code agent |
| 2 | Scaffold Next.js + Clerk + Vercel config | Code agent |
| 3 | Set up Notion Broker DB structure | Brady (Notion) or Code agent via API |
| 4 | Build Brand Intake form + Notion page creation | Code agent |
| 5 | Build Buyer Intel agent (deep-research pattern) | Code agent |
| 6 | Build Pipeline Dashboard page | Code agent |
| 7 | Wire Page Chatbot to each agent page | Code agent |
| 8 | Webster UAT (images, chatbots, permissions) | Webster |
| 9 | Add `broker` slug to projects.yml | Brady approval → Webster |
| 10 | Publish to mception.ai/broker | Webster |

---

## Files to Create / Reference

| File | Purpose |
|---|---|
| New repo: `mception-broker/` | Standalone Vercel app |
| `portal/src/config/projects.yml` | Add `broker` slug after approval |
| `3-reference/skills/page-chatbot/SKILL.md` | Wire chatbot to agent pages |
| `3-reference/skills/deep-research/SKILL.md` | Pattern for Buyer Intel agent |
| `3-reference/skills/deck-generator/SKILL.md` | Pattern for Pitch Builder (V2) |
| `0-agents/custom-built-agents/webster-SKILL.md` | Deploy + publish operations |

---

## Webster UAT Checklist (before any publish)

Per `feedback_webster_uat_rules.md` — 3 non-negotiables:
1. All images load correctly in production
2. All chatbots respond (Page Chatbot AI endpoint live)
3. Clerk permissions gate access correctly (no public data leaks)
