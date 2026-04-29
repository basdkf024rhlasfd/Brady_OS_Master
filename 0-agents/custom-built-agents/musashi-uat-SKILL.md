---
name: Musashi UAT — Image-Bearing Surface Checklist
owner: musashi-san (deploy mode)
version: 1.0
created: 2026-04-29
trigger: any skill or workflow that ships a rendered surface containing images
        (HTML viewer, PDF, mception page, Notion DB row, exec brief, deck, social asset).
        Also: "uat this", "run musashi uat", "verify the images", "check the surface".
---

# Musashi UAT — Image-Bearing Surface Checklist

## Why this exists

2026-04-29 incident: Innovation Workshop Run 7 was reported "complete" after
9 Midjourney images were downloaded, HTML placeholders swapped for `<img>`
tags, and a 19MB PDF regenerated and pushed. Brady tested with Chrome MCP
and found:

1. mception.ai/innovation-lab Run 7 cards had blank image slots (Image URL
   field on Notion was never set on the new pages)
2. PDF had images embedded but rendered at 210×90 pts on an 11×17" Tabloid
   page (`width:280px; height:280px; object-fit:contain` clipped panoramic
   1680×720 MJ output to a thin strip)
3. The Run option was still labeled "Run 7 — Orange Chicken" from a prior
   schema artifact, never renamed to match the actual run

Root cause: the agent trusted file size + git commit + tool-success messages
as proof. Never opened the rendered surface. **Files existing is not the
same as images visible.**

## Hard rule (now in memory)

`feedback_image_uat_mandatory.md` — for any image-bearing deliverable,
running the pipeline is the precondition; running the UAT is what proves
done. **No surface is shippable until every hero image is screen-verified
in Chrome MCP.**

## When to run

- After any innovation-workshop run finishes Step 6 (assemble document)
- After any exec-intel-brief, daily-whitepaper, deck-generator,
  presentation-engine, infographic-builder, marketing-templates, or
  client-engagement-kit run that produces a final visual deliverable
- After any Notion DB write that populates an `Image URL` / cover image
  field that drives a live mception viewer
- After any midjourney-generate batch that hands off to a downstream
  rendering skill
- Whenever Brady says "verify the images" or "uat this" or asks why
  something on mception "looks broken"

## The 6-check UAT

For every surface that should show images, work through this list. Stop and
fix the moment any check fails. Do not partial-pass.

### 1. Open the actual final surface in Chrome MCP

- Live mception page: navigate to the production URL the user will visit
  (e.g., `mception.ai/innovation-lab` not the iframe target). Wait 3-5s
  after load before screenshotting — Notion-backed viewers fetch async.
- PDF: serve from a local HTTP server (`python3 -m http.server 8765` from
  the output dir) and open `http://localhost:8765/<file>.pdf`. Chrome
  blocks `file://` PDFs. The chrome PDF viewer's thumbnails reveal page
  layout faster than full-page rendering.
- Notion DB row: open the page directly via its `notion.so/<id>` URL and
  confirm the cover/Image URL is what you wrote.
- Standalone HTML: same local-server approach as PDF.

### 2. Screenshot and visually inspect

- Take a screenshot, not just a `read_page`/`read_console`. The agent
  must SEE the image, not just confirm an `<img>` tag exists in DOM.
- Compare against the source images you generated. Are these the right
  hero shots? Right idea-to-image mapping?
- Look for: blank gray boxes, broken-image icons, alt-text only, "Stage 1"
  badges with no thumbnail, tiny strips that suggest aspect-ratio
  clipping.

### 3. Confirm metadata is correct

- Page/run title matches the intended label (no "Run 7 — Orange Chicken"
  when the run is cardboard transformation).
- Card category, score, method tags reflect what was generated.
- Date stamp is today, not a stale prior date.
- If a viewer has a filter dropdown, select the relevant option and
  re-screenshot the filtered view.

### 4. Walk every hero image, not just the first one

- Scroll through the page/PDF and check each idea individually. A run
  with 9 priority images means 9 separate visual confirmations.
- For PDFs: confirm each product page has a visible image, not just
  the cover. Use `pymupdf` to count embedded images and inspect bboxes
  if visual inspection is ambiguous:
  ```bash
  python3 -c "import fitz; d=fitz.open('FILE.pdf');
  [print(f'p{i+1}: {len(d[i].get_images(full=True))} imgs, bbox={d[i].get_image_rects(d[i].get_images(full=True)[0][0])[0] if d[i].get_images(full=True) else None}') for i in range(len(d))]"
  ```
  Image bbox under ~200×100 pts on a Tabloid (792×1224) page = clipped,
  not visible. Fix the CSS.

### 5. Check the console for silent failures

- Open Chrome DevTools console and read messages with pattern
  `error|404|fail|cors`. Image URLs that 404 silently are common —
  especially for blob storage with expired tokens.
- For Notion-backed viewers, also test the API endpoint the viewer hits
  (e.g., the `/api/ideas` route or whatever returns the data) — make
  sure it returns JSON, not an HTML error page.

### 6. Cross-surface consistency

- If the same content ships to both a PDF and a live viewer (innovation
  workshop runs both), the hero image on each should be the same MJ
  output. Drift here means one surface read from the local file and the
  other from a stale CDN URL.
- Routing Log entry: when UAT passes, write a row to the Routing Log DB
  with `surface=<url>`, `images_verified=<count>`, `metadata_correct=true`,
  `run_id=<run identifier>`. When it fails, write the failure mode in
  full so future runs of this skill can detect the same drift.

## Failure modes catalogued (so far)

- **Empty Image URL field in Notion** → live viewer shows blank slots.
  Fix: write the canonical `https://cdn.midjourney.com/<jobId>/0_2_2048_N.webp`
  to each row's `Image URL` after the MJ batch downloads.
- **Square CSS box clipping panoramic image** → PDF shows tiny strip or
  blank space. Fix: `width: 420px; height: auto; display: block`.
- **Wrong Run select option used at create-page time** → all cards show
  the wrong cohort label. Fix: ALTER COLUMN to add the correct option
  first, then update each page's `Run` property. Old option can stay
  as-is for archaeology.
- **HTML uses local `images-runX/` paths but PDF served from a different
  cwd** → Playwright fails silently and PDF has empty image boxes. Fix:
  always run Playwright from the directory containing the HTML.
- **Live viewer iframed under a portal route** (e.g.,
  `mception.ai/innovation-lab` → `innovation-lab-silk.vercel.app`) → if
  you only test the inner URL, you miss portal-level Clerk auth issues.
  Fix: test the public mception URL the user will actually click.

## Output

When UAT completes successfully, return a short report:

```
UAT — <surface name> (<URL>)
✓ All N hero images visually confirmed
✓ Metadata correct (run label, dates, scores)
✓ No console errors
✓ Cross-surface match: live viewer = PDF
Routing Log row written.
```

When UAT fails, stop the parent skill, return the specific failed checks,
and offer a one-line fix for each. Do not silently pass.

## Calling pattern

This is a sub-skill — call it from the parent skill at the
"about to declare done" moment. Pass:

- `surface_url` — the URL or file path Chrome will hit
- `expected_image_count` — how many hero images should be visible
- `metadata_expected` — `{run_label, date, category}` etc.
- `notion_image_field` — if applicable, the field name on the Notion DB

Return: `pass` (with the report above) or `fail` (with reason + remediation).
