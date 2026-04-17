# The Goal — Flow Economics

**Source:** Eliyahu Goldratt, *The Goal* (1984)
**Core principle:** Throughput, inventory, and operating expense are the only three
operational numbers that matter. Cost accounting — which measures local efficiencies —
actively misleads operators about what to do.

## When to apply

- Financial reports show strong margins but cash flow is weak
- Inventory is climbing while throughput is flat
- Line managers optimize their own stations at the expense of system output
- "Efficient" decisions are making the whole system worse

## The framework

Three numbers replace traditional cost accounting for ops decisions:

- **Throughput (T):** The rate at which the system generates money through sales. Not
  production — sales. Parts sitting in inventory do not count as throughput.
- **Inventory (I):** All the money invested in things the system intends to sell —
  raw materials, WIP, finished goods, even equipment.
- **Operating Expense (OE):** All the money the system spends turning inventory into
  throughput. Labor, utilities, rent, SG&A.

**Every operational decision is evaluated against three questions:**

1. Does it increase throughput (T ↑)?
2. Does it decrease inventory (I ↓)?
3. Does it decrease operating expense (OE ↓)?

If a decision does at least one of these *and* doesn't worsen the others, take it.
If it does the opposite, don't.

**Implications:**

- **Batch sizes should be small.** Big batches reduce per-unit cost on paper but
  inflate inventory and slow throughput.
- **Local efficiency is a trap.** A non-constraint station running at 95% utilization
  is building WIP, not throughput.
- **Product costs are allocations, not economics.** Two products may share the same
  constraint; "product profitability" from cost accounting is often wrong.
- **Capacity is not linear.** Adding people to a non-constraint station does not add
  throughput. Only capacity added at the constraint does.

## Canonical example

UniCo Manufacturing, the fictional plant in *The Goal.* Traditional cost accounting
reports good efficiency metrics but the plant is losing money. After adopting T/I/OE,
they stop running non-bottleneck robots at full capacity (they were producing inventory
faster than it could ship), batch sizes shrink by 50%, and throughput doubles within
90 days. The GAAP financials lag but cash and customer service metrics lead.

Amazon's "flywheel" memo implicitly runs on the same logic — lower prices increase
throughput (units shipped), which lowers cost structure (higher utilization on fixed
infrastructure), which lowers prices again.

## Applied to QSR / retail / ops

- **Don't optimize food cost in isolation.** A 50-cent savings on an ingredient that
  costs 30 seconds of labor per plate is a net loss if labor is the constraint.
- **Throughput = transactions per hour, not revenue per employee.** Revenue per
  employee rewards low-headcount configurations even when they create queues.
- **Inventory in QSR = food in walk-in + steam table batches + back-stock cases.**
  Most chains under-measure this. Smaller, more frequent prep cycles usually win.
- **Operating expense in retail = the always-open fixed cost.** Format decisions
  (counter-only vs. full-format) are T/I/OE decisions, not square-footage decisions.

## Common failure modes

- Treating T/I/OE as a bolt-on to existing cost accounting. The two systems give
  different answers. Pick one for operational decisions and commit.
- Optimizing each number in isolation. They must move together or at least not worsen
  each other.
- Measuring T at the end of the line but I and OE at the station level. Everything
  should be measured at the system level.

## Reading

- Goldratt, *The Goal* — the original
- Goldratt, *It's Not Luck* — sequel, extends TOC to strategy and marketing
- Debra Smith, *The Measurement Nightmare* — for the financial/accounting mechanics
