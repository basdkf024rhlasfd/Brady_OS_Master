# GAS Toolkit Cheat Sheet

Quick reference for common changes. Classification rules live in two places:
- **`rules.js`** — static rules you edit by hand (VIPs, categories, known senders)
- **`learned-rules` Sheet tab** — auto-generated rules from the learning engine (review/edit in the Sheet)

## Change classification rules

### Add a VIP sender (always High priority, Person)
Edit `rules.js` → `OWNER_CONTEXT.vip_contacts`:
```js
{ name: 'Person Name', email: 'their@email.com', note: 'Why they matter' }
```

### Add a known sender (skip Claude entirely)
Edit `rules.js` → `KNOWN_SENDERS`. Key = domain or exact email:
```js
'newdomain.com': { category: 'Automated', person_or_bot: 'Bot', priority: 'Low', action_type: 'Archive', tags: 'household', ai_summary: 'Description.', ai_next_step: 'Archive.' },
```
Pre-classified senders never hit Claude — zero token cost, instant.

### Add an expert network
Edit `rules.js` → `OWNER_CONTEXT.expert_networks`:
```js
expert_networks: ['GLG', 'Dialectica', ..., 'NewNetwork']
```

### Change a category mapping
Edit `rules.js` → `CATEGORY_RULES` array. First match wins.

### Add a hard-coded override (for Claude to follow)
Edit `rules.js` → `HARD_OVERRIDES` array. Copy an existing entry:
```js
{
  name: 'Descriptive name',
  match: 'What this matches',
  action_type: 'Archive',
  priority: 'Low'
}
```

### Add a new valid category
Edit `rules.js` → `VALID_CATEGORIES` array. Also add the match rule in `CATEGORY_RULES`.

## How pre-classification works

Every email is checked against `KNOWN_SENDERS` (static) and `learned-rules` (auto-generated) **before** Claude. If the sender matches, the email is classified instantly with no API call.

The **learning engine** runs weekly (Mondays). It analyzes the classification log, finds senders that have been classified the same way 5+ times with 90%+ consistency, and promotes them to the `learned-rules` Sheet tab. You can review, edit, or delete learned rules directly in the Sheet.

To preview what would be promoted: run `previewLearning()` in the GAS editor.

## Read state

- **High priority** → stays **unread** (visible in Gmail's "Unread" section)
- **Low priority** → marked **read** (drops to "Everything else")

## Deploy changes

```bash
cd 3-reference/scripts/gas
./check.sh                      # syntax check
./build.sh email-classifier     # deploy to GAS
./build.sh os-recap-mailer      # deploy recap mailer
```

## Check logs

Open the **GAS Toolkit Logs** Google Sheet. Tabs:
- `email-classifier` — all classification runs
- `auto-archive-audit` — every auto-archived email
- `learned-rules` — auto-promoted sender rules (editable)

Or in GAS editor: Executions → click any run to see Logger output.

## Script Properties (set in GAS web editor → Project Settings)

| Property | Used by | Required |
|----------|---------|----------|
| `ANTHROPIC_API_KEY` | email-classifier | Yes |
| `LOG_SHEET_ID` | all scripts | Yes |
| `ALERT_EMAIL` | all scripts | Recommended |
| `OWNER_EMAIL_ALIASES` | email-classifier | Recommended |
| `NOTION_API_KEY` | email-classifier | For Notion sync |
| `NOTION_SYNC_ENABLED` | email-classifier | For Notion sync |

`OWNER_EMAIL_ALIASES`: comma-separated list of Brady's email addresses. Used to detect "Brady already replied."

`ALERT_EMAIL`: where error alerts are sent. Without this, error alerts are silently skipped.

## Household Assistant integration

Emails tagged `household` (grocery, dining, food delivery) feed the Household Assistant project's budget tracking. Known household senders (Walmart, DoorDash, Sam's Club, etc.) are pre-classified in `KNOWN_SENDERS` — they never hit Claude.

## Add a new script

```bash
mkdir scripts/my-new-script
# Create: appsscript.json, main.js, .clasp.json, README.md
# Follow pattern in scripts/email-classifier/
./build.sh my-new-script
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "API key not found" | Set `ANTHROPIC_API_KEY` in Script Properties |
| "Exceeded maximum execution time" | Reduce `BATCH_SIZE` in main.js |
| No error alert emails | Set `ALERT_EMAIL` in Script Properties |
| "Brady replied" detection wrong | Set `OWNER_EMAIL_ALIASES` in Script Properties |
| clasp push fails | Run `clasp login` to re-authenticate |
| Learned rule is wrong | Edit or delete the row in the `learned-rules` Sheet tab |
| Want to see what learner would do | Run `previewLearning()` in GAS editor |
