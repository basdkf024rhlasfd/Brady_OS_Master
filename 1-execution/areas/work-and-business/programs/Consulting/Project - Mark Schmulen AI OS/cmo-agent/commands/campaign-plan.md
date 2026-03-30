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
- "build awareness for Saivory's new menu planning feature"
- "generate deal flow for Jelly Capital Q2"
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
