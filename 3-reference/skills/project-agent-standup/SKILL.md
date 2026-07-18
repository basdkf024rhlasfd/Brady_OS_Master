---
name: project-agent-standup
trust_tier: T1
description: >
  Daily unified agile ceremony for all active project agents. Combines design
  thinking, OKR review, sprint planning, sprint review, and retrospective into
  a single 5-phase standup per agent. Each agent has a defined role and is
  expected to demonstrate "natural inertia" — proactive forward pressure on
  both the engagement and the service model itself. Outputs a combined daily
  read-out to Notion and a gitted backup.

  Trigger this skill whenever Brady says "project standup", "run the standup",
  "agent standup", "daily standup", "project agent standup", "run the agents",
  "what are the agents working on", "engagement standup", or any variation
  requesting the daily project agent ceremony.

  This skill owns the daily project-agent ceremony. It does NOT own one-off
  agent sessions (summon the agent directly), weekly project audits
  (client-project-cleanup), or Musashi's agent-scoring tension pass
  (musashi-review). It DOES consume each agent's SKILL.md, wiki state,
  and SFDR inventory as inputs.
---

# Project Agent Standup — Daily Engagement Ceremony

## Why This Exists

Project agents (OC Optimus, Fran, and future instances) are session-based
today — summoned, used, dismissed. This means:

