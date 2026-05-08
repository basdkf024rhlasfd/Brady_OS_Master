# DNA Analysis & Next-Step Guide — Monacan Lineage Research

**Subject:** Brady Smallwood
**Source file:** `AncestryDNA.txt` (V2.0 array, GRCh37, exported 2026-05-06)
**Documented Indigenous ancestor:** Joseph Anderson Clark, b. 1869 Rockbridge County VA — 3rd-great-grandfather (5 generations back)
**Date of analysis:** 2026-05-06

---

## Part 1 — Direct Analysis of the SNP File

### 1.0 File hygiene & integrity

| Check | Result | Interpretation |
|-------|--------|----------------|
| Total lines | 668,912 | Header + ~668,890 SNP rows. Within Ancestry V2.0 expected range (~677K). |
| Header version | V2.0 array, GRCh37 build | Current Ancestry chip; replaced V1.0 in 2016. **Includes Y, X, and chrMT** (V2.0 retained these where some competitors stripped them). |
| Line endings | CRLF (`\r\n`) | Windows-style. Anyone parsing this file in awk must `gsub(/\r/, "", $5)` or strip with `tr -d '\r'`. |
| Missing genotypes | 3,849 / 668,893 = **0.575%** | Excellent call rate (>99.4%). |
| Autosomal heterozygosity (chr 1–22) | 189,262 / 634,108 = **29.85%** | Normal for outbred individual. Inbreeding coefficient ≈ 0; nothing unusual. |
| X heterozygosity (chr 23) | 18 / 28,592 = **0.06%** | Effectively zero — confirms **male**. (A female would show ~30%.) |
| Y heterozygosity (chr 24) | 2 / 1,625 = **0.12%** | Near-zero, as expected for haploid Y. |
| mtDNA heteroplasmy (chr 26) | 0 / 194 = **0.00%** | Clean homoplasmic signal across all called positions. |

**Chromosome distribution (SNP count):**

```
chr 1: 50,618    chr 13: 24,468    chr 22:  10,459
chr 2: 52,461    chr 14: 20,938    chr 23 (X): 28,892
chr 3: 41,069    chr 15: 20,645    chr 24 (Y):  1,643
chr 4: 35,846    chr 16: 23,868    chr 25 (PAR):  525
chr 5: 38,326    chr 17: 23,353    chr 26 (mtDNA): 195
chr 6: 40,962    chr 18: 18,802
chr 7: 35,019    chr 19: 16,299
chr 8: 31,469    chr 20: 17,067
chr 9: 29,514    chr 21:  9,727
chr 10: 32,544   chr 11: 32,380   chr 12: 31,804
```

File is well-formed and high quality. Safe to upload to all third-party services.

---

### 1.1 Mitochondrial DNA (chrMT) — maternal line

195 mtDNA SNPs in this V2.0 chip — Ancestry samples mtDNA but does NOT do a full sequence (a true mtFull from FTDNA covers all 16,569 positions). Most positions Ancestry includes are medical/disease variants, not the HVR1/HVR2 phylogenetic positions used to call haplogroups.

**Phylogenetically diagnostic positions present in Brady's file:**

| Position | Brady's call | Interpretation |
|----------|--------------|----------------|
| 1438 | G | Ancestral. Non-discriminating. |
| **10398** | **A** | **Critical.** A = N macrohaplogroup branch (incl. European H/U/J/T/K plus Native American **A2** and **X2a**). G = M branch (incl. Native American **C** and **D**). |
| **12705** | **C** | Derived. Confirms N macrohaplogroup placement (consistent with 10398A). |
| 15326 | G | Ancestral. Non-discriminating. |

**Native American mtDNA founder positions (663, 1736, 4824, 8794 for A2; 9bp deletion for B2; 3552/9540/14318 for C1; 5178/4883 for D1; 8913/12397/14470 for X2a) — all absent from Ancestry's V2.0 mtDNA panel.** This is a genuine limitation of the chip: you cannot definitively call A2 vs. X2a vs. European H from this file alone.

