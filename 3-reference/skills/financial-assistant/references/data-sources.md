# Data Source Registry

Tracks all financial data sources: what we have, what's stale, what needs scraping.

Last updated: 2026-04-19

---

## Status Legend
- **Current** — Data is fresh enough for analysis
- **Stale** — Data exists but needs a fresh export
- **Missing** — No data collected yet
- **Supplementary** — Not primary, used for enrichment/cross-reference only

---

## PRIMARY: Monarch CSV Exports

| File | Coverage | Rows | Status | Notes |
|------|----------|------|--------|-------|
| `Financial history through Jan 26.csv` | Jul 2023 – Jan 2026 | 17,160 | Current | Deep history. Best for pre-2026 analysis. Karissa = "Family checking" |
| `Financial history through 4.9.26.csv` | Apr 2024 – Apr 9 2026 | 3,361 | Superseded | Replaced by Apr 19 export. |
| `Transactions_2026-04-19T22-16-00.csv` | All time – Apr 19 2026 | 13,788 | Current | Fresh export. Full account coverage including Amex. Karissa = "FREE BLUE (...9380)". |

### Deduplication Rules (CRITICAL)
- These files **OVERLAP** Apr 2024 – Jan 2026. **NEVER sum them.**
- **Pre-Feb 2026** → use File 1 only
- **Feb 2026 onward** → use File 2 only
- Feb 2026 in File 1 shows near-zero for Arvest (data gap from relinking) — NOT real

### Refresh Action
- [x] **Export fresh Monarch CSV** — Exported Apr 19, 2026. 13,788 rows, full account coverage.
- Priority: Done — refresh in ~7 days

---

## SUPPLEMENTARY: Bank & Payment Exports

| File | Coverage | Status | Notes |
|------|----------|--------|-------|
| `Arvest transaction details past year.csv` | Mar 2025 – Apr 2026 | Current | Raw Arvest bank export. **Same transactions as Monarch** — different column format (Credit/Debit vs Amount). DO NOT double-count. Use for cross-reference only. |
| `VenmoStatement_January_2026.csv` | Jan 2026 | Current | Brady's Venmo. **NOT in Monarch.** Safe to add for supplementary context. |
| `VenmoStatement_February_2026.csv` | Feb 2026 | Current | Same. |
| `VenmoStatement_March_2026.csv` | Mar 2026 | Current | Same. |
| `VenmoStatement_April_2026.csv` | Apr 2026 (partial) | Stale | Covers through ~Apr 9. Needs fresh export. |

### Refresh Actions
- [ ] **Fresh Venmo export** — venmo.com/account/statement → April 2026 → Download
- Priority: LOW — Venmo is supplementary

---

## SCRAPE TARGETS: Browser Automation Needed

These data sources require Chrome browser scraping (via `claude-in-chrome` MCP tools) because no CSV export exists or the CSV doesn't capture what's needed.

