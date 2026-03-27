# Slash Command System

PauletteAI's interface is a menu of 25 shortcodes across 6 categories, plus a feedback channel. Type `/menu` to see the full list. Use any shortcode to go directly to that workflow.

## Command Categories

### /WRITE — Communications
| Code | Command | Description |
|------|---------|-------------|
| /w1 | Donor Thank You | Thank-you letters for donors |
| /w2 | Fundraising Appeal | Fundraising appeal letters |
| /w3 | Grant Language | Grant application language and boilerplate |
| /w4 | Staff Email | Internal staff communications |
| /w5 | Transfer Outreach | Outreach to transfer partner shelters |

### /SOCIAL — Social Media
| Code | Command | Description |
|------|---------|-------------|
| /s1 | Adoption Post | Facebook + Instagram adoption post with photos, formatting, hashtags |
| /s2 | Event Announcement | Community event announcements |
| /s3 | Success Story | Adoption success stories and positive outcomes |
| /s4 | Reply to Comment | Responses to social media comments |

### /PREP — Meeting & Media Preparation
| Code | Command | Description |
|------|---------|-------------|
| /p1 | Board Meeting | Board meeting preparation materials |
| /p2 | Media Response | Media inquiry responses and press statements |
| /p3 | Public Speaking | Speaking notes and presentation prep |
| /p4 | Best Friends Rebuttal | Rebuttals to BFAS "Danville Deserves Better" campaign |

### /LOOKUP — Operational Reference
| Code | Command | Description |
|------|---------|-------------|
| /l1 | Stats & Numbers | DAHS statistics, intake/outcome data, benchmarks |
| /l2 | Cleaning Protocols | DAHS-specific cleaning and disinfection procedures |
| /l3 | Breed Info | Breed-specific handling, housing, and adoption guidance |
| /l4 | Site Visit Report | 2026 Dr. Molinas site visit findings and corrective actions |

### /RESPOND — Defensive Communications
| Code | Command | Description |
|------|---------|-------------|
| /r1 | Angry Email/Comment | Responses to hostile communications |
| /r2 | City/Government Letter | Formal government correspondence |
| /r3 | Complaint/Criticism | Responses to complaints and public criticism |

### /PLAN — Strategic Planning
| Code | Command | Description |
|------|---------|-------------|
| /h1 | Event/Campaign | Event and campaign planning |
| /h2 | Spay/Neuter Initiative | Spay/neuter program planning |
| /h3 | Strategic Planning | Long-term strategic planning |

### /FEEDBACK
Routes feedback to Brady via the session logger.

## Workflow Status

**Fully guided (multi-step, pulls from specific reference docs):**
- /s1 Adoption Post
- /l2 Cleaning Protocols
- /l3 Breed Info
- /l4 Site Visit Report

**Template-based (conversational flow with defined step sequences):**
All other commands — they follow defined patterns but don't have pre-built skill files yet.

## Skill Files

| Skill File | Function | Status |
|---|---|---|
| `SKILL.md` | Master menu command — displays capabilities when Paulette types /menu | Production |
| `pauletteai-menu-routing-SKILL.md` | Full routing logic for all 25 shortcodes + /feedback | Production |
| `paulette-session-logger-SKILL.md` | Generates structured email logs with machine-readable hashtags | Production |
