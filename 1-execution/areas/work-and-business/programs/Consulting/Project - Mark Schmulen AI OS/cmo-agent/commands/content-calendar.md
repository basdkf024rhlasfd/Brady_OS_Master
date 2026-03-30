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
| [Topic] | [Blog/Post/Email/etc.] | [LinkedIn/Twitter/Blog/etc.] | [PropMatic/Saivory/Jelly/Personal] | [Status] | [Date] |

#### Week of [Date]
[Same format]

[Repeat for 4 weeks]

---

### Alerts
- ⚠️ **Overdue:** [List any overdue items]
- 📅 **Due soon:** [Items due within 3 days]
- 🔲 **Gaps:** [Weeks or companies with insufficient coverage]

### Content Mix
- **By company:** PropMatic: X, Saivory: X, Jelly Capital: X, Personal: X
- **By format:** Blog: X, LinkedIn: X, Twitter: X, Email: X, Other: X
- **By status:** Ideas: X, Drafting: X, Review: X, Scheduled: X

### Recommendations
- [Suggested content to fill gaps]
- [Topics to avoid — recently covered per content-history.md]
```
