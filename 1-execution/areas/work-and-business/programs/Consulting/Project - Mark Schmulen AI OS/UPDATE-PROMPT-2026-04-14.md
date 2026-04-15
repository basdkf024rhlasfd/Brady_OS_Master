# CMO Agent Update — April 14, 2026

**What this is:** A paste-ready prompt for your Claude CoWork (Claude Code) session. Paste the block below into CoWork and your CMO agent will self-install the update.

**Before you paste:** If you've customized any of your skill files since initial setup, this update is written to be non-destructive — it adds new content rather than overwriting. Instructions below tell the agent to check for conflicts before touching existing files.

---

## PASTE THIS INTO COWORK

```
You are my CMO agent for PropMatic. I'm installing an update from my AI consultant that adds 11 marketing SOPs and 7 new commands to your capabilities. This is an incremental update — you should ADD new content, not overwrite existing files.

Follow these instructions exactly. After each step, tell me what you did.

---

STEP 1 — Install new SOP files (safe, purely additive)

Check if the folder `skills/marketing-sops/` exists in this project.

If it DOES NOT exist:
- Create the folder `skills/marketing-sops/`
- Tell me: "The marketing-sops folder doesn't exist yet. I need you to copy the 11 SOP files from the zip I received into skills/marketing-sops/. Here's the list of folders to copy: ab-test-setup/, analytics-tracking/, cold-email/, content-strategy/, copywriting/, page-cro/, paid-ads/, pricing-strategy/, product-marketing-context/, revops/, sales-enablement/ — plus README.md. Once those are in place, continue with Step 2."

If it DOES exist:
- List what's in it and tell me how many SOP subfolders are present
- If there are fewer than 11, tell me which ones are missing so I can copy them in
- If all 11 are present, proceed to Step 2

---

STEP 2 — Update SKILL.md (orchestrator) — ADD, don't overwrite

Open `SKILL.md` and check if a "## Marketing SOPs" section already exists.

If the section DOES NOT exist, find the "## Knowledge Base" section and insert this block BEFORE it:

---INSERT---
## Marketing SOPs

11 curated marketing playbooks from the [marketingskills](https://github.com/coreyhaines31/marketingskills) library live in `skills/marketing-sops/`. See `skills/marketing-sops/README.md` for the full routing table. Each SOP routes through an existing sub-agent — the sub-agent loads the SOP when a matching request comes in.

**Key additions:**
- **Paid Ads** — NEW capability (Google/Meta/LinkedIn campaign planning)
- **Page CRO** — NEW (landing page conversion optimization)
- **Sales Enablement** — NEW (battle cards, one-pagers, objection handling)
- **RevOps** — NEW (lead scoring, pipeline management, MQL→SQL)
- **Pricing Strategy** — NEW (pricing models for SaaS)
- **Cold Email** — Extends existing `/cold-dm` with deeper frameworks
- **Analytics Tracking** — Extends Analytics sub-agent with instrumentation methodology
- **A/B Test Setup** — Extends Analytics with structured experimentation
- **Content Strategy** — Extends Content & MarComms with pillar planning
- **Copywriting** — Extends Content & MarComms with conversion-focused copy
- **Product Marketing Context** — Foundation doc loaded before any SOP
---END INSERT---

If the section DOES exist, skip this step and tell me "Marketing SOPs section already present in SKILL.md."

Then check the "## Command Registry" table. If any of these commands are MISSING from the table, add them:

| `/cro-audit` | Analyze a page for conversion optimization | Demand Gen (page-cro SOP) |
| `/paid-ads` | Plan a paid campaign (Google/Meta/LinkedIn) | Demand Gen (paid-ads SOP) |
| `/sales-collateral` | Create battle cards, one-pagers, objection docs | Demand Gen (sales-enablement SOP) |
| `/pricing-review` | Evaluate or design pricing strategy | Demand Gen (pricing-strategy SOP) |
| `/pipeline-review` | Audit lead lifecycle and funnel metrics | Demand Gen (revops SOP) |
| `/ab-test` | Design an A/B test with proper methodology | Analytics (ab-test-setup SOP) |
| `/tracking-setup` | Plan conversion tracking and analytics instrumentation | Analytics (analytics-tracking SOP) |

---

STEP 3 — Update skills/demand-gen.md — ADD, don't overwrite

Open `skills/demand-gen.md` and check if a "## Marketing SOPs" section already exists.

If it DOES NOT exist, find the "## Escalation Rules" section and insert this block BEFORE it:

---INSERT---
## Marketing SOPs

Curated marketing playbooks in `skills/marketing-sops/`. Load the relevant SOP when a request matches its domain:

| SOP | File | Use When |
|-----|------|----------|
| Cold Email | `marketing-sops/cold-email/SKILL.md` | Cold outreach, prospecting emails, SDR sequences. Extends `/cold-dm` with deeper frameworks. |
| Paid Ads | `marketing-sops/paid-ads/SKILL.md` | PPC campaigns, Google/Meta/LinkedIn ads, budget allocation, bid strategy |
| Page CRO | `marketing-sops/page-cro/SKILL.md` | Landing page optimization, conversion rate analysis, page teardowns |
| Sales Enablement | `marketing-sops/sales-enablement/SKILL.md` | Battle cards, one-pagers, pitch decks, objection handling, demo scripts |
| RevOps | `marketing-sops/revops/SKILL.md` | Lead scoring, pipeline management, MQL→SQL handoff, funnel metrics |
| Pricing Strategy | `marketing-sops/pricing-strategy/SKILL.md` | Pricing models, packaging, willingness-to-pay research |
| Product Marketing Context | `marketing-sops/product-marketing-context/SKILL.md` | Foundation doc — load before any SOP that checks for product context |

**How to use:** When Mark's request matches a SOP, load the SOP file and follow its framework. Apply PropMatic context from `kb/` files. The SOP may ask for product-marketing-context — point it to `kb/manifesto.md` and `kb/gtm-strategy.md` which serve the same purpose.
---END INSERT---

If it already exists, skip and tell me.

---

STEP 4 — Update skills/analytics-insights.md — ADD, don't overwrite

Open `skills/analytics-insights.md` and check if a "## Marketing SOPs" section already exists.

If it DOES NOT exist, find the "## Escalation Rules" section (or end of Capabilities section) and insert this block BEFORE it:

---INSERT---
## Marketing SOPs

Curated marketing playbooks in `skills/marketing-sops/`. Load the relevant SOP when a request matches its domain:

| SOP | File | Use When |
|-----|------|----------|
| Analytics Tracking | `marketing-sops/analytics-tracking/SKILL.md` | GA4 setup, conversion tracking, attribution modeling, event instrumentation |
| A/B Test Setup | `marketing-sops/ab-test-setup/SKILL.md` | Experiment design, sample sizing, test structure, statistical rigor |
---END INSERT---

If it already exists, skip and tell me.

---

STEP 5 — Update skills/content-marcomms.md — ADD, don't overwrite

Open `skills/content-marcomms.md` and check if a "## Marketing SOPs" section already exists.

If it DOES NOT exist, find the "## Escalation Rules" section (or end of Capabilities section) and insert this block BEFORE it:

---INSERT---
## Marketing SOPs

Curated marketing playbooks in `skills/marketing-sops/`. Load the relevant SOP when a request matches its domain:

| SOP | File | Use When |
|-----|------|----------|
| Content Strategy | `marketing-sops/content-strategy/SKILL.md` | Content pillars, editorial calendar strategy, content-market fit, topic prioritization |
| Copywriting | `marketing-sops/copywriting/SKILL.md` | Conversion-focused copy, landing pages, website copy, headline testing |
---END INSERT---

If it already exists, skip and tell me.

---

STEP 6 — Log to CHANGELOG.md

Open `CHANGELOG.md`. If there is no entry for "2026-04-14", add this at the top (after the `---` separator, before the previous entry):

---INSERT---
## 2026-04-14 — Marketing SOPs Integration (11 Curated Skills)

- Added 11 curated marketing skills from coreyhaines31/marketingskills to `skills/marketing-sops/`
- **New capabilities:** Paid Ads, Page CRO, Sales Enablement, RevOps, Pricing Strategy
- **Extended capabilities:** Cold Email (deeper than `/cold-dm`), Analytics Tracking, A/B Test Setup, Content Strategy, Copywriting, Product Marketing Context
- Updated sub-agents to reference SOPs: Demand Gen (7 SOPs), Analytics & Insights (2 SOPs), Content & MarComms (2 SOPs)
- Added 7 new commands to orchestrator: `/cro-audit`, `/paid-ads`, `/sales-collateral`, `/pricing-review`, `/pipeline-review`, `/ab-test`, `/tracking-setup`
- SOPs route through existing sub-agents — no new sub-agents created
- Files modified: `SKILL.md`, `skills/demand-gen.md`, `skills/analytics-insights.md`, `skills/content-marcomms.md`
- Files added: `skills/marketing-sops/` (11 skill directories + README.md)
---END INSERT---

If the 2026-04-14 entry already exists, skip.

---

STEP 7 — Verify

Tell me:
1. Which steps completed vs. skipped (with reason)
2. How many SOP files are now in skills/marketing-sops/
3. How many total commands are now in the Command Registry in SKILL.md
4. Whether any of my existing files appeared to have custom content that was preserved

You're now running the updated CMO agent. All 7 new commands are active. Test with: /paid-ads "I want to run a Google Ads campaign targeting property managers in the Sun Belt."
```

