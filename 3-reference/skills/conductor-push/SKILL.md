---
name: conductor-push
description: |
  Two-part skill: (1) send a Telly/Telegram message directly from Conductor without the /api/push
  secret — using the bot token + chat ID from ~/telly-bot/.env.local; (2) schedule a delayed
  one-shot task in Conductor using ScheduleWakeup, optionally delivering the result via Telly.
  Trigger: "message me from telly", "send a telly notification", "in X minutes do Y",
  "delay this", "schedule this for later".
trust_tier: T1
---

# Conductor Push

Two capabilities, often combined: send Telly messages directly from Conductor, and delay task
execution inside a Conductor session.

---

## A. Direct Telly Push

Conductor agents can push to Brady's Telegram without going through `/api/push` or needing
`TELLY_PUSH_SECRET`. Use the bot token and chat ID directly against the Telegram Bot API.

### Credentials

Both values live in `~/telly-bot/.env.local` (Vercel local env file, not committed):

| Var | Value location |
|-----|---------------|
| `TELEGRAM_BOT_TOKEN` | `~/telly-bot/.env.local` → `TELEGRAM_BOT_TOKEN` |
| `TELEGRAM_CHAT_ID` | `~/telly-bot/.env.local` → `TELEGRAM_CHAT_ID` (Brady's chat: `8764020256`) |

### Send a message

```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"${TELEGRAM_CHAT_ID}\",
    \"text\": \"Your message here\",
    \"parse_mode\": \"HTML\"
  }"
```

Or inline with hardcoded values (acceptable in Conductor — not committed to git):

```bash
curl -s -X POST "https://api.telegram.org/bot8650865761:AAGWaC5R9PLjtTd8SENV6Lr_HCKqM9tnvZQ/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "8764020256", "text": "Your message", "parse_mode": "HTML"}'
```

**When to use this vs `/api/push`:**
- Use direct bot API from Conductor — no push secret needed, always works.
- Use `/api/push` from sweeps and scheduled agents — they source `~/.telly-push.env` per the sweep SOP.

### Formatting tips
- `parse_mode: HTML` supports `<b>`, `<i>`, `<code>`, `<a href="...">` — preferred over MarkdownV2 (fewer escaping headaches).
- Keep messages under 4096 chars (Telegram hard limit).
- For multi-line summaries, use `\n` in the JSON string.

---

## B. Delayed Execution (ScheduleWakeup)

Conductor supports one-shot delayed tasks via the `ScheduleWakeup` tool. Brady can say "in 15
minutes do X" and Claudine schedules a wakeup with a self-contained prompt.

### How it works

1. Call `ScheduleWakeup` with `delaySeconds` and a fully self-contained `prompt`.
2. The session wakes up at the scheduled time and executes the prompt as a new turn.
3. For one-shot tasks (not repeating loops), **do NOT call ScheduleWakeup again** inside the wakeup prompt.

### Timing guide

| Delay requested | delaySeconds | Notes |
|----------------|-------------|-------|
| < 5 minutes | exact seconds | Cache stays warm — fast and cheap |
| 10 minutes | 600 | Cache miss on wakeup — acceptable |
| 15 minutes | 900 | Cache miss — still fine for one-shot |
| 30 minutes | 1800 | Cache miss — use for longer waits |
| Max | 3600 | Runtime ceiling |

### Prompt writing rules

The wakeup prompt executes with **no memory of the scheduling conversation**. It must be:
- Fully self-contained (include all context, IDs, credentials sources, output format)
- Explicit about what to do and where to write results
- Instructed: "This is a one-time task. Do not call ScheduleWakeup when done."

### Template

```
One-shot task (do NOT reschedule): [task description]

Context:
- [any relevant IDs, file paths, or config]
- Credentials at: [location]

Steps:
1. [step 1]
2. [step 2]
3. Send result via Telly: curl -s -X POST "https://api.telegram.org/bot8650865761:AAGWaC5R9PLjtTd8SENV6Lr_HCKqM9tnvZQ/sendMessage" -H "Content-Type: application/json" -d '{"chat_id": "8764020256", "text": "[summary]", "parse_mode": "HTML"}'

Do not call ScheduleWakeup when done.
```

---

## C. Combined Pattern: Delay + Telly Delivery

The most useful form: Brady asks for something in N minutes, Claudine schedules it and delivers
the result to Telly so Brady doesn't have to check Conductor.

### Example flow

1. Brady: "in 10 minutes, check what changed in Notion and message me"
2. Claudine calls `ScheduleWakeup(delaySeconds=600, prompt="One-shot: query Notion for last 3 hours of changes... then curl Telly with the summary. Do not reschedule.")`
3. Session wakes up, runs the task, pushes result to Telly.
4. Brady gets a Telegram message — no Conductor check-in needed.

### Fallback: Gmail draft

If Telly push fails (bot API unreachable), fall back to `mcp__claude_ai_Gmail__create_draft` to
brady.smallwood@gmail.com with the same content. Note in the response that it landed in Drafts.

---

## D. Known Constraints

- **Gmail MCP token** can expire — if `mcp__claude_ai_Gmail__*` returns "requires re-authorization",
  Brady needs to reconnect in claude.ai Settings → Integrations. Cache-clearing alone doesn't fix it;
  full disconnect + reconnect does.
- **ScheduleWakeup max delay** is 3600s (1 hour). For longer delays, use `/schedule` to create a
  cron-based remote agent instead.
- **Wakeup context**: the wakeup turn has no memory of prior conversation — write prompts that stand alone.
