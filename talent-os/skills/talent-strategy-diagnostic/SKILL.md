---
name: talent-strategy-diagnostic
trigger: "run the talent diagnostic", "diagnose our hiring", "here are my interview notes", "what's broken", "where do we start"
input: stakeholder interview notes/transcripts + any people data (roster, funnel metrics, exit data, current postings)
output: deliverables/talent-diagnostic-<subject>-YYYY-MM-DD.md
mode: Diagnose
---

# Talent Strategy Diagnostic

**This is the front door of Talent OS.** When Brandon has interviewed people at the client
about talent/HR and gathered some data, he drops it here and gets back a diagnosis: where the
funnel actually leaks, root cause vs. symptom, a prioritized fix roadmap, and exactly which
other skills to run next. It turns raw discovery into a plan.

## When to use

- Kickoff of an engagement, after stakeholder interviews.
- Any time Brandon says "here's what I learned, what do we do?"
- Whenever a request is a *problem* ("hiring is broken", "we can't keep people") rather than a
  named deliverable — route it through here first.

## Inputs (drop in `intake/interviews/` and `intake/data/`)

Use whatever exists; note what's missing. Common inputs:
- Interview notes or transcripts (People/HR lead, store managers, top performers, recent leavers)
- Current job posting(s)
- Funnel/ATS metrics (applies, screens, interviews, offers, hires, time-to-fill by role/location)
- Roster export (headcount, tenure, location, role)
- Exit/turnover data or review-site themes
- Comp/plan documents

## Process

1. **Load context.** Read `reference/company-context.md`, `reference/retail-sales-hiring.md`, and
   `reference/hr-playbook.md`. Then read everything Brandon dropped in `intake/`.
2. **Map the funnel.** Lay the client's reality onto the funnel:
   `Source → Apply → Screen → Interview → Offer → Accept → Onboard → Ramp → Productive → Retain`.
   For each stage, capture what you *know* and mark what you're *inferring* vs. what's evidenced.
3. **Locate the leaks.** For every stage, ask: is this healthy, leaking, or unknown? Cite the
   evidence (a quote, a metric, an absence of data). Rank leaks by size × fixability.
4. **Separate symptom from root cause.** "Managers don't follow up" is a symptom; the root cause
   might be no ownership, no tooling, no incentive, or no scorecard. Name the root cause — that's
   what the fix targets. Use the 5-Whys where the cause isn't obvious.
5. **Size each problem** Small (tactical, <1 wk) / Medium (cross-functional, 2–4 wk) / Large
   (structural, >1 mo), and tag it to the People pillar (TA / resource planning / training /
   culture / total rewards).
6. **Build the roadmap.** Two lanes:
   - **Quick wins** — shippable in days, no dependency on IT/system access (e.g. rewrite the
     posting, build the interview guide, stand up a screening rubric).
   - **Structural** — needs sequencing, access, or org change (e.g. automated pipeline against
     the ATS API, workforce model, comp redesign).
   Order by value/effort. Flag anything blocked on access so it's sequenced realistically.
7. **Route to skills.** For each roadmap item, name the Talent OS skill that produces it and the
   input it needs. This is the hand-off that turns diagnosis into deliverables.
8. **List open questions / missing data** as `SFDR`-style items (specific, feasible, ranked) so
   Brandon knows exactly what to ask the client next.

## Output spec

Write to `deliverables/talent-diagnostic-<subject>-YYYY-MM-DD.md`:

1. **Headline** — the one-sentence read on what's actually wrong (e.g. "The pool is fine; the
   pipeline dies in follow-up — this is an ops + tooling problem, not a marketing problem").
2. **Funnel map** — table: stage | health (🟢/🟡/🔴/❓) | evidence | leak size.
3. **Root-cause findings** — 3–6 findings, each: symptom → root cause → size → pillar → evidence.
4. **Roadmap** — Quick wins table + Structural table, each row: item | why | skill to run | input
   needed | dependency/blocker | rough effort.
5. **Recommended first 3 moves** — opinionated, sequenced, with the exact skill invocation.
6. **Open questions / data to request** — ranked list for the next client touch.
7. **⏳ WAITING ON YOU** — what Hunter needs to proceed (approvals, missing inputs, which of the
   3 first moves to fire).

## Quality bar

- Every finding is tied to evidence from the input — no generic "you should have a scorecard"
  unless the input shows the gap. If evidence is thin, say so and mark it an assumption.
- Opinionated. Brandon can dial back a strong recommendation; he can't act on a mushy one.
- The roadmap must be *runnable* — every item maps to a real skill and a real input.

## Guardrails

- Don't fabricate metrics. If there's no funnel data, the funnel map runs on qualitative evidence
  and flags the missing numbers as the first data request.
- Apply the compliance lens (`hr-playbook.md` §5) — if discovery surfaces a legal-risk practice
  (illegal interview questions, a gating assessment, blanket background bars), flag it as a
  finding regardless of what else is going on.
- Genericize to roles when anything from this diagnostic gets promoted to `reference/`.

## Example

> **Brandon:** I interviewed the People lead and three store managers — notes are in
> intake/interviews. Also dropped the current RSA posting and a rough funnel export. Run the diagnostic.

Hunter produces `deliverables/talent-diagnostic-rsa-hiring-2026-07-18.md` with the funnel map,
the "follow-through gap is the real leak" headline, a quick-wins lane (rewrite posting → jd-optimizer;
build guide → interview-guide-builder; stand up screening → candidate-screener), a structural lane
(automated daily shortlist against Workable/Indeed), and the 3 first moves.
