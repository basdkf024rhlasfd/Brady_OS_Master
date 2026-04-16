# Stage 0 Quality Gate — The 5-Criteria Sharpness Check

This is the checklist that every cluster must pass before advancing from Stage 0 (Problem
Formation) into Stage 1 (Ideation). It exists for one reason: **Stage 1's 100 ideation
methods produce generic output when they receive a thin framing.** A sharp prompt kills
30-50% of weak ideas before they're ever generated.

The gate is **soft, not hard.** If a criterion fails, the skill surfaces what's weak and
suggests a fix — but Brady can override with "run it anyway" or "send it." The gate advises;
Brady decides.

---

## The 5 Criteria

### 1. Behavioral Shift

**Question:** What are consumers actually doing that brands haven't caught up to?

**Passes when:**
- The shift is specific, observable, and ideally measurable
- It describes a behavior (a verb), not a preference (a noun)
- It can be traced to at least one evidence source (Reddit, TikTok, retail, forum, earnings call)

**Fails when:**
- It's a category label ("health and wellness")
- It's a demographic observation ("Gen Z wants authenticity")
- It's a survey finding without behavioral grounding ("78% say they want X")

**Examples:**
- ✅ "Consumers are self-dosing creatine outside of gym contexts (breakfast, coffee, snacks)"
- ✅ "People are hacking dessert into 'justified nutrition' moments by adding protein powder to everything"
- ❌ "Protein is trending"
- ❌ "Consumers want healthy snacks"

---

### 2. Why Now

**Question:** What specifically opened up in 2026 that wasn't true 18 months ago?

**Passes when:**
- The timing insight points to a concrete recent change (regulatory, supply chain, cultural, price curve, new ingredient approval, retail shelf opening, platform algorithm change)
- The change is reversible-directional — i.e., it's a shift that could plausibly undo, which means timing matters
- It explains why a fast mover wins vs. waiting

**Fails when:**
- The answer is "the market is growing"
- The timing is decade-scale or civilizational ("people are more health-conscious")
- The insight is category creation fantasy without a catalyst

**Examples:**
- ✅ "GLP-1 adoption is collapsing snack volume at the same time creatine is mainstreaming — the smart-macro category opened in mid-2025 and has no entrenched brands yet"
- ✅ "Japanese retail has validated [format X] at 50M unit scale; US grocery shelf logic shifted this year to allow [format] via buyer Y at retailer Z"
- ❌ "People care about health more than ever"
- ❌ "The market is growing double-digits"

---

### 3. Job-to-be-Done (JTBD)

**Question:** What is the consumer hiring this product to do?

**Passes when:**
- The job is a specific functional, emotional, or social outcome
- It's framed as "when [situation] I want to [motivation] so I can [desired outcome]"
- Different products could plausibly fulfill the same job (tells you who the real competition is)

**Fails when:**
- The job is "buy the product" (circular)
- The job is "feel good" (too abstract)
- The job is indistinguishable from 5 other categories

**Examples:**
- ✅ "When I'm slammed between meetings, I want a snack that earns its calories, so I can feel like I'm investing in my body instead of just feeding the hole"
- ✅ "When I hit the 3pm slump, I want a caffeine vehicle that doesn't require a coffee run, so I can keep shipping without disrupting my flow"
- ❌ "Feel better about themselves"
- ❌ "Healthy indulgence"

---

### 4. Margin Location

**Question:** Where does the money get captured — DTC, premium retail, B2B, private label, or mixed?

**Passes when:**
- The answer points to a specific channel where a new entrant can charge a premium or command margin
- The answer is consistent with the behavioral shift and why-now (e.g., if the shift is TikTok-driven, DTC may work; if retail buyers are actively looking for the category, shelf wins)
- It's testable within 90 days at minimum

**Fails when:**
- The answer is "everywhere"
- The answer is "mass retail" by default without a gap analysis
- The answer is "license the IP" (that's exit strategy, not margin capture)

**Examples:**
- ✅ "DTC via Shopify + TikTok Shop — premium pricing ($4-6/unit), fast feedback loop, no retail gatekeeping"
- ✅ "Private label at [regional grocer] — margin captured by being first mover in a white-space category buyer [name] is actively building"
- ❌ "Wherever there's demand"
- ❌ "Mass"

---

### 5. NOT-to-Generate Guardrails

**Question:** What territory must Stage 1 explicitly avoid?

**Passes when:**
- 3-5 specific forms, positioning angles, or clichés are called out to avoid
- Each guardrail is concrete enough that Stage 1's ideation methods can't produce it
- Guardrails come from the cluster's evidence (overcrowded zones, stale tropes, failed adjacent attempts)

**Fails when:**
- No guardrails are listed ("whatever you want")
- Guardrails are stylistic ("don't be boring")
- Guardrails block the cluster itself

**Examples:**
- ✅ "No protein bars, no keto anything, no 'better-for-you' rebrands of junk food, no 'clean label' as a positioning angle, no 'functional' as the headline benefit"
- ✅ "No mason jars, no apothecary aesthetic, no 'grandma's recipe' narrative, no regional heritage claims"
- ❌ (empty)
- ❌ "Don't do anything generic"

---

## Running the Gate

When a cluster is ready for gate review, run through the 5 criteria explicitly. Output format:

```
🚦 STAGE 0 SHARPNESS GATE — [Cluster Name]

1. Behavioral shift ✅ [what it passes on]
   OR
   Behavioral shift ❌ [what's missing and a suggested fix]

2. Why now ✅ [...]
3. JTBD ✅ [...]
4. Margin location ✅ [...]
5. NOT-to-generate guardrails ✅ [...]

VERDICT: [PASS / WEAK — recommend Y / FAIL]

If WEAK or FAIL: you can (a) run more research, (b) riff on the cluster,
(c) pick a different cluster, or (d) override with "run it anyway."
```

If Brady overrides, log `sharpness_gate_override: true` and the specific criteria that
failed to the learning log. This lets us learn whether override runs produce worse ideas
(validating the gate) or comparable ideas (tuning the criteria).

---

## Calibration Over Time

This gate's criteria should evolve based on which runs produce the best ideas. Every 10-15
workshop runs, review the learning log:

- Did runs that passed the gate produce higher-scoring ideas than override runs? → Gate works, keep criteria.
- Did some criterion always pass trivially? → It's too easy; tighten it.
- Did some criterion always fail? → It's unrealistic; loosen or replace it.
- Did Brady override frequently on a specific criterion? → That criterion may be noise; reconsider it.

Log the review outcome in `references/learning-log.yml` under `gate_calibration_notes`.
