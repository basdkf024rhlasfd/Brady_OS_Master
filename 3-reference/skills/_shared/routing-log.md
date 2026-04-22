# Routing Log — Shared SOP

Canonical write pattern for the Routing Log DB. Every sweep and skill that dispositions an item (routes a note, publishes a brief, sends a dev plan to Conductor, moves a capture to its permanent home) appends one row here. This is the action log that Commissioner Brief, Traffic Light, and any future OS-wide reporting read from.

## Location

- **Notion page ID:** `344ed43b-89c5-816a-ab54-ca49ca239748`
- **Page title:** 📍 Routing Log
- **Registered in:** `3-reference/infrastructure-registry.yml` under `notion.routing_log_db`
  (name is legacy — this is a page with a markdown table, not a DB)

**Implementation note (verified 2026-04-22):** The Routing Log is a flat
markdown **table** on a single Notion page, NOT a Notion database. Rationale
per the page itself: "an agent loads the full routing history in one fetch.
For the lookup pattern ('where did X go?'), this is faster and cheaper on
tokens than a paginated DB query." Use `notion-update-page` with
`command: update_content` to append rows — do NOT use `notion-create-pages`
with a database_id parent (that call will 400 because the target is a page).

## Schema

8 columns in the current table. Additions have accumulated over time — keep
new rows consistent with existing column headers:

| Column | Required | Description |
|---|---|---|
| `Date` | yes | YYYY-MM-DD of the routing action |
| `Original Title` | yes | The item being routed |
| `Original ID` | optional | Source page ID or commit hash in backticks; `—` if none |
| `Source Type` | optional | e.g. Pulse Note, Thread Log, Consulting deliverable, System Instruction |
| `Routed To` | yes | Where it was routed (Notion page path, URL, file path) |
| `Destination ID` | optional | Target page ID or PR number; `—` if none |
| `Why` | yes | One clause — why this destination |
| `Summary` | yes | One-line description of content or outcome |

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

Use `mcp__claude_ai_Notion__notion-update-page` with `command: update_content`
to append rows to the markdown table. Find the last `<tr>...</tr>` block
ending the table, replace it with `last_row + new_rows + </table>`.

Example (one new row):

```python
notion-update-page(
  page_id="344ed43b-89c5-816a-ab54-ca49ca239748",
  command="update_content",
  properties={},
  content_updates=[{
    "old_str": "<td>Past weekly sweep moved to Notes DB</td>\n</tr>\n</table>",
    "new_str": (
      "<td>Past weekly sweep moved to Notes DB</td>\n</tr>\n"
      "<tr>\n"
      "<td>2026-04-22</td>\n"
      "<td>Batch Sittercity replies on Wed 2 PM</td>\n"
      "<td>—</td>\n"
      "<td>System Instruction</td>\n"
      "<td>Rules & Preferences — Agent Defaults</td>\n"
      "<td>—</td>\n"
      "<td>Captured via Cowork; permanent behavioral rule</td>\n"
      "<td>Batched Sittercity replies scheduled for Wed 2 PM block; added as agent default</td>\n"
      "</tr>\n"
      "</table>"
    )
  }]
)
```

**Tips for multi-row appends:** emit all new rows together in one
content_update call. The `old_str` must exactly match the current last-row
+ `</table>` in the page — fetch first if unsure.

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
