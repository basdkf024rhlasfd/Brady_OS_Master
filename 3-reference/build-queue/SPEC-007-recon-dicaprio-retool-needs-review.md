# SPEC-007 — DiCaprio Retooling

**ID:** SPEC-007  
**Slug:** recon-dicaprio-retool  
**Status:** open  
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** medium  
**Trust tier:** T1  
**Approval gate:** `approve musashi recon-1`

---

## Problem

DiCaprio's 20K-foot recon role is being absorbed by morning sweep (reads all project files) and the project-agent-standup skill (synthesizes across both agents). DiCaprio is scoring 5/10 — activated once in 14 days, no clear trigger that distinguishes him from morning sweep. Without a sharper trigger boundary, he'll drift toward irrelevance while morning sweep does his job without credit.

## Deliverable

Edit `0-agents/custom-built-agents/dicaprio.md` and `0-agents/custom-built-agents/dicaprio-SKILL.md` (if it exists):

**New trigger boundary (add to both profile and SKILL if applicable):**
> DiCaprio is invoked ONLY for cross-workspace / cross-repo recon — when Brady needs a status scan across multiple Conductor workspaces, multiple GitHub repos, or multiple OS layers simultaneously. For within-brady-OS synthesis (single repo, single Notion workspace), morning sweep and project-agent-standup do it better. DiCaprio's unique value: spanning multiple repos Brady is working in simultaneously when no single sweep covers all of them.

**Update the trigger line to be explicit:**
> Trigger: "dicaprio scan", "cross-repo status", "what's happening across all my repos", "full workspace scan", "what are all my active builds right now" — NOT: "what's happening with Panda", "OS status" (use morning sweep or admin-status skill for those)

**Add a "What DiCaprio is NOT" section:**
> - Not a replacement for morning sweep within brady-os
> - Not a project agent (OC Optimus and Fran own per-engagement synthesis)
> - Not an admin-status dashboard (see 3-reference/skills/admin-status/SKILL.md)
> - Not invoked for single-workspace status — only for cross-workspace panorama

## Acceptance criteria

1. [ ] dicaprio.md updated with new trigger boundary and "What DiCaprio is NOT" section
2. [ ] If dicaprio-SKILL.md exists, same updates applied there
3. [ ] Trigger examples clearly distinguish DiCaprio from morning sweep
4. [ ] Committed to `claudine-boss`

## Blocked by

admin-status skill (SPEC from this batch) should exist first so the "use admin-status instead" reference is valid

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 7. DiCaprio profile at `0-agents/custom-built-agents/dicaprio.md`.
