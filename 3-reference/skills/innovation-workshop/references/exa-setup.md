# Exa API Setup — Semantic Trend Hunting for Stage 0

Stage 0 of `innovation-workshop` (and the `category-intel` research type in `deep-research`)
can use **Exa** to catch emerging signals that keyword-based search misses. Exa does
semantic search — it finds pages by *meaning*, not keywords — which is what you want when
the query is "what's starting to shift in [category]?" rather than "[category] market size."

This doc covers install, auth, usage pattern, and graceful fallback. **Exa is optional.**
If it's not configured, Stage 0 falls back to WebSearch + Bright Data and continues without
error — it just loses some pre-mainstream signal sensitivity.

---

## Why Exa (not just another search API)

Keyword search wins when you know what to ask. Semantic search wins when you don't.

| Query shape | Winner | Why |
|-------------|--------|-----|
| "creatine snack products 2026" | WebSearch / Bright Data | Direct terms, indexed pages |
| "pre-mainstream behaviors around gym-adjacent snacking" | **Exa** | Semantic intent, not a keyword set |
| "early indicators of category formation in [X]" | **Exa** | "Indicators" requires meaning matching, not string match |
| "new product launches on Kickstarter in [category]" | Either | Direct query works fine |

For Stage 0's behavioral edge + pre-commercial signal layers, Exa's hit rate on surfacing
useful weak signals is meaningfully higher. For Stage 0's trade show + macro layers,
WebSearch/Bright Data is fine.

---

## Install — two paths

### Path A (recommended): Exa MCP server

If Exa ships an official MCP server (verify current name and install command at
https://exa.ai/docs — this doc must not fabricate the package name), install it so
Claude Code / Conductor / CoWork can call it via `mcp__exa__*` tools.

Steps (verify specifics before running):

1. Register at https://exa.ai and generate an API key in the dashboard.
2. Install the MCP server per Exa's current docs. Typical shape:
   ```
   # Example only — verify exact package name and install method in current Exa docs
   npx -y @exa/mcp-server
   ```
3. Register the MCP server in Claude Code / Conductor config with `EXA_API_KEY` env var:
   ```jsonc
   // ~/.claude.json or workspace MCP config — structure depends on host
   {
     "mcpServers": {
       "exa": {
         "command": "npx",
         "args": ["-y", "@exa/mcp-server"],
         "env": { "EXA_API_KEY": "sk-exa-..." }
       }
     }
   }
   ```
4. Restart the host. Verify tools appear (e.g., `mcp__exa__search`, `mcp__exa__find_similar`).

> **Before using:** confirm the actual tool names once installed. This doc uses
> `exa_search` / `exa_find_similar` as conceptual names; the real MCP surface may differ.

### Path B (lightweight): direct HTTP via WebFetch

If MCP install is blocked (corporate config, debugging, etc.), the skill can call Exa's
REST API directly using `WebFetch` with an Authorization header. This is slower to wire
in and doesn't get the same streaming / batching benefits.

Set `EXA_API_KEY` in whatever env the skill reads (workspace `.env`, shell profile, etc.),
and call the search endpoint per current Exa REST docs. Do NOT hardcode a fabricated
endpoint URL here — always pull the current URL and payload shape from https://exa.ai/docs
at install time.

---

## Auth

- API key lives at https://exa.ai/dashboard (create one account, one key).
- Store as `EXA_API_KEY` environment variable. Never commit it. Never paste it into
  chat surfaces that might log.
- If using MCP, the env var is passed via MCP server config (see Path A step 3 above).
- If using direct HTTP, the env var is read at runtime by whatever skill calls out.

---

## Stage 0 usage patterns

Stage 0 issues semantic queries across the five source layers defined in `deep-research`
(`category-intel` type). Exa does best on the first two layers; the other three still
benefit from it as a secondary pass.

**Behavioral edge layer — Exa sweet spot:**
- "emerging consumer behaviors around [category] that brands haven't caught up to"
- "people hacking [category] products for uses manufacturers didn't design for"
- "pre-mainstream routines in [category] that show up on tiktok or reddit"

**Global retail scouting — useful but secondary:**
- "retail category creation signals from japan don quijote in [year]"
- "premium retail launches in [category] at waitrose or whole foods [region]"

**Pre-commercial signal — Exa useful for weak signals:**
- "kickstarter projects in [category] that cleared funding bar in last 6 months"
- "patent filings around [novel ingredient or format] 2025-2026"

**Trade show layer — WebSearch usually fine, Exa optional:**
- "[Expo West / Fancy Food] [year] trends [category]"

**Macro layer — WebSearch / Bright Data preferred:**
- Earnings transcripts, USDA/BLS, Google Trends — keyword-friendly

### Rule of thumb
Use Exa for Stage 0 queries 1–2 (behavioral + retail scouting). Use WebSearch + Bright
Data for layers 3–5. This gives the best cost/signal ratio.

---

## Graceful fallback

The skill must never block on Exa. If the MCP tool is missing or the API key is unset:

1. Log a single-line notice: `"Exa not configured — falling back to WebSearch for semantic
   queries. Results will be thinner on pre-mainstream signals."`
2. Substitute `WebSearch` for the Exa calls. Same queries; the answers just won't be as
   semantically rich.
3. Continue Stage 0 normally. Do NOT ask Brady to install Exa unless he asks what's missing.

This is the same pattern already used for Bright Data in other skills — **optional, graceful.**

---

## Budget / cost

- Exa's free tier (verify current limits at https://exa.ai/pricing) typically covers
  several hundred searches per month, which is enough for daily Stage 0 runs.
- Each Stage 0 cold-start scan issues roughly 10–20 semantic queries.
- Paid tier adds longer context, reranking, and more results per query — worth it if
  Stage 0 becomes a daily operation.
- There is no bulk/batch pricing lock-in as of this writing — confirm before committing.

**If Brady is paying-as-you-go and running the workshop multiple times per day**, flag the
monthly usage in weekly-sweep so he can decide whether to move up a tier.

---

## Verification checklist

After install, verify Exa is working before relying on it for a live Stage 0 run:

- [ ] `EXA_API_KEY` is set in the env the skill reads from
- [ ] MCP tools appear in Claude Code / Conductor tool list (e.g., `mcp__exa__search`)
- [ ] A test query returns results with non-empty `text` or `highlights` fields
- [ ] Skill falls back silently when `EXA_API_KEY` is unset — test this by running with
      key removed and confirming Stage 0 still completes

If any of these fail, capture the error and log it; don't silently degrade without a
notice line.

---

## When NOT to reach for Exa

- For competitive intelligence briefs on named companies → use earnings transcripts
  + company filings directly; Exa doesn't add much.
- For patent deep dives → use USPTO/Google Patents directly.
- For structured macro data → use USDA/BLS/Google Trends; Exa is wasted effort here.

Exa is the best tool you have for the fuzzy top of Stage 0 — "what's starting to
happen?" — and not much more. Don't try to use it for everything.
