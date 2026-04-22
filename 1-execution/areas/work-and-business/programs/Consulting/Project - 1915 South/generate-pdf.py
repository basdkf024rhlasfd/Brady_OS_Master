#!/usr/bin/env python3
"""Render the light-mode HTML to a Tabloid PDF via Playwright."""

from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
LIGHT_HTML = HERE / "innovation-workshop-1915-south-2026-04-22-light.html"
PDF = HERE / "innovation-workshop-1915-south-2026-04-22.pdf"


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(LIGHT_HTML.as_uri())
        page.pdf(
            path=str(PDF),
            format="Tabloid",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        browser.close()
    print(f"PDF: {PDF}  ({PDF.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
