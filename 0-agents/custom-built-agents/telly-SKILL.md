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

### Classic intake prefixes (Claude Haiku routes, writes generic Notion page)

| Prefix | Shortcut | Notion Type | Tags | Reply Label |
|--------|----------|-------------|------|-------------|
| `pulse:` | `p:` | Pulse Note | (none) | Pulsed |
| `task:` | `t:` | To Do | Work | Task created |
| `log:` | `l:` | Note | (none) | Logged |
| `idea:` | `i:` | Note | Product Backlog | Idea captured |
| `bug:` | `b:` | To Do | Bug | Bug logged |
| (none) | -- | Pulse Note | (none) | Captured |
| `/help` | -- | (no write) | -- | Shows command list |
| `/reset` | -- | (no write) | -- | Clears thread context |

### Feedback capture prefixes (bypass Claude, write System Instruction directly)

| Prefix | Priority | Reply Label |
|--------|----------|-------------|
| `rule:` | Must | Saved as rule (Must). Morning sweep will promote. |
| `never:` | Must | Saved as prohibition (Must). Morning sweep will promote. |
| `always:` | Must | Saved as default (Must). Morning sweep will promote. |
| `remember:` | Should | Saved as preference (Should). Morning sweep will promote. |

The feedback handler writes a row to Streaming Notes with `Type = "System Instruction"`, `Status = "Not Started"`, `Source = "Chat"`, and the specified `Priority`. The message body includes the raw DM and a capture timestamp. Morning sweep Phase 3.6b picks these up and promotes them to the Rules & Preferences page (`344ed43b-89c5-813d-bded-f1d5689510e2`).

**Note:** `log:` remains reserved for the classic general-note prefix — it does NOT trigger feedback capture, preserving muscle memory. The 4 feedback prefixes are distinct.

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

### Classic intake writes

| Property | Type | How Telly Sets It |
|----------|------|-------------------|
| Name | title | Message text truncated to 80 chars |
| Type | select | From prefix routing table |
| Source | select | Always "Chat" |
| Status | status | Always "Not Started" |
| Tags | multi_select | From prefix routing table (if any) |

### Feedback capture writes (`rule:/never:/always:/remember:`)

| Property | Type | How Telly Sets It |
|----------|------|-------------------|
| Name | title | Rule text after prefix, trimmed, capped at 200 chars |
| Type | select | Always "System Instruction" |
| Source | select | Always "Chat" |
| Status | status | Always "Not Started" |
| Priority | select | "Must" (rule/never/always) or "Should" (remember) |
| body | paragraph | Capture timestamp + raw DM for audit |

**Database ID:** `2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`

Telly does not write to other properties (Tags, Target, Action, Phil Score, etc.) on System Instructions. Morning sweep handles downstream disposition.

---

## E. Credentials & Access

All credentials are stored as Vercel environment variables — never in code.

| Env Var | Source | Purpose |
|---------|--------|---------|
| `TELEGRAM_BOT_TOKEN` | BotFather | Authenticate with Telegram API |
| `TELEGRAM_CHAT_ID` | Telegram | Brady's chat ID for auth gating |
| `NOTION_API_KEY` | notion.so/my-integrations | Write to Streaming Notes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store | Upload files to permanent storage |
| `TELLY_PUSH_SECRET` | `openssl rand -hex 32` | Shared secret for outbound `/api/push` (see H) |

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

## H. Outbound Push (`POST /api/push`)

Telly exposes an outbound endpoint so sweeps and OS automations can push one-line completion notifications to Brady's Telegram.

### Endpoint

```
POST https://<telly-vercel-url>/api/push
Content-Type: application/json
X-Telly-Secret: <TELLY_PUSH_SECRET>

{
  "message": "*Morning sweep done.* 3 priorities · 2 VIP emails · 1 thread",
  "link":    "https://www.notion.so/…"   // optional
}
```

- **Auth:** shared secret via `X-Telly-Secret` header matching `TELLY_PUSH_SECRET` env var. 401 on mismatch. The secret should never be logged.
- **Formatting:** `message` is sent with `parse_mode: MarkdownV2` (escaped by the endpoint). On Telegram 400, the endpoint falls back to plain text. `link` is appended as a MarkdownV2 `[link](url)` below the message body.
- **Length:** combined payload truncated to 4000 chars (Telegram's hard limit is 4096).
- **Response:** `{ ok: true }` on success, `401` / `400` / `502` on error.

### Callers

Sweep skills call this as their final step:
- `3-reference/skills/morning-sweep/SKILL.md` (3.13)
- `3-reference/skills/evening-sweep/SKILL.md` (6.3)
- `3-reference/skills/weekly-sweep/SKILL.md` (5.13)
- `3-reference/skills/daily-whitepaper/SKILL.md` (Phase 4 final step)
- `3-reference/skills/exec-intel-brief/SKILL.md` (Step 7)

Each skill's call block sources `~/.telly-push.env` for the URL and secret, then curls with a context-specific message template. On failure, the sweep logs a line and continues — the push is non-critical.

### Local `~/.telly-push.env` file

Gitignored. Expected shape:

```
export TELLY_PUSH_URL=https://<telly-vercel-url>/api/push
export TELLY_PUSH_SECRET=<hex>
```

---

## I. Future Roadmap (Not Started)

- Two-way sync: Notion status changes trigger Telegram notifications
- Scheduled digest: Daily summary of open Streaming Notes
- SMS fallback via Twilio
- New prefixes: `family:`, `meeting:`, custom routing
