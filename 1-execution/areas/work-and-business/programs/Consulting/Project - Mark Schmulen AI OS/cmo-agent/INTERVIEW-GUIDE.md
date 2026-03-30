# Interview Guide: Mark Schmulen

> **Mark runs three companies: PropMatic, Saivory, and Jelly Capital.** Run sections 1, 3, and 5 for each company separately. Sections 2, 4, 6, and 7 are about Mark personally and apply across all companies.

**Purpose:** Extract the context needed to populate the CMO agent's knowledge base files.
**Duration:** 45-60 minutes
**Format:** Conversational, not interrogation. Let Mark talk. Take notes on which kb/ file each answer feeds.

---

## 1. Business Manifesto & Mission (10 min)
*Feeds: `kb/manifesto.md`*

> **Note:** Cover each company separately — PropMatic, Saivory, Jelly Capital. Ask the questions below for each one. Also ask about cross-cutting themes that connect the portfolio.

- What does [company] do in one sentence? What problem are you solving?
- Who are you building this for? What does their day look like before [company]?
- What's the origin story? Why did you start this?
- Where do you want [company] to be in 12 months? 3 years?
- What's the one thing you want people to remember about [company]?

**Cross-cutting:** What's the thread that connects all three companies? How do you describe your portfolio to someone at a dinner party?

**Listen for:** The emotional hook, not just the functional description. Mark's own words for what each company does will become the agent's default framing.

---

## 2. Brand Voice (10 min)
*Feeds: `kb/brand-voice.md`*

- How would you describe your writing style? Formal, casual, technical, storytelling?
- Show me a LinkedIn post or email you're proud of. What makes it feel like "you"?
- What tone do you never want associated with your brand? (e.g., corporate jargon, hype, clickbait)
- Do you use humor? How much?
- Are there phrases or words you use repeatedly? Any you avoid?
- Who do you admire as a communicator? (Founders, writers, speakers)
- Do you speak differently about each company? (e.g., more technical for PropMatic, more casual for Saivory)

**Listen for:** Patterns in how Mark actually speaks during the interview. His natural cadence is the voice spec. Note sentence length, use of jargon, storytelling tendencies.

---

## 3. Competitive Landscape (5 min)
*Feeds: `kb/competitive-landscape.md`*

> **Note:** Cover each company separately — PropMatic, Saivory, Jelly Capital.

- Who are [company]'s top 3-5 competitors? Direct and indirect.
- What do they get right? What do they get wrong?
- How do you differentiate? What's the thing only [company] can say?
- Are there companies [company] gets confused with? What's the clarification you always have to make?

**Listen for:** The wedge — the specific angle Mark uses to explain why each company is different. This becomes the core messaging framework.

---

## 4. Content History (5 min)
*Feeds: `kb/content-history.md`*

- What content have you published? LinkedIn, blog, podcast appearances, newsletters?
- What got the most engagement? What fell flat?
- How often do you post? What's your current cadence (or lack thereof)?
- Do you have a backlog of ideas you haven't written?
- Any content you started but never finished?
- Does your content tend to focus on one company, or do you mix topics across all three?

**Listen for:** Volume and consistency gaps. If Mark has a bunch of half-written posts, the agent's first job is finishing them, not generating new ideas.

---

## 5. GTM Strategy (10 min)
*Feeds: `kb/gtm-strategy.md`*

> **Note:** Cover each company separately — PropMatic, Saivory, Jelly Capital.

- Who is [company]'s ideal customer? Company size, role of buyer, industry?
- How do customers find [company] today? Inbound, outbound, referrals, events?
- What's [company]'s current marketing stack? (Website, email, social, ads)
- What marketing activity drives the most pipeline right now for [company]?
- What have you tried that didn't work?
- Are you doing any paid marketing for [company]? Budget range?
- What's the sales cycle look like? How long from first touch to close?

**Listen for:** Where the leverage is. For an entrepreneur running multiple companies, there's usually one channel per company that works and everything else is noise. Find that channel for each.

---

## 6. Tool Inventory (5 min)
*Feeds: MCP configuration in `SKILL.md`*

- Walk me through your daily tools: email, calendar, notes, project management.
- Do you use Notion? Slack? Google Workspace? What's your primary workspace?
- Where do you draft content today? Google Docs, Notion, directly in LinkedIn?
- Any automations you already have running? Zapier, Make, etc.?
- What tools does your team use for collaboration?
- Are tools shared across companies or does each have its own stack?

**Listen for:** Integration points. Every tool Mark uses daily is a potential MCP connection. Prioritize the ones he touches most.

---

## 7. Pain Points & Delegation Wishes (10 min)
*Feeds: Prioritization of sub-agent activation*

- What marketing task eats the most time every week?
- If you could hand off one thing to an AI assistant right now, what would it be?
- What marketing tasks do you know you should be doing but aren't?
- What's the first thing the marketer you're hiring would do?
- What would "this is working" look like for you in 2 weeks?
- Which company needs the most marketing help right now?

**Listen for:** The Day 1 use case. Whatever Mark says he'd hand off first becomes the first sub-agent to activate. Don't try to boil the ocean.

---

## Post-Interview Checklist

After the call, populate these files from your notes:

| File | Source Sections | Priority | Notes |
|------|----------------|----------|-------|
| `kb/manifesto.md` | Section 1 (per company) | Immediate | Fill all three company sections + cross-cutting themes |
| `kb/brand-voice.md` | Section 2 + observed patterns | Immediate | Personal voice + any company-specific tone notes |
| `kb/competitive-landscape.md` | Section 3 (per company) | Day 2 | Fill all three company sections |
| `kb/content-history.md` | Section 4 | Day 2 | Tag content by company where applicable |
| `kb/gtm-strategy.md` | Section 5 (per company) | Day 2 | Fill all three company sections |
| `SKILL.md` MCP config | Section 6 | After interview | Note shared vs. company-specific tools |
| Sub-agent prioritization | Section 7 | After interview | Identify which company gets focus first |

**Deliverable:** Completed kb/ files + updated SKILL.md MCP section within 24 hours of interview.
