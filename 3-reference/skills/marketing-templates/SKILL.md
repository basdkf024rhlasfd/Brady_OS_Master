---
name: marketing-templates
description: |
  Reusable HTML page templates for marketing assets — sell sheets, client one-pagers, and
  capability overviews. Uses the mception design system with placeholder substitution and
  Playwright PDF generation. Same pipeline as exec-intel-brief, but template-driven.

  TRIGGER THIS SKILL whenever Brady says: "sell sheet," "one-pager for [client],"
  "capability overview," "marketing one-pager," "client one-pager," "service overview,"
  "make a sell sheet," "build a one-pager," "service menu," or any variation requesting
  a branded single-page or two-page marketing document.

  This skill owns template-driven marketing documents. It does NOT own slide decks
  (use deck-generator), daily intelligence briefs (use exec-intel-brief), or free-form
  infographics (use mception-design-system directly).
trust_tier: T0
---

# Marketing Templates

Template-driven marketing asset generation using the mception design system. Select a
template, fill it with content, generate dark HTML + light PDF.

## Design System Dependency

All templates consume the mception design system tokens. Before generating, verify CSS
variables match the current specification in `3-reference/skills/mception-design-system/SKILL.md`.

Key tokens:
- Colors: `--bg: #0C0F14`, `--gold: #D4A843`, `--white: #F0EDE6`
- Fonts: Space Grotesk (titles), DM Sans (body), JetBrains Mono (labels)
- Cards: `var(--bg-card)` with `1px solid rgba(255,255,255,0.06)` border

---

## Available Templates

### 1. Sell Sheet (`references/sell-sheet.html`)
**Format:** Tabloid (11x17"), dark mode primary
**Use for:** Product or service pitch, capability highlight, partnership proposal

Layout:
- Header: tag + title with gold accent + subtitle
- Problem statement card (red top-border)
- Solution card with 3-4 feature bullets (gold top-border)
- Stat cards row (4-column grid, big gold numbers)
- Social proof / case study card
- CTA bar at bottom with contact info

### 2. Client One-Pager (`references/client-one-pager.html`)
**Format:** Letter (8.5x11"), light mode primary (gets printed/emailed)
**Use for:** Engagement follow-up, proposal summary, capability overview for a specific client

Layout:
- Header with client context
- Three-column grid: What We Do / How It Works / Why It Matters
- Stat cards row
- Engagement model table
- Contact bar

### 3. Capability Overview (`references/capability-overview.html`)
**Format:** Tabloid (11x17"), dark mode
**Use for:** Full service menu, general marketing, conference handout

Layout:
- Header: mception.ai branding
- Service category cards with gold top-borders
- Each card: service name (Space Grotesk), description (DM Sans), key deliverables (JetBrains Mono labels)
- Bottom bar with contact info and tagline

---

## Workflow

### Phase 1: Select Template

Choose based on context:
- **Pitching a specific product/service** → sell sheet
- **Following up with a specific client** → client one-pager
- **General marketing / "what do you do"** → capability overview

### Phase 2: Gather Content

Content sources:
- Brady's prompt (most common)
- Client config from `exec-intel-brief/references/clients/[slug].md`
- Research output from a prior skill run
- Existing project files in `1-execution/`

### Phase 3: Fill Template

1. Read the template HTML from `references/`
2. Substitute `{{placeholders}}` with actual content
3. Adjust sections as needed — add/remove cards, change stat numbers, update copy
4. Preserve all CSS variables and component structure

**Placeholder conventions:**
- `{{TITLE}}` — main headline
- `{{SUBTITLE}}` — supporting line
- `{{TAG}}` — section tag (monospace, gold, uppercase)
- `{{STAT_1_NUM}}`, `{{STAT_1_DESC}}`, `{{STAT_1_SRC}}` — stat card values
- `{{SECTION_TITLE}}`, `{{SECTION_BODY}}` — card content
- `{{CTA_TEXT}}`, `{{CTA_CONTACT}}` — bottom bar

### Phase 4: Generate Output

**Dark HTML** — the primary artifact. Save directly.

**Light PDF** — swap CSS variables per the mception light-mode table, then convert:

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

Also swap `rgba(255,255,255,...)` → `rgba(0,0,0,...)` at equivalent opacities.

Convert via Playwright:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'file:///path/to/light_version.html')
    page.pdf(
        path='/path/to/output.pdf',
        format='Tabloid',  # or 'Letter' for client-one-pager
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

### Phase 5: Output

File naming:
- `[Context]_SellSheet_[YYYY-MM-DD].html` / `.pdf`
- `[Context]_OnePager_[YYYY-MM-DD].html` / `.pdf`
- `[Context]_Capabilities_[YYYY-MM-DD].html` / `.pdf`

Present to Brady via `present_files`.

---

## Sync Check

Before generating, read `3-reference/skills/mception-design-system/SKILL.md` and verify:
1. CSS variable names and values match the current specification
2. Font imports match the current Google Fonts link
3. Component patterns (stat cards, section headers, cards) match the reference HTML

If the design system has evolved, update the templates before generating.

---

## Reference Files

- `references/sell-sheet.html` — Sell sheet template (Tabloid, dark)
- `references/client-one-pager.html` — Client one-pager template (Letter, light)
- `references/capability-overview.html` — Full capability overview template (Tabloid, dark)

Design system source: `3-reference/skills/mception-design-system/SKILL.md`
Reference implementation: `3-reference/skills/mception-design-system/references/reference_dark.html`
