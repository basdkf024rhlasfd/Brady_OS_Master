---
name: claudine-scorecard
description: >
  Objective scorecard for Claudine's performance against Brady's goal — a compounding
  OS where Brady operates at the ARC horizon only and agents handle everything else.
  Replaces the subjective Jarvis Score with measurable KPIs sourced from Streaming
  Notes, git history, Finn, and Phil/Musashi outputs. Every metric has a formula,
  a data source, and a scoring band. No vibes.

  Trigger this skill when Brady says "score claudine", "claudine scorecard",
  "how are we doing", "weekly scorecard", or on the weekly sweep cadence (Sunday).

  Replaces the subjective dimension scoring in claudine-onboarding/SKILL.md Section
  "Jarvis Score." That section stays as a UI footer concept but this is the canonical
  measurement.
trust_tier: T1
---

# Claudine Scorecard — Objective Measurement

## Why This Exists

The original Jarvis Score asked Claudine to rate herself on 7 dimensions 0–5. That's self-reporting — it drifts toward whatever Claudine wants to believe. This scorecard replaces self-report with instrumented queries against real data sources.

Every KPI below answers: **Is Claudine creating the current, or swimming in it?**

## The Overarching Goal (Brady's North Star)

Brady operates at the ARC horizon (where to play, how to win). Everything at Day and Cycle horizons — captures, triage, build scaffolding, client admin, household logistics — gets absorbed by agents and the OS. End state: Brady manages everything from AirPods, and product ships / consulting delivers / family logistics run without him in the middle of any handoff.

Hard goal stapled to the top: **$200K+ independent revenue by Q4 2026.**

Three tiers beneath:
1. **Personal OS** — cognitive prosthesis (Claudine lives here)
2. **Consulting engine** — Panda, 1915 South, Consulting OS Platform
3. **Commercial products** — Broker Platform + future verticals

## The North Star KPI

**Hands-Off Index (HOI)** — % of Streaming Notes items that close without Brady touching them.

**Formula:**
```
HOI = COUNT(items closed in last 30 days WHERE Source IN ["Code", "Cowork", "Execution"])
      / COUNT(items closed in last 30 days)
```

Source: Streaming Notes DB `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`. Filter: `Status IN ["Complete", "Remove"] AND Last Modified >= now - 30 days`.

**Scoring band:**
| HOI | Score |
|---|---|
| ≥70% | 10 |
| 50-69% | 7 |
| 30-49% | 5 |
| <30% | 2 |

**Target trajectory:** Baseline today ~20% (estimate). Target Q4 2026: 70%.

---

## KPIs by Tier (all instrumented unless flagged)

### Tier 1 — Signal Compression (Claudine's primary job)

**K1. Chat-source capture rate** — how often Brady has to open a session to capture something.
```
K1 = COUNT(Streaming Notes WHERE Source="Chat" AND Created Date >= now - 7 days) / 7
```
| K1 (per day) | Score |
|---|---|
| <3 | 10 |
| 3-6 | 7 |
| 6-10 | 5 |
| >10 | 2 |

Interpretation: low = Claudine/Telly/agents are absorbing captures. High = Brady is still the capture surface.

---

**K2. Morning push self-sufficiency** — % of mornings where Brady doesn't re-engage within 2h of Phil's push.
```
K2 = COUNT(mornings in 14-day window where no Chat-source Streaming Note created
           within 2h of Phil's Pre-Sweep Primer time)
     / COUNT(mornings where Phil Pre-Sweep Primer landed)
```
Source: Streaming Notes `Type="Pre-Sweep Primer"` Created Date + subsequent Chat-source notes.

| K2 | Score |
|---|---|
| ≥80% | 10 |
| 60-79% | 7 |
| 40-59% | 5 |
| <40% | 2 |

---

**K3. Jarvis composite (retained, de-subjectified)** — only measurable dimensions count.

Drop the subjective dimensions (D1 Recursive Learning, D7 Decision Support). Keep:
- D4 Execution Hygiene → proxy: K5 + K7 below
- D5 Memory Processing → proxy: K4 (processing score)
- D6 Calendar Protection → new formula below

