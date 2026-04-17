---
name: operations-innovation-engine
description: |
  Full-stack operations innovation engine — generates 25-35 tiered operational concepts per run
  for a specific company/domain, framed against 6-10 explicit problem statements, scored on
  labor/throughput/scalability/time-to-pilot/feasibility, with pilot specs, precedents sourced
  from an operator wisdom library (~20 canonical cards: TOC, VSM, PR/FAQ, Hoshin Kanri, Kaizen,
  SQDCP, HOM, Danny Meyer, Slootman, Thorndike, Walton + case studies: Chipotle, CFA, In-N-Out,
  Foran). Packaged as HTML + PDF deliverable using mception design tokens. Feeds a recursive
  learning log that tracks method and framework performance across runs.

  TRIGGER THIS SKILL whenever Brady says: "run the ops engine," "operations innovation,"
  "ops innovation," "ops engine on [client]," "ops ideas for [client]," "operational
  innovations for [X]," "how would [Goldratt|Bezos|Foran|Toyota] fix [X]," "format
  innovation workshop," or any variation requesting structured operations ideation for a
  specific company or operational domain.

  This skill ORCHESTRATES full-stack-ideation (methods), its own operator wisdom library
  (canonical ops playbooks), and mception-design-system (document styling). It does NOT
  replace those — it sequences them into a unified ops-innovation pipeline.

  DISAMBIGUATION: For *product* innovation (CPG, consumer goods, physical products with
  buyer-ready visuals), use `innovation-workshop` instead. If Brady says just "innovation
  workshop" without "ops" or "product," ask which engine.
---

# Operations Innovation Engine

25-35 operational innovation concepts per run. Framed against 6-10 problem statements.
Every concept gets a pilot spec, labor/throughput scoring, precedent from canonical
operator wisdom, and risk assessment. Packaged into one document. Feeds a learning
engine that gets smarter with every run.

## Why This Exists

The Innovation Workshop (product side) proved the pipeline works for buyer-ready product
concepts. The Panda Restaurant Group engagement proved the same structure works for
operations — but ops differs in three important ways:

1. **Problem-first, not trend-first.** Ops innovation starts with constraints (labor,
   capital, throughput, format) — not with consumer signals.
2. **Concept-heavy, not visual-heavy.** Ops ideas are processes, tech, formats, and
   org designs. Hero images don't help. Text + tables + prioritization matrix only.
3. **Precedent is the currency.** "Chipotle did this," "Toyota proved this," "Foran's
   radical simplification saved X" — operator wisdom is what separates credible ops
   ideas from wishful thinking.

This skill formalizes the Panda QSR ops workshop pattern into a repeatable engine.

## Execution Environment

**Runs on:** Conductor (preferred) or Claude Code CLI
**Input:** Client/company/domain context — specific ops target
**Output:** Combined HTML + PDF with problem statements, tiered ideas, operator wisdom
references, and prioritization matrix
**Publish:** Local first. mception.ai integration optional, phase 2.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Workflow

### Stage 0: Problem Formation

**The purpose of Stage 0 is to produce a sharp set of P1-PN problem statements that
Step 2 can formalize, not to pick a company.** Step 2's problem-statement generation will
produce generic output if it receives a thin framing. The job here is to make sure it doesn't.

Stage 0 runs in **dialogue mode** — Brady can riff, pivot, mash up pain clusters, or scan
again for as long as he wants. The gate isn't leaving Stage 0; the gate is the **sharpness
check** that the final pain cluster must pass before Step 2 starts.

Built on three principles:
1. **Readiness ladder** — auto-detect how "done" Brady's input is, scale research depth accordingly
2. **Dialogue mode** — Stage 0 is conversation, not a one-shot prompt
3. **Sharpness gate** — exit into Step 2 requires the pain cluster to pass a 5-criteria quality check
   (see `references/stage-0-ops-quality-gate.md`)

This mirrors the Stage 0 pattern in `innovation-workshop` but is tuned for ops (problem-first,
not trend-first).

#### 0.1 Check prior workshop state first

Before doing anything else, check `references/learning-log.yml` for prior runs on the same
client or binding-constraint signature. Also query the Notion **Category Intel DB** (data
source: `collection://608fdc94-9986-4d63-9f74-22a29a091115`) for clusters with `Type =
ops-cluster` and `Status in [Fresh, Active]`. Surface both:

