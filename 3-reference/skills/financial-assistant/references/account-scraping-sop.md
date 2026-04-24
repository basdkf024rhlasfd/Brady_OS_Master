# Account Scraping SOP

How Finn pulls current data from each financial account. Prioritizes Chrome MCP automation where possible, falls back to manual steps.

Last updated: 2026-04-22

---

## Tool Priority

1. **Chrome MCP** (`mcp__claude-in-chrome__*`) — for browser-based portals with no API
2. **Playwright script** — for repeatable automated exports (Monarch)
3. **Manual prompt** — when automation is blocked (MFA, Cloudflare, captcha)

Always call `mcp__claude-in-chrome__tabs_context_mcp` first to see what's already open.

---

## Monarch Money (Transactions CSV)

**What it gives:** All transaction history across linked accounts.
**Script:** `3-reference/skills/financial-assistant/scripts/monarch-export.py`
**Manual fallback:**
1. Chrome MCP → navigate to `https://app.monarchmoney.com/transactions`
2. Click "Export" → "Download CSV"
3. Save to `3-reference/skills/financial-assistant/data/`

**Frequency:** Export before any financial skill run. If newest CSV is >14 days old, warn Brady.
**Login:** MONARCH_EMAIL / MONARCH_PASSWORD env vars (see script header)

---

## my529.org (College Savings)

**What it gives:** 529 balances per kid, contribution schedule, investment options.
**Reference file:** `references/529-accounts.md`

**Chrome MCP steps:**
1. Navigate to `https://my529.org`
2. Log in with Brady's credentials
3. Go to Account Summary — all five accounts listed with current balances
4. Extract: Account #, Beneficiary, Balance, YTD contributions
5. Update `references/529-accounts.md` and `references/balance-sheet.md` (529 section)

**Frequency:** Monthly. Pull before weekly-sweep if >30 days stale.
**MFA:** May require SMS code — prompt Brady if blocked.

---

## Fidelity (Rollover IRAs)

**Accounts:**
- Fidelity Rollover IRA ...3144 (Rollover IRA, ~$295,248)
- Existing Rollover IRA ...3164 (~$303,946)

**What it gives:** Current IRA balances, holdings, performance.

**Chrome MCP steps:**
1. Navigate to `https://www.fidelity.com`
2. Log in → go to Accounts & Trade → Portfolio
3. Filter to the two Rollover IRA accounts
4. Extract: Account balance, holdings, as-of date
5. Update `references/balance-sheet.md` IRA rows + `data.js` if running full cockpit

**Frequency:** Monthly for balance sheet. Quarterly for holdings detail.
**MFA:** Fidelity uses SMS/app MFA — prompt Brady if blocked.

---

## SoFi (Checking, Savings, Self-Directed Brokerage)

**Accounts:**
- SoFi Checking ...1907 (~$787 cash)
- SoFi Savings ...3072 (~$3 cash)
- SoFi Self-directed brokerage ...4841 (~$151)

**What it gives:** Cash balances, brokerage position. These flow through Monarch too — cross-reference.

**Chrome MCP steps:**
1. Navigate to `https://www.sofi.com` → log in
2. Dashboard shows all SoFi accounts with balances
3. Extract checking + savings + brokerage balances
4. Update `references/liquid-assets.md` (bank cash line) and `references/balance-sheet.md`

**Note:** SoFi balances already flow to Monarch via linked account — use Monarch CSV for transactions. Direct SoFi scrape is for balance sheet snapshot only.
**Frequency:** Weekly for liquid-assets.md (cash changes frequently).

---

## Betterment (Retirement / Investment)

**What it gives:** Investment balance — feeds into `liquid-assets.md` (Betterment cash equivalents line currently TBD).

**Chrome MCP steps:**
1. Navigate to `https://www.betterment.com` → log in
2. Dashboard shows portfolio total
3. Extract: Total balance, goal breakdown if relevant
4. Update `references/liquid-assets.md` Betterment line and `references/balance-sheet.md` if material

**Frequency:** Monthly. Required to complete the liquid-assets.md "Betterment cash equivalents: TBD" line.
**Note:** Betterment retirement funds are semi-liquid (taxable brokerage portion accessible; retirement portion has penalties). Clarify with Brady which portion is liquid.

---

## TriNet 401k (Food Innovations)

**Account:** TriNet 401k ...4-01 (~$100,058)

**Chrome MCP steps:**
1. Navigate to `https://www.trinet.com` → log in → Benefits → 401k
2. Or go directly to the 401k administrator portal (may be Transamerica, Principal, or similar — confirm)
3. Extract: Total balance, vested balance, contribution rate
4. Update `references/balance-sheet.md` 401k row

