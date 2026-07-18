---
name: client-pnl-dd
description: >
  Reusable due-diligence skill for client / target-company P&L files. Parses Excel
  workbooks (.xls and .xlsx), reconciles multiple ledger versions (e.g. stores vs.
  consolidated), extracts trend history, ranks store/segment performance, and
  produces a DD memo with headline findings.

  TRIGGER when Brady says: "P&L diligence", "run DD on these financials",
  "analyze the client P&L files", "shadow P&L bridge", "client pnl dd",
  or has been handed a workbook (or workbooks) from a client / acquisition target.

  Common use cases:
  - New consulting engagement: client shares historical P&Ls before scoping
  - M&A target: acquirer sends financials during diligence
  - Executive role: candidate (Brady) inspects company financials before signing
  - Lender package: re-create the consolidated view from store-level data
---

# Client P&L Due Diligence

Standardized workflow for analyzing client / target-company P&L workbooks. Produces a reproducible DD memo with headline findings, supports multi-version reconciliation (the "shadow P&L" pattern), and creates a confidential local artifact Brady can hand off or revisit.

> **Confidentiality default:** ALL client financials live at `~/brady-os-local/{client-slug}-confidential/pnl-dd-YYYY-MM/`. NEVER inside a Conductor workspace, NEVER in git. This is non-negotiable per Brady's global rule on sensitive third-party data.

## When to Use

- Brady is handed Excel/PDF financials from a client, acquisition target, or prospective employer
- Multiple versions of the same period exist (a classic shadow-P&L diagnostic)
- A long history workbook needs a 5-10-year trend extracted
- Store-level / segment-level performance ranking is needed
- A consolidated EBITDA bridge needs to be re-derived from sub-ledgers
- A pre-signing or pre-engagement DD memo is required

## Workflow

### Phase 0 — Intake & Triage (15 min)
1. Confirm files are placed in `~/brady-os-local/{client-slug}-confidential/pnl-dd-YYYY-MM/`. If they arrived in a Conductor workspace, MOVE them out before any analysis.
2. Inventory the files: name, size, format, modification date.
3. Inspect sheet names + dimensions of each workbook (`openpyxl` for .xlsx, `xlrd` for .xls). Document which sheets are likely:
   - Monthly trial balance / P&L tabs (Jan-Dec, Q1-Q4)
   - YTD or full-year totals
   - Per-store / per-segment tabs
   - Consolidated / lender-reporting view
   - Historical snapshots (Dec06, Dec07, ...)
   - Internal calculations / sandbox tabs
4. Identify which file is "real" (consolidated / lender / auditor view) vs. which is "internal" (stores-only / management view). The naming conventions often reveal this — *5th3rd* in a filename = lender package; *Stores* = management view.

### Phase 1 — Headline Numbers (1 hour)
For each year/period available, extract:
- Gross Sales
- Total COGS
- Gross Margin (and %)
- Total Operating Expenses (and %)
- Depreciation & Amortization
- Corporate Allocation (where applicable)
- Net Income (and %)
- **EBITDA (derived if not explicit): Net Income + Depreciation + Amortization + Interest + Tax)**
- Store / segment count

Map each to the source workbook + tab + row + column so anything can be re-verified.

### Phase 2 — Multi-Version Reconciliation ("Shadow P&L" diagnostic — 1 hour)
If multiple P&L versions exist for the same period:
1. Build a bridge: Version A EBITDA → Version B EBITDA, line-by-line
2. Identify the largest reconciling items (typically: corporate allocations, depreciation, intercompany, capitalized vs. expensed treatment)
3. Quantify the gap as $ and % of the smaller number
4. Document each adjustment with WHY (cap-ex policy, allocation methodology, etc.)
5. **Headline:** which version is reality, which is internal-only, and what's the operating implication if exec comp / lender covenants are tied to the wrong one

### Phase 3 — Trend & Cyclicality (1 hour)
- If 5+ years of history exist, build year-over-year revenue + EBITDA + EBITDA margin
- Plot the trend (matplotlib → save PNG into the DD folder)
- Note: recession years, COVID dip, recovery slope, recent inflection
- Identify expansion events (acquisitions, store openings) and their margin impact
- Stress-test: if peak-trough recession EBITDA = X% of peak, model the same hit forward

### Phase 4 — Store / Segment Performance (1 hour)
- Rank stores by: revenue, contribution margin, EBITDA dollar, EBITDA %
- Identify top quartile + bottom quartile
- Compute spread (top - bottom) as % of average — flags operating discipline gap
- Flag any store with negative contribution margin (acquisition stragglers, closure candidates)
- Compare new stores (recent acquisitions) vs. mature stores — ramp rate

