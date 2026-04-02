# Setup Guide

> For Claude to follow with Mark. Not a document Mark reads — a flow Claude runs.

## Phase 0: Instant Value (0 minutes)

Skip setup entirely. Mark can start using the agent immediately.

**If Mark asks what to do first**, suggest:

> "Write me a LinkedIn post about why multifamily property managers should stop paying aggregators for their own leads."

This tests voice matching, company detection (PropMatic), and content quality in one shot. If the output is good, Mark trusts the system. If it needs adjustment, the corrections start the learning loop.

**Do not ask Mark to read files, review settings, or configure anything before delivering value.**

## Phase 1: Quick Calibration (5 minutes, when Mark is ready)

Run this as a casual conversation, not a questionnaire. Adapt based on what Mark says.

### The 5 Questions

1. **"What's the one thing you wish your target market understood about PropMatic?"**
   - This reveals Mark's core thesis — the thing every piece of content should ladder up to.

3. **"When I draft content for you, should I lean more confident/provocative or measured/analytical?"**
   - Calibrates the aggression dial on `kb/brand-voice.md`. Research suggests confident, but let Mark confirm.

4. **"What's your biggest content gap right now — LinkedIn presence, email outreach, or long-form thought leadership?"**
   - Sets priority for which sub-agent gets the most work.

5. **"Anything you've seen from other founders' content that you love or hate?"**
   - Love = voice aspirations. Hate = anti-patterns to add to memory.

### After the 5 Questions

Summarize what you learned in 3 bullets. Then immediately produce something — a LinkedIn post, an email draft, a content calendar — based on the answers. Show, don't tell.

**In CoWork:** Save the calibration answers to `memory/calibration-[date].md`.
**In Chat:** Note the answers and apply them for the rest of the conversation.

## Phase 2: MCP Connections (10 minutes, CoWork only)

Only run this if Mark is in CoWork/Claude Code. Skip entirely in Chat.

### Step 1: Gmail (3 min)
- Mark connects his Google account via OAuth
- Enables: drafting/sending marketing emails, reading threads for context, outreach tracking

### Step 2: Google Calendar (0 min if Gmail done)
- Same OAuth covers both
- Enables: content publishing schedule, meeting prep briefs, event coordination

### Step 3: Granola (3 min, optional)
- Only if Mark uses Granola for meeting notes
- Enables: pulling transcripts for follow-up extraction, content ideas from conversations

### Step 4: Canva (2 min, optional)
- Mark can connect his own account or use the shared
- Enables: social graphics, presentation decks, visual content

### Step 5: Notion (2 min, optional)
- Mark can connect his own workspace or use the shared
- Enables: editorial calendar, content drafts, campaign tracking

**After MCP setup**, run a quick test: "Let me check your calendar for this week and draft a LinkedIn post about your next event." This proves the connections work and delivers value simultaneously.

## Phase 3: Deep Customization (ongoing, whenever Mark wants)

These are deeper conversations that refine the agent over time. No pressure to do them now.

### Voice Refinement
- Mark reviews 3-5 drafts and redlines them
- Every correction is saved: "I'd never say 'leverage'" → `memory/voice-correction-[date].md`
- After 10-15 corrections, the agent's voice match improves dramatically

### Business Context Updates
- New product launch? Update `kb/manifesto.md`
- New competitor? Update `kb/competitive-landscape.md`
- Messaging pivot? Update `kb/gtm-strategy.md`
- Mark can just tell the agent what changed — in CoWork it writes the update, in Chat it notes it

### Content Strategy Sessions
- "Plan my Q3 content strategy for PropMatic"
- "What should I be posting about that I'm not?"
- "Build me a 12-week Substack launch plan"
- These are best done in CoWork for persistence, but Chat handles them well for brainstorming

## What Mark Never Has To Do

- Read technical documentation
- Understand agent architecture
- Configure routing or sub-agents
- Learn slash commands (they work if he uses them, but natural language works just as well)
- Set up anything before getting value
