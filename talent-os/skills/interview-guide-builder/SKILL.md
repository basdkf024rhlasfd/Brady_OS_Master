---
name: interview-guide-builder
trigger: "build an interview guide", "structured interview for [role]", "make a scorecard", "give managers an interview kit"
input: a JD or role definition (+ optional: competencies, top-performer profile, interview stages)
output: deliverables/interview-guide-<role>-YYYY-MM-DD.md (manager-ready interview kit)
mode: Build
---

# Interview Guide Builder

Produces a **structured interview kit a store manager can run today** without HR in the room:
a role scorecard, an anchored rubric, a stage-by-stage question bank, and a legal do-not-ask
list. It replaces "every manager interviews differently" with one consistent, defensible process
— which is both better hiring and EEOC insurance.

## Why it matters here

The client pushed interviewing down to store managers with no shared definition of "good." This
skill gives every manager the same scorecard and questions, so the decision is consistent, the
signal is comparable across candidates, and the process is legally clean.

## Inputs (drop in `intake/roles/`)

- A JD (ideally the `jd-optimizer` output) **or** a role description.
- Optional but valuable: the top-performer profile / "what good looks like" notes, the interview
  stages (e.g. AI/recruiter phone screen → manager onsite), and any existing questions to keep.

## Process

1. **Load context.** `reference/hr-playbook.md` §1 (structured interviewing), §2 (scorecards), §5
   (do-not-ask); for sales roles, `reference/retail-sales-hiring.md`. Read the JD/role input.
2. **Build the scorecard.** Define 4–6 **must-have competencies** + the **knockouts** +
   "nice-to-haves." For each competency: a one-line definition, how it's assessed (question,
   work-sample, reference), and by whom. For the RSA archetype, weight *money-motivation, drive,
   coachability, rapport/read* over pedigree. This is the spine everything else hangs on.
3. **Write the anchored rubric.** Each competency gets 1–5 behavioral anchors (what a 5 vs 3 vs 1
   actually looks/sounds like) — concrete, role-specific, not generic.
4. **Build the question bank by stage.** Map questions to stages and split by interviewer:
   - **Screen (recruiter / phone AI):** the two knockouts (schedule, commission comfort) +
     motivation + logistics. Fast, knockout-first.
   - **Manager onsite:** behavioral (STAR) + situational + a **work-sample** (mock greeting /
     needs-discovery role-play, or reviewing their "sell us something" video together).
   - For each question: what it probes, good-answer signals, follow-up probes, and which
     competency it scores.
5. **Add the do-not-ask list** — the illegal/off-limits territory (`hr-playbook.md` §5), phrased as
   a manager-friendly "ask this, not that" table so it actually gets used.
6. **Add the decision framework** — how to combine scores (independent ratings → calibrate →
   knockouts are absolute), a recommend/hold/pass gate, and how to document the decision (defensibility).
7. **Package for the manager** — a clean, printable one-to-two-page run-sheet: intro script,
   questions with space to score, rubric reference, closing/next-steps script. Use
   `templates/interview-guide-template.md` and `templates/scorecard-template.md`.

## Output spec

`deliverables/interview-guide-<role>-YYYY-MM-DD.md`:
1. **Role scorecard** (competencies + knockouts + weights + who assesses what)
2. **Anchored rubric** (1–5 per competency)
3. **Question bank by stage** (screen vs onsite; each with probes + competency mapping)
4. **Work-sample / role-play** instructions + what to score
5. **Do-not-ask table** (ask-this-not-that)
6. **Decision framework** (scoring → recommendation → documentation)
7. **Manager run-sheet** (the printable, in-the-room version)
8. **⏳ WAITING ON YOU** — confirm stages/competencies, or "approve to distribute to managers"

## Quality bar

- A manager who has never interviewed could run it cold and produce a scored, defensible decision.
- Every question maps to a competency on the scorecard — no orphan questions, no trivia.
- Rubric anchors are concrete and role-specific (a "5" for RSA rapport reads differently than a
  "5" for a warehouse lead).
- The two real knockouts are unmissable and assessed at the earliest stage.

## Guardrails

- Do-not-ask list is mandatory and specific — this is where managers get companies sued.
- Independent scoring before group discussion (bake it into the run-sheet) to reduce bias/anchoring.
- Structure applied identically to every candidate in the role — note this explicitly as the
  compliance rationale so it isn't "optimized away" by a busy manager.

## Example

> **Brandon:** build an interview guide for the RSA role off the optimized JD in deliverables.

→ `deliverables/interview-guide-retail-sales-associate-2026-07-18.md` — scorecard weighting drive
and coachability, a phone-screen knockout block (schedule/commission), a manager onsite kit with a
"sell me this end table" role-play scored on an anchored rubric, and an ask-this-not-that table.
