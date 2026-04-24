---
name: daily-operating-rhythm
description: |
  Orchestrates Brady's full 24-hour cycle — from nightly scheduled agents (Musashi,
  Phil) through morning sweep, client briefs, pipeline tracking, evening archive,
  and weekly layers (OS recap, Hygiene Heidi, weekly sweep). Single source of truth
  for how the day runs.

  TRIGGER THIS SKILL whenever Brady says: "run my day," "full daily cycle," "what's
  the rhythm today," "operating rhythm," or when setting up automated daily workflows.

  This skill ORCHESTRATES sub-skills and scheduled agents. It does not duplicate
  their instructions. See each sub-skill's SKILL.md for details.
trust_tier: T1
---

# Daily Operating Rhythm

Brady's full 24-hour cycle. Each block triggers the skill or agent that owns it.
The rhythm layers: automated overnight → Brady-initiated morning → throughout-day
capture → evening archive → weekly strategy on specific days.

## The Daily Cycle

### 🌙 Midnight CT — Musashi Review (automated)
**Agent:** Musashi · **Executes via:** Claude.ai Code scheduled trigger `musashi-review`
**What:** Scores every custom agent on 5 dimensions (Activation / Output Landed /
Autonomy / Trigger Clarity / Surprise Value), emits 1–3 recommendations per
below-threshold agent, scans web for new AI tools/MCPs/platforms (Exa + Bright Data),
generates 3–5 low-manual-lift biz ideas. Every item has an approval slug — nothing
auto-executes without Brady's `approve musashi [slug]` reply (T1 items auto-approve
after 24h if no veto).
**Output:** Streaming Notes row (`Name` starts with "Musashi Review") + gitted backup at
`1-execution/areas/brady-os/musashi-reviews/YYYY-MM-DD.md`

### 🌅 4:00 AM CT — Phil Pre-Sweep Primer (automated)
**Agent:** Phil · **Executes via:** Claude.ai Code scheduled trigger `phil-pre-sweep`
**What:** Reconciles Done/Status mismatches in Notion (autonomous, capped at 20/run),
surfaces carryover/7-day horizon/coherence flags in Phil's voice, proposes TOP 3
candidates for today's priorities.
**Output:** Streaming Notes row (`Name` starts with "Pre-Sweep Primer") + gitted backup at
`1-execution/areas/brady-os/phil-morning-audits/YYYY-MM-DD.md`

### 🔆 ~6:00 AM CT — Morning Sweep (Brady-initiated)
**Skill:** morning-sweep · **Trigger:** "update", "orchestrate", "what's up", "morning sweep"
**What:** Consumes Phil's primer (Phase 1.0b) + Musashi's review (Phase 1.0c). Scans
Gmail, iMessage, Notion, Calendar, Otter, Conductor/GitHub, Monarch. Runs family brief.
Rewrites 🌅 Get Ready event with 30-min brief. Processes unprocessed System
Instructions → Rules & Preferences (Phase 3.6b). Runs **streaming-notes-processor**
as Phase 3.6d (per-Type SLA actioning). Drafts Email Catchup block.
**Output:** Morning sweep summary in Calendar event + Notion; dev plans at
`.context/plans/sweep-YYYY-MM-DD-[slug].md`; refreshed `os-cockpit/data.js`

### 📰 ~7:00 AM CT — Daily Whitepaper
**Skill:** daily-whitepaper
**What:** Scrapes Substack subscriptions and web news. Synthesizes into polished
2-page PDF intelligence brief covering AI/LLM, Retail/CPG/Food, and NW Arkansas business.
**Output:** PDF whitepaper for Brady's own consumption; appended to Routing Log

### 📊 8:00–10:00 AM CT — Client Exec Intel Briefs (per active client)
**Skill:** exec-intel-brief (run once per active config in
`3-reference/skills/exec-intel-brief/references/clients/`)
**What:** For each client config:
1. Load client config
2. Run web research sweep (15–25 searches)
3. Build 3-part deliverable: cover note + scannable HTML/PDF + .md dossier
4. Present to Brady for review and send

**Client configs** live in `references/clients/` — list is read from the directory,
not hardcoded here. As of 2026-04-24 this includes FFH (Jorge Azevedo) and
Oldcastle/National Pipe (Jeff Bridge). Full consulting engagements (Panda via OC
Optimus, 1915 South via Fran) have their own agents and don't flow through
exec-intel-brief.

**Output:** One PDF + one .md per client, delivered by email

### 📡 Throughout Day — Telly Capture (autonomous)
**Agent:** Telly · **Inbound:** Telegram → Streaming Notes DB
**What:** Captures Telegram messages, photos, files to Streaming Notes throughout the day.
Also handles behavioral-feedback triggers (`rule:`, `never:`, `always:`, `remember:`) as
Type="System Instruction" — morning sweep promotes these.
**No manual trigger needed.**

### 🖥️ Throughout Day — mception Navigator (browser only)
**Skill:** mception-navigator · **Runs in:** Claude in Chrome
**What:** When Brady is browsing mception.ai, provides real-time navigation guidance and
next-action suggestions. Consumes morning sweep priorities and surfaces them as
browser-actionable items.
**Output:** In-browser action menu with guided navigation

