# 529 College Savings Accounts — my529.org

Brady is account owner on all five. Beneficiaries are the kids.
Counts as Brady's assets for net worth purposes.

Last updated: 2026-04-21
Source: my529.org (manual snapshot)

---

## Account Balances

| Beneficiary | Account # | Investment Option | Balance | College Est. |
|---|---|---|---|---|
| Lily Smallwood (age 17) | 201836929 | Target Enrollment 2030/2031 | $31,950.90 | Fall 2027 ⚠️ |
| Faith Smallwood (age 14) | 201836931 | Target Enrollment 2032/2033 | $22,824.67 | Fall 2029 |
| Isla Smallwood (age 9) | 201938828 | Global Equity 70/30 US & Int'l | $13,239.07 | Fall 2035 |
| Luke Smallwood (age 9) | 201938829 | Global Equity 70/30 US & Int'l | $13,239.07 | Fall 2035 |
| Quinn Smallwood (age 9) | 201938831 | Global Equity 70/30 US & Int'l | $13,239.07 | Fall 2035 |
| **TOTAL** | | | **$94,492.78** | |

⚠️ Lily's enrollment is ~18 months out (Fall 2027). Her Target Enrollment fund (2030/2031) is a year or two behind her actual start — worth checking if the glide path is appropriate given imminent draw.

---

## Recurring Contributions (Twice-Monthly)

| Beneficiary | Per Contribution | Monthly Total |
|---|---|---|
| Lily Smallwood | $250.00 | ~$500/mo |
| Faith Smallwood | $140.00 | ~$280/mo |
| Isla Smallwood | $80.00 | ~$160/mo |
| Luke Smallwood | $80.00 | ~$160/mo |
| Quinn Smallwood | $80.00 | ~$160/mo |
| **Total** | $630/occurrence | **~$1,260/mo** |

Note: Budget target shows $1,250/mo for 529s — this is accurate (~$1,260 actual).

---

## How to Scrape (Chrome MCP)

See `account-scraping-sop.md` → my529 section for step-by-step.

URL: https://my529.org
Login: Brady's credentials (check 1Password or env)
Navigate: Account Summary → shows all five accounts with current balances
Extract: Account #, Beneficiary, Investment Option, Balance, YTD contributions

Frequency: Monthly is sufficient. Quarterly minimum. Pull before weekly-sweep if >30 days stale.

---

## Notes

- 529 withdrawals are tax-free for qualified education expenses (tuition, room & board, books, fees)
- Non-qualified withdrawals: earnings taxed as income + 10% penalty
- Lily's account may need to be repositioned to a more conservative allocation if draw is within 12 months
