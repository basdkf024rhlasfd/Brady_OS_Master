---
name: deep-research
description: |
  Autonomous deep research engine inspired by gpt-researcher's planner-executor-publisher
  architecture. Takes any research question, decomposes it into focused sub-queries, runs
  parallel web research across each, scores and deduplicates sources, then synthesizes into
  a structured markdown report with optional PDF.

  TRIGGER THIS SKILL whenever Brady says: "research [topic]," "deep research," "deep dive on,"
  "research report," "investigate [topic]," "what do we know about," "build a research brief on,"
  "company research on," "competitive analysis of," "tech evaluation of," "market research on,"
  "run deep research," "autonomous research," or any variation requesting structured, multi-source
  research on a topic.

  Also trigger when another skill (exec-intel-brief, daily-whitepaper) calls deep-research as a
  building block for section-level deep dives.

  This skill owns ALL autonomous research workflows. It does NOT own daily intelligence briefs
  (exec-intel-brief), daily news synthesis (daily-whitepaper), or morning scanning (morning-sweep).
  Those skills may CALL this skill for deeper investigation of specific topics.
trust_tier: T0
---

# Deep Research

Autonomous research engine. Takes a question, decomposes it, researches in parallel, synthesizes
with citations. Inspired by gpt-researcher's planner-executor-publisher architecture — implemented
as a native Brady OS skill using Claude's MCP tools. Zero external dependencies.

## How It Works

Three phases, matching the planner-executor-publisher pattern:

1. **PLAN** — Classify the research type, generate focused sub-queries
2. **EXECUTE** — Run parallel web searches + scrapes, extract facts, score sources
3. **PUBLISH** — Synthesize into structured markdown with citations + optional PDF

## Depth Levels

| Level | Sub-Queries | Searches per Query | Total Sources | Use When |
|-------|-------------|-------------------|---------------|----------|
| Quick | 4 | 1-2 | 5-10 | Background check, quick context, building block call |
| Standard | 5-6 | 3-4 | 15-25 | Most standalone research requests |
| Deep | 6-8 | 4-6 | 30-50 | Major decisions, client deliverables, new market entry |

Default is **standard** unless Brady specifies otherwise or the calling skill requests a level.

## Research Types

The skill classifies every request into one of six types, which drives sub-query strategy:

| Type | When to Use |
|------|-------------|
| `topic` | General subject research ("what's happening with X") |
| `company` | Single company deep dive |
| `competitive-analysis` | Multiple companies in a market |
| `tech-evaluation` | Technology, tool, or platform assessment |
| `market-research` | Market sizing, segments, trends, opportunity analysis |
| `category-intel` | Multi-source scan for **opportunity clusters** (not product ideas) — behavioral shifts, white space, timing insights. Used by `innovation-workshop` Stage 0. |

---

## Phase 1: PLAN

### Step 1.1: Classify

Read Brady's question (or the calling skill's research brief). Determine:
- **Research type** (one of the five above)
- **Depth level** (quick/standard/deep — use standard if not specified)
- **Scope constraints** (geography, time period, specific angles)

### Step 1.2: Generate Sub-Queries

Based on research type, generate sub-queries using these templates:

**topic:**
1. Definitional — "What is [X], how does it work"
2. Current state — "[X] latest developments [year]"
3. Key players — "[X] leading companies organizations"
4. Trends — "[X] market trends future outlook"
5. Risks & challenges — "[X] risks limitations concerns"
6. Opportunities — "[X] opportunities applications use cases"

**company:**
1. Overview — "[Company] overview business model"
2. Products & services — "[Company] products services [year]"
3. Financials — "[Company] revenue funding valuation"
4. Leadership — "[Company] CEO leadership team"
5. Competitive position — "[Company] competitors market position"
6. Recent news — "[Company] news announcements [year]"
7. Strategy & direction — "[Company] strategy roadmap growth"

**competitive-analysis:**
1. Market landscape — "[Industry/category] market landscape [year]"
2. Player profiles — "[Company A] vs [Company B] comparison"
3. Differentiation — "[Industry] product differentiation features"
4. Pricing & positioning — "[Industry] pricing comparison tiers"
5. Market share — "[Industry] market share leaders [year]"
6. Strengths & weaknesses — "[Company] strengths weaknesses SWOT"

**tech-evaluation:**
1. What it is — "[Technology] explained how it works"
2. Current maturity — "[Technology] adoption enterprise [year]"
3. Alternatives — "[Technology] vs [alternatives] comparison"
4. Limitations — "[Technology] limitations drawbacks"
5. Cost & implementation — "[Technology] pricing implementation cost"
6. Roadmap — "[Technology] roadmap future development"

