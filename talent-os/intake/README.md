# Intake — drop your raw material here

This is where you feed Talent OS. Put the actual file in the right subfolder, then name a skill.
The agent reads better than it guesses — **drop, don't describe.**

| Folder | What goes in | Feeds |
|---|---|---|
| `interviews/` | Stakeholder interview notes/transcripts (People lead, managers, top performers, leavers), meeting recordings-as-text | `talent-strategy-diagnostic`, `culture-diagnostic` |
| `roles/` | Job postings (current/old), role descriptions, "what good looks like" notes | `jd-optimizer`, `interview-guide-builder`, `onboarding-ramp`, `workforce-plan` |
| `resumes/` | Candidate resumes (PDF/text) and screening-video transcripts | `candidate-screener` |
| `data/` | Roster exports, funnel/ATS metrics, exit/turnover data, comp/benefits data, survey results (CSV or pasted tables) | `people-analytics`, `workforce-plan`, `total-rewards`, `culture-diagnostic` |

## Everything here is confidential and git-ignored

Contents of these folders are **never committed** (see `.gitignore`). Drop real client data —
names, comp, PII — without worry. Only the `README.md` in each folder ships with the kit.

## Tips
- Text beats screenshots. Paste transcripts, export CSVs, save postings as `.md`/`.txt`.
- One subject per file when you can (one role, one location) — makes outputs cleaner.
- Don't have a file? You can still paste into chat. The folders just make it faster and repeatable.
