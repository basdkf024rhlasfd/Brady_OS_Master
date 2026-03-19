# Automation Rollout Plan

Last reviewed: 2026-03-19

## Why This Exists

Brady OS does not need more agent profiles before it needs more automation.

The current roster is already broad. The higher-leverage move is to build a boring, reliable automation spine for:

- email triage
- calendar hygiene
- Notion cleanup
- document intake
- household and business admin
- social/content routing
- family support

This plan is intentionally biased away from full autonomous desktop control. The goal is not "Open Claw for everything." The goal is fewer dropped balls, less context switching, and more consistency.

## Core Stance

1. Prefer partial automation with clear human checkpoints.
2. Use Google Workspace as the live operations layer for email and calendar.
3. Use Notion as the meaning layer, not the event-processing engine.
4. Use one orchestration spine, not five disconnected automation tools.
5. Defer agent-memory infrastructure until the boring workflows work.
6. Do not automate money movement without explicit approval and audit trails.

## Recommended Stack

### Adopt Now

#### 1. n8n

Primary orchestration layer.

Why:

- strongest fit with the imported Automation Governance Architect
- broad integration coverage
- flexible enough for Gmail, Calendar, Notion, docs, social, and finance-adjacent workflows
- better long-term control than ad hoc scripts alone

Use for:

- Gmail label routing
- email-to-task staging
- daily agenda digest
- weekly review digest
- Notion sync and cleanup jobs
- Paperless document routing
- social queue publishing workflows

Source:

- <https://github.com/n8n-io/n8n>

#### 2. Google Apps Script

Low-friction event layer for Gmail and Calendar.

Why:

- matches the existing Brady OS rebuild guidance
- extremely fast to implement for inbox, calendar, and reminder flows
- good first layer before building more elaborate n8n workflows

Use for:

- GTD-style Gmail triage labels
- daily agenda summary
- calendar anomaly detection
- email capture into staging tables or Notion intake

Primary local doctrine:

- `REBUILD-BRADY-OS.md` already defines the exact first five scripts to build

#### 3. Paperless-ngx

Document and receipt intake layer.

Why:

- useful for taxes, receipts, school forms, medical paperwork, insurance documents, and household admin
- reduces the "where did that PDF go?" tax
- creates a cleaner intake point before finance or archive workflows

Use for:

- scanned receipts
- school documents
- tax documents
- medical forms
- contracts and vendor paperwork

Source:

- <https://github.com/paperless-ngx/paperless-ngx>

### Add Soon

#### 4. Actual Budget or Akaunting

Choose based on use case.

Use `Actual Budget` if the pain is mainly household cash flow, budgeting, and day-to-day visibility.

Use `Akaunting` if the pain is business bookkeeping, invoicing, expense tracking, and accounting structure.

Rule:

- AI may classify, summarize, and flag
- AI should not post payments autonomously
- AI should not reconcile books without human review

Sources:

- <https://github.com/actualbudget/actual>
- <https://github.com/akaunting/akaunting>

#### 5. Mixpost

Social scheduling and queue management layer.

Why:

- useful if social inconsistency is caused by lack of scheduling and queue discipline
- less useful if the real bottleneck is unclear messaging or low writing throughput

Use for:

- scheduled LinkedIn and X posting
- content queue management
- content batch publishing

Caveat:

- this is the Lite repo for a broader commercial product, so treat it as optional rather than core infrastructure

Source:

- <https://github.com/inovector/mixpost>

### Pilot Only

#### 6. Open WebUI or LibreChat

Shared AI portal for household or team use.

Use when:

- a shared AI front door would reduce friction for family or collaborators
- you want a house UI for prompts, documents, and reusable workflows

Do not use as the first step. It is only worth adding after the core admin automations exist.

Sources:

- <https://github.com/open-webui/open-webui>
- <https://github.com/danny-avila/LibreChat>

#### 7. Smart Connect

Middle-ground between plain ChatGPT and full computer-use autonomy.

Use when:

- you want ChatGPT to reach Gmail, Calendar, Notion, files, and other tools through a structured bridge
- you want tool use without granting a general-purpose desktop agent full freedom

Treat as a pilot, not the operational backbone.

Source:

- <https://github.com/brianpetro/smart-connect>

## Defer For Now

### OpenHands

Very strong for code work. Not the first answer to life admin, family operations, or personal consistency problems.

Source:

- <https://github.com/All-Hands-AI/OpenHands>

### Dify

Powerful app and workflow platform, but heavier than necessary for the next phase of Brady OS.

Source:

- <https://github.com/langgenius/dify>

### Letta and Mem0

Useful if persistent agent memory becomes a real bottleneck. Not first-order leverage today.

Sources:

- <https://github.com/letta-ai/letta>
- <https://github.com/mem0ai/mem0>

### AppFlowy

Do not migrate out of Notion right now. Cleaning the current system is cheaper than a platform move.

Source:

- <https://github.com/AppFlowy-IO/AppFlowy>

## What Is Being Left On The Table Today

These are the obvious missed opportunities already named in the repo but not yet turned into live systems:

1. Gmail triage with stable labels and action routing.
2. Email-to-task capture with source links back to the thread.
3. A single morning agenda digest.
4. Calendar hygiene checks that flag unrealistic days.
5. A lightweight weekly review digest.
6. Receipt and document intake before bookkeeping review.
7. A simple social content queue.
8. A family intake channel for requests, school logistics, and wins.

