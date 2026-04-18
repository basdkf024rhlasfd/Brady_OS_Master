# Brady's Google Apps Script Toolkit

## Project Overview
A collection of Google Apps Scripts that automate Brady Smallwood's Google Workspace. Each script is a standalone automation that lives in its own directory under `scripts/`. Shared utilities in `shared/` are copied into each script at deploy time by `build.sh`.

## Owner Context
- Brady Smallwood, 41, Bentonville AR (Central Time)
- Portfolio entrepreneur: Broker Co, micro-app farm, consulting
- Wife: Karissa. Five kids: Lily, Faith, Isla, Luke, Quinn
- Has ADHD — automations must be set-and-forget, not require daily babysitting
- Gmail: personal inbox, moderate volume, mix of business/personal/automated
- Google Calendar: multiple calendars, protected family time 5-7pm daily

## Quick Reference
**See `CHEATSHEET.md`** for how to change classification rules, deploy, check logs, and troubleshoot.

## Tech Stack
- **Runtime:** Google Apps Script (V8 engine, ES6+ supported)
- **Deployment:** clasp (CLI tool for GAS development)
- **AI calls:** Anthropic Claude API via UrlFetchApp (GAS built-in HTTP)
- **Storage:** Google Sheets (for logs/config), PropertiesService (for secrets)
- **Triggers:** Time-driven triggers (installable) via ScriptApp
- **Testing:** Manual + lightweight test functions (GAS has no built-in test framework)

## Repo Structure
```
gas/
├── CLAUDE.md                    # You are here
├── CHEATSHEET.md                # Quick reference for common changes
├── README.md                    # Project overview + setup
├── build.sh                     # Stage script + shared → clasp push
├── check.sh                     # Syntax + consistency smoke test
├── shared/                      # Shared utilities (copied into each script at deploy)
│   ├── claude-api.js            # Claude API wrapper (UrlFetchApp + retry logic)
│   ├── config.js                # PropertiesService helpers, getCsvProperty
│   ├── logger.js                # Structured logging to Google Sheets
│   └── error-handler.js         # Error handling + ALERT_EMAIL alerting
├── scripts/
│   ├── email-classifier/        # Script 1: Email classification
│   │   ├── .clasp.json          # clasp project config
│   │   ├── appsscript.json      # GAS manifest (scopes, triggers)
│   │   ├── main.js              # Entry point + trigger handler
│   │   ├── rules.js             # ← CLASSIFICATION RULES + KNOWN SENDERS (edit this)
│   │   ├── pre-classifier.js    # Known sender + learned rule matching (no API)
│   │   ├── learner.js           # Auto-promotes consistent senders to learned rules
│   │   ├── classifier.js        # Prompt assembly + Claude call (fallback)
│   │   ├── notion-sync.js       # Push results to Email Hub via Notion API
│   │   └── README.md            # Script-specific docs
│   └── os-recap-mailer/         # Script 2: Weekly recap delivery
│       ├── appsscript.json
│       ├── main.js
│       └── README.md
├── config/
│   └── setup-guide.md           # How to configure API keys, clasp, triggers
└── logs/
    └── .gitkeep
```

## Coding Standards

### Naming
- Files: `kebab-case.js`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- GAS entry points (trigger handlers): `onTimeTrigger()`, `onEdit()`, etc.

### Error Handling
- Every external call (API, Gmail, Sheets) must be wrapped in try/catch
- Failures log to the shared logger, never silently swallow
- Alert Brady via email using `ALERT_EMAIL` property (only for critical failures)

### Claude API Calls
- Always use the shared `claude-api.js` wrapper
- API key stored in PropertiesService, never hardcoded
- Model: `claude-sonnet-4-5-20250929` (cost-efficient for classification tasks)
- Max tokens: set per-script based on expected output size
- Parse JSON responses defensively — if Claude returns invalid JSON, log and skip

### Google Apps Script Specifics
- GAS has a 6-minute execution limit per run. Design for batches.
- Use `Utilities.sleep(1000)` between API calls to avoid rate limits
- `UrlFetchApp.fetch()` is synchronous — no async/await
- PropertiesService quotas: 9KB per property, 500KB total per script
- Triggers: prefer 5-15 minute intervals

### Deployment
- Each script is a separate GAS project (separate `.clasp.json`)
- `build.sh` stages into a temp directory, pushes via clasp, cleans up
- Never edit in the GAS web editor — always push from this repo
- Run `./check.sh` before deploying

### Script Properties (all scripts)

| Property | Purpose | Required |
|----------|---------|----------|
| `ANTHROPIC_API_KEY` | Claude API access | Yes (email-classifier) |
| `LOG_SHEET_ID` | Google Sheet ID for structured logs | Yes |
| `ALERT_EMAIL` | Where error alerts are sent | Recommended |
| `OWNER_EMAIL_ALIASES` | Comma-separated owner email addresses | Recommended (email-classifier) |
| `NOTION_API_KEY` | Notion integration token | For Notion sync |
| `NOTION_SYNC_ENABLED` | `true` to enable Notion sync | For Notion sync |

## Current Scripts

### 1. email-classifier (v0.3)
- **Purpose:** Classify incoming Gmail — known senders pre-classified in JS (zero tokens), rest via Claude API
- **Trigger:** Every 15 minutes
- **Rules:** `scripts/email-classifier/rules.js` — classification rules + `KNOWN_SENDERS` map
- **Learning:** Learner runs weekly, promotes consistent senders to `learned-rules` Sheet tab (auto-bypasses Claude)
- **Read state:** High priority → stays unread. Low priority → marked read.
- **Output:** Gmail labels applied, structured JSON logged to Sheets, optional Notion sync
- **Household integration:** Emails tagged `household` feed the Household Assistant budget tracking

### 2. os-recap-mailer (v0.1 — ready to deploy)
- **Purpose:** Email Brady's weekly OS recap HTML + PDF attachment every Friday morning
- **Trigger:** Weekly, Friday ~7:15 AM CT
- **Flow:** Find latest recap in Google Drive `OS-Recaps/` folder → Send self-email with HTML body + PDF attachment
- **Subject:** `[OS-RECAP] Week N — headline` (triggers Apple Shortcut for text notification)

## Important: Brady's Classification Rules
Classification rules live in `scripts/email-classifier/rules.js`. Key overrides that must NEVER be broken:
- Expert network emails (GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus) → ALWAYS High priority, NEVER auto-archive
- jay@jukeboxbevs.com → ALWAYS High priority, ALWAYS Person
- Betterment automated notifications → ALWAYS Archive, Low priority
- LinkedIn notifications → ALWAYS Archive, Low priority
- School emails where Karissa is primary → No action for Brady

## Agent Instructions (for Conductor parallel builds)
When building a new script:
1. Read this CLAUDE.md and `CHEATSHEET.md` before starting
2. Check if shared utilities cover your needs before writing new code
3. Follow the repo structure exactly
4. Keep scripts independent — they share utilities but never import from each other
5. Test your trigger handler with a manual run before claiming "done"
6. Update this CLAUDE.md's "Current Scripts" section when adding a new script