**market-research:**
1. Market size — "[Market] TAM SAM market size [year]"
2. Segments — "[Market] segments categories breakdown"
3. Growth drivers — "[Market] growth drivers trends"
4. Barriers — "[Market] barriers entry challenges"
5. Key players — "[Market] leading companies market leaders"
6. Consumer trends — "[Market] consumer behavior preferences"
7. Regulatory — "[Market] regulatory compliance requirements"

**category-intel:**

Unlike other research types, `category-intel` runs across **five source layers** rather
than asking linear sub-queries. The goal is opportunity cluster synthesis, not a report.
Each layer contributes signal to the final synthesis.

1. **Behavioral edge** — "[category] consumer behavior reddit", "[category] hack workaround",
   "[category] what i eat in a day", "[category] routine tiktok"
   → Source stack: Reddit, TikTok surface (via Bright Data scrape), niche forums
   → Extract: what people actually DO, not what brands sell
2. **Global retail scouting** — "[category] japan don quijote", "[category] olive young korea",
   "[category] waitrose premium", "[category] new launches Europe"
   → Source stack: Japanese/Korean/European retail sites via Bright Data
   → Extract: products already validated abroad but not in US
3. **Trade show + industry signals** — "Expo West [year] [category] trends", "Fancy Food Show
   exhibitors [category]", "Vitafoods new products", "PLMA private label [category]"
   → Source stack: Web search, trade press
   → Extract: what industry insiders are betting on
4. **Pre-commercial signals** — "[category] kickstarter trending", "[category] patent filing
   USPTO [year]", "[category] product hunt launch"
   → Source stack: Kickstarter, USPTO, Product Hunt
   → Extract: what exists but hasn't scaled
5. **Structured macro layer** — "[category] google trends", "[category] earnings transcript
   [top CPG brands]", "USDA [category] consumption data"
   → Source stack: Google Trends, public earnings transcripts, USDA/BLS
   → Extract: macro validation anchors

**Tool prioritization for category-intel:**
- **Exa API** (if configured) — run first, covers semantic search across all 5 layers
- **Bright Data MCP** — `scrape_as_markdown` for Reddit, TikTok, retail sites, trade show
  pages; `search_engine` for hard-to-reach queries
- **WebSearch / WebFetch** — baseline fallback

Scale to depth level:
- Quick: use first 4 sub-queries only
- Standard: use 5-6 sub-queries
- Deep: use all sub-queries + add 1-2 custom queries based on the specific topic

### Step 1.3: Confirm Plan (Standalone Only)

When running standalone (Brady invoked directly), show the plan before executing:

```
Research: [question]
Type: [type] | Depth: [level] | Est. sources: [range]

Sub-queries:
1. [query]
2. [query]
...

Proceeding unless you want to adjust.
```

When running as a building block (`silent: true`), skip confirmation and execute immediately.

---

## Phase 2: EXECUTE

### Step 2.1: Search

For each sub-query, run web searches in parallel where possible:

**Primary tool**: `WebSearch`
**Supplementary**: `mcp__claude_ai_Bright_Data__search_engine` (for hard-to-reach sources, paywall content)

Per sub-query at standard depth:
- Run 3-4 search variations (rephrase for breadth)
- Collect top 3-5 results per search

### Step 2.2: Scrape & Extract

For the top results per sub-query, fetch full content:

**Primary tool**: `WebFetch`
**Fallback**: `mcp__claude_ai_Bright_Data__scrape_as_markdown` (for JS-heavy pages)

Extract per source:
- Key facts, data points, statistics
- Direct quotes from named sources
- Dates and specificity (avoid vague claims)
- Source metadata: URL, title, domain, publication date

### Step 2.3: Score Sources

Rate every source on a 3-tier system:

| Tier | Credibility | Examples |
|------|------------|---------|
| 1 — High | Established, editorial standards | .gov, .edu, Reuters, Bloomberg, WSJ, NYT, peer-reviewed, official company pages |
| 2 — Good | Reputable but less rigorous | Industry publications, analyst reports, reputable blogs, Wikipedia (background only) |
| 3 — Caution | Verify independently | Forums, social media, unverified blogs, SEO content, press releases (self-serving) |

