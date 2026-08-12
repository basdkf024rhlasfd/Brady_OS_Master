---
name: kids-test-results-onepager
trust_tier: T2
description: >
  Print-ready, age-appropriate 1-pager per kid based on standardized test results
  (ATLAS, NWEA MAP, etc.). Specific praise grounded in actual scores, a calibrated
  reading list by Lexile band, workbook recommendations, and a kid-specific closing
  line. Real outputs land in ~/brady-os-local/family/kids/ — never the repo.

  TRIGGER whenever Brady says: "make a 1-pager for the kids' [test] results", "summer
  plan one-pager", "kid-friendly test results", "MAP results one-pager", or any
  variation asking for a per-kid write-up of standardized test scores.
---

# Kids Test Results 1-Pager

Generate age-appropriate, print-ready 1-pagers for the Smallwood kids based on standardized test results. One page per kid, written *to* them, with specific praise grounded in their actual data plus a calibrated summer (or off-season) reading + workbook plan.

## When to invoke

Triggers:
- "make a 1-pager for the kids' [test name] results"
- "summer plan one-pager"
- "kid-friendly version of the test analysis"
- After running ATLAS / NWEA MAP / ITBS / any standardized academic assessment for one or more of the kids
- Pairs naturally with running the cross-kid analysis doc — analysis is for Brady, the 1-pager is for the kid

Inaugural run: 2026-05-08, Spring 2026 ATLAS Summative for the triplets (Isla, Luke, Quinn). File: `~/brady-os-local/family/kids/triplets-summer-2026-onepager.html`.

## Inputs needed

For each kid, gather before drafting:

1. **Identity** — Name, grade, school, test period
2. **Top-line scores** — for each subject (typically ELA, Math, Science): performance level (1-4 or equivalent) + scale score
3. **National percentile context** — Lexile (reading) and Quantile (math) measures from ATLAS PDFs, or equivalent from other tests. See "Computing percentiles" below.
4. **Year progression** — Fall → Winter → Spring scale scores so the "story" can be a story, not a snapshot
5. **Sub-domain breakdowns** — which sub-areas are Above Mastery, At/Near Mastery, or Below Mastery
6. **Essay scores** (if applicable) — raw score + breakdown by Conventions, Elaboration, Purpose
7. **One narrative arc per kid** — the headline story (biggest growth area, or steady-strength story, or comeback story)
8. **One thing to keep working on** — based on weakest sub-domain or lowest essay dimension

If pulling from ATLAS specifically, see `3-reference/skills/kids-test-results-onepager/references/atlas-data-extraction.md` (or just consult the live portal at `ar-familyportal.cambiumast.com` + per-kid PDFs).

## Computing percentiles (when input data only has scale scores + AR averages)

ATLAS state reports do **not** include national percentile rank. Compute these from the Lexile/Quantile measures, which are norm-referenced.

**End-of-3rd-grade Lexile percentiles (national, from MetaMetrics):**

| Percentile | Lexile |
|---|---|
| 50th | ~625L |
| 75th | ~810L |
| 90th | ~970L |
| 95th | ~1050L |
| 99th | ~1175L |

**End-of-3rd-grade Quantile percentiles (national):**

| Percentile | Quantile |
|---|---|
| 50th | ~700Q |
| 75th | ~880Q |
| 90th | ~1010Q |
| 95th | ~1080Q |

Update these tables for older grades when needed (search "Lexile percentile chart by grade" or refer to MetaMetrics directly).

For the **Arkansas state percentile** approximation: ATLAS Level 4 = roughly top 15-20% of state Grade 3 students (based on AR proficiency-rate distributions). Hold this estimate to ±5 percentile points.

## Calibrating the book list to Lexile

The book list is the centerpiece of the 1-pager. **Calibrate it to the kid's actual Lexile**, not their grade level. For a kid reading 200+L above grade, hand them 5th-6th grade material; for a kid reading at grade level, hand them solid 3rd-4th-grade engagement reads.

**Suggested Lexile bands and book lists (use as starting point; swap in seasonal/topical replacements):**

### 800-900L band (~75-85th percentile reader)
- *Diary of a Wimpy Kid* — Jeff Kinney (~950L)
- *Magic Tree House: Merlin Missions* — Mary Pope Osborne (~700L)
- *Geronimo Stilton* (~670L)
- *Stuart Little* — E.B. White (920L)
- *Mr. Popper's Penguins* — Atwater (910L)
- *The Lemonade War* — Jacqueline Davies (630L)
- *Ranger's Apprentice Book 1* — John Flanagan (920L)
- *Who Was?* biography series (700-900L)

