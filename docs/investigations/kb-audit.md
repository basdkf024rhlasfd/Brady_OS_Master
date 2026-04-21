# KB Audit — Sweep → KB Pipeline Upgrade

**Date:** 2026-04-20
**WS-4 Foundation Work**

## Summary

Audit of all portal KB directories in advance of adding context files (20-routines.md, 21-decisions-log.md, 22-rejected.md) to support richer chatbot answers.

---

## Family (`portal/public/family/kb/`)

**Status:** ✅ Directory exists, sweep emission wired

### Files present (14)

| File | Purpose | Sweep-emitted? |
|------|---------|----------------|
| 01-family-roster.md | Family member profiles | No (static) |
| 02-school-calendar.md | School year calendar | No (static) |
| 03-weekly-schedule.md | Recurring weekly schedule | No (static) |
| 04-meal-preferences.md | Per-kid food prefs + go-to meals | No (learning file) |
| 05-chore-assignments.md | Chore rotation | No (static) |
| 06-logistics-contacts.md | Key contacts | No (static) |
| 07-budget-targets.md | Monthly budget targets | No (static) |
| 08-family-rules.md | Household rules | No (learning file) |
| 09-activity-details.md | Activity details per kid | No (static) |
| 10-sweep-state.md | Today's family brief | ✅ Morning sweep Phase 3.10 |
| 11-week-ahead.md | Week ahead preview | No (static) |
| 12-open-loops.md | Carry-forward open items | ✅ Morning sweep 3.10 + Evening sweep 3.7 |
| 13-family-preferences.md | Extended preferences | No (static) |
| 14-walmart-subscriptions.md | Walmart+ auto-ship list | No (static) |

### Missing (new context layer)

| File | Purpose | Who populates |
|------|---------|---------------|
| 20-routines.md | Recurring patterns, family rhythms | Morning sweep → Notion Rules & Preferences + calendar patterns |
| 21-decisions-log.md | Recent decisions with rationale | Evening sweep (append per session) + Morning sweep (30-day pull) |
| 22-rejected.md | What was tried and didn't work | Morning sweep → Streaming Notes "tried/failed" items |

### What's missing from the chatbot perspective

The family chatbot can answer "what's on today's schedule" (10-sweep-state.md) and "what's unresolved" (12-open-loops.md), but it cannot answer:
- "What's Brady's grocery routine?" (no routines file)
- "Why did we stop ordering from X?" (no rejected file)
- "What was decided about Faith's activity schedule?" (no decisions log)

---

## Baden-Bagley (`portal/public/baden-bagley/kb/`)

**Status:** ❌ Directory did not exist — created as stub (`.gitkeep` only)

No KB content yet. WS-5 will seed this with:
- `00-scope.md`, `01-timeline.md`, `02-deliverables.md`, `03-refuse-list.md`

Morning sweep does not currently emit to this directory. Conditional hook added in 4.2 (graceful skip until populated).

---

## Innovation-Lab (`portal/public/innovation-lab/kb/`)

**Status:** ❌ Directory did not exist — created as stub (`.gitkeep` only)

No KB content yet. WS-5 will seed this with:
- `00-overview.md`, `01-experiments.md`, `02-thinking.md`, `22-rejected.md`, `03-in-progress.md`

Morning sweep does not currently emit to this directory. Conditional hook added in 4.2 (graceful skip until populated).

---

## Other KB directories (not in scope for WS-4)

| Directory | Status |
|-----------|--------|
| `portal/public/orlando/kb/` | 23 files, keyword routing, no sweep emission |
| `portal/public/panda/kb/` | Exists, not scanned |

---

## Decision: Seed files vs. first-run population

The three new context files (`20-routines.md`, `21-decisions-log.md`, `22-rejected.md`) are created as stubs now so:
1. The page chatbot can load them without errors immediately
2. The format is established before the first sweep run
3. WS-5 can populate them with bootstrap content without waiting for a sweep cycle

Morning sweep will overwrite/append on its next run based on live Notion + journal data.
