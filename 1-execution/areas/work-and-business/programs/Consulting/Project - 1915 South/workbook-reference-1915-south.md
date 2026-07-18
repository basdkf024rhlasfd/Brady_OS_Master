# 1915 South — Monthly Financial Statement Workbook Reference
**Purpose:** Navigation guide and operating manual for the annual Ashley Monthly Financial Statement workbook. One file per fiscal year, recurring annually. This reference is durable across years; the sanity-check numbers below get updated when each year's actuals close.

**Original authorship:** Brady Smallwood writeup 2026-05-13, reconciled against direct workbook inspection. Lives alongside `justin-corpus.md` as project doctrine.

---

## Purpose of the Workbook

This workbook is the operating financial reporting pack for 1915 South (an Ashley HomeStore franchise owned by Turners Holding Corp). It rolls up monthly P&L by store → region → total company for the current FY, plus a 19-year archive of year-end snapshots (Dec06–Dec24). One file = one fiscal year. A new file is created each year by duplicating the prior year's template and clearing the actuals.

## When to Use This Skill

Trigger this reference when the user opens any file named `YYYYAshleyMonthlyFinSt_1915 South.xlsx` (or references 1915 South, Turners Holding, the Ashley franchise group, or any of the regions: Gulf Coast / GC, Thomasville / North FL / South GA, NC, Central, JAX). Also trigger on requests like: "pull YTD margin by store", "how did [store] do in [month]", "roll up the region", "fix the broken refs", "build the monthly recap", or any P&L variance question scoped to this entity.

## File Identity

- **Entity:** 1915 South (Ashley HomeStore franchise) / Turners Holding Corp
- **Fiscal year:** Calendar year (Jan–Dec). One workbook per FY.
- **File naming convention:** `YYYYAshleyMonthlyFinSt_1915 South.xlsx` (e.g., `2025AshleyMonthlyFinSt_1915 South.xlsx`). Earlier years used `.xls` format.
- **Reporting unit:** Actual dollars (NOT thousands or millions — raw $)
- **Sheet count:** 82 in 2025 file
- **All sheets are visible.** No hidden sheets, but 4 are stale/junk (see Gotchas).

## Sister Files in the DD Package

The Op Co workbook above is one of three files Justin sends. The complete picture requires the other two:

| File | What it is | Where unique value lives |
|---|---|---|
| **`YYYYAshleyMonthlyFinSt_1915 South.xlsx`** | THIS file — Op Co (Ashley) monthly P&L by store | Operating performance, store-level detail, multi-year archive |
| `YYYY Financials 1915 South Stores.xls` | Stores P&L (management/bonus view) | Per-store monthly detail for that FY; the basis the old CFO used for exec comp |
| `YYYYConsolidatedMonthlyFinSt 5th3rd.xls` | Lender-facing consolidated package (Fifth Third Bank) | **Only place "Other Corp" column exists** — donations, corp travel, misc advertising, real-estate D&A, interest expense |

**Critical rule for any consolidated-EBITDA or shadow-P&L work:** The Op Co file alone CANNOT answer questions about Other Corp or true consolidated EBITDA. You need the matching year's `ConsolidatedMonthlyFinSt 5th3rd` file. Per Justin's 2026-05-11 email, Other Corp captures items "not generally falling under the direction of the operating company team" — real estate depreciation, corporate-level overhead, debt service.

## Top-Level Numbers (FY2025 YTD through Dec)

Use these as sanity checks when reading the file. If your roll-up doesn't match within rounding, you've grabbed the wrong column.

- **Gross Sales:** $185.6M (Budget $165.0M, PY $159.2M — beating both)
  - Retail Sales $170.6M + Delivery $14.7M + Restocking Fee $64K
- **COGS:** $82.7M = 44.57% of sales (Budget 45.0%, PY 45.06%)
- **Gross Margin:** $102.8M = 55.43%
- **Store Payroll:** $23.0M = 12.4%
- **Total Operating Expenses:** $68.6M = 37.0%
- **Corporate Allocation:** $13.1M = 7.0%
- **Net Income:** $21.3M = 11.49%
- **EBITDA:** $25.1M = 13.5%

**Prior Year (2024) reference:**
- Gross Sales $159.2M | GM 55.0% | NI $15.65M | EBITDA $17.48M
- ⚠️ Note: the 2024 PY column in the 2025 file ties to the LENDER's Ashley view ($15.65M NI), NOT the original 2024 Stores file ($17.27M NI). The two views differ by $1.61M of depreciation reclassification within Ashley. The 2025 file appears to have been built on the restated lender basis for the PY comparison.

