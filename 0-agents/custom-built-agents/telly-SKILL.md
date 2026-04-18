---
name: telly
trust_tier: T1
---

# Telly — Telegram-to-Notion Dispatch

Capture messages, photos, and files from Telegram and route them to Notion Streaming Notes.

## Instructions

You are operating the Telly dispatch bot. Telly is a Vercel serverless function that receives Telegram webhook events and writes structured pages to Notion. There is no conversation — just intake, routing, and confirmation.

---

## A. Architecture

```
Telegram (@Telly_bs_bot)
  → Vercel Serverless Function (/api/webhook)
    → Notion API → Streaming Notes DB

For files:
  Telegram file → Download from Telegram API
    → Upload to Vercel Blob (permanent URL)
      → Embed in Notion page (image block or linked paragraph)
```

**Project location:** `~/telly-bot/`
**Vercel project:** telly-bot
**Serverless function:** `api/webhook.js`

---

## B. Prefix Routing Table

| Prefix | Shortcut | Notion Type | Tags | Reply Label |
|--------|----------|-------------|------|-------------|
| `pulse:` | `p:` | Pulse Note | (none) | Pulsed |
| `task:` | `t:` | To Do | Work | Task created |
| `log:` | `l:` | Note | (none) | Logged |
| `idea:` | `i:` | Note | Product Backlog | Idea captured |
| `bug:` | `b:` | To Do | Bug | Bug logged |
| (none) | -- | Pulse Note | (none) | Captured |
| `/help` | -- | (no write) | -- | Shows command list |

Prefix matching is case-insensitive. The prefix is stripped from the content before writing to Notion.

---

## C. File Handling Protocol

When a file is sent, Telly prompts with inline keyboard buttons:
- **🔓 Public** — file uploaded to public Vercel Blob (`telly/` prefix), embedded inline in Notion (images render as image blocks, others as linked text). URL is unguessable but publicly accessible.
- **🔒 Private** — file uploaded to private Vercel Blob (`telly-private/` prefix), stored as text reference in Notion (`🔒 filename (stored privately)`). URL is not publicly accessible.

Pending file state is stored temporarily in Vercel Blob (`pending/{chatId}.json`) between the prompt and the button tap, then deleted after processing.

1. **Supported types:** photo, document, video, voice
2. **Download:** Fetch file from Telegram API using `getFile` → download from `file_path`
3. **Store (public):** Upload to Vercel Blob under `telly/` prefix with `access: "public"`
4. **Store (private):** Upload to Vercel Blob under `telly-private/` prefix with `access: "private"`
5. **Embed (public):** Images → Notion image block (external URL). Non-images → linked paragraph with paperclip icon
6. **Embed (private):** Text-only reference in Notion — no inline preview, no public URL
7. **Captions:** If a file message has a caption, it's parsed through the prefix routing table
8. **File-only messages:** No text/caption → defaults to Pulse Note with filename as title
9. **Size limit:** Telegram Bot API limits file downloads to 20MB

---

## D. Streaming Notes Schema

Properties Telly writes to:

| Property | Type | How Telly Sets It |
|----------|------|-------------------|
| Name | title | Message text truncated to 80 chars |
| Type | select | From prefix routing table |
| Source | select | Always "Chat" |
| Status | status | Always "Not Started" |
| Tags | multi_select | From prefix routing table (if any) |

**Database ID:** `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`

Telly does not write to any other properties (Priority, Target, Action, Phil Score, etc.).

---

## E. Credentials & Access

All credentials are stored as Vercel environment variables — never in code.

| Env Var | Source | Purpose |
|---------|--------|---------|
| `TELEGRAM_BOT_TOKEN` | BotFather | Authenticate with Telegram API |
| `TELEGRAM_CHAT_ID` | Telegram | Brady's chat ID for auth gating |
| `NOTION_API_KEY` | notion.so/my-integrations | Write to Streaming Notes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store | Upload files to permanent storage |

**Notion integration:** Must be connected to the Streaming Notes database via the database's Connections menu (••• → Connections).

---

## F. Deployment & Webhook Management

### Deploy
```bash
cd ~/telly-bot
npm install
vercel --prod
```

### Verify webhook
```
https://api.telegram.org/bot<TOKEN>/getWebhookInfo
```

### Reset webhook (after new Vercel deploy URL)
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<VERCEL_URL>/api/webhook
```

### Token rotation (if compromised)
1. Message @BotFather → `/revoke`
2. Save new token to password manager
3. Update `TELEGRAM_BOT_TOKEN` in Vercel Dashboard → Settings → Environment Variables
4. Redeploy: `cd ~/telly-bot && vercel --prod`

---

## G. Troubleshooting

| Symptom | Check |
|---------|-------|
| Bot doesn't respond | Webhook URL correct? (`getWebhookInfo`) |
| "Notion write failed" | Integration connected to Streaming Notes? API key valid? |
| Files don't appear | Vercel Blob store created and connected? `BLOB_READ_WRITE_TOKEN` set? |
| Large file fails silently | Telegram 20MB limit — file too large |
| Bot responds to wrong people | Verify `TELEGRAM_CHAT_ID` env var matches `8764020256` |

---

## H. Future Roadmap (Not Started)

- Voice message transcription (Telegram voice → Whisper API → text in Notion)
- Two-way sync: Notion status changes trigger Telegram notifications
- Scheduled digest: Daily summary of open Streaming Notes
- SMS fallback via Twilio
- New prefixes: `family:`, `meeting:`, custom routing
