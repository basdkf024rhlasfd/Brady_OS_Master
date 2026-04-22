# Routing Log — Shared SOP

Canonical write pattern for the Routing Log DB. Every sweep and skill that dispositions an item (routes a note, publishes a brief, sends a dev plan to Conductor, moves a capture to its permanent home) appends one row here. This is the action log that Commissioner Brief, Traffic Light, and any future OS-wide reporting read from.

## Database

- **Notion DB ID:** `344ed43b-89c5-816a-ab54-ca49ca239748`
- **Registered in:** `3-reference/infrastructure-registry.yml` under `notion.routing_log_db`

## Schema

5 fields per entry. Do not add fields without updating this SOP and the registry.

| Field | Type | Required | Description |
|---|---|---|---|
| `date` | Date | yes | YYYY-MM-DD of the routing action |
| `original_title` | Title | yes | The item being routed (email subject, note title, capture text) |
| `destination` | Rich text | yes | Where it was routed (Notion page title, DB name, file path, URL, "Complete") |
| `reason` | Rich text | yes | Why this destination — one clause |
| `summary` | Rich text | yes | One-line description of content or outcome |

## When to write

Write one row **per routed item** whenever a skill:

- Processes a System Instruction and files it to Rules & Preferences
- Moves a Streaming Note to its permanent home (project file, reference page, archive)
- Publishes a whitepaper, brief, or deliverable
- Executes or queues a Build Request
- Dispositions a pipeline item (promoted, blocked, archived)
- Sends an email, posts a page live on mception.ai, or completes any action with a visible outcome

Do NOT write a row for pure reads (scans, queries, dashboards). Routing Log is an action log, not an activity log.

## Write pattern (Notion MCP)

Use `mcp__claude_ai_Notion__notion-create-pages` with the DB ID above. One page = one row.

Example payload:

```
{
  "parent": { "database_id": "344ed43b-89c5-816a-ab54-ca49ca239748" },
  "properties": {
    "original_title": "Batch Sittercity replies on Wed 2 PM",
    "date": "2026-04-21",
    "destination": "Rules & Preferences — Agent Defaults",
    "reason": "System Instruction captured via Cowork; permanent behavioral rule",
    "summary": "Batched Sittercity replies scheduled for Wed 2 PM block; added as agent default"
  }
}
```

Match the field names exactly to whatever they are in the Notion DB. If the DB property is titled differently, translate — but document the mapping here when you discover it.

## Examples of good rows

| original_title | destination | reason | summary |
|---|---|---|---|
| `Mark Justin Woods as VIP` | Gmail labels | Streaming Note Type=System Instruction processed | Added `VIP` label to Justin Woods' Gmail thread group |
| `Daily Whitepaper 2026-04-21` | `~/Downloads/Whitepapers/` | Daily whitepaper published | Published 2-page PDF; emailed to Brady |
| `Jorge Azevedo intel brief` | FFH folder | Exec-intel-brief run for FFH | Sent 3-part brief (cover + scannable + dossier) to Jorge |
| `Panda research thread #9` | `1-execution/.../Project - Panda/research/` | Deep research complete | Saved 4-page brief; referenced in Innovation Lab prep |

## What NOT to log

- Scan results (morning sweep reading 20 emails is not 20 log entries)
- Pre-flight checks (config sync, data freshness)
- Internal CRUNCH phases (analysis that doesn't produce a routed artifact)
- Diagnostic or debug output

If the skill produces zero routed items, it writes zero rows. That's fine.

## Verification

After a sweep runs, spot-check the Routing Log in Notion — the new rows should be clearly attributable to the sweep and consistent with this schema. If rows are missing fields or mis-typed, the skill calling this SOP is broken — fix it, don't work around.
