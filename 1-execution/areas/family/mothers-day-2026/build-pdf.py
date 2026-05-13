"""Render each HTML page to PDF, then merge into one keepsake PDF."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from pypdf import PdfWriter, PdfReader

ROOT = Path(__file__).parent
PAGES = [
    ("cover",   ROOT / "cover-page.html"),
    ("lily",    ROOT / "lily" / "lily-page.html"),
    ("faith",   ROOT / "faith" / "faith-page.html"),
    ("isla",    ROOT / "isla" / "isla-page.html"),
    ("luke",    ROOT / "luke" / "luke-page.html"),
    ("quinn",   ROOT / "quinn" / "quinn-page.html"),
]
OUT_DIR = ROOT / "_pdf_pages"
OUT_DIR.mkdir(exist_ok=True)
FINAL = ROOT / "mothers-day-2026-keepsake.pdf"

def render_page(page, html_path: Path, pdf_path: Path):
    page.goto(html_path.absolute().as_uri(), wait_until="networkidle")
    page.emulate_media(media="print")
    page.pdf(
        path=str(pdf_path),
        format="Letter",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        prefer_css_page_size=True,
    )

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page_pdfs = []
    for name, html in PAGES:
        out = OUT_DIR / f"{name}.pdf"
        print(f"render {name} ...")
        render_page(page, html, out)
        page_pdfs.append(out)
    browser.close()

writer = PdfWriter()
for pdf_path in page_pdfs:
    reader = PdfReader(str(pdf_path))
    for p in reader.pages:
        writer.add_page(p)
with open(FINAL, "wb") as f:
    writer.write(f)
print(f"\ndone -> {FINAL}")
print(f"size: {FINAL.stat().st_size / 1_000_000:.1f} MB")
