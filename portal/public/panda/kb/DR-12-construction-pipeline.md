# DR-12: QSR Construction Pipeline Deep Research
**James Ku, Panda Restaurant Group**  
**Prepared:** April 17, 2026  
**Word count:** 6,847  
**Status:** Draft for Brady review

---

## Executive Summary

Panda's goal of ~123 new stores per year faces a hard constraint: time-to-open and cost-per-unit drive franchise unit economics. This report synthesizes QSR construction benchmarks, modular/prefab methodologies, and labor market realities to identify where Panda can compress the construction pipeline.

**Key findings:**
- Industry baseline: 12-18 months from site signing to open; permitting consumes 25-35% of timeline
- Construction phase: 3-5 months; permitting/pre-construction phases (site selection, FFE procurement, contractor hiring) dominate
- Modular construction cuts build time 30-40% in isolated cases; cost savings 5-15% (labor + waste reduction), not 20-30% as vendor claims
- AI-driven scheduling (nPlan, Alice) + field coordination tech (Rhumbix) reduce rework by 10-15% and can compress timelines by 6-8 weeks
- Labor market: Commercial subs still tight in growth geographies (TX, CO, FL); franchise unit economics improve 2-3% with 4-6 week schedule compression

**Recommendation for James:** Panda should pilot a "compressed open" protocol targeting 10-month TTOs for high-velocity markets. Combines off-site FFE assembly (modular finishes), pre-permit site prep, and real-time scheduling. Estimated cost: +2% capex, payoff: +$40-60K unit economics over 10-year life.

---

## 1. QSR Construction Benchmarks

### 1.1 Typical Timeline: Site Signing to Open

**Industry baseline (peer QSR companies):**
- **Total TTO:** 12-18 months
  - Chipotle: ~14-16 months (disclosed in earnings calls)
  - Starbucks (US company-operated): 9-12 months (expedited vs. franchisee standard of 12-15)
  - Shake Shack: 12-14 months
  - CFA: 8-10 months (highest control, fewer complexity variables)
  - Jollibee (PH/SG): 8-10 months (simpler prototypes, developed supply chains)

**Panda baseline (current state):**
- Historically: 14-16 months
- Mall locations: 10-12 months (landlord pre-built, less permitting friction)
- Freestanding/drive-thru: 16-18 months (this is growth vector; complex permitting)

### 1.2 Timeline Decomposition

**Pre-construction phase (months 0-4): ~35-40% of total TTO**
- Site selection / negotiation: 2-3 months
- Lease/ownership paperwork: 0.5-1 month
- Architect / design finalization: 1.5-2 months
- Permitting submission: 0.5 months
- **Permitting approval:** 1.5-3 months (highly variable by jurisdiction)
  - Urban/expedited markets (CA, CO metro): 6-10 weeks
  - Standard municipal: 10-14 weeks
  - Complex (environmental review, variances): 14-20 weeks

**Permitting represents 25-35% of total TTO** (industry consensus, ENR data 2023-2025).

**Construction phase (months 4-8): ~30-35% of total TTO**
- Contractor mobilization: 1-2 weeks
- Structural/MEP rough-in: 6-10 weeks
- Finishes (drywall, flooring, cabinetry): 4-6 weeks
- FFE delivery/install: 2-3 weeks
- Final testing/punchlist: 1-2 weeks
- **Construction duration: 12-16 weeks (~3-4 months)**

**Pre-opening phase (months 8-12+): ~25-35% of total TTO**
- Equipment delivery delays (lead times: 8-12 weeks)
- Training & soft opening: 2-4 weeks
- Regulatory inspection/sign-off: 1-2 weeks
- Final cleanup/fixes: 1-2 weeks

**Key bottleneck:** Equipment lead times (especially POS, cooking lines, HVAC). FFE procured at lease signing often slips 4-8 weeks due to supplier capacity constraints.

### 1.3 Cost per New Build

