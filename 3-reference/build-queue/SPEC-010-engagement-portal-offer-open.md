# SPEC-010 — Engagement Portal Offer Sheet (the 1915 South pattern, productized)

**ID:** SPEC-010
**Slug:** engagement-portal-offer
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T1 (internal document; sending it to any prospect is T2+ and Brady-gated)
**Approval gate:** Brady approves before first external use

---

## Problem

The portal's proven, repeatable deliverable — tiered client surfaces + named agent persona + KB-grounded chat + magic-link tour, executed twice in production (1915 South ×5 surfaces with Fran; Panda ×2 with OC Optimus) and credited as the credibility anchor for the 1915 South offer — exists only as tacit knowledge. Musashi priced it 2026-04-24 ($8–12K setup + $3–5K/yr maintenance) but there is no written offer, so it can't be quoted, delegated, or sold without Brady reconstructing it each time.

## Deliverable

Create `3-reference/skills/project-agent/ENGAGEMENT-PORTAL-OFFER.md` with:

1. **What the client gets** — plain-English description of the pattern: private hub + client-safe exec view + domain workspaces, a named AI agent grounded in the engagement corpus, expiring magic-link tours instead of PDF proposals, authenticated file vault. Reference the app-playbook Pattern 1 shape, written client-safe (no internal codenames).
2. **Pricing & terms** — $8–12K setup + $3–5K/yr maintenance retainer (from `1-execution/areas/brady-os/musashi-reviews/2026-04-24-dual-engagement-build-pass.md` line ~287); what triggers scope-change; how it plugs into `3-reference/skills/project-agent/SOW-TEMPLATE.md` §4 (deliverables table) and §6 (pricing).
3. **Delivery checklist** — the internal build sequence with existing skills: project-agent instantiation → page-chatbot config → projects.yml entry + access grant via mception-fast-path → KB load → magic-link tour mint → UAT via webster Runbook 5. Target: signed → live in under 1 day.
4. **Proof points** — 1915 South (client-safe phrasing: "portal publication served as the credibility anchor for an executive-level engagement") and PauletteAI (live maintenance retainer).
5. **Trust page** — 2–3 bullets on the security/governance model (invite-only, tiered access, expiring links, audit logging) — this is a differentiator, sell it.

## Acceptance criteria

1. [ ] File exists at the specified path with all 5 sections, no placeholder text
2. [ ] Pricing matches the Musashi review source
3. [ ] Delivery checklist references only skills/runbooks that exist, with correct paths
4. [ ] Client-safe: no Brady-only slugs, no internal file paths, no client-confidential details in the client-facing sections
5. [ ] Cross-linked from `3-reference/skills/project-agent/SKILL.md` and `3-reference/app-playbook.md`

## Blocked by

Nothing for drafting. **First external send blocked by SPEC-008** (don't sell trust before the lockdown ships) and by Brady's approval.

## Notes

Source: `docs/mception-asset-strategy.md` §4 Phase 2. Companion motion (not in this spec): retainer proposals to the installed base (Orlando, Mark Schmulen, Baden Bagley, Kroger, Mark-Walmart) using this sheet.
