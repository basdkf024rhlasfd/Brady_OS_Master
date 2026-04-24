# Musashi San — Agent Review Archive

Daily midnight output from the `musashi-review` skill
(`0-agents/custom-built-agents/musashi-SKILL.md`). One markdown file per
run. The gitted, persistent backup behind the Notion review row that
morning sweep consumes.

## Why this exists

Morning sweep reads a compact "Musashi Review" row in Streaming Notes
(Phase 1.0c). That row carries the TOP 3 recommendations, TOP 2 tech
items, and TOP 2 biz ideas — enough for Brady to approve or skip at
6 AM. These files carry the full detail: the 5-dimension scorecard for
every agent, the rationale per dimension, the deprioritized ideas, and
the Musashi's Lens notes.

Use these files to:
- Compare scores across days for any agent (is phil trending up? is cornelius dormant?)
- Reference the full rationale when a recommendation comes up for execution
- Roll back a surfaced recommendation (`git show [date]` and decide not to proceed)
- Scan unaccepted tech items and biz ideas later, when Brady's context changes

## File naming

- `YYYY-MM-DD.md` — one file per run, today's date (America/Chicago).
- Re-runs on the same day overwrite the file.
- `README.md` — this file.

## Schema

Each daily file contains:

- `STATUS` header — `complete` or `partial — [reason]`
- Runtime + generated timestamp
- **Agent Scorecard** — table with 5-dimension scores per agent
- **Recommendations** — per agent scoring < 8/10, each with size + approval slug
- **Holding Well** — one-line observation per agent ≥ 8/10
- **Tech Scan** — new tools with fit + integration sketch
- **Business Ideation** — 3–5 low-lift monetization ideas
- **Notes from Musashi's Lens** — Musashi's voice paragraph

## Writer

- `0-agents/custom-built-agents/musashi-SKILL.md` — primary writer, runs midnight CT daily via Conductor trigger.

## Readers

- `3-reference/skills/morning-sweep/SKILL.md` — reads the companion Notion row (Streaming Notes, `Type="Musashi Review"`, today) in Phase 1.0c. This backup file is the full-detail archive; the Notion row is the compact handoff for the 🗡️ MUSASHI REVIEW section of the sweep brief.
- Brady — on demand to read full rationale, compare across days, or revive a deprioritized idea.
- `weekly-os-recap` — may read 7 days of scorecards to show score trendlines in the weekly visual.
- `commissioner-brief` — may cite Musashi's surprise-value flags in the weekly narrative.

## Rules

- The skill writes this file FIRST, Notion writes SECOND. If any Notion write fails, the header becomes `STATUS: partial — [reason]` and subsequent Notion writes abort. Morning sweep sees "no review" and proceeds normally.
- Re-runs overwrite. The most recent run is canonical for that date.
- Never delete these files — they are the trendline that lets Brady measure whether agents are actually improving month over month.
- Manual edits: allowed, but log the reason in a comment row at the top of the file (e.g., after Brady changes a score manually).

## Approval slugs

Every recommendation, tech item, and biz idea ships with a unique approval
slug like `approve musashi phil-1` or `approve musashi tech-linear-mcp`. Brady
replies with these in the morning sweep to queue a dev plan or promote an
idea. Unapproved items stay in the file forever — they're ideation capital,
not dead debt.
