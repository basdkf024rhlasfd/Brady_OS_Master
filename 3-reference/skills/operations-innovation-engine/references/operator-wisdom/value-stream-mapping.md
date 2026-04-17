# Value Stream Mapping

**Source:** Toyota Production System; popularized in *Learning to See* by Rother & Shook (1999)
**Core principle:** Map every step from raw material to customer. Most steps are waste.
Redesign around the few that add value.

## When to apply

- You don't know where time actually goes in a process
- Lead time feels longer than the sum of obvious steps
- Labor looks fully utilized but output lags
- Handoffs and wait time dominate total cycle time
- You're about to automate a process (map the current state first — automate the
  waste and you codify it)

## The framework

Two maps: **Current State** and **Future State.**

**Current State steps:**

1. Pick one product family / one order type. Don't try to map everything.
2. Walk the process physically, end to end. Start at the customer, walk backward.
3. At each step, record: process time (value-adding), lead time (clock time at station),
   uptime %, changeover time, inventory in queue, staffing.
4. Draw material flow (left to right) and information flow (right to left) on one
   page. Use standardized symbols.
5. Add a "timeline ladder" at the bottom: value-adding time on top of the ladder,
   total lead time below.

The ratio of value-adding time to total lead time is usually 1-5%. That's the map.

**Seven wastes (TIMWOOD):**

- **T**ransport — moving things
- **I**nventory — things waiting
- **M**otion — moving bodies
- **W**aiting — people or things idle
- **O**verproduction — making more than needed
- **O**verprocessing — doing more than the customer values
- **D**efects — rework, scrap

(An eighth often added: **Unused talent** — underused skills/ideas from frontline workers.)

**Future State design:**

1. Produce to takt time (demand pace)
2. Use flow where possible, pull where you can't flow, push nowhere
3. Level the production mix
4. Release one pacemaker schedule to the process
5. Take small batches upstream of the pacemaker

## Canonical example

*Learning to See* walks through Acme Stamping. Current state: 23.5 days lead time for
188 seconds of value-adding work. Future state: 4.5 days lead time for the same work.
Same people, same equipment — different layout, smaller batches, continuous flow cells
replacing departments.

Toyota's own plants: a vehicle spends <24 hours being transformed across all of
production; total lead time from order to delivery is days, not months.

## Applied to QSR / retail / ops

- **QSR kitchen:** Map wok station prep → cook → plate → pass → counter. The handoff
  at "pass" is often dead time (orders waiting for a crew member to notice). Redesign
  so the handoff is eliminated or signaled.
- **Store build:** Map permit submission → design review → contractor mobilization →
  site work → inspection → opening. Inspection queuing is usually the biggest dead time.
- **Delivery channel:** Map order placed → POS receipt → kitchen → packaging → driver
  pickup → dispatch → delivery. Driver pickup wait is the kill zone.
- **Inventory replenishment (retail):** Map supplier PO → warehouse receipt → store
  order → truck load → store receipt → shelf. "Store receipt to shelf" is often days.

Walk the actual process. Talk to the people doing it. Don't rely on org-chart logic.

## Common failure modes

- Mapping the idealized process, not the real one. Always walk it.
- Skipping the information flow map. Material flow is half the problem; information
  flow is the other half.
- Treating the map as the deliverable. The map is a *diagnostic* — the deliverable is
  the future state and the execution plan to get there.
- Trying to fix all seven wastes at once. Pick one loop at a time.

## Reading

- Rother & Shook, *Learning to See* — canonical, compact, has every symbol you need
- Liker, *The Toyota Way* (Chapter 8) — conceptual framing
- Rother, *Toyota Kata* — how VSM becomes daily practice (not a one-time exercise)