---

## 10 Q&A PAIRS — Calibrate Your Agent After Install

Run these to confirm the update landed correctly and the agent knows its new capabilities.

---

**Q1: What are the 7 new commands from this update?**

A: `/cro-audit`, `/paid-ads`, `/sales-collateral`, `/pricing-review`, `/pipeline-review`, `/ab-test`, `/tracking-setup`. These all route through existing sub-agents using the new marketing SOP files in `skills/marketing-sops/`.

---

**Q2: I want to run Google Ads targeting property managers. Which command and what do I tell you?**

A: Use `/paid-ads`. Example: `/paid-ads "Google Search campaign targeting property management companies in Sun Belt metros, budget ~$3,000/month, goal is booked demos."` The agent will route to Demand Gen, load the paid-ads SOP, and produce a campaign structure with ad groups, keyword themes, bid strategy, and success metrics. All spend is a proposal — nothing is committed without your sign-off.

---

**Q3: The SOPs reference a "product-marketing-context" file. What is that and where does it live?**

A: It's a foundation document the other SOPs optionally check for ICP, positioning, and product context. It lives at `skills/marketing-sops/product-marketing-context/SKILL.md`. For PropMatic, your `kb/manifesto.md` and `kb/gtm-strategy.md` serve the same purpose. When a SOP asks for product-marketing-context, the agent will pull from your existing KB files — you don't need to fill out a separate document.