## Seasonality Factor (calibrated to 2024)

December = 9.6% of full-year sales. Annualization factor: **10.41x**. Verified: Dec24 Gross Sales $15.29M × 10.41 = $159.2M = FY2024 actual ✓.

Use this when annualizing partial-year data or the Dec## archive tabs. Has been roughly stable in the 9-10% range historically.

## Sheet Inventory (82 tabs, in tab order)

### 1. Annual Archive (positions 0–18) — Dec06 through Dec24

**⚠️ Common misread:** These tabs are NOT full FY P&L. Each Dec## tab contains:
- **Top section (rows 1-128):** December-MONTH-only P&L. Multiply Gross Sales by ~10.41 to get rough annual estimate.
- **Middle section (rows 131-208):** Balance Sheet as of Dec 31 of that year. Useful for cap structure history.
- **Bottom section (rows 214+):** December-month Cash Flow Statement.

**The full-year Net Income is at row 205** (`Y.T. D. Net Income`) inside the balance-sheet equity section. That's the cumulative annual NI, not a December-month figure.

Read-only historical reference. Use these for multi-year trend questions. Do NOT write to these tabs.

**Entity name evolution across the archive (useful for context):**
- 2006-2013: "Turners Holding Corporation - Ashley Division" (Ashley was *one division* — others included Turners Fine Furniture)
- 2014-2020: "Turner Furniture Holding Corp"
- 2021+: rebranded to "1915 South"

**Store count expansion (counted from row 6 headers, excluding rollup columns):**
- 2006-2007: 11 stores
- 2008-2013: 14 stores (added Panama City Beach + 2x Weekend Bargain)
- 2014-2015: 13 stores (closed Weekend Bargain Tville; Danville added 2015)
- 2018: 15 stores (added Macon, Warner Robins)
- 2019-2021: 20 stores (added Crestview, Fort Walton, Dothan, Enterprise, Panama City)
- 2022-2024: 27 stores (Jacksonville acquisition: JAX Town Center, JAX North, JAX Orange Park, Brunswick, JAX Regency Outlet + Pensacola Outlet + Valdosta)
- 2025: 29 stores (Yulee opened June, St.Augustine opened November)

### 2. Monthly P&L Tabs (positions 19–34)

Jan, Feb, Mar, Q1, Apr, May, June, Q2, July, Aug, Sept, Q3, Oct, Nov, Dec, Q4

Each monthly tab is the canonical source-of-truth for that month. Shape: ~442 rows × 87 cols. Layout: P&L line items in column A (left rail), then store columns laid out side-by-side. Each store occupies two columns: dollars and % of sales. Quarterly tabs (Q1–Q4) sum the three preceding months via direct cell formulas like `=Jan!F9+Feb!F9+Mar!F9`.

**Month name spellings used in formulas:** `Jan`, `Feb`, `Mar`, `Apr`, `May`, `June` (not Jun), `July` (not Jul), `Aug`, `Sept` (not Sep), `Oct`, `Nov`, `Dec`. Get these wrong and cross-tab formulas break silently.

### 3. Annual Roll-Up Tabs (positions 35–36)

- **`YTD`:** Full-year P&L. Formulas of the form `=Jan!F9+Feb!F9+...+Dec!F9` across every store column.
- **`YTDMargin`:** Gross margin % by store, YTD. Derived from YTD tab.

### 4. Per-Store Tabs (positions 37–73)

Each store tab is a 12-month time series for one location. Shape: 130–131 rows × ~33 cols.

**Column layout (verified):**
- Col A (1): P&L line item label
- Cols F-AC (6-30): monthly $ and % pairs. **Column anchors:**
  - C6=Jan$, C7=Jan%, C8=Feb$, C9=Feb%, C10=Mar$, C11=Mar%, C12=Apr$, C13=Apr%, C14=May$, C15=May%, C16=June$, C17=June%, **C18=1st Six Months $**, C19=H1 %, C20=July$, C21=July%, C22=Aug$, C23=Aug%, C24=Sept$, C25=Sept%, C26=Oct$, C27=Oct%, C28=Nov$, C29=Nov%, C30=Dec$, C31=Dec%
- **C32 (YTD$)**, C33 (YTD%) — these are the columns to pull for any store-level YTD analysis
- Each cell pulls from the monthly tab via formulas like `=Jan!F9`

