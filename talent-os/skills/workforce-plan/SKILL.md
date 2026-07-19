---
name: workforce-plan
trigger: "workforce plan", "headcount model", "staffing plan", "build vs buy recruiting", "resource plan"
input: a roster export + a growth/acquisition plan (drop in intake/data/ and intake/roles/)
output: deliverables/workforce-plan-<subject>-YYYY-MM-DD.md (a headcount model + backfill forecast + req plan + build-vs-buy + org-design options)
mode: Build
---

# Workforce Plan

Turns a **roster export + a growth/acquisition plan** into a strategic resource plan: a
headcount model by role and location, a backfill/turnover forecast, a prioritized requisition
plan, a build-vs-buy call on how to source each role, and org-design options for the thin People
function that has to absorb all of it. The output isn't a think-piece — it's a plan the client
can staff and budget against.

This attacks the live reality: growth here is **acquisition-driven** (integrating new stores,
absorbing a large block of employees, order of ~200+ heads), the People Ops team is **thin**
(one-to-two people covering a multi-state footprint), RSA turnover is **schedule-driven** so
backfill volume is high and *predictable*, and **Store Managers** are the weak-applicant-pool
role where a headhunter is worth paying for while volume roles fill fast off Indeed hiring events.
The plan has to see all of that at once.

## Inputs (any of these — data in `intake/data/`, role specs in `intake/roles/`)

- **Roster export** (the anchor): current headcount by role, location, DC, tenure, status. This
  is load-bearing — no roster, no model.
- **Growth/acquisition plan:** stores being acquired/opened, target open dates, headcount added
  per location, DC/final-mile expansion tied to the footprint, corporate build-out.
- **Turnover / termination history** (even a rough annualized rate by role): the input that makes
  the backfill forecast real instead of a guess. If you only have a directional rate, use it and
  label it.
- **Open reqs today** + any known time-to-fill by role (from Workable): sets the starting backlog.
- **Recruiting budget** (monthly, and any per-location sponsorship/hiring-event spend) and current
  People Ops org (who does what today, who's transitioning out, the incoming leader's mandate).
- If the roster or turnover rates are missing, **name them as required inputs and stop** — don't
  model on invented numbers.

## Process

1. **Load context.** Read `reference/company-context.md` (the roles table, acquisition-driven
   growth, thin People team, the hiring stack, RSA economics + schedule-driven turnover),
   `reference/hr-playbook.md` §3 (funnel + the metrics that matter) and §7 (total rewards, for the
   outlet retention read), and `reference/retail-sales-hiring.md` (sourcing patterns, hiring
   events, the Store Manager pool, where retail funnels leak). Read the roster in `intake/data/`
   and the role/growth specs in `intake/roles/`.
2. **Baseline the current state.** From the roster, build the starting picture: headcount by role
   (RSA, Outlet Sales Associate, Store Manager, DC/final-mile/warehouse, Corporate) and by
   location/DC. Note fill rate vs. target where you have targets, and current open reqs. This is
   the floor everything grows from — every number below traces back to it.
3. **Model growth demand.** Lay the acquisition/growth plan over the baseline: for each new or
   acquired location, the roles and heads it needs and by when. Keep the acquisition block explicit
   (the ~200+ absorbed heads) — integration demand behaves differently from organic growth: heads
   arrive in a lump, on someone else's hire dates, needing onboarding and consistency work, not net
   new sourcing. DC/final-mile demand scales **with the footprint**, so tie it to store count, not
   guessed separately. Output: a **demand table** — role × location × target headcount × target date.
4. **Forecast backfill (turnover-driven).** This is usually the larger number than growth. Apply
   the turnover rate to the baseline by role to get expected annual separations → backfill hires.
   For RSAs, turnover is **schedule-driven** (mandatory weekends/holidays), so it's **high but
   predictable** — treat RSA backfill as a steady, forecastable pipeline, not a series of surprises.
   Flag **outlets** separately: near-minimum-wage economics = structural turn-and-burn, a retention
   problem worth its own line, not just more backfill. Output: a **backfill table** — role ×
   expected annual separations × backfill hires needed, with the rate and its source labeled.