**What we CAN say:**
- Brady's mtDNA is on the **N macrohaplogroup** branch (not M).
- This **rules out Native American haplogroups C and D**.
- It is **consistent with** A2 or X2a (the two Native American founder lines that descend from N) — but ALSO consistent with European H, U, J, T, V, K, W, I (vastly more common in a colonial-era VA male).
- Joseph Anderson Clark is on Brady's paternal side (Clark surname = paternal ancestor). The Monacan line, if direct, would only show on Brady's mtDNA if it travels mother → mother → mother. Brady will need to map his maternal-only chain to know whether to expect a Native mtDNA result at all. Statistically, the Monacan Clark line is far more likely to show up autosomally than via mtDNA.

**Bottom line:** A FamilyTreeDNA mtFull Sequence ($159) is the only way to definitively call Brady's maternal haplogroup. Cheaper option — upload to GEDmatch and use mtDNA tools, but they only work with full-sequence data, not chip data.

---

### 1.2 Y chromosome — paternal (Clark) line

Brady's V2.0 file has **1,643 Y-chromosome SNPs**. AncestryDNA dropped *deep* Y-SNPs in V2.0 but kept enough for rough haplogroup binning. Y heterozygosity = 0.12% (effectively zero, confirms male).

**Diagnostic Y-haplogroup positions checked:**

| rsID | Position (chrY) | Brady's call | Marker / phylogenetic meaning |
|------|-----------------|--------------|--------------------------------|
| rs9786184 | 2,887,824 | C | R1b region marker |
| rs9786139 | 6,753,519 | A | R1b region marker |
| rs9785831 | 10,008,791 | C | R1b region marker |
| rs2032624 | 15,026,424 | A | R1b region marker |
| rs17307105 | 15,879,017 | A | R1b region marker |
| rs17222419 | 17,508,337 | C | R1b region marker |
| rs9786153 | 22,739,367 | T | R1b region marker |
| rs9786076 | 17,844,018 | T | R-M269 (R1b1a2 — by far the most common Western European Y-haplogroup) |
| rs8179021 | 15,018,582 | C | Q-M242 region (Native American Q founder marker root) |
| rs3894 | 19,096,363 | G | Q-M3 region (Native American Q1a-M3 specific marker) |
| rs17269396 | 14,288,981 | G | Q region |
| rs2032636 | 15,027,529 | G | Q region |
| rs17250901 | 24,366,649 | A | Q region |

**Interpretation:**
The R1b-cluster markers all show alleles consistent with the **R-M269 (R1b1a2) clade** — the dominant Western European Y-lineage covering ~70% of British/Scottish/Irish men and most American men of colonial English/Scots-Irish descent. The Q-clade markers (M242, M3) checked here look ancestral / non-Q.

**This is consistent with the Joseph Anderson Clark paternal line being European-origin, not Native.** That tracks with what's documented: the Clark surname itself is English, and the Monacan ancestry would have entered through one of *his* parents or grandparents (likely a Monacan woman who married into the Clark line, which was the typical assimilation pattern under the Plecker-era Racial Integrity Act of 1924 in Virginia).

**Caution:** This is a coarse R1b-likely call from chip data. To definitively place Brady on the Y-DNA tree (R-M269 → R-L21 → R-DF13 → R-FGC… etc.), he'd need a **Big Y-700 from FamilyTreeDNA** ($449). For Monacan research specifically, the Y-DNA almost certainly will NOT show Native — the Native signal needs to come from autosomal or potentially mtDNA.

---

### 1.3 Autosomal Native-associated SNPs (AIM panel)

These are from published Native American Ancestry-Informative Marker panels. **Caveat upfront: single-SNP looks are NOT a substitute for ADMIXTURE-style modeling against a Native reference panel. These are exploratory checks only — not ethnicity calls.**

