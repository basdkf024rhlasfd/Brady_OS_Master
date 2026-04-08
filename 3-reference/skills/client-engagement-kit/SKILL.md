---
name: client-engagement-kit
description: |
  Orchestrates the full Day 1 consulting engagement package for a new client — from
  research through polished deliverables. Sequences 4 sub-skills (exec-intel-brief,
  full-stack-ideation, midjourney-prompt, mception-design-system) plus research and
  Notion workflows into one end-to-end pipeline.

  TRIGGER THIS SKILL whenever Brady says: "new client package," "spin up [name],"
  "build the engagement kit for," "Day 1 package," "full client setup," "onboard
  [name]," "impress [name]," "run the full pipeline for," or any variation requesting
  the complete consulting engagement toolkit for a new or existing client.

  Also trigger when Brady says "what do we have for [name]?" — check existing client
  config, Notion records, and artifacts before proposing next steps.

  This skill ORCHESTRATES sub-skills. It does not duplicate their instructions.
  Each sub-skill remains authoritative for its own domain.
---

# Client Engagement Kit

End-to-end pipeline that takes a name and company and produces a complete consulting
engagement package. Designed to impress from Day 1.

## Sub-Skills Used

| Skill | Path | Role in Pipeline |
|-------|------|-----------------|
| **exec-intel-brief** | `3-reference/skills/exec-intel-brief/SKILL.md` | Daily intelligence brief (PDF + .md dossier) |
| **full-stack-ideation** | `3-reference/skills/full-stack-ideation/SKILL.md` | Innovation / cost reduction workshop |
| **midjourney-prompt** | `3-reference/skills/midjourney-prompt/SKILL.md` | Product concept visuals for ideation output |
| **mception-design-system** | `3-reference/skills/mception-design-system/SKILL.md` | Visual styling for all deliverables |

## Inputs

Brady provides:
- **Name** — the exec's name
- **Company** — their company
- **Relationship context** — how Brady knows them, tone to use
- **Problem context** (optional) — what they're dealing with right now
- **Existing research** (optional) — files, notes, Notion pages, pasted text

Everything else is researched.

## Day 1 Package — The 7-Step Pipeline

### Step 1: Research & Fact Base
**Owner:** Agent (no sub-skill — direct research)
**Time:** 30-45 min