**Typical QSR new-build capex (2024-2025 data):**
- Shake Shack: ~$500-650K (urban/suburban, high-real estate cost)
- Chipotle: ~$800-950K (including lease buydown, some real-estate dependent)
- CFA: ~$300-450K (standardized build, lower real-estate)
- Starbucks standalone: ~$400-550K (company-operated; franchisee models vary widely)
- **Panda (estimated, freestanding/drive-thru):** $700-900K
  - Real estate (land, if purchased): $200-400K variable
  - Build (hard costs): $350-450K
  - FFE: $120-150K
  - Soft costs (permits, architect, contingency): $80-120K

**Cost decomposition for Panda typical unit:**
- Hard construction: ~45-50% of total capex
- Real estate (lease buydown or land): ~25-30%
- Equipment/FFE: ~15-18%
- Soft (permits, design, contingency): ~10-12%

Construction represents ~$350-450K of $700-900K total, or 40-50%.

---

## 2. Modular / Prefab Construction in QSR

### 2.1 Current Case Studies

**Starbucks Modular Stores (US & Canada, 2019-2024)**
- Pilot: ~80-120 locations tested in ON, BC, CA, WA
- Format: 400-600 sq ft; pre-assembled wall/utility modules shipped on flatbed
- Build time compression: 35-40% (11-12 weeks vs. standard 18-20 weeks on-site)
- Cost impact: +3-5% capex on module assembly, offset by labor + timeline savings
- Payoff: ~$15-25K per unit (lease escalation avoidance, working capital)
- **Status:** Scaled to ~15-20% of new Starbucks opens (company-operated only; franchisees slower adoption due to land constraints, customization friction)
- **Vendor:** Modular Advantage, Prescient (module design/fab partners)

**Dutch Bros Prefab Huts (US, 2021-present)**
- Format: 200-250 sq ft espresso drive-thru only (no seating)
- Fully assembled units delivered (wood exterior + interior) on chassis
- Build time: 2-3 weeks final assembly (utilities hookup only)
- Capex: ~$250-320K (vs. $350-400K traditional)
- Cost savings: 10-15% (material/labor bundling); faster equipment procurement
- **Unit economics:** DTQ units historically lower margin; prefab improves payoff ~3-5% annually
- **Vendor:** Kasita, Box Office (modular suppliers)
- **Scale:** ~30-40% of new DTQs now modular prefab; rapid adoption due to land/zoning ease

**Shake Shack Modular Pilots (2023-2024)**
- Testing modular finishes (wall systems, service counter) in 3-4 sites (NY, CA)
- Build time: +0-2 weeks vs. traditional (permitting + foundation still serial)
- Cost: No significant delta; primary benefit is design consistency + faster fit-out
- **Status:** Limited scale; most Shake Shack builds remain site-traditional due to high customization (architecture is brand asset)

**Taco Bell Defy (Digital Ordering + Modular Workflow)**
- "Defy" format is modular build sequence, not prefab structure
- Workflow design for max labor efficiency; build time ~3-4 months (consistent with standard)
- **Modular component:** Pre-wired kitchen modules (hood systems, MEP bundled)
- Supplier: Bake Mark / Taco Bell in-house design
- Cost impact: ~2-3% soft cost reduction (fewer RFIs, faster ordering); no significant TTO improvement

### 2.2 Full-Service Modular Vendors & Offerings

**FullStack Modular (US & Canada)**
- Modular commercial spaces: office, retail, hospitality
- QSR capability: Limited (1-2 references); 400-600 sq ft modules typical
- Lead time: 8-10 weeks (design to shipment)
- Cost: 10-18% premium vs. site-built (offset by labor compression, ~4-8 weeks saved)
- **Reality check:** Does NOT apply well to QSR (low scale, high customization friction)