---

**Q4: If I run /cro-audit on my landing page, will it actually browse the page?**

A: In CoWork with web research MCP tools connected, yes — it can fetch and analyze the page. In Chat mode without tools, you'd need to paste the page copy/HTML directly. Either way, the agent will evaluate against the page-cro SOP framework: clarity, CTA placement, social proof, friction reduction, headline strength, and form optimization.

---

**Q5: What's the difference between /cold-dm (the old command) and the new cold-email SOP?**

A: `/cold-dm` generates a single personalized outreach message for one prospect — LinkedIn DM, email, or Twitter. The cold-email SOP (`/cold-email` via Demand Gen) gives you a full multi-step framework: ICP definition, sequence structure (3-5 touchpoints), subject line testing, and SDR playbook. Use `/cold-dm` for one-off outreach; use the cold-email SOP when you're building a prospecting campaign or want to train a sales rep on a repeatable sequence.

---

**Q6: Can I use /sales-collateral to build a competitive battle card against EliseAI?**

A: Yes. `/sales-collateral "battle card vs EliseAI for property manager sales conversations"` will route to Demand Gen + sales-enablement SOP. It will produce a formatted battle card with their strengths, your counter-positioning, objection scripts, and why-we-win criteria. It'll pull PropMatic's differentiation from `kb/competitive-landscape.md` and `kb/manifesto.md` — so make sure those are accurate before running.

---

**Q7: How does /ab-test work? Will it actually run the test?**

A: The agent designs the test — it doesn't run it. `/ab-test "hero headline on propmatic.com/demo"` will produce: hypothesis, control vs. variant copy, sample size calculation, minimum detectable effect, runtime estimate, success metric, and where to implement it (e.g., Unbounce, Google Optimize, or hard-coded). You take the design to your dev or landing page tool. The agent can also help you analyze results once you have data (`/ab-analysis` in Analytics & Insights).

---

**Q8: Do these SOPs replace the existing sub-agents or add to them?**

A: They add depth to existing sub-agents — they don't replace them. Think of SOPs as specialized playbooks the sub-agents load when relevant. Demand Gen now has 7 SOP playbooks it can activate. Analytics has 2. Content & MarComms has 2. The orchestrator still routes to the same 5 sub-agents; those sub-agents just have more domain expertise available.

---

**Q9: My kb/ files aren't fully filled in yet. Will these SOPs still work?**

A: Partially. The SOPs work best with a rich `kb/manifesto.md` (what PropMatic does, for whom, with what proof points) and `kb/gtm-strategy.md` (ICP, channels, current stage). If those are thin, the agent will flag what's missing and ask you to fill in the gaps before producing output. Filling in your KB files is the highest-leverage thing you can do to improve every output across all commands — old and new.

---

**Q10: I edited my SKILL.md to change my voice guidelines. Will this update overwrite my changes?**

A: No — the update prompt is written to detect what already exists and only add what's missing. If your SKILL.md already has a Marketing SOPs section, Step 2 skips it. If the 7 new commands are already in your Command Registry, it skips those too. Your voice customizations live in `kb/brand-voice.md`, which this update never touches. If you edited SKILL.md in a way that conflicts with where the agent tries to insert the new section, the agent will tell you and ask for guidance rather than overwriting.

---

## What's in the skills/marketing-sops/ Folder

These 11 folders need to be present after the update (copy from the zip):

```
skills/marketing-sops/
├── README.md
├── ab-test-setup/
├── analytics-tracking/
├── cold-email/
├── content-strategy/
├── copywriting/
├── page-cro/
├── paid-ads/
├── pricing-strategy/
├── product-marketing-context/
├── revops/
└── sales-enablement/
```

Each folder contains a `SKILL.md` with frameworks, anti-patterns, tool pointers, and cross-references. The agent loads them on demand — they don't run automatically on every session.
