---
name: total-rewards
trigger: "total rewards", "comp band", "commission plan", "incentive plan review", "benefits benchmark", "money left on the table"
input: comp actuals + benefits summary + role/roster data (in intake/data/)
output: deliverables/total-rewards-<subject>-YYYY-MM-DD.md (statement + band + incentive review + benefits benchmark)
mode: Build
---

# Total Rewards

Takes the comp and benefits reality for a role and produces a **complete picture of what the job
is worth** — plus the design and diagnostic work behind it. Four artifacts in one deliverable:
(1) a **total-rewards statement** that shows the *full* value (base/ramp + variable + benefits +
schedule/flex + growth + recognition) — useful for both recruiting and retention; (2) a **comp
band design**; (3) a **commission/incentive-plan review** that checks whether the incentives point
at the behaviors you actually want and quantifies the attach/add-on "money left on the table" gap;
and (4) a **benefits benchmark**.

This attacks two live problems. First: postings and offers that under-sell the money because
nobody has ever added up the *full* value of the deal. Second — the sharper one — the fact that
**two writers doing identical volume can earn very differently based on attach/add-on discipline.**
That gap is a coaching lever *and* a comp-design question, and this skill is where it gets measured.

## Inputs (any of these — drop in `intake/data/`)

- **Comp actuals:** the current plan mechanics — ramp wage + duration, base commission rate,
  volume-bonus tiers, credit-application bonus, protection-plan attach bonus (and its step-ups by
  attach %). Real per-writer earnings/volume/attach data if you have it — that's what turns the
  "money left on the table" gap from a lecture into a number.
- **Benefits summary:** health/dental/vision, employer contribution, 401(k)/match, PTO/holidays,
  discounts, any perks. The handbook or a benefits guide is fine raw material.
- **Role + roster context:** which role(s), locations/states (comp and minimum wage vary), headcount,
  tenure/turnover if retention is in scope.
- **Market/benchmark data** if the client has it (surveys, competitor postings, Glassdoor ranges).
- If comp actuals or market data are missing, they're **load-bearing** — name them and stop rather
  than inventing numbers (see Guardrails). Read `company-context.md` for the RSA/outlet reality first.

## Process

1. **Load context.** Read `reference/hr-playbook.md` §7 (total rewards) — comp is one lever in a
   bundle; when comp can't move, schedule/growth/recognition can; and for variable-pay roles always
   check whether the incentive points at the behavior you want. For frontline commissioned roles
   also read `reference/retail-sales-hiring.md` (the "money left on the table" lever) and
   `company-context.md` (RSA ramp-then-commission economics, outlet near-minimum-wage churn). Read
   the input in `intake/data/`.
2. **Establish the comp reality — verify, don't assume.** Reconstruct the plan mechanics and the
   *actual* earnings distribution (average, strong, top). For the RSA archetype the shape is: flat
   ramp wage (~$20/hr, ~8 weeks) → base commission on written sales + tiered volume bonuses +
   credit-application bonus + protection-plan attach bonus that steps up sharply at higher attach.
   If any figure is missing or stale, mark it a required input — do not fabricate.
3. **Build the total-rewards statement.** Add up and *show* the full value of the deal, not just
   the wage line:
   - **Base / ramp** — the hourly runway and what it's for (build a book before commission kicks in).
   - **Variable** — commission + volume bonuses + credit-app bonus + attach bonus, framed as the
     *upside path*, with the honest earnings range (e.g. avg ~$60–65K, strong six figures, best
     $1M+ writers) — concrete and believable, never "competitive."
   - **Benefits** — health/retirement/PTO/discounts, with an employer-cost line where known.
   - **Schedule / flexibility** — state it honestly (weekends + holidays are the revenue) and sell
     the money the schedule makes possible; don't bury it.
   - **Growth** — earnings ceiling, path to top-writer, any advancement.
   - **Recognition** — top-writer programs, contests, non-cash rewards.
   This statement is dual-purpose: a recruiting asset (shows the real value up front) *and* a
   retention asset (reminds a tenured writer what they actually have).
4. **Design the comp band.** Follow `templates/comp-band-template.md`: define the range (floor /
   midpoint / target / stretch) for the role, anchored to the earnings distribution and market data.
   For commissioned roles the "band" is the modeled earnings curve across ramp → average → strong →
   top, not a single salary. Show the assumptions. Flag where a figure is a placeholder to verify.
5. **Review the incentive plan — does it point where you want?** The core question from §7. For each
   plan component, name the behavior it actually rewards and whether that's the behavior you want:
   - **Base commission on written sales** → rewards *volume*. Does it reward *margin*? (Discounting to
     write volume can erode margin — flag if the plan is blind to it.)
   - **Volume-bonus tiers** → reinforce volume; check the thresholds aren't gameable or demotivating.
   - **Credit-app + protection-plan attach bonuses** → reward *add-on discipline* — the highest-ROI
     behavior and the one with the widest performance spread.
   - **Retention** → does anything in the plan reward *staying* (tenure, book maturity)? Usually not —
     name it if retention is a stated goal but the plan is silent on it.
   Output a plain table: component → behavior rewarded → is that the behavior we want? → recommendation.
