# Stage 0 Ops Quality Gate — The 5-Criteria Sharpness Check

This is the ops-side parallel to `3-reference/skills/innovation-workshop/references/stage-0-quality-gate.md`.
Same 5-criteria structure, same soft-gate semantics, but tuned for operational problem
formation rather than consumer behavioral clusters.

---

This is the checklist that every pain cluster must pass before advancing from Stage 0
(Problem Formation) into Step 2 (Problem Statement Generation). It exists for one reason:
**Step 2's 6-10 problem statements — and everything downstream, from ideation methods to
pilot specs — produce generic output when they receive a thin cluster framing.** A sharp
cluster kills 30-50% of weak ideas before they're ever generated.

The gate is **soft, not hard.** If a criterion fails, the skill surfaces what's weak and
suggests a fix — but Brady can override with "run it anyway." The gate advises; Brady decides.

---

## The 5 Criteria

### 1. Binding Constraint Named

**Question:** What is the specific constraint this cluster is bound by?

**Passes when:**
- The constraint maps to one of: labor / capital / time / throughput / format / policy / customer trust
- The constraint is observable — someone on the operator side could point to it
- The constraint orients method + framework selection (e.g., "throughput" → TOC + Chipotle model)

**Fails when:**
- The answer is "brand" or "culture" or "strategy" (too abstract)
- Multiple constraints named without a binding one (suggests cluster isn't tight enough)
- The constraint doesn't suggest a method or framework family

**Examples:**
- ✅ "Binding: labor — FOH wage pressure + turnover are compounding at scale; every new
  unit amplifies the cost"
- ✅ "Binding: throughput — digital orders flow through the same station as walk-in,
  and the station caps out at 90 OPH"
- ❌ "Binding: the business is getting worse"
- ❌ "Binding: competition is heating up"

---

### 2. Evidence Sourced

**Question:** What is the concrete evidence that this cluster is real?

**Passes when:**
- 3-5 specific data points (metrics, quotes, incidents, filings, transcripts)
- Each is cited to a source (earnings call line, franchise disclosure page, trade press
  article, field interview, operator podcast quote)
- Evidence is recent enough to still be valid (typically <18 months)

**Fails when:**
- Evidence is a generic industry stat without specific tie ("QSR labor is tight" — duh)
- Evidence is inferred but not cited ("I bet they're struggling with X")
- Evidence is dated or from a structurally different period

**Examples:**
- ✅ "Chipotle Q3 2025 earnings: 'labor cost as % of revenue was 25.1%, up 80bps YoY…
  we're offsetting with unit-level throughput gains.' Plus 2024 franchise disclosure
  showing avg hours/week per unit up from 430 to 478."
- ✅ "James Ku field note from Panda Innovation Hills visit, Feb 2026: bowling station
  is the bottleneck; two-person pod failing at peak."
- ❌ "The restaurant industry is facing labor shortages."
- ❌ "They probably have supply chain issues."

---

### 3. Operator Mandate

**Question:** Who in the client org cares about fixing this, and how recently did they signal?

**Passes when:**
- A specific role or name is identified (CEO / COO / President of [unit] / franchisee council)
- There's a signal they care — recent public statement, earnings call mention, meeting
  note, or field interview quote
- The role has funding authority or can unlock it

**Fails when:**
- "Everyone cares" (so no one will fund it)
- The signal is ancient (pre-2024 for current cycle problems)
- The role lacks funding authority (e.g., "the store manager cares" for a systemwide change)

**Examples:**
- ✅ "Panda's President of Innovation, in Feb 2026 meeting with Brady, explicitly flagged
  bowling station as the store-level rollout blocker."
- ✅ "Chipotle CEO on Q3 2025 call named unit-level throughput as the #1 margin lever
  for 2026 — already funding the Autocado + Hyphen pilots."
- ❌ "Corporate cares about efficiency."
- ❌ "The CFO mentioned costs once in 2022."

---

### 4. Measurable Win

**Question:** What metric shifts, by how much, and over what time horizon?

**Passes when:**
- A specific metric is named (GP% / labor % / OPH / ticket time / unit economics / etc.)
- The target shift is quantified (absolute or %) — even if the estimate has a wide range
- The time horizon is pilot-sized (90 days / 6 months / 12 months), not "eventually"

**Fails when:**
- "Improve efficiency" (no metric, no shift, no horizon)
- The metric isn't measurable at the pilot scope
- The shift is described only qualitatively ("meaningfully better")

**Examples:**
- ✅ "Labor % of revenue from 25.1% → 22.5-23.5% over 6-month pilot across 4 units
  (~150-250bps reduction, rolling into systemwide if hit)"
- ✅ "Digital OPH from 90 → 140+ at peak, measured at 2 Innovation Hills stores, 90-day pilot"
- ❌ "Labor will improve"
- ❌ "Long-term margin expansion"

---

### 5. NOT-to-Generate Guardrails

**Question:** What ops theater and obvious plays must Step 2/3/4 explicitly avoid?

**Passes when:**
- 3-5 specific operational moves, positioning angles, or tropes are called out
- Each guardrail is concrete enough that ideation methods can't sneak it back in
- Guardrails come from the cluster's evidence (operator has already tried and failed, or
  obvious play is already committed)

