# Telly

Telegram-to-Notion dispatch bot. Send a message to @Telly_bs_bot — it lands in Streaming Notes within seconds.

## What Telly Does

- Captures text messages from Telegram and writes them to Notion Streaming Notes
- Routes messages based on prefix (`pulse:`, `task:`, `log:`, `idea:`, `bug:`)
- Handles photos, documents, videos, and voice messages — stores in Vercel Blob, embeds in Notion
- Confirms each capture with a one-line reply in Telegram

## What Telly Does NOT Do

- Read, edit, or delete existing Notion pages
- Respond to anyone except Brady
- Make decisions about priority, assignment, or follow-up
- Hold conversation or maintain state between messages

## How to Use

Send a message to **@Telly_bs_bot** in Telegram:

```
task: Review the Q2 budget spreadsheet
```
→ Creates a To Do in Streaming Notes tagged "Work"

```
idea: Voice-controlled morning sweep trigger
```
→ Creates a Note tagged "Product Backlog"

```
Just a quick thought about the rebrand
```
→ Creates a Pulse Note (default, no prefix needed)

Attach a photo with a caption:
```
bug: Screenshot of the broken nav on mobile
```
→ Creates a To Do tagged "Bug" with the photo embedded inline

Send `/help` to see the full command list in Telegram.

## Architecture

```
Telegram → Vercel Serverless (/api/webhook) → Notion Streaming Notes
                    ↓ (for files)
              Vercel Blob (permanent storage)
```

**Code:** `~/telly-bot/api/webhook.js`
**Vercel project:** telly-bot
**Notion target:** Streaming Notes DB

## Relationship to Other Agents

Telly operates independently at the capture layer. It does not report to Claudine or any other agent — it's pure infrastructure. Other agents (DiCaprio, morning sweep) may read from Streaming Notes downstream, but Telly has no awareness of them.

Think of Telly as a mail slot: it accepts what comes in, puts it in the right bin, and closes. What happens after that is someone else's job.
