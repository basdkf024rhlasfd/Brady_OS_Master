# CASCADING ACCOUNTABILITY SYSTEM

**Architecture, Logic & Implementation Whitepaper**

Prepared by Brady Smallwood
April 2026 — v2.0

CONFIDENTIAL — NOT FOR DISTRIBUTION

---

## 1. Executive Summary

This document defines the complete architecture, scoring logic, and implementation plan for an AI-native management system designed for large enterprises. The system gives [CEO] a daily briefing that surfaces leadership performance signals, risks, and decisions needed — without requiring [CEO] to operate dashboards, trackers, or databases.

The system has three participants with distinct roles:

**[CEO] (End User):** Receives the briefing. Acts on recommendations. Records meetings using their existing transcription pipeline. Their AI processes transcripts via skill files Brady provides.

**Brady (System Architect):** Designs the logic, maintains the backend (Notion), produces the daily briefing, and iterates the system. [CEO] does not see or need access to Brady's backend.

**[BUILDER] (Technical Builder):** Wires automation between [CEO]'s output and Brady's input when the system is proven and ready to scale.

### What Makes This Different

Most accountability systems are dashboards that nobody opens. This one inverts the model:

- **Push, not pull.** The briefing comes to [CEO]. They never log into anything.
- **60-second actionable.** Red flags first, pre-drafted emails ready to send, calendar invites ready to create.
- **AI-native.** [CEO]'s own AI processes transcripts and briefings. Brady's AI generates the intelligence. No one operates a spreadsheet.
- **Self-improving.** The system runs on a daily operating rhythm that archives every day, detects trends over weeks, and evolves its own scoring logic based on calibration feedback.

This is not a performance management system. It's a chief of staff that never sleeps, never forgets, and never gets political.

---

## 2. System Architecture

The system operates as a three-component pipeline. Each component has a clear owner, a defined input/output contract, and can be tested independently before wiring them together.

### 2.1 Component Overview

| Component | Owner | Function |
|-----------|-------|----------|
| **Input Layer** | [CEO] + their AI | Meeting transcripts → structured per-person updates. [CEO] records meetings normally; their AI extracts signals using Brady's skill file. |
| **Intelligence Layer** | Brady | Ingests structured updates into the employee intelligence database. Runs scoring, trend detection, risk flagging. Generates the daily briefing. |
| **Action Layer** | [CEO] + their AI | Daily briefing → emails sent, meetings scheduled, decisions made. [CEO]'s AI helps execute in under 60 seconds. |

### 2.2 Data Flow

