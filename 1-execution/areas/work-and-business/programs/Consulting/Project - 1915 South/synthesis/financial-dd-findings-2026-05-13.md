# Financial DD Findings — 1915 South
**Source thread:** 2026-05-13 deep dive on three Justin-sent files: `2024 Financials 1915 South Stores.xls`, `2024ConsolidatedMonthlyFinSt 5th3rd.xls`, `2025AshleyMonthlyFinSt_1915 South.xlsx`.

**Status:** Findings durable for Fran to cite. Specific numbers tied to the 2024/2025 vintage. Recompute when next-year files land.

---

## 1. The $17M (Stores) → $10M (Total Consolidated) NI Bridge — 2024

The 2024 management/stores file reports $17.27M NI. The Fifth Third consolidated package reports $10.67M NI on the same period. **The $6.59M gap decomposes into 5 specific movements:**

| Step | Movement | Amount |
|---|---|---|
| 0 | 2024 Stores file NI (mgmt view) | $17.27M |
| 1 | + Other Corp REVENUE (Retail Sales line — origin unidentified) | +$3.77M |
| 2 | – Within-Ashley depreciation reclassification (Stores file under-recorded D&A) | –$1.61M |
| 3 | – Other Corp OPERATING EXPENSES | –$7.22M |
| 4 | – Interest Expense (entirely at Other Corp) | –$1.72M |
| 5 | + Other Corp Other Income, net | +$0.19M |
| | **= 2024 Lender Total Consolidated NI** | **$10.67M** ✓ |

### Other Corp Operating Expense Breakdown ($7.22M)

| Line | Amount | Type |
|---|---|---|
| Misc Advertising (strategic/corporate ads) | $3,634,515 | CASH |
| Depreciation (HQ + IT + fleet + TFII real estate per Justin) | $1,439,586 | PAPER |
| Travel (exec) | $753,532 | CASH |
| Donations | $565,232 | CASH |
| Corp Occupancy (HQ R&M, util, insurance, licenses) | $364,175 | CASH |
| Supplies | $259,495 | CASH |
| Advertising Salaries | $119,134 | CASH |
| Bank Service Charges | $74,473 | CASH |
| Small payroll-related | ~$13,000 | CASH |

### The Within-Ashley Depreciation Reclass (the specific "Period 13" evidence)

Same physical store assets, two different presentations:

| | Store-level Depreciation (R57 area) | YTD Net Income |
|---|---|---|
| 2024 Stores file | **$217,942** | $17.27M |
| 2024 Lender Ashley column | **$1,832,343** | $15.65M |
| Difference | **+$1,614,401** | -$1,614,401 |

The Stores file under-recorded D&A by $1.61M. **EBITDA impact: neutral (adds back). NI impact: +$1.61M inflated in Stores file.** This is the specific methodology fingerprint of the old CFO's "Period 13" practice referenced in Justin's 2026-05-11 disclosure.

---

## 2. The True EBITDA Gap is $1.82M, Not $3.55M

Adding back interest AND depreciation properly (correcting my earlier write-up which omitted interest on the consolidated side):

| | Ashley (Op Co) | Other Corp | Total Consolidated |
|---|---|---|---|
| Net Income | $15.65M | $(4.98M) | $10.67M |
| + Depreciation | $1.83M | $1.44M | $3.27M |
| + Interest | $0 | $1.72M | $1.72M |
| **EBITDA** | **$17.48M** | **$(1.82M)** | **$15.66M** |

**Cash EBITDA gap Op Co → Consolidated: $1.82M** (not $3.55M as the earlier `dd-memo.md` estimated — that figure was effectively EBDA, missing the interest add-back).

**Implications for Brady's bonus exposure:**
- Brady's 1.5% on $25M Op Co = $375K
- Brady's 1.5% on consolidated-equivalent ~$22.9M = $343K
- True annual exposure: **~$32K/yr**, not the $75K previously quoted

---

## 3. The 2025 File's PY Column Was Already Restated

The 2025 file's 2024 Prior Year NI = **$15.65M** — ties exactly to the **lender Ashley column**, NOT the original 2024 Stores file ($17.27M).

**Implication:** Justin has already partially restated 2024 historicals to a lender-aligned basis when building the 2025 template. The $1.61M depreciation reclassification has already moved INTO the prior-year baseline. If 2025 actuals are tracking on the same restated basis (high likelihood given same template), **the reported 2025 $25M EBITDA is closer to a consolidated-aligned number than the 2024 vintage was.** The reform is materially in motion, not pending.