### Phase 5 — DD Memo (1-2 hours)
Save markdown memo to `~/brady-os-local/{client-slug}-confidential/pnl-dd-YYYY-MM/dd-memo.md`. Sections:

1. **Headline (3 bullets)** — the most important findings, expressed as decisions/questions
2. **Files reviewed** — inventory with sizes + source attribution
3. **Shadow P&L bridge** (if applicable) — table + narrative
4. **Multi-year trend** — EBITDA $ + % by year, with chart
5. **Store / segment ranking** — top quartile, bottom quartile, spread
6. **Stress test scenarios** — recession sensitivity, exec comp implications
7. **Open questions for client** — what's ambiguous, what needs CFO/Controller explanation
8. **Recommended next steps** — specific asks the client should fulfill

### Phase 6 — Notify (5 min)
- Telly message to Brady with headline (top 3 findings only)
- Email draft (if applicable) with link to memo
- Update PROJECT.md if this is for an existing engagement

## Tools

| Tool | Purpose |
|------|---------|
| `openpyxl` | .xlsx file parsing (data_only=True for formula evaluation) |
| `xlrd` (≤2.0) | legacy .xls file parsing |
| `pandas` | dataframe + pivot / ranking ops |
| `matplotlib` | trend charts saved as PNG to DD folder |
| `numpy` | stress test scenarios |

Install if missing:
```bash
pip3 install --quiet xlrd openpyxl pandas matplotlib numpy
```

## Parsing Patterns

### Multi-period stacked layout (common pattern)
Many internal P&L workbooks use a stacked layout where each month occupies 2 adjacent columns ($ and %), with a YTD or Total column at the right edge. The header rows typically have month names on row 5 and `$$ / %%` indicators on row 6.

Pattern recognition:
- Headers: row 5 = period (Jan, Feb, ..., YTD), row 6 = `$$` or `%%`
- Data rows: column 0 = label, columns 1+ = numeric (alternating $ and %)
- YTD column: usually the last $ column (often col 31, 33, or similar)

### Multi-version comparison (the shadow P&L pattern)
When two workbooks describe the same period:
- Compare Gross Sales first — should match within rounding (or one is summarized differently)
- Compare Total COGS — should match
- Difference in Gross Margin or Net Income at this point = corporate allocation or expense reclassification
- Difference in Depreciation = capitalization treatment shift
- **Critical: which version was used for executive compensation?**

### Historical snapshot tabs (the goldmine pattern)
Some workbooks contain year-end snapshots from prior years in separate tabs (e.g., Dec06, Dec07, ..., Dec24). These are usually:
- Pasted-in totals from the year-end close that year
- Different formats / chart of accounts across years
- May require per-year parsing logic rather than uniform extraction

Approach: parse each historical tab separately, normalize to a common output schema (Year / Gross Sales / EBITDA / Margin / Store Count), then output time-series.

## Anti-Patterns (do not do)

- **Don't paste client financials into git or any Conductor workspace.** Local-only, gitignored.
- **Don't email the underlying data anywhere.** Findings go to Telly/email. Source data stays local.
- **Don't quote specific numbers in user-facing summaries without re-verifying the source.** Always cite file → tab → row → col.
- **Don't assume the largest file is the consolidated version.** Internal files often have more tabs (history) than lender files.
- **Don't ignore the depreciation line.** It's the most common shadow-P&L tell.

## Output Artifacts

Saved to `~/brady-os-local/{client-slug}-confidential/pnl-dd-YYYY-MM/`:

- `dd-memo.md` — primary deliverable
- `analysis-*.txt` — raw extraction logs
- `charts/*.png` — trend + ranking charts
- `bridge.csv` — line-by-line reconciliation if multi-version
- `store-ranking.csv` — store-level metrics

## Boundary vs. Other Skills

- **financial-assistant (Finn):** Brady's personal+business cockpit. Does not analyze client financials.
- **deep-research:** External research, public web. Does not parse client-confidential workbooks.
- **innovation-workshop / operations-innovation-engine:** Use the output of this skill (EBITDA baseline, store ranking) to feed ideation, but don't replicate the analysis.

## First Run — 1915 South (2026-05-11)

Brady's first invocation. Files: 2024 Stores ($17M EBITDA, the version used for exec comp), 2024 Consolidated 5th3rd ($13.94M EBITDA, the lender view), 2025 Ashley monthly. Output: `~/brady-os-local/1915-south-confidential/pnl-dd-2026-05/dd-memo.md`. Headline finding: $3.5M shadow-P&L gap (~25% inflation of exec comp pool under old practice).
