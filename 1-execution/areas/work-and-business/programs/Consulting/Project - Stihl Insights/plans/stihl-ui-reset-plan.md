# Plan: Reset the STIHL UI Around Usefulness

## Why this plan exists

The current STIHL interface has real information in it, but the product shape is still wrong.

It reads like a dashboard to browse:
- too many parallel modules on the first screen
- too much internal/product language
- not enough hierarchy between "what matters now" and "supporting context"
- no strong handoff into the user's actual workflow with ChatGPT or Claude

The result is the exact failure mode Brady described: too complicated and not sophisticated enough at the same time.

Sophisticated does not mean more panels. It means sharper framing, clearer judgment, and faster time-to-use.

## What is wrong in the current UI

Grounded in the exported v2 files:

- `today-page.tsx` is still a multi-panel dashboard.
  - Quick pulse, go straight to work, quick stats, news feed, market pulse, tariff watch, and launch radar all compete on the same page.
  - Nothing clearly wins as the first thing Rob should do.
- `stihl-data.ts` still uses product-ish labels that feel generic or awkward in a client-facing setting.
  - `quickPulse`
  - `marketPulse`
  - `tariffSignals`
  - `launchRadar`
  - `artifactExamples`
  - `requestPrompts`
- `about-page.tsx` includes internal design rationale that is useful for builders, not for Rob.
  - "Reading order"
  - "Design notes"
  - "Source visibility"
- The current routes assume the user wants to explore the system.
  - `Today`
  - `Competitors`
  - `Digital`
  - `Artifacts`
  - `Requests`
  - `About`

That is a reasonable internal information architecture, but not the right starting experience for a lightweight executive-facing product.

## Product thesis for the next version

The STIHL UI should be a private briefing front-end with three jobs:

1. Tell Rob what matters now.
2. Give him a small number of strong actions.
3. Let him copy high-quality prompts into his AI tool immediately.

This is not a dashboard product.
This is not a generic "workspace."
This is not a chat app.

It should feel more like:
- a chief-of-staff briefing
- a prompt launchpad
- a library of polished examples

## New top-level structure

Reduce the STIHL section to five items:

1. `Brief`
2. `Prompts`
3. `Examples`
4. `Monitoring`
5. `Request`

### Why this is better

- `Brief` is the home screen and the default destination after login.
- `Prompts` makes the AI handoff explicit instead of hidden inside a request flow.
- `Examples` proves the product with tangible artifacts.
- `Monitoring` holds the supporting signal streams without turning the home page into a cockpit.
- `Request` stays simple and human.

Cut or demote:
- `About` from the primary nav
- `Artifacts` as a term
- `Digital` as a top-level destination unless it is a major selling point for this specific audience
- `Competitors` as a top-level destination unless Rob is truly spending time there daily

Those can still exist as sub-sections or secondary links.

## Page-by-page plan

### 1. Brief

This replaces the current `Today` page.

Purpose:
- orient Rob in under 60 seconds
- make one recommendation
- create obvious next actions

Layout:

#### Hero block
- Title: `STIHL Competitive Brief`
- Subtitle: one plain-English sentence on what changed
- Metadata: `Updated`, `Prepared for`, `Coverage window`

#### What matters now
- one primary insight only
- one supporting fact block
- one `What to do` recommendation

#### Use this in AI
- 3 prompt starters tied to the current situation
- each with:
  - title
  - one-sentence outcome
  - full copyable prompt
  - `Copy prompt` button

#### New since last update
- 3 to 5 bullets max
- each bullet follows: what happened -> why it matters

#### Quick links
- `Open prompt library`
- `View example memo`
- `See tariff watch`
- `Request a custom brief`

### 2. Prompts

This should be a first-class page, not an afterthought.

Purpose:
- make the product immediately useful even if Rob prefers his own AI workflow
- reduce the need for a built-in chat UI

Sections:

#### Prompt categories
- Daily brief
- Competitor analysis
- Tariff analysis
- Digital review
- Dealer talking points
- Leadership memo

#### Prompt cards
Each card should include:
- plain title
- when to use it
- expected output
- full prompt text
- optional fields to customize before copy