**Stores grouped by region:**
- **Gulf Coast (GCRegion):** Mobile, Biloxi, SpFort, Pensacola, Crestview, FortWalton, PensacolaOutlet, GCEcomm
- **North FL / South GA (ThomasvilleRegion):** Tallahassee, Thomasville, Albany, Macon, WarnerRobins, Dothan, Enterprise, PanamaCity, Valdosta
- **Central AL/GA (no region tab):** Opelika, Columbus
- **Jacksonville (rolls into ThomasvilleRegion in 2024+):** JAXTownCenter, JAXNorth, JAXOrangePark, Brunswick, JAXRegencyOutlet, Yulee, St.Augustine, NFLEcomm
- **North Carolina (NCRegion):** Greensboro, WinstonSalem, Burlington, Danville, GreensboroOutlet, NCEcomm
- **All e-commerce:** Ecommerce (consolidated)

### 5. Summary / Consolidation Tabs (positions 74–78)

- **`Summary Monthly`:** Month-by-month consolidated P&L with Actual / Budget / PY / Variance columns. Column J/L hold management commentary.
- **`Summary Quarterly`:** Same structure rolled to quarter.
- **`Summary YTD`:** Same structure, full-year. **THIS IS USUALLY THE TAB EXECUTIVES READ.** Layout: col A = line item, col C = Actual $, col D = Actual %, col E = Budget $, col F = Budget %, col G = PY $, col H = PY %, plus variance columns. (Note: column positions are clean here — only 13 columns total.)
- **`Total AshIncECom`:** Ashley + Ecommerce roll-up (excludes Turners Fine Furniture if present).
- **`Recap`:** Dashboard-style grid. Rows = stores. Cols B–M = monthly Gross Sales and Net Income $ and % for each store. Cols R/S = YTD totals. Also contains placeholder rows 49-52 for `Corp`, `Other Corp`, `Total Turners Holding Corp` — currently #REF! errors (template carries the structure but the formulas aren't wired).

### 6. Junk / Stale Tabs (positions 79–81) — DO NOT WRITE TO

- **`Mob Clr`** (Mobile Clearance — deprecated, contains stale formulas)
- **`Blank`** (deprecated template, do not use)
- **`Do Not Use`** (deprecated tab kept for archeology)

Treat these as read-only and exclude from any roll-up or analysis.

## P&L Line-Item Structure (column A on monthly / YTD tabs)

Standard order, top to bottom. Use these row positions as anchors when scripting against a per-store tab:

| Row | Line item |
|---|---|
| R12 | Gross Sales |
| R19 | Total COGS |
| R20 | Gross Margin |
| R37 | Total Store Payroll Expense |
| R57 | Total Store Operating Exp |
| R64 | Total Store Occupancy Exp |
| R79 | Total Advertising Exp |
| R96 | Total Warehouse Payroll Exp |
| R113 | Total Warehouse Operating Exp |
| R120 | Total Warehouse Occupancy Exp |
| R122 | Total Warehouse Expense |
| R123 | Total Operating Exp |
| R124 | Corporate Allocation |
| R128 | Net Income |
| R129 | EBITDA |

Every $ line has a paired % line directly beneath (or to the right of) it expressing the value as % of Gross Sales.

## Column Layout Cheat Sheet — Monthly Tabs and YTD Tab

Stores laid out left-to-right by region. Approximate column anchors on the YTD tab (each store has $/% pair):

- Col A: P&L line item label
- Col B–E: Total Company $/%/Budget$/Budget%
- Col F–G: Mobile $/%
- Col H–I: Biloxi $/%
- Col J–K: SpFort $/%
- Col L–M: Pensacola $/%
- Col N–O: Crestview $/%
- Col P–Q: FortWalton $/%
- Col T–U: GCEcomm $/%
- Col W–X: GCRegion total $/%
- (NC region columns AA–AM)
- (North FL region columns AN–CA)
- (Central AL/GA columns BG–BI)
- (JAX cluster columns BJ–BX)
- Col 79 ("Total" / "Total Ashley Incl Ecommerce"): grand total $

**Don't trust column positions blind** — always verify against the header row (row 5 or row 6) before computing. Positions shift as stores are added or removed across years.

## Column Layout — Per-Store Tabs

12-month time series. Col A = line item. Cols F–AC = monthly $/% pairs (F=Jan$ through AC=Dec%). Col 32 = YTD $, Col 33 = YTD %.

## Formula Conventions

