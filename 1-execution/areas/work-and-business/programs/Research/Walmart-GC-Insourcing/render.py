#!/usr/bin/env python3
"""Render the Walmart GC-insourcing white paper from markdown to styled HTML (dark) + PDF (light).

Markdown is the source of truth. This script:
  1. Splits off the cover (everything before <!-- RENDER-BODY-START -->).
  2. Converts the body markdown to HTML (tables, attr_list, sane_lists).
  3. Wraps it in the mception design system adapted to a Letter-portrait white paper.
  4. Emits a dark-mode HTML (screen) and a light-mode HTML (print), then a PDF via Playwright.

Usage: python3 render.py
"""
from __future__ import annotations

import re
from pathlib import Path

import markdown

HERE = Path(__file__).parent
SRC = HERE / "walmart-gc-insourcing-whitepaper-2026-06-09.md"
OUT_DARK = HERE / "walmart-gc-insourcing-whitepaper-2026-06-09.html"
OUT_LIGHT = HERE / "walmart-gc-insourcing-whitepaper-2026-06-09-light.html"
OUT_PDF = HERE / "walmart-gc-insourcing-whitepaper-2026-06-09.pdf"

TITLE = "Insourcing the Build"
SUBTITLE = "Vertically Integrating General-Contractor Capability at Retail Scale"
PREPARED_FOR = "A Real Estate & Construction executive at Walmart"
DATE_STR = "June 9, 2026"

FONTS = (
    '<link href="https://fonts.googleapis.com/css2?'
    "family=Space+Grotesk:wght@400;500;600;700&"
    "family=DM+Sans:wght@400;500;600&"
    'family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
)


def split_body(md_text: str) -> str:
    marker = "<!-- RENDER-BODY-START -->"
    if marker in md_text:
        return md_text.split(marker, 1)[1].strip()
    return md_text.strip()


def render_cover() -> str:
    return f"""
    <section class="cover">
      <div class="cover-label">WALMART · REAL ESTATE &amp; CONSTRUCTION · PRECEDENT RESEARCH</div>
      <h1 class="cover-title">{TITLE}</h1>
      <div class="cover-divider"></div>
      <div class="cover-subtitle">{SUBTITLE}</div>
      <div class="cover-meta">
        <div>PREPARED FOR · <span>{PREPARED_FOR}</span></div>
        <div>DATE · <span>{DATE_STR}</span></div>
        <div>CLASSIFICATION · <span>DISCUSSION DRAFT · EXTERNAL PRECEDENT &amp; STRATEGIC OPTIONS</span></div>
      </div>
    </section>
    """


