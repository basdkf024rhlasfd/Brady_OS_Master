# Email Classifier (v0.3)

Classifies incoming Gmail using a two-tier system: known senders are pre-classified instantly in pure JS (zero tokens), everything else goes to Claude. Applies Gmail labels, manages read state, logs to Sheets, and optionally syncs to Notion.

## How It Works

1. **Trigger** fires every 15 minutes
2. Fetches up to 10 unread threads (`newer_than:2d`), selects the latest unread message in each
3. **Pre-classifier** checks the sender against `KNOWN_SENDERS` (static) and `learned-rules` Sheet tab (auto-generated)
4. If no pre-classifier match → sends to **Claude** with the classification prompt (assembled from `rules.js`)
5. Applies Gmail labels: `AI/Classified`, `AI/High Priority`, `AI/{Category}`
6. **High priority** → stays unread. **Low priority** → marked read.
7. Auto-archives low-priority bot emails marked for archiving
8. Optionally syncs classification to Notion Email Hub
9. Logs everything to Google Sheets (including whether pre-classified or AI-classified)

## Learning Engine

The **learner** runs weekly (Mondays). It:
1. Reads the classification log
2. Groups results by sender domain
3. Promotes senders classified the same way 5+ times with 90%+ consistency to the `learned-rules` Sheet tab
4. Next trigger run, those senders are pre-classified — no more Claude calls

Brady can review, edit, or delete learned rules directly in the Sheet. Run `previewLearning()` in the GAS editor to preview what would be promoted.

## Safety Rails

- **High priority emails stay UNREAD** — they remain in Gmail's "Unread" section until Brady handles them
- **Low priority emails are marked read** — they drop to "Everything else"
- **High priority emails are NEVER auto-archived** — requires all three: `Low` priority + `Bot` + `Archive` action
- Expert network emails are always High priority per the rules
- Personal email domains (gmail.com, yahoo.com, etc.) are never auto-learned
- A bounded processed-message cache prevents reclassification

## Files

| File | Purpose |
|------|---------|
| `main.js` | Entry point, trigger handler, Gmail label ops |
| `rules.js` | **Classification rules + known senders** — edit this to change behavior |
| `pre-classifier.js` | Checks known senders + learned rules before Claude |
| `learner.js` | Analyzes logs, auto-promotes consistent senders to learned rules |
| `classifier.js` | Prompt assembly + Claude API call |
| `notion-sync.js` | Push results to Notion Email Hub |
| `appsscript.json` | GAS manifest with OAuth scopes |
| `.clasp.json` | clasp project config |

Shared utilities (`claude-api.js`, `config.js`, `logger.js`, `error-handler.js`) are copied in by `build.sh` at deploy time from `shared/`.

## Setup

### 1. Create GAS Project

```bash
cd scripts/email-classifier
clasp create --type standalone --title "Email Classifier"
```

### 2. Set Script Properties

In the GAS web editor (Project Settings > Script Properties):

| Property | Value | Required |
|----------|-------|----------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | Yes |
| `LOG_SHEET_ID` | Google Sheet ID for logs | Yes |
| `ALERT_EMAIL` | Email for critical failure alerts | Recommended |
| `OWNER_EMAIL_ALIASES` | Brady's email addresses (comma-separated) | Recommended |
| `NOTION_API_KEY` | `ntn_...` | For Notion sync |
| `NOTION_SYNC_ENABLED` | `true` | For Notion sync (default: `false`) |

### 3. Build and Push

```bash
./check.sh
./build.sh email-classifier
```

### 4. Test

In the GAS editor:

1. `testClaudeConnection()` — Verify API key works
2. `testClassification()` — Classify 3 recent unread emails (dry run)
3. `previewLearning()` — See what the learner would promote
4. `testNotionSync()` — Test Notion integration with mock data

### 5. Install Trigger

Run `installTrigger()` from the GAS editor.

## Changing Rules

Edit `rules.js`. See `CHEATSHEET.md` for common edits (add VIP, add known sender, change category, add override).

## Household Assistant Integration

Emails tagged `household` (grocery, dining, food delivery) feed the Household Assistant project's budget tracking. Known household senders (Walmart, DoorDash, Sam's Club, etc.) are pre-classified in `KNOWN_SENDERS` — they never hit Claude.

## Known Limitations

- GAS 6-minute execution limit constrains batch size
- Claude API rate limits require 1.5s pause between calls
- No retry on Notion API failures (single attempt per email)
- If multiple unread messages pile up in one thread between runs, only the latest is classified
- Learning engine never auto-learns personal email domains (gmail.com, etc.)
