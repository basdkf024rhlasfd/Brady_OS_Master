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
