#!/usr/bin/env python3
"""Generate PDF from the full whitepaper."""
import os
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_INPUT = os.path.join(BASE_DIR, "jeff-bridge-ai-os-whitepaper-full.html")
PDF_OUTPUT = os.path.join(BASE_DIR, "jeff-bridge-ai-os-whitepaper-full.pdf")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{HTML_INPUT}")
    page.wait_for_timeout(3000)
    page.pdf(
        path=PDF_OUTPUT,
        format="Letter",
        print_background=True,
        margin={"top": "0.75in", "right": "0.75in", "bottom": "0.75in", "left": "0.75in"},
    )
    browser.close()
    print(f"PDF written to: {PDF_OUTPUT}")
