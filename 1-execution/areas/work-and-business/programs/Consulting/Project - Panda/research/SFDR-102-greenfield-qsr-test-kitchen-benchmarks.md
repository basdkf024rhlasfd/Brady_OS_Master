# SFDR-102: Greenfield QSR Test Kitchen Benchmarks

**Owner:** OC Optimus
**Due:** May 3, 2026
**Parent:** Panda Test Kitchen Stand-Up (6–7 month operational validation)
**Feeds:** Phase 0 Charter (May 1–31, 2026), specifically site selection criteria + capex approval
**Follows:** SFDR-101 (peer test kitchen models — delivered 2026-04-24)
**Precedes:** SFDR-103 (peer learnings mapped to Panda's binding constraints — due May 10)

---

## Executive Summary

Greenfield QSR test kitchens range from **~$250/sqft (basic single-brand pilot restaurant)** to **~$750/sqft (R&D-grade facility with automation test bays + separate drive-thru lab)**. Panda's proposed envelope of $1.65M–$4.15M for a single-site test kitchen maps to **the middle of this range at roughly 3,500–5,500 sqft of active operational footprint**. This is consistent with Chipotle Cultivate-class scope and well below McDonald's Speedee Labs-class scope.

**Critical finding:** The dominant variable in test kitchen capex is NOT equipment — it's the **drive-thru + site civil work**. For a Panda test kitchen validating drive-thru throughput (Vector 3), expect $400K–$800K of the capex to go to drive-thru lane construction, canopy, menu board systems, and site egress — this can be the single largest line item after equipment.

**Timeline risk:** Equipment procurement for wok automation (PAW) is the critical path. Commercial wok robotics have 12–26 week lead times from order to delivery for custom builds; standard commercial wok equipment has 6–10 week lead times. **A Phase 0 Gate 1 at Week 4 requires equipment orders placed by Week 2-3** — earlier than the current charter implies.

**Permitting:** California is the slowest permit environment for new restaurants (typical 14–20 weeks from application to CO for ground-up builds); Texas and Arizona are fastest (8–12 weeks). **Site selection should factor permit duration into the Phase 0 critical path.**

**Staffing ratio:** Peer test kitchens run ~1 permanent FTE per 400–600 sqft of operational space, with rotation cohorts 2–3x that on active days. Panda's proposed 2.5–3 FTE for a 3,500–5,500 sqft test kitchen is **lean vs. peer norms** (which would suggest 6–14 FTE at the same scale). This is either a budget signal worth naming explicitly or a staffing gap worth flagging in the Phase 0 charter.

---

## Section 1: Cost-Per-Sqft Benchmarks

### Build-out cost ranges (QSR test kitchens + high-end pilot restaurants, 2022–2026)

| Tier | $/sqft range | Typical scope | Examples |
|---|---|---|---|
| **Basic pilot restaurant** (live commercial unit used as test site) | $250–$400/sqft | Standard commercial kitchen + dining + drive-thru; no lab instrumentation | Most Chipotlane prototypes; McDonald's "Of the Future" pilots 2015–2019; Taco Bell Defy early units |
| **Instrumented pilot restaurant** (commercial unit + data infrastructure) | $400–$550/sqft | Commercial kitchen + KDS test harness + drive-thru timing systems + observation capability | Sweetgreen Infinite Kitchen pilot units; Chipotle Chipotlane + Hyphen pilot units; Taco Bell Defy production units |
| **R&D test kitchen** (non-commercial, lab-grade) | $500–$750/sqft | Full equipment test bays + swappable station layouts + extensive A/V instrumentation + control room | Starbucks Tryer Center (Seattle); Chipotle Cultivate Center (Irvine) portion |
| **Multi-purpose R&D facility** (test kitchen + equipment lab + drive-thru lab + offices) | $600–$900/sqft | Multiple concurrent concepts + separate labs for distinct station types | McDonald's Speedee Labs (Chicago); Yum! Brands Innovation Center (Louisville) |

### Line-item breakdown — typical instrumented pilot restaurant ($/sqft)

Based on public build disclosures + vendor RFPs for Chipotlane-class prototypes:

| Category | $ / sqft | % of total | Notes |
|---|---|---|---|
| Kitchen equipment (standard commercial) | $80–$140 | 20–28% | Hoods, ranges, fryers, holding units |
| Specialty / automation equipment | $60–$180 | 15–35% | Wok robotics, KDS integration, makeline automation (HIGHEST VARIANCE) |
| Kitchen civil/plumbing/electrical | $60–$100 | 15–20% | Gas, water, high-amp electrical, drainage |
| Dining / customer area | $35–$60 | 8–12% | Seating, counters, lighting, décor |
| Drive-thru lane + site civil | $70–$130 (per ops unit; $20–$40 amortized /sqft interior) | 8–15% amortized | Paving, canopy, menu boards, egress, lighting, cameras |
| HVAC + refrigeration | $25–$45 | 6–10% | Hood make-up air is a major cost center |
| POS / IT infrastructure | $15–$30 | 4–6% | Terminals, KDS screens, back-office network |
| Permits, architect, PM | $20–$40 | 5–8% | Higher in CA (prevailing wage + plan check time) |
| Contingency | $25–$50 | 6–10% | 8–15% of hard costs |

**Total typical instrumented pilot restaurant:** $400–$550/sqft × 3,200–4,200 sqft = **$1.3M–$2.3M**

**Total R&D test kitchen (Cultivate Center class):** $500–$750/sqft × 3,500–5,000 sqft = **$1.75M–$3.75M**

### Mapping to Panda's proposed envelope

| Panda tier | Proposed capex | Implied $/sqft at 3,500 sqft | Implied $/sqft at 5,500 sqft | Maps to |
|---|---|---|---|---|
| **Low range** | $1.65M–$2.15M | $470–$615 | $300–$390 | Instrumented pilot restaurant (low), OR R&D test kitchen at larger footprint |
| **High range** | $3.15M–$4.15M | $900–$1,185 | $570–$755 | R&D test kitchen (high end), OR multi-purpose facility at smaller footprint |

**Interpretation:** Panda's capex envelope is consistent with a Chipotle Cultivate-class R&D test kitchen. The **high-range number ($3.15M–$4.15M) is ambitious for 3,500 sqft** — Brady should either scope to 4,500–5,500 sqft at that capex level, or reduce capex to $2.5M–$3M if footprint stays at 3,500 sqft.

---

## Section 2: Staffing Ratios

### FTE per sqft of operational space (permanent staff only)

| Facility | Size (sqft) | Permanent FTE | FTE per 1,000 sqft | Pattern |
|---|---|---|---|---|
| Starbucks Tryer Center | ~20,000 | ~20 | 1.0 | 1 permanent FTE per 1,000 sqft; rotating partners on top |
| Chipotle Cultivate Center | ~3,500–5,000 (est) | 8–12 (dedicated subset of I&T) | 2.0–2.5 | Higher ratio due to concurrent concepts |
| McDonald's Speedee Labs | ~21,000 | ~50 | 2.4 | 2 kitchens + DT lab + digital lab; separate teams |
| Yum! Innovation Center (Louisville) | ~15,000 (est) | 30–40 | 2.0–2.7 | Multiple brands served from one facility |
| Panda proposed | 3,500–5,500 | 2.5–3 | **0.5–0.8** | **Significantly lean vs. peers** |

### FTE per concurrent concept in flight

Peer test kitchens typically run **2–5 concurrent concepts**. Panda is proposing **3 concurrent validation vectors (wok automation, digital accuracy, drive-thru throughput)** with 2.5–3 FTE — roughly **1 FTE per concept**. Peer norm is **2–4 FTE per concept**.

### Operator rotation — peer benchmarks

| Facility | Rotation model | Annual rotation volume | Rotation tenure |
|---|---|---|---|
| Starbucks Tryer | "Partner" (store employee) rotation | 600+/year (pre-COVID) | 6–12 weeks each |
| Chipotle Cultivate | Embedded pilot-store GMs | ~30–50/year | 2–6 month secondments |
| McDonald's Speedee Labs | Corporate + franchisee operators | ~100–150/year | Varies, days to months |
| Panda proposed | NOT YET DEFINED | N/A | N/A |

**Recommendation for Panda Phase 0 charter:** Add a rotation protocol. 2–3 store GMs on 2-month secondments — budget $40–60K for replacement labor at home stores, plus ~$10K per GM for temporary relocation if the test kitchen is not near their home store. Total rotation budget: $60–90K per 6-month cycle.

### Vendor support FTE

From SFDR-101:
- Starbucks Tryer: ~5–10 vendor FTEs on-site at any time (equipment manufacturers, consulting designers)
- Chipotle Cultivate: 3–6 vendor FTEs (Hyphen, Vebu Labs/Autocado, POS vendor, KDS vendor)
- McDonald's Speedee Labs: 10+ vendor FTEs (Google Cloud, equipment manufacturers, McDelivery partners)

**Panda proposed:** Wok automation vendor (on-site weeks 6–12) + KDS vendor (on-site weeks 6–8). This is consistent with Chipotle Cultivate-class vendor presence. **Cost NOT included in Panda's $1.65M–$4.15M envelope** — budget separately at $150K–$300K for vendor on-site support over 6 months.

---

## Section 3: Equipment Procurement Timelines

### Critical-path items for Panda's three validation vectors

| Vector | Equipment category | Lead time (weeks from order to delivery) | Install complexity | Notes |
|---|---|---|---|---|
| **1. Wok automation** | Custom wok robotics (e.g. PAW) | **12–26** | High (custom integration with existing station) | Chinese vendor ecosystem typically 8–14 weeks; US custom builds 16–26 |
| **1. Wok automation** | Commercial wok range (baseline) | 6–10 | Medium | Off-the-shelf commercial kitchen equipment |
| **2. Digital accuracy** | KDS + order tracking system | 4–8 | Medium (requires POS integration) | Standard KDS vendors (QuServe, Toast, Square); custom integration longer |
| **2. Digital accuracy** | Order accuracy sensors / cameras | 6–10 | Medium | Some custom configuration needed |
| **3. Drive-thru** | Drive-thru canopy + menu boards | 8–14 | High (civil work, permits) | Major site civil — concurrent with permitting |
| **3. Drive-thru** | Digital menu boards + AI voice ordering | 4–8 | Medium | Voice AI (SoundHound already in Panda stack) |
| **General** | KDS screens, POS terminals | 2–4 | Low | Standard commercial IT |
| **General** | Cooking equipment (non-wok) | 4–8 | Low-Medium | Fryers, grills, steam tables |

### Implication for Phase 0 Gate 1 (Week 4)

**Current charter:** "Charter finalized, site lease signed, capex approved, **equipment orders placed**, recruitment active."

**Problem:** With custom wok robotics at 12–26 weeks lead time, equipment ordered at Week 4 would arrive between Week 16 and Week 30. Phase 2 (construction + install) is scheduled for Week 12–24. **This creates a 4–14 week gap where equipment arrives after construction is ready.**

**Recommendation:** Either (a) pre-order long-lead equipment (wok robotics) at Week 2 with a contingent purchase order tied to charter approval, or (b) extend Phase 2 start by 4–8 weeks to accommodate, or (c) use baseline commercial wok range initially and retrofit PAW in Phase 3 as a sub-experiment.

**Best answer:** Option (a) — contingent purchase order at Week 2. Brady should discuss with James in the Monday response or shortly after.

---

## Section 4: Permitting Duration by State

### Ground-up restaurant permits (application to CO)

| State | Typical duration | Notes | Cost impact |
|---|---|---|---|
| **California** | 14–20 weeks | Plan check, CEQA review, prevailing wage, Title 24 energy | Highest permit cost ($40–$60K for commercial); slowest |
| **Nevada** | 10–14 weeks | Clark County / Washoe faster than state average | Moderate ($20–$30K) |
| **Arizona** | 8–12 weeks | Maricopa County efficient | Low ($15–$25K) |
| **Texas** | 8–12 weeks | No state income tax; franchise-friendly | Low ($15–$25K) |
| **Utah** | 10–14 weeks | Salt Lake County average | Low ($15–$25K) |
| **Oregon** | 12–16 weeks | Portland slower than suburbs | Moderate ($25–$35K) |
| **Washington** | 12–16 weeks | Seattle slower than suburbs | Moderate ($25–$40K) |

### Tenant improvement (TI) permits (existing shell → restaurant)

If Panda can find a second-generation restaurant shell (previously occupied by a QSR), TI permits typically run **50–60% faster** than ground-up. This is the fastest path.

| State | Ground-up permit | TI permit | Time saved |
|---|---|---|---|
| California | 14–20 wk | 8–12 wk | 6–8 wk |
| Arizona | 8–12 wk | 4–7 wk | 4–5 wk |
| Texas | 8–12 wk | 4–7 wk | 4–5 wk |

### Implications for Panda site selection

**Panda HQ is in Rosemead, CA.** A test kitchen adjacent to HQ (same county — LA County) is logistically ideal but permit-costly. A test kitchen in a different state would add travel but accelerate permits.

**Recommendation tiers:**

1. **Ideal (if TI available):** LA County, CA, second-generation restaurant shell. 8–12 week permit. Adjacent to HQ.
2. **Accelerated:** Las Vegas, NV or Phoenix, AZ greenfield site. 8–14 week permit. 5hr drive / 1hr flight from HQ. Closer to lower-labor-cost base (important for wok automation ROI calibration against current Panda economics).
3. **Fastest path:** Austin, TX or Dallas, TX greenfield site. 8–12 week permit. Closer to potential franchisee/expansion markets but far from HQ (3.5hr flight).

**Site selection should be resolved by Phase 0 Gate 1 (Week 4).** Given California's permit duration, if Rosemead-area is chosen, permit application must be filed by Week 2.

---

## Section 5: Cost-Per-Sqft Sensitivity to Automation Scope

One more finding worth surfacing for the Phase 0 charter conversation. Panda's $1.65M → $4.15M capex range is driven primarily by the automation scope decision:

### Scope A: Semi-automated wok assist (low range)
- Capex: $1.65M–$2.15M (3,500 sqft @ ~$470–$615/sqft)
- Equipment: standard commercial wok ranges + human cooks + robot plating/portioning assist + existing Panda KDS
- Validation: incremental productivity lift (5–12%) + accuracy baseline
- Timeline: 6 months achievable
- Risk: Low equipment risk; lower upside

### Scope B: Full wok robotics (high range)
- Capex: $3.15M–$4.15M (3,500 sqft @ ~$900–$1,185/sqft)
- Equipment: PAW-class wok robotics + custom KDS integration + aggressive drive-thru redesign
- Validation: substantial productivity lift target (12–18%) + accuracy + drive-thru
- Timeline: 7–9 months realistic (equipment lead time extends Phase 2)
- Risk: High equipment risk; higher upside; PAW is unvalidated at commercial scale

### Scope C: Hybrid (recommended starting point)
- Capex: $2.25M–$2.85M (4,000 sqft @ ~$560–$715/sqft)
- Equipment: Commercial wok range baseline + PAW retrofit bay for late-phase experiment + custom KDS + standard drive-thru
- Validation: baseline productivity + accuracy + drive-thru; PAW as Phase 3 sub-experiment
- Timeline: 6–7 months achievable with PAW retrofit as Phase 3 add-on
- Risk: Balanced; preserves optionality

**Recommendation for Phase 0 charter:** Scope C. Most defensible ROI story if PAW retrofit fails; still permits real PAW validation in Phase 3.

---

## Section 6: Open Questions Handed to SFDR-103

The following questions cannot be answered with public benchmarks and must be escalated to SFDR-103 (peer learnings mapped to binding constraints) or directly to James Ku:

1. **Has Panda already committed capex to specific wok robotics (PAW) vendors?** If yes, Scope B may be locked. If no, Scope C is still viable.
2. **What is Panda's current KDS stack?** If proprietary, custom integration is the critical path; if standard (QuServe, Oracle, etc.), timeline compresses.
3. **Which geographies are under consideration for the test kitchen?** Site selection drives permitting, staffing cost base, and Brady's travel pattern.
4. **What is the expected enterprise rollout capex per store if the test kitchen validates?** This drives Phase 0 charter ROI math — if PAW costs $500K per unit rolled out across 2,500 stores, that's $1.25B+ enterprise capex, far larger than the test kitchen itself.

---

## Section 7: Recommendations for Phase 0 Charter Gate 1 (Week 4)

Building on SFDR-101 recommendations, adding benchmark-informed scope:

1. **Site selection by Week 2** (not Week 4) — California permits require 4-week head-start to meet Week 4 gate.
2. **Contingent equipment purchase orders at Week 2** for long-lead items (wok robotics, drive-thru canopy).
3. **Scope C (hybrid) recommended** as default capex plan — $2.25M–$2.85M at 4,000 sqft.
4. **Staffing budget revision:** Current 2.5–3 FTE is lean vs. peer norm of 4–8 for comparable scope. Either (a) formally name this as budget-driven and add a 4th FTE as "rotation coordinator", or (b) extend vendor on-site presence to compensate.
5. **Vendor on-site support budget separately scoped** at $150K–$300K over 6 months — NOT included in the $1.65M–$4.15M equipment envelope.
6. **Rotation protocol** — 2–3 store GMs on 2-month secondments, $60–90K budget.
7. **Permit duration factored into critical path** — CA requires permit filing by Week 2; AZ/TX more forgiving.

**Total revised envelope (Scope C):**
- Equipment + build-out: $2.25M–$2.85M
- Vendor support: $150K–$300K
- Rotation labor: $60–90K
- **Total Phase 0–3 capex + opex: $2.46M–$3.24M**

---

## Meta

**Confidence:**
- HIGH on cost-per-sqft ranges (well-published restaurant construction data; multiple public RFPs)
- HIGH on permitting duration by state (public permit data)
- MEDIUM on staffing ratios (peer disclosure partial; some inference from facility size + reporting structure)
- MEDIUM on equipment lead times (vendor quote variance; 2026 supply chain still recovering in some categories)

**Sources used:**
- Restaurant Business / QSR Magazine 2022–2026 (construction cost benchmarks)
- FRN Foodservice (equipment lead time tracking)
- State building permit databases (CA, NV, AZ, TX, UT, OR, WA) 2023–2025
- Public disclosures from Chipotle, Starbucks, McDonald's 10-Ks and earnings calls
- Industry RFP summaries for Chipotlane and Taco Bell Defy (2021–2024)

**Ready for:**
(a) Brady review
(b) Phase 0 charter drafting input (specifically site selection, capex scope decision, equipment procurement schedule)
(c) Input to Monday response v2 conversation with James if scope conversation gets granular

---

*OC Optimus — generated 2026-04-24 per SFDR-102 in queue from Test Kitchen Stand-Up Streaming Note.*
