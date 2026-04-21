---
name: financial-assistant
description: >
  Unified personal + business financial cockpit. Parses Monarch Money CSV exports,
  enriches with Gmail invoice/receipt scanning, Calendar bill tracking, and Notion
  consulting pipeline data. Produces cash flow, budget vs actual, consulting revenue,
  and upcoming obligations.

  TRIGGER THIS SKILL whenever Brady says: "financial snapshot", "money picture",
  "run financials", "how are we looking financially", "cash flow", "budget check",
  "financial update", "check the finances", "run the financial assistant",
  or any variation requesting a personal/business financial overview.

  This skill runs standalone or feeds into morning-sweep (compact mode) and
  weekly-sweep (detailed mode). Also publishes an HTML dashboard to mception.ai.
---

# Financial Assistant

Unified personal + business financial picture from Monarch CSV exports, Gmail,
Calendar, and Notion consulting pipeline. Designed for a single dad with variable
consulting income and five kids — an operator's cockpit, not a budgeting lecture.

## Why This Exists

Brady's financial picture lives across Monarch Money (transactions), Gmail (invoices,
receipts, payment confirmations), Google Calendar (bill due dates), and Notion
(consulting pipeline). No single tool shows the combined view. The morning and weekly
sweeps had placeholder Monarch sections that always failed because there's no API.

This skill bridges the gap: Brady exports CSVs from Monarch periodically, drops them
in a folder, and the skill crunches everything into a financial snapshot with real
numbers — spending vs budget, cash flow, consulting revenue, and what's coming up.

## Execution Environment

**Runs on:** CoWork (Claude Desktop) on Brady's Mac
**Local access:** Gmail MCP, Google Calendar MCP, Notion MCP, local file system
**Data source:** Monarch CSV exports in `3-reference/skills/financial-assistant/data/`
**Scheduled:** On-demand, or called by morning-sweep / weekly-sweep
**Also:** Publishes HTML dashboard to mception.ai (`/financial-assistant`)

## Output Modes

The skill produces three output modes depending on how it's called:

| Mode | Trigger | Output |
|------|---------|--------|
| `morning-summary` | Called by morning-sweep | Compact 6-line block for the `FINANCES` section |
| `weekly-summary` | Called by weekly-sweep | Detailed multi-section block for `FINANCIAL WEEK` |
| `full` (default) | Standalone trigger | Complete financial snapshot with all sections + HTML dashboard |

---

## Pre-Flight (Silent)

1. **Check for CSV data.** Scan these locations in order for Monarch `.csv` files:
   1. `~/Downloads/` — where Monarch exports land by default
   2. `3-reference/skills/financial-assistant/data/` — local skill data folder
   Use the **newest** CSV found across both locations. If a newer file is in Downloads, copy it to `data/` for archival before processing.
   - If no CSVs found in either location: warn "No Monarch data — operating on Gmail/Calendar/Notion only"
   - If newest CSV is >14 days old: warn "⚠️ Monarch data is [N] days stale — drop a fresh export"
2. **Load reference files:**
   - `references/data-sources.md` — master registry of all data files, coverage dates, staleness, dedup rules
   - `references/accounts-reference.md` — account names, owners (Brady/Karissa/Kids), classification rules
   - `references/category-mappings.md` — Monarch categories → unified categories + return detection + Utah detection
   - `references/budget-targets.md` — monthly budget by category + income targets
   - `references/consulting-rate-card.md` — active clients, rates, invoice schedule
3. **Determine date context.** Current date, day of month, days remaining in month, month progress %.
4. **Check data-sources.md for scrape targets.** If any HIGH-priority scrapes are marked Missing, note them in output.

---

## Phase 1: INGEST (Silent — gather everything)

### 1.1 Monarch CSV Parse
- Read Monarch CSV files (from Downloads or `data/` — whichever is newest, per Pre-Flight step 1)
- Columns: `Date, Merchant, Category, Account, Original Statement, Notes, Amount, Tags, Owner`
- **Amount convention:** Negative = money spent. Positive = returns/refunds/income/transfers.
- **CRITICAL DEDUPLICATION:** Multiple Monarch exports may overlap. See `references/data-sources.md` for file-specific date ranges and dedup rules. General rule:
  - `Financial history through Jan 26.csv` → use for **pre-Feb 2026** only
  - `Financial history through 4.9.26.csv` → use for **Feb 2026 onward** only
  - Never sum overlapping date ranges across files
