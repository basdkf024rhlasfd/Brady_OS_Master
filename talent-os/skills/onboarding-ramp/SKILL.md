---
name: onboarding-ramp
trigger: "30/60/90", "onboarding plan", "ramp plan", "ramp to productivity", "training checklist"
input: a role definition (+ optional: existing training content, ramp comp terms, manager cadence)
output: deliverables/onboarding-ramp-<role>-YYYY-MM-DD.md (30/60/90 + ramp-to-productivity + training checklist)
mode: Build
---

# Onboarding & Ramp

Produces a **manager-runnable ramp plan for a new hire**: a 30/60/90-day onboarding arc, a
ramp-to-productivity curve with a comp/support bridge across the cliff, a training checklist that
sequences the client's own program, and a weekly 1:1 cadence. It exists to fix the single most
expensive leak in commissioned retail — **people quitting in weeks 6–12 when the hourly ramp ends
before their sales book produces.** The plan engineers an early win, builds attach discipline
*during* ramp so nobody leaves bonus money on the table later, and gives the manager a week-by-week
script instead of an orientation deck.

## Why it matters here

The client has a strong training program — that's not the gap. The gap is the **cliff**: the flat
~$20/hr ramp ends around week 8, and new writers whose book hasn't caught up walk right before they'd
start earning. And the writers who *stay* often plateau because add-on habits (credit apps,
protection attach) were never built in early — the "two people, same volume, very different pay"
spread starts on day one, in ramp. This skill turns onboarding from an HR formality into the
retention-and-earnings lever it actually is: sequence the existing training, bridge the money gap,
and coach attach from the first written ticket.

## Inputs (drop in `intake/roles/`)

- A role definition (ideally the `jd-optimizer` output) **or** a role description — at minimum the
  comp/ramp terms for that role.
- Optional but valuable: the **existing training program** (modules, LMS content, product/systems
  curriculum, who owns each piece), the **ramp comp terms** (hourly rate, ramp length, commission
  base, tier thresholds, credit-app + protection-attach bonus schedule), the manager's current 1:1
  habits, and any early-attrition data by week (to size the cliff).

## Process

1. **Load context.** `reference/hr-playbook.md` §6 (onboarding & ramp: 30/60/90, ramp curve, early
   wins, manager cadence) and §7 (total rewards: comp is one lever in a bundle); for the RSA
   archetype, `reference/retail-sales-hiring.md` (the ramp cliff = leak #4, weeks 6–12; the
   "money left on the table" attach lever); `reference/company-context.md` (the RSA economics —
   flag every figure as discovery-stage/verify). Read the role input.
2. **Inventory what exists — don't invent it.** List the client's actual training assets as
   *inputs to gather*, not content to author: product knowledge, the sales process (greeting →
   needs discovery → add-ons → financing → close), systems/POS, delivery ops, compliance. Mark each
   as have / need. The plan *sequences and reinforces* their program; it does not fabricate a
   curriculum they already own.
3. **Build the 30/60/90 arc.** Three phases, each with goals + enablement + a check-in:
   - **30 — Learn:** product, process, systems, shadow reps, first supervised writes.
   - **60 — Do:** own the sales motion with support; first solo tickets; attach habits already
     forming (see step 5).
   - **90 — Perform:** hitting the ramped target; self-sustaining on commission; attach at target.
   Attach the client's training modules to the phase where each belongs.
4. **Engineer the early win (week 1–2).** Design one concrete, winnable early success — first
   assisted written sale, first completed delivery, first protection-plan attach on a supervised
   ticket. Early wins predict retention; name the specific win, who sets it up, and how it's
   recognized. This is a required section, not a nice-to-have.
5. **Build attach discipline DURING ramp.** Bake credit-app + protection-attach behavior into the
   motion from the first ticket — not as a week-12 "now start upselling" bolt-on. For each phase:
   the attach behavior to practice, a simple ramp scorecard that shows "you left $X on the table,"
   and a coaching prompt for the 1:1. The point: the earnings spread starts in ramp, so the habit
   has to start in ramp.
