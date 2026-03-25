# CFO Agent

> Phase 2 — Connected to your financial data. Ask a question, get an answer from your actual books.

## What It Does

The CFO agent connects directly to your financial systems and answers questions using your real data — not generic advice, but answers pulled from your actual QuickBooks ledger, your actual revenue numbers, your actual burn rate.

### Bookkeeping
- **Journal entries** — Categorize and record transactions with proper account mapping
- **Reconciliation support** — Flag discrepancies, suggest corrections
- **Expense tracking** — Summarize spending by category, vendor, or time period

### Investor Questions
- **Quick answers** — "What's our monthly burn?" "What did we spend on marketing last quarter?"
- **Prepared responses** — Draft answers to common investor questions with supporting data
- **Trend analysis** — "How has our revenue growth trended over the last 6 months?"

### Financial Summaries
- **Monthly reports** — P&L summary, cash position, key metrics
- **Board prep** — Financial sections for board decks with commentary
- **Scenario modeling** — "What happens to runway if we increase marketing spend by 30%?"

## Tool Connections (MCPs)

| Tool | MCP | What it enables |
|------|-----|-----------------|
| QuickBooks | QuickBooks MCP (if available) | Read transactions, accounts, reports |
| Google Sheets | Google Sheets MCP | Read/write financial models, budgets |
| Google Docs | Google Docs MCP | Draft financial memos, board materials |

> Note: MCP availability for QuickBooks depends on current integrations. If direct QuickBooks MCP isn't available, we'll set up an export-based workflow or Google Sheets bridge.

## Starter Skills

| Skill | What it does |
|-------|-------------|
| `/journal-entry` | Records a transaction with proper account categorization |
| `/investor-answer` | Drafts a response to an investor question with supporting data |
| `/financial-summary` | Produces a financial summary for a given time period |

## Context It Knows

After the interview and build phase, your CFO agent will know:

- **Your chart of accounts** — How your books are structured
- **Your key metrics** — The numbers you track and how you define them
- **Your investor FAQ** — Common questions and how you prefer to answer them
- **Your reporting cadence** — Monthly, quarterly, what format, who receives it
- **Your financial vocabulary** — How you talk about money (burn, runway, ARR, etc.)

## Phase 2 Timeline

The CFO agent is scoped as a Phase 2 deliverable. It builds after the Executive Assistant and CMO agents are live and working. This sequencing ensures the foundational system (harness, memory, skills framework) is proven before adding financial data connections.
