# Operator Wisdom Library — Index

Canonical operating playbooks and case studies. Each card is a one-page reference. Load
3-5 per run based on the problem signatures in Step 2 of the pipeline.

Cards are reusable outside this skill — `deck-generator`, `content-publishing-kit`,
`exec-intel-brief`, and client-facing decks can all cite them.

---

## Full Card List

| Card | Source | Core Principle |
|---|---|---|
| [toc-five-focusing-steps](toc-five-focusing-steps.md) | Goldratt — Theory of Constraints | Every system has exactly one bottleneck; subordinate everything else to it |
| [the-goal-flow-economics](the-goal-flow-economics.md) | Goldratt — The Goal | Throughput, inventory, and operating expense are the only three numbers that matter |
| [value-stream-mapping](value-stream-mapping.md) | Toyota / lean | Map every step in the value stream; most of it is waste |
| [toyota-way-pillars](toyota-way-pillars.md) | Liker — The Toyota Way | Jidoka (build quality in) + just-in-time flow on a foundation of kaizen and respect for people |
| [high-output-management](high-output-management.md) | Grove — HOM | A manager's output = output of their team + output of teams under their influence |
| [pr-faq](pr-faq.md) | Amazon | Write the press release and FAQ before building anything |
| [working-backwards-bar-raiser](working-backwards-bar-raiser.md) | Bryar & Carr / Amazon | Input metrics drive output metrics; the bar raiser guards the hiring ceiling |
| [bezos-shareholder-letters](bezos-shareholder-letters.md) | Bezos / Invent and Wander | Day 1 mentality, Type 1/Type 2 decisions, disagree and commit, high-velocity decisions |
| [hoshin-kanri](hoshin-kanri.md) | Toyota — policy deployment | Cascade 3-5 year breakthrough goals into annual X-matrix alignment |
| [okrs-plus-4dx](okrs-plus-4dx.md) | Grove / Covey | Lag measures are outcomes; lead measures are the behaviors that drive them. Execute the WIG. |
| [kaizen-gemba](kaizen-gemba.md) | Toyota — continuous improvement | Go to the place where the work happens; small daily improvements beat occasional big ones |
| [sqdcp-boards](sqdcp-boards.md) | Shop-floor visual management | Safety, Quality, Delivery, Cost, People — five numbers on a board, reviewed daily |
| [jobs-to-be-done-ops](jobs-to-be-done-ops.md) | Christensen / Moesta | Employees, suppliers, and internal stakeholders also have jobs — design ops around their jobs |
| [danny-meyer-hospitality](danny-meyer-hospitality.md) | Meyer — Setting the Table | 51% hospitality / 49% product — the emotional outcome is the operational spec |
| [slootman-amp-it-up](slootman-amp-it-up.md) | Slootman — Amp It Up | Raise standards, narrow focus, increase pace, align priorities — without more resources |
| [thorndike-capital-allocation](thorndike-capital-allocation.md) | Thorndike — The Outsiders | CEOs are capital allocators; judge them by the price of capital raised and returns on deployed capital |
| [sam-walton-retail-doctrine](sam-walton-retail-doctrine.md) | Walton — Made in America | Save the customer money so they can live better; out-work, out-learn, out-experiment |
| [chipotle-throughput-model](chipotle-throughput-model.md) | Ells / Chipotle | Assembly line + limited menu = speed as a cultural identity |
| [cfa-drive-thru-model](cfa-drive-thru-model.md) | Chick-fil-A | People in the lane with tablets beats a speaker box; elevated kitchens double throughput |
| [in-n-out-menu-restriction](in-n-out-menu-restriction.md) | Perman — In-N-Out Burger | Radical SKU restriction is the lever behind everything else |
| [foran-radical-simplification](foran-radical-simplification.md) | Foran — Walmart | Clean, fast, friendly. Cut SKUs, cut steps, cut complexity. Retail doctrine for ops at scale. |

---

## Problem Signature → Cards Map

Use this to pick 3-5 cards when problem statements are written.

| Problem signature | Cards to load |
|---|---|
| **Throughput / bottleneck / cycle time** | toc-five-focusing-steps, the-goal-flow-economics, chipotle-throughput-model, cfa-drive-thru-model |
| **Labor constraint / can't hire / wage pressure** | value-stream-mapping, toyota-way-pillars, kaizen-gemba, foran-radical-simplification |
| **Format / channel innovation** | pr-faq, working-backwards-bar-raiser, cfa-drive-thru-model, chipotle-throughput-model |
| **Menu / SKU complexity** | in-n-out-menu-restriction, toc-five-focusing-steps, foran-radical-simplification |
| **Strategic alignment / execution discipline** | high-output-management, okrs-plus-4dx, hoshin-kanri, slootman-amp-it-up |
| **Quality consistency / customer trust** | sqdcp-boards, kaizen-gemba, danny-meyer-hospitality, toyota-way-pillars |
| **Capital allocation / portfolio / M&A** | thorndike-capital-allocation, bezos-shareholder-letters |
| **Retail / real estate / store development** | sam-walton-retail-doctrine, foran-radical-simplification, cfa-drive-thru-model |
| **Customer-facing experience redesign** | danny-meyer-hospitality, cfa-drive-thru-model, jobs-to-be-done-ops |
| **Culture / intensity / pace of change** | slootman-amp-it-up, bezos-shareholder-letters, sam-walton-retail-doctrine |
| **Internal processes / org design** | high-output-management, jobs-to-be-done-ops, hoshin-kanri |
| **Make-to-order vs. batch / flow economics** | the-goal-flow-economics, toyota-way-pillars, value-stream-mapping |

---

## Card Template

All cards follow this structure:

```markdown
# [Framework Name]
**Source:** [Book / Company / Person]
**Core principle:** [one sentence]

## When to apply
- 3-4 problem signals that trigger this framework

## The framework
- Steps / mechanics (numbered or bulleted, max 10)

## Canonical example
- How [company/person] applied it, with specific numbers/outcomes

## Applied to QSR / retail / ops
- 2-3 sentences translating to Brady's domain

## Common failure modes
- What goes wrong when teams misapply it

## Reading
- Primary source + page refs or URLs
```

---

## How to Use This Library

1. **Load INDEX.md first** (this file) to identify candidate cards.
2. **Select 3-5 cards** that match the problem signatures.
3. **Read each selected card** in full before the ideation step.
4. **Cite specifically** — when an idea is anchored in a card, name it in the idea's
   Precedent section (e.g., "Chipotle's assembly-line throughput model — see
   `chipotle-throughput-model.md`").
5. **Update the learning log** with framework hit rate: which cards anchored the
   highest-tier ideas? This feeds future card selection.
