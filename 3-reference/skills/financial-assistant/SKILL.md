---
name: financial-assistant
agent: Finn (0-agents/custom-built-agents/finn.md)
description: >
  Unified personal + business financial cockpit. Parses Monarch Money CSV exports,
  enriches with Gmail invoice/receipt scanning, Calendar bill tracking, and Notion
  consulting pipeline data. Produces cash flow, budget vs actual, consulting revenue,
  and upcoming obligations.

  TRIGGER THIS SKILL whenever Brady says: "financial snapshot", "money picture",
  "run financials", "how are we looking financially", "cash flow", "budget check",
  "financial update", "check the finances", "run the financial assistant",
  or any variation requesting a personal/business financial overview.

  This skill runs standalone or feeds into morning-sweep (compact mode) and
  weekly-sweep (detailed mode). Also publishes an HTML dashboard to mception.ai.
---

# Financial Assistant

Unified personal + business financial picture from Monarch CSV exports, Gmail,
Calendar, and Notion consulting pipeline.

> **Operating instructions live in Notion.** Fetch page `34bed43b-89c5-8113-8c76-ef579877e240`
> at the start of every run. Section 0 contains the full SOP: Pre-Flight, Phase 1–4,
> output templates, guardrails, and anomaly sweep mode. This file is the interface
> reference only — edit behavior in Notion, not here.

## Execution Environment

**Runs on:** CoWork (Claude Desktop) on Brady's Mac
**Local access:** Gmail MCP, Google Calendar MCP, Notion MCP, local file system
**Data source:** Monarch CSV exports in `3-reference/skills/financial-assistant/data/`
**Scheduled:** On-demand, or called by morning-sweep / weekly-sweep
**Also:** Publishes HTML dashboard to mception.ai (`/financial-assistant`)

## Output Modes

| Mode | Trigger | Output |
|------|---------|--------|
| `morning-summary` | Called by morning-sweep | Compact 6-line block for the `FINANCES` section |
| `weekly-summary` | Called by weekly-sweep | Detailed multi-section block for `FINANCIAL WEEK` |
| `full` (default) | Standalone trigger | Complete financial snapshot with all sections + HTML dashboard |

## Finn Knowledge Base

**Page ID:** `34bed43b-89c5-8113-8c76-ef579877e240`
**Location:** Notion > 3 - Reference Layer > Finn Knowledge Base

- Section 0 — Operating Instructions (canonical SOP, guardrails, output templates)
- Section 1 — Current Snapshot (overwritten each run)
- Section 2 — Confirmed Facts (append-only)
- Section 3 — Open Items (live checklist)
- Section 4 — Anomalies + Decisions Log (append on change only)

## Data Dependencies

| File | Location | Required? |
|------|----------|-----------|
| Monarch CSVs | `data/*.csv` | No — degrades gracefully |
| Venmo CSVs | `data/VenmoStatement_*.csv` | No — supplementary |
| Arvest CSV | `data/Arvest*.csv` | No — cross-reference only |
| Data source registry | `references/data-sources.md` | Yes — dedup rules, coverage dates, scrape targets |
| Accounts reference | `references/accounts-reference.md` | Yes — owner attribution and account classification |
| Category mappings | `references/category-mappings.md` | Yes — category normalization, return detection, Utah detection |
| Budget targets | `references/budget-targets.md` | Yes — needed for budget comparison |
| Consulting rate card | `references/consulting-rate-card.md` | No — consulting sections skipped if absent |

## Dashboard Schema Reference

`window.COCKPIT_DATA` written to `portal/public/financial-assistant/data.js`. Top-level keys:
`generated`, `dataThrough`, `scrapedDate`, `csvStaleDays`, `budget`, `alerts`, `topline`,
`byOwner`, `karissaVelocity`, `categories`, `merchants`, `utah`, `recurring`, `openQuestions`,
`dataSources`, `recentTransactions`, `burnRate`, `forecast`, `runway`, `business`, `consulting`.

`burnRate`, `forecast`, `runway`, `business` — computed by `scripts/generate-data.py`.
`consulting` — written by this skill at runtime (Phase 1.2 Gmail + Phase 1.4 Notion).
`runway.liquidAssets` — reads from `references/liquid-assets.md` (Brady maintains manually).

## What This Skill Does NOT Do

- **Not a budgeting app.** No enforcement, no guilt trips. Reports facts and forecasts.
- **Not real-time.** Limited by CSV export frequency. Brady controls the refresh cycle.
- **Not tax preparation.** Surfaces tax-related items but doesn't calculate tax liability.
- **Not connected to any financial API.** All transaction data from manually exported CSVs.
- **Not investment tracking.** No portfolio, retirement, or market data.