**Fails when:**
- No guardrails are listed (opens the door to ops theater)
- Guardrails are stylistic ("don't be boring")
- Guardrails block the cluster itself (tautology)

**Examples:**
- ✅ "No 'automate the drive-thru with AI voice' (already deployed, saturating the space),
  no 'kiosk-only order flow' (failed at 12-unit pilot per their 2025 disclosure), no
  'cut SKU count by 30%' (already committed in the 2026 plan), no generic 'franchise
  accountability scorecards' (4DX deck already exists), no rebranding the POS"
- ✅ "No 'train the managers better,' no 'improve employee retention with benefits,' no
  'add a second drive-thru lane' (capex constraint makes this Tier-4 at best), no
  'acquire a competitor' (out of scope for ops engine)"
- ❌ (empty)
- ❌ "Don't do anything generic"

---

## Running the Gate

When a pain cluster is ready for gate review, run through the 5 criteria explicitly.
Output format:

```
🚦 STAGE 0 OPS SHARPNESS GATE — [Cluster Name]

1. Binding constraint ✅ [what it passes on]
   OR
   Binding constraint ❌ [what's missing and a suggested fix]

2. Evidence ✅ [...]
3. Operator mandate ✅ [...]
4. Measurable win ✅ [...]
5. NOT-to-generate guardrails ✅ [...]

VERDICT: [PASS / WEAK — recommend Y / FAIL]

If WEAK or FAIL: you can (a) run more research, (b) riff on the cluster,
(c) pick a different cluster, or (d) override with "run it anyway."
```

If Brady overrides, log `sharpness_gate_override: true` and the specific criteria that
failed to `references/learning-log.yml`. This lets us learn whether override runs produce
weaker pilots (validating the gate) or comparable outcomes (tuning the criteria).

---

## Calibration Over Time

This gate's criteria should evolve based on which runs produce the strongest pilots.
Every 10-15 ops workshop runs, review the learning log:

- Did runs that passed the gate produce more Tier-1 ideas than override runs? → Gate works.
- Did some criterion always pass trivially? → Too easy; tighten it.
- Did some criterion always fail? → Unrealistic; loosen or replace.
- Did Brady override frequently on a specific criterion? → That criterion may be noise.

Log outcomes in `references/learning-log.yml` under `gate_calibration_notes`.

---

## Product-side parallel

This gate mirrors the 5-criteria sharpness gate in the product innovation workshop
(`3-reference/skills/innovation-workshop/references/stage-0-quality-gate.md`). The shapes
are parallel, the semantics are different:

| Product-side criterion | Ops-side criterion |
|------------------------|---------------------|
| Behavioral shift | Binding constraint named |
| Why now | Evidence sourced |
| JTBD | Operator mandate |
| Margin location | Measurable win |
| NOT-to-generate guardrails | NOT-to-generate guardrails (shared) |

If you find yourself drifting on one side, look at the other — often the same structural
fix applies.
