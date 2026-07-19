---
name: candidate-screener
trigger: "screen these candidates", "rank these resumes", "who do we advance", "build the daily shortlist"
input: a batch of resumes and/or screening-video transcripts + a role scorecard
output: deliverables/screen-<role>-YYYY-MM-DD.md (transparent ranked shortlist + daily digest)
mode: Build
---

# Candidate Screener

Turns a pile of applicants into a **transparent, ranked shortlist with an advance/hold/pass call
and a one-line why for each** — plus a "reach out to these today" digest a coordinator can act on
in five minutes. This is the fix for the opaque ATS fit-score nobody trusts and the follow-through
gap that kills good candidates.

**It never rejects anyone.** It ranks and recommends; a human advances or passes.

## Why it matters here

The pool is fine; the middle of the funnel is where candidates die — nobody sources through
applications fast and calls the right ones. And the ATS "40%/90% fit" score is a black box no one
can explain. This skill makes the ranking *explainable and tunable* against the actual scorecard,
and formats the output as a daily action list.

## Inputs (drop in `intake/resumes/`)

- Resumes (PDF/text) and/or **screening-video transcripts** ("sell us your favorite product").
- The **role scorecard** (from `interview-guide-builder`, or define one inline). Screening without
  an explicit "what good looks like" is just vibes — require it.
- Optional: current openings by location + how many to advance (to size the shortlist).

## Process

1. **Load context & the scorecard.** Read `reference/retail-sales-hiring.md` (weight drive/hunger
   over pedigree) and `reference/hr-playbook.md` §5 (compliance). Load the scorecard — it defines
   the criteria and weights. If none exists, propose one and confirm before scoring.
2. **Parse each candidate** into structured signal: relevant behaviors, motivation cues, schedule/
   commission fit (if evidenced), and — for videos — presence, energy, sales instinct from the
   *transcript/content*, never appearance.
3. **Score transparently.** Rate each candidate against each scorecard criterion with a short,
   quoted-evidence justification. Compute a weighted total. **Show the math** — the opposite of the
   black-box ATS score. Weight the work-sample video heavily where present; treat a strong video as
   a fast-track.
4. **Apply knockouts as flags, not auto-rejects.** If a candidate signals a schedule/commission
   mismatch, flag it as "verify in screen" — don't silently drop them (they may have mis-stated;
   the human decides).
5. **Assign a recommendation:** **Advance / Hold / Pass**, each with a one-line reason and a
   suggested next step (e.g. "Advance → phone screen for schedule confirmation"; "Hold → strong
   video, thin resume, second look if pipeline thins"; "Pass → no evidence of motivation *and* no
   video"). Pass is a *recommendation to a human*, with the reason logged for defensibility.
6. **Rank** by weighted score within each recommendation tier and by openings/need if provided.
7. **Produce the daily digest** — the punchline format: "**Reach out to these N today**", each with
   name, score, the hook (why them), best contact, and the exact next step. This is what a
   coordinator opens each morning.

## Output spec

`deliverables/screen-<role>-YYYY-MM-DD.md`:
1. **Daily shortlist** — "Reach out to these today": ranked, each with score + one-line why + next step.
2. **Full ranked table** — candidate | weighted score | per-criterion scores | recommendation | flags.
3. **Per-candidate cards** (for advances/holds) — evidence-backed rationale, the knockout flags to
   verify, suggested screen questions specific to them.
4. **Scoring method note** — the criteria, weights, and how the score was computed (transparency).
5. **⏳ WAITING ON YOU** — confirm the scorecard/weights, how many to advance, whether to draft
   outreach for the shortlist.

## Quality bar

- **Explainable, not a black box.** Every score has quoted evidence. Brandon can see *why* #3
  outranks #7 and re-tune the weights.
- **Motivation/work-sample outweigh pedigree** — the ranking should surface the high-drive
  non-traditional candidate, not bury them under someone with a tidier resume.
- The daily digest is genuinely five-minutes-to-action.

## Guardrails

- **No auto-rejection.** "Pass" is a recommendation with a reason, for a human to confirm. Never
  send a rejection.
- **Judge job-relevant signal only.** For videos: sales behaviors and communication, never
  appearance, accent, race, age, gender, home/background, or perceived disability.
- **No protected-class proxies** in scoring (graduation year, "culture fit" as a catch-all,
  employment-gap penalties that mask caregiving/disability). If a criterion smells like a proxy,
  flag it and drop it.
- **Consistency = defense.** Same scorecard, same method, same evidence standard for everyone;
  the method note documents it. If automated ranking is used at scale, this is where bias-audit
  and human-in-the-loop obligations attach (`hr-playbook.md` §5) — surface that to Brandon.
- Never fabricate a candidate detail to fill a card. Missing signal is itself signal ("no video,
  no motivation evidence").

## Example

> **Brandon:** screen the 22 resumes + video transcripts in intake/resumes for RSA against the
> scorecard in deliverables. We're down 4 in Jacksonville — give me who to call today.

→ `deliverables/screen-retail-sales-associate-2026-07-18.md` — a "call these 6 today" digest led by
a bartender with a knockout video, a transparent scoring table, per-candidate cards with
schedule-confirmation questions, and the weighting note so Brandon can re-tune.
