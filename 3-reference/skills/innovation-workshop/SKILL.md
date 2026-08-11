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

  DISAMBIGUATION: This is the PRODUCT innovation engine. For OPERATIONS innovation
  (process, tech, format, labor — concept-heavy, no Canva visuals, problem-first P1-PN
  framing), use `operations-innovation-engine` instead. If Brady says just "innovation
  workshop" without "product" or "ops," ask which engine.
trust_tier: T0
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

### Stage 0: Problem Formation

**The purpose of Stage 0 is to produce a sharp prompt, not pick a lane.** Stage 1's
ideation methods (SCAMPER, Blue Ocean, etc.) will produce generic output if they receive
a thin framing. The job here is to make sure they don't.

Stage 0 runs in **dialogue mode** — Brady can riff, pivot, mashup clusters, or scan again
for as long as he wants. The gate isn't leaving Stage 0; the gate is the **sharpness
check** that the final prompt must pass before Stage 1 starts.

Built on three principles:
1. **Readiness ladder** — auto-detect how "done" Brady's input is, scale research depth accordingly
2. **Dialogue mode** — Stage 0 is conversation, not a one-shot prompt
3. **Sharpness gate** — the exit into Stage 1 requires the prompt to pass a 5-criteria quality check

#### 0.1 Check the Category Intel DB first

Before doing anything else, query the Notion **Category Intel DB** (data source ID:
`collection://608fdc94-9986-4d63-9f74-22a29a091115`) for clusters with Status =
`Fresh` or `Active`. Surface this as context:

```
📚 ACTIVE CATEGORY INTEL (as of [date])
• [Cluster name] — [1-line behavioral shift] (Status: Fresh, 14d old)
• [Cluster name] — [1-line shift] (Status: Active, 62d old)
• [Cluster name] — [1-line shift] (Status: Active, 88d old — refresh soon)

You can:
- Run Stage 1 against one of these (say "use [cluster name]")
- Scan for something new (say "what are you seeing?" or give me a theme)
- Mash two clusters (say "combine A with B")
```

If the DB is empty or doesn't exist yet, skip this step and treat the run as a cold start.

#### 0.2 Detect readiness level

Read Brady's input and classify it into one of four levels. This drives research depth.

| Level | Input signature | Stage 0 runs | Research depth |
|-------|-----------------|--------------|----------------|
| **0 — Cold start** | "What are you seeing?" / "Tell me what's out there" / "Run the workshop" with no theme | Full multi-source scan → synthesize 3-5 opportunity clusters | Deep (deep-research, type: `category-intel`) |
| **1 — Raw theme** | Single theme or observation ("creatine is going mainstream," "bakery is dying") | Targeted validation + find the behavioral shift underneath | Standard |
| **2 — Trend convergence** | 2-3 converging trends Brady has already spotted | Light validation — confirm each trend is real, find the JTBD | Quick |
| **3 — Sharp thesis** | Fully-formed cluster ("run workshop against Performance Bakery cluster") or reference to an existing Category Intel DB entry | Skip research, run sharpness gate only | None |

When ambiguous, ask Brady which level he's at rather than guessing wrong.

#### 0.3 Run the scan (Levels 0-2)

Call the `deep-research` skill with `research_type: category-intel` (see deep-research
SKILL.md for full sub-query profile). This composes the scan across five source layers:

- **Behavioral signals** — Reddit, TikTok surface via Bright Data, niche forums
- **Global retail scouting** — Japanese, Korean, European premium grocery
- **Trade show + industry signals** — Expo West, Fancy Food, Vitafoods, PLMA
- **Pre-commercial signals** — Kickstarter, patent filings (USPTO), Product Hunt
- **Structured macro layer** — Google Trends, earnings transcripts, USDA/BLS

**Tool stack:**
- `WebSearch` — baseline
- `mcp__claude_ai_Bright_Data__search_engine` + `scrape_as_markdown` — power tool for anti-bot sources
- **Exa API** (when available) — semantic trend hunting via "find pages by meaning";
  catches pre-mainstream signals keyword search misses. See `references/exa-setup.md`
  for install + auth notes. Falls back to WebSearch if Exa is not configured.

Invoke deep-research with `silent: true`. Depth auto-scales based on readiness level
(deep for Level 0, standard for Level 1, quick for Level 2).

