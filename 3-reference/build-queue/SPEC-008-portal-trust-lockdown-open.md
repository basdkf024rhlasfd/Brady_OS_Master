# SPEC-008 — Portal Trust Lockdown

**ID:** SPEC-008
**Slug:** portal-trust-lockdown
**Status:** open
**Claimed by:** —
**Reviewer:** Brady
**Size:** medium
**Trust tier:** T2+ (client-facing production behavior — Brady must approve before deploy)
**Approval gate:** Brady merges the implementing PR after UAT

---

## Problem

mception.ai serves sensitive static files unauthenticated and accepts unauthenticated API writes. `portal/src/proxy.ts` protects only 9 route prefixes and its matcher exempts `.html/.css/.js/.csv/.docx/.xlsx/.zip/images` from Clerk entirely, so `portal/public/1915-south/files/` (negotiation prep, comp positions, ChatGPT strategy log), `portal/public/family/kb/` (incl. `16-school-access-codes.md`), `portal/public/financial-assistant/kb/01-balance-sheet.md`, and `portal/public/panda/kb/` are fetchable by anyone with the URL. `/api/intake` writes to the Streaming Notes Notion DB with zero auth (spam + prompt-injection vector into morning sweep). `/healthcare` lacks `requireProjectAccess`, so any signed-in client can load the family benefits handbook. A Clerk `sk_test` key is committed at `3-reference/skills/mception-local-dev/SKILL.md:49`. Full context: `docs/mception-asset-strategy.md` §2.1.

## Deliverable

1. **`portal/src/proxy.ts`** — protect sensitive content. Either (a) add the sensitive prefixes (`/1915-south`, `/1915-south-map`, `/family`, `/financial-assistant`, `/panda`, `/healthcare`, `/school-hub`, `/grocery-assistant`, `/family-budget`, `/bucket-system`) to `isProtectedRoute` AND narrow the matcher so `.html/.csv/.pdf/.md` under those prefixes are NOT exempt, or (b) move sensitive KB/files behind an authenticated route handler (e.g. `/api/files/[...path]` enforcing `requireProjectAccess`) and delete them from direct `public/` serving. Option (b) is preferred — it survives future matcher edits. Magic-link (`/share/*`) and genuinely public assets must keep working.
2. **`portal/src/app/api/intake/route.ts`** — require auth: Clerk session OR an `x-intake-secret` header checked against a new `MCEPTION_INTAKE_SECRET` env var (Telly and other legit callers get the secret via Vercel env).
3. **`portal/src/app/(portal)/healthcare/`** — add a `layout.tsx` calling `requireProjectAccess("healthcare")` (same pattern as `school-hub/layout.tsx`).
4. **Rotate the committed Clerk key** — invalidate `sk_test_1bsa9…` in the Clerk dashboard, replace `3-reference/skills/mception-local-dev/SKILL.md:49` with a `<get from Clerk dashboard>` placeholder.
5. **CI invariant** — add a script (e.g. `portal/scripts/check-public-exposure.ts`, wired into `npm run build` or CI) that fails if any file under the sensitive `public/` prefixes is servable without auth, so the lockdown can't silently regress.
6. **UAT via webster Runbook 5** — verify per tier (owner/client/preview/magic-link/logged-out): viewers still render, chat still works, logged-out fetch of each named sensitive file fails.

## Acceptance criteria

1. [ ] Logged-out `curl` of `https://mception.ai/1915-south/files/negotiation-kb-2026-04-26.md`, `/family/kb/16-school-access-codes.md`, `/financial-assistant/kb/01-balance-sheet.md`, and `/panda/kb/` files returns 401/302, not content
2. [ ] Logged-out `curl` of the same paths with `.html`/`.pdf`/`.csv` extensions under those prefixes also fails
3. [ ] Unauthenticated POST to `/api/intake` returns 401; Telly's calls still succeed with the secret
4. [ ] `/healthcare` redirects users without the `healthcare` grant to `/portal`
5. [ ] Old Clerk `sk_test` key invalidated; SKILL.md no longer contains a live secret
6. [ ] Exposure-check script exists and passes in CI/build
7. [ ] UAT checklist run and results recorded (Runbook 5 receipts)
8. [ ] Magic-link tours for allowlisted client slugs still work end-to-end

## Blocked by

— (SPEC-009 depends on this, not the reverse)

## Notes

Source: `docs/mception-asset-strategy.md` (2026-07-18 13-agent audit). No new magic links or client grants should be minted until this ships. The `magic_link: false` flips for the Brady-only `1915-south` / `1915-south-map` slugs shipped in the same PR that created this spec.
