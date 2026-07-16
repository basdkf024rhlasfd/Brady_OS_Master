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
| **1915 South base** | Steady ~$8,750/mo take-home | **Core** (fixed bills) | Spend as it lands |
| **EBITDA bonus** | Lumpy — quarterly, variable | **Living + Build** | **Never spent directly.** Swept to Bonus Reserve, then paid out as a fixed monthly "salary." |

**The mechanism that makes lumpy feel like salary:**
1. A bonus lands → **100% swept to the Bonus Reserve account** (a separate savings account, not checking). It is not "money in the account to spend."
2. On the 1st of each month, Bonus Reserve pays a **fixed $14,250 "bonus salary"** into operating.
3. Operating now sees steady income every month: **$8,750 base + $14,250 bonus salary = ~$23,000/mo.** The family budgets against $23,000, never against the size of the last bonus.

**Conservative planning basis (locked 2026-07-16):**
- Annual bonus assumption: **$300K gross = $75K/quarter**, even split (1.5% of ~$20M EBITDA).
- Net after ~42% blended high-income tax: **~$174K/yr ≈ $14,250/mo** — that's the bonus-salary figure.
- **First payment (~next week): ~$60K gross** = 1.5% × $4M, protected floor, partial quarter (start 5/31, 31 days). This *seeds* the Reserve; it doesn't change the $14,250 draw.

**Reserve health (objective):**
| Reserve balance | Light | Action |
|---|---|---|
| ≥ 1 quarter of draws (~$42,750) | 🟢 | Normal. Pay full bonus salary. |
| 1–3 months (~$14K–43K) | 🟡 | Hold. No new Living/Build increases until the next bonus lands. |
| < 1 month (< ~$14K) | 🔴 | Cut bonus salary to what Reserve can sustain. Living flexes down (see Rule 3). |

---

## Rule 2 — Four buckets, one traffic light each

Every dollar is Core, Living, Build, or Reserve. Each bucket has a target and a light.
**Green ≤ target · Amber ≤ target +10% · Red > target +10%.** That's the whole judgment.

| Bucket | Funded by | Monthly target | Light checks |
|--------|-----------|---------------:|--------------|
| **Core** — mortgage, auto, loans, utilities, phone, HELOC interest | Base | **~$7,030** | Must always fit inside base. Red = structural problem, not a spending one. |
| **Living** — food/household, Karissa personal, kids, medical, fun | Bonus salary | **~$8,480** | Checked weekly on the food line (Rule 4). |
| **Build** — 529s, investing, HELOC principal, buffer rebuild | Bonus salary | **~$5,140** | Flexes first when Reserve is 🟡/🔴. |
| **Reserve** — the smoothing tank | Bonus (100%) | balance ≥ 1 qtr | Rule 1. |

Total planned outflow ≈ **$20,650** against ~$23,000 income = **~$2,350 true monthly cushion**
— *real* only if no HELOC draw funds any of it (Rule 5).

---

## Rule 3 — The waterfall (what gives when money is tight)

When a bonus is light or the Reserve is 🔴, cut **from the bottom up**, never the top:

```
1. Build : extras      ← cut FIRST (extra investing, buffer rebuild, HELOC principal)
2. Living : discretionary   ← then trim (fun, clothing, non-essential shopping)
3. Living : essentials      ← only if forced (food to floor, keep meds/therapy)
4. Build : savings floors   ← 529s held as long as possible
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
5. Log the payment (date, gross, net, EBITDA basis) so the $300K/yr assumption gets trued up.

### C. Monthly close (fires on "budget close" / end of month, and inside weekly-sweep)
1. Actual vs target for each of the four buckets, with its light.
2. The food number for the month + weekly trail.
3. Reserve balance + months of runway.
4. **HELOC check:** any draw this month? For what?
5. **One decision surfaced** — the single highest-leverage adjustment for next month. Not a list.

---

## What Finn writes

- Rolling monthly close → `~/brady-os-local/finance/budget-close-YYYY-MM.md` (sensitive; actuals).
- Bonus log → `~/brady-os-local/finance/bonus-log.md` (each payment; trues up the $300K assumption).
- Target changes → `budget-targets.md` (repo; numbers only, no personal/medical detail).
- A Red event or Core miss → Streaming Notes `Priority=Must` via Finn's Escalation Protocol
  (de-dup topic keys, incl. new key `HELOC lifestyle draw`).

## Tone (non-negotiable)

No guilt, no lectures, no "you should have." The lights and the waterfall carry the message.
Finn states the number, names the bucket, gives the deterministic call, and stops. Brady and
Karissa decide. "It's all just numbers" is the operating principle, not a slogan.
