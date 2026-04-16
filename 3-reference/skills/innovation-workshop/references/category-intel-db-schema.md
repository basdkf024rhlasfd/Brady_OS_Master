# Category Intel DB — Schema + One-Click Creation Runbook

This is the canonical spec for the Notion **Category Intel** database referenced by Stage 0
of `innovation-workshop` (and, once applied, the ops Stage 0 patch for
`operations-innovation-engine`). The DB holds **opportunity clusters** that feed Stage 0
across surfaces (Conductor, CLI, CoWork, Chat Projects).

**Status:** NOT YET CREATED. This doc stages the creation so it's a one-click MCP call
after Phil coherence review passes. See "One-click creation" section below.

---

## Why a shared DB (consumer + ops clusters in one place)

The product workshop and ops engine generate structurally similar artifacts:
- Product workshop → **consumer-behavioral clusters** (behavioral shift + JTBD + timing)
- Ops engine → **ops-pain clusters** (binding constraint + operator mandate + evidence)

They're different semantically but identical in workflow shape: a research-backed brief that
gates downstream ideation and survives across multiple runs. Splitting them into two DBs
doubles maintenance cost for no information-architecture benefit. Instead, one DB with a
`Type` property discriminates rows, and each skill filters on its type.

Shared fields: `Status`, `Last Refreshed`, `Evidence`, `Why Now`, `NOT-to-Generate`,
`Readiness Level Origin`, `Runs Spawned`, `Linked Ideas`.

Type-specific fields (nullable per row):
- Consumer-cluster fields: `Behavioral Shift`, `JTBD`, `Margin Location`
- Ops-cluster fields: `Binding Constraint`, `Operator Mandate`, `Measurable Win`

Each skill's Stage 0 only writes to its own type's fields. Queries filter on `Type`.

---

## Full schema

| Property Name | Type | Required | Purpose | Applies to Type |
|---------------|------|----------|---------|-----------------|
| Cluster Name | Title | ✅ | Human-readable name | Both |
| Type | Select | ✅ | `consumer-cluster` \| `ops-cluster` | — |
| Category | Select | ✅ | Maps to workshop canonical lanes (beverages, snacks, bakery, QSR, grocery, retail-RE, etc. — extend as needed) | Both |
| Status | Select | ✅ | `Fresh` (<30d) \| `Active` (30-90d) \| `Stale` (90-180d, needs refresh) \| `Archived` (>180d or manual) | Both |
| Last Refreshed | Date | ✅ | Staleness tracker; updated on every scan/edit | Both |
| Why Now | Rich text | ✅ | Timing insight — what specifically opened up recently | Both |
| Evidence | Rich text (URLs welcome) | ✅ | 3-5 sourced signal data points | Both |
| NOT-to-Generate Guardrails | Rich text | ✅ | Explicit territory to exclude in downstream ideation | Both |
| Readiness Level Origin | Select | ✅ | `0` \| `1` \| `2` \| `3` — which readiness level produced this cluster | Both |
| Runs Spawned | Number | — | Count of workshop runs that drew from this cluster | Both |
| Linked Ideas | Relation → Innovation Idea Pipeline | — | Ideas spawned from this cluster | Both |
| **Consumer-cluster fields** | | | | |
| Behavioral Shift | Rich text | Conditional | Core consumer behavior insight | consumer-cluster |
| JTBD | Rich text | Conditional | "When [situation] I want to [motivation] so I can [outcome]" | consumer-cluster |
| Margin Location | Select | Conditional | `DTC` \| `Premium retail` \| `B2B` \| `Private label` \| `Mixed` | consumer-cluster |
| **Ops-cluster fields** | | | | |
| Binding Constraint | Select | Conditional | `labor` \| `capital` \| `time` \| `throughput` \| `format` \| `policy` \| `customer trust` | ops-cluster |
| Operator Mandate | Rich text | Conditional | Who in client org cares + recency of signal | ops-cluster |
| Measurable Win | Rich text | Conditional | Metric + shift target + time horizon | ops-cluster |

"Conditional" means the field is required for its type and left blank for the other type.

---

## Staleness policy

Status auto-ages based on `Last Refreshed`:
- **Fresh:** 0-30 days since last refresh
- **Active:** 31-90 days
- **Stale:** 91-180 days — Stage 0 surfaces with "refresh soon" tag
- **Archived:** >180 days OR manually archived after a cluster produces no advancing ideas across 5+ runs

Stage 0 never surfaces `Archived` clusters unless Brady explicitly unarchives one.

---

## Parent page

**Proposed location:** Consulting Practice wiki (`333ed43b89c58123b019d1d108c53c11`),
sibling to the Innovation Idea Pipeline DB.

**Blocked on Phil coherence review.** Do NOT create until Phil has approved or redirected.
The paste-ready review doc is at `.context/phil-coherence-check-category-intel-db.md`.

---

## One-click creation (post-Phil)

Once Phil approves the location, run the following MCP call. The schema below is already
aligned with the table above; edit Parent page ID if Phil redirects.

