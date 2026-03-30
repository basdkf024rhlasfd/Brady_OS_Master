# Expansion Slots: Phase 2 Sub-Agents

These roles were identified in the original design but deferred from Phase 1. They become relevant as the company's marketing operation matures or Mark's needs shift.

---

## 1. Brand Strategist

**Domain:** Brand positioning, messaging frameworks, visual identity guidelines, brand architecture.

**Description:** Owns the strategic layer of the company's brand. Develops positioning statements, messaging hierarchies, and ensures all marketing output ladders up to a coherent brand story. Manages visual identity guidelines and brand consistency across touchpoints.

**When to activate:**
- Mark wants to formalize the company's positioning (beyond what's in `kb/manifesto.md`)
- the company is entering a new market segment and needs differentiated messaging
- A rebrand or significant messaging refresh is underway
- The hired marketer needs a brand framework to work within

**Imported agents to reference:**
- None currently in the marketing imports. This role is primarily strategic and would use the kb/ files as its primary input.

**To activate:** Create `skills/brand-strategist.md` following the sub-agent template. Move relevant content from `kb/manifesto.md` and `kb/brand-voice.md` into the agent's instructions.

---

## 2. Product Marketing

**Domain:** Product positioning, competitive analysis, sales enablement materials, launch plans, feature messaging.

**Description:** Translates the company's product capabilities into market-facing messaging. Produces competitive battle cards, sales one-pagers, feature launch announcements, and positioning frameworks. Bridges the gap between product development and market communication.

**When to activate:**
- the company launches a new product or major feature
- Mark needs sales enablement materials (one-pagers, battle cards, pitch decks)
- Competitive landscape shifts require repositioning
- the company starts a formal sales motion with collateral needs

**Imported agents to reference:**
- `marketing-growth-hacker.md` — For launch strategy and growth tactics
- `marketing-seo-specialist.md` — For product-led SEO content

**To activate:** Create `skills/product-marketing.md` following the sub-agent template. This role will lean heavily on `kb/competitive-landscape.md` and `kb/manifesto.md`.

---

## 3. Creative Director

**Domain:** Visual content strategy, design briefs, agency/freelancer management, brand visual consistency.

**Description:** Manages the visual side of the company's marketing. Creates design briefs for graphics, manages relationships with design vendors or freelancers, ensures visual consistency across platforms. Oversees production of presentation decks, social graphics, and website visual elements.

**When to activate:**
- Mark starts investing in visual content (beyond text-based posts)
- the company hires a designer or engages a design agency
- Marketing output requires consistent visual templates
- Video content becomes part of the marketing mix

**Imported agents to reference:**
- `marketing-carousel-growth-engine.md` — For visual content formats
- `marketing-instagram-curator.md` — For visual platform strategy
- `marketing-short-video-editing-coach.md` — For video content guidance

**To activate:** Create `skills/creative-director.md` following the sub-agent template. Move the visual-related imported agents from `skills/_open-source-slot.md` to this new sub-agent.