1. **[CEO] records meetings** using their existing transcription pipeline (Teams, Zoom, Copilot, Otter, or any tool they're comfortable with).
2. **[CEO]'s AI processes the transcript** using the skill file Brady provides. The AI extracts per-person observations, feedback, commitments, and risk signals into a structured format.
3. **Structured updates flow to Brady's backend** (initially via email/paste, later automated by [BUILDER]). [CEO] sends the output; they don't need to understand what happens next.
4. **Brady's system ingests updates** into the Notion-based employee intelligence database (1-pagers, signal logs, OKR tracker data).
5. **The logic engine runs** against accumulated data: scoring, trend detection, threshold checks, risk flagging.
6. **The daily briefing is generated and delivered** to [CEO] at [BRIEFING_TIME] daily. [CEO] reads it in 60 seconds and acts.

### 2.3 Backend Architecture (Brady-Side Only)

Brady's backend is private. [CEO] does not need visibility into it. The backend uses Notion as the system of record with the following schema:

#### Notion Database Schema

| Database | Purpose | Key Fields |
|----------|---------|------------|
| **Leader Profiles** | One record per person in the system | Name, Division, Tier (C-Suite/SVP/VP/Director), Reports To, Start Date, Risk Flags, Composite Score, Trend |
| **Signal Log** | Every data point captured | Date, Person, Source (OKR/Meeting/Manager Note/System), Signal Type, Severity, Content, Confidence Level |
| **OKR Submissions** | Monday focus + Friday recap data | Person, Week ID, Type (Monday/Friday), Content, Self-Score, Submitted At |
| **Briefing Archive** | Every briefing sent | Date, Red Flags Count, Actions Taken, Calibration Notes |
| **Division Roll-ups** | Aggregated division health | Division, Headcount, Avg Adherence, Trend, AOP Pacing, Leader Composite |

### 2.4 The Daily Operating Rhythm (Delivery Engine)

The briefing doesn't exist in isolation. It plugs into a daily operating cycle that compounds intelligence over time:

```
6:00 AM    Morning Sweep
           ├── Scan all data sources (email, calendar, Notion, transcripts)
           ├── Apply any feedback from yesterday
           ├── Surface today's priorities
           └── Trigger briefing generation for all active clients

[TIME]     Daily Briefing delivered to [CEO]
           ├── Red flags → immediate action
           ├── Division pulse → situational awareness
           ├── Pre-drafted comms → 60-second execution
           └── [CEO] feedback captured

9:00 PM    Evening Sweep
           ├── Archive full day (decisions, actions, signals)
           ├── Update employee 1-pagers with new data
           ├── Refresh trend lines
           └── Queue tomorrow's briefing inputs

WEEKLY     Strategic Review
           ├── Calibrate scoring against [CEO]'s intuition
           ├── Review all feedback from the week
           ├── Evolve scoring logic if thresholds are off
           └── Produce weekly org health summary
```

This rhythm is what separates the system from a static dashboard. Every day's archive becomes context for tomorrow's briefing. Every week's calibration makes next week's scoring smarter. The system learns.

---

## 3. Scoring & Logic Model

This is the brain of the system. Every other component — the skill file, the briefing, the 1-pagers — depends on getting this right. The scoring model defines what triggers a red flag, what constitutes a yellow watch item, and what keeps someone green.

The model evaluates leaders across five dimensions, weighted differently by tier.

### 3.1 Scoring Dimensions

| Dimension | Description | C-Suite Weight | SVP Weight | VP Weight | Director Weight |
|-----------|-------------|---------------|------------|-----------|-----------------|
| **OKR Adherence** | Monday focus submitted, Friday recap submitted, self-scored adherence % | 15% | 20% | 25% | 30% |
| **Commitment Follow-Through** | Commitments made in meetings → delivered on time | 30% | 25% | 25% | 25% |
| **Meeting Engagement** | Sentiment, preparation, contribution quality from transcript analysis | 15% | 15% | 15% | 15% |
| **Team Health** (Leaders only) | Aggregate scores of their direct reports. A leader with struggling directs is a signal. | 25% | 25% | 20% | 15% |
| **Strategic Alignment** | Are their priorities aligned with [CEO]'s stated direction? Measured by OKR content + meeting contributions. | 15% | 15% | 15% | 15% |

**Why the weights differ by tier:**
- C-Suite leaders are measured more on team health and commitment follow-through. Their job is to build and run organizations, not to fill out trackers.
- Directors are measured more on OKR adherence. Their job is execution discipline.
- Strategic alignment is constant across tiers — everyone needs to be rowing in the same direction.

### 3.2 Status Thresholds

Each leader receives a composite score (0–100) based on weighted dimension scores. The composite maps to a status:

| Status | Score Range | Meaning | Briefing Treatment |
|--------|-------------|---------|-------------------|
| **Green** | 75–100 | On track. No action needed. | Listed in "On Track" section. Occasional positive callout. |
| **Yellow** | 50–74 | Watch. Something is off but not yet critical. | Listed in "Watch List" with specific concern and suggested action. |
| **Red** | 0–49 | Act today. A real problem is forming. | Listed in "Red Flags" with pre-drafted email and calendar invite. |

### 3.3 Risk Signal Taxonomy

Not all signals are equal. The system categorizes signals by type and severity to avoid false alarms while catching real problems early.

| Signal Type | Severity | Example | Auto-Trigger |
|-------------|----------|---------|-------------|
| **Missing Submission** | Low (1st), Medium (2nd), High (3rd+) | No Monday focus submitted by noon | Yellow after 2nd miss, Red after 3rd |
| **Below-Threshold Adherence** | Medium | Self-scored adherence below 75% | Yellow immediately, Red if consecutive |
| **Negative Meeting Sentiment** | Low–Medium | Disengaged, defensive, or unprepared in meetings | Yellow if pattern (2+ occurrences in 3 weeks) |
| **Missed Commitment** | High | Said "I'll have it by Friday" — didn't deliver | Yellow immediately, Red if pattern |
| **Team Health Decline** | High | Leader's direct reports trending downward | Yellow if 2+ directs declining, Red if 3+ |
| **Strategic Misalignment** | Medium | OKR priorities don't connect to company objectives | Yellow, escalated in weekly summary |
| **Positive Signal** | N/A | Exceeded commitment, strong meeting contribution, team trending up | Surfaces in "On Track" with specific praise language |

### 3.4 Behavioral Pattern Detection

Individual data points matter less than trends. The system tracks trailing 3-week and 6-week trend lines across each dimension for every leader.

**Improving:** 2+ consecutive weeks of score increase in any dimension. Surfaces as a positive signal. Important for leaders recovering from a red/yellow period — [CEO] acknowledging progress is a massive leadership signal.

**Flat:** No significant movement. Default state. No action needed unless flat at a low score (e.g., consistently 55–65 = chronic underperformance that never triggers red but also never improves). The system flags "flat-at-yellow" as its own category.

**Declining:** 2+ consecutive weeks of score decrease. Surfaces as a yellow signal even if absolute score is still green. Catching the trajectory early is the whole point.

### 3.5 Scoring Edge Cases & Considerations

#### 3.5.1 New Leaders

Leaders in their first 30 days have insufficient data. The system defaults them to green with a "ramp-up" tag and excludes them from trend analysis. After 30 days, scoring begins with whatever data has accumulated. This avoids false reds from sparse data.

#### 3.5.2 Sparse Data Leaders

Some leaders are rarely in meetings with [CEO] or don't have direct transcript coverage. Their signal profile will be dominated by OKR submissions and second-hand observations. The system must not penalize people for lack of data — it flags "insufficient signal" as its own category, prompting [CEO] to get more touchpoints rather than assuming all is well.

#### 3.5.3 Division-Level Roll-ups

Each division gets a composite health score: average of its leaders' composites, weighted by tier seniority. A division where the SVP is red and VPs are green is very different from one where the SVP is green and VPs are red — the system surfaces this distinction.

Division-level pacing against AOP KPIs (Revenue, Profit, Cash) adds a financial overlay to the people data. A division with green people scores but red financial pacing is a strategy problem, not a people problem.

#### 3.5.4 Tier-Appropriate Context

Leaders at different tiers have different failure modes:
- A **C-Suite leader** who misses OKR submissions is a worse signal than a Director who misses them — the C-Suite leader is supposed to be modeling the behavior.
- A **Director** with negative meeting sentiment might just be having a rough week. An SVP with the same signal could indicate a team-level problem.
- A **C-Suite leader** whose team health is declining is the single most important red flag in the system.

The weight table in Section 3.1 partially accounts for this, but the briefing narrative contextualizes differently per tier.

#### 3.5.5 Cross-Division Leaders

Some leaders split time across divisions. Their OKR allocation maps to the time-split defined in the org chart. Signals should be attributed to the correct division context when possible (e.g., a meeting about supply chain operations generates signals tagged to Supply Chain, even if the leader also owns a technology initiative).

---

## 4. The Skill File (Input Contract)

The skill file is an instruction set that ships to [CEO]'s AI project. When [CEO] pastes a meeting transcript, their AI uses these instructions to extract structured data in a consistent format that Brady's backend can ingest.

The skill file must work regardless of which LLM [CEO] uses (ChatGPT, Copilot, Claude) and must not assume any specific tool integrations on [CEO]'s side.

### 4.1 Design Requirements

- **Model-agnostic:** Works with any mainstream LLM. No tool-use or function-calling assumptions.
- **Single-prompt:** [CEO] pastes transcript, gets structured output. One action, one result.
- **Deterministic format:** Output must be machine-parseable. Same structure every time regardless of transcript length or content.
- **Graceful degradation:** If the transcript is garbage (overlapping speakers, poor audio, missing context), the skill file produces partial output with explicit "low confidence" flags rather than hallucinating signals.
- **Privacy-aware:** The skill file instructs the AI to extract observations, not to editorialize or make judgments. The scoring happens on Brady's side, not [CEO]'s.

### 4.2 Skill File Output Schema

When [CEO]'s AI processes a transcript, it outputs a structured update per person:

```
PERSON: [Name]
DIVISION: [Division]
TIER: [C-Suite / SVP / VP / Director]
DATE: [Meeting date]
SOURCE: [Meeting type — e.g., "Leadership Team Meeting"]

FEEDBACK_GIVEN: [Positive or constructive feedback given to/about this person]
COMMITMENTS: [What they said they'd do, with deadline if mentioned]
ACTION_ITEMS: [Tasks explicitly assigned]
CONCERNS: [Problems, risks, issues raised about their work or area]
PRAISE: [Recognition of good work]
DECISIONS: [Decisions affecting their work or responsibilities]
TONE: [Engaged/Neutral/Disengaged/Defensive — with supporting context]
CONFIDENCE: [High/Medium/Low — how much data supports this extraction]
CONTEXT: [Any background information relevant to their profile]
```

This format is intentionally flat and redundant. It's designed so that Brady's processing layer can parse it reliably even if the AI varies slightly in formatting.

### 4.3 Skill File Behavioral Instructions

The skill file includes behavioral guardrails for [CEO]'s AI:

- **Extract, don't interpret.** Report what was said and done. Do not score, rate, or judge. The scoring model lives on Brady's side.
- **When in doubt, include it.** It's better to capture something irrelevant than to miss something important. Brady's system can filter noise; it can't recover missed signals.
- **Flag uncertainty explicitly.** If a speaker can't be identified, if a commitment is ambiguous, if tone is unclear — say so. "Low confidence" is valid output.
- **Separate observation from inference.** If someone said "I'll have it done by Friday," that's a commitment. If someone sounded frustrated, that's a tone observation. If the AI thinks someone might be disengaged, that's an inference and should be labeled as such.
- **Preserve context.** Include enough surrounding context for each signal that Brady's system can evaluate it without needing the full transcript.

### 4.4 Non-Meeting Input Channels

Meeting transcripts are the primary input, but the skill file handles other input types [CEO] might paste:

- **Ad-hoc observations:** [CEO] types a note after a hallway conversation. The skill file recognizes this isn't a transcript and formats it as a manager observation.
- **Email threads:** [CEO] forwards an email chain with relevant signals. The skill file extracts per-person fields where applicable.
- **OKR review notes:** [CEO] reviews someone's submission and has comments. Skill file captures these as manager feedback.
- **Board prep notes:** [CEO] captures observations from board interactions or investor meetings that affect specific leaders' priorities.
- **Skip-level meeting notes:** Direct input from below the leader being evaluated — handled with appropriate context tagging.

The skill file auto-detects the input type and adjusts its extraction approach, always outputting in the same structured format.

---

## 5. The Daily Briefing (Output Contract)

This is what [CEO] sees. It arrives at [BRIEFING_TIME] daily. It must be readable in 60 seconds, actionable without any other context, and feel like a chief of staff prepared it — not like a system dashboard generated it.

### 5.1 Briefing Structure

| Section | Content | Read Time |
|---------|---------|-----------|
| **Red Flags** | Leaders requiring immediate attention. Issue, context, pre-drafted action. | 15 sec |
| **Division Pulse** | One line per division: headcount, adherence %, trend arrow, AOP pacing. | 10 sec |
| **Watch List** | Yellow-status leaders with specific concern and suggested action. | 10 sec |
| **On Track** | Notable positive signals worth acknowledging. Not everyone — just standouts. | 5 sec |
| **Pending Actions** | [CEO]'s open items from meeting captures and prior briefings. | 10 sec |
| **Pre-Drafted Emails** | Ready-to-send messages triggered by red flags or pending actions. | 5 sec |
| **Calendar Invites** | Meetings to schedule, with suggested windows and agenda. | 5 sec |

### 5.2 Enterprise Roll-up Layer

For organizations with 20+ leaders in the system, the briefing adds a roll-up layer between Red Flags and Division Pulse:

**Org Health Score:** Single number (0–100) representing overall leadership health. Trend arrow vs. last week. This is the "is my organization getting better or worse?" number.

**Board-Readiness Flags:** Items that could surface in a board meeting. Example: "3 of 5 division leaders trending downward" or "E-Commerce has no VP-level leader with >6 months tenure." These are the things [CEO] needs to know before a board member asks.

### 5.3 Briefing Voice & Tone

The briefing reads like a trusted advisor wrote it, not like a reporting system generated it:

- **Use names, not IDs.** "Sarah has missed two Friday recaps" not "Employee #14 compliance flag."
- **Be specific about the "so what."** "John committed to the vendor proposal on March 25 and hasn't delivered" not "Commitment overdue."
- **Pre-draft in [CEO]'s voice.** The suggested emails/messages should sound like [CEO], not like a system. Casual, direct, human.
- **Don't over-alarm.** A single missed check-in is yellow, not red. The briefing helps [CEO] prioritize, not creates anxiety.
- **Celebrate wins.** The "On Track" section should occasionally highlight someone doing well. [CEO] sending a "nice work" note based on data they wouldn't otherwise have is a massive leadership signal.

### 5.4 Briefing Delivery

Daily at [BRIEFING_TIME]. Delivered as an email with:
- The briefing text in the email body (readable without opening attachments).
- An AI Instructions attachment (markdown) that allows [CEO]'s AI to parse the briefing and execute recommended actions.
- Pre-drafted emails as separate attachment(s) if applicable.
- Calendar invite file (.ics) if the briefing recommends scheduling a meeting.

The briefing email is self-contained. [CEO] can act on it from their phone in the car. No links to dashboards, no logins, no "go check the tracker." Everything they need is in the email.

### 5.5 Weekly Summary Layer

Every Friday, the briefing includes an additional section: the **Weekly Org Health Summary**.

- **Top 5 decisions [CEO] made this week** (based on actions taken from briefings).
- **Org health trend:** Improving, flat, or declining overall? Which division is trending which way?
- **Next week's watchlist:** Based on current trajectories, who/what should [CEO] be watching?
- **System health:** How much data is flowing in? Blind spots (leaders with no signal in 2+ weeks)?
- **Board-ready soundbites:** 2-3 sentences [CEO] can use verbatim if a board member asks "how's the team?"

---

## 6. Living 1-Pagers (Leader Intelligence)

Every leader in the system gets a living document in Brady's Notion backend. This is the convergence point — all input streams (OKR data, meeting signals, manager observations) flow into it.

### 6.1 Current State (AI-Rewritten)

The top section is a 3–5 sentence executive summary of where this person stands right now. It gets rewritten every time new data comes in. It answers three questions:

- **What are they working on?** (active objectives and current focus)
- **How are they performing?** (composite score, trajectory, any open signals)
- **What does [CEO] need to know?** (the single most important thing about this person right now)

This section is designed for a 15-second glance. [CEO] can pull up any leader, read the current state, and know exactly where things stand.

### 6.2 Enterprise Fields

For leaders at the VP tier and above, the 1-pager includes additional context:

| Field | Purpose |
|-------|---------|
| **Direct Reports Count** | Size of their organization |
| **Budget Responsibility** | Annual P&L or cost center size |
| **Board Interaction** | Frequency of board exposure (quarterly presenter, annual, none) |
| **Tenure & Background** | How long in role, where they came from, key relationships |
| **Succession Risk** | Low/Medium/High — what happens if they leave tomorrow? |
| **Strategic Bets** | Major initiatives they own that are on [CEO]'s radar |

### 6.3 Chronological Log (Append-Only)

Below the current state, a running log of every data point, newest first. Each entry is tagged with:
- Date
- Source (OKR submission, meeting transcript, manager note, system-generated signal)
- Content (the actual observation, score, or signal)

This log is never edited or deleted — only appended. The document tells the story of how the leader's situation evolved over time. Critical for performance conversations, where [CEO] needs to reference specific moments, and for the system's own trend detection.

---

## 7. The OKR Tracker (Employee-Facing Surface)

The only part of the system that employees interact with directly. A lightweight web app where leaders submit:

- **Monday Focus:** 3 focus areas for the week, one per objective category (Company, Team/Customer, Individual).
- **Friday Recap:** What got done, what didn't, why. Self-scored adherence per objective (0–100%).

### 7.1 Design Philosophy

- **2 minutes, twice a week.** If it takes longer, the form is wrong.
- **No dashboards.** Employees see their own submissions and nothing else. No leaderboards, no peer comparisons, no scores.
- **Dark-mode, mobile-first.** Leaders check this from their phone between meetings. It needs to feel fast and clean.
- **The tracker is the thin edge.** Employees interact with it. They have no idea what's behind it. The scoring, the 1-pagers, the briefing — invisible. As far as they know, this is a simple OKR check-in tool.

### 7.2 Employee Awareness

Employees use the OKR tracker and know they submit Monday/Friday check-ins. They do NOT know about the scoring, the 1-pagers, or the briefing. If this ever surfaces, the framing must be: "[CEO] is an engaged leader who pays attention" — not "a system is tracking you." This needs to be airtight.

---

## 8. MVP Implementation Plan

The MVP is intentionally small, manually operated, and designed to prove the logic before any automation is built.

### 8.1 Scope

**Leaders:** Start with [CEO]'s direct reports (8–12 people). This gives coverage at the C-Suite/SVP tier where signals matter most. Phase 2 expands to their directs (30–50 people total).

**Duration:** 4 weeks minimum. 8 weeks ideal. Longer than SMB deployments because enterprise data flows are slower and calibration against [CEO]'s intuition takes more cycles.

**Operator:** Brady runs it manually. [CEO] sends structured updates from their AI. Brady processes them, updates 1-pagers, runs the logic, generates the briefing, and sends it.

### 8.2 Success Criteria

The MVP succeeds if:

1. **[CEO] reads the briefing daily** and finds it useful (not annoying, not obvious, not noisy).
2. **The scoring logic produces ratings that [CEO] agrees with** when compared to their own gut sense of each leader.
3. **At least 2 risk signals are surfaced** that [CEO] wouldn't have caught on their own — or would have caught later.
4. **At least 1 positive signal surfaces** that leads [CEO] to send acknowledgment they otherwise wouldn't have.
5. **The skill file produces consistent, parseable output** from [CEO]'s transcription pipeline.
6. **[CEO] takes at least 5 actions directly from briefing recommendations** (sends a pre-drafted message, schedules a meeting, etc.).
7. **Weekly calibration sessions converge** — by week 4, system scores match [CEO]'s intuition >80% of the time.

### 8.3 What the MVP is NOT

- **Not automated.** Brady runs it by hand.
- **Not comprehensive.** Not every leader is covered (Phase 1 = directs only).
- **Not real-time.** Daily batch processing is fine.
- **Not connected to any external systems.** No calendar API, no email API, no Slack integration.
- **Not visible to the broader org.** Direct reports see the OKR tracker. They don't see the rest.

### 8.4 MVP-to-Scale Transition

When the MVP is validated ([CEO] confirms value, scoring logic is calibrated, skill file works reliably):

1. **[BUILDER] automates the handoff:** [CEO]'s AI output flows directly to Brady's Notion backend without manual copy-paste.
2. **Briefing delivery automates:** Daily email generation and sending at [BRIEFING_TIME].
3. **Expand to full leadership team:** All 30–50 leaders across [N] divisions.
4. **Add ingestion channels:** Calendar integration, email thread analysis, Slack signals (if applicable).
5. **Build the action layer:** Only after trust is established. AI-drafted emails that [CEO] approves before sending. AI-suggested calendar blocks. Never autonomous.

---

## 9. Enterprise Considerations

### 9.1 Legal & Compliance

Recording and analyzing meeting transcripts for leadership assessment may have legal implications depending on jurisdiction. Before deployment:

- Confirm recording consent requirements for all participants (one-party vs. two-party consent states).
- Review with [COMPANY]'s legal counsel whether any notification obligations exist.
- Ensure the system's framing aligns with existing performance management policies.
- Confirm data retention and access policies for the Notion backend.

### 9.2 Confidentiality Tiers

All system output is scored on two dimensions:

- **C (Confidentiality):** 0–10. Legal/professional risk if leaked. 10 = lawsuit territory.
- **V (Verification):** 0–10. Certainty level. 10 = direct quotes or firsthand experience.

Routing rules:
- **[CEO]-ready:** High V, low C. Clean narrative. No scores, no source headers.
- **Board-ready:** Same substance as [CEO]-ready, anonymized where appropriate.
- **System-internal:** Full scores, raw signals, trend data. Brady-only.
- **Verbal-only:** Anything C:7+. Never written down for external audiences.

### 9.3 Political Sensitivity

In large enterprises, leadership assessment is political. The system must be designed with this reality in mind:

- **No peer comparisons in any output [CEO] might share.** The briefing is for [CEO] only.
- **Positive signals are as important as negative.** If the system only surfaces problems, it becomes a weapon instead of a tool.
- **[CEO]'s direct observation overrides system scores.** When [CEO] says someone is doing well but the data disagrees, log the disagreement but defer to [CEO]. Over time, either [CEO] recalibrates or the data proves them right.
- **The system never recommends termination, PIP, or formal HR action.** It surfaces signals. [CEO] decides what they mean.

---

## 10. Modular Agent Architecture

The Cascading Accountability System is designed as one module in a broader advisory architecture. It can stand alone or integrate with complementary agents:

| Agent | Function | Data Flow |
|-------|----------|-----------|
| **Accountability Agent** (this system) | Performance tracking, risk flagging, CEO daily briefing | Feeds → Orchestrator |
| **HR Strategy Agent** | Behavioral profiles, compliance guidance, retention risk modeling | Feeds → Orchestrator |
| **Competitive Intelligence Agent** | Daily competitive briefing, market signals, industry trends | Parallel to Accountability |
| **Orchestrator Agent** | Synthesizes across all agents for a single executive interface | Consumes all feeds |

The Accountability Agent can be deployed first and independently. The Orchestrator design comes after the MVP is validated and [CEO] has confirmed the value of the daily briefing model.

---

## 11. Open Questions & Design Decisions

The following questions need resolution before or during the MVP:

1. **Scoring calibration:** The initial thresholds (75/50) are starting points. Recommend weekly calibration sessions where [CEO] reviews 2–3 leaders and we compare system scores to their intuition.

2. **Signal source weighting:** If [CEO]'s direct observation contradicts OKR data (they think someone is doing well but scores are low), which wins? Recommend [CEO]'s observation overrides, with a system note that data disagrees.

3. **Briefing length:** With 8–12 direct reports, the briefing is manageable. At 30–50, it could get long. The priority-ranked format ensures [CEO] sees red items first and can stop reading after 60 seconds if everything else is green.

4. **Transcript consistency:** How reliable is [CEO]'s current transcription pipeline? If the skill file produces inconsistent results across different LLMs, we may need to standardize or provide format examples.

5. **Feedback loop:** When [CEO] disagrees with a rating, that must flow back into the system. Simple mechanism: [CEO] replies to the briefing email with corrections, Brady adjusts the logic.

6. **Historical data bootstrapping:** Can we seed the 1-pagers with existing data (past performance reviews, org charts, tenure info) to avoid a cold start? Even basic context helps the system produce better Day 1 output.

7. **Division financial overlay:** How much AOP/P&L data flows into the division roll-ups? Ideal: quarterly actuals vs. plan. Minimum: directional trend (ahead/behind/on-track).

---

## 12. Immediate Next Steps

1. **Lock the scoring logic** — Review Section 3 with [CEO] (thresholds, weights, signal taxonomy). Calibrate before building.
2. **Write the skill file** — Turn Section 4 into an actual instruction document [CEO] can install in their AI project today.
3. **Design the briefing template** — Turn Section 5 into a working markdown template Brady can populate manually for the MVP.
4. **Build the Notion schema** — Create the databases from Section 2.3 in Brady's Notion backend.
5. **Select MVP cohort** — Identify the direct reports for the pilot.
6. **Deploy OKR tracker** — Lightweight web app for Monday/Friday check-ins.
7. **Run MVP** — 4–8 weeks of Brady operating the system manually, daily briefings to [CEO].
8. **Calibrate and iterate** — Weekly check-ins with [CEO] to tune scoring, adjust thresholds, refine briefing format.
9. **Hand off to [BUILDER] for automation** — Once logic is proven.

---

*— END OF DOCUMENT —*
