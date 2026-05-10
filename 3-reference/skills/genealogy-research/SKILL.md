---
name: genealogy-research
description: >
  Brady's canonical genealogical research engine. Takes one ancestral branch (surname,
  geography, or named ancestor), runs the same parallel-stream research process used for
  the Clark/Monacan project, and produces a sourced whitepaper plus a durable archive
  of numbered research files, primary-source extracts, DNA analysis, and an action surface
  (archive visits, FOIA, DNA tests, ILL).

  TRIGGER whenever Brady says: "research my [branch] line", "genealogy on [surname]",
  "dig into the [branch] family", "where did [ancestor] come from", "run a heritage project
  on [branch]", "build me a Monacan-style whitepaper for [line]", "follow the Clark process
  for [branch]", or any variation requesting deep ancestral / heritage / family-history
  research with primary sources.

  Scope is one branch per run. Parallel branches require separate runs.
trust_tier: T0
---

# Genealogy Research

Reusable engine codifying the process Brady and Claudine ran on the Clark/Monacan branch
(May 2026). Same phase pattern, same numbered-file structure, same parallel-agent
execution, same deliverable shape — applied to any other ancestral line.

If Brady has named a project agent (e.g. **Genie**), Genie owns ongoing maintenance of
the project folder after Phase 5; this skill just gets it built.

---

## When to Use

- One ancestral branch is the target (surname + geography, or a single named ancestor)
- Goal is a sourced whitepaper for family circulation, not just a quick fact lookup
- Brady is willing to commit to an action surface afterward (archive trips, DNA tests,
  ILL, FOIA) — this is the whole point; don't run if it's just curiosity

If Brady wants a quick lookup, use `deep-research` instead. If Brady wants a single-source
fact, just answer in chat.

---

## Required Inputs (Phase 0 — one ask)

Before any research starts, get these in **one** message. Don't iterate.

| Input | Example | Notes |
|-------|---------|-------|
| Branch label | `Clark / Monacan`, `Smallwood`, `Shrack`, `Williams` | Becomes folder name + slug |
| Geographic anchor | Rockbridge County VA / Buena Vista | Where the line concentrates |
| Anchor ancestor | Joseph Anderson Clark (b. 1869) | The person every chain traces back through |
| Folklore claims | "Cherokee", "from Ireland 1840s", "Mormon 1911" | Hypotheses to verify or kill |
| Available raw artifacts | DNA file path, GEDCOM, family papers, letters | Anything Brady already has on disk |
| Religious / cultural overlay | LDS conversion 1911, Catholic Sicilian | If any |
| Public-policy overlay | Plecker / Racial Integrity Act / Indian Removal | If any |
| Live-tribe / community angle? | Monacan enrollment, Clan MacGregor society | If applicable |

If Brady can't fill one in, say so explicitly and proceed — don't keep asking.

---

## Folder Skeleton

```
1-execution/areas/work-and-business/programs/Personal Projects/Project - {Branch} Heritage/
├── PROJECT.md                  # Goal, sources, outputs, action surface, activity log
├── research/
│   ├── source/                 # Raw artifacts (DNA file, GEDCOM, family papers, scans)
│   ├── 00-master-sources.md    # What we have, what we can pull free, what costs $
│   ├── 01-history-and-current.md
│   ├── 02-political-legal-context.md   # Plecker-equivalent — laws/erasures shaping the line
│   ├── 03-religious-cultural-context.md
│   ├── 04-leadership-or-current-power.md
│   ├── 05-family-identity.md   # Folklore vs. documented record reconciliation
│   ├── 06-dna-analysis.md
│   ├── 07-sources-and-original-rolls.md
│   ├── 08-primary-source-extracts.md   # Verbatim from court files, census, marriage
│   ├── 09-census-extracts.md
│   ├── 10-NN-correction.md     # Append corrections, never rewrite — track lineage drift
│   ├── 11-gedcom-corrected-line.md
│   ├── 12-NN-finding.md        # New primary-source finds (e.g. mulatto 1860 census)
│   ├── 13-persons-of-interest.md   # Modern: genealogist contacts, archivists, family historians
│   ├── 14-institutional-connections.md   # Universities, museums, foundations, tribal orgs
│   └── 15-NN-dictionary.md     # Optional: surname/place/language reference
└── deliverables/
    ├── {branch}-heritage-whitepaper.md
    ├── {branch}-heritage-whitepaper.html   # via mception design system
    ├── {branch}-heritage-whitepaper.pdf
    └── {sub-topic}-deep-dive.md            # As needed (e.g. atha-sorrells-1924-whitepaper.md)
```

Numbered files are append-only. New finds get a new number. Never overwrite a research file
to fix a fact — write a `correction` file that explicitly cites the prior file and the new
evidence. The Monacan run had three: `10-frances-mason-correction.md`,
`11-gedcom-corrected-paternal-line.md`, `12-nelson-harrison-clark-mulatto-1860.md`.

