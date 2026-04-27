---
name: musashi-review
trust_tier: T1
description: >
  Musashi San's two-mode skill: (1) nightly agent review and (2) deploy authority.

  REVIEW MODE — Runs daily at 12:00 AM CT. Inventories every custom agent, scores
  each on five objective dimensions against an aspirational 10/10 ideal state, emits
  1–3 concrete recommendations per below-threshold agent, scans the web for brand-new
  AI tooling / MCPs / platforms worth plugging in, and generates 3–5 low-manual-lift
  business ideas that match Brady's current capabilities. Writes a gitted backup + a
  `Type="Musashi Review"` row in Streaming Notes that morning sweep consumes in Phase
  1.0c. Nothing ships without Brady's approval.

  DEPLOY MODE — Executes web publishing operations via webster-SKILL.md sub-routines.
  Trigger when Brady says "publish [X] to mception", "deploy [X]", "add access for
  [email]", "fix the build", "wire up [API]", "permissions audit", "UAT [slug]", or
  any variation touching mception.ai publishing, Vercel config, portal access, or
  deploy diagnostics.

  REVIEW MODE triggers: "run musashi", "musashi review", "agent review", "agent audit",
  "run the agent tension pass", "daily agent check", "musashi scan", "what's new in AI",
  "run the tension cycle".

  This skill owns the daily tension/brainstorming cycle AND all mception.ai/Vercel
  deploy operations. It does NOT own operations grooming (phil-SKILL), per-Type
  streaming-notes actioning (streaming-notes-processor), weekly recap (weekly-os-recap),
  or deep research on a single topic (deep-research).
---

# Musashi San — Daily Agent Review + Tension Pass

## Doctrine Banner — Read First

This skill operates as a **Claudine-tier bounded SOP** in the Conductor environment.
Musashi San's profile (`musashi.md`) has been reconciled with governance — he is
Head Coach / Craft Arbiter (per `council-charter.md` and `hierarchical-contracts.md`)
and Systems Commander (owns strategic intelligence + deploy authority). The STIHL
product-owner framing is legacy context, not the active identity.

The skill applies Musashi's **lens** — craft quality judgment, "placeholder vs. strong"
content calls, competitive framing — to the daily review pass and to deploy execution.
It does not claim Musashi the ChatGPT agent writes to Notion or edits files directly;
this is the Claudine-tier scheduled execution surface.

## Why This Exists

Brady's OS has ~15 custom agents, each with a trust tier and role. There is no
continuous pressure pulling each agent toward its ideal state. No daily
interrogation of "is this agent actually earning its keep?" — so weak agents
drift, strong agents plateau, and nobody asks what could replace any of them.

Brady's ideal state: "run a huge business with zero manual work." 10/10 is
asymptotic — it will never be reached, and that's the point. The permanent gap
between today's score and 10 is the engine. Musashi's daily job is to measure
the gap, surface the best next step for closing it, and notice when the world
outside (new tools, new platforms, new monetization surfaces) has moved faster
than the OS has.

Morning sweep picks up Musashi's output, beats it up, sizes the dev plans, and
asks Brady to approve before anything live or token-heavy runs. The feedback
loop is: Musashi tensions → morning sweep plans → Brady approves → builder
executes → next night Musashi re-scores. Daily tension, weekly visible
improvement, zero auto-shipping.

## Execution Environment

**Runs on:** Claude.ai Code scheduled triggers (schedule name: `musashi-review`, daily midnight CT / 05:00 UTC in CDT). Each run opens a session at `claude.ai/code/session_XXX?trigger=trig_XXX` using Sonnet 4.6.

**NOT Conductor:** Earlier docs suggested Conductor `/schedule` — that path was never wired. Claude.ai Code triggers are the actual execution surface.

**Scheduled:** Daily midnight (00:00) CT — always before the 4 AM Phil Pre-Sweep and the 6 AM morning sweep.

