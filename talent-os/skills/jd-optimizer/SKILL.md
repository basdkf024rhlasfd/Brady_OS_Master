---
name: jd-optimizer
trigger: "optimize this JD", "fix this posting", "write a job description", "improve the RSA posting"
input: raw role notes, an old/weak posting, or "what good looks like" interview notes
output: deliverables/jd-optimizer-<role>-YYYY-MM-DD.md (a shippable, ready-to-post JD package)
mode: Build
---

# JD Optimizer

Turns a thin, generic, or expectation-hiding job posting into a **conversion-optimized,
compliance-checked, ready-to-post** package. The output isn't a suggestion — it's shippable:
Brandon (or the client) can paste it into Workable/Indeed today.

This directly attacks a live problem: postings that under-sell the money and hide the schedule,
so managers waste time interviewing people who bail on "commission" and "weekends."

## Inputs (any of these — drop in `intake/roles/`)

- The current posting (even a bad one — it's the starting clay).
- Role notes: title, location(s), comp model, schedule, must-haves, what "good" looks like.
- Interview notes about top performers' profiles (great raw material — feed them in).
- If comp/schedule specifics are unknown, ask for them; they're load-bearing.

## Process

1. **Load context.** Read `reference/hr-playbook.md` §4 (JDs that convert) + §5 (compliance) and,
   for retail sales roles, `reference/retail-sales-hiring.md`. Read `company-context.md` for the
   comp/schedule reality. Read the input in `intake/roles/`.
2. **Diagnose the current posting** (if one exists): does it lead with the candidate's win or a
   company bio? Are earnings concrete? Is the schedule/comp model stated up front? Any pedigree
   gates or protected-class proxies? Is the title what candidates actually search? Note each gap.
3. **Nail the winning profile & the knockouts.** From the inputs, define who thrives (traits, not
   pedigree) and the 1–2 honest knockouts (for RSA: schedule + commission comfort). These drive
   both the "who should apply" framing and the pre-apply screener.
4. **Write the optimized JD.** Follow the structure in `templates/jd-template.md`:
   - **Hook** — lead with the win (concrete earnings range, growth, what they get).
   - **The honest deal** — schedule, comp model, location stated plainly and *sold* as the path
     to the money, not buried as fine print.
   - **What you'll do** — day-in-the-life, active voice, real.
   - **Who thrives here** — trait-based, explicitly welcoming of non-traditional backgrounds
     ("bartenders, hairdressers, servers — if you can connect with people and you want to earn,
     you'll win here"). No degree/experience gates unless truly required.
   - **Essential functions** (ADA-clean) + **EEO statement**.
   - **Clear CTA** + the video/work-sample prompt if used.
5. **Produce the variants:**
   - **Full posting** (above).
   - **Sponsored/boosted short version** — tight, keyword-front-loaded for a paid Indeed slot.
   - **Searchable title options** — what candidates type, A/B-able.
6. **Build the pre-apply screener** — 3–6 knockout/qualifier questions the ATS asks before submit
   (schedule availability, commission comfort, work authorization, location/commute, video
   prompt). These pre-filter mismatches out of the manager's queue.
7. **Compliance pass.** Run the `hr-playbook.md` §5 lens over the whole thing: kill protected-class
   proxies, ensure knockouts are job-related, confirm ADA-safe essential functions + EEO
   statement. Flag anything that needs a human/legal call.
8. **Optimization notes** — brief: what you changed and why, and 2–3 A/B test ideas (title, hook,
   earnings framing) so the client can improve it with data.

## Output spec

`deliverables/jd-optimizer-<role>-YYYY-MM-DD.md`, in this order:
1. **Optimized full posting** (paste-ready)
2. **Sponsored short version**
3. **Title options** (3–5, with the search rationale)
4. **Pre-apply screener questions** (with the knockout logic)
5. **Compliance notes** (what was fixed; what needs a human call)
6. **What changed & why** + A/B ideas
7. **⏳ WAITING ON YOU** — missing specifics (exact comp range? locations?) and "approve to ship / tweak X"

## Quality bar

- A candidate skimming it on a phone in 8 seconds knows: *what they'll earn, what's required, why
  it's worth it.* If not, rewrite the hook.
- Earnings are concrete and honest (real ranges, not "competitive").
- The two knockouts appear as *upside framing* in the post AND as hard questions in the screener.
- Zero pedigree gates that would screen out the hairdresser-who-becomes-a-million-dollar-writer.
- Reads as sharp marketing to a candidate and as boring-and-safe to an employment lawyer.

## Guardrails

- Don't invent a comp range. If you don't have it, use a clearly-labeled placeholder and put it in
  WAITING ON YOU.
- Knockouts must be genuine job requirements (schedule, authorization) — never a proxy for a
  protected class.
- Every posting ships with an EEO statement and ADA-clean essential functions.

## Example

> **Brandon:** optimize the RSA posting in intake/roles. 100% commission after an 8-week ramp,
> weekends + holidays required, realistic $60–100K. Stop wasting manager time on people who bail.

→ `deliverables/jd-optimizer-retail-sales-associate-2026-07-18.md` — a posting that opens with
"Make \$60,000–\$100,000 selling furniture — if you'll work when the customers shop," states the
commission/schedule deal as the path to that number, welcomes non-traditional sellers, and ships
with a 4-question pre-apply screener that filters out schedule/commission mismatches.