---

## Phase 1 — Master Sources File (sequential; foundation for parallel agents)

Build `research/00-master-sources.md` first. This is the corpus map every downstream agent
reads. Sections:

1. **What Brady already has** — file paths, page counts, key claims (one line each)
2. **Free public sources** — FamilySearch (with ARK pattern), Library of Congress, state
   archives, Find-a-Grave, Internet Archive, BHR-equivalent academic projects, joepayne.org
   for Monacan, Cyndi's List for general
3. **Paid / subscription** — Ancestry, Newspapers.com, FTDNA upgrades, AncestryDNA matches
4. **Travel / ILL / FOIA** — Library of Virginia (or state equivalent), county courthouses,
   regional historical societies, ILL targets (specific books)
5. **People** — known living family historians, genealogy assistance Facebook groups,
   tribal/community offices, cultural foundations
6. **Hypotheses to verify** — list every folklore claim from Phase 0 inputs as a yes/no/
   partial question to be resolved in later phases

This file is the only sequential step. Once it exists, fan out.

---

## Phase 2 — Parallel Research Streams (the big lift)

Spawn **5–8 agents in parallel**, each owning one numbered file. The Monacan run did 5
on 2026-05-06 closing 16 specific gaps in one pass — that's the bar.

Standard agent assignments:

