# Command Templates

> Slash command definitions. Use these directly or just describe what you need in natural language.

---

---
name: campaign-plan
description: Design a marketing campaign with targeting, messaging, and success metrics
---

# Campaign Plan Command

## Setup

Before generating, read the following files:

1. `kb/gtm-strategy.md` — Per-company audience, channels, and sales cycle
2. `kb/manifesto.md` — Per-company mission, product, and positioning
3. `kb/brand-voice.md` — Mark's personal voice and tone guidelines
4. `reference/marketing-growth-hacker.md` — Growth tactics and campaign best practices

## Input

The user provides a campaign objective as `$ARGUMENTS`. Examples:
- "drive signups for PropMatic's beta launch"
- "build awareness for PropMatic's AI leasing assistant"
- "generate inbound leads for PropMatic Q2"
- "establish Mark as a thought leader in AI-powered real estate"

## Execution Steps

1. **Identify which company this relates to.** Use `kb/manifesto.md` and `kb/gtm-strategy.md` to ground the company context and understand the target audience.

2. **Design the campaign plan.** Prioritize high-leverage, low-cost tactics first. Mark runs lean operations — expensive paid campaigns should come after organic and partnership plays.

3. **Include a testable hypothesis.** Every campaign needs a clear "If we [action], then [outcome], measured by [metric] over [timeframe]" statement.

4. **Never commit spend.** All budget items are proposals for Mark to approve. Present ranges, not exact numbers.

## Output Format

```
### Company Context
[Which company this relates to]

### Campaign Hypothesis
If we [specific action], then [expected outcome], measured by [metric] over [timeframe].

### Objective
[Clear, measurable campaign goal]

### Target Audience
- **Primary:** [Who, from kb/gtm-strategy.md]
- **Secondary:** [If applicable]
- **Pain point we're addressing:** [Specific problem]

### Channels (Prioritized)
1. **[Channel]** — [Why this channel, expected reach, effort level]
2. **[Channel]** — [...]
3. **[Channel]** — [...]

### Messaging Angle
- **Core message:** [One sentence]
- **Supporting proof points:** [2-3 bullets]
- **Tone:** [Per kb/brand-voice.md]

### Content Pieces Needed
- [ ] [Content piece 1 — format, platform, owner]
- [ ] [Content piece 2]
- [ ] [...]

### Budget Estimate
| Item | Low Range | High Range | Notes |
|------|-----------|------------|-------|
| [Item] | $X | $Y | [Context] |
| **Total** | **$X** | **$Y** | **Proposal — needs Mark's approval** |

### Success Metrics
| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| [Metric] | [Target] | [How to measure] |

### Timeline
| Week | Activities |
|------|------------|
| Week 1 | [Setup and launch activities] |
| Week 2 | [Execution activities] |
| Week 3 | [Optimization activities] |
| Week 4 | [Review and iterate] |

### Risks & Mitigations
- **Risk:** [What could go wrong] → **Mitigation:** [How to handle it]

### Next Steps for Mark
1. [Decision or approval needed]
2. [Input required]
3. [...]
```

---

---
name: competitive-brief
description: Produce a competitive intelligence summary for a given competitor or market
---

# Competitive Brief Command

## Setup

Before generating, read the following files:

1. `kb/competitive-landscape.md` — Per-company competitors and market positioning
2. `kb/manifesto.md` — Per-company mission, product, and positioning

## Input

The user provides a competitor name or market area as `$ARGUMENTS`. Examples:
- "Entrata" (specific competitor)
- "AI-powered property management" (market area)
- "AI leasing assistants in multifamily"

## Execution Steps

1. **Ground this in PropMatic context.** Use `kb/manifesto.md` to understand PropMatic's positioning relative to the competitor or market area.

2. **Research the competitor or market area** using `kb/competitive-landscape.md` as the primary source. If the competitor is not in the KB, clearly state that the analysis is based on general knowledge and flag it for Mark to validate.