**D6 Calendar Protection:**
```
D6 = 1 - (COUNT(Calendar events created in work-hours 9-5 CT weekdays in last 7 days
           WHERE attendees >= 2 AND NOT initiated by Brady)
     / COUNT(Calendar events in work-hours 9-5 CT weekdays in last 7 days))
```
| D6 | Score |
|---|---|
| ≥90% | 10 |
| 75-89% | 7 |
| 60-74% | 5 |
| <60% | 2 |

K3 composite = average of K4, K5, K7, D6 (all already measurable).

---

### Tier 2 — Pipeline Velocity

**K4. Streaming Notes processing score** — already instrumented by processor Phase 4.2.

Source: `1-execution/areas/brady-os/processing-scores/YYYY-MM.md`, 7-day rolling average of `daily_score`.
```
K4 = mean(daily_score over last 7 days)  # scale already 0-10
```
Score = K4 directly (already 0-10).

---

**K5. Capture-to-closure median latency** — how fast items move through.
```
K5 = median(Last Modified - Created Date) for items closed in last 30 days
     WHERE Status IN ["Complete", "Remove"]
     AND Type NOT IN ["Pulse Log", "Daily State"]  # exclude auto-archive
```
| K5 (hours) | Score |
|---|---|
| <48 | 10 |
| 48-96 | 7 |
| 96-168 | 5 |
| >168 | 2 |

---

**K6. Orphan backlog p90 age** — how old the oldest loose build-shape items are.
```
candidates = Streaming Notes WHERE
  Type IN ["Pulse Note", "Note", "Thread Log"]
  AND (Name OR content) contains any of {"build","feature","wire","deploy","scaffold",
       "app","platform","agent","integrate","API","MCP","pipeline"}
  AND Status NOT IN ["Complete", "Remove"]
  AND Done != "__YES__"
  AND Action IS NULL
  AND Created Date < now - 48h
K6 = p90(now - Created Date) for candidates
```
| K6 (days) | Score |
|---|---|
| <7 | 10 |
| 7-14 | 7 |
| 14-21 | 5 |
| >21 | 2 |

---

**K7. Cluster conversion rate** — % of batched items that actually closed at their calendar slot.
```
numerator = COUNT(Streaming Notes WHERE Type="Note" AND Name LIKE "Batch:%"
                  AND Status="Complete" AND Created Date >= now - 14 days)
denominator = COUNT(Streaming Notes WHERE Type="Note" AND Name LIKE "Batch:%"
                    AND Created Date >= now - 14 days)
K7 = numerator / denominator
```
| K7 | Score |
|---|---|
| ≥85% | 10 |
| 70-84% | 7 |
| 50-69% | 5 |
| <50% | 2 |

---

### Tier 3 — Autonomy Trust

**K8. T1 auto-approval reversal rate** — how often Brady vetoes Musashi T1 auto-approvals.
```
approvals = COUNT(Streaming Notes WHERE Type="Musashi Review"
                  AND body contains "Approved (T1 auto)" in last 30 days)
vetoes = COUNT(Streaming Notes WHERE Source="Chat" AND body contains "veto "
               AND Created Date >= now - 30 days)
K8 = vetoes / max(approvals, 1)
```
| K8 | Score |
|---|---|
| <10% | 10 |
| 10-19% | 7 |
| 20-30% | 5 |
| >30% | 2 |

---

**K9. Drift events per week** — count of structural drift flags Phil/Musashi raised.
```
K9 = COUNT(Phil Pre-Sweep Primer "Coherence Flags" entries in last 7 days)
   + COUNT(Musashi Review "Notes from Musashi's Lens" flags in last 7 days)
```
Source: `1-execution/areas/brady-os/phil-morning-audits/*.md` (last 7 days, grep flag sections) + `1-execution/areas/brady-os/musashi-reviews/*.md`.

| K9 | Score |
|---|---|
| ≤1 | 10 |
| 2-3 | 7 |
| 4-5 | 5 |
| >5 | 2 |

