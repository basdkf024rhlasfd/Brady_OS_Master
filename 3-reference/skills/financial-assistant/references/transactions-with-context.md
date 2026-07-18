# Transactions With Special Context

Recurring merchants and transaction patterns Finn needs to understand beyond what the Monarch category tells him. When these hit the feed, he should know what they mean without asking.

Last updated: 2026-04-22

---

## Fixed Monthly Obligations

| Merchant | Amount | Account/Card | Context |
|---|---|---|---|
| Truist | $3,330/mo | Mortgage 6368 | Includes property tax escrow — do NOT add a separate Taxes line. Also covers home insurance premium if escrowed (verify). |
| WageWorks / COBRA | ~$3,000/mo nominal | variable | Lumpy payments — March 2026 saw $5,730 + $2,865 = $8,596 (catch-up / double month). Baseline monthly is $3K. Budget at $3K, but flag any month under $2K (missed) or over $5K (catch-up) for review. |
| Bridgecrest | $839/mo | variable | Escalade auto loan. Original ~$47K. Primary family vehicle. |
| SoFi auto-debit | $623.76/mo | SoFi Checking ...1907 | Brady's student loan (NOT auto loan) — loan account ...0455 |
| Allstate | ~$158/mo avg | variable | Home insurance + umbrella policy. Premium frequency may not be monthly (quarterly/semi-annual common). |
| Lincoln National | $89/mo | variable | Brady's life insurance, policy T400520958, set up Nov 2025. Resolved — RECURRING, expected. |
| AT&T | ~$214/mo | SoFi Checking | Phones + internet combined. Under "Fixed obligations" bucket. |
| City of Bentonville | ~$488/mo | variable | Utilities (water, sewer, trash). |
| Black Hills Energy | ~$247/mo avg | variable | Natural gas — seasonal, spikes in winter. |

## Known Recurring But Lower-Tier

| Merchant | Amount | Context |
|---|---|---|
| Anthropic | $93/mo avg (up to $200) | Claude Pro + business API. Business expense — belongs in business-vs-personal rules. |
| Apple | ~$19/mo | iCloud/services subscription. |
| Inferno MMA | ~$125/mo | Kids' BJJ — one or more kids enrolled. Household ops bucket. |
| WELLNESSA / Wellness & Courage | $140/session, 2–3x/mo (~$280–$420/mo) | **Two separate therapists, same practice.** Jill = Karissa's personal therapist. Johnna = couples therapist. Both bill as "WELLNESSANDCO AR" with slightly different suffix codes. NORMAL — do not flag as anomaly. Brady wants to explore billing UHC insurance — action item in medical-claims-tracker.md. |
| Bentonville School District | ~$80/mo avg | School fees — lunch, activities, extracurriculars. |
| Twin Peaks Rogers | ~$54/mo | Restaurant recurring — Brady. |
| Jem 8th Street | irregular ($5–$550) | Bentonville co-working/event space. Charges are inconsistent (day passes $5–$15, one-time $550 in Jan). Not a gym membership — Planet Fitness is separate. |
| Planet Fitness | $16.43/mo | Active gym membership — most recent charge Apr 17. Also had higher "IClub Fees SMALLWOOD" charges ($25–$54) Nov–Dec 2025, likely multi-person plan or annual fee. |
| The Source | ~$114/visit | Medical marijuana dispensary. Personal, private. Not for business classification or insurance review. |
| Casey's | ~$17/txn, frequent | Arkansas gas station. |
| Maverik | ~$17/txn, very frequent | Convenience/gas station. Frequent on Karissa's card. |
| 1st Green Lawn | ~$140/invoice | **Lawn treatment vendor.** Paid via SoFi Bill Pay, not Cash App. Address: 9685 AR-72, Bentonville, AR 72712. Last invoice #26031, dated 5/4/2026. Known-good — do not flag as anomaly. Pairs with Hugo Martinez (Cash App, mowing crew). |
| Cash App — Hugo Martinez | $65/visit (2026-05-09 onward); was $45/cut prior | **Lawn crew leader + summer maintenance.** Cash App from SoFi (...1907). Scope expanded summer 2026: mowing + mulch/rock area maintenance + weed control. Brady wants hands-off. Larger seasonal payments ($245–$450 end-of-season cleanup; $300 spring kickoff like Apr 26 2026) are normal. Treat all Cash App→Hugo as known-good. |

## Unresolved / Needs Verification

| Merchant / Pattern | Context | Status |
|---|---|---|
| Card ending 1842 | Walmart gift card. Split payment with Karissa's Arvest 2021 on Apr 1. Not linked in Monarch. Potential untracked spending channel. | **UNRESOLVED** — need Arvest login to verify linkage |
| Siloam Springs Clinic | $1,843 in March transactions, no email trail, no clear patient attribution | **UNKNOWN** — ask Brady |
| Zions Bancorporation | $15 deposit to Faith's MONEY card Jan 20. | **UNRESOLVED** — verify purpose |
| Arvest Bank — Online Banking | $324/mo avg, 3 months active | Likely HELOC draws. Cross-reference with liabilities growth. |
| Corebridge Financial | Policy link expired Dec 2025 | **May have lapsed.** Verify if separate life insurance is still active. |

## Monarch Miscategorizations (Known)

| Monarch Label | Actual | Notes |
|---|---|---|
| Costco — "MEMBERSHIP FEE MAR XX-FEB XX" ~$99 | Citi Mastercard annual fee (AAdvantage) | Recurs every March. Not a warehouse club membership. |
| Costco — store purchases | Cost Plus (grocery/home goods chain) | Monarch tags Cost Plus as Costco. Not the same. |

## One-Time Large Transactions to Watch

| Transaction | Typical Amount | Notes |
|---|---|---|
| County Tax | $7,059 (April annual) | Benton County property tax — verify NOT double-counted with Truist escrow |
| Springdale Bentonville | $2,443 (one-time) | Unknown — ask Brady |
| Norm The Tire Man | $389-655 per visit | Vehicle repairs (Escalade likely) |
| Delta Airlines | ~$390/mo across 2-3 mo | Travel — often consulting or family trips |
| Airbnb | ~$417/mo across 3 mo | Travel — likely trips or vacations |

## Income-Related (2026)

Currently none tracked MTD. When consulting receipts arrive, Finn should:
1. Classify per `business-vs-personal-rules.md` as consulting revenue
2. Flag if 30% is NOT swept to tax reserve on receipt
3. Update `consulting-rate-card.md` with invoice date and status
4. Cross-reference with Notion Client Projects DB

## Refund / One-Time Credits

- **2025 tax refund: $29,168** — deposited to routing 031130035 / account 00310000036 (likely SoFi Checking ...1907). One-time event. Not income.

---

## Rules of Thumb

- **Mortgage Truist $3,330+** appears in statements — includes escrow, single line item
- **Karissa's Arvest 9380** is her spending channel
- **Kids' cards (FREE BLUE 9004, MONEY 8535)** are children's spending — exclude from adult analysis
- **Anthropic + Apple + Delta** are frequently business-related — check business-vs-personal-rules.md for classification
- **Arvest Online Banking** line items are usually HELOC draws or transfers — not spending
