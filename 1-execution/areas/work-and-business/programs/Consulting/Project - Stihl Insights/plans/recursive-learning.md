# Recursive Learning Framework: STIHL Competitive Intelligence

## Why This Exists

The entire value proposition of this engagement is that the system gets smarter over time. If we build a static surface and maintain it manually, we're just a slower, cheaper version of Rob's current team. The compounding effect — where every week's work makes next week's work faster and better — is the actual product.

That means learning is not a nice-to-have. It's the core mechanism. Every cycle must capture what worked, what didn't, what Rob actually used, and feed that back into the next cycle.

## The Learning Loop

```
OBSERVE → CAPTURE → SYNTHESIZE → ADAPT → DELIVER → OBSERVE
```

### 1. Observe (What actually happened?)

Every week, before producing new content, answer:

- **What did Rob open?** Which sections, which pages, how often?
- **What did Rob copy?** Which prompts got copied? Which didn't?
- **What did Rob request?** Requests are the strongest signal — they tell you exactly what's missing.
- **What did Rob ignore?** Sections with zero engagement are either badly positioned or not useful.
- **What feedback did Rob give?** Explicit (messages, requests) and implicit (what he stopped using).

Observation sources:
- Request submissions through the surface
- Direct feedback from Rob (via Brady)
- Usage patterns (if analytics are available)
- Absence of engagement (the most important signal)

### 2. Capture (Record it before it's lost)

Every observation gets recorded in the Data section of the surface with metadata:

```
- Type: feedback | usage-signal | request | gap
- Date: YYYY-MM-DD
- Source: Rob (direct) | Rob (inferred) | Brady (observation) | System (analytics)
- Signal: [what happened]
- Implication: [what it means for the surface]
- Action taken: [what we changed, or "pending"]
```

This is not a private log. These observations are part of the compounding data library. Over time, they become a pattern map of what Rob values most.

### 3. Synthesize (What does the pattern say?)

Every 4 weeks, the Feedback Synthesizer runs a synthesis pass:

- **Top 3 most-used features** — double down on these
- **Top 3 least-used features** — investigate why (bad content? wrong placement? not useful?)
- **Request patterns** — what categories of request keep showing up? These become permanent sections.
- **Prompt effectiveness** — which prompts produce good outputs? Which need rewriting?
- **Content quality trend** — is the surface getting more specific and actionable, or drifting toward generic?
- **Data library health** — how many items added, how many stale, how many actually linked to other sections?

The synthesis produces a one-page **Learning Brief** that goes into the plans folder and directly informs the next cycle's priorities.

### 4. Adapt (Change the system, not just the content)

Based on the synthesis, make structural changes — not just content updates:

**Content-level adaptations:**
- Retire prompts that never get copied
- Promote prompts that get copied frequently to Home
- Rewrite competitor profiles that aren't getting engagement
- Add new data categories based on request patterns
- Update artifact templates based on what Rob actually presents to leadership

**Structural adaptations:**
- Reorder sections based on usage (most-used first)
- Merge sections that overlap
- Split sections that try to do too much
- Add new sections if a clear pattern of requests demands it
- Change Home's "what matters now" selection criteria based on what Rob actually acts on

**Prompt-level adaptations:**
- Improve prompts based on the quality of outputs they produce
- Add context fields that users consistently need to fill in manually
- Remove context fields that users skip
- Create new prompt categories based on recurring request types

### 5. Deliver (Ship the improved version)

Every weekly update should include at least one visible improvement that came from the learning loop. Rob should feel the surface getting smarter — not just getting new content, but getting better at knowing what he needs.

Flag it lightly: "Based on your recent requests, we added X" or "The Husqvarna profile now includes Y because you asked about Z last week."

This is the proof that the system compounds. It's also the proof that the retainer is worth it.

## What Gets Measured

### Weekly (per update cycle)
- Items added to data library
- Prompts copied (if trackable)
- Requests submitted
- Sections updated
- Time spent on maintenance

### Monthly (per synthesis cycle)
- Net data library growth (added minus stale/removed)
- Request-to-feature conversion rate (requests that became permanent content)
- Prompt effectiveness score (subjective: did copied prompts produce good outputs?)
- Rob engagement trend (increasing, stable, declining)
- Maintenance time trend (should decrease over time)

### Quarterly (health check)
- Is the surface Rob's primary competitive intelligence source?
- Has the data library reached critical mass (enough to support any reasonable request without starting from scratch)?
- Is maintenance time at or below the 1-hour target?
- Would Rob notice if the surface stopped updating?

## The Compounding Effect

The system should get observably better in these specific ways:

**Month 1:** Surface is useful but requires significant weekly work. Data library is thin. Prompts are good but not yet tested by real use.

**Month 2:** Data library has real depth. Prompts have been refined based on what Rob actually copies. Competitor profiles reflect Rob's actual priorities, not our assumptions. Weekly maintenance is faster because updates build on existing substance.

**Month 3:** The surface anticipates Rob's needs. Request volume drops because the surface already covers most of what he'd ask for. New content is incremental, not foundational. Maintenance is approaching the 1-hour target.

**Month 6:** The surface is a genuine intelligence asset — accumulated knowledge that would take months to rebuild from scratch. The retainer isn't paying for weekly labor; it's paying for access to a compounding intelligence base that gets more valuable every week.

## Who Owns What

| Role | Learning Responsibility |
|------|------------------------|
| **Musashi San** (Product Owner) | Decides what adaptations to make based on learning data. Owns the "what changes next" decision. |
| **Feedback Synthesizer** | Runs the monthly synthesis. Produces the Learning Brief. |
| **Account Strategist** | Interprets learning signals in the context of the client relationship. Flags if engagement is dropping or if the retainer is at risk. |
| **Claudine** (Builder) | Implements adaptations. Updates data model and content. |
| **Phil** (Reviewer) | Pressure-tests the synthesis: are we learning the right things? Are we adapting in the right direction? |
| **Brady** | Sole channel for Rob's direct feedback. Relays observations to the team. |

## Anti-Patterns

Things that look like learning but aren't:

- **Adding features Rob didn't ask for** — that's building, not learning
- **Logging observations without acting on them** — that's bureaucracy
- **Changing the surface every week** — that's instability, not improvement
- **Assuming what Rob wants instead of observing** — that's projection
- **Treating all feedback equally** — a request is stronger than a comment; usage data is stronger than both
- **Optimizing for engagement metrics instead of usefulness** — Rob opening the surface more often is not the goal; Rob making better decisions is

## Integration with the OS

This learning loop is the Cycle-horizon activity for this project:

- **Day horizon**: Produce and deliver content updates
- **Cycle horizon**: Run the learning loop, synthesize, adapt
- **ARC horizon**: Brady decides if the engagement model itself needs to change

The learning data lives in the Data section of the surface (visible to Rob as accumulated intelligence) and in the project's plans folder (as Learning Briefs, visible to the team).

When this project completes or converts to ongoing maintenance, the learning framework itself becomes a reusable template in Layer 3 (Reference) for future consulting engagements. Every client after Rob benefits from what we learn here about how to build a compounding intelligence service.