- Split transactions by owner using `references/accounts-reference.md` (Brady / Karissa / Kids / Shared)
- Apply `references/category-mappings.md` for category normalization
- Detect Utah transactions using Original Statement keywords (see category-mappings.md)
- Flag merchant returns: positive amounts excluding transfers/income/payroll patterns
- Track high-frequency merchants individually (Walmart, Amazon, Target, DoorDash — never aggregate into "Other")

### 1.1b Supplementary Data Parse
- **Venmo CSVs** (`VenmoStatement_*.csv`) — NOT in Monarch. Safe to add. Columns differ (see header row 3).
- **Arvest CSV** — Same transactions as Monarch, different format (Credit/Debit columns). Cross-reference only, DO NOT double-count.
- Check `references/data-sources.md` for current status of all data files and what needs refreshing.

### 1.2 Gmail Financial Scan
Search Gmail for financial signals (last 30 days):
- `subject:(invoice OR receipt OR payment OR statement OR "amount due" OR "payment confirmation")`
- `from:(venmo OR paypal OR stripe OR square OR zelle OR quickbooks)`
- `subject:(tax OR 1099 OR W-2 OR "estimated payment")` (flag for tax items section)
- For each match: extract sender, approximate amount (if parseable), date
- Classify as: Invoice Sent, Payment Received, Bill/Statement, Tax Item

### 1.3 Calendar Financial Scan
Query Google Calendar for next 30 days:
- Events containing: bill, payment, due, invoice, tax, financial, insurance, mortgage, rent
- Cross-reference with known recurring bills from `accounts-reference.md`
- Build upcoming obligations list with dates and estimated amounts

### 1.4 Notion Consulting Pipeline
Query Client Projects DB (`c8a6b2d70d9343839a16c950c95a6066`):
- Active clients with engagement status
- Cross-reference with `consulting-rate-card.md` for expected monthly revenue
- Identify: active retainers, hourly engagements, pipeline prospects
- Check for any financial-tagged items in Streaming Notes DB

---

## Phase 2: CRUNCH (Silent — analyze everything)

### 2.1 Spending by Category
For each category in `budget-targets.md`:
- Current month actual (from CSV)
- Monthly budget target
- Delta (over/under)
- Percentage used vs month progress percentage
- Flag: `🟢` (<80% at current pace), `🟡` (80-100%), `🔴` (>100%)

### 2.2 Cash Flow
- Total income MTD (consulting payments + other income from CSV + Gmail payment confirmations)
- Total expenses MTD (from CSV)
- Net cash flow MTD
- Rolling 30/60/90-day averages (if CSV data covers enough history)
- Runway calculation: current liquid balance / average monthly burn = months of runway

### 2.3 Consulting Revenue
For each active client:
- Expected monthly revenue (from rate card)
- Invoiced this month (from Gmail sent invoices)
- Received this month (from CSV deposits or Gmail payment confirmations)
- Outstanding (invoiced but not yet received)
Pipeline total: active retainers + probable close + possible close

### 2.4 Upcoming Obligations
Next 30 days, chronological:
- Known recurring bills (from Calendar + CSV patterns)
- One-time obligations (from Calendar events)
- Estimated quarterly tax payment (if in window)
- Total upcoming obligations sum

### 2.5 Trend Detection
If CSV covers 2+ months:
- Top 3 categories with biggest month-over-month increase
- Any single transaction > $500 that's unusual (not recurring)
- Spending velocity: projected month-end total vs budget at current daily burn rate
- Income trend: this month vs last month

---

## Phase 3: REPORT

### Morning Summary Mode
Compact block for morning sweep's `💰 FINANCES` section:

```
───────────────────────────────────────────────────
💰 FINANCES (data through [YYYY-MM-DD])
───────────────────────────────────────────────────
$24K Pace:  $XX,XXX billed MTD (target $XX,XXX by day X) — [on track / $X,XXX behind / $X,XXX ahead]
Tax sweep:  [✅ swept / ⚠️ not swept] on last payment
Food/week:  $XXX this week vs $900 ceiling ([X] weeks at this rate = $X,XXX vs $3,900 budget)
⚠️ Over budget: [category] at XXX% ($XXX over)
📬 Outstanding invoices: [client] $X,XXX (sent [date])
📅 Due this week: [bill] $XXX ([day])
[If CSV stale: ⚠️ Monarch data is XX days old — drop a fresh export]
```

