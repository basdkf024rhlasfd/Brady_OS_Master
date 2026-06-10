#!/usr/bin/env python3
"""
render_whitepaper.py — Turn a markdown white paper into an executive-grade PDF + HTML.

This is the rendering stage of the "Deep Research → Executive White Paper" pipeline
(see SKILL.md in this folder). Markdown is the source of truth; this script produces
a dark-mode HTML (screen) and a light-mode HTML (print) and then a Letter-portrait PDF.

WHY IT LOOKS LIKE A CONSULTING DELIVERABLE AND NOT A WALL OF TEXT:
  - A fixed three-font system (display / body / mono) + one accent color.
  - Section rules, styled tables, callout blockquotes, a real cover page.
  - Light-mode print variant so it reads clean on paper and on a projector.

DEPENDENCIES:
  pip install markdown playwright pyyaml
  playwright install chromium
  (optional, for visual QA: poppler's `pdftoppm`, and `pypdf` for a page count)

USAGE:
  python3 render_whitepaper.py \
      --md my-paper.md \
      --out-dir ./out \
      --title "Insourcing the Build" \
      --subtitle "Vertically Integrating GC Capability at Retail Scale" \
      --label "WALMART · PRECEDENT RESEARCH" \
      --prepared-for "Mark · Walmart" \
      --date "June 9, 2026"

CONVENTION:
  Put the literal marker `<!-- RENDER-BODY-START -->` in your markdown right before the
  first body heading (e.g. "## Executive Summary"). Everything ABOVE the marker (your
  human-readable title block) is ignored by the renderer, because the cover is built from
  the CLI flags. If the marker is absent, the whole file is rendered as the body.
"""
from __future__ import annotations

import argparse
from pathlib import Path

import markdown


# ─────────────────────────────────────────────────────────────────────────────
# Design tokens. Change these four values to re-skin the whole document.
# ─────────────────────────────────────────────────────────────────────────────
FONT_DISPLAY = "Space Grotesk"   # titles, stat numbers
FONT_BODY = "DM Sans"            # body copy
FONT_MONO = "JetBrains Mono"     # labels, table headers, source citations
ACCENT = "#D4A843"               # one accent color (a warm gold here)

FONTS_LINK = (
    '<link href="https://fonts.googleapis.com/css2?'
    "family=Space+Grotesk:wght@400;500;600;700&"
    "family=DM+Sans:wght@400;500;600&"
    'family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
)


def build_css(light: bool) -> str:
    # Dark palette (screen) vs light palette (print). Every element that sets a
    # background also sets a color — non-negotiable for readability.
    if light:
        bg, card, card_alt = "#FFFFFF", "#F6F3EC", "#EFEBE1"
        ink, gray, gray_light = "#15181F", "#6B6E75", "#33363D"
        gold_dim = "#9A7B32"
        rule, rule_soft = "rgba(154,123,50,0.45)", "rgba(154,123,50,0.18)"
        even_row, link = "rgba(0,0,0,0.025)", "#1E3A5F"
        page_rule = "@page { size: Letter; margin: 0.7in 0.75in; }"
    else:
        bg, card, card_alt = "#0C0F14", "#13161D", "#181C25"
        ink, gray, gray_light = "#F0EDE6", "#8A8D94", "#B0B3BA"
        gold_dim = "#9A7B32"
        rule, rule_soft = "rgba(212,168,67,0.22)", "rgba(212,168,67,0.10)"
        even_row, link = "rgba(255,255,255,0.018)", "#4A7FB5"
        page_rule = ""

    return f"""
  {page_rule}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html {{ -webkit-font-smoothing: antialiased; }}
  body {{ background: {bg}; color: {gray_light}; font-family: '{FONT_BODY}', sans-serif;
         font-size: 11pt; line-height: 1.62; }}
  .doc {{ max-width: 860px; margin: 0 auto; padding: 0 60px; }}

  /* COVER */
  .cover {{ min-height: 92vh; display: flex; flex-direction: column; justify-content: center;
           align-items: flex-start; page-break-after: always; padding: 40px 0; }}
  .cover-label {{ font-family: '{FONT_MONO}', monospace; font-size: 9.5pt; letter-spacing: 3.5px;
                 text-transform: uppercase; color: {ACCENT}; margin-bottom: 26px; }}
  .cover-title {{ font-family: '{FONT_DISPLAY}', sans-serif; font-weight: 700; font-size: 52pt;
                 letter-spacing: -1.5px; line-height: 1.02; color: {ink}; }}
  .cover-divider {{ width: 120px; height: 3px;
                   background: linear-gradient(90deg, {ACCENT}, {gold_dim});
                   margin: 28px 0; border-radius: 2px; }}
  .cover-subtitle {{ font-family: '{FONT_DISPLAY}', sans-serif; font-weight: 500; font-size: 18pt;
                    line-height: 1.3; color: {gray_light}; max-width: 620px; margin-bottom: 44px; }}
  .cover-meta {{ font-family: '{FONT_MONO}', monospace; font-size: 9.5pt; letter-spacing: 1px;
                color: {gray}; }}
  .cover-meta > div {{ margin-bottom: 7px; }}
  .cover-meta span {{ color: {gold_dim}; }}

  /* BODY */
  .body {{ padding-bottom: 60px; }}
  .body h2 {{ font-family: '{FONT_DISPLAY}', sans-serif; font-weight: 700; font-size: 21pt;
             letter-spacing: -0.4px; line-height: 1.15; color: {ink};
             margin: 38px 0 4px; padding-top: 20px; border-top: 1px solid {rule}; }}
  .body h2:first-child {{ border-top: none; padding-top: 0; margin-top: 8px; }}
  .body h3 {{ font-family: '{FONT_DISPLAY}', sans-serif; font-weight: 600; font-size: 13.5pt;
             color: {ACCENT}; margin: 26px 0 6px; }}
  .body p {{ margin: 0 0 12px; }}
  .body strong {{ color: {ink}; font-weight: 600; }}
  .body a {{ color: {link}; text-decoration: none; }}
  .body ul, .body ol {{ margin: 0 0 14px 22px; }}
  .body li {{ margin-bottom: 7px; }}
  .body hr {{ border: none; border-top: 1px solid {rule_soft}; margin: 30px 0; }}

  /* CALLOUT (markdown blockquote → highlighted box, good for the worked example) */
  .body blockquote {{ background: {card}; border-left: 3px solid {ACCENT}; border-radius: 4px;
                     padding: 16px 20px; margin: 0 0 16px; color: {ink};
                     font-family: '{FONT_DISPLAY}', sans-serif; font-weight: 500;
                     font-size: 12pt; line-height: 1.5; }}
  .body blockquote p {{ margin: 0; }}

  /* TABLES */
  .body table {{ width: 100%; border-collapse: collapse; margin: 8px 0 22px; font-size: 9.5pt;
                line-height: 1.45; }}
  .body thead {{ background: {card_alt}; }}
  .body th {{ font-family: '{FONT_MONO}', monospace; font-size: 8.5pt; letter-spacing: 1px;
             text-transform: uppercase; color: {ACCENT}; text-align: left; padding: 9px 11px;
             border-bottom: 1px solid {rule}; vertical-align: bottom; }}
  .body td {{ padding: 9px 11px; vertical-align: top; color: {gray_light};
             border-bottom: 1px solid {rule_soft}; }}
  .body tbody tr:nth-child(even) {{ background: {even_row}; }}
  .body td strong {{ color: {ink}; }}
  .body tr {{ page-break-inside: avoid; }}

  @media print {{
    body {{ font-size: 10.5pt; }}
    .doc {{ max-width: none; padding: 0; }}
    .body h2, .body h3 {{ page-break-after: avoid; }}
    .body table, .body blockquote {{ page-break-inside: avoid; }}
  }}
"""


