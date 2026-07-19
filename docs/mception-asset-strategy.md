# mception.ai Asset Strategy — From Delivery Surface to Durable Asset

**Date:** 2026-07-18
**Provenance:** 13-agent research pass — 6 parallel auditors (codebase, live surface, ops layer, business model, governance, momentum signals) → 3 competing strategies (client-leverage / productize / IP-moat) → 3-judge panel (revenue realist, asset appraiser, ops skeptic) → adversarial fact-check of every load-bearing claim against repo files. Facts below were re-verified by hand where they drive decisions.
**Execution vehicle:** Build queue SPEC-008 through SPEC-012 (`3-reference/build-queue/`), plus two Brady-only actions listed in §4 Phase 0.

---

## TL;DR

mception.ai already proved its highest-ROI use: the Clerk-gated 1915 South publication is credited in `PROJECT.md` as the credibility anchor that helped convert an Apr 20 advisory pitch into a May 8 written executive offer (~2.5 weeks). **The asset is the engagement machine, not a future SaaS.** The winning strategy — chosen by 2 of 3 judges and hardened with grafts from the losing two — is:

1. **Trust first.** The portal currently serves 1915 South negotiation prep, the family KB (including school access codes), and an itemized ~$1.4M balance sheet **unauthenticated** via `public/` static serving, and `/api/intake` accepts unauthenticated writes into the Streaming Notes DB that morning sweep consumes. An asset with a data leak is a liability. Lock it down before anything else (SPEC-008, SPEC-009).
2. **Title second.** Brady has been full-time at 1915 South since ~June 1 (not the stale "Aug 1" in Panda's PROJECT.md). The mception IP carve-out is still flagged "to be verified in formal offer letter language" (`Project - 1915 South/PROJECT.md`). Every downstream dollar builds equity in an asset whose title is unconfirmed. Get it in writing.
3. **Package what already sells.** The 1915 South pattern (tiered surfaces + named agent persona + KB-grounded chat + magic-link tour) is a repeatable deliverable Musashi already priced at **$8–12K setup + $3–5K/yr maintenance** (2026-04-24 review). Turn it into a written offer (SPEC-010) and retainer-ize the installed base.
4. **Defer the SaaS.** broker-platform and consulting-os-platform stay parked until 3+ paying retainers prove the pattern and a non-Brady operator runs delivery. Their slugs aren't in the projects.yml allowlist, so publishing them is fail-closed anyway.

---

## 1. What mception is today (asset audit)

### The chassis (genuinely valuable, ~90% client-agnostic)

- **Config-as-product registry.** `portal/src/config/projects.yml` (27 slugs) drives sidebar, access control, magic links, and iframe config via `load-projects.ts`. Adding a client surface is a YAML entry + page file + env var — a documented 3-step flow (`portal/docs/new-project-viewer.md`).
- **The chat engine is the crown jewel.** `portal/src/lib/chat/`: per-project YAML configs (15 files), markdown agent personas (Fran, OC Optimus), keyword-routed KB injection over 77 markdown files, group-scoped context isolation, owner-tier-only server-side tools (Calendar, Notion), and per-turn `[AUDIT]` JSON logging.
- **Access model beyond typical solo builds.** 4 tiers (owner/test/preview/client) from env allowlists + Clerk metadata, live no-redeploy grants via `/admin/access`, server-side tier enforcement in the chat route.
- **Magic-link tours as a sales weapon.** HS256 JWT multi-project expiring tours (`portal/src/lib/magic-link.ts`, `/share/[token]`) — an interactive proposal no competing consultant sends. Already proven with the Anton 30-day portfolio link.
- **ProjectFrame + postMessage bridge** absorbs any external app (V0 builds, Vercel apps, GitHub Pages viewers) into one branded shell without changing the client-facing URL.
- Modern stack (Next.js 16, React 19, AI SDK v6, Clerk 7, Tailwind 4), ~20K lines TS/TSX, clean patterns.

### The installed base (27 slugs, three audiences behind one auth boundary)

- **Client/prospect engagements (~10):** 1915 South ×5 surfaces, Panda ×2, Kroger, Mark-Walmart, Mark Schmulen, Baden Bagley, STIHL, Gary/IVFH, PauletteAI, Orlando.
- **Family (6):** healthcare, family-budget, school-hub, grocery-assistant, financial-assistant, bucket-system.
- **Internal/personal:** agent-ecosystem, sycamore-lane, content-engine, innovation-lab, shellprint, calculators.

### The ops layer

Runbook-driven, agent-executed: `mception-fast-path` one-line grammar → Musashi Deploy Mode → seven webster runbooks (publish, access, deploy diagnosis, API wiring, UAT, standalone Clerk apps). PR-merge-to-autodeploy. This tooling is itself sellable IP — but it currently assumes Brady's personal Vercel/Clerk accounts and his local paths.

### Proof the machine works

- 1915 South portal publication → credibility anchor for the executive offer (`PROJECT.md` lines 48–49); accepted structure $150K base + 1.5% EBITDA quarterly.
- PauletteAI is a live maintenance retainer (the only one).
- Panda: Brady **declined** the full engagement (not the reverse); the ~$10K whitepaper-only pivot is real and the pitch task has sat unchecked since late April — the nearest actual dollar in the system.

---

## 2. What blocks the value (verified liabilities)

### 2.1 The trust gap — unauthenticated exposure (verified by hand 2026-07-18)

`portal/src/proxy.ts` protects only 9 route prefixes (`about, knowledge, orlando, portal, stihl, dashboards, calculators, notes, user-profile`), and its matcher **exempts `.html/.css/.js/.csv/.docx/.xlsx/.zip/images` from Clerk entirely**. Net effect — anyone with the URL can fetch, with no login:

- `portal/public/1915-south/files/` — 31 files: `negotiation-kb-2026-04-26.md`, `proposed-position-2026-04-25.md`, `email-justin-counter-2026-04-26.md`, the ChatGPT strategy log, comp benchmarks, SFDRs. **This is now employer-relationship material, not just client material.**
- `portal/public/family/kb/` — 19 files including `16-school-access-codes.md` and `02-school-calendar.md` (kids' PII; also breaches the CLAUDE.md "family data never in git" rule).
- `portal/public/financial-assistant/kb/01-balance-sheet.md` — itemized ~$1.4M net worth.
- `portal/public/panda/kb/` — 18 files of engagement KB.

Additional verified holes:

- `/api/intake` (`portal/src/app/api/intake/route.ts`) — **zero auth**; anyone can POST rows into the Streaming Notes Notion DB. Since morning sweep and the processor consume that DB, this is also a prompt-injection vector into agent workflows.
- `/healthcare` has no `requireProjectAccess` (page.tsx only, no gating layout) — any signed-in portal user, including invited clients, can load the family benefits handbook. (school-hub, grocery-assistant, and stihl are gated via their `layout.tsx` — an earlier claim that they were open was wrong.)
- A Clerk `sk_test` secret key is committed at `3-reference/skills/mception-local-dev/SKILL.md` line 49.
- 18 of 27 slugs have `magic_link: true`, **including the Brady-only `1915-south` and `1915-south-map`** — inconsistent with the fast-path "least privilege, fail closed" guardrail. (Fixed in this PR: flipped to `false`.)
- Kid PII hardcoded in `portal/src/lib/school-hub-data.ts` (in git).

### 2.2 The title gap

`Project - 1915 South/PROJECT.md` line 31: mception posture "Preserved as outside ownership — **to be verified in formal offer letter language**." Brady started ~June 1; this is now a post-start written clarification with an employer — more delicate and more urgent than the pre-start checkbox the April planning assumed.

### 2.3 The key-person gap

Personal Vercel account (`webster-SKILL.md` Runbook 7c hardcodes `bradysmallwood-7504` and a Mac worktree path), personal Clerk instance, `brady.smallwood@gmail.com` hardcoded as default owner in `access.ts`, prose runbooks instead of scripts, zero automated tests, no second admin. Asset value if Brady stops touching it is currently near zero.

### 2.4 State drift

- Build queue dormant ~12 weeks; SPEC-004/005/006 deliverables verifiably shipped (SOW template exists; capacity snapshot is morning-sweep phase 1.0d; cross-engagement signal lines landed) but spec bodies still say `open` while filenames say `needs-review`. Only Brady can accept (INDEX.md rule).
- Dead routes: `(portal)/incubator/page.tsx` has no registry slug; `bucket-system` has a registry entry but no page route.
- webster Runbook 5b references a nonexistent chat-config path; docs still mention the legacy "munich" Vercel project.
- July portal commits went entirely to family/personal surfaces; last client-facing feature shipped June 12. Notion sync layer flatlined (Framework Runs DB: 1 row ever).

---

## 3. The strategy: The Engagement Machine (with grafts)

**Thesis.** mception is maximally valuable as the delivery layer that wins, expands, and retains engagements — premium fees justified by a premium, *trustworthy* client experience — run increasingly by agents and a successor operator rather than Brady's hours (which went to ~zero on June 1).

**Why not the alternatives (and what we kept from them):**

- **Portal-in-a-Box (extract chassis → template repo + CLI + DB + SaaS design partners).** Highest ceiling, wrong sequence: contractor-months ahead of any dollar, a database + multi-tenant refactor of a zero-test codebase, and a sales motion Brady doesn't have. **Grafted:** config-enforced guardrails (`magic_link: false` on private slugs), tour open-analytics as the cheap sales instrument, and the cash-before-build gate for any future extraction.
- **Transferable Machine (acquisition-grade IP, kits, licensing).** Right lens for a solo operator gone full-time, but on a 2-quarter horizon almost everything is cost, and its packaged-IP revenue moves (operating manual "via mception.ai/consulting-os", chat-engine licensing) collide with the publishing allowlist — those slugs don't exist, so they fail closed. **Grafted:** IP carve-out elevated to a gating Move 0, Clerk key rotation, CI invariants instead of one-time sweeps, the contractor handoff acceptance test (one full publish→grant→UAT→receipt cycle from docs alone), and the family tenant split.

**The judges' most important addition (missing from all three strategies):** close the Panda ~$10K whitepaper. The research corpus (14 DR threads + 3 SFDRs) is already built; delivery is a document, not a portal; one re-engagement email beats every KPI dashboard in this file.

---

## 4. Sequenced roadmap

### Phase 0 — This week (Brady-only actions, no build required)

1. **Freeze new magic links and new client grants** until SPEC-008 ships. Every link minted against the current proxy is a liability.
2. **IP carve-out in writing.** Post-start written clarification with Justin that mception.ai, the Brady OS repo, agent/skill IP, and derivatives are excluded from the employment IP assignment. Small legal spend; gates everything downstream.
3. **Send the Panda whitepaper re-engagement email** (~$10K, corpus already built).

### Phase 1 — 30 days: Trust Lockdown (SPEC-008, SPEC-009)

- Fix `proxy.ts` coverage (protect sensitive prefixes; stop blanket static exemptions for sensitive paths), auth `/api/intake`, gate `/healthcare`, rotate the committed Clerk key. — SPEC-008 (T2+)
- Evict sensitive content from unauthenticated `public/` serving; execute the already-specced C4 git-history rewrite + C5 client-financials pass (`docs/investigations/repo-cleanup-and-innovation-ideas-2026-07-16.md`); family KB and financial actuals per CLAUDE.md rules (local-only homes). — SPEC-009 (T2+)
- Convert to CI invariants: zero unauthenticated sensitive URLs, enforced on every deploy — not a one-time sweep.
- Reconcile the build queue so the delegation surface works again. — SPEC-012 (T1)

### Phase 2 — 90 days: Package and monetize the proven pattern

- **Engagement Portal offer sheet** from the 1915 South pattern: tiered surfaces + persona agent + KB chat + magic-link tour, $8–12K setup + $3–5K/yr, assembled from existing skills (project-agent, page-chatbot, SOW-TEMPLATE, app-playbook Pattern 1, fast-path). — SPEC-010 (T1)
- **Magic-link tours as standard close-of-meeting artifact** with open/engagement logging on `/share/[token]` feeding weekly sweep. — SPEC-011 (T1)
- **Retainer-ize the installed base:** maintenance retainer proposals to Orlando, Mark Schmulen, Baden Bagley, Kroger, Mark-Walmart surfaces (PauletteAI is the template). Sell the security fix as a client-visible feature: "your files are now behind auth."
- **Engagement ops that don't rot:** A1 (projects.yml → Client Projects DB sync in Musashi's nightly run) and B3 (auto-file deliverables to Drive) from `1-execution/areas/brady-os/audits/2026-07-16-drive-notion-mception-audit.md`.

### Phase 3 — 2 quarters+: Transferability, then (maybe) product

- **Tenant split:** family surfaces to a separate deployment/Clerk boundary — mception.ai becomes purely the client asset; doubles as the first proof the chassis stamps into a second instance.
- **De-Brady the machine room:** org Vercel/Clerk accounts, second admin, runbooks compiled to scripts, contractor handoff validated by one full publish→grant→UAT→receipt cycle with zero Brady interventions.
- **Product gate:** only after 3+ paying retainers and a running successor operator, revisit consulting-os-platform (its live demo is mception itself) with design-partner cash before any build. Any mception.ai surface for it is a new publication → full approval path.

---

## 5. KPIs

| KPI | Baseline | Target |
|---|---|---|
| Unauthenticated sensitive URLs on production | dozens | **0 within 30 days**, CI-enforced |
| Signed mception IP carve-out | flagged, unverified | in writing this month (binary; gates all else) |
| Active maintenance retainers | 1 (PauletteAI) | 4+ in two quarters; MRR in weekly sweep |
| Revenue per engagement | ad hoc | every new engagement includes the $8–12K portal SKU |
| Tour funnel (minted → opened → converted) | uninstrumented | instrumented via SPEC-011; 10 tours / 2 conversions per quarter |
| Time-to-live for a new client surface | ~days | < 1 day via fast-path receipts |
| Brady-free ops | ~0 | one full publish→grant→UAT cycle with zero Brady actions by day 90 |

---

## 6. Hard guardrails (what not to do)

1. **No SaaS build now.** broker-platform and consulting-os-platform are spec-only (no repos, no allowlisted slugs, unvalidated pricing). Parked until the retainer + operator gates pass.
2. **No multi-tenant rearchitecture, no database migration, no embeddings KB.** Sufficient at ≤30 slugs; infrastructure doesn't close engagements; every refactor of a zero-test codebase is UAT-only risk.
3. **No new magic links or client grants until SPEC-008 ships.**
4. **No kit/rebuild-guide/repo distribution before C4 + C5 complete.** Every clone currently carries recoverable sensitive blobs (manifest: `docs/investigations/removed-artifact-manifest-2026-07-16.md`, commit `96313b1b`).
5. **No portal hours on family/engine polish ahead of trust + packaging.** July's pattern (all commits to family surfaces; analytics shipped against a one-row learning log) is the anti-pattern.

---

## 7. Governance conflicts the fact-check caught (so nobody trips them later)

- Selling the $97/$497 operating manual "via mception.ai/consulting-os" (Musashi review idea): **slug doesn't exist** → new publication → fail closed until consulting-project classification + Publishing section + approved allowlist entry. Also collides with "operating docs are never public by default."
- Publishing a 1915 South case study on agent-ecosystem: **broadens visibility** of a private, now-employer engagement → full new-publication path + gated on the IP carve-out.
- Any consulting-os/broker demo under mception.ai: same fail-closed rule.
- **Live rule breach (state, not proposal):** family KB, school calendar, and the balance sheet are committed and publicly deployed despite CLAUDE.md's "sensitive data never in git." SPEC-009 is the remediation.

---

## Appendix: fact-check corrections that reshaped the strategy

1. **"Aug 1 FT start" was stale.** Brady started ~June 1 (budget-guidance SKILL line 52: bonus prorated for 5/31 start; 1915 South PROJECT.md). All "two-week pre-start window" sequencing was invalid; lockdown urgency is *now*, and the IP conversation is post-start.
2. **"Panda declined" had the direction reversed.** Brady declined Panda; the ~$10K whitepaper pivot is the open door.
3. **"14,099 transactions in data.js" was overstated** — the file is a 20KB aggregate; the genuinely sensitive committed artifact is the itemized balance sheet KB.
4. **"Need a DB to kill the env-var grant ceiling" was wrong** — no-redeploy Clerk-metadata grants already exist (`access.ts`); remaining work is migrating legacy allowlists.
5. **"school-hub/grocery/stihl ungated" was wrong** — they gate via `layout.tsx`; only healthcare is genuinely ungated.
6. **SPEC-001..007 "close as accepted" would violate the queue's own review gate** — only Brady moves needs-review → accepted; SPEC-012 prepares the batch-accept list instead.
