# Brady's Google Apps Script Toolkit

## Project Overview
A collection of Google Apps Scripts that automate Brady Smallwood's Google Workspace. Each script is a standalone automation ("product") that lives in its own directory. This repo is managed via Conductor (conductor.build), with parallel Claude Code agents building individual scripts in isolated workspaces.

## Owner Context
- Brady Smallwood, 41, Bentonville AR (Central Time)
- Portfolio entrepreneur: Broker Co, micro-app farm, consulting
- Wife: Karissa. Five kids: Lily, Faith, Isla, Luke, Quinn
- Has ADHD — automations must be set-and-forget, not require daily babysitting
- Gmail: personal inbox, moderate volume, mix of business/personal/automated
- Google Calendar: multiple calendars, protected family time 5-7pm daily

## Tech Stack
- **Runtime:** Google Apps Script (V8 engine, ES6+ supported)
- **Deployment:** clasp (CLI tool for GAS development)
- **AI calls:** Anthropic Claude API via UrlFetchApp (GAS built-in HTTP)
- **Storage:** Google Sheets (for logs/config), PropertiesService (for secrets)
- **Triggers:** Time-driven triggers (installable) via ScriptApp
- **Testing:** Manual + lightweight test functions (GAS has no built-in test framework)

## Repo Structure
```
brady-gas-toolkit/
├── CLAUDE.md                    # You are here
├── README.md                    # Project overview + setup
├── build.sh                     # Copy shared files + clasp push
├── shared/                      # Shared utilities across all scripts
│   ├── claude-api.js            # Claude API wrapper (UrlFetchApp + retry logic)
│   ├── config.js                # Shared config loader (PropertiesService)
│   ├── logger.js                # Structured logging to Google Sheets
│   └── error-handler.js         # Standard error handling + alerting
├── scripts/
│   ├── email-classifier/        # Script 1: Email classification
│   │   ├── .clasp.json          # clasp project config
│   │   ├── appsscript.json      # GAS manifest (scopes, triggers)
│   │   ├── main.js              # Entry point + trigger handler
│   │   ├── classifier.js        # Classification logic + prompt
│   │   ├── notion-sync.js       # Push results to Email Hub via Notion API
│   │   └── README.md            # Script-specific docs
│   ├── [next-script]/           # Each new automation follows same pattern
│   │   ├── .clasp.json
│   │   ├── appsscript.json
│   │   ├── main.js
│   │   └── README.md
│   └── ...
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
- If a script fails mid-batch (e.g., processing 50 emails), it should resume where it left off on next run — use PropertiesService to store checkpoint state
- Alert Brady via email only for critical failures (not every retry)

### Claude API Calls
- Always use the shared `claude-api.js` wrapper
- API key stored in PropertiesService, never hardcoded
- Model: `claude-sonnet-4-5-20250929` (cost-efficient for classification tasks)
- Max tokens: set per-script based on expected output size
- Always include retry logic (GAS UrlFetchApp can timeout)
- Parse JSON responses defensively — if Claude returns invalid JSON, log the raw response and skip that item

### Google Apps Script Specifics
- GAS has a 6-minute execution limit per run. Design for batches, not "process everything at once"
- Use `Utilities.sleep(1000)` between API calls to avoid rate limits
- `UrlFetchApp.fetch()` is synchronous — no async/await
- Gmail API via GAS: use `GmailApp` for simple ops, `Gmail` advanced service for complex queries
- PropertiesService quotas: 9KB per property, 500KB total per script
- Triggers: minimum interval is 1 minute, but prefer 5-15 minute intervals to stay within quotas

### Deployment
- Each script is a separate GAS project (separate .clasp.json)
- Use `clasp push` to deploy, `clasp pull` to sync
- Never edit in the GAS web editor — always push from this repo
- Version tag in each script's README when deploying a stable release

### Logging
- Every script logs to a dedicated Google Sheet tab
- Log format: `[timestamp] [level] [script_name] message`
- Levels: INFO, WARN, ERROR
- Retain 30 days of logs, auto-purge older rows

## Script Development Checklist (for each new script)
1. [ ] Create directory under `scripts/`
2. [ ] Copy `appsscript.json` template, update scopes
3. [ ] Create `.clasp.json` pointing to a new GAS project
4. [ ] Write `main.js` with trigger handler
5. [ ] Use shared utilities from `shared/`
6. [ ] Add script-specific README with: purpose, trigger schedule, config needed, known limitations
7. [ ] Test with a small batch before enabling time trigger
8. [ ] Set up error alerting
9. [ ] Version tag and deploy

## Current Scripts

### 1. email-classifier (v0.1 — in development)
- **Purpose:** Classify incoming Gmail using Claude API, apply labels, optionally sync to Notion Email Hub
- **Trigger:** Every 15 minutes
- **Prompt:** Based on canonical Email Classification Prompt Spec (see classifier.js)
- **Output:** Gmail labels applied, structured JSON logged to Sheets, optional Notion sync

### 2. os-recap-mailer (v0.1 — ready to deploy)
- **Purpose:** Email Brady's weekly OS recap HTML + PDF attachment every Friday morning
- **Trigger:** Weekly, Friday ~7:15 AM CT
- **Flow:** Find latest recap in Google Drive `OS-Recaps/` folder → Send self-email with HTML body + PDF attachment
- **Subject:** `[OS-RECAP] Week N — headline` (triggers Apple Shortcut for text notification)
- **Output:** Email to Brady with full recap; notice email if no recap was generated

## Future Script Ideas
- Calendar auto-blocking (protect focus time, family time)
- Gmail auto-draft from templates
- Expense receipt auto-categorizer
- Meeting prep auto-assembler (pull context before calendar events)
- Newsletter auto-summarizer

## Important: Brady's Classification Rules
The email classifier uses Brady's personal classification schema. Key overrides that must NEVER be broken:
- Expert network emails (GLG, Dialectica, AlphaSights, Guidepoint, Arbolus, Tegus) → ALWAYS High priority, NEVER auto-archive
- jay@jukeboxbevs.com → ALWAYS High priority, ALWAYS Person
- Betterment automated notifications → ALWAYS Archive, Low priority
- LinkedIn notifications → ALWAYS Archive, Low priority
- School emails where Karissa is primary → No action for Brady

## Agent Instructions (for Conductor parallel builds)
When building a new script:
1. Read this CLAUDE.md fully before starting
2. Check if shared utilities cover your needs before writing new code
3. Follow the repo structure exactly
4. Keep scripts independent — they share utilities but never import from each other
5. Test your trigger handler with a manual run before claiming "done"
6. Update this CLAUDE.md's "Current Scripts" section when adding a new script