`$24K Pace` is always shown first. Compute expected-by-today as `$24,000 × (day_of_month / days_in_month)`.
Only show `⚠️ Over budget` if any category is >100%. Show top 1-2 items only.
Only show `📬 Outstanding` if there are unpaid invoices. Limit to top 2.
Only show `📅 Due this week` for items due in the next 7 days. Limit to top 3.

### Weekly Summary Mode
Detailed block for weekly sweep's `💰 FINANCIAL WEEK` section:

```
───────────────────────────────────────────────────
💰 FINANCIAL WEEK (data through [YYYY-MM-DD])
───────────────────────────────────────────────────

$24K BASELINE — [Month], Week [N]
  Gross billed MTD:   $XX,XXX  (target $XX,XXX by today — [+/-$X,XXX])
  This week:          $X,XXX   (floor $5,500 · target $5,539 · tier: SURVIVE / STABILIZE / THRIVE)
  Tax reserve swept:  [✅ / ⚠️ pending] on $XX,XXX received
  Operating (70%):    $XX,XXX available for bills + spending

MONTH-TO-DATE SNAPSHOT ([Month], day X of XX — XX% through month)
  Income:    $XX,XXX (consulting: $XX,XXX | other: $XXX)
  Expenses:  $XX,XXX
  Net:       +/-$X,XXX
  Runway:    X.X months at current burn

FOUR-BUCKET STATUS (🟡 = trending over, 🔴 = over)
  Fixed obligations:    $actual / $8,228  (XX%) [flag]
  Household ops:        $actual / $5,743  (XX%) [flag]
    └─ Food/consumables: $actual / $3,900  ($actual/wk avg — $900 ceiling) [flag]
  Savings:              $actual / $2,750  (XX%) [funded ✅ / not yet ⚠️]
  Tax reserve:          [swept ✅ / pending ⚠️]

CONSULTING PIPELINE
  [Client]: [type] — $X,XXX/mo — [status: invoiced/received/outstanding]
  ...
  Active revenue: $XX,XXX/mo | Pipeline: $XX,XXX

UPCOMING (next 7 days)
  [Day]: [bill/payment] — $XXX
  ...

TRENDS
  ↑ [category] up XX% vs last month
  ↓ [category] down XX% vs last month
  ⚡ Unusual: [description] $XXX on [date]

LAST 7 DAYS — TOP TRANSACTIONS
  [date] [description] $XXX [category]
  ... (top 5 by amount)
```

Tier classification: Survive = week billed <$7,000, Stabilize = $7,000–$9,599, Thrive = $9,600+.

### Full Mode (Default)
Complete standalone output combining all sections from Phase 2, plus:

```
═══════════════════════════════════════════════════
  FINANCIAL COCKPIT — [Month YYYY]
  Data through: [YYYY-MM-DD] | Generated: [now]
═══════════════════════════════════════════════════

$24K BASELINE SCORECARD
  Monthly target:     $24,000 gross ($5,539/wk)
  Billed MTD:         $XX,XXX  (XX% of monthly target)
  Expected by today:  $XX,XXX  ([on pace / $X,XXX behind / $X,XXX ahead])
  Net available (70%): $XX,XXX after 30% tax reserve
  Projected month-end: $XX,XXX  ([on track / shortfall $X,XXX])
  Current tier:        SURVIVE / STABILIZE / THRIVE

FOUR-BUCKET SCORECARD
  Bucket              Budget    Actual    Delta    %Used   Status
  Fixed obligations   $8,228    $X,XXX    +/-$XXX  XX%     🟢/🟡/🔴
  Household ops       $5,743    $X,XXX    +/-$XXX  XX%     🟢/🟡/🔴
    Food/consumables  $3,900    $X,XXX    +/-$XXX  XX%     🟢/🟡/🔴
  Savings             $2,750    $X,XXX    +/-$XXX  XX%     🟢/🟡/🔴
  Tax reserve (30%)   $7,200    [swept?]  —        —       ✅/⚠️
  ─────────────────────────────────────────────────────
  Total spend         $16,721   $XX,XXX   +/-$XXX  XX%

[All remaining sections from weekly summary, expanded]

PERSONAL vs BUSINESS SPLIT
  Personal spend: $XX,XXX (XX%)
  Business spend:  $X,XXX (XX%)
  Consulting revenue: $XX,XXX
  Net business:    +/-$X,XXX

FULL TRANSACTION LOG (current month)
  [All transactions sorted by date, grouped by week]

TAX ITEMS
  [Any tax-related emails or deadlines from Gmail/Calendar scan]
  Estimated quarterly payment: $X,XXX due [date]
```

