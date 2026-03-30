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

1. **Identify company context.** Determine which company this relates to — PropMatic, Saivory, Jelly Capital — or if it's personal brand / thought leadership content. Use `kb/manifesto.md` to ground the company context.

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
