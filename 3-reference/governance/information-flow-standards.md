# Information Flow Standards — Roll-Up / Roll-Down / Handoff

**Status:** Active
**Established:** 2026-02-02
**Purpose:** Standardize how information moves through the hierarchy
**Notion source:** Systems & Operating Manuals (migrated to GitHub as canonical)

---

## The Three Information Flows

| Flow Type | Direction | Purpose | Key Principle |
|-----------|-----------|---------|---------------|
| **Roll-Up** | Child to Parent | Reporting, escalation, requests | Summarize, don't dump |
| **Roll-Down** | Parent to Child | Decisions, specs, authority | Be explicit, don't assume |
| **Handoff** | Peer to Peer | Collaboration, consultation | State context, don't expect mind-reading |

---

## Roll-Up Standards

> *"Your parent should never have to ask 'what does this mean?' or 'what do you need from me?'"*

Every roll-up must be **self-contained** — the recipient can act on it without follow-up questions.

### Compression Rules

| Level | Max Length | Focus |
|-------|-----------|-------|
| Ronin > Musashi San | 1 page | Specific, tactical |
| Musashi San > Claudine | 1/2 page | Strategic summary |
| Claudine > Brady | 3-5 bullets | Executive headline |

**Compression Formula:**
- Start with conclusion/ask
- Support with 2-3 key facts
- Appendix details only if requested

### Roll-Up Types

**Status Update:** Overall health (green/yellow/red), progress, in-flight items, blockers, next period priorities.

**Escalation:** Issue, impact if not resolved, options with tradeoffs, recommendation, why you can't decide this alone.

**Completion Report:** Status, spec compliance, deviations, quality self-assessment, domain expert validation, next steps.

**Request:** Specific ask, justification, impact if denied, alternatives considered, timeline.

---

## Roll-Down Standards

> *"Your child should never have to guess what you meant or what authority they have."*

Every roll-down must be **actionable** — the recipient knows exactly what to do.

### Expansion Rules

| Level | Detail Level | Includes |
|-------|-------------|----------|
| Brady > Claudine | Strategic direction | Why, constraints, success criteria |
| Claudine > Musashi San | Program priorities | Scope, resources, timeline |
| Musashi San > Ronin | Full spec | Every detail needed to build |

**Expansion Formula:**
- State the decision/direction clearly
- Explain the WHY (context)
- Define the boundaries (what's NOT included)
- Specify success criteria
- Grant explicit authority

### Roll-Down Types

**Decision:** Clear statement, rationale, effective date, implications for recipient, appeal path.

**Spec Handoff:** Summary, critical sections, gold medal criteria, authority granted, domain expert contact, deadline.

**Feedback:** Overall verdict (approved/revise/rejected), strengths, what needs work with specific fixes, next steps.

**Authority Grant:** What's granted, limits, escalation triggers, duration, documentation requirements.

---

## Handoff Standards

> *"Never assume your peer knows what you know or needs what you need."*

Every handoff must be **context-complete** — recipient can act without chasing background.

### Handoff Types

**Question:** Specific question, context, current assumption, impact if assumption wrong, deadline.

**Validation Request:** Deliverable, what you need (approve/feedback/gut check), specific questions, your assessment, deadline.

**Information Share:** FYI content, why it matters to recipient, action needed (if any).

---

## Quality Gates

Before sending ANY structured communication:

| Check | Question | If No |
|-------|----------|-------|
| Complete | Does recipient have everything they need? | Add missing info |
| Clear | Will recipient understand without follow-up? | Simplify |
| Actionable | Does recipient know what to do? | Add explicit ask |
| Bounded | Does recipient know what NOT to do? | Add constraints |
| Timely | Does recipient know when? | Add timeline |

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|-------------|-------------|-----|
| "See attached" | Forces recipient to hunt | Summarize in message |
| "Let me know if questions" | Passive, unclear | State specific ask |
| "ASAP" | Meaningless urgency | Give real deadline |
| "FYI" with no context | Recipient doesn't know why | Explain relevance |
| Wall of text | Nobody reads it | Use structure |
| "Per our conversation" | No record | Document the substance |