6. **Quantify "money left on the table."** This is the signature move. Using the attach-bonus
   structure and (if available) real per-writer attach %, compute the earnings gap between a writer
   at low attach and one at high attach on *identical volume*. Show it two ways: **per writer**
   ("at your volume, moving from X% to Y% attach is ~$__/yr in your pocket") and **for the client**
   (aggregate margin/attach revenue left uncaptured across the floor). Frame it as three levers at
   once: a coaching gap (scorecards), an onboarding gap (build attach habits during ramp), and a
   comp-design gap (is the attach step-up steep enough to change behavior?). If per-writer data is
   missing, model an illustrative example clearly labeled as a placeholder to verify.
7. **Benchmark benefits.** Compare the benefits bundle against market for the role/geography using
   client-provided or clearly-sourced data — health/retirement/PTO/discounts vs. peer retailers.
   Call out gaps and cheap wins. If you don't have benchmark data, say so and list it as a required
   input rather than guessing a market number.
8. **Address the outlet retention problem — required.** Outlet-store associates pay near local
   minimum (~$14 FL, as low as $7.25 in some states), earn much less (~$35–40K), and churn
   (turn-and-burn). Name it as a **structural** retention problem, not a coaching one, and propose
   options — e.g. a modest attach/spiff on outlet add-ons, a small tenure step, a clear path from
   outlet to full-line RSA (turn the outlet into a *farm team* instead of a dead end), or schedule/
   recognition levers where wage can't move. Cost each option at the order-of-magnitude level and
   flag it for a human decision.
9. **Flag the human/legal calls.** Comp changes, plan redesigns, and benefits changes are decisions
   a human owns — this skill recommends, it doesn't set. Flag anything with wage-and-hour, benefits,
   or tax implications (minimum-wage compliance across states, exempt/non-exempt during ramp,
   ERISA/benefits) as **not legal or tax advice — get a professional call.**

## Output spec

`deliverables/total-rewards-<subject>-YYYY-MM-DD.md`, in this order:
1. **Total-rewards statement** (the full-value picture — dual-use recruiting + retention)
2. **Comp band design** (from the template — ranges/curve + assumptions, placeholders flagged)
3. **Incentive-plan review** (component → behavior → want it? → recommendation table)
4. **Money left on the table** (per-writer gap + client aggregate; coaching/onboarding/design levers)
5. **Benefits benchmark** (bundle vs. market; gaps + cheap wins)
6. **Outlet retention problem** (the structural issue + costed options)
7. **Assumptions & required inputs** (every placeholder and every figure to verify)
8. **⏳ WAITING ON YOU** — missing actuals/benchmarks + the human/legal calls to make

## Quality bar

- Every number is either a **verified actual** or a **clearly-labeled placeholder** — never a
  confident-sounding fabrication. A reader can tell which is which at a glance.
- The total-rewards statement makes a candidate think *"that's more than I realized"* and a tenured
  writer think *"I'd give that up?"* — it sells without lying.
- The "money left on the table" number is **concrete and personal** — a dollar figure a writer and a
  manager can both act on, not a concept.
- The incentive review names the *behavior* each lever rewards and says plainly whether that's the
  behavior the business wants (volume vs. margin vs. attach vs. retention).
- The outlet problem is named as structural, with real options and rough costs — not hand-waved.
- Reads like an operator sized it up, not a comp consultant padding a deck.

## Guardrails

- **Never fabricate comp figures or benchmarks.** If actuals or market data are missing, name them
  as required inputs and stop, *or* clearly label any illustrative numbers as `[PLACEHOLDER — verify]`.
  A wrong comp number is worse than a missing one.
- **Not legal or tax advice.** Minimum-wage/overtime compliance, exempt status during ramp, benefits/
  ERISA, tax treatment — flag material calls for a professional; don't resolve them silently.
- **The human owns every comp decision.** This skill models, reviews, and recommends. It never sets
  a rate, changes a plan, or communicates comp to an employee.
- **Confidentiality.** Comp is among the most sensitive data in the kit. Actuals and deliverables
  live in `intake/data/` and `deliverables/` — both git-ignored. Never copy real earnings, per-person
  pay, or named-individual comp into a committed file (skills, templates, reference, agents).
- **Genericize if promoted to reference.** If any of this becomes reusable reference material,
  strip client specifics down to roles and ranges — no named people, no exact internal figures.

## Example

> **Brandon:** total rewards for the RSA role — comp actuals and the benefits guide are in
> intake/data. Show me the full value of the deal, tell me if the commission plan is pointed the
> right way, and put a real number on the attach gap. Also look at the outlet stores.

→ `deliverables/total-rewards-retail-sales-associate-2026-07-19.md` — a total-rewards statement
that adds up ramp + commission + volume/credit-app/attach bonuses + benefits + schedule + growth
(honest range: ~$60–65K average, six figures for strong writers, $1M+ for the best); a comp band
modeling the earnings curve from ramp to top writer; an incentive-review table showing base
commission rewards *volume* (and is blind to margin/discounting), while the attach bonus is the
real spread-maker; a "money left on the table" section computing that at average volume, moving a
writer from low to high protection-plan attach is ~$[verify]/yr to the associate and
~$[verify] of uncaptured attach revenue across the floor — framed as a coaching + onboarding + comp-
design lever; a benefits benchmark against peer retailers; and an outlet section naming the
near-minimum-wage churn as structural, with three costed options including an outlet→full-line
promotion path that turns the outlet into a farm team. Every unverified figure is tagged
`[PLACEHOLDER — verify]`, and the plan-change and wage-compliance calls are flagged as human/legal
decisions in WAITING ON YOU.