**Sharp question for Justin (Bo can answer):** *"The 2025 PY column ties to Fifth Third's Ashley basis, not the original 2024 Stores file. Was 2024 restated when you built the template? And is 2025 actuals on the same restated basis?"* If yes → bonus exposure is small. If no → there's a methodology change still pending.

---

## 4. The $26.3M YoY Revenue Growth Decomposition

| Source | 2025 Contribution | % of Growth |
|---|---|---|
| **Same-store growth** (33 stores in both years) | **$22.92M** | **87%** |
| New stores (Yulee $2.96M from June + St.Augustine $0.46M from Nov) | $3.42M | 13% |
| **Total YoY** | **$26.34M (+16.5%)** | 100% |

**Same-store growth rate: +14.4%** ($159.2M → $182.1M ex-new-stores).

Annualized run-rate of the two new stores: ~$6-7M (Yulee ~$5M, St.Augustine ~$1-2M when ramped). **That's the 2026 baked-in tailwind before any same-store growth or further acquisitions.**

### Same-Store Standouts

- **Strong growers:** Tallahassee +24.9%, Panama City +28.2%, Valdosta +29.7%, JAX Town Center +8.3% ($1.32M absolute), SpFort +20.5%, Brunswick +26.7%, JAX Regency Outlet +28.7%
- **Sluggish:** Biloxi +1.8%, Albany +1.5%, Macon +1.0%, Dothan +3.3%
- **Only material decline:** JAX North -9.0% (-$606K) — cluster cannibalization with Yulee opening 25 mi north + JAX Regency Outlet expanding
- **E-commerce:** Total ecomm +40.7% (+$3.72M) — fastest-growing segment

---

## 5. Quartile Analysis — Occupancy is the Dominant Separator

Stores ranked by Net Income $, grouped into quartiles:

| Metric | Q1 (top 8) | Q2 (7) | Q3 (7) | Q4 (bot 8) | Q1-Q4 |
|---|---|---|---|---|---|
| Gross Sales ($M) | $76.2M | $41.2M | $29.3M | $26.0M | 2.9x |
| Net Income ($M) | $10.85M | $4.77M | $2.82M | $0.51M | 21x |
| Gross Margin % | 56.1% | 55.0% | 54.6% | 54.1% | **+1.9pp** |
| Store Payroll % | 12.9% | 13.1% | 14.0% | 13.8% | -0.9pp |
| Store Operating % | 3.8% | 3.6% | 2.5% | 4.2% | -0.4pp |
| **Store Occupancy %** | **7.3%** | 8.6% | 10.4% | **15.3%** | **-8.1pp** |
| Advertising % | 1.4% | 1.8% | 1.7% | 2.2% | -0.8pp |
| Warehouse Expense % | 9.4% | 9.2% | 9.4% | 9.7% | -0.3pp |
| Corp Allocation % | 7.1% | 7.1% | 7.1% | 7.0% | flat |
| **Net Income %** | **14.2%** | 11.6% | 9.6% | **2.0%** | **+12.3pp** |
| **EBITDA %** | **16.7%** | 13.8% | 10.6% | **4.4%** | **+12.3pp** |

**Key finding:** Gross Margin barely varies between quartiles (1.9pp spread). The dominant driver of NI variability is **OCCUPANCY % — an 8.1pp spread.** Bottom-quartile stores aren't losing because they're selling poorly-margined merchandise. They're losing because **occupancy is twice as heavy a burden** (15.3% vs 7.3% of sales). This is a **volume / fixed cost absorption** story, not a merchandising / labor story.

**Operating implication:** The lever to fix a bottom-quartile store is **volume** or **footprint** (downsize / close / consolidate). Margin-mix work or labor discipline alone won't bridge an 8pp occupancy gap.

### Quartile Membership

- **Q1 (top 8 by NI$):** JAXTownCenter, WinstonSalem, Columbus, Tallahassee, PanamaCity, Pensacola, Greensboro, SpFort
- **Q4 (bottom 8 by NI$):** Burlington, Yulee*, Enterprise, Albany, GreensboroOutlet, St.Augustine*, JAXNorth, JAXRegencyOutlet
- *Yulee + St.Augustine are partial-year new stores; their inclusion in Q4 isn't a fair operating comparison

---

## 6. 19-Year Revenue, Gross Margin, and NI Trend

Annualized revenue uses 2024 December seasonality factor (Dec = 9.6% of annual, 10.41x). 2024 and 2025 are actual.