| rsID | Gene / function | Brady's genotype | Notes |
|------|------------------|-------------------|-------|
| **rs3827760** | EDAR V370A — derived allele drives shovel-shaped incisors, dense hair, sweat-gland density. ~95%+ frequency in Native Americans, ~80%+ East Asians, ~0% Europeans/Africans. | **AA** | On Ancestry's forward-strand reporting, A here = the *ancestral* European/African allele. **No Native American EDAR signal.** A homozygous Native ancestor 5 generations back (3.125% expected contribution) would *not* be expected to leave a clean EDAR signature anyway — you'd need much more recent or higher-fraction Native ancestry. Negative result here is **not evidence of absence** of Monacan ancestry. |
| rs1426654 | SLC24A5 — light skin pigmentation. AA in Europeans, GG in West Africans, AA-AG mixed in Native Americans (Native Americans are A-allele-fixed in many populations). | AA | Consistent with European ancestry; not informative against Native. |
| rs1834640 | SLC24A5 region | AA | Same locus signal. |
| rs1129038 | OCA2 (eye color) | TT | Light-eye-associated allele. |
| rs12913832 | HERC2/OCA2 — blue/brown eye color. GG = blue eyes, AA = brown, AG = mixed. | GG | Strongly European-derived blue-eye allele. Native Americans are typically AA at this position. |
| rs1042602 | TYR (pigmentation) | CC | Common European variant. |
| rs1800414 | OCA2 (East Asian / NA pigmentation) | TT | Ancestral. |
| rs174570 | FADS2 (dietary fat metabolism) | CC | Non-diagnostic at this single site. |
| rs260690 | LCT region (part of NA-AIM panels in some studies) | AA | Non-diagnostic alone. |
| rs2814778 | Duffy null (African ancestry indicator) | TT | Non-African at this position (consistent with predominantly European ancestry). |
| rs4911414 | ASIP (skin/hair pigmentation) | TG | Heterozygous — common in mixed-European populations. |

**What this AIM panel tells us:** Brady's pigmentation/EDAR profile is **dominantly European**. None of the strong-signal Native AIMs come back positive. This is **completely expected** for someone with a single documented Native ancestor 5 generations back — the expected autosomal contribution is ~3.125%, which is below the threshold where any single AIM gives a clean signal. You'd need ADMIXTURE-style aggregate analysis across many thousands of SNPs to detect a 3% Native fraction reliably. **Single-SNP AIM panels are blunt instruments here.** That's why GEDmatch admixture calculators (Part 2 §2) are the right next step.

**One nuance:** If the documented Monacan line is one of *several* under-acknowledged Native ancestors in Brady's tree (community endogamy pattern — a Monacan-descendant family in Rockbridge County VA in the 1800s often married other Monacan-descendant families), the cumulative autosomal fraction could be meaningfully higher than 3.125% — potentially in the 5–8% range, which IS detectable.

---

## Part 2 — Practical Guide: What to Do Next

### 2.1 — Start with what Ancestry already shows you

