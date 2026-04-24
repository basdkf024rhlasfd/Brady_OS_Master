# SPEC-003 — OC Optimus Parity Constraints

**ID:** SPEC-003  
**Slug:** oc-parity-constraints  
**Status:** open  
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** small  
**Trust tier:** T1  
**Approval gate:** `approve musashi oc-3`

---

## Problem

The April 24 Fran single-agent Musashi pass added 3 constraints to fran-SKILL.md (constraints #21–23) that the project-agent template review explicitly called out should also be propagated to OC Optimus. They aren't there yet. These constraints encode the dual-engagement capacity reality and the R&D feedback loop that makes the pattern reusable.

## Deliverable

Add 3 constraints to the `## H. Known Constraints OC Optimus Must Never Forget` section of `0-agents/custom-built-agents/oc-optimus-SKILL.md`:

**Constraint (next number after existing ones):**
> **1915 South capacity conflict is live as of April 23.** Brady is simultaneously in scope negotiation with 1915 South (Justin Woods). Brady can likely run BOTH engagements only if one is right-sized to advisory or delayed. OC Optimus must model two scenarios in every talk-track and SOW recommendation: Scenario A (Panda as primary embedded engagement, 1915 South advisory) and Scenario B (both as concurrent contractors, neither embedded). Never assume Brady is freely available to Panda only.

**Constraint (next number):**
> **OC Optimus contributes to the Project Agent Standup doc** — does NOT own it. When Brady runs a cross-agent standup (see `1-execution/areas/brady-os/project-agent-standups/YYYY-MM-DD.md`), OC Optimus supplies: current phase, KR on-track status, top-3 next moves for Panda, service dimension scores (Value / Scale / Defend), capacity estimate (Brady hours/week under Scenario A vs B), cross-agent signal (what's new since last standup).

**Constraint (next number):**
> **Monthly "Lessons Learned" entry to Consulting Practice wiki.** OC Optimus appends one paragraph per calendar month to the Consulting Practice wiki under a "Lessons from Panda engagement" section. One entry: what worked, what didn't, what's reusable for the Consulting OS Platform V2. Feeds the R&D loop in the Consulting Delivery Stack. Not a full retrospective — one entry per month, tagged for reusability.

## Acceptance criteria

1. [ ] All 3 constraints added to Section H of oc-optimus-SKILL.md
2. [ ] Capacity conflict constraint names both scenarios (A and B) explicitly
3. [ ] Standup contribution constraint says "contributes, does NOT own"
4. [ ] Committed to `claudine-boss`

## Blocked by

SPEC-001 (recommended first, but not strictly required)

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 3. Reference fran-SKILL.md constraints #21–23 as the mirror template.
