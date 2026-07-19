# Skills — the pre-built processes

Each folder here holds a `SKILL.md` — a step-by-step process that turns an input into a
shippable deliverable. You invoke one by naming it in plain English to Claude Code; Hunter loads
the `SKILL.md` and follows it. Drop your raw input in the matching `intake/` folder first.

## The catalog

**Diagnose (start here on a new engagement)**
- **`talent-strategy-diagnostic`** — the front door. Interview notes + data → funnel diagnosis,
  root-cause findings, a prioritized roadmap, and which skills to run next.

**Talent acquisition (the wedge)**
- **`jd-optimizer`** — role notes / weak posting → conversion-optimized, compliance-checked,
  ready-to-post JD + sponsored version + pre-apply screener.
- **`interview-guide-builder`** — JD/role → scorecard + anchored rubric + question bank +
  do-not-ask list + a manager run-sheet.
- **`candidate-screener`** — resumes / screening videos → transparent ranked shortlist +
  advance/hold/pass + a daily "reach out to these today" digest.
- **`phone-ai-interviewer`** — role → a complete, deployable autonomous voice-screen: flow,
  script, build spec, compliance, pilot plan.

**Strategic resource planning**
- **`workforce-plan`** — roster + growth plan → headcount model, backfill/turnover forecast, req
  plan, build-vs-buy, org-design options.

**Training & development**
- **`onboarding-ramp`** — role → 30/60/90 onboarding + ramp-to-productivity plan + training checklist.

**Culture**
- **`culture-diagnostic`** — interview/survey/review data → culture read, values articulation,
  engagement action plan.

**Total rewards**
- **`total-rewards`** — comp/benefits inputs → total-rewards statement, comp band, commission-plan
  review, benefits benchmark.

**People analytics (cross-cutting)**
- **`people-analytics`** — roster/exit/funnel data → turnover, quality-of-hire, time-to-fill,
  source-effectiveness, and bonus-leakage views.

## How they fit together

```
                 talent-strategy-diagnostic   ← drop discovery here first
                          │  routes to ↓
   ┌──────────────┬───────────────┬──────────────┬───────────────┐
 jd-optimizer  interview-guide  candidate-      phone-ai-      workforce-plan
      │          -builder        screener       interviewer         │
      └───────→ feeds ───────→ scorecard ──→ feeds digest ──→   onboarding-ramp
                                                                culture-diagnostic
                                                                total-rewards
   people-analytics instruments the whole funnel and feeds every skill above.
```

Typical first engagement: `talent-strategy-diagnostic` → `jd-optimizer` → `interview-guide-builder`
→ `candidate-screener` → (when ready for the wow) `phone-ai-interviewer`.

## Writing a new skill

Copy an existing `SKILL.md` as the pattern. Keep the frontmatter (`name`, `trigger`, `input`,
`output`, `mode`), a clear numbered **Process**, an **Output spec**, a **Quality bar**, and
**Guardrails** (compliance + no-auto-decisions + no-fabrication). Add a line to this catalog and
to the routing table in the root `CLAUDE.md`.
