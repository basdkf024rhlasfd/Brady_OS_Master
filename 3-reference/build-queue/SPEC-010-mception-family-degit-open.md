# SPEC-010 — Family Data Out of Git (hard prerequisite)

**ID:** SPEC-010
**Slug:** mception-family-degit
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T2 (touches family-sensitive data + git history — Brady confirms before execution)
**Approval gate:** Brady approved core plan 2026-07-19

---

## Problem

Family-sensitive data is currently tracked in git — recon confirmed `portal/public/family/kb/16-school-access-codes.md`, kids' schedules, and `portal/public/financial-assistant/data.js` are committed. This directly contradicts the TRANSPARENCY §5 / CLAUDE.md rule ("family/sensitive data never in git"). **No self-committing loop may run until this is reconciled** — otherwise the loop could propagate sensitive files or auto-commit around them.

## Deliverable

1. Inventory every family/financial-sensitive file currently tracked under `portal/public/family/` and `portal/public/financial-assistant/`.
2. For each: decide runtime-load-from-Notion (like `/api/1915-south/research-feed`) vs. behind-auth-only vs. genuinely-safe-to-keep. Move the sensitive ones out of git; the portal reads them at runtime from Notion or a non-tracked source.
3. Purge the sensitive files from git tracking (and history if warranted — confirm scope with Brady, this is destructive to history).
4. Add/verify `.gitignore` entries so they can't be re-committed.
5. Confirm the family pages still render (graceful degradation if a source is absent — partial/stale must beat blank, per WAF doctrine).

## Acceptance criteria

1. [ ] Inventory of tracked family/financial-sensitive files produced
2. [ ] Sensitive files no longer tracked; `.gitignore` prevents re-commit
3. [ ] Family pages still render with data sourced at runtime (no blank screens)
4. [ ] Brady confirmed the scope of any git-history rewrite before it ran
5. [ ] TRANSPARENCY §5 reconciled (note what moved and where)

## Blocked by

- — (can and should start immediately; it is the gate for Phase C)

## Notes

Owner: **Musashi Deploy Mode** (git/env) + Claudine (inventory + Notion wiring). Confirm-back required before any `git filter-repo`/history rewrite (destructive). This is a prerequisite for SPEC-013 (loop wiring) — the loop must never touch content until this is clean.
