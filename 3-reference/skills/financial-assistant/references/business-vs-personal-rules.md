# Business vs Personal Classification Rules

Used by generate-data.py to tag each transaction `isBusiness` and emit the `COCKPIT_DATA.business` block (revenue, expenses, margin).

Source of truth for all business/personal splits. If Brady reclassifies a merchant, update here and re-run.

## Business — Positive Classification

A transaction is `isBusiness=true` if ANY of these match:

### Merchant patterns (case-insensitive, match Original Statement or Merchant)

- `anthropic`, `openai`, `claude`, `chatgpt`
- `aws`, `amazon web services`, `vercel`, `supabase`, `render.com`, `railway`
- `github`, `gitlab`, `linear`, `notion`, `canva`, `figma`
- `google workspace`, `gsuite`, `domains.google`, `namecheap`, `cloudflare`
- `stripe fee`, `quickbooks`, `gusto`, `rippling`
- `zoom`, `calendly`, `loom`, `descript`
- `slack`, `telegram` (business tier), `discord nitro` (business)
- `substack` (if tied to publication), `beehiiv`
- `apple.com/business`, `adobe`, `microsoft 365`

### Category overrides

- Monarch Category = `Business Services`, `Office Supplies`, `Professional Services`
- Bucket = `Business` (as mapped in generate-data.py CATEGORY_BUCKETS)

### Account patterns

- Any Amex 2007 charge with merchant in the patterns above (Brady uses personal Amex for business spend)
- No dedicated business account today — all business spend runs through personal cards

## Business Revenue

A positive `amount` is business revenue if:
- Account is Brady's checking (SoFi 1907) AND
- Original Statement contains: `stripe`, `wire in`, `ach credit`, `deposit`, `invoice`, `consulting`, `ffh`, `stihl`, `panda`, `paulette`, `kroger`, `oldcastle`, or any client company name

Known client senders (update as engagements evolve):
- `ffh` / `florida food`
- `panda express` / `ku`
- `paulette` / `danville humane`
- `kroger`
- `oldcastle` / `crh` / `jeff bridge`
- `contour` / `schmulen`
- `stihl`

## Personal (default)

Everything not flagged as business. Includes:
- Groceries, gas, kids, medical, mortgage, utilities
- Dining, entertainment, travel
- Any ambiguous charge — default to personal, Brady reclassifies later

## Margin Calculation

`margin = (revenue - businessExpenses) / revenue` when revenue > 0, else null.

Business expenses in the margin calc include ONLY transactions flagged `isBusiness=true`. Do not deduct personal-split-of-phone or allocate a home office portion — keep this crisp.

## Reclassification

If a transaction is tagged wrong, add an explicit merchant pattern above. Never hardcode transaction-level overrides — rules must be reusable across future data.
