# 2026-05-14 — Otter Calls Classification

**SOP applied:** `transcripts/ingestion-sop.md`
**Calls processed:**
1. **"1915 South" — Brady ↔ Leah** (People Operations) · Otter `8SEH6-YF9_T1YgLVYM7A0pfO55I` · 06:59:11 CT · 32m 12s
2. **"Brady Frank Intro" — Brady ↔ Frank Pina** (VP Sales & Ops) · Otter `6n5juXDe8Vn1pnf8I5qg5sDf-l0` · 07:29:56 CT · 47m 59s

**Speaker identification notes:**
- Otter labels Leah as "Unknown Speaker(s)" — identity confirmed by Frank's "Leah, you took my time" reference + her self-described role.
- Frank Pina ID confirmed by Otter label + email `fpina@1915south.com`.
- Recurring transcription artifact: "**Stores**" and "**Tourist**" both = **Storis** (furniture-industry ERP).

---

## Call 1 — Leah · 32m 12s

### Discard batch (no save, score < 5 and no single 3)

| Range | Content | Tag |
|---|---|---|
| 0:00:22–0:01:51 | Note-taker chitchat, greetings, "doing well thanks" | `discard:pleasantry` |
| 0:01:51 | "Been looking forward to getting to know some people at 1915" (Brady) | `discard:pleasantry` |
| 0:03:52–0:04:11 | Brady "Monday morning quarterback" joke; ERP-experience credential establishment | `discard:brady-self` |
| 0:04:38–0:04:54 | "Let's hope for a good go live" + Brady's "what's your confidence level" | `discard:filler` |
| 0:05:37–0:06:08 | Brady riffing on data-definition pain (no new commitment) | `discard:brady-self` |
| 0:07:46 | "Looking forward to visiting that one" + softener | `discard:pleasantry` |
| 0:12:50–0:13:13 | Brady probing on lease economics | `discard:brady-self` |
| 0:15:41 | Brady's parallel-experience story about prior-co long-tenure exits | `discard:brady-self` |
| 0:17:33–0:18:24 | "Yeah" + transitions | `discard:filler` |
| 0:19:48 | Leah joke "off the record" | `discard:pleasantry` |
| 0:21:06–0:21:53 | Pleasantries about Brady fitting in | `discard:pleasantry` |
| 0:25:30–0:25:47 | Brady probing AR risk | `discard:brady-self` |
| 0:27:49–0:28:30 | Brady's QuickBooks Desktop credential at prior employer | `discard:brady-self` |
| 0:30:50, 0:31:25, 0:31:37 | Transition + wrap-up pleasantries | `discard:pleasantry` |

### Saves

