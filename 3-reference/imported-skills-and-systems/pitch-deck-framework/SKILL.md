---
name: pitch-deck-framework
description: |
  12-section structured pitch deck framework for investor, partner, and board presentations.
  TRIGGER when Brady says: "pitch deck framework," "investor deck," "build a pitch deck
  using the framework," "12-section deck," or references VC Corner / Ruben's framework.
  This is an IMPORTED system — it lives standalone and references core OS tools
  (deck-generator, mception-design-system) for rendering but does not modify them.
---

# Pitch Deck Framework

A structured 12-section framework for building investor-ready, partner, or board pitch decks. Provides the content architecture — pair with `deck-generator` for Marp slides or `mception-design-system` for a one-pager variant.

## Relationship to Core OS

- **This skill:** Defines WHAT goes in a pitch deck (content framework, section prompts, structure)
- **deck-generator:** Defines HOW to render slides (Marp CLI, mception theme, HTML/PDF/PPTX output)
- **mception-design-system:** Defines HOW to render a one-pager variant (tabloid/letter, dark/light)

If promoted into the full OS, this framework would likely become a template set within `deck-generator`.

## The 12 Sections

### 1. Purpose & Vision
State your purpose and vision in a single, concise sentence. This is the "why we exist" slide — not the product, not the team, just the north star.

**Prompt:** What change are you trying to create in the world? Say it in one sentence a 10-year-old could understand.

### 2. Target Audience
Clarify the specific organizations or people you serve and the problems they face.

**Prompt:** Who exactly are your customers? Be specific — industry, size, role, geography. What keeps them up at night?

### 3. The Problem
Describe the financial, business, and personal issues caused by the problem you solve. Make it visceral.

**Prompt:** What are the three dimensions of pain — financial cost, operational friction, and personal frustration? Quantify where possible.

### 4. The Solution
Present a clean, ordered solution. Show how your product maps directly to the problems in Section 3.

**Prompt:** For each problem you listed, what does your solution do about it? One-to-one mapping. No feature dumps.

### 5. Commercial Model
Outline your pricing structure for different customer segments.

**Prompt:** How do you make money? What are the pricing tiers, unit economics, and margins? Who pays, how much, and how often?

### 6. Market Analysis
Size the market using TAM → SAM → SOM.

**Prompt:**
- **TAM** (Total Addressable Market): Everyone who could theoretically buy this
- **SAM** (Serviceable Addressable Market): The slice you can actually reach with your current model
- **SOM** (Serviceable Obtainable Market): What you can realistically capture in 2-3 years

### 7. Market Viability
Prove this market is real, not theoretical.

**Prompt:** Is competition present? (If SOM > 0, competition = validation.) Use SAM as a sanity check. What indicators suggest future growth? Regulatory tailwinds? Behavioral shifts?

### 8. Evidence of Success
Show traction. Customers, contract values, pipeline, testimonials, case studies.

**Prompt:** What proof do you have that this works? List customers (or customer count), revenue/ARR, contract values, growth rate, NPS, retention, pipeline size. If pre-revenue, show LOIs, pilots, waitlist.

### 9. Future Growth
Highlight key points from your financial models.

**Prompt:** What does the 3-year projection look like? Revenue trajectory, margin expansion, key inflection points. What assumptions drive the model?

### 10. Unique Advantage
Explain your moat — the thing competitors can't easily replicate.

**Prompt:** What do you have that's defensible? Technical IP, data network effects, regulatory lock-in, switching costs, brand, team expertise? Be honest — "first mover" is not a moat.

### 11. Horizon Mapping
Show the company's evolution across three time horizons.

**Prompt:**
- **H1 (Now → 12 months):** Leverage existing products, deepen current market
- **H2 (12-24 months):** Extend into adjacent markets, services, geographies
- **H3 (24-48 months):** Invest in disruptive, long-term product development

### 12. The Team
Highlight the team's talent, board of advisors, and talent attraction plans.

**Prompt:** Who are the key people? What makes them uniquely qualified for THIS problem? Include advisors and board members. What key hires are planned?

## Output Options

### Option A: Slide Deck (via deck-generator)
Use `3-reference/skills/deck-generator/` to render as a Marp deck.
- Map each section to a slide (or slide pair for data-heavy sections)
- Use existing slide classes: `title`, `card`, `problem`, `stat`, `split`, `closing`
- Sections 5, 8, 11, 12 may need custom layouts

### Option B: One-Pager (via mception-design-system)
Use `3-reference/skills/mception-design-system/` to render as a single-page infographic.
- Distill each section to 1-2 lines + a key metric
- Works for email teasers, LinkedIn posts, conference handouts

### Option C: Interactive Artifact
Build as a React component with tabs per section. Useful for iterating on content before rendering.
- This would live in a separate app workspace, not in Brady OS

## Use Cases

- **Broker Co** — investor-ready pitch deck
- **mception.ai** — service offering / capabilities deck
- **Client deliverable** — build pitch decks as a consulting service
- **Fractional CAIO** — positioning deck for Brady's consulting practice

## References

- `references/section-guide.md` — detailed guidance per section (what to include, examples, common mistakes)
- `references/example-outline.md` — filled-in example using a fictional company