# Dark mode (primary, screen) palette + white-paper layout.
CSS = r"""
  :root {
    --bg: #0C0F14;
    --bg-card: #13161D;
    --bg-card-alt: #181C25;
    --gold: #D4A843;
    --gold-dim: #9A7B32;
    --blue: #4A7FB5;
    --white: #F0EDE6;
    --gray: #8A8D94;
    --gray-light: #B0B3BA;
    --red: #C45C5C;
    --rule: rgba(212,168,67,0.22);
    --rule-soft: rgba(212,168,67,0.10);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-font-smoothing: antialiased; }
  body {
    background: var(--bg);
    color: var(--gray-light);
    font-family: 'DM Sans', sans-serif;
    font-size: 11pt;
    line-height: 1.62;
  }
  .doc { max-width: 860px; margin: 0 auto; padding: 0 60px; }

  /* COVER */
  .cover {
    min-height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    page-break-after: always;
    padding: 40px 0;
  }
  .cover-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5pt;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 26px;
  }
  .cover-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 52pt;
    letter-spacing: -1.5px;
    line-height: 1.02;
    color: var(--white);
  }
  .cover-divider {
    width: 120px; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
    margin: 28px 0;
    border-radius: 2px;
  }
  .cover-subtitle {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: 18pt;
    line-height: 1.3;
    color: var(--gray-light);
    max-width: 620px;
    margin-bottom: 44px;
  }
  .cover-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5pt;
    letter-spacing: 1px;
    color: var(--gray);
  }
  .cover-meta > div { margin-bottom: 7px; }
  .cover-meta span { color: var(--gold-dim); }

  /* BODY TYPOGRAPHY */
  .body { padding-bottom: 60px; }
  .body h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 21pt;
    letter-spacing: -0.4px;
    line-height: 1.15;
    color: var(--white);
    margin: 38px 0 4px;
    padding-top: 20px;
    border-top: 1px solid var(--rule);
  }
  .body h2:first-child { border-top: none; padding-top: 0; margin-top: 8px; }
  .body h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 13.5pt;
    color: var(--gold);
    margin: 26px 0 6px;
  }
  .body p { margin: 0 0 12px; }
  .body strong { color: var(--white); font-weight: 600; }
  .body em { color: var(--gray-light); }
  .body a { color: var(--blue); text-decoration: none; }
  .body ul, .body ol { margin: 0 0 14px 22px; }
  .body li { margin-bottom: 7px; }
  .body hr {
    border: none;
    border-top: 1px solid var(--rule-soft);
    margin: 30px 0;
  }

  /* Intro italic lede (the framing paragraph) */
  .body > p > em:only-child,
  .body > p em { color: var(--gray-light); }

  /* CALLOUT — blockquote (the worked-example) */
  .body blockquote {
    background: var(--bg-card);
    border-left: 3px solid var(--gold);
    border-radius: 4px;
    padding: 16px 20px;
    margin: 0 0 16px;
    color: var(--white);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: 12pt;
    line-height: 1.5;
  }
  .body blockquote p { margin: 0; }

  /* TABLES */
  .body table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 22px;
    font-size: 9.5pt;
    line-height: 1.45;
    page-break-inside: auto;
  }
  .body thead { background: var(--bg-card-alt); }
  .body th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--gold);
    text-align: left;
    padding: 9px 11px;
    border-bottom: 1px solid var(--rule);
    vertical-align: bottom;
  }
  .body td {
    padding: 9px 11px;
    vertical-align: top;
    color: var(--gray-light);
    border-bottom: 1px solid var(--rule-soft);
  }
  .body tbody tr:nth-child(even) { background: rgba(255,255,255,0.018); }
  .body td strong { color: var(--white); }
  .body tr { page-break-inside: avoid; }

  /* The intro framing paragraph sits before the first H2 */
  .lede-block {
    font-size: 11.5pt;
    color: var(--gray-light);
    border-left: 3px solid var(--gold-dim);
    padding: 4px 0 4px 20px;
    margin: 4px 0 8px;
  }

  @media print {
    body { font-size: 10.5pt; }
    .doc { max-width: none; padding: 0; }
    .body h2 { page-break-after: avoid; }
    .body h3 { page-break-after: avoid; }
    .body table, .body blockquote { page-break-inside: avoid; }
  }
"""

# Light-mode overrides for print/PDF.
LIGHT_OVERRIDES = """
  :root {
    --bg: #FFFFFF;
    --bg-card: #F6F3EC;
    --bg-card-alt: #EFEBE1;
    --white: #15181F;
    --gray: #6B6E75;
    --gray-light: #33363D;
    --gold-dim: #9A7B32;
    --rule: rgba(154,123,50,0.45);
    --rule-soft: rgba(154,123,50,0.18);
  }
  body { background: #FFFFFF; color: var(--gray-light); }
  .body tbody tr:nth-child(even) { background: rgba(0,0,0,0.025); }
  .body a { color: #1E3A5F; }
"""


def wrap(body_html: str, light: bool) -> str:
    page_css = (
        "@page { size: Letter; margin: 0.7in 0.75in; }" if light else ""
    )
    extra = LIGHT_OVERRIDES if light else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{TITLE} — {DATE_STR}</title>
{FONTS}
<style>
{page_css}
{CSS}
{extra}
</style>
</head>
<body>
<div class="doc">
{body_html}
</div>
</body>
</html>
"""


def main() -> None:
    md_text = SRC.read_text()
    body_md = split_body(md_text)

    md = markdown.Markdown(extensions=["tables", "attr_list", "sane_lists"])
    body_inner = md.convert(body_md)

    body_html = render_cover() + f'<div class="body">{body_inner}</div>'

    OUT_DARK.write_text(wrap(body_html, light=False))
    OUT_LIGHT.write_text(wrap(body_html, light=True))
    print(f"Wrote {OUT_DARK.name} and {OUT_LIGHT.name}")

    # PDF via Playwright (light version).
    try:
        from playwright.sync_api import sync_playwright

        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.goto(OUT_LIGHT.as_uri())
            page.wait_for_timeout(1200)  # let webfonts load
            page.pdf(
                path=str(OUT_PDF),
                format="Letter",
                print_background=True,
                margin={"top": "0.7in", "right": "0.75in", "bottom": "0.7in", "left": "0.75in"},
            )
            browser.close()
        print(f"Wrote {OUT_PDF.name}")
    except Exception as e:  # noqa: BLE001
        print(f"PDF generation skipped/failed: {e}")
        print("Light HTML is available; print-to-PDF from a browser as a fallback.")


if __name__ == "__main__":
    main()
