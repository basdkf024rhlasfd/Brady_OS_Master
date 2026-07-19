---
name: people-analytics
trigger: "people analytics", "turnover", "quality of hire", "funnel metrics", "time to fill", "source effectiveness"
input: roster / exit / funnel / ATS-export / source data (CSV or pasted tables) in intake/data/
output: deliverables/people-analytics-<subject>-YYYY-MM-DD.md (tables + a "so what / do this" per view)
mode: Build
---

# People Analytics

Turns roster, exit, funnel, ATS-export, and source data into **clear views with a one-line "so what /
do this" on each** — the instrumentation layer under the whole kit. It answers *where the leak is*
before anyone spends money to fix it: turnover, quality-of-hire, time-to-fill and time-to-first-contact,
source effectiveness, funnel conversion, and the attach "money left on the table" gap.

**It computes; it doesn't decide.** Every number ties to the data you gave it, and every view ends with a
recommendation for a human to action — not a change made automatically.

## Why it matters here

The recruiting pain is diagnosed backwards more often than not. The pool is fine, so the instinct is to
buy more top-of-funnel — but the leak is in the *middle* (slow time-to-first-contact, nobody working the
pipeline) and in *retention* (schedule-driven RSA turnover). **More applicants never fix a mid-funnel or
retention leak — it just adds cost.** This skill makes the leak visible: it's what steers the finite
sponsorship budget, tells you whether a location's problem is hiring or holding, and quantifies the
add-on discipline gap that separates a $60K writer from a $1M writer. It also replaces the opaque ATS
"fit score" with math you can see.

## Inputs (drop in `intake/data/`)

CSV exports or pasted tables — whatever the client can pull, however messy. Common sources:

- **Roster** — active + terminated employees: role, location, hire date, term date, term reason
  (voluntary/involuntary), tenure. Feeds turnover, early attrition, quality-of-hire.
- **Exit / termination data** — reason, tenure at exit, voluntary vs. involuntary.
- **Funnel / ATS export** (Workable/Indeed) — requisition, per-stage dates and counts
  (applied → screened → interviewed → offered → accepted → started), source, sponsorship tier.
- **Source data** — apply counts and spend by source/board, for cost-per and yield math.
- **Performance / ramp** — writer volume, attach/credit-app rates, ramp-target attainment
  (feeds quality-of-hire and the attach "money left on the table" view).

Tell the skill the **subject** (e.g. `rsa-southeast`, `q3-turnover`, `all-roles`) and the **question**
(or "run the standard views"). You don't need every source — the skill computes what the data supports
and **names the missing fields** for anything it can't.

## Process

1. **Load context & frameworks.** Read `reference/hr-playbook.md` §3 (the funnel + which metrics expose
   which leak) and §5 (fairness lenses), and `reference/company-context.md` (RSA economics, the schedule
   turnover driver, the source/sponsorship reality). These anchor what the numbers *mean* here.
2. **Ingest & profile the data.** Parse each file. Report row counts, date range, and any obvious quality
   issues (blank term reasons, missing stage dates, duplicate IDs). **State the denominator for every
   view** — vague rates are useless. Do not clean-by-guessing; flag ambiguous rows and exclude with a note.
3. **Pick the views the data supports.** From the standard set below, run every view the fields allow.
   For each view you *can't* fully compute, list the exact missing field(s) as a required input and show
   what a partial version reveals. Never fabricate to complete a template.
4. **Compute each view — show the formula.** State the calculation (e.g. `early attrition = terms with
   tenure ≤90d ÷ hires in window`) so Brandon can trust and re-slice it. This is the anti-black-box rule:
   the opposite of the ATS fit score nobody can explain.
5. **Slice where it's decision-useful** — by role, location, tenure band, source, hire cohort. Cut deep
   enough to localize the leak (which locations, which sources, which tenure band), not so deep the cells
   go to n=2.
6. **Flag small samples and fairness, explicitly.** Any cell under a stated threshold (default n<10) gets
   a "directional only" caveat. Screen every cut for disparate-impact risk on the quiet — if a slice would
   expose or invite a protected-class read, **flag the fairness concern to Brandon; do not render the cut**
   as a headline metric (`hr-playbook.md` §5).
7. **Write the "so what / do this" for each view** — one or two lines, lead with the finding, name the
   action. This is the point of the whole thing: a view without a "do this" is a chart, not a diagnosis.
8. **Synthesize the leak.** Close with the single headline: *where is the funnel/retention leak, and what's
   the highest-leverage next move* — and whether that move is a Talent OS skill (`jd-optimizer`,
   `candidate-screener`, `onboarding-ramp`, `total-rewards`) or a client operating change.

## The standard views

Run each the data supports; each ends with its own "so what / do this."

