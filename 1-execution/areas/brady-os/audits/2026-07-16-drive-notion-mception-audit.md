# Drive + Notion × mception — Staleness Audit & Upgrade Plan

**Date:** 2026-07-16
**Author:** Claudine (Code, remote session)
**Scope:** How Google Drive and Notion are actually being used for mception work today, where they've gone stale, and concrete ways to make them more powerful and efficient.
**Method:** Live probes against Drive (MCP) and Notion (MCP SQL queries), cross-checked against `portal/src/config/projects.yml`, `3-reference/infrastructure-registry.yml`, and `3-reference/connector-registry.yml`.

---

## 1. Diagnosis — what the live data shows

The one-line summary: **intake is alive, everything downstream flatlined in the last week of April.** The portal (repo + Vercel) kept moving; Notion and Drive stopped reflecting reality around 2026-04-24 → 04-29.

### Notion (measured 2026-07-16)

| Surface | State | Evidence |
|---|---|---|
| ⚡ Streaming Notes | **Alive but drowning** | 1,054 total rows; latest created *today*; 69 new in last 30 days — but **730 rows open** (Not Started / In Progress / Waiting / Blocked) |
| Client Projects DB (`c8a6b2d7…`) | **Stale + wrong** | 7 rows, last edit **2026-04-13**. Missing every current engagement: no Panda, no 1915 South, no Kroger, no Mark-Walmart. Contains stalled/inactive rows (STIHL, IVFH) |
| Companies DB (`d41b6f0d…`) — "the Unified Client Object" | **Frozen** | 7 rows, newest created **2026-04-29** |
| Framework Runs DB (`2c5e7bd1…`) | **Effectively unused** | **1 row ever**, created 2026-04-24 (the Phase 2 launch day) |
| Research Library (`4f87259b…`) | **Frozen** | 40 rows, newest created **2026-04-29** |
| Context Vault DB | **Never configured** | Still `NEEDS_CONFIGURATION` in infrastructure-registry.yml; the 1915 South research-feed route depends on it |

Meanwhile `portal/src/config/projects.yml` — the actual system of record — has 25 live slugs and was updated as recently as **2026-06-09** (mark-walmart). Reality moved to the repo/portal; Notion never followed.

### Google Drive (measured 2026-07-16)

- **Four duplicate `mception-ai` folders** exist under four different parents, all created/modified late March–early April, none touched since. These look like artifacts of repeated exports/uploads, not an intentional structure.
- The **"Consulting (mception)"** folder (created 2026-03-31) contains exactly three things: a LinkedIn data export and two LinkedIn-analysis files from early April. It is not functioning as a consulting hub.
- Client folders (`1915 South`, `Panda`) exist but were created ad hoc; the `1915 South` folder holds one offer-letter PDF.
- Recent Drive activity is almost entirely personal (taxes, family, the Hearth book project). **Drive has no assigned job in the mception workflow** beyond two narrow registered uses: the OS-Recaps mailer folder and the PauletteAI sync folders.
- Deliverables that clients actually see live in `portal/public/<slug>/viewer/` and Vercel — they never touch Drive, so Drive can't serve as the client file-exchange layer it's positioned to be.

### Root-cause hypothesis

All downstream Notion surfaces died in the same 5-day window (Apr 24–29) — the same week the Consulting Kit Phase 1/2 objects were created. That pattern says the **scheduled loops that were supposed to feed them (streaming-notes-processor, weekly sweeps, Heidi Rule 5, engagement-router) either stopped running or were never wired to run on a schedule**, rather than dozens of independent failures. The 730-item open backlog and the 2026-07-15 Phil hard-stop (37 Done/Status mismatches, over the 20 cap) corroborate: grooming capacity < intake rate.

---

## 2. Operating principle for the fix

> **One system of record per fact; every other surface is generated from it.**

Today three surfaces claim to describe client work (projects.yml, Client Projects DB, Companies DB) and none agree. Hand-maintaining parallel registries is what failed — don't resume it, automate it.

Proposed ownership map:

| Fact | System of record | Generated views |
|---|---|---|
| What's live on mception.ai | `portal/src/config/projects.yml` (already true) | Client Projects DB rows (synced) |
| Who the client/prospect is | Companies DB | Client Projects `Company` relation, Drive folder name |
| Client-exchangeable files | Google Drive `Consulting (mception)/<slug>/` | Link on the Companies row |
| Deliverable source-of-truth | Repo (`portal/public/<slug>/`) | PDF copies auto-filed to Drive |
| Research | Research Library DB | Agent citations, exec-intel pre-checks |

---

## 3. Recommendations

### A. Notion — stop hand-maintaining, start syncing

**A1. Portal→Notion project sync (highest leverage).** A small script/skill step that reads `projects.yml` and upserts one Client Projects row per client-facing slug (Name, Client, Phase, Last Updated, portal URL), archiving rows whose slug is gone. Run it as a phase of an existing scheduled agent (Musashi nightly review is the natural host — it already owns deploy/publish state). The client-facing DB then *cannot* drift from what's actually live.

