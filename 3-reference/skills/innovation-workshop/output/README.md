# Output directory

Rendered PDFs and Midjourney image sets from past runs were removed from the
working tree on 2026-07-16 (240MB of generated artifacts, approved by Brady).
The HTML sources in this directory remain and are the canonical record of each
run — PDFs can be re-rendered from them.

Recovery of removed files (until any history rewrite):
`git checkout 96313b1b8bd171017050b9dd2051dc6cbe6f3cb5 -- "<path>"`

Full manifest: `docs/investigations/removed-artifact-manifest-2026-07-16.md`
(also archived in Google Drive: "Brady OS Repo Archive — 2026-07-16").

New run outputs should go to ~/brady-os-local or portal/public (if client-facing),
not into git — this directory is gitignored for PDFs/PNGs going forward.
