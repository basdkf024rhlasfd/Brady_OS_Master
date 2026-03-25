# Skills Library

> Your repeatable processes — packaged as commands that execute the same way every time.

## What Skills Are

A skill is a saved process that your agent can execute on command. Instead of explaining what you want every time, you type a slash command and the agent follows a defined procedure.

Skills are written as markdown files that live in your agent's workspace. They define:

- **What the skill does** — Clear description of the output
- **What inputs it needs** — Parameters the agent asks for
- **How to execute** — Step-by-step instructions the agent follows
- **Quality standards** — What "good" looks like for the output

## Starter Skills (Built During Engagement)

### Executive Assistant Skills

| Command | What it does |
|---------|-------------|
| `/email-draft` | Draft an email given recipient, topic, and tone preference |
| `/meeting-prep` | Pull context for an upcoming meeting — attendees, history, relevant docs |
| `/follow-up` | Generate follow-up messages from meeting notes or action items |

### CMO Skills

| Command | What it does |
|---------|-------------|
| `/content-draft` | Generate a content piece for a given topic, channel, and audience |
| `/landing-page` | Produce landing page copy with headline, subhead, body, and CTA |
| `/investor-update` | Draft a monthly investor update from key metrics and milestones |

### CFO Skills (Phase 2)

| Command | What it does |
|---------|-------------|
| `/journal-entry` | Record a transaction with proper account categorization |
| `/investor-answer` | Draft a response to an investor question with supporting financial data |
| `/financial-summary` | Produce a financial summary for a given time period |

## How Skills Get Added

During the engagement, we'll identify your repeatable processes and convert them into skills. Common sources:

1. **Things you explain to AI repeatedly** — If you've pasted the same instructions into ChatGPT more than twice, it's a skill
2. **Weekly routines** — Investor updates, team standups, content reviews
3. **Templates you reuse** — Proposal formats, email templates, report structures
4. **Processes with defined steps** — Onboarding a client, preparing for a board meeting

After the engagement, you can write new skills yourself. A skill is just a markdown file with instructions — no coding required.

## Skill Anatomy

```markdown
---
name: investor-update
description: Draft a monthly investor update
---

## Inputs
- Month/period to cover
- Key metrics (revenue, burn, runway, customer count)
- Top 3 highlights
- Top 3 challenges or risks

## Process
1. Pull latest financial data from QuickBooks (if connected)
2. Structure update in Mark's preferred format
3. Lead with highlights, then metrics table, then challenges
4. Close with next month's priorities
5. Keep tone confident but honest — never hide bad numbers

## Quality Standard
- Under 500 words
- Every metric has a comparison (vs last month or vs plan)
- No jargon the investors haven't heard before
- Ends with a clear "what's next" section
```

## Future Skills (Discovered During Use)

As you use the agents daily, patterns will emerge. Skills we expect to build during the maintenance phase:

- `/weekly-standup` — Summarize last week's activity and this week's priorities
- `/competitor-brief` — Pull latest intel on a named competitor
- `/meeting-debrief` — Summarize a Granola transcript into action items and follow-ups
- `/social-post` — Draft a LinkedIn post from a meeting insight or article
- `/proposal-draft` — Generate a client proposal from a brief description of the engagement
