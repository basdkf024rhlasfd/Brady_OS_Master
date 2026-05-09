# 09 — Census Extracts (Smallwood Branch)

**Compiled:** 2026-05-09
**Owner:** Census reader agent (Phase 2 parallel run).
**Scope:** US Federal Census 1810–1950, Smallwood patriline and married-in surnames (Hess, Knicely / Kniceley / Knicely[?], Johnson, Manning, Loker, Wiseman, Anthony, Clark of Stafford), with focused attention on Stafford / King George / Spotsylvania VA (1810–1840), Rockingham VA (1840–1900), and Augusta VA (1900–1950).
**Method:** GEDCOM-anchored extraction targets cross-referenced against the 1810–1950 federal census schedules indexed at FamilySearch (free) and Ancestry (paid). Race-classification anomaly lens applied per the Monacan precedent (Nelson Harrison Clark's 1860 Amherst "M" entry was the load-bearing finding that overturned the Clark thesis; the same lens is mandatory here because Augusta and Rockingham were inside Plecker's 1924–1967 enforcement zone).
**Status:** Targets and expected household compositions resolved from GEDCOM (Brady's FamilySearch-synced tree, last updated 6 MAY 2026, 86,877 lines). Verbatim line-by-line transcription of each pull requires an authenticated FamilySearch / Ancestry session — this file lays down the exact ARK / image targets so Brady (or a future pass) can walk the rolls in one sitting and paste extracts back in. Where a transcription is already established in Brady's GEDCOM citations or in a publicly indexed FamilySearch summary, it is reproduced here verbatim.

---

## Why this matters — the race-classification lens

The federal census race column changed materially across the period this file walks:

- **1790–1840:** Households tabulated only as counts ("free white males 16+", "free colored persons", "slaves"). No named individuals below the head of household. Race detectable only through the numeric tally for the household head.
- **1850 and 1860:** First censuses with every individual named. Race column codes: **W (White), B (Black), M (Mulatto)**. In 1860 the "M" classification was used to flag triracial-isolate individuals across Virginia, often without consistent rules — the same family could be M in one decade, W in another. The Monacan precedent (Nelson Harrison Clark, 1860 Amherst, "M") establishes that **a single 1860 Mulatto entry on a direct ancestor in the Virginia Piedmont overturns assumed-white pedigrees**.
- **1870 (post-war):** Race column is **W / B / M / I (Indian) / C (Chinese)**. The first census in which Indian classification appears as a national category. Contains every individual without slave-schedule subdivision.
- **1880–1930:** W / B / Mu (Mulatto) / In (Indian) / Ch (Chinese). The Mulatto category was dropped for the 1900 census and reinstated for 1910 and 1920, then dropped again after 1930.
- **1924–1967 (Plecker):** Walter Plecker, head of the Virginia Bureau of Vital Statistics, ordered Augusta and Rockingham county registrars to retroactively reclassify suspect Indian-or-mixed individuals as "colored" and instructed clerks to alter birth certificates. **Census enumerators in 1930 and 1940 in Virginia operated under this enforcement umbrella.** A "W" classification on a Smallwood, Knicely, Johnson, Hess, or Manning ancestor in 1930 or 1940 in Augusta VA reflects what the local enumerator wrote down under that pressure — it does not, on its own, exclude triracial admixture. Conversely, any non-W classification on an Augusta or Rockingham ancestor 1850–1880 (before Plecker) would be the equivalent of the 1860 Nelson Harrison Clark hit on the Monacan project — load-bearing primary evidence.

For each year-by-year section below, the race column is called out explicitly even when "W" is the expected default.

---

## 1810 Federal Census — Stafford / King George / Spotsylvania VA

**Targets:**
- Any Smallwood household head in Stafford, King George, or Spotsylvania
- Any Clark household head in same counties (Catherine Clark Smallwood, b. 1756 Stafford, would have been ~54 in 1810 — likely a widowed female head of household given James Smallwood died 15 JAN 1792 in King George)
- The unnamed son of James Smallwood (1755) and Catherine Clark — the missing G+5 / G+4 bridge generation between James (1755, d. 1792) and Henry James Smallwood (b. 1832) — must have been a head of household by 1810 if born before 1789

**Expected race columns:**
- Free white males / free white females by age bracket
- Free colored persons (all ages)
- Slaves (all ages)

**Race-anomaly flag rule:** Any Smallwood- or Clark-headed household in Stafford / King George with a "free colored persons" count above zero in 1810 deserves a Phase 3 chase, because the 1810 federal census preceded any Virginia-specific racial-integrity legislation and represents the earliest possible documentary baseline.

**1810 Stafford County, VA — Smallwood household pull target**

| Field | Value |
|---|---|
| Year | 1810 |
| State / county | Virginia, Stafford |
| Roll | M252_69 (Stafford and Spotsylvania) |
| FamilySearch search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1803765&q.residencePlace=Stafford%2C%20Virginia |
| Action required | Brady or future authenticated pass: pull every Smallwood and every Clark household in the 1810 schedule for Stafford, King George, and Spotsylvania. Transcribe head, age-bracket counts, free colored / slave counts. |

**1810 King George County, VA — same pull**

| Field | Value |
|---|---|
| Year | 1810 |
| State / county | Virginia, King George |
| Roll | M252_69 (Stafford and Spotsylvania) — King George records are typically grouped with neighboring counties on the same NARA roll; verify on FamilySearch |
| Action required | Same as above |

**1810 Spotsylvania County, VA — same pull**

Same roll, same pull. Catherine Clark Smallwood died in Spotsylvania in 1820, so she may already have been resident in Spotsylvania in 1810.

---

## 1820 Federal Census — Spotsylvania, Stafford, King George VA

**Targets:**
- Catherine Clark Smallwood, b. 1756 — would be 64 in 1820. **She died in Spotsylvania in 1820**, so the 1820 census may capture her household just before death (census date 7 AUG 1820; if she died after that date she would be enumerated)
- Adult sons of James Smallwood (1755) — by 1820 they would be 30s–60s, established as heads of household, with their own children. This is the single most important 1820 pull because it is the closest census to the bridge generation.
- Any Smallwood-headed household in Spotsylvania, Stafford, King George, or Caroline (the four-county Northern Neck cluster)

**Expected race columns:**
- Free white males / females by age bracket
- Free colored males / females by age bracket
- Slaves by age and sex
- Foreigners not naturalized
- Persons engaged in agriculture / commerce / manufactures

**1820 Spotsylvania County, VA — Catherine Clark Smallwood and her sons**

| Field | Value |
|---|---|
| Year | 1820 |
| State / county | Virginia, Spotsylvania |
| Roll | M33_134 (Virginia 1820) |
| FamilySearch search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1803955&q.residencePlace=Spotsylvania%2C%20Virginia |
| Action required | Pull every Smallwood and every Clark household. **Catherine Clark would be enumerated as a free white female 45+** if alive on census day. The household composition — who was living with her, who else was a Smallwood head of household in the same district — directly tests the bridge-generation hypothesis. |

**Bridge-generation hypothesis to test from 1820:**

Per the GEDCOM, Henry James Smallwood's father was named **James Smallwood (b. 1792 Spotsylvania VA, d. ABT 1865 Rockingham VA)** — the same name as his grandfather, the Northern Neck bridge ancestor. If this is correct, James Smallwood (b. 1792) would have been 28 in 1820 — old enough to head his own household. He may appear in 1820 Spotsylvania as a young white male 26–44 with a small household, OR he may still be enumerated as a male 16–25 in his widowed mother's household if she was still alive on census day. **Either pattern, if found, is the hard primary-source confirmation that the Northern Neck → Spotsylvania → Rockingham migration corridor is correct and that the Smallwood patriline is intact across the bridge generation.**

---

## 1830 Federal Census — Spotsylvania / Rockingham VA

**Targets:**
- James Smallwood (b. 1792 Spotsylvania) — would be 38 in 1830. **Critical pull:** is he still in Spotsylvania, or has he already moved to Rockingham? Henry James Smallwood was born JAN 1832 in VA — the 1830 census places the family on one side of the Spotsylvania → Rockingham move or the other.
- Every Smallwood household head in Rockingham County in 1830 (very small list — the German / Scots-Irish Valley settlement pattern means Smallwoods were rare arrivals here; any 1830 Rockingham Smallwood is a near-certain match to Brady's line)

**Expected race columns:** Same age-bracketed white / free colored / slave counts as 1820, with finer age brackets.

**1830 Rockingham County, VA — Smallwood pull**

| Field | Value |
|---|---|
| Year | 1830 |
| State / county | Virginia, Rockingham |
| Roll | M19_198 (Virginia 1830) |
| FamilySearch collection ID | 1803958 |
| Action required | Pull every Smallwood-headed household. Also pull every Hess household (Jacob Hess b. 1786 would be 44 in 1830, plausibly head of household with daughter Annie Elizabeth Hess (b. FEB 1840) not yet born — but his older children should be present). Expect very few Smallwood entries; expect substantial Hess entries (long-established Valley German family). |

**1830 Spotsylvania County, VA — Smallwood pull (parallel)**

| Field | Value |
|---|---|
| Year | 1830 |
| State / county | Virginia, Spotsylvania |
| Roll | M19_201 |
| Action required | Pull every Smallwood-headed household. Test whether James Smallwood (b. 1792) is still in Spotsylvania in 1830 or has already moved. The Spotsylvania → Rockingham move is one of the most consequential transitions in the family history because it crosses the Tidewater / Valley cultural boundary. |

**Race-anomaly note for 1830:** Under the 1830 schedule any free colored persons or slaves would be listed by tally. A Smallwood household in either Spotsylvania or Rockingham showing slaveholding is consistent with the Tidewater Anglican planter cultural origin (slaveholding was the Northern Neck norm for the planter class of any size). Slaveholding by the Smallwood ancestor in 1830 would corroborate H1 (Northern Neck origin) and complicate the Brethren-pacifist H6 — though H6 attaches to the maternal Knicely / Hess / Wiseman side, not the Smallwood patriline.

---

## 1840 Federal Census — Rockingham VA

**Targets:**
- James Smallwood (b. 1792) — would be 48. Should now be definitively in Rockingham, with Henry James Smallwood (b. JAN 1832) in his household as a male age 5–9.
- Jacob Hess (b. 1786) — age 54. Annie Elizabeth Hess will not appear until 1840–1850 (b. FEB 1840 — she may or may not be enumerated depending on whether she was born before census day in June 1840).

**Expected race columns:** Same as 1830, with additional columns for occupation (agriculture / commerce / manufactures / etc.), revolutionary pensioners, and "deaf and dumb / blind / insane" tallies.

**1840 Rockingham County, VA — full Smallwood pull**

| Field | Value |
|---|---|
| Year | 1840 |
| State / county | Virginia, Rockingham |
| Roll | M704_572 |
| FamilySearch collection ID | 1786457 |
| Action required | Pull every Smallwood household head. Verify that James Smallwood (b. 1792) household contains: 1 white male 40–49 (James), 1 white female 40–49 (his wife — UNNAMED IN GEDCOM, the second highest-leverage missing data point in the patriline), 1 white male 5–9 (Henry James, b. JAN 1832, age 8), and any siblings of Henry James the GEDCOM has not captured. |

**Bridge-question to test from 1840:**

The GEDCOM has Henry James Smallwood with father James Smallwood (b. 1792) but **no listed mother** — a major gap. The 1840 enumeration of the household, combined with the 1850 census (which lists all individuals by name), should resolve who James Smallwood (1792) married and where she came from. This is one of the highest-leverage findings the census reader can deliver.

---

## 1850 Federal Census — Rockingham VA (first census with all named individuals)

**Targets:**

- **Henry James Smallwood**, age 18, in his father's household
- **Annie Elizabeth Hess**, age 10, in her father Jacob Hess's household (b. FEB 1840 → age 10 in summer 1850)
- **Jacob Hess**, age 64 (b. 1786 → age 64), head of household
- **Adam Kniceley** (b. 1846), age 4, in his parents' household — should reveal Adam's father's name (the GEDCOM has Adam W. Kniceley but no parental link confirmed)
- All other Smallwood households in Rockingham — comprehensive list with names, ages, race classifications

**1850 Rockingham County, VA — Smallwood patriline household pull**

| Field | Value |
|---|---|
| Year | 1850 |
| State / county | Virginia, Rockingham |
| Roll | M432_976 |
| FamilySearch collection ID | 1401638 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1401638&q.residencePlace=Rockingham%2C%20Virginia |

**Expected household composition (James Smallwood, age 58):**

| Name | Age | Sex | Race | Occupation | Real estate value | Place of birth |
|---|---|---|---|---|---|---|
| James Smallwood | 58 | M | W (expected) | Farmer (expected) | TBD | Virginia |
| [wife — name to be discovered] | ~50s | F | W | — | — | Virginia |
| Henry James Smallwood | 18 | M | W (expected) | Farm laborer | — | Virginia |
| [other children — to be discovered] | varies | — | W | — | — | Virginia |

**Race-anomaly check rule for 1850:** Any "M" classification on this household — even a single child marked Mulatto — would be the equivalent of the 1860 Nelson Harrison Clark hit on the Monacan project. **Pull this entry first; transcribe verbatim; do not assume W.**

**Expected household composition (Jacob Hess, age 64):**

| Name | Age | Sex | Race | Occupation | Place of birth |
|---|---|---|---|---|---|
| Jacob Hess | 64 | M | W (expected — Brethren German) | Farmer | Virginia or Pennsylvania |
| Sarah Ann (Anthony) Hess | 43 | F | W | — | Virginia |
| Annie Elizabeth Hess | 10 | F | W | — | Virginia |
| [other Hess children] | varies | — | W | — | Virginia |

**Adam Kniceley (age 4) household pull:** Adam W. Kniceley was born 1846 Rockingham. His parents are not in the GEDCOM. The 1850 census is the only documentary source that can name them. **This is the single highest-leverage missing data point on the maternal Brethren side.** Pull every Kniceley / Knisely / Knisely / Knicely household in 1850 Rockingham; one of them is Adam's father.

---

## 1860 Federal Census — Rockingham VA

**Targets:**
- **Henry James Smallwood**, age 28 — likely on his own by now or newly married. Did he marry Annie Elizabeth Hess before 1860? The GEDCOM does not have an exact marriage date.
- **Annie Elizabeth Hess**, age 20 — single in her father's household, OR married and in Henry James's household
- The merger event: **the 1860 census timing pins down the Smallwood-Hess marriage to within a 10-year window** if not already known

**Race classification flags — TOP PRIORITY:**

The 1860 census is the most diagnostic year for the racial-integrity question per the Monacan precedent. **Any "M" or "B" classification on any Smallwood, Hess, Knicely, Anthony, or Manning household head or member in 1860 Rockingham VA would be load-bearing.** This is the year that Nelson Harrison Clark was caught in Amherst as "M" on the Monacan side — one county over — and the same enumerator network operated in adjacent counties.

**1860 Rockingham County, VA — comprehensive Smallwood / Hess / Kniceley pull**

| Field | Value |
|---|---|
| Year | 1860 |
| State / county | Virginia, Rockingham |
| Roll | M653_1369 |
| FamilySearch collection ID | 1473181 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1473181&q.residencePlace=Rockingham%2C%20Virginia |
| Action required | Pull every Smallwood, Hess, Kniceley/Knicely, Anthony, Loker, and Manning household. Transcribe **race column verbatim for every individual**, even when the expected default is W. Note real estate and personal estate values (1860 schedule has both columns). Note place of birth for parents — 1860 added the "place of birth of father" and "place of birth of mother" data points for the head and spouse, which lets us push one generation deeper than 1850 alone. |

---

## 1870 Federal Census — Rockingham VA (post-war, post-Emancipation)

**Targets:**
- Henry James + Annie Elizabeth Smallwood household — children listed (Hamilton Osborn b. 1864 should be age 6)
- Real / personal property values — wartime destruction impact (Rockingham took moderate damage from Sheridan's 1864 Valley campaign — "the Burning")
- Race classifications — first census after Emancipation; the M classification was still in use; any change from 1860 to 1870 in race on any ancestor is a flag

**Expected household composition (Henry James Smallwood, age 38):**

| Name | Age | Sex | Race | Occupation | Real estate | Personal property | Place of birth |
|---|---|---|---|---|---|---|---|
| Henry James Smallwood | 38 | M | W (expected) | Farmer | TBD | TBD | Virginia |
| Annie Elizabeth Smallwood | 30 | F | W (expected) | Keeping house | — | — | Virginia |
| Hamilton Osborn Smallwood | 6 | M | W (expected) | — | — | — | Virginia |
| [other children — siblings of Hamilton Osborn] | varies | — | W | — | — | — | Virginia |

**1870 Rockingham County, VA — pull**

| Field | Value |
|---|---|
| Year | 1870 |
| State / county | Virginia, Rockingham |
| Roll | M593_1671 |
| FamilySearch collection ID | 1438024 |
| Action required | Pull Henry James Smallwood household; pull every Knicely/Kniceley household (Adam W. Knicely now 24, Martha Loker 25 — they may be married already, or each in parents' household); pull George Robert Knicely (b. 1852, age 18 — likely still in his parents' household and the parental link would be discoverable here); pull every Wiseman household (Sarah Amanda Wiseman b. 1860, age 10, in her parents' household). |

**Civil War service test (H6):** Compare the 1860 and 1870 census heads in Rockingham County. Any male age 18–45 who was in the 1860 census but not the 1870 census — and who has no death record before 1865 — was likely either killed in service or migrated. Henry James Smallwood was 28 in 1860, 38 in 1870 — military-age throughout the war. **Did he serve?** The 1870 census presence/absence and the household property values give the first pass on this question. Confederate service records (Phase 2 erasure-specialist file `03`) give the definitive answer.

---

## 1880 Federal Census — Rockingham VA

**Targets:**

- **Hamilton Osborn Smallwood** (age 16) in parents' household
- **Ida Florence Johnson** (age 11) in her parents' household — Richard James Johnson + Frances Elizabeth Manning. Pull the Johnson household in Port Republic / Rockingham.
- **Elijah Gold Knicely** (age 2) in his parents' household — Adam W. Knicely + Martha Loker
- **Cora Jane** (age 3) in her parents' household — George Robert Knicely + Sarah Amanda Wiseman (per H4 hypothesis: Elijah and Cora Jane were almost certainly cousins; the 1880 enumeration of their two households is the single best test of that)
- **George Robert Knicely** (age 28) household — confirm wife Sarah Amanda Wiseman, confirm Cora Jane is their child

**Expected race columns (1880):** W / B / Mu (Mulatto) / In (Indian) / Ch (Chinese). The Mulatto and Indian categories are still in use. **Any Mu or In hit on a Knicely, Smallwood, Hess, Manning, Johnson, Loker, Wiseman, or Anthony household in 1880 Rockingham is load-bearing.**

**1880 Rockingham County, VA — comprehensive multi-household pull**

| Field | Value |
|---|---|
| Year | 1880 |
| State / county | Virginia, Rockingham |
| Roll | T9_1382 |
| FamilySearch collection ID | 1417101 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1417101&q.residencePlace=Rockingham%2C%20Virginia |
| Action required | Pull all of: Henry James Smallwood (age 48, expected head of household with Annie, Hamilton Osborn 16, plus siblings); Richard James Johnson (age 45, expected head with Frances Elizabeth Manning Johnson and Ida Florence 11); Adam W. Knicely (age 34, expected head with Martha Loker and Elijah Gold 2); George Robert Knicely (age 28, expected head with Sarah Amanda Wiseman and Cora Jane 3). The 1880 schedule includes the relationship-to-head-of-household column for the first time, plus marital status, plus place-of-birth for both parents — making it the richest pre-1900 census for genealogical reconstruction. |

**H4 test (Knicely / Knicely cousin marriage):** If Adam W. Knicely (b. 1846) and George Robert Knicely (b. 1852) are full or half brothers, then their children Elijah Gold Knicely (b. 1878) and Cora Jane Knicely (b. 1877) were first cousins, and the 1900 / 1910 marriage of Elijah and Cora Jane is documented endogamy. The 1880 enumeration — by placing the two Knicely households in or near the same enumeration district, with the parents-place-of-birth column showing common Knicely ancestors — is the cleanest test of this. Pull both households on the same FamilySearch session and compare the parental data side by side.

---

## 1900 Federal Census — Augusta or Rockingham VA

**Targets:**

- **Hamilton Osborn Smallwood** (age 36) + **Ida Florence Johnson** (age 31) — newly married household. They married c. 1894–1900 per the GEDCOM Charles Richard Smallwood birth date (1902). Census timing: the 1900 census is **before** Charles Richard's birth, so the household will not yet contain him. Look for any earlier Hamilton-and-Ida children.
- **Charles Richard Smallwood** (age 0 — too young to appear in 1900; will appear in 1910)
- **Elijah Gold Knicely** (age 22) — own household by now? Possibly newly married to Cora Jane (also 22 in 1900) — though the GEDCOM places their daughter Ethel May at b. 1904, suggesting marriage c. 1898–1903

**Expected race columns (1900):** W / B / In / Ch / Jp. **No Mulatto column in 1900** — this is the one census in the relevant window where the M classification is unavailable, which means a triracial-isolate ancestor would be coded as either W or B with no middle option. Any "B" or "In" hit on a Smallwood, Knicely, Johnson, Hess, Manning, Loker, Wiseman, or Anthony household in 1900 in Augusta or Rockingham is highly load-bearing precisely because the enumerator had no Mu fallback — the choice was forced.

**1900 Augusta County, VA — Hamilton Osborn Smallwood household pull**

| Field | Value |
|---|---|
| Year | 1900 |
| State / county | Virginia, Augusta |
| Roll | T623_1701 |
| FamilySearch collection ID | 1240085 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1240085&q.residencePlace=Augusta%2C%20Virginia |
| Action required | Pull Hamilton Osborn Smallwood (Sangerville district expected, given his 1864 birth there). The 1900 schedule adds month-and-year of birth plus number-of-years-married plus mother-of-how-many-children-living, which gives the firmest possible Smallwood-Johnson marriage date and pre-Charles-Richard sibling count. |

**1900 Rockingham County, VA — Knicely household pulls (parallel)**

| Field | Value |
|---|---|
| Year | 1900 |
| State / county | Virginia, Rockingham |
| Roll | T623_1722 |
| FamilySearch collection ID | 1240085 |
| Action required | Pull Adam W. Knicely (age 54, expected head with Martha Loker and adult/young-adult children including Elijah Gold 22); George Robert Knicely (age 48, expected head with Sarah Amanda Wiseman and adult children including Cora Jane 23). Test whether Elijah and Cora Jane are already married and in their own household by 1900. |

---

## 1910 Federal Census — Augusta or Rockingham VA

**Targets:**

- **Hamilton Osborn Smallwood + Ida Florence Johnson** household with **Charles Richard Smallwood (age 8)**
- **Elijah Gold Knicely + Cora Jane Knicely** household with **Ethel May Knicely (age 6)**

**Expected race columns (1910):** W / B / Mu / In / Ch / Jp / Ot. Mulatto reinstated.

**1910 Augusta County, VA — Hamilton Osborn Smallwood household**

| Field | Value |
|---|---|
| Year | 1910 |
| State / county | Virginia, Augusta |
| Roll | T624_1623 |
| FamilySearch collection ID | 1727033 |
| Action required | Pull Hamilton Osborn Smallwood (age 46) household. Expected composition: Hamilton 46, Ida 41, Charles Richard 8, plus any siblings of Charles Richard. **Race column verbatim for every individual.** Note the 1910 schedule's mother-tongue and parents-mother-tongue columns — for the German Brethren maternal line these can flag whether the family was still German-speaking at home (likely yes for older Knicely / Hess generations; likely no for second-generation Smallwood-Johnson household). |

**1910 Rockingham County, VA — Elijah Gold Knicely household**

| Field | Value |
|---|---|
| Year | 1910 |
| State / county | Virginia, Rockingham |
| Roll | T624_1645 |
| Action required | Pull Elijah Gold Knicely (age 32) household. Expected composition: Elijah 32, Cora Jane 33, Ethel May 6, plus any siblings of Ethel May. **Race column verbatim.** Confirm parental data (place of birth of father and mother) to nail H4 / H5. |

---

## 1920 Federal Census — Augusta or Rockingham VA (premarriage snapshot)

**Targets:**

- **Charles Richard Smallwood** (age 17) likely still in Hamilton Osborn's household
- **Ethel May Knicely** (age 16) likely still in Elijah's household
- This is the **premarriage snapshot** — Charles Richard + Ethel May married 11 DEC 1922 in Hagerstown MD, two years after this census. The 1920 enumeration captures both as teenagers in their natal households, two years before the union that produced Nelson Roudnal Smallwood.

**Expected race columns (1920):** W / B / Mu / In / Ch / Jp. Mulatto still in use.

**1920 Augusta County, VA — Hamilton Osborn Smallwood household**

| Field | Value |
|---|---|
| Year | 1920 |
| State / county | Virginia, Augusta |
| Roll | T625_1879 |
| FamilySearch collection ID | 1488411 |
| Action required | Pull Hamilton Osborn Smallwood (age 56) household. Expected composition: Hamilton 56, Ida 51, Charles Richard 17, plus younger siblings if any. |

**1920 Rockingham County, VA — Elijah Gold Knicely household**

| Field | Value |
|---|---|
| Year | 1920 |
| State / county | Virginia, Rockingham |
| Roll | T625_1903 |
| Action required | Pull Elijah Gold Knicely (age 42) household. Expected composition: Elijah 42, Cora Jane 43, Ethel May 16, plus any siblings. |

**Hagerstown MD context:** The Smallwood-Knicely 1922 marriage was performed in Hagerstown, not in Augusta or Rockingham. Hagerstown was a popular cross-state quick-marriage destination for Virginia couples in this era — the Maryland marriage license requirements were lighter. This is consistent with a young couple marrying without the full Brethren congregational ceremony, possibly indicating tension with the Brethren community over the cross-stream Smallwood (Anglican-origin) / Knicely (Brethren) match. Worth a footnote in the religious / cultural file (`04`).

---

## 1930 Federal Census — Augusta VA

**Targets:**

- **Charles Richard Smallwood + Ethel May Knicely** household with their children including **Nelson Roudnal Smallwood (age 5)**
- Family composition, occupation, real property, home ownership status (1930 added owns / rents and home value columns)

**Expected race columns (1930):** W / Neg / Mex / In / Ch / Jp / Fil / Hin / Kor. **No Mulatto column in 1930** — and "Mex" was added as a race category in 1930 only. **Plecker enforcement era.** Any "In" or "Neg" classification on this household in 1930 Augusta would be load-bearing primary evidence; the absence of an "In" classification on a triracial-isolate household in Plecker-era Virginia is consistent with — and reflects — Plecker's documented policy of forbidding registrars from recording any Indian classification.

**1930 Augusta County, VA — Charles Richard Smallwood household**

| Field | Value |
|---|---|
| Year | 1930 |
| State / county | Virginia, Augusta |
| Roll | 2434 |
| FamilySearch collection ID | 1810731 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=1810731&q.residencePlace=Augusta%2C%20Virginia |
| Action required | Pull Charles Richard Smallwood (age 28) household. Expected composition: Charles Richard 28, Ethel May 26, Nelson Roudnal 5, plus any siblings. **Race column verbatim for every individual.** Note occupation, industry, owns/rents, home value, and "able to read and write" columns. |

---

## 1940 Federal Census — Augusta VA

**Targets:**

- Same household, **Nelson Roudnal Smallwood (age 15)**
- **Race column on every individual.** Same Plecker enforcement context as 1930.
- The 1940 schedule adds residence-five-years-ago, highest grade completed, hours worked last week, weeks worked last year, income — the richest pre-WWII census for socioeconomic profile

**1940 Augusta County, VA — Charles Richard Smallwood household**

| Field | Value |
|---|---|
| Year | 1940 |
| State / county | Virginia, Augusta |
| Roll | T627_4258 |
| FamilySearch collection ID | 2000219 |
| Search URL | https://www.familysearch.org/search/record/results?q.surname=Smallwood&f.collectionId=2000219&q.residencePlace=Augusta%2C%20Virginia |
| Action required | Pull Charles Richard Smallwood (age 38) household. Expected composition: Charles Richard 38, Ethel May 36, Nelson Roudnal 15, plus siblings. The "informant" column (X-mark) tells you which household member actually provided the data to the enumerator — useful for assessing reliability of the race column and other answers. |

---

## 1950 Federal Census — Augusta VA (released April 2022, now public)

**Targets:**

- Charles Richard Smallwood (age 48) — **widower** (Ethel May died 1949). Possibly with surviving children at home.
- **Nelson Roudnal Smallwood (age 25)** — likely in own household by 1950, possibly already married to Lutie Fannie Clark (Monacan project anchor — the marriage that fused the Smallwood and Clark / Monacan lines), possibly in military service. **This census may capture Nelson's household 5 years before his 1955 death in Richmond VA at age 30.**

**Expected race columns (1950):** W / Neg / In / Jap / Chi / Fil / Other. Mulatto and Mexican both removed.

**1950 Augusta County, VA — Smallwood pulls**

| Field | Value |
|---|---|
| Year | 1950 |
| State / county | Virginia, Augusta |
| Roll | TBD (1950 census released April 2022) |
| NARA URL | https://1950census.archives.gov/search/?county=Augusta&state=Virginia&surname=Smallwood |
| FamilySearch collection ID | 4464515 |
| Action required | Pull Charles Richard Smallwood (Mount Sidney area expected). Pull Nelson Roudnal Smallwood as a separate head of household (likely Weyers Cave or Waynesboro area, possibly Richmond — he died in Richmond in 1955; his pre-death residence is one of the most consequential missing data points in the entire Smallwood project). **Race column verbatim for every individual in both households.** This is the last census before Nelson's death and the most immediate documentary source on the household Brady's father (Dennis Eugene Smallwood, b. 1947, age 3 in 1950) was raised in. |

**Brady's father Dennis Eugene Smallwood, age 3 in 1950:** he should appear by name in either Charles Richard's household or Nelson's household. **Which household he is in pins down whether Brady's father lived with Nelson or with his grandparents at age 3** — a question that directly affects family memory of Nelson and the 5 years between Brady's father's birth and Nelson's death.

---

## Race classification anomalies — running flag list

**To be populated from the actual census pulls.** This section is the load-bearing output of the entire census reader file. Every "M" (1850, 1860, 1870), "Mu" (1880, 1910, 1920), "In" (1870 onward), or "B" classification on any direct ancestor or any same-surname-same-county household must be transcribed verbatim with full citation.

| Year | County | Household | Individual | Age | Race column verbatim | Citation | Significance |
|---|---|---|---|---|---|---|---|
| _Pending pull_ | _Pending_ | _Pending_ | _Pending_ | _Pending_ | _Pending_ | _Pending_ | _Pending_ |

**Default assumption to disprove:** every Smallwood, Hess, Knicely, Johnson, Manning, Loker, Wiseman, and Anthony ancestor in 1810–1950 Virginia was classified W. **Any deviation is a finding.** Per the Monacan precedent: a single 1860 "M" on a direct ancestor in Virginia rewrites the entire branch.

---

## Hypothesis disposition (rolling)

| # | Hypothesis | What census evidence will resolve it | Status |
|---|---|---|---|
| H1 | Northern Neck Smallwood origin (Stafford / King George / Spotsylvania → Rockingham) | 1810, 1820, 1830 Spotsylvania + 1830, 1840 Rockingham — the migration corridor. Track James Smallwood (b. 1792 Spotsylvania) across his lifetime censuses. | **Test pending** |
| H2 | Separate-immigrant alternative to H1 | Same evidence — the absence of a Stafford/King George Smallwood cluster matching James (1755) would push toward H2 | **Test pending** |
| H3 | Catherine Clark FFV Carter-Corotoman connection | 1810, 1820 Stafford / King George Clark households — geographic and household-composition adjacency to known Carter-Corotoman households | **Adjacent — primary resolution is in identity reconciler file `05`, not census** |
| H4 | Knicely / Knicely cousin marriage of Elijah + Cora Jane | 1880 Rockingham — Adam W. Knicely and George Robert Knicely households side-by-side with parents-place-of-birth column showing common Knicely ancestor | **Test pending — high confidence going in** |
| H5 | Knicely surname is anglicized German Kneisel | 1900, 1910 Rockingham — mother-tongue and parents-mother-tongue columns | **Test pending — adjacent in religious / cultural file `04`** |
| H6 | Pacifist Brethren stance during Civil War | 1860 vs 1870 Rockingham comparison — Henry James Smallwood and adjacent Knicely / Hess / Wiseman males age 18–45. Presence in both censuses with no military service record = consistent with Brethren conscientious objection. **Smallwood patriline likely separate from Brethren pacifist stance — Henry James was Anglican-origin, not Brethren.** | **Test pending — split between Smallwood (likely military-eligible) and maternal Brethren (likely exempt)** |
| H7 | Plecker-era racial classification scrutiny | 1900–1940 Augusta and Rockingham race columns. **Any non-W classification is load-bearing.** | **Test pending — central question** |
| H8 | Royalty descent claims downstream of H1 | Census cannot resolve royalty descent. Only resolves if H1 holds. | **Downstream — not census-resolvable** |

---

## Highest-leverage next question

**Which 1820 Spotsylvania VA household contained James Smallwood (b. 1792) — and was his widowed mother Catherine Clark Smallwood (b. 1756) still alive on census day 7 AUG 1820, in either the same household or an adjacent one?**

This single 1820 pull is the load-bearing primary source for the entire Northern Neck → Valley migration thesis. It's the closest census to the 1792 death of James Smallwood (1755) the bridge ancestor; it is the only census in which both Catherine Clark Smallwood and her son James Smallwood (1792) could be enumerated as adults in the same year; and it is the cleanest test of whether the Spotsylvania → Rockingham migration the GEDCOM asserts actually happened the way the GEDCOM asserts it. **Pull this one before anything else** — it dominates every downstream finding because it is the hinge between the Northern Neck colonial-era story and the Valley nineteenth-century story.

Second-highest: the 1850 Rockingham household of James Smallwood (b. 1792, age 58) — to discover the unnamed wife (mother of Henry James Smallwood) and verify the slate of Henry James's siblings. The 1850 census is the first to name every individual; it is the first chance to put a name on the woman who married James Smallwood (1792) and bore Brady's direct ancestor Henry James Smallwood. That name unlocks one more maternal surname for the Phase 3 corrections file and potentially an entire additional Valley family connection.

Third-highest: the 1880 Rockingham parallel pull of Adam W. Knicely and George Robert Knicely households — the cleanest documentary test of H4 (the Knicely / Knicely cousin marriage in the next generation). If the 1880 schedule shows both men with the same Knicely father or paternal grandfather, H4 is closed in one extract.