6. **Design the comp/support bridge across the cliff.** This is the retention core. Map the
   **ramp-to-productivity curve** (flat hourly → commission crossover) against the weeks where the
   hourly ends but the book hasn't produced — roughly **weeks 6–12** for RSA (verify against client
   ramp length + attrition data). Then design the bridge with whatever levers apply: an honest
   week-by-week earnings trajectory so the drop is *expected not ambushed*, a draw/guarantee or
   graduated step-down if the client offers one, milestone recognition, and a manager-owned
   "watch weeks 6–12" flag. Flag comp-structure changes (e.g. adding a draw) as a `total-rewards`
   decision for a human — this skill surfaces the gap and the options, it doesn't set pay.
7. **Set the weekly manager 1:1 cadence.** A weekly 1:1 through ramp beats any orientation deck.
   Give the manager a **week-by-week 1:1 template**: what to review (this week's writes, attach
   rate, blockers), the ramp-scorecard read, the one coaching focus, and the retention check
   (especially the cliff weeks). Make it a copy-paste run-sheet, not a philosophy.
8. **Build the training checklist.** A single printable checklist the manager and new hire work
   through — module, owner, target week, done ✓ — that stitches the client's existing training to
   the 30/60/90 phases and the attach/early-win milestones. Use `templates/30-60-90-template.md`.

## Output spec

`deliverables/onboarding-ramp-<role>-YYYY-MM-DD.md`:
1. **30/60/90 plan** (Learn / Do / Perform — goals + enablement + check-in per phase)
2. **Ramp-to-productivity curve + cliff bridge** (hourly→commission crossover, weeks 6–12 flag, the
   bridge levers, honest earnings trajectory)
3. **Early-win plan** (the specific week-1–2 win, owner, recognition)
4. **Attach-discipline build** (the credit-app + protection-attach habits to install during ramp +
   the ramp scorecard that shows money-left-on-the-table)
5. **Weekly manager 1:1 cadence** (the copy-paste week-by-week run-sheet)
6. **Training checklist** (module / owner / target week / done — sequencing the client's program)
7. **Inputs still needed** (the training assets + comp terms to gather, marked have/need)
8. **⏳ WAITING ON YOU** — confirm ramp terms/training assets, or "approve to hand to managers"

## Quality bar

- A store manager could run the whole ramp off this doc without HR in the room.
- The cliff is addressed head-on: weeks 6–12 have a named bridge, not a hope. Anyone reading it can
  see *why* people quit there and what this plan does about it.
- Attach discipline starts in week 1, not week 12 — the "money left on the table" spread is being
  closed during ramp, verifiably (there's a scorecard).
- The week-1–2 early win is concrete and assigned, not aspirational.
- Every training line maps to a phase and an owner — no orphan modules, nothing invented.

## Guardrails

- **Don't fabricate the client's training.** The company already has a strong program. Reference
  their modules/systems as *inputs to gather* (marked have/need); never author a curriculum and
  present it as theirs. If you don't have the content, list it as required and sequence around it.
- **Ground the economics, flag the figures.** Ramp length (~8 weeks), hourly (~$20/hr), commission
  base, tier thresholds, and attach-bonus steps come from `company-context.md` — every number is
  **discovery-stage; label it "verify with client"** in the deliverable. Don't present a draft ramp
  figure as settled fact.
- **You don't set pay.** Surfacing the cliff and proposing bridge options (draw, step-down,
  trajectory transparency) is in scope; changing the comp structure is a `total-rewards` decision
  for a human. Flag it, don't decide it.
- **Genericize if promoted to reference.** This deliverable is client-specific and lives in
  git-ignored `deliverables/`. If any of it becomes reusable reference material, strip client
  figures and named individuals down to the role archetype first.

## Example

> **Brandon:** build the 30/60/90 and ramp plan for the RSA role off the optimized JD in deliverables.

→ `deliverables/onboarding-ramp-retail-sales-associate-2026-07-19.md` — a Learn/Do/Perform arc that
hangs the client's existing training modules on the right weeks; a week-1 early win (first assisted
write + first protection attach) with the manager as owner; a protection/credit-app attach scorecard
that runs from ticket one so the earnings spread closes during ramp; a ramp-to-productivity curve
that names weeks 6–12 as the cliff and bridges it with an honest week-by-week earnings trajectory
plus a "watch these weeks" manager flag (draw/step-down surfaced as a total-rewards call for Brandon);
a copy-paste weekly 1:1 run-sheet; and a training checklist — every ramp figure tagged *verify with
client*.
