#!/usr/bin/env python3
"""
Build the unified Panda package PDF: mception infographic (page 1) +
Panda Operations Innovation whitepaper (pages 2-N) + Innovation Lab section.
Single PDF output. Re-runs the underlying renders, then concatenates.
"""
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

print("Step 1: render whitepaper (markdown → PDF)...")
subprocess.run([sys.executable, str(HERE / "render-whitepaper.py")], check=True, cwd=str(HERE))

print("Step 2: render mception infographic (HTML → PDF)...")
subprocess.run([sys.executable, str(HERE / "render-onepager.py")], check=True, cwd=str(HERE))

print("Step 3: concatenate (1-pager + whitepaper) → panda-package-2026-04-30.pdf...")
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_path in [HERE / "mception-onepager-2026-04-30.pdf",
                 HERE / "whitepaper-2026-04-30.pdf"]:
    reader = PdfReader(str(pdf_path))
    for page in reader.pages:
        writer.add_page(page)

out_path = HERE / "panda-package-2026-04-30.pdf"
with open(out_path, "wb") as f:
    writer.write(f)
print(f"  wrote {out_path.name}")

import re
data = out_path.read_bytes()
pages = len(re.findall(rb"/Type\s*/Page[^s]", data))
print(f"  total pages: {pages}")
