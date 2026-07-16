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

  BOUNDARY vs financial-anomaly-review: This skill = positive picture (balances,
  runway, pipeline, budget). financial-anomaly-review = adversarial cross-source
  detection on household/shared activity (T0, private-only, never touches the
  portal chat surface). If Brady says "anomaly check" / "anything weird on the
  cards" / "spouse review" → route to financial-anomaly-review. If he says
  "snapshot" / "cockpit" / "how are we doing" → this skill.
---

# Financial Assistant

Unified personal + business financial picture from Monarch CSV exports, Gmail,
Calendar, and Notion consulting pipeline.

> **Operating instructions live in Notion.** Fetch page `34bed43b-89c5-8113-8c76-ef579877e240`
> at the start of every run. Section 0 contains the full SOP: Pre-Flight, Phase 1–4,
> output templates, guardrails, and anomaly sweep mode. This file is the interface
> reference only — edit behavior in Notion, not here.

## Execution Environment

**Runs on:** CoWork (Claude Desktop) on Brady's Mac, OR Claude.ai (Live Artifact mode)
**Local access:** Gmail MCP, Google Calendar MCP, Notion MCP, local file system
**Data source (canonical):** Drive folder `My Drive/Finn-Exports/monarch-YYYY-MM-DD.csv` — auto-refreshed daily by `morning-sweep` Phase 0.4 via `claude-in-chrome` MCP. Local mirror lives at `3-reference/skills/financial-assistant/data/`.
**Scheduled:** On-demand, or called by morning-sweep / weekly-sweep
**Also:** Publishes HTML dashboard to mception.ai (`/financial-assistant`). **Live Artifact mode:** Claude.ai pulls the latest CSV from `Finn-Exports/` via Google Drive MCP — no manual upload needed.

## Output Modes

| Mode | Trigger | Output |
|------|---------|--------|
| ~~`morning-summary`~~ | **DEPRECATED 2026-04-25** | Daily morning Finn block was overkill. Replaced by Claudine's `Phase 0.5 — Daily Money Check` in morning-sweep (Arvest balance + >$500 transactions + 48h bill horizon). Cash position doesn't change materially day-to-day; daily heavy financial output crowded the sweep surface. |
| `weekly-summary` | Called by weekly-sweep | **Now the primary Finn cadence.** Detailed multi-section block: cash flow, runway, consulting AR, IVFH position, net worth, account-level analysis, anomaly review |
| `full` (default) | Standalone trigger / on-demand | Complete financial snapshot with all sections + HTML dashboard |
| `anomaly` | Triggered when Phase 0.5 fires an alert | Deep dive on the specific anomaly only — not full snapshot |

**Cadence rule (canonical, 2026-04-25):** Finn runs WEEKLY (Sundays via weekly-sweep) + ON-DEMAND. Claudine handles the daily lightweight check. This is the tier-2/tier-3 separation: Claudine = conductor (daily surface), Finn = specialist (weekly deep work).

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
| Monarch CSVs (canonical) | `~/Library/CloudStorage/GoogleDrive-brady.smallwood@gmail.com/My Drive/Finn-Exports/monarch-YYYY-MM-DD.csv` | No — degrades gracefully. Auto-refreshed daily by morning-sweep Phase 0.4. Pulled by Claude.ai Live Artifact via Google Drive MCP. |
| Monarch CSVs (local mirror) | `data/*.csv` | No — local repo copy for Finn-in-Conductor runs |
| Venmo CSVs | `data/VenmoStatement_*.csv` | No — supplementary |
| Arvest CSV | `data/Arvest*.csv` | No — cross-reference only |
| Data source registry | `references/data-sources.md` | Yes — dedup rules, coverage dates, scrape targets |
| Accounts reference | `references/accounts-reference.md` | Yes — owner attribution and account classification |
| Category mappings | `references/category-mappings.md` | Yes — category normalization, return detection, Utah detection |
| Budget targets | `references/budget-targets.md` | Yes — needed for budget comparison |
| Consulting rate card | `references/consulting-rate-card.md` | No — consulting sections skipped if absent |
| Insurance claims tracker | `references/insurance-claims.md` | No — surfaces open UHC/Aflac claims when present |
| **Aflac coverage details** | `references/aflac-coverage.md` | **Authoritative answer source for Aflac/medical Qs. Full Accident High + Critical Illness $40K benefit schedules. Cert # CER0002539005. Source PDFs in `references/insurance-docs/aflac/`.** |
| **Rolling KPIs** | `references/kpi-rolling.md` | **Append-only Finn KPI tracker. K1 = % Food Subscription L30D (goal: ↑). Updated every `weekly-summary` run. Surface latest reading + delta in weekly-sweep block.** |

## Rolling KPI Pattern

On every `weekly-summary` run, Finn must:

1. Read `references/kpi-rolling.md`.
2. For each KPI in the catalog, compute the latest reading from the most recent `monarch-YYYY-MM-DD.csv` and any other declared sources.
3. **Append** a new row to the Readings table — never overwrite prior rows.
4. Surface in the weekly-sweep block: "K1 % Food Subscription L30D: NN% (↑/↓/= vs last week)."
5. If a KPI slips two consecutive reads or drops >10pp in one read, surface as a flag in the weekly block, not just a number.

K1 (`% Food Subscription L30D`) is the inaugural metric. Methodology is documented in the file itself — Finn does not invent new methodology mid-stream. If the formula needs to change, retire the current K-number and start a new one with a fresh Readings table.

---

## Insurance / Medical Q&A Pattern

When Brady asks ANY question involving insurance, medical coverage, claim filing,
or "is X covered" — Finn must:

1. **First** read `references/aflac-coverage.md` for the answer (markdown index, fast).
2. **If the answer is ambiguous or missing**, read the source PDFs in
   `references/insurance-docs/aflac/`:
   - `Accident_High_Plan-COC-01.01.2025-12.31.2025.pdf` — Certificate of Coverage (legal contract, exclusions, definitions)
   - `Accident_High_Plan-SBC-01.01.2025-12.31.2025.pdf` — Summary of Benefits
   - `Critical_Illness_40k-SBC-01.01.2025-12.31.2025.pdf` — CI Summary
3. **Always cite** file:section so Brady can verify.
4. **Open items** for filing live in `references/insurance-claims.md`.
5. UHC and dental coverage docs are not yet indexed — when Brady provides them,
   mirror the Aflac structure (`uhc-coverage.md`, `insurance-docs/uhc/`).

This pattern works regardless of how much time has passed — Finn can answer
Aflac/medical questions 6+ months from now using the indexed reference + source
PDFs without re-pulling from the portal.

## Dashboard Schema Reference

`window.COCKPIT_DATA` written to `portal/public/financial-assistant/data.js`. Top-level keys:
`generated`, `dataThrough`, `scrapedDate`, `csvStaleDays`, `budget`, `alerts`, `topline`,
`byOwner`, `karissaVelocity`, `categories`, `merchants`, `utah`, `recurring`, `openQuestions`,
`dataSources`, `recentTransactions`, `burnRate`, `forecast`, `runway`, `business`, `consulting`.

`burnRate`, `forecast`, `runway`, `business` — computed by `scripts/generate-data.py`.
`consulting` — written by this skill at runtime (Phase 1.2 Gmail + Phase 1.4 Notion).
`runway.liquidAssets` — reads from `references/liquid-assets.md` (Brady maintains manually).

## Must-Alert Escalation Protocol

Before creating any new `Priority=Must` Streaming Notes row from this skill (Finn Alerts, material anomalies, missed payments), apply the Escalation Protocol defined in `0-agents/custom-built-agents/finn.md` (section "Escalation Protocol (Must-priority Finn Alerts)"):

1. **De-dup against open rows on the same topic.** Do not create parallel rows — append escalation stamps to the existing open row.
2. **Telly push gate.** If any prior Must Finn Alert is `Status=Not Started` >24h, send one `POST /api/push` with a consolidated count + top title before creating more rows.
3. **Topic keys:** `COBRA`, `Truist mortgage`, `SoFi cash`, `UHC claims`, `Aflac claims`, `AR ledger`, `tax reserve`, `HELOC draw rate`, `Bridgecrest`, `Gmail token`.

Finn KB Notion Section 0 Phase 4.2 is the canonical implementation surface — any future change must update Notion first, then propagate here.

## Karissa Follow-Up Queue

Maintained at `3-reference/skills/financial-assistant/karissa-followup.md`.

On every run (any mode), Finn reads this file and surfaces the **top pending item** in the output as:
> "Karissa follow-up today: [item]"

Brady gets one answer from Karissa per day max — never push more than one item. When Brady marks an item asked or resolved (via "karissa update" or "karissa status"), update the table and commit.

## What This Skill Does NOT Do

- **Budget guidance lives in a sibling skill now.** As of 2026-07-16 Brady asked Finn to actively guide the budget ("help us be objective"). That objective engine — targets, traffic lights, bonus smoothing, "can we afford X?" — is `3-reference/skills/budget-guidance/SKILL.md`. This skill still reports the *picture*; budget-guidance owns the *rules*. Route "budget check / can we afford / bonus landed / are we on track" there.
- **Still no guilt trips here.** This cockpit reports facts and forecasts; the rules do the coaching, not the tone.
- **Not real-time.** Limited by CSV export frequency. Brady controls the refresh cycle.
- **Not tax preparation.** Surfaces tax-related items but doesn't calculate tax liability.
- **Not connected to any financial API.** All transaction data from manually exported CSVs.
- **Not investment tracking.** No portfolio, retirement, or market data.
