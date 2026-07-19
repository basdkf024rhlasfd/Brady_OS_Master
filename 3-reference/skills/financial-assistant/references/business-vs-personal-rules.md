# Business vs Personal Classification Rules

Used by generate-data.py to tag each transaction `isBusiness`, `isBusinessAmbiguous`, or personal, and emit the `COCKPIT_DATA.business` block (revenue, expenses, margin).

Source of truth for all business/personal splits. If Brady reclassifies a merchant, update here and re-run.

---

## Business — Positive Classification (`isBusiness=true`)

A transaction is `isBusiness=true` if ANY of these match:

### Merchant patterns (case-insensitive, match Original Statement or Merchant)

**AI / Dev tools:**
- `anthropic`, `openai`, `claude`, `chatgpt`
- `aws`, `amazon web services`, `vercel`, `supabase`, `render.com`, `railway`
- `github`, `gitlab`, `linear`, `notion`, `canva`, `figma`
- `google workspace`, `gsuite`, `domains.google`, `namecheap`, `cloudflare`

**Finance / admin:**
- `stripe fee`, `quickbooks`, `gusto`, `rippling`
- `docusign`, `hellosign`, `pandadoc`

**Comms / meetings:**
- `zoom`, `calendly`, `loom`, `descript`
- `slack`, `telegram` (business tier), `discord nitro` (business)
- `rev.com`, `otter.ai`

**Publishing / content:**
- `substack` (if tied to Brady's publication), `beehiiv`, `convertkit`
- `apple.com/business`, `adobe`, `microsoft 365`

**Office / hardware:**
- `staples`, `office depot`, `officemax`
- `b&h photo`, `adorama`, `best buy` (only when purchase is clearly equipment — flag ambiguous ones)
- `amazon` (only when item is clearly business equipment/software — default ambiguous to personal)

**Coworking / workspace:**
- `wework`, `industrious`, `regus`, `spaces`

**Travel (business confirmed):**
- `delta`, `american airlines`, `southwest`, `united` — **flag `isBusinessAmbiguous=true` unless within 7 days of a known client trip** (see consulting-trip heuristic below)
- `marriott`, `hilton`, `hyatt`, `ihg`, `hampton inn` — same rule as airlines
- `uber`, `lyft` — flag `isBusinessAmbiguous=true` (too many personal uses to assume)

**Professional services:**
- `linkedin` (premium), `glassdoor`, `indeed` (job posting for consulting)
- `legalzoom`, `registered agent`

### Category overrides

- Monarch Category = `Business Services`, `Office Supplies`, `Professional Services`
- Bucket = `Business` (as mapped in generate-data.py CATEGORY_BUCKETS)

### Account patterns

- Any Amex 2007 charge with merchant in the patterns above (Brady uses personal Amex for business spend)
- No dedicated business account today — all business spend runs through personal cards

---

## Ambiguous — Flag for Review (`isBusinessAmbiguous=true`)

These transactions are NOT auto-classified as business but surface in the cockpit for Brady's one-tap confirm/deny:

- **Dining > $75** — could be a client lunch. Brady decides.
- **Airlines / hotels** not within a confirmed client-trip window (see heuristic below)
- **Uber / Lyft** any trip
- **Amazon** when item is unclear
- **AT&T / Verizon / T-Mobile** line charges — phone is ~70% business but not a clean split
- **Coffee shops** — default personal unless amount > $30 (possible client meeting)
- **Any charge Brady has manually reclassified once** — learn the pattern and re-surface the next one

### Consulting-trip heuristic

If an airline or hotel charge appears within ±7 days of any of these keywords in Brady's Monarch Notes or Gmail subject lines: `panda`, `1915`, `justin`, `jorge`, `ffh`, `bentonville`, `client meeting`, `workshop` → elevate from `isBusinessAmbiguous` to `isBusiness=true` automatically and note the trigger keyword.

---

## Partial-Business (document only — not in margin calc)

These are real business costs but kept separate from the margin calc to avoid complexity:

- **Phone** (AT&T): ~70% business. Note in annual tax prep; don't split monthly.
- **Home office**: Brady works from home. Track sq footage %. Flag for CPA at year-end — not a monthly deduction.
- **Internet**: ~80% business when working from home full-time.

Finn surfaces these in the annual tax prep summary for Stephen Butler, not in the monthly cockpit.

---

## Business Revenue

A positive `amount` is business revenue if:
- Account is Brady's checking (SoFi 1907) AND
- Original Statement contains: `stripe`, `wire in`, `ach credit`, `deposit`, `invoice`, `consulting`, `ffh`, `stihl`, `panda`, `paulette`, `kroger`, `oldcastle`, or any client company name

Known client senders (update as engagements evolve):
- `ffh` / `florida food`
- `panda express` / `ku` / `james ku`
- `paulette` / `danville humane`
- `kroger`
- `oldcastle` / `crh` / `jeff bridge`
- `contour` / `schmulen` / `propmatic`
- `stihl`
- `1915 south` / `justin woods` / `woods` / `ashley` (franchisee)
- `harmons` / `harmon`
- `walmart` (if it's a consulting payment, not a grocery charge — rare, use context)

---

## Personal (default)

Everything not flagged as business or ambiguous. Includes:
- Groceries, gas, kids, medical, mortgage, utilities
- Dining under $75, entertainment, streaming
- Travel not associated with a client trip
- Any charge where there's no reasonable consulting connection

---

## Margin Calculation

`margin = (revenue - businessExpenses) / revenue` when revenue > 0, else null.

Business expenses in the margin calc include ONLY transactions flagged `isBusiness=true`. Do NOT include `isBusinessAmbiguous` until Brady confirms. Do not deduct partial-business phone/internet/home-office — keep this crisp.

---

## Reclassification

If a transaction is tagged wrong, add an explicit merchant pattern above. Never hardcode transaction-level overrides — rules must be reusable across future data.

When Brady one-tap confirms an `isBusinessAmbiguous` charge in the cockpit UI, generate-data.py should write the merchant to the positive merchant patterns list above automatically (future enhancement — flag this in the cockpit output until UI supports it).
