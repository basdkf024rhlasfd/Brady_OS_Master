# Dev Plan: STIHL Competitive Intelligence Surface

## What We're Building

A private intelligence surface for Rob Jenson that replaces the output of an internal insights team. The current canonical implementation is the standalone viewer in Brady OS backed by markdown knowledge-base files.

The earlier Next.js portal plan remains useful as product reference, but it is not the current source of truth for implementation.

## Information Architecture

```
Brief
Competitor Watch
New Launches
Digital Analytics
Tariff Watch
Financial Watch
Examples
Geography & Weather
Method & Sources
Request Inbox
Saved
```

### Brief
The working front door. Not a dashboard — a tight operating surface.
- one lead signal
- one recommendation
- a few supporting facts
- direct links into deeper pages

### Competitor Watch
Each competitor page should answer four questions:
- What changed?
- Why does it matter?
- What should STIHL watch next?
- What should STIHL do with that information?

### New Launches
Launch coverage should track only launches that change the expectation set for STIHL, dealers, or leadership.

### Digital Analytics
The audit and measurement section. Analytical, not marketing.
- Site performance findings
- Search and browse observations
- Marketplace observations
- Feature gaps versus competitors

### Tariff Watch
The current tariff story, the usable numbers, and the talking points that come out of them.

### Financial Watch
Supporting context only. Helpful after the main commercial signal is clear, not before.

### Examples
Finished deliverable patterns that set the quality bar:
- Morning Brief
- Tariff memo
- Competitive battlecard
- Digital benchmark snapshot
- Category one-pager

### Geography & Weather
Regional timing context when it changes demand or dealer behavior enough to matter.

### Method & Sources
The page that explains where signals come from and what standards a claim must meet before it gets surfaced.

### Request Inbox
Concierge intake:
- what do you need answered
- how soon do you need it
- a few suggested request starters

### Saved
Browser-local storage for snippets, notes, and templates the user wants to keep close.

## Build Phases

### Phase 1: Structure and Navigation
**Goal:** The standalone viewer has a clear navigation model and the briefing reads as one coherent product.

- [ ] Make the standalone viewer the canonical STIHL surface inside Brady OS
- [ ] Align nav labels with client-facing language
- [ ] Keep the Morning Brief as the clear starting page
- [ ] Keep the request inbox simple and concierge-style
- [ ] Preserve search and save flows without turning the product into a dashboard

### Phase 2: Content Seeding and Quality Control
**Goal:** Every markdown page passes the content test: specific, dated, says why STIHL should care, implies an action.

- [ ] Tighten the Morning Brief around one lead signal and one recommendation
- [ ] Make competitor pages about latest change plus implication, not generic profiles
- [ ] Keep digital findings observational and commercially relevant
- [ ] Keep examples concrete enough to set a quality bar
- [ ] Attach source and timing language to all time-sensitive claims

### Phase 3: Polish and Proof
**Goal:** The viewer feels like a professional intelligence product. Rob can use it without explanation.

- [ ] Copy and naming cleanup (plain English, executive-safe language everywhere)
- [ ] Visual hierarchy — Home communicates the main point in under 60 seconds
- [ ] Search works across the knowledge base
- [ ] Save flows work reliably in-browser
- [ ] Request inbox feels lightweight and trustworthy
- [ ] Cross-linking between pages works cleanly
- [ ] Viewer access is acceptable for a static internal surface

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

- Keep the current implementation inside Brady OS until the broader product strategy hardens
- Keep seeded content in markdown and local viewer logic
- No backend required for MVP
- No built-in chat
- No integrations yet
- Static access controls are acceptable for internal sharing, but should not be confused with full security

## Success Criteria

The build worked if Rob can do all three without explanation:
1. Understand the main point in under a minute
2. Copy a prompt into ChatGPT or Claude in one click
3. Open an artifact and immediately understand the quality bar

And the ongoing test: does this surface make Rob smarter every time he opens it?