### 📈 End of Each Block — Pipeline Dashboard
**Skill:** pipeline-dashboard
**What:** Live snapshot of Streaming Notes DB pipeline (In/Processing/Out). Runs at end
of morning sweep, after major skill runs, and before evening sweep to track what moved.
**Output:** Pipeline status in Notion

### 🌆 ~9:00 PM CT — Evening Sweep
**Skill:** evening-sweep
**What:** Archives the day's Get Ready event, morning sweep output, whitepaper, and
session activity into structured local file system and Notion log. Creates persistent,
searchable daily journal entry. Updates Jarvis Score (retained for continuity, superseded
by claudine-scorecard for real measurement).
**Output:** `~/Documents/Daily-Journal/YYYY/MM/DD/` (evening-journal.md, decisions.md,
email-summary.md, calendar-snapshot.md, metadata.json); Notion evening log; synced
`portal/public/family/kb/12-open-loops.md`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Weekly Layer

### 📅 Fridays 7:00 AM CT — Weekly OS Recap (automated)
**Skill:** weekly-os-recap · **Executes via:** Automated scheduled trigger
**What:** Scans past 7 days of git history, classifies changes into plain-language
categories (skills, agents, projects, infrastructure, publishing), renders
mception-styled HTML + PDF recap. Uploaded to Google Drive; GAS mailer delivers via
email + Apple Shortcut text ping.
**Output:** HTML + PDF emailed to Brady with text notification

### 🧹 Saturdays 8:00 AM CT — Hygiene Heidi (automated)
**Agent:** Hygiene Heidi · **Executes via:** scheduled trigger (cron `0 13 * * 6` UTC = CDT)
**What:** Weekly OS compliance check. Audits every agent + SKILL.md against Brady's 5
canonical hygiene rules (objective scoring methodology, self-scoring, improvement-seeking
mechanism, Streaming Notes purgatory ≤7 days, Research Library health — K16 ≥5/10, no
items unreferenced >90d, every active client ≥10 sources). Red/amber/green brief with
approval gates for all violations.
**Output:** Streaming Notes row (Type="Hygiene Check") + gitted backup at
`1-execution/areas/brady-os/hygiene-heidi-reports/YYYY-MM-DD.md`; Saturday morning
sweep surfaces violations

### 🎯 Sundays 3:00–5:00 PM CT — Weekly Sweep (replaces daily rhythm)
**Skill:** weekly-sweep
**What:** Strategic planning sweep. Reviews full week ahead, clears last week's decks,
sets priorities for next 7 days. Sequences multiple sub-skills:
1. Life Events Review (90-day look-ahead on major events)
2. Client Project Cleanup (Notion consulting project page audit)
3. Doctrine Sync (drift check: doctrine vs agent profiles)
4. Streaming Notes Disposition Audit (never-forget: stale/blocked/missing-next-action)
5. Claudine Scorecard (16 instrumented KPIs + Hands-Off Index)
6. Commissioner Brief (narrative synthesis: Headline / Wins / Signal / Blocked / 3 Bets)
7. Pipeline Dashboard (final state)

**Output:** Weekly plan in Calendar event + Notion; scorecard at
`1-execution/areas/brady-os/claudine-scorecard/YYYY-MM.md`; commissioner brief at
`1-execution/areas/brady-os/commissioner-briefs/YYYY-MM-DD.md`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Dependency Chain

```
Midnight CT    → musashi-review           (scheduled, Claude.ai Code)
                  ↓ feeds morning sweep Phase 1.0c
4:00 AM CT     → phil-pre-sweep           (scheduled, Claude.ai Code)
                  ↓ feeds morning sweep Phase 1.0b
~6:00 AM CT    → morning-sweep            (Brady-initiated)
                  ↓ includes streaming-notes-processor (Phase 3.6d)
                  ↓ surfaces priorities + client needs
~7:00 AM CT    → daily-whitepaper
                  ↓ news context feeds into client briefs
8–10 AM CT     → exec-intel-brief × N clients
                  ↓ briefs delivered
End-of-block   → pipeline-dashboard       (tracks what moved)
Throughout     → telly (capture) · mception-navigator (browser)
~9:00 PM CT    → evening-sweep
                  ↓ archives everything; sets up tomorrow
[next morning]
```

Weekly layers fire on their days and don't interrupt the daily cycle (except Sunday,
which replaces it with weekly-sweep).

## What This Skill Does NOT Do

- Execute any skill on its own — it sequences and documents them
- Send emails or messages — Brady sends (T2/T3 actions)
- Make strategic decisions — Brady sets priorities each morning
- Duplicate sub-skill instructions — defer to each sub-skill's SKILL.md
- Run fully automatically — Phil, Musashi, Heidi, and Weekly OS Recap are automated;
  morning sweep, evening sweep, client briefs, and weekly sweep are Brady-initiated

## Why This Exists

Brady's OS has grown to ~50 skills and 14 agents. Without this orchestration doc, the
correct sequence is implicit. This skill makes the daily/weekly rhythm explicit so any
new agent or Brady himself can see the flow without hunting through individual SKILL.mds.

**Last updated:** 2026-04-24 — modernized to reflect Phil/Musashi automation path,
Hygiene Heidi weekly layer, claudine-scorecard and commissioner-brief in weekly sweep,
and streaming-notes-processor as morning sweep Phase 3.6d.
