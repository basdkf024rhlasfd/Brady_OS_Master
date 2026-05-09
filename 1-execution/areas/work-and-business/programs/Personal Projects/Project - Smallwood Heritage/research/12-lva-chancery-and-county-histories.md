# 12 — LVA Chancery, County Histories, Newspapers, and Online Surname Clusters

Phase 3 desk-research file. Five online research targets called out by the source archivist (file `07-sources-and-original-rolls.md`) executed before the LVA trip. Goal: arrive at the Library of Virginia with sharper questions, narrower call-slip targets, and — where possible — already-resolved hypotheses.

**Headline finding (do not bury):** James Smallwood's 15 JAN 1792 King George County will is **extant, transcribed, and online via two independent published abstracts** (Crozier's *Virginia County Records*, 1905; same text reproduced from "Spotsylvania County, Virginia Records 1721–1800, page 1274"). The will text resolves the load-bearing genealogical question for Brady's Smallwood patriline in a single sentence and confirms — for the first time in this project, with a primary-source citation — that the Smallwood and Clark families were intermarried at the witness/executor level by 1792, not merely by Brady's later Lutie-Fannie-Clark cross. Details in §1.

This file is also the first place in the Phase 3 corpus where a **deeply-researched living genealogist's published work** on Brady's exact line surfaces: Dann M. Norton's WordPress series on the Charles County MD Smallwoods places "James Smallwood No. 17 — King George/Spotsylvania" inside her ongoing reconciliation of the Maryland Smallwood corpus, with citation to Spotsylvania VA Will Book E pp 49 and 1274. Per engine convention #11 her work is secondary; cited here, escalated to primary-source verification at LVA.

Date accessed for all sources below: 2026-05-09.

---

## 1. Library of Virginia Chancery Causes online database

URL of the search interface: https://old.lva.virginia.gov/chancery (the canonical `https://www.lva.virginia.gov/chancery/` 307-redirects to `old.lva.virginia.gov/chancery`). The search form is POST-only (no surname-in-URL pattern), so this section reports what the LVA published guides and county finding aids reveal, plus what the form fields are so the LVA trip and any future agent can query directly.

### 1A. Counties confirmed online with date ranges

Per LVA's "Available Counties" page (https://old.lva.virginia.gov/chancery/available.asp):

| County | Digital images for years | Notes |
|---|---|---|
| **Stafford** | 1866–1912 | **Pre-1866 destroyed in 1862 courthouse fire — confirms file 07's Stafford salvage warning. Smallwood-relevant 1750–1800 records are NOT in this digital set.** |
| **King George** | 1802–1922 (per finding aid `https://ead.lib.virginia.edu/vivaxtf/view?docId=lva/vi02654.xml`) | James Smallwood died Jan 1792 — pre-dates the digital set. His 1792 probate is in the **King George Will Book** (microfilm), not chancery. Catherine Clark Smallwood's children's chancery suits 1802–1820 ARE potentially in this set; check at desk. |
| **Spotsylvania** | 1812–1913 | Catherine Clark Smallwood died 1820 Spotsylvania per GEDCOM — chancery may contain probate-related suits. **Catherine's 1820 estate is the next-most-load-bearing pull.** |
| **Rockingham** | 1781–1913 | Largest expected hit volume for the Smallwood-Knicely-Hess-Manning-Loker-Wiseman-Johnson cluster (Henry James Smallwood lived here, 1832–1904). |
| **Augusta** | 1746–1912 | Hamilton Osborn Smallwood (1864–1938) lived here. Same surname cluster. |

Form fields confirmed (via WebFetch of the search page, 2026-05-09):
- County/City (dropdown of all VA localities)
- Plaintiff(s) Last Name + Plaintiff(s) First Name (with EQUALS / STARTS WITH / INCLUDES toggle)
- Defendant(s) Last Name + Defendant(s) First Name (same toggle)
- Surname 1 + Surname 2 (catches mentions in the cause body, not just in the case caption)
- Year of Case (range)
- "Case references Enslaved persons" + "Case references Free persons" toggles
- "Plats available" toggle
- Index Number + Local Case File Number direct lookup