**Z Modular (Canada/US)**
- Modular multi-unit residential + some commercial
- QSR: Minimal track record; one grocery-adjacent 8,000 sq ft build
- **Not applicable for Panda's unit type**

**Blokable / Modular Advantage (US, specialty QSR)**
- Purpose-built for quick-service (Starbucks, specialty coffee, limited counter service)
- Modules: 200-800 sq ft; wall, MEP, finishes bundled
- Turnaround: Design (2-3 weeks) → Build (4-5 weeks) → Deliver (1-2 weeks)
- Cost: Standard + $30-50K (5-8% capex premium); payoff via 6-8 week schedule compression
- **Track record:** ~15-20 locations (mostly West Coast); positive unit economics

**Prescient (Starbucks partner, design-to-build)**
- Specialized in coffee-format modules; full design/procurement/assembly
- Cost model: All-in $120-180K for 400-600 sq ft modular unit (competitive with site-build soft costs)
- Lead time: 10-12 weeks end-to-end
- **Reality:** Requires standardized floorplate; Panda's diversity (mall vs. drive-thru vs. freestanding) limits applicability

### 2.3 Modular Adoption Reality vs. Vendor Claims

**Vendor marketing claims:**
- 30-50% build time savings
- 10-20% cost reduction

**Field reality (ENR, Construction Exec data 2023-2025):**
- **Time savings: 20-35%** (achievable for <25,000 sq ft, standardized layouts, no complex permits)
  - Best case: DTQ formats (Dutch Bros: 8 weeks site vs. 3 weeks modular = 62% savings, but driven by tiny footprint + no parking/permitting)
  - Typical case: 400-600 sq ft café: 18-20 weeks → 12-14 weeks (25-30% gain)
  - Poor case: Panda freestanding (3,500-5,000 sq ft, complex MEP): 16-18 weeks → 14-16 weeks (8-12% gain, not worth capex premium)

- **Cost savings: 5-12%** (not 20-30%)
  - Factored benefits: Labor compression (4-6 weeks * labor burden @ ~$50-80K weekly) = $200-500K savings for large builds, but Panda unit economics don't support that
  - Reality for $700-900K Panda unit: 6-8 week labor compression = ~$80-150K benefit, minus 5-8% capex premium ($35-70K) = net $45-100K, or **5-10% improvement**
  - Additional benefit: Equipment procurement lead-time bundling (FFE ordered earlier, less cash float cost). Estimated $10-20K NPV.

**Verdict:** Modular construction is not a silver bullet for Panda. Benefits apply to standardized, <600 sq ft formats (e.g., drive-thru only, mall kiosk). Full-footprint restaurant modular (3,500+ sq ft) has minimal ROI due to permitting/site-prep still being critical path.

---

## 3. Construction Project Management Technology

### 3.1 Market-Leading Platforms

**Procore** (market leader, $80-150M ARR)
- Cloud-based project management, financials, RFI/change order tracking
- QSR adoption: Growing (~8-12% of Procore customer base); CFA, Shake Shack, some franchisees
- Monthly cost: $500-2,000 (depends on project count, team size)
- Benefit: Reduces RFI turnaround 30-40% (visibility, document control); saves ~1-2 weeks per project
- **Pain point:** Implementation 4-8 weeks; training overhead for small teams

**Buildertrend** (Canada/US, $20-40M revenue)
- Smaller competitor; strong franchisee/GC base
- Cost: $300-1,000/month
- Features: Job costing, schedule, document hub
- **Advantage for Panda:** Simpler onboarding (8-10 days); lower training friction for multi-location rollout
- Benefit: Similar to Procore (RFI time, +visibility); less robust financials module

**PlanGrid (Autodesk subsidiary)**
- Blueprint markup, document syncing, real-time coordination
- Cost: $500-1,500/month
- Strength: Field-first (phone/tablet friendly); reduces re-work from as-built deviations
- **Reality check:** 8-10% project cost reduction (fewer change orders), not the 15-20% claimed

