# PR/FAQ — Press Release and Frequently Asked Questions

**Source:** Amazon (developed under Bezos). Canonical description in *Working Backwards*
by Bryar & Carr (2021).
**Core principle:** Write the press release announcing the finished product before
building anything. If you can't write a credible PR, don't build.

## When to apply

- New product, feature, or format is being proposed
- Teams keep building things customers don't want
- "Whiteboard conversations" end without a clear decision
- Cross-functional alignment is fuzzy
- Stakeholders disagree on what the thing actually is

## The framework

**Two documents, written before any engineering:**

**1. The Press Release (1 page)**

Structured as if it were going to *Wall Street Journal* on launch day:

- **Headline** — name of product, one-line benefit
- **Sub-headline** — who it's for, what problem it solves
- **Summary paragraph** — what it is in plain English
- **Problem paragraph** — the pain point, in the customer's voice
- **Solution paragraph** — how the product solves it
- **Leader quote** — why this matters at the company level
- **Customer experience paragraph** — how the customer uses it; starts with action
- **Customer quote** — testimonial from a hypothetical user
- **Call to action** — how to get it

**2. The FAQ (5 pages max)**

Two sections:

- **External FAQ** — questions journalists and customers would ask
- **Internal FAQ** — questions the leadership team would ask (unit economics, tech
  risk, competitive response, scaling, edge cases, regulatory)

The internal FAQ is where the hard work happens. Hard questions from finance, legal,
ops, engineering. Answers must be specific and evidence-based.

**The discipline:**

1. **Work backward from the customer experience.** Don't start with what you can
   build; start with what customers would want.
2. **No bullets, no decks.** Six-page narratives only. Writing clearly forces thinking
   clearly.
3. **Read the PR/FAQ together in silence.** First 20 minutes of any review meeting.
   Then Q&A.
4. **Iterate before committing engineers.** 5-10 drafts is typical. If after 5 drafts
   the story still doesn't work, kill it.

**Why it works:**

- Forces you to articulate the customer benefit, in plain English, before spending
  money on the feature
- Exposes vague thinking immediately
- Creates a single source of truth across product, eng, marketing
- Kills bad ideas cheaply — the best ones survive stress-testing

## Canonical example

Amazon Prime launched via PR/FAQ. The first draft focused on free shipping; iteration
surfaced that customers cared about time predictability (not just cost), that the
unit economics needed a subscription to work, that the threshold for "free" had to be
below a specific order size. The launched product reflected the 12th or so draft.

Kindle, AWS, Echo, Go — all started as PR/FAQs. Many Amazon product failures (Fire
Phone being the public example) had PR/FAQs that should have been killed but weren't.
The document is necessary, not sufficient.

## Applied to QSR / retail / ops

- **New format rollout:** Before spending design $ on a new store format, write the
  PR: "[Brand] launches [format name], a [size]-SF [type] designed for [who]." If the
  customer quote rings false, stop.
- **Operational change:** "[Brand] eliminates the cashier role with mobile ordering
  across all locations, reducing labor costs by X% and cutting wait times by Y%." If
  the headline's numbers feel invented, don't launch.
- **Channel launch:** "[Brand] Wok Bar is now available on DoorDash as a delivery-only
  virtual brand serving [menu]." If the internal FAQ can't answer kitchen capacity,
  quality control, and brand protection questions, don't launch.
- **Pilot design:** Every ops innovation pilot deserves a PR/FAQ. It clarifies
  success metrics, scope, and the "how would this look if we scaled it?" question.

## Common failure modes

- Writing the PR/FAQ after the decision is made. Turns the document into a
  justification instead of a forcing function.
- Using PR/FAQs for features that don't need them. Reserve for new things and major
  changes. Small tweaks don't need six pages.
- Internal FAQ without specifics. "We'll figure it out" is not a valid answer.
- Executives who don't read the document before the meeting. The silent reading
  ritual is load-bearing.

## Reading

- Bryar & Carr, *Working Backwards* — entire book; chapters on PR/FAQ, bar raiser, and
  input metrics are core
- Colin Bryar's blog / talks on the mechanics
- Amazon 1997 shareholder letter — the Day 1 framing PR/FAQs embody
