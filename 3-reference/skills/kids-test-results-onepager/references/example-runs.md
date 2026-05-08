# Example Runs

Log of past 1-pager runs. Real kid scores stay in `~/brady-os-local/family/kids/` per the LOCAL-RECORDS-POINTER convention — only metadata about each run lives here.

| Date | Test | Kids included | Output file (local) | Companion analysis (local) |
|------|------|---------------|---------------------|----------------------------|
| 2026-05-08 | ATLAS Spring 2026 Summative (Grade 3) | Isla, Luke, Quinn | `triplets-summer-2026-onepager.html` | `triplets-atlas-summative-2026-05-08.md` |

## Notes from the inaugural run (2026-05-08)

- Pulled scores live from `ar-familyportal.cambiumast.com` per kid (codes in `portal/public/family/kb/16-school-access-codes.md`).
- Cross-kid analysis was rewritten **3 times** as new data became available:
  1. First draft: only Spring Summative scores from portal home page → too thin
  2. Second draft: full Fall → Winter → Spring history from Vuex state → much stronger
  3. Final draft: added sub-domain mastery + essay scores + Lexile/Quantile percentiles from PDF ISRs
- Lesson: the official Cambium PDFs add ~5 dimensions the live portal home page doesn't surface (Lexile, Quantile, sub-domain mastery, essay sub-scores, longitudinal chart). Always pull the PDFs before drafting the 1-pager.
- The PDFs require a real user click to download (Chrome user-gesture requirement). Brady clicked manually after I logged him in as each kid in turn.
- Each kid's narrative arc was distinct enough that copy-pasting voice between kids would have been a tell. Worth re-reading the closing line for each kid before finalizing — would a 9-year-old feel seen by it?
