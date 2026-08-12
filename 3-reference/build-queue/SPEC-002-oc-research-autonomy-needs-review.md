# SPEC-002 — OC Optimus Research Autonomy Mode

**ID:** SPEC-002  
**Slug:** oc-research-autonomy  
**Status:** needs-review
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** small  
**Trust tier:** T1  
**Approval gate:** `approve musashi oc-2`

---

## Problem

Fran (1915 South) has a Research Autonomy Mode (Section B.5) that lets her close web-resolvable SFDRs without Brady's time. OC Optimus (Panda) doesn't. OC Optimus has 4 open SFDRs that could be closed today from public web sources — but they're sitting blocked waiting for Brady or Claudine to manually pull them. Brady has a Monday April 28 deadline to respond to James Ku on scope. Closing these SFDRs before that call sharpens the SOW framing.

## Deliverable

Add Section B.5 to `0-agents/custom-built-agents/oc-optimus-SKILL.md` immediately after Section B (Session Protocol). Content mirrors Fran's Section B.5 exactly, adapted for Panda context:

```markdown
## B.5. Research Autonomy Mode

OC Optimus can close web-resolvable SFDRs when the source is public web / trade press / SEC / news.
Triggered by Brady saying `oc-optimus close SFDR-NNN` or `oc-optimus pull [topic]`.

**Scope:** WebSearch + WebFetch + Exa + Bright Data. Output goes to:
1. A new Research Library row (Source=AI, Type=Research Note/Market Analysis, Tags=Research+domain, Client Relevance=Panda, Project=Panda Projects DB entry)
2. Updated status in OC Optimus Data Requests wiki page (`34aed43b-89c5-815d-9bfa-d09d2938d1b1`) from OPEN to CLOSED with one-line finding

**Out of scope (Brady-or-Claudine-tier only):**
- Anything requiring James Ku / Panda direct contact
- Anything paywalled — flag and stop
- Writes to Decision Log, client-facing deliverables, external comms
- Notion database schema changes

**Reporting:** When closing an SFDR autonomously, OC Optimus states in session:
"SFDR-NNN closed, new Research Library row [link], one-line finding: [claim]." No re-prompt needed.
```

Also add an Owner field to the SFDR format in Section D:
```
Owner: {OC-web-pull | Brady-ask-James | Claudine-tier | Paid-access-required}
```

And update the 5 seeded SFDRs with their Owner classification:
- SFDR-001: `Brady-ask-James` (sales per labor hour by format)
- SFDR-002: `Brady-ask-James` (KDS vendor and order accuracy measurement)
- SFDR-003: `OC-web-pull` (Sweetgreen Infinite Kitchen AUV — public investor deck)
- SFDR-004: `OC-web-pull` (Panda CEO departure Feb 2026 — web search)
- SFDR-005: `OC-web-pull` (Starbucks Tryer Center CapEx — investor relations)

## Acceptance criteria

1. [ ] Section B.5 added to oc-optimus-SKILL.md with correct Panda-specific IDs
2. [ ] SFDR Owner field added to Section D format
3. [ ] All 5 seeded SFDRs have Owner classification
4. [ ] Committed to `claudine-boss`

## Blocked by

SPEC-001 (phase sync) — complete that first so the SKILL is in a clean state

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 2. Reference Fran's Section B.5 at `0-agents/custom-built-agents/fran-SKILL.md` as the model.
