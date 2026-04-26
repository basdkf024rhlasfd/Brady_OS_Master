---
name: engagement-router
description: >
  Thin orchestrator for consulting engagements. Takes {client, problem_statement},
  classifies the problem into one of 8 archetypes, verifies Input Minimums,
  sequences the framework stack from framework-router.md, and logs the run to
  the Framework Runs DB. The "one command = full engagement" entry point.

  Trigger this skill whenever Brady says: "run engagement for [client] on [problem]",
  "route this engagement", "run the router on [X]", "what stack for [problem]",
  or any variation requesting orchestrated consulting delivery via the framework
  router.

  Override forms:
  - "run [client] as [archetype]" → forces classification
  - "run [client] stack: [skill-a, skill-b]" → forces stack

  This skill ORCHESTRATES sub-skills. It does not duplicate their instructions.
  Each sub-skill in the stack remains authoritative for its own domain.
trust_tier: T1
---

# Engagement Router

The orchestration layer for consulting delivery. Reads the `framework-router.md`
decision table, matches problem → archetype → skill stack, and runs the stack
against the Unified Client Object.

## What this skill does (in order)

1. **Classify** the problem_statement into one of 8 archetypes.
2. **Verify** Input Minimums for that archetype against the Company row.
3. **Load** the framework stack.
4. **Create** a Framework Run row (Status=Queued).
5. **Sequence** each skill in the stack, handing off outputs.
6. **Update** the Framework Run row to Shipped on completion.
7. **Log** to Routing Log.

## What this skill does NOT do

- Execute the skills itself — it invokes them.
- Rate quality — Brady rates post-run.
- Extract learnings — the Phase 3 pattern extractor does that weekly.
- Make engagement decisions — Brady decides whether to run and whether to ship.

---

## Execution Environment

- **Runs on:** CoWork (Claude Desktop) or Claude Code
- **Access needed:** Notion MCP, filesystem, whatever sub-skills need
- **Companies DB:** `d41b6f0d-9455-4bb4-9332-ac1539473253`
- **Framework Runs DB:** `2c5e7bd1df334cb8be8165f38081cff1` (data source `38433fe6-d586-4148-a6aa-788041701bdd`)
- **Decision table:** `3-reference/patterns/framework-router.md`
- **Routing Log:** `344ed43b-89c5-816a-ab54-ca49ca239748`

---

## Phase 1 — Input Resolution

**Invocation grammar (strict):**

```
run engagement for {client} on {problem_statement}
run engagement for {client} as {archetype} on {problem_statement}
run engagement for {client} stack: {skill1, skill2, ...} on {problem_statement}
run engagement for {client} horizon: {same-week|short|standard|extended} on {problem_statement}
```

Multiple modifiers can combine (e.g., `as Crisis horizon: same-week on ...`). Order is flexible as long as `on {problem_statement}` is last.

**Parse steps:**
- Extract `client` (name or slug). Resolve to Companies row by Name match, then by Slug.
- Extract `problem_statement` (everything after `on`). Required.
- Detect overrides: `as {archetype}`, `stack: {list}`, `horizon: {window}`. Capture for Phase 2 / 4.

**Client resolution branches:**

| Company row state | Router action |
|---|---|
| Row exists + active client (Type=Client, Engagement Type != Archived) | Proceed to Phase 2 |
| Row exists + Prospect (Type=Prospect) | Warn: "running an engagement against a Prospect — should Type flip to Client?" Wait for Brady. |
| Row exists + no Problem Statements section + Engagement Type in {Client, SOW, Retainer} | **Active-client-backfill branch** — Brady has worked with them before but the new Unified Client Object schema isn't filled. Router creates a stub P-statement from the provided problem_statement as P1 and flags for Brady to append P2-PN. Do NOT run prospect-research-kit (client is not a prospect). |
| No row, name matches a known recent prospect search | Prompt Brady: "No Company row for `{client}`. Run prospect-research-kit first? (y/n)" |
| No row, name doesn't match anything | Same prompt, plus "or abort?" |