| # | Time | Speaker | Compact | Score (S/R/D/I = Σ) | Grade | Destination | Tags |
|---|---|---|---|---|---|---|---|
| L-01 | 0:02:04 | Brady | Today's intro-call order: Leah → Frank 10:30 → Amanda PM | 3/3/1/1 = 8 | A | session notes | `date`,`amanda`,`frank`,`leah` |
| L-02 | 0:02:18 | Leah | Frank's recurring mantra "**speed of the leader**"; uses it to push peer execs | 2/2/2/1 = 7 | A | `frank-corpus` §culture | `frank`,`doctrine`,`culture`,`reported` |
| L-03 | 0:02:44 | Leah | "I'm sorry about sending that offer letter prior — Justin was like, Leah, I did not say send it. He wants to add some things." | 3/3/2/2 = 10 | A | `justin-corpus` §process · `leah-corpus` · fact log | `justin`,`leah`,`comp`,`fact` |
| L-04 | 0:02:44 | Leah | Background check + drug test sent to Brady; gate for June 1 | 3/3/2/1 = 9 | A | Streaming Notes (already action item) · `onboarding` log | `onboarding`,`action` |
| L-05 | 0:03:37 | Leah | June 1 = **Storis** go-live + ~4 other integrations same day | 3/3/2/2 = 10 | A | Context Vault · `systems-erp` | `systems-erp`,`date`,`fact`,`risk-flag` |
| L-06 | 0:04:58 | Leah | **Amanda owns the ERP go-live** ("Amanda's great at what she does. With her owning it, makes me feel a lot better.") | 3/3/2/2 = 10 | A (re: Amanda = D) | `amanda-corpus` §domain ownership · people-DB | `amanda`,`systems-erp`,`fact`,`reported` |
| L-07 | 0:04:58 | Leah | Cutover prep cadence rising; "vocal vs shy" team dynamic surfacing late-stage issues | 1/2/2/1 = 6 | B | `leah-corpus` §operating style | `culture`,`systems-erp` |
| L-08 | 0:06:08 | Leah | **Frank prioritizes per-hour productivity KPIs**; not previously tracked; **Zapsight + Paylocity integration built per-hour KPI infrastructure** | 3/3/3/2 = 11 | A | `frank-corpus` §doctrine · Context Vault (Zapsight + Paylocity) · close SFDR-001 strand | `frank`,`gmroi`,`ai-analytics`,`systems-erp`,`fact` |
| L-09 | 0:06:08 | Leah | **Open methodology question: delivery cost allocation — "does delivery really go in this line, or this line"** | 1/2/2/1 = 6 | A | new SFDR-021 | `distribution`,`financial`,`question` |
| L-10 | 0:06:47 | Brady | Brady establishes Danville VA origin with Leah (same town as 1915 South's VA store) | 2/3/2/2 = 9 | A | `leah-corpus` §what-she-knows-about-Brady · relationship-state log | `brady-positioning`,`leah` |
| L-11 | 0:07:13 | Leah | **Danville store opening was operationally rocky** — local cultural pushback; Virginia is **only state in footprint requiring medical-marijuana-card accommodation**; "good crew now" stable | 3/3/2/1 = 9 | B (re: HR policy = A) | Context Vault · `legal-hr` doctrine note | `legal-hr`,`virginia`,`fact`,`risk-flag` |
| L-12 | 0:08:26 | Leah | Original 1915 South HQ: metal-building, ~20 employees, 6 offices, half-mile from current HQ | 2/2/2/0 = 6 | A | Context Vault · history | `fact`,`history` |
| L-13 | 0:08:26 | Leah | Current Thomasville HQ ~4 years old; Russell-commissioned | 2/2/2/0 = 6 | A | Context Vault · history | `fact`,`russell`,`real-estate` |
| L-14 | 0:08:26 | Leah | **Justin "cleaned house" on legacy talent** — offices held by positions that didn't need them | 2/3/3/2 = 10 | A | `justin-corpus` §org-design | `justin`,`org-design`,`doctrine` |
| L-15 | 0:08:26 | Leah | Leah views Justin as intellectually exceptional ("genius") — loyalty axis high | 1/2/2/1 = 6 | A | `leah-corpus` §relationship-with-Justin | `leah`,`justin`,`culture` |
| L-16 | 0:08:26 | Leah | New exec cohort internally perceived as high-caliber, fast, smart | 1/3/2/1 = 7 | B | `leah-corpus` · culture log | `culture`,`org-design` |
| L-17 | 0:08:26 | Leah | **1915 South did not have titles before Justin (~Jan 2025).** Leah was de-facto exec assistant + accounting + HR for 18 yrs | 3/3/3/2 = 11 | A | Context Vault · `leah-corpus` §identity-and-tenure · org-maturity note | `justin`,`leah`,`org-design`,`fact` |
| L-18 | 0:08:26 | Leah | Justin's framing: pre-Justin team "weren't really working" | 1/2/2/1 = 6 | B (D re: Justin) | `justin-corpus` (reported) · culture log | `justin`,`culture`,`reported` |
| L-19 | 0:08:26 | Leah | **M&A pause confirmed:** Jacksonville 2022 (5 stores ex-Fineman) → 2 new builds (Julian, St Augustine) → no acquisitions until AGR Aug 1 2026 | 3/3/3/2 = 11 | A | Context Vault · update m-and-a-deep-research timeline | `m&a`,`fact` |
| L-20 | 0:11:51 | Leah | **JAX Town Center = "unicorn"** = top-performing 1915 South store | 3/3/2/2 = 10 | A | Context Vault · KPI Scoreboard | `fact`,`gmroi` |
| L-21 | 0:12:09 | Leah | **"Russell, the owner's son" — actively pushing Destin FL store search** ⚠️ identity ambiguous (Russell Jr.? or shorthand for Garland?) | 2/3/2/2 = 9 | A (entity = ambiguous) | new SFDR-022 · people-DB tentative entry | `russell-family`,`real-estate`,`question` |
| L-22 | 0:12:25 | Leah | **Real estate strategy: bought a lot of store real estate during COVID at low rates; ~50% of stores company-owned; rest leased.** Fort Walton Beach = decent performer | 3/3/3/3 = 12 | A | Context Vault · `russell-corpus` § real estate · reconcile w/ prior `project_1915_south_russell_pg_real_estate.md` memory | `real-estate`,`m&a`,`financial`,`fact` |
| L-23 | 0:13:13 | Leah | **Russell personally led real-estate analysis;** picked growth-market locations with national co-tenants (Hobby Lobby, Michaels, TJ Maxx, Ross) | 3/3/3/2 = 11 | A | `russell-corpus` § operating style · Context Vault | `russell`,`real-estate`,`doctrine`,`reported` |
| L-24 | 0:13:40 | Leah | Brady has not yet met Russell as of 2026-05-14 | 2/3/2/1 = 8 | A | relationship-state log | `russell`,`brady-positioning` |
| L-25 | 0:13:40 | Leah | Russell described as growth-driven, "not settling" | 2/3/2/1 = 8 | B (D) | `russell-corpus` · `reported` | `russell`,`doctrine`,`reported` |
| L-26 | 0:14:08 | Leah | **Scott Turner (co-founder, Russell's father) died ~Feb-Mar 2025 ("a year and a few months" before May 2026).** Came in daily until the end; checked his "coins" and email | 3/3/3/2 = 11 | A | Context Vault · `family-governance` note · People DB Scott Turner deceased | `family-governance`,`russell`,`scott-turner`,`fact` |
| L-27 | 0:14:08 | Leah | Scott Sr. had handed operational keys to Russell well before 2008 (Leah's start year) — formally non-operational by then | 2/3/2/1 = 8 | B | Context Vault | `russell`,`family-governance`,`fact` |
| L-28 | 0:14:08 | Leah | **Melanie** — former exec team, 23-yr tenure, departed "a few months ago" (≈ Feb-Mar 2026) | 3/3/2/1 = 9 | A | People DB | `person`,`org-design` |
| L-29 | 0:14:08 | Leah | **Kim** — former Merchandising lead, 23-yr tenure, recently departed | 3/3/2/1 = 9 | A | People DB | `person`,`org-design` |
| L-30 | 0:14:08 | Leah | **Russell's posture on long-tenure exits:** supports new-leadership-level moves, accepts cultural cost; sees succession (Scott→Russell→Justin) as inherently disruptive | 2/3/3/2 = 10 | B (D re: Russell) | `russell-corpus` § governance posture · `reported` | `russell`,`org-design`,`doctrine`,`reported` |
| L-30b | 0:14:08 | Leah | Pattern: Scott→Russell and Russell→Justin both produced attrition — Justin's outside-hire posture won't surprise Russell | 2/3/3/2 = 10 | C | Context Vault · informs Brady-Russell intro framing | `russell`,`org-design`,`doctrine` |
| L-31 | 0:16:41 | Leah | **1915 South ways of working were COVID-era frozen** for 4 years until Justin arrived | 2/3/3/2 = 10 | B | Context Vault · `risk-flag` | `culture`,`org-design`,`fact`,`risk-flag` |
| L-32 | 0:16:41 | Leah | Call-center vendor pitched a texting platform years ago (40% savings + better CX); old leadership rejected; now being adopted | 3/3/2/1 = 9 | A | Context Vault · CX modernization | `ai-analytics`,`fact` |
| L-33 | 0:18:24 | Leah | **Leah self-identifies as last remaining old-guard exec/leader at 1915 South.** Org transformation "leveled out" | 2/3/3/2 = 10 | A | `leah-corpus` §identity · informs Brady-Leah relationship strategy | `leah`,`org-design`,`doctrine` |
| L-34 | 0:19:10 | Leah | Justin's 15-month transformation phase **complete per Leah** — now in execution mode | 2/3/3/2 = 10 | B (D re: Justin) | `justin-corpus` (reported) · Context Vault | `justin`,`strategy`,`reported` |
| L-35 | 0:19:48 | Leah | **Cultural value: "good attitude + we'll train you" — trainability over expertise** | 1/2/3/1 = 7 | A | Context Vault · `leah-corpus` §doctrine | `culture`,`doctrine` |
| L-36 | 0:19:48 | Leah | Leah's role frame: People Ops + culture stewardship; tells team "job is safe if you're doing it with a good attitude" | 2/3/3/1 = 9 | A | `leah-corpus` §operating philosophy | `leah`,`culture`,`doctrine` |
| L-37 | 0:19:48 | Leah | **Active hires:** analytics associate (just hired) + final-mile manager (imminent) | 3/3/3/2 = 11 | A | Context Vault · People DB pipeline · validates JB-Hunt-thesis motion | `org-design`,`distribution`,`ai-analytics`,`action` |
| L-38 | 0:21:48 | Leah | Leah is from Thomasville, lifelong | 2/2/2/1 = 7 | A | `leah-corpus` §identity | `leah`,`fact` |
| L-39 | 0:21:56 | Leah | **Leah's career arc:** college → temp agency, 2008 → filing catch-up → accounting → accounting+HR → Chad's right hand (operational CFO functions) → finance carve-out → People Ops only. Institutional accounting memory | 3/3/3/2 = 11 | A | `leah-corpus` §identity-and-tenure · People DB · Brady-relevant signals | `leah`,`financial`,`chad` |
| L-40 | 0:23:46 | Leah | **bill.com went live 2026-05-01.** Per-check fees; ACH/wire integration available. Leah critique: poor manager rollout comms | 3/3/3/2 = 11 | A | Context Vault · `leah-corpus` §communication-quality value | `systems-erp`,`financial`,`date`,`fact` |
| L-41 | 0:24:48 | Brady | Brady acknowledges Justin briefed him only at 30K-foot on systems | 2/3/1/1 = 7 | A | `leah-corpus` §Brady-relevant — Leah is deeper-than-Justin source on operating systems | `leah`,`brady-positioning` |
| L-42 | 0:24:57 | Leah | **June 1 4-system cutover architecture:** Storis (ERP) + Avalara (sales tax) + QuickBooks Desktop (replacing QB Online) + bill.com. Data flow Storis → Avalara, QuickBooks Desktop ↔ Storis ↔ bill.com | 3/3/3/3 = 12 | A | Context Vault · onboarding readiness brief · risk-flag | `systems-erp`,`financial`,`date`,`fact`,`risk-flag` |
| L-43 | 0:25:30 | Leah | Risk: June 1 cutover collides with end-of-month close + manager bonuses | 3/3/2/2 = 10 | A | Context Vault · `risk-flag` | `systems-erp`,`financial`,`risk-flag` |
| L-44 | 0:25:47 | Leah | **Cash management infrastructure:** stores deposit cash at local banks (TMB in Thomasville; closest local bank elsewhere); ~2-week sweep to TMB | 3/3/3/2 = 11 | A | Context Vault | `financial`,`systems-erp`,`fact` |
| L-45 | 0:25:47 | Leah | **Fiserv credit-card processor goes live 2026-06-12** — replacing prior merchant processor; mandatory balance with Storis | 3/3/3/2 = 11 | A | Context Vault · key-date log | `systems-erp`,`financial`,`date`,`fact` |
| L-46 | 0:25:47 | Leah | **Wells Fargo financing partner** funds 1915 South's bank account day-after-sale on financed deals | 3/3/3/2 = 11 | A | Context Vault | `financial`,`fact` |
| L-47 | 0:25:47 | Leah | Current daily-work process: next-day finance team reconciles cash + check + finance | 2/3/2/1 = 8 | A | Context Vault | `financial` |
| L-48 | 0:27:25 | Leah | Bank-rec today is manual: print trial balance from Profit → hand-highlight against bank statement → Excel reconcile. Moving to QuickBooks Desktop | 3/3/3/2 = 11 | A | Context Vault · automation-opportunity register | `financial`,`systems-erp`,`fact` |
| L-49 | 0:28:30 | Leah | **Josh** described QuickBooks Desktop move as **temporary** — long-term plan = move back to QB Online once Storis stabilizes | 3/3/3/2 = 11 | A | Context Vault · roadmap log | `systems-erp`,`josh`,`financial`,`fact` |
| L-50 | 0:28:30 | Leah | **Bo** (Director of Strategic Planning & Finance, started week of 2026-05-03) is working QuickBooks Desktop side | 3/3/3/1 = 10 | A | People DB · Context Vault | `bo`,`financial`,`person` |
| L-51 | 0:29:35 | Leah | **Josh is on vacation June 1 week** — owns provisioning + validation | 3/3/2/3 = 11 | A | `risk-flag` · onboarding action | `josh`,`onboarding`,`risk-flag` |
| L-52 | 0:29:35 | Leah | **Josh's portfolio = IT/access + inventory** (multi-hat) | 3/3/2/2 = 10 | A | People DB | `josh`,`person`,`fact` |
| L-53 | 0:30:06 | Leah | **Storis data conversion runs Sunday night 2026-05-31** for Monday 6/1 go-live | 3/3/2/2 = 10 | A | Context Vault · key-date log | `systems-erp`,`date`,`fact` |
| L-54 | 0:30:24 | Brady | Brady commits to trust Leah's pre-June-1 guidance on Josh-coordination + provisioning prep | 1/3/2/2 = 8 | A | Streaming Notes (in Otter action items) | `onboarding`,`action` |
| L-55 | 0:30:37 | Leah | Pre-June-1 provisioning is the preferred path; agreement to start setting up early | 1/3/2/2 = 8 | A | onboarding plan | `onboarding`,`action` |
| L-56 | 0:31:01 | Leah | **Health insurance effective 2026-07-01** (1st of month after start). June 1-30 uncovered by 1915 South plan | 3/3/3/2 = 11 | A | Context Vault · Finn (COBRA bridge) · onboarding doc | `comp`,`onboarding`,`date`,`fact` |
| L-57 | 0:31:10 | Brady | Brady outstanding ask: PTO policy + holiday schedule | 2/3/2/1 = 8 | A | Streaming Notes (in Otter action items) | `onboarding`,`action` |

---

## Call 2 — Frank Pina · 47m 59s

### Discard batch

| Range | Content | Tag |
|---|---|---|
| 0:00:13–0:02:01 | Greetings, "good talk with Leah" | `discard:pleasantry` |
| 0:02:09–0:02:41 | Brady-personal "in this brief window" lake-trip talk | `discard:brady-self` |
| 0:03:03–0:03:14 | Kids count small talk | `discard:pleasantry` |
| 0:03:14 | Brady–Justin Walmart triplets-birth anecdote (already in corpus) | `discard:redundant` |
| 0:04:59–0:08:00 | Brady's full career narrative (already corpus-resident) | `discard:brady-self` |
| 0:11:46 | Brady probing East-West Ashley sales culture | `discard:filler` |
| 0:17:04–0:19:13 | Brady's Danville-video-stores + Finish Line + restaurant arc (corpus-resident) | `discard:brady-self` |
| 0:19:39 (partial) | Wife AI-banter | `discard:filler` |
| 0:33:04–0:35:07 | Brady's foodservice-as-behind-the-curve reflection | `discard:brady-self` |
| 0:45:12–0:46:23 | Brady-Justin Walmart pricing-app story (corpus-resident) | `discard:redundant` |
| 0:46:23–0:47:34 | Frank's ego-self-awareness aside | `discard:filler` |
| 0:47:34–end | Wrap-up pleasantries | `discard:pleasantry` |

### Saves

| # | Time | Speaker | Compact | Score (S/R/D/I = Σ) | Grade | Destination | Tags |
|---|---|---|---|---|---|---|---|
| F-01 | 0:02:46 | Frank | **Wayne** (Director of Analytics) based Bentonville; Frank's team flew there months ago | 3/3/2/1 = 9 | A | People DB · relationship-state (Brady has not met Wayne yet) | `wayne`,`ai-analytics`,`person` |
| F-02 | 0:04:00 | Frank | Frank's operating style — work-life harmony, get-shit-done energy, casual profanity | 1/2/3/1 = 7 | A | `frank-corpus` §operating style | `frank`,`culture` |
| F-03 | 0:08:00 | Frank | **AGR scale:** 1,150 total Ashley HomeStore locations; 250 corporate (22%); ~900 licensees. **1915 South = #3 licensee** | 3/3/3/2 = 11 | A | Context Vault · update Phase 0 baseline · `frank-corpus` | `frank`,`m&a`,`fact` |
| F-04 | 0:08:00 | Frank | Frank's career arc: Brandon FL associate (2005, age ~19) → store mgr → director → VP Sales & Ops AGR (~2024) → 1915 South VP S&O (Feb 2025, 15 mo at intake) | 3/3/3/2 = 11 | A | `frank-corpus` §identity · People DB | `frank`,`person`,`history` |
| F-05 | 0:08:00 | Frank | **Christie Grieve** — Frank's earliest store-manager mentor, taught Frank leadership-vs-management | 3/2/2/0 = 7 | A | People DB | `christie-grieve`,`person`,`history` |
| F-06 | 0:08:00 | Frank | **Steve King** — Frank's exec-track mentor at AGR | 3/2/2/0 = 7 | A | People DB | `steve-king`,`person`,`history` |
| F-07 | 0:08:00 | Frank | **Justin recruited Frank for VP S&O at AGR** before recruiting him to 1915 South — second-tour relationship | 3/3/3/2 = 11 | A | `justin-corpus` §talent acquisition · `frank-corpus` § relationship-with-Justin · Context Vault | `justin`,`frank`,`org-design`,`fact` |
| F-08 | 0:08:00 | Frank | **Justin + Frank align on transparent consultative selling, not used-car-sales tactics** | 2/3/3/1 = 9 | A | `frank-corpus` · `justin-corpus` (sales philosophy) | `justin`,`frank`,`sales`,`doctrine` |
| F-09 | 0:11:58 | Frank | **AGR sales culture historically split East (consultative) vs West (used-car, slick-back, 50%-off gimmicks)** — Frank ran East, transformed to consultative | 3/2/2/1 = 8 | A | Context Vault · `frank-corpus` § history | `frank`,`sales`,`history` |
| F-10 | 0:11:58 | Frank | **Frank's sales doctrine (consolidated):** internal+external guest framing, invest in people, brand value over discount, AI augments human trust. "Sales is psychology" | 2/3/3/1 = 9 | A | `frank-corpus` §doctrine | `frank`,`sales`,`doctrine` |
| F-11 | 0:11:58 | Frank | Macro: gas $4.60/gal; competitors offering "free gas card" gimmicks; Frank rejects | 2/2/1/1 = 6 | A | Context Vault · macro signal | `sales`,`fact` |
| F-12 | 0:11:58 | Frank | Frank wrote $1M first-year on the floor (~age 19-20, AGR Brandon) | 2/2/2/0 = 6 | A | `frank-corpus` §identity | `frank`,`sales`,`history` |
| F-13 | 0:19:13 | Brady | Brady positions to Frank: not back-office-only — "won't just sit behind a computer screen" | 1/3/2/1 = 7 | A | relationship-state log · brady-positioning record | `brady-positioning`,`frank` |
| F-14 | 0:19:39 | Frank | **Guest Solutions team just restructured (Frank + Justin co-led).** Frank owns this org | 3/3/3/2 = 11 | A | Context Vault · `frank-corpus` §domain ownership | `frank`,`org-design`,`fact` |
| F-15 | 0:19:39 | Frank | Frank's AI posture: enthusiast; "AI = superhuman power, brain enhancement tool" | 1/3/3/2 = 9 | A | `frank-corpus` §AI posture | `frank`,`ai-analytics`,`doctrine` |
| F-16 | 0:19:39 | Frank | **FrontlineIQ "Theo" in-store pilot live at 1915 South** as of May 2026 | 3/3/3/2 = 11 | A | Context Vault · update Theo entry | `ai-analytics`,`sales`,`theo`,`fact` |
| F-17 | 0:19:39 | Frank | **Scott** (Director of Training, 1915 South) — spent months training Theo on 1915 South's specific sales processes (custom, not vanilla FrontlineIQ) | 3/3/3/2 = 11 | A | People DB · Context Vault · `frank-corpus` §domain ownership | `scott-training`,`ai-analytics`,`sales`,`person`,`fact` |
| F-18 | 0:19:39 | Frank | **Labor-model thesis:** AI reduces manager headcount need over time, raises talent ceiling | 2/3/3/2 = 10 | A | `frank-corpus` §doctrine · aligns w/ Justin "fewer doers, more thinkers" | `frank`,`org-design`,`ai-analytics`,`doctrine` |
| F-19 | 0:19:39 | Frank | **Advocate AI** (customer service AI agent) deploying now at 1915 South — **YPO-sourced by Justin** | 3/3/3/2 = 11 | A | Context Vault · `justin-corpus` §sourcing channels | `justin`,`ai-analytics`,`fact` |
| F-20 | 0:19:39 | Frank | **Storis ships with bundled "Package AI" delivery module** — additional AI surface live June 1 | 3/3/3/2 = 11 | A | Context Vault · update Storis entry | `systems-erp`,`distribution`,`ai-analytics`,`fact` |
| F-21 | 0:19:39 | Frank | Industry framing: furniture is "old boy system" of 60-70-yo conservative operators. 1915 South positioned as industry's fastest mover | 1/2/2/1 = 6 | A | Context Vault · market signal | `m&a`,`strategy` |
| F-22 | 0:19:39 | Frank | **Todd Wanek per Frank: fast but undisciplined — "shiny object" chaser, billionaire-absorbs-mistakes** | 2/3/3/2 = 10 | A (D for Todd) | Context Vault · `todd-wanek` note · informs Ashley-strategy framing | `todd-wanek`,`reported`,`doctrine` |
| F-23 | 0:19:39 | Frank | **Justin per Frank: better investment discipline than Todd** — vets ROI before commit | 2/3/3/2 = 10 | A (D for Justin) | `justin-corpus` §investment discipline · `reported` | `justin`,`doctrine`,`reported` |
| F-24 | 0:19:39 | Frank | **Frank explicitly defines Brady's role-with-Frank as ROI/financial-discipline partner:** "I want a partner like Brady that's going to tell me, this is what it's going to cost, this is what I need to generate to pay for it" | 2/3/3/3 = 11 | A | `frank-corpus` §what-Frank-wants-from-Brady · brady-positioning · Y1 scope frame | `frank`,`brady-positioning`,`comp`,`doctrine` |
| F-25 | 0:26:00 | Frank | **2026 sales bonus restructure (Frank + Justin):** old plan rewarded only YoY comp; new plan rewards INPUT levers (traffic / close rate / average ticket); reward what sales controls (close rate + average ticket) | 3/3/3/2 = 11 | A | `frank-corpus` §doctrine · Context Vault | `frank`,`comp`,`sales`,`doctrine`,`fact` |
| F-26 | 0:26:00 | Frank | **Bonus tied to specific behaviors:** connection · finance · bedding · presenting every option · protection · delivery. Aligns with internal sales process | 3/3/3/1 = 10 | A | `frank-corpus` §doctrine · Context Vault | `frank`,`comp`,`sales`,`fact` |
| F-27 | 0:28:40 | Frank | **2025 metrics:** traffic +6%, performance +10%, business +17% — record year | 3/3/2/2 = 10 | A | Context Vault · update KPI Scoreboard | `gmroi`,`sales`,`fact` |
| F-28 | 0:28:40 | Frank | **2026 YTD:** traffic down double digits (Iran/Hormuz war effect); performance up double digits; business +10% | 3/3/2/2 = 10 | A | Context Vault · cross-ref `hormuz-impact-1915-south-2026-05-04.md` | `gmroi`,`sales`,`fact` |
| F-29 | 0:30:30 | Frank | **Bonus structure detail:** 35% of store-leader bonus = budget (revenue); rest = EGM (effective gross margin = gross margin − finance fees + delivery income) | 3/3/3/1 = 10 | A | Context Vault · `frank-corpus` §doctrine | `comp`,`sales`,`financial`,`fact` |
| F-30 | 0:30:30 | Frank | **Lever-specific incentives:** finance · bedding (DSPG number) · protection · delivery — each lever with its own bonus mechanic | 3/3/3/1 = 10 | A | Context Vault · `frank-corpus` §doctrine | `comp`,`sales`,`fact` |
| F-31 | 0:30:30 | Frank | **Category managers within stores:** bedding owner + protection owner — each gets 50% of their pay on category number | 3/3/3/2 = 11 | A | Context Vault · `frank-corpus` §org-design | `frank`,`org-design`,`comp`,`fact` |
| F-32 | 0:30:30 | Frank | Removed sales guarantees; raised bonus ceiling — earn-it model | 2/3/3/1 = 9 | A | `frank-corpus` §doctrine | `frank`,`comp`,`doctrine` |
| F-33 | 0:35:16 | Frank | **Frank built an automated Claude → 35-recipient daily KPI email** for store managers. 10 sec to upload, runs every morning, 4 weeks live | 3/3/3/2 = 11 | A | Context Vault · `frank-corpus` §AI deployment | `frank`,`ai-analytics`,`sales`,`fact` |
| F-34 | 0:35:16 | Frank | **Claude email measured lift (4 weeks):** close rate +~150 bps, average ticket +$150, SPG +$80 | 3/3/2/2 = 10 | A | Context Vault · automation-impact log | `ai-analytics`,`sales`,`gmroi`,`fact` |
| F-35 | 0:37:38 | Frank | **Frank uses Claude to vet his own ideas before bringing to Justin** — peer-AI workflow | 2/3/3/2 = 10 | A | `frank-corpus` §AI posture | `frank`,`ai-analytics`,`doctrine` |
| F-36 | 0:37:38 | Frank | **Justin codes/builds Claude apps on weekends and sends to exec team for feedback** (e.g., consultative-selling app to Frank) | 3/3/3/2 = 11 | A | `justin-corpus` §technical habits · Context Vault | `justin`,`ai-analytics`,`doctrine`,`fact` |
| F-37 | 0:39:20 | Frank | **Frank built a digital order-verification web app via Claude in 6 hours** — GitHub-hosted, deployed to every store tablet, URL-based, live at 1915 South | 3/3/3/3 = 12 | A | Context Vault MAX · `frank-corpus` §shipped artifacts · brady-positioning (peer AI builder + GitHub precedent) | `frank`,`ai-analytics`,`systems-erp`,`fact` |
| F-38 | 0:39:20 | Frank | **Old operations VP existed and refused the digital build** before departing (consistent with Leah's L-31 / L-33 frame) | 2/3/2/1 = 8 | A | People DB (former ops VP, unnamed) | `org-design`,`person`,`history` |
| F-39 | 0:39:20 | Frank | Frank had been asking for digital order verification "for years at AGR" — rejected at $1B parent. Shipped at 1915 South in a day | 1/3/2/1 = 7 | A | `frank-corpus` §motivation | `frank`,`ai-analytics`,`doctrine` |
| F-40 | 0:43:46 | Frank | **Sales-management doctrine:** "any obstacle put in front of a salesperson and they won't do it — simplify, remove obstacles, they'll execute" | 1/3/3/1 = 8 | A | `frank-corpus` §doctrine | `frank`,`sales`,`doctrine` |
| F-41 | 0:46:23 | Frank | **1915 South exec team norm per Frank:** psychological safety + challenge culture. "We've always done it this way" is taboo phrase | 2/3/3/1 = 9 | A | Context Vault · culture log | `culture`,`org-design` |
| F-42 | 0:47:43 | Frank | **Brady → Thomasville in ~2 weeks** (late May 2026); Frank may travel to Bentonville to meet Brady in person | 3/2/2/1 = 8 | A | schedule log | `frank`,`date`,`action` |

---

## Save Summary

**Total turns analyzed:** ~140 across both calls
**Saved:** 57 (Leah call) + 42 (Frank call) = **99 atomized saves**
**Discarded:** ~40 batches (pleasantries, Brady-self, filler, redundant)
**Save rate by content (excluding pleasantries):** ~71% — high, but justified by the relationship density of two intro calls before a June 1 start

**By destination:**
- Per-person corpus: 51 entries (Leah 18, Frank 22, Justin 7 reported, Russell 4 reported, Amanda 1 reported)
- Notion Context Vault: 38 entries to write
- People DB: 9 new/updated entities (Bo, Wayne, Josh, Scott-training, Christie-Grieve, Steve-King, Melanie, Kim, former ops VP)
- New SFDRs: 3 (SFDR-021 delivery cost allocation, SFDR-022 "Russell owner's son" identity, SFDR-023 real-estate ownership structure reconciliation)
- Streaming Notes actions: 5 (background check, Josh provisioning coordination, PTO follow-up, Otter note-taker setting, Thomasville visit planning)
- Onboarding doc updates: 7 key dates (5/31 conversion, 6/1 4-system go-live, 6/12 Fiserv, 7/1 insurance, ~end-May Thomasville visit)

**Brady-positioning record (cross-call):**
- Established Danville VA hometown with BOTH Leah and Frank (rapport asset)
- Positioned to Frank as "won't be a back-office CFO" — ops-engaged operator
- Established ERP-migration experience with Leah; AI/Claude alignment with Frank
- Acknowledged with Leah that Justin only briefed him at 30K-foot on systems — flags Leah-as-deeper-source

**New durable governance (high-signal, cross-call):**
- 1915 South was **structurally informal before Justin** — no titles until ~Jan 2025
- **Real estate: ~50% of 29 stores company-owned**, COVID-rate-locked, growth-market siting led by Russell personally
- **June 1 cutover = 4 systems** (Storis + Avalara + QB Desktop + bill.com), conversion Sunday 5/31, key risk: Josh on vacation that week
- **AI is real and shipping at 1915 South**, not aspirational: Theo (Frank+Scott custom-trained, FrontlineIQ), Advocate AI (YPO-sourced), Package AI (bundled in Storis), Frank's Claude email automation (measured lift), Frank's order-verification web app (GitHub-hosted, live on store tablets)
- **Frank-Justin sales bonus restructure complete** — input-lever model live, with measurable Q1-Q2 performance lift in down-traffic environment
- **AGR licensee hierarchy:** 1,150 stores total, 250 corporate, 1915 South = #3 licensee
- **Scott Turner died Feb-Mar 2025**, ~same timeframe as Justin's operational takeover — succession context tighter than previously documented