| Agent | File | Mandate |
|-------|------|---------|
| Historian | `01-history-and-current.md` | Tribe / community / region history. Pre-1700 → present. |
| Erasure specialist | `02-political-legal-context.md` | Plecker, Racial Integrity Act, Indian Removal, Trail of Tears, Highland Clearances, etc. — whatever applies. Find the "hit list" or equivalent. |
| Religious / cultural | `03-religious-cultural-context.md` | LDS / Catholic / Quaker / Anglican conversion arcs and what they bought / cost the family |
| Power-mapper | `04-leadership-or-current-power.md` | Modern leadership, governance, lawsuits, federal funding if applicable |
| Identity reconciler | `05-family-identity.md` | Folklore vs. record. Where folklore is wrong but partly true. Where the category was a defensive relabel. |
| DNA analyst | `06-dna-analysis.md` | Y-DNA, mtDNA, autosomal interpretation. Always check whether the DNA contradicts the folklore — surface contradictions early. Recommend specific next tests with $ cost. |
| Source archivist | `07-sources-and-original-rolls.md` | Where canonical compiled lists live, accession numbers, who controls access |
| Primary-source extractor | `08-primary-source-extracts.md` | Verbatim text from court files, census, marriage licenses, wills, deeds. Cite ARK / accession every time. |
| Census reader | `09-census-extracts.md` | Line-by-line census records, especially race-classification anomalies (e.g. Nelson Harrison Clark's 1860 "mulatto" entry that overturned the whole thesis) |

Each agent gets the same brief shape:
- Read `00-master-sources.md` for context
- Own the numbered file end-to-end
- Cite primary sources (FamilySearch ARK, LVA accession, archive.org URL, joepayne.org
  permalink) for every factual claim
- Flag contradictions with folklore explicitly
- Surface the highest-leverage next-step question at the bottom of the file

**Run all of these in a single tool-call message** so they execute concurrently.

---

## Phase 3 — Iteration / Corrections

Read all Phase 2 outputs. Look for:

- **Contradictions between files** (e.g., DNA says Western European, folklore says Native)
- **GEDCOM errors** (wrong parent, wrong wife — Monacan run found Frances Mason was step-3rd-great-grandmother)
- **Erasure vectors** (a name newly classified "mulatto" or "colored" in one census but "white" the next)
- **The unexpected primary-source hit** that overturns the prior thesis

For each, write a numbered correction or finding file (`10-NN-correction.md`,
`11-gedcom-corrected-line.md`, `12-NN-finding.md`). **Append, don't rewrite.** The audit trail
is the point.

Optionally spawn a second wave of 2–3 parallel agents to close gaps surfaced by Phase 2
(e.g. "resolve who the mother of [X] really was", "find the marriage record for [Y]+[Z]
in [year]"). The Monacan run did this for Edith Wane's parents on 2026-05-07.

---

## Phase 4 — Persons of Interest

Write `research/13-persons-of-interest.md`. For each living/recent person:

- Name, role, why they matter
- How to reach them (Facebook group, tribal office, university affiliation, professional org)
- What they likely know that we don't
- What we'd ask them in 5 minutes

Also `research/14-institutional-connections.md` if applicable — universities, museums,
foundations, tribal organizations with named-individual ties.

---

## Phase 5 — Whitepaper Synthesis (HARD GATE — pause for Brady)

Draft `deliverables/{branch}-heritage-whitepaper.md`. Style:

- Direct, operator voice (Brady's voice). No academic hedging. No inspirational poster energy.
- Lead with the headline finding, not the methodology
- Source-rated: every non-trivial claim cites a primary source by accession / ARK / URL
- Distinguish folklore from record explicitly — never let folklore stand uncited
- Include a "What was wrong about what we thought" section
- Include a "What we still don't know" section with action paths
- Family-circulation-ready (kid-readable, not gatekept)

**Stop and show Brady the draft before rendering HTML/PDF.** Whitepapers are deliverables;
deliverables get reviewed.

After approval: render via `mception-design-system` skill → HTML (dark mode) and PDF.
Output goes in `deliverables/`, never `.context/` or `/tmp/` (per global rule).

---

## Phase 6 — Action Surface

Final step. Write the numbered to-do list at the bottom of `PROJECT.md` under
`## Next actions`. Examples from Monacan run:

- Library of Virginia trip with specific accession numbers
- FOIA Treasury OIG / equivalent agency for unredacted memos
- ILL specific books (Donna Huffer, D.E. Brady Jr.)
- mtFull Sequence DNA test ($159 at FTDNA, or equivalent paternal Big-Y)
- Email tribal enrollment / community office with documented line
- Visit specific living person, attend specific event (Bear Mountain Powwow third weekend
  in May for Monacan)

Every action gets:
- Estimated cost / time
- What it would close (which Phase 1 hypothesis it resolves)
- Owner (Brady or an agent like Genie)

Write the top 3 to **Streaming Notes** as Type=To Do per the global rule. Don't leave them
chat-only.

---

## Memory Hooks

After whitepaper approval, write **one** memory entry:
- Type: `project`
- Name: `{Branch} heritage research project`
- Body: Headline facts (numbered list), why it matters, how to apply, key new primary sources

Keep it tight. The full evidence stack lives in the project folder, not in memory. Memory
is the index, not the corpus.

---

## What This Skill Does NOT Do

- **Quick lookups** — use `deep-research` (one or two web searches)
- **Living-person dossiers for business** — use `prospect-research-kit`
- **Real-time DNA match outreach** — Genie's job, not the skill's
- **Multi-branch sweeps** — one branch per run. Parallel branches = parallel runs.

---

## Conventions Encoded From the Monacan Run

These were learned the hard way; they're now defaults:

1. **Folklore is a hypothesis, not a fact.** "Cherokee" turned into "Monacan" once the
   record was read carefully. Always test the category itself, not just the specifics.
2. **DNA contradictions surface in Phase 2, not later.** If Y-DNA is Western European and
   the folklore is Native, the Native ancestry has to enter through a maternal line —
   say so on day one.
3. **Census race classifications are gold.** A single "mulatto" or "free colored" in 1860
   can overturn an entire thesis (Nelson Harrison Clark, 1860 Amherst).
4. **Erasure-era hit lists are real.** Plecker's 1943 surname list. Indian Removal rolls.
   Always check whether your branch is on a documented erasure list.
5. **Religious conversion often encodes identity.** The LDS Lamanite doctrine wasn't
   incidental to Joseph Anderson Clark's 1911 conversion — it was the whole point.
6. **The "Original Rolls" are usually private.** Monacan's were compiled by the tribe
   1980s–90s and never publicly released. Plan for this. Genealogy assistance Facebook
   groups are the entry point, not the website.
7. **Track step-relations vs. biological.** Multiple wives, multiple lines. The Monacan
   run had to correct Frances Mason → Edith Ware. Document every wife / parent in the
   correction file.
8. **Append, never rewrite.** The audit trail of how the picture changed is part of the
   deliverable.
9. **Don't skip the folk-song / oral-tradition layer.** Old Joe Clark almost certainly
   encodes Joseph Clark Jr. and Betsy "Brown" — that's a real evidence node.
10. **Run agents in parallel without prodding.** The whole engine assumes Phase 2 fans
    out in one tool-call message. If it's sequential, the skill is being run wrong.
11. **FamilySearch screenshots are a hypothesis, not a fact.** The relationship-calculator
    label "9th great-grandfather" can mean either lineal direct ancestor OR shared-ancestor
    cousin. Always run "View Relationship" on each candidate ancestor and capture the full
    descent path before treating any FamilySearch profile as direct ancestry. The
    genealogy-research skill must verify the descent chain end-to-end, not infer from a
    single relationship label. Codified after the 2026-05-08 *Virginia Deans and Donahoes*
    correction where six of eight "FFV ancestors" turned out to be either cousins or
    paternal-side ancestors with zero relationship to the project's anchor descendant.

12. **Version markers as soft redline.** Whitepapers iterate (v1 → v2 → v3 …). When publishing
    a new version, mark substantial new findings or corrections with a soft blue inline span
    so the reader can see at a glance what changed without the visual aggression of a full
    redline. The convention:
    - HTML span class: `<span class="new-v2">…</span>` (or `new-v3`, `new-v4` etc.)
    - CSS color: `#1a4d7a` (matches the document's existing link blue — reads "of-a-piece"
      with the document, not as an alarm)
    - Apply only to **load-bearing additions or corrections** — generational extensions, new
      direct ancestors, retracted claims, primary-source pulls that change the picture. Not
      every word change; not every reformulation. Aim for 10–20 spans across a 12,000–15,000
      word v2.
    - The v1 baseline is unmarked. Only deltas-from-prior-version get the blue.
    - Spans nest correctly inside markdown tables and bold/italic.
    - The CSS lives in the rendering CSS file alongside the rest of the whitepaper styling
      (e.g. `donahoe_whitepaper_css.css`).
    - Codified after the 2026-05-09 v2 *Virginia Deans and Donahoes* render where Brady asked
      for "blue font for New in V2 text — not every single little change, but the substantial
      ones, sort of like a redline but less in your face."

13. **Companion changes document for every versioned whitepaper.** Every new version of a
    whitepaper (v2, v3, …) ships with a standalone "what changed" companion document that a
    reader who already read the prior version can scan in five minutes without re-reading the
    full whitepaper. Conventions:
    - Filename: `{branch}-heritage-whitepaper-v{N}-changes.md` (rendered to `.html` and
      `.pdf` via the same pipeline as the whitepaper itself)
    - Sections: (a) **Resolved or substantially extended** — what v{N} added; (b)
      **Corrected** — what v{N-1} got wrong and v{N} fixed; (c) **Carried forward unchanged**
      — for completeness; (d) **Still open at v{N}** — the v{N+1} carry list with explicit
      paths to closure; (e) a short methodological note if a discipline lesson emerged.
    - Each "resolved" or "corrected" item names the underlying research file by number so a
      curious reader can drill into the primary sources.
    - Length target: ~2,000–4,000 words. Tight, scannable, no redundant prose.
    - Same neutral archival voice as the parent whitepaper.
    - The whitepaper itself also retains an in-document changelog as a final section, but
      the standalone document is the canonical "executive summary of changes" deliverable
      and the format used when sharing v{N} with someone who already has v{N-1}.
    - Codified after the 2026-05-09 v2 *Virginia Deans and Donahoes* publication where Brady
      asked for "a document that explains just the changes too."
12. **Fraud-flag cross-check is mandatory before treating any FamilySearch profile as
    ancestry — especially named-Native or otherwise high-romance ancestors.** FamilySearch
    carries documented fraudulent entries. The canonical case is the *Shawnee Heritage*
    book series (Don Greene & Noel Swartz), whose fictitious "Native ancestors" appear with
    Custom Facts on the FamilySearch profile reading "FRAUDULENT, FICTIONAL ENTRY —
    FRAUDULENT, ENTRY NEEDS TO BE REMOVED." Before adding any such ancestor to a research
    file, check: (a) the FamilySearch profile's Custom Facts and Memories tabs for fraud
    notes; (b) the Cherokee Nation's published fraud list; (c) the Patawomeck tribal
    historian Bill Deyo's debunkings; (d) the *Shawnee Heritage* fraud denouncement list
    maintained by professional genealogists, Wikitree, and Geni. Codified after 2026-05-08
    *Virginia Deans and Donahoes* Phase 2.8 retracted six fraudulent "Native ancestor" FSIDs
    (Sharp As Fox John Spiller, Dancing Waters Moon Spiller, Delaware Indian Fivekiller,
    Water, Solomon John "Rappahanno…" Kimbrough, Mary Elizabeth Spiller). Pair this
    convention with #11 — relationship-walk + fraud-flag check are a single hard gate.

---

## First-Run Checklist for Brady

When Brady invokes this skill on a new branch:

- [ ] Phase 0 inputs gathered in ONE message (no iterative prodding)
- [ ] Project folder scaffolded under `1-execution/areas/work-and-business/programs/Personal Projects/Project - {Branch} Heritage/`
- [ ] `PROJECT.md` drafted (goal, sources list, empty action surface)
- [ ] `00-master-sources.md` written (sequential)
- [ ] Phase 2 agents spawned **in one parallel batch**
- [ ] Corrections file(s) written for any thesis-overturning findings
- [ ] Whitepaper draft shown to Brady **before** HTML/PDF render
- [ ] Final HTML + PDF in `deliverables/`, not `.context/`
- [ ] Top 3 next actions written to Streaming Notes (To Do type)
- [ ] Memory entry written
- [ ] If Genie exists: hand the project folder to Genie for ongoing maintenance