Never auto-create a Company row from router. Row creation = prospect-research-kit or explicit Brady write.

---

## Phase 2 — Archetype Classification

If Brady passed `as {archetype}`: skip classification, log `override_reason="Brady forced archetype"`.

Otherwise, classify `problem_statement` into one of 8 archetypes:

| Archetype | Trigger signals in problem text |
|---|---|
| **Pricing** | "price", "margin", "promo", "discount", "realization", "elasticity", "tier" |
| **Ops redesign** | "throughput", "labor", "process", "cost takeout", "redesign", "format", "rollout" |
| **Product innovation** | "new product", "SKU", "whitespace", "category", "line extension", "feature" |
| **M&A thesis** | "acquire", "target", "roll-up", "carve-out", "PE", "post-close", "synergy" |
| **Org design** | "RACI", "role", "hiring", "leadership team", "decision rights", "org chart" |
| **Competitive response** | specific competitor named + threat language ("entered", "launched", "undercut") |
| **Growth** | "expansion", "market sizing", "channel", "geographic", "new segment" |
| **Crisis** | urgency language ("urgent", "24 hours", "today", "fire") + single-issue framing |

**Classifier prompt (use verbatim):**

```
You are classifying a consulting problem statement into exactly one of 8 archetypes.

Archetypes (with trigger signals):
- Pricing: price, margin, promo, discount, realization, elasticity, tier, Good-Better-Best
- Ops redesign: throughput, labor, process, cost takeout, SG&A, redesign, format, rollout
- Product innovation: new product, SKU, whitespace, category, line extension, feature roadmap
- M&A thesis: acquire, target, roll-up, carve-out, PE, post-close, synergy, thesis
- Org design: RACI, role, hiring, leadership team, decision rights, org chart, governance
- Competitive response: (specific competitor named) + threat language (entered, launched, undercut)
- Growth: expansion, market sizing, channel, geographic, new segment, TAM
- Crisis: urgent, 24 hours, today, fire, (single-issue framing + tight deadline)

Problem statement:
"""
{problem_statement}
"""

Client context (Companies row):
- Industry: {industry}
- Sub-vertical: {sub_vertical}
- Size: {company_size}
- Stage: {stage}
- Engagement Type: {engagement_type}

Output strict JSON:
{
  "primary_archetype": "<one of the 8>",
  "secondary_archetype": "<one of the 8 or null>",
  "confidence": "High|Medium|Low",
  "reasoning": "<one sentence>",
  "trigger_hits": ["<matched keyword/phrase>", ...]
}

Rules:
- Confidence=High only if the primary archetype's triggers dominate AND no other archetype has >1 trigger hit.
- Confidence=Medium if a secondary archetype has 1-2 trigger hits that could change interpretation.
- Confidence=Low if 3+ archetypes plausibly fit OR if the problem is a meta-question about the engagement itself (e.g., "how do we scope this?").
- Never output an archetype not in the list.
```

**Confidence handling:**
- **High** → proceed to Phase 3 automatically
- **Medium** → surface: "Problem reads as {A} (primary) with {B} (undertone). Run as {A}, {B}, or split into two runs?" Wait for Brady.
- **Low** → surface all matched archetypes, let Brady pick or re-scope the problem statement. Never auto-proceed.

---

## Phase 2.5 — Horizon Reconciliation

After archetype classification, if Brady passed `horizon: {window}` or the problem statement contains urgency cues ("Monday", "this week", "by tomorrow", "24h"), reconcile:

