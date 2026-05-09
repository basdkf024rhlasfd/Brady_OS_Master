# 18 — FamilySearch Verification Walk (Hard Gate)

**Established:** 2026-05-09
**Phase:** Monacan v2 hard gate before any v2 synthesis
**Engine:** `3-reference/skills/genealogy-research/SKILL.md` Conventions #11 + #12 (relationship-walk + fraud-flag cross-check)
**Reads against:** `research/08-primary-source-extracts.md`, `research/17-clark-line-ffv-additions.md`, `research/19-joepayne-clark-roll-by-date.md`, `research/26-rockbridge-amherst-clark-curry-online-records.md`
**Output mode:** Append-only. Phase A is the script; Phase B is filled live during Brady-on-Chrome session.

This file is the **hard gate** between Monacan v1 (research files 01–17 and the four v1 whitepapers) and Monacan v2 synthesis. v2 chapters do not start drafting until this walk lands a confirm-or-retract verdict on every direct-ancestor claim from v1 + file 17 + the new file-19 / file-26 candidates.

The Donahoe project ran this same walk and **retracted six of eight FFV ancestor claims**. Same pattern is plausible here.

---

## Phase A — Walk Plan (the script)

### A.0 Setup before the walk starts

1. Open Claude in Chrome on `https://www.familysearch.org/` with Brady's account logged in.
2. Confirm two anchor FSIDs (write them in section A.1 of this file at the start of the walk):
   - **Brady's own FSID** (the walk-from anchor for every relationship calculation)
   - **Lutie Fannie Clark's FSID** (the project's anchor descendant — paternal grandmother; the FFV cascade in file 17 enters Brady's tree through her)
   - **Joseph Anderson Clark's FSID** (b. 1869, the v1 ceiling)
3. For every ancestor walked: capture **(a)** View Relationship verdict (direct vs. cousin vs. corrupted), **(b)** Custom Facts tab fraud-flag status, **(c)** Memories tab fraud-flag status, **(d)** sources count, **(e)** any `Living / Unknown sex` placeholder anywhere in the chain (data-corruption signal — Donahoe Phase 2.9 found these and they invalidate cousin chains).
4. The walk produces three buckets per ancestor: **CONFIRM** (direct, sources clean, no fraud) / **RETRACT** (cousin, fraud-flagged, or corrupted chain) / **DEFER** (profile missing or ambiguous; needs a Phase 3 follow-up).

### A.1 Anchor FSIDs to confirm at start of walk

| Anchor | Claimed identity | FSID | Confirmed at walk start? |
|---|---|---|---|
| Brady (self) | Brady Smallwood | _to fill_ | _Y/N_ |
| Lutie Fannie Clark | Brady's paternal grandmother (1926–2001) | _to fill_ | _Y/N_ |
| Joseph Anderson Clark | b. 1869, Irish Creek, m. 1906 Mary Susan Clark | _to fill_ | _Y/N_ |

### A.2 Group 1 — v1 Clark-line direct ancestors (confirm v1 stands)

These are the direct ancestors v1 whitepapers cite as Brady's documented Clark/Tyree/Sorrells line. The walk should confirm each is a direct ancestor of Brady (not cousin, not orphaned).

