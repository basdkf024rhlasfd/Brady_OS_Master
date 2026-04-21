# Liquid Assets

Accessible cash + drawable liquidity for runway calculations. Runway = accessibleTotal / monthlyBurn.

Brady updates this manually. Values should stay current — weekly or whenever a balance shifts > $2K.

Last updated: 2026-04-21

## Current Balances

| Source | Balance | Notes |
|---|---|---|
| Bank cash (from balance-sheet.md) | $1,305 | SoFi + Arvest checking/savings; excludes kids' cards |
| Betterment cash equivalents | TBD | Brady updates manually |
| HELOC available to draw | $300,000 | From balance-sheet.md Capacity section |

**Total accessible liquidity:** `$301,305`

(Formula: bank cash + Betterment + HELOC available. Exclude retirement + non-Roth-contribution IRA/401k.)

## Not Counted

- Retirement accounts (401k, IRAs) — illiquid without penalty
- Real estate equity beyond HELOC — illiquid
- Roth IRA contributions — accessible in principle but not part of the runway pool by default
- Kids' custodial / debit accounts — not Brady's funds
- Credit card limits — not assets
- Investment positions in taxable brokerage (Maxim IVFH, vacation funds) — semi-liquid but earmarked; exclude unless Brady explicitly reallocates

## How generate-data.py reads this

The script parses the "**Total accessible liquidity:**" line. Value can be:
- A dollar amount: `$301,305` or `301305`
- `TBD` — runway calculation is skipped; dashboard shows "Runway: — (update liquid-assets.md)"

The script also reads the HELOC available from `balance-sheet.md` for separate display.

Update the total whenever bank balances, HELOC draws, or Betterment shift meaningfully (> $2K), or weekly — whichever comes first.
