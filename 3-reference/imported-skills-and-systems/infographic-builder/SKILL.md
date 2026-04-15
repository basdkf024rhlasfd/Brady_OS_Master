---
name: infographic-builder
description: |
  Charlie Hills' 9-step system for creating social-format infographics (1080x1920) with
  Claude Code. Includes brand rules, rendering constraints, QA gate, and PNG export.
  TRIGGER when Brady says: "infographic builder," "Charlie Hills method," "social infographic,"
  "1080x1920 infographic," "build an infographic with QA," or "PNG infographic."
  This is an IMPORTED system — it lives standalone. For tabloid/letter documents, use
  mception-design-system directly. If integrating into the full OS, brand tokens (colors,
  fonts) should align with mception-design-system.
---

# Infographic Builder (Charlie Hills Method)

A 9-step system for creating social-format infographics (1080x1920 portrait) with Claude Code. Brand rules + rendering constraints + QA gate + Playwright PNG export.

## Relationship to Core OS

- **This skill:** Social/portrait infographics at 1080x1920 with QA gate and PNG export
- **mception-design-system:** Tabloid/letter documents (11x17, 8.5x11) with HTML + PDF output
- **Overlap:** Both produce designed visual documents. This system is optimized for social media posting; mception-design-system is optimized for professional documents and client deliverables

If promoted into the full OS, this would likely become a "social format" mode within `mception-design-system`, adopting its color palette and typography while keeping the QA gate and PNG pipeline.

## Brand Rules (Standalone Defaults)

When running standalone, use these defaults. When integrated with Brady OS, swap to mception-design-system tokens.

- **Font:** Space Grotesk (titles + body) — or Space Grotesk (titles) + DM Sans (body) if aligning with mception
- **Canvas:** 1080 x 1920 px (portrait, social format)
- **Body text:** 18px minimum (larger than tabloid format — this is for phone screens)
- **Background:** Dark mode primary
- **Accent:** Configurable per project

## The 9-Step Workflow

### Step 1: Brand Rules File
Create or reference a brand rules file with hex colors, font stack, canvas size (1080x1920), and QA rules. In Brady OS context, reference `mception-design-system/SKILL.md` for brand tokens.

### Step 2: Inspiration Images
Add 5-8 infographics you admire to `references/inspiration/`. Write notes on what to match: "Match this density. Avoid this dead space." Claude uses these as style targets.

### Step 3: Rendering Constraints
Lock in the hard rules:
- Body text: 18px minimum
- No `box-shadow` anywhere
- No empty/spacer divs
- Footer always visible without scrolling
- All text must be readable at 1x on mobile

### Step 4: QA Gate
Before any output reaches Brady, run the 10-point QA checklist (see `references/qa-checklist.md`). Minimum score: 80/100. Auto-fix any violations and re-render until passing.

### Step 5: Assets
Place headshot, logos, and brand marks in an assets directory. Claude pulls them automatically when building.

### Step 6: Prompt
"Create an infographic on [topic]." Claude reads the brand rules, loads the rendering constraints, and proceeds to build.

### Step 7: Build the HTML
Pick from reusable CSS components (see `references/component-catalog.md`). Apply brand colors and typography. Write the full HTML file — no back-and-forth iterations.

### Step 8: QA Scoring
Run the 10-point checklist. Auto-fix any violation scoring below threshold. Re-render. Repeat until 80/100+ before presenting to Brady.

### Step 9: PNG Export
Export via Playwright at 1080x1920:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1080, 'height': 1920})
    page.goto(f'file:///path/to/infographic.html')
    page.screenshot(path='output.png', full_page=True)
    browser.close()
```

### Output Path Convention
```
outputs/<topic-slug>/v1_YYYY-MM-DD.html
outputs/<topic-slug>/v1_YYYY-MM-DD.png
```

Every version kept. Increment version number on revisions (v2, v3...).

## References

- `references/qa-checklist.md` — 10-point QA gate with scoring (80/100 minimum)
- `references/component-catalog.md` — 17 reusable CSS component types
- `references/inspiration/` — drop inspiration images here with notes