- No daily pressure on stale SFDRs, aging deliverables, or silent clients
- No continuous refinement of how the engagement is served (service model)
- No cross-agent learning (Fran doesn't benefit from Panda patterns)
- No persistent daily record Brady can scan across all engagements at once

This skill converts project agents from **on-demand tools** into **daily
practitioners** with standing obligations. Each agent runs a 5-phase ceremony
that mirrors the full agile stack — but compressed to consulting engagement
scale, not software sprint scale.

**Core principle — Natural Inertia:** Every standup must propose at least one
improvement to how the engagement is *served*, not just what's *delivered*.
The service model itself is a product under continuous development.

## Execution Environment

**Runs on:** Conductor remote agent (scheduled via `/schedule`) or manual trigger
**Schedule:** Daily at `0 10 * * *` CT — 5:00 AM CT (after Phil 4 AM, before morning sweep 6 AM)
**Expected runtime:** 3–6 minutes
**Access needed:** Notion MCP, local git repo, file system

**Notion DB IDs** (from `3-reference/infrastructure-registry.yml`):
- Streaming Notes: `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`
- Client Projects: `c8a6b2d70d9343839a16c950c95a6066`
- Internal Projects: `2c2ed43b-89c5-80af-ac9b-ededd48b98e7`
- Routing Log: `344ed43b-89c5-816a-ab54-ca49ca239748`

**Agent Wikis (Notion):**
- OC Optimus (Panda): `34aed43b-89c5-81a1-8593-dc4bef3c121d`
- Fran (1915 South): `34aed43b-89c5-8133-9f37-cae04045d8c7`

**Output locations:**
- Backup (persistent, gitted): `1-execution/areas/brady-os/project-agent-standups/YYYY-MM-DD.md`
- Notion handoff: one Streaming Notes row per run, `Type="Project Agent Standup"`
- Agent wikis: each agent's "Next Bests" and "Open Questions" sub-pages updated
- Routing Log: one row documenting the run

## Agent Roster & Roles

Each active project agent has a **standup role** that defines its posture in
the daily ceremony. Roles are not cosmetic — they shape what the agent
prioritizes and what "natural inertia" looks like for that engagement.

### OC Optimus — Role: **Engagement Architect**

Panda is pre-engagement (bidding for the work). OC Optimus's inertia is
toward **earning the meeting** — every standup output should make Brady
more prepared, more differentiated, and more dangerous when that meeting
happens. The service model question for OC Optimus: *How should Brady
structure the engagement if he wins it?*

- Owns: 14 research threads, 5 seeded SFDRs, James Ku relationship cadence
- Daily pressure: Are research threads still current? Has anything happened in
  QSR/Panda news that changes the problem portfolio? Is the pitch sharper
  than yesterday?
- Service model tension: What engagement structure (retainer, project-based,
  embedded, advisory board seat) best fits what Brady knows about Panda's
  governance and decision speed?

### Fran — Role: **Engagement Accelerator**

1915 South is post-teaser (waiting on Justin's response). Fran's inertia is
toward **shortening the sales cycle** without appearing desperate — every
standup should identify moves that create pull (not push) toward engagement
commitment. The service model question for Fran: *What would make Justin
feel like he can't afford to wait?*

- Owns: Innovation Workshop (39 ideas), M&A deep research, 11 seeded SFDRs,
  Justin relationship cadence
- Daily pressure: Has Justin responded? Is the follow-up cadence right? Are
  SFDRs aging past usefulness? Can any research be refreshed to stay sharp?
- Service model tension: Is Advisory + keep mception (Scenario C) still the
  right opening position? What would cause Brady to shift to A or B?

### Adding New Agents

When a new project agent is instantiated (via `project-agent` skill), add it
to this roster with:
1. Agent name and engagement context
2. Standup role (one of: Engagement Architect, Engagement Accelerator,
   Engagement Operator, Engagement Closer — or propose a new role with Brady)
3. What "natural inertia" means for that engagement phase
4. The service model question it's always asking

---

## The 5-Phase Standup

Run all phases for each agent sequentially, then compile the combined read-out.

### Phase 1 — Sprint Review (What Shipped)

Load the agent's SKILL.md and wiki. Answer:

1. **Last action date** — When did this engagement last move? (deliverable
   shipped, email sent, meeting held, SFDR answered)
2. **Did it land?** — Was there a client response? A visible outcome?
3. **Staleness score** — Days since last meaningful engagement activity.
   - 0–3 days: ACTIVE
   - 4–7 days: COOLING
   - 8–14 days: STALE
   - 15+ days: AT RISK

Output: One line per item. No prose.

### Phase 2 — OKR Pulse (Are We on Track)

Each engagement has implicit OKRs derived from its phase:

**Pre-engagement (OC Optimus pattern):**
- KR1: Research completeness (% of critical threads with actionable findings)
- KR2: Pitch readiness (can Brady walk into a meeting today and win?)
- KR3: Relationship warmth (days since last client signal, quality of signal)

**Post-teaser (Fran pattern):**
- KR1: Response rate (has the client engaged with shipped materials?)
- KR2: Deal velocity (days from teaser to next substantive interaction)
- KR3: Competitive position (is Brady's offering differentiated enough to
  survive "we'll think about it"?)

**Active engagement (future pattern):**
- KR1: Deliverable cadence (are we shipping on rhythm?)
- KR2: Client satisfaction signals (meeting quality, follow-up speed, scope expansion)
- KR3: Revenue realization (invoiced vs. pipeline)

Score each KR: ON TRACK / AT RISK / BEHIND. One sentence of evidence per score.

### Phase 3 — Design Thinking Check (Right Problem?)

The most important phase. Answer:

1. **Empathy pulse** — What does the client need *right now*, today, based on
   everything we know? Not what we're building — what they're feeling.
2. **Problem reframe** — Has anything changed (market news, competitor moves,
   internal signals) that should shift which problem we're solving?
3. **Assumption test** — Name one assumption we're operating on that hasn't
   been validated. What would change if it's wrong?

This phase prevents the classic consulting failure: delivering an excellent
answer to the wrong question.

### Phase 4 — Sprint Planning (Next 3 Moves)

Propose exactly 3 next actions ranked by unlock potential:

| # | Action | Owner | Unlock | Effort | Gate |
|---|--------|-------|--------|--------|------|
| 1 | ... | Brady/Agent/Client | What it unblocks | S/M/L | What must be true first |
| 2 | ... | | | | |
| 3 | ... | | | | |

**Gate** is the constraint that prevents premature execution. Examples:
"Justin responds first," "Market data refreshed," "Brady approves scope shift."

Actions must be concrete enough that Brady can execute them in one sitting.
"Continue research" is not an action. "Run DR-03 refresh with April QSR earnings
data" is.

### Phase 5 — Service Model Tension (How We Serve)

This phase is what creates **natural inertia toward a better service model**.
Answer:

1. **Current service posture** — How is Brady serving this client today?
   (advisory, deliverable-heavy, research-first, embedded, arms-length)
2. **Service friction** — What about the current model is slowing the
   engagement down or limiting its ceiling?
3. **Service evolution proposal** — One specific change to how Brady serves
   this client that would increase value delivered per hour of Brady's time.
   Frame it as: "If we shifted from [current] to [proposed], the unlock
   would be [specific outcome]."
4. **Service model score** — Rate current service model 1–10 on:
   - Client value per Brady hour
   - Scalability (could this model work with 5 clients?)
   - Defensibility (how hard to replicate without Brady's OS?)

This phase compounds. Over weeks, the daily tension creates a clear
trajectory toward the ideal engagement model — not through grand redesigns,
but through daily 1% improvements.

---

## Output Format

### Per-Agent Block

```markdown
## [Agent Name] — [Role] | [Date]

**Engagement:** [Client] | **Phase:** [Pre/Post/Active] | **Staleness:** [ACTIVE/COOLING/STALE/AT RISK]

### Sprint Review
- Last action: [date] — [what happened]
- Client response: [yes/no/pending] — [detail]

### OKR Pulse
| KR | Status | Evidence |
|----|--------|----------|
| KR1 | ON TRACK | ... |
| KR2 | AT RISK | ... |
| KR3 | BEHIND | ... |

### Design Thinking Check
- **Empathy:** [what the client needs right now]
- **Reframe:** [any problem shifts] or "Holding steady"
- **Assumption at risk:** [name it + consequence if wrong]

### Sprint Plan
| # | Action | Owner | Unlock | Effort | Gate |
|---|--------|-------|--------|--------|------|
| 1 | ... | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... | ... |

### Service Model Tension
- **Current posture:** [description]
- **Friction:** [what's limiting]
- **Evolution:** If we shifted from [X] to [Y], the unlock would be [Z]
- **Score:** Value [n]/10 | Scale [n]/10 | Defend [n]/10
```

### Combined Read-Out (Notion)

The Streaming Notes row contains a compact version:

```
PROJECT AGENT STANDUP — [DATE]

[Agent 1]: [Staleness] | KRs: [summary] | Next: [top action] | Service: [score]
[Agent 2]: [Staleness] | KRs: [summary] | Next: [top action] | Service: [score]

Cross-agent signal: [any pattern that spans engagements]
```

### Cross-Agent Learning Section

After all agents run, add a brief cross-agent section:

1. **Pattern match** — Any insight from one engagement that applies to another?
   (e.g., a Panda governance insight that maps to 1915 South family dynamics)
2. **Service model convergence** — Are the agents trending toward similar
   service model conclusions? If so, that's Brady's emerging consulting identity.
3. **Brady bottleneck** — Is Brady the constraint on any engagement? What
   could be delegated to an agent or automated?

---

## Backup & Handoff

### Gitted backup

Write full output to:
`1-execution/areas/brady-os/project-agent-standups/YYYY-MM-DD.md`

Include frontmatter:
```yaml
---
date: YYYY-MM-DD
agents: [oc-optimus, fran]
staleness: {oc-optimus: ACTIVE, fran: COOLING}
service_scores: {oc-optimus: {value: 7, scale: 5, defend: 8}, fran: {value: 6, scale: 4, defend: 7}}
---
```

### Streaming Notes row

Create one row:
- Type: "Project Agent Standup"
- Status: "Done"
- Priority: "Should"
- Source: "Conductor"
- Name: "Project Agent Standup — YYYY-MM-DD"
- Content: compact read-out (see format above)

### Agent Wiki Updates

For each agent, update these Notion wiki sub-pages:
- **Next Bests** — Replace with Phase 4 sprint plan
- **Open Questions** — Append any new assumptions from Phase 3

### Routing Log

Append one row:
- date: YYYY-MM-DD
- original_title: "Project Agent Standup"
- destination: Streaming Notes + agent wikis + gitted backup
- reason: "Daily engagement ceremony"
- summary: "[N] agents reviewed. [staleness summary]. Top action: [highest-priority action across all agents]."

---

## Consumption by Morning Sweep

Morning sweep reads the `Type="Project Agent Standup"` row in Phase 1
alongside Phil's Pre-Sweep Primer and Musashi's Review. It surfaces:

- Any agent at STALE or AT RISK staleness
- Any KR scored BEHIND
- The top sprint action across all engagements (if Brady-owned)
- Any service model evolution proposals scoring > current

This means Brady's morning starts with engagement-aware context without
having to open each agent separately.

---

## Guard Rails

1. **No client contact.** The standup never drafts emails, messages, or
   communications to clients. It proposes actions — Brady executes.
2. **No scope changes.** If Phase 3 identifies a problem reframe, it's
   surfaced as a flag, not enacted. Brady decides scope.
3. **No deliverable generation.** The standup identifies what should be
   built next, not builds it. That's a separate session.
4. **Staleness alerts only — no auto-escalation.** AT RISK status is
   a flag, not a trigger. Brady decides when to re-engage.
5. **Service model proposals are proposals.** Score them, surface them,
   but never assume Brady will adopt them. Track adoption over time in
   the gitted backup history.
6. **Hard stop: 20-minute runtime.** If the standup exceeds this, something
   is wrong with data access. Abort and flag.

---

## First-Run Checklist

- [ ] Both agent SKILL.md files readable and current
- [ ] Both agent Notion wikis accessible
- [ ] Streaming Notes DB writable
- [ ] Routing Log writable
- [ ] Backup directory exists: `1-execution/areas/brady-os/project-agent-standups/`
- [ ] Morning sweep SKILL.md updated to consume `Type="Project Agent Standup"` rows
- [ ] OC Optimus wiki "Next Bests" sub-page exists
- [ ] Fran wiki "Next Bests" sub-page exists
