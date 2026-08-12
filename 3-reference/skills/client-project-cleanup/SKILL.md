---
name: client-project-cleanup
trust_tier: T1
description: >
  Weekly audit of consulting project pages in Notion for SOP compliance, staleness,
  and privacy leaks. Keeps every project true to 3-reference/project-kickoff.md.
  Never deletes content — archives, highlights, and fixes.

  TRIGGER whenever Brady says: "client project cleanup", "audit the client projects",
  "project hygiene", "clean up the consulting pages", or on the weekly sweep cadence.
---

# Client Project Cleanup

Weekly audit of all consulting project pages in Notion. Ensures everything stays true to the SOPs in `3-reference/project-kickoff.md`. Never deletes content — archives, highlights, and fixes.

**Schedule:** Sundays 3:00 PM CT

## Instructions

You are a cleanup and compliance agent for Brady's consulting project pages. You audit both the Client Projects DB (workspace root) and the internal Projects DB (OS > Execution Layer) to ensure every project follows the current SOP.

When triggered, walk through each active project and run every check below. Produce a cleanup report at the end.

---

## Phase 1: Inventory

1. Query the **Client Projects DB** for all entries where Status != Done.
2. Query the **internal Projects DB** for all entries where `Client Page` URL is not empty.
3. Cross-reference: every client entry should have a matching internal entry, and vice versa.

**Flag:**
- Client entries with no matching internal entry -> "Missing internal back-office page"
- Internal entries with `Client Page` set but the URL points to a deleted/missing page -> "Broken client link"
- Internal entries for consulting projects that have no `Client Page` URL -> "Missing client-facing page"

---

## Phase 2: Client Page Structure Audit

For each client project page, fetch and verify:

### Overview section (flat, not toggled)
- [ ] Has Client name
- [ ] Has Engagement summary
- [ ] Has Timeline
- [ ] Has Model (engagement type)
- [ ] Has **Internal Notes** mention-link pointing to the internal Projects DB entry
- [ ] Has Partnership documentation line

### Sub-projects (H2 toggles)
- [ ] At least one sub-project exists as an H2 toggle
- [ ] Active sub-projects use `green_bg` color and include "Active" in the label
- [ ] Queued/future sub-projects use `gray` color
- [ ] Each sub-project toggle contains these child toggles:
  - **Briefing** {toggle} — has What it does, Success looks like, Scope, Timeline
  - **Status** {toggle} — has Phase, Next Milestone, Last Updated
  - **Deliverables** {toggle} — has at least one checklist item
  - **Artifacts** {toggle} — has Instructions, Notes, and/or Prompts subsections

### Shared Notes (H2 toggle)
- [ ] Exists
- [ ] Each entry has a date, Decisions section, and Action Items section

### Decision Log (table)
- [ ] Exists with Date, Decision, Context columns

### Privacy check
- [ ] No internal agent names appear in client-visible content. Check `0-agents/custom-built-agents/` for the current roster — as of last update these include: Bertha, Bo, Burt, Claudine, Cornelius, DiCaprio, Mason, Musashi, Phil, Yuki Ronin.
- [ ] No Notion database IDs or internal URLs
- [ ] No pricing, retainer amounts, or financial details
- [ ] No diary, voice note, or email hub references
- [ ] No mention of "Operating System", internal OS structure, or governance docs

---

## Phase 3: Internal Page Structure Audit

For each internal project entry, fetch and verify:

### Page body sections
- [ ] **Internal Notes** section exists
- [ ] **Working Artifacts** section exists
- [ ] **Pricing & Financials** section exists
- [ ] **Risk & Escalation Log** section exists
- [ ] **Push to Client Checklist** section exists
- [ ] Has mention-link to corresponding client page

### Properties
- [ ] Status is not stale (Last Updated within 14 days, or Status = Waiting/Blocked with a note)
- [ ] Program relation is set
- [ ] Priority is set
- [ ] `Client Page` URL is set and points to a valid page

### Repo-side manifests
- [ ] If the project has a dedicated repo/workspace, check for `PROJECT.md` and `CUSTOMER.md` per `project-kickoff.md` Steps 7-8
- [ ] Flag consulting projects with a repo but no `PROJECT.md` -> "Missing project manifest"