## Repo And Integration Map

### Operating Flow

```text
Gmail / Google Calendar / Google Forms
        |
        v
Google Apps Script  --->  staging sheet or simple logs
        |
        v
       n8n
        |
        +--> Notion databases
        +--> Paperless-ngx
        +--> Actual Budget or Akaunting
        +--> Mixpost
        +--> daily / weekly digests
        |
        v
ChatGPT / Conductor / optional shared AI portal
```

### System Roles

- `Google Workspace`: live inbox, live calendar, quick triggers
- `n8n`: orchestration spine
- `Notion`: meaning, execution, memory, reference links
- `Paperless-ngx`: documents and receipts
- `Actual` or `Akaunting`: finance review surface
- `Mixpost`: publishing queue
- `ChatGPT` and `Conductor`: judgment, drafting, review, exception handling

## Three-Phase Rollout

## Phase 1 — Admin Stability

Target: 2 weeks

Goal:

Reduce inbox chaos and calendar drift first.

Build:

1. Gmail triage labels:
   - `Action`
   - `Waiting`
   - `Read/Review`
   - `Reference`
   - `Archive`
2. Email-to-task staging flow.
3. Daily agenda digest.
4. Calendar hygiene report.
5. Weekly review digest.

Success criteria:

- inbox is processed by label instead of vibe
- fewer missed follow-ups
- one trustworthy daily plan
- weekly review takes less than 20 minutes

Suggested agent draft:

- `Bo`: intake and prioritization
- `Cornelius`: Notion routing and cleanup
- `Automation Governance Architect`: automation design review
- `Phil`: scope and coherence check if the system starts bloating

## Phase 2 — Household And Finance Hygiene

Target: 2 to 4 weeks

Goal:

Reduce document loss and bookkeeping dread.

Build:

1. Paperless document inbox.
2. Receipt capture workflow.
3. School / medical / insurance document tags.
4. Finance summary dashboard in `Actual` or `Akaunting`.
5. Weekly finance review packet:
   - uncategorized expenses
   - upcoming bills
   - missing receipts
   - suspicious charges
   - bookkeeping exceptions

Success criteria:

- fewer receipts lost
- easier month-end review
- no mystery pile of PDFs or paper
- clearer household and business cash picture

Suggested agent draft:

- `Cornelius`: routing and archive structure
- `Finance Tracker`: financial review and anomaly spotting
- `Automation Governance Architect`: approval on finance-adjacent flows

## Phase 3 — Content And Family Systems

Target: 2 to 4 weeks

Goal:

Reduce inconsistency in publishing and create lightweight family support systems.

Build:

1. Content idea inbox.
2. Notion content queue with status fields:
   - idea
   - drafted
   - approved
   - scheduled
   - published
3. n8n -> Mixpost publishing flow.
4. Family intake form:
   - request
   - school item
   - problem
   - idea
   - win
5. School/admin digest.
6. Optional shared AI portal if it clearly lowers friction.

Success criteria:

- content stops living in random notes
- posting becomes batchable
- family requests are not trapped in hallway conversations
- fewer dropped school/admin details

Suggested agent draft:

- `Cornelius`: queue hygiene
- `marketing-social-media-strategist.md`: channel strategy
- `marketing-content-creator.md`: draft generation
- `Bo`: priority control

## Parenting And Kids AI

The right first move is not a custom kids platform. The right first move is a repeatable creation pattern using the tools they already have.

### Recommended Setup

Create one ChatGPT Project per child or per use case:

- `Story Studio`
- `Comic Maker`
- `Game Builder`
- `Homework Coach`
- `Inventor Lab`

### Good Family Workflows

#### 1. Saturday Studio

Weekly creative session:

- child brings idea
- ChatGPT turns it into outline
- ChatGPT helps with text, scenes, or game rules
- final artifact gets printed, exported, or shared

#### 2. School Ops Digest

Use email and forms to create a single digest of:

- forms needing signatures
- school events
- due dates
- supply needs
- teacher follow-ups

#### 3. Family Inbox

One simple intake form for:

- requests
- problems
- ideas
- wins
- schedule needs

This is better than relying on memory while walking through the kitchen.

### Guardrails

- use AI for co-creation, not passive consumption
- prefer projects that end in something made
- keep money, school permissions, and external messaging behind parental review

## What Not To Do

1. Do not stand up multiple orchestration tools at once.
2. Do not install a memory platform before the boring workflows exist.
3. Do not automate payments or accounting write-backs without approval steps.
4. Do not migrate off Notion during the automation rollout.
5. Do not try to solve inconsistency by importing twenty more agent profiles.

## Immediate Next Build Order

1. Gmail triage
2. email-to-task staging
3. daily agenda digest
4. weekly review digest
5. calendar hygiene checks
6. Paperless document intake
7. finance review workflow
8. content queue
9. family inbox
10. optional shared AI portal

## Local References

- [README.md](../README.md)
- [0-agents/README.md](../0-agents/README.md)
- [REBUILD-BRADY-OS.md](../REBUILD-BRADY-OS.md)
- [specialized/automation-governance-architect.md](../0-agents/imported-agents/specialized/automation-governance-architect.md)
- [support/support-finance-tracker.md](../0-agents/imported-agents/support/support-finance-tracker.md)
- [marketing/marketing-social-media-strategist.md](../0-agents/imported-agents/marketing/marketing-social-media-strategist.md)
