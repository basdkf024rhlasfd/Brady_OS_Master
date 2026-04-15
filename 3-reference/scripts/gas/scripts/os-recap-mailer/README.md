# OS Recap Mailer

Weekly email delivery of Brady's OS Recap — picks up generated HTML/PDF from Google Drive and sends it as a self-email every Friday morning.

## How It Works

1. **Conductor** generates the recap (HTML + PDF) at 7:00 AM CT Friday and uploads to Google Drive `OS-Recaps/` folder
2. **This GAS script** runs at ~7:15 AM CT Friday, finds the latest recap, and emails it
3. **Apple Shortcut** on Brady's iPhone detects the `[OS-RECAP]` subject and sends an iMessage notification

## Setup

### Prerequisites
- Google Drive folder named `OS-Recaps` (create it manually)
- Shared utilities from `../../shared/` copied into this project (via `build.sh`)

### Deploy
```bash
# From the gas/ root directory
./build.sh os-recap-mailer
```

### Install Trigger
Run `installTrigger()` once from the GAS editor to set up the weekly Friday trigger.

### Test
- `testFindRecap()` — Verify it can find a recap file in Drive (no email sent)
- `testSendRecap()` — Full pipeline test (sends the email)

## Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Trigger | Friday ~7:15 AM CT | Weekly, time-driven |
| Drive folder | `OS-Recaps` | Must exist in root of My Drive |
| Subject prefix | `[OS-RECAP]` | Used by Apple Shortcut for text notification |
| Max file age | 24 hours | Won't send stale recaps |
| Recipient | Self (Brady) | Uses `GmailApp.sendEmail('me', ...)` |

## OAuth Scopes
- `gmail.send` — Send the recap email
- `drive.readonly` — Read recap files from Drive
- `spreadsheets` — Shared logging to Google Sheets
- `script.scriptapp` — Install time-driven triggers

## Apple Shortcut Setup (Text Notification)

1. Open **Shortcuts** on iPhone → **Automation** → **+**
2. Choose **"When I get an email"** → Subject contains `[OS-RECAP]`
3. Add action: **"Send Message"** → To: your own number → Body: "OS Recap is ready"
4. Toggle **"Ask Before Running"** OFF
5. Save

This gives you a text ping the moment the recap email lands.
