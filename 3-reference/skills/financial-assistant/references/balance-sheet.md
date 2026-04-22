# Balance Sheet

Snapshot of Brady's net worth. Sourced from Monarch. Updated manually — when real estate value shifts, loan balances update, or investment positions move materially.

Last updated: 2026-04-21
Source: Monarch Money

## Summary

- **Net worth:** $984,645.47
- **Total assets:** $1,739,920.82
- **Total liabilities:** $755,275.35

## Assets

### Real Estate
- **Address:** 4505 NE Birchgrove Pl NE, AR 72712
- **Gross value:** $1,079,200
- **Mortgage balance:** $470,027.89
- **HELOC balance:** $101,073.25
- **Net equity:** $508,098.86

### Investments — $659,415.74 total

| Account | Type | Balance |
|---|---|---|
| Rollover IRA ...3144 | IRA | $303,945.68 |
| TriNet 401k (Food Innovations ...4-01) | 401k | $100,058.23 |
| Maxim IVFH — 350k shares | Brokerage (Taxable) | $150,000.00 |
| ROTH IRA ...5975 | Roth IRA | $67,898.93 |
| 2027 Trip for Faith 16 ...0660 | Brokerage (Taxable) | $8,207.32 |
| 2026 Beach ...0962 | Brokerage (Taxable) | $8,102.06 |
| Designated Beneficiary ...588 | Brokerage (Taxable) | $7,749.59 |
| 2028 vacations ...7775 | Brokerage (Taxable) | $4,482.72 |
| Roth Contributory IRA ...634 | Roth IRA | $3,886.58 |
| 2029 vacations ...4576 | Brokerage (Taxable) | $1,345.29 |
| Lily — Europe ...4368 | Brokerage (Taxable) | $1,286.58 |
| Authentic katana ...8810 | Brokerage (Taxable) | $964.83 |
| Random major purchase (Karissa) ...9170 | Brokerage (Taxable) | $592.19 |
| Triplets joint fund ...2484 | Brokerage (Taxable) | $521.67 |
| 2025 Tokyo ...0658 | Brokerage (Taxable) | $222.79 |
| SoFi Self-directed ...4841 | Brokerage (Taxable) | $150.98 |

**Summary by type:**
- IRA (Rollover): $303,945.68
- 401k: $100,058.23
- Roth IRA: $71,785.51
- Brokerage (Taxable): $183,626.32

### Bank Cash — $1,305.08 total

| Account | Type | Balance |
|---|---|---|
| SoFi Checking ...1907 | Checking | $786.75 |
| FREE BLUE ...9380 (Karissa) | Checking | $363.88 |
| FREE BLUE ...9004 (Lily) | Checking | $89.98 |
| MONEY ...8535 (Faith) | Checking | $61.26 |
| SoFi Savings ...3072 | Savings | $3.21 |

## Liabilities — $755,275.35 total

| Account | Balance |
|---|---|
| Mortgage 6368 | $470,027.89 |
| HELOC 10-15 ...2261 | $101,073.25 |
| SoFi Student Loan ...0455 | $75,264.96 |
| Credit cards (aggregate) | $7,836.00 |

## HELOC Capacity

- **Drawn:** $101,073.25
- **Available to draw (estimated):** $300,000 — per Brady 2026-04-21

HELOC available is a liquidity lever but not free money — every dollar drawn accrues interest. Counts as accessible liquidity for runway math, not as savings.

## How generate-data.py uses this

The script reads this file to emit `COCKPIT_DATA.balanceSheet` and `COCKPIT_DATA.budgetBaseline`. It parses the Summary section and the HELOC Capacity section.

Update the snapshot date when real estate value shifts, loan balances materially change, or investment positions move >5%.
