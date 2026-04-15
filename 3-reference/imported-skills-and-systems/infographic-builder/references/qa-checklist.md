# Infographic QA Checklist

Score each item 0-10. Minimum passing score: **80/100**. Auto-fix any violations and re-render before presenting to Brady.

---

## The 10 Checks

### 1. Font Stack (10 pts)
- All text uses the declared font stack (Space Grotesk for titles, DM Sans for body if using mception tokens)
- No system fonts, no serif fallbacks visible
- **0 pts:** Wrong font anywhere. **5 pts:** Correct fonts but inconsistent weights. **10 pts:** Perfect.

### 2. Color Palette (10 pts)
- Every color matches the declared CSS variables
- No off-brand colors (#000000 black, pure #FFFFFF white, random blues/greens)
- **0 pts:** Off-brand colors dominate. **5 pts:** 1-2 off-brand instances. **10 pts:** All on-palette.

### 3. Contrast & Readability (10 pts)
- All text readable against its background
- "Projector in a sunlit room" test — would this be legible on a phone screen in daylight?
- Dark backgrounds get light text. Light backgrounds get dark text. No exceptions.
- **0 pts:** Unreadable sections. **5 pts:** Marginal contrast in 1-2 areas. **10 pts:** Clear everywhere.

### 4. Footer Visible (10 pts)
- Footer (branding, CTA, source attribution) visible without scrolling at 1080x1920
- Footer does not overlap content
- **0 pts:** No footer or hidden below fold. **5 pts:** Footer present but cramped. **10 pts:** Clean, visible footer.

### 5. Data Sourced (10 pts)
- All statistics, metrics, and claims have source attribution
- Sources appear in footer or inline
- **0 pts:** Unsourced claims. **5 pts:** Some sources missing. **10 pts:** Everything attributed.

### 6. Estimates Labeled (10 pts)
- Estimates, projections, and approximations explicitly labeled as such
- No precision theater (e.g., "$4,237,891 projected revenue" when it's a rough estimate)
- **0 pts:** Estimates presented as facts. **5 pts:** Some unlabeled. **10 pts:** All estimates flagged.

### 7. Anti-Pattern Free (10 pts)
- No `box-shadow`
- No empty/spacer divs
- No gradients on text
- No stock photo vibes (generic icons, clip art)
- Body text >= 18px
- **0 pts:** Multiple anti-patterns. **5 pts:** 1 minor violation. **10 pts:** Clean.

### 8. Layout at Target Size (10 pts)
- Renders correctly at 1080x1920 (no horizontal scroll, no clipping, no overflow)
- Content fills the canvas — no excessive dead space
- Visual hierarchy clear: header → body → footer reads top-to-bottom
- **0 pts:** Broken layout. **5 pts:** Minor spacing issues. **10 pts:** Pixel-perfect.

### 9. Light/Dark Mode (10 pts)
- If producing both modes: CSS variable swap works correctly
- Dark mode is primary; light mode for print/PDF if needed
- No "dark text on dark background" artifacts in either mode
- **0 pts:** Mode swap broken. **5 pts:** Minor artifacts. **10 pts:** Both modes clean. **N/A if single mode only — award 10 pts.**

### 10. File Naming (10 pts)
- Output follows convention: `outputs/<topic-slug>/v1_YYYY-MM-DD.{html,png}`
- Topic slug is lowercase, hyphenated, descriptive
- Version number increments on revisions
- **0 pts:** No convention followed. **5 pts:** Partially correct. **10 pts:** Correct naming.

---

## Scoring

| Score | Verdict | Action |
|-------|---------|--------|
| 90-100 | Ship it | Present to Brady |
| 80-89 | Acceptable | Present with notes on deductions |
| 60-79 | Fix required | Auto-fix violations, re-score |
| <60 | Rebuild | Start the HTML from scratch |