---

## Phase 4: PUBLISH (Full mode only)

1. **Generate `data.js`** — write `window.COCKPIT_DATA` object to:
   - Primary: `portal/public/financial-assistant/data.js` (in brady-os repo)
   - Mirror: `/Users/bs/conductor/workspaces/mception-ai/harrisburg-v1/public/financial-assistant/data.js`

   The HTML template (`index.html`) is a stable artifact that reads from `data.js`. Do NOT regenerate `index.html` unless the template structure needs to change. Only regenerate `data.js`.

   **`COCKPIT_DATA` schema:**
   ```js
   window.COCKPIT_DATA = {
     generated: "ISO-8601 timestamp",
     dataThrough: "YYYY-MM-DD",          // last transaction date in Monarch CSV
     scrapedDate: "YYYY-MM-DD",          // last scrape date
     csvStaleDays: Number,               // days since last CSV export

     budget: {
       // $24K canonical baseline (from budget-targets.md)
       monthlyGrossTarget: 24000,
       weeklyGrossTarget: 5539,
       taxReservePct: 0.30,
       operatingPct: 0.70,
       tiers: [
         { name: "Survive",    weeklyGross: 5500,  annualGross: 286000 },
         { name: "Stabilize",  weeklyGross: 7000,  annualGross: 364000 },
         { name: "Thrive",     weeklyGross: 9600,  annualGross: 500000 }
       ],
       buckets: [
         { name: "Fixed obligations",   monthly: 8228, pct: 0.34 },
         { name: "Household ops",       monthly: 5743, pct: 0.24,
           items: [
             { name: "Food & consumables", monthly: 3900, weeklyTarget: 900 },
             { name: "Kids extracurriculars", monthly: 500 },
             { name: "Random fun",        monthly: 433 },
             { name: "Household projects", monthly: 333 },
             { name: "Allowances",        monthly: 280 },
             { name: "Clothes",           monthly: 167 },
             { name: "Lawn",              monthly: 130 }
           ]
         },
         { name: "Savings & investment", monthly: 2750, pct: 0.11,
           items: [
             { name: "Betterment (retirement)", monthly: 1500 },
             { name: "Kids college (529s)",      monthly: 1250 }
           ]
         },
         { name: "Tax reserve", monthly: 7200, pct: 0.30, rule: "30% swept on receipt" }
       ],
       slack: 79,
       totalSpend: 16721,             // spend + savings (ex-tax)
     },

     alerts: [{ type: "red"|"yellow", title, text }],

     topline: {
       aprilMTD: { amount, transactions, days },
       marchTotal: { amount, transactions },
       aprilReturns: { amount, count },
       utahSpend: { amount, transactions, weeks }
     },

     byOwner: { month, owners: [{ name, amount, pct, color }] },
     karissaVelocity: [{ label, amount, pct }],
     categories: [{ name, amount, pct, color }],
     merchants: [{ name, amount, note, flag }],

     utah: {
       totalSpend, transactions,
       returns: { amount, count },
       netSpend, weeks, address,
       merchants: [String]
     },

     recurring: [{ name, amount, method, autopay, flag }],
     openQuestions: [{ status, text }],
     dataSources: [{ name, status, coverage, action }],
     recentTransactions: [{ date, merchant, amount, category, owner, account }],

     burnRate: {
       fourWeekTotal, twelveWeekTotal,
       fourWeekWeekly, twelveWeekWeekly,
       deltaPct, trend,          // trend: "up" | "down" | "flat"
       alert                     // string or null
     },

     forecast: {
       daysElapsed, daysInMonth, monthProgressPct,
       projectedMonth, budgetMonth,
       byCategory: [{ bucket, actual, projected, budget, pctOfBudget, flag }],
       alerts: [{ bucket, projected, budget, over_pct }]
     },

     runway: {
       liquidAssets,             // from references/liquid-assets.md, null if TBD
       monthlyBurn,
       months, weeks,            // null if liquid is TBD
       status,                   // "red" | "yellow" | "green" | "unknown"
       alert
     },

     business: {
       month, revenue, expenses, net, margin,
       monthlyRecurringRevenue,
       revenueTransactions, expenseTransactions
     },

     consulting: {               // populated by skill run (Gmail/Notion enrichment), not generate-data.py
       month,
       invoicesSent: [{ client, amount, date }],
       invoicesReceived: [{ client, amount, date }],
       outstanding: [{ client, amount, daysOutstanding }],
       pipelineMRR,
       note
     }
   };
   ```

   `burnRate`, `forecast`, `runway`, `business` are computed in `scripts/generate-data.py`.
   `consulting` is written by this skill at runtime (Phase 1.2 Gmail scan + Phase 1.4 Notion pipeline).
   `runway.liquidAssets` reads from `references/liquid-assets.md` — Brady maintains this manually.
   `business` classification rules live in `references/business-vs-personal-rules.md`.

   - `budget` data comes from `references/budget-targets.md` ($24K baseline, four buckets, 30/70 split rule)
   - Transaction data comes from Monarch CSV parsing + scrape results
   - Color values: "green", "red", "yellow", "muted", "accent"
   - Status values: "resolved", "open", "partial", "stale", "done", "missing"
   - Owner values: "brady", "karissa", "kids"