**A2. One-time reconciliation.** Create the missing Client Projects + Companies rows (Panda, 1915 South, Kroger, Mark-Walmart), correct Engagement Type on dead ones (IVFH → Archived, STIHL → Paused). ~30 minutes of work, unblocks everything relational (Research Library `Client Relevance`, Framework Runs `Company`, project-agent wikis).

**A3. Decide on Framework Runs: wire it or shelve it.** One run in 12 weeks means the engagement-router isn't in the loop. Either (a) make logging a Framework Run a mandatory first step inside `client-engagement-kit` and `project-agent` skills — so runs get logged as a side effect of work that already happens — or (b) archive the DB and delete the Phase 2 wiring until there's engagement volume to justify it. Empty scaffolding costs attention every time an agent loads CLAUDE.md.

**A4. Drain the Streaming Notes purgatory with a batch policy, not heroics.** 730 open items will never be dispositioned one-by-one. Adopt aging rules the processor can execute autonomously: Pulse/Thread/Daily-State logs older than 30 days → auto-Complete (they're journal entries, not tasks); Notes/To-Dos older than 60 days with no Next Action → batch-surface in ONE weekly approval list (`approve drain 1,4,7-22`) via the existing daily-decision-queue. Target: open count under 100, then hold it there with the existing SLA processor.

**A5. Configure or delete `context_vault_db`.** It has been `NEEDS_CONFIGURATION` since the registry was written and a portal API route depends on it. Either create the DB and set `NOTION_CONTEXT_VAULT_DB_ID` in Vercel, or remove the research-feed dependency. Fail-closed placeholders that never resolve are silent breakage.

**A6. Add a freshness tripwire.** Extend Hygiene Heidi with a Rule 7-style check: `MAX(createdTime)` on Companies, Research Library, and Client Projects must be < 21 days old while any engagement is active; otherwise Amber. The April flatline went unnoticed for 11 weeks because nothing was watching the watchers' outputs.

### B. Google Drive — give it exactly one job

**B1. Assign Drive its role: the client file-exchange layer.** Everything mception produces or receives that a *client* touches as a file (PDF deliverables, their P&L uploads, signed docs) lives in Drive. Everything else (source, HTML viewers, internal notes) stays in repo/Notion where it already lives. Write this into CLAUDE.md so agents stop improvising.

**B2. Canonical tree, registered and related.** Under the existing `Consulting (mception)` folder:

```
Consulting (mception)/
  <client-slug>/            # matches Companies DB Slug field
    deliverables/           # what we send
    inbound/                # what they send us
    working/                # drafts, scratch
```

Record each client folder ID in `infrastructure-registry.yml` (as done for PauletteAI) **and** add a `Drive Folder` URL property on the Companies DB so agents resolve it relationally instead of searching.

**B3. Auto-file deliverables.** Add a terminal "file to Drive" step to the skills that already produce client PDFs — `presentation-engine`, `exec-intel-brief`, `deck-generator`, `client-pnl-dd` (memo only; confidential inputs stay in `~/brady-os-local`). The deliverable lands in `<client-slug>/deliverables/` with a dated filename and the share link is written to the Routing Log. This is the single change that makes Drive *powerful* rather than a graveyard: every client artifact becomes findable and shareable the moment it exists.

**B4. Consolidate the four duplicate `mception-ai` folders.** Pick one survivor (or fold contents into `Consulting (mception)/_site-assets/`), trash the rest. **Approval-gated — destructive:** `approve claudine drive-dedupe`.

**B5. Point the LinkedIn artifacts somewhere useful.** The network-analysis one-pager in `Consulting (mception)` is prospect-research input; register it (or its successor) in the Research Library rather than leaving it orphaned in Drive.

### C. Cross-cutting — one weekly integrity loop

**C1. Sync-integrity check (extend Hygiene Heidi or config-sync):** for every client-facing slug in `projects.yml`, assert the chain **slug ↔ Client Projects row ↔ Companies row ↔ Drive folder** exists; report red/amber/green with paste-ready fixes. Each link in that chain is now mechanically checkable because of A1/B2.

**C2. Verify the schedules actually fire.** Before building anything new, confirm the streaming-notes-processor, Musashi nightly, and Heidi Saturday runs are actually executing on their harnesses (connector-registry `last_verified` for CoWork is still `never`). If the loops aren't firing, every recommendation above rots the same way the last batch did.

---

## 4. Suggested sequencing

| Order | Item | Effort | Gate |
|---|---|---|---|
| 1 | C2 — verify schedules fire | 30 min | none |
| 2 | A2 — reconcile Client Projects + Companies rows | 30 min | none |
| 3 | A1 — portal→Notion sync in Musashi nightly | small build | `approve` |
| 4 | B2 — Drive tree + Companies `Drive Folder` property | 1 hr | none |
| 5 | B3 — auto-file deliverables step in 4 skills | small build | `approve` |
| 6 | A4 — purgatory drain policy + first batch | 1 session | batch `approve` |
| 7 | B4 — Drive dedupe | 15 min | **approve (destructive)** |
| 8 | A3, A5, A6, C1 — wire-or-shelve + tripwires | small builds | `approve` |

Items 1–2 are pure hygiene and can happen in the next working session. Items 3 and 5 are the two automation builds that change the trajectory — everything else is cleanup that stays clean only if those two exist.
