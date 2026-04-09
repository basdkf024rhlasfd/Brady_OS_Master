---
name: mception-design-system
description: |
  Brady's default design system for ALL design documents, infographics, one-pagers, strategic
  briefings, and visual content produced under mception.ai or Sycamore Lane Holdings.
  TRIGGER THIS SKILL whenever Brady asks to create, build, design, or produce any visual document,
  infographic, one-pager, briefing, report layout, or presentation-quality artifact. Also trigger
  on "make it look like the infographic," "use the design system," "mception style," "fight card,"
  or any reference to the AI Value Inversion visual style. This skill applies to ALL design docs
  by default — Brady does not need to ask for it. If you're making something visual for Brady and
  haven't read this, stop and read it now. Always output BOTH .html and .pdf versions.
---

# mception Design System

Brady's canonical design language for all professional visual output. Dark-mode-first, CEO-scannable, data-credible.

## When This Applies

**Every time** you create a designed document for Brady. This is the default — not opt-in. Includes:
- Infographics & one-pagers
- Strategic briefings
- Case studies
- Client-facing documents
- Content with data, stats, or frameworks
- Anything that needs to look professional and distinctive

## Output Requirements

**Always produce two files:**
1. `.html` — the primary artifact (dark mode)
2. `.pdf` — print-ready version (light mode, generated from the light HTML)

### Generating the PDF

After creating the HTML, generate a light-mode version and convert to PDF:

```python
# Install if needed
# pip install playwright --break-system-packages
# playwright install chromium

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'file:///path/to/light_version.html')
    page.pdf(
        path='/path/to/output.pdf',
        format='Tabloid',  # 11x17
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

If playwright is unavailable, use weasyprint or output the light HTML and tell Brady to print-to-PDF from browser.

### Light Mode Conversion

Swap these CSS variables to produce the print/light version:

| Dark Mode | Light Mode |
|---|---|
| `--bg: #0C0F14` | `--bg: #FFFFFF` |
| `--bg-card: #13161D` | `--bg-card: #F5F5F3` |
| `--bg-card-alt: #181C25` | `--bg-card-alt: #EDECEA` |
| `--white: #F0EDE6` | `--white: #1A1A1A` |
| `--gray: #8A8D94` | `--gray: #6B6E75` |
| `--gray-light: #B0B3BA` | `--gray-light: #4A4D54` |
| `--red: #C45C5C` | `--red: #B83A3A` |
| `--red-dim: #8B3A3A` | `--red-dim: #C45C5C` |
| `--gold-dim: #9A7B32` | `--gold-dim: #B8922E` |

Also swap all `rgba(255,255,255,...)` → `rgba(0,0,0,...)` at equivalent opacities.

---

## Typography

Three-font stack. No substitutions.

| Role | Font | Weight | Usage |
|---|---|---|---|
| **Display / Titles** | Space Grotesk | 700 | h1, panel titles, stat numbers. Tight letter-spacing (-1px on h1). |
| **Body** | DM Sans | 400/500/600 | Body text, descriptions, quotes. Warm, not clinical. |
| **Data / Labels** | JetBrains Mono | 400/500 | Section headers (ALL-CAPS, 3px letter-spacing), source citations, tags, table headers. |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Color Palette (Dark Mode — Primary)

```css
:root {
  --bg: #0C0F14;
  --bg-card: #13161D;
  --bg-card-alt: #181C25;
  --gold: #D4A843;
  --gold-dim: #9A7B32;
  --blue: #4A7FB5;
  --dark-blue: #1E3A5F;
  --white: #F0EDE6;        /* warm white, not pure */
  --gray: #8A8D94;
  --gray-light: #B0B3BA;
  --red: #C45C5C;
  --red-dim: #8B3A3A;
}
```

**Usage rules:**
- Gold = accent, highlights, stat numbers, section headers
- Blue family = data segments, proportion diagrams
- Red = alarm stats, "problem" indicators
- Three-tier depth: bg → bg-card → bg-card-alt

