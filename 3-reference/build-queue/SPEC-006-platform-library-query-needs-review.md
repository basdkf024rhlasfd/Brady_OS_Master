# SPEC-006 — Cross-Engagement Research Library Query

**ID:** SPEC-006  
**Slug:** platform-library-query  
**Status:** needs-review
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** small  
**Trust tier:** T1  
**Approval gate:** `approve musashi platform-3`

---

## Problem

The Research Library is supposed to serve both active engagements, but each project agent queries it in isolation. If Claudine researched a QSR labor productivity benchmark for Panda, that same data is relevant to 1915 South's GMROI analysis — but Fran never sees it. Two clients, one research investment. Cross-pollination is free leverage that currently goes unused.

## Deliverable

Add one sentence to each SKILL file's Research Library query step (Section B, step 3b for both agents):

**In `0-agents/custom-built-agents/oc-optimus-SKILL.md`**, after the existing Library query instruction, add:
> Also surface any rows where `Client Relevance` contains "1915 South" AND `Tags` includes "labor productivity", "ops innovation", "AI decision layer", "analytics", or "franchise" — these cross-engagement rows represent research already paid for that may apply here. Note them as "Cross-engagement signal" in the orientation output.

**In `0-agents/custom-built-agents/fran-SKILL.md`**, after the existing Library query instruction, add:
> Also surface any rows where `Client Relevance` contains "Panda" AND `Tags` includes "labor productivity", "kitchen ops", "automation", "AI decision layer", "analytics", or "QSR" — these cross-engagement rows represent research already paid for that may apply here. Note them as "Cross-engagement signal" in the orientation output.

## Acceptance criteria

1. [ ] One sentence added to oc-optimus-SKILL.md Section B step 3b
2. [ ] One sentence added to fran-SKILL.md Section B step 4b (the equivalent Library query step)
3. [ ] Both sentences name the specific overlapping topic tags
4. [ ] Both use "Cross-engagement signal" as the label in orientation output
5. [ ] Committed to `claudine-boss`

## Blocked by

—

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 6. Research Library DB ID: `4f87259b-e9a7-4d35-86ba-2148cb472d0f`.
