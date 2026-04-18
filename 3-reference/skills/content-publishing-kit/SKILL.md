---
name: content-publishing-kit
description: |
  Turns a topic, client insight, or raw idea into a publishable content piece — LinkedIn
  post, Substack article, or white paper. Sequences full-stack-ideation (for angles),
  content-drafter agent (for voice-matched drafts), mception-design-system (for visuals),
  and daily-whitepaper (as source material).

  TRIGGER THIS SKILL whenever Brady says: "turn this into a post," "write the LinkedIn,"
  "Substack draft," "content piece on," "build the white paper," "publish this," "write
  something about," "ghost write," or any variation requesting publishable content.

  This skill ORCHESTRATES sub-skills and agents. It does not duplicate their instructions.
trust_tier: T2
---

# Content Publishing Kit

Takes a topic or insight and produces a publishable draft in Brady's voice.

## Sub-Skills & Agents Used

| Component | Path | Role |
|-----------|------|------|
| **full-stack-ideation** | `3-reference/skills/full-stack-ideation/SKILL.md` | Generate topic angles and hooks |
| **Content Drafter** (agent) | `0-agents/custom-built-agents/content-drafter.md` | Voice-matched draft writing |
| **mception-design-system** | `3-reference/skills/mception-design-system/SKILL.md` | Visual artifacts (infographics, one-pagers) |
| **daily-whitepaper** | `3-reference/skills/daily-whitepaper/SKILL.md` | Source material and news context |

## Inputs

Brady provides one of:
- A topic ("write about AI in mid-market ops")
- A client insight ("the PVC-O thing from Jeff's brief is a great story")
- Raw material (voice memo transcript, bullet points, rough paragraphs)
- A reference piece ("something like that Substack post about pricing")

## Output Formats

| Format | Length | Structure | Use Case |
|--------|--------|-----------|----------|
| **LinkedIn Post** | 150-300 words | Hook → story → insight → punchy closer | Regular cadence, network building |
| **Substack Article** | 800-2000 words | Observation → context → framework → takeaway | Deep dives, thought leadership |
| **White Paper** | 2000-4000 words | Executive summary → problem → framework → evidence → implications | Credibility pieces for DMs and outreach |
| **Visual Artifact** | 1 page | mception design system, dark or light mode | Companion to any of the above |

## Pipeline

### Step 1: Source & Angle (5 min)
**Owner:** Agent + optionally **full-stack-ideation**

1. If Brady provided raw material, extract the core insight
2. If Brady provided a topic only, run 3-5 ideation methods to find the non-obvious angle:
   - #35 Narrative-First (what's the story?)
   - #15 Analogous Inspiration (what's the unexpected parallel?)
   - #7 Opposite Thinking (what does everyone assume that's wrong?)
   - #52 Identity-Based (who does this help the reader become?)
3. Check recent daily-whitepaper outputs for supporting data or news hooks
4. Propose 2-3 angles to Brady. Brady picks one.

### Step 2: Draft (10-20 min)
**Owner:** **Content Drafter** agent

1. Read the Content Drafter voice profile (critical — this is Brady's voice)
2. Write the draft in the selected format
3. Follow all voice rules: short paragraphs, em dashes, operator language, specific over abstract, no jargon, no filler
4. Open with a specific observation, not a thesis
5. End with a punchy one-liner

**Key rules from the voice profile:**
- Contractions always
- Never: "In today's fast-paced world," "Let's dive in," "Game-changer," "Excited to announce"
- Always: lived experience, the unusual combination (finance + ops + tech), acknowledging what didn't work
- Tone: explaining something to a smart friend

### Step 3: Visual (if needed) (10 min)
**Owner:** **mception-design-system**

If the content benefits from a visual artifact:
1. Build a one-page infographic, framework diagram, or data visualization
2. Use mception design system (dark mode for social sharing, light mode for documents)
3. Generate HTML → PDF via Playwright

### Step 4: Review & Polish
**Owner:** Brady

1. Brady reads the draft
2. Brady edits, approves, or sends back for revision
3. Nothing ships without Brady's sign-off

## Content Strategy Context

From Brady's GTM strategy (March 2026):
- The 44 direct outreach contacts are the primary channel. Content is air cover.
- Target: 3-5 white papers before the May push
- Four-week LinkedIn/Substack content plan exists (separate document)
- Content should reinforce: operator who builds, not consultant who advises
- Language constraint: "selectively taking on engagements" — not permanently left corporate

## What This Kit Does NOT Do

- Schedule or publish posts (Brady posts manually)
- Manage a content calendar (separate planning artifact)
- Write for clients (this is Brady's personal brand content)
- Generate social media graphics or video (text + PDF artifacts only)
