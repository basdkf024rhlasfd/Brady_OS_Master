# Infographic Component Catalog

17 reusable CSS component types for building infographics at 1080x1920. Each component is a self-contained HTML/CSS block that can be composed vertically to fill the canvas.

---

## Layout Components

### 1. Header Block
Full-width title area with topic name, subtitle, and optional category tag.
- Height: ~200-280px
- Contains: h1 (topic), p (subtitle), optional span (category pill)
- Background: accent color or gradient-free dark

### 2. Section Header
Divider between content sections. Signals topic shift.
- Height: ~60-80px
- Contains: h2 or h3 with optional section number
- Style: left-aligned, gold accent underline or left border

### 3. Source Footer
Bottom strip with branding, CTA, and source attributions.
- Height: ~120-160px
- Contains: headshot (optional), name/handle, CTA text, source list
- Must be visible without scrolling at 1080x1920

## Data Components

### 4. Stat Card
Single metric with label and context. The workhorse of data-driven infographics.
- Size: ~200x160px per card (stack 2-3 across)
- Contains: large number (h2), label (p), optional trend indicator (arrow + %)
- Style: card background, rounded corners (4px), no box-shadow

### 5. Metric Grid
2x2 or 3x3 grid of stat cards. For showing multiple KPIs at once.
- Full width, auto-sizing cells
- Each cell is a stat card
- Style: consistent spacing (16-24px gap), uniform card height

### 6. Benchmark Table
Comparison table with 2-4 columns. For before/after, us-vs-them, or multi-option comparisons.
- Full width
- Contains: header row (labels), data rows, optional highlight row
- Style: alternating row backgrounds, accent color for highlight

### 7. Progress Bar
Horizontal bar showing completion, percentage, or relative proportion.
- Full width
- Contains: label, bar (filled + empty), percentage text
- Style: accent color fill, muted background for empty portion

## Content Components

### 8. Thesis Bar
Bold statement or key insight. Used to punctuate between data sections.
- Full width, ~100-140px height
- Contains: single sentence (h3 or large p)
- Style: accent background or accent left border, centered or left-aligned

### 9. Dual Panel
Side-by-side comparison. Two columns with headers and content.
- Full width, 50/50 split
- Contains: left header + content, right header + content
- Use cases: before/after, problem/solution, option A/option B

### 10. Quote Card
Attributed quote or testimonial.
- Full width or 80% width centered
- Contains: quote text (italic or styled), attribution (name, title, org)
- Style: large quotation mark accent, card background

### 11. Callout Box
Highlighted insight, warning, or key takeaway.
- Full width, ~100-140px
- Contains: icon (optional), callout text
- Style: accent-tinted background (5-10% opacity), left border accent

### 12. Comparison Table
Side-by-side with checkmarks/x-marks. For feature comparisons or yes/no evaluations.
- Full width
- Contains: row labels, 2-3 columns with check/x/partial indicators
- Style: green checks, red x-marks, muted partial indicators

## Visual Components

### 13. Icon Row
Horizontal row of icon + label pairs. For listing features, tools, or categories.
- Full width
- Contains: 3-5 icon/label pairs, evenly spaced
- Style: icons should be simple (emoji or SVG), labels below

### 14. Timeline
Vertical or horizontal sequence of events/steps.
- Full width
- Contains: nodes (circles or dots) connected by lines, with labels and descriptions
- Style: accent color for nodes, muted line connector

### 15. Proportion Diagram
Visual representation of relative sizes (not a chart — use sized blocks or circles).
- Full width
- Contains: labeled blocks or circles with proportional sizing
- Use cases: market share, budget allocation, time distribution

### 16. Tag Cluster
Group of pill-shaped tags for categories, skills, or keywords.
- Full width, wrapping
- Contains: individual tag pills with text
- Style: accent-tinted background, rounded-full corners, consistent padding

### 17. CTA Bar
Call-to-action strip, typically near the bottom above the footer.
- Full width, ~80-100px
- Contains: CTA text, optional URL or handle
- Style: accent background, contrasting text, stands out from content sections

---

## Composition Rules

1. **Vertical stacking:** Components stack top-to-bottom to fill 1920px height
2. **Spacing:** 16-24px between components. No touching, no excessive gaps.
3. **Hierarchy:** Header Block → Content Components → Source Footer (always this order)
4. **Density:** Aim for 5-8 components per infographic. Fewer = too sparse. More = too crowded.
5. **Variety:** Don't use the same component type 3+ times in a row. Mix data + content + visual.
6. **Width:** All components are full-width (1080px) with 40-60px horizontal padding.