```
📚 PRIOR OPS WORKSHOP CONTEXT
• [Client name] — last run [date]: Tier-1 cluster "[cluster name]" still open
  (binding: [constraint], pilot not started)

📚 ACTIVE OPS CLUSTERS (from Category Intel DB)
• [Cluster] — binding: [constraint], last refreshed [date]

You can:
- Re-run against one of these (say "reopen [cluster]")
- Run fresh (say "new run on [client]" or "what are you seeing?")
```

If nothing applies, skip and treat as cold start.

#### 0.2 Detect readiness level

Read Brady's input and classify into one of four levels. This drives research depth.

| Level | Input signature | Stage 0 runs | Research depth |
|-------|-----------------|--------------|----------------|
| **0 — Cold start** | "What are you seeing in ops?" / "Run the engine on something new" with no client | Scan an industry space (QSR / retail / grocery / food service), surface 3-5 **pain clusters** with binding constraints + evidence + operator mandate | Deep (`deep-research`, type: `category-intel`, ops focus) |
| **1 — Client named, no problems** | "Run the engine on Panda" / "Ops innovations for Sprouts" with just a name | Full research threads (franchise model, labor, format, etc.), extract pain clusters from evidence | Standard |
| **2 — Partial problems** | Brady has 2-3 observed issues but not formal P1-PN ("labor costs are eating them; digital flow is broken") | Light validation — confirm each issue is real with sourced evidence, frame candidate P1-PN statements | Quick |
| **3 — Sharp P1-PN already stated** | Brady hands over 6-10 ready problem statements (from a prior brief, meeting, or his own thinking) | Skip research, run sharpness gate only | None |

When ambiguous, ask Brady which level he's at rather than guessing wrong.

#### 0.3 Run the research (Levels 0-2)

