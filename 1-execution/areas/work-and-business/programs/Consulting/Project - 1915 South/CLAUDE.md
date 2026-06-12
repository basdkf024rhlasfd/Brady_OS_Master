# 1915 South — Agent Instructions

Project agent: **Fran** (`0-agents/custom-built-agents/fran.md` + `fran-SKILL.md`)
Project folder: `1-execution/areas/work-and-business/programs/Consulting/Project - 1915 South/`

## Recurring artifact references (load before touching the underlying file)

- **`workbook-reference-1915-south.md`** — Navigation + operating manual for the annual `YYYYAshleyMonthlyFinSt_1915 South.xlsx` workbook and its sister files (Stores `.xls` mgmt view + `ConsolidatedMonthlyFinSt 5th3rd.xls` lender view). Sheet inventory, row anchors, sister-file purposes, known #REF! issues, seasonality factor, Other Corp bridge. **Mandatory load for any P&L question.** Update on each new FY file rather than rewriting.

## File Save Rules (mandatory for all agents)

### Research outputs
Save to: `research/[topic-slug]-YYYY-MM-DD.md`
Examples: `research/furniture-recession-elasticity-2026-05-04.md`, `research/ashley-market-ga-fl-2026-05-04.md`

Stubs already exist for these threads — fill them in rather than creating new files:
- `furniture-recession-elasticity-2026-05-04.md`
- `ashley-market-ga-fl-2026-05-04.md`
- `ashley-market-sc-ms-al-2026-05-04.md`
- `ashley-market-tn-ky-wv-2026-05-04.md`
- `ashley-market-ok-ar-la-2026-05-04.md`
- `ashley-market-tx-2026-05-04.md`
- `ashley-market-va-nc-corridor-2026-05-04.md`
- `hormuz-impact-1915-south-2026-05-04.md`
- `justin-woods-deep-analysis-2026-05-04.md`

### Deliverables (client-facing docs)
Save source as: `[doc-name]-YYYY-MM-DD.md` (root of project folder)
HTML and PDF are rendered from markdown using existing render scripts — do not save standalone PDFs from artifacts.

### Synthesis
Save to: `synthesis/[topic].md`

### Negotiation / internal memos
Save to: `negotiation/[topic]-YYYY-MM-DD.md`

## Naming conventions
- Slugs: lowercase, hyphens, no spaces
- Always include date in filename
- Markdown is the source of truth; HTML/PDF are rendered outputs

## PDF workflow
Do not produce PDFs directly. Write markdown first, then run the appropriate render script:
- General: `generate-pdf.py`
- Deliverables: use `render-*.py` scripts in the project root
