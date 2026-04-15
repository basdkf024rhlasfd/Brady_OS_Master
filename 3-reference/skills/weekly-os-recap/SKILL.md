---
name: weekly-os-recap
description: |
  Weekly visual changelog of Brady OS — scans the past 7 days of git history, classifies
  changes into plain-language categories, and renders a polished mception-styled HTML + PDF
  recap. Delivered every Friday morning via email with a text notification.

  TRIGGER THIS SKILL whenever Brady says: "weekly recap," "os recap," "what changed this
  week," "changelog," "week in review," "os summary," "recap the OS," "what moved this
  week," or any variation requesting a summary of recent OS changes.

  This skill owns backward-looking OS change summaries. It does NOT own forward-looking
  planning (use weekly-sweep), daily briefings (use morning-sweep), or project-specific
  status (use project-standup-kit).
---

# Weekly OS Recap

One document, every Friday. What moved in Brady OS this week — in plain language, not git noise.

## Why This Exists

Brady ships 15–25 commits per week across skills, agents, projects, governance, and publishing.
Without a recap, the OS evolves faster than Brady's mental model of it. This skill produces a
30-second-scannable visual summary so Brady always knows what his system looks like right now.

## Execution Environment

**Runs on**: Conductor (Claude Code CLI) — needs git access for log/stat
**Local access**: Git, file system, Playwright (for PDF generation)
**Scheduled**: Every Friday at 7:00 AM CT via Conductor remote trigger
**Delivery**: GAS script emails the recap; Apple Shortcut sends text notification

## Pre-Flight (Silent)

1. **Confirm git access** — run `git log -1` to verify repo is accessible
2. **Read config** — load `references/config.md` for recipient, categories, output dir
3. **Check design system** — verify CSS tokens match `mception-design-system/SKILL.md`
4. **Get date range** — calculate Monday 00:00 through Sunday 23:59 of the current week
   (or use `--since='7 days ago'` if running mid-week)

## Phase 1: Scan

Gather raw git data. No output yet.

### 1.1 Commit Log
```bash
git log --since='7 days ago' --pretty=format:'%H|%ai|%s' --no-merges
```
Capture: hash, date, commit message for every non-merge commit.

### 1.2 File Stats
```bash
git log --since='7 days ago' --stat --no-merges
```
Capture: files changed, insertions, deletions per commit.

### 1.3 Diff Summary
```bash
git diff --stat HEAD~[N]..HEAD
```
Where N = total commits in the window. Capture aggregate file-level changes.

### 1.4 New Files Detection
```bash
git log --since='7 days ago' --diff-filter=A --name-only --pretty=format:''
```
Identify all newly added files — critical for detecting new skills, agents, projects.

## Phase 2: Classify

Group commits into categories based on file paths and commit messages. Use these rules:

| Category | Color | Detection Rule |
|----------|-------|----------------|
| **New Skills** | gold | New files in `3-reference/skills/*/SKILL.md` |
| **New Agents** | blue | New files in `0-agents/custom-built-agents/` |
| **Project Work** | red-dim | Changes in `1-execution/` or any `Consulting/` or `Project` paths |
| **Infrastructure** | gray | Changes to `CLAUDE.md`, `config-sync`, `governance/`, `scripts/` |
| **Publishing** | gold-dim | Changes to `mception-ai-projects.yml`, viewer apps, publishing/ |
| **Programs & Planning** | blue | New programs, project kickoffs, career/personal planning files |

**Classification rules:**
- A commit can appear in multiple categories if it touches multiple areas
- Merge commits are excluded from the scan (Phase 1.1 uses `--no-merges`)
- If a commit message is unclear, classify by file path
- New skill directories get their own bullet with the skill name and one-line description

## Phase 3: Summarize

For each category, write plain-language bullets. Each bullet must:
- **Name the thing** — "Cascading Accountability skill," not "new SKILL.md in cascading-accountability/"
- **Say what it does** — one sentence, operator language
- **Say why it matters** — if the commit message or context makes it clear

Also generate:
- **Headline** — one sentence summarizing the week's dominant theme (goes in thesis bar)
- **Stat cards** — count of: new skills, new agents, projects touched, PRs merged
- **Timeline data** — commits per day (Mon–Sun) for the activity bar

