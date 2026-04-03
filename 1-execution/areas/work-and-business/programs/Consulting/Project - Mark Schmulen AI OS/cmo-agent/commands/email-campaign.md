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