1. Search web for company profile, financials, leadership, strategy, recent news
2. Search Notion for existing relationship history (People DB, Streaming Notes, outreach contacts)
3. Search for competitors, supply chain, key customers, industry dynamics
4. Produce a sourced fact base with:
   - Company overview (size, revenue, HQ, structure)
   - Executive profile (career path, education, relationship to Brady)
   - Current situation (pain points, tailwinds, strategic context)
   - Stakeholder map (who cares about what, tensions between them)
   - Competitive landscape
   - Where Brady could help (mapped to Brady's capabilities)
   - Unverified items flagged with ⚠️

**Output:** Fact base in Notion (Streaming Notes) + local markdown copy

### Step 2: Talk Track (if meeting/call upcoming)
**Owner:** Agent + **mception-design-system**
**Time:** 15-20 min

1. Build a call/meeting prep document using mception dark-mode design system
2. Structure: mindset frame → phased conversation flow → listen-for cues → bridge offers → do-not list → follow-up plays
3. Generate as HTML → PDF via Playwright

**Output:** Talk track PDF
**Skip if:** No meeting imminent — go straight to Step 3

### Step 3: Client Config
**Owner:** **exec-intel-brief** (template)
**Time:** 15 min

1. Copy template from `exec-intel-brief/references/client_template.md`
2. Fill from fact base: company, exec, brand portfolio, facilities, strategic context, competitors (7-day rotation), public comps, key commodities, key customers/retailers, sections enabled (rename as needed for B2B vs B2C), dossier instructions, cover note context
3. Save to `exec-intel-brief/references/clients/[slug].md`

**Output:** Client config file
**Customization rules:**
- B2B clients: "Retail Watch" → "End-Market & Customer Watch"
- Ops-focused clients: "Product Idea" → "Cost Reduction / Operational Idea"
- Add client-specific daily sections if warranted (e.g., "Walmart Watch" for FFH)

### Step 4: Intelligence Brief
**Owner:** **exec-intel-brief**
**Time:** 45-60 min

1. Load client config
2. Run 15-25 web searches across all enabled sections
3. Build 3-part HTML:
   - **Cover note** — warm, references relationship, frames as "built for other clients, retooled for you," accuracy caveat, asks for feedback
   - **Brief** — headline takeaway, 8 daily sections, coverage table with cadence/last-run
   - **Dossier** — AI instructions, strategic context, DO NOT guardrails, full sourced research, source log, suggested analysis prompts
4. Style with **mception-design-system** (light mode for PDF)
5. Convert HTML → PDF via Playwright
6. Generate standalone .md dossier for LLM upload

**Output:** PDF brief + .md dossier

### Step 5: Innovation Workshop
**Owner:** **full-stack-ideation**
**Time:** 30-45 min

1. Use SCQA framing (#1) to define the client's core problem
2. Select 15-20 methods from the 100 most relevant to the problem type (use Method Selection Guide)
3. Run each method against the client's specific situation
4. Score and filter — cut bottom 80%
5. Build deliverable with same 3-part structure:
   - **Cover note** — casual, frames as "ran your problem through a structured brainstorming system"
   - **Ideas** — each as a card with method tag, description, why now, effort/impact/horizon, competitive angle, first move
   - **Prioritization matrix** — 2x2 (effort vs impact), top 3 "do now," top 3 "explore further"
   - **Research dossier** — supporting research for key ideas
6. Style with **mception-design-system** (light mode)
7. Convert HTML → PDF via Playwright

**Output:** Innovation workshop PDF

### Step 6: Product Visuals (if applicable)
**Owner:** **midjourney-prompt**
**Time:** 10-15 min

1. Review surviving ideas from Step 5
2. For any idea that involves a physical product concept, run **midjourney-prompt**
3. Classify product type → build prompt → handle text → generate filename
4. Collect all prompts into a single "Visual Concepts" appendix

**Output:** Midjourney prompts + filenames (Brady runs them manually in MJ)
**Skip if:** Client's problem is purely operational/strategic with no product concepts

### Step 7: Notion Records
**Owner:** Agent (no sub-skill — direct Notion tools)
**Time:** 10 min

1. Create or update **People DB** entry:
   - Profile table, company overview, current situation, stakeholder map
   - Innovation opportunities (if applicable)
   - Full upstream cost stack or equivalent analysis
   - Where Brady could help
   - Engagement timeline
   - Artifacts section linking all deliverables
2. Create or update **Streaming Notes** fact base page
3. Link everything

**Output:** Complete Notion record

---

## Recurring Delivery (Post Day 1)

After the Day 1 package lands:

| Cadence | What | Skill |
|---------|------|-------|
| **Daily** | Intelligence brief (all daily sections) | exec-intel-brief |
| **Weekly** | Weekly bonus sections embedded in that day's brief | exec-intel-brief |
| **Monthly** | Monthly deep-dive sections + competitor profile refresh | exec-intel-brief |
| **Quarterly** | Custom strategic analysis with client's specific questions | exec-intel-brief (board-level section) |
| **Ad hoc** | Innovation workshop on new problem | full-stack-ideation |
| **Ad hoc** | Product concept visuals | midjourney-prompt |
| **Per brief** | Update Notion engagement timeline + artifact links | Manual |

---

## Day 1 Checklist

Before sending anything, confirm:

- [ ] Client config saved to `exec-intel-brief/references/clients/[slug].md`
- [ ] Cover note tone matches relationship (friend vs. warm contact vs. cold)
- [ ] Accuracy caveat included in both brief and workshop
- [ ] All claims sourced — no unsourced assertions
- [ ] Section names customized for client context (B2B vs B2C, ops vs marketing)
- [ ] Coverage table shows full menu with cadence and last-run dates
- [ ] Dossier AI instructions reference client-specific priorities and guardrails
- [ ] .md dossier generated as separate file
- [ ] Innovation ideas grounded in client's actual situation (not generic)
- [ ] Notion People record created/updated with all artifacts
- [ ] PDFs render clean (check fonts loaded, no cut-off content)

---

## File Outputs

All outputs saved to `.context/outputs/` (or `/mnt/user-data/outputs/` in cloud):

| File | Format | Purpose |
|------|--------|---------|
| `[Company]_Brief_[YYYY-MM-DD].pdf` | PDF | Daily intelligence brief |
| `[Company]_Dossier_[YYYY-MM-DD].md` | Markdown | LLM-ready research file |
| `[Company]_Innovation_Workshop_[YYYY-MM-DD].pdf` | PDF | Ideation output |
| `[company-slug]-talk-track.html` | HTML | Call/meeting prep (dark mode) |
| `[company-slug]-talk-track.pdf` | PDF | Call/meeting prep (print) |

---

## What This Skill Does NOT Do

- Send emails (Brady sends manually)
- Automate daily cadence (Brady triggers each run)
- Parse client replies (Brady reads and adjusts)
- Build viewer apps or portals (email-native delivery only)
- Replace Brady's judgment — the opinionated layer is always human
