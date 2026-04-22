---
name: commissioner-brief
description: >
  Weekly narrative synthesis of Brady OS. Pulls from Routing Log, Streaming Notes,
  git history, and recent sweep dev plans to produce a single concise markdown brief:
  Headline of the week → Wins shipped → Signal from sweeps → What's blocked or drifting
  → Next week's 3 bets. Runs as the final step of the weekly-sweep or on demand.

  Trigger this skill whenever Brady says "commissioner brief", "weekly commissioner brief",
  "commissioner's brief", "weekly narrative", "week in review brief", or any variation
  requesting a synthesized weekly read of OS state.

  This skill produces the narrative layer that sits above weekly-os-recap (which renders
  a visual changelog) and pipeline-dashboard (which renders a live pipeline snapshot).
  It is read-only against Notion and git. No email, no HTML, no Notion writes in v1.
trust_tier: T0
---

# Commissioner Brief

One markdown file per week. What happened, what it means, what's next — signal over noise.

## Why This Exists

Brady's OS produces a lot of output — daily sweeps, PRs, Streaming Notes, Routing Log
entries, whitepapers, dashboards. Each surface shows a slice. None of them synthesize
the week into a single scannable read that says *what moved, why it matters, and what's
coming*. Commissioner Brief is that synthesis. It runs as the last step of the weekly
sweep and leaves a durable archive Brady (or a future agent) can scroll back through.

## Execution Environment

**Runs on**: CoWork (Claude Desktop) or Conductor CLI — needs git access + Notion MCP
**Access needed**: Notion MCP, local git repo, file system
**Streaming Notes DB**: `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`
**Routing Log DB**: `344ed43b-89c5-816a-ab54-ca49ca239748`
**Output**: `1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md`
**Scheduled**: Sunday, as final step of `weekly-sweep` (after streaming-notes disposition-audit)
**Expected runtime**: 3–5 minutes

## Pre-Flight (Silent)