5. **Sum to total hiring demand and phase it.** Growth hires + backfill hires = total reqs to run,
   by role, by location, across the horizon (default 12 months; use the client's if given). Phase
   it against acquisition close dates and known seasonality so the plan shows *when* the load
   lands, not just the annual total. This total is the denominator for everything downstream —
   budget, req prioritization, and whether the People function can carry it.
6. **Prioritize the requisitions.** Rank reqs by business impact and sourcing difficulty, not
   date alone. Priority tiers:
   - **P1 — revenue-critical + hard-to-fill:** Store Managers (weak pool, leadership leverage),
     openings at not-yet-staffed new locations.
   - **P2 — high-volume, forecastable:** RSA backfill and growth — run these as a **continuous
     pipeline** against forecasted gaps, with **Indeed hiring events** pre-scheduled when a
     location is trending 5+ short (don't wait for the floor to bleed).
   - **P3 — steady-state / lower-heat:** outlet, most corporate, routine DC replacement.
   Map each tier to the sourcing motion that actually works for it (below). Output: a **req
   priority plan** — role/location × tier × sourcing motion × trigger to launch.
7. **Build vs. buy — per role, with a reason.** Decide how each role gets sourced and be explicit
   about why:
   - **Store Managers → buy (third-party / headhunter).** The applicant pool is weak and the role
     is low-volume/high-impact; a contingent or retained search is justified where an in-house
     recruiter would grind for months. Note the tradeoff (fee vs. months of vacancy in a
     revenue-driving seat) rather than asserting it.
   - **RSA / DC / high-volume → build (in-house pipeline + Indeed hiring events).** Volume and
     forecastability make in-house sourcing plus sponsored hiring events the cheaper, faster path;
     this is the pipeline the shared vision is built to own.
   - **Corporate → mixed:** in-house for most; external search for scarce senior/specialist seats.
   - **The middle-of-funnel gap is the real constraint** regardless of build/buy: applicants exist,
     but nobody reliably filters, calls, and books. Whatever the model, name **who owns
     speed-to-first-contact** for each role, because that's the leak that sinks volume hiring.
   Output: a **build-vs-buy table** — role × build/buy/mixed × rationale × est. cost lever.
8. **Design the scaling People function.** The thin team can't absorb acquisition + steady backfill
   as-is — say so, then give **2–3 org-design options**, not one prescription. For each: structure
   (roles/FTE, e.g. a People lead + a dedicated recruiter/coordinator owning the pipeline +
   onboarding capacity for the acquisition block), what it unlocks, cost, and the tradeoff. Weight
   the **build-the-owned-pipeline + automation** path (JD optimization, transparent ranking, the
   daily "reach out to these today" list, roster reconciliation) against pure headcount, since the
   mandate here is to modernize with automation, not just add bodies. Flag the **IT-provisioning /
   access dependency** as a real sequencing constraint on anything that touches internal systems.
   Present options for a human to choose — you don't pick the org for them.
9. **Assemble the plan and the asks.** Put the tables and the org options together into one
   deliverable, then close with what you need from Brandon/the client to sharpen it (missing
   turnover rates, confirmed acquisition dates, budget) and the org-design decision that's theirs.

## Output spec

`deliverables/workforce-plan-<subject>-YYYY-MM-DD.md`, in this order:
1. **Executive read** — total hiring demand across the horizon (growth + backfill), the 2–3 moves
   that matter, and the one decision the client owns. Phone-scannable.
2. **Current-state baseline** — headcount by role × location, open reqs, fill vs. target.
3. **Growth demand table** — role × location × target headcount × date, acquisition block called
   out separately.
4. **Backfill forecast** — role × separations × backfill hires, turnover rate + source labeled;
   outlets flagged as a retention line, not just backfill.
5. **Total hiring demand, phased** — reqs by role/location across the horizon, timed to acquisition
   dates.
6. **Requisition priority plan** — tiered (P1/P2/P3) with sourcing motion + launch trigger.
7. **Build-vs-buy table** — per role, build/buy/mixed + rationale + cost lever (Store Manager =
   buy; volume = build + hiring events).
8. **People-function org options** — 2–3 structures with FTE, what each unlocks, cost, tradeoff;
   automation-vs-headcount weighed; IT-access constraint flagged.
9. **⏳ WAITING ON YOU** — required inputs still missing (turnover rates? confirmed close dates?
   budget?) and the org-design call to make.

## Quality bar

- **Every number traces to an input.** A reader can point at any headcount, separation count, or
  req total and follow it back to the roster or the stated turnover/growth rate. Nothing is
  conjured to fill a cell.
- **Backfill is modeled, not hand-waved** — the schedule-driven RSA churn shows up as a steady,
  quantified pipeline, and it's usually the bigger number than growth.
- **The acquisition block is handled as integration, not sourcing** — absorbed heads need
  onboarding and consistency, not net-new reqs, and the plan says so.
- **Build-vs-buy has a reason per role**, not a blanket answer — Store Manager = buy is argued from
  the weak pool + high impact; volume = build is argued from forecastability + hiring events.
- **Org options are options** — the client picks; the plan makes the tradeoffs legible (automation
  vs. headcount, cost vs. vacancy risk, the IT-access sequencing constraint).
- Reads like an operator's plan a thin team can actually run — not a consulting deck.

## Guardrails

- **Don't fabricate headcount or turnover numbers.** If the roster or turnover rates are missing,
  name them as required inputs and stop. A model built on invented churn is worse than no model.
- **Human owns every hiring and org decision.** You forecast, prioritize, and lay out build-vs-buy
  and org options — you never decide the org, approve a req, or commit budget. Every recommendation
  is flagged as a recommendation for a human to action.
- **Genericize on promotion.** If any part of this plan is lifted into `reference/` or a template,
  strip client specifics — roles, not named people; ranges/rates, not the client's actuals. Client
  rosters, turnover, and budget stay in `intake/`/`deliverables/` (git-ignored), never in a
  committed file.
- **Sequence around the IT-provisioning dependency.** Any recommendation that leans on ATS/roster
  system access must flag that it moves only as fast as access is granted — don't plan a pipeline
  that assumes instant integration.
- Not a lawyer / not a comp authority: flag material legal or comp-design calls (e.g. WARN-scale
  reductions, reclassification) for review rather than resolving them silently.

## Example

> **Brandon:** workforce plan. Roster export is in intake/data, acquisition plan (three stores
> closing Q3, ~180 heads absorbed) in intake/roles. RSA turnover runs ~65%/yr. Model the next 12
> months and tell me whether we hire a recruiter or keep pushing it to store managers.

→ `deliverables/workforce-plan-southeast-2026-07-18.md` — a 12-month model that separates the
~180 absorbed acquisition heads (integration/onboarding load, not new reqs) from organic growth,
forecasts RSA backfill off the ~65% rate as a steady ~N-hires/month pipeline (the bigger number),
tiers reqs with Store Managers as P1-buy (headhunter) and RSA/DC as P2-build (in-house + Indeed
hiring events pre-scheduled against forecasted gaps), and lays out three People-function structures
— push-to-managers (status quo, names the follow-through gap it leaves open), add-a-recruiter
(owns speed-to-first-contact), and build-the-automated-pipeline — with cost, what each unlocks, and
the IT-access constraint flagged, for the client to choose.
