# SPEC-004 — Dual-Engagement Capacity View in Morning Sweep

**ID:** SPEC-004  
**Slug:** platform-capacity-view  
**Status:** needs-review
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** medium  
**Trust tier:** T1  
**Approval gate:** `approve musashi platform-1`

---

## Problem

Every morning Brady has to mentally synthesize the state of two live consulting engagements (Panda and 1915 South) before he can answer "what do I do today?" Morning sweep reads both project files but doesn't join them into a single capacity view. Brady is manually reconstructing a table in his head that the OS has all the data to generate.

## Deliverable

Add a new **Phase 2.2X — Dual-Engagement Capacity Snapshot** to `3-reference/skills/morning-sweep/SKILL.md`.

Insert it after Phase 2.2 (or whatever the Phil primer consumption phase is) and before Phase 2.3 (Gmail scan). The phase:

1. Reads `1-execution/areas/work-and-business/programs/Consulting/Project - Panda/PROJECT.md` — extracts: current phase, next action item with date
2. Reads `1-execution/areas/work-and-business/programs/Consulting/Project - 1915 South/PROJECT.md` — extracts: current phase, next action item with date
3. Reads `3-reference/build-queue/INDEX.md` — counts open specs
4. Outputs a compact table in the sweep brief:

```
ENGAGEMENT CAPACITY SNAPSHOT
─────────────────────────────────────────────────────────────
Client         Phase                   Next Touch    Brady Hrs/Wk
─────────────────────────────────────────────────────────────
Panda          P3 Scope Negotiation    Apr 28 ←HOT  35-45h (Scen A) | 15-20h (Scen B)
1915 South     P2 Awaiting Justin      Apr 29        10-15h (Scen C) | 20-25h (Scen B)
─────────────────────────────────────────────────────────────
Scenario A (Panda primary): ~45-60h/wk — requires 1915 South right-sized
Scenario B (both contractor): ~35-45h/wk — viable, zero slack
BUILD QUEUE: N open specs
─────────────────────────────────────────────────────────────
```

5. If any Next Touch date is today or tomorrow, flag it as `←HOT`
6. If both engagements are in scope-negotiation or active simultaneously, add one line: "⚠️ Both engagements active — confirm capacity scenario before taking new commitments."

**Brady hours estimates** are static approximations hardcoded per phase (not calculated dynamically):
- Pre-engagement: 5-10h/wk
- Scope negotiation: 15-25h/wk  
- Active / embedded: 35-50h/wk
- Advisory / Delayed Start: 8-12h/wk
- Delivery: 20-30h/wk

When a phase changes in PROJECT.md, the sweep picks it up automatically via the phase label.

## Acceptance criteria

1. [ ] New phase added to morning-sweep SKILL.md in the correct sequence position
2. [ ] Phase reads both PROJECT.md files (named paths)
3. [ ] Output format matches the table above (or equivalent compact layout)
4. [ ] HOT flag triggers when next touch is today or tomorrow
5. [ ] Dual-active warning triggers when both engagements are in scope-negotiation or active
6. [ ] Committed to `claudine-boss`

## Blocked by

—

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 4. Morning sweep SKILL.md is at `3-reference/skills/morning-sweep/SKILL.md`.
