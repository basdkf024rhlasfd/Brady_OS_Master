# Ops Innovation Scoring Rubric

Five criteria, weighted. Each rated 1-5 with anchor definitions. Composite = weighted average.

## The Rubric

| Criterion | Weight |
|---|---|
| Labor / Cost Impact | 25% |
| Throughput / Speed Impact | 20% |
| Scalability | 20% |
| Time-to-Pilot | 15% |
| Risk-Adjusted Feasibility | 20% |

## Anchors

### Labor / Cost Impact (25%)

Measures how much labor or direct cost this idea removes from the operation.

| Score | Anchor |
|---|---|
| 1 | <2% savings on affected line, or savings offset by new costs |
| 2 | 2-5% savings |
| 3 | 5-10% savings or payback period under 24 months |
| 4 | 10-15% savings or creates a new margin pool |
| 5 | >15% savings or structural reset of a cost curve (e.g. labor model redesign) |

### Throughput / Speed Impact (20%)

Measures change in output per unit time — orders per hour, inventory turns, delivery
speed, build cycle time, site selection decision time.

| Score | Anchor |
|---|---|
| 1 | Marginal or unmeasurable |
| 2 | 5-10% gain |
| 3 | 10-20% gain |
| 4 | 20-30% gain |
| 5 | >30% gain or unlocks an entirely new format/channel |

### Scalability (20%)

Measures how far this idea can spread across the operation's footprint.

| Score | Anchor |
|---|---|
| 1 | Works in one location / one market only |
| 2 | Works in a cluster or region |
| 3 | Works across all similar locations in a region |
| 4 | Works across the full domestic footprint |
| 5 | Works domestically + internationally, or becomes a portable reference architecture |

### Time-to-Pilot (15%)

Measures how fast this can be live in at least one location with data coming back.

| Score | Anchor |
|---|---|
| 1 | >12 months |
| 2 | 9-12 months |
| 3 | 3-9 months |
| 4 | 90 days to 3 months |
| 5 | <90 days |

### Risk-Adjusted Feasibility (20%)

Measures whether the idea is real. Is there precedent? Is the tech production-ready?
Is the capital/regulatory path clear? Is the pilot reversible if it fails?

| Score | Anchor |
|---|---|
| 1 | Major regulatory, tech, or capital risk; no precedent; irreversible pilot |
| 2 | Significant unknowns; weak precedent; hard to roll back |
| 3 | Moderate known risks; proven precedent in adjacent domain; rollback possible |
| 4 | Low risk; direct precedent in similar company; easy rollback |
| 5 | Very low risk; proven at scale by ≥2 comparable operators; pilot reversible in <30 days |

## Composite Score

```
Composite = (0.25 × Labor) + (0.20 × Throughput) + (0.20 × Scalability) + (0.15 × TimeToPilot) + (0.20 × Feasibility)
```

Range: 1.00-5.00.

## Quality Floor

**Auto-cut any idea with a 1 on Feasibility OR a 1 on Labor/Cost Impact, regardless of
composite score.**

Reasoning:
- A 1 on Feasibility means the idea isn't real yet — no precedent, no production-ready
  tech, no regulatory path. It belongs in a research backlog, not a deliverable.
- A 1 on Labor/Cost Impact means the idea doesn't move the cost curve. Operations
  innovation that doesn't affect cost is usually a feature request, not an innovation.

## Tier Assignment

Composite drives tier (see `tier-thresholds.md`):
- ≥ 4.0 → Tier 1
- 3.5 - 3.9 → Tier 2
- 3.0 - 3.4 → Tier 3
- < 3.0 → Cut (learning log only)

## Calibration Signals

Feed these into `learning-log.yml` after each run:

- **<5 Tier 1 ideas:** Scoring too harsh OR methods mismatched to problems. Re-check
  method selection against problem signatures.
- **>12 Tier 1 ideas:** Scoring too lenient. Re-check anchor adherence — are 5s really
  structural cost-curve resets, or are they just "pretty good" ideas?
- **No quality-floor cuts:** Consider whether unserious ideas are slipping through.
- **>50% in one tier:** Distribution is flat. Problem set may be too narrow or too broad.
