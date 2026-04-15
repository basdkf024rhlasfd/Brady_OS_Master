# Marketing SOPs — Curated Skills for PropMatic CMO

11 marketing skills curated from the [marketingskills](https://github.com/coreyhaines31/marketingskills) library (Corey Haines). Selected for PropMatic's stage, market, and Mark's priorities.

## Source
- **Full library:** `3-reference/imported-skills-and-systems/marketingskills/` (36 skills)
- **Curated:** 2026-04-14
- **Criteria:** Skills that fill gaps in the CMO agent's existing sub-agents (CRO, paid media, sales enablement, pricing, RevOps)

## Skill Routing

Each SOP routes through an existing sub-agent. The sub-agent loads the SOP when a matching request comes in.

| SOP | Routes Through | Trigger |
|-----|---------------|---------|
| `product-marketing-context` | CMO Orchestrator | Foundation — loaded before any marketing task |
| `content-strategy` | Content & MarComms | "content strategy," "content pillars," "what should we write about" |
| `copywriting` | Content & MarComms | "conversion copy," "landing page copy," "website copy" |
| `cold-email` | Demand Gen | "cold email," "outbound email," "prospecting email" (extends existing `/cold-dm`) |
| `paid-ads` | Demand Gen | "paid ads," "PPC," "Google Ads," "Meta ads," "ad campaign" |
| `page-cro` | Demand Gen | "CRO," "conversion rate," "this page isn't converting," "landing page optimization" |
| `sales-enablement` | Demand Gen | "sales deck," "battle card," "one-pager," "objection handling," "sales materials" |
| `revops` | Demand Gen | "pipeline," "lead scoring," "MQL," "SQL," "RevOps," "funnel" |
| `pricing-strategy` | Demand Gen | "pricing," "pricing model," "how should we price this" |
| `analytics-tracking` | Analytics & Insights | "tracking," "GA4," "conversion tracking," "attribution" |
| `ab-test-setup` | Analytics & Insights | "A/B test," "split test," "experiment setup" |

## How Sub-Agents Use These

When a request matches a SOP trigger, the sub-agent:
1. Loads the SOP from `skills/marketing-sops/<name>/SKILL.md`
2. Checks for `product-marketing-context` first (the SOP will prompt for this)
3. Uses the SOP's framework to structure the work
4. Applies PropMatic context from `kb/` files (manifesto, GTM strategy, brand voice)
5. Outputs per the SOP's format, then routes through normal quality review

## Not Included (Available in Full Library)

These are in the full import at `3-reference/imported-skills-and-systems/marketingskills/` if needed later:

**Tier 2 (next to add):** launch-strategy, customer-research, email-sequence, competitor-alternatives, seo-audit, social-content, marketing-ideas, referral-program, free-tool-strategy

**Tier 3 (situational):** marketing-psychology, site-architecture, churn-prevention, lead-magnets, onboarding-cro, signup-flow-cro, form-cro

**Tier 4 (specialized):** ai-seo, ad-creative, popup-cro, paywall-upgrade-cro, programmatic-seo, aso-audit, community-marketing, schema-markup, copy-editing