### 1000-1100L band (~90-95th percentile reader)
- *The Phantom Tollbooth* — Norton Juster (1000L)
- *Hatchet* — Gary Paulsen (1020L)
- *A Wrinkle in Time* — L'Engle (740L, conceptually advanced)
- *Harry Potter and the Sorcerer's Stone* — Rowling (880L)
- *The Lion, the Witch &amp; the Wardrobe* — Lewis (940L)
- *The Mysterious Benedict Society* — T.L. Stewart (890L)
- *The One and Only Ivan* — Applegate (570L, emotionally rich)
- *Wonder* — R.J. Palacio (790L)
- *The Westing Game* — Raskin (750L)
- *From the Mixed-Up Files of Mrs. Basil E. Frankweiler* — Konigsburg (700L)
- *Tuck Everlasting* — Babbitt (770L)

Aim for **8 titles per kid** so they pick at least 5. Include at least one non-fiction option if the kid has a Reading Informational Text weakness.

## Workbook recommendations

Always two columns:
1. **Push ahead / strength acceleration** — calibrated to where the kid is, not where the grade is
2. **Targeted to weakness** — the specific At/Near Mastery sub-domain or essay-dimension flag

**Math acceleration (advanced):** Beast Academy 4 (or appropriate grade), Singapore Math Challenging Word Problems, Khan Academy.

**Math at-grade reinforcement:** Spectrum Math, Daily Word Problems (Evan-Moor).

**Writing (informative essay weakness):** Spectrum Writing, Skill Sharpeners: Writing (Evan-Moor), Daily Paragraph Editing (Evan-Moor).

**Reading comprehension:** Spectrum Reading Comprehension, Reading Detective (Critical Thinking Co.).

**Science (Life Science gap):** VanCleave's Biology for Every Kid, NatGeo Little Kids First Big Book of Animals, backyard nature journal.

**Science (Physical Science gap):** VanCleave's Physics for Every Kid, *The Way Things Work Now* (David Macaulay).

## Voice & tone — non-negotiable

- Speak directly *to* the kid ("Luke, you...", "Quinn, you...")
- Specific praise grounded in actual numbers — kids understand "you went from Basic to Advanced" or "your Lexile is 1050L which is in the top 5%"
- Honest about the one thing to work on, framed as "to keep working on" not as a deficit
- No condescension, no false cheer, no participation-trophy language
- No emojis (Brady's global rule)
- Closing line should be specific to that kid's year — never generic
- If a kid had a real comeback (Below Basic → Advanced, e.g. Quinn Science 2025-26), name it directly. They lived through that and deserve to see the data acknowledge it.

## Process

1. **Pull data** for each kid
   - For ATLAS: read the per-kid Cambium ISR PDFs from `~/brady-os-local/family/kids/<kid>/records/atlas/`, OR pull live from `ar-familyportal.cambiumast.com` (codes in `portal/public/family/kb/16-school-access-codes.md`)
   - For other tests: TBD — adapt template to whatever scoring system the test uses

2. **Compute / verify percentiles** using the Lexile/Quantile tables above

3. **Write the per-kid narrative section** — draft "What's the Story This Year" before touching HTML. One stand-out moments paragraph (specific scores), one "to keep working on" paragraph (specific sub-domain).

4. **Calibrate the book list** to the kid's Lexile band. 8 titles, at least one non-fiction if needed.

5. **Pick workbooks** — two columns, push-ahead + targeted-to-weakness.

6. **Write a closing line** specific to that kid's year. Read it back: would a 9-year-old feel seen by it? If not, rewrite.

7. **Render via template** at `3-reference/skills/kids-test-results-onepager/templates/onepager-template.html`. Each kid gets their own color-coded section (Isla purple, Luke blue, Quinn pink — preserve color identity across runs so the kids recognize their pages).

8. **Save locally** to `~/brady-os-local/family/kids/triplets-<season>-<year>-onepager.html` (sensitive kid data — never the repo, per LOCAL-RECORDS-POINTER convention).

9. **Offer PDF rendering** — the user can open in browser and ⌘P → Save as PDF, or you can spin up Playwright to convert.

## Outputs

- HTML file at `~/brady-os-local/family/kids/<descriptive-filename>-onepager.html`
- Optionally a PDF at the same path
- Optional update to each kid's `records/index.md` referencing the 1-pager file

## File locations

- This skill: `3-reference/skills/kids-test-results-onepager/`
- Template: `templates/onepager-template.html`
- Inaugural example (sensitive — local only): `~/brady-os-local/family/kids/triplets-summer-2026-onepager.html`
- Cross-kid analysis pairs with this skill: `~/brady-os-local/family/kids/triplets-atlas-summative-2026-05-08.md`

## Why this skill exists

Brady has five kids and runs them through standardized testing year after year. The cross-kid analysis (for parental decision-making) and the kid-facing 1-pager (for the actual children to internalize their progress) are two distinct outputs that should be produced together but never confused. This skill standardizes the kid-facing piece so the voice, calibration, and design stay consistent across years and tests, and so the experience the kids associate with their results is one of being seen and celebrated specifically — not generically.
