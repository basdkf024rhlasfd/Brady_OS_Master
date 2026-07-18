---
name: financial-anomaly-review
agent: Finn (0-agents/custom-built-agents/finn.md)
description: |
  Cross-source review of shared household financial activity to surface transactions, patterns, and
  behavioral anomalies that warrant Brady's review. Pulls from Monarch transaction exports, Brady's
  Gmail (order confirmations, shipping notices, refund emails), shared Walmart/Amazon order history,
  USPS Informed Delivery, and known subscription records. Produces a structured list of "worth a
  look" items that Claudine (or another agent) can fold into a broader financial briefing for Brady.

  TRIGGER whenever Brady says: "run the financial review," "anything weird on the cards,"
  "check the household spend," "karissa review," "spouse transaction review," "shared account
  check," "any flags on the accounts," "financial surveillance," "anomaly check on spending,"
  or any variation requesting a review of household financial activity for unusual items.
  Also trigger as part of the weekly sweep rollup if Brady has it enabled, and any time Brady
  asks for a "financial briefing" or "money review" that isn't just budget vs actuals.

  This skill owns cross-source financial anomaly detection. It does NOT own budget tracking
  (budget-baseline), daily news (daily-news-digest), or general email triage (email-summary).

  BOUNDARY vs financial-assistant: This skill = adversarial/private T0 detection on
  household/shared activity (Karissa spending patterns, ship-to mismatches, cash-adjacent
  transfers). Output is private-only and must NEVER reach the portal /financial-assistant
  chat surface or any family-shared resource. financial-assistant = positive cockpit
  (net worth, pipeline, runway). If Brady's request is "snapshot" / "how are we doing" /
  "budget check" → route to financial-assistant. Overlap phrases like "financial review" /
  "money review" → ask Brady which lens he wants.

  IMPORTANT: This skill surfaces patterns and flags items. It does NOT characterize intent,
  make accusations, or draw conclusions about behavior. Brady interprets what the flags mean.
  The skill produces data; the human produces judgment.

owner: brady
trust_tier: T0
surfaces: [chat, cowork, claude-code]
version: 0.1
created: 2026-04-21
---

# Financial Anomaly Review

Cross-source review of household financial activity. Pulls signal from every available surface
where money moves, ships, subscribes, or refunds — cross-references them — and surfaces the
items that don't fit the normal pattern.

Designed to run as a module inside a broader financial briefing, not as a standalone report.
Output folds into whatever the calling agent is already producing.

---

## Scope and boundaries

**What this skill monitors:**
- Transactions on accounts visible in Brady's Monarch export (shared checking, credit cards,
  HELOC-linked accounts)
- Brady's own Gmail inbox for order confirmations, shipping notices, refund emails,
  subscription receipts