| View | Computes | The leak it exposes |
|---|---|---|
| **Turnover** | Term rate by role / location / tenure band; voluntary vs. involuntary | Which locations/roles bleed, and whether it's a hiring or a holding problem |
| **Early attrition (0–90 / 0–180 day)** | Share of hires gone inside 90/180 days, by cohort | Bad expectation-setting or onboarding — the RSA schedule-shock signal |
| **Quality of hire** | Ramp-target attainment, 90-day retention, performance/volume by hire cohort & source | Whether you're hiring the *right* people, not just filling seats |
| **Time-to-fill & time-to-first-contact** | Median days per stage; hours from apply → first outreach | The #1 volume-hiring killer here — mid-funnel follow-through speed |
| **Source effectiveness** | Apply → hire → *retain* + cost-per by source/board/sponsorship tier | Where to spend (and stop spending) the finite sponsorship budget |
| **Funnel conversion** | Screen→interview, interview→offer, offer→accept rates | Where candidates die, and whether the posting/screen sets right expectations |
| **Attach / "money left on the table"** | Attach & credit-app rate spread across writers at similar volume → $ gap | The RSA add-on discipline lever — a coaching + total-rewards opportunity |

## Output spec

`deliverables/people-analytics-<subject>-YYYY-MM-DD.md`:

1. **Headline** — the one-sentence "where the leak is and the highest-leverage move." Phone-scannable.
2. **Data note** — sources, row counts, date range, denominators, exclusions, quality caveats.
3. **The views** — one section per view: a **markdown table**, the **formula used**, and a bolded
   **So what / Do this** line. Small-sample and fairness flags inline.
4. **What we couldn't compute** — required fields missing, and which view each unlocks (so the next data
   pull is targeted).
5. **⏳ WAITING ON YOU** — the missing inputs to request, which slice to go deeper on, whether to render
   CSV/HTML or hand a view to the skill that acts on it (e.g. source view → sponsorship decision;
   attach view → `total-rewards`; early-attrition view → `onboarding-ramp`).

Markdown is the source of truth. If Brandon wants a **chart-ready table**, emit tidy long-form
(`dimension, metric, value`) he can paste into a chart tool. **CSV or a self-contained HTML dashboard**
is available on request — rendered *from* the markdown tables, never hand-authored or invented.

## Quality bar

- **Lead with the "so what."** The finding is the headline; the table is the evidence. If a view has no
  action attached, it doesn't ship — cut it or find the action.
- **Every number is reproducible.** Formula + denominator shown. Brandon can re-run or challenge any cut.
- **Diagnosis over dashboard.** The deliverable names the leak and the move, not just "here are your
  metrics." A pretty dashboard that doesn't tell you where to intervene has failed.
- **Honest about small n.** Directional cells are labeled directional. No false precision on 6 people.

## Guardrails

- **Never fabricate a metric.** Compute only from provided data. No estimated benchmarks, no
  industry-average fill-ins, no invented rows to complete a view. Missing data is a *required input to
  request*, shown alongside what the present data *can* support — not a gap to paper over.
- **Denominators and samples are non-negotiable.** State the base for every rate; flag any cell under the
  small-sample threshold as directional only. A rate with no denominator is misinformation.
- **No protected-class cuts that create exposure.** Analyze fairness carefully — disparate impact by
  location/source/tenure is legitimate diagnostic work — but **never surface a protected-class breakout
  as a headline metric.** If a cut would expose or invite a protected-class read, flag the concern to
  Brandon for review; don't render it (`hr-playbook.md` §5). Hunter is not a lawyer — flag material legal
  calls, don't resolve them.
- **Confidentiality.** Roster, exit, and comp data are PII. They live in `intake/data/` and outputs in
  `deliverables/` — **both git-ignored**. Never copy named-individual data, real headcounts, or comp
  figures into a committed file (skills, reference, agents). Genericize to roles/locations when writing
  anything reusable.
- **Human owns every decision.** This skill instruments and recommends. It never decides a termination,
  a budget cut, a comp change, or a hire — it hands the human a clear read to act on.

## Example

> **Brandon:** run people analytics on the RSA roster + Workable funnel export in intake/data. Turnover
> looks bad in two markets and they want to throw more sponsorship at it — is that the fix?

→ `deliverables/people-analytics-rsa-southeast-2026-07-19.md` — headline: *"This is a mid-funnel + early-
attrition leak, not a top-of-funnel one — more sponsorship won't fix it."* Turnover table shows two
markets driven almost entirely by **0–90-day voluntary exits** (schedule shock), not thin applicant flow.
Time-to-first-contact runs a median **4.1 days** in those markets vs. 1.2 elsewhere — candidates going
cold before anyone calls. Source view shows one board is 38% of spend and 6% of *retained* hires (cut it).
Attach view quantifies a **~$14K/writer annual gap** between top- and bottom-quartile attach at equal
volume. "Do this" per view routes to `candidate-screener` (work the pipeline faster), `onboarding-ramp`
(fix the 0–90 cliff), and `total-rewards` (the attach lever) — with a note that the "add corporate
tenure" cut was withheld as a fairness flag for Brandon to review.