| Year | Est. Revenue | GM Rate | YTD NI |
|---|---|---|---|
| 2007 | $50.5M | 43.3% | $0.5M |
| 2008 | $39.7M (**−21%**) | 46.1% | — |
| 2009 | $42.4M | 44.6% | $0.3M |
| 2010 | $45.7M | 42.3% | $0.7M |
| 2011 | $39.0M (−15%) | 45.0% | $0.2M |
| 2012 | $40.3M | 45.8% | $1.1M |
| 2013 | $42.2M | 53.3% | $2.2M |
| 2014 | $55.7M (**+32% Albany add**) | 47.6% | $3.1M |
| 2015 | $62.3M | 55.2% | $5.1M |
| 2016 | $81.0M (**+30% Ecommerce add**) | 49.1% | $6.7M |
| 2017 | $83.2M | 49.6% | $9.3M |
| 2018 | $85.7M | 48.6% | $7.0M |
| 2019 | $93.7M | 49.8% | $8.4M |
| 2020 | $106.9M (COVID +14%) | 53.7% | $9.1M |
| 2021 | $108.2M | 44.6% (**−9pp**) | $16.7M (**NI doubled**) |
| 2022 | $167.9M (**+55% Jacksonville add**) | 43.3% | $18.6M (peak) |
| 2023 | $151.1M (−10%) | 51.6% | $12.0M |
| 2024 | $159.2M | 55.0% | $11.5M |
| **2025** | **$185.6M (+16.5%)** | **55.4%** | **$21.3M (new high)** |

3.7x revenue from 2007 to 2025 (~7.4% CAGR), but not linear — three distinct eras:
- **Stagnation (2007-2013):** Six years flat at $40-45M
- **Organic build (2014-2021):** $56M → $108M (11.6% CAGR)
- **Acquisition + post-COVID (2022-2025):** $168M → $186M

---

## 7. 2007-2013 Was NOT a Closure Story — It's Worse Than That

Per-store revenue went DOWN during the recession while store count went UP:

| Year | # Stores | Est. Revenue | Per-Store Avg |
|---|---|---|---|
| 2007 (pre-recession) | 11 | $50.5M | **$4.6M** |
| 2008 | **14** (added 3 INTO downturn) | $39.7M | **$2.8M** |
| 2011 (trough) | 14 | $39.0M | **$2.8M (−40%)** |
| 2013 | 14 | $42.2M | $3.0M |
| 2014 | 13 | $55.7M | $4.3M (Albany roll-up) |

**Implication:** Adding stores INTO a downturn didn't bail them out. Three new stores opened 2008 — revenue still declined. The closure-as-relief lever was barely used (one true closure: Weekend Bargain Tville, 2014). **Per-store revenue today ($6.4M average) is 2.1x the 2011 trough ($2.8M).** Bigger fixed-cost base = bigger absolute swings in a downturn.

---

## 8. The Jacksonville Acquisition Scorecard (3 Years In)

| Store | 2025 Sales | NI % | Verdict |
|---|---|---|---|
| JAX Town Center | $17.3M | 9.6% | ✅ Win — biggest store in chain |
| JAX Orange Park | $7.6M | 9.0% | ✅ OK |
| Brunswick | $4.8M | 5.6% | ⚠️ Weak |
| JAX North | $6.2M | **-1.7%** | ❌ Losing |
| JAX Regency Outlet | $4.1M | **-4.6%** | ❌ Losing |