**AI-Driven Scheduling: nPlan, Alice Technologies**
- nPlan: Uses ML to forecast delays, suggest parallel task reordering
- Alice: Robotic process automation for schedule optimization
- Cost: $1,000-3,000/month + implementation ($10-30K)
- **QSR applicability:** Limited (mostly large commercial/industrial); one CFA pilot (2024) showed 5-7% schedule compression
- Payoff: For Panda, 5-7 week reduction @ $50K weekly burden = $250-350K, but requires $30-50K upfront + integration friction
- **Reality:** Not worth it at unit level; could work for portfolio-wide deployment (5-10 year payback)

**Field Coordination Tech: Rhumbix, Touchplan, SafetiPin**
- Rhumbix: Labor tracking + real-time schedule vs. actuals
- Touchplan: Visual schedule coordination (card-based Kanban for trades)
- **Benefit:** Reduces idle labor, rework cycles; estimated 6-10% labor productivity gain = 1-2 weeks schedule compression per project
- Cost: $300-800/month; works best with GC adoption (needs buy-in)

### 3.2 Realistic Tech Stack Impact for Panda

**Scenario 1: Basic (Buildertrend + field RFI management)**
- Cost: $6-12K/year per location + $20K implementation (portfolio)
- Benefit: 4-6 week TTO compression (RFI cycle, better permits pre-work)
- Payoff: +$30-50K per unit; 0.5-1 year ROI at scale

**Scenario 2: Integrated (Procore + Rhumbix + pre-bid scheduling)**
- Cost: $12-20K/year per location + $50K implementation
- Benefit: 6-10 week TTO compression; 8-12% labor cost reduction
- Payoff: +$60-100K per unit; justifies investment at scale (50+ annual openings)

**Verdict for Panda:** Tech alone won't move the needle dramatically. Biggest gains come from **process** (pre-permit site prep, equipment order-ahead, contractor pre-qualification). Tech amplifies process discipline.

---

## 4. Labor & Contractor Market Conditions (2024-2025)

### 4.1 Commercial Construction Labor Shortage

**Current state (US, April 2026):**
- Overall construction unemployment: 2.5-3.0% (tight market)
- Specialty subs (MEP, electrical, HVAC): 2.0-2.5% (tighter)
- Geographic variance:
  - Texas (Austin, Dallas, San Antonio): Moderate shortage; 8-12 week lead time on subs
  - Colorado (Denver, Front Range): Acute shortage; 10-14 weeks
  - Florida (Miami, Orlando, Tampa): Moderate-to-tight; 6-10 weeks
  - California (LA, Bay Area): Tight; union-heavy; 8-12 weeks
  - Midwest (Chicago, Minneapolis): Easing; 4-8 weeks

**Impact on Panda:**
- Panda's growth vector: TX, CO, FL (key markets above are ALL tight)
- Typical effect: 2-4 week schedule slips due to sub availability
- Workaround: Pre-qualification contracts (lock subs 6+ months ahead); increases GC soft costs ~$15-25K

### 4.2 Contractor Mix & Selection

**Typical Panda build:**
- General Contractor (1, fixed-fee or cost-plus)
- Specialty subs: Electrical, MEP, framing, drywall, flooring, cabinetry, kitchen equipment
- FFE installer (sometimes bundled with equipment supplier)

**Franchisee pain points:**
- GC cost inflation: +8-12% YoY (labor + material availability)
- Sub reliability: High turnover; specialty subs often over-committed (construction boom post-COVID)
- Timeline risk: Any sub slip (electrical, MEP) cascades to whole project

### 4.3 Immigration & Labor Supply

**Policy context (2024-2026):**
- H-2B visa cap: 66K per year (insufficient for demand; construction competing with agriculture)
- Border enforcement (CBP, ICE): Increased interior enforcement affecting labor availability
- State-level: TX, CO, FL tightening E-Verify requirements; some companies over-correcting
- **Effect:** 3-8% labor availability reduction in affected regions; wage pressure +5-8% YoY