3. **Produce the brief** with the following sections. Ground every claim in KB data when available. When data is incomplete, clearly label what is inferred vs. confirmed.

4. **Never overstate Mark's competitive position.** Be honest about where competitors are strong. Mark values accuracy over cheerleading.

## Output Format

```
### Company Context
[Which of Mark's companies this relates to]

### Competitor Overview
- **Name:** [Competitor name]
- **What they do:** [1-2 sentence summary]
- **Target market:** [Who they serve]
- **Funding / Scale:** [If known from KB, otherwise "Not in KB — verify"]
- **Key products:** [Bulleted list]

### What They Do Well
- [Strength 1 — be specific]
- [Strength 2]
- [...]

### Where They're Weak
- [Weakness 1 — be specific and honest]
- [Weakness 2]
- [...]

### How [Mark's Company] Differentiates
- [Differentiator 1 — grounded in kb/manifesto.md]
- [Differentiator 2]
- [...]

### Recommended Actions
1. [Specific, actionable recommendation]
2. [...]
3. [...]

### Data Confidence
- **Confirmed (from KB):** [List what's grounded in kb/ files]
- **Inferred (needs validation):** [List what's based on general knowledge or assumptions]
```

---

---
name: content-calendar
description: View or update the content publishing calendar with a rolling 4-week view
---

# Content Calendar Command

## Setup

Before generating, read the following files:

1. `kb/content-history.md` — Past content and performance data
2. `kb/gtm-strategy.md` — Per-company audience, channels, and sales cycle

## Input

The user provides an action as `$ARGUMENTS`. Supported actions:
- `view` — Show the current rolling 4-week calendar
- `add [topic]` — Add a new content item (e.g., "add PropMatic AI leasing blog post")
- `update [item]` — Update an existing item's status or details (e.g., "update PropMatic blog to scheduled")

## Execution Steps

### View

1. Display the rolling 4-week calendar starting from the current date.
2. Organize by week, with each item showing: Topic, Format, Platform, Company, Status, Due Date.
3. **Highlight issues:**
   - Overdue items (past due date, not published)
   - Upcoming deadlines (within 3 days)
   - Gaps in cadence (any week with fewer than 2 pieces, or any company with no content in 2+ weeks)
4. **Show content mix summary:** breakdown by company, format, and platform.
5. Cross-reference with `kb/content-history.md` to flag if any planned topic overlaps with recently published content.

### Add

1. Parse the topic from `$ARGUMENTS`.
2. Identify which company this relates to.
3. Suggest optimal:
   - **Format** — based on topic and GTM strategy
   - **Platform** — based on where the target audience is (from `kb/gtm-strategy.md`)
   - **Timing** — based on current calendar gaps and optimal posting windows
4. Add to the calendar with status "idea".
5. Show the updated calendar view.

### Update

1. Find the matching item in the calendar.
2. Update the specified field. Valid status values: idea, drafting, review, scheduled, published.
3. Show the updated calendar view.

## Status Definitions

| Status | Meaning |
|--------|---------|
| **idea** | Topic identified, no draft started |
| **drafting** | Draft in progress |
| **review** | Draft complete, awaiting Mark's review |
| **scheduled** | Approved and scheduled for publishing |
| **published** | Live |

## Output Format

### View / After Add / After Update

```
### Content Calendar — [Current Date] to [+4 Weeks]

#### Week of [Date]
| Topic | Format | Platform | Company | Status | Due |
|-------|--------|----------|---------|--------|-----|
| [Topic] | [Blog/Post/Email/etc.] | [LinkedIn/Twitter/Blog/etc.] | [PropMatic/Personal] | [Status] | [Date] |

#### Week of [Date]
[Same format]

[Repeat for 4 weeks]

---

### Alerts
- ⚠️ **Overdue:** [List any overdue items]
- 📅 **Due soon:** [Items due within 3 days]
- 🔲 **Gaps:** [Weeks or companies with insufficient coverage]

### Content Mix
- **By company:** PropMatic: X, Personal: X
- **By format:** Blog: X, LinkedIn: X, Twitter: X, Email: X, Other: X
- **By status:** Ideas: X, Drafting: X, Review: X, Scheduled: X

### Recommendations
- [Suggested content to fill gaps]
- [Topics to avoid — recently covered per content-history.md]
```