Net-additive (Town Center alone produces $1.66M NI vs the two losers' -$291K combined), but **not a clean 5-for-5 win.** JAX North looks like a relocation candidate, not a turnaround — Yulee opening 25 mi north (June 2025) + JAX Regency Outlet's growth in the same trade area are cannibalizing it.

---

## 9. COVID Stress Test Math (the cleanest sensitivity analog)

| Year | Revenue | YoY | GM Rate | NI | NI Margin |
|---|---|---|---|---|---|
| 2019 | $94M | — | 49.8% | $8.4M | 8.9% |
| 2020 | $107M | +14% | 53.7% | $9.1M | 8.5% |
| 2021 | $108M | +1% | 44.6% | $16.7M | 15.5% |
| 2022 | $168M | +55% | 43.3% | $18.6M | 11.1% |
| **2023** | **$151M (-10%)** | -10% | 51.6% | **$12.0M (-35%)** | 7.9% |
| 2024 | $159M | +5% | 55.0% | $11.5M | 7.2% |

**EBITDA elasticity to revenue: ~3.5x.** A 10% revenue decline cuts NI/EBITDA by ~30-35%.

**Applied to Brady's bonus risk:**
- 2026 baseline: $186M revenue → $25M EBITDA → $375K bonus
- 10% recession ($167M): EBITDA → ~$17.5M → bonus ~$262K (-$113K)
- 20% severe ($149M, '08-09 type): EBITDA → ~$11-12M → bonus ~$170K

---

## 10. GM Durability Decomposition

12pp of GM expansion from recession-era 43-46% to current 55%:

| Source | Estimated contribution | Durable? |
|---|---|---|
| Mix shift (higher-end Ashley product, accessories, Premier line) | +4-5pp | Mostly durable — Ashley product strategy |
| Scale / vendor terms (1915 South now #50 Furniture Today Top 100) | +2-3pp | Durable unless volume contracts hard |
| Sourcing shift (China → Vietnam/India) | +1-2pp | Durable IF Vietnam/India stable; at risk from Hormuz/tariff shocks |
| Promo cadence + pricing discipline | +1-2pp | Management-controlled, can flex |
| COVID-era residual pricing power | +1-2pp | **At risk** — competitive pressure if demand softens |
| **Total observed** | **~12pp** | |

**Estimated durable floor in a real downturn:** 48-50% GM. **At-risk band:** 5-7pp = ~$10-15M of gross margin on current revenue base. Bigger EBITDA risk than store-level operations.

---

## 11. Open Questions Generated by This Analysis

**Updates from 2026-05-13 Justin call (logged in `justin-corpus.md` §4 + §11):**
- **Misc Advertising $3.6M in Other Corp = RESOLVED.** Justin confirmed it's a Russell-era legacy advertising entity (essentially a shell company with two employees). NOT real corporate ad spend. Pure legacy misallocation.
- **JAX North operating loss = RESOLVED.** Confirmed closing **December 2025**. Lease already negotiated down from $850K annual to $400K lump sum. Volume migration plan: Town Center + Yulee absorb. **Update §8 JAX cluster scorecard:** JAX North is a known transition cost, not a chronic operating problem.
- **Russell rent flex = NEW MAJOR FINDING.** Russell will reduce rent on TFII-owned properties to keep Op Co P&L healthy in a downturn. Materially de-risks the bottom-quartile occupancy issue from §5. The fixed-cost framing for occupancy is too rigid — TFII properties are flexible at Russell's discretion.
- **EBITDA growth thesis = ADDED.** Justin's stated 18-month target: $35M+ EBITDA (from $25M baseline). Use as base case for personal financial modeling.

**Still open:**

1. **What is the $3.77M of "Retail Sales" in Other Corp (2024)?** Labeled identically to store retail sales but has zero COGS. Likely related-party / intercompany rebates, vendor allowances retained at corp, or service income. (The associated $3.6M *expense* line — Misc Advertising — is now resolved as legacy company artifact, but the *revenue* line origin is still unknown. Worth asking when conversation allows.)

2. **Has Justin's 2024 restatement been applied to 2025 actuals?** The 2025 PY column ties to lender basis ($15.65M), not original Stores ($17.27M). Confirm whether 2025 actuals carry the same lender-aligned methodology.

3. **What's the lease maturity profile across the 30-store base?** Bottom-quartile stores need volume OR footprint changes. Lease renewal windows are the natural lever points.

4. **Of bottom 8 stores, how many sit in TFII-owned vs third-party leases?** Determines whether closing 2-3 underperformers cascades carrying costs to Other Corp / Russell, or is clean third-party-lease exit.

5. **Was 2024 Q4 NI reset / one-timed?** R205 YTD NI in Dec24 archive = $11.48M, doesn't cleanly tie to stores file $17.27M or consolidated $10.67M. Some basis difference worth understanding.

---

## How to Refresh These Findings

When the 2026 file lands:
1. Re-run the YoY decomposition (same-store vs new-store) against 2025 actuals
2. Re-run quartile analysis ranked by NI$
3. Append 2026 to the 19-year trend table
4. Recompute the Op Co → Consolidated bridge if the 2026 5th3rd consolidated file is sent
5. Check whether the Recap tab Corp / Other Corp rows are wired (no longer #REF!) — that's the visible signal Justin completed the integration

When asking Justin a financial question, cite specific findings here. *"Looking at the 2025 quartile analysis (synthesis/financial-dd-findings §5), occupancy is the dominant separator at 7.3% vs 15.3% — is any of that solvable through real estate actions?"* lands better than abstract questions.
