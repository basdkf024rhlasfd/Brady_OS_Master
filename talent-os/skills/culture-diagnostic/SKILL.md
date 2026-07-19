---
name: culture-diagnostic
trigger: "culture read", "culture diagnostic", "engagement", "values", "why are people leaving"
input: interview notes/transcripts + engagement-survey data + employer-review-site themes + exit-reason data
output: deliverables/culture-diagnostic-<subject>-YYYY-MM-DD.md
mode: Diagnose
---

# Culture Diagnostic

Take what people actually said and did — interview notes, engagement-survey data, employer-review-site
themes, exit reasons — and produce three things: a **culture read** (what the schedule, comp, manager
behavior, and recognition *actually reward*, not the values on the wall), a **values articulation** grounded
in this company's real ethos, and an **engagement action plan** that changes one or two *real* things and
closes the loop with employees. It names the real tension out loud instead of papering over it, and it
directly addresses the change/job-security anxiety coming off acquisitions and automation. Culture is a
system; this skill diagnoses the system, not the poster.

## When to use

- Brandon has employee voice data (interviews, a survey, Glassdoor/Indeed review themes, exit reasons) and
  wants to know what the culture actually rewards and where engagement is bleeding.
- A leader asks "why are people leaving?" or "how's morale?" or "what are our values?" and expects a real
  answer, not a values workshop.
- Review-site reputation ("no work-life balance") is starting to cost recruiting, and someone needs to name
  the tension honestly and decide what to do about it.
- After the `talent-strategy-diagnostic` flags a retention or engagement leak that's cultural, not funnel.

## Inputs (drop in `intake/interviews/` and `intake/data/`)

Use whatever exists; note what's missing. Common inputs:
- Interview notes or transcripts (associates, top writers, recent leavers, store managers, People lead)
- Engagement or pulse-survey exports (scores by question, by location, by tenure band)
- Employer-review-site themes (Glassdoor/Indeed/Comparably — quotes and star trends over time)
- Exit-reason data or turnover reasons (voluntary vs. involuntary, reason coded, tenure at exit)
- Recognition/awards program details, comp/plan documents, the schedule policy, the handbook's stated values
- Acquisition/integration context (which locations, when, what changed for those employees)

If there's **no survey data**, that's fine — the read runs on the qualitative evidence and Process step 8
offers a lightweight pulse-survey design to close the gap.

## Process

1. **Load context.** Read `reference/company-context.md` (especially the schedule turnover driver, the
   "good attitude, we'll train you" winning profile, and the acquisition/automation backdrop) and
   `reference/hr-playbook.md` §8 (culture & engagement) plus §7 (total rewards as levers). Then read
   everything Brandon dropped in `intake/`.
2. **Separate the wall from the reality.** Write down the *stated* culture (values on the wall, what the
   handbook and leaders say — e.g. "all we need is a good attitude, we'll train you to do anything"). Then,
   from the evidence, write down the *lived* culture: what actually gets you rewarded, promoted, praised,
   scheduled, or pushed out here. The gap between those two columns is the diagnosis.
3. **Read what the systems reward.** For each lever, name the behavior it *actually* incentivizes, with
   evidence: **schedule** (every weekend + blackout holidays mandatory — rewards people with no competing
   life demands, punishes tenured writers who once had latitude), **comp** (ramp-then-commission, attach/
   credit-app bonuses — rewards add-on discipline and hunger over tenure), **manager behavior** (who gets
   coached vs. ignored, who works the pipeline), **recognition** (what and who gets celebrated — volume?
   attach? longevity? nothing?). The culture is the sum of these, not the mission statement.
4. **Name the real tensions — honestly.** State each out loud, in one line, evidence-cited. The anchor
   tension here is almost always **"we say work-life balance, we require every weekend + holidays."** Don't
   soften it. For each tension, note who it costs (tenured top writers on review sites), what it buys (the
   biggest sales days covered), and whether the honest move is to *fix it*, *price it* (sell the money the
   schedule makes possible), or *set the expectation at the top of the funnel* — not to hide it.
5. **Address the change/security anxiety.** Acquisition + automation generate a specific, nameable fear:
   *"is my job safe?"* Pull the evidence of it (integrated-location sentiment, "is the AI replacing me"
   comments). Treat it as a distinct engagement driver with its own action — silence reads as confirmation.
   The fix is a communication cadence and an honest story about what automation does *for* frontline people
   (removes admin, feeds them better leads) vs. *to* them, not a reassurance poster.
6. **Articulate the values — grounded, not aspirational.** Turn the real ethos into 3–5 values that are
   *true here and observable*, each with the behavior that proves it and the behavior that violates it.
   Anchor on "good attitude over pedigree / we'll train you" because the hiring evidence (hairdresser →
   $1M writer) actually backs it. A value the company doesn't live (e.g. "balance") gets named as an
   aspiration-vs-reality gap in step 4, not laundered into the values list.
7. **Build the engagement action plan — change one or two REAL things.** Not a pizza party, not a values
   poster. Pick the 1–2 highest-leverage system changes the evidence supports (e.g. a rotating-weekend or
   earned-latitude tweak for tenured writers; a schedule-honesty + earnings story at hire; a recognition
   program that celebrates attach discipline and longevity; a monthly "what's changing and why" cadence on
   integration/automation). Each action: the real thing it changes | the tension/driver it targets | owner
   | how you'll know it worked | rough effort. **Close the loop:** every plan includes *telling employees
   what you heard and what you're doing about it* — feedback with no visible response kills engagement
   faster than no survey at all.