def split_body(md_text: str) -> str:
    marker = "<!-- RENDER-BODY-START -->"
    return md_text.split(marker, 1)[1].strip() if marker in md_text else md_text.strip()


def render_cover(a: argparse.Namespace) -> str:
    import html as h
    return f"""
    <section class="cover">
      <div class="cover-label">{h.escape(a.label)}</div>
      <h1 class="cover-title">{h.escape(a.title)}</h1>
      <div class="cover-divider"></div>
      <div class="cover-subtitle">{h.escape(a.subtitle)}</div>
      <div class="cover-meta">
        <div>PREPARED FOR · <span>{h.escape(a.prepared_for)}</span></div>
        <div>DATE · <span>{h.escape(a.date)}</span></div>
        <div>CLASSIFICATION · <span>{h.escape(a.classification)}</span></div>
      </div>
    </section>
    """


def wrap(body_html: str, a: argparse.Namespace, light: bool) -> str:
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<title>{a.title}</title>{FONTS_LINK}<style>{build_css(light)}</style></head>
<body><div class="doc">{body_html}</div></body></html>"""


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--md", required=True, help="input markdown file")
    p.add_argument("--out-dir", default=".", help="output directory")
    p.add_argument("--title", required=True)
    p.add_argument("--subtitle", default="")
    p.add_argument("--label", default="PRECEDENT RESEARCH")
    p.add_argument("--prepared-for", default="")
    p.add_argument("--date", default="")
    p.add_argument("--classification", default="DISCUSSION DRAFT")
    p.add_argument("--stem", default=None, help="output filename stem (defaults to md stem)")
    a = p.parse_args()

    md_path = Path(a.md)
    out_dir = Path(a.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = a.stem or md_path.stem
    out_dark = out_dir / f"{stem}.html"
    out_light = out_dir / f"{stem}-light.html"
    out_pdf = out_dir / f"{stem}.pdf"

    body_md = split_body(md_path.read_text())
    md = markdown.Markdown(extensions=["tables", "attr_list", "sane_lists"])
    inner = md.convert(body_md)
    body_html = render_cover(a) + f'<div class="body">{inner}</div>'

    out_dark.write_text(wrap(body_html, a, light=False))
    out_light.write_text(wrap(body_html, a, light=True))
    print(f"Wrote {out_dark.name} (dark/screen) and {out_light.name} (light/print)")

    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as pw:
            browser = pw.chromium.launch()
            page = browser.new_page()
            page.goto(out_light.resolve().as_uri())
            page.wait_for_timeout(1200)  # let webfonts load before printing
            page.pdf(path=str(out_pdf), format="Letter", print_background=True,
                     margin={"top": "0.7in", "right": "0.75in",
                             "bottom": "0.7in", "left": "0.75in"})
            browser.close()
        print(f"Wrote {out_pdf.name}")
    except Exception as e:  # noqa: BLE001
        print(f"PDF step skipped ({e}). Open {out_light.name} and Print → Save as PDF.")


if __name__ == "__main__":
    main()