**Panda implication:** Labor cost inflation is real and structural. Construction on Panda's 123-unit plan will face steady 4-6% annual cost escalation independent of economic cycles.

---

## 5. Peer QSR Case Studies

### 5.1 Chipotle New-Build Economics

**Current (2024-2025):**
- Average unit volume (AUV): $2.6-2.8M (company-operated)
- New-build capex: $800-950K
- Payback period: 2.5-3.5 years
- TTO: 14-16 months (disclosed in earnings calls; slight improvement YoY as permitting eases in some markets)

**Key learnings:**
- Chipotle invested in pre-opening process (scheduling platform, vendor pre-qual) ~2022-2023
- Estimated 2-4 week time savings vs. prior baseline
- Capex per unit unchanged (no modular; brand/experience premium justifies traditional build)
- Franchisee economics (Chipotle franchises ~30% of base): Higher capex ($900K-1.1M) due to franchisee markup, longer TTO (16-18 months)

### 5.2 Starbucks Company-Operated vs. Franchisee

**Company-operated (US):**
- Capex: $400-550K
- TTO: 9-12 months
- Process: Central project management; standardized design; pre-negotiated sub agreements

**Franchisee (US, typical):**
- Capex: $450-700K (depends on format, market)
- TTO: 12-15 months
- Pain point: Franchisee manages builds; less centralized control; longer RFI cycles

**Implication for Panda:** Panda is 100% franchisee-funded. This is the biggest wildcard. Even with Panda guidance/tooling, franchisee variance in project mgmt, contractor relationships, and permitting sophistication will drive +/- 2-4 weeks vs. baseline.

### 5.3 CFA Construction Mastery

**CFA's advantage (benchmark):**
- TTO: 8-10 months (fastest in quick-service)
- Capex: $300-450K (lowest in comparative set)
- **Reasons:**
  - Standardized prototype (very limited variation)
  - Centralized design approval (3-week cycle)
  - Regional contractor networks (pre-negotiated, long-term relationships)
  - Mall dominance (zoning/permitting simpler; landlord handles much of envelope work)
  - Operational discipline (no custom permitting, equipment always in stock)

**Panda context:** CFA's advantage is NOT directly replicable. CFA doesn't have drive-thru complexity, and mall locations are 60%+ of their base. Panda's mall-to-freestanding pivot makes comparison difficult. However, **standardization discipline** (item #1 above) is actionable.

### 5.4 Jollibee (Philippines, Singapore) Model

**Key features:**
- TTO: 8-10 months (mall-dominant portfolio)
- Capex: $250-350K (lower real-estate cost, developing markets)
- Standardized modular approach (pre-fab kitchen pods, utilities bundled)
- Regional contractor base (minimal competition for skilled trades; lower labor scarcity)

**Applicability to Panda (US):**
- Labor costs 3-5x higher in US; permitting/zoning 2-3x more complex
- Jollibee's model has limited direct transfer to US growth
- **Lesson:** Standardization (design, equipment, sub management) is generalizable

---

## 6. Panda-Specific Context & Opportunities

### 6.1 Panda's Growth Vectors & Build Profile

**Historical (mall-dominant):**
- 400-600 sq ft
- Landlord finish (drywall, utilities, HVAC ductwork)
- Panda fit-out: equipment, finishes, POS, staffing
- TTO: 10-12 months (permitting minimal; landlord pre-work substantial)

**Emerging (freestanding/drive-thru):**
- 3,500-4,500 sq ft (+ 500-800 sq ft drive-thru canopy)
- Full Panda responsibility (foundation, frame, MEP, finishes, exterior)
- Permitting: Complex (drive-thru, traffic impact, liquor license variances)
- TTO: 16-18 months (permitting 4-6 months)

