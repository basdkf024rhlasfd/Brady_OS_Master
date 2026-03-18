# STIHL Briefing v2 — Deployment Feedback Fixes

Drop these files into `mception-ai/cody/src/` to replace the current versions:

| This file | Replaces |
|-----------|----------|
| `stihl-data.ts` | `src/lib/stihl-data.ts` |
| `today-page.tsx` | `src/app/(portal)/stihl/today/page.tsx` |
| `about-page.tsx` | `src/app/(portal)/stihl/about/page.tsx` |

Also update the matching preview route files if they exist.

---

## What changed (mapped to feedback)

### 1. Removed all design-intent annotations
- Stripped every `subtitle` prop from Panel components on the today page
- Stripped `body` props from ListItem in the quick pulse section
- Moved the design rationale into a "Design notes" panel on the About page

### 2. News feed — real signals instead of category summaries
Old: "Tariff chatter remains focused on China-exposed tooling"
New: "SBD CEO confirmed high-single-digit price increases on DeWalt effective April 2025... Disclosed $1.7B annualized tariff exposure" (source: Q4 earnings call, dated Mar 12)

All 4 items now follow: source → what happened → so what for STIHL

### 3. Market pulse — timestamps instead of placeholder notes
Old: "Use this slot for live quotes once the feed is wired."
New: "As of Mar 14, 2026 close · NYSE"

### 4. Action item — concrete deliverable
Old: "Turn tariff advantage into a direct commercial narrative: pricing discipline, domestic sourcing proof points, and dealer talking tracks."
New: "Draft a one-page dealer talking track on STIHL's tariff insulation by Friday. Anchor it on the 60% domestic sourcing number and the $20–40 per-unit cost gap. Start from the tariff impact memo in the artifact library."

### 5. Launch radar — populated with actual launches
Old: "Monitor every new battery-compatible launch, starter kit..."
New: Husqvarna 550i XP, Milwaukee M18 outdoor crossover, DeWalt 60V MAX expansion — each with dates and implications

### 6. Tariff watch — real numbers
Old: "This should become a repeatable board-facing deliverable with scenario math."
New: STIHL 60% domestic (10% effective impact), SBD $1.7B, TTI $2–3B est.

### 7. Quick stats — real metrics instead of meta-commentary
Old: "Focus mode: Decision cockpit" / "Built to orient Rob in under 90 seconds"
New: "$20–40/unit tariff advantage" / "25% battery penetration" / "Mirakl live since Mar 4"
