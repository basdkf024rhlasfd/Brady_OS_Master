# Finn — Rolling KPIs

Durable, append-only tracking of Finn-owned KPIs that Brady wants to watch trend over time.
Read by `weekly-summary` and surfaced in the weekly-sweep block. Updated each weekly run.

---

## KPI Catalog

### K1 — % Food Subscription L30D

**Definition:** Percentage of Brady's total **Arkansas Walmart spend** in the last 30 calendar days that flowed through the **Tuesday Walmart+ subscription delivery system**.

**Goal direction:** **UP** ↑ (confirmed by Brady 2026-04-30). Push as high as possible, accepting natural seasonal dips.

**Why it matters — Brady's hypothesis:**
A higher subscription % is hypothesized to correlate with:
1. **Lower total Walmart/food spend** — auto-pilot purchases are planned, fewer impulse-driven trips, no rush-delivery fees.
2. **Higher nutritional value** — subscriptions are pre-decided staples (produce, eggs, milk, lean protein) rather than reactive cravings (Ben & Jerry's, Little Debbie, etc. as ad hoc adds).
3. **More family time** — fewer in-store grocery runs (each Bentonville Supercenter or Neighborhood Market trip is ~30–60 min of Brady's or Karissa's time).

This hypothesis is currently **untested** — companion KPIs (candidates K2–K5 below) will be promoted over time to validate or falsify it. The point of K1 isn't to prove the hypothesis; it's to make the lever visible so Brady can act on it and watch what else moves.

**Seasonality caveat:**
Expect natural dips during:
- **Holidays / hosting weeks** (Thanksgiving, Christmas, July 4th, Easter) — large ad hoc shops shift the denominator
- **Birthday party weeks** (5 kids, several per year)
- **Travel weeks** when household consumption pauses but in-store stops continue
- **Sleepover / care package weeks** (rush deliveries with one-off items)

Read trend over **rolling 4-week / 8-week windows**, not single readings.

**Formula:**
```
% Food Subscription L30D =
    (sum of confirmed Tuesday Walmart.com subscription delivery clusters)
    / (sum of all Arkansas Walmart transactions, net of refunds)
```

**Identification rule for "subscription delivery":**
- Multi-line Walmart.com charges on a Tuesday (or Mon/Wed adjacent if posting drift)
- Cluster includes a round-number tip line ($10.00, $15.00, etc.)
- Total cluster typically $180–320

**Excluded from numerator and denominator:**
- Out-of-area Walmart transactions (non-local store IDs) — out of scope
- Non-Walmart family grocery (Aldi, Sam's, etc. — those are tracked elsewhere)

**Excluded from numerator only:**
- One-off Walmart.com delivery orders (rush delivery, Order 5 pattern)
- In-store purchases (Bentonville Supercenter, Neighborhood Market)
- Walmart fuel station

---

## Readings

| Read date | Window | Total AR Walmart | Subscription $ | % Sub | # Tue deliveries identified | Notes |
|-----------|--------|------------------|----------------|-------|----------------------------|-------|
| 2026-04-30 | **L14D proxy** (Apr 16–29) | $987 | $494 | **50.1%** | 2 confirmed: Apr 21 $191, Apr 28 $303 | **Inaugural baseline.** Used L14D instead of L30D because the Apr 14 Tuesday delivery in the L30D window is ambiguous from charge-data alone. From the next read forward, methodology returns to standard L30D. |

---

## Trend Analysis

(Populated as readings accumulate)

### Direction
- **Improving (↑):** Each new reading exceeds the prior reading
- **Flat:** Within ±3pp of prior
- **Slipping (↓):** New reading below prior by >3pp

### Triggers for Brady review
- Two consecutive slipping reads → flag at weekly-sweep
- Single read drops >10pp → flag immediately as anomaly
- Single read jumps >10pp → confirm methodology didn't change

---

## Methodology Notes

1. **Why L30D, not calendar month:** rolling window smooths spike weeks (birthdays, sleepovers) without monthly cliff effects.
2. **Why "delivery cluster" not "subscription items only":** Walmart commingles subscription items + ad hoc additions into one Tuesday delivery. The whole delivery represents "spend that went through the subscription system" — that's the auto-pilot dollar share Brady cares about. A separate K2 below tracks the purer subscription-items-only view if needed.
3. **Why exclude Utah:** Brady's UT spend is travel/visiting, not household food OS. Different optimization target.
4. **Refunds:** Net out of denominator — they reduce the period's true outflow. Subscription deliveries rarely refund; ad hoc orders do.

---

## Future KPIs (placeholder — add when needed)

Candidates organized by which leg of Brady's K1 hypothesis they validate:

**Validates "lower total spend":**
- **K2 — Walmart $/wk run rate L30D:** trailing 4-week average AR Walmart spend. If K1 ↑ and K2 ↓ together, hypothesis leg 1 confirmed.
- **K3 — Food & consumables % of $3,900 budget:** Walmart + DoorDash + restaurants / $3,900. Captures total food bucket, not just Walmart.
- **K4 — Ad hoc grocery trip count L30D:** number of non-subscription Walmart trips. Lower = more disciplined.

**Validates "higher nutritional value":**
- **K5 — Subscription nutritional ratio:** $ spent on produce + protein + dairy + grains / total subscription $. Anchors against meal-preferences KB.
- **K6 — Ad hoc junk-food $:** ad hoc spend on snacks/desserts/candy/ice cream as % of ad hoc total. Lower = better.

**Validates "more family time":**
- **K7 — Brady/Karissa in-store hours L30D:** estimated time in Walmart stores (count of in-store transactions × 45-min average). Lower = better.
- **K8 — Rush delivery count L30D:** $5+ delivery-fee orders. These signal "we ran out of X and need it now" — operational misses that the subscription was supposed to prevent.

Promote K2 first when there's enough data (≥6 K1 readings — about 6 weeks). Don't add 8 KPIs upfront; let K1 drive the question and add companions as they earn their seat.

---

## Update Protocol

- **Cadence:** Once per week, run as part of `weekly-summary` mode (Sunday weekly-sweep).
- **Source:** Latest `monarch-YYYY-MM-DD.csv` in `data/`.
- **Action:** Append a new row to the Readings table. Never edit prior rows. If methodology changes, flag in Notes column and start a new K-number.
- **Surfacing:** Include the latest reading + delta vs prior in the weekly-summary block: "K1 % Food Subscription L30D: 39% (↑/↓/= vs last week)."