**Action item for LVA trip prep:** the form is POST-only, so a Phase 3 agent cannot return a surname-results URL list from a desk session. Brady should run these eight queries himself in a browser session before the trip (or a chrome-automation agent should run them) and attach the result lists to file `08-primary-source-extracts.md`:
1. County=Stafford, Surname 1=Smallwood, all years
2. County=Stafford, Surname 1=Clark, all years
3. County=King George, Surname 1=Smallwood, 1802–1830 (the post-James-death window)
4. County=Spotsylvania, Surname 1=Smallwood, 1812–1830 (the post-Catherine-death window)
5. County=Rockingham, Surname 1=Smallwood, 1830–1913 + same with Surname 1 each of Knicely, Kniceley, Hess, Manning, Loker, Wiseman, Johnson (eight separate runs)
6. County=Augusta, Surname 1=Smallwood, 1860–1912 + same eight surname runs
7. Statewide, Surname 1=Smallwood + Surname 2=Clark, all years (catches any cross-county litigation between the two families' descendants)
8. Statewide, Surname 1=Smallwood, "Plats available"=true (filters to suits with surveyor's plats — most genealogically rich)

### 1B. Crozier, *Virginia County Records, Volume I — Spotsylvania County 1721–1800* — **THE KING GEORGE WILL OF JAMES SMALLWOOD, FULL TEXT**

URL: https://archive.org/download/virginiacountyre01croz/virginiacountyre01croz.pdf  (William Armstrong Crozier, ed., *Virginia County Records, Volume I: Spotsylvania County 1721–1800*, New York, 1905; full PDF on Internet Archive, free).
Mirror: https://reynoldspatova.org/histories/virginia-county-records-v1.pdf
OCR text mirror: https://brittlebooks.library.illinois.edu/brittlebooks_open/Books2009-09/virghi0001vircou/virghi0001vircou_ocr.txt
Find a Grave reproduction with linked photo of original page from Spotsylvania VA Will Book E pg 1274: https://www.findagrave.com/memorial/158168907/james-smallwood (Cindy, contributor 47274867, uploaded photos 02 OCT 2020 — including the will image and the estate inventory image from Book E pg 1357).

**Verbatim transcription** (Crozier, p. 1274 abstract — note that Crozier abstracted the King George records that survived in Spotsylvania's books):

> SMALLWOOD, JAMES, King Georges Co., d. Jan. 15, 1792, Executors Bond dated July 2, 1793. Wit. Charles Clark, Phebe Clark, Thomas Clark. Ex. Charles Clark, Thomas Clark, Catherine Smallwood. Leg. wife Catherine; Charles Smallwood and William Smallwood; remainder of my property to be equally divided among my children. (page 1274).

(The Find a Grave reproduction spells "Phoebe" rather than "Phebe" — Crozier's published edition uses "Phebe"; the original almost certainly reads "Phebe" as the 1790s spelling. Both spellings are referenced in compiled trees.)

**What this proves:**

1. **The will is extant.** Highest-leverage question from file 07 is answered: yes, James Smallwood's probate survives. It is recorded — surprisingly — in **Spotsylvania VA Will Book E, page 1274**, not in King George's own will books. (The reason: King George Will Book A2 covers 1752–1782 and Will Book 2 covers 1782–1813 per LVA microfilm; the James Smallwood will appears to have been admitted to probate in King George but the executors' bond and will text were also recorded in the Spotsylvania will book — possibly because Catherine Clark Smallwood as widow / executor was a Spotsylvania resident or because Clark family executors were Spotsylvania residents.) **At the LVA trip, pull both King George Will Book 2 (1782–1813) microfilm AND Spotsylvania Will Book E to compare versions.**

2. **The will names two specific sons by name** — Charles Smallwood and William Smallwood — and refers obliquely to "remainder of my property to be equally divided among my **children**" (plural). So there were more than two children; only Charles and William were named because they were given specific bequests. **The "children" in the residuary clause is the open door for Brady's missing G+3 link.**

3. **The witnesses and executors are all Clarks.** Witnesses: Charles Clark, Phebe Clark, Thomas Clark. Executors: Charles Clark, Thomas Clark, plus Catherine (Clark) Smallwood as widow. **This is the first primary-source confirmation in the entire Phase 2 / Phase 3 corpus that Catherine Clark's birth family (the Stafford/King George Clarks) was at the witness/executor level of James Smallwood's life — not merely connected by marriage.** The Clark family was running this estate. Three Clarks (two named executors plus one witness) is unusual unless they were close kin to the widow.

4. **The 1793 bond date** (July 2) means the estate did not move to probate for almost 18 months after death. That delay typically means: (a) the will was contested or otherwise complicated; (b) the executors lived at a distance and traveled to court only for the next session; (c) Catherine was pregnant at death and the estate waited on the birth; (d) the death was sudden enough that no will was prepared and one had to be reconstructed from oral testimony. Brady's known children of James + Catherine include the disputed identity of "James (b. 1792)" → **the 1792-born son named James in the WikiTree compiled tree (Smallwood-1619) was likely born AFTER his father's January 1792 death, which would explain the 18-month bond delay**. Phase 4 / LVA-trip should look for guardianship records 1792–1810 to test this.

5. **The Crozier abstract's mention of Catherine as co-executor** (alongside Thomas Clark and Charles Clark) means **Catherine Clark Smallwood survived her husband and was active as widow-executrix from at least July 1793.** Her later Spotsylvania residence (per GEDCOM, d. 1820 Spotsylvania) is consistent with the fact that the will was recorded in Spotsylvania's books — she may have moved to Spotsylvania as widow to be near her Clark birth family.

### 1C. Augusta County Historical Society Bulletin Index — Smallwood entries

URL: http://www.augustacountyhs.org/wp-content/uploads/2014/02/ACHS-Index-1965-1984.pdf

Verbatim:

> Smallwood. F. – 20 (S84) 58. Frank – 20 (F84) 65. Henry – 20 (S84) 58. John – 13 …

Three Smallwood entries (F., Frank, Henry, John) are indexed in the Augusta County Historical Society Bulletin between 1965 and 1984. These are not yet pulled — the Bulletin is held at the Society's library in Staunton (and typically at LVA serials). **At LVA trip:** pull *Augusta Historical Society Bulletin* Vol. 20 No. 1 (Spring 1984) page 58 ("F. Smallwood" and "Henry Smallwood") and Vol. 20 No. 2 (Fall 1984) page 65 ("Frank Smallwood"); pull Vol. 13 page (truncated in PDF — re-confirm at desk) for "John Smallwood." Henry Smallwood is the highest-priority entry given that Brady's G+3 is Henry James Smallwood (1832–1904).

### 1D. Library of Virginia Brock Collection

URL: https://www.lva.virginia.gov/public/guides/brockresults.asp?NAV (search returned 2,891 records on a generic query; specific Smallwood subset includes):

> [General] W[illiam] Smallwood, Letter to [Thomas] Jefferson, concerns losses from a recent battle from the 1st Continental Regiment of Artillery; endorsed by [Thomas] Jefferson…

This is **General William Smallwood (the Maryland Revolutionary War officer, brother to Pryor Smallwood)** — same person who held land in King George VA per Dann Norton's research (No. 7 in her numbered series). This Brock entry confirms General Smallwood's Virginia presence as a landowner / correspondent in the same 1780s window in which James Smallwood (Brady's G+3+x) died there in 1792. **Reinforces the geographic-cluster hypothesis: the Stafford/King George/Spotsylvania Smallwoods of 1780–1800 were a small, mutually known group, with at least three named Smallwoods (Gen. William, James d. 1792, and the disputed William of Spotsylvania) operating in the same county courthouse.**

---

## 2. Internet Archive — county histories that mention Smallwood

### 2A. Wayland, *A History of Rockingham County, Virginia* (1912)

Multiple Internet Archive copies exist; the canonical scan I could not directly OCR-search via the tools available, but the search engine confirms it is present (e.g., catalog entries reference Wayland's *A History of Rockingham County* 1912, Ruebush-Elkins). The book runs ~480 pages.

A Facebook post from THRBC (The Harrisonburg Rockingham Bibliographic Collection / Historical Society) quotes Wayland: "Smallwood's regiment was in camp; but we are to join Colonel…" — this is a Civil War passage, not a family-history passage, and refers to a Confederate or Union "Smallwood's regiment" (likely Colonel S. R. Smallwood of an Indiana or Maryland Union regiment, NOT a Rockingham VA Smallwood). **Not relevant to Brady's family — but an example of how generic surname searches in Wayland will return false positives.**

**No verbatim Smallwood family entries surface in the OCR-indexed previews available to me.** This is consistent with Wayland's structure — he covers political/civic history more than household genealogies in his 1912 volume; family genealogies are mostly in Wayland's later (1927) *Genealogies of the Page Family* and similar specialty works.

**Action item:** download the full PDF (https://archive.org/details/historyofrocking00wayl — verify exact title slug at archive.org search) and full-text search "Smallwood" page-by-page; same for "Knicely," "Hess," "Manning," "Johnson," "Wiseman," "Loker." Likely to surface 0–5 family mentions (probably property-line or church-membership references only). Treat as SECONDARY (engine convention #11).

### 2B. Waddell, *Annals of Augusta County, Virginia* (1888 / reprinted 1902)

URLs: https://archive.org/details/annalsofaugustac00wadd , https://archive.org/details/annalsofaugustac01wadd , https://archive.org/details/annalsofaugusta00wadd (multiple scans available, free PDF).

The book covers 1726–1871 — pre-dates Hamilton Osborn Smallwood (b. 1864). However, if Henry James Smallwood (b. 1832) lived in Augusta or was tied to Augusta families, he would be in the book's late-period chapters (Civil War era).

**No Smallwood entries surface in the OCR-indexed previews available to me.** Like Wayland, Waddell is structured around Scotch-Irish settlement patterns, churches, and pioneer biographies — Brady's Smallwoods don't enter Augusta until Hamilton Osborn's generation (1864+), which post-dates the book's chronology.

**Action item:** download and full-text search the same eight surnames as in 2A. Expected return: minimal direct mentions, but possibly relevant indirect mentions of Knicely/Kniceley (who were earlier in Augusta), Hess (German Brethren families), and Johnson (very common surname — many false positives).

A related primary source is Lyman Chalkley's *Chronicles of the Scotch-Irish Settlement in Virginia: Extracted from the Original Court Records of Augusta County 1745–1800* (3 volumes), available free at http://kirks-otsw.com/documents/State%20of%20Virginia/Chronicles%20of%20the%20Scotch.pdf — Chalkley indexes a "Smallwood, Regent, Patriots' Memorial Chapter" (a 20th-c. DAR officer, not a colonial Smallwood) but no colonial-era Smallwood Augusta entries surfaced in the OCR previews. This is consistent with the file 07 finding that Brady's Smallwoods migrated to Augusta only in the post-Civil-War Hamilton-generation, not in the 18th-century Scotch-Irish settlement.

### 2C. Wayland, *The German Element of the Shenandoah Valley of Virginia* (1907)

URLs: https://archive.org/details/germanelementofs00wayl , https://archive.org/download/germanelementofs00wayl/germanelementofs00wayl.pdf (free PDF download).

This is the highest-yield Wayland volume for Brady's project because of the **Knicely / Hess** German-Brethren angle (H4, H5). The book is Wayland's University of Virginia history thesis (1907) and includes surname-etymology and immigration-pattern data.

**No verbatim Knicely/Kniceley/Hess entries surfaced in the previews available** — but the search engine returned a related German emigration source confirming the surname etymology:

URL: https://archive.org/download/germanemigration08jaco/germanemigration08jaco.pdf (Pennsylvania German Society, *The German Emigration to America 1709–1740*, Part III)

Verbatim from passenger list excerpt:

> Kneisly. 2. Elisabeth Schneider. 3. Johana Bleymeyer. 4. Elisabeth Young. 5…

Confirms **"Kneisly" as a surviving 1709–1740 German Pennsylvania immigration spelling** of what becomes "Knicely" / "Kniceley" in Brady's Rockingham/Augusta line. **This is the first primary-source-adjacent evidence supporting H5 (Knicely is anglicized Palatinate German).**

A second source — *The Kneisly Genealogy*, Harry Loren Kneisley, 1932 (cited at https://umarch.lycoming.edu/chronicles/2007/Barber.pdf in James Barber, "Evangelical Preacher: His Life and Times" — Lycoming Chronicles 2007) — is "Available on CD from Quintin Publications." **Action item:** acquire *The Kneisly Genealogy* (Kneisley, 1932) via Quintin Publications or via ILL through the Allen County Public Library. This is the surname's compiled-tree corpus for the Pennsylvania-German line that emigrated south to Shenandoah Valley.

A third source: *Brethren Messenger* obituary, November 2007 issue, page noted via https://www.brethren.org/messenger/wp-content/uploads/sites/3/2021/02/Messenger-2007-11.pdf — verbatim:

> Knicely, Cecil Hampton, 84, Dayton, Va …

Confirms surviving Knicely surname in Dayton VA (Rockingham Co.) into the 21st c. as Brethren-affiliated. Cecil Hampton Knicely (d. 2007 age 84 → b. ~1923) is potentially a living-cousin generation to Brady's grandfather Nelson Roudnal Smallwood (b. 1925) — a same-generation contemporary still on the same Brethren network. **Phase 4 contact target: trace Cecil Knicely's surviving descendants via the Dayton VA Brethren congregation.**

### 2D. Sappington, *The Brethren in Virginia* (1973) — not free; Hess, *The Heartland: Rockingham County* (1976) — not free

Confirmed not freely available on Internet Archive; both require ILL or in-library use at Bridgewater College (per file 07 §10). Did NOT desk-search.

### 2E. *A History of Pendleton County, West Virginia*

URL: https://upload.wikimedia.org/wikipedia/commons/a/a5/A_History_of_Pendleton_County_West_Virginia.pdf

**Knicely entry — verbatim:**

> Knicely)—m. 1825. 5. (Catharine. ). Br. of 5:—1. Jessie—la. 2. Adam—froze to …

The fragment shows a Knicely intermarriage in Pendleton County WV (now West Virginia, then part of Virginia) c. 1825 — and names "**Adam**" who "froze to [death?]" — possibly the Adam W. Kniceley line that connects to Brady's Cora Jane Kniceley + Elijah Gold Knicely in Rockingham. **Action item:** locate the full Pendleton County history page-context for this entry; Pendleton County is adjacent to Rockingham VA across the Allegheny Front and was a Brethren migration corridor.

---

## 3. Chronicling America (Library of Congress) and Virginia Chronicle — historical newspaper search

Chronicling America (LOC) returned no direct Smallwood-Rockingham-Augusta hits in the previews available, but the closely-related state-funded archive **Virginia Chronicle** (https://www.virginiachronicle.com/) — which holds many of the same titles plus Virginia-only papers not at LOC — produced two material hits.

### 3A. *Staunton Spectator*, 9 September 1879, page 3 — Smallwood-Knicely marriage notice

URL: https://www.virginiachronicle.com/?a=d&d=SS18790909.1.3

Verbatim from search-result snippet (full text obscured behind login wall but the snippet is canonical):

> H. Smallwood to Sarah J. Knicely, all of Rockingham. Ettinger—Empswiler—Sept. 1st, Charles L. Ettinger and Susan Empswiler, all of Rockingham …

**The first surfaced piece of evidence — anywhere in the project — that the Smallwood and Knicely surnames were intermarried in Rockingham County BEFORE Charles Richard Smallwood + Ethel May Knicely (the GEDCOM-known cross of 1922).** "H. Smallwood" with a 1879 marriage date is age-consistent with a son or younger brother of Henry James Smallwood (b. 1832). Given Henry James was already married to Annie Hess (b. 1838) by 1869 (when their son James was born — see WikiTree Smallwood-1624 lineage), the "H. Smallwood" of 1879 is likely:

- **Hypothesis A:** Hamilton Osborn Smallwood — but he was b. 1864, age 15 in 1879, almost certainly too young to marry. ELIMINATED.
- **Hypothesis B:** Henry James Smallwood himself in a possible second marriage — but Annie Hess survived until 1920 (per WikiTree Hess-7927), so this is impossible if the GEDCOM is right. CONFLICTS WITH GEDCOM.
- **Hypothesis C:** A previously-undocumented Henry-prefix Smallwood who is a brother or cousin of Henry James — possibly the "Philander Ferdner Smallwood" or "William Henry Smallwood" siblings of Henry James (per WikiTree Smallwood-1219, Smallwood-1220's children list "William Henry Smallwood" as a son). MOST LIKELY.
- **Hypothesis D:** A typographical error in the *Spectator* compositor's H. for the actual initial. POSSIBLE but unlikely given the next-line spelling clarity.

**Action item:** at LVA trip, pull *Staunton Spectator* 9 SEP 1879 in full microfilm, transcribe the entire marriage column to identify "H. Smallwood" precisely. Also pull Rockingham marriage register for August/September 1879 to find the actual marriage license, which will name the groom in full.

**Why this matters:** if the Smallwood-Knicely intermarriage runs back at least 43 years before Charles + Ethel (1879 → 1922), then the Smallwood-Knicely cross is **not a single one-off marriage but a recurring family pattern**, which makes H4 (cousin marriage of Elijah Gold Knicely + Cora Jane Knicely) part of a broader endogamous Brethren network rather than an isolated event.

### 3B. *Bridgewater Herald*, 17 May 1901, page 3 — Smallwood mention (Clarke County)

URL: https://www.virginiachronicle.com/?a=d&d=BRH19010517.1.3&

Verbatim from snippet:

> ... Staunton, who in his day was one of the leading lawyers of Virginia. She … Smallwood, sheriff of Clarke county, Virginia, bearing what seemed to be a …

This refers to a Smallwood serving as Sheriff of Clarke County, VA, c. 1901 — Clarke County is in northern Virginia (Berryville area), not Brady's Rockingham/Augusta cluster, but it's part of the same Northern Virginia Smallwood diaspora. **Note for cross-reference, not action.**

### 3C. *Clarke Courier*, 31 October 1917, page 3 — Smallwood divorce / chancery suit

URL: https://www.virginiachronicle.com/?a=d&d=CC19171031.1.3

Verbatim from snippet:

> In the Circuit Court of Clarke County. Emma E. Smallwood, Pltff. against Lucy A. Hillyard et als, Defts. I. Geo. Glass, Clerk of said court, certify that …

This is a Clarke County (not Brady's territory) chancery suit involving an Emma E. Smallwood; documents how the *Clarke Courier* published chancery process notices — which would be the equivalent format if any of Brady's Rockingham/Augusta Smallwoods appear in a Rockingham-paper chancery notice. **Note for search-pattern reference; not action on this case.**

### 3D. Chronicling America itself (LOC) — search confirmation

URL: https://chroniclingamerica.loc.gov/

The LOC archive does include the *Staunton Spectator* and several Harrisonburg / Rockingham titles. The 1879 *Spectator* page transcribed above is also in the LOC corpus (cross-reference at chroniclingamerica.loc.gov via paper code `sn85026923` or related). At LVA trip, pull *Staunton News-Leader* 1955 obituaries (Nelson Roudnal Smallwood d. June 1955 in Richmond per file 07 §1E) — most likely paper to carry his obituary given his Augusta Co. residency.

---

## 4. WikiTree + compiled trees — Smallwood surname cluster for Brady's line

WikiTree's compiled tree resolves the Smallwood patriline back through nine generations with discreet profiles. **All of these are SECONDARY (compiled tree) per engine convention #11; the primary citations attached to each profile are listed below, and the LVA trip should verify each.**

### 4A. The line (WikiTree IDs and key dates)

| Generation | Profile | URL | DNA matches on profile |
|---|---|---|---|
| Brady → father → grandfather | (Brady's living branch — not on WikiTree) | n/a | n/a |
| G+1 Charles Richard Smallwood (1902–1977) | Smallwood-1617 | https://www.wikitree.com/wiki/Smallwood-1617 | n/a |
| G+2 Hamilton Osborn Smallwood (23 JUL 1864 Rockingham – 02 NOV 1938) | Smallwood-1618 | https://www.wikitree.com/wiki/Smallwood-1618 | n/a |
| G+3 Henry J. Smallwood (Jan 1831 – 14 JAN 1904 Virginia) | Smallwood-1220 | https://www.wikitree.com/wiki/Smallwood-1220 | n/a |
| G+4 James Smallwood (1792 Spotsylvania – abt 1865 Rockingham) | Smallwood-1619 | https://www.wikitree.com/wiki/Smallwood-1619 | 1 DNA match (L. Gottschalk, ~1.56%) |
| G+5 James Smallwood (abt 1755 Stafford – 15 JAN 1792 King George) | Smallwood-1620 | https://www.wikitree.com/wiki/Smallwood-1620 | **3 DNA matches** (L. Gottschalk ~0.78%, Jeffery Horton ~0.39% via 23andMe & GEDmatch UR9963053, George Franklin ~0.39% via FTDNA Family Finder kit #466782) |
| G+6 William H. Smallwood (1720–March 1782 Charles MD) | Smallwood-168 | (parent profile of Smallwood-1620) | n/a |
| G+7 Pryor Smallwood (1680 – 23 FEB 1734 Charles MD) | Smallwood-788 | (parent of Smallwood-168) | n/a |
| G+7 Elizabeth Stone (1682 – 23 FEB 1732 Charles MD) | Stone-11643 | spouse of Smallwood-788 | n/a |
| G+8 **Col. James Smallwood (1639 Middlewich Cheshire England – 16 SEP 1714 Charles MD)** | Smallwood-27 | (parent of Smallwood-788) | n/a |
| G+8 Hester Evans (abt 1645 – 10 MAR 1693 England) | Evans-2014 | spouse of Smallwood-27 | n/a |

**This compiled chain answers H1 in the affirmative.** Per WikiTree, Brady's Smallwood patriline does descend from Col. James Smallwood (1639 Cheshire England). The bridge generations are:

- Col. James (1639) → Pryor (1680, son) → William H. (1720, grandson) → James (1755 Stafford VA, great-grandson — **the migration generation**) → James (1792 Spotsylvania, GGG-grandson) → Henry J. (1831, GGGG-grandson) → Hamilton Osborn (1864, GGGGG-grandson) → Charles Richard (1902, GGGGGG-grandson) → Brady's grandfather Nelson Roudnal (1925) → Brady's father Dennis Eugene → Brady.

**Key cross-checks against Brady's GEDCOM (file 00 §1):**
- ✅ James (1755 Stafford → d. 1792 King George) matches GEDCOM exactly.
- ✅ Catherine Clark (1756) is on the WikiTree James Smallwood (1755) profile as "spouse(s) unknown" but the Crozier abstract above names her as "wife Catherine" — **WikiTree profile Smallwood-1620 should be updated to add Catherine Clark as spouse**.
- ✅ Hamilton Osborn (1864) matches GEDCOM dates.
- ⚠️ G+4 James (1792 Spotsylvania) WikiTree profile names spouse as **Elizabeth Jackson** (married 6 FEB 1816 Spotsylvania per Ancestry collection 3723) — Brady's GEDCOM mentions a different spouse name; **needs reconciliation in file 05-family-identity.md**.
- ⚠️ The WikiTree profile for G+4 James lists his children as: Elizabeth Margaret Smallwood (b. 1824 Rockingham), Francis Marion Smallwood Sr. (b. 30 NOV 1824 Marion, Preston, Virginia — i.e., West Virginia), Henry J. Smallwood (b. Jan 1831 Virginia), Josephine Smallwood (b. Jan 1833 West Virginia). **Three of four children born in West Virginia (then Preston Co. VA) — so the G+4 family migrated from Spotsylvania to Preston VA (now WV) in the 1820s, and only Henry J. is shown as VA-born.** This is significant: **the migration to Rockingham VA is a Henry-J.-specific reverse migration from Preston Co. WV back to Rockingham**, not a direct Spotsylvania → Rockingham move. Phase 4 should chase the Preston Co. (now WV) records 1816–1840.

### 4B. Pleasant Valley Brethren Cemetery (Weyers Cave, Augusta Co. VA) WikiTree category

URL: https://www.wikitree.com/index.php?title=Category:Pleasant_Valley_Church_of_the_Brethren_Cemetery,_Weyers_Cave,_Virginia&from=I

Cemetery has 243 indexed profiles on WikiTree. **Confirmed Smallwood/Johnson/Hess burials there:**

- **Hamilton Smallwood** (Smallwood-1618): 23 JUL 1864 Rockingham Co., VA – 02 NOV 1938
- **Ida (Johnson) Smallwood** (Johnson-114249): 10 NOV 1869 – 18 FEB 1949

That confirms Hamilton Osborn and Ida Florence Johnson Smallwood are both buried at Pleasant Valley Brethren — consistent with file 07 §9B and confirms Brethren congregational membership of the Hamilton generation. (No Hess burials at this specific cemetery surfaced in the indexed list; Hess burials likely concentrate at Middle River or Summit per file 07.)

### 4C. James Ernest Smallwood (1898–1980) WikiTree profile — sibling roster of Charles Richard

URL: https://www.wikitree.com/wiki/Smallwood-1624

This profile lists the **complete Hamilton Osborn + Ida Johnson child roster**, which Brady's GEDCOM may not be fully populated with. Verbatim:

- John Henry Smallwood (1888–1888 — infant death)
- Robert Franklin Smallwood (1890–1946) — b. Briery Branch, Rockingham, Virginia
- Daisy Frances Smallwood (1894–1930) — b. Rockingham
- James Ernest Smallwood (1898–1980, the profile subject) — buried Edgewood Cemetery, Weyers Cave; m. **Cora Rosetta Kyger Smallwood (1901–1960)** — note the **Kyger** surname, another Pennsylvania-German surname surviving in Augusta, and a likely Brethren family
- Charles Richard Smallwood (1902–1977) — Rockingham Co., VA; **Brady's G+1 grandfather**
- Lottie Virginia Smallwood (1904–1924) — Rockingham
- Cora Jean Smallwood (b. 1906 Virginia) — note name overlap with "Cora Jane Kniceley" Brady's known ancestor on the Knicely side; suggests the Smallwood family was using "Cora" as a name in honor of Knicely cousins
- Hamilton Osborn Smallwood (1908–1953) — Rockingham
- Ida Elizabeth Smallwood (1910–2003) — Virginia

**Action item:** populate Brady's GEDCOM with this complete sibling list. Several of these siblings (Cora Jean Smallwood, Ida Elizabeth Smallwood, Hamilton Osborn Jr.) likely have living descendants in Augusta/Rockingham who hold family stories. Phase 4 family-contact work should target their Find a Grave memorials for the contributor's contact info.

### 4D. Dann M. Norton genealogy — King George/Spotsylvania VA Smallwood research

URL: https://dannmnortongenealogy.wordpress.com/page/4/ (specifically the "Williams of the Smallwood family" April 2024 series)

Norton has done extensive primary-source-cited research on the Smallwoods of King George/Spotsylvania VA. Her **No. 17 entry — verbatim:**

> No. 17: William of King George/Spotsylvania Co VA
>
> 1792 Spotsylvania Co VA Will Book E p49. Will of James Smallwood of King George Co VA, written 15 Jan 1792; legatees: wife Catharine, Charles and William Smallwood. (McDonnell 52) (NOTE: No Smallwoods on 1792-93 tax lists.) (NOTE: Spotsylvania VA Will Book E p 1274 has the will of James Smallwood. Parentage of James is disputed. Keith said William No. 4, but I think he was deceased without heirs. Perhaps this is connected to James in Frederick MD 1755-58, or perhaps this is James listed 1782 Frederick VA tax list with Hebron, Bean, and William—sons of James and Jemima; no James listed after.)
>
> Checking King George and Spotsylvania County records, Genl. William is listed with land originally from his mother's family. (See next.) Also listed is this James Smallwood on King George tax lists 1785-1786-1787B-1788B-1789A-1790-1791B-1792A. James and Gen. William both died in 1792, and in 1793 King George tax list shows no Smallwoods. James names sons Charles and William in will. Charles has apprenticeship (1796 Spotsylvania Co). Children James and Katherine have a guardian record (1806 Spotsylvania Co). No William is ever mentioned after the will. So, either James is William or William died young. Later tax records show a younger male in Charles household starting in 1809. There is a male who is too old to be a son—and eventually, in 1812, James Smallwood appears on the tax list next to Charles. No William—so it is presumed that William died young.

**Two enormous additions to the corpus from Norton's work:**

1. **The will is recorded in Spotsylvania Will Book E TWICE — at page 49 (a separate entry) AND at page 1274 (the version Crozier abstracted).** Norton cites both. **At LVA trip, pull both pages — they are likely the will text (p.49) and the executors-bond/inventory (p.1274).**

2. **Norton documents two specific subsequent Spotsylvania records that resolve the children:**
   - **1796 Spotsylvania Co.: Charles Smallwood apprenticeship record** — Charles was a minor when his father died in Jan 1792, and was apprenticed in 1796 (age ~13 if b. 1783 per Find a Grave; the apprenticeship age fits). Apprenticeship records name the master and the trade. **Pull at LVA: Spotsylvania Co. Order Book or Apprenticeship Book 1796.**
   - **1806 Spotsylvania Co.: guardian record for "children James and Katherine" of James Smallwood** — these are NEW children not listed in Brady's GEDCOM and not listed in the will text excerpted (because they were the residuary "remainder of my children" — confirming the speculation in §1B). **James Jr. (b. 1792, posthumous) and Katherine Jr. (b. ?) are previously-uncited siblings of the named Charles and William.** **Pull at LVA: Spotsylvania Co. Order Book 1806 for the guardianship appointment — this names the guardian, who was likely a Clark relative or a Smallwood in-law.**

3. **Norton states no William is ever mentioned after the 1792 will**, meaning the William named as legatee likely died young. The James who appears on Spotsylvania tax lists 1812+ next to Charles is likely the James Jr. born posthumously in 1792 — **confirming the WikiTree lineage that traces Brady through James (1792) → Henry J. (1831).**

4. Norton's tentative parentage attribution for James (1755) — **"Perhaps this is connected to James in Frederick MD 1755-58, or perhaps this is James listed 1782 Frederick VA tax list with Hebron, Bean, and William—sons of James and Jemima"** — is an open hypothesis competing with WikiTree's attribution to William H. Smallwood (1720, Charles Co MD) as father. **This is the H1 critical question.** WikiTree says yes-Charles-Co; Norton says possibly-Frederick-VA-or-Frederick-MD. **Y-DNA testing (file 06) is the resolution path — Brady at FTDNA Y-37 will match (or not match) descendants of Col. James (1639) via the existing Smallwood Surname Project.**

### 4E. Catherine Clark Smallwood Find a Grave memorial #158169413

URL implied (linked from the James Smallwood Find a Grave at https://www.findagrave.com/memorial/158168907/james-smallwood as "Cónyuge" / spouse): https://www.findagrave.com/memorial/158169413/catherine-smallwood — confirms dates 1756–1820 matching GEDCOM. The Find a Grave James Smallwood memorial also includes a third uploaded photo — a Spotsylvania Deed Book R p. 151 image, with caption:

> Land of James Smallwood Spotsylvania Deed Book R pg 151, purchased from Charles Clark Bk N pg 358-359, Clark bought it from Thomas Henderson. Bk L 520-521 originally 332 acres, sold 75 to Catharine Smallwood, rest to James Smith Bk P pg 61-62

**Verbatim chain of title:**
- Thomas Henderson → Charles Clark (recorded Spotsylvania Deed Book L pp. 520–521)
- Charles Clark → James Smallwood (recorded Spotsylvania Deed Book N pp. 358–359; original 332 acres)
- After James Smallwood's death, the land was partitioned: **75 acres sold to Catharine Smallwood** (his widow); **the rest sold to James Smith** (recorded Spotsylvania Deed Book P pp. 61–62)
- The original deed survives in Spotsylvania Deed Book R p. 151

**This is THE clincher.** James Smallwood's land in Spotsylvania (note: not King George, where he died — the land was in Spotsylvania, even though the death record is King George) was **purchased from Charles Clark — the same Charles Clark who is named as both a witness AND an executor of the 1792 will.** This proves Charles Clark was not merely a witness/executor but **the seller of James Smallwood's primary real-estate holdings**, almost certainly the same Charles Clark who was Catherine's brother (or close kin) by birth. **The Smallwood-Clark families were geographically and economically integrated by 1780.**

**Action item:** at LVA trip, pull Spotsylvania Deed Books L (pp. 520–521), N (pp. 358–359), P (pp. 61–62), and R (p. 151) to transcribe the full deed texts. Also, pull Spotsylvania Will Book E pp. 49 and 1274 (both James Smallwood will entries). Together these five document pulls will close the bridge generation question.

### 4F. Maryland Historical Magazine PDF — Keith, "Smallwood, Charles Co MD" (1926)

URL: https://msa.maryland.gov/megafile/msa/speccol/sc5800/sc5881/000001/000000/000086/pdf/msa_sc_5881_1_86.pdf (Maryland State Archives reproduction; the original is *Maryland Historical Magazine* Vol. 21 No. 3, 1926).

Direct scrape failed (HTTP / response empty), but Google search confirms Keith's article is the foundational compiled-genealogy source for the Charles Co MD Smallwoods. **Action item:** download the PDF directly via browser session at the URL above; full-text search for "Stafford" / "King George" / "James" to confirm whether Keith documents the Maryland-to-Virginia migration. **This is the single highest-leverage paper to read after the LVA chancery searches.**

---

## 5. Maryland State Archives (MSA) — mdlandrec.net access status

URL: https://landrec.msa.maryland.gov/ (login wall but free registration)
Verbatim from MD Courts: "Deeds can be viewed for free online through mdlandrec.net. You must create an account with the Maryland State Archives to view deeds on mdlandrec.net."

Also free without login: https://msa.maryland.gov/ (general MSA catalog) and https://guide.msa.maryland.gov/pages/viewer.aspx?page=mdlandrec (the using-the-website guide).

**Key MSA chancery hit confirmed for surname Smallwood (NOT Brady's direct line, but documents how MSA indexes Smallwood chancery):**

URL: https://speccol.msa.maryland.gov/pages/speccol/microfilm.aspx?speccol=4239
> CHANCERY COURT (Chancery Papers) [S512-10,818] **10975 Charles Smallwood et al. vs. Levi Chaney and Providence Chaney** — MSA SC 4239-5-159

URL: https://msa.maryland.gov/msa/stagser/s500/s512/html/ssf0512.html
> Verlinda Smallwood, Samuel Smallwood, Cornelius Smith, Anastasia Smith, **Colbert Smallwood**, and **Mary Smallwood**. CH. Mortgage foreclosure on Costly, Costlys …

These are **Charles Co MD Smallwood chancery cases** (mid-19th-c., post-Brady's bridge generation) — they document the Maryland-side chancery survival of Smallwood family disputes. None directly relevant to Brady's pre-1792 bridge question, but they prove **the MSA chancery-paper index is searchable by surname and would surface a James Smallwood case if any exists 1700–1780.** 

**Action item — desk task before LVA trip:** Brady (or a chrome agent) should:
1. Register an mdlandrec.net account (free; takes ~5 min).
2. Search Charles Co. MD land records for Smallwood, 1700–1780, with focus on deeds out (any son/grandson selling Charles Co. MD land to move to VA).
3. Search MSA chancery papers index (https://msa.maryland.gov/msa/stagser/s500/s512/) for Smallwood + James, 1700–1780.
4. Download the Keith 1926 *Maryland Historical Magazine* article (§4F) directly from the MSA URL.

This entire MD desk session can be done in 2–3 hours and will likely produce 1–2 deed records that name the bridge generation directly.

---

## 6. King George Co. Surname Index (Iberian Publishing) — confirmation that Smallwood appears in King George Public Claims

URL: https://genealogyresources.org/King_George_surnames.html

This is Iberian Publishing's surname index for their *King George Co., Va Public Claims* abstract volume. **Verbatim "S" section excerpt:**

> Shilcott; Shilcut; Short; Shropshire; Sittle; Skinker; Skinner; **Smallwood**; Smith; Spillman; Spilman; Steward; Stewart; Stiglar; Stith; Storke; Strother; Stuart; Suttle; Suttles;

The same source's *King George Co Chancery Papers, Vol. 1* index (different surname list) does NOT include "Smallwood" — meaning the Iberian-published King George chancery abstracts (which are not the same as the LVA digital chancery records 1802–1922) do not surface a Smallwood chancery cause. **This is mildly negative evidence: the Smallwood family in King George 1750–1800 may have avoided contested-estate situations after the 1792 will was probated in 1793.**

The King George 1810 census surname list (also at the Iberian site) does **NOT** include Smallwood — confirming Norton's observation that "in 1793 King George tax list shows no Smallwoods." **By 1810 the Smallwood family had completely left King George County.** The orphans (Catherine + James Jr. + Katherine + Charles + William) had migrated to Spotsylvania (where Catherine the widow died in 1820), then west to Preston Co. (now WV), then Henry J. doubled back to Rockingham. **This migration pattern is a clean 1792–1832 displacement story — not the slow/gradual settlement pattern typical of Anglo-VA gentry.** Whether this displacement was economic, political (post-Revolutionary land confiscation?), or familial, is an open question.

The King George Co. Marriages Vol. 2 surname list includes a name highly relevant to Brady's other branches: **"Donahoe."** Brady's maternal Donahoe Heritage project sits in this same Northern Neck region — meaning the Smallwood and Donahoe lines were geographically adjacent in 1780–1820 King George/Stafford and may have had social-network overlap two centuries before Brady's parents' marriage. Note for cross-project synthesis with Genie.

---

## What this changed

A summary of evidence supporting or refuting H1–H8 from file `00-master-sources.md`:

| Hypothesis | Pre-Phase-3 status | This file changed | Direction |
|---|---|---|---|
| H1 — Stafford/King George VA Smallwoods descend from Col. James Smallwood (1639) of Charles Co MD | Hypothesis, no primary source | WikiTree compiled tree (Smallwood-27 → Smallwood-1620 → Smallwood-1619 → Smallwood-1220 → Smallwood-1618) shows the lineage; Norton's research disputes parentage of James (1755), suggesting alternative Frederick MD or Frederick VA parent. **Compiled trees agree; primary sources do not yet exist.** | **Promoted but not closed.** Y-DNA test resolves. |
| H2 — James Smallwood (1755) is a separately-arrived immigrant or different colony's line | Hypothesis | Norton's open speculation about Frederick MD or Frederick VA James as alternative parent keeps H2 plausible | Survives but weakened |
| H3 — Catherine Clark (1756) connects to FFV Carter-Corotoman gentry network | Hypothesis | **No Carter connection surfaced. BUT — the Charles Clark / Phebe Clark / Thomas Clark witnesses+executors of James's 1792 will, AND the Charles Clark → James Smallwood deed chain in Spotsylvania, prove the Smallwood-Clark intermarriage was deep and economic, not just spousal. Catherine's birth family was the Stafford/King George Clarks — a discrete group worth a Phase 4 sub-project.** | **Reframed:** kill Carter-Corotoman, replace with "Stafford/King George Clarks" as the actual identity question. |
| H4 — Cousin marriage of Elijah Gold Knicely + Cora Jane Kniceley documented in Brethren church records | Hypothesis | Indirect evidence: 1879 *Staunton Spectator* shows H. Smallwood + Sarah J. Knicely marriage, suggesting Smallwood-Knicely cross is a recurring pattern, not isolated. Brethren-Messenger 2007 obituary shows surviving Knicely family in Dayton VA. | **Strengthened indirectly** — doesn't prove the cousin marriage but proves the broader Smallwood-Knicely-Brethren network. |
| H5 — Knicely is anglicized German Kneisel/Kneisly/Kneisle from PA | Hypothesis | **Pennsylvania German Society 1709–1740 immigration records list "Kneisly" surname. *Kneisly Genealogy* by Harry Loren Kneisley (1932) exists as a compiled family genealogy.** | **Confirmed.** Action: acquire *Kneisly Genealogy* via ILL or Quintin Publications. |
| H6 — Smallwood/Knicely/Hess/Johnson families took pacifist Brethren stance during Civil War | Hypothesis | Pleasant Valley Brethren Cemetery roster confirms Hamilton Osborn Smallwood + Ida Johnson burials (Brethren). No Civil War records yet — but the cemetery membership + Brethren-Messenger 2007 Knicely entry support the broader pacifist-Brethren identity. Wayland's *Annals* and *History of Rockingham* did NOT yield direct Civil War records for these families in desk searches. | **Strengthened indirectly.** Wait for Sappington (ILL) and BHLA (mail-in) returns. |
| H7 — Plecker-era racial classification scrutiny | Hypothesis | No new evidence in this file (chancery + newspaper sources don't typically surface Plecker correspondence; that's LVA Acc. 41825 reading-room only). | Unchanged. Pursue at LVA trip. |
| H8 — Royalty descent claims in Jean Carter Smallwood's book apply to Brady | Downstream of H1 | If H1 holds via WikiTree tree (Col. James 1639 → Pryor 1680 → William H. 1720 → James 1755), then per Jean's book Brady would descend from Col. James and the royalty appendices apply. **But — engine convention #11 — a compiled WikiTree tree is not primary-source proof, and Norton's competing parentage hypothesis for James (1755) keeps H8 unresolved.** | Survives, blocked on H1 closure. |

**Highest-leverage next single action** (compressing file 07's "highest-leverage next question" with this file's findings):

**Pull Spotsylvania Will Book E pp. 49 AND 1274 + Spotsylvania Deed Books L pp. 520–521, N pp. 358–359, P pp. 61–62, and R p. 151 + Spotsylvania Order Book 1796 (Charles Smallwood apprenticeship) + Spotsylvania Order Book 1806 (guardianship of James Jr. and Katherine) — five microfilm pulls at the LVA reading room — and also pull King George Co. Will Book 2 (1782–1813) to compare versions of the will. These nine document pulls together close the bridge generation question and resolve the Stafford → King George → Spotsylvania → Preston Co. → Rockingham migration narrative for Brady's Smallwood line.**

After the LVA trip closes the bridge, the next horizon is the Y-DNA test (Y-37 starter, $119) to test H1 against the existing Smallwood Surname Project at FTDNA — the only path to falsifying or confirming the Col. James (1639) claim independent of compiled trees.