**Scoring rules:**
- If two sources report the same fact, keep the higher-tier source, note corroboration
- Prefer sources from the last 12 months; flag anything older than 2 years
- Press releases are Tier 3 (self-serving) unless corroborated by Tier 1-2 coverage
- Wikipedia is Tier 2 for background/definitions only, never for current claims

### Step 2.4: Deduplicate

- Merge duplicate facts across sub-queries
- Keep the highest-tier source for each fact
- Note when multiple sources corroborate (increases confidence)
- Remove redundant search results

---

## Phase 3: PUBLISH

### Step 3.1: Synthesize

Generate a structured markdown report. This is NOT a link dump — connect dots, identify patterns,
surface what matters. Every factual claim gets a numbered source citation.

### Step 3.2: Report Template

```markdown
# [Research Title]

**Date:** [YYYY-MM-DD]
**Depth:** [Quick / Standard / Deep]
**Sources analyzed:** [N]
**Research type:** [type]

---

## Executive Summary

[3-5 sentences. The single most important finding first. "If you read nothing else" paragraph.
End with the key implication or action item.]

## Key Findings

1. **[Finding]** — [1-2 sentence explanation with source citation] [1]
2. **[Finding]** — [explanation] [2]
3. **[Finding]** — [explanation] [3]
...
(5-10 findings depending on depth level)

## Detailed Analysis

### [Sub-Query 1 Topic]

[2-4 paragraphs synthesizing findings from this research track. Every factual claim gets
a numbered citation. Connect findings to the broader research question. Flag conflicts
or surprises.]

### [Sub-Query 2 Topic]

...

### [Sub-Query N Topic]

...

## Implications & Recommendations

- [What this means for Brady / client — actionable, specific]
- [Next step or decision this enables]
- [Risk or opportunity to watch]
(3-5 bullets)

## Knowledge Gaps

- [What the research could NOT answer]
- [Where data was thin or conflicting]
- [Suggested follow-up queries]

## Sources

| # | Source | URL | Date | Tier |
|---|--------|-----|------|------|
| 1 | [Title] | [URL] | [Date] | [1/2/3] |
| 2 | ... | ... | ... | ... |
...
```

### Step 3.2b: Alternate Synthesis for `category-intel`

When `research_type: category-intel`, the output is NOT the standard report template.
It's a **cluster synthesis** — the downstream consumer (innovation-workshop Stage 0) needs
opportunity clusters with evidence and timing, not a linear analysis.

Use this template instead:

```markdown
# Category Intel — [Category / Theme]

**Date:** [YYYY-MM-DD]
**Depth:** [Quick / Standard / Deep]
**Sources analyzed:** [N across 5 source layers]

---

## Behavioral Shifts (5-10)

Each shift answers: what are consumers actually doing that brands haven't caught up to?

1. **[Shift]** — [1-2 sentence description]
   - Evidence: [source types that confirm, with citations]
   - Why it matters commercially: [1 sentence]
   - Stage: [Early / Emerging / Scaling]

2. ...

## White Space Map

[2x2 or 3-axis framework. Example axes: Fresh vs Packaged × Functional vs Indulgent.
Call out overcrowded zones, underserved zones, completely unoccupied zones.]

## Opportunity Clusters (3-5)

Each cluster is a coherent theme that ties multiple behavioral shifts together with a
single job-to-be-done and a timing insight. Clusters feed innovation-workshop Stage 0.

### Cluster 1: [Name]

- **Behavioral shift:** [core consumer behavior this cluster serves]
- **Why now:** [specific 2026 timing — what opened up recently that wasn't true 18 months ago]
- **Job-to-be-done:** [what the consumer hires products in this cluster to do]
- **Margin location:** [DTC / Premium retail / B2B / Private label / Mixed]
- **Evidence:** [3-5 source citations, tagged by layer — behavioral / retail / trade / pre-commercial / macro]
- **NOT-to-generate guardrails:** [what Stage 1 should AVOID when ideating in this cluster — e.g., "no protein snacks, no keto"]

### Cluster 2: [Name]
...

## Blind Spots

- [What the scan could NOT surface — unknowns worth Brady's network judgment]
- [Where sources were thin or the signal was ambiguous]

## Sources

[Standard sources table: # | Source | URL | Date | Tier | Layer (behavioral/retail/trade/pre-commercial/macro)]
```

**Why this format matters:** innovation-workshop Stage 0 presents this synthesis back to
Brady in dialogue mode. Having clusters with structured fields (behavioral shift, why now,
JTBD, margin, guardrails) lets the skill run the 5-criteria sharpness gate directly against
the synthesis without re-interpretation.