Example categories:
- `Summarize what changed this week and what STIHL should do about it`
- `Build a Husqvarna battlecard for leadership`
- `Turn tariff changes into dealer talking points`
- `Audit stihlusa.com against Husqvarna`
- `Draft a German leadership update`

#### Recommended prompt pattern
Each prompt should follow one stable structure:
- role
- task
- required output format
- available facts/context
- tone
- citation expectation

This is the cleanest bridge between curated intelligence and the user's preferred AI tool.

### 3. Examples

This replaces `Artifacts` in the language layer.

Purpose:
- make the offer feel real
- show what "good" looks like
- provide starting templates for future deliverables

Lead with 4 examples:
- Executive one-pager
- Tariff memo
- Competitor battlecard
- Digital benchmark snapshot

Each example should show:
- thumbnail or cover
- what question it answers
- audience
- when to use it
- open full example
- optional `Use this prompt` link

Kantar is the right reference, but the STIHL version should be cleaner and less agency-coded.

### 4. Monitoring

This page absorbs the modules currently crammed into `Today`.

Purpose:
- hold the rawer signal streams
- support the brief instead of replacing it

Sections:
- News
- Tariffs
- Competitor launches
- Financial watch
- Weather and geography
- Social themes

Rules:
- no more than one sentence of interpretation per item
- every module needs a visible "why this matters"
- no placeholder feeds
- no filler metrics

This is where terms like `Market pulse` and `Launch radar` can survive if needed, but they should not dominate the product framing.

### 5. Request

Keep it simple.

Main box:
- `What do you need answered?`

Suggested quick actions:
- `Prepare a leadership brief`
- `Compare a competitor`
- `Turn this into talking points`
- `Audit a page or feature`

Optional second field:
- `Deadline / meeting context`

This is a concierge intake, not a ticketing system.

## Copy and naming cleanup

The UI needs plainer, more executive-safe language.

Replace:
- `STIHL Competitive Briefing` -> `STIHL Competitive Brief`
- `Go straight to work` -> `Start here`
- `Artifacts` -> `Examples`
- `Requests` -> `Request`
- `Quick pulse` -> `What matters now`
- `Market pulse` -> `Financial watch`
- `Launch radar` -> `New launches`
- `Tariff watch` can stay

Avoid:
- workspace
- cockpit
- radar
- signal stack
- trust posture
- low-friction pilot
- static-first content model

Those phrases either sound internal, overdesigned, or abstract.

## Content rules for vNext

Every item shown in the UI should pass these tests:

1. Is it specific?
2. Is it dated?
3. Does it say why STIHL should care?
4. Does it imply an action, decision, or talking point?
5. Is this the best use of first-screen real estate?

If not, it should move down a level or get cut.

## First shippable slice

Do this before any broader redesign:

### Slice 1
- Replace `Today` with `Brief`
- Add a real `Prompts` page
- Rename `Artifacts` to `Examples`
- Remove `About` from the primary nav

### Slice 2
- Collapse the first screen into:
  - what matters now
  - what to do
  - 3 copyable prompts
  - new since last update
- move news, market, launch, and other feeds into `Monitoring`

### Slice 3
- Build 4 polished example artifacts
- link each example to a matching copyable prompt

This is enough to materially improve usefulness without adding backend complexity.

## Lightweight implementation approach

Stay within the current static-first model:

- keep seeded content in `src/lib/stihl-data.ts`
- add a prompt library data structure
- add a small copy-to-clipboard interaction
- reuse the existing card/panel system where possible
- do not build chat
- do not add auth complexity
- do not add integrations yet

This should be a UI and content reset, not a platform rebuild.

## Concrete build tasks

1. Create a new `brief` route and make it the default STIHL destination.
2. Create a `prompts` route with categorized copyable prompt cards.
3. Rename the `artifacts` route and language to `examples`.
4. Move `Today` support modules into a `monitoring` route.
5. Remove builder-facing content from the client-facing surface.
6. Tighten all labels and headings into plain English.
7. Build 4 finished example deliverables with matching prompts.

## Success criteria

The reset worked if Rob can do all three of these without explanation:

1. Understand the main point in under a minute.
2. Copy a prompt into ChatGPT or Claude in one click.
3. Open an example and immediately understand the quality bar.

If the UI still requires touring the system to understand its value, it is still too complicated.
