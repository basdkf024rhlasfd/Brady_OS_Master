---
title: Email Auto-Read Classification
description: Which email types to mark as read automatically vs. leave unread for Brady's attention
updated: 2026-04-23
---

# Email Classification Rules

Used by morning sweep and any Gmail-touching automation. Gmail MCP is read-only, so auto-read requires a Gmail filter (set up in Gmail Settings > Filters). This list is the source of truth for what filters exist and what to create.

---

## Mark as Read (Auto)

These are pure FYI notifications — no action needed, no decision to make.

| Sender / Pattern | Subject Pattern | Reason |
|---|---|---|
| `help@walmart.com` | Shipped: * | Order confirmation, already processed |
| `help@walmart.com` | Out for delivery: * | Tracking update, no action |
| `help@walmart.com` | Arrived: * | Delivery confirmed, no action |
| `help@walmart.com` | We'll pick up your return on * | Return initiated, no action |
| `help@walmart.com` | Thanks for your delivery order, * | Order receipt, no action |
| `account@email.monarch.com` | Your code is * | OTP already used |
| `no-reply@noreply.github.com` | Dependabot alerts | Security noise, low signal |

---

## Leave Unread (Review Needed)

These require a decision or signal something actionable.

| Sender / Pattern | Subject Pattern | Why It Stays |
|---|---|---|
| `alerts@mail.zapier.com` | [ALERT] * | Real automation failures — check Zapier |
| `no-reply@accounts.google.com` | Security alert for * | Verify new sign-ins aren't unauthorized |
| Any Vercel notification | Build failed * | Production failures only (preview fails = noise, see note) |
| Any client / prospect email | Any | Human correspondence |
| `account@email.monarch.com` | Weekly summary * | Financial overview worth reading |
| Medical / insurance senders | Any | UHC, Aflac, OptumRx claim updates |
| `notifications@github.com` | PR review / comment | Needs eyes |

---

## Notes

**Vercel emails**: Preview/branch deployment failures are expected noise — every push to a PR branch builds. Only flag if it's a `production` target failure. Current pattern: most "failures" are intermediate commits on PR branches, not production. Production deploys have been consistently READY.

**Walmart**: Karissa's orders come to brady.smallwood@gmail.com since it's the account email. All shipping/delivery/return notifications are safe to auto-read.

**Gmail Filter Setup**: Gmail filters cannot use MCP (read-only scope). Set up via Gmail Settings > See all settings > Filters and Blocked Addresses > Create a new filter. Use `from:(help@walmart.com)` with "Mark as read" action for Walmart. Separate filter for `from:(account@email.monarch.com) subject:(Your code is)`.