- **Monthly tabs are SOURCE OF TRUTH.** Everything else (Q-tabs, YTD, per-store, Summary) pulls from them.
- Cross-tab references use simple addition: `=Jan!F9+Feb!F9+Mar!F9` (NOT SUM across a 3D range).
- YTD tab uses 12-month addition: `=Jan!F9+Feb!F9+Mar!F9+Apr!F9+May!F9+June!F9+July!F9+Aug!F9+Sept!F9+Oct!F9+Nov!F9+Dec!F9`
- Per-store tabs pull each month's value individually: `=Jan!F9` in col F, `=Feb!F9` in col H, etc.
- % rows are computed locally as `=row$/Gross Sales$` rather than pulled cross-tab.
- An external SharePoint workbook is also referenced for some Summary values: `1915 South Financials Budget to Actual - YYYY.xlsx` / `Total` sheet. Columns of interest there: `GC`=Actual YTD, `BL`=Budget YTD, `GE`=Prior Year YTD, `BB`=Dec Actual, `DL`=Dec PY. If those external links break, Summary cells will show as stale cached values — always refresh links before quoting.

## Known Issues / Gotchas

These are LIVE in the FY2025 file. Flag them; offer to fix only on request.

1. **Summary YTD #REF! errors** in column E (Budget %) at rows ~26, 33, 53, 65, 66, 92. Root cause: a Management Salaries / Advertising detail row was deleted from the source. The cells display #REF! but the upstream Actual values are intact.

2. **Recap tab rows 36–37** (Central Ecomm line) are entirely #REF! across all months — same deleted-source-row problem. Fix: replace with `=Total AshIncECom!...` references or just clear the row.

3. **Recap tab rows 49-52** (`Corp`, `Other Corp`, `Total Turners Holding Corp`) are placeholder rows for the consolidated entity view, all currently #REF!. Template carries the structure but formulas aren't wired. **Worth fixing if/when Brady wires the Other Corp view into the Op Co package** (per Justin's 2026-05-11 directive that the CFSO role should plug into Other Corp).

4. **Mob Clr, Blank, Do Not Use sheets** contain stale formulas / broken refs. Exclude from automation.

5. **Month name spellings in formulas:** `June` not `Jun`, `July` not `Jul`, `Sept` not `Sep`. Get this wrong and you'll silently add 0.

6. **The Total AshIncECom sheet INCLUDES e-commerce.** There's also a `Total` sheet referenced externally that may not. Confirm which "total" the user wants before answering.

7. **JAX stores were added in 2022** — they won't exist in pre-2022 archive tabs (Dec06–Dec21). Don't assume column positions are stable across the archive.

8. **The workbook is large** (82 sheets, monthly tabs ~442 rows × 87 cols each). Reads should be scoped to specific ranges, not whole sheets. Use targeted cell pulls over whole-sheet reads when possible.

9. **Reporting unit is RAW DOLLARS, not thousands.** A Gross Sales figure of 185,604,231 means $185.6M, not $185.6B. Watch the magnitude when restating in narrative.

10. **Other Corp is NOT in this file.** It's a separate consolidated entity that lives only in the `YYYYConsolidatedMonthlyFinSt 5th3rd.xls` sister file. The Op Co file knows the entity exists (placeholder rows in Recap, Notes Payable - TFII on every balance sheet) but doesn't carry the column.

## Common Tasks — How to Do Them

### Pull total company YTD P&L

Read `Summary YTD` columns A:I. Col A = label, C/D = Actual $/%, E/F = Budget $/%, G/H = PY $/%, plus variance columns. Skip rows with #REF! and note them. Don't reconstruct from monthly tabs unless the user explicitly asks — the Summary already does the work.

### Pull a single store's YTD

Read `<StoreName>` columns A:AG. Col 32 = YTD $. Cols 6-30 = monthly time series if you need the cadence.

### Rank stores by gross margin

Use `YTDMargin` tab — it's prebuilt. Don't recompute from scratch.

### Compare a month vs budget vs PY

Use `Summary Monthly` for the month-by-month variance view. Each month has Actual/Budget/PY/Var columns.

### Region roll-up

Use the Region tabs directly (GCRegion, ThomasvilleRegion, NCRegion). Do NOT sum the individual store tabs — you'll miss any region-level allocations and double-count if a store moves regions mid-year.

### Multi-year revenue trend (2007–current)

**Method A (preferred):** Read R205 (`Y.T. D. Net Income`) of each Dec## tab — this gives the cumulative annual NI for that year, on the consolidated basis the workbook uses internally.

