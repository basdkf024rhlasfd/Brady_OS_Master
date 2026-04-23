# ChatGPT → Streaming Notes — Custom GPT Setup

Copy-paste setup for the Custom GPT that lets Brady capture to Streaming Notes from
ChatGPT. Calls Telly's `POST /api/ingest` endpoint (see `telly-SKILL.md` Section I).

## Prerequisites

- Telly deployed with `/api/ingest` endpoint live (Webster's lane).
- `TELLY_INGEST_SECRET` env var set in Vercel (`openssl rand -hex 32`).
- Brady's `TELLY_INGEST_SECRET` also saved to his password manager.

## Step 1 — Create the Custom GPT

In ChatGPT: **Explore GPTs → Create a GPT → Configure tab**.

### Name
`Brady Capture`

### Description
`Logs anything Brady says to Streaming Notes. Supports rule:/never:/always:/remember: for behavioral feedback, pulse:/task:/log:/idea:/bug: for classic capture.`

### Instructions (paste verbatim)

```
You are Brady Smallwood's capture agent. Your only job is to write what Brady says
into Streaming Notes via the telly-ingest action.

Behavior:
1. When Brady says anything like "log X", "remember Y", "rule: Z", "capture this",
   "note: …", "save this", or similar capture-intent phrasing — immediately call
   the `postToTellyIngest` action with his message as `text` and `source: "ChatGPT"`.
2. If the message already starts with a known prefix (rule:, never:, always:,
   remember:, pulse:, task:, log:, idea:, bug:), pass it through verbatim.
3. If there's no prefix and the intent is ambiguous, default to `pulse:` as prefix.
4. After the action returns, reply in one short line confirming the capture:
   "Logged to Streaming Notes as {type}." Include the notion_page_id if useful.
5. Never modify the text content. Trim whitespace only.
6. Do NOT try to classify, tag, summarize, or improve the message. Telly handles
   routing server-side.
7. If the action returns 401/400/502, tell Brady plainly and show the error.

Out of scope:
- You do not answer questions, summarize, or have opinions.
- You do not call any other action or search the web.
- You do not retain context between messages beyond what's in the conversation.

Voice: terse, operator-tone, no filler.
```

### Conversation starters

- `rule: `
- `remember: `
- `log: `
- `pulse: `

### Knowledge files

None needed. This GPT is a pure pass-through.

### Capabilities

- ☐ Web Browsing (off)
- ☐ DALL·E (off)
- ☐ Code Interpreter (off)

## Step 2 — Add the Action

Click **Create new action**.

### Authentication

- Type: **API Key**
- API Key: `<TELLY_INGEST_SECRET>` (paste the hex value)
- Auth Type: **Custom**
- Custom Header Name: `X-Telly-Secret`

### Schema (paste as-is; update server URL after deploy)

```yaml
openapi: 3.1.0
info:
  title: Telly Ingest
  description: Writes capture messages to Brady's Streaming Notes via Telly.
  version: 1.0.0
servers:
  - url: https://<telly-vercel-url>
paths:
  /api/ingest:
    post:
      operationId: postToTellyIngest
      summary: Capture a message to Streaming Notes
      description: Parses the message through Telly's prefix router and writes a Notion page in the Streaming Notes DB.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [text]
              properties:
                text:
                  type: string
                  description: The raw message to capture. Prefix is parsed server-side.
                source:
                  type: string
                  description: Capture surface. Defaults to "ChatGPT".
                  default: ChatGPT
      responses:
        "200":
          description: Capture succeeded
          content:
            application/json:
              schema:
                type: object
                properties:
                  ok: { type: boolean }
                  notion_page_id: { type: string }
                  type: { type: string }
                  source: { type: string }
        "400":
          description: Malformed request body
        "401":
          description: Bad or missing X-Telly-Secret
        "429":
          description: Rate limited (30/min/IP)
        "502":
          description: Notion write failed
```

### Privacy Policy URL

Required by ChatGPT for any Action. Use:
`https://mception.ai/privacy` (update if mception.ai privacy page moves).

## Step 3 — Save & Test

1. Click **Save → Only me** (keep private; Brady only).
2. Test: start a new chat with the GPT, send `rule: testing ChatGPT → Streaming Notes capture`.
3. Expected reply: "Logged to Streaming Notes as System Instruction."
4. Verify in Notion: a new page in Streaming Notes DB (`2e9ed43b-89c5-800d-acc7-d9e4e9ea1b83`)
   with Type=System Instruction, Source=ChatGPT, Status=Not Started.

## Step 4 — Pin the GPT

In ChatGPT: right-click the GPT in the sidebar → **Pin**. Brady can now capture
from any ChatGPT session without re-opening the GPT.

## Troubleshooting

| Symptom | Check |
|---|---|
| 401 Unauthorized | `TELLY_INGEST_SECRET` env var on Vercel matches the API Key in the GPT |
| 400 Bad Request | Payload missing `text` field — check the Instructions aren't rewriting it |
| 502 Bad Gateway | `NOTION_API_KEY` expired or integration disconnected from Streaming Notes DB |
| Source shows as "Chat" not "ChatGPT" | The `source` value in request didn't match DB select options — add "ChatGPT" to the Source property in Notion, or accept the coercion |
| Rate limited | 30/min/IP cap hit; wait or raise the limit in telly-bot config |

## Relationship to other capture paths

- **Telegram (existing):** primary mobile capture. Supports files.
- **Cowork / Claude Desktop (existing):** primary desktop capture via Claudine.
- **ChatGPT (this):** adds desktop capture from ChatGPT sessions. Text only.
- All three land in the same Streaming Notes DB. Morning sweep + streaming-notes-processor
  handle downstream routing identically.
