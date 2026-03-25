# Executive Assistant Agent

> Your daily command center. Talk to it — it handles the rest.

## What It Does

The executive assistant is the agent you'll use most. It's connected to your email, calendar, Slack, and Notion, and it handles the daily coordination work that currently requires you to open each tool separately.

### Email
- **Triage** — Scans your inbox, surfaces what matters, drafts responses
- **Drafts** — Writes emails in your voice with your preferred sign-off and tone
- **Follow-ups** — Tracks threads that need responses and nudges you or drafts the follow-up

### Calendar
- **Meeting prep** — Before each meeting, pulls context: who's attending, last conversation notes, relevant docs
- **Scheduling** — Finds open slots, proposes times, handles back-and-forth
- **Debrief** — After meetings, captures action items and drafts follow-up messages

### Slack
- **Monitoring** — Watches key channels for messages that need your attention
- **Responses** — Drafts replies in the right tone for each channel
- **Summaries** — Catches you up on channels you missed

### Notion
- **Task tracking** — Updates your task board based on meeting outcomes and email commitments
- **Note capture** — Stores meeting notes, decisions, and action items in your Notion workspace

## Tool Connections (MCPs)

| Tool | MCP | What it enables |
|------|-----|-----------------|
| Gmail | Gmail MCP | Read, search, draft, send emails |
| Google Calendar | Google Calendar MCP | Read events, create events, find free time |
| Slack | Slack MCP | Read messages, post messages, search channels |
| Notion | Notion MCP | Read/write pages, query databases, create tasks |

## Starter Skills

| Skill | What it does |
|-------|-------------|
| `/email-draft` | Drafts an email given recipient, topic, and tone |
| `/meeting-prep` | Pulls context for an upcoming meeting — attendees, history, docs |
| `/follow-up` | Generates follow-up messages from meeting notes or action items |

## Context It Knows

After the interview and build phase, your executive assistant will know:

- Your communication style and preferences (formal vs casual, sign-offs, response length)
- Your scheduling rules (buffer time, no-meeting blocks, timezone preferences)
- Key people in your life and how you communicate with them
- Your daily routine and when you prefer different types of work
- How you like meeting notes formatted and action items tracked

## How It Compounds

Every correction you make teaches the agent. If you edit a draft to change the tone, that preference is recorded in memory. By week 3, the agent produces first drafts that match your voice without edits.
