---
name: deck-generator
description: |
  Generates branded slide decks from markdown using Marp CLI, styled with the mception
  design system. Outputs HTML (dark mode), PDF (light mode), and PPTX.

  TRIGGER THIS SKILL whenever Brady says: "build a deck," "make slides," "deck for [client],"
  "presentation for," "slide deck," "pitch deck," "board deck," "quarterly deck," "make a
  presentation," "slides for," or any variation requesting a slide-based deliverable.

  This skill owns ALL slide deck and presentation generation workflows. It does NOT own
  single-page documents (use mception-design-system directly), one-pagers/sell sheets
  (use marketing-templates), or daily intelligence briefs (use exec-intel-brief).
trust_tier: T0
---

# Deck Generator

Generates professional slide decks styled with the mception design system using Marp CLI.
Markdown in, branded HTML + PDF + PPTX out.

## Design System

All decks use the mception design system. The custom Marp theme lives at
`references/mception-marp-theme.css` and maps the canonical tokens:

- **Colors:** dark bg `#0C0F14`, gold accent `#D4A843`, warm white `#F0EDE6`, red `#C45C5C`, blue `#4A7FB5`
- **Fonts:** Space Grotesk (titles), DM Sans (body), JetBrains Mono (labels/data)
- **Grid overlay:** gold at 3% opacity, 40px spacing

Read `3-reference/skills/mception-design-system/SKILL.md` for full design specifications.

---

## Workflow

### Phase 1: Input

Accept one of:
- **Markdown file** — a `.md` file with Marp front matter already written
- **Topic prompt** — Brady describes what the deck should cover; agent writes the markdown
- **Existing document** — a brief, whitepaper, or research output to convert into slide format

When given a topic prompt, structure slides as:
1. Title slide (centered, hero statement)
2. Problem/context slide (why this matters)
3. 3-5 content slides (evidence, data, framework, comparison)
4. Closing/CTA slide

### Phase 2: Write the Markdown

Use Marp front matter at the top of the file:

```yaml
---
marp: true
theme: mception
paginate: true
header: '[Section Tag]'
footer: 'mception.ai'
---
```

**Slide separators:** Use `---` between slides.

**Available slide classes** (set with `<!-- _class: classname -->`):

| Class | Use For |
|-------|---------|
| `title` | Opening slide. Centered, large type, gold bottom accent. |
| `card` | Content with card styling. Gold top-border, card background. |
| `stat` | Big number impact. 96px gold stat, supporting text below. |
| `split` | Two-column layout. Content flows into a 1fr/1fr grid. |
| `problem` | Red-accented problem statement. Red top-border and heading. |
| `closing` | Final CTA slide. Centered, gold top-border. |
| `light` | Light-mode slide (white background). For print-friendly pages. |

**Markdown conventions:**
- `*italic*` renders in **gold** (use for emphasis, key phrases)
- `**bold**` renders in **white** (use for strong assertions)
- `##### Small Header` renders as a **gold monospace section tag** (JetBrains Mono, uppercase, letter-spaced)
- Tables render with mception styling (card background, monospace headers)
- Blockquotes render with gold left-border (use for POV/editorial quotes)
- Code blocks render with card background and monospace font

**Data presentation rules** (from mception-design-system):
- Label estimates as estimates. Use "(est.)" in headers.
- Fine-print sources in small text under every data table.
- Flip stats for impact: "79% haven't redesigned" > "21% have redesigned"
- Never call editorial content "truth" or "fact" — use "Point of view"

### Phase 3: Generate

Install and run Marp CLI via npx (zero persistent dependencies):

```bash
# HTML output (dark mode, primary artifact)
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --html \
  input.md \
  -o output.html

# PDF output (uses built-in Chromium)
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --pdf \
  --allow-local-files \
  input.md \
  -o output.pdf

# PPTX output
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --pptx \
  --allow-local-files \
  input.md \
  -o output.pptx
```

**Fallback if Marp's PDF fails** (Chromium not found): Generate HTML with Marp, then
convert to PDF via Playwright using the same pipeline as mception-design-system:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 720})
    page.goto(f'file:///path/to/output.html')
    page.wait_for_timeout(3000)
    page.pdf(
        path='/path/to/output.pdf',
        width='1280px', height='720px',
        print_background=True,
        margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
    )
    browser.close()
```

### Phase 4: Output

Save files using naming convention:
- `[Context]_Deck_[YYYY-MM-DD].html`
- `[Context]_Deck_[YYYY-MM-DD].pdf`
- `[Context]_Deck_[YYYY-MM-DD].pptx`

Present to Brady via `present_files`.

---

## Known Limitations

- **PPTX text is not editable.** Marp converts slides to images embedded in PowerPoint.
  Fine for "send and present" — not for "send and the client edits." If Brady needs editable
  PPTX, note this and suggest Google Slides or manual conversion.
- **PDF requires Chromium.** Marp uses Puppeteer internally. If it can't find Chrome,
  fall back to the Playwright pipeline documented above.
- **No animations or transitions.** Marp is static slides. For animated presentations,
  consider Presenton (see below).

---

## When to Use This vs. Other Tools

| Scenario | Tool |
|----------|------|
| 5-15 slide deck from existing content | **This skill (Marp CLI)** |
| Board-level quarterly brief (exec-intel-brief) | **This skill** — feed quarterly research as input |
| Quick internal deck (team update, project status) | **This skill** |
| Full pitch deck from scratch with AI images/layouts | **Presenton** (separate workspace) |
| Client demo with complex animations | **Presenton** (separate workspace) |
| Single-page infographic or briefing | **mception-design-system** |
| One-pager, sell sheet, capability overview | **marketing-templates** |

---

## Integration with exec-intel-brief

For the quarterly board-level strategy brief (Section 14 in exec-intel-brief), trigger this
skill with the quarterly research as input. Use the `light` slide class for print-friendly
PDF output. Structure as: executive summary slide, 3-4 signal slides, strategic recommendation
slide, closing with next steps.

---

## Reference Files

- `references/mception-marp-theme.css` — Custom Marp theme with mception design tokens
- `references/example-deck.md` — Working example deck using all slide classes

For design system specifications: `3-reference/skills/mception-design-system/SKILL.md`