---

**K10. Skills age p90** — "skeptical of stale processes" made measurable.
```
for each SKILL.md in 3-reference/skills/ and 0-agents/custom-built-agents/:
  last_touch = git log -1 --format="%at" -- <path>
  age_days = (now - last_touch) / 86400
K10 = p90(age_days)
```
| K10 (days) | Score |
|---|---|
| <21 | 10 |
| 21-45 | 7 |
| 45-90 | 5 |
| >90 | 2 |

Current state (2026-04-24): oldest skill is 6 days → K10 = 10.

---

### Tier 4 — Commercial Output

**K11. Independent revenue progress** — year-to-date, annualized.
```
K11 = (YTD independent revenue as of measurement date)
      × (365 / days elapsed in year)
```
Source: Finn Monarch export + consulting pipeline.

| K11 annualized | Score |
|---|---|
| ≥$200K | 10 |
| $150-200K | 7 |
| $100-150K | 5 |
| <$100K | 2 |

---

**K12. Platforms live on mception.ai** — count of {broker, consulting-os} slugs live.
```
K12 = COUNT(lines in portal/src/config/projects.yml matching "^  - slug: (broker|consulting-os)")
```
| K12 | Score |
|---|---|
| 2 | 10 |
| 1 | 5 |
| 0 | 0 |

---

**K13. New skills shipped per week** — velocity of new capability.
```
K13 = COUNT(git log --since="7 days ago" --diff-filter=A --name-only
            -- '3-reference/skills/*/SKILL.md' '0-agents/custom-built-agents/*-SKILL.md')
```
| K13 | Score |
|---|---|
| ≥2 | 10 |
| 1 | 7 |
| 0 | 3 |

---

**K14. Execution Request → PR latency** — median time from build request captured to PR merged.
```
For each Streaming Note WHERE Type="Execution Request" AND Status="Complete" in last 30 days:
  closure_time = Last Modified - Created Date
K14 = median(closure_time)
```
Caveat: doesn't require PR correlation; just uses item closure as proxy. Improves when we wire PR-to-Streaming-Note linking (aspirational).

| K14 (days) | Score |
|---|---|
| <3 | 10 |
| 3-7 | 7 |
| 7-14 | 5 |
| >14 | 2 |

---

### Tier 5 — Knowledge Accumulation (the ever-growing KB)

**K16. Research Score (composite, 0–10)** — is the Research Library becoming an asset, or a graveyard?

Composed of three pressures that must all be active:

**K16a. Indexed Reports (0–3)** — keep capturing.
```
library_count = COUNT(rows in Research Library DB 4f87259b-e9a7-4d35-86ba-2148cb472d0f
                     WHERE Status = "Active")
K16a = min(3, floor(library_count / 25))
```
| library_count | K16a |
|---|---|
| ≥75 | 3 |
| 50-74 | 2 |
| 25-49 | 1 |
| <25 | 0 |

**K16b. Project Coverage (0–3)** — every active engagement has a real research spine.
```
active_projects = {Panda, 1915 South, + any Client Relevance tag with ≥1 Streaming Note
                   written in last 30d for that project}
for each active project p:
  coverage[p] = COUNT(Research Library rows WHERE Client Relevance CONTAINS p
                     AND Status = "Active")
K16b = min(3, COUNT(p WHERE coverage[p] >= 10))
```
| projects_with_≥10_sources | K16b |
|---|---|
| ≥3 | 3 |
| 2 | 2 |
| 1 | 1 |
| 0 | 0 |

**K16c. Leverage (0–4)** — the anti-graveyard metric. Research must get used.
```
K16c = sum(Reference Count increments on Research Library rows in last 30 days)
     / 5  (cap at 4)
```
| references_30d | K16c |
|---|---|
| ≥20 | 4 |
| 15-19 | 3 |
| 10-14 | 2 |
| 5-9 | 1 |
| <5 | 0 |

**K16 composite = K16a + K16b + K16c** (max 10, no averaging — sum of three forces).

