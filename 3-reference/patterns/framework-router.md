# Framework Router — Decision Table

**Purpose:** Map `{problem_archetype, client_context}` → ordered skill stack. Read by the `engagement-router` skill. Every engagement-router invocation starts here.

**Created:** 2026-04-24 (Consulting Kit Phase 2)
**Companion skill:** `3-reference/skills/engagement-router/SKILL.md`
**Companion DB:** Framework Runs (Notion, created Phase 2)

This is a living document. Update after every Framework Run with outcome signal (Phase 3 learning loop). Win-rate column is populated by the weekly pattern extractor.

---

## Problem Archetype Taxonomy (8)

Every engagement request gets classified into exactly one archetype. Multi-archetype engagements split into sequential runs.

| Archetype | Signal |
|---|---|
| **Pricing** | Price realization, margin compression, promo strategy, SKU/tier restructuring, elasticity questions |
| **Ops redesign** | Throughput, labor, process friction, cost takeout, technology rollout, facility/format redesign |
| **Product innovation** | New product concepts, brand extensions, category whitespace, CPG line extensions, feature roadmap |
| **M&A thesis** | Target evaluation, roll-up strategy, carve-out analysis, post-close value-creation plans |
| **Org design** | Role ambiguity, RACI gaps, hiring strategy, leadership team design, decision-right architecture |
| **Competitive response** | Specific threat (new entrant, incumbent move), defensive strategy, counter-positioning |
| **Growth** | Market sizing, channel expansion, geographic expansion, customer segment expansion |
| **Crisis** | Urgent single-issue response (PR, supply, regulatory, customer loss, founder dispute) — fast turnaround required |

---

## Decision Table

| Archetype | Input Minimum | Framework Stack (ordered) | Deliverable Shape | Est. Elapsed | Win Rate |
|---|---|---|---|---|---|
| **Pricing** | Company row populated (Industry, Sub-vertical, Size, Stage) + 1 Problem Statement describing pricing challenge + current pricing structure (if available) | `deep-research(pricing theory + 3 comp benchmarks)` → `full-stack-ideation(price waterfall methods: Good-Better-Best, value-based, bundling, anchoring)` → `mception-design-system(whitepaper style)` → `deck-generator(executive readout)` | Dense whitepaper (15-25p) + executive deck (12-15 slides) + pricing model if applicable | 10-15 hours over 5-7 days | TBD |
| **Ops redesign** | Company row populated + project-agent instance exists OR 2+ Problem Statements sharp + baseline ops data (labor %, throughput, SKU count) | `project-agent(Synthesis mode)` → `operations-innovation-engine(25-35 tiered concepts, no visuals)` → `mception-design-system(ops whitepaper style)` → `deck-generator(pilot concept deck)` | Ops whitepaper (20-30p, text + tables) + pilot concept deck + labor/throughput/scale scoring rubric | 15-25 hours over 7-14 days | TBD |
| **Product innovation** | Company row populated + brand portfolio context + trend/consumer signal | `exec-intel-brief(trend pull, 7-day rolling)` → `innovation-workshop(20 ideas, trend-first Stage 0)` → `midjourney-generate(hero visuals for top 8-10 ideas)` → `mception-design-system(visual package style)` | HTML + PDF package: executive summary + 20 idea pages with visuals + whitepaper appendix + RTBs | 6-10 hours + Midjourney rendering | TBD |
| **M&A thesis** | Company row populated + target company identified (or target list) + strategic rationale | `deep-research(target profile + market + comp benchmarks, deep mode)` → `full-stack-ideation(value-creation plays: 15-20 methods for synergy discovery)` → `mception-design-system(thesis whitepaper style)` → `deck-generator(investment committee deck)` | Thesis whitepaper (25-40p) + IC deck (20-25 slides) + synergy quantification model if applicable | 15-20 hours over 7-10 days | TBD |
| **Org design** | Company row populated + project-agent state OR org chart + 2+ Problem Statements naming specific role/authority gaps | `project-agent(Synthesis mode)` → `full-stack-ideation(RACI, Authority audit, JTBD for leadership, Decision-right architecture — 10-12 methods)` → `mception-design-system(org design whitepaper style)` → `deck-generator(recommendation deck)` | Org design whitepaper (10-15p) + recommended structure deck + RACI matrix + transition plan | 8-12 hours over 4-7 days | TBD |
| **Competitive response** | Company row populated + specific competitor named + specific threat event/move | `exec-intel-brief(competitor deep-profile, ad-hoc run)` → `deep-research(threat analysis + precedent scan)` → `full-stack-ideation(countermoves: 10 defensive + 5 offensive methods)` → `deck-generator(situation room readout)` | Situation room deck (15-20 slides) + threat brief (5-10p) + recommended countermove matrix | 6-10 hours over 3-5 days | TBD |
| **Growth** | Company row populated + current revenue base/customer base + constraint or opportunity named | `deep-research(market sizing + channel benchmarks)` → **[branch]** `innovation-workshop` (if product-led growth) OR `full-stack-ideation(TAM expansion methods, channel methods)` (if market-led) → `mception-design-system(growth whitepaper style)` → `deck-generator(growth plan deck)` | Growth whitepaper (15-25p) + plan deck (15-20 slides) + sizing model | 10-15 hours over 7-10 days | TBD |
| **Crisis** | Company row populated + crisis event named + timeline constraint (usually 24-72h) | `project-agent(Synthesis mode — rapid)` → `full-stack-ideation(SCQA + Pyramid Principle only, time-boxed)` → `marketing-templates(one-pager)` | Single one-pager (2p max) + optional 6-slide situation deck | 3-6 hours in one sitting | TBD |

---

## Input Minimum Protocol

Before an engagement-router run begins, the router must verify **all Input Minimums** for the classified archetype are met. If any are missing, the router surfaces a gap report and does not proceed until Brady clears each gap.

Default gap actions (in priority order):
1. **Company row incomplete** → run `prospect-research-kit` against the client
2. **Problem Statements missing or thin** → prompt Brady to sharpen and post to Company page body
3. **Project-agent needed but not instantiated** → route to `project-agent` instantiation flow
4. **Specific data gap (pricing structure, org chart, competitor event)** → generate an SFDR and queue

---

## Branching Logic

Some stacks branch on context (e.g., Growth). When a branch exists, the router inspects the Company row + Problem Statement to pick. Branch rules live next to the archetype line in this file.

Current branches:
- **Growth** — `innovation-workshop` if Problem Statement mentions new products/SKUs/features; `full-stack-ideation(TAM/channel)` otherwise.

---

## Override Protocol

Brady can override classification or stack for any run:
- `engagement-router "run X for {client} as {archetype}"` — forces archetype
- `engagement-router "run X for {client} stack: {skill-a, skill-b, ...}"` — forces stack

Overrides get logged to the Framework Run row with `override_reason` captured.

---

## Update Cadence

- **After every Framework Run:** update Win Rate column if outcome is known
- **Weekly (Sunday):** pattern extractor scans last 30/90 days and rewrites Win Rate column
- **Monthly:** Brady reviews any archetype with <30% win rate or <3 runs and decides to sharpen, merge, or deprecate

---

## Anti-Patterns

- **Do not add archetypes speculatively.** A ninth archetype requires ≥3 real engagements that don't fit the current 8.
- **Do not change stacks mid-run.** Mid-run stack changes destroy learning signal. Log the divergence in Notes field of the Framework Run row instead.
- **Do not skip Input Minimum checks.** The whole point of this router is to enforce preparation before execution.
