---
name: daily-operating-rhythm
description: |
  Orchestrates Brady's full daily cycle — morning sweep through evening archive, including
  client brief delivery and pipeline tracking. Sequences 6 sub-skills into a coherent
  daily operating rhythm.

  TRIGGER THIS SKILL whenever Brady says: "run my day," "full daily cycle," "what's the
  rhythm today," "operating rhythm," or when setting up automated daily workflows.

  This skill ORCHESTRATES sub-skills. It does not duplicate their instructions.
trust_tier: T1
---

# Daily Operating Rhythm

Brady's full daily cycle from wake to archive. Each block triggers the skill that owns it.

## Daily Schedule

### 6:00 AM CT — Morning Sweep
**Skill:** morning-sweep
**What:** Scan Gmail, iMessage, Notion, Calendar, Otter.ai, Conductor/GitHub, Monarch. Run family brief. Answer daily questions. Draft email responses. Schedule email catchup block.
**Output:** Morning sweep summary in Calendar event + Notion

### 7:00 AM CT — Daily Whitepaper
**Skill:** daily-whitepaper
**What:** Scrape Substack subscriptions and web news. Synthesize into polished 2-page PDF intelligence brief covering AI/LLM, Retail/CPG/Food, and NW Arkansas business.
**Output:** PDF whitepaper for Brady's own consumption

### 8:00–10:00 AM CT — Client Briefs
**Skill:** exec-intel-brief (run once per active client)
**What:** For each client with an active config in `exec-intel-brief/references/clients/`:
1. Load client config
2. Run web research sweep (15-25 searches)
3. Build 3-part HTML → PDF
4. Generate .md dossier
5. Present to Brady for review and send

**Active clients (check configs for current list):**
- `references/clients/ffh.md` → Jorge Azevedo
- `references/clients/oldcastle-national-pipe.md` → Jeff Bridge
- Add new clients as configs are created

**Output:** One PDF + one .md per client

### Throughout Day — Telly Dispatch
**Agent:** Telly
**What:** Captures Telegram messages, photos, files to Streaming Notes DB throughout the day. No manual trigger needed — runs autonomously.

### End of Each Block — Pipeline Dashboard
**Skill:** pipeline-dashboard
**What:** Live snapshot of Streaming Notes DB pipeline (In/Processing/Out). Run at end of morning sweep and before evening sweep to track what moved.
**Output:** Pipeline status in Notion

### 9:00 PM CT — Evening Sweep
**Skill:** evening-sweep
**What:** Archive the day's Get Ready event, morning sweep output, whitepaper, and session activity into structured local file system and Notion log. Create persistent, searchable daily journal entry.
**Output:** Daily archive file + Notion evening log

### Fridays 7:00 AM CT — Weekly OS Recap
**Skill:** weekly-os-recap
**What:** Scan past 7 days of git history, classify changes into plain-language categories (skills, agents, projects, infrastructure, publishing), render mception-styled HTML + PDF recap. Upload to Google Drive for GAS email delivery + Apple Shortcut text notification.
**Output:** HTML + PDF recap emailed to Brady with text ping
**Note:** Runs automatically via Conductor scheduled trigger. No manual action required.

## Weekly Override (Sundays 3-5 PM CT)
**Skill:** weekly-sweep
**What:** Replaces the daily rhythm with strategic planning. Reviews full week ahead, clears last week's decks, sets priorities for next 7 days. Scans all capture surfaces, reviews project status, family logistics, financial obligations.
**Output:** Weekly plan in Calendar event + Notion

## Dependency Chain

```
morning-sweep
  ↓ (surfaces priorities + client needs)
daily-whitepaper
  ↓ (news context feeds into client briefs)
exec-intel-brief × N clients
  ↓ (briefs delivered)
pipeline-dashboard
  ↓ (tracks what moved)
evening-sweep
  ↓ (archives everything)
[next morning]
```

## What This Kit Does NOT Do

- Execute any skill on its own — it sequences them
- Send emails or messages — Brady sends
- Make strategic decisions — Brady decides priority order each morning
- Run automatically (yet) — Brady triggers each block or says "run my day"