**Interpretation:** A 10 means you're stocking the library, every client has ≥10 sources, and the library is being retrieved into deliverables. Scoring <5 surfaces specific proposed fixes:
- K16a low → run `deep-research` on the weakest-covered topic tag
- K16b low → identify the bare project and schedule a research sprint for it
- K16c low → library is write-only; wire more retrieval into `exec-intel-brief` / project agents

---

### The Single Meta-Question

**K15. Ship-to-Signal Ratio** — are we shipping faster than we're surfacing?
```
shipped = COUNT(Streaming Notes closed (Complete OR Remove) in last 7 days
                WHERE Type NOT IN ["Pulse Log", "Daily State"])
surfaced = COUNT(Streaming Notes WHERE Source="Chat" AND Created Date >= now - 7 days)
          + COUNT(items flagged in Phil primers in last 7 days)
K15 = shipped / max(surfaced, 1)
```
| K15 | Score |
|---|---|
| ≥2.0 | 10 |
| 1.0-1.99 | 7 |
| 0.5-0.99 | 5 |
| <0.5 | 2 |

---

## Composite Score

```
Claudine Score = ROUND(
    (HOI × 2.0)        # double weight on North Star
  + (K1 × 1.0)
  + (K2 × 1.0)
  + (K3 × 1.0)
  + (K4 × 1.0)
  + (K5 × 1.0)
  + (K6 × 1.0)
  + (K7 × 1.0)
  + (K8 × 1.0)
  + (K9 × 0.5)
  + (K10 × 0.5)
  + (K11 × 2.0)        # double weight on revenue
  + (K12 × 1.0)
  + (K13 × 1.0)
  + (K14 × 1.0)
  + (K15 × 1.5)        # 1.5x weight on the meta ratio
  + (K16 × 1.5)        # 1.5x weight on the KB (compounding asset)
) / 19.0                # sum of weights
```
Result: 0–10 scale. Reported weekly.

## Execution Protocol

**Cadence:** Weekly, runs as a phase of `weekly-sweep`. Also triggerable on demand via "score claudine" or "claudine scorecard".

**Runtime:** 3–5 minutes (Notion queries + git stats).

**Output format:**
```
📊 Claudine Scorecard — {YYYY-MM-DD}

North Star (HOI): {value}% → {score}/10

Tier 1 — Signal Compression
  K1 Chat-source captures/day: {value} → {score}/10
  K2 Morning push self-sufficiency: {value}% → {score}/10
  K3 Jarvis composite (instrumented): {score}/10

Tier 2 — Pipeline Velocity
  K4 Processing score (7d avg): {score}/10
  K5 Capture-to-closure median: {value}h → {score}/10
  K6 Orphan backlog p90 age: {value}d → {score}/10
  K7 Cluster conversion: {value}% → {score}/10

Tier 3 — Autonomy Trust
  K8 T1 veto rate: {value}% → {score}/10
  K9 Drift events/week: {value} → {score}/10
  K10 Skills age p90: {value}d → {score}/10

Tier 4 — Commercial Output
  K11 Revenue annualized: ${value}K → {score}/10
  K12 Platforms live: {value} → {score}/10
  K13 New skills/week: {value} → {score}/10
  K14 Execution Request → close median: {value}d → {score}/10

Tier 5 — Knowledge Accumulation
  K16 Research Score: {a}+{b}+{c}={total}/10
       ├─ Indexed Reports: {library_count} → {K16a}/3
       ├─ Project Coverage: {n_projects_covered}/3 projects w/ ≥10 sources → {K16b}/3
       └─ Leverage (30d refs): {ref_count} → {K16c}/4

Meta
  K15 Ship-to-Signal Ratio: {value} → {score}/10

━━━━━━━━━━━━━━━━━━━━━
Claudine Composite: {score}/10
Week-over-week: {arrow} {delta}

Biggest mover up: {metric} ({from}→{to})
Biggest mover down: {metric} ({from}→{to})

Surfaced actions: (if any metric scored < 5)
- {metric} scored {score}/10. Proposed fix: {action}. Park as Execution Request? (y/n)
```