### 1. Walmart.com Order History
- **URL:** https://www.walmart.com/account/orders
- **Status:** SUBSCRIPTIONS COMPLETE (scraped Apr 24, 2026). Order history still PARTIAL (2 pages from Apr 17).
- **Data files:** `data/walmart-scrape-2026-04-17.md` (order history), `data/walmart-scrape-2026-04-24.md` (full subscription list + today's order)
- **Account (Apr 17 scrape):** Karissa S (Member since 2021) — order history account
- **Account (Apr 24 scrape):** Brady Smallwood, 4505 NE Birchgrove Pl, Bentonville. Payment card ending 2007 (Brady's Amex). Delivery Tuesdays 10am–12pm.
- **Key findings (Apr 17):**
  - Utah delivery confirmed: **196 Inglewood Dr, Orem, UT 84097** (necklace order Apr 17)
  - Brady's groceries ($353.11, 82 items) paid with Karissa's card (2021) to Bentonville
  - Karissa's Walmart list (40 items) still maintained
- **Key findings (Apr 24):**
  - **73 active subscriptions** fully documented — see `data/walmart-scrape-2026-04-24.md` and `references/grocery-subscriptions.md`
  - Cheese and tortillas already on bi-weekly cadence — no cadence gap
  - Subscription payment on Brady's Amex (...2007), not Karissa's card
  - Today's ad hoc order: $96.87 (Order #2000149-54375074) — buns, cheese, pizza, care package items, pool party items
  - Subscription changes confirmed by Karissa today (Apr 24) — routine management, not flagged
- **Remaining:** Paginate order history past page 2 to capture Mar 20 – Apr 9. Check Utah addresses and card 1842 usage.
- **Priority:** LOW (subscriptions done) / MEDIUM (order history pagination)
- **Date range:** Mar 20 – present (post-separation)

### 2. Amazon Order History
- **URL:** https://www.amazon.com/gp/your-account/order-history
- **Status:** COMPLETE (scraped Apr 17, 2026 — see `data/amazon-doordash-scrape-2026-04-17.md`)
- **Account:** Brady's Amazon (42 orders, past 3 months)
- **Key findings:**
  - ALL 42 orders ship to Brady L Smallwood — zero Utah deliveries
  - Only 2 return flags on Brady's account (vs 78 returns in Monarch)
  - **The Monarch Amazon returns must be from Karissa's own Amazon account**
  - Notable: Nest cameras ($499 total), robot vacuum ($547), Subscribe & Save Celsius
- **Priority:** Done — Karissa's Amazon account is the gap

### 3. DoorDash Order History + Payment Methods
- **URL:** https://www.doordash.com/orders + /consumer/payment/
- **Status:** COMPLETE (scraped Apr 17, 2026 — see `data/amazon-doordash-scrape-2026-04-17.md`)
- **Account:** Brady's DoorDash (brady.smallwood@gmail.com)
- **Key findings:**
  - **Delivery address currently set to 196 Inglewood Dr, Orem, UT** (Karissa's address)
  - **Card 1842 NOT saved** — only Visa 2021 (Karissa's Arvest debit) is the default
  - All visible orders (Mar 9 – Apr 1) are Bentonville restaurants — no Utah orders on this account
  - Mar 25 "new login from different device" (Gmail) → address changed to Utah → but no Utah orders placed
  - Karissa's Arvest card is the default payment on Brady's DoorDash
- **Priority:** Done

### 4. Arvest Online Banking — Account Details
- **URL:** https://www.arvest.com
- **Status:** Missing
- **What to capture:** Cards issued on 9380 account, HELOC balance and draw history, any linked accounts
- **Why:** Verify if card 1842 is linked to Karissa's account. Document HELOC draw acceleration ($4,700 in 4 days).
- **Priority:** HIGH
- **Scrape type:** Point-in-time snapshot, not historical

### 5. Target Order History
- **URL:** https://www.target.com/orders
- **Status:** Missing
- **What to capture:** Date, items, prices, payment method, delivery/pickup location
- **Why:** Target spending tripled post-separation. 29 returns ($577). Need item-level detail.
- **Priority:** LOW
- **Date range:** Mar 2026 – present

---

## SCRAPE TARGETS: Email Mining

These require Gmail MCP searches, not browser scraping.

### 6. Invoice / Payment Emails
- **Gmail queries:** `subject:(invoice OR receipt OR payment) after:2026/03/01` + vendor-specific
- **Status:** COMPLETE (scanned Apr 17, 2026). Subscription-specific re-scan Apr 24, 2026.
- **Key findings (Apr 17):** 50 threads captured. Recurring bills mapped. Business subscriptions identified. Karissa forwarding medical payment links.
- **Key findings (Apr 24 subscription scan):** Active subscriptions confirmed — Apple (Screens 5 VNC, Monarch), Amazon Subscribe & Save (Celsius Pink Lemonade, disposable cups). No new pricing alerts on Netflix/Spotify/Disney+/Apple One.
- **Finn scan behavior rules (set 2026-04-24):**
  - M365 subscription change emails → do NOT flag. Brady is aware, not concerned.
  - Walmart+ subscription change/confirmation emails → not urgent. Do not surface as alerts.
  - Platform data usage policy emails (GitHub Copilot, etc.) → not a financial flag. Skip.
- **Priority:** Done — refresh monthly

### 7. HELOC / Loan Notifications
- **Gmail queries:** `from:(arvest OR truist) subject:(HELOC OR mortgage)`
- **Status:** COMPLETE (scanned Apr 17, 2026)
- **Key findings:** Truist mortgage statements monthly (Jan/Feb/Mar). No HELOC-specific email alerts found — draws may not trigger email notifications from Arvest.
- **Priority:** Done — still need Arvest login (scrape #4) for HELOC balance

### 8. Insurance / Medical Bills
- **Gmail queries:** `from:(lincoln OR COBRA OR wageworks)` + `siloam springs`
- **Status:** COMPLETE (scanned Apr 17, 2026)
- **Key findings:**
  - **Lincoln National = Brady's life insurance.** Policy T400520958, set up Nov 2025. DocuSign completed. RESOLVED.
  - **Corebridge Financial** — separate life insurance policy link expired Dec 2025. May have lapsed.
  - **WageWorks/COBRA:** $5,730.90 (Mar 19) + $2,865.45 (Mar 13) = $8,596.35 in March. From Food Innovations Inc plan.
  - **Siloam Springs Clinic — STILL UNKNOWN.** No email results. $1,843 in Monarch data has no email trail.
- **Priority:** Done — Siloam Springs remains open question

### 9. DoorDash Email History (Supplementary)
- **Gmail query:** `from:doordash after:2026/03/01`
- **Status:** COMPLETE (scanned Apr 17, 2026)
- **Key findings:**
  - Brady's orders: Cronuts, Ziggi's Coffee (x3), Pickleman's, Raising Cane's, McDonald's — all Bentonville
  - **Mar 25: NEW LOGIN from different device** + verification code — possible Karissa accessing Brady's DoorDash from Utah
  - Some DoorDash emails routed via Apple Private Relay (Karissa's device)
- **Priority:** Done — still need DoorDash.com scrape (#3) for delivery addresses and saved payment methods

---

## OTHER DATA (Manual / In-progress)

| Source | Status | Location | Notes |
|--------|--------|----------|-------|
| Walmart order tracker (manual) | Exists | Excel file — not in data/ yet | Sheet "Order Summary" — ship-to, who ordered, items, status |
| DoorDash order history | Exists | Separate file in project folder | Shows orders on Brady's account |
| Karissa health timeline | Exists | `Karissa health - Sheet1.csv` in Downloads | Treatment timeline, not financial |

---

## REQUIRED BUT MISSING

Files the skill expects but doesn't yet have. Finn emits a warning at the top of every run for each missing REQUIRED file.

| File | Status | Why required | Owner | Next action |
|---|---|---|---|---|
| `references/consulting-ar-ledger.md` | **Missing** | Without a living AR ledger, Finn can't answer "what's coming in" — every downstream projection (runway, month-end, tier status) degrades. Finn check 2026-04-23 exposed zero consulting deposits in last 30d with no way to distinguish AR gap from invoicing gap. | Finn (skill) | See Streaming Notes row `34ced43b-89c5-8186-8a44-ecbfb0ec2550` — schema + seed plan. Must priority. |

---

## ANALYSIS PERIODS (Standard Reference)

Always use these consistently across all analysis:

| Period | Dates | Weeks | What It Represents |
|--------|-------|-------|--------------------|
| Pre-Lockdown | Jul 2023 – Apr 2025 | 95.7 | Both adults spending freely on all cards |
| Post-Lockdown | May 2025 – Dec 2025 | 34.7 | After Amex cut. Spending migrated to Karissa's account. |
| Baseline (controlled) | Jan 1 – Feb 28, 2026 | 8.6 | Spending CAN be managed. Retail dropped to $370/wk. |
| Post-Separation | Mar 20 – present | varies | Karissa in Utah. Spending re-exploded to $2,194/wk. |

---

## REFRESH CHECKLIST

Run before any major analysis session:

- [x] Fresh Monarch CSV export — **DONE Apr 19** (13,788 rows, through Apr 19)
- [ ] Fresh Venmo statement (venmo.com → Download April) — current through ~Apr 9
- [x] Gmail financial email scan (Gmail MCP) — **DONE Apr 17** (see gmail-scan file)
- [x] Walmart.com subscription scrape — **COMPLETE Apr 24** (73 items, full cadence + cost data — see `grocery-subscriptions.md`)
- [~] Walmart.com order history scrape — **PARTIAL Apr 17** (2 pages, key Utah address found — order history pagination still needed)
- [x] Amazon order scrape (Chrome agent) — **DONE Apr 17** (42 orders, all Brady, no Utah)
- [x] DoorDash order + payment scrape (Chrome agent) — **DONE Apr 17** (orders + payment methods + address)
- [ ] Arvest HELOC balance check (Chrome agent) — NOT STARTED
- [ ] Target order scrape (Chrome agent) — NOT STARTED (low priority)

## OPEN QUESTIONS STATUS

| Question | Status | Source |
|----------|--------|--------|
| Lincoln National $89/mo | **RESOLVED** — Brady's life insurance, policy T400520958 | Gmail scan |
| Siloam Springs Clinic $1,856.68 | **ACTION REQUIRED** — submit to UHC as claim. Karissa likely has additional backlog. | Brady confirmed 2026-04-24 |
| Wellness & Courage $420 | **ACTION REQUIRED** — submit to insurance in future. Not a duplicate of WELLNESSA. | Brady confirmed 2026-04-24 |
| WELLNESSA $420 | **RESOLVED** — separate/legitimate charge from Wellness & Courage | Brady confirmed 2026-04-24 |
| Inferno MMA $377/mo | **RESOLVED** — Luke's BJJ dues (Kids / Child Activities) | Brady confirmed 2026-04-24 |
| WageWorks / COBRA | **RESOLVED for April** — Brady confirmed payment made 2026-04-24 | Brady confirmed |
| HELOC balance | **UPDATED** — $107K drawn, $193K available ($300K capacity) | Brady confirmed 2026-04-24 |
| Card ending 1842 | **UNRESOLVED** — gift card used in Orem. Need Arvest login to verify. | Need Arvest scrape |
| Karissa's Utah address | **PARTIALLY RESOLVED** — 196 Inglewood Dr, Orem, UT 84097 (Walmart). Also Eagle Mountain + SLC from DoorDash. | Walmart scrape |
| Zions Bancorporation | **UNRESOLVED** — $15 deposit to Faith's card Jan 20 | — |
| DoorDash account access | **NEW FINDING** — suspicious new login Mar 25, 8:05 PM from different device | Gmail scan |
| Karissa insurance claim backlog | **OPEN** — Brady suspects Karissa is behind on many out-of-pocket UHC submissions | Brady note 2026-04-24 |
