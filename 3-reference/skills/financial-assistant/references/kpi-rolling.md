# Finn — Rolling KPIs

Durable, append-only tracking of Finn-owned KPIs that Brady wants to watch trend over time.
Read by `weekly-summary` and surfaced in the weekly-sweep block. Updated each weekly run.

---

## KPI Catalog

### K1 — % Food Subscription L30D

**Definition:** Percentage of Brady's total **Arkansas Walmart spend** in the last 30 calendar days that flowed through the **Tuesday Walmart+ subscription delivery system**.

**Goal direction:** **UP** ↑ — Brady wants more household food spend on auto-pilot (planned, recurring, delivery-fee-free) and less ad hoc / in-store impulse spend.

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
- Utah Walmart transactions (Lindon, Orem, Provo store IDs) — out of scope
- Non-Walmart family grocery (Aldi, Sam's, etc. — those are tracked elsewhere)

**Excluded from numerator only:**
- One-off Walmart.com delivery orders (rush delivery, Order 5 pattern)
- In-store purchases (Bentonville Supercenter, Neighborhood Market)
- Walmart fuel station

---

## Readings

| Read date | L30D window | Total AR Walmart | Subscription $ | % Sub | # Tue deliveries identified | Notes |
|-----------|-------------|------------------|----------------|-------|----------------------------|-------|
| 2026-04-30 | Apr 1–30 | $2,498 | ~$985 (est.) | **~39%** | 3 confirmed (Apr 7 $246, Apr 21 $191, Apr 28 $303) + 1 estimated Apr 14 (~$245) | Inaugural reading. Apr 14 cluster ambiguous — re-verify on next run. |

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

Candidates Brady can promote into K2+ when ready:

- **K2 — Subscription items only %:** Pure subscription items / total AR Walmart. Excludes ad hoc Tuesday add-ons.
- **K3 — Walmart $/wk run rate L30D:** trailing 4-week average AR Walmart spend.
- **K4 — Food & consumables % of $3,900 budget:** Walmart + DoorDash + restaurants / $3,900.
- **K5 — Ad hoc grocery count L30D:** number of non-subscription Walmart trips. Lower = more disciplined.

---

## Update Protocol

- **Cadence:** Once per week, run as part of `weekly-summary` mode (Sunday weekly-sweep).
- **Source:** Latest `monarch-YYYY-MM-DD.csv` in `data/`.
- **Action:** Append a new row to the Readings table. Never edit prior rows. If methodology changes, flag in Notes column and start a new K-number.
- **Surfacing:** Include the latest reading + delta vs prior in the weekly-summary block: "K1 % Food Subscription L30D: 39% (↑/↓/= vs last week)."
