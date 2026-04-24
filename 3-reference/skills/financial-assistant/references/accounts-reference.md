# Accounts Reference

Maps Monarch account names to owner, type, and classification.
The financial-assistant skill uses this to split transactions and attribute spending.

Last updated: 2026-04-17

## Brady's Accounts

| Account (Monarch Name) | Owner | Type | Card # | Platform |
|-------------------------|-------|------|--------|----------|
| Marriott Bonvoy Brilliant American Express Card (...2007) | Brady | Credit | 2007 | americanexpress.com |
| SoFi Checking (...1907) | Brady | Checking | — | sofi.com |
| SoFi Savings (...3072) | Brady | Savings | — | sofi.com |
| Citi AAdvantage (...2157) | Brady | Credit | 2157 | online.citi.com |
| Venture (...1470) | Brady | Credit | — | capitalone.com |

## Karissa's Accounts

| Account (Monarch Name) | Owner | Type | Card # | Platform |
|-------------------------|-------|------|--------|----------|
| Family checking | Karissa | Arvest debit | 2021, 0875 | arvest.com |
| FREE BLUE (...9380) | Karissa | Arvest debit | 2021, 0875 | arvest.com |

**Note:** "Family checking" and "FREE BLUE (...9380)" are the SAME account — naming changed between Monarch CSV exports. File 1 (through Jan 26) uses "Family checking". File 2 (through Apr 9) uses "FREE BLUE (...9380)".

## Kids' Accounts

| Account (Monarch Name) | Owner | Type | Card # | Platform |
|-------------------------|-------|------|--------|----------|
| FREE BLUE (...9004) | Lily (kid) | Arvest debit | — | arvest.com |
| MONEY (...8535) | Faith (kid) | Capital One MONEY | 8535 | capitalone.com |

**Rule:** Exclude kids' accounts from Karissa spending analysis. Faith's MONEY card is a child's card.

## Shared

| Account (Monarch Name) | Owner | Type | Notes |
|-------------------------|-------|------|-------|
| Mortgage 6368 | Shared | Truist mortgage | truist.com |

## Classification Rules

1. Brady's accounts → classify as "Brady"
2. Karissa's accounts (Family checking / 9380) → classify as "Karissa"
3. Kids' accounts → classify as "Kids" — exclude from adult spending comparisons
4. Mortgage → classify as "Shared/Housing"
5. Unknown accounts → flag for manual review

## Flagged Cards / Channels

- **Card ending 1842** — Walmart gift card used in-store in Orem, UT. Split payment with Arvest debit 2021 on Apr 1. Potential channel for untracked spending. Not linked in Monarch.
- **Zions Bancorporation** — Utah bank deposited $15 to Faith's MONEY card Jan 20. Possible Utah banking relationship. Investigate.

## Fidelity Investment Accounts (added to Monarch 2026-04-22)

**Managed by: Lighthouse Financial**

| Account (Monarch Name) | Owner | Type | Notes |
|-------------------------|-------|------|-------|
| Fidelity Roth IRA (...9970) | Brady | Roth IRA | $69,452.29 as of 2026-04-22 |
| Fidelity Rollover IRA C (...3144) | Brady | Rollover IRA | $295,248.48 as of 2026-04-22 |
| Fidelity Rollover IRA (...3164) | Brady | Rollover IRA | ~$303,946 as of last scrape |

These are investment/retirement accounts — do NOT count toward liquid assets or runway.
Transactions from these accounts in Monarch: classify as Brady, type = Investment (not spending).

**Pending intent:** Brady wants to roll the TriNet 401k (...4-01) into one of these Fidelity accounts. Coordinate with Lighthouse Financial when ready. Do not initiate without Brady's explicit instruction — verify any blackout or vesting constraints with TriNet first.

## TriNet 401k

| Account | Owner | Type | Notes |
|---------|-------|------|-------|
| TriNet 401k (...4-01) | Brady | 401k (former employer) | ~$100,058. From Food Innovations employment. **Rollover to Fidelity pending** — Brady's stated intent. Managed by TriNet; administrator may be Transamerica or Principal (confirm). |

Not in Monarch. Pull balance quarterly via trinet.com portal.

## Other Financial Platforms (Not in Monarch)

| Platform | URL | What's There | In Monarch? |
|----------|-----|-------------|-------------|
| Venmo | venmo.com | Brady's P2P payments | No — separate CSV exports |
| Greenlight | greenlight.com | Kids' debit cards/allowance | No |
| Betterment | app.betterment.com | Goal-based taxable savings/investing. 11 active goals, $25,841 total. All funded from SoFi 1907. $160/week recurring deposits. See Betterment goals table below. | Transfers show in Monarch as "Betterment" |
| HELOC (Arvest ...2261) | arvest.com | ~$101K drawn, ~$300K available | Posts as transfers |
| SoFi Brokerage (...4841) | sofi.com | Self-directed brokerage, ~$151 | May show in Monarch |
| Lincoln National | lincolnfinancial.com | Life insurance policy T400520958, $88.69/mo | No |

## Betterment Goals (as of 2026-04-22, all taxable — LIQUID)

All goals funded from SoFi Checking ...1907. Weekly auto-deposits every Monday.

| Goal | Balance | Status | Weekly Deposit | Notes |
|------|---------|--------|----------------|-------|
| 2026 Beach | $8,175.19 | Off track | $75/wk | This year's beach vacation |
| 2027 Trip for Faith 16 | $8,244.83 | Goal achieved ✅ | $50/wk | Faith turns 16 in 2027 |
| 2028 vacations | $4,485.98 | On track | $25/wk | |
| 2029 vacations | $1,352.27 | Off track | $10/wk | |
| Lily - Europe ($1.50:$1.00 match) | $1,286.58 | — | — | Brady matches Lily's contributions 1.5x |
| Authentic katana | $962.05 | Goal missed | — | Past target date |
| Triplets joint fund | $519.95 | — | — | Shared fund for Luke/Isla/Quinn |
| Random major purchase for Karissa | $590.92 | Off track | — | Pre-separation goal — review relevance |
| 2025 Tokyo | $222.81 | Goal missed | — | Past target date |
| Unexpected expenses that suck | $0.00 | — | — | Emergency buffer — unfunded |
| General Investing | $0.00 | — | — | Unfunded |

**Total Betterment: ~$25,841** (taxable, liquid — no withdrawal penalty)
**Total weekly outflow from SoFi 1907 → Betterment: $160/week (~$693/mo)**

**Budget classification: PRE-PAID EXPENSES, not savings.** These are earmarked for specific future spending (vacations, trips, purchases). Do NOT count toward savings rate or financial runway. Treat Betterment balances as committed/spoken-for cash — liquid in an emergency but not available operating capital.

⚠️ **Flags:**
- "Unexpected expenses that suck" = $0 — emergency buffer goal exists but is unfunded
- "Random major purchase for Karissa" — may be irrelevant post-separation; Brady to decide whether to redirect
- "Authentic katana" + "2025 Tokyo" — missed goals holding ~$1,185 combined; Brady to decide: cash out or repurpose
