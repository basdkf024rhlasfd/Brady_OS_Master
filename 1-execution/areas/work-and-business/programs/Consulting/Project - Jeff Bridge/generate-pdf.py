#!/usr/bin/env python3
"""Generate light-mode HTML and PDF from the dark-mode whitepaper."""
import re
import os
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DARK_HTML = os.path.join(BASE_DIR, "jeff-bridge-ai-os-whitepaper.html")
LIGHT_HTML = os.path.join(BASE_DIR, "jeff-bridge-ai-os-whitepaper-light.html")
PDF_OUTPUT = os.path.join(BASE_DIR, "jeff-bridge-ai-os-whitepaper.pdf")

# Read dark HTML
with open(DARK_HTML, "r") as f:
    html = f.read()

# CSS variable swaps: dark → light
swaps = [
    ("--bg: #0C0F14", "--bg: #FFFFFF"),
    ("--bg-card: #13161D", "--bg-card: #F5F5F3"),
    ("--bg-card-alt: #181C25", "--bg-card-alt: #EDECEA"),
    ("--white: #F0EDE6", "--white: #1A1A1A"),
    ("--gray: #8A8D94", "--gray: #6B6E75"),
    ("--gray-light: #B0B3BA", "--gray-light: #4A4D54"),
    ("--red: #C45C5C", "--red: #B83A3A"),
    ("--red-dim: #8B3A3A", "--red-dim: #C45C5C"),
    ("--gold-dim: #9A7B32", "--gold-dim: #B8922E"),
]

light_html = html
for old, new in swaps:
    light_html = light_html.replace(old, new)

# Swap rgba(255,255,255,...) → rgba(0,0,0,...)
light_html = re.sub(
    r'rgba\(255\s*,\s*255\s*,\s*255\s*,',
    'rgba(0,0,0,',
    light_html
)

# Swap rgba(212,168,67,0.03) grid overlay to darker for light mode
light_html = light_html.replace(
    "rgba(212,168,67,0.03)",
    "rgba(212,168,67,0.06)"
)

# Write light HTML
with open(LIGHT_HTML, "w") as f:
    f.write(light_html)
print(f"Light HTML written to: {LIGHT_HTML}")

# Generate PDF
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{LIGHT_HTML}")
    page.wait_for_timeout(3000)
    page.pdf(
        path=PDF_OUTPUT,
        format="Tabloid",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
    )
    browser.close()
    print(f"PDF written to: {PDF_OUTPUT}")