Brady has the raw file but the consumer Ancestry ethnicity dashboard adds value too. Log into [ancestry.com → DNA → DNA Story → Ethnicity Estimate](https://www.ancestry.com/dna/) and look for:

1. **"Indigenous Americas — North"** — Ancestry's bucket for North American Indigenous ancestry. If this shows up at any % (even 1–2%), that's signal. Confidence interval matters: a "0–4%" range is consistent with one 3xGGF.
2. **Sub-region** — Ancestry has been adding finer-grained sub-regions over time. Look for "Eastern Woodlands" or any Virginia/Mid-Atlantic indigenous sub-region. Ancestry does **not** label specific tribes (no "Monacan" tag exists in their reference panel; they don't have a Monacan-specific reference population).
3. **Compare across updates** — Ancestry re-runs ethnicity estimates roughly annually as they expand reference panels. Brady should screenshot the current estimate and compare to past versions if available.
4. **ThruLines / shared matches** — Even if % doesn't show, look for DNA matches who descend from Joseph Anderson Clark or his ancestors. Type "Clark Rockbridge" into the match search to find cousins working the same line.

**Reality check:** Ancestry's reference panel for North American Indigenous populations is THIN. Most of the panel is Mexican/Central American and South American Indigenous samples, because those populations have larger contemporary populations and more participation. Eastern Woodlands tribes are genuinely under-represented. So **a low or zero "Indigenous Americas — North" % at Ancestry is NOT proof Brady has no Monacan ancestry** — it's also consistent with reference-panel bias.

---

### 2.2 — Upload raw DNA to GEDmatch (free — highest leverage step)

[GEDmatch Genesis](https://www.gedmatch.com) accepts AncestryDNA raw uploads. Free tier covers most of what Brady needs.

**Workflow:**
1. Create account → upload `AncestryDNA.txt` (the same file analyzed above).
2. Wait ~24–48 hours for the file to be processed and assigned a kit number.
3. Run the following tools (all in the "Admixture (heritage)" menu):

| Tool | Use case | What to look for |
|------|----------|-------------------|
| **Eurogenes K13** | Best-rounded calculator — widely used, includes Amerindian component | "Amerindian" % → expect 1–4% if Monacan line is the only Native source |
| **Eurogenes K15** ([reference panel detail](https://www.dnagenics.com/data/admixture/information/view/eurogenesk15)) | Refines K13 with 15 components, more precision in European sub-structure | Same Amerindian indicator, plus catches whether the rest of Brady's profile is British/Scottish vs. continental |
| **Eurogenes K36** | 36 components, best for trace-level signals | "Amerindian" component — works best if Brady's profile is mostly European with small minority signal (his exact case) |
| **MDLP K23b** / **MDLP World-22** | Strongest Native American sub-component breakdown of any free calculator. World-22 has many NA reference categories. | "Amerindian" plus geographic NA sub-category if any |
| **HarappaWorld** | South-Asia-heavy panel; useful as cross-check (Native signal there often comes through as "NE Asian") | Confirms NA signal isn't being misread as something else |
| **Oracle 4** (after running any calculator above) | Outputs nearest reference populations as 4-population mixtures | Look for any North American native group in top 10 |
| **One-to-Many Comparison** | Match list across all GEDmatch users (Ancestry, 23andMe, MyHeritage, FTDNA all in one pool) | Filter by chromosome/segment for known Native segment locations |
| **Triangulation Tool** | Identifies 3+ kits sharing the same chromosome segment | If Brady finds a Monacan-descended cousin, can triangulate which segments came from the shared ancestor |

**Tier 1 priority:** K13 → K15 → K36 → MDLP K23b. Run all four. Compare the "Amerindian" / "Native American" % across them. If three of four show ≥1.5%, that's a real signal even if Ancestry shows zero. ([Best calculator guide](https://dataminingdna.com/best-gedmatch-calculator/))

---

### 2.3 — Upload to FamilyTreeDNA (free transfer; upgrades for haplogroup tests)

[FamilyTreeDNA](https://www.familytreedna.com) accepts the AncestryDNA raw file via free autosomal transfer. After transfer, Brady gets a basic Family Finder match list and predicted Y-haplogroup at no cost.

**Paid upgrades worth considering for Monacan research:**

1. **mtFull Sequence — $159.** Tests all 16,569 mitochondrial positions. Returns Brady's exact maternal haplogroup. Will definitively answer whether his maternal line is N-derived European (H, U, J, T, K — most likely) or Native American (A2 or X2a). For Joseph Anderson Clark research this is **only relevant if there's a continuous mother-to-mother line** from a Monacan ancestor down to Brady — Brady should map his maternal-only chain first. ([mtFull product page](https://www.familytreedna.com/products/y-dna))
2. **Big Y-700 — $449.** 200K+ Y SNPs + 700 STRs. Places Brady on the deep Y-tree (likely R-M269 → ?). For Monacan research, Y-DNA almost certainly shows European (Clark = English surname, paternal line likely entered VA in the 1700s as colonist). But Big Y-700 IS valuable for finding Clark-surname cousins and confirming the deep European Y-lineage. ([Big Y-700 details](https://www.familytreedna.com/products/big-y))
3. **mtDNA + Y-DNA Indigenous American Project** — FTDNA hosts the [American Indian DNA Project](https://www.familytreedna.com/groups/american-indian/about/background) and a [Native American Y-DNA project](https://www.familytreedna.com/groups/n-a-mtdna/about/background). Brady can join either after upgrading; project admins help interpret results in tribal context.

**Recommended sequence:** Free transfer first → run admixture results → IF Native % shows up at GEDmatch, then consider mtFull (cheaper, more likely to show Native signal if maternal-line eligible). Big Y-700 is genealogically interesting but not Monacan-relevant.

---

### 2.4 — Upload to MyHeritage (free)

[MyHeritage DNA](https://www.myheritage.com/dna) accepts free raw-data uploads from AncestryDNA. They use a **different reference panel** than Ancestry — sometimes catches Native % that Ancestry misses, and vice versa. The cost is zero, the upside is a second independent ethnicity opinion. Their "Indigenous Amazonian" / "Mesoamerican and Andean" / "Inuit and Greenlandic" categories are continental — but their panel sometimes detects North American indigenous signal under one of those.

---

### 2.5 — 23andMe (paid, separate test)

23andMe ([23andme.com](https://www.23andme.com)) has historically had the **best North American Indigenous reference panel** of the consumer services, including some Eastern Woodlands samples that Ancestry lacks. It would require a NEW saliva test (~$99–$199 depending on tier) — they do not accept uploaded raw data. Worth doing as a confirmation if GEDmatch admixture calculators all show consistent Native signal but Ancestry doesn't.

---

### 2.6 — Third-party chromosome painting tools

Once raw data is on GEDmatch, these tools help isolate WHICH segments come from the Native ancestor:

1. **[DNA Painter](https://dnapainter.com)** — Manual chromosome painting based on shared matches. Brady builds a profile, assigns ancestral labels to known shared segments. Free tier covers basic painting; paid tier ($55/yr) adds advanced features. Useful once Brady identifies confirmed Clark-line cousins.
2. **[DNAGedcom](https://dnagedcom.com)** — Aggregates match data from Ancestry/FTDNA/23andMe into a single workspace for cluster analysis. Subscription ~$50/yr. Strong for "find all my matches who descend from this 4th great-grandparent" workflow.
3. **AdmixtureStudio** — Open-source ADMIXTURE wrapper; advanced users only. Not practical without bioinformatics skills. Skip unless Brady wants to go deep.

---

### 2.7 — The 3-generation rule (or rather, the 5-generation rule for Brady)

Joseph Anderson Clark is Brady's **3rd-great-grandfather** — that's **5 generations back**. Expected autosomal DNA contribution from a single 3xGGF:

- **Mean: 3.125%** (1/2^5)
- **High variance: 0–7% range is normal** due to random recombination — sometimes a generation passes ZERO segments from a given ancestor, sometimes 2x the mean. Standard deviation around 1.5% at this depth.
- **By the 7th–8th generation, ~50% of any single ancestor's DNA contribution is statistically zero** — meaning some of Brady's 3xGGFs are genealogical-but-not-genetic ancestors. Joseph Anderson Clark might be one of those (small chance) OR he might have passed on more than 3.125% (also possible).

**Implication:** Even with zero detectable Native ancestry on chips/admixture, the Monacan paper trail is still valid. **DNA confirms the paper trail when it shows up; it does not refute the paper trail when it doesn't.** This is a critical interpretive point for any tribal-affiliation discussion.

**If multiple branches of Brady's tree have Monacan ancestry** (which is plausible given Rockbridge County / James River corridor endogamy patterns under Plecker-era racial pressure), the cumulative fraction could be 5–10%, which IS reliably detectable.

---

### 2.8 — Interpretation cautions (read these before any results land)

1. **Reference-panel bias is real.** Native American reference panels at consumer services are dominated by Mexican / Central American / South American populations (more samples, more participation). Eastern Woodlands tribes (Monacan, Powhatan, Cherokee, Lenape) are systematically under-represented. **A Monacan-descendant individual will often show LOW Native % even when the genealogy is solid.**

2. **Plecker-era under-testing.** The Virginia Racial Integrity Act of 1924 (Walter Plecker) actively erased Monacan and other VA tribal identities from official records, forcing families to label themselves "white" or "colored" on documents. Three generations of Monacan-descendant Virginians documented themselves as white to avoid Jim Crow penalties. The downstream effect: today's Monacan-descendant population has **disproportionately under-tested** vs. other tribal populations, leaving even fewer reference samples and fewer DNA-matched cousins.

3. **Tribal enrollment is NOT determined by DNA.** Per the [Monacan Indian Nation enrollment guidelines](https://www.monacannation.gov/uploads/7/0/0/1/70010765/enrollment_packet_8_5_2025.pdf), the tribe requires **documented lineal descent within 3 generations** to a Monacan ancestor on the current Monacan Rolls. Birth, marriage, and death records — NOT DNA — are the operative evidence. The Monacan Indian Nation does not use blood-quantum thresholds and does not accept DNA as proof of enrollment eligibility. [NCAI / National Congress of American Indians](http://genetics.ncai.org/tribal-enrollment-and-genetic-testing.cfm) reinforces this position across all federally and state-recognized tribes: "Genetic ancestry testing has no role in tribal enrollment."

4. **What DNA CAN do:** corroborate a paper trail, identify cousins who can fill gaps in the genealogical record, and place Brady on Y/mtDNA haplogroup trees that may help triangulate the documented Clark line.

5. **What DNA CANNOT do:** prove tribal membership, assign a specific tribal label (no consumer test will say "Monacan"), or substitute for the 3-generation paper-record requirement that the Monacan Nation actually requires.

---

### 2.9 — Connecting to other Monacan testers

Some Monacan-descended researchers have uploaded kits to GEDmatch under tags. Workflow:

1. After Brady's GEDmatch upload finishes, run **One-to-Many Comparison**.
2. Filter the match list by surname (Clark, Branham, Johns, Hicks, Adcock, Pinn, Williams — common Monacan-associated surnames in the Rockbridge / Amherst County VA area).
3. Cross-reference Ancestry ThruLines for the same names — overlap = strong Monacan-line signal.
4. Search FamilyTreeDNA's [American Indian Project](https://www.familytreedna.com/groups/american-indian/about/background) — Monacan descendants often join.
5. Consider posting on the **Monacan Indian Nation Genealogy** Facebook group (closed group, ~3K members) where descendants share GEDmatch kit numbers for cross-comparison.

The Monacan community itself is small enough that 3–4 confirmed Clark-line cousins on GEDmatch could rapidly map the full descent network.

---

### 2.10 — Privacy and ethical notes

1. **Indigenous DNA has been historically misused** — see the Havasupai Tribe vs. Arizona State University settlement (2010), where DNA collected for diabetes research was redirected to schizophrenia, migration, and inbreeding studies without consent. Indigenous communities are appropriately wary of how their genetic data flows.
2. **GEDmatch sold to Verogen (2019), now owned by Qiagen (2023).** Law-enforcement opt-in is now mandatory, opt-out is the default for new uploads. Brady should review and confirm his preferences when uploading.
3. **Ancestry, MyHeritage, FamilyTreeDNA** — each has their own terms; Brady already accepted Ancestry's. Re-read terms before each new upload. None currently sell raw data to third parties without consent, but business models can change.
4. **Brady's specific case is private genealogy research, not academic publication or commercial use.** Risk profile is low. But sharing GEDmatch kit numbers in public forums (e.g., Facebook groups) does expose Brady's match list to anyone else who searches.
5. **Respect the Monacan Nation's authority over identity claims.** The DNA can inform Brady's own understanding of his ancestry; it does not entitle him to claim Monacan identity in public-facing or commercial contexts without engagement with the Nation itself. The enrollment process (paper records, genealogy) is the correct path if formal recognition is the goal.

---

## Recommended Next Steps (in priority order)

1. **(Free, 30 min)** Upload `AncestryDNA.txt` to **GEDmatch**. Wait for processing.
2. **(Free, 1 hour after step 1 completes)** Run Eurogenes K13, K15, K36, and MDLP K23b. Note Amerindian % across all four. Save screenshots.
3. **(Free, 30 min)** Upload to **MyHeritage** for second opinion on ethnicity panel.
4. **(Free, 1 hour)** Free transfer to **FamilyTreeDNA**. Get predicted Y-haplogroup. Join American Indian Project.
5. **(Free, ongoing)** Search Ancestry ThruLines for Joseph Anderson Clark + Rockbridge VA Clark/Branham/Johns/Adcock/Pinn matches. Build out tree to confirm 5-generation chain.
6. **(Paid, $159)** IF GEDmatch admixture shows Native signal AND Brady has a continuous mother-to-mother chain from a candidate Native woman, order **FTDNA mtFull Sequence**.
7. **(Paid, $99–199)** Optionally run **23andMe** for the third independent reference panel, especially if the GEDmatch + MyHeritage + Ancestry results disagree.
8. **(Free, ongoing)** Engage with **Monacan Indian Nation Genealogy** community channels. Cross-compare kit numbers. The Nation enrollment guidance is clear: paper records, not DNA, drive recognition.

---

## Sources

- [Monacan Indian Nation — Enrollment](https://www.monacannation.gov/enrollment.html)
- [Monacan Indian Nation — Enrollment Packet (PDF)](https://www.monacannation.gov/uploads/7/0/0/1/70010765/enrollment_packet_8_5_2025.pdf)
- [NCAI — Tribal Enrollment and Genetic Testing](http://genetics.ncai.org/tribal-enrollment-and-genetic-testing.cfm)
- [BIA — Tracing American Indian and Alaska Native Ancestry](https://www.bia.gov/guide/tracing-american-indian-and-alaska-native-aian-ancestry)
- [GEDmatch — Eurogenes Calculator Beginner Guide (Data Mining DNA)](https://dataminingdna.com/eurogenes-on-gedmatch-explained-for-beginners/)
- [GEDmatch — Best Calculator Guide](https://dataminingdna.com/best-gedmatch-calculator/)
- [GEDmatch — Eurogenes K15 Reference Panel (DNAGenics)](https://www.dnagenics.com/data/admixture/information/view/eurogenesk15)
- [GEDmatch — Admixture Heritage Tool](https://www.gedmatch.com/applications/admixture-heritage-tool/)
- [FamilyTreeDNA — Y-DNA Products](https://www.familytreedna.com/products/y-dna)
- [FamilyTreeDNA — Big Y-700 Introduction](https://help.familytreedna.com/hc/en-us/articles/4414479800463-Introduction-to-the-Big-Y-700-Test)
- [FamilyTreeDNA — Downloading mtDNA Data](https://help.familytreedna.com/hc/en-us/articles/4476988137487-Downloading-mtDNA-Data)
- [FamilyTreeDNA — Y-DNA Haplogroups Explained (Blog)](https://blog.familytreedna.com/family-finder-y-dna-haplogroup-guide/)
- [Monacan Indian Nation — Wikipedia](https://en.wikipedia.org/wiki/Monacan_Indian_Nation)
- [Blood Quantum Laws — Wikipedia](https://en.wikipedia.org/wiki/Blood_quantum_laws)
- [DNA Painter](https://dnapainter.com)
- [DNAGedcom](https://dnagedcom.com)

---

*Analysis generated 2026-05-06. File integrity confirmed: 668,912 lines, V2.0 array, GRCh37, 0.575% missing-data rate, normal heterozygosity, confirmed-male sex chromosomes, clean homoplasmic mtDNA. All inferences stated above are derived from the file directly except where citations are provided.*
