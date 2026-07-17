# Repo Cleanup & Innovation Ideas — 2026-07-16

Full-repo audit run on branch `claude/repo-cleanup-ideas-j9q12h`. Working tree is **1.3GB** (474MB of that is git history), 4,380 files, 79 commits. Roughly **550MB+ is recoverable** without losing anything that matters, and several structural fixes would prevent the bloat from coming back.

Each item is tagged with what it saves, the risk level, and whether an agent can execute it autonomously or it needs Brady's approval first.

---

## Part 1 — Cleanup (ordered by impact)

### C1. Move `mothers-day-2026/` out of the repo — 163MB, policy violation

`1-execution/areas/family/mothers-day-2026/` holds kids' photos, hand-written letters, and two giant keepsake PDFs (76MB + 61MB). `areas/family/LOCAL-RECORDS-POINTER.md` and the kids-test-results skill both say sensitive family/kid records live at `~/brady-os-local/family/`, **never in git** — this folder predates or slipped past that rule. It's also the single largest thing in the repo.

**Action:** move the whole folder to `~/brady-os-local/family/mothers-day-2026/`, leave a pointer md in its place (same pattern as LOCAL-RECORDS-POINTER.md). Needs approval (touches family keepsakes; the move must happen on Brady's machine where brady-os-local lives — Dispatch/remote sessions can only do the repo-side delete + pointer).

### C2. Delete generated innovation-workshop outputs — 176MB + 66MB

- `3-reference/skills/innovation-workshop/output/` is **176MB** of per-run artifacts (6 PDFs ≈ 81MB, 124 PNGs across 7 image dirs, dated 2026-04-15 → 04-29). This is 94% of the entire skills tree. It's build output, not reference material — the SKILL.md and references/ are only ~1.6MB.
- Root-level `output/` is another **66MB** of the same kind (one 33.7MB PDF + workshop images), untouched since 2026-04-27.

**Action:** archive anything worth keeping to Drive or `~/brady-os-local`, delete the rest, add `3-reference/skills/*/output/` and `/output/` to `.gitignore` (keep `.gitkeep` placeholders). The presentation-engine and ops-innovation-engine output dirs already follow the .gitkeep pattern — innovation-workshop is the outlier. Approval recommended (deletions), but low risk: every artifact is regenerable by re-running the skill, and the client-facing copies live in `portal/public/`.

### C3. De-duplicate the 1915 South portal assets — ~130MB

`portal/public/` carries four audience variants (`1915-south`, `-execs`, `-cfo`, `-ma`) and three of them are byte-identical copies of the master's heavy assets:

- The 22.9MB `innovation-workshop-1915-south-2026-04-22.pdf` exists **4×** (69MB wasted)
- The 10-image hero PNG set (~40MB) exists **3×** in portal plus once in the 1915 South project folder (~90MB wasted)

**Action:** create one `portal/public/1915-south-shared/` assets dir, point all four variants' viewers/links at it, delete the copies. Audience trimming stays in the HTML/markdown layer, not the asset layer. Needs a quick UAT pass on the four live slugs after (Musashi deploy-mode territory). This is the highest-value *structural* fix because presentation-engine will otherwise keep stamping out full copies for every new audience variant.

### C4. Git history rewrite — shrinks clone from ~1.3GB to likely <150MB

The 472MB pack is dominated by the exact files above (the two Mother's Day PDFs alone are 131MB). Deleting them from the working tree still leaves every clone dragging the history. With only 79 commits and 2 remote branches, a `git filter-repo` pass stripping blobs >5MB that no longer exist at HEAD is cheap and safe **if coordinated**.

**Action:** do C1–C3 first, then rewrite. Hard requirement: coordinate via `dispatch-git-protocol` — Conductor, Dispatch, and any Claude Code checkouts must re-clone after. Needs explicit approval; do not run autonomously.

### C5. Confidentiality pass on 1915 South in-repo financials

`client-pnl-dd/SKILL.md` says client financials live at `~/brady-os-local/{client}-confidential/`, and the 1915 South corpus files already point some dossiers there — but these are still in-repo: `synthesis/financial-dd-findings-2026-05-13.md`, `research/sfdr-018-justin-financials-validation.md`, comp-benchmark SFDRs (012, 014), `justin-corpus.md`, `leah-corpus.md`, `team-corpus-1915-south.md`, and `transcripts/`. Similarly, `financial-assistant/references/insurance-docs/` holds 7.9MB of Aflac/TriNet enrollment PDFs — personal benefits docs in a repo that also gets packaged for clients (`REBUILD-BRADY-OS.md` is explicitly client-facing).

**Action:** Fran (or client-pnl-dd) reviews each file against the confidentiality rule; move what fails to brady-os-local with pointers; keep extracted-text summaries in repo where agents need them. Needs approval — judgment calls on what's "client-confidential" vs "working notes."

### C6. Retire the rendered-artifact triplets

Across 1915 South, Panda, Monacan Heritage, Walmart, Kroger: the same deliverable exists as `.md` + `.pdf` + `.html` + often `-light.html` side by side (7 pure alternate-theme `-light.html` re-renders confirmed). The md is the source; renders are reproducible via deck-generator/presentation-engine.

**Action:** keep `.md` + at most one render per deliverable in project folders (client-facing renders already live in `portal/public/`). Delete the rest, note the regeneration command in each project README. Low risk, needs approval only because it's deleting deliverables.

### C7. Small hygiene items (safe to do now — first two are in this PR)

1. **`.next/` build traces untracked + gitignored** ✅ done in this PR. Root `.next/trace*` were committed build artifacts.
2. **AGENTS.md allowlist drift fixed** ✅ done in this PR. It still pointed the fail-closed publishing check at `3-reference/publishing/mception-ai-projects.yml`, which has been a pointer-only file since the allowlist moved to `portal/src/config/projects.yml`. CLAUDE.md had the new path; AGENTS.md didn't.
3. **`3-reference/branch-archive.md`** — its only block says "delete after 2026-05-07"; the 13 branches are confirmed pruned from the remote. Clear the block (leave the SOP header).
4. **Stray root dirs** — `os-cockpit/`, `os-viewer/`, `references/learning-log.yml`, `docs/` are all tracked, functional, but undocumented in CLAUDE.md's structure section (all last touched 2026-04-27). Either document them or move them under `3-reference/` / `portal/`. `references/` at root is especially confusing next to the real `3-reference/`.
5. **Dead backup dirs signal dead automations** — `commissioner-briefs/` (empty), `project-agent-standups/` (one file, 2026-04-23), `musashi-reviews/` (idle since 2026-04-24), `processing-scores/` (one month), vs. `phil-morning-audits/` (34 files, daily, healthy). The skills that claim these gitted backups either aren't running or aren't writing. Worth a Heidi flag: the fix is either restart the automation or delete the promise from the SKILL.md.
6. **`3-reference/public-pack.zip`** — a zip tracked next to its unzipped `public-pack/` twin. Delete the zip; regenerate at packaging time.

---

## Part 2 — Innovation ideas (things an agent can build/run autonomously)

### I1. Repo Janitor — Hygiene Heidi Rule 7

The single best defense against re-bloat. Add a seventh canonical rule to Heidi's Saturday run: **repo hygiene**. Objective checks, all scriptable:

- No tracked file >5MB outside an allowlist (`portal/public/**` client deliverables)
- No new byte-identical duplicate groups (md5 sweep — today's run found 345 groups / 145MB)
- No tracked build artifacts (`.next/`, `output/`, `*/output/*.pdf`, `*.zip`)
- No files under `areas/family/` matching photo/PDF patterns (policy gate from C1)
- Repo size trend line (fail amber if +10% week-over-week)

Output goes into Heidi's existing red/amber/green brief with `approve heidi [slug]` gates. This turns everything in Part 1 from a one-time cleanup into a standing invariant.

### I2. Pre-push size & sensitivity gate

A 20-line git pre-push hook (or GitHub Action on push): block any commit adding a file >5MB or touching `areas/family/**` binary files, with a bypass env var for intentional adds. Cheaper than Heidi's weekly cadence — catches the 72MB keepsake PDF *before* it enters history instead of after (where only a filter-repo can remove it). Pairs with C4: without this gate, the history rewrite buys maybe two months.

### I3. Auto-generated Skills Registry

CLAUDE.md is 33KB and loaded into every session's context; over half of it is the hand-maintained Skills Registry. Today's audit found it perfectly in sync (rare!), but that's 60 entries of manual upkeep. Build a small script that generates the registry from SKILL.md frontmatter (`name`, `description`, `trigger`) into `3-reference/skills-index.md`, run by Heidi weekly, with CLAUDE.md keeping only a one-line pointer + the ~15 truly load-bearing entries. Cuts per-session context cost and eliminates the registry-drift failure class permanently.

### I4. Render-on-demand policy + manifest

Formalize what C6 implies: **markdown is canon, renders are cache.** Each project gets a `renders.yml` (deliverable → template → output target), and deck-generator/presentation-engine write renders only to `portal/public/` or `~/brady-os-local`, never next to the source md. "Rebuild the Panda whitepaper PDF" becomes one command instead of a stale 12MB binary in git.

### I5. Shared portal asset layer for audience variants

Generalize C3 into a presentation-engine feature: a client's heavy assets live once under `portal/public/{client}-shared/`, and audience variants (`-execs`, `-cfo`, `-ma`) are config entries in `projects.yml` + thin HTML that reference the shared dir. New audience variant = ~50KB of HTML, not 43MB of copies. This is the difference between the portal scaling to 10 clients or not.

### I6. Repo-metrics tile for admin-status + Claudine Scorecard

Add a "Repo Hygiene Index" to the admin-status snapshot and as a K17 metric on the Claudine Scorecard: composite of repo size, largest-file count over threshold, duplicate-group count, and tracked-artifact count. Every number already falls out of the I1 script. Makes hygiene visible daily instead of discoverable quarterly.

### I7. Monthly rollup for phil-morning-audits

The one healthy backup dir will hit ~365 files/year. After 30 days, squash dailies into a monthly rollup md (same pattern processing-scores already uses). Keeps the audit trail greppable without the file sprawl. Trivial to bolt onto Phil's existing run.

---

## Suggested sequencing

| Step | Items | Recoups | Gate |
|---|---|---|---|
| This PR | C7.1, C7.2, this document | — | review & merge |
| Next (one approval batch) | C2, C7.3, C7.6 | ~245MB tree | `approve` — regenerable artifacts only |
| Then | C1, C5, C6 | ~180MB tree | Brady judgment on family/client files |
| Then | C3 + I5 together | ~130MB tree | UAT on 4 live slugs |
| Last | C4 (history rewrite) | ~400MB of .git | explicit go + re-clone coordination |
| Standing | I1, I2, I3, I6, I7 | prevents recurrence | build via build-queue SPECs |

Net: a ~1.3GB repo becomes a ~120–200MB repo that stays that size.
