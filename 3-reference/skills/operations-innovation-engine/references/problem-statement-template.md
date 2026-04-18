# Problem Statement Template

Every ops innovation run opens with a Problem Statements section. P1-PN is the spine.
All ideas map to at least one P#.

## Format

```markdown
## Problem Statements

Every idea below maps to one of these core problems:

| # | Problem | Evidence | Binding Constraint |
|---|---------|----------|---------------------|
| **P1** | [One-sentence problem] | [2-3 data points with sources] | [labor / capital / time / throughput / format / policy / customer trust] |
| **P2** | ... | ... | ... |
```

## Rules

**Count:** 6-10 problems. Fewer loses breadth. More dilutes focus.

**Distinctness:** Problems must be non-overlapping. If two feel redundant, merge them.

**Concreteness:** Name the specific operational reality. No abstractions.
- ❌ "Brand is weak"
- ✅ "Digital orders flow through a box designed for walk-in customers"
- ❌ "Growth is hard"
- ✅ "Construction takes 6 months per store at a 123-stores/year target"

**Evidence required:** Each problem needs 2-3 data points. Include source where
possible. Pull from:
- deep-research output
- Public filings / earnings calls
- Customer sentiment (reviews, social media, Reddit)
- Competitive benchmarks
- Industry reports

**Binding constraint:** Every problem names ONE primary constraint. This orients which
methods and operator wisdom cards to apply.

| Binding Constraint | Example | Methods/Frameworks that tend to apply |
|---|---|---|
| **Labor** | Can't hire fast enough; wages up 30%; rising turnover | #45 Bottleneck, TOC, Toyota VSM, Foran simplification |
| **Capital** | Build cost too high; CapEx constrained; cash tied up | Thorndike, Bezos letters, PR/FAQ (no-regret pilots) |
| **Time** | Construction cycle, decision cycle, innovation velocity | TOC, VSM, Hoshin Kanri, 4DX |
| **Throughput** | Drive-thru cycle time, orders per hour, inventory turns | TOC, Chipotle throughput, CFA drive-thru |
| **Format** | Can't fit in dense urban / small markets / international | In-N-Out restriction, Japanese counter-service, CFA vertical |
| **Policy** | Regulatory constraints, franchise agreements, supplier contracts | Game Theory, second-order thinking |
| **Customer trust** | Value perception, quality consistency, brand erosion | Danny Meyer, SQDCP, kaizen |

## Problem Generation Prompts

When the first draft of problems feels generic, try these prompts:

1. **SCQA (Situation-Complication-Question-Answer):** State the stable situation, the
   complication that's emerging, the question that forces a decision, and the answer
   space. The complication is the problem.

2. **First Principles (method #3):** Strip every assumption. "Why does a [X] have to be
   [Y]?" — e.g., "Why does a QSR drive-thru have one lane?"

3. **Second-Order (method #41):** What's the downstream effect of the current setup?
   What's the problem two steps from now, not one?

4. **Bottleneck Analysis (method #45):** What's the ONE constraint that limits
   everything else? Fix it and the rest unlocks.

5. **Pre-Mortem (method #73):** Assume 18 months from now the company missed its goal.
   Why? The top 3 "why"s are often the real P1-P3.

## Example (from Panda Run 0)

Source: `1-execution/areas/work-and-business/programs/Consulting/Project - Panda/innovation-workshop-qsr-ops.md`

| # | Problem | Evidence |
|---|---------|----------|
| **P1** | The box was designed for dine-in but the money moved off-premise. | 42% digital sales. 75% of new builds have drive-thru. Dining rooms emptier post-COVID. |
| **P2** | Kitchen labor is the binding constraint on growth. | Hourly wages up 30% in 3 years. Can't hire enough cooks. Throughput limited by human speed. |
| **P3** | Construction is too slow and expensive for the growth target. | 123 new stores/year planned. Traditional build = 6 months. Modular could cut to 60 days. |

Each Panda problem has: one-sentence framing, 2-3 evidence points, an implicit binding
constraint (channel mismatch / labor / time+capital).
