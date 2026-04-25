# ShellPrint

> Turtle photo-ID + personal registry app. Photo-ID → species confidence → persistent individual fingerprint via scute patterns. The only consumer app that recognizes *the same specific turtle* on a return visit.

---

## Project Profile

| Field | Value |
|-------|-------|
| Name | ShellPrint |
| Type | Product / Micro-app farm, Cohort 1 |
| Program | Personal Projects |
| Owner | Brady Smallwood / Sycamore Lane Holdings |
| Slug | shellprint |
| Date created | 2026-04-25 |
| Phase | kickoff |

---

## Problem

Existing turtle ID apps (Seek, Picture This, Google Lens) give one-shot guesses with no quality enforcement, no personal registry, and zero individual re-identification. Hobbyist naturalists, families with kids, and citizen science contributors have no tool that builds a compounding personal library of every turtle they've encountered — and certainly not one that recognizes Hank when he comes back next spring.

## Wedge

Three things no competitor does simultaneously:
1. Enforces capture quality (4-shot protocol)
2. Builds a persistent personal registry
3. Re-identifies individual turtles via scute-pattern fingerprinting

---

## Scoreboard

**Brady's Victory Condition:** An app that tells him "this is the same turtle you saw March 14, 2025" when he finds one in the yard. Kids can log their own turtles. Registry compounds with use.

**Product Victory Condition:** 1,000 registered users with 10+ turtles logged within 90 days of App Store launch.

**Key Results:**
- ≥90% species ID confidence on common North American species
- ≥85% individual re-ID accuracy on clear carapace photos
- <90s capture-to-saved-entry flow
- 500+ registry entries without performance degradation

**Leading Indicator:** User logs second turtle within 7 days of first (registry stickiness signal)

---

## Team

| Agent | Role |
|-------|------|
| Brady | Product owner, field tester |
| Conductor agents (3–4) | Build execution |
| Musashi | Idea review + business model tension |

---

## Build Strategy: Two Tracks

### Track A — Same-Day Web MVP (Recommended First)

**Goal:** Prove the core loop works before committing to native iOS.

**Stack:** Next.js + Vercel + iNaturalist CV API + IndexedDB
**Conductor agent split (3 parallel, ~4–6 hours):**

| Agent | Work |
|-------|------|
| Agent 1 | Camera capture page (MediaDevices.getUserMedia) + photo upload fallback + basic quality checks (focus, frame) |
| Agent 2 | iNat CV API client + species ID UI + confidence display + alternate candidate flow |
| Agent 3 | Registry (IndexedDB) + turtle profile pages + basic scute feature extraction stub |

**Agent 4 (starts after 1–3 stabilize, ~hour 3):** Next.js shell, routing, Vercel deploy, basic design system

**Same-day deliverable:** Live web app at shellprint.vercel.app where you can photograph or upload a turtle, get a species ID, and save it to your personal registry. No scute re-ID yet (stub in data model, wired in V1.1).

**Why web first:** Validates iNat API integration, registry UX, and the core habit loop without committing to Swift/Xcode/App Store latency. If the web app doesn't create "I want to check again" behavior, the native version isn't worth building.

---

### Track B — Native iOS V1 (After Web MVP Validates)

**Stack:** SwiftUI + AVFoundation + CoreML + iNat API + SQLite
**Timeline:** 15–25 hours across 3–4 Conductor agents (Days 1–14 as briefed)
**Start condition:** Web MVP used by Brady + kids for 7+ days, re-ID loop confirmed desirable

See original build brief at: `.context/attachments/pasted_text_2026-04-25_17-08-37.txt`

---

## Musashi's Tension Points

**1. scute fingerprinting timeline.** OpenCV-based scute extraction is real but non-trivial. The web MVP stubs it (saves raw photo, logs "fingerprint pending"). Proving the ID flow works without it still validates the product. Don't block same-day MVP on it.

**2. iNat API rate limits.** Free tier is 100 req/min. Web MVP single user is fine. If citizen science angle drives volume, need iNat partner API or caching layer. Not day-one.

**3. Family mode scope.** For web MVP: one registry per browser session. Multi-profile is a V1.1 feature. Shipping with a single registry is fine — don't scope-creep before launch.

**4. iOS App Store latency.** Even a polished iOS app takes 24–48 hours for TestFlight + weeks for App Store. Web MVP sidesteps this entirely — useful before any app review cycle.

**5. Platform expansion thesis.** The brief correctly identifies this as "template-zero" for a biodiversity registry. Don't let that tempt scope expansion before ShellPrint itself ships. Prove turtles first.

---

## Open Questions (Brady to Answer Before Agent Kickoff)

1. **Same day vs. full brief?** Recommend: start Track A (web MVP) today via Conductor parallel agents. Yes/no?
2. **iNat account?** Need an iNat API key. Do you have one? (Free, 5-min signup at inaturalist.org/users/api_token)
3. **Naming:** ShellPrint or something else? Affects domain, repo name, Vercel project.
4. **Privacy default:** All data local (IndexedDB, no backend) for MVP. Confirm.
5. **iOS later:** After web MVP validates, do we want to hire a Swift contract dev or build via Conductor agents?

---

## Where Things Live

| What | Where |
|------|-------|
| Project brief + notes | This folder |
| Code (web MVP) | New standalone repo: `shellprint-web` |
| Code (iOS) | New standalone repo: `shellprint-ios` (if Track B proceeds) |
| Registry | Local only (IndexedDB for web, SQLite for iOS) |
| Deploy | Vercel (shellprint-web → shellprint.vercel.app) |

---

## Status

- Phase: kickoff
- Track A: **not started** — awaiting Brady go/no-go
- Track B: **backlogged** — pending Track A validation
- Last updated: 2026-04-25
