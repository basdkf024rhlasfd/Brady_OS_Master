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
- "newsletter about food tech trends for Saivory"
- "presentation on Jelly Capital's investment thesis"

If the format is not specified, ask the user to clarify before proceeding. Supported formats: blog, website copy, newsletter, presentation.

## Execution Steps

1. **Identify company context.** Determine which company this relates to — PropMatic, Saivory, Jelly Capital — or if it's personal brand content. Use `kb/manifesto.md` to ground the context.

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
