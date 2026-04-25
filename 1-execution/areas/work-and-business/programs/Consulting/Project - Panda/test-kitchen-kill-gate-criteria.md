# Test Kitchen Kill-Gate Criteria — Draft for Phase 0 Charter

**Status:** OC Optimus draft, 2026-04-24. Offered in Monday response v2. Polish with Brady before sharing with James.

**Purpose:** Pre-registered kill criteria at each gate, per validation vector. "Kill gates, not advance gates" (SFDR-101 peer lesson). Gives James + board confidence that unvalidated concepts won't consume budget indefinitely.

---

## Gate 1 — Week 4: Charter & Site Selection

**Kill criteria (any one triggers pause or re-scope, not full kill):**
- Site lease not signed by Week 4
- Capex approval slips past Week 4
- Equipment contingent POs (long-lead items) not placed by Week 2
- Recruitment for GM + Kitchen Director not active by Week 3

**If triggered:** 2-week buffer; renegotiate timeline with James before advancing to Phase 1.

## Gate 2 — Week 8: Design & Permitting

**Kill criteria:**
- Permits not approved (or not on clear path) by Week 10 hard-stop
- Design locked changes >20% scope after Week 6 (indicates scope drift)
- Recruitment offers not accepted for both permanent FTE roles

**If triggered:** Pause, not full kill. Extend Phase 1 up to 4 weeks; full kill only if permits blocked indefinitely.

## Gate 3 — Week 12: Construction & Install (First Real Kill Gate)

**Per-vector kill criteria — pre-registered:**

| Vector | Kill criteria | If killed, action |
|---|---|---|
| **Wok automation (PAW retrofit)** | <5% productivity lift OR >10% equipment downtime OR safety incidents >2 | Disable PAW bay; continue with commercial wok range; capture learnings for internal R&D |
| **Digital accuracy** | Sustained <93% at 40+ orders/hr | Pause integration; revert to baseline KDS; separate effort on POS→KDS handoff layer |
| **Drive-thru throughput** | Avg order time >3:15 at peak (>40 cars/hr) | Review architecture assumptions; rescope layout before Phase 3 |

**Sunk cost if wok track killed:** $500–800K (per SFDR-103)
**Sunk cost if accuracy track killed:** $300–500K
**Sunk cost if drive-thru track killed:** $400–700K
**Worst case (all three kill):** $1.2M–$2M — within Panda's $200M PAW R&D envelope.

## Gate 4 — Week 16: Operational Validation (Second Real Kill Gate)

**Success criteria per vector (must clear to advance to enterprise rollout planning):**

| Vector | Minimum viable | Stretch | If only minimum: action |
|---|---|---|---|
| **Wok** | 5% productivity lift, <5% downtime | 12–15% lift | Rollout to 5-10 stores as Phase 5 validation |
| **Accuracy** | 95% @ 40 orders/hr | >97% @ 50 orders/hr | Rollout in 20-store cohort |
| **Drive-thru** | 3:10 avg, 96% accuracy | <3:00, 97% | Scale to Panda Home / new-format stores first |

**Hard kill criteria (ANY vector):**
- Wok: lift <5% sustained, downtime >10%
- Accuracy: <93% at any peak
- Drive-thru: >3:15 sustained at peak

**If all three vectors hit stretch:** recommend full enterprise rollout program (Phase 5, separate scope).

**If one fails but two succeed:** phase rollout of successes; kill or R&D-pivot the failure.

---

## Governance

- Brady (program lead) + Jeff Wang (rollout sponsor) + James Ku (CDO) + CFO representative in every gate review
- Pre-registered criteria posted visibly in test kitchen site office
- Weekly data review with rolling 4-week trend; gate decisions made on data, not anecdote
- Board visibility: gate decisions reported in quarterly strategy review

---

*OC Optimus — pre-charter artifact. Use as structured input to James conversation or Phase 0 charter draft when approved.*
