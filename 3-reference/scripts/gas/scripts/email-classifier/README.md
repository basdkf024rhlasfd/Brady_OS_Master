# Email Classifier (v0.1)

Classifies incoming Gmail using Claude API based on Brady's canonical Email Classification Prompt Spec. Applies Gmail labels, logs results to Google Sheets, and optionally syncs classifications to Notion Email Hub.

## How It Works

1. **Trigger** fires every 15 minutes
2. Fetches up to 10 unread, unclassified emails (`newer_than:2d`)
3. Sends each email to Claude with Brady's classification prompt
4. Applies Gmail labels: `AI/Classified`, `AI/High Priority`, `AI/{Category}`
5. Auto-archives low-priority bot emails marked for archiving
6. Optionally syncs classification to Notion Email Hub
7. Logs everything to Google Sheets

## Safety Rails

- **High priority emails are NEVER auto-archived** — the archive guard requires all three: `Low` priority + `Bot` + `Archive` action
- Expert network emails (GLG, Dialectica, etc.) are always High priority per the prompt spec
- Checkpoint system resumes from where it left off if a run is interrupted

## Files

| File | Purpose |
|------|---------|
| `main.js` | Entry point, trigger handler, Gmail label ops |
| `classifier.js` | Classification prompt + Claude API call |
| `notion-sync.js` | Push results to Notion Email Hub |
| `claude-api.js` | Claude API wrapper (copied from shared/) |
| `config.js` | PropertiesService helpers, checkpoints (copied from shared/) |
| `logger.js` | Structured logging to Google Sheets (copied from shared/) |
| `error-handler.js` | Error wrapping + email alerts (copied from shared/) |
| `appsscript.json` | GAS manifest with OAuth scopes |
| `.clasp.json` | clasp project config (needs real script ID) |

## Setup

### 1. Create GAS Project

```bash
cd scripts/email-classifier
clasp create --type standalone --title "Email Classifier"
```

This generates a `.clasp.json` with the script ID.

### 2. Set Script Properties

In the GAS web editor (Project Settings > Script Properties):

| Property | Value | Required |
|----------|-------|----------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Yes |
| `LOG_SHEET_ID` | Google Sheet ID for logs | Yes |
| `NOTION_API_KEY` | `ntn_...` | For Notion sync |
| `NOTION_SYNC_ENABLED` | `true` | For Notion sync (default: `false`) |

### 3. Build and Push

```bash
# From repo root
./build.sh email-classifier
```

This copies shared utilities into the script directory, runs `clasp push`, and cleans up.

### 4. Test

In the GAS editor, run these functions:

1. `testClaudeConnection()` — Verify API key works
2. `testClassification()` — Classify 3 recent unread emails (dry run, no labels applied)
3. `testNotionSync()` — Test Notion integration with a mock classification
4. `testClassificationWithNotion()` — Full pipeline test (classify + sync)

### 5. Install Trigger

Run `installTrigger()` from the GAS editor. This sets up a 15-minute time-driven trigger.

## Notion Sync

The Notion sync pushes classification results to the Email Hub database. It's **disabled by default**.

### Notion Database Fields

| Notion Property | Source | Type |
|----------------|--------|------|
| Name | Email subject | Title |
| Sender | Email from address | Rich text |
| Date | Email date | Date |
| Mailbox Action | `mailbox_action` | Select |
| Action Type | `action_type` | Select |
| Sub Action Type | `sub_action_type` | Select |
| Category | `category` | Select |
| Person or Bot | `person_or_bot` | Select |
| Priority | `priority` | Select |
| AI Summary | `ai_summary` | Rich text |
| AI Suggested Reply | `ai_suggested_reply` | Rich text |
| AI Next Step | `ai_next_step` | Rich text |
| Tags | `tags` | Multi-select |

### Enabling Notion Sync

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Share the Email Hub database with the integration
3. Set the properties in GAS:
   ```
   NOTION_API_KEY = ntn_...
   NOTION_SYNC_ENABLED = true
   ```

### Database ID

The Email Hub database ID is `9b63f611b5744195b18e9f122579d4e2`. This is hardcoded in `notion-sync.js`.

## build.sh Usage

From the repo root:

```bash
# Push email-classifier to GAS
./build.sh email-classifier

# Works for any script in scripts/
./build.sh <script-name>
```

The build script:
1. Copies `shared/*.js` into the target script directory
2. Runs `clasp push`
3. Cleans up the copied files (script-specific files are untouched)

## Configuration

| Constant | Value | Location |
|----------|-------|----------|
| `BATCH_SIZE` | 10 | main.js |
| `SEARCH_QUERY` | Unread, unclassified, not spam/trash, last 2 days | main.js |
| `PROCESSED_LABEL` | `AI/Classified` | main.js |
| `PRIORITY_HIGH_LABEL` | `AI/High Priority` | main.js |

## Known Limitations

- GAS 6-minute execution limit constrains batch size
- Claude API rate limits require 1.5s pause between calls
- No retry on Notion API failures (single attempt per email)
- Classification prompt is hardcoded — update `classifier.js` to change rules
