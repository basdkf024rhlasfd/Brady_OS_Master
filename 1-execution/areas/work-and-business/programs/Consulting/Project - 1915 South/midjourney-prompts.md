# Midjourney Prompts — 1915 South Track A Products

**Batch 1 (submitted + downloaded 2026-04-22):** A5, A7, A10, A2b
**Batch 2 (queued 2026-04-22):** A1 Sleep Lab, A3 15-Min Showroom, A4 Concierge, A8 Subscription

Prompts for the Track A product concepts flagged for visuals. Each follows
the midjourney-prompt skill format. Filenames match what `render.py` expects, so
dropping the downloaded PNGs into `images-1915-south/` makes them auto-appear
in the HTML.

**Pipe all four prompts to the `midjourney-generate` skill (runs in Claude-in-
Chrome).** Midjourney's server-side queue means submitting all four first,
then collecting, is ~10x faster than sequential waits.

---

## A5 · Ashley Care Plus — Service-as-Product

**Concept:** A service tier for every furniture delivery. Hero: branded service
toolkit + technician shoe covers in a warm mid-century-modern living room,
implying the in-home white-glove moment.

**Prompt:**

```
branded service toolkit on hardwood floor next to a new leather sofa in a warm mid-century living room, uniformed technician's hands adjusting a cushion in the background, clipboard with service checklist on the sofa arm, natural window light with soft fill, hero shot three-quarter view, commercial product photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a5-ashley-care-plus-service-as-product-hero.png`

**Notes:** No brand text — keeps this clean. The hero signals "service" without
requiring a readable logo. If you want the 1915 South or Ashley Care Plus brand
visible, add later in Canva.

---

## A7 · Final-Mile Branded White-Glove Experience

**Concept:** Branded delivery van + two uniformed team members presenting a
sofa to a customer at her front door. "1915 SOUTH" is 2 words, safe to render.

**Prompt:**

```
"1915 SOUTH" logo on the side of a clean white delivery van parked on a suburban driveway, two uniformed delivery technicians in navy polos carrying a cream-colored sofa up a front walkway toward a smiling homeowner in the doorway, morning sun, warm golden hour lighting, wide lifestyle shot, commercial product photography
--ar 3:2 --v 7 --q 2 --style raw --s 150 --no watermark, text artifacts
```

**Download filename:** `a7-final-mile-branded-white-glove-experience-hero.png`

**Notes:** Text is short (2 words) so `--s 150` will help spelling. If the text
renders mangled, regenerate with the logo described as a badge ("circular gold
logo with '1915' inside") rather than as literal text.

---

## A10 · Kids-Room-in-a-Box

**Concept:** A fully-styled kids' room staged as a single product — the
"toddler" variant. Shot reads as both finished room and as-delivered package.

**Prompt:**

```
complete styled toddler bedroom in-a-box, pastel sage and cream palette, white wood twin bed with fluffy duvet, matching nightstand and dresser, woven jute rug, cloud-shaped wall art, soft window light, editorial wide shot at eye level, commercial product photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a10-kids-room-in-a-box-hero.png`

**Notes:** If you want the "Room-in-a-Box" framing more literal, run a second
variant with the prompt "same scene with a large kraft-paper box in the
foreground labeled 'ROOM IN A BOX'" — then `--s 150` to help the short phrase
render.

---

## A2b · Store-of-Future Single-Element Pilot

**Concept:** An AR furniture visualization moment on an iPad inside an
existing Ashley-style showroom. Reads as retail-tech without being sci-fi.

**Prompt:**

```
customer holding an iPad in a furniture showroom, the iPad screen shows an augmented-reality overlay of a gray sectional sofa placed in a rendered living room, real showroom environment with other sofas and soft natural lighting in the background, over-the-shoulder hero shot, shallow depth of field on the tablet, commercial product photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a2b-store-of-future-single-element-pilot-hero.png`

**Notes:** Frames AR as one concrete element (not a full sci-fi flagship),
matching the pilot philosophy. If the tablet screen renders messy, add
"clean AR app UI with gray sofa visualization" to tighten it.

---

## A1 · Sleep Lab Specialty Stores

**Concept:** Interior of a dedicated sleep-specialty store. Soft lighting,
mattresses on platforms, pillow wall, biometric fitting station. Reads as
premium retail, not mall mattress shop.

**Prompt:**

```
interior of a modern sleep specialty store, warm ambient lighting, three mattresses displayed on low oak platforms with soft linen bedding, a biometric sleep-fitting station with a tablet on one side, a wall display of pillows categorized by type, wide open floor plan with light wood and soft cream walls, wide editorial shot at eye level, commercial retail photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a1-sleep-lab-specialty-stores-hero.png`

---

## A3 · 15-Minute Showroom (Small Format)

**Concept:** Exterior of a small-format neighborhood furniture store tucked
into a suburban strip. Signals "quick, curated, neighborhood" not "warehouse."

**Prompt:**

```
exterior of a small-format neighborhood furniture store in a suburban retail strip, large front windows showing a curated living room vignette inside, cream and warm wood branded signage, late afternoon golden hour light, a delivery van parked at the curb, wide establishing shot at street level, commercial retail photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a3-15-minute-showroom-small-format-hero.png`

---

## A4 · Concierge Appointment Showroom

**Concept:** A private appointment-style design consultation — designer and
client reviewing fabric swatches at a wood table with a staged room scene
behind them. Reads as luxury retail.

**Prompt:**

```
a female interior designer and a couple reviewing fabric swatches and a floor plan at a warm oak consultation table inside a luxury furniture showroom, champagne flutes on a small tray, a staged fully-decorated living room scene visible in the background, soft diffused window light and warm accent lighting, editorial wide shot at eye level, commercial retail photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a4-concierge-appointment-showroom-hero.png`

---

## A8 · Furniture Subscription (Rent-to-Own Tier)

**Concept:** A subscription-swap moment — delivery team rolling in a fresh
sofa while the old one is being wheeled out, in a staged apartment setting.
Implies recurring swap without saying "rent-to-own" (too stigmatized).

**Prompt:**

```
two uniformed delivery technicians in a modern apartment living room, one rolling in a new cream linen sofa on a dolly while another wheels out a gray sectional, cardboard swap-delivery documents on a side table, warm natural window light, wide lifestyle shot, commercial product photography
--ar 3:2 --v 7 --q 2 --style raw --no watermark, text artifacts
```

**Download filename:** `a8-furniture-subscription-rent-to-own-tier-hero.png`

---

## Running the batch

Via the `midjourney-generate` skill (Chrome required, Midjourney session
active):

1. Open Midjourney in Chrome (fresh tab).
2. Submit all four prompts in sequence — don't wait for completion between
   submissions. Midjourney queues server-side.
3. After the last submit, poll for completion and download the U1 upscale
   of each.
4. Save to `images-1915-south/` using the filenames above.
5. Re-run `python3 render.py` — images will auto-appear in the HTML.
6. Re-run `python3 generate-pdf.py` for the updated PDF.

## Render filename convention (for reference)

`render.py` slugs the idea name and prefixes with the lowercase idea id, so
the auto-generated expected filename is `<id>-<slug>-hero.png` in
`images-1915-south/`. The filenames above match exactly.
