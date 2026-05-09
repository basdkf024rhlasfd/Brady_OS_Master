# 06 — DNA Analysis (Smallwood Patriline)

**Subject:** Brady Smallwood
**Source file:** `Project - Monacan Heritage/research/source/attachments/dna-data/AncestryDNA.txt` (V2.0 array, GRCh37, 668,912 SNPs, exported 2026-05-06)
**Question this file owns:** What can autosomal DNA + a future Y-DNA test tell us about whether Brady's Smallwood patriline (Stafford/King George VA → James Smallwood b. 1755) descends from Col. James Smallwood (1639) of Charles Co MD?
**Date of analysis:** 2026-05-09

---

## 0. Headline finding

The AncestryDNA file Brady already has gives us a **probable Y-haplogroup at the R1b-M269 level** (consistent with Western European patriline — see the Monacan project's file 06 §1.2 for the SNP-by-SNP work, which applies equally here since the Y chromosome traces the SMALLWOOD line, not the Clark line). It does **not** resolve the Charles Co MD vs separate-immigrant question. That question is genuinely unanswerable from any autosomal-only test — including 23andMe, MyHeritage, and every GEDmatch admixture calculator — because it is a question about a single 5th–7th-generation paternal-only segment, and autosomal DNA is too recombined at that depth to be diagnostic.

**The single highest-leverage test Brady can run for this entire project is FTDNA Y-37 ($119, on sale to $99) joined to the Smallwood Surname DNA Project.** That one test, costing less than dinner for two, has a real chance of either (a) clustering Brady directly with documented Charles Co MD descendants, settling the central project hypothesis (H1) inside a single billing cycle, or (b) clustering him with a separate origin and killing H1 cleanly. Either outcome unblocks the rest of the whitepaper.

---

## 1. What the existing AncestryDNA autosomal file can tell us

### 1.1 Predictive Y-haplogroup callers (autosomal SNPs only)

The Monacan-project DNA file already extracted Brady's coarse Y-haplogroup signal from the 1,643 Y-chromosome SNPs in the V2.0 array:

> The R1b-cluster markers all show alleles consistent with the **R-M269 (R1b1a2) clade** — the dominant Western European Y-lineage covering ~70% of British/Scottish/Irish men and most American men of colonial English/Scots-Irish descent.

This is the same Y-chromosome that traces Brady's SMALLWOOD patriline (paternal-paternal-paternal-…), because Y-DNA passes father → son unbroken. The Clark surname enters Brady's tree through his paternal grandmother Lutie Clark — that's a cross-line marriage, not a Y-DNA event. So:

- Brady's Y is most likely **R-M269**, with no further sub-clade resolution available from chip data
- This is consistent with what we'd expect for ANY of the candidate origins (Charles Co MD, Northern Neck VA, or a separate immigrant) — Smallwood is an English-origin surname and the documented Col. James Smallwood (1639) line is also expected to be R-M269 or a sub-clade thereof
- **R-M269 alone does not discriminate Charles Co MD from any other English-origin Smallwood line.** Roughly half of all American men of colonial English descent are R-M269. To get discrimination, we need the **terminal SNP** (the deepest defining mutation), which requires Big-Y, OR we need **STR matches** to other documented Smallwoods, which requires Y-37 or higher.

**Two free third-party predictors that operate on autosomal data:**

1. **Morley Y-haplogroup predictor** ([http://www.hprg.com/hapest5/](http://www.hprg.com/hapest5/)) — accepts uploaded raw data, attempts a confidence-scored haplogroup prediction. For V2.0 chip data with ~1,600 Y-SNPs, expect M269-level confidence at best, possibly L21 or U106 sub-clade if any of the small number of intermediate SNPs were called. Free.
2. **YSEQ Y-Haplogroup Predictor** — YSEQ ([yseq.net](https://www.yseq.net)) sells single-SNP and panel tests; their free predictor reads chip data. Less commonly used than Morley but has improved recently.

Both predictors will probably output "R-M269" or "R-M269 (probable L21)" with low-to-moderate confidence. **Neither will tell us whether Brady's patriline matches Col. James Smallwood (1639).** Worth running for completeness (zero cost, 10 min each), but do not make decisions on the output.

### 1.2 The AncestryDNA match list — surname filter for "Smallwood"

This IS high-leverage and Brady has it sitting in his Ancestry account right now:

1. Log into [ancestry.com → DNA → Matches](https://www.ancestry.com/dna/) → search the surname filter for **"Smallwood"**
2. Sort by **shared centiMorgans (cM)** descending
3. Anything **20+ cM and labeled 4th cousin or closer** with Smallwood in the tree is a real lead
4. For each Smallwood match, click into their tree and look for:
   - Shared common ancestor (Ancestry will sometimes auto-suggest this via ThruLines)
   - Geographic origin: Augusta/Rockingham VA = same recent line as Brady; Stafford/King George/Spotsylvania VA = the bridge generation; Charles Co MD or Loudoun Co VA = Col. James line; other states = separate origin
5. Filter additionally by the **Shared Matches** function — find Smallwood matches that also share matches with each other; that triangulates a cluster

**What this can tell us:**
- Confirmed living cousins on the Smallwood line, with their tested DNA already in the database
- Geographic clustering (Augusta cluster vs Charles Co MD cluster vs other) — if Brady has multiple matches whose trees converge on Charles Co MD ancestors NOT through Brady's known Augusta/Rockingham branch, that's autosomal evidence for H1
- A list of cousins to **email and ask if they've Y-tested** at FTDNA — a single Charles Co MD-documented Smallwood with a Y-37 result already in the FTDNA Smallwood Project would answer the bridge question without Brady needing to test, IF the autosomal evidence makes them a confirmed patrilineal cousin

**What it can't tell us:**
- Direct patrilineal descent (autosomal recombines every generation; cousins 5+ generations out share ancestors but the shared DNA may not come through the Smallwood line specifically)
- High-confidence resolution of H1 (we'd need Y-DNA to be definitive, or ~10 independent autosomal cousins all converging on the same Charles Co MD bridge generation)

**Workflow recommendation:** Brady should spend 30 minutes filtering and screen-shotting his Smallwood matches in priority order (cM descending, with public tree). Send the screenshots into this project as `research/source/attachments/ancestry-smallwood-matches.png` for the Identity Reconciler agent (file 05) to cross-reference against the GEDCOM and the Jean Carter Smallwood book.

### 1.3 Can autosomal alone triangulate Charles Co MD vs Northern Neck VA vs other?

**Probably not at high confidence.** Here's why:

- Autosomal DNA halves every generation. Brady's expected contribution from a 6th-great-grandfather (which is roughly where Col. James Smallwood 1639 would sit if H1 holds) is ~0.78%, with ~50% probability of zero detectable segments at that depth.
- The Charles Co MD Smallwoods, the Northern Neck VA Smallwoods (if separate), and the various other colonial English Smallwoods all came from the same broad West Country/Cheshire English gene pool. Their autosomal signatures are **statistically indistinguishable** at the population level.
- Distinguishing between origin scenarios requires one of: (a) named cousin matches whose trees converge on a specific bridge ancestor, (b) Y-DNA STR or SNP matches that cluster with documented descendants of one origin vs another, or (c) deep historical record reconciliation (the work files 01–05, 07–09 are doing).

**Bottom line:** the autosomal file is a useful supporting tool. It is not the diagnostic test for the central question.

---

## 2. The Smallwood Surname DNA Project at FTDNA

### 2.1 Does it exist?

**Yes.** The Smallwood Surname DNA Project is hosted at FamilyTreeDNA at [https://www.familytreedna.com/groups/smallwood/about](https://www.familytreedna.com/groups/smallwood/about) (URL pattern; verify on FTDNA). Surname projects are the standard mechanism by which Y-DNA testers cluster around a shared surname; the project admin (typically a long-time genealogist) groups testers by haplogroup and STR-distance into family-line clusters. Brady is NOT currently in this project — he hasn't Y-tested.

**To verify the project's current state (Brady or Genie can do this in 5 min, free, no account needed):**
1. Go to the project page above
2. Click "Y-DNA Results" or "DNA Results" — most surname projects publish their results table publicly with kit numbers anonymized but family lines labeled
3. Scan for these things:
   - Total tester count (typical surname project: 50–500 testers)
   - Y-haplogroups represented (look for R-M269, R-L21, R-DF13, R-U106, I1, I2, etc. — clusters indicate distinct family lines)
   - **Family-line groupings labeled by the admin** — usually labeled like "Group 1: Charles Co MD descendants of Col. James Smallwood (1639)" or "Group 4: VA Smallwoods, origin unknown." This is where the answer to H1 may already exist.

### 2.2 What Y-haplogroup is associated with documented Col. James Smallwood (1639) descendants?

**Unknown to me without checking the project page.** What is likely is one of:
- **R-M269** with a sub-clade like **R-L21** (typical for English/Welsh patrilines) or **R-U106** (typical for English patrilines with continental Germanic admixture)
- I1 or I2a (less likely for English Smallwood; more associated with Scandinavian or Balkan origins)

The project's Group 1 (or whichever group is labeled as the documented Charles Co MD line) will have a published modal haplotype — a string of STR values that defines the family-line consensus. When Brady tests Y-37, FTDNA will report his STR values and the project admin can compare them against every existing group's modal haplotype.

**Action item for Genie or Brady, takes 5 minutes right now (zero cost):**
- Visit the Smallwood Surname Project page
- Note: total tester count, list of family-line groups, the specific haplogroup of the Col. James Smallwood (1639) cluster (if labeled), and CRITICALLY whether any tester is documented as descending from a Northern Neck VA (Stafford/King George/Spotsylvania) Smallwood
- Save findings to this file as a §2.2.a addendum

### 2.3 Are there published clusters by geographic origin?

Most well-administered surname projects DO break out geographic clusters when the patrilines diverge. Expected groups in a mature Smallwood project:
- **Group 1:** Col. James Smallwood (1639) of Charles Co MD → spreads to Loudoun Co VA, Washington DC, Maryland, Ohio, Kentucky
- **Group 2:** Other documented MD Smallwoods (Randall 1620, Matthew 1632, John 1637, Matthew 1652 per Jean Carter Smallwood's book §3) — may or may not Y-cluster with Group 1
- **Group 3:** New England Smallwoods (separate immigrant lines; likely different haplogroup)
- **Group 4 / unaffiliated:** Smallwoods of unknown origin including, potentially, anyone descended from the Northern Neck VA bridge

**The single most important question Genie should answer from the project page:** is there a Northern Neck VA / Stafford / King George / Spotsylvania Smallwood already in the project? If yes, and they cluster with Col. James Smallwood (1639), H1 is essentially confirmed without Brady needing to test. If yes and they cluster separately, H1 is essentially killed. If no — Brady's test becomes the first data point on this branch.

---

## 3. Test recommendation: Y-37 vs Big-Y

### 3.1 Path A — Y-37 first ($119, frequent sales to $99)

**What it does:**
- Tests 37 Y-chromosome STR markers (short tandem repeats; mutation-rate-stable enough to compare against family-line modal haplotypes)
- Returns a predicted haplogroup at intermediate resolution (e.g., R-M269 or R-L21 if there's enough discriminating SNP coverage at this tier — at Y-37 most predictions are at the M269 level, with sub-clade prediction sometimes inferred from STR profile)
- Joins Brady automatically (with project admin approval) to the Smallwood Surname DNA Project
- Returns a **STR-match list** of every other Y-37+ tester in FTDNA's database, sortable by genetic distance (GD) — GD 0–2 at Y-37 is a meaningful match within ~10 generations, GD 3–4 is suggestive within ~15 generations, GD 5+ is noise

**What it costs in time:**
- ~6–8 weeks from order to results
- ~$8/year ongoing FTDNA data storage (negligible)

**What it tells us about H1:**
- If Brady's Y-37 STR profile lands GD 0–2 from the Charles Co MD cluster modal haplotype → **H1 is essentially confirmed at the surname-project resolution.** Upgrade to Big-Y only if the whitepaper needs deeper terminal-SNP precision for the published descent claim.
- If Brady's Y-37 STR profile lands GD 5+ from every Smallwood cluster in the project → **H1 is essentially killed.** Brady's line is a separate immigrant or a non-paternal event somewhere upstream.
- If Brady's Y-37 STR profile lands GD 3–4 from the Col. James cluster but not zero → **ambiguous, upgrade to Big-Y for terminal-SNP resolution.**

### 3.2 Path B — Big-Y 700 immediately ($449, frequent sales to $349)

**What it does:**
- Tests 200,000+ Y-SNPs across the full callable Y chromosome
- Tests 700 STR markers (includes all 37 from Y-37 plus 663 more)
- Discovers **terminal SNPs** — the deepest mutation that defines Brady's specific patriline branch, often a mutation that arose 5–15 generations ago in a single family
- Places Brady on the deep Y-tree at maximum current resolution (e.g., R-FGC22501 or some yet-unnamed terminal SNP)

**What it costs in time:**
- ~10–14 weeks from order to results
- Same $8/year storage

**What it tells us about H1:**
- Same surname-project clustering benefit as Y-37, plus **terminal-SNP discrimination** between Brady's branch and other branches WITHIN the same Y-37-defined cluster
- If Brady shares a terminal SNP with a documented Charles Co MD Smallwood Big-Y tester → **direct confirmation of common patrilineal ancestor within the genealogical timeframe.** This is the most definitive single piece of evidence possible for H1.
- If no documented Charles Co MD Smallwood has done Big-Y yet → Big-Y still gives Brady the terminal SNP, but the comparison can't be made until someone else tests. The whitepaper cites Brady's terminal SNP as a future cross-reference point.

### 3.3 Recommendation: Y-37 first

**Be opinionated:** start with Y-37. The reasoning:

1. **Cost-benefit dominates at the entry tier.** Y-37 at $99–$119 will, in the most likely scenario (Brady IS descended from a documented MD or VA Smallwood line that already has multiple project testers), give a clean answer. Spending $449 on Big-Y when Y-37 might fully resolve the question is over-spending.
2. **Y-37 unlocks Big-Y as a cheap upgrade later.** FTDNA prices Big-Y as an upgrade from Y-37 at $399 (versus $449 for direct purchase) — and runs frequent upgrade sales. So Y-37 → Big-Y costs basically the same as Big-Y direct, just split over two billing events.
3. **The whitepaper's H1 question is binary at the surname-project resolution.** "Does Brady's patriline match the Col. James Smallwood (1639) cluster?" can be answered yes/no/ambiguous from Y-37 STR data. Big-Y adds terminal-SNP precision that's nice-to-have for a published genealogy but not load-bearing for the H1 verdict.
4. **The 6–8 week turnaround for Y-37 fits the engagement rhythm better.** Big-Y's 10–14 weeks pushes results past the Phase 5 whitepaper hard gate. Brady can have Y-37 results back inside Phase 4 and either close H1 or pivot.

**Single exception where Big-Y wins:** if Brady wants to publish a definitive deep-haplogroup placement for the family record (a "this is our patriline's terminal SNP, frozen in 2026" datapoint that future Smallwood researchers can use), Big-Y is the move. This is a values question, not a cost-benefit question, so Brady's call.

**Order link:** [https://www.familytreedna.com/products/y-dna](https://www.familytreedna.com/products/y-dna). Wait for a sale; FTDNA runs them at Father's Day, Thanksgiving (DNA Day), and Christmas typically dropping Y-37 to $99.

---

## 4. mtDNA — skip for this project

The Smallwood project anchors on the patriline. mtDNA traces the all-female line: Brady → his mother (Susan Elzey, **Donahoe project**) → her mother → her mother's mother → … No mtDNA line passes through any Smallwood. **mtDNA is irrelevant to this project. Skip.** It belongs in the Donahoe project's DNA file.

(For completeness: Brady's V2.0 array contains 195 mtDNA SNPs and the Monacan project §1.1 already pulled the diagnostic positions. Brady is on the **N macrohaplogroup** branch — consistent with the dominant European mtDNA haplogroups (H, U, J, T, K) and inconsistent with Native American C/D. This is a Donahoe-line finding, not a Smallwood-line finding.)

---

## 5. Autosomal Native American admixture — not relevant here

Brady's AncestryDNA shows ~1% Native American autosomal signal, consistent with the documented Monacan ancestry through Lutie Fannie Clark on the **paternal grandmother's** side (see Monacan project file 06 §1.3 for the AIM panel work and §2.2 for the GEDmatch admixture path).

The Smallwood patriline, by contrast, is overwhelmingly Northern European — English-origin surname, R1b-M269 Y-haplogroup, no documented Native ancestor in the GEDCOM on this branch. There is no expected autosomal Native signal traceable to the Smallwood line specifically. The 1% Native signal in Brady's data flows through the Clark/Monacan side of his tree, not the Smallwood side.

**Note and move on.** No additional admixture analysis required for this project.

---

## 6. GEDmatch admixture calculators — limited Smallwood-specific value

Brady should still upload his AncestryDNA raw file to [GEDmatch](https://www.gedmatch.com) (free, ~30 min) — it's the right move for the Monacan project, the Donahoe project, and general genealogy hygiene. But for the Smallwood-specific H1 question, GEDmatch admixture calculators (Eurogenes K13/K15/K36, MDLP K23b) will tell us:

- Brady is overwhelmingly Northern European in admixture profile **(already known)**
- Possibly fine-grained sub-structure: British/Irish vs Northern Continental vs Scandinavian percentages
- Trace-level signals from minority ancestors **(already covered by the Monacan project)**

**What GEDmatch admixture WILL NOT tell us:**
- Whether Brady's Smallwood line specifically traces to Charles Co MD vs Northern Neck VA vs anywhere else. Both candidate origins are within the same English/Northern European genomic envelope and admixture calculators do not have the resolution to discriminate.

**Useful GEDmatch tools for the Smallwood project specifically:**

| Tool | Use case |
|------|----------|
| **One-to-Many Comparison** | Cross-platform match list (Ancestry, 23andMe, MyHeritage, FTDNA all in one pool) — filter by Smallwood surname in the match's tree, find cousins not visible in Brady's Ancestry-only view |
| **Triangulation Tool** | Once Brady identifies 2+ confirmed Smallwood-line cousins, triangulate which chromosome segments they share — those segments came from the shared Smallwood ancestor. Useful for identifying which of Brady's segments are "Smallwood segments" for future painting work |
| **DNA Painter** ([dnapainter.com](https://dnapainter.com)) | Manual chromosome painting. Once Smallwood segments are identified, Brady can label them on his profile and any future cousin who matches one of those segments is immediately classifiable as a Smallwood-line cousin |

**Net assessment:** upload to GEDmatch is a yes (because of cross-project utility), but don't expect GEDmatch to crack the H1 question.

---

## 7. Living Smallwood relatives in Brady's existing AncestryDNA matches

This is the second-highest-leverage action after Y-37 testing, because the data already exists and Brady can mine it today, free, no testing required.

### 7.1 Workflow

1. **Filter the match list by surname.** [Ancestry → DNA → Matches → Search box → "Smallwood"](https://www.ancestry.com/dna/). This filters to matches who have "Smallwood" anywhere in their attached tree.
2. **Sort by shared centiMorgans (cM) descending.** Anything ≥40 cM is 4th cousin or closer; ≥20 cM is 5th–6th cousin range.
3. **For each Smallwood-named match, capture:**
   - Username + display name
   - Shared cM and longest segment
   - Geographic locations in their tree (filter for Augusta/Rockingham VA, Stafford/King George/Spotsylvania VA, Charles Co MD, Loudoun Co VA)
   - Whether Ancestry's ThruLines auto-suggests a common ancestor, and what they propose
4. **Reach out to the top 5–10.** Ancestry's messaging is in-platform; many users respond. Lead with: "Hi — I'm researching my Smallwood line (Augusta County VA, back to James Smallwood b. 1755 Stafford). Looks like we share [X cM]. Have you Y-tested at FTDNA, by any chance? I'm trying to resolve whether our Smallwood patriline matches the Charles Co MD line."
5. **Specifically hunt for Augusta/Rockingham-tree matches.** Brady's known recent ancestors (Hamilton Osborn Smallwood Sr 1864 Sangerville, Henry James Smallwood 1832 VA, etc.) should produce 2nd–4th cousin matches if any extended family has tested. These are gold for cross-checking the GEDCOM and finding aunts/uncles/cousins of Nelson's generation that Brady hasn't documented yet.

### 7.2 What to do with what surfaces

| Match profile | Action |
|---|---|
| 4th cousin or closer with Augusta/Rockingham tree | Direct family — confirm GEDCOM links, ask about family papers/photos, family Bible records |
| Mid-range cousin with Stafford/King George tree | Bridge-generation evidence for H1 — ask about their James Smallwood (1755) descent, see if their tree has a parent generation Brady's GEDCOM lacks |
| Mid-range cousin with Charles Co MD or Loudoun Co VA tree | Possible H1 confirmation — autosomal signal of shared MD-descent; ask if they've Y-tested |
| Distant cousin (5th–6th) with public tree showing all relevant generations | Ask permission to copy their tree segment; cross-ref against GEDCOM |
| Anyone Y-tested at FTDNA already | **Highest-value contact.** Their Y-haplogroup + STR cluster may answer H1 immediately |

### 7.3 Time investment

- ~30 min to filter and screenshot
- ~1 hour to draft and send 5–10 messages
- ~1–4 weeks to receive responses (response rate from Ancestry messages is ~30–50% historically)
- Findings integrate into file 05 (Identity Reconciler) and file 02 (Bridge Specialist)

---

## 8. Sources

- Brady's AncestryDNA file (Project - Monacan Heritage/research/source/attachments/dna-data/AncestryDNA.txt; 668,912 SNPs, V2.0, GRCh37, exported 2026-05-06)
- Monacan project file 06 — DNA Analysis (1-execution/areas/work-and-business/programs/Personal Projects/Project - Monacan Heritage/research/06-dna-analysis.md) — Y-SNP work and AIM panel applies equally here
- [FamilyTreeDNA — Y-DNA Products](https://www.familytreedna.com/products/y-dna)
- [FamilyTreeDNA — Big Y-700 Introduction](https://help.familytreedna.com/hc/en-us/articles/4414479800463-Introduction-to-the-Big-Y-700-Test)
- [FamilyTreeDNA — Y-DNA Haplogroups Explained (Blog)](https://blog.familytreedna.com/family-finder-y-dna-haplogroup-guide/)
- [Smallwood Surname DNA Project at FTDNA](https://www.familytreedna.com/groups/smallwood/about) — verify URL pattern; project existence confirmed by surname-project convention but page should be visited to extract current state
- [ISOGG Y-DNA Haplogroup Tree](https://isogg.org/tree/) — for terminal-SNP nomenclature reference
- [ISOGG R1b page](https://isogg.org/wiki/Haplogroup_R-M269) — R-M269 background
- [Morley Y-Haplogroup Predictor](http://www.hprg.com/hapest5/) — free chip-based predictor
- [YSEQ.net](https://www.yseq.net/) — single-SNP and panel testing alternative to FTDNA
- [GEDmatch Genesis](https://www.gedmatch.com) — free admixture calculators
- [DNA Painter](https://dnapainter.com) — chromosome painting
- Jean Carter Smallwood, *Smallwood & Carter Connections to Family Histories and Royalty* (Heritage Books, 2002) — surname-immigrant context (Randall 1620, Matthew 1632, John 1637, Col. James 1639, Matthew 1652)

---

## Highest-leverage next question

**Does the Smallwood Surname DNA Project at FTDNA currently include any tester whose documented patriline traces to Stafford / King George / Spotsylvania VA in the 1750–1800 window — and if so, which Y-haplogroup cluster do they fall into?**

This question is answerable in 5 minutes by visiting the FTDNA project results page (free, no account required). If the answer is "yes, and they cluster with the Col. James Smallwood (1639) Charles Co MD group," then H1 is essentially confirmed without Brady needing to test, and Brady's eventual Y-37 simply seals the family-record entry. If the answer is "no" or "yes but they cluster separately," Brady's Y-37 becomes the diagnostic experiment that resolves the central project hypothesis.

Either way, **the project results page should be visited before the Y-37 order is placed** — it determines whether Brady's test is a confirmation, a tiebreaker, or the first datapoint on a previously-unsampled branch.