---

## Phase 4: Staleness Check

For each project (both sides):

- [ ] Client page "Last Updated" in Status sections — flag if older than 14 days
- [ ] Internal page "Last Updated" — flag if older than 14 days
- [ ] Any sub-project marked "Active" with no deliverable progress in 14 days -> flag
- [ ] Any sub-project with all deliverables checked but still labeled "Active" -> suggest moving to "Complete" or "Maintain"
- [ ] Any Shared Notes entry older than 30 days with unchecked action items -> flag stale action items

---

## Phase 5: Drift Detection

Check for common ways projects drift from the SOP:

- [ ] **Working content on client page**: Draft-quality text, placeholder content like "[TBD]" or "[to be added]", or TODO markers on the client page -> flag and suggest moving to internal page
- [ ] **Private content on client page**: Anything that looks like internal strategy, pricing math, or personal notes -> flag immediately
- [ ] **Governance leakage**: References to governance docs (`agent-enforcement-rules.md`, `hierarchical-contracts.md`, `council-charter.md`, etc.) or OS hierarchy language on client-visible pages -> flag immediately
- [ ] **Orphaned artifacts**: Files or content on the client page Artifacts section that don't appear to have come from the internal page -> note (not necessarily wrong, but worth flagging)
- [ ] **Empty toggles**: Sub-project toggles with no content inside any of their child toggles -> flag as skeleton that needs filling or archiving
- [ ] **Status mismatch**: Client page Phase/Status doesn't match the sub-project Status sections -> flag inconsistency

---

## Phase 6: Archive, Don't Delete

When something needs to be cleaned up:

**NEVER delete content.** Instead:

1. **For stale sub-projects** — Change color to `gray`, update label to include "Archived" (e.g., "CMO Agent — Archived"). Leave content intact inside the toggle.
2. **For stale Shared Notes action items** — Add a line: `*[Reviewed YYYY-MM-DD — still open / moved to [location] / no longer relevant]*`
3. **For draft content on client pages** — Move it to the corresponding section on the internal page. Replace on client page with a clean placeholder or remove the placeholder entirely.
4. **For empty toggles** — Add `*No content yet — to be populated when this phase begins.*` inside each empty child toggle.

---

## Phase 7: Cleanup Report

Produce a structured report:

```
# Client Project Cleanup — [Date]

## Summary
- Projects audited: X
- Issues found: X
- Fixes applied: X
- Items flagged for Brady: X

## Per Project

### [Project Name]
**Client page:** [link]
**Internal page:** [link]

#### Issues Found
- [description of issue]

#### Fixes Applied
- [what was changed and why]

#### Flagged for Brady
- [decisions needed that the skill can't make autonomously]

## Cross-Project Issues
- [any systemic problems across multiple projects]

## SOP Drift Notes
- [patterns that suggest the SOP itself needs updating — feed these back to project-kickoff.md]
```

---

## Rules

1. **Never delete.** Archive, annotate, or move — but never remove content.
2. **Never edit client-visible meaning.** You can fix formatting, add status annotations, and move draft content to internal pages. You cannot rewrite briefings, change deliverable descriptions, or alter decision log entries.
3. **Flag, don't decide.** If something looks wrong but you're not sure, flag it for Brady in the report. Don't guess.
4. **Internal page is the workshop.** If content needs to move, it moves TO the internal page, not FROM it.
5. **Source of truth for project setup is `3-reference/project-kickoff.md`.** Page structure conventions (toggles, sub-project format, color coding) are defined in this skill. If this skill's checks ever conflict with `project-kickoff.md`, the kickoff doc wins. Flag the conflict so the skill can be updated.

---

## Reference

- Project setup SOP: `3-reference/project-kickoff.md`
- Client Projects DB: Notion workspace root > Client Projects
- Internal Projects DB: Operating System > 1 - Execution Layer > Projects
- Consulting Practice wiki: Operating System > Consulting Practice
- Project creator skill: `3-reference/skills/project-creator/SKILL.md`
- Brief template: `3-reference/skills/project-creator/BRIEF-TEMPLATE.md`
- Agent roster: `0-agents/custom-built-agents/`
- Governance docs: `3-reference/governance/`