**Method B (for annual revenue):** Read December monthly Gross Sales from the top P&L section of each Dec## tab (R12 in the "Total Ashley Incl Ecommerce" column), then multiply by ~10.41 to annualize. Calibrate the seasonality factor against the most recent fully-closed year.

**Do NOT** treat the top P&L section of Dec## tabs as full-year — those are December-month-only.

### Bridge Op Co (stores) NI to true Consolidated NI

You need BOTH files for the year:
1. `YYYYAshleyMonthlyFinSt_1915 South.xlsx` → Summary YTD or Total AshIncECom for Op Co NI
2. `YYYYConsolidatedMonthlyFinSt 5th3rd.xls` → `YTD` tab columns 5 (Ashley) / 7 (Other Corp) / 9 (Total Consolidated)

For 2024, the bridge was: Stores NI $17.27M → +Other Corp Rev $3.77M → −Within-Ashley depreciation reclass $1.61M → −Other Corp Opex $7.22M → −Interest $1.72M → +Other Income $0.19M → Consolidated NI $10.67M.

### Same-store vs new-store revenue growth

Compare store-tab list between prior year file and current year file. Stores in BOTH = same-store base; stores only in current year = new openings; stores only in prior year = closures.

For 2025: 33 same-store base + Yulee (June open) + St.Augustine (November open) = 35 store tabs.

### Fix #REF! errors

Confirm with user first which detail row was deleted. The fix is typically either (a) restore the source row in the relevant monthly tab and re-point the Summary formula, or (b) collapse the Summary line into a sibling row and delete the broken cell. Default to option (b) for speed.

## Formatting Conventions

- **Dollar values:** standard accounting format, no thousands separator on input cells, parentheses for negatives in display.
- **Percent rows:** formatted as 0.00% or 0.0%; underlying value is a decimal (0.5543, not 55.43).
- **Header rows:** bold, often with a fill color matching the region (Gulf Coast = light blue, NC = light green, etc. — not perfectly consistent, don't depend on it).
- **Frozen panes:** typically 7–9 rows × 5 cols frozen on monthly and store tabs for readability.
- **Column A widths** are wider (~30) to fit line-item labels; data columns are uniform (~12).

## Behavior Rules

1. When the user asks a P&L question, **default to reading the Summary tabs FIRST.** They're pre-aggregated and faster.
2. **Never sum monthly tabs to reconstruct YTD when the YTD tab exists** — the YTD tab is authoritative and might include reclassifications.
3. **Never write to Dec06–Dec24 archive tabs.** Never write to Mob Clr, Blank, Do Not Use.
4. When restating numbers in chat, always include the unit ($M or $B) and the period (YTD vs month vs quarter). Raw dollars in this file are easy to misread.
5. Flag #REF! and stale-link issues proactively the first time you encounter one in a session, then stop mentioning them unless they affect the answer.
6. For any variance question, always pull all three columns (Actual / Budget / PY) and lead with the bigger gap. A $20M beat vs budget is a different story than a $26M beat vs PY — don't conflate them.
7. The `Recap` tab is the executive dashboard. If the user asks for "the recap" or "the monthly summary by store", go there first.
8. **For any consolidated EBITDA or Other Corp question, pull the sister `5th3rd.xls` file.** Do not estimate from the Op Co file alone.
9. **For multi-year trend questions on the archive (Dec##) tabs, use R205 YTD NI** — do not read the top P&L section as full-year.

## Done When

- The user has the number or analysis they asked for, with the period, unit, and source tab named.
- Any #REF! or stale-link encountered along the way is flagged, with a one-line fix offer.
- No writes were made to archive, junk, or stale tabs.

---

## Update Log

- **2026-05-13** — Initial reference written. Reconciled Brady's writeup against direct workbook inspection. Corrected the "Dec## = full FY P&L" misread (they're December-month only; YTD NI lives at R205 in balance sheet section). Restored 6 lost bullet items from paste. Added sister-file references and the seasonality factor. Linked to Justin's 2026-05-11 Other Corp clarification.

## When the FY2026 File Arrives

When the next year's file shows up (`2026AshleyMonthlyFinSt_1915 South.xlsx`), don't rewrite this doc — append a short "What's new in FY2026" section at the bottom with:
- Any new stores opened or closures
- Updated top-level sanity-check numbers
- Any structural changes Justin/Bo make to the template
- Recalibrated seasonality factor (December as % of full year)
