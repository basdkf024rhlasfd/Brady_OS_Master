# Theory of Constraints — Five Focusing Steps

**Source:** Eliyahu Goldratt, *The Goal* (1984) and *Theory of Constraints* (1990)
**Core principle:** Every system has exactly one binding constraint at a time. The
throughput of the whole system is limited by that constraint. Everything else is
subordinated to it.

## When to apply

- Throughput is flat despite added capacity or headcount upstream
- A single station, process, or resource consistently creates queues
- Local efficiency metrics are improving but system output isn't
- Capital is being spent on the wrong part of the line

## The framework

The Five Focusing Steps:

1. **Identify the constraint.** Walk the process. Where do things pile up? Where do
   people wait? What's the slowest step? That's the constraint.
2. **Exploit the constraint.** Make sure the constraint is never idle. No breaks, no
   maintenance during peak, no quality problems upstream that starve it, no changeovers
   that waste its time.
3. **Subordinate everything else to the constraint.** All other resources work at the
   constraint's pace. Not faster. Upstream resources produce exactly what the
   constraint can handle — no more, no less.
4. **Elevate the constraint.** Now (and only now) invest in more capacity at the
   constraint — more people, better equipment, outsourced capacity.
5. **Repeat.** When the constraint moves to a new place (and it will), go back to step 1.

**Operational implications:**
- Don't balance capacity across stations — balance flow
- An hour lost at the constraint is an hour lost for the whole system; an hour saved
  at a non-constraint is a mirage
- Local optima at non-constraint stations are usually harmful (excess WIP, hidden problems)

## Canonical example

Alex Rogo's plant in *The Goal* — they're running at a loss, ordered to close in 90 days.
Jonah walks Alex through identifying the heat treatment furnace as the constraint. They
stop running non-bottleneck machines at full capacity (which had been creating WIP piles),
re-sequence orders to prioritize the constraint's schedule, add an offline QA step *before*
the constraint (don't waste constraint time on defective parts), and restructure the
reward system around throughput, not local efficiency. Throughput doubles. Plant saved.

## Applied to QSR / retail / ops

- **QSR kitchen:** The wok, the fryer, or the assembly line is usually THE constraint.
  Instrument it. Never let it idle. Don't measure prep efficiency — measure wok
  utilization and wok-gated order cycle time.
- **Drive-thru:** The order-taking step is often the constraint (not the window).
  Payment at the order point, pre-pay apps, tablets in lane (CFA) all exploit the
  constraint.
- **Construction / store builds:** Permit offices are often the constraint. Nothing
  else matters if permits take 90 days. Build a permit playbook per jurisdiction.
- **Retail merchandising:** Receiving dock is often the constraint. Cross-docking,
  direct-to-store shipments, and ASN discipline subordinate inventory flow to the
  receiving constraint.

## Common failure modes

- "Every station needs to hit 100% utilization." False. Only the constraint should.
  Non-constraint stations at 100% create WIP, hide problems, and waste money.
- "Let's add capacity everywhere." Wastes capital. Add capacity only at the constraint,
  and only after exploit + subordinate.
- "The constraint is the person/team I don't like." Walk the process. Find the pile,
  find the queue. The data names the constraint, not the grudge.
- Ignoring that the constraint *moves*. After you elevate it, a new one appears.

## Reading

- Goldratt, *The Goal* — read first, fiction format, ~300 pages, fastest entry
- Goldratt, *Theory of Constraints* — framework in its own right
- *The Goal* audiobook works too; plot is the carrier for the ideas
