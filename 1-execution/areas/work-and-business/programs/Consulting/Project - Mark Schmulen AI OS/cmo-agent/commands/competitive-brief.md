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
