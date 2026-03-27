# PauletteAI — Internal

> **This is the internal project manifest.** It contains Brady's goals, team mechanics, operational details, and the business strategy behind the engagement. Paulette never sees this file.
>
> For the customer-facing version (Paulette's goals, success criteria, what she receives), see [CUSTOMER.md](CUSTOMER.md).
>
> For the one-page visual summary, see [PROJECT-POSTER.md](PROJECT-POSTER.md).

## Program
[Consulting](../consulting.md) — Work & Business

## Customer Problem
- **Who specifically:** Paulette Dean, Executive Director of the Danville Area Humane Society (DAHS). In her 70s, brilliant at shelter operations, not a tech person. Runs the only open-intake animal shelter in the Danville, VA region. Prefers voice input. Needs a "helpful person in a box" — not a tool, not software, a colleague she can talk to.
- **Trigger moment:** Paulette is under sustained public attack from Best Friends Animal Society's "Danville Deserves Better" campaign (2024–present). She needs to produce professional documents, rebuttals, board materials, media responses, and strategic content faster than one person can manage. She also needs an always-available assistant that understands her shelter, her voice, and her constraints without asking 20 questions.
- **Current workaround:** Doing everything herself — typing emails one at a time, preparing board materials from scratch, responding to social media attacks manually. Calling Brady for strategic document production. No persistent AI assistant. Every chat session starts from zero context.
- **Cost of status quo:** Hours lost daily on routine communications. Defensive content produced reactively instead of proactively. Strategic documents (employee manual, policy materials, grant language) bottlenecked on Brady's availability. Paulette's institutional knowledge trapped in her head instead of codified in a system that can help her use it.
- **Evidence:** Active daily usage of PauletteAI since initial build (Feb 2026). Paulette sends session logs via email. She uses voice input and pastes raw Facebook comments/emails with zero context — the system handles it. Employee manual now on v3 review draft. Multiple defense documents produced and delivered.

## Competition
- **Direct:** Generic AI chat (Claude, ChatGPT without project context) — Paulette tried this and found it useless without her specific context pre-loaded.
- **Indirect:** Brady doing all document production manually (doesn't scale, creates bottleneck). Paulette doing without (status quo — she's been doing it for decades but the BFAS campaign changed the volume).
- **Time pressure:** The BFAS campaign is ongoing. Employee manual must reach near-final draft before board meeting (3rd Monday of April 2026). Defense materials need continuous updates. The system is already in production — the competition is entropy and feature decay.

## Scoreboard

### Customer Goals (define first)
- **Victory Condition:** Paulette has a trusted AI colleague that handles her daily communications, document production, and strategic prep — so she can focus on running the shelter instead of fighting paperwork.
- **Key Results:**
  - KR1: Paulette uses PauletteAI daily for at least 3 of 6 command categories (Write, Social, Prep, Lookup, Respond, Plan) — Score: _/1.0
  - KR2: Employee manual v3 reaches near-final draft before April 2026 board meeting — Score: _/1.0
  - KR3: Session logging captures substantive interactions and routes structured feedback to Brady without Paulette doing any extra work — Score: _/1.0
- **Leading Indicator:** Session log volume and diversity — is Paulette using multiple command categories, or just one?

### Internal Goals (define second)
- **Victory Condition:** PauletteAI becomes the reference implementation for "domain-expert AI assistant for a non-technical executive" — a replicable engagement model with productizable components.
- **Key Results:**
  - KR1: Maintain active retainer revenue from DAHS engagement — Score: _/1.0
  - KR2: Expand guided workflows from 4/25 to 10/25 slash commands by end of Q2 2026 — Score: _/1.0
  - KR3: Automate session log pipeline (email → Gmail filter → Zapier → Notion) — Score: _/1.0
  - KR4: Extract reusable patterns (Linguistic DNA methodology, slash command routing, session logging) into Layer 3 templates — Score: _/1.0
- **Leading Indicator:** Does the session log pipeline work end-to-end without manual intervention?

### How They Connect
Paulette winning IS Brady winning. If she uses PauletteAI daily and it handles her workload, the retainer is justified on its own. The reusable patterns (Linguistic DNA, command routing, session logging, domain-specific knowledge base) are the compounding return — every hour spent on PauletteAI produces templates and methods that apply to future clients. The 629K shelter ops manual is the deepest moat — comprehensive reference that doesn't exist elsewhere in this form.

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Start: ~February 2026 (initial build)
- Phase 1 (core agent + slash commands): Complete
- Phase 2 (flyouts, history, metadata): Complete
- Phase 3 (saved commands, scheduling): Complete
- Employee manual v3 near-final: Target 3rd Monday of April 2026
- Session log automation: In progress
- Guided workflow expansion: Ongoing
- Hard deadlines: Employee manual must be near-final before April board meeting. BFAS defense materials need continuous updates as campaign evolves.

## Team

### Core Team (Active)

| Agent | Role | Profile |
|-------|------|---------|
| Musashi San | Product Owner | [musashi.md](../../../../0-agents/custom-built-agents/musashi.md) |
| Claudine (Code) | Builder | [claudine.md](../../../../0-agents/custom-built-agents/claudine.md) — Code mode |
| Phil | Reviewer | [phil.md](../../../../0-agents/custom-built-agents/phil.md) |
| Bo | Ops / Scope Guard | [bo.md](../../../../0-agents/custom-built-agents/bo.md) |

### Specialists (Drafted from Community)

| Agent | Role | Profile |
|-------|------|---------|
| Account Strategist | Client Relationship / Expansion | [sales-account-strategist.md](../../../../0-agents/imported-agents/sales/sales-account-strategist.md) |

### Interaction Rules
- **Musashi San** owns what gets built and whether it's good enough. Every output must pass the "would Paulette actually use this?" test — not "is this technically impressive?"
- **Claudine** builds skill files, knowledge base documents, guided workflows, and automation pipelines. Does not freelance on scope.
- **Phil** pressure-tests deliverables — especially voice accuracy ("does this sound like Paulette?") and usability ("can a 70-year-old who prefers voice input use this without help?")
- **Bo** guards scope. PauletteAI is a Claude Project assistant, not a platform. No dashboards, no widgets, no tech jargon in anything user-facing.
- **Account Strategist** watches for expansion signals — new use cases Paulette discovers, adjacent needs (website overhaul, donor CRM, volunteer management).
- **Brady** is the sole channel to Paulette. All communication goes through Brady.

### Authority
- Day (execution decisions): Claudine (building), Musashi San (product decisions)
- Cycle (scope/team changes): Musashi San + Brady
- ARC (project kill/pivot): Brady

## Recursive Learning

This engagement has natural compounding built in:

1. **Observe** — Session logs capture what Paulette uses, asks for, struggles with, and ignores
2. **Capture** — Structured email with machine-readable hashtags → Notion (once pipeline is automated)
3. **Synthesize** — Monthly review of session patterns: which commands get used, which don't, what new needs surface
4. **Adapt** — Expand guided workflows, refine voice calibration, update knowledge base
5. **Deliver** — Ship improvements invisibly — Paulette should notice things getting better without being told about updates

The Linguistic DNA methodology (12-dimension voice profiling from 30+ emails + phone transcript) is itself a reusable learning artifact.

## Where Things Live

| What | Where |
|------|-------|
| AI assistant runtime | Claude Project on claude.ai |
| Project planning | Brady OS repo — `1-execution/.../Project - PauletteAI/` |
| Session logs (target) | Notion DB `eae5c710-99fc-4be7-86cb-4f193e0980d2` |
| Document storage | [Google Drive — DAHS folder](https://drive.google.com/drive/folders/1AFIOg3TERXHJ9wW9f_4H3Xr0wyOY_d2u) |
| Tasks | Notion (linked to Consulting program) |
| Communication | Email (session logs), phone calls, Conductor workspaces |
| Internal manifest | This file |
| Customer manifest | [CUSTOMER.md](CUSTOMER.md) |
| OS governance | [consulting-engagement.md](../consulting-engagement.md) |

## Publishing
- **Slug:** `pauletteai`
- **Portal route:** `/pauletteai`
- **Surface:** KB markdown files (viewer deferred — PauletteAI's primary interface is the Claude Project itself)
- **Approved:** 2026-03-27
- **Allowlist entry:** `3-reference/publishing/mception-ai-projects.yml`

## Status
- Phase: **active** (production — daily use by client)
- Last updated: 2026-03-27
- Final medal: pending