---

---
name: content-draft
description: Generate a content draft for any format (blog, email, social, website copy)
---

# Content Draft Command

## Setup

Before generating, read the following files:

1. `kb/brand-voice.md` — Mark's personal voice and tone guidelines
2. `kb/manifesto.md` — Per-company mission, product, and positioning
3. `reference/marketing-content-creator.md` — General content creation best practices

## Input

The user provides format and topic as `$ARGUMENTS`. Examples:
- "blog post about AI in real estate"
- "website copy for PropMatic's landing page"
- "newsletter about AI search trends in multifamily"
- "presentation on PropMatic's durable agents model"

If the format is not specified, ask the user to clarify before proceeding. Supported formats: blog, website copy, newsletter, presentation.

## Execution Steps

1. **Identify company context.** Ground this in PropMatic context, or determine if it's personal brand content. Use `kb/manifesto.md` to ground the context.

2. **Apply format-specific rules:**

   ### Blog Post
   - 800-1200 words
   - Mark's conversational style — write like he talks, not like a marketer
   - Lead with a concrete example or story, not an abstract claim
   - Include at least 2 specific examples grounded in real experience
   - Clear subheadings for scannability
   - End with a single takeaway or CTA
   - SEO-friendly title and meta description suggestion

   ### Website Copy
   - Scannable: short paragraphs, bullet points, clear hierarchy
   - Benefit-led: lead with what the reader gets, not what the product does
   - Clear CTAs: one primary CTA per section, never more than two on a page
   - Social proof placeholders where relevant
   - Mobile-first: assume most readers are on phones

   ### Newsletter
   - Personal tone: "Hey, I've been thinking about..."
   - One key insight per issue — don't dilute with multiple topics
   - One CTA — reply, click, or share
   - Under 500 words for the main content
   - Subject line options (3 variants)

   ### Presentation
   - Slide-by-slide outline (title + 3-4 bullet points per slide)
   - Speaker notes for each slide in Mark's voice
   - 10-15 slides max
   - Open with a provocation, close with a clear ask
   - Data slides: one number per slide, make it visual

3. **Write the draft** in Mark's voice per `kb/brand-voice.md`.

4. **Include a "What This Draft Assumes" section** listing any context gaps. Examples:
   - "Assumes PropMatic has launched the automated leasing feature (confirm)"
   - "Assumes Mark wants to position this as thought leadership, not product marketing"
   - "No data on current conversion rates — used industry benchmarks instead"

## Output Format

```
### Company Context
[Which company this relates to, or "Personal Brand / Thought Leadership"]

### Format
[Blog / Website Copy / Newsletter / Presentation]

### Draft
[Full content draft]

### What This Draft Assumes
- [Assumption 1]
- [Assumption 2]
- [...]

### Revision Notes
- [Any specific areas where Mark's input would strengthen the piece]
```

---

---
name: email-campaign
description: Draft a marketing email or email sequence for a specific campaign goal
---

# Email Campaign Command

## Setup

Before generating, read the following files:

1. `kb/brand-voice.md` — Mark's personal voice and tone guidelines
2. `kb/gtm-strategy.md` — Per-company audience, channels, and sales cycle

## Input

The user provides a campaign goal as `$ARGUMENTS`. Examples:
- "nurture sequence for PropMatic demo requesters"
- "announce PropMatic's new integration partnership"
- "cold outreach to real estate operators for PropMatic"
- "investor update for PropMatic stakeholders"