8. **(If no survey data) recommend a lightweight pulse.** Design a short, repeatable engagement pulse:
   6–12 questions, 5-point + one open text, segmentable by location and tenure band, run quarterly. Include
   the specific items that would confirm/deny the tensions from step 4 (schedule fairness, "I understand
   how changes here affect my job," recognition, manager support, intent-to-stay). Keep it anonymous, short
   enough to finish on a phone between customers, and paired with a commitment to publish the "you said /
   we did" loop. Don't over-instrument a thin People team.

## Output spec

Write to `deliverables/culture-diagnostic-<subject>-YYYY-MM-DD.md`:

1. **Headline** — the one-sentence read (e.g. "The culture rewards hunger and add-on discipline and
   quietly punishes anyone with a life outside Saturday — engagement bleeds from the schedule and from
   'is my job safe,' not from pay").
2. **Wall vs. reality** — two-column table: *stated culture* | *what the systems actually reward*, with
   evidence for the reality side.
3. **What the systems reward** — schedule / comp / manager behavior / recognition, each: the behavior it
   incentivizes | evidence | who it costs.
4. **Real tensions** — 2–4 named tensions, each one line, evidence-cited, with fix / price / set-expectation
   call. The schedule tension stated bluntly. The change/job-security anxiety as its own item.
5. **Values articulation** — 3–5 values grounded in the real ethos, each with proves-it / violates-it
   behavior, and an explicit aspiration-vs-reality gap for anything the company says but doesn't live.
6. **Engagement action plan** — 1–2 real system changes (table: change | tension/driver | owner | success
   signal | effort) + the close-the-loop "you said / we did" communication step. Explicitly note what this
   is *not* (no pizza party, no poster).
7. **Pulse-survey design** *(only if no survey data exists)* — the 6–12 items, segmentation, cadence, and
   the loop-closing commitment.
8. **Open questions / data to request** — ranked, for the next client touch (e.g. exit reasons by tenure,
   review-site trend over 24 months, integrated-location sentiment split).
9. **⏳ WAITING ON YOU** — what Brandon needs to decide or supply (which action to fire, missing inputs,
   whether to stand up the pulse).

## Quality bar

- **Every finding ties to evidence from the input** — a quote, a survey score, a review theme, an exit
  reason, a scheduling fact. No generic culture platitudes ("communication could be better", "invest in
  your people"). If the evidence is thin for a claim, say so and mark it an assumption.
- **The tensions are named honestly.** If the deliverable reads like it's protecting leadership's feelings,
  it's failing. Brandon can soften a line for a client; he can't un-hide a tension you buried.
- **The action plan changes a real thing.** If a leader could implement all of it and no employee's actual
  experience would change, rewrite it. Fix the system, not the poster.
- **The loop gets closed.** No action plan ships without a step that tells employees what was heard and
  what's being done.

## Guardrails

- **Tie every finding to evidence.** No generic culture platitudes — if the input doesn't show it, don't
  claim it.
- **Don't fabricate survey scores or engagement numbers.** If there's no survey, say so, run on qualitative
  evidence, and offer the pulse design (Process step 8). Never invent a "72% engagement" to fill a template.
- **Apply the compliance lens** (`hr-playbook.md` §5) — if discovery surfaces a legal-risk practice
  (retaliation against people who raised the schedule issue, protected-class patterns in who's pushed out,
  off-the-clock work, an unlawful policy), flag it as a finding regardless of the culture framing. Hunter is
  not a lawyer; flag material calls for review, don't resolve them silently.
- **Fix the system, not the poster.** Values workshops, posters, and one-off morale events are not the
  deliverable. If the plan drifts toward optics, pull it back to a real lever.
- **Genericize to roles** if any of this gets promoted to `reference/` — role labels and patterns, never
  named individuals or their quotes.
- **Human owns every decision.** You read, name, and recommend. Leadership decides what to change and how to
  communicate it. Every recommendation is flagged as a recommendation.

## Example

> **Brandon:** I've got exit interviews for six associates, the Glassdoor themes from the last two years, and
> notes from talking to two top writers and a store manager — all in intake/interviews and intake/data. No
> engagement survey exists. Give me a culture read.

Hunter produces `deliverables/culture-diagnostic-store-associates-2026-07-19.md`. Headline: *"The culture
genuinely rewards hunger and coachability — 'good attitude, we'll train you' is real — but the mandatory
every-weekend schedule and unspoken 'is automation coming for my job' anxiety are what's driving the
tenured-writer exits and the review-site hits, not pay."* Wall-vs-reality table shows "we value work-life
balance" against evidenced reality (weekends + blackout holidays mandatory, latitude removed, two tenured
$100K+ writers named it on the way out). Real tensions: (1) schedule — stated bluntly, called as a
*price-and-set-expectation* move, not a fixable one; (2) job security — acquisition + automation, its own
driver, addressed with a monthly "what's changing and why" cadence and an honest automation-does-this-for-you
story. Values articulated around attitude-over-pedigree, hunger, and coachability — each with proves-it /
violates-it behavior — with "balance" flagged as an aspiration-vs-reality gap rather than laundered into the
list. Action plan changes two real things: an earned-latitude tweak for tenured writers who hit thresholds,
and a recognition program that celebrates attach discipline + longevity (not just top-line volume) — plus a
"you said / we did" all-hands loop. Because there's no survey, Hunter appends a 9-item quarterly pulse design
segmentable by location and tenure. No pizza party anywhere in it.
