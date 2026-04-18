---
trust_tier: T0
---

# Infographic Template — DEPRECATED

> **This skill has been superseded by `3-reference/skills/mception-design-system/SKILL.md`.**
> Use the mception Design System skill for all new visual documents. It includes the full color palette, light/dark mode conversion, PDF generation, reference HTML files, and anti-patterns.

---

# (Legacy) Infographic Template — mception.ai House Style

## What This Is
A reusable HTML infographic template for Brady's consulting deliverables. Dark-mode, data-dense, single-page HTML documents that render beautifully in browsers and print to PDF.

## Design System
- **Background:** `#0C0F14` (near-black) with subtle gold grid overlay
- **Cards:** `#13161D` and `#181C25` with `rgba(255,255,255,0.06)` borders
- **Gold accent:** `#D4A843` (headings, highlights, emphasis)
- **Red accent:** `#C45C5C` (problems, warnings, crisis stats)
- **Green accent:** `#7CB97A` (future/opportunity states)
- **Blue accent:** `#4A7FB5` (data, diagrams, neutral info)
- **Typography:**
  - `Space Grotesk` — headlines, stat numbers (700 weight)
  - `DM Sans` — body text, descriptions
  - `JetBrains Mono` — labels, tags, source citations, section headers
- **Page size:** `@page { size: 11in 17in; margin: 0; }` (tabloid)

## Component Library
- **Header:** Tag line (monospace, gold, uppercase) + H1 with gold `<span>` accent + subtitle + corner stat
- **Thesis box:** Gold gradient border card, centered, Space Grotesk 17px
- **Stat cards:** 4-column grid, big number + description + source
- **Tables:** `bench-table` class — dark header row, monospace column headers
- **Quote cards:** 2-column grid, gold left-border accent
- **Section headers:** Monospace, uppercase, gold, with trailing line `::after`
- **Proportion diagrams:** Flex-based stacked bar charts (no JS)
- **Bottom bar:** Source citations left, mception.ai right

## Example File
`example_ai_value_inversion.html` — The AI Value Inversion strategic briefing (the original template).

## Usage
Copy the CSS variables and component patterns. Adapt content. All visuals are pure CSS — no images or JS required. Prints cleanly to PDF via browser print dialog.