- Shared Walmart and Amazon order histories (via Brady's login)
- USPS Informed Delivery notifications for Brady's household address
- Known subscription list (maintained in Notion if one exists; skill prompts to create if not)

**What this skill does NOT monitor:**
- Karissa's personal email, messaging, or accounts she has not shared
- Any account or data source Brady does not already have legitimate access to
- Personal private communications of any kind
- Geolocation, device activity, or anything surveillance-like

**What this skill does NOT do:**
- Make accusations or characterize intent
- Conclude that a transaction is "suspicious" or "hidden" — only that it's unusual relative to
  historical patterns
- Generate outbound communication (emails to Karissa, messages to anyone else) — T3 gate applies
  and this skill is T0 by design
- Persist findings outside Brady's private workspace

---

## Inputs

The skill can be invoked with zero arguments (defaults to "last 7 days since last run") or with
a specific time window:

- `window`: "last_7_days" (default), "last_30_days", "since_last_run", or a specific date range
- `accounts`: optional filter — defaults to all shared accounts from Monarch
- `verbose`: if true, include every flag regardless of score. Default false (only returns
  items scoring above threshold).

---

## Data sources and how to read them

### 1. Monarch transaction export
Path: `/mnt/user-data/uploads/Transactions_*.csv` or latest from `~/Downloads/` if running in
Cowork with filesystem access.

Primary signal. All anomaly detection anchors off this file. Filter to the window first, then
run detectors.

### 2. Gmail — order confirmations and shipping notices
Use Gmail MCP. Relevant searches:
- `from:(auto-confirm@amazon.com OR shipment-tracking@amazon.com) newer_than:{window}`
- `from:(walmart.com) newer_than:{window}`
- `from:(target.com OR orders@target.com) newer_than:{window}`
- `subject:(refund OR "return received" OR "gift card") newer_than:{window}`
- `subject:(subscription OR "recurring charge" OR "auto-renew") newer_than:{window}`

For each hit, extract: sender, subject, date, dollar amount (regex from body), items if parseable.

### 3. Walmart order history
Walmart MCP or direct scrape of `walmart.com/orders` via Chrome. Pull orders in window.
For each: order date, total, items, shipping address, payment method.

**Flag specifically:** orders shipped to addresses other than Brady's primary residence.

### 4. Amazon order history
Same pattern via Amazon. Amazon's return/refund activity is a particularly high-signal source
for this skill — see Detector 5 below.

### 5. USPS Informed Delivery
USPS Informed Delivery emails come to Gmail. Search:
- `from:USPSInformeddelivery@email.informeddelivery.usps.com newer_than:{window}`

Each email lists mail pieces. Cross-reference with known incoming bills, expected deliveries,
and any mail that suggests financial instruments (cards, checks, account statements) arriving
from unexpected institutions.

### 6. Known subscriptions baseline
Check Notion Reference Layer for a page titled "Known Subscriptions" or similar. If it doesn't
exist, the skill should note this as a gap and suggest creating one. The baseline helps Detector 4
distinguish "new subscription" from "existing subscription I already accepted."

---

## Detectors

Each detector produces zero or more flags. Each flag has:
- `severity`: low | medium | high
- `category`: which detector fired
- `description`: one-line description of what was found
- `evidence`: the specific data (transaction ID, email subject, order number)
- `suggested_next_step`: "ask Karissa casually," "check with her directly," "monitor," or "no
  action needed"

### Detector 1 — Large transactions
Flag any single transaction over $300 that is NOT in a known recurring pattern (mortgage,
utilities, Betterment, 529, etc.).

Severity:
- $300–$500: low
- $500–$1,000: medium
- $1,000+: high

### Detector 2 — Unusual merchant or location
Flag transactions where the merchant OR the location does not appear in the trailing 90-day
history. Geo-anomaly detection uses the Original Statement field's city/state suffix.

Brady and Karissa have a known Utah spending pattern (Orem/Lindon cluster) — treat that as
baseline, not anomaly. Flag Utah transactions only if merchant is new to the pattern.

### Detector 3 — Round-number transfers or cash-adjacent activity
This is the high-priority detector for the stated goal. Flag:
- Venmo/Zelle/PayPal transfers to individuals (not merchants) — any amount
- Cash App activity
- ATM withdrawals larger than Brady's typical pattern ($60 median — flag anything $200+)
- Western Union, MoneyGram, or any wire transfer
- Cashier's checks, money orders
- Transactions at check-cashing businesses
- "Cash back" amounts on POS transactions (visible in some Original Statements)
- Gift card purchases above $50 at any merchant
- Cryptocurrency exchange activity (Coinbase, Kraken, Gemini, Binance)

Severity defaults to medium for these; high if the amount is over $500 or if the pattern is
new (not seen in trailing 90 days).

### Detector 4 — Subscriptions and recurring charges
Flag any recurring charge that:
- Is new in the window (didn't exist in trailing 90 days)
- Matches a known subscription in the baseline but at a higher dollar amount
- Appears to be a trial converting to paid (common merchants: streaming, apps, memberships)
- Was cancelled previously but is billing again

### Detector 5 — Return and refund irregularities
This is the other high-priority detector. Flag:
- Returns processed at physical stores (Walmart, Target) in amounts over $100 — because these
  can generate store credit or cash that doesn't show up in Monarch at all
- Amazon returns where the refund method is "gift card balance" rather than original payment method
- Returns where the item doesn't match any purchase in Brady's visible order history (suggests
  the original purchase was made through an account Brady doesn't see)
- Multiple returns at the same merchant within a short window
- Return-without-receipt patterns (Walmart's ID-verification return process — visible in some
  statements)
- "Adjustment" credits from merchants where no return event is documented

### Detector 6 — Duplicate or double-charges
Flag any two or more transactions within 48 hours where:
- Same merchant
- Amount within $1 of each other
- Both appear to be purchases (not one purchase + one refund)

Most are legitimate (two Target runs same day) but surface them for review.

### Detector 7 — Spending velocity and behavioral shifts
This is the highest-lift detector. Compute for the window:
- Transaction count vs. trailing 90-day weekly average
- Total dollar volume vs. trailing 90-day weekly average
- Number of distinct merchants vs. baseline
- Time-of-day distribution (are transactions clustering at unusual hours?)
- Geographic dispersion (new cities appearing)

Flag a behavioral shift if:
- Transaction count is 2+ standard deviations above baseline
- Dollar volume is 50%+ above baseline AND not explained by one-time large items flagged in
  Detector 1
- New merchant cluster (5+ new merchants in a category that previously had stable patterns)

Severity is always medium for velocity shifts — they're signals to watch, not conclusions.

### Detector 8 — Ship-to address mismatches
For each Walmart/Amazon order in the window, verify shipping address matches Brady's primary
residence. Flag any order shipped elsewhere with: address, items (if visible), date.

Legitimate reasons exist (gifts, sending things to kids at camp, ordering to a parent's house).
Flag for Brady to confirm, don't conclude.

### Detector 9 — Mail from unexpected financial institutions
From USPS Informed Delivery analysis, flag mail from:
- Banks or credit unions Brady doesn't have accounts with
- Credit card issuers Brady isn't aware of
- Collection agencies
- Any institution whose name Brady doesn't recognize

---

## Output format

The skill returns a structured block that the calling agent can embed in a larger briefing.
Format:

```
## Financial anomaly review — {window}

**Summary:** {N} flags across {M} detectors. Highest severity: {high|medium|low}.

### High severity ({count})
- [{category}] {description} — {evidence}. Suggested: {next_step}.

### Medium severity ({count})
- [{category}] {description} — {evidence}. Suggested: {next_step}.

### Low severity ({count})
[collapsed by default; list only on verbose=true]

### Gaps
- {any data sources that were unavailable or produced no results when they should have}
- {e.g., "No 'Known Subscriptions' baseline in Notion — recommend creating one"}
```

If zero flags fire, output is a single line: `Financial anomaly review: no flags this window.
{N} transactions scanned across {M} sources.`

---

## Tone when surfacing flags

Critical. The calling agent (usually Claudine) reports these flags to Brady. The tone rule:

- **Neutral**, not alarmist. "Target return for $247 on 4/18" not "suspicious return."
- **Factual**, not interpretive. "New merchant: ShopWM Nutrition, $128, Orem UT" not
  "unknown Utah store, concerning pattern."
- **Actionable**, not accusatory. "Worth confirming the shipping address on this one" not
  "this was sent to an address you don't recognize."

The skill surfaces; Brady interprets. If the agent starts adding interpretation or characterization,
it's out of scope.

---

## Privacy and handling

- Findings from this skill are T0 (observe only) and stored only in Brady's private workspace
- Never surface findings to any family-shared resource (family chat bot, shared calendar, etc.)
- Never include findings in any Telly outbound message, even to Brady, unless the outbound
  channel is explicitly Brady-only and encrypted
- Never draft communication to Karissa, family members, or anyone else based on findings
- Findings older than 90 days are archived; don't re-surface them in subsequent runs unless
  Brady explicitly asks for historical review
- The existence of this skill is not publicized anywhere outside Brady's private OS

---

## Dependencies

- Monarch transaction export (CSV) — required
- Gmail MCP — strongly recommended; reduces false positives substantially
- Walmart MCP or Chrome access to walmart.com/orders — recommended for ship-to detection
- Amazon MCP or Chrome access to amazon.com/orders — recommended for refund method detection
- USPS Informed Delivery email subscription active on Brady's Gmail — recommended for Detector 9
- Notion Reference Layer with "Known Subscriptions" page — recommended for Detector 4
  (skill prompts to create if missing)

If a data source is unavailable, the skill notes the gap in output and runs the detectors it can
run. It does not fail closed.

### Detector 10 — Medical reimbursement candidates

Finn is authorized to submit claims on Brady's behalf to UHC (COBRA) and Aflac, but only after Brady confirms. This detector surfaces the candidates.

Flag any transaction where:
- Monarch category = `Medical`, `Pharmacy`, or `Health & Fitness`
- Amount > $20
- Date is within the last 12 months
- The charge is NOT already in `references/medical-claims-tracker.md` with `claim_status` = `submitted` or `reimbursed`

**Urgency tiers:**
- **URGENT (red):** Date of service > 9 months ago — UHC's 1-year filing deadline approaching
- **Standard:** 3–9 months old
- **Recent:** < 3 months old (track now, submit next cycle)

**Aflac vs. UHC:** Flag Aflac separately. UHC reimbursement = overpayment on covered services, copay assist, out-of-network claims. Aflac = accident/illness supplemental payouts triggered by qualifying events (hospital stays, ER visits, surgery). Both have different claim processes and deadlines.

**Output for each flag:**
- Date, merchant/provider, amount, estimated type (copay | Rx | specialist | lab | therapy)
- Status in tracker (not tracked | tracked-pending | URGENT)
- Suggested action: "Add to medical-claims-tracker.md and submit to UHC" or "Verify Aflac trigger"

**Tracking file:** `3-reference/skills/financial-assistant/references/medical-claims-tracker.md`  
Finn populates new rows from Monarch; Brady updates `claim_status` as he submits/receives.

Severity: medium for standard, high for URGENT (>9 months from service).

---

## Future enhancements (not implemented in v0.1)

- Plaid integration for real-time account monitoring (would reduce reliance on Monarch exports)
- Automated baseline recalibration (currently uses trailing 90 days; could use rolling adaptive
  window)
- Integration with Brady's Conductor workspace for scheduled weekly runs
- Cross-reference with family calendar to auto-explain some anomalies
  (e.g., travel spend during a known trip)
- Sentiment/topic analysis on Gmail order notifications (flagging "birthday," "anniversary,"
  "gift" language in confirmations as context)

---

## Version history

**v0.2 (2026-04-22)** — Added Detector 10: Medical reimbursement candidates. UHC + Aflac claim tracking, urgency tiers, links to medical-claims-tracker.md.

**v0.1 (2026-04-21)** — Initial creation. Cross-source detection framework, 9 detectors, T0 gate, private-only output.
