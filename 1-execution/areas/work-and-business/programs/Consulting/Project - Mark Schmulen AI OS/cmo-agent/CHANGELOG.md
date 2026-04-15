# Changelog

> CoWork appends to this file every time it updates kb/, saves a memory correction, or changes agent behavior. Chat reads this at session start to stay in sync.

---

## 2026-04-01 — Initial Setup

- Agent architecture complete: orchestrator + 5 sub-agents (Content, Substack, Demand Gen, Analytics, EA)
- Knowledge base pre-populated from public research + call transcripts
- Voice profile drafted from LinkedIn activity + Otter transcript analysis
- Competitive landscape mapped for PropMatic
- Ready for Mark's first session — calibration questions in SETUP.md

---

## 2026-04-14 — Marketing SOPs Integration (11 Curated Skills)

- Added 11 curated marketing skills from coreyhaines31/marketingskills to `skills/marketing-sops/`
- **New capabilities:** Paid Ads, Page CRO, Sales Enablement, RevOps, Pricing Strategy
- **Extended capabilities:** Cold Email (deeper than `/cold-dm`), Analytics Tracking, A/B Test Setup, Content Strategy, Copywriting, Product Marketing Context
- Updated sub-agents to reference SOPs: Demand Gen (7 SOPs), Analytics & Insights (2 SOPs), Content & MarComms (2 SOPs)
- Added 7 new commands to orchestrator: `/cro-audit`, `/paid-ads`, `/sales-collateral`, `/pricing-review`, `/pipeline-review`, `/ab-test`, `/tracking-setup`
- SOPs route through existing sub-agents — no new sub-agents created
- Source: `3-reference/imported-skills-and-systems/marketingskills/` (full 36-skill library available for future additions)
- Files modified: `SKILL.md`, `skills/demand-gen.md`, `skills/analytics-insights.md`, `skills/content-marcomms.md`
- Files added: `skills/marketing-sops/` (11 skill directories + README.md)

---

<!-- CoWork: Append new entries above this line. Format:
## YYYY-MM-DD — Short Description
- What changed and why
- Files modified: [list]
-->
