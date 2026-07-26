---
name: budget-guidance
agent: Finn (0-agents/custom-built-agents/finn.md)
created: 2026-07-16
description: >
  Finn's objective budgeting engine. Turns lumpy base+bonus income into a steady
  monthly "salary," runs every spending bucket against a traffic-light threshold,
  and answers "can we afford X?" with a deterministic rule — not an opinion.

  Brady's mandate (2026-07-16): "Help us be objective. It's all just numbers."
  This skill exists so budget decisions stop being arguments and start being lookups.

  TRIGGER: "budget", "can we afford", "budget check", "are we on track",
  "bonus landed", "money rules", "run the budget", "should we buy", "budget close".

  BOUNDARY: financial-assistant = the picture (balances, runway, net worth).
  budget-guidance = the rules (targets, lights, decisions). This skill supersedes the
  old "Not a budgeting app" stance in financial-assistant/SKILL.md — Brady asked for
  guidance, so Finn now guides. Still no guilt; the rules do the talking.
---

# Budget Guidance — Finn's Objective Engine

The whole point: **remove the emotion.** Income is lumpy, the family is big, and the
spend is high enough that every purchase can feel like a debate. This engine replaces the
debate with three things a number can answer: a **smoothed paycheck**, a **traffic light**,
and a **waterfall**. If a decision can't be reduced to those, Finn says so plainly.

Numbers live in `3-reference/skills/financial-assistant/references/budget-targets.md`
(repo, no personal detail) and the sensitive month-by-month build in
`~/brady-os-local/finance/family-budget-YYYY-MM.md`. This file is the *logic*.

---

## Rule 1 — Two incomes, one paycheck (bonus smoothing)

Income has two shapes. Treat them differently, on purpose:

| Income | Shape | Funds | Rule |
|--------|-------|-------|------|
| **1915 South base** | Steady ~$8,750/mo take-home ($150K/yr gross) | **Core**, then **Vacation/Fun** with the leftover | Spend as it lands |
| **EBITDA bonus** | Lumpy — quarterly, variable | **Living + Build** | **Never spent directly.** Swept to the Standard-of-Living Buffer (Reserve), then paid out as a fixed monthly "salary." |

**The mechanism that makes lumpy feel like salary:**
1. A bonus lands → **100% swept to the Standard of Living Buffer** (a separate savings account, not checking). It is not "money in the account to spend."
2. On the 1st of each month, the Buffer pays a **fixed "bonus salary"** into operating (amount below — floor vs goal case).
3. Weekly Plus-Up & Ad Hoc: the fixed salary is what funds the Mon/Thu weekly deposits (see `bill-autopay-map.md`) plus room for ad hoc (Rule 6). The family budgets against the smoothed monthly total, never against the size of the last bonus.

