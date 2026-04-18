# Grocery Assistant — Internal

> **Internal project manifest.** Contains Brady's goals, team mechanics, and operational details.
> For the customer-facing version, see [CUSTOMER.md](CUSTOMER.md).

## Program
Personal Projects

## Customer Problem
- **Who specifically:** Brady Smallwood — single dad, 5 kids, Bentonville AR. Managing all family food logistics solo: meal planning, grocery shopping, dining out, school lunch funds, nutrition, and budget.
- **Trigger moment:** Built a static Walmart shopping list for the week and immediately realized every step of the family food lifecycle can be automated and optimized.
- **Current workaround:** Manual meal planning, manual Walmart shopping lists, no nutrition tracking, no budget visibility across food categories (groceries + dining + school funds), no kid input mechanism, no price optimization.
- **Cost of status quo:** Hours/week spent planning and shopping without optimization. Overbuying, nutritional blind spots, no family taste feedback loop, missed savings from lack of price comparison, no visibility into total food spend.
- **Evidence:** Built the v1 static list, used it, immediately saw 15+ automation opportunities from lived experience feeding a family of 6.

## Family Composition (Caloric Model)

| Name | Born | Age (2026) | School | Grade | Est. Daily Calories |
|------|------|------------|--------|-------|---------------------|
| Brady (dad) | — | adult male | — | — | ~2,400 |
| Lily Kay | 2009-04-02 | 17 | Bentonville High School | Junior | ~2,000 |
| Faith Riley | 2011-08-11 | 14 | BHS (freshman) | 9th | ~1,800 |
| Isla Kate | 2017-02-03 | 9 | Apple Glen Elementary | 3rd | ~1,600 |
| Quinn Elaine | 2017-02-03 | 9 | Apple Glen Elementary | 3rd | ~1,600 |
| Luke Brady | 2017-02-03 | 9 | Apple Glen Elementary | 3rd | ~1,800 |

**Triplets:** Isla, Quinn, Luke (born 2017-02-03)
**Household daily total:** ~11,200 cal → ~78,400 cal/week
**School district:** Bentonville Schools (bentonvillek12.org)
**School lunch portal:** TBD — not found in Gmail, ask Brady
**Delivery model:** Walmart+ delivery preferred — optimize total weekly spend including delivery fees (no in-store shopping)

## Competition
- **Direct:** Mealime, Paprika, Whisk — meal planning apps. None integrate budget, school funds, kid scoring, pantry vision, or Chrome-automated ordering.
- **Indirect:** Pen and paper, Notes app, texting the family group chat. The real competitor is inertia.
- **Time pressure:** None — this is a personal tool. Quality > speed.

## Scoreboard

### Customer Goals (the family)
- **Victory Condition:** The Smallwood family eats well, within budget, with minimal manual planning effort and maximum kid buy-in.
- **Key Results:**
  - KR1: Weekly meal plan generated with < 5 min of Brady input (vs. 30+ min today)
  - KR2: Total weekly food spend (groceries + dining + school) tracked and visible in one place
  - KR3: Kids actively rate meals and request items through the system
- **Leading Indicator:** Brady uses the system instead of bypassing it for 4 consecutive weeks

### Internal Goals
- **Victory Condition:** A working family food OS that runs mostly on autopilot — Brady reviews and approves, not builds from scratch each week.
- **Key Results:**
  - KR1: Grocery list auto-generated from meal plan + pantry scan by end of Phase 2 — Score: _/1.0
  - KR2: Budget tracking live across all 3 food categories by end of Phase 3 — Score: _/1.0
  - KR3: Kid scoring system has 4+ weeks of data and visibly influences meal selection by end of Phase 4 — Score: _/1.0
- **Leading Indicator:** Number of manual overrides Brady makes to the auto-generated list (should trend toward zero)

### How They Connect
If the family eats better food they enjoy at a price Brady controls, with kids feeling heard — Brady's internal KRs (automation, budget visibility, feedback loop) are the mechanisms that make that happen.

- **Medal:** Gold (0.7+) / Silver (0.4–0.6) / Bronze (0.1–0.3) / DNS (0.0)

## Timeline
- Start: 2026-04-16
- Target end: Ongoing — phased rollout
- Hard deadlines: None

## Phases

### Phase 1: Static List (DONE)
- Walmart shopping list HTML on mception.ai/grocery-assistant
- Categorized items, checkboxes, Walmart deep links, meal plan display

### Phase 2: Smart List Generation
- Fridge/pantry vision scanning (photo → inventory)
- Meal plan → auto-generated grocery list
- Nutrition guardrails (caloric sanity check for household of 6)
- New item suggestions based on family preferences and seasonal availability

### Phase 3: Budget & Price Intelligence
- Walmart order history + subscription sync
- Price comparison (Walmart vs. Sam's Club vs. Aldi/Harps)
- Weekly food budget target with enforcement
- Total food spend = groceries + dining out + school lunch funds
- School lunch fund balance monitoring + Chrome auto-top-up

### Phase 4: Family Input Loop
- Kid request interface (portal page, NOT Telegram — simple visual grid they can use from a phone link)
- Kid meal scoring (1-5 rating after each meal)
- Family taste profile: optimization across cost, ease, nutrition, kid rating
- Sweep integration: catch "we need ___" signals from iMessage/texts

### Phase 5: Dining & Recipes
- Eat-out nights in the meal plan (takeout + restaurant)
- Chrome-automated ordering (DoorDash, Domino's, etc.)
- Restaurant recommendations: kids eat free, family-friendly deals in NWA
- Recipe cards with one-tap "Cook with me" chat prompts (Claude/ChatGPT)
- Custom instructions for engaging family cooking sessions

## Team

| Agent | Role | Profile |
|-------|------|---------|
| Musashi San | Product Owner | `0-agents/custom-built-agents/musashi-san.md` |
| Claudine | Builder | `0-agents/custom-built-agents/claudine.md` |
| Phil | Reviewer | `0-agents/custom-built-agents/phil.md` |
| Bo | Ops / Scope Guard | `0-agents/custom-built-agents/bo.md` |

### Interaction Rules
Standard OS defaults. Builder executes phases, PO prioritizes features within phases, Phil reviews for scope creep and quality, Bo watches budget/ops integration.

### Authority
- Day (execution decisions): Claudine + Musashi San
- Cycle (scope/team changes): Musashi San + Brady
- ARC (project kill/pivot): Brady

## Recursive Learning
Kid meal scores + purchase history + budget actuals build a compounding dataset. Each week the system gets better at predicting what the family wants, what it costs, and what's nutritionally sound. The optimization function improves with every cycle: **cost + ease + nutrition + kid rating**.

## Where Things Live

| What | Where |
|------|-------|
| Code / deliverables | mception-ai repo (portal-native, embedded in public/) |
| Tasks | Notion (linked to Personal Projects program) |
| Notes / memory | Notion Memory layer |
| Communication | Conductor workspace |
| Internal manifest | This file |
| Customer manifest | [CUSTOMER.md](CUSTOMER.md) |
| OS governance | Brady_OS_Master repo |

## Publishing
- Visibility: mception.ai
- Slug: grocery-assistant
- Allowlist entry: approved 2026-04-16

## Status
- Phase: Phase 1 complete
- Last updated: 2026-04-16
- Final medal: pending