## Phase 4: Render

Fill the HTML template at `references/recap-template.html` with Phase 3 content.

### Template Substitution

Replace these placeholders in the template:
- `{{WEEK_RANGE}}` — e.g., "Apr 7–14, 2026"
- `{{WEEK_NUMBER}}` — e.g., "Week 16"
- `{{YEAR}}` — e.g., "2026"
- `{{HEADLINE}}` — thesis bar text
- `{{TOTAL_COMMITS}}` — aggregate stat
- `{{TOTAL_LINES}}` — insertions + deletions
- `{{TOTAL_FILES}}` — unique files changed
- `{{STAT_CARDS}}` — HTML for the 4 stat cards
- `{{CATEGORY_CARDS}}` — HTML for each category section
- `{{TIMELINE_BARS}}` — HTML for the daily activity timeline
- `{{GENERATED_DATE}}` — ISO timestamp

### Generate PDF
Use Playwright to render the HTML at 8.5x11" letter size with light-mode print styles:
```bash
npx playwright screenshot --viewport-size=816,1056 recap.html recap.pdf
```
Or use the Playwright PDF generation API for proper print output.

### Save Output
- Dark HTML → `~/Documents/OS-Recaps/os-recap-YYYY-MM-DD.html`
- Light PDF → `~/Documents/OS-Recaps/os-recap-YYYY-MM-DD.pdf`
- Also copy to Google Drive `OS-Recaps/` folder for GAS pickup

## Phase 5: Deliver

### 5.1 Email (via GAS)
The GAS script at `3-reference/scripts/gas/scripts/os-recap-mailer/main.js` runs on a
Friday 7:15 AM CT trigger (15 min after Conductor generates the file):
- Picks up the latest HTML from Google Drive `OS-Recaps/` folder
- Sends email with:
  - **Subject:** `[OS-RECAP] Week {{WEEK_NUMBER}} — {{HEADLINE}}`
  - **Body:** Full HTML recap (inline, not attachment)
  - **Attachment:** Light PDF version
- If no new recap file found, sends a notice: "No recap generated this week"

### 5.2 Text Notification (via Apple Shortcut)
Set up once on Brady's iPhone:
1. Open Shortcuts → Automations → New Automation
2. Trigger: "When I get an email" → Subject contains `[OS-RECAP]`
3. Action: "Send Message" → To: Brady's own number → Body: "OS Recap ready — {{HEADLINE}}"
4. Toggle "Ask Before Running" OFF

Alternative (if Shortcuts is unreliable): Add Twilio SMS to the GAS script using
`UrlFetchApp.fetch()` to POST to the Twilio Messages API.

## Edge Cases

- **No commits this week**: Generate a minimal recap — "Quiet week. No OS changes." with just the header and an empty state card.
- **Massive week (50+ commits)**: Cap each category at 8 bullets. Add a "and N more..." line.
- **Weekend run**: If triggered on a day other than Friday, adjust the date range header but keep the 7-day lookback.
- **Git not available**: Fail with a clear error. Don't generate an empty recap silently.
- **Google Drive not synced**: Save locally and flag in output — "⚠️ Drive upload failed. Recap saved to ~/Documents/OS-Recaps/"

## What This Skill Does NOT Do

- It doesn't plan the week ahead (use weekly-sweep)
- It doesn't surface Notion/email/calendar data (use morning-sweep)
- It doesn't send the email directly — the GAS script handles delivery
- It doesn't modify any OS files — it's read-only against the repo

## Data Dependencies

- `references/recap-template.html` — HTML template with mception design system
- `references/config.md` — Delivery config (recipient, schedule, categories)
- `3-reference/skills/mception-design-system/SKILL.md` — Design token reference

## Scheduling Setup

### Conductor Remote Trigger
```
Schedule: 0 12 * * 5  (Friday 7:00 AM CT = 12:00 UTC)
Prompt: "Run the weekly OS recap skill for the past 7 days. Save output to ~/Documents/OS-Recaps/ and upload to Google Drive OS-Recaps folder."
```

### GAS Trigger
Install via `installTrigger()` in the os-recap-mailer script — runs every Friday at 7:15 AM CT.