**Frequency:** Quarterly. 401k doesn't change as frequently as cash.
**Note:** This is Brady's employer-sponsored 401k — may have vesting schedule. Vested balance is what matters for net worth.

---

## Arvest Bank (Karissa's Checking)

**Account:** FREE BLUE ...9380 (Karissa's Arvest debit)

**What it gives:** Karissa's spending balance — flows through Monarch, but direct balance useful for liquid-assets.md.

**Chrome MCP steps:**
1. Navigate to `https://www.arvest.com` → log in
2. Check balance on 9380 account
3. Note: Karissa's card — coordinate if access is separate

**Note:** This account is already linked in Monarch — transaction data comes via CSV. Direct balance check only needed for liquid-assets.md snapshot.
**Frequency:** As needed.

---

## WageWorks (COBRA Administrator)

**What it gives:** COBRA election status, initial-payment confirmation, premium due dates, payment history, coverage-active flag. **The only authoritative source.** Gmail is unreliable — WageWorks emails are inconsistent and can be filtered out.

**Why this matters right now (2026-04-24):** COBRA 45-day initial-payment window from 03/01-02 election passed ~04/15. Zero WageWorks emails in 30-day Gmail scan. If initial payment was never submitted, 7-person family coverage since 01/01/2026 is retroactively void. See Streaming Notes `34ced43b-89c5-812f-835e-dc44d67d4c59` (3rd-sweep Finn Alert).

**Chrome MCP steps:**
1. Ensure Brady is at the keyboard — WageWorks login requires MFA and Brady's credentials (do NOT store).
2. Navigate to `https://participant.wageworks.com` (or COBRA-specific URL on Brady's election confirmation)
3. Brady logs in; accept MFA prompt
4. Extract from dashboard:
   - **Coverage status** — Active / Pending / Terminated / Election Not Completed
   - **Initial payment** — submitted date, amount, cleared status
   - **Next premium due date** + amount
   - **Last payment received** — date, amount, method
   - **Coverage period** — start date, through date
   - **Plan name** — underlying UHC plan (needed for formulary lookup)
5. Log findings to Finn KB Section 2 (confirmed facts) with date stamp
6. Update Section 3 open items — check off "COBRA initial payment verify"
7. If coverage is terminated / election void → **immediately** create Must Finn Alert in Streaming Notes (de-dup against existing COBRA alerts per Escalation Protocol)

**Frequency:** Initially on-demand until COBRA posture is resolved. Then monthly — verify next premium due + confirm last payment cleared.

**Note on anomaly-sweep mode:** The 2hr remote Conductor sweep can't run this SOP (no Brady presence for MFA). Queue as "Brady-action required" output and flag in the anomaly report.

---

## HELOC (Arvest)

**Account:** HELOC ...2261 (~$101,073 drawn, ~$300K available)

**What it gives:** Drawn balance, available credit — key for runway math.

**Chrome MCP steps:**
1. Navigate to `https://www.arvest.com` → log in
2. Find HELOC account → check drawn balance and available credit
3. Update `references/liquid-assets.md` HELOC available line and `references/balance-sheet.md`

**Frequency:** Monthly or when Brady makes a draw/payment.

---

## Patient Portals (Medical Records, Appointments, Messages)

Finn is authorized to navigate these on Brady's behalf to surface messages, upcoming appointments, lab results, visit summaries, and billing.

### Athena Patient Portal (Brady's adult care)

**What it gives:** Provider messages, upcoming appointments, visit summaries, lab results, Rx history, billing statements.
**URL:** TBD — Brady to provide (athenahealth portals are practice-specific, often `https://[practice].patientportal.athenahealth.com`)
**Login:** Brady's credentials (1Password or manual)
**MFA:** Likely — prompt Brady if blocked

**Chrome MCP steps:**
1. Navigate to the Athena portal URL
2. Log in (accept MFA challenge from Brady)
3. Check in priority order:
   a. **Messages** — unread provider messages (most time-sensitive)
   b. **Appointments** — upcoming (next 30 days), recent past (last 30 days with visit summaries)
   c. **Test Results** — any new labs/imaging
   d. **Medications** — current Rx list, refill status
   e. **Billing** — outstanding balances (cross-reference with Monarch + UHC claims)
4. Extract and log to:
   - Unread messages → `portal/public/family/kb/12-open-loops.md` with "Respond to [provider]"
   - Upcoming appointments → `portal/public/family/kb/11-week-ahead.md`
   - Outstanding bills → flag in Finn's financial review
   - New Rx or changes → `06-logistics-contacts.md` Active Rx section

**Frequency:** Weekly, or on-demand if Brady asks "any messages from my doctor" / "upcoming appointments"

### Living Tree Pediatrics (Kids' care — Dr. Savage)

**What it gives:** Pediatrician messages for all 5 kids, upcoming appointments, vaccination records, growth charts, visit summaries, Rx history (including Isla's methylphenidate refill status).
**URL:** TBD — Brady to provide (`livingtreepediatrics.com` or a patient portal subdomain)
**Login:** Brady's credentials
**MFA:** Likely

**Chrome MCP steps:**
1. Navigate to Living Tree portal
2. Log in
3. Kids are likely listed separately — iterate through each:
   - Lily, Faith, Isla, Luke, Quinn
4. For each kid, check:
   a. **Messages** — provider messages
   b. **Appointments** — upcoming + past
   c. **Growth charts** (for triplets especially, at age 9)
   d. **Vaccinations** — due/overdue
   e. **Prescriptions** — refill status, especially Isla's methylphenidate (NO REFILLS — need new Rx soon)
5. Extract to same targets as Athena above. Route per-kid data appropriately.

**Frequency:** Weekly, plus on-demand when Brady mentions a kid's health issue or upcoming appointment.

**Special handling for Isla's methylphenidate:**
- Controlled substance (C-II) — cannot be called in, requires written/electronic Rx
- Must renew before 30-day supply runs out
- Finn should surface "Isla Rx expires [date]" when <7 days from empty

### General Patient Portal Rules

- **Privacy:** T0 — never surface medical details outside Brady's private workspace or to any family chat/portal
- **Tone:** Factual, not diagnostic. Relay what providers said; don't interpret symptoms.
- **Never:** Submit forms, respond to provider messages, or change appointments without explicit Brady confirmation
- **Always:** Summarize what was found and what Brady needs to decide/respond to

---

## Walmart Pharmacy (Central Ave, Bentonville)

**What it gives:** Rx refill status, pickup readiness, price per medication, order history, payment method on file.
**Primary pharmacy for the family.** See `portal/public/family/kb/06-logistics-contacts.md` for active Rx tracking.

**Chrome MCP steps:**
1. Navigate to `https://www.walmart.com/pharmacy`
2. Log in with Brady's credentials
3. Dashboard shows: ready-for-pickup, in-process, recent orders, family members on the account
4. For each active Rx: extract medication, dose, fill date, next fill eligible date, price, tier/copay
5. Cache the Central Ave store phone number + address in `06-logistics-contacts.md`

**Active Rx to monitor (from `06-logistics-contacts.md`):**
- Brady: Generic Vyvanse — **Tier 3 at $70+, under investigation for tier reduction**

**Frequency:** Weekly scan for ready-for-pickup alerts. Monthly full audit of all active Rx + costs.
**Scrape priority:** MEDIUM — only matters when Rx is due or cost question is open.

---

## Formulary Lookup (Insurance Rx Tier Verification)

**What it gives:** Which tier a medication is on for the current insurance plan. Determines whether a Tier 3 charge is correct or whether a formulary exception / prior auth can move it down.

**How to look up:**
1. Identify the insurance plan (currently COBRA via WageWorks — underlying plan name TBD, Brady to provide card photo)
2. Search the plan's published formulary PDF or online lookup tool
3. Cross-reference the medication + dose against the tier list
4. If generic is on Tier 3 but typically Tier 1/2 elsewhere → candidate for formulary exception request
5. Also check: GoodRx price at the same pharmacy (may beat insurance), manufacturer coupons, prior auth options

**Data needed from Brady (one at a time — don't ask all at once):**
- Insurance card (front + back) to identify exact plan
- Current prescriber for Vyvanse (who writes the Rx)
- Dose and form (capsule vs chewable, mg)

**Output:** Recommendation — stay on current tier, request formulary exception, switch to GoodRx cash price, or other.

---

## Maxim / IVFH Position

**Not scrapeable** — private position held at Maxim Group. No online portal.
Balance tracked manually in `references/balance-sheet.md` as 350,000 shares × current IVFH price.

**To get current value:**
1. Search IVFH ticker on any financial site (Yahoo Finance, Google Finance)
2. Multiply share price × 350,000
3. Update balance-sheet.md Maxim row and note the as-of date

**Insider trading note:** Brady is on IVFH board until May 2026 annual meeting. Post-departure cooling period applies — do NOT suggest or facilitate any sale without confirming Brady's current board status and applicable window.

---

## Full Balance Sheet Refresh — Sequence

When running a full financial snapshot, hit accounts in this order:
1. Export Monarch CSV (transactions + linked account balances)
2. Scrape my529.org (balances update daily)
3. Scrape SoFi (cash positions — most volatile)
4. Check HELOC drawn/available (Arvest)
5. Scrape Fidelity IRAs (monthly)
6. Look up IVFH price × 350K shares
7. Update Betterment balance (monthly)
8. Update balance-sheet.md with all new values
9. Run `generate-data.py` to regenerate data.js
10. Commit and push
