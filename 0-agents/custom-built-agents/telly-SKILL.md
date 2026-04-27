---
name: telly
trust_tier: T1
---

# Telly — Telegram-to-Notion Dispatch + OS Query

Capture messages, photos, and files from Telegram and route them to Notion Streaming Notes. Answer questions about Brady's OS using live KB context.

## Commands

| Command | What it does |
|---------|-------------|
| `/help` | Full command reference including Q&A capability |
| `/reset` | Clear conversation thread |
| `/status` | KB freshness, thread turn count, model in use |

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

## I. Inbound Ingest (`POST /api/ingest`) — ChatGPT bridge

Telly exposes a second inbound endpoint so non-Telegram surfaces (ChatGPT Custom GPTs,
browser extensions, other bots) can write to Streaming Notes using the same prefix
routing as Telegram. This lets Brady capture from ChatGPT without a separate service.

### Endpoint

```
POST https://<telly-vercel-url>/api/ingest
Content-Type: application/json
X-Telly-Secret: <TELLY_INGEST_SECRET>

{
  "text":   "rule: never commit secrets to public repos",
  "source": "ChatGPT"        // optional; defaults to "ChatGPT"
}
```

- **Auth:** shared secret via `X-Telly-Secret` header matching `TELLY_INGEST_SECRET`
  env var (separate from `TELLY_PUSH_SECRET` so outbound and inbound can rotate
  independently). 401 on mismatch. Never log the secret.
- **Routing:** `text` is parsed through the same prefix routing table used by
  Telegram DMs (section B). `rule:/never:/always:/remember:` write System Instructions;
  `pulse:/task:/log:/idea:/bug:` write classic intake; no prefix → Pulse Note.
- **Source tagging:** the `Source` property on the Notion page is set to the
  request `source` value (defaults to "ChatGPT"). Must be one of the values
  defined in the Streaming Notes DB select options for `Source` — unknown values
  are coerced to "Chat" with a warning in the response.
- **Response:**
  ```json
  { "ok": true, "notion_page_id": "349ed43b-...", "type": "System Instruction", "source": "ChatGPT" }
  ```
  On error: `401` (bad secret), `400` (malformed body), `502` (Notion write failed).
- **Rate limit:** 30 writes per minute per IP (reject with 429 after).
- **No file support** on this endpoint — text only. File capture stays on Telegram.

### Where to deploy

Webster's lane. The change lives in `~/telly-bot/api/ingest.js` and reuses
`~/telly-bot/lib/prefix-router.js` (factored out of the webhook handler). See
`references/chatgpt-to-telly-gpt-instructions.md` for the matching Custom GPT
setup that calls this endpoint.

### Fallback path

If `/api/ingest` cannot be shipped on the telly-bot repo, the fallback is a
standalone Vercel Function at `portal/src/app/api/chatgpt-capture/route.ts` in
the portal repo that validates a shared token and writes straight to Notion via
the existing `NOTION_API_KEY` env var. Same payload contract. Webster owns that
fallback work.

---

## J. Knowledge Base System

Telly loads Brady's OS context on every Claude-routed message and uses it to answer questions.

### Context sources

| Layer | What | How loaded |
|-------|------|------------|
| Rules & Preferences | Notion page `344ed43b-89c5-813d-bded-f1d5689510e2` — all behavioral rules | Fetched from Notion, cached in Blob |
| Recent captures | Last 15 Streaming Notes (title + type + status) | Fetched from Notion, cached in Blob |
| Static facts | Active clients, family context | Hardcoded in `lib/context.js` `buildContextString()` |

### Cache behavior

- Cache key: `telly/daily-context.json` in Vercel Blob
- TTL: 12 hours
- On cache hit (fresh): inject cached string into system prompt
- On cache miss (stale or missing): fetch from Notion, write new blob, inject
- On Notion failure: degrade gracefully — inject empty string, Telly still routes/answers with static facts

### Context refresh endpoint

Morning sweep triggers a force-refresh at ~6 AM CT so Telly starts each day with fresh context.

```
POST /api/context-refresh
X-Telly-Secret: <TELLY_PUSH_SECRET>
Content-Type: application/json
```

Response: `{ ok: true, length: <chars>, generatedAt: "ISO timestamp" }`

Auth: same `TELLY_PUSH_SECRET` used by outbound `/api/push`. 401 on mismatch.

**Morning sweep call (step 3.13b):**
```bash
[ -f ~/.telly-push.env ] && source ~/.telly-push.env
if [ -n "$TELLY_PUSH_URL" ] && [ -n "$TELLY_PUSH_SECRET" ]; then
  REFRESH_URL="${TELLY_PUSH_URL/\/api\/push/\/api\/context-refresh}"
  curl -sS -X POST "$REFRESH_URL" \
    -H "X-Telly-Secret: $TELLY_PUSH_SECRET" \
    -H "Content-Type: application/json" \
    > /dev/null || echo "[telly context refresh failed — non-critical]"
fi
```

### Thread memory

- Thread window: last 10 turns, stored in Vercel Blob at `thread/{chatId}.json`
- TTL: 6 hours (extended from 1h)
- `/reset` clears the thread immediately

### What Telly can answer

- "What did I capture about [topic] recently?" — searches recent notes in context
- "What's the rule around [behavior]?" — looks up Rules & Preferences
- "What are my active clients?" — answers from static context
- "What's on my plate?" — summarizes recent To Do items from Streaming Notes
- Any follow-up in the same thread without re-stating context

### What Telly still dispatches (no LLM)

Prefixed messages bypass Claude entirely and write directly to Notion:
`rule:`, `never:`, `always:`, `remember:` → System Instruction (Must/Should priority)

---

## K. Future Roadmap (Not Started)

- Two-way sync: Notion status changes trigger Telegram notifications
- Scheduled digest: Daily summary of open Streaming Notes
- SMS fallback via Twilio
- New prefixes: `family:`, `meeting:`, custom routing