### Step 3.3: PDF Generation (Optional)

When Brady requests PDF or when a calling skill needs PDF output:

1. Use the mception design system (`3-reference/skills/mception-design-system/SKILL.md`)
2. Generate HTML with light-mode styling:
   ```css
   font-family: 'Space Grotesk' (titles), 'DM Sans' (body), 'JetBrains Mono' (labels/data)
   --bg: #FFFFFF; --accent: #B8922E; --text: #1A1A1A; --gray: #6B6E75; --card-bg: #F5F5F3
   ```
3. Convert via Playwright:
   ```python
   from playwright.sync_api import sync_playwright
   with sync_playwright() as p:
       browser = p.chromium.launch()
       page = browser.new_page()
       page.goto(f'file:///path/to/report.html')
       page.wait_for_timeout(3000)
       page.pdf(path=output_path, format='Letter', print_background=True,
                margin={'top': '0.5in', 'right': '0.5in', 'bottom': '0.5in', 'left': '0.5in'})
       browser.close()
   ```

### Step 3.4: Output

**File naming:**
- Markdown: `Deep_Research_[slug]_[YYYY-MM-DD].md`
- PDF: `Deep_Research_[slug]_[YYYY-MM-DD].pdf`
- HTML (working file, if PDF): `Deep_Research_[slug]_[YYYY-MM-DD].html`

**Output paths:**
- Primary: `/mnt/user-data/outputs/deep-research/[filename]`
- CoWork local: `~/Documents/Deep-Research/[YYYY]/[MM]/[filename]`

Create directories if they don't exist.

### Step 3.5: Deliver

When standalone:
1. Present the markdown report (and PDF if generated)
2. In-chat summary: 3-5 bullet points covering the top findings
3. Flag any knowledge gaps or suggested follow-ups

When building block:
- Return the markdown content to the calling skill
- No in-chat summary (the calling skill handles presentation)

---

## Building Block API

Other skills can invoke deep-research by providing a structured input:

```
Research question: [the question]
Depth: [quick / standard / deep]
Research type: [topic / company / competitive-analysis / tech-evaluation / market-research]
Context: [background the researcher should know]
Focus areas: [specific angles to prioritize]
Constraints: [geography, time period, exclusions]
Output: [markdown-only / markdown+pdf]
Silent: [true / false]
```

When `silent: true`, skip the plan confirmation step and execute immediately. Return the
markdown report content for the calling skill to incorporate.

### Integration Examples

1. **exec-intel-brief** calls deep-research for a competitor spotlight deep dive:
   ```
   Research question: [Competitor] competitive position in [industry]
   Depth: quick
   Research type: company
   Silent: true
   ```

2. **daily-whitepaper** calls deep-research when a trending story needs more context:
   ```
   Research question: [trending topic] implications for retail/CPG
   Depth: quick
   Research type: topic
   Silent: true
   ```

3. **Standalone** — Brady says "deep dive on the state of AI agents in enterprise":
   ```
   Depth: standard
   Research type: topic
   Silent: false (show plan, get confirmation)
   ```

---

## Edge Cases

- **No search results for a sub-query**: Reformulate the query twice with different phrasing.
  If still empty, note "insufficient data" for that track and continue with other sub-queries.
- **Scraping fails on a URL**: Fall back to search snippet content. Note reduced confidence for
  that source. Don't block the entire research.
- **Topic too broad**: If the question could generate more than 8 sub-queries at standard depth,
  ask Brady to narrow scope. When running as a building block, constrain to the most relevant
  facet and note the limitation.
- **Conflicting information**: Present both sides with source attribution. Flag the conflict
  explicitly in Key Findings. Prefer higher-tier sources but don't suppress contradictions.
- **Stale sources only**: If the best sources are all >2 years old, flag this prominently.
  The topic may be understudied or the search terms may need adjustment.
- **Rate limiting / API errors**: If WebSearch or WebFetch hit rate limits, pause briefly and
  retry. If persistent, reduce scope (fewer searches per sub-query) and note reduced coverage.

## What This Skill Does NOT Do

- It doesn't replace exec-intel-brief — that's a daily client deliverable with specific cadence
- It doesn't replace daily-whitepaper — that's Brady's personal news synthesis
- It doesn't generate client-ready PDFs with cover notes — use exec-intel-brief for that
- It doesn't archive reports in Notion automatically — the evening sweep handles archival
- It doesn't run on a schedule — it's invoked on demand (standalone or via other skills)
