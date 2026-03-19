# Dev Plan: STIHL Competitive Intelligence Surface

## What We're Building

A private intelligence surface for Rob Jenson that replaces the output of an internal insights team. Six sections, each populated with real content — not placeholders, not demos.

The surface lives at mception.ai under the existing portal shell (Next.js, Clerk auth, self-contained STIHL routes).

## Information Architecture

```
Home
Competitors
Digital Analytics
Artifacts (includes prompts)
Data
Requests
```

### Home
The working front door. Not a dashboard — a tight operating surface.
- What matters today (one primary insight, one recommendation)
- Today's update / daily increment
- 2-3 favorited prompts (copy-to-clipboard, ready for AI)
- One recommended artifact
- Recently updated data block

### Competitors
Each competitor gets a real profile, not a card.
- Current position
- Latest change
- Why it matters to STIHL
- Linked artifacts
- Linked underlying data

Initial competitors: Husqvarna, Deere & Co, Toro, Honda Power Equipment, Echo/Yamabiko, Milwaukee Tool (TTI)

### Digital Analytics
The audit and measurement section. Analytical, not marketing.
- Site performance findings
- Search / SEO changes
- Marketplace observations
- Feature gaps vs competitors
- Linked screenshots, crawls, source notes

### Artifacts
The action/output layer. Finished examples + reusable templates.
- Each artifact has an attached prompt ("use this prompt to regenerate or customize")
- Copy-to-clipboard on every prompt
- Daily starter prompts get favorited to Home

Initial artifacts:
- Executive one-pager
- Tariff impact memo
- Competitor battlecard (Husqvarna)
- Digital benchmark snapshot
- Leadership briefing template
- Dealer talking points template

### Data
The compounding asset. A real library, not a content page.
- Saved facts, tables, source notes
- Each item has: title, type, source, date, tags, status
- Linked to competitors / artifacts / analyses
- This is the substrate — other sections are curated views built from it

Initial data categories:
- Financial metrics (revenue, margins, stock)
- Tariff and trade policy
- Product launches and recalls
- Market share estimates
- Digital performance benchmarks
- Source documents and links

### Requests
Concierge intake. Simple.
- "What do you need answered?"
- Suggested quick actions (prepare brief, compare competitor, audit a page, build talking points)
- Optional deadline / meeting context
- Not a ticketing system — a conversation starter

## Build Phases

### Phase 1: Structure and Navigation
**Goal:** All 6 routes exist with correct IA and navigation. Content can be placeholder but structure is final.

- [ ] Create/update route structure: `/stihl/home`, `/stihl/competitors`, `/stihl/digital`, `/stihl/artifacts`, `/stihl/data`, `/stihl/requests`
- [ ] Update nav to match new IA (retire old routes: Today, About)
- [ ] Home page layout with all blocks (empty shells OK)
- [ ] Competitor profile page template
- [ ] Artifacts page with prompt card component (copy-to-clipboard)
- [ ] Data page with item list and metadata display
- [ ] Requests page with intake form

### Phase 2: Data Model and Content Seeding
**Goal:** Real content in `stihl-data.ts` (or equivalent) for all sections. Every item passes the content test: specific, dated, says why STIHL should care, implies an action.

- [ ] Restructure data model to support all 6 sections
- [ ] Seed competitor profiles (6 competitors, real data)
- [ ] Seed digital analytics findings (real observations from stihlusa.com and competitors)
- [ ] Seed initial artifacts (4-6 finished examples with attached prompts)
- [ ] Seed data library (financial metrics, tariff data, product launches, benchmarks)
- [ ] Seed Home page content (today's insight, recommendation, favorited prompts)
- [ ] Write 8-12 prompt templates across categories (daily brief, battlecard, tariff analysis, digital audit, leadership memo, dealer talking points)

### Phase 3: Polish and Proof
**Goal:** The surface looks and feels like a professional intelligence product. Rob can use it without explanation.

- [ ] Copy and naming cleanup (plain English, executive-safe language everywhere)
- [ ] Visual hierarchy — Home communicates the main point in under 60 seconds
- [ ] Prompt copy-to-clipboard works reliably
- [ ] Artifact display is clean and presentation-ready
- [ ] Data items have proper metadata and linking
- [ ] Competitor pages show real depth (not just surface cards)
- [ ] Cross-linking works: data items link to competitors, artifacts link to prompts, Home links to everything

### Phase 4: Delivery and Handoff
**Goal:** Rob is using it.

- [ ] Final content review (Phil reviews all client-facing output)
- [ ] Remove any builder-facing language or internal references
- [ ] Test the "60-second test" — can someone understand the main point and take action in under a minute?
- [ ] Deploy to mception.ai
- [ ] Walk Rob through the surface
- [ ] Collect first round of feedback and requests

## Content Rules

Every item shown in the UI must pass these tests:
1. Is it specific?
2. Is it dated?
3. Does it say why STIHL should care?
4. Does it imply an action, decision, or talking point?
5. Is this the best use of first-screen real estate?

If not, it moves down a level or gets cut.

## Copy and Naming Standards

Use:
- "What matters now" (not "Quick pulse")
- "Financial watch" (not "Market pulse")
- "New launches" (not "Launch radar")
- "Tariff watch" (can stay)
- "Examples" or "Artifacts" (not "deliverables library")
- "Request" (not "Requests" — singular, concierge tone)

Avoid anywhere in the UI:
- workspace, cockpit, radar, signal stack
- trust posture, low-friction pilot
- static-first content model
- any internal/builder language

## Technical Constraints

- Stay within the existing Next.js portal shell
- Keep seeded content in data files (no backend required for MVP)
- Auth handled by Clerk at portal level
- No built-in chat — prompts are the AI bridge
- No integrations yet — pure content surface
- Self-contained STIHL routes (don't depend on shared components beyond portal shell)

## Success Criteria

The build worked if Rob can do all three without explanation:
1. Understand the main point in under a minute
2. Copy a prompt into ChatGPT or Claude in one click
3. Open an artifact and immediately understand the quality bar

And the ongoing test: does this surface make Rob smarter every time he opens it?
