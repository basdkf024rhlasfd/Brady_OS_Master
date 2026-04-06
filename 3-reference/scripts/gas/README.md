# brady-gas-toolkit

A collection of Google Apps Scripts that automate Brady Smallwood's Google Workspace. Built and maintained using [Conductor](https://conductor.build) + Claude Code.

## Quick Start

### Prerequisites
- Node.js installed
- Google account with Apps Script API enabled
- Anthropic API key
- `clasp` installed: `npm install -g @google/clasp`

### Setup
1. Clone this repo
2. Run `clasp login` to authenticate with Google
3. For each script in `scripts/`, create a new GAS project:
   ```bash
   cd scripts/email-classifier
   clasp create --type standalone --title "Email Classifier"
   ```
4. Store API keys in each project's PropertiesService (see `config/setup-guide.md`)
5. Build and push:
   ```bash
   ./build.sh email-classifier
   ```

### Development with Conductor
Each script = one Conductor workspace. To build a new script:
1. Open Conductor
2. Create a new workspace on a feature branch
3. Point the agent at the script directory + shared utilities
4. Review, test, merge

## Scripts

| Script | Status | Trigger | Description |
|--------|--------|---------|-------------|
| email-classifier | v0.1 In Dev | Every 15 min | Classify Gmail using Claude API, apply labels, optional Notion sync |

## Architecture
- **Shared utilities** in `shared/` — Claude API wrapper, config, logging, error handling
- **Independent scripts** in `scripts/` — each is its own GAS project
- **No cross-script dependencies** — scripts share utilities but never import from each other
- **Build script** (`build.sh`) — copies shared files into script dir, pushes via clasp, cleans up