1. Confirm git access — `git log -1`
2. Confirm Notion MCP is available (skip a section gracefully on failure rather than blocking)
3. Ensure `1-execution/areas/brady-os/commissioner-briefs/` exists — create if missing
4. Calculate the week window: `--since='7 days ago'` through now (today's date is the filename)

## Phase 1: Gather Inputs

Run these in parallel where possible. None are blocking — a failure in any one surfaces
as "(section skipped — [reason])" in the final brief rather than crashing.

### 1.1 Git history (7 days)

Reuse the query pattern from `3-reference/skills/weekly-os-recap/SKILL.md` Phase 1:

```bash
git log --since='7 days ago' --pretty=format:'%H|%ai|%s' --no-merges
git log --since='7 days ago' --stat --no-merges
git log --since='7 days ago' --diff-filter=A --name-only --pretty=format:''
```

Classify each commit into one of:
- **New Skills** — new files under `3-reference/skills/*/SKILL.md`
- **New Agents** — new files in `0-agents/custom-built-agents/`
- **Project Work** — changes under `1-execution/` or any `Consulting/Project` paths
- **Infrastructure** — changes to `CLAUDE.md`, governance, scripts, `config-sync`
- **Publishing** — changes to `mception-ai-projects.yml`, `portal/`, viewer apps
- **Programs & Planning** — new programs, kickoffs, planning files

### 1.2 Streaming Notes (open items)

Query Streaming Notes DB (`2e9ed43b-89c5-80f4-8c21-000b4cfe812e`) for items where
`Done != "__YES__"` and `Status NOT IN ["Complete", "Remove"]`. Bucket by Type:
- **Thread Logs** (active work threads)
- **Pulse Notes** (ideas/observations)
- **System Instructions** (rules not yet promoted)
- **Phil Flags** (coherence concerns)
- **Build Requests** (queued builds)

For each bucket, capture: count, age of oldest item, names of the 3 most recently
modified items. Reuse the parallel-query pattern from `pipeline-dashboard/SKILL.md`.

### 1.3 Routing Log (best-effort)

Query Routing Log DB (`344ed43b-89c5-816a-ab54-ca49ca239748`) for entries added in
the last 7 days. Group by `actor` and `action` if those fields exist. If the DB is
sparse or the fields are inconsistent, note it and move on — quality will improve
once handoff #6 (Routing Log consolidation) lands.

If the query returns < 3 entries total, include this line in the brief:
> Routing Log sparse this week — see handoff #6 (Routing Log consolidation).

### 1.4 Sweep dev plans

List any files in `.context/plans/` created in the last 7 days. Capture filename and
first-line title. These are supplementary context — do not reproduce their contents.

## Phase 2: Synthesize

Produce the 5 output sections. Aim for signal over completeness — a good brief is
scannable in 90 seconds.

### 2.1 Headline of the week
One sentence. The dominant theme: a shipped skill, a client inflection, a rule
change, a blocked item finally cleared. No more than 140 characters.

### 2.2 Wins shipped
Bulleted list drawn from git Phase 1.1. Prefer New Skills / New Agents / meaningful
Project Work over infrastructure polish. Each bullet: name the thing, say what it
does in operator language. Cap at 8 bullets; add "and N more..." if over.

### 2.3 Signal from sweeps
Bulleted observations from Streaming Notes + Routing Log. What pattern is emerging?
What rule keeps showing up? What topic is recurring? No raw DB dumps — synthesize.
Cap at 5 bullets.

### 2.4 What's now blocked or drifting
Stale Streaming Notes items (from the disposition-audit summary if available, else
from 1.2), System Instructions that haven't been promoted, open Phil Flags, Build
Requests that have been queued > 7 days. This is the "pay attention" list.

### 2.5 Next week's 3 bets
Exactly three. Drawn from: Must-priority open items, forthcoming calendar events
in the next 7 days, handoff queue from prior weekly-sweep. Each bet: one line,
name + why + the first concrete action.

## Phase 3: Write Output

Save the brief to `1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md`
using today's date. Format:

```markdown
# Commissioner Brief — [DATE]

**Headline:** [one-line]

---

## Wins shipped this week
- ...

## Signal from sweeps
- ...

## Blocked or drifting
- ...

## Next week's 3 bets
1. ...
2. ...
3. ...

---

_Generated [ISO timestamp] | Sources: git (7d), Streaming Notes, Routing Log, .context/plans/_
```

If any section has no signal, write `_(no signal this week)_` — don't omit the section.

## Phase 4: Report Back

Emit one line back to the caller (matches the pipeline-dashboard + disposition-audit
reporting pattern so weekly-sweep can surface it cleanly):

```
Commissioner Brief: [headline]. Saved to 1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md
```

## Edge Cases

- **Zero commits this week**: Wins section says `_(quiet week on the repo)_`. Still produce the brief — the other sections may still have signal.
- **Notion MCP unavailable**: Skip sections 2.3 and 2.4, note `_(Notion unavailable — section skipped)_` in each, and continue. Do not crash the weekly-sweep.
- **Routing Log empty**: Fold into Signal section with the one-line "handoff #6" note; don't create an empty bullet list.
- **File already exists for today's date**: Overwrite. The brief is a snapshot — the most recent run is canonical.
- **Missing output directory**: Create `1-execution/areas/brady-os/commissioner-briefs/` on first run. Don't ask.

## What This Skill Does NOT Do

- Does not send email (v2)
- Does not render HTML or PDF — markdown only
- Does not write to Notion (read-only)
- Does not auto-promote the brief to mception.ai
- Does not duplicate weekly-os-recap (which owns the visual changelog) or pipeline-dashboard (which owns live pipeline state)
- Does not evolve prompts, rules, or skills — it reports, it doesn't modify
- Does not run more than once per week under normal flow (but safe to re-run — overwrites)

## Integration with Weekly Sweep

This skill runs as the **final step** of weekly-sweep, after
`streaming-notes-disposition-audit`. The weekly-sweep output includes the one-line
Commissioner Brief headline in its closing summary.

Standalone invocation: trigger directly with "commissioner brief" or "weekly
commissioner brief" — produces the same output file.

## Data Dependencies

- Reads: Streaming Notes DB, Routing Log DB, local git history, `.context/plans/`
- Writes: `1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md` only
