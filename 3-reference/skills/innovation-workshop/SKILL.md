---
name: innovation-workshop
description: |
  Full-stack product innovation engine — generates 20 product ideas per run with Canva visuals,
  research-backed pitches, RTBs, and a combined PDF/HTML deliverable styled with mception design
  system. Includes executive summary, individual product pages, and a whitepaper appendix.
  Feeds a recursive learning engine that tracks method performance, category coverage, and
  idea quality over time.

  TRIGGER THIS SKILL whenever Brady says: "innovation workshop," "run the workshop,"
  "20 ideas," "daily ideas," "product ideas," "run innovation," "new product concepts,"
  "generate products," "idea sprint," or any variation requesting a structured product
  ideation session with visuals and deliverables.

  This skill ORCHESTRATES full-stack-ideation (methods), midjourney-prompt (visual style
  guidance), and mception-design-system (document styling). It does NOT replace those
  skills — it sequences them into a single pipeline with a unified output.
---

# Innovation Workshop

20 product ideas per run. Each idea gets a visual, a pitch, and research-backed RTBs.
Packaged into one document. Pushed to mception.ai. Feeds a learning engine that gets
smarter with every run.

## Why This Exists

Brady wants to generate 10-20 new product ideas every day with professional visuals and
credible research backing — not just a brainstorm list. The old workflow (ideation in
Claude Chat → Midjourney prompts → Discord → download → manual assembly) was too
friction-heavy to sustain daily. This skill does the whole thing in one pipeline.

## Execution Environment