## Execution Steps

1. **Identify which company this relates to.** Use `kb/gtm-strategy.md` to understand the audience and sales cycle context.

2. **Determine single email vs. sequence:**
   - Announcements, updates, one-off asks → single email
   - Nurture, onboarding, cold outreach → sequence of 3-5 emails

3. **Apply email rules:**
   - Subject lines under 50 characters — specific beats clever
   - First sentence must earn the second — no throat-clearing ("I hope this email finds you well")
   - One clear CTA per email — never ask the reader to do two things
   - Write in Mark's voice per `kb/brand-voice.md` — direct, conversational, no corporate speak
   - Preview text suggestions for every email (the snippet shown after the subject line)

4. **For sequences**, ensure:
   - 3-5 emails with clear progression
   - Each email has a distinct angle (don't repeat the same pitch)
   - Increasing specificity: broad value → specific proof → direct ask
   - Include send timing recommendations (days between emails, best send times)
   - Final email should be a "break-up" or soft close, not another hard pitch

## Output Format

### Single Email

```
### Company Context
[Which company this relates to]

### Email

**Subject:** [Under 50 characters]
**Preview text:** [40-90 characters]
**Send time:** [Recommended day/time]

---

[Full email body in Mark's voice]

---

**CTA:** [What you want the reader to do]

### Assumptions
- [Any context gaps or assumptions made]
```

### Email Sequence

```
### Company Context
[Which company this relates to]

### Sequence Overview
- **Goal:** [What this sequence achieves]
- **Audience:** [Who receives this]
- **Trigger:** [What enrolls someone in this sequence]
- **Total emails:** [3-5]

---

### Email 1 of [N] — [Angle/Theme]
**Subject:** [Under 50 characters]
**Preview text:** [40-90 characters]
**Send:** [Timing — e.g., "Immediately after trigger" or "Day 3"]

[Full email body]

**CTA:** [Single clear action]

---

### Email 2 of [N] — [Angle/Theme]
[Same format]

---

[Continue for all emails in sequence]

---

### Sequence Notes
- **Expected open rate:** [Benchmark for this type]
- **Key metric to watch:** [What tells you this is working]
- **When to iterate:** [Trigger for revising the sequence]

### Assumptions
- [Any context gaps or assumptions made]
```

---

---
name: linkedin-post
description: Draft a LinkedIn post in Mark's voice on a given topic
---

# LinkedIn Post Command

## Setup

Before generating, read the following files:

1. `kb/brand-voice.md` — Mark's personal voice and tone guidelines
2. `kb/manifesto.md` — Per-company mission, product, and positioning
3. `reference/marketing-linkedin-content-creator.md` — LinkedIn best practices

## Input

The user provides a topic as `$ARGUMENTS`. Examples:
- "AI agents replacing SaaS dashboards"
- "PropMatic's new automated leasing feature"
- "lessons from scaling three companies simultaneously"

## Execution Steps

1. **Identify company context.** Ground this in PropMatic context, or determine if it's personal brand / thought leadership content. Use `kb/manifesto.md` to ground the company context.

2. **Generate 3 hook variants:**
   - **Curiosity gap** — Open a loop the reader needs to close ("Most real estate operators are ignoring the one metric that actually predicts vacancy...")
   - **Bold claim** — Make a strong, defensible statement ("AI agents will replace 80% of property management software within 3 years.")
   - **Specific story** — Ground in a concrete moment ("Last Tuesday, I watched an AI agent handle 47 tenant inquiries in 12 minutes. Here's what happened next.")

3. **Draft the full post** using the strongest hook. Rules:
   - Keep under 1300 characters for optimal engagement
   - NO external links in the body (suggest link placement in comments)
   - Write in Mark's voice per `kb/brand-voice.md` — conversational, specific, no generic marketing fluff
   - End with an engagement driver: a direct question or clear CTA
   - Use line breaks for readability (LinkedIn rewards scannable posts)
   - NEVER use generic marketing language unless it's explicitly in Mark's documented voice

4. **Suggest 3-5 relevant hashtags** that are active on LinkedIn and relevant to the topic.

5. **Flag any claims** that need Mark's validation against `kb/manifesto.md`. If the post references product capabilities, metrics, or competitive positioning, call it out explicitly.

## Output Format

```
### Company Context
[Which company this relates to, or "Personal Brand / Thought Leadership"]

### Hook Options
1. [Curiosity gap hook]
2. [Bold claim hook]
3. [Specific story hook]

### Draft
[Full post with recommended hook, under 1300 characters]

### Publishing Notes
- Suggested hashtags: #tag1 #tag2 #tag3
- Best posting window: Tuesday-Thursday, 7-9 AM or 12-1 PM CT
- Claims to validate: [list any unverified claims, or "None — all grounded in KB"]
- Suggested comment: [link or additional context to drop in first comment after posting]
```

---

---
name: social-post
description: Adapt content for a specific social platform (Twitter/X, Instagram, etc.)
---

# Social Post Command

## Setup

Before generating, read the following files:

1. `kb/brand-voice.md` — Mark's personal voice and tone guidelines
2. `reference/marketing-social-media-strategist.md` — Platform-specific best practices

## Input

The user provides platform and topic as `$ARGUMENTS`. Examples:
- "twitter thread about AI replacing property managers"
- "instagram post about PropMatic's AI leasing workflow"
- "youtube video concept for PropMatic's durable agents model"
- "twitter single tweet announcing PropMatic feature"

If the platform is not specified, ask before proceeding.

## Execution Steps

1. **Identify which company this relates to** using the topic context. If ambiguous, note it as personal brand content.

2. **Apply platform-specific rules:**

   ### Twitter/X
   - **Single tweet:** Under 280 characters. Punchy, opinionated, standalone.
   - **Thread:** 4-8 tweets. Each tweet must work standalone (people quote-tweet individual tweets). First tweet is the hook — it carries the whole thread. Number tweets (1/7, 2/7, etc.). Last tweet: recap + CTA.
   - **Tone:** More casual than LinkedIn. Hot takes welcome. Short sentences.
   - **Best posting times:** Weekdays 8-10 AM CT or 12-1 PM CT

   ### Instagram
   - **Caption:** 125-150 words for feed posts. First line is the hook (visible before "...more").
   - **Hashtag strategy:** 5-10 hashtags. Mix of broad (#entrepreneurship) and niche (#proptech). Place in first comment, not caption.
   - **Visual content suggestion:** Describe the ideal image, carousel, or reel concept. Mark's aesthetic: clean, professional, not overly polished.
   - **Best posting times:** Tuesday-Friday, 11 AM-1 PM CT

   ### YouTube
   - **Title:** Under 60 characters. Include a keyword. Curiosity or specificity wins.
   - **Description:** First 2 lines are critical (shown in search). Include timestamps, links, and keywords.
   - **Tags:** 8-12 tags, mix of broad and specific.
   - **Thumbnail concept:** Describe the visual — text overlay, Mark's expression, background. High contrast, readable at small size.
   - **Best publishing times:** Thursday-Saturday, 2-4 PM CT

3. **Maintain Mark's voice** per `kb/brand-voice.md` while adapting to platform norms. LinkedIn Mark is slightly more polished than Twitter Mark. Instagram Mark shows more personality.

## Output Format

```
### Company Context
[Which company this relates to, or "Personal Brand"]

### Platform
[Twitter/X | Instagram | YouTube]

### Content

[Platform-specific content — full tweet/thread, caption, or video outline]

### Platform-Specific Notes
- **Posting time:** [Recommended]
- **Hashtags:** [If applicable]
- **Visual:** [Image/video suggestion if applicable]
- **Engagement play:** [How to drive replies/shares on this platform]
```

