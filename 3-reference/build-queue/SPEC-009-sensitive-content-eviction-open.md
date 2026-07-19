# SPEC-009 — Sensitive Content Eviction (public/ + git history)

**ID:** SPEC-009
**Slug:** sensitive-content-eviction
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** large
**Trust tier:** T2+ (irreversible history rewrite + production content moves — Brady must approve)
**Approval gate:** Brady approves the file inventory AND the history-rewrite plan before execution

---

## Problem

Even after SPEC-008 puts auth in front of serving, sensitive content still *lives in the repo* in breach of CLAUDE.md rules ("family data never in git", "financial actuals go to `~/brady-os-local/finance/`", client financials to `~/brady-os-local/{client-slug}-confidential/`): the family KB (school access codes, school calendar, kids' schedules), the itemized balance sheet, 1915 South negotiation/comp material (now employer-relationship material), and kid PII hardcoded in `portal/src/lib/school-hub-data.ts`. Every clone and every git history checkout carries it; prior removals remain recoverable at commit `96313b1b` per `docs/investigations/removed-artifact-manifest-2026-07-16.md`.

## Deliverable

1. **Inventory pass** — enumerate every sensitive file under `portal/public/` and `portal/src/` (family KB, financial KB, 1915-south files, panda KB as applicable, school-hub-data.ts PII), classify each: (a) must stay servable behind auth, (b) move to `~/brady-os-local/…` and serve via runtime fetch/env, (c) delete outright. Output the inventory as a table in this spec's Notes for Brady's approval.
2. **Execute the moves** per approved inventory — auth-served content goes behind the SPEC-008 route handler; local-only content moves to its CLAUDE.md-designated home; `school-hub-data.ts` refactored to load kid data from env/Notion/local file instead of hardcoded source.
3. **C4 history rewrite** — run the already-specced `git filter-repo` pass from `docs/investigations/repo-cleanup-and-innovation-ideas-2026-07-16.md`, coordinated across harnesses via `3-reference/skills/dispatch-git-protocol/SKILL.md` (all sessions must re-clone after). Include the SPEC-009 inventory paths and the manifest paths recoverable at `96313b1b`.
4. **C5 client-financials pass** — 1915 South DD material to `~/brady-os-local/1915-south-confidential/` per the client-pnl-dd rule.
5. **Update `.gitignore`** so evicted paths can't be re-committed, and update `docs/investigations/removed-artifact-manifest-2026-07-16.md` with the new removals.

## Acceptance criteria

1. [ ] Approved inventory table present in Notes before any execution
2. [ ] `git grep` on HEAD finds no school access codes, no itemized balance sheet, no negotiation/comp files, no hardcoded kid schedules
3. [ ] Post-rewrite: sensitive blobs unrecoverable from any ref (verified via `git log --all` + object walk on the named paths)
4. [ ] Family/financial surfaces on mception.ai still render for authorized users (data served behind auth or from local/runtime source)
5. [ ] All harnesses re-cloned; dispatch-git-protocol coordination note posted (Telly signal)
6. [ ] Manifest + `.gitignore` updated

## Blocked by

SPEC-008 (auth serving must exist before content is moved behind it). History rewrite additionally blocked by Brady picking a coordination window (all harnesses idle).

## Notes

Source: `docs/mception-asset-strategy.md` §2.1/§4 Phase 1; C3/C4/C5/I5 defined in `docs/investigations/repo-cleanup-and-innovation-ideas-2026-07-16.md`. The C3 ~130MB asset dedupe and I5 shared asset layer are worthwhile follow-ons but NOT in scope here — keep this spec about sensitive data only.