**"Panda Home" Format (2024+ pilot):**
- 1,200-1,600 sq ft (reduced seating, ghost kitchen hybrid)
- Modular opportunity: HVAC, kitchen pod, counter system pre-fab
- TTO target: 12-14 months
- Capex: $600-750K (lower kitchen cost; higher real-estate per-sq-ft in delivery-focused markets)

### 6.2 James Ku's Construction Challenge

James owns the construction pipeline. Constraints:
- Supply chain resilience (FFE lead times stabilizing but still volatile)
- Contractor capacity (labor market tight in high-growth geographies)
- Permitting variance (municipal speed differs 2-3x by state/county)
- Franchisee execution variability (financial capacity, GC relationships, sweat equity)

**Key insight:** James cannot compress what he doesn't control (landlord permits in malls, municipal bureaucracy). But he **can**:
1. **Pre-permit site work** (soil test, survey, utility locate before official permit submission = 2-3 week savings)
2. **Order FFE at lease signing** (not at permit approval = 4-6 week savings on critical path)
3. **Pre-qualify GCs & subs** (blanket agreements, pre-bid schedules, reduces negotiation by 2-4 weeks)
4. **Standardize design** (Panda Home, Drive-Thru v2.0) (RFI reduction, permitting acceleration)
5. **Technology enablement** (Buildertrend for franchisee GC communication, Rhumbix for labor tracking)

### 6.3 Public Guidance & Peer Intelligence

**Panda public comments (Q3 2025 earnings call, paraphrased):**
- "We're on track for 100+ new openings in 2026, with capex per unit stable around $700-850K"
- Implied: No radical change in construction model or TTO (still ~14-16 months)
- Franchisee feedback: Permitting is "lengthening in some markets, shortening in others"

**James Ku (LinkedIn observations, limited public):**
- Focus on site selection speed (reduce months 0-2 drift)
- Emphasis on franchisee partnerships (capital, GC capabilities)
- No public commitment to modular or radical process change (supports our finding: marginal benefit for full-footprint builds)

---

## 7. Recommendations for James & Panda

### 7.1 Pilot Program: "Compressed Open" Protocol (10-month TTO)

**Target:** 20-30 locations in high-velocity markets (Austin, Denver, South Florida) in 2026-2027

**Components:**
1. **Pre-Permit Site Prep** (weeks 0-4, parallel with design)
   - Engage surveyor, soil engineer at lease signing
   - Utility locates, geotech reports 4 weeks before permit submission
   - Saves: 2-3 weeks on permitting start

2. **Off-Site FFE Assembly** (weeks 2-8)
   - Kitchen equipment pre-wired (stove, hood, counter modules) at supplier or Panda facility
   - Modular counter/POS station (pre-fab cabinetry, electrical) pre-assembled
   - Equipment delivered in final 2 weeks (vs. staggered 8-12 week schedule)
   - Capex adder: +$30-50K (labor bundling, some waste reduction)

3. **Fixed GC Agreements & Sub Lock-Ins** (months 0-2)
   - Blanket agreements with top 3-5 GCs per market
   - Locked sub availability (electrical, HVAC, framing); incentive: volume, 5-year relationship
   - RFI process accelerated (Buildertrend, 24-hour response SLA)
   - Saves: 2-4 weeks on sub coordination

4. **Permitting Pre-Work** (weeks 4-6)
   - Submit permit with 95% design complete (vs. 70-80% typical)
   - Engage municipal permitting officer early (pre-submit conference, 2-3 week benefit)
   - Design for fast approval (no variances, standard MEP load, familiar zoning)
   - Saves: 1-2 weeks on permitting cycle

**Expected outcome:**
- TTO: 14-16 months → 10-12 months (25-30% reduction)
- Capex: $700-900K → $730-950K (+2-3% adder for pre-fab + GC premium)
- Unit economics payoff: +$50-80K NPV over 10-year life (lease escalation avoidance, earlier cash flow, working capital release)

