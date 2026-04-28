#!/usr/bin/env python3
"""Render the AI vision PR Q&A HTML to a letter PDF via Playwright."""

from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
HTML = HERE / "ai-vision-prqa-justin-2026-04-27.html"
PDF = HERE / "ai-vision-prqa-justin-2026-04-27.pdf"


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(HTML.as_uri())
        page.wait_for_load_state("networkidle")
        page.pdf(
            path=str(PDF),
            format="Letter",
            print_background=True,
            margin={"top": "0.6in", "right": "0.6in", "bottom": "0.6in", "left": "0.6in"},
        )
        browser.close()
    print(f"PDF: {PDF}  ({PDF.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