**Two planning cases (Brady's diagram, locked 2026-07-18 — floor is the one to plan around):**

| Case | Bonus/quarter | Bonus/year gross | Net/yr (~57% keep) | Smoothed bonus salary | Total steady income (+ $8,750 base) |
|---|---:|---:|---:|---:|---:|
| **Floor (plan around this)** | $60,000 | $240,000 | ~$136,800 | **~$11,400/mo** | **~$20,150/mo** |
| Goal (upside case) | $125,000 | $500,000 | ~$285,000 | ~$23,750/mo | ~$32,500/mo |

The floor case is confirmed against real data twice over: it matches Brady's own estimate AND independently matches the annual pace implied by actual Q2 2026 EBT ($4.0M/qtr → ~$240K/yr bonus at 1.5%). **This replaces the earlier $300K/yr ($75K/qtr, $14,250/mo) planning assumption** — that number was optimistic relative to both Brady's own estimate and the trailing data. `bonus-log.md` trues up the real pace each quarter; if actual EBT consistently prints above $4M/qtr, revisit toward Goal.

**Standard of Living Buffer health — floor/ceiling, not just a floor (Brady's diagram numbers):**
| Buffer balance | Light | Action |
|---|---|---|
| ≥ $20K (the "SLB" target) | 🟢 | Normal. Pay full bonus salary. |
| $10K–20K | 🟡 | Hold. No new Living/Build increases until the next bonus lands. |
| < $10K | 🔴 | Cut bonus salary to what the Buffer can sustain. Living flexes down (see Rule 3). |
| **> $40K (the Max)** | ⬆️ | **Overflow — sweep the excess above $40K out** to Vacation/Fun, Kids/Education (529), or Safety/Retirement rather than letting it idle in the smoothing account. |

**First payment (~next week): ~$20,440 gross** = 1.5% × $4.0M Q2 EBT × (31 employed / 91 quarter days) — prorated for the 5/31 start (a full quarter would be $60K). Nets ~$13K. This seeds the Buffer partway; it starts 🟡/🔴 and fills toward $20K over the first 1–2 full quarters — expected, not a failure.

---

## Rule 2 — Five buckets, one traffic light each

Every dollar is Core, Vacation/Fun, Living, Build, or Reserve. Each bucket has a target and a light.
**Green ≤ target · Amber ≤ target +10% · Red > target +10%.** That's the whole judgment.

**Floor-case targets (locked 2026-07-18 — confirmed workable, see math below):**

| Bucket | Funded by | Monthly target | Light checks |
|--------|-----------|---------------:|--------------|
| **Core** — mortgage, auto, loans, utilities, phone, HELOC interest | Base | **~$7,030** | Must always fit inside base. Red = structural problem, not a spending one. |
| **Vacation/Fun** — family trips, one-off experiences | Base surplus (the $1,720/mo left after Core) | **$1,000** | New bucket — funded from base, not bonus, so it doesn't compete with Living/Build. |
| **Living** — food/household, Karissa personal, kids, medical, fun, subscriptions, ad hoc buffer | Bonus salary | **~$9,380** | Checked weekly on the food line (Rule 4); ad hoc buffer sized per Rule 6. |
| **Build** — 529s (protected floor), HELOC principal, investing/emergency (the flex) | Bonus salary (leftover after Living) | **~$2,020** (529 $1,250 + HELOC principal $250 + investing/emergency $520 combined) | **This is what actually flexes in the floor case** — see note below. |
| **Reserve** (Standard of Living Buffer) — the smoothing tank | Bonus (100%) | $20K target / $40K ceiling | Rule 1. |

**The honest trade-off in the floor case:** Core, Vacation/Fun, and full Living (including the $1,000
ad hoc buffer) are **all fully funded** — this is real, not a squeeze. What shrinks is Build's *extra*
wealth-building: 529 stays protected (Lily's draw is imminent) and HELOC principal stays funded, but
investing/emergency-buffer-rebuild drops from the $3,640/mo goal-case ideal to **$520/mo combined**.
That's the lever that flexes with bonus size — not lifestyle.

**Math check:** Floor income $20,150/mo (base $8,750 + bonus salary $11,400) − total spend $19,430/mo
(Core $7,030 + Vacation $1,000 + Living $9,380 + Build $2,020) = **~$720/mo true cushion remaining**,
on top of everything above being funded. This is what "should live plenty fine" looks like as a number.

At the **Goal case** ($125K/qtr, ~$23,750/mo smoothed), Build restores to the full $5,140 target and
Vacation/Fun can grow beyond $1,000 — track this as bonuses come in above the floor pace.

---

## Rule 3 — The waterfall (what gives when money is tight)

When a bonus is light or the Reserve is 🔴, cut **from the bottom up**, never the top:

```
1. Build : extras      ← cut FIRST (investing/emergency-rebuild — already the floor-case flex line)
   Vacation/Fun         ← equally first-in-line on the base side (mirrors Build:extras)
2. Living : discretionary   ← then trim (fun, clothing, non-essential shopping)
3. Living : essentials      ← only if forced (food to floor, keep meds/therapy)
4. Build : savings floors   ← 529s + HELOC principal held as long as possible
5. Core                     ← NEVER cut by choice; a Core miss = escalate immediately
```

Objective trigger: **if a month would require a HELOC draw to hold Core + Living essentials,
that is a Red event** — Finn surfaces it before the draw, not after.

---

## Rule 4 — The one number to watch: food & household

It's the biggest controllable line and the one that quietly sinks months. Everything else is
mostly fixed or small. Watch this weekly, not monthly.

- **Monthly target: $4,500. Weekly cap: $1,040.** *(Locked by Brady 2026-07-16 — this is the Liberal USDA grocery tier + a dining cap, not an austerity number. See the USDA-anchored method below.)*
- Sources: groceries + the Amazon/Walmart/Target "shopping" catch-all + dining.
- 🟢 ≤ $1,040/wk · 🟡 $1,040–1,200 · 🔴 > $1,200
- **Two weeks Red in a row → the month fails.** Finn surfaces it at week 2, not at month-end.
- Historical actual ran **$5,000–7,000/mo**. Closing the gap to $4,500 is worth more than every
  other cut combined — so this is the only line Finn actively coaches.

**How the target is set (objective, refreshable — not a gut number):**
The food line decomposes into three parts, only one of which is discretionary:
1. **At-home groceries** = the sum of the **USDA Food Plan** per-person monthly cost for each of the
   7 family members by age/sex, at a chosen tier (Moderate or Liberal), minus ~5% for large-household
   economies of scale. This is demographic *fact* once the tier is picked. Finn re-pulls the current
   USDA "Cost of Food" report each quarter (fns.usda.gov/cnpp) and reprices.
2. **Household consumables + coffee** (paper, toiletries, cleaning) — measured from actuals, ~$600/mo.
3. **Dining out** — a policy cap; the only real lever.
Target = (1) + (2) + (3). **$4,500 = Liberal USDA grocery tier (~$2,800) + ~$600 consumables + ~$1,050 dining.**
Liberal is the *top* USDA tier, so $4,500 is generous, not tight. To change the target, change the
tier or the dining cap — nothing else is up for debate.

---

## Rule 5 — HELOC is not income

Learned the hard way: the April 2026 **$37,859 "Other Income" was an Arvest HELOC draw** — borrowed,
not earned. It made a losing month look like a winning one.

- **A HELOC draw is never counted as income and never funds Living or Core.** Full stop.
- HELOC is a capital facility for **appreciating assets only** (home improvements, pool) — per
  `budget-targets.md` doctrine.
- **HELOC interest** is a Core line. **HELOC principal** is voluntary Build during the draw period.
- **Any lifestyle draw is an automatic 🔴** and the headline of that month's close.

---

## Rule 6 — The ad hoc / surprise buffer

Every household has spend that isn't a bill, isn't groceries, and isn't a named line — home repairs,
random purchases, a dealer fee, a one-off charity ask. That's not chaos, it's a category, and it gets
sized from data like every other line, not guessed.

**Monthly target: $1,000.** *(Locked by Brady 2026-07-18.)*

**How it's set (objective, refreshable):**
1. Pull every transaction over several clean months (skip any anomalous/contaminated period — e.g. a
   treatment or transition window) that **doesn't already have a budget line** — i.e. exclude Core
   bills, food & household, Karissa's personal line, kids' activities, clothing, medical.
2. Split what's left into three buckets by nature, not just size:
   - **Recurring but uncounted** (appears in ≥3 of the sampled months) — this is a *predictable* miss,
     not ad hoc. Give it its own line (see "Subscriptions & personal SaaS" in `budget-targets.md`).
   - **Travel/vacation-tagged** — lumpy but plannable. Keep it separate; don't let it inflate the
     "surprise" number just because it's irregular.
   - **True one-off** (appears in <3 months, not travel-tagged) — this is the real ad hoc pool.
3. Average the true one-off pool over the sample window. Round to a clean number **between the trimmed
   mean (excluding the single biggest outlier) and the full mean** — enough slack for an occasional
   $500–800 surprise without being permanently inflated by the one $1,000+ anomaly in the sample.
4. Refresh the same way each quarter, using the next clean window.

**What this replaces:** a flat guessed "buffer" line. Guessing under-sizes the buffer (feels like
overspending every month) or over-sizes it (steals from savings). Measuring it fixes both.

**What NOT to fold in:** vacation/travel and recurring subscriptions. They're real costs, but a
different shape — plannable vs. fixed vs. genuinely random — and folding them into "ad hoc" hides
which lever actually needs adjusting when the number moves.

---

## The three protocols (how Finn actually responds)

### A. "Can we afford [X]?" — deterministic, answer in one pass
1. Which bucket? (Core / Living / Build)
2. Is that bucket 🟢 for the month so far? → if 🔴, default answer is **not this month**.
3. Is the Reserve 🟢? → if not, **wait for the next bonus**.
4. One-time vs recurring? Recurring adds must fit the *target*, not just this month's slack.
5. Output: **Yes / Yes-but-swap (name the line it displaces) / Wait until [date/bonus] / No — here's the number.** Never "it depends."

### B. Bonus-landing protocol (fires on "bonus landed")
1. Confirm gross, net-after-tax, and that withholding was taken (W-2 — should be automatic).
2. **Sweep 100% net to Bonus Reserve.** Do not leave it in checking.
3. Recompute Reserve light. Report months-of-runway the reserve now holds.
4. If Reserve just crossed back to 🟢, note which held Build/Living items can resume.
5. Log the payment (date, gross, net, EBT basis) so the $240K/yr floor assumption gets trued up.

### C. Monthly close (fires on "budget close" / end of month, and inside weekly-sweep)
1. Actual vs target for each of the four buckets, with its light.
2. The food number for the month + weekly trail.
3. Reserve balance + months of runway.
4. **HELOC check:** any draw this month? For what?
5. **One decision surfaced** — the single highest-leverage adjustment for next month. Not a list.

---

## What Finn writes

- Rolling monthly close → `~/brady-os-local/finance/budget-close-YYYY-MM.md` (sensitive; actuals).
- Bonus log → `~/brady-os-local/finance/bonus-log.md` (each payment; trues up the $240K/yr floor assumption vs. actual EBT pace).
- Ad hoc buffer refresh (quarterly, Rule 6) → `~/brady-os-local/finance/adhoc-buffer-analysis.md`
  (sensitive; merchant-level detail). Update `budget-targets.md`'s buffer line only if the refreshed
  number moves meaningfully from $1,000.
- Target changes → `budget-targets.md` (repo; numbers only, no personal/medical detail).
- A Red event or Core miss → Streaming Notes `Priority=Must` via Finn's Escalation Protocol
  (de-dup topic keys, incl. new key `HELOC lifestyle draw`).

## Family-facing surface

Karissa's daily interface to this engine is **mception.ai/family-budget** ("The Daily
Five", `portal/public/family-budget/viewer/index.html`) — log the food number, glance
the light, run purchases >$100 through the deterministic calculator. The page carries
targets only (repo-safe numbers from `budget-targets.md`); anything typed stays in the
browser (localStorage), so no actuals leave the device. When targets change in
`budget-targets.md`, update the constants at the top of that page's `<script>` block
(WEEK_CAP / WEEK_AMBER / MONTH_CUSHION) and the bucket cards.

## Tone (non-negotiable)

No guilt, no lectures, no "you should have." The lights and the waterfall carry the message.
Finn states the number, names the bucket, gives the deterministic call, and stops. Brady and
Karissa decide. "It's all just numbers" is the operating principle, not a slogan.
