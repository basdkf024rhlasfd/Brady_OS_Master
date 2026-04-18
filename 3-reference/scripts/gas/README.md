# brady-gas-toolkit

A collection of Google Apps Scripts that automate Brady Smallwood's Google Workspace. Built and maintained using [Conductor](https://conductor.build) + Claude Code.

## Quick Start

### Prerequisites
- Node.js installed
- Google account with Apps Script API enabled
- Anthropic API key
- `clasp` installed: `npm install -g @google/clasp`

### Setup
1. Run `clasp login` to authenticate with Google
2. For each script in `scripts/`, create a new GAS project:
   ```bash
   cd scripts/email-classifier
   clasp create --type standalone --title "Email Classifier"
   ```
3. Store API keys in each project's PropertiesService (see `config/setup-guide.md`)
4. Check and deploy:
   ```bash
   ./check.sh
   ./build.sh email-classifier
   ```

## Scripts

| Script | Status | Trigger | Description |
|--------|--------|---------|-------------|
| email-classifier | v0.2 | Every 15 min | Classify Gmail using Claude API, apply labels, optional Notion sync |
| os-recap-mailer | v0.1 | Friday 7:15 AM | Email weekly OS recap with PDF attachment |

## Architecture
- **Shared utilities** in `shared/` — Claude API wrapper, config, logging, error handling
- **Independent scripts** in `scripts/` — each is its own GAS project
- **No cross-script dependencies** — scripts share utilities but never import from each other
- **Build script** (`build.sh`) — stages script + shared into temp dir, pushes via clasp, cleans up
- **Smoke test** (`check.sh`) — validates shell + JS syntax before deploy

## Changing Classification Rules

Edit `scripts/email-classifier/rules.js` then deploy. See `CHEATSHEET.md` for specifics.
