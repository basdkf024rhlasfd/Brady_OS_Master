---
name: prospect-research-kit
description: |
  Fast research package for evaluating a potential client or contact — fact base, talk
  track, and Notion record. Lighter and faster than client-engagement-kit (no brief,
  no ideation, no deliverables). Use when Brady is evaluating fit, not yet delivering.

  TRIGGER THIS SKILL whenever Brady says: "research [name]," "tell me about [company],"
  "what do we know about [name]," "pull up [name]," "look into [company]," "who is
  [name]," "dig into [name]," or any variation requesting research on a person or company
  without asking for deliverables.

  If Brady says "spin up [name]" or "build the package for [name]," use
  client-engagement-kit instead — that's the full pipeline with deliverables.

  This skill ORCHESTRATES research workflows. It does not duplicate sub-skill instructions.
trust_tier: T0
---

# Prospect Research Kit

Fast research on a person or company. Produces a fact base, optional talk track, and
Notion records. No deliverables sent to the prospect — this is Brady's internal prep.

## Sub-Skills Used

| Skill | Path | Role |
|-------|------|------|
| **mception-design-system** | `3-reference/skills/mception-design-system/SKILL.md` | Talk track styling (dark mode fight card) |

## Inputs

Brady provides:
- **Name** — the person
- **Company** (optional) — if not provided, research will find it
- **Context** (optional) — "met at PLMA," "Adam introduced us," "saw on LinkedIn"

## Pipeline

### Step 1: Web Research (15-20 min)

Search for:
1. **Person:** LinkedIn profile, career path, education, press mentions, social media, speaking engagements
2. **Company:** Overview, size, revenue, HQ, industry, products/services, recent news, leadership
3. **Financials:** Public filings if available, funding rounds, revenue estimates, growth signals
4. **Competitive landscape:** Key competitors, market position, recent moves
5. **Strategic context:** What they're dealing with right now — pain points, tailwinds, industry pressures
6. **Brady's network overlap:** Shared connections, mutual contacts, Booth/Walmart/IVFH/Retail Collective links

### Step 2: Notion Search (5 min)

Check Brady's Notion for existing records:
- **People DB** — do we already have a record?
- **Streaming Notes** — any prior text exchanges, meeting notes, or thread logs?
- **Outreach contacts** — were they in the 44-contact GTM list?
- **Client Projects DB** — any prior engagement?

### Step 3: Fact Base (15 min)

Produce a sourced markdown document with:

```
## Company Overview
[Size, revenue, HQ, structure, tech stack if known]

## Executive Profile
[Career path, education, relationship to Brady, personality signals]

## Current Situation
[Pain points, tailwinds, strategic pressures — what they're dealing with NOW]

## Stakeholder Map (if enough data)
[Who cares about what, tensions between them]

## Competitive Landscape
[Key competitors, positioning, recent moves]

## Where Brady Could Help
[Mapped to Brady's capabilities — ops, analytics, AI, pricing, supply chain]

## Network Connections
[Shared contacts, warm paths, credibility validators]

## Engagement Approach
[Friend vs. warm contact vs. cold. How to open. What NOT to do.]

## Unverified Items ⚠️
[Flagged with source gaps]
```

### Step 4: Talk Track (optional — if meeting/call upcoming) (15 min)

**Owner:** Agent + **mception-design-system**

If Brady has a call or meeting scheduled:
1. Build a talk track using mception dark-mode design system
2. Structure: mindset frame → phased conversation flow (warm open → probe → bridge → close) → listen-for cues → do-not list → follow-up plays
3. Generate HTML → PDF via Playwright

### Step 5: Notion Records (10 min)

1. **People DB** — create or update entry with profile, company overview, current situation, engagement approach
2. **Streaming Notes** — create fact base page (Thread Log type, In Progress status)
3. Link artifacts

## Upgrade Path

If Brady decides to engage after research:
> "Build the package for [name]" → triggers **client-engagement-kit**

The client-engagement-kit picks up where prospect-research-kit left off. It reads the existing fact base and Notion records, then adds: client config, intelligence brief, ideation workshop, and Midjourney visuals.

## Output Files

| File | Format | Purpose |
|------|--------|---------|
| `[name-slug]-fact-base.md` | Markdown | Sourced research document |
| `[name-slug]-talk-track.html` | HTML | Call/meeting prep (dark mode) |
| `[name-slug]-talk-track.pdf` | PDF | Call/meeting prep (print) |

## What This Kit Does NOT Do

- Send anything to the prospect
- Generate intelligence briefs or deliverables
- Run ideation or brainstorming
- Make engagement decisions — Brady decides whether to pursue
