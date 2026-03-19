# STIHL Competitive Intelligence — Internal

> **This is the internal project manifest.** It contains Brady's goals, team mechanics, operational details, and the business strategy behind the engagement. Rob never sees this file.
>
> For the customer-facing version (Rob's goals, success criteria, what he receives), see [CUSTOMER.md](CUSTOMER.md).
>
> For the one-page visual summary, see [PROJECT-POSTER.md](PROJECT-POSTER.md).

## Program
[Consulting](../consulting.md) — Work & Business

## Customer Problem
- **Who specifically:** Rob Jenson, Director of eCommerce at STIHL USA. Runs competitive intelligence with a small internal team but needs broader coverage, faster turnaround, and stronger analytical output.
- **Trigger moment:** Rob needs to brief leadership on competitive moves, tariff impacts, or digital gaps — and his current team can't produce the volume or depth fast enough.
- **Current workaround:** Internal insights team manually assembles briefs, monitors competitors ad hoc, and produces occasional one-off analyses. Coverage is inconsistent, output is slow, format varies.
- **Cost of status quo:** Leadership gets stale or incomplete intelligence. Rob spends time managing production instead of thinking strategically. Gaps in competitor coverage create blind spots.
- **Evidence:** Direct conversations with Rob. He's seen the POC and engaged on the direction. The current UI exists but hasn't landed — "too complicated and not sophisticated enough at the same time."

## Competition
- **Direct:** Large research firms (Kantar, Nielsen) — expensive, slow, generic. Internal insights staff — limited capacity.
- **Indirect:** Rob doing it himself with ChatGPT + manual research. Status quo team continuing as-is.
- **Time pressure:** Rob is evaluating his team structure now. The window to prove this model works is the next few weeks.

## Scoreboard

### Internal (Brady's Goals)
- **Victory Condition:** Prove the fractional insights model works — deliver more, faster, and better than Rob's current team, then convert to ongoing retainer.
- **Key Results:**
  - KR1: Deliver initial build with all 6 sections populated with real content by 2026-04-01 — Score: _/1.0
  - KR2: Rob actively uses the surface (opens it weekly, copies prompts, submits requests) within 2 weeks of delivery — Score: _/1.0
  - KR3: Convert to ongoing maintenance retainer by 2026-04-15 — Score: _/1.0
- **Leading Indicator:** Rob's engagement with the surface — does he open it, give feedback, submit requests?

### Customer (Rob's Goals)
- **Victory Condition:** Rob can brief leadership on any competitive development within hours, backed by data, without assembling it himself.
- **Key Results:**
  - KR1: Rob can pull a leadership-ready competitive brief from the surface in under 5 minutes — Score: _/1.0
  - KR2: Rob knows about competitor moves before his boss asks — zero "I'll have to get back to you" moments — Score: _/1.0
  - KR3: Rob's weekly time spent assembling intelligence drops by 75%+ — Score: _/1.0
- **Leading Indicator:** Does Rob reference the surface in leadership conversations? Does he forward artifacts to his team?

### How They Connect
Brady wins when Rob wins. If Rob is briefing leadership confidently, copying prompts, and submitting requests — then the surface is proving its value and the retainer conversion is natural. Internal KRs are lagging indicators of customer KRs.

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Start: 2026-03-18
- Target end: 2026-04-01 (initial delivery)
- Hard deadlines: None declared, but the window is short — Rob is making team decisions soon.

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
| SEO Specialist | Digital Analytics Lead | [marketing-seo-specialist.md](../../../../0-agents/imported-agents/marketing/marketing-seo-specialist.md) |
| Trend Researcher | Competitor Intelligence | [product-trend-researcher.md](../../../../0-agents/imported-agents/product/product-trend-researcher.md) |
| Account Strategist | Client Relationship / Expansion | [sales-account-strategist.md](../../../../0-agents/imported-agents/sales/sales-account-strategist.md) |
| Feedback Synthesizer | Recursive Learning Engine | [product-feedback-synthesizer.md](../../../../0-agents/imported-agents/product/product-feedback-synthesizer.md) |

### Interaction Rules
- **Musashi San** owns what gets built and whether it's good enough. All content decisions run through Musashi. Nothing ships to Rob that Musashi hasn't approved.
- **Claudine** builds to Musashi's spec. Does not freelance on scope or add features unprompted.
- **Phil** pressure-tests deliverables before they ship — especially the "does this actually help Rob?" question.
- **Bo** guards scope. If the build starts creeping beyond what's needed for initial delivery, Bo flags it.
- **SEO Specialist** owns the Digital Analytics section content — site audits, search rankings, marketplace observations.
- **Trend Researcher** owns competitor monitoring and market signal detection. Feeds the Competitors section.
- **Account Strategist** advises on the client relationship. Watches for engagement signals, flags retention risks, informs the retainer conversion.
- **Feedback Synthesizer** runs the monthly learning synthesis. Produces the Learning Brief that drives the next cycle.
- **Brady** is the sole channel to Rob. All direct communication goes through Brady. All feedback from Rob flows through Brady to the team.

### Authority
- Day (execution decisions): Claudine (building), Musashi San (product decisions)
- Cycle (scope/team changes, learning adaptations): Musashi San + Brady
- ARC (project kill/pivot): Brady

## Recursive Learning

The system must get smarter every week. This is the core value proposition — not the content itself, but the compounding effect.

Full framework: [recursive-learning.md](plans/recursive-learning.md)

**The loop:** Observe (what Rob used/ignored/requested) → Capture (record with metadata in Data section) → Synthesize (monthly Learning Brief) → Adapt (structural + content changes) → Deliver (improved surface) → Observe again.

**Key principle:** Every weekly update should include at least one visible improvement that came from learning. Rob should feel the surface getting smarter.

## Where Things Live

| What | Where |
|------|-------|
| Code / deliverables | mception-ai/cody repo (Next.js portal) — `src/app/(portal)/stihl/` |
| Planning & reference | This repo — `1-execution/.../Project - Stihl Insights/` |
| Tasks | Notion (linked to Consulting program) |
| Notes / memory | Notion Memory layer, tagged to this project |
| Communication | Conductor workspaces |
| Project manifest | This file |
| OS governance | [olympics.md](../../../../3-reference/olympics.md), [consulting-engagement.md](../consulting-engagement.md) |

## Status
- Phase: **active**
- Last updated: 2026-03-18
- Final medal: pending