```jsonc
// Pseudocode — real MCP invocation via mcp__claude_ai_Notion__notion-create-database
// Parent: Consulting Practice wiki page 333ed43b-89c5-8123-b019-d1d108c53c11
//         (confirm current data source via notion-search before running)
{
  "parent": {
    "type": "page_id",
    "page_id": "333ed43b-89c5-8123-b019-d1d108c53c11"
  },
  "title": "Category Intel",
  "description": "Opportunity clusters (consumer + ops) feeding Stage 0 of innovation-workshop and operations-innovation-engine.",
  "properties": {
    "Cluster Name": { "title": {} },
    "Type": {
      "select": {
        "options": [
          { "name": "consumer-cluster", "color": "blue" },
          { "name": "ops-cluster", "color": "orange" }
        ]
      }
    },
    "Category": {
      "select": {
        "options": [
          { "name": "Beverages" }, { "name": "Snacks" }, { "name": "Bakery" },
          { "name": "Dairy/Frozen" }, { "name": "Personal care" },
          { "name": "QSR" }, { "name": "Grocery retail" }, { "name": "C-store" },
          { "name": "Retail real estate" }, { "name": "Other" }
        ]
      }
    },
    "Status": {
      "select": {
        "options": [
          { "name": "Fresh", "color": "green" },
          { "name": "Active", "color": "blue" },
          { "name": "Stale", "color": "yellow" },
          { "name": "Archived", "color": "gray" }
        ]
      }
    },
    "Last Refreshed": { "date": {} },
    "Why Now": { "rich_text": {} },
    "Evidence": { "rich_text": {} },
    "NOT-to-Generate Guardrails": { "rich_text": {} },
    "Readiness Level Origin": {
      "select": {
        "options": [
          { "name": "0 — Cold start" },
          { "name": "1 — Raw theme" },
          { "name": "2 — Trend convergence" },
          { "name": "3 — Sharp thesis" }
        ]
      }
    },
    "Runs Spawned": { "number": { "format": "number" } },
    "Linked Ideas": {
      "relation": {
        "database_id": "<Innovation Idea Pipeline DB ID — look up via notion-search before running>",
        "single_property": {}
      }
    },

    "Behavioral Shift":    { "rich_text": {} },
    "JTBD":                { "rich_text": {} },
    "Margin Location": {
      "select": {
        "options": [
          { "name": "DTC" },
          { "name": "Premium retail" },
          { "name": "B2B" },
          { "name": "Private label" },
          { "name": "Mixed" }
        ]
      }
    },

    "Binding Constraint": {
      "select": {
        "options": [
          { "name": "labor" }, { "name": "capital" }, { "name": "time" },
          { "name": "throughput" }, { "name": "format" }, { "name": "policy" },
          { "name": "customer trust" }
        ]
      }
    },
    "Operator Mandate":    { "rich_text": {} },
    "Measurable Win":      { "rich_text": {} }
  }
}
```

> The exact JSON shape for `mcp__claude_ai_Notion__notion-create-database` may differ from
> this illustrative block — the MCP tool takes its own arg schema. Before running, inspect
> the tool's real schema and adapt this payload. Treat the above as the **authoritative
> content spec**, not the verbatim call.

---

## Post-creation runbook

Once the DB is created and Notion returns a `data_source_id`:

1. **Capture the ID** — save it somewhere durable (1Password, a dotfile, or add it to the
   Brady OS Notion Architecture section of `CLAUDE.md`).

2. **Replace 3 `<TBD>` placeholders** in committed skill files. Grep before editing:
   ```
   grep -rn "TBD — pending Phil coherence review + DB creation" 3-reference/skills/
   ```
   Expected hits:
   - `3-reference/skills/innovation-workshop/SKILL.md` — Stage 0.1 cluster query
   - `3-reference/skills/innovation-workshop/SKILL.md` — Step 9 Linked Ideas back-link
   - `3-reference/skills/os-context-pack/SKILL.md` — Section 13 active briefs pull

3. **Verify access** — run `notion-fetch` against the new data source; it should return
   the empty DB schema cleanly.

4. **Seed with a Run 0 cluster (optional but useful)** — create one consumer cluster
   from a recent product workshop run, one ops cluster from the Panda QSR workshop.
   This proves the schema works and gives Stage 0 something to surface on its first run.

5. **Re-run `os-context-pack`** — Section 13 should now pull the seeded clusters into
   the Chat Projects snapshot.

6. **Smoke-test both skills:**
   - Trigger `innovation-workshop` with "what are you seeing?" → Stage 0.1 should query
     the DB, see the 1 consumer cluster, offer to use it or scan fresh.
   - Trigger `operations-innovation-engine` on a named client → Stage 0.1 should query
     the DB, see the 1 ops cluster, note it as prior context.

7. **Update `CLAUDE.md` Notion Architecture section** — add:
   ```
   - **Category Intel DB** (Consulting Practice wiki, shareable): ID `<new-id>`
   ```

---

## Follow-up items (post-creation, separate PRs)

- Consider a Notion view filtered on `Status = Fresh OR Active` + sorted by `Last Refreshed`
  desc — this is the default view Stage 0 will want to render.
- Consider a filtered view per Type so Brady can browse consumer and ops clusters separately.
- Weekly-sweep Step 5.9 (or equivalent on the ops side) should surface stale clusters
  needing refresh — add a reminder pass.