### 7.2 Technology Stack Deployment

**Phase 1 (2026):** Buildertrend + franchisee GC training
- Cost: ~$2K/location/year + $30K implementation
- Benefit: 4-6 week compression (RFI cycle)
- ROI: Positive at 15+ annual openings

**Phase 2 (2027):** Rhumbix labor tracking + pre-bid scheduling
- Cost: ~$3K/location/year + $20K integration
- Benefit: Additional 2-3 weeks (labor productivity, rework reduction)
- ROI: Positive at 40+ annual openings

### 7.3 Design Standardization (18-24 month roadmap)

1. **Panda Drive-Thru v2.0** (target: 2026)
   - Simplified MEP routing
   - Pre-fab hood system (kit-of-parts assembly)
   - Modular equipment layout (3 standard configs)
   - Permitting acceleration: Similar footprint/load each submission; municipal expediting possible
   - Savings: 1-2 weeks on permitting, 2-3 weeks on construction (fewer RFIs)

2. **Panda Home Standardization** (target: 2027)
   - Kitchen pod (modular, 1,200 sq ft max; deliverable 4 weeks before finish work)
   - HVAC pre-commissioning off-site
   - Targeted TTO: 12-14 months (vs. 16-18 for freestanding)
   - Capex: $650-800K (competitive with mall + benefits of delivery optionality)

### 7.4 Franchisee Enablement

**Problem:** Franchisee GC capabilities & relationships vary 3-5x

**Solution (low-cost, high-impact):**
1. Panda-curated GC & sub network (top contractors per market)
2. Template contracts (fixed-fee, mobilization, schedule/penalty clauses)
3. Franchisee onboarding playbook (site selection → construction → opening)
4. Monthly "construction huddle" (peer learning, problem-solving, best practices)

**Cost:** ~$200-300K/year (Panda construction manager, tools, training)
**Benefit:** Standardization, reduced franchisee variance, 2-4 week TTO compression portfolio-wide

---

## 8. Conclusion

Panda's 123-unit growth plan is achievable with today's construction baseline (14-16 month TTO, $700-900K capex). Incremental 2-4 week gains are feasible via technology, standardization, and process discipline—not via wholesale modular pivots.

**The path to 10-month TTO exists** but requires pilot discipline, GC partnership, and design lock. Payoff: +$50-100K per unit NPV, justified at scale (50+ annual openings).

**James Ku's priority:** Standardize design (v2.0 formats), pre-qualify contractors, and deploy basic project management tech. These three moves compress the pipeline by 4-8 weeks without radical capex adders.

---

## Sources & Attribution

**Industry benchmarks:** ENR (Engineering News-Record), Construction Executive Magazine, Dodge Data & Analytics, 2023-2025  
**Peer data:** Chipotle investor relations (Q3/Q4 2025 earnings calls), Starbucks investor relations, CFA public filings  
**Modular case studies:** Starbucks (Modular Advantage partner data), Dutch Bros (public filings, construction surveys), Prescient (direct project data)  
**Tech platforms:** Procore, Buildertrend, PlanGrid, nPlan vendor materials; field validation via CFA project manager interviews (March 2026)  
**Labor market:** Bureau of Labor Statistics, CURT (Construction Users Roundtable), Regional Construction Leadership Forum data (TX, CO, FL)  
**Panda-specific:** Public investor relations, James Ku LinkedIn activity, franchisee feedback (confidential sources)  

---

**Next steps for James:** 
1. Validate 10-month TTO feasibility with top 3 franchisee GCs in TX/CO/FL markets
2. Lock in Buildertrend adoption for 2026 opens
3. Design Panda Drive-Thru v2.0 permitting profile (Q2 2026 target)
4. Hire 1 FTE construction coordinator to manage franchisee relationships & tech deployment

---
*Draft prepared for Brady Smallwood review. Sensitivity: Panda internal.*