| Archetype | Elapsed range | Horizons it can hit |
|---|---|---|
| Pricing | 10-15h over 5-7d | Short, Standard, Extended |
| Ops redesign | 15-25h over 7-14d | Standard, Extended |
| Product innovation | 6-10h + MJ rendering | Short, Standard, Extended |
| M&A thesis | 15-20h over 7-10d | Standard, Extended |
| Org design | 8-12h over 4-7d | Short, Standard, Extended |
| Competitive response | 6-10h over 3-5d | Same-week, Short, Standard |
| Growth | 10-15h over 7-10d | Standard, Extended |
| Crisis | 3-6h in one sitting | Same-week only |

**Mismatch rules:**
- If archetype cannot hit the requested horizon → surface: "Archetype {A} needs {range}, horizon is {window}. Options: (a) run Crisis-shaped variant of {A} now, (b) run full {A} against a later deadline, (c) split: Crisis now + full {A} later."
- If archetype is Crisis but horizon is Extended → surface: "Crisis archetype is same-week shape. Consider reclassifying — what's the real archetype underneath?"

The Crisis-shaped variant of any archetype = `project-agent(Synthesis, rapid)` → `full-stack-ideation(SCQA + Pyramid only)` → `marketing-templates(one-pager)`. This is the same collapse the Phase 2 dogfood run surfaced on Panda/SG&A.

Capture the final `Deadline Horizon` on the Framework Run row.

---

## Phase 3 — Input Minimum Check

Load the Company row. Check the archetype's Input Minimum row from `framework-router.md`.

For each missing input, emit a gap line. If any gaps exist, surface a gap report:

```
🛑 Input gaps for {archetype} on {client}:
  • Company.Sub-vertical is empty → run prospect-research-kit or let me ask you 3 questions
  • No Problem Statements on Company page → sharpen P1-PN first
  • Project folder missing → create at {suggested_path}

Clear these, then re-run. Or say "proceed anyway" to override.
```

Brady can clear each gap and re-run, or force "proceed anyway" (logged to `override_reason`).

---

## Phase 4 — Framework Run Row Creation

Create a new row in Framework Runs DB with:
- `Name` = `{Client} - {Archetype} {YYYY-MM-DD}`
- `Company` = relation to the Company row
- `Archetype` = classified or overridden
- `Stack Used` = the ordered skill list (comma-separated, from the decision table)
- `Status` = "Queued"
- `Start Date` = today
- `Streaming Note` = source note URL if invoked from a note
- `Override Reason` = if any override was applied

Capture the new row's page URL for handoff in later phases.

---

## Phase 5 — Stack Sequencing

For each skill in the stack (ordered), invoke sequentially. Each skill reads the prior skill's output via the Framework Run row's Notes field (structured log) and from the Company page's canonical sections (P-statements, binding constraints).

**Notes field structured schema (append-only log, markdown format):**

```markdown
## Run Log — {Client} / {Archetype} {YYYY-MM-DD}

### Phase 1 — Input Resolution
- client_resolved: {name} ({company_row_url})
- problem_statement: "{text}"
- overrides: {none|archetype|stack|horizon}

### Phase 2 — Classification
- primary_archetype: {A}
- secondary_archetype: {B|null}
- confidence: {High|Medium|Low}
- Brady pick (if surfaced): {A|B|split|override}

### Phase 3 — Input Minimum Check
- result: {pass|soft-gap|hard-gap|override}
- gaps: [ "{gap 1}", "{gap 2}" ]

### Phase 4 — Framework Run Row
- row_url: {url}
- status transitions: Queued → In Progress @ {timestamp}

### Phase 5 — Stack Execution
#### Skill 1: {skill_name}
- invoked_at: {timestamp}
- input_summary: {1 line}
- output_location: {file path or Notion URL}
- status: {done|failed|blocked}
- handoff_to_next: {1 line summary of what next skill should read}

#### Skill 2: {skill_name}
...

### Phase 6 — Close Out
- final_status: {Shipped|Blocked|Abandoned}
- deliverables: [ "{url 1}", "{url 2}" ]
- brady_rating: {1-5|null-awaiting}
- client_rating: {1-5|null-awaiting}
- routing_log_row_appended: {yes|no}
```

