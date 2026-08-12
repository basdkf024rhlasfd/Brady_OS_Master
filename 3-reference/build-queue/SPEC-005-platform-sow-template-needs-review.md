# SPEC-005 — SOW Template

**ID:** SPEC-005  
**Slug:** platform-sow-template  
**Status:** needs-review
**Claimed by:** —  
**Reviewer:** Brady  
**Size:** medium  
**Trust tier:** T1  
**Approval gate:** `approve musashi platform-2`

---

## Problem

Brady is about to draft a Statement of Work for Panda. There is no template. He'll write it from scratch, and then likely write a second one from scratch for 1915 South. Writing a template takes 30 extra minutes once; it saves 2+ hours on every future SOW.

## Deliverable

Create `3-reference/skills/project-agent/SOW-TEMPLATE.md` — a reusable SOW template with the following sections:

1. **Header** — Client name, Brady's role, engagement model (Advisory / Sprint / Embedded / Retainer), capacity % (Brady hours/week), engagement start date, engagement end date or duration
2. **Engagement summary** — 2–3 sentence plain-English description of what the engagement is and why the client is doing it. Non-legalese.
3. **Problem portfolio** — Top 3–5 validated problem statements passing the 5-criteria sharpness gate. Each: problem statement, KPI it's tied to, owner at the client, observable evidence.
4. **Deliverables** — Table: Deliverable name, format (HTML/PDF/MD), due date, delivery method (email / Drive / portal), review cycle (Brady-only review / client review round / no review needed)
5. **Brady's availability and constraints** — Hours/week committed, on-site cadence (if any), timezone, blackout dates, other active engagements disclosed (per Brady's transparency posture)
6. **Pricing** — Structure: fixed-fee per deliverable block OR monthly retainer rate. Payment schedule. What triggers a scope change conversation.
7. **Success metrics** — How both parties will know the engagement worked. Tied to the client KPI scoreboard from the project agent.
8. **Engagement governance** — Cadence (weekly check-in / async / milestone-based), Brady's single point of contact at the client, Brady's escalation path if scope changes
9. **Termination and optionality** — Either party can terminate with [N] days notice. Brady may pause if other commitments change. Client may pause once for up to [N] weeks without fee adjustment.
10. **Signature block** — Date, Brady Smallwood (name + title: Independent Consultant), Client (name + title + company), countersignature line

Add a `## Usage notes` section at the top explaining: when to use this template, how to fill it in with project agent data (reference the Sharpness Gate for problem statements, KPI Scoreboard for success metrics), and what requires Brady review before sending to any client.

## Acceptance criteria

1. [ ] Template file created at the specified path
2. [ ] All 10 sections present with instructional placeholder text (not blank)
3. [ ] Usage notes section explains how to populate from project agent data
4. [ ] No placeholder is left ambiguous — each one says exactly what goes there
5. [ ] Committed to `claudine-boss`

## Blocked by

—

## Notes

Source: Musashi Review `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md`, Rec 5. The project-agent template directory is `3-reference/skills/project-agent/`. Sharpness Gate is documented in both oc-optimus-SKILL.md Section C and fran-SKILL.md Section C.