2. **Copy `index.html` if missing** at mirror target. The template only needs to be copied once or when the UI changes.

3. **Log to console:** "Dashboard data published to mception.ai/financial-assistant"

---

## Edge Cases

- **No CSVs yet:** Run Gmail/Calendar/Notion only. Dashboard shows "No Monarch data — drop a CSV export to unlock spending analysis." Budget and cash flow sections show "—" instead of numbers.
- **Stale CSVs (>14 days):** Show staleness warning prominently. Still process the data — stale data is better than none — but flag the date clearly.
- **New accounts in CSV:** If a transaction references an account not in `accounts-reference.md`, flag it: "Unknown account: [name] — add to accounts-reference.md and mark personal/business."
- **Uncategorized transactions:** If Monarch category doesn't map in `category-mappings.md`, bucket as "Uncategorized" and flag for Brady to add a mapping.
- **Tax season (Q1/Q4):** Elevate tax items to top of output. Surface estimated quarterly payment deadlines.
- **Month boundary:** If run in the first 3 days of a month, also show prior month's final summary for review.
- **No consulting clients:** Skip consulting sections entirely. Don't show empty tables.

## What This Skill Does NOT Do

- **Not a budgeting app.** No enforcement, no guilt trips, no "you overspent on dining!" It reports facts and forecasts.
- **Not real-time.** Limited by CSV export frequency. Brady controls the refresh cycle.
- **Not tax preparation.** Surfaces tax-related items but doesn't calculate tax liability.
- **Not connected to any financial API.** All transaction data comes from manually exported CSVs.
- **Not investment tracking.** No portfolio, retirement, or market data. Stick to cash flow and spending.

## Data Dependencies

| File | Location | Required? |
|------|----------|-----------|
| Monarch CSVs | `data/*.csv` | No — degrades gracefully |
| Venmo CSVs | `data/VenmoStatement_*.csv` | No — supplementary |
| Arvest CSV | `data/Arvest*.csv` | No — cross-reference only |
| Data source registry | `references/data-sources.md` | Yes — dedup rules, coverage dates, scrape targets |
| Accounts reference | `references/accounts-reference.md` | Yes — owner attribution and account classification |
| Category mappings | `references/category-mappings.md` | Yes — category normalization, return detection, Utah detection |
| Budget targets | `references/budget-targets.md` | Yes — needed for budget comparison |
| Consulting rate card | `references/consulting-rate-card.md` | No — consulting sections skipped if absent |