**Runs on**: Conductor (preferred) or Claude Code CLI
**Input**: Category lane selection (or auto-select from learning engine)
**Output**: Combined HTML + PDF with all ideas, visuals, executive summary, and whitepaper appendix
**Publish**: HTML deployed to mception.ai (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Workflow

### Step 1: Category Lane Selection

Present Brady with 5-6 product category lanes. Each lane scored on:

| Criterion | What It Measures |
|-----------|-----------------|
| **Brady's Edge** | Where his background gives unfair insight (retail ops, foodservice, CPG, construction, AI/tech) |
| **Market Signal Strength** | Visible consumer pain, regulatory shifts, supply chain disruption |
| **Margin Structure** | Where a new entrant can capture margin (DTC, premium, B2B consumables) |
| **Visual Testability** | Products that can be validated visually (packaging, physical goods) |

Brady picks 3-4 lanes. If running daily on auto-pilot, the learning engine suggests lanes
based on coverage gaps and recent performance.

**Canonical lanes** (expand as needed):
1. Premium Foodservice / CPG
2. Construction / Industrial Consumables
3. AI-Powered Physical Products
4. Dad / Family Consumer Products
5. Beverage (Functional / Premium)
6. Professional / B2B Tools

### Step 2: Run Ideation Methods

Select 8-10 methods from full-stack-ideation based on the chosen categories.

**Default product innovation cluster:**
- Jobs to Be Done (#4)
- Blue Ocean Strategy (#9)
- Analogous Inspiration (#15)
- SCAMPER (#21)
- Mashup Method (#24)
- Cultural Trend Mining (#51)
- Premiumization Lens (#56)
- Packaging Innovation (#58)
- Category Design (#55)
- Downmarket Disruption (#57)

Run each method against the selected categories. Target: 30-40 raw ideas.

### Step 3: Score and Filter

Use Idea Scoring Systems (#69) + Brutal Editing (#20).

**Scoring criteria:**
| Criterion | Weight | Description |
|-----------|--------|-------------|
| Originality | 20% | Is this genuinely novel or just a rebrand? |
| Market Size | 20% | TAM — is there a real buyer base? |
| Margin Potential | 20% | Can this product capture premium margin? |
| Visual Appeal | 15% | Will it photograph well? Gift-worthy? Shelf presence? |
| Speed to Prototype | 15% | Can a co-packer or manufacturer build an MVP in <90 days? |
| Research Backing | 10% | Is there data supporting the thesis? |

Cut bottom 50% to land at ~20 survivors.

### Step 4: Generate Visuals via Canva

For each surviving idea, generate 4 Canva images using `mcp__claude_ai_Canva__generate-design`:

| Shot | Purpose | Prompt Guidance |
|------|---------|-----------------|
| **Hero** | Primary product shot, clean commercial photography | Follow midjourney-prompt SKILL.md category table for shot type, surface, lighting |
| **Lifestyle** | Product in real-world context (kitchen, table, store shelf) | Add environment context, people optional, warm natural lighting |
| **Close-Up** | Detail/texture shot showing materials, label, finish | Tight crop, macro-style, dramatic lighting, material specificity |
| **Alternate** | Different angle, color variant, or packaging option | 45-degree, flat lay, or collection arrangement |

**Prompt construction rules** (from midjourney-prompt skill):
- Be specific about materials: "brushed aluminum" not "metal"
- Name the shot type explicitly
- Say "commercial product photography" — never "photorealistic"
- No filler words, no camera specs
- 2-3 lines max per prompt

Pick the best hero. Present all 4 on the product page.

**IMPORTANT — Image Embedding Protocol:**
Canva `design.canva.ai` thumbnail URLs are authenticated and short-lived — they will NOT
render in standalone HTML files or PDFs. Instead:
1. After generating designs, use `mcp__claude_ai_Canva__create-design-from-candidate` to
   save the hero to Brady's Canva account
2. Then use `mcp__claude_ai_Canva__export-design` to get a permanent public URL
3. If export isn't feasible for all 20, use styled placeholder cards with product description
   and a clickable link to the Canva design page (the `canva.com/d/` URL)
4. Never embed `design.canva.ai` URLs as `<img src>` — they will break

### Step 5: Write Pitch + RTBs + Competitive Landscape + Ops Complexity

For each idea, write:

**Pitch** (2-3 paragraphs):
- What the product is and who it's for
- The insight that makes it work (consumer behavior, market gap, format innovation)
- Why Brady is positioned to build it (connect to his specific experience)

**RTBs (Reasons to Believe)** — 3-4 bullets, each grounded in data or experience:
- Market data point with source
- Consumer behavior signal
- Supply chain / manufacturing feasibility
- Competitive white space analysis

**Competitive Landscape** — REQUIRED for every idea. Answer: "What's already out there
that's close to this?" Include:
- 2-4 closest existing products/brands with what they do and what they charge
- What the gap is (why this idea is different/better)
- Whether incumbents could easily copy this

**Operational Complexity** — REQUIRED for every idea. Call out the real operational
challenges:
- Manufacturing: co-pack availability, MOQ, lead time
- Supply chain: cold chain? multi-temp? fragile components?
- Packaging: does the format create operational challenges (e.g., mixing refrigerated
  and shelf-stable components in one SKU)?
- Fulfillment: DTC feasible? Retail-ready? What's the shipping complexity?
- Rate as Simple / Moderate / Complex with a 1-2 sentence explanation

**Research Basis** — 1-2 sentences citing the method used, the market signal that
triggered the idea, and any data that supports the thesis. This is what separates
"brainstorm output" from "research-backed product concept."

### Step 6: Assemble Document

Build a single HTML file using mception-design-system tokens.

**Page Break Protocol — CRITICAL:**
Every product page MUST stay together as one unit. Apply these CSS rules:
- `.product-page { page-break-before: always; page-break-inside: avoid; }`
- Headers, image blocks, and body content must be inside the same container
- Never let a header print at the bottom of a page with its body on the next page
- Test by printing to PDF — if any product splits across pages, fix the layout

**Font Hierarchy — CRITICAL:**
Maintain clear visual hierarchy between content levels:
- Cover title: 64px Space Grotesk 700
- Section headers (EXECUTIVE SUMMARY, etc.): 12px JetBrains Mono uppercase, 4px letter-spacing
- Product name: 36px Space Grotesk 700
- Sub-section titles (The Pitch, Competitive Landscape, etc.): 20px Space Grotesk 700
- Body text: 14px DM Sans
- Labels/tags: 10px JetBrains Mono
- Source citations: 9px JetBrains Mono
If you can't immediately tell what's a header vs. body text, the fonts are too similar.

**Document structure:**

```
COVER PAGE
├── Title: "Innovation Workshop — [Category] — [Date]"
├── Subtitle: "20 Research-Backed Product Concepts"
├── mception.ai branding

EXECUTIVE SUMMARY (1-2 pages)
├── Top 5 ideas (hero image + one-liner each)
├── Key themes across all 20 ideas
├── Category insights / market observations
├── Prioritization matrix (effort vs impact visual)

PRODUCT PAGES (20 pages, one per idea)
├── Hero image (large, 60% width)
├── 3 alternate images (thumbnails, including lifestyle + close-up)
├── Product name + category tag
├── Pitch (2-3 paragraphs)
├── RTBs (3-4 data-backed bullets)
├── Research basis
├── Effort / Impact / First Move sidebar
├── Method attribution

WHITEPAPER APPENDIX (3-5 pages)
├── Methodology overview (which methods, why)
├── Category market analysis (size, growth, trends, data)
├── Competitive landscape scan
├── Supply chain / manufacturing considerations
├── Consumer behavior signals
├── Full data sources and citations
├── Method performance analysis (which methods produced best ideas)
```

### Step 7: Generate PDF

Use Playwright to convert light-mode HTML to PDF:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'file:///path/to/light_version.html')
    page.pdf(
        path='innovation-workshop-[date].pdf',
        format='Tabloid',
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

### Step 8: Update Learning Engine

After each run, update the learning log at `references/learning-log.yml`:

```yaml
- date: 2026-04-15
  category: "Premium Foodservice / CPG"
  methods_used: [4, 9, 15, 21, 24, 51, 55, 56, 57, 58]
  ideas_generated: 30
  ideas_surviving: 20
  top_picks:
    - name: "Broth Bar Concentrates"
      method: 9
      score: 4.2
    - name: "$3 Chef Sauce"
      method: 57
      score: 4.0
  method_performance:
    4: { ideas: 4, survivors: 4, hit_rate: 1.0 }
    9: { ideas: 3, survivors: 2, hit_rate: 0.67 }
  category_gaps_identified:
    - "Beverage lane untouched — run next"
    - "Industrial lane has high margin potential, low visual testability"
  learnings:
    - "SCAMPER consistently produces the most visually distinctive ideas"
    - "Downmarket disruption ideas score high on market size but low on margin"
```

### Step 9: Publish (Optional)

If Brady says "push it" or "publish," deploy the HTML to mception.ai using the
v0-to-portal skill pattern or direct GitHub Pages deployment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Recursive Learning Engine

The learning engine lives at `references/learning-log.yml` and grows with every run.

### What It Tracks

| Signal | How It's Used |
|--------|---------------|
| **Method hit rate** | Which of the 100 methods consistently produce ideas that survive scoring? Promotes high-performers, deprioritizes low-performers. |
| **Category coverage** | Which lanes have been explored? Which are overdue? Suggests underexplored lanes. |
| **Idea library** | Cumulative list of all ideas generated. Prevents duplicates. Enables cross-pollination between runs. |
| **Score trends** | Are ideas getting better over time? Detects creative fatigue in a category. |
| **RTB patterns** | Which types of research backing (market data, consumer signal, supply chain, competitive) are strongest? |

### How It Influences Future Runs

1. **Method selection**: Weight toward methods with >60% hit rate for the chosen category
2. **Category suggestion**: When running on auto-pilot, suggest the least-explored lane with the highest signal strength
3. **Duplicate detection**: Cross-reference new ideas against the full library. Flag near-duplicates. Force differentiation.
4. **Quality ratchet**: If average score drops below 3.5, inject fresh methods (swap in methods from categories VII-X)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Dependencies

| Skill | Role |
|-------|------|
| **full-stack-ideation** | The 100 methods — this skill selects and runs them |
| **midjourney-prompt** | Visual style guidance (category → shot type mapping) |
| **mception-design-system** | Document styling tokens, layout patterns, PDF generation |
| **v0-to-portal** | Optional mception.ai deployment |

## Output Files

```
output/
├── innovation-workshop-YYYY-MM-DD.html     (dark mode, primary)
├── innovation-workshop-YYYY-MM-DD-light.html (light mode, for PDF)
├── innovation-workshop-YYYY-MM-DD.pdf       (print-ready)
references/
├── learning-log.yml                         (cumulative learning data)
```

## What This Skill Does NOT Do

- Replace full-stack-ideation (it orchestrates it, doesn't duplicate the methods)
- Generate ideas without visuals (that's full-stack-ideation standalone)
- Publish without Brady's approval (publish step is always manual)
- Run without scoring — every idea must survive the filter
