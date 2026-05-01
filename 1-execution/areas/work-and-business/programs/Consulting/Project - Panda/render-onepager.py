#!/usr/bin/env python3
"""Render the mception infographic one-pager: light HTML + PDF from the
hand-crafted dark-mode HTML. Run separately from render-whitepaper.py."""
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
dark_path = HERE / "mception-onepager-2026-04-30.html"
light_path = HERE / "mception-onepager-2026-04-30-light.html"
pdf_path = HERE / "mception-onepager-2026-04-30.pdf"

dark = dark_path.read_text()

swaps = [
    ("--bg: #0C0F14;",        "--bg: #FFFFFF;"),
    ("--bg-card: #13161D;",   "--bg-card: #F7F5F0;"),
    ("--bg-card-alt: #181C25;", "--bg-card-alt: #EDEBE5;"),
    ("--bg-card-mute: #0F1218;", "--bg-card-mute: #F4F2EC;"),
    ("--gold: #D4A843;",      "--gold: #9C7A1F;"),
    ("--gold-dim: #9A7B32;",  "--gold-dim: #B8922E;"),
    ("--white: #F0EDE6;",     "--white: #1A1A1A;"),
    ("--gray: #8A8D94;",      "--gray: #6B6E75;"),
    ("--gray-light: #B0B3BA;", "--gray-light: #3A3D44;"),
    ("--red: #C45C5C;",       "--red: #A33A3A;"),
    ("--rule: rgba(255,255,255,0.08);",        "--rule: rgba(0,0,0,0.10);"),
    ("--rule-strong: rgba(255,255,255,0.16);", "--rule-strong: rgba(0,0,0,0.18);"),
    ("--grid-tint: rgba(212,168,67,0.03);",    "--grid-tint: rgba(156,122,31,0.04);"),
    ("rgba(212,168,67,0.08)", "rgba(156,122,31,0.10)"),
    ("rgba(212,168,67,0.02)", "rgba(156,122,31,0.02)"),
]
light = dark
for old, new in swaps:
    light = light.replace(old, new)

light_path.write_text(light)
print(f"wrote {light_path.name}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{light_path.resolve()}")
    page.wait_for_load_state("networkidle")
    page.pdf(
        path=str(pdf_path),
        format="Letter",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        prefer_css_page_size=True,
    )
    browser.close()
print(f"wrote {pdf_path.name}")
