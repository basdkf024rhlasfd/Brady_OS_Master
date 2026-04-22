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

| Account (Monarch Name) | Owner | Type | Notes |
|-------------------------|-------|------|-------|
| Fidelity ROTH IRA (...9970) | Brady | Roth IRA | $69,452.29 as of 2026-04-22 |
| Fidelity Rollover IRA C (...3144) | Brady | IRA | $295,248.48 as of 2026-04-22 |

These are investment/retirement accounts — do NOT count toward liquid assets or runway.
Transactions from these accounts in Monarch: classify as Brady, type = Investment (not spending).

## Other Financial Platforms (Not in Monarch)

| Platform | URL | What's There | In Monarch? |
|----------|-----|-------------|-------------|
| Venmo | venmo.com | Brady's P2P payments | No — separate CSV exports |
| Greenlight | greenlight.com | Kids' debit cards/allowance | No |
| Betterment | betterment.com | Investment/savings | Transfers show in Monarch |
| HELOC (Arvest) | arvest.com | Home equity draws | Posts as transfers to 9380 |
