# STIHL Competitive Intelligence — Full Project Export

Everything needed to continue this project in a fresh repo/workspace.

---

## What this project is

A competitive intelligence system for **Rob Jenson, Director of eCommerce at STIHL USA** (Virginia Beach). Two deliverable formats:

1. **Markdown POC** (`stihl-ci-poc.md`) — a self-executing document Rob uploads to Claude or ChatGPT Projects. Type "menu" and it becomes an always-on CI analyst with 30+ commands.

2. **Web dashboard** — a Next.js app deployed on mception.ai (Vercel) that renders the same intelligence as a visual briefing. Currently lives in the `mception-ai` repo.

## Project status

- **v1.0** (Mar 13, 2026): Initial POC sent to Rob via email. Markdown file.
- **v1.1** (Mar 16): Made the markdown self-executing on upload (auto-brief on first message).
- **v1.2** (Mar 17): Rewrote the live site assessment with a real crawl. Added to mception-ai as a web dashboard.
- **v2 feedback** (Mar 18): Received detailed feedback. Corrected data file and page components written but not yet deployed.

## Customer

- **Rob Jenson** — Director of eCommerce, STIHL Inc., Virginia Beach, VA
- **Background**: MBA, University of Chicago Booth. Quantitative, framework-driven.
- **Current mandate**: Launched STIHL's first dealer-fulfilled B2B marketplace (Mirakl, March 4, 2026).
- **Organizational context**: Former CEO Chris Keffer departed Feb 2026. Interim leadership. German parent (STIHL AG) has increased oversight.
- **Rob's response**: "Will take a look at the end of the week — thanks for sending it over!" (Mar 14)
- **Victory condition**: Rob purchases a paid engagement (pilot: Daily Brief + Weekly Fact Set + 2 artifacts)
- **KR1**: Rob uses POC independently 3+ times
- **KR2**: Purchase intent signal by 2026-04-15

## File inventory

### Core deliverable
| File | Description |
|------|-------------|
| `stihl-ci-poc.md` | The markdown POC (v1.2). 72KB. Upload to Claude/ChatGPT. |
| `chatgpt-project-instructions.md` | Companion rules file for ChatGPT Projects behavior. |
| `PROJECT-POSTER.md` | One-page internal project poster with roster, timeline, KPIs, and instructions. |

### v2 web deployment (corrected, ready to deploy)
| File | Drops into mception-ai at |
|------|--------------------------|
| `stihl-v2-deployment/stihl-data.ts` | `src/lib/stihl-data.ts` |
| `stihl-v2-deployment/today-page.tsx` | `src/app/(portal)/stihl/today/page.tsx` |
| `stihl-v2-deployment/about-page.tsx` | `src/app/(portal)/stihl/about/page.tsx` |
| `stihl-v2-deployment/CHANGES.md` | Changelog for what changed and why. |

### Planning documents
| File | Description |
|------|-------------|
| `plans/stihl-competitive-intelligence-poc-whitepaper.md` | Master plan for the 8-section POC structure. |
| `plans/final-edits-to-stihl-ci-poc-v1-0-v1-0-1.md` | 6 specific edits from v1.0 → v1.0.1. |
| `plans/make-stihl-ci-poc-md-self-executing-on-upload.md` | Instructions for making it auto-execute. |

### Supporting materials
| File | Description |
|------|-------------|
| `attachments/Summary of Create Competitive Intelligence Program.md` | Planning conversation transcript. |
| `attachments/Summary of Summarize Stihl Project.md` | POC capabilities discussion. |
| `attachments/Summary of Strategize Olympic Analogy.md` | Conceptual framing. |
| `attachments/pasted_text_2026-03-13_23-20-30.txt` | Raw chat export. |
| `attachments/pasted_text_2026-03-16_10-32-03.txt` | Raw chat export. |
| `attachments/image*.png` (9 files) | Screenshots/mockups from development. |
| `attachments/PR instructions*.md` (3 versions) | PR creation instructions. |

### Not STIHL-specific (leave in agency-agents)
| File | Description |
|------|-------------|
| `plans/brady-os-clean-rebuild-in-repo.md` | Brady OS restructuring plan. |
| `plans/work-business-os-clean-governance-model.md` | Governance model plan. |

## v2 feedback summary (what the corrected files address)

1. **Removed design-intent annotations** — gray subtitle text explaining *why* cards exist ("Built to orient Rob in under 90 seconds"). Moved to About page.
2. **News feed has real news** — sourced, dated, specific signals (SBD earnings call, Husqvarna annual report, BloombergNEF battery survey, CPSC recalls). Pattern: source → what happened → so what for STIHL.
3. **Market pulse has timestamps** — "As of Mar 14, 2026 close · NYSE" instead of "Use this slot for live quotes once the feed is wired."
4. **Action item is actionable** — "Draft a one-page dealer talking track by Friday" with inputs and starting point, not a vague strategic direction.
5. **Launch radar has actual launches** — Husqvarna 550i XP, Milwaukee M18 crossover, DeWalt 60V MAX instead of "Monitor every new battery-compatible launch."
6. **Tariff watch has real numbers** — STIHL 60% domestic, SBD $1.7B, TTI $2–3B instead of "This should become a repeatable board-facing deliverable."
7. **Quick stats show metrics** — "$20–40/unit tariff advantage" instead of "Focus mode: Decision cockpit."

## Web deployment details

- **Vercel project**: `mception-ai` (prj_1GjS4vP55S0oWgqv3AAGMSU38LgX)
- **Team**: bradysmallwood-7504s-projects
- **Domains**: mception.ai, www.mception.ai
- **Framework**: Next.js (Turbopack)
- **Preview URL**: `/preview-rj-stihl-briefing-20260317-f7k2m9q4x/stihl/today`
- **Production routes**: `/stihl/today`, `/stihl/competitors`, `/stihl/digital`, `/stihl/artifacts`, `/stihl/requests`, `/stihl/about`
- **Git branch**: `repo-overview`

## Key components in mception-ai (for reference)

```
src/
├── lib/stihl-data.ts              ← ALL content lives here
├── components/stihl/
│   ├── StihlUI.tsx                 ← Reusable UI components (Panel, MetricCard, Tag, etc.)
│   ├── PreviewShell.tsx            ← Preview layout with nav sidebar
│   └── RequestInbox.tsx            ← Client-side request capture (localStorage)
├── app/(portal)/stihl/
│   ├── today/page.tsx              ← Main briefing page
│   ├── competitors/page.tsx        ← Competitor watch
│   ├── digital/page.tsx            ← Digital/Musashi San audit
│   ├── artifacts/page.tsx          ← Artifact library
│   ├── requests/page.tsx           ← Request intake
│   └── about/page.tsx              ← Method, sources, design notes
└── app/preview-rj-stihl-briefing-20260317-f7k2m9q4x/
    └── stihl/                      ← Mirror of above for preview URL
```

## Email thread (Notion page ID: 325ed43b-89c5-8122-a861-e3c2cb30cd45)

- Brady → Rob (Mar 13, 11:52 PM): Initial POC with markdown attachment
- Rob → Brady (Mar 14): "Will take a look at the end of the week"
- Joe Saumweber feedback (Mar 15): "Great deliverable... how quickly it becomes commoditized is another question"
- Bill Bennett feedback: "Happy to be a guinea pig... will send feedback by end of week"
- Brady → Skye Kim (Mar 16): "Close on v2 which is going to put it on a domain I have (www.mception.ai)"
