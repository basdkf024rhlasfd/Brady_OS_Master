# Setup Guide

## Prerequisites

1. **Node.js** — Install from https://nodejs.org
2. **clasp** — Google's CLI for Apps Script:
   ```bash
   npm install -g @google/clasp
   ```
3. **Git** — For version control + Conductor workspaces
4. **Conductor** — Download from https://conductor.build (Mac only)
5. **Anthropic API key** — Get from https://console.anthropic.com

## One-Time Setup

### 1. Authenticate clasp
```bash
clasp login
```
This opens a browser window to authorize clasp with your Google account.

### 2. Enable Apps Script API
Go to https://script.google.com/home/usersettings and turn on the Google Apps Script API.

### 3. Create a Log Sheet
1. Create a new Google Sheet (name it "GAS Toolkit Logs" or whatever)
2. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{THIS_PART}/edit`
3. You'll store this ID in each script's properties

### 4. Initialize Git Repo
```bash
cd brady-gas-toolkit
git init
git add .
git commit -m "Initial scaffold"
```

## Per-Script Setup

For each new script (using email-classifier as example):

### 1. Create the GAS Project
```bash
cd scripts/email-classifier
clasp create --type standalone --title "Email Classifier"
```
This generates a `.clasp.json` with the new script ID.

### 2. Copy Shared Utilities
GAS doesn't support imports between projects. You need to include shared files in each project.

**Option A: Manual copy** (simple but annoying)
Copy files from `shared/` into the script directory before `clasp push`.

**Option B: Build script** (recommended for ongoing use)
```bash
# From repo root — copies shared files into script dir, pushes, then cleans up
./build.sh email-classifier
```

**Option C: clasp with rootDir pointing to a merged directory** (advanced)
Create a build step that merges shared + script files into a temp dir, point clasp there.

### 3. Set Script Properties
In the GAS web editor (https://script.google.com), go to Project Settings > Script Properties:

| Property | Value | Required |
|----------|-------|----------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Yes |
| `LOG_SHEET_ID` | Your Google Sheet ID | Yes |
| `NOTION_API_KEY` | `ntn_...` | For Notion sync |
| `NOTION_SYNC_ENABLED` | `true` | For Notion sync |

### 4. Push and Test
```bash
./build.sh email-classifier
clasp open  # Opens the GAS editor in browser
```
Then in the GAS editor:
1. Run `testClaudeConnection()` — verify API works
2. Run `testClassification()` — classify a few emails
3. Run `testNotionSync()` — verify Notion integration
4. Run `installTrigger()` — set up the automated trigger

## Using with Conductor

### Setting Up Workspaces
1. Open Conductor
2. Point it at your `brady-gas-toolkit` git repo
3. Create one workspace per script you want to build
4. Each workspace gets an isolated branch

### Workflow
1. Describe the new script to the agent (reference CLAUDE.md for conventions)
2. Agent creates files in `scripts/{new-script}/`
3. Review the diff in Conductor
4. Merge when ready
5. Run the per-script setup steps above to deploy

### Tips for Conductor Agents
- Always reference the CLAUDE.md first
- Use shared utilities — don't reinvent the Claude API wrapper
- Follow the file structure exactly
- Test manually before claiming done
- Update CLAUDE.md's "Current Scripts" section

## Troubleshooting

**"API key not found"** — Run the PropertiesService setup step. Properties are per-project, not global.

**"Exceeded maximum execution time"** — Reduce BATCH_SIZE in the script's main.js. GAS has a hard 6-minute limit.

**"UrlFetchApp: Address unavailable"** — GAS can't reach the Anthropic API. This is rare but happens. The retry logic should handle it.

**"Authorization required"** — Re-run the script from the GAS editor to re-authorize scopes.