Every skill in the stack is responsible for appending its own `#### Skill N:` block to this log after execution. The router only writes Phase 1-4 + the Close Out section.

**Handoff pattern:**
1. Router invokes skill N with context: `{company_slug, company_row_url, framework_run_id, framework_run_url, archetype, prior_skill_outputs_locations}`
2. Skill reads prior outputs from the locations noted in earlier Phase 5 skill blocks
3. Skill executes, produces output artifact (markdown/PDF/Notion page)
4. Skill appends a `#### Skill N:` block to the Notes field (content_update on Framework Run page)
5. Skill returns control to router with `{status, output_location, handoff_summary}`
6. Router invokes skill N+1 with updated context

**Status transitions:**
- "Queued" → "In Progress" on first skill invocation
- "In Progress" → "Blocked" if a skill surfaces a blocker (e.g., missing data mid-run)
- "In Progress" → "Shipped" when the final skill completes successfully
- "In Progress" → "Abandoned" if Brady says "kill this run"

**Anti-patterns:**
- Do NOT parallel-run skills within a stack. Some skills depend on prior outputs.
- Do NOT skip skills in the stack. Override upfront, not mid-run.
- Do NOT retry failed skills silently. Surface failures to Brady for disposition.

---

## Phase 6 — Close Out

When the final skill ships:

1. Set Framework Run `Status="Shipped"`, `End Date=today`.
2. Populate `Deliverables` field with links to all artifacts (PDFs, decks, Notion pages).
3. Prompt Brady for `Brady Rating` (1-5) — "How did this run go?"
4. Leave `Client Rating` null until Brady reports back from the client.
5. Append Routing Log row per `_shared/routing-log.md` SOP:
   - `destination` = Framework Run URL
   - `reason` = "Engagement router shipped {archetype} for {client}"
   - `summary` = stack used + key deliverables

---

## Phase 7 — Emit Report

≤12 lines. Format:

```
📋 Engagement Router — {client} / {archetype}
  Run: {Framework Run URL}
  Stack: {skill1} → {skill2} → ... → {skillN}
  Elapsed: {Nh Nm}
  Deliverables: {list of links}
  Brady Rating: awaiting ("rate this 1-5")

  Next cadence:
    - Weekly pattern extractor will update win rate on Sunday
    - If client responds, update Client Rating via "rate client {N}"
```

---

## Verification

After a run:
1. Framework Run row exists, Status="Shipped", End Date set.
2. Deliverables field has real links (not placeholders).
3. Routing Log has a new row attributable to this run.
4. Every skill in the stack completed (Notes field shows a line per skill).
5. Brady can list the run via "show my framework runs this month."

---

## Failure Modes

- **Classifier uncertain** → surface, don't guess.
- **Input gaps** → report, don't proceed silently.
- **Sub-skill failure** → Status=Blocked, surface to Brady, don't cascade.
- **Notion MCP timeout** → do not partial-apply the Framework Run row; retry.
- **Brady aborts mid-run** → Status=Abandoned, Notes capture reason.

---

## Relationship to other skills

- **framework-router.md** (`3-reference/patterns/framework-router.md`) — the decision table this skill reads.
- **client-engagement-kit** — the Day 1 package pipeline. Overlaps with engagement-router for Product innovation archetype. Future: client-engagement-kit becomes an archetype stack inside engagement-router.
- **project-agent** (OC Optimus / Fran) — when a project agent exists for the client, it's the first skill in Ops redesign, Org design, and Crisis stacks (Synthesis mode).
- **Pattern Extractor (Phase 3)** — weekly reader of Framework Runs + Outcomes. Updates Win Rate column in framework-router.md.
- **Claudine Scorecard K17 (Phase 3)** — will track "Framework refinement velocity" (skills revised per month with ≥1 win signal).
