---
name: suno-songwriter
description: >
  One-liner prompt to finished Suno song via Claude in Chrome. Generates lyrics in
  Brady's voice, style tags, and title — then automates suno.com: navigates, fills
  the create form, submits, waits for generation, and downloads the MP3. Brady never
  touches suno.com.

  Trigger: "write me a song", "suno song", "make a song about", "songwriter",
  "generate a song", "song about", "write a track", "country song about", "rap about",
  or any variation requesting song creation.
trust_tier: T0
---

# Suno Songwriter

One-liner in, finished song out. Brady never opens suno.com.

## Why This Exists

Making a Suno song requires: thinking up lyrics, picking style tags, navigating to the
create page, pasting everything in, waiting 2 minutes, downloading. That's five minutes
of friction for a 30-second idea. This skill collapses it to one prompt.

## Execution Environment

**Runs on:** Claude in Chrome (browser MCP)
**Does NOT run on:** CoWork, Claude Desktop, Claude Code CLI
**Requires:** Active Suno account, logged in via Chrome
**Browser tools:** `tabs_context_mcp`, `tabs_create_mcp`, `navigate`, `read_page`,
`get_page_text`, `find`, `computer`, `form_input`, `javascript_tool`

---

## Phase 0: COMPOSE (No Browser — Draft First)

From Brady's one-liner prompt, generate three things:

### Title
- 2-5 words, punchy, memorable
- Match the mood (funny prompt = funny title, serious = serious)