**Access needed:**
- Notion MCP (read agents' activity, write review row + routing log)
- Exa MCP (web search for new tools, companies, platforms)
- Bright Data MCP (deeper web scraping when Exa isn't enough)
- File system (read agent profiles, write backup, read git history)

**Expected runtime:** 8–12 minutes (web scans are the variable cost).

**Token budget:** Cap at ~150k input + 40k output per run. If tools exceed
budget mid-run, degrade gracefully — skip Phase 4 (Tech Scan) before skipping
Phase 2 (Scoring).

**Notion DB IDs** (canonical from `3-reference/infrastructure-registry.yml`):
- Streaming Notes: `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`
- Routing Log (page with markdown table): `344ed43b-89c5-816a-ab54-ca49ca239748`

**Output locations:**
- Backup (persistent, gitted): `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md` — **lands in Claude.ai Code's repo checkout, NOT automatically synced to Conductor workspaces.** Other agents must read the Notion handoff row, not rely on local filesystem.
- Notion handoff: one Streaming Notes row per run. Name MUST start with `Musashi Review — YYYY-MM-DD`. Type MUST be `Daily State` (DB schema does not have a `Musashi Review` Type option — Name prefix is the queryable distinction).
- Routing Log: one summary row per run

## Pre-Flight — Chunked Persistence (CRITICAL — added 2026-04-25)

**Why:** Musashi's 2026-04-25 12:00 AM remote run hit `Request timed out` mid-Phase-4 (Tech Scan parallel calls); same pattern killed Heidi at 12:00 AM. Root cause: all phases stream as one long response. When Conductor kills the stream, **everything in working memory is lost.**

**Rule:** After each `## Phase N` block completes, IMMEDIATELY `Edit` the backup file at `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md` to append the section just computed BEFORE starting Phase N+1. Update STATUS line to `running — last persisted: Phase N at HH:MM`. If a future run finds a today-dated backup with `STATUS: running`, resume from Phase N+1.

This is the canonical "Tier 3 Reliability Standard" — every long-running scheduled agent must follow it. See `3-reference/governance/tier-3-reliability.md` (TODO if missing).

## Pre-Flight (Silent)

1. Confirm Notion MCP, Exa, Bright Data, git are all reachable. Log any unreachable — the run proceeds with that section marked `(unavailable this run)`, doesn't crash.
2. Ensure `1-execution/areas/brady-os/musashi-reviews/` exists; create if missing.
3. Compute today's date (YYYY-MM-DD, America/Chicago).
4. Create the backup file at `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md` with a `STATUS: running` header. All subsequent phases write to this file BEFORE touching Notion.

## Phase 1 — Agent Inventory

Enumerate every agent to review, filtered by Roster State:

1. List files in `0-agents/custom-built-agents/*.md`, excluding `_template.md`, `references/`, and any `-README.md` / `-STATUS-TEMPLATE.md` variants.
2. For each agent file, also note whether a colocated `-SKILL.md` exists.
3. Parse frontmatter (name, seniority, platform, expertise, trust_tier if present).
4. **Query the Claudine Skill Registry DB** (`e6d176601157408bbe9264a511344ed5`, data source `57962385-a005-4651-a52d-e0206dd0c4ac`) to read each agent's `Roster State`:
   - **Active** — full scoring (all 5 dimensions, standard thresholds)
   - **Bench** — scored but low Activation is expected, not penalized. Set dimension 1 floor at 1. Qualitative rationale should note "on bench."
   - **Retired** — skip entirely. Do not include in scorecard.
   - **Missing from registry** — treat as Active (fail-safe default).
5. Output: a list of `{agent_name, profile_path, skill_path_or_null, trust_tier, role_summary, roster_state}`.

Expected ~15 agents across Active + Bench. Retired entries (e.g., `bertha`, `bo`, `cornelius`, `bertha` historical identities) are skipped.

## Phase 2 — Objective Scoring

For each agent, compute a 0–10 score built from five dimensions, 0–2 each. The
score is objective and replicable — two runs on the same day should produce the
same number within ±1. Qualitative color comes in Phase 3.

### Scoring dimensions

| # | Dimension | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | **Activation** — invoked in last 14 days? | No trace | Once or twice | Routinely (≥3 times or scheduled) |
| 2 | **Output landed** — did its output get actioned downstream? | No Streaming Notes / Routing Log refs as `Source` | Some, partial action | Consistent: items it produced hit `Status=Complete` or routed onward |
| 3 | **Autonomy** — self-sufficient when invoked? | Every run needs Brady to re-prompt or fill gaps | Sometimes self-sufficient | Runs end-to-end without Brady intervention |
| 4 | **Trigger clarity** — is "when to use me" sharp and non-overlapping? | Description is vague or overlaps another agent | Mostly clear, some overlap | Sharp boundary, unique domain |
| 5 | **Surprise value** — surfaces things Brady wouldn't have caught? | Always expected output | Occasionally non-obvious | Regularly finds things that matter Brady would have missed |

### Data sources for scoring

- **Streaming Notes DB** — query for items where `Source` field (or body mentions) equals the agent name in last 14 days. Bucket by status.
- **Routing Log page** — scan the markdown table for rows routed by this agent in last 14 days.
- **Git history** — `git log --since='14 days ago' --all -- 0-agents/custom-built-agents/<agent>.md 0-agents/custom-built-agents/<agent>-SKILL.md` to capture iteration activity.
- **SKILL.md frontmatter** — `trust_tier` and `description` specificity feed Trigger Clarity (dimension 4).
- **Surprise value** is qualitative — Musashi's lens, not a formula. Default to 1 if uncertain; push to 2 only when recent output was genuinely non-obvious; push to 0 when everything the agent emitted was predictable.

Store per-agent result as: `{agent, score: [d1, d2, d3, d4, d5], total, rationale_line_per_dim}`.

## Phase 3 — Recommendations (Per Agent Below 8/10)

For each agent scoring < 8/10, emit 1–3 specific recommendations.

**Each recommendation must have:**
- **What**: concrete edit (add X query, wire Y MCP, split into two agents, merge with Z, write a missing SKILL).
- **Why**: which dimension it lifts and by how much. "Bumps Activation 0→2 if we wire this to the weekly sweep."
- **Size**: small (<30 min), medium (30–90 min), large (>90 min). Morning sweep applies existing Build Request autonomy gates.
- **Trust Tier tag**: classify every recommendation as `T1` (internal, reversible, no client-facing surface) or `T2+` (client-facing, outbound, or irreversible). T1 items are eligible for auto-approval after 24h with no Brady objection.
- **Impact Score** (1–5): how much this improves the OS if shipped. Factors: dimension lift × agent importance × urgency.
- **Cost note** (if large): flag if the dev plan is likely token-heavy. Brady approves anything medium/large before execution.
- **Approval gate**: `Say "approve musashi [agent]-[n]" to queue for build.`

Agents scoring ≥ 8/10 get a one-line "holding well" summary. No recommendations unless Musashi sees something opportunistic.

**Backlog write step:** After all recommendations are emitted, check whether the Product Backlog DB exists (see "Notion Backlog DB" section below for ID and schema). If the DB exists, write each recommendation as a new row — but only if an open item with the same approval slug does not already exist (dedup by slug). If the DB does not exist, emit a one-line note in the backup: `⚠️ Backlog DB not yet created — say "approve musashi notion-backlog-db" to authorize creation.`

## Phase 3.5 — Backlog Hygiene

Runs only if the Product Backlog DB exists. Skipped with a one-liner if DB is absent.

**Purpose:** Keep the backlog honest. Dead items rot signal. Stale approvals block sprints.

**Steps:**

1. **Query all open items** — Status IN (Backlog, In Sprint). Pull: Name, Approval Slug, Approval Status, Size, Impact Score, Review Date, Sprint.

2. **Dedup check** — compare against today's Phase 3 recommendations. If a new recommendation matches an existing open item (same slug OR same agent + same dimension targeted), do NOT create a duplicate row. Instead, update the existing row's `Review Date` to today and append a note: "Re-surfaced YYYY-MM-DD — [brief rationale]."

3. **Staleness sweep** — flag items where Approval_Status=Approved AND Status=Backlog AND Review Date is > 14 days ago. These are approved items nobody has started. For each:
   - Mark the backup file under a `⚠️ STALE APPROVED` heading
   - Include the item name, slug, approval date, and days waiting
   - Include a recommended action: re-prioritize into next sprint, cancel, or escalate to Brady

4. **Relevance check** — scan for items whose parent agent has since been scored ≥ 8/10 (was improved since the rec was written), or whose target agent was retired. Mark those as Cancelled in the DB with reason "Superseded — [agent] now scores [N]/10" or "Agent retired."

5. **Sprint health check** — if any Sprint exists with Status=In Sprint, report how many items are in it and their current Status distribution. If all items are Done, mark the sprint complete and compute velocity (items shipped / sprint duration days).

Output a `BACKLOG SUMMARY` block in the backup file:
```
BACKLOG SUMMARY (as of YYYY-MM-DD):
  Open (Backlog): N items
  In Sprint [n]: M items ([x] Done, [y] In Progress, [z] Backlog)
  Stale approved (>14d): K items — [list slugs]
  Cancelled this run: J items
  DB: [Product Backlog DB ID or "not yet created"]
```

## Phase 4 — Tech Scan

Use Exa first (fast, cheap), fall back to Bright Data for deeper pulls. Search
queries to run:

1. `"MCP server" OR "Model Context Protocol" released past 30 days site:github.com OR site:anthropic.com`
2. `AI agent framework launched 2026 production`
3. `Claude SDK new feature past month`
4. `[current month YYYY] AI tool launch productivity`
5. `new vertical AI SaaS [current quarter]`

For each promising hit, emit:
- **Name + link**
- **What it does** (1 line)
- **Why it matters for Brady's OS** — which agent it plugs into OR what new capability it unlocks (1 line)
- **Integration sketch** — which MCP / API / wrapper, roughly how much work (1–2 lines)
- **Size + approval gate**

Cap at 3–5 surfaced items. Prune aggressively — "new AI tool" isn't enough; "new MCP that Brady can actually wire into Finn/Webster/Musashi" is.

If tools are unavailable (rate limits, auth), emit `_(Tech Scan unavailable this run — [reason])_` and move on.

## Phase 5 — Business Ideation

Generate 3–5 monetizable ideas **filtered by Brady's constraints**:
- Low/no manual lift to operate (automation-native)
- Leverages existing capabilities: consulting, content, mception.ai portal, AI
  tooling, private client deliverables, Brady's network, family logistics
- Clear monetization path — who pays, how much, how often, how acquired
- Startup cost under $5k, can ship a v1 in < 2 weeks

Do NOT generate ideas that:
- Require hiring
- Require new physical infrastructure
- Require building an app from scratch before revenue (must have a path to first dollar inside 30 days)
- Mirror Brady's existing consulting practice (this is additive, not a rename)

**Each idea:**
- **Name + 1-line pitch**
- **Who pays, how much, how often**
- **What Brady does vs. what the OS does autonomously** (explicit split)
- **Path to first dollar** (one concrete first customer or channel)
- **What could kill it** (the one assumption that must be true)

Keep this section disciplined — 3 strong ideas beats 5 weak ones.

## Phase 5.5 — Sprint Proposal

Runs only if the Product Backlog DB exists AND there are ≥ 3 items with Approval_Status=Approved AND Status=Backlog. Otherwise emit: `_(Sprint Proposal skipped — insufficient approved backlog items: [N] available, need ≥ 3)_`

**Purpose:** Musashi doesn't wait to be asked. When enough approved work exists, he proposes the next sprint without Brady having to manually curate it.

**Sprint capacity (default):**
- 4–5 small items OR
- 2–3 medium items OR
- 1 large + 2 small items
- Maximum 6 items per sprint. Quality over throughput.

**Selection algorithm:**
1. Pull all items where Approval_Status=Approved AND Status=Backlog
2. Sort by: Impact Score DESC, then Size ASC (small first for momentum)
3. Fill to sprint capacity — stop when capacity hit or backlog exhausted
4. Assign an executor to each item:
   - SKILL.md edits, agent profile changes → **Yuki Ronin** (build)
   - mception.ai publish, Vercel env, deploy ops → **Musashi Deploy Mode** (self)
   - Notion DB creation/schema → **Claudine approval required first**
5. Compute sprint number: last sprint in DB + 1 (or Sprint 1 if none)

**Output format** (in backup file and Notion handoff):
```
SPRINT [N] PROPOSAL — YYYY-MM-DD
  Capacity: [X small / Y medium / Z large]
  Velocity target: [N] items

  Item 1: [Name] | [slug] | Size: small | Impact: 4/5 | Executor: Yuki Ronin
  Item 2: [Name] | [slug] | Size: small | Impact: 4/5 | Executor: Musashi Deploy
  Item 3: [Name] | [slug] | Size: medium | Impact: 3/5 | Executor: Yuki Ronin
  ...

  Approve this sprint: say "approve musashi sprint-[N]"
  Modify before approving: say "musashi sprint-[N] drop [slug]" or "add [slug]"
```

**On Brady approving a sprint** (`approve musashi sprint-[N]`):
- Morning sweep sets Status="In Sprint" on each item in the DB
- Morning sweep adds sprint items to the daily agenda section with executor assignments
- Yuki Ronin items become Build Requests at `.context/plans/musashi-[slug].md`
- Musashi Deploy Mode items are queued for the next Deploy Mode session

**Sprint review (next nightly run after a sprint is approved):**
- Phase 3.5 Step 5 runs the sprint health check
- If items moved to Done: log velocity, celebrate in Musashi's Lens section
- If items are stalled: surface in recommendations as blockers

## Phase 6 — Output

### 6.1 Backup file (persistent, gitted)

Finalize `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`:

```markdown
# Musashi Review — YYYY-MM-DD

STATUS: complete | partial — [reason]
Runtime: [N] minutes
Generated: [ISO timestamp]

---

## Agent Scorecard

| Agent | Score | d1 Act | d2 Land | d3 Auto | d4 Clarity | d5 Surprise |
|---|---:|:---:|:---:|:---:|:---:|:---:|
| phil | 8/10 | 2 | 2 | 2 | 1 | 1 |
| ... | | | | | | |

_(Rationale-per-dimension below each agent scoring < 8)_

## Recommendations (agents below 8/10)

### [agent-name] — current: X/10

**Rec 1** (size: small | medium | large) — [what + why + approval gate]
**Rec 2** — ...

## Holding Well (≥ 8/10)
- [agent] — [one-line observation]

## Backlog Summary
_(from Phase 3.5 — skipped if DB not yet created)_
```
Open (Backlog): N | In Sprint [n]: M | Stale approved: K | Cancelled: J
```

## Sprint [N] Proposal
_(from Phase 5.5 — skipped if < 3 approved items)_
```
[sprint card here — see Phase 5.5 format]
Say "approve musashi sprint-[N]" to start
```

## Tech Scan — What Moved This Week
- **[tool name]** ([link]) — [what it does] | Plugs into: [agent] | Size: small/medium/large | `approve musashi tech-[slug]`

## Business Ideation
### 1. [Idea Name]
**Pitch:** ...
**Economics:** ...
**OS vs Brady split:** ...
**Path to first dollar:** ...
**Kill risk:** ...

## Notes from Musashi's Lens
[1–2 short paragraphs in Musashi's voice — what he's watching, where the OS is
getting lazy, where it's getting sharp]

---

_Morning sweep reads the Notion Musashi Review row (Streaming Notes,
Type="Musashi Review", today) in Phase 1.0c. This backup is the full archive —
reference it with `git show` to roll back proposals or re-read rationale._
```

### 6.2 Notion handoff row

Create ONE new row in Streaming Notes DB:
- `Type = "Musashi Review"`
- `Name = "Musashi Review — YYYY-MM-DD"`
- `Status = "Not Started"`
- `Priority = "Should"` (morning sweep bumps to Must if any rec is flagged critical)
- `Source = "Musashi Review"`
- Body = the **Compact Summary** (designed for morning sweep consumption):

```
## Musashi Review — YYYY-MM-DD

AGENT SCORECARD (avg: X.X/10 across N agents):
- [agent] X/10 [↑↓→ vs last run]
- ...

TOP 3 RECOMMENDATIONS (ranked by lift × reversibility):
1. [agent] [size] — [what] → `approve musashi [agent]-1`
2. ...
3. ...

TECH SCAN (top 2):
- [tool] — [1-line fit] → `approve musashi tech-[slug]`
- ...

BIZ IDEAS (top 2):
- [name] — [1-line pitch + economics] → `approve musashi biz-[slug]`
- ...

BACKLOG: [N] open | [K] stale approved | [J] cancelled this run
SPRINT PROPOSAL: [Sprint N ready with X items] → `approve musashi sprint-N` | OR: (none — need ≥ 3 approved items)

BACKUP: 1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md
```

## Phase 7 — Routing Log

Append ONE row to the Routing Log page (`344ed43b-89c5-816a-ab54-ca49ca239748`)
per `3-reference/skills/_shared/routing-log.md`. Use
`notion-update-page` with `command: update_content`.

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Original Title | `Musashi Review — YYYY-MM-DD` |
| Original ID | — |
| Source Type | Musashi Review |
| Routed To | Streaming Notes (review row) + `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md` |
| Destination ID | [new review row page ID] |
| Why | Daily midnight agent review + tension pass |
| Summary | Scored [N] agents (avg [X.X]/10); [M] recs; [K] tech; [L] biz. Top rec: [one-line headline]. |

## Phase 8 — Report Back

```
Musashi Review: [STATUS]. [N] agents scored (avg [X.X]/10). [M] recs, [K] tech, [L] biz. Review: Streaming Notes / Musashi Review — YYYY-MM-DD. Backup: 1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md
```

## Safety Rails

- **Musashi writes FIVE things and nothing else (when Backlog DB exists):**
  1. The backup markdown file
  2. One new Streaming Notes row (Type="Musashi Review")
  3. One new Routing Log row
  4. New/updated rows in the Product Backlog DB (one per recommendation, deduped by slug)
  5. Sprint rows if a sprint is proposed and approved
  Without Backlog DB: writes 1–3 only (existing behavior).
- **Never touches:** agent profile files, SKILL.md files, CLAUDE.md, Rules & Preferences, Internal/Client Projects, Life Events, any Task Next Action field, any existing Streaming Note body.
- **Backlog DB creation is gated:** Musashi NEVER creates the Backlog DB autonomously. Brady must say `approve musashi notion-backlog-db` first. Claudine coordinates creation via Notion MCP. Until then, Phases 3.5 and 5.5 are skipped.
- **Approval-gated execution:** Musashi never executes recommendations. Morning sweep surfaces them with explicit approval language. Brady must say `approve musashi [slug]` before any recommendation is dev-planned or built.
- **Sprint approval gate:** Musashi never starts a sprint without Brady's `approve musashi sprint-[N]`. He proposes; Brady decides.
- **Token budget:** ~150k input / 40k output per run. If exceeded, degrade in order:
  - First: skip or shrink Phase 5 (Biz Ideation) and Phase 5.5 (Sprint Proposal)
  - Second: skip Phase 4 (Tech Scan) and Phase 3.5 (Backlog Hygiene)
  - Never: skip Phase 2 (Scoring) or Phase 3 (Recommendations) — those are the core.
- **Backup-first writes:** File is written before Notion. On any Notion failure, backup header becomes `STATUS: partial — [reason]` and remaining Notion writes abort. Morning sweep sees "no review" and proceeds normally.
- **Duplicate prevention:** If a `Type="Musashi Review"` row exists for today, overwrite body in place. If a Backlog item with the same slug already exists, update (don't duplicate).
- **Self-review caveat:** Musashi scores himself. Budget for 1 point of bias upward — Brady should sanity-check Musashi's own score at weekly sweep.

## Rules

- One run per day under normal flow. Safe to re-run manually — file overwrites, Notion row overwrites in place.
- Backup is gitted. Conductor remote agent commits one file per run on `main` (or a dedicated `musashi-review/auto` branch if Brady prefers).
- **Musashi's voice** in the "Notes from Musashi's Lens" section: short, direct, unsentimental. No pep talks. "Placeholder content" is a valid pejorative. Reject drift. Push for specificity.
- Tech Scan prefers **integrations Brady can ship** over buzz. "Anthropic launched X" is only interesting if X connects to an agent Musashi reviewed this morning.
- Biz Ideation prefers **Brady's asymmetric advantages** (network + AI fluency + portal + consulting cred) over generic AI-wrapper startups.
- Each recommendation carries its own approval token slug (e.g., `approve musashi phil-1`). Morning sweep reads these to match Brady's approval reply to the right plan.

## Integration with Morning Sweep

Morning sweep gains a new **Phase 1.0c** (inserted immediately after Phil's
Phase 1.0b, before Phase 1.1 Gmail Scan):

> Query Streaming Notes DB for `Type="Musashi Review"` created in last 24 hours.
> If found: read body. In Phase 2 output, add a `🗡️ MUSASHI REVIEW` section
> surfacing the TOP 3 recommendations, TOP 2 tech items, TOP 2 biz ideas —
> each with its approval slug. Morning sweep does NOT auto-execute any of them.
> On Brady's `approve musashi [slug]` reply, morning sweep drafts a dev plan at
> `.context/plans/musashi-[slug].md` and sets the review row to `Processing`.
> At sweep end, mark the row `Done=__YES__` if all approvals handled, else
> leave `Status=In Progress` for tomorrow's sweep.

> **Autonomous execution carve-out (narrow):** Items sized `small` AND marked
> `reversible via git` AND touching only files under `0-agents/` or
> `3-reference/skills/` MAY auto-execute under the existing Build Request
> autonomy assessment in morning sweep Phase 3.4b — same bar as today's small
> Build Requests. Anything else waits for Brady.

> If no review found: log `⚠️ No Musashi review today` in the brief and proceed
> normally. Morning sweep works identically without it.

The daily tension cycle: **Musashi proposes → morning sweep sizes → Brady approves → builder executes → next night Musashi re-scores.**

## Scheduling — Claude.ai Code Triggers

Already wired. Schedule name: `musashi-review`. Cadence: daily midnight (00:00) CT. Platform: Claude.ai Code scheduled sessions.

To modify cadence or trigger: open Claude.ai → Code → Triggers → `musashi-review` → edit.

Verification: Claudine queries Notion Streaming Notes for `Name starts with "Musashi Review" AND Created Date = today` at morning sweep start.

## What This Skill Does NOT Do

- Does not modify agent profiles or SKILL files (recommendations are proposals only)
- Does not execute recommendations — morning sweep drafts plans; Brady approves; builder executes
- Does not send email, render PDF, post to mception.ai
- Does not duplicate `phil-SKILL` (Phil = Notion grooming; Musashi = agent tension)
- Does not duplicate `weekly-os-recap` (recap = backward-looking; Musashi = forward-looking)
- Does not duplicate `deep-research` (this is daily broad scan; deep-research is on-demand single-topic)
- Does not claim Musashi-the-agent executed anything (see Doctrine Banner)
- Does not spend tokens past its cap — degrades sections rather than overrunning

## Data Dependencies

- **Reads:** every file in `0-agents/custom-built-agents/`, Streaming Notes DB, Routing Log page, Product Backlog DB (if exists), git history (14-day window), the web via Exa + Bright Data
- **Writes:** Streaming Notes DB (one review row per run); Routing Log page (one run-summary row); `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`; Product Backlog DB (new/updated item rows, if DB exists and approved)

---

## Notion Backlog DB — Schema & Approval Gate

**Status:** Not yet created. Requires Brady's explicit `approve musashi notion-backlog-db` before Claudine creates it.

**Why this needs Claudine vetting:** Creating a new Notion DB changes the OS information architecture. Claudine confirms the DB fits the existing layer structure (Reference Layer or Execution Layer), picks the right parent page, and registers the ID in `3-reference/infrastructure-registry.yml`.

**Proposed DB name:** `Product Backlog` (Musashi's OS build queue)

**Proposed parent:** Brady OS workspace root (same level as Streaming Notes, Internal Projects)

**Proposed fields:**

| Field | Type | Notes |
|---|---|---|
| `Name` | Title | Item description (the recommendation "What") |
| `Approval Slug` | Text | `musashi-[agent]-[n]` or `musashi-tech-[slug]` or `musashi-biz-[slug]` |
| `Source` | Select | Agent Rec / Tech Scan / Biz Idea / Manual |
| `Agent` | Text | Which agent this improves (or "OS" for system-level) |
| `Size` | Select | small / medium / large |
| `Impact Score` | Number (1–5) | Estimated OS improvement if shipped |
| `Status` | Select | Backlog / In Sprint / In Progress / Done / Cancelled / Rejected |
| `Approval Status` | Select | Pending / Approved / Rejected |
| `Sprint` | Number | Sprint number (blank until assigned) |
| `Executor` | Select | Yuki Ronin / Musashi Deploy / Claudine / Brady |
| `Review Date` | Date | Which nightly run created or last updated this item |
| `Notes` | Text | Rationale + dimension lift from Phase 3 |

**ID placeholder:** `TBD — update `3-reference/infrastructure-registry.yml` after creation`

**To authorize:** say `approve musashi notion-backlog-db` — morning sweep will route this to Claudine for creation, registration, and first-run verification.

---

## Deploy Mode (On-Demand)

Musashi's second operational surface. Invoked when Brady asks for any mception.ai
publishing or Vercel operations — not during the nightly review cycle.

**Trigger phrases:** "publish [X] to mception", "deploy [X]", "add access for [email]",
"fix the build", "wire up [API]", "permissions audit", "UAT [slug]", "why is the portal
404ing", "who can see what", "set up a new subdomain", or any variation touching
mception.ai publishing, Vercel config, portal access control, or deploy diagnostics.

**Sub-agent pattern:** In Deploy Mode, Musashi invokes `webster-SKILL.md` runbooks as
sub-routines. The Agent tool can be used to spawn a focused sub-agent with the
`webster-SKILL.md` content in context when the task is a self-contained deploy
operation (e.g., "publish this slug," "diagnose this failed deploy").

**Available runbooks (from `webster-SKILL.md`):**
- **Runbook 1** — Publish a new project slug to mception.ai
- **Runbook 2** — Add/remove emails on a slug's allowlist
- **Runbook 3** — Diagnose + fix a failed production deploy
- **Runbook 4** — Set up a new API/token on an existing project
- **Runbook 5** — UAT (mandatory after every publish): image check, chatbot check, permissions audit
- **Runbook 6** — Add a new standalone Vercel project (separate from mception.ai)

**Deploy Mode guardrails (inherited from Webster):**
- Will NOT ask Brady to do CLI-accessible work
- Will NOT store secret values — only names and locations
- Will NOT deploy to production from an unmerged branch without explicit approval
- Will NOT publish a slug publicly or expand access without Brady saying so explicitly
- Will NOT refer to `munich` as the production project — `mception-ai` only

**Trust tier in Deploy Mode:** T0 (same as `webster-SKILL.md`). Read `webster-SKILL.md`
directly for full runbook detail, Sharp Edges table, Quick Reference env var names, and
UAT bash scripts.