**Storage:** Append one row per weekly run to `1-execution/areas/brady-os/claudine-scorecard/YYYY-MM.md` with schema: `| Date | Composite | HOI | K1 | K2 | ... | K15 |`.

**Routing Log:** One row per run per `3-reference/skills/_shared/routing-log.md` standard.

## What To Do When Scores Drop

A dropping metric is a signal, not a scold. The skill auto-proposes a fix for any metric scoring <5:

| Drop | Likely cause | Auto-proposed action |
|---|---|---|
| K1 rising | Too many Chat captures — automations aren't absorbing | Propose new auto-triage rule in processor |
| K2 dropping | Phil push missing info Brady needs | Review Phil output vs Brady's follow-up pattern |
| K5 rising | Items aging in the queue | Re-tune processor SLAs or add auto-close for stale types |
| K6 rising | Orphans accumulating | Run orphan disposition pass |
| K8 rising | Too many T1 vetoes | Musashi's T1 bar is too loose — tighten scoring criteria |
| K9 rising | Drift is winning | Phil/Musashi need more authority or a new drift-detection pass |
| K10 rising | Skills rotting | Run doctrine-sync + identify deprecation candidates |
| K13 dropping | Ship velocity collapsing | Check if too much time in maintenance vs new capability |
| K15 < 1.0 | Swimming, not steering | This is the loud alarm. Stop everything. Commissioner review. |
| K16a dropping | Capture rate falling | Wire more Research intake — add topic tags, prompt Telly capture |
| K16b dropping | Client coverage bare | Run deep-research on the specific under-covered project |
| K16c dropping | Library is write-only (graveyard risk) | Audit retrieval paths in exec-intel-brief, project agents, deep-research |

The scorecard auto-parks each proposed fix as a Streaming Note `Type="Execution Request"` with Priority matching the severity of the drop.

## Instrumentation Status

| KPI | Status | Blocker (if aspirational) |
|---|---|---|
| HOI | ✅ Instrumented | — |
| K1-K2, K4-K7, K9-K10, K12-K15 | ✅ Instrumented | — |
| K3 D6 Calendar Protection | 🟡 Partial | Needs "initiated by Brady" detection — proxy via event creator field |
| K8 T1 auto-approval tracking | 🟡 Partial | Requires Musashi to mark "Approved (T1 auto)" in body consistently — wire on first auto-approval cycle |
| K11 Revenue | ✅ Instrumented | Finn reads Monarch CSV |

## What This Skill Does NOT Do

- Does not replace weekly-sweep or daily-operating-rhythm — runs as a subphase
- Does not modify any Streaming Notes items — read-only against the DB
- Does not send email, render PDF, or push to Telly (yet — that's a V2 feature)
- Does not score Claudine subjectively. No self-assessed dimensions.
- Does not excuse drops. Every sub-5 score surfaces a proposed action.

## Data Dependencies

- Streaming Notes DB `2e9ed43b-89c5-80f4-8c21-000b4cfe812e`
- Research Library DB `4f87259b-e9a7-4d35-86ba-2148cb472d0f` (data source `12917822-36ca-4ccd-9763-538226844015`)
- Processing score log `1-execution/areas/brady-os/processing-scores/`
- Phil audits `1-execution/areas/brady-os/phil-morning-audits/`
- Musashi reviews `1-execution/areas/brady-os/musashi-reviews/`
- Finn Monarch export + consulting pipeline
- Git log (skill ages, new skill velocity)
- `portal/src/config/projects.yml` (platform count)
- Google Calendar (D6 calendar protection)

## Relationship to Other Skills

- **weekly-sweep** invokes this as a phase
- **claudine-onboarding** references this for the canonical scoring (supersedes the subjective Jarvis Score)
- **musashi-review** feeds K8 + K9
- **phil-pre-sweep** feeds K2 + K9
- **finn** feeds K11
- **commissioner-brief** can embed the composite score as context

Brady reads the scorecard, not the dashboard. This is the dashboard.
