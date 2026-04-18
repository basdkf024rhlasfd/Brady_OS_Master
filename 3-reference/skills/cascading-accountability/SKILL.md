---
trust_tier: T0
---

# Cascading Accountability System

## What This Is

An AI-native management system that gives a CEO a 60-second daily briefing on their leadership team. Surfaces performance signals, risk flags, pre-drafted communications, and positive acknowledgments — without requiring the CEO to operate dashboards, trackers, or databases.

The system inverts the traditional accountability model: instead of "open a dashboard and figure out what matters," the briefing pushes the most important signals to the CEO every day with pre-drafted actions ready to execute.

## Trigger

- "deploy cascading accountability for [CLIENT]"
- "set up the OKR system for [CLIENT]"
- "spin up the accountability system"
- "configure daily briefing for [CEO NAME]"

## Components

| File | Purpose |
|------|---------|
| `whitepaper.md` | Full architecture, scoring logic, and implementation plan. The master document. |
| `CLIENT-CONFIG-TEMPLATE.md` | Per-client configuration sheet. Fill this out first — it populates all placeholders. |
| `templates/daily-briefing-email.md` | The daily email template [CEO] receives |
| `templates/ai-instructions.md` | Skill file that ships to [CEO]'s AI project for processing briefings |
| `templates/person-1pager.md` | Living intelligence document per leader |
| `templates/meeting-capture-agent.md` | Skill file for processing meeting transcripts into per-person signals |
| `okr-tracker.jsx` | Employee-facing OKR check-in app (Monday focus + Friday recap) |

## Deployment Sequence

### 1. Configure the Client

Copy `CLIENT-CONFIG-TEMPLATE.md` to the client's project directory:
```
1-execution/areas/work-and-business/programs/Consulting/Project - [CLIENT]/cascading-accountability-config.md
```

Fill out every field. This drives all customization.

### 2. Customize the OKR Tracker

Update the `CONFIG` object in `okr-tracker.jsx`:
- `COMPANY_NAME` → client company name
- `DIVISIONS` → from config template
- `TIERS` → which leadership tiers are included
- `ADHERENCE_THRESHOLD` → from config (default 75)
- `ADMIN_PIN` → from config
- `STORAGE_KEY` → unique per client

Deploy via V0-to-Portal skill or standalone hosting.

### 3. Build the Notion Backend

Create databases from `whitepaper.md` Section 2.3:
- Leader Profiles
- Signal Log
- OKR Submissions
- Briefing Archive
- Division Roll-ups

### 4. Install Skill Files on CEO's AI

Ship to [CEO]'s AI project (ChatGPT/Claude/Copilot):
- `templates/ai-instructions.md` — for processing daily briefings
- `templates/meeting-capture-agent.md` — for processing meeting transcripts

### 5. Seed 1-Pagers

For each MVP cohort leader, create a 1-pager from `templates/person-1pager.md`:
- Fill in Current State from org chart, tenure data, existing notes
- Fill in Enterprise Context for VP+ tier
- Leave Chronological Log empty (it populates as data flows)

### 6. Run MVP (4–8 Weeks)

Brady operates manually:
- Process structured updates from [CEO]'s AI → update 1-pagers
- Run scoring logic → generate daily briefing from `templates/daily-briefing-email.md`
- Send briefing at configured time
- Weekly calibration with [CEO] to tune scoring thresholds

### 7. Automate (Post-MVP)

[BUILDER] wires:
- Transcript → structured update flow (automated)
- Briefing generation and email delivery (automated)
- Expand to full leadership team

## Connection to Daily Operating Rhythm

The daily briefing is generated as part of Brady's morning sweep cycle:

```
Morning Sweep → triggers briefing generation for all active CAS clients
               → briefing delivered at [BRIEFING_TIME]
               → [CEO] feedback captured
Evening Sweep → archives day's data, updates 1-pagers, refreshes trends
Weekly Sweep  → calibrates scoring, produces weekly org health summary
```

This means every CAS client gets the benefit of Brady's full operating rhythm — not just a static system, but a learning system that improves weekly.

## Scaling Notes

- **SMB (20–70 employees):** All employees in the system. Single tier. Simpler scoring.
- **Enterprise (Fortune 500):** CEO's direct reports + their directs (20–50 leaders). Tiered scoring. Division roll-ups. Board-readiness flags.
- **Multi-client:** Each client gets their own Notion databases, config, and OKR tracker instance. Brady's sweep processes all clients in the same cycle.

## Dependencies

- Notion (backend database)
- [CEO]'s existing transcription pipeline (Teams/Zoom/Otter/Copilot)
- [CEO]'s AI project (ChatGPT/Claude/Copilot) for processing skill files
- Email for briefing delivery
- V0-to-Portal skill (optional, for OKR tracker hosting)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | April 2026 | Generalized from single-client. Added enterprise tier weighting, division roll-ups, board-readiness flags, modular agent architecture. |
| 1.0 | March 2026 | Initial build for SMB pilot. |
