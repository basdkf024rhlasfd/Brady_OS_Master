# Balance Sheet

Snapshot of Brady's net worth. Sourced from Monarch. Updated manually — when real estate value shifts, loan balances update, or investment positions move materially.

Last updated: 2026-04-22
Source: Monarch Money + my529.org (manual) + Bridgecrest (manual)

## Summary

- **Net worth:** $1,396,839.02
- **Total assets:** $2,199,114.37
- **Total liabilities:** $802,275.35

## Assets

### Real Estate
- **Address:** 4505 NE Birchgrove Pl NE, AR 72712
- **Gross value:** $1,079,200
- **Mortgage balance:** $470,027.89
- **HELOC balance:** $101,073.25
- **Net equity:** $508,098.86

### Investments — $1,024,116.51 total

| Account | Type | Balance | Platform | Notes |
|---|---|---|---|---|
| Fidelity Rollover IRA ...3144 | IRA | $295,248.48 | Fidelity | Added to Monarch 2026-04-22 |
| Rollover IRA ...3164 | IRA | $303,945.68 | — | Pre-existing |
| TriNet 401k (Food Innovations ...4-01) | 401k | $100,058.23 | TriNet | — |
| Maxim IVFH — 350,000 shares | Brokerage (Taxable) | $150,000.00 | Maxim Group | Placeholder — recalculate: IVFH price × 350,000. Cost basis ~$1.50/share avg. Holding — price depressed. Private sale possible at ~15% discount; likely buyers: James, Denver, or Mark Schmulen. Brady on board until May 2026 annual meeting — insider trading rules apply; verify post-departure cooling period. |
| Fidelity ROTH IRA ...9970 | Roth IRA | $69,452.29 | Fidelity | Added to Monarch 2026-04-22 |
| ROTH IRA ...9170 | Roth IRA | $67,898.93 | — | Pre-existing |
| 2027 Trip for Faith 16 ...0660 | Brokerage (Taxable) | $8,207.32 | — | — |
| 2026 Beach ...0962 | Brokerage (Taxable) | $8,102.06 | — | — |
| Designated Beneficiary ...588 | Brokerage (Taxable) | $7,749.59 | — | — |
| 2028 vacations ...7775 | Brokerage (Taxable) | $4,482.72 | — | — |
| Roth Contributory IRA ...634 | Roth IRA | $3,886.58 | — | — |
| 2029 vacations ...4576 | Brokerage (Taxable) | $1,345.29 | — | — |
| Lily — Europe ...4368 | Brokerage (Taxable) | $1,286.58 | — | — |
| Authentic katana ...8810 | Brokerage (Taxable) | $964.83 | — | — |
| Random major purchase (Karissa) ...9170 | Brokerage (Taxable) | $592.19 | — | — |
| Triplets joint fund ...2484 | Brokerage (Taxable) | $521.67 | — | — |
| 2025 Tokyo ...0658 | Brokerage (Taxable) | $222.79 | — | — |
| SoFi Self-directed ...4841 | Brokerage (Taxable) | $150.98 | — | — |

**Summary by type:**
- IRA (Rollover): $599,194.16 (Fidelity ...3144 $295,248 + existing ...3164 $303,946)
- 401k: $100,058.23
- Roth IRA: $141,237.80 (Fidelity ...9970 $69,452 + existing ...9170 $67,899 + contributory ...634 $3,887)
- Brokerage (Taxable): $183,626.32

### 529 College Savings — $94,492.78 total

Brady is owner on all five. Full detail: `references/529-accounts.md`.

| Beneficiary | Account # | Balance | College Est. |
|---|---|---|---|
| Lily Smallwood | 201836929 | $31,950.90 | Fall 2027 ⚠️ |
| Faith Smallwood | 201836931 | $22,824.67 | Fall 2029 |
| Isla Smallwood | 201938828 | $13,239.07 | Fall 2035 |
| Luke Smallwood | 201938829 | $13,239.07 | Fall 2035 |
| Quinn Smallwood | 201938831 | $13,239.07 | Fall 2035 |
| **Total** | | **$94,492.78** | |

Contributing ~$1,260/mo total (twice-monthly). Lily's draw window is ~18 months out.

### Bank Cash — $1,305.08 total

| Account | Type | Balance |
|---|---|---|
| SoFi Checking ...1907 | Checking | $786.75 |
| FREE BLUE ...9380 (Karissa) | Checking | $363.88 |
| FREE BLUE ...9004 (Lily) | Checking | $89.98 |
| MONEY ...8535 (Faith) | Checking | $61.26 |
| SoFi Savings ...3072 | Savings | $3.21 |

## Liabilities — $802,275.35 total

| Account | Balance | Monthly Payment | Notes |
|---|---|---|---|
| Mortgage 6368 (Truist) | $470,027.89 | $3,330 | Includes property tax escrow — don't add Taxes separately |
| HELOC ...2261 (Arvest) | $101,073.25 | variable | Liquidity safety valve — balance grows when cash flow tight |
| SoFi Student Loan ...0455 | $75,264.96 | $623.76 | Brady's student loan (not auto) |
| Bridgecrest Auto Loan (Escalade) | $47,000.00 | $839 | Primary family vehicle. |
| Credit cards (aggregate) | $7,836.00 | variable | Marriott Bonvoy Amex ...2007, Citi AAdvantage ...2157, Capital One Venture ...1470 |

Net worth recalc after Bridgecrest added: **$2,199,114.37 - $802,275.35 = $1,396,839.02**

## HELOC Capacity

- **Drawn:** $101,073.25
- **Available to draw (estimated):** $300,000 — per Brady 2026-04-21

HELOC available is a liquidity lever but not free money — every dollar drawn accrues interest. Counts as accessible liquidity for runway math, not as savings.

## How generate-data.py uses this

The script reads this file to emit `COCKPIT_DATA.balanceSheet` and `COCKPIT_DATA.budgetBaseline`. It parses the Summary section and the HELOC Capacity section.

Update the snapshot date when real estate value shifts, loan balances materially change, or investment positions move >5%.
