---
name: musashi-review
trust_tier: T1
description: >
  Musashi San's midnight agent review. Runs daily at 12:00 AM CT. Inventories every
  custom agent, scores each on five objective dimensions against an aspirational
  10/10 ideal state, emits 1–3 concrete recommendations per below-threshold agent,
  scans the web for brand-new AI tooling / MCPs / platforms worth plugging in, and
  generates 3–5 low-manual-lift business ideas that match Brady's current
  capabilities. Writes a gitted backup + a `Type="Musashi Review"` row in Streaming
  Notes that morning sweep consumes in Phase 1.0c. Nothing ships without Brady's
  approval — morning sweep surfaces each recommendation with an explicit gate.

  Trigger this skill whenever Brady says "run musashi", "musashi review", "agent review",
  "agent audit", "run the agent tension pass", "daily agent check", "musashi scan",
  "what's new in AI", "run the tension cycle", or any variation requesting the
  midnight ideation + scoring pass.

  This skill owns the daily tension/brainstorming cycle for agents, tools, and
  monetization ideas. It does NOT own operations grooming (`phil-SKILL`), per-Type
  streaming-notes actioning (`streaming-notes-processor`), weekly recap
  (`weekly-os-recap`), or deep research on a single topic (`deep-research`).
---

# Musashi San — Daily Agent Review + Tension Pass

## Doctrine Banner — Read First

This skill is **named for Musashi San** (the ChatGPT-based Craft Arbiter / Head
Coach, per governance — not the narrower STIHL product-owner identity in his
legacy profile). It executes as a **Claudine-tier bounded SOP** in the Conductor
environment. Musashi-the-agent remains non-executing per Amendment 1.

The skill borrows Musashi's **lens** — craft quality judgment, "placeholder vs.
strong" content calls, competitive framing — and applies it to a daily ideation
pass. It does not claim Musashi himself writes to Notion or edits files.

**Profile drift flag:** `0-agents/custom-built-agents/musashi.md` describes the
STIHL product-owner version. Governance docs (council-charter.md,
hierarchical-contracts.md) elevate him to Head Coach / Craft Arbiter. This skill
operates from the governance identity. Reconciling the profile is a separate
weekly-sweep item.

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

**Runs on:** Conductor remote agent (scheduled via `/schedule`).

**Scheduled:** Daily at `0 5 * * *` UTC = **midnight (00:00) CT** (CDT / 11 PM
CST — always before the 4 AM Phil Pre-Sweep and the 6 AM morning sweep).

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
- Backup (persistent, gitted): `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`
- Notion handoff: one Streaming Notes row per run, `Type="Musashi Review"`
- Routing Log: one summary row per run

## Pre-Flight (Silent)

1. Confirm Notion MCP, Exa, Bright Data, git are all reachable. Log any unreachable — the run proceeds with that section marked `(unavailable this run)`, doesn't crash.
2. Ensure `1-execution/areas/brady-os/musashi-reviews/` exists; create if missing.
3. Compute today's date (YYYY-MM-DD, America/Chicago).
4. Create the backup file at `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md` with a `STATUS: running` header. All subsequent phases write to this file BEFORE touching Notion.

## Phase 1 — Agent Inventory

Enumerate every agent to review:

1. List files in `0-agents/custom-built-agents/*.md`, excluding `_template.md`, `references/`, and any `-README.md` / `-STATUS-TEMPLATE.md` variants.
2. For each agent file, also note whether a colocated `-SKILL.md` exists.
3. Parse frontmatter (name, seniority, platform, expertise, trust_tier if present).
4. Output: a list of `{agent_name, profile_path, skill_path_or_null, trust_tier, role_summary}`.

Expected ~15 agents: bertha, bo, burt, claudine, content-drafter, cornelius,
dicaprio, finn, fran, mason, musashi, oc-optimus, phil, telly, webster,
wyatt-earp, yuki-ronin (plus anything added since).

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
- **Cost note** (if large): flag if the dev plan is likely token-heavy. Brady approves anything medium/large before execution.
- **Approval gate**: `Say "approve musashi [agent]-[n]" to queue for build.`

Agents scoring ≥ 8/10 get a one-line "holding well" summary. No recommendations unless Musashi sees something opportunistic.

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

- **Musashi writes THREE things and nothing else:**
  1. The backup markdown file
  2. One new Streaming Notes row (Type="Musashi Review")
  3. One new Routing Log row
- **Never touches:** agent profile files, SKILL.md files, CLAUDE.md, Rules & Preferences, Internal/Client Projects, Life Events, any Task Next Action field, any existing Streaming Note body.
- **Approval-gated execution:** Musashi never executes recommendations. Morning sweep surfaces them with explicit approval language. Brady must say `approve musashi [slug]` before any recommendation is dev-planned or built.
- **Token budget:** ~150k input / 40k output per run. If exceeded, degrade:
  - First: skip or shrink Phase 5 (Biz Ideation)
  - Second: skip Phase 4 (Tech Scan)
  - Never: skip Phase 2 (Scoring) — that's the core reason the skill exists.
- **Backup-first writes:** File is written before Notion. On any Notion failure, backup header becomes `STATUS: partial — [reason]` and remaining Notion writes abort. Morning sweep sees "no review" and proceeds normally.
- **Duplicate prevention:** If a `Type="Musashi Review"` row exists for today, overwrite body in place rather than creating a second row.
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

## Scheduling

Wire the midnight trigger via `/schedule`:

```
Name: Musashi Review
Cron: 0 5 * * *     # midnight (00:00) CT daily (UTC)
Command: invoke musashi-review skill
```

Monitor first 3 days of automated runs before trusting unattended. Verify the
backup lands, the Notion row is compact and scannable, and morning sweep's new
1.0c section reads it cleanly.

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

- **Reads:** every file in `0-agents/custom-built-agents/`, Streaming Notes DB, Routing Log page, git history (14-day window), the web via Exa + Bright Data
- **Writes:** Streaming Notes DB (one review row per run); Routing Log page (one run-summary row); `1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`
