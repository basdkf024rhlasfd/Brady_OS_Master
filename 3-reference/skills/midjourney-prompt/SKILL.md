---
name: midjourney-prompt
description: >
  Generates one optimal Midjourney prompt for any product idea Brady describes. Outputs a
  copy-paste-ready prompt optimized for clean, buyer-ready product photography with correct
  text handling, smart presentation by product type, and a matchable download filename.

  Trigger this skill whenever Brady says "midjourney prompt", "product image", "visualize this
  product", "MJ prompt", "render this product", "product shot", "imagine this", "generate a
  product image", or any variation requesting a Midjourney prompt for a product concept.
---

# Midjourney Prompt

One product idea in, one copy-paste Midjourney prompt out. Optimized for clean, professional
product photography that a buyer or business leader would immediately understand.

## Why This Exists

Brady imagines products constantly — food, beverage, industrial, tech, lifestyle. He needs to
go from idea to visual fast. The prompt needs to be right the first time: proper shot type for
the product category, correct text rendering strategy, and a filename he can find later. No
prompt engineering rabbit holes — just one good shot per idea.

## Execution Environment

**Runs on**: Any Claude session (Claude Code, Claude Desktop, mobile)
**Input**: A product idea described in natural language
**Output**: One Midjourney prompt (code block) + suggested download filename

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Workflow

### Step 1: CLASSIFY the Product Type

Determine which category fits. This drives shot type, environment, and lighting.

| Category | Examples | Shot Style | Environment | Lighting |
|----------|----------|-----------|-------------|----------|
| **Packaged Food/Bev** | coffee bag, snack box, sauce bottle | Packaging hero, 45-degree angle | Marble/wood surface, lifestyle | Warm studio, soft box |
| **Bottled Beverage** | cold brew can, craft beer, juice | Hero bottle/can, slight condensation | Bar top, kitchen counter, gradient backdrop | Dramatic rim light, studio |
| **Cosmetics/Personal Care** | skincare, soap, candle | Packaging close-up, editorial | Marble, linen, botanical accents | Soft diffused, high-key |
| **Industrial/Construction** | PVC fittings, tools, hardware | Product in context, scale reference | Jobsite, warehouse, workshop | Natural + fill light |
| **Tech/Electronics** | smart device, gadget, accessory | Minimalist hero, floating or surface | Clean white or dark gradient | Dramatic side light, rim light |
| **Apparel/Accessories** | hat, bag, shoes, watch | Styled flat lay or display | Textured surface, lifestyle | Soft editorial |
| **Home/Kitchen** | cookware, furniture, decor | Styled in-room or isolated hero | Kitchen, living space, studio | Natural window + studio fill |
| **Generic/Other** | Anything else | Hero shot, white background | Studio | Three-point studio |

### Step 2: BUILD the Prompt

Use this structure — write it like you're briefing a photographer, not keyword-stuffing:

```
[Specific product with materials/finishes/colors], [shot type], [surface or environment],
[lighting setup], [composition style], commercial product photography
--ar [ratio] --v 7 --q 2 --style raw --no watermark --no text artifacts
```

**Parameter defaults:**

| Parameter | Default | Override When |
|-----------|---------|---------------|
| `--ar` | `1:1` | Tall bottles/cans → `3:4`. Wide products/lifestyle → `3:2` or `16:9` |
| `--v` | `7` | — |
| `--q` | `2` | Quick iteration → `1` |
| `--style` | `raw` | Always raw for product accuracy |
| `--s` | omit | Add `--s 150` only when text is in the image |
| `--no` | `watermark, text artifacts` | Add `shadows` for pure white bg. Add `people, hands` if unwanted |

**Prompt language rules:**
- Be specific about materials: "brushed aluminum" not "metal", "kraft paper" not "cardboard"
- Name the shot: "hero shot", "45-degree angle", "flat lay", "three-quarter view"
- Name the lighting: "soft box lighting", "rim light", "warm studio lighting"
- Say "commercial product photography" — never "photorealistic" or "hyper-realistic"
- No camera specs (no f-stops, focal lengths, ISO, shutter speeds)
- No filler ("beautiful", "amazing", "stunning", "incredible")
- Keep it to 2-3 lines max — V7 reads natural language well, don't overstuff

### Step 3: HANDLE TEXT IN THE IMAGE

If the product has a brand name, label, or any visible text:

1. **Wrap the text in double quotes** inside the prompt: `"BRAND NAME"`
2. **ALL CAPS** — dramatically improves spelling accuracy
3. **3-4 words max** — Midjourney reliably renders short text. If the brand name is longer, abbreviate or use initials
4. **Always include `--s 150`** alongside `--style raw` for text-heavy designs
5. **Place the quoted text early** in the prompt (first third)

**If text exceeds 4 words:**
> Tell Brady: "Midjourney handles 3-4 words reliably. For longer text, I'd generate the image without text and add it in Canva/Photoshop after. Want me to prompt it text-free instead?"

**Example with text:**
```
"FRESH BREW" cold brew coffee can, matte black aluminum with gold accents,
hero shot on dark marble surface, dramatic rim lighting, commercial product photography
--ar 3:4 --v 7 --q 2 --style raw --s 150 --no watermark --no text artifacts
```

### Step 4: GENERATE the Download Filename

Format: `[product-kebab-case]_[descriptor]_mj.png`

- Product name in kebab-case (lowercase, hyphens)
- One descriptor for context (packaging, hero, lifestyle, jobsite, etc.)
- Always ends with `_mj.png`

Examples:
- `fresh-brew-coffee_can-hero_mj.png`
- `pvc-90-elbow_jobsite_mj.png`
- `smart-doorbell-cam_white-bg_mj.png`
- `lavender-hand-soap_packaging_mj.png`

### Step 5: DELIVER

Output in this exact format:

```
**Prompt:**
\`\`\`
[the midjourney prompt]
\`\`\`

**Save as:** `[filename]`
```

No preamble. No explanation of choices. Just the prompt and filename.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Edge Cases

- **Vague idea** ("something with coffee") → Ask ONE clarifying question: "What's the product — a bag of beans, a canned cold brew, a coffee machine? And does it have a brand name?"
- **Multiple products** → Single hero shot of the collection arranged together, not separate prompts
- **"No packaging"** → Switch to raw product in lifestyle context or studio isolation
- **Non-physical product** (app, service, SaaS) → This skill is for physical products. Suggest Brady describe the physical artifact (the device running it, the marketing material, etc.)
- **Brady provides a brand name with >4 words** → Suggest abbreviation or text-free generation with post-processing
- **Seasonal/themed** → Add environment context (holiday table, summer outdoor, etc.) but keep product as hero

## What This Skill Does NOT Do

- Generate multiple prompt variations (one prompt, one shot)
- Create Midjourney commands for abstract art, landscapes, or portraits
- Handle image-to-image or style reference workflows
- Replace professional product photography for final e-commerce listings
- Add text to images after generation (that's Canva/Photoshop)