**Single-context synthesis (advanced-model mode):** When running on a Claude 5-class
model, hold all five source layers in one context instead of treating each as a separate
sub-query round-trip. The model does the cross-linking ("A's behavioral shift + B's
timing"), blind-spot detection, and cluster synthesis itself in a single pass — deep-research
is still the scan engine for Level 0 cold starts, but pivots, mashups, and drills in the
riff loop should NEVER trigger a fresh scan; they recombine from what's already in context.
Target: a Level 1 raw-theme run should reach the sharpness gate in one research pass, not
two or three.

#### 0.4 Render synthesis for dialogue

deep-research returns the synthesis document. Present it to Brady like this:

```
🔍 TOP CLUSTER: [Name]
  Behavioral shift: [1-2 sentences]
  Why now: [timing insight — what opened up in 2026]
  JTBD: [what consumer is hiring this for]
  Margin location: [DTC / Premium / B2B / Private label / Mixed]
  Evidence: [3-5 source citations]
  NOT-to-generate: [explicit guardrails, e.g., "no protein X, no keto Y"]

📊 ALTERNATE CLUSTERS (shorter)
  • [Cluster B] — [1-line hook]
  • [Cluster C] — [1-line hook]

🔗 CROSS-LINKS
  • Combine A's behavioral shift with B's timing → new cluster possibility

🕳️ BLIND SPOTS (push on these)
  • What I'm NOT seeing that you might know from your network: [specific ask]
```

Brady can respond in any of these modes (this is the riff loop):

- **Accept** — "go with the top" → advance to sharpness gate
- **Pivot** — "I like A but the margin angle is wrong, it should be DTC not retail"
- **Mashup** — "combine A's shift with C's timing"
- **Drill** — "tell me more about the evidence for cluster B"
- **Skip alternates** — "show me something entirely different" → fresh scan
- **Bring external input** — "what about [theme from a client conversation]?"

**Pivots, mashups, and drills are LIGHT passes** — recombine from the already-cached
research artifacts. Only "something entirely different" triggers a fresh deep-research call.

#### 0.5 Sharpness gate (exit into Stage 1)

Before advancing to Stage 1, the selected cluster must answer all 5 criteria. See
`references/stage-0-quality-gate.md` for the full checklist.

1. **Behavioral shift** — what are consumers actually doing that brands haven't caught up to?
2. **Why now** — what specifically opened up in 2026 that wasn't true 18 months ago?
3. **Job-to-be-done** — what is the consumer hiring this product to do?
4. **Margin location** — DTC? premium retail? B2B? private label? mixed?
5. **NOT-to-generate guardrails** — explicit territory Stage 1 must avoid

If any criterion is generic or missing, don't block — **surface what's weak** and suggest
either (a) more research, (b) a sharper question, or (c) pivot to a different cluster.

**Override is allowed.** If Brady says "run it anyway" or "send it," advance to Stage 1
with the gate failure logged to run metadata. Brady is the operator — the skill advises,
doesn't refuse. This mirrors the "run it all" / "full auto" escape hatches at Gates 1 and 2.

#### 0.6 Write cluster to Category Intel DB

Once Brady approves a cluster (whether from a fresh scan or after a riff), write or update
the cluster record in the Notion Category Intel DB. Fields:

| Field | Value |
|-------|-------|
| Cluster Name | Human-readable ("Stealth health snacking") |
| Category | Maps to canonical lanes below |
| Behavioral Shift | Rich text |
| Why Now | Rich text |
| JTBD | Rich text |
| Margin Location | DTC / Premium retail / B2B / Private label / Mixed |
| Evidence | Source citations with URLs |
| Status | Fresh (new clusters default to Fresh; Active after 30 days) |
| Last Refreshed | Today |
| Linked Ideas | Relation → Innovation Idea Pipeline (populated in Step 9 after ideas generated) |
| Runs Spawned | +1 |
| Readiness Level Origin | 0 / 1 / 2 / 3 |

If the cluster already exists (Brady picked it from the DB in Step 0.1), just increment
`Runs Spawned` and refresh `Last Refreshed`.

#### 0.7 Canonical lanes (reference)

Clusters are tagged to one of these lanes in the Category Intel DB. This is still useful
for learning-engine analytics (which lanes produce best ideas) and for cold-start
coverage-gap detection. Lanes are a tag, not a starting point.

1. Premium Foodservice / CPG
2. Construction / Industrial Consumables
3. AI-Powered Physical Products
4. Dad / Family Consumer Products
5. Beverage (Functional / Premium)
6. Professional / B2B Tools
7. Functional Indulgence / Performance Bakery
8. Global Snacks / Cultural Format Transfer
9. Fermented Foods / Gut Health

### Step 2: Run Ideation Methods

Select 8-10 methods from full-stack-ideation based on the chosen categories.

**2.0 Load the idea library into context first.** Before any method runs, pull the full
cumulative idea library — all `top_picks` and idea names from `references/learning-log.yml`
plus current titles from the Innovation Idea Pipeline Notion DB
(`d7f77313-3bfc-42e6-9c6d-53aa7d2b2597`). This library is injected into every method run
so differentiation is forced **at generation time**, not checked after the fact. A new idea
that near-duplicates a library entry must either be dropped or explicitly framed as a
variant of the existing one (name the parent).

**2.1 Parallel method fan-out (advanced-model mode).** Each selected method runs as an
independent subagent, blind to the other methods' output — isolation is a feature: it
maximizes divergence and prevents early ideas from anchoring later ones. Each method agent
receives:
- The sharp prompt from Stage 0 (cluster, behavioral shift, why-now, JTBD, margin location)
- The NOT-to-generate guardrails
- The idea library (for at-generation dedup, per 2.0)
- Its single method card from full-stack-ideation

Each agent returns 3-4 structured raw ideas `{name, one_liner, method, why_it_fits_cluster}`.
Merge the pool after all agents return. Fallback: if subagent orchestration is unavailable
(e.g., a constrained harness), run methods sequentially in one thread as before.

**Default product innovation cluster:**
- Jobs to Be Done (#4)
- Blue Ocean Strategy (#9) — **lever-discovery only** (Run 8 policy, approved 2026-08-11): run the ERRC grid and feed its output INTO other methods as raw material; do not score its standalone ideas (3 runs ≤0.67 hit rate, 0.25 on Run 8 — whole-format ERRC bets die at the judge panel)
- Analogous Inspiration (#15)
- SCAMPER (#21)
- Mashup Method (#24)
- Cultural Trend Mining (#51)
- Premiumization Lens (#56)
- Packaging Innovation (#58)
- Category Design (#55)
- Downmarket Disruption (#57)
- Occasion-Based Thinking (#59) — promoted to permanent set (Run 8 policy, approved 2026-08-11): 75% hit rate in both runs used; produced 2 top-5 ideas on Run 8

**Format/retail-run method policy** (Run 8, approved 2026-08-11): on store-format or service-model runs, run Downmarket Disruption (#57) as a **fusion pass over the other methods' raw pool** rather than a standalone generator — both of its Run 8 survivors came via merges with other methods' concepts. (#58 Packaging remains excluded from non-food runs per Run 5/7 learning.)

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

**Judge panel scoring (advanced-model mode).** Scoring is no longer one model's single
opinion. Run three independent judge agents over the merged raw pool, each scoring all
6 criteria but with a distinct lens that shapes how they weigh evidence:

| Judge | Lens | Bias it corrects |
|-------|------|------------------|
| **Margin Realist** | Unit economics, channel margin stacks, co-pack reality | Kills "cool but 12% gross margin" ideas |
| **Novelty Maximalist** | Genuine newness, category creation, cultural timing | Kills safe rebrands that score well everywhere else |
| **Ops Skeptic** | Manufacturability, cold chain, MOQ, fulfillment complexity | Kills ideas that die in execution |

Final score per idea = **median** of the three judges' weighted totals. Flag any idea
where judge spread exceeds 1.5 points — those are the contested ideas, and they get a
`⚡ contested` marker at Gate 1 with a one-line summary of the disagreement (contested
ideas are often the most interesting; don't silently average them away). Fallback: single-
thread scoring with the standard rubric if orchestration is unavailable.

### ⏸ GATE 1 — Vet Before Image Generation

**STOP HERE.** Present the ~20 survivors as a numbered list with: name, score, method,
judge spread (with `⚡ contested` markers where applicable), and a 1-line pitch summary.
Wait for Brady's feedback before proceeding.

With judge-panel scoring and the verification pass (Step 5.5) in place, this gate's job
shifts from quality control to **taste selection** — the pipeline should be handing Brady
a list where every idea is defensible, and his job is picking which ones are *his*.

Brady can:
- Cut weak ideas from the list
- Swap in alternates from the raw pool
- Adjust scores or reorder
- Say "go" to advance to image generation

**Do NOT proceed to Step 4 unless Brady explicitly approves the survivor list.**
Image generation is the most expensive step in the pipeline (time + tokens). The whole
point of this gate is to avoid burning resources on ideas that won't survive.

**Escape hatch:** If Brady says "run it all" or "full auto" at the start of the workshop,
skip this gate and run the entire pipeline without pausing.

### Step 4: Generate Visuals — Midjourney for heroes, Canva for polish

**Default image generator is Midjourney, not Canva.** Verified across multiple runs
(2026-04 workshop series): MJ v7 produces commercial product-photography quality
that reads as real photography; Canva's native image AI returns flatter,
stylized output that doesn't pass as a product shot. Use Canva downstream for
text overlays, logo fixes, brand-matched slides, and client collateral — not
for the hero render itself.

**Process per surviving idea:**

1. Use `midjourney-prompt` SKILL.md to craft one optimal prompt per shot type
   below. Write the prompts into a `midjourney-prompts.md` file in the project
   directory with the expected download filenames so the batch and renderer
   stay in sync.
2. Invoke `midjourney-generate` skill to run the batch (one `Submit` click per
   prompt — pressing Enter does NOT submit). Use the in-page canvas-capture
   download path documented in that skill — it lets you specify exact output
   filenames, bypasses MJ CDN auth, and works unattended.
3. **Shot types to generate (pick based on idea type):**

| Shot | When to include | Prompt Guidance |
|------|-----------------|-----------------|
| **Hero** | Always | Follow midjourney-prompt SKILL.md category table for shot type, surface, lighting |
| **Lifestyle** | When in-context matters (service products, retail formats) | Add environment context, people optional, warm natural lighting |
| **Close-Up** | When material/finish is the story | Tight crop, macro-style, dramatic lighting, material specificity |
| **Alternate** | When a second angle meaningfully differs | 45-degree, flat lay, or collection arrangement |

For most ops- and format-oriented runs, one Hero per idea is enough. Reserve
multi-shot treatments for truly buyer-ready CPG runs.

**Prompt construction rules** (from midjourney-prompt skill):
- Be specific about materials: "brushed aluminum" not "metal"
- Name the shot type explicitly
- Say "commercial product photography" — never "photorealistic"
- No filler words, no camera specs
- 2-3 lines max per prompt
- MJ v7 reliably renders 3-4 words of in-image text. Longer brand names get
  mangled — generate text-free and overlay in Canva during polish.

**Image QA Pass (advanced-model mode) — runs after download, before assembly:**
Read every downloaded PNG (the model views the actual image) and check it against its
prompt with this checklist:

| Check | Fail condition |
|-------|----------------|
| **Text integrity** | Any in-image text is mangled, misspelled, or exceeds the 3-4 word MJ limit |
| **Material accuracy** | Rendered material contradicts the prompt (glossy plastic where prompt said "brushed aluminum") |
| **Format accuracy** | Wrong product format (a bottle where the idea is a pouch; single unit where idea is a multi-pack) |
| **Cropping** | Product cut off at frame edge, or composition unusable at 280px float |
| **Reads as photography** | Output is illustrated/stylized rather than commercial product photography |

Failed renders get **one re-queue** with an adjusted prompt (strip in-image text on text
failures — overlay in Canva instead; sharpen material/format language otherwise). If the
re-render also fails, keep the better of the two, mark the idea `image_qa: failed` in run
metadata, and surface it in the Gate 2 summary so Brady knows which pages to eyeball.
This makes the "3-4 words max of in-image text" rule enforced rather than hoped-for.

**Image Embedding Protocol:**
1. Save downloaded MJ PNGs to `images-<project-slug>/` with
   `<id>-<slug>-hero.png` naming so render.py picks them up automatically.
2. The renderer floats the hero image left at 280px with text wrapping to the
   right — do NOT use a 60/40 stacked layout unless doing a buyer-ready
   multi-shot page.
3. CSS for images: `object-fit: contain` (NOT `cover`) so the full image
   displays without cropping. No max-height constraint.

**Handoff to Canva for polish (optional per idea):**
When the MJ hero has a text or branding requirement MJ couldn't hit (e.g.,
accurate client logos, long brand names, precise copy overlays), save the
MJ PNG and run it through Canva as a polish pass:
1. Import the MJ PNG into Canva as a design asset.
2. Overlay the final logo/text cleanly.
3. Export the polished PNG and save with `-polished` suffix
   (e.g., `a7-...-hero-polished.png`).
4. Update render.py's image-resolution logic (or a simple file swap) to prefer
   the `-polished` variant when present.

This split — MJ for photography, Canva for the page it lives on — is the
default for all workshops going forward. Pure-Canva image generation is
deprecated for hero shots.

### Step 5: Write Pitch + RTBs + Competitive Landscape + Ops Complexity

For each idea, write:

**Pitch** (2-3 paragraphs):
- What the product is and who it's for
- The insight that makes it work (consumer behavior, market gap, format innovation)
- Execution path: what the first move looks like, why it's feasible

**Tone rule**: Lead with the idea, not with Brady. Do NOT pitch Brady's background as a
selling point ("Brady's edge," "16 years in..."). The ideas should speak for themselves.
If specific industry experience or network connections are directly relevant to an idea's
feasibility, mention them briefly in context — but never as a braggadocious callout.

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

**Closest Comparables** — REQUIRED: 2-3 real products on the market today with retailer
product-page URLs. Emit as a list of `{name, retailer, url, price}`. Feeds the viewer's
Comparables strip and anchors the competitive framing in the pitch. Prefer links to
Walmart, Target, Kroger, Whole Foods, Amazon, or the brand's own DTC site. If nothing
close exists, say so explicitly rather than inventing a URL.

**Retailer Fit** — REQUIRED: pick 1-3 best-fit channels from this canonical list:
Walmart, Target, Kroger, Whole Foods, Sprouts, Costco, Amazon, DTC-subscription,
DTC-one-time, B2B-foodservice. Emit as an ordered array with a one-line `why` on the
top pick. This populates the viewer's Retailer filter and replaces vague retail hand-
waving with a structured recommendation.

**Cost Model** — REQUIRED: defensible cost breakdown, one source per line. Emit as:
```yaml
cost:
  cogs:
    - { input: "grass-fed ground beef 80/20", wholesale: "$4.20/lb", source: "supplier-kb:midwest-meats" }
    - { input: "frozen pasta sheets", wholesale: "$1.15/lb", source: "assumption" }
  labor_or_copack: { amount: "$0.85/unit", source: "public-data:co-man-benchmarks" }
  target_retail: "$18.99"
  gross_margin_assumption: "42%"
  defensibility: "supplier-kb"  # supplier-kb | public-data | assumption
```
Rules:
- Every dollar figure needs a source field.
- Missing supplier-kb data → flag as `assumption` and note in pitch. Do NOT fake numbers.
- If flagged `assumption`, the viewer will surface a "needs cost model" hint.

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

### Step 5.5: Adversarial Verification Pass

Every idea's factual claims get attacked before they reach the document. Spawn one
verifier agent per surviving idea whose ONLY job is to **refute** — not confirm — the
idea's claims. Verifiers run in parallel and are prompted skeptical-by-default.

**Per-idea verification targets:**

1. **Closest Comparables** — actually fetch every retailer URL. Confirm the product
   exists, the price is within ±20% of what's claimed, and it's genuinely comparable.
   A dead link or invented product is an automatic fail: replace it with a real one or
   state "no close comparable found" in the pitch.
2. **Cost Model** — challenge every line: is the wholesale input price plausible against
   supplier-kb or public benchmarks? Is the margin math internally consistent (COGS +
   labor + margin stack actually reaches `target_retail`)? Any line the verifier can't
   defend gets downgraded to `source: assumption`.
3. **RTB data points** — any RTB citing a market size, growth rate, or trend stat gets
   checked against a source. Unverifiable stats are rewritten as qualitative signals or
   cut. No number appears in the deliverable that a verifier couldn't trace.
4. **Competitive Landscape** — confirm the named incumbents actually exist and do what
   the pitch says they do.

**Output per idea:** `verification: {comparables: pass|fixed|failed, cost_model:
pass|downgraded, rtbs: pass|revised, competitive: pass|fixed}` in run metadata. Ideas
with any `failed` field are flagged in the Gate 2 summary.

This pass exists to kill the classic failure mode — plausible-but-invented comparables
and confident-but-fabricated market stats — before Brady sees the document, not after
he catches it. Fallback: if orchestration is unavailable, run verification as a single
sequential pass over all ideas; do not skip it.

### Step 6: Assemble Document

Build a single HTML file using mception-design-system tokens.

**Page Break Protocol — CRITICAL:**
Every product page MUST stay together as one unit. Apply these CSS rules:
- `.product-page { page-break-before: always; page-break-inside: avoid; }`
- Headers, image blocks, and body content must be inside the same container
- Never let a header print at the bottom of a page with its body on the next page
- Test by printing to PDF — if any product splits across pages, fix the layout

**Image Layout — CRITICAL:**
Product images must float left with text wrapping around them — NOT stacked vertically
with the image taking up the full width. This keeps each product page compact and prevents
the image from consuming a full page by itself.
- Image floats left at 280px width
- Text (pitch, RTBs, etc.) wraps to the right and below
- Clear the float after `.product-body` so panels below render correctly
- CSS: `.product-image-block { float: left; margin: 0 24px 16px 0; }`
- CSS: `.product-image-block img { width: 280px; height: 280px; object-fit: contain; }`

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

### ⏸ GATE 2 — Review Before PDF + Deploy

**STOP HERE.** Show Brady the assembled HTML file path so he can review it locally.
Wait for feedback before proceeding.

Brady can:
- Request layout fixes, copy edits, or image swaps
- Cut or reorder products in the final document
- Say "looks good" to advance to PDF generation

**Do NOT proceed to Step 7 unless Brady explicitly approves the HTML.**

**Escape hatch:** Same as Gate 1 — "run it all" / "full auto" skips this gate.

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
  stage_0_readiness_level: 2                     # 0=cold, 1=raw theme, 2=convergence, 3=sharp thesis
  cluster_id_used: "cat-intel-uuid-here"         # Category Intel DB page ID, or null if cold-start
  cluster_name: "Functional Indulgence"
  sharpness_gate_passes: 1                       # 1 = passed first try; >1 = weak cluster, loops
  sharpness_gate_override: false                 # true if Brady said "run it anyway"
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
  judge_panel:
    contested_ideas: 3                           # ideas with judge spread > 1.5
    lens_disagreement_pattern: "Ops Skeptic consistently 1+ below on frozen formats"
  image_qa: { checked: 20, requeued: 3, failed: 1 }
  verification: { comparables_fixed: 4, cost_lines_downgraded: 6, rtbs_revised: 2 }
```

**Cross-run analytics (advanced-model mode) — compute, don't just log.** After appending
the run entry, load the FULL learning log and actually run the analysis the log was built
for. Emit an `analytics` block into the run entry answering:

- **Gate predictiveness** — do runs that passed the sharpness gate first-try produce
  higher-scoring ideas than overridden/looped runs? (Compares mean survivor score across
  `sharpness_gate_passes` / `sharpness_gate_override` cohorts.)
- **Readiness-level outcomes** — do Level 0 cold-starts outperform Level 2/3 runs? This
  is the signal for when deep scans pay off.
- **Method hit-rate confidence** — a method's hit rate on <5 total ideas is noise, not
  signal. Report hit rates with sample sizes and only reweight method selection on
  methods with ≥8 lifetime ideas.
- **Cluster yield ranking** — ideas-per-run and mean score per Category Intel cluster;
  recommend which clusters to archive vs. refresh.
- **Judge lens drift** — is one judge lens systematically harsher over time? (Signals a
  rubric problem, not an idea problem.)

Any policy change the analytics suggest (reweight a method, retire a cluster, adjust a
gate criterion) is emitted as an **approval-gated recommendation** in the run summary —
the engine proposes, Brady approves. The learning engine is now a policy, not a diary.

### Step 9: Sync to Notion + Idea Library

After each run, automatically:

1. **Push all 20 new ideas to the Notion database** ("Innovation Idea Pipeline"):
   - Database data source ID: `d7f77313-3bfc-42e6-9c6d-53aa7d2b2597`
   - Parent: Consulting Practice page (`333ed43b89c58123b019d1d108c53c11`)
   - Each idea gets: Idea (title), Stage, Category, Score, Run, Method, Date, Effort,
     Impact, Ops Complexity. Page content includes pitch and RTBs.
   - Set Stage to "2: Researched + Imaged" for ideas with Canva visuals,
     "1: Text Pitch" for text-only ideas.
   - **If the run came from a Category Intel cluster** (readiness level 0-3 with a
     cluster_id), populate each idea's Linked Ideas relation back to the cluster in
     the Category Intel DB. Then update the cluster record: increment `Runs Spawned`,
     refresh `Last Refreshed`.

2. **Viewer updates automatically from Notion — no deploy needed.**
   As of Run 6 (2026-04-20), the mception.ai/innovation-lab viewer fetches live
   from `/api/ideas` on every page load. The API proxies the Innovation Idea
   Pipeline Notion DB via the telly-bot integration. Pushing new ideas to Notion
   in Step 9.1 is sufficient — the viewer picks them up within the 60s cache window.

   The legacy `output/idea-library.html` is no longer the deploy target. It exists
   as a local reference snapshot only. Do NOT push HTML edits to the innovation-lab
   repo for new ideas — that path is deprecated.

3. **Architecture changes** (e.g., new fields rendered, view changes, API contract)
   still require a code PR on `basdkf024rhlasfd/innovation-lab`:
   - `/api/ideas.js` — Notion → JSON proxy (maps properties, handles pagination)
   - `index.html` — viewer. The `augmentFromNotion()` block at the end fetches
     `/api/ideas` and merges into the IDEAS array, rebuilding filter dropdowns.
   - `NOTION_API_KEY` env var on Vercel project `innovation-lab` (uses telly-bot
     integration token — Innovation Idea Pipeline DB must be shared with it).

**Stage gate changes**: When Brady says to change an idea's stage, update the
Notion database page (via `notion-update-page`). The viewer reflects it on next load.

### Step 10: Stage Gate Definitions

Ideas move through these stages. No idea skips a stage.

| Stage | Name | What It Means | Exit Criteria |
|-------|------|---------------|---------------|
| **0** | Trend Identified | Problem or trend spotted, no product proposed | Has a clear consumer/market signal |
| **1** | Text Pitch | Brief pitch written, no deep research or images | Pitch + 2-3 RTBs exist |
| **2** | Researched + Imaged | Filtered, scored, Canva visuals created, competitive + ops analysis | Score ≥ 3.5, hero image, competitive panel, ops assessment |
| **3** | Deep Research | Narrower set gets deeper investigation | Supply chain validated, consumer research, pricing model |
| **4** | Concept Finalized | One product at a time, refined to buyer-ready | Final name, positioning, pack size, price point, hero visual |
| **5** | Buyer-Ready Teaser | Teaser deck ready for first buyer conversation | One-pager or mini-deck that can be emailed |
| **6** | Full Proposal | Complete product proposal with manufacturing, sourcing, financials, forecast, testing plan | Buyer can sign a contract from this document |
| **7** | Approved | Item approved by buyer but not in stores | PO or LOI signed |
| **8** | Testing Live | In-market tests running | Live in at least one location |
| **9** | Early Growth | Learning from live data, iterating | Sales data, consumer feedback, repeat rate |
| **10** | Scaled Business | Hardened concept, multiple locations/retailers | Managed as a business, not an idea |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Step 11: Stage 3 Deep Research Protocol

Stage 3 is a separate, on-demand invocation — NOT part of a standard 20-idea run. Brady
advances selected Stage 2 ideas (typically 3-10) by saying "deep research on [idea names]"
or by marking them in the viewer. Each idea gets its own focused research pass plus a
concentric-circles variant scan.

**Trigger**: Brady explicitly names Stage 2 ideas to promote. The skill does NOT auto-
promote ideas to Stage 3 — Brady picks.

**Stage 3 Light Pass (advanced-model mode):** Parallel per-idea agents make it feasible
to run a *light* validation pass over ALL Stage 2 survivors in one invocation — each agent
does a compressed version of the deepResearch object (supply chain sniff test, one pricing
sanity check, top risk, go/no-go lean) without the full concentric-circles variant sweep.
Trigger: "light pass on the whole run" / "stage 3 light on everything". Output is a
ranked shortlist with a one-paragraph rationale per idea — its purpose is to help Brady
pick which 3-10 ideas deserve the FULL Stage 3 treatment below, not to replace it.
Light-pass results do NOT advance ideas to Stage 3 in the pipeline DB; only the full
protocol does.

**Per-idea output (adds to the IDEAS record as `deepResearch`):**

```yaml
deepResearch:
  supplyChain:
    # Named suppliers or co-packers that could produce this. Cite supplier-kb entries.
    # Lead times, MOQ ranges, packaging constraints, cold-chain requirements.
  consumerResearch:
    # Real demand signals: search volume, trend data, adjacent category growth,
    # specific consumer quotes/reviews if relevant. No hand-waving.
  pricingModel:
    # Fully loaded unit economics: COGS (from Cost Model) + labor + margin stack
    # from co-man to distributor to retailer. What's the shelf price?
  risks:
    # Top 2-3 concrete risks (regulatory, supply, consumer acceptance, substitution)
  goNoGo:
    # Explicit recommendation + why
  variants:  # CONCENTRIC-CIRCLES REQUIREMENT — see below
    - name: ""
      change: ""    # what parameter moved (size, format, channel, price, occasion)
      rationale: "" # why this might beat the center idea
      promote: false  # true → pull into Stage 2 queue as a new candidate
```

**Concentric-Circles Variant Exploration (REQUIRED for every Stage 3 idea):**

Don't just validate the idea — stress-test the parameters around it. For every Stage 3
idea, emit **3-5 variants** that shift one parameter at a time. Example on "Real Family
Size Lasagna — 15 lb frozen":
- **10 lb version** → smaller fridge footprint, lower sticker shock, broader household fit
- **20 lb version** → bulk/costco play, different retail channel
- **DTC subscription, 30 lb monthly (3x10 lb)** → direct-to-consumer, recurring revenue
- **Single-serve multi-pack** → occasion shift (workday lunch) vs. family-dinner shift
- **Lasagna kit (assemble-at-home)** → format shift, shorter shelf-life but lower CapEx

Rules for variants:
- DO NOT generate images for variants (expensive, redundant — the image logic lives in
  Stage 2). Variants are text-only until promoted.
- If Brady likes a variant, he marks `promote: true` → it enters the Stage 2 pipeline as a
  new candidate idea (gets pitched, imaged, researched from scratch).
- If the variant is clearly worse than the center idea, keep it in the record anyway as
  proof you considered it. Don't silently drop parameter sweeps.

**Invocation pattern:**

1. Brady names the ideas (in chat or via a `stage3` tag in the viewer) → skill loads
   their full Stage 2 records.
2. For each idea, invoke `deep-research` skill with `research_type: concept-validation`
   and the idea's pitch + RTBs + competitive panel as the seed.
3. Emit the `deepResearch` object for each idea, including `variants`.
4. Update the Notion page for each idea (append Deep Research block).
5. Update `idea-library.html` — add `deepResearch` to the idea's record. Viewer renders
   the block conditionally.
6. Brady reviews variants, flags `promote: true` on winners → those re-enter Stage 2.

**Currently queued for first Stage 3 run** (from 2026-04-16 voice note):
butter bricks · dissolvable seasoning sheets · post-workout banana bread · gym rat donut ·
brigadeiro protein bites · phase shift candy · morning protocol RTD · fermented salsa ·
real family size lasagna · cook-once-eat-all-week

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
| **Cluster yield** | For each Category Intel cluster, how many ideas has it produced and what's the average score? Low-yield clusters get archived; high-yield ones get refreshed more often. |
| **Readiness level outcomes** | Do Level 0 (cold-start) runs produce better or worse ideas than Level 2/3 runs? Signal for when deep scans pay off. |
| **Sharpness gate failures** | When the gate fails, was it overridden? Did those runs produce lower-scoring ideas? Detects whether the gate's 5 criteria are actually predictive. |

### How It Influences Future Runs

1. **Method selection**: Weight toward methods with >60% hit rate for the chosen category
2. **Category suggestion**: When running on auto-pilot, suggest the least-explored lane with the highest signal strength
3. **Duplicate detection**: Cross-reference new ideas against the full library. Flag near-duplicates. Force differentiation.
4. **Quality ratchet**: If average score drops below 3.5, inject fresh methods (swap in methods from categories VII-X)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Advanced-Model Execution Layer (added 2026-07-18)

The upgrades marked "advanced-model mode" throughout this skill assume a Claude 5-class
model with subagent orchestration, large context, and native image reading. Summary map:

| # | Upgrade | Lives in | What it replaces |
|---|---------|----------|------------------|
| 1 | Single-context Stage 0 synthesis | Stage 0.3 | Multi-round-trip research aggregation |
| 2 | Idea library loaded at generation | Step 2.0 | After-the-fact duplicate flagging |
| 3 | Parallel blind method fan-out + 3-judge panel | Steps 2.1, 3 | Sequential methods, single-opinion scoring |
| 4 | Adversarial verification (comparables, cost, RTBs) | Step 5.5 | Trusting the generator's own claims |
| 5 | Image QA pass with one re-queue | Step 4 | Manual eyeball at Gate 2 |
| 6 | Full-auto as a supported nightly mode | Gates section | "Full auto" as risky escape hatch |
| 7 | Computed cross-run analytics + policy recommendations | Step 8 | Log-only learning engine |
| 8 | Stage 3 Light Pass over all survivors | Step 11 | All-or-nothing deep research |

**Degradation rule:** every advanced-mode feature has a stated single-thread fallback.
On a constrained harness, the pipeline still runs — it just runs the old way. The
verification pass (Step 5.5) is the one feature that must never be skipped, in any mode.

What does NOT change: Midjourney stays the render engine (MJ-for-photography /
Canva-for-polish is a quality finding, not a model limitation), gates default ON, and
Brady remains the taste layer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Dependencies

| Skill / System | Role |
|----------------|------|
| **deep-research** | Stage 0 scan engine — invoked with `research_type: category-intel` for cold-start / raw-theme / convergence runs |
| **full-stack-ideation** | The 100 methods — this skill selects and runs them in Stage 1 |
| **Subagent orchestration** (Agent/Workflow tooling) | Advanced-model mode: parallel method fan-out (Step 2.1), judge panel (Step 3), verifier agents (Step 5.5), Stage 3 Light Pass. Single-thread fallback documented per step. |
| **midjourney-prompt** | Visual style guidance (category → shot type mapping) |
| **mception-design-system** | Document styling tokens, layout patterns, PDF generation |
| **Canva MCP** | Image generation: generate-design → create-from-candidate → export-design → curl download |
| **Bright Data MCP** | Stage 0 research — scrape anti-bot sources (Reddit, TikTok surface, retail sites, trade show pages) |
| **Exa API** (optional) | Stage 0 semantic trend hunting — `exa_search` / `exa_find_similar`. Install + auth per `references/exa-setup.md`. Falls back to WebSearch when unavailable. |
| **Notion MCP** | Idea pipeline + Category Intel DB sync (Idea Pipeline data source: `d7f77313-3bfc-42e6-9c6d-53aa7d2b2597`; Category Intel DB: TBD pending Phil) |
| **Playwright** | PDF generation from HTML (Tabloid format, print_background=True) |

## Output Files

```
output/
├── innovation-workshop-YYYY-MM-DD.html       (dark mode, per-run deliverable)
├── innovation-workshop-YYYY-MM-DD.pdf        (print-ready, per-run)
├── idea-library.html                         (cumulative viewer — ALL ideas across ALL runs)
├── images/                                   (Run 1 hero PNGs)
├── images-run2/                              (Run 2 hero PNGs)
├── images-runN/                              (Future run PNGs — one folder per run)
references/
├── learning-log.yml                          (cumulative learning data)
```

## External Systems

| System | What It Holds | ID / URL |
|--------|---------------|----------|
| **Notion DB** | Innovation Idea Pipeline (all ideas, stages, notes) | Data source: `d7f77313-3bfc-42e6-9c6d-53aa7d2b2597` |
| **Notion DB** | Category Intel (opportunity clusters — Stage 0 living state) | Data source: `collection://608fdc94-9986-4d63-9f74-22a29a091115` |
| **Vercel (standalone)** | Innovation Lab viewer (idea-library.html) | `innovation-lab-silk.vercel.app` |
| **GitHub repo** | Standalone deploy source | `basdkf024rhlasfd/innovation-lab` |
| **mception.ai** | Portal route `/innovation-lab` | ProjectFrame → Vercel standalone |

## End-to-End Pipeline Summary

The full innovation workshop pipeline runs in this order (numbering matches the `Step N`
headers above):

- **Stage 0: Problem Formation** — query Category Intel DB, detect readiness level (0-3),
  run deep-research (`category-intel` type) if needed, present cluster + alternates + blind
  spots, riff loop with Brady, sharpness gate, write/update cluster in Category Intel DB
- **Step 2: Ideation** — load idea library into context, fan out 8-10 methods as parallel
  blind subagents, generate ~30 raw ideas deduped at generation time
- **Step 3: Score and filter** to ~20 survivors — 3-judge panel (Margin Realist / Novelty
  Maximalist / Ops Skeptic), median score, contested ideas flagged
   ⏸ **GATE 1** — Present survivors with judge spread. Brady applies taste, cuts, approves.
- **Step 4: MJ images** — generate hero images for approved ideas, download locally,
  run Image QA pass (one re-queue on failures)
- **Step 5: Write pitches** — pitch + RTBs + competitive + ops for each idea
- **Step 5.5: Adversarial verification** — parallel verifiers refute comparables URLs,
  cost models, RTB stats, competitive claims; failures fixed or flagged
- **Step 6: HTML assembly** — build per-run deliverable with mception design system
   ⏸ **GATE 2** — Show assembled HTML. Wait for Brady to review.
- **Step 7: PDF generation** — Playwright Tabloid format
- **Step 8: Learning log** — update method performance, category coverage, idea library, cluster yield, readiness-level outcomes, sharpness gate performance; compute cross-run analytics and emit approval-gated policy recommendations
- **Step 9: Notion sync** — push all new ideas to Innovation Idea Pipeline database; update cluster's Linked Ideas relation in Category Intel DB
- **Deploy check** — ask Brady before pushing idea-library.html + new images to mception.ai

**Default: gates are ON.** The pipeline pauses at the Stage 0 sharpness gate, Gate 1, and Gate 2.
If Brady says "run it all" or "full auto" at the start, skip all gates and run end-to-end.

**Full auto is now a supported mode, not just an escape hatch.** With judge-panel scoring
(Step 3), image QA (Step 4), and adversarial verification (Step 5.5) in the pipeline, an
unattended run produces ideas that are already vetted for the failure modes the gates were
built to catch. A nightly full-auto run that lands 20 verified ideas in Notion by morning
is defensible — the gates' value in full-auto shifts to the morning review, where Brady
applies taste to a pre-verified list. Requirements for full-auto: verification pass may
NOT be skipped, `image_qa`/`verification` metadata must be complete, and the run summary
must lead with anything flagged `failed` or `⚡ contested`. Deploy confirmation is still
required — full-auto never auto-publishes to mception.ai.

## What This Skill Does NOT Do

- Replace full-stack-ideation (it orchestrates it, doesn't duplicate the methods)
- Generate ideas without visuals (that's full-stack-ideation standalone)
- Advance past stage gates without Brady's explicit approval (Gates 1 and 2)
- Deploy without Brady's confirmation (always ask before pushing to mception.ai)
- Run without scoring — every idea must survive the filter
- Pitch Brady's background — ideas speak for themselves (see Tone Rule in Step 5)