**Contrast — non-negotiable:**
Every element that sets a background MUST set an explicit `color`. Dark backgrounds → light text (`var(--white)` or `var(--gray-light)`). Light backgrounds → dark text. When building the light-mode version, reverse accordingly. Heuristic: if you can't read it on a projector in a sunlit room, the contrast is wrong.

---

## Layout Patterns

### Page Structure
- `max-width: 1100px`, centered
- `padding: 48px 52px 40px` — `52px` is the **minimum** horizontal padding. `36px` clips on consumer printers — never go below `52px` on any layout (tabloid or landscape letter).
- `@page { size: 11in 17in; margin: 0; }` for tabloid print
- Subtle grid texture overlay: gold at 3% opacity, 40px spacing

### Cards
- Background: `var(--bg-card)`
- Border: `1px solid rgba(255,255,255,0.06)` — barely visible
- Border-radius: `8-10px`
- Colored top-border (`3px`) to categorize (gold for positive, red for problem)

### Section Headers
```css
.section-header {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(212,168,67,0.25);
}
```

### Stat Cards
- Big number: Space Grotesk 700, 32px, gold
- Description: DM Sans 12px, gray-light
- Source: JetBrains Mono 9px, gray

### Quote / POV Cards
- Left border: `3px solid var(--gold-dim)`
- Label the section "Point of view" — not "truth" or "fact"
- These are editorial, not evidence

---

## Data Presentation Rules

**These are non-negotiable. Brady will catch violations.**

1. **Proportion diagrams over bar charts** when data is estimated. Use horizontal stacked segments with `flex` proportions — no axes, no gridlines.
2. **Label estimates as estimates.** Use "(est.)" in column headers. Add "ESTIMATES" tag in section headers.
3. **Fine print sources** in JetBrains Mono 9px under every table/diagram.
4. **Flip stats for impact.** "79% haven't redesigned" hits harder than "21% have redesigned."
5. **Use the honest number.** Lead with averages, note the high end. No cherry-picking.
6. **"Illustrative" label** under any visual that isn't based on measured data.
7. **Sample sizes** in citations where available: `McKinsey 2025 (n=1,933)`

---

## Component Library

### Header Block
- Left: tag (monospace, gold, uppercase) + h1 (with gold `<span>`) + subtitle
- Right: anchor stat (big alarming number in red)
- Bottom border: `2px solid var(--gold-dim)`

### Thesis Bar
- Centered text in Space Grotesk 600
- Gold-tinted gradient background with gold border
- Key phrase highlighted with `<em>` in gold

### Dual-Panel Comparison (with center legend)
- Three-column grid: `1fr 180px 1fr`
- Left panel = "The Default" (red top-border)
- Right panel = "The Better Way" (gold top-border)
- Center column: vertically stacked legend items with connector lines fading outward

### Proportion Diagrams
- Horizontal stacked bars using `display: flex` with `flex` proportions
- Three segments: solid light blue (legacy), diagonal stripes light+dark blue (AI-enabled), solid dark blue (platforms)
- Row labels in monospace: NOW / NEXT / LATER

### Benchmark Table
- Monospace headers, clean rows
- Gold for "best-in-class" values
- Green (`#7CB97A`) for "future direction" values
- Fine print sources underneath

---

## Reference Files

For a complete working example of this design system in action, read:
- `references/reference_dark.html` — Dark mode (primary) example
- `references/reference_light.html` — Light/print mode example

When in doubt, match these files. They are the canonical reference.

---

## Anti-Patterns (Don't Do These)

- Pure white (`#FFFFFF`) text on dark — use warm white `#F0EDE6`
- Inter, Roboto, Arial, or system fonts
- Purple gradients
- Bar charts with axes when data is estimated
- "Directional" as a qualifier — "estimate" is enough
- Overclaiming precision the data doesn't support
- Calling editorial content "truth" or "fact"
- Percentage heights on flex children (they don't resolve — use px or flex proportions)
- `overflow: hidden` on body (kills scroll)