| # | Ancestor | Claimed relationship | FSID | View Relationship verdict | Custom Facts / Memories fraud check | Sources count | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Joseph Anderson Clark (b. 1869) | 3rd-great-grandfather | _to fill_ | | | | v1 anchor |
| 2 | Mary Susan Clark (m. JAC 1906) | 3rd-great-grandmother | _to fill_ | | | | endogamous Clark/Clark |
| 3 | James William Clark | great-great-grandfather (JAC's son, Lutie's father) | _to fill_ | | | | |
| 4 | Joe Clark Jr. | Atha Sorrells's grandfather; per file 08 §2 same generation as JAC's father | _to fill_ | | | | Sorrells family-tree exhibit |
| 5 | Joseph "Joe" Clark Sr. (b. 1797) | Sorrells family-tree root, JAC's GG-grandfather candidate | _to fill_ | | | | Per file 08 §2 + WikiTree D39 |
| 6 | Nelson Harrison Clark (1793–1871) | Brady's biological 6×-great-grandfather (file 12) | _to fill_ | | | | "MULATTO" 1860 census; on joepayne page-3 roll (file 19) |
| 7 | James Clarke (~1755) | JAC's putative G-G-G-grandfather; father of both Nelson + Joseph Carter Sr. | _to fill_ | | | | One-source (WikiTree D39) — least documented |
| 8 | Edith Wane (Nelson's first wife, 1819) | Brady's 6×-great-grandmother | _to fill_ | | | | Per file 11 GEDCOM correction |
| 9 | Frances Elizabeth Mason (Nelson's third wife, 1840) | Brady's step-6×-great-grandmother | _to fill_ | | | | File 10 correction |
| 10 | "Franky Clark" (page-3 joepayne, possibly 4th wife or Bright-Star surname-collapse) | unknown | _to fill_ | | | | File 19 §B.4 — two leads |
| 11 | James Clark (1876 case anchor) | Joe Clark Sr.'s grandson per file 08 §3 | _to fill_ | | | | LVA 1140710 |
| 12 | Cerinda Robison (m. James Clark 1876) | Brady ancestor by claim | _to fill_ | | | | |
| 13 | Atha Sorrells (1906–) | Cousin to Brady's line per file 02 | _to fill_ | | | | NOT direct ancestor; confirms cousin link |

### A.3 Group 2 — File-17 FFV cascade (the 12-generation Custis / Thoroughgood / Offley chain through Lutie Fannie Clark's maternal-grandmother path)

**This is the highest-fraud-risk group.** Donahoe Phase 2.9 retracted 6 of 8 FFV ancestor claims via this exact walk pattern. Same names recur. Walk every generation. Capture full descent path. Cross-check Custom Facts + Memories tabs for fraud notes (the *Shawnee Heritage* / Don Greene fraud is the canonical example; check for similar patterns on the Custis-side profiles).

Walk anchor: from **Lutie Fannie Clark** (paternal grandmother) up the maternal-grandmother chain. Each row should produce a verdict: direct ancestor (CONFIRM), cousin only (RETRACT), profile corrupted (DEFER).

| # | Ancestor | FSID | Claimed relationship to Brady | View Relationship verdict | Fraud-flag check | Notes |
|---|---|---|---|---|---|---|
| F1 | Lutie Fannie Clark (1926–2001) | _to fill_ | paternal grandmother (anchor) | | | Walk anchor |
| F2 | Nellie Mae Cash (1910–2003) | KW8S-2D7 | great-great-grandmother (Lutie's mother) | | | |
| F3 | Georgie Anna Sorrells (1883–1969) | KW86-LJH | 3rd-g-grandmother | | | **Sorrells surname enters here.** Cross-check vs. *Sorrells v. Shields* family-tree exhibit (LVA 1140744) |
| F4 | Sarah Luticia Floyd (1869–1950) | KZRX-PCQ | 4th-g-grandmother | | | Lutie's name appears to derive from this great-grandmother |
| F5 | Julia A Floyd (1853–1900) | LC6R-7VN | 5th-g-grandmother | | | |
| F6 | Eliza Hartless (1816–1880) | LVPD-VW3 | 6th-g-grandmother | | | Surname drift Heartly → Hartless |
| F7 | John Heartly (1784–1858) | G7BC-Y5T | 7th-g-grandfather | | | |
| F8 | Nancy Staton (1758–1834) | L2WK-3BR | 8th-g-grandmother | | | |
| F9 | Anne Custis (1725–1768) | G8H6-MF2 | 9th-g-grandmother | | | **Custis surname enters here.** Probable cousin chain risk |
| F10 | Henry Custis (1680–1732) | LHG7-ZWD | 10th-g-grandfather | | | Bridge between Thorowgood and Custis lines |
| F11 | Maj Gen John Custis II Esq (1628–1696) | _to fill_ | 11th-g-grandfather | | | **High fraud-risk profile** — Donahoe walk found Custis II was paternal-Clark-line ancestor for Brady, NOT Donahoe-side. Confirm same descent here. Slaveholder per will. |
| F12 | Margaret Michael (1658–1697) | KNW3-JZY | 11th-g-grandmother | | | Daughter of Elizabeth Thorowgood |
| F13 | Elizabeth Thorowgood (1633–1670) | 27JC-2WB | 11th-g-grandmother | | | |
| F14 | Capt Adam Thoroughgood (1604–1640) | L5FW-RK1 | 12th-g-grandfather | | | Adam Thoroughgood House National Historic Landmark |
| F15 | Sarah Offley (1609–1657) | _to fill_ | 12th-g-grandmother | | | 51 sources on FS — most heavily documented in the corpus. Donahoe-side cousin per Phase 2.9 walk; confirm direct here. "Backbone of steel" |

### A.4 Group 3 — New file-19 / file-26 Clark candidates (need FSID lookup + verification)

Names surfaced from this session's parallel research that need FamilySearch lookups + relationship walks. Most don't have FSIDs in the public-research record yet; first pass is to find them.

| # | Ancestor | Source surfaced | FSID (find at walk) | View Relationship verdict | Notes |
|---|---|---|---|---|---|
| N1 | Leonard "Lin" Clark | file 26 — Heinegg's Rockbridge PPT extract, S. River 1792–1819 free-Negro head of household | _find_ | | Pre-1820 free-Negro Clark in South River District |
| N2 | William Clark Sr. "M. Couler" | file 26 — Amherst tax 1815 | _find_ | | First online "Man of Color" Clark entry, 109 years before Plecker |
| N3 | Joseph Clark "F.N." 1816 Rockbridge | file 26 — Heinegg | _find_ | | Likely Joseph Carter Clark Sr. (b. 1797) reaching tithable age — same as Group 1 #5 |
| N4 | Mary Curry (1810 Amherst, "Other Free" 7-person household) | file 26 — Heinegg's freeafricanamericans.com extract | _find_ | | New Curry-line ceiling; 39 years above v1 file 16's Peter Curry 1849–50 |
| N5 | Samuel Tyree (m. Mary Roberts 1875) | file 19 §C.1 — earliest dated Tyree on joepayne roll | _find_ | | Tyree axis 31 years upstream of Clark axis |
| N6 | Mary Roberts (m. Samuel Tyree 1875) | file 19 §C.1 | _find_ | | Roberts on Bear Mountain stone |
| N7 | Calvin Nuckles + Luthena Tyree (1881) | file 19 §C.1 | _find_ | | Nuckles on Bear Mountain stone |
| N8 | John C. Clark + Margaret Tyree (page-3, undated) | file 19 §B.2 | _find_ | | Tyree-into-Clark assimilation pattern |
| N9 | H.A. Clark + Cora A. Tyree (page-3, undated) | file 19 §B.2 | _find_ | | |
| N10 | James C. Clark + Flora Tyree (page-3, undated) | file 19 §B.2 | _find_ | | |
| N11 | William Clark + Bessie Redcross (page-3, undated) | file 19 §B.2 | _find_ | | Redcross on Bear Mountain stone |

### A.5 Walking checklist (per ancestor)

For each row in Groups 1, 2, 3:

- [ ] Pull the FamilySearch profile (capture FSID if not already in this file)
- [ ] Click View Relationship from Brady's profile
- [ ] Capture full descent path (every generation between Brady and ancestor)
- [ ] If chain contains a `Living` or `Unknown sex` placeholder between two non-living people: mark as **DEFER** (data-corruption signal)
- [ ] Open Custom Facts tab — scan for fraud language ("FRAUDULENT," "FICTIONAL," "NEEDS TO BE REMOVED," "denounced," "researcher [name] flagged")
- [ ] Open Memories tab — same scan; also check whether claimed primary-source documentation (Bible page scan, court extract) is actually attached or just paraphrased downstream
- [ ] Note sources count
- [ ] Verdict: CONFIRM / RETRACT / DEFER + one-line reason

---

## Phase B — Walk Findings (filled live during session)

*This section is empty until the walk runs. Each ancestor row from Phase A gets a Phase B update with the verdict + descent-path screenshot reference + fraud-check result. Append-only — even if a verdict changes later, the prior verdict row stays in place with a strikethrough and a pointer to the corrected row.*

_(empty)_

---

## Phase C — Synthesis (after walk complete)

*Filled after Phase B is complete. Three sub-sections:*

### C.1 Direct-ancestor confirms

*(empty — list of CONFIRM verdicts with one-line summary each)*

### C.2 Retractions (cousins, fraud-flagged, corrupted chains)

*(empty — list of RETRACT verdicts with one-line reason; these are the v1 claims that get rewritten in v2)*

### C.3 Deferrals (Phase 3 follow-ups)

*(empty — list of DEFER verdicts; what evidence is needed to convert each to CONFIRM or RETRACT)*

### C.4 v2 chapter implications

*(empty — for each retract: which v1 chapter or section needs rewriting in v2; for each new confirm: which v2 chapter gains new content)*

---

## Source-trail header

Walk runs against the live FamilySearch tree. FSIDs captured here are point-in-time as of the walk date (FS profiles can be edited by other researchers post-walk). Screenshots of each View Relationship calculation should be saved to `research/source/familysearch-relationship-verification-2026-MM-DD.txt` (or similar dated filename) per genealogy-research SKILL convention — referenced from this file but not duplicated inline.

---

*End of Phase A. Phase B + C append after Brady-on-Chrome walk runs.*