### Lyrics
- Minimum: 2 verses + chorus
- Brady's voice: direct, contractions always, short lines, no filler
- Family topics (triplets, kids): warm but not sappy
- Business/hustle topics: gritty, operator energy
- Keep it under 3000 characters (Suno's limit)

### Style Tags
- Comma-separated genre/mood/instrumentation descriptors
- Use a preset as a starting point if one fits, then customize
- Example: `country, acoustic guitar, storytelling, male vocal, humorous, upbeat`

### Mode
- **Custom** (default): provide lyrics to Suno
- **Describe**: let Suno write lyrics from a description — only if Brady explicitly asks

### Present the Draft

```
══════════════════════════════════════════
SUNO SONGWRITER
══════════════════════════════════════════
Title: [title]
Style: [comma-separated tags]
Mode: Custom

──────────────────────────────────────────
LYRICS
──────────────────────────────────────────
[Verse 1]
...

[Chorus]
...

[Verse 2]
...

[Chorus]
...
──────────────────────────────────────────
Ready to send to Suno? (yes / edit / change style)
```

**GATE: Do NOT touch Chrome until Brady approves.** He may want to tweak lyrics, swap
the style preset, or change the title. Iterate until he says go.

---

## Phase 1: NAVIGATE

1. **`tabs_context_mcp`** — Check if suno.com is already open in a tab
2. If open: switch to that tab. If not: **`tabs_create_mcp`** — open new tab
3. **`navigate`** — Go to `https://suno.com/create`
4. **`read_page`** — Verify the create page loaded

### Login Check
If the page shows a login wall, sign-in prompt, or redirects away from `/create`:
- **STOP immediately**
- Tell Brady: "Suno needs you to log in. I see a login page. Log in and tell me when you're ready."
- Do NOT attempt to fill login credentials

---

## Phase 2: SUBMIT

### 2.1 Switch to Custom Mode
1. **`find`** — Look for "Custom" toggle, tab, or button on the create page
2. **`computer`** — Click to activate Custom mode
3. **`read_page`** — Confirm lyrics input field is now visible

If using Describe mode instead, look for the "Describe" option and skip lyrics entry —
put Brady's one-liner (or a longer description) in the description field.

### 2.2 Fill the Form
Execute these in order. Use **`find`** to locate each field, then **`form_input`** or
**`computer`** to interact.

1. **Lyrics field:**
   - `find` — Locate the lyrics textarea (look for placeholder text like "Enter your lyrics")
   - `computer` — Click into the textarea
   - `form_input` — Paste the full lyrics
   - If `form_input` fails on multiline text, fall back to `javascript_tool`:
     ```javascript
     const textarea = document.querySelector('textarea[placeholder*="lyric"], textarea[placeholder*="Lyric"]');
     if (textarea) {
       const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
       nativeInputValueSetter.call(textarea, `LYRICS_HERE`);
       textarea.dispatchEvent(new Event('input', { bubbles: true }));
     }
     ```

2. **Style/genre field:**
   - `find` — Locate the style input (look for "Style of Music" or similar label)
   - `computer` — Click into the field
   - `form_input` — Enter the style tags string

3. **Title field:**
   - `find` — Locate the title input (look for "Title" label or placeholder)
   - `computer` — Click into the field
   - `form_input` — Enter the title

### 2.3 Verify and Submit
1. **`read_page`** — Screenshot/read to confirm all three fields are populated correctly
2. **`find`** — Locate the "Create" or "Generate" button
3. **`computer`** — Click to submit
4. Tell Brady: "Submitted to Suno. Waiting for generation..."

---

## Phase 3: WAIT

Suno takes 1-3 minutes to generate. Poll for completion:

1. Wait ~15 seconds after submission
2. **`get_page_text`** — Check page content for:
   - Audio player or waveform appearing
   - Play button visible
   - Track card with the song title
   - "Generating" or progress indicator (means still working)
   - Error message (means failed)
3. Repeat every 15-20 seconds
4. **Safety timeout: 5 minutes** — if nothing after 5 min, report and ask Brady

### Status Updates
- After 30 seconds: "Still generating..."
- After 90 seconds: "Suno is still working on it. Hang tight."
- After 5 minutes: "Hit the 5-minute timeout. Check the page — it may still be processing."

### On Failure
If Suno shows an error:
- Report the exact error text
- Offer: "Want me to retry with the same settings?"

---

## Phase 4: DOWNLOAD + OUTPUT

### Download the MP3
1. **`find`** — Locate the three-dot menu (⋯) or download icon on the generated track
2. **`computer`** — Click to open the menu
3. **`find`** — Look for "Download" option (may say "Download Audio" or "Download MP3")
4. **`computer`** — Click download
5. MP3 lands in Brady's default Downloads folder (`~/Downloads/`)

### Capture the URL
- **`get_page_text`** or **`javascript_tool`** — Extract the Suno URL for the track
  ```javascript
  window.location.href
  ```

### Present Metadata
```
══════════════════════════════════════════
SONG COMPLETE
══════════════════════════════════════════
Title: [title]
Date: [YYYY-MM-DD]
Prompt: "[original one-liner]"
Style: [tags]
Suno URL: [url]

LYRICS:
[full lyrics]
══════════════════════════════════════════
MP3 downloaded to ~/Downloads/
```

---

## Style Presets

Quick-reference presets. Brady can say "use the dad rock preset" or the skill picks
the best match from context.

| Preset | Tags |
|--------|------|
| Country Storyteller | country, acoustic guitar, storytelling, male vocal, warm |
| Dad Rock | rock, electric guitar, driving beat, male vocal, anthemic |
| Kids Bop Energy | pop, upbeat, fun, kids, playful, sing-along |
| Lo-fi Chill | lo-fi, chill, ambient, acoustic, mellow |
| Hip Hop | hip hop, trap beat, confident, male vocal, bass heavy |
| Lullaby | lullaby, soft, gentle, acoustic, piano, soothing |
| Worship/Gospel | gospel, worship, piano, choir, uplifting, reverent |
| Cinematic | cinematic, orchestral, epic, dramatic, strings |
| Acoustic Campfire | acoustic, folk, campfire, fingerpicking, warm |
| 90s R&B | r&b, smooth, groove, 90s, male vocal, soulful |

---

## Edge Cases

### Suno UI Changed
The skill uses `find` with descriptive text queries, not CSS selectors. If an element
can't be found:
- Report which step failed (e.g., "Can't find the lyrics textarea")
- Ask Brady what he sees on the page
- Do NOT blindly click around

### Not Logged In
STOP. Tell Brady. Wait. Never attempt credential entry.

### Generation Queue Full
Suno may say "too many songs generating" or similar. Report the message and wait for
Brady's call — retry now or come back later.

### Lyrics Too Long
If lyrics exceed Suno's character limit (~3000 chars), trim before submission. Cut from
the end (remove a verse or the bridge) and tell Brady what was trimmed.

### Multiple Results
Suno sometimes generates 2 variations. Download both if possible. If only one download
button is visible, grab that one and note the other is available on suno.com.

---

## What This Skill Does NOT Do

- **Manage a music library** — It downloads to ~/Downloads/. Organizing is a separate concern.
- **Edit or remix existing Suno tracks** — It creates new songs only.
- **Handle Suno billing or credits** — If Brady is out of credits, report and stop.
- **Run headless or scheduled** — Requires Chrome open with an active Suno session.
- **Batch generate** — One song per invocation. Run it again for another song.