**Level 0 (cold start):** Call `deep-research` with `research_type: category-intel`,
focus: ops. Source profile skews toward operator evidence:
- Earnings transcripts (public ops commentary — cost, labor, throughput, format changes)
- Franchise disclosure documents (unit economics, labor ratios, buildout cost)
- Trade press (QSR Magazine, Nation's Restaurant News, Retail Brew, etc.)
- Operator interviews and podcasts (Acquired, Founders, 20VC ops episodes)
- Conference transcripts (NRF, Expo West ops tracks)
- Labor filings (PERM disclosures, NLRB filings for scale-specific labor signal)
- Patent filings for process / format / tech innovations in the space

Output: 3-5 **pain clusters**, each with binding constraint + evidence + operator mandate +
measurable-win sketch + guardrails.

**Level 1 (client named):** Run research threads (franchise model, labor structure, format
innovation, competitive position, digital channel, supply chain). Add **binding constraint
identification** — for each research thread, name the constraint type surfaced. Feed those
constraints into pain cluster synthesis.

**Level 2 (partial problems):** For each observed issue Brady named, run a quick sourced
validation sweep. Confirm the issue is real with specific evidence. Frame as a candidate
P1-PN — don't skip to Step 2 yet.

#### 0.4 Render synthesis for dialogue

Present results in cluster shape regardless of level:

```
🔍 TOP PAIN CLUSTER: [Name]
  Binding constraint: [labor / capital / time / throughput / format / policy / customer trust]
  Evidence: [3-5 sourced data points]
  Operator mandate: [who in the org cares about this, how recently]
  Measurable win sketch: [what metric, what shift, what time horizon]
  NOT-to-generate: [ops theater and obvious plays to exclude]

📊 ALTERNATE CLUSTERS (shorter)
  • [Cluster B] — [binding: X, 1-line evidence hook]
  • [Cluster C] — [binding: X, 1-line evidence hook]

🔗 CROSS-CLUSTER OPPORTUNITIES
  [1-2 observations about how clusters interact or compound]

❓ WHAT I'M NOT SEEING
  [Explicit blind spots — push back if you have field signal I don't]
```

#### 0.5 Dialogue loop

Brady can respond with any of:
- **"Use [cluster]"** — advance to sharpness gate on that cluster, then Step 2
- **"Combine A with B"** — mash up: produce a merged cluster, re-check gate
- **"Pivot — what about [Brady's angle]"** — re-scan with Brady's override as new focus
- **"Show me more alternates"** — surface next-tier clusters from the evidence pool
- **"Run the sharpness gate"** — explicit gate check before advancing
- **"Override — run it anyway"** — bypass gate, proceed to Step 2 (logged to learning log)
- **"Show full research"** — dump the underlying evidence pool for browsing

Cache the research artifacts so cluster recombination doesn't require a fresh scan. Only a
full pivot triggers re-research.

#### 0.6 Sharpness gate (exit criterion)

Before advancing to Step 2, the selected pain cluster must pass the ops sharpness gate —
5 criteria in `references/stage-0-ops-quality-gate.md`:

1. **Binding constraint named** (specific, not "brand is weak")
2. **Evidence sourced** (metrics / quotes / incidents, each cited)
3. **Operator mandate** (who can fund the fix, how recently did they signal)
4. **Measurable win** (metric + shift + time horizon)
5. **NOT-to-generate guardrails** (ops theater and obvious plays excluded)

Run the gate, output the verdict. **Soft gate, not hard** — Brady can override with
"run it anyway," which logs `sharpness_gate_override: true` to the learning log.

**Only after gate passes (or is overridden) does Stage 0 close and Step 2 open.**

### Step 2: Problem Statement Generation — REQUIRED

Produce **6-10 problem statements** as a table, drawn from the pain cluster that passed
the Stage 0 sharpness gate. Every idea below MUST reference at least one P#.

**Format:**

| # | Problem | Evidence | Binding Constraint |
|---|---------|----------|---------------------|
| **P1** | One-sentence problem statement | 2-3 data points with source | labor / capital / time / throughput / format / policy / customer trust |

**Rules:**
- 6-10 problems. Fewer = not enough breadth. More = not enough ruthlessness.
- Problems must be DISTINCT. If two overlap, merge them.
- Problems must be CONCRETE. "Brand is weak" is out. "Digital orders flow through a box
  designed for walk-in customers" is in.
- Evidence must be sourced. Pull from the research threads in Step 1.
- Name the binding constraint. This orients method + framework selection.

**If the first pass of problems feels generic:** Run problem-generation methods from
full-stack-ideation before moving on — #1 SCQA, #3 First Principles, #41 Second-Order,
#45 Bottleneck Analysis. Re-state problems in the constraint's own language.

This step is load-bearing. Do not shortcut it.

### Step 3: Method + Framework Selection

**Pick 6-8 methods from full-stack-ideation.** Default ops-biased cluster:
- #3 First Principles Thinking
- #5 Value Chain Expansion
- #8 Constraint-Based Ideation
- #32 Platform Thinking
- #41 Second-Order Thinking
- #42 Game Theory Lens
- #45 Bottleneck Analysis
- #49 Margin Stack Thinking
- #71 War Gaming
- #73 Pre-Mortem

Adjust based on the problem signatures. If P1-PN is mostly labor/throughput, lean on
#45, #3, #8. If mostly competitive format response, lean on #42, #71.

**Pick 3-5 operator wisdom cards from `references/operator-wisdom/`.** Load `INDEX.md`
first — it maps problem signatures → cards. Common triggers:

| Problem signature | Cards to load |
|---|---|
| Throughput / bottleneck | toc-five-focusing-steps, the-goal-flow-economics, chipotle-throughput-model |
| Labor constraint | value-stream-mapping, toyota-way-pillars, kaizen-gemba, foran-radical-simplification |
| Format/channel innovation | pr-faq, working-backwards-bar-raiser, cfa-drive-thru-model |
| Menu/SKU complexity | in-n-out-menu-restriction, toc-five-focusing-steps |
| Org alignment / execution | high-output-management, okrs-plus-4dx, hoshin-kanri, slootman-amp-it-up |
| Shop-floor quality | sqdcp-boards, kaizen-gemba, danny-meyer-hospitality |
| Capital allocation / portfolio | thorndike-capital-allocation, bezos-shareholder-letters |
| Retail / real estate | sam-walton-retail-doctrine, foran-radical-simplification |
| Customer-facing ops | danny-meyer-hospitality, cfa-drive-thru-model, jobs-to-be-done-ops |

Announce selected methods + cards with a one-line rationale before generating.

### Step 4: Idea Generation

Target **40-50 raw ideas**. Each tagged with:
- Problem reference (P#)
- Method (full-stack-ideation #)
- Framework card (operator wisdom filename, if any)

Run each method against each relevant problem. Don't force mappings — if a method
doesn't illuminate a given problem, skip it.

### Step 5: Score and Tier

Apply the ops scoring rubric in `references/scoring-rubric.md`. Five criteria:

| Criterion | Weight | 1 | 3 | 5 |
|---|---|---|---|---|
| Labor / Cost Impact | 25% | <2% savings | 5-10% or payback <24mo | >15% or structural cost-curve reset |
| Throughput / Speed Impact | 20% | Marginal | 10-20% gain | >30% gain or unlocks new format |
| Scalability | 20% | One location | Region/cluster | All locations + international export |
| Time-to-Pilot | 15% | >12 months | 3-9 months | <90 days |
| Risk-Adjusted Feasibility | 20% | Major regulatory/tech/capital risk | Moderate known risks, proven precedent | Low risk, strong precedent, reversible pilot |

**Composite = weighted average, 1.0-5.0.**

**Quality floor:** Auto-cut any idea with a 1 on Feasibility or 1 on Labor/Cost Impact
regardless of composite.

**Tier the survivors** (`references/tier-thresholds.md`):

| Tier | Composite | Treatment |
|---|---|---|
| Tier 1 | ≥4.0 | Full page, highlighted in exec summary |
| Tier 2 | 3.5-3.9 | Full page, normal treatment |
| Tier 3 | 3.0-3.4 | Condensed: name + one paragraph + first move |
| Cut | <3.0 | Learning log only, not in document |

Target distribution: 6-10 Tier 1, 10-15 Tier 2, 5-10 Tier 3 (25-35 total survivors).
If Tier 1 <5, scoring/methods didn't fit the problem set — record signal in learning log.

### ⏸ GATE 1 — Vet Tiered Survivor List

**STOP HERE.** Present the output as a tree:

```
P1 — [problem statement]
  ├─ [Tier 1] #1 Idea Name (score 4.3) — method #45, card: toc-five-focusing-steps
  ├─ [Tier 2] #5 Idea Name (score 3.8) — method #3, card: first-principles
  └─ ...
P2 — [problem statement]
  ├─ ...
```

Brady can:
- Cut weak ideas
- Swap in alternates from the pre-tier raw pool
- Move ideas between tiers
- Add problems or re-frame existing ones
- Say "go" to advance

**Do NOT proceed to Step 6 unless Brady explicitly approves.**

**Escape hatch:** "run it all" / "full auto" at the start of the workshop skips both gates.

### Step 6: Visuals — None by default

Ops is concept-heavy, not image-heavy. **No Canva. No Midjourney.** Text + tables only.

**What goes in the document:**
- One inline SVG **prioritization matrix** (effort × impact) in the exec summary —
  ~4 quadrants with idea #s positioned by score
- Optional inline **Mermaid flow diagram** for process-specific ideas — only if it
  adds clarity
- All tables and copy rendered in the mception design system (dark mode HTML, light
  mode PDF)

This is the biggest deviation from the product workshop. It saves time, saves tokens,
and matches the concept-heavy nature of ops innovation.

### Step 7: Write Idea Pages

For each Tier 1 and Tier 2 idea, write these sections. For Tier 3, write condensed
(What + Why now + First move only).

**Section template:**

- **What** (2-3 sentences) — the innovation in plain language
- **Why now** (1-2 sentences) — the trend, data point, or trigger that makes this timely
- **Pilot spec** — locations (#), duration (weeks/months), instrumentation (what you
  measure), success metric (the threshold)
- **Labor / Throughput / Cost impact** — quantified where possible, "estimated ~X% at
  scale" where not
- **Precedent** — who has done this (sourced from operator wisdom cards), with specific
  numbers/outcomes where available
- **Competitive landscape** — who else might do this, who's already moving, copyability
- **Ops complexity** — Simple / Moderate / High / Very High + one sentence
- **Risk / failure modes** — 2-3 specific ways this fails (borrow from #73 Pre-Mortem)
- **Method + framework attribution** — method #, card name(s)

**Tone rule:** Lead with the idea and the precedent. Do NOT pitch Brady's background as
a selling point. If a specific Brady relationship (Fuad Hannon, James Ku's Walmart RE
contacts, etc.) is directly relevant to feasibility, mention briefly in context — never
as a braggadocious callout.

### Step 8: Assemble Document

Use mception design tokens (`3-reference/skills/mception-design-system/SKILL.md`).

**Page break protocol (CRITICAL):**
- `.idea-page { page-break-before: always; page-break-inside: avoid; }`
- Header, pilot spec, precedent, and risks stay together
- Test by printing to PDF — no idea splits

**Font hierarchy (CRITICAL):**
- Cover title: 64px Space Grotesk 700
- Section headers (PROBLEM STATEMENTS, IDEAS, etc.): 12px JetBrains Mono uppercase, 4px letter-spacing
- Problem/Idea title: 36px Space Grotesk 700
- Sub-section labels (Pilot spec, Precedent, etc.): 12px JetBrains Mono uppercase, 3px letter-spacing
- Body: 14px DM Sans
- Tag chips (tier, method, card): 10px JetBrains Mono
- Sources: 9px JetBrains Mono

**Document structure:**

```
COVER PAGE
├── Title: "Operations Innovation Engine — [Client/Topic] — [Date]"
├── Subtitle: "[N] Operational Concepts, Tiered"
├── mception.ai branding

EXECUTIVE SUMMARY (1-2 pages)
├── Top 5 "Do Now" ideas (name + one-liner + score)
├── Top 5 "Explore Further" ideas
├── SVG prioritization matrix (effort × impact)
├── Key themes across all ideas

PROBLEM STATEMENTS (1-2 pages)
├── P1-PN table with evidence + binding constraint
├── Short narrative framing each problem

TIER 1 IDEAS (full detail pages)
TIER 2 IDEAS (full detail pages)
TIER 3 IDEAS (condensed — name, paragraph, first move only)

APPENDIX — METHODOLOGY (2-3 pages)
├── Methods used + rationale
├── Operator wisdom cards referenced (1-page digest of each card used)
├── Research threads from Step 1
└── Sources (full citation table)
```

### ⏸ GATE 2 — Review Before PDF

**STOP HERE.** Show Brady the assembled HTML file path. Wait for feedback.

Brady can request layout fixes, copy edits, idea re-ordering, tier moves. Say "looks
good" to advance.

**Escape hatch:** Same as Gate 1.

### Step 9: Generate PDF

Playwright, Tabloid format, light mode conversion, `print_background=True`:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'file:///path/to/light_version.html')
    page.pdf(
        path='ops-innovation-[client]-[date].pdf',
        format='Tabloid',
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

### Step 10: Update Learning Log + Notion Sync + Cumulative Viewer

**Learning log** (`references/learning-log.yml`):

```yaml
- run_id: "[client]-YYYY-MM-DD"
  date: "YYYY-MM-DD"
  client: "[Client or Topic]"
  input_source: "[how the run was initiated]"
  problems_identified: 8
  methods_used: [3, 5, 8, 32, 41, 45]
  frameworks_used:
    - "toc-five-focusing-steps"
    - "chipotle-throughput-model"
    - "foran-radical-simplification"
  ideas_generated: 45
  ideas_surviving: 28
  tier_distribution: { tier_1: 8, tier_2: 12, tier_3: 8 }
  top_picks:
    - name: "Digital Lane Splitter"
      tier: 1
      method: 9
      frameworks: [chipotle-throughput-model]
      score: 4.4
  method_performance:
    45: { ideas_raw: 6, survivors: 5, hit_rate: 0.83, notes: "..." }
  framework_performance:
    toc-five-focusing-steps: { ideas_anchored: 4, survivors: 4, hit_rate: 1.00, notes: "..." }
  problem_coverage:
    P1: 6
    P2: 5
    ...
  learnings:
    - "..."
```

**Notion sync** — "Ops Innovation Pipeline" database under Consulting Practice
(parent: `333ed43b89c58123b019d1d108c53c11`):
- Data source ID: `{RECORD AFTER FIRST CREATION}`
- Push all Tier 1/2/3 ideas with full metadata (see schema below).

If the database doesn't exist yet, create it with `notion-create-database` on first run.
Record the data source ID back into this SKILL.md.

**Cumulative viewer** — `output/ops-library.html`:
- Append new ideas to the IDEAS array
- Preserve all existing ideas — append only
- Each idea: tier, score, problem refs, method, frameworks, full text of all sections,
  client, run ID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Stage Gate Definitions

Ideas move through these stages. No idea skips a stage.

| Stage | Name | Meaning | Exit Criteria |
|---|---|---|---|
| **0** | Problem Framed | Problem statement exists with evidence | Has P# + binding constraint |
| **1** | Concept | Text idea exists, unscored | What + Why now written |
| **2** | Scored + Tiered | Passed scoring rubric, placed in a tier | Composite ≥ 3.0 |
| **3** | Spec'd | Pilot spec written: locations, duration, metrics | Pilot spec ≥ 3 sentences with specifics |
| **4** | Pilot Designed | Detailed pilot plan, budget, timeline, owners | Client has signed pilot plan |
| **5** | Pilot Running | In-market execution at ≥1 location | Data collection live |
| **6** | Pilot Validated | Hit success metric or hit kill criteria | Go / no-go decision made |
| **7** | Scaled | Rolling out beyond pilot | Active rollout at >5 locations |
| **8** | Operationalized | Standard practice, no longer "innovation" | Playbook exists, team trained |
| **Killed** | Dead | Stopped at any stage with reason | Reason recorded in learning log |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Recursive Learning Engine

`references/learning-log.yml` grows with every run.

### What It Tracks

| Signal | How It's Used |
|---|---|
| Method hit rate | Which full-stack-ideation methods produce ideas that survive for ops contexts? |
| Framework hit rate | Which operator wisdom cards anchor the highest-tier ideas? |
| Problem type coverage | Which binding constraints (labor, capital, format, etc.) appear most? |
| Tier distribution | Is scoring calibrated? Are we getting enough Tier 1s? |
| Client/industry coverage | Which industries have been worked? Which are underexplored? |
| Idea library | Cumulative list. Prevents repeating ideas across runs for the same client. |

### How It Influences Future Runs

1. **Method selection:** Weight toward methods with >60% ops hit rate
2. **Framework selection:** Load cards with highest hit rate first
3. **Problem calibration:** If Tier 1 <5, the problem set may be too narrow or methods
   mismatched — signal to recalibrate
4. **Industry rotation:** Auto-pilot mode suggests underexplored industries

### Run 0 — Panda Restaurant Group

The Panda QSR ops workshop (at `1-execution/areas/work-and-business/programs/Consulting/
Project - Panda/innovation-workshop-qsr-ops.md`) is the inaugural run. Its 32 ideas,
method hit rates, problem coverage (P1-P10), and framework references are seeded into
`learning-log.yml` as `run_id: panda-2026-04-15`. Future runs inherit this baseline.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Operator Wisdom Library

The library lives at `references/operator-wisdom/`. ~20 one-page cards.

**Entry point: `INDEX.md`** — maps problem signatures → cards, lists all cards with
one-line core principles.

**Card categories:**

- **Core ops frameworks:** TOC, The Goal, VSM, Toyota Way, High Output Management,
  Kaizen/Gemba, SQDCP, JTBD-ops
- **Amazon stack:** PR/FAQ, Working Backwards + Bar Raiser, Bezos shareholder letters
- **Strategic alignment:** Hoshin Kanri, OKRs + 4DX
- **Culture + intensity:** Danny Meyer hospitality, Slootman Amp It Up, Thorndike
  capital allocation
- **Retail doctrine:** Sam Walton, Foran radical simplification
- **Case studies:** Chipotle throughput, Chick-fil-A drive-thru, In-N-Out menu restriction

Each card follows this template:
```markdown
# [Framework Name]
**Source:** [Book / Company / Person]
**Core principle** (one sentence)

## When to apply
- 3-4 problem signals

## The framework
- Steps/mechanics

## Canonical example
- How it was applied, with numbers

## Applied to QSR / retail / ops
- 2-3 sentences translating to Brady's domain

## Common failure modes
- What goes wrong

## Reading
- Primary source
```

Cards are reusable outside this skill — `deck-generator`, `content-publishing-kit`,
`exec-intel-brief` can all cite them.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Dependencies

| Skill / System | Role |
|---|---|
| **full-stack-ideation** | 100 methods — this skill selects 6-8 per run |
| **operator wisdom library** (internal) | 20 canonical ops playbook cards — this skill loads 3-5 per run |
| **mception-design-system** | Document styling, page break rules, color palette, font stack |
| **deep-research** | Fact base for Step 1 (silent mode, company/competitive-analysis research type) |
| **Notion MCP** | Ops Innovation Pipeline database sync |
| **Playwright** | PDF generation (Tabloid, light mode, print_background) |

**Explicitly NOT used:**
- Canva MCP (no product hero images)
- Midjourney (no photorealistic renders)
- midjourney-prompt skill (product-specific prompt construction, not relevant)

## Output Files

```
output/
├── ops-innovation-[client]-YYYY-MM-DD.html   (dark mode per-run deliverable)
├── ops-innovation-[client]-YYYY-MM-DD.pdf    (light mode, Tabloid, print-ready)
├── ops-library.html                          (cumulative viewer across all runs)
references/
├── learning-log.yml                          (cumulative learning data, seeded with Panda Run 0)
├── scoring-rubric.md
├── tier-thresholds.md
├── problem-statement-template.md
└── operator-wisdom/                          (20 cards + INDEX.md)
```

## Deployment (ops-lab viewer)

| Surface | Value |
|---|---|
| GitHub repo | `basdkf024rhlasfd/ops-lab` |
| Local path | `/tmp/ops-lab/` |
| Vercel project | `ops-lab` (under `bradysmallwood-7504s-projects`) |
| Prod alias | `ops-lab-tau.vercel.app` |
| mception.ai route | **Not yet wired** — pending portal integration in mception-ai repo |
| Allowlist | **Not yet added** — `3-reference/publishing/mception-ai-projects.yml` entry required if making portal-visible |

Deploy is currently behind Vercel SSO by default. For portal-iframe serving, Deployment
Protection must be disabled on the project (or configured for iframe access). Access
control then handled by mception.ai Clerk auth + `MCEPTION_OPS_LAB_EMAILS`.

## Notion Database — Ops Innovation Pipeline

| Field | Type | Notes |
|---|---|---|
| Idea | Title | |
| Client | Select / Relation | Panda, Kroger, Walmart, etc. |
| Run Date | Date | |
| Run ID | Text | e.g. `panda-2026-04-15` |
| Tier | Select | 1 / 2 / 3 |
| Composite Score | Number | 1.0-5.0 |
| Problem(s) | Multi-select | P1-P10 per run |
| Method | Multi-select | full-stack-ideation method #s |
| Framework | Multi-select | operator wisdom card names |
| Stage | Select | Concept / Spec'd / Pilot Designed / Pilot Running / Validated / Scaled / Operationalized / Killed |
| Labor Impact | Select | Low / Medium / High / Very High |
| Throughput Impact | Select | Low / Medium / High / Very High |
| Time to Pilot | Select | <90d / 3-9mo / >9mo |
| Ops Complexity | Select | Simple / Moderate / High / Very High |
| Pilot Spec | Text | locations, duration, metrics |
| Page body | (body) | Full pitch, precedent, risks, attribution |

**Parent:** Consulting Practice page (`333ed43b89c58123b019d1d108c53c11`).
**Data source ID:** `2e5afd84-837e-4b07-83d8-09f56ddd7284`
**Database URL:** https://www.notion.so/802eb283427f42278342ee3ffcc7bff0

## End-to-End Pipeline Summary

1. **Problem intake** — client/company context + optional deep-research fact base
2. **Problem Statements** — generate P1-PN with evidence + binding constraint
3. **Method + framework selection** — 6-8 methods + 3-5 cards with rationale
4. **Idea generation** — 40-50 raw, tagged to P# + method + framework
5. **Score and tier** — ops rubric → 25-35 survivors, Tier 1/2/3
   ⏸ **GATE 1** — Brady vets tiered list. Wait for approval.
6. **No visuals** — text + tables + one SVG prioritization matrix
7. **Write idea pages** — What / Why now / Pilot spec / Impact / Precedent / Competitive / Complexity / Risk
8. **Assemble HTML** — mception design system, page break rules, font hierarchy
   ⏸ **GATE 2** — Brady reviews HTML. Wait for approval.
9. **Generate PDF** — Playwright Tabloid light mode
10. **Learning log + Notion sync + ops-library.html append**

**Default: gates are ON.** "Run it all" / "full auto" at the start skips gates.

## What This Skill Does NOT Do

- Generate product ideas (use `innovation-workshop` instead)
- Generate Canva or Midjourney images (ops is concept-heavy, text-only)
- Advance past Gates 1 or 2 without Brady's explicit approval
- Deploy to mception.ai (local-only v1; viewer deployment is a future phase)
- Pitch Brady's background as a selling point — ideas and precedents speak for themselves
- Run without problem statements — P1-PN is non-negotiable
- Skip operator wisdom — every run loads at least 3 cards
