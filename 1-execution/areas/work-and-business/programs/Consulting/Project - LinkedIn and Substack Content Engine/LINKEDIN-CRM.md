# LinkedIn CRM

## Purpose

Build a local CRM from LinkedIn network data to support consulting pipeline management, content targeting, and relationship tracking.

This is not a mass outreach tool. The goal is structured visibility into who Brady is connected to, what they care about, and how content and consulting opportunities overlap.

## Tool Recommendations

Full evaluations are in [automation-rollout-plan.md](../../../../../../3-reference/automation-rollout-plan.md) under "Add Soon > LinkedIn CRM & Network Data."

### Recommended Starting Point: OpenOutreach

- Self-hosted LinkedIn automation with built-in DjangoCRM
- Scrapes profiles, learns ideal customer profile via embeddings
- Manages multi-turn follow-up conversations
- Source: <https://github.com/eracle/OpenOutreach>

### Alternative: Skyvern

- General browser automation via Playwright and AI
- Use if OpenOutreach is too opinionated or a custom scrape-to-DB pipeline is preferred
- Source: <https://github.com/Skyvern-AI/skyvern>

### Lightweight Scrapers (one-off pulls)

- **linkedin_scraper** — Python library for profile data: <https://github.com/joeyism/linkedin_scraper>
- **drissbri/linkedin-scraper** — REST API (Selenium + FastAPI): <https://github.com/drissbri/linkedin-scraper>

## CRM Data Model

What to capture per contact:

| Field | Description |
|-------|-------------|
| Name | Full name |
| Headline | LinkedIn headline |
| Company | Current company |
| Role | Current title / function |
| Location | City / region |
| Connection date | When connected on LinkedIn |
| Last interaction | Most recent meaningful touchpoint |
| Tags | prospect, client, peer, referral source, industry |
| Engagement score | Based on content interactions (likes, comments, shares) |
| Notes | Conversation history, context, relationship details |
| Source link | LinkedIn profile URL |

## Integration with Content Engine

- Use CRM tags to identify which audience segments to target with specific content themes
- Track which connections engage with published LinkedIn posts
- Feed engagement data back into content strategy (what resonates with prospects vs. peers)
- Identify warm leads based on consistent content engagement before outreach

## Phasing

### Phase 1 — Manual Export + Structured DB

- Use LinkedIn's native data export (Settings > Get a copy of your data)
- Import into a structured store (SQLite, Notion database, or Airtable)
- Tag and categorize connections manually
- No scraping risk, no ToS issues

### Phase 2 — OpenOutreach Pilot

- Stand up OpenOutreach on a dedicated LinkedIn account (not primary)
- Test profile scraping and CRM population
- Evaluate DjangoCRM fit vs. building a simpler custom DB
- Human review on all data before any use

### Phase 3 — n8n Integration

- Connect CRM data to n8n for automated sync to Notion
- Build content targeting workflows (new connection → suggest content themes)
- Engagement tracking pipeline (content published → track who interacts → update CRM scores)

## Guardrails

These align with the [automation rollout plan](../../../../../../3-reference/automation-rollout-plan.md) core stance:

1. Use a dedicated LinkedIn account for any scraping. Never risk the primary profile.
2. Human review required before any outreach or messaging. No autonomous contact.
3. No autonomous messaging. The CRM informs decisions; Brady sends messages.
4. Regular data hygiene reviews. Stale contacts get archived, not left to rot.
5. Prefer the official LinkedIn API where possible.
6. Start with Phase 1 (manual export). Do not skip to automation before the data model is validated.

## Related Documents

- [PROJECT.md](PROJECT.md)
- [CONTENT-TRACKER.md](CONTENT-TRACKER.md)
- [automation-rollout-plan.md](../../../../../../3-reference/automation-rollout-plan.md)
