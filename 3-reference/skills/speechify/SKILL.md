---
name: speechify
description: >
  Send a file, URL, or inline text to Brady's Speechify library so it queues up
  for audio listening on phone, Mac, or browser. Uses Claude in Chrome to drive
  Brady's logged-in Speechify web app — clicks New → Create Note, fills the
  title, pastes cleaned plaintext into the body via a React-aware DOM setter,
  saves. Handles markdown, PDF, and HTML input cleanly: strips markdown syntax,
  extracts PDF text via pymupdf, preserves paragraph structure.

  TRIGGER whenever Brady says: "send to speechify", "speechify [file/url]",
  "speechify this", "queue this in speechify", "send the whitepaper to speechify",
  "let me listen to this", "speechify the v2", "speechify [path]", or any
  variation requesting that a piece of content be added to his Speechify queue.

  Input modes accepted:
    - File path (md, txt, pdf, html — auto-detected by extension)
    - URL (web article, S3 link, blob URL — fetched, then processed)
    - Inline text (pasted into the request)

trust_tier: T1
---

# Speechify

Sends written content to Brady's Speechify library so he can listen to it instead of reading it. Most-used case: long whitepapers, Substack drafts, exec-intel briefs, research files, or other content where listening on a drive or while doing other things is more practical than reading on a screen.

This skill does not generate audio itself. Speechify (the iOS / Mac / browser app) does the TTS — this skill just routes the text into Brady's Speechify "Create Note" library entry by driving Claude in Chrome through the Speechify web app at `app.speechify.com`.

---

## When to use

- Brady has a long-form document (whitepaper, essay, brief, research file) he wants to listen to during a drive, a workout, or while doing other things
- Brady is reviewing v2 / v3 of a heritage whitepaper and wants to hear it read aloud rather than re-read on a screen
- Brady wants to consume a Substack post, a long PDF, or a saved web article via audio
- A build pipeline (e.g. weekly OS recap, daily exec-intel brief) wants to auto-queue its output into Speechify

**When NOT to use:** short messages (use Telly), audio generation as a deliverable file (use a TTS pipeline that produces an .mp3, like ElevenLabs), reading something Brady wants on screen anyway.

For content over ~50,000 characters, do **not** refuse — automatically split into multiple parts using the multi-part convention in the next section.

---

## Multi-part split convention (long content)

When the cleaned body exceeds ~50,000 characters, the skill automatically splits the content into 2–4 parts at natural section boundaries (markdown H2 `##` headings) and saves each as its own Speechify note. Each part is independently listenable and the parts group naturally in Brady's library because they share a consistent title prefix.

### Title pattern

```
{Document Name} — Part {N} of {M} — {Subtitle naming the sections covered}
```

Examples (verified working 2026-05-09 with the v2 whitepaper at ~63K chars cleaned, split into 3 parts):

- `Virginia Deans and Donahoes — Part 1 of 3 — Eastern Shore Roots — Bull, Kellam, Coulbourne, Parker, Floyd, Mary Bays Woodrum`
- `Virginia Deans and Donahoes — Part 2 of 3 — Upstream Lines — Donahoe, Dean, Fisher, Daly Donovan, Caylor, Read`
- `Virginia Deans and Donahoes — Part 3 of 3 — Civil War, Open Questions, Methodology, Closing, Changelog`

Why this title pattern works for grouping:
- Speechify's library sorts notes alphabetically (or by recency); the consistent prefix puts parts adjacent to each other regardless
- "Part N of M" tells the listener which to start with and how many remain
- The subtitle names the actual content of that part so a listener choosing what to play next knows what each is
- Cap each title at 120 characters — trim subtitle if needed; never trim "Part N of M"

### Body pattern

Each part's body opens with a short orientation preamble so the listener has context:

```
{Document Name}, Version {N}. Part {N} of {M}. This part covers: {subtitle}.
It contains the following sections: {comma-separated section titles}.

[then the cleaned content for those sections]
```

The preamble takes about 20 seconds of audio and is worth it — the listener may pick up Part 2 of 3 without having heard Part 1, and the orientation lets them follow along.

### Splitting algorithm

1. Parse the source markdown for H2 (`##`) section breaks
2. Compute cleaned char counts per section
3. Group sections into N parts of roughly-equal length (~20K–30K chars each)
4. Always split *between* H2 sections, never *inside* one — preserves narrative continuity
5. If a single H2 section exceeds the per-part target, that section becomes its own part (and its own H3 subsections may need their own further-grouped naming)
6. For 3-part documents the conventional grouping is roughly: front-matter + first half + second half. For 4-part documents: front-matter / first quarter / second quarter / back-matter+changelog. Adjust to natural narrative breaks.

### Skill behavior on long content

- **Default:** auto-split, save all parts in sequence, return summary listing each part's title and char count
- **Override:** Brady can pass `--single` to force one giant note (fails the quality gate if over 50K, but bypassable with `--force`)
- **Override:** Brady can pass `--parts {N}` to force a specific number of parts

---

## What this skill no longer does (correction from earlier draft)

An earlier draft of this skill was built around a "Send to Speechify Email" forwarding address — Brady would email content to a unique `@speechify.com` alias and it would land in his library. **That feature does not exist in current Speechify.** Searching the help center on 2026-05-09 surfaced zero hits for forwarding-by-email; the documented import paths are: cloud-storage upload via the iOS app, Chrome extension highlight-and-save, and the web app's Create Note / Upload File buttons.

This skill is therefore built on the **Create Note via web app** path, which is the most reliable programmatic route into the library and works for any text content of reasonable size.

---

## How it works (end-to-end)

1. **Input resolution.** Skill receives one of:
   - A local file path (Brady's project files, downloads, etc.)
   - A URL (web article, Substack post, hosted PDF)
   - Inline text (Brady pastes content directly)

2. **Content extraction.**
   - **PDF** → extract text via `pymupdf` (already on Brady's system; fallback `pdfplumber` or `pypdf`)
   - **Markdown** → strip markdown syntax cleanly: drop code fences, inline backticks, image embeds, link URL targets (preserve link text), table rows, horizontal rules, span tags including the v2 blue markers, bold/italic/strikethrough markers, blockquote `>` prefixes, list bullets and numbered prefixes. Convert headings to plain sentences with a trailing period (so the TTS pauses).
   - **HTML** → extract via BeautifulSoup; discard `<script>`, `<style>`, `<nav>`, `<footer>`, `<header>`, `<aside>`, `<form>`. Prefer `<article>` or `<main>` if present.
   - **Plain text** → pass through verbatim
   - **URL** → fetch via `requests`, branch on `Content-Type`

3. **Title shaping.** Speechify will read the title aloud before the body. Conventions:
   - Replace `v1`/`v2`/`v3` shorthand with `Version 1`, `Version 2`, etc.
   - Spell out arrows: `v1 → v2` becomes `from Version 1 to Version 2`
   - Drop markdown emphasis (`*Title*` becomes `Title`)
   - Add publication date in parentheses if relevant: `Virginia Deans and Donahoes — What Changed from Version 1 to Version 2 (May 2026)`
   - Cap at 120 characters
   - Listener-oriented: imagine a human hearing the title without context

4. **Body shaping.** Speechify reads paragraph structure well. Preserve double-newlines between paragraphs. Bullets and numbered lists become natural-language paragraphs. Long internal-jargon abbreviations (e.g. "FSID", "MEC South") are fine in moderation but worth expanding on first use ("Family Search ID", "Methodist Episcopal Church South").

5. **Drive Claude in Chrome.**
   1. Get tabs context, ensure Speechify tab exists or create one
   2. Navigate to `https://app.speechify.com/` (Brady stays signed in via Apple OAuth — no skill-side auth required)
   3. Click `New` button (find via `find` query "add document or new content button")
   4. Click `Create Note` button (found via "create note button")
   5. Fill the title field (`textbox` with placeholder "Optional", typically `ref_59` after find; use `form_input` tool — works fine for short title strings)
   6. Fill the body textarea — the textarea has DOM id `textImportText`. Use `javascript_tool` with this idiom:
      ```js
      (function() {
        const ta = document.getElementById('textImportText');
        if (!ta) return 'textarea not found';
        const text = "<JSON-encoded body string here>";
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        setter.call(ta, text);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
        return JSON.stringify({ok: true, length: ta.value.length});
      })()
      ```
      The native React setter pattern is required because Speechify uses controlled React inputs; setting `.value` directly without dispatching synthetic input events will be reverted by React on the next render.

      **Inline plain-text is the right path. Do NOT compress.** The body string is JSON-encoded and embedded inline in the JS payload. The `javascript_tool` `text` parameter accepts large strings — a 50K-char body produces a ~50K-char JS payload, which the tool handles cleanly. **Do not invent a gzip + base64 + `DecompressionStream` decode path** to "save space" — Speechify's CSP blocks the `Blob.stream().pipeThrough(new DecompressionStream('gzip'))` route with `Failed to fetch`, and even if it didn't, the cost is needless complexity and an extra JS round-trip per part. For multi-part sends (Brady's 5×47K Monacan whitepaper, 2026-05-09), do plain-text inline injection per part. Codified after a mid-session detour cost ~30 minutes proving the anti-pattern.
   7. Click `Save File` button (the form's submit, typically `ref_64` after find)
   8. **Verify success** by checking that the tab title has updated to the note title. Speechify navigates to the new note's listening page on save, so the tab title becomes `<Title> | Speechify`. If the tab title is still "Library | Speechify" after a 2-second wait, the save likely failed.
   9. **Suppress auto-play (DEFAULT — see Auto-play behavior below).** Immediately after save, pause any audio that started and navigate the tab back to `https://app.speechify.com/library` so the desktop browser does not begin reading the note out loud. Brady almost always speechifies content to listen on **mobile later**, not on the Mac in the moment. Auto-play on the desktop tab is noise.

---

## Auto-play behavior (default: OFF)

After clicking Save File, Speechify's web app navigates to the new note's listening page (`/library/{noteId}`) and **auto-plays** the TTS audio in the desktop browser tab. This is unwanted in Brady's typical workflow — he sends content to Speechify so he can listen on his phone later (in the car, on a walk, etc.), not so it starts reading aloud on the Mac.

**Default behavior of this skill: suppress desktop auto-play after save.**

Implementation, called immediately after the Save File click:

```js
(function() {
  // 1. Pause any audio element on the page (Speechify uses native <audio>)
  document.querySelectorAll('audio,video').forEach(el => { try { el.pause(); } catch(e){} });
  // 2. Click any visible "Pause" button as a belt-and-suspenders fallback
  const pauseBtn = Array.from(document.querySelectorAll('button')).find(b =>
    /pause/i.test(b.getAttribute('aria-label') || '') || /pause/i.test(b.textContent || '')
  );
  if (pauseBtn) pauseBtn.click();
  return 'paused';
})()
```

Then navigate the tab back to `https://app.speechify.com/library` so the listening page is no longer focused. The note is saved in Brady's library and accessible across his iOS / Mac / web Speechify clients. He'll hit play himself when he wants to listen.

**Override:** if Brady explicitly says "speechify and play it for me" or "speechify and read it now", skip the suppression and let the listening page run. Default is OFF; opt-in for desktop playback.

---

## (Continuing the end-to-end flow)

7. **Logging.**
   - Each successful save appends a one-line entry to `~/.config/speechify/sent-log.txt`:
     `2026-05-09T14:32:00Z | virginia-deans-and-donahoes-v2.md | 25,372 chars | ~21m audio | "Title here"`
   - Audit trail; helps detect duplicate sends.

---

## Configuration (none required — auth is via Brady's logged-in browser)

The skill assumes:
- Brady is signed in to `app.speechify.com` in his Chrome browser (via Apple OAuth, the only sign-in method Speechify currently offers via the web app)
- Claude in Chrome MCP tools are available in the calling session (`tabs_context_mcp`, `navigate`, `find`, `form_input`, `javascript_tool`, `computer`)
- Standard Python deps for content extraction: `pymupdf` (or `pdfplumber`/`pypdf`), `beautifulsoup4`, `requests` — all already on Brady's system

The earlier-draft `~/.config/speechify/forwarding-email.txt` file is not used by the current skill. If it exists from the older draft, it can be deleted.

---

## Trigger phrases

Brady says any of these and the skill activates:

| Phrase | Action |
|--------|--------|
| `speechify [path]` | File at path → process → save as note |
| `speechify [URL]` | URL → fetch → process → save as note |
| `speechify this` | Use the most recent file mentioned in conversation |
| `speechify the [name]` | Look up by name in known project deliverables |
| `send to speechify` | Same as above with explicit attachment |
| `let me listen to this` | Same as `speechify this` |
| `queue this in speechify` | Same |

**Implicit defaults when ambiguous:**
- "speechify the v2" with active project *Virginia Deans and Donahoes* → `deliverables/virginia-deans-and-donahoes-v2.md`
- "speechify the changes doc" → most recent `*-changes.md` deliverable
- "speechify the morning sweep" → today's morning-sweep output

When inference is ambiguous, the skill asks one targeted question.

---

## File-handling rules

- **Markdown** is the preferred input — cleanest extraction
- **PDF** works but requires text-extractable PDFs. Image-only PDFs (scanned books) need OCR first; the skill flags this and refuses to send garbage
- **HTML** is fine for blog posts / articles; standard reader-mode heuristics discard navigation, sidebars, footers, ad blocks
- **DOCX / RTF** — convert to markdown first via `pandoc` (already installed for the whitepaper rendering pipeline)
- **EPUB** — Speechify already handles EPUBs natively if you AirDrop them to the iOS app. Skill defers to that path
- **Audio files** — Speechify reads text, not audio. Skill rejects audio inputs

---

## Quality gates

Before saving, the skill verifies:
1. Cleaned body is at least 100 characters
2. Cleaned body is at most ~50,000 characters (Create Note flow becomes sluggish above that; split at section breaks for longer content)
3. Subject/title is non-empty and ≤120 characters
4. Estimated audio duration is reasonable (>30 seconds, <8 hours)
5. Body is not all-uppercase (sign of bad PDF extraction)

Failures abort the save and report the issue. Brady can override with `--force` if intentional.

---

## What this skill does NOT do

- Generate TTS audio files locally (Speechify's app does the TTS)
- Push content to other audiobook platforms (Audible, Pocket Casts, etc.)
- Manage Brady's Speechify library — delete, organize, label items (Speechify's own apps do that)
- Send to Speechify accounts other than Brady's
- Process content in languages other than English (extraction heuristics are English-tuned)
- Email content to a Speechify forwarding address (that feature does not exist in current Speechify)

---

## Implementation file

The text-extraction and cleaning logic lives in `3-reference/skills/speechify/speechify.py` (~150 lines). The Python script is invoked first to produce cleaned text + suggested title; Claude in Chrome then drives the web app to paste and save. Brady invokes via natural language — the underlying Python and browser automation are internal.

---

## First-run checklist for Brady

- [ ] Sign in to `app.speechify.com` in Chrome (Apple OAuth)
- [ ] Confirm the library page loads at `app.speechify.com` (no redirect to sign-in)
- [ ] Confirm Claude in Chrome MCP is loaded in the Conductor session
- [ ] Test: "speechify the v2 changes doc"
- [ ] Confirm the new note appears in Brady's Speechify library on iOS / Mac / web

---

## Verified test (2026-05-09)

First successful end-to-end run:
- **Input:** `deliverables/virginia-deans-and-donahoes-v2-changes.md` (~25,000 chars, ~5,000 words)
- **Title:** "Virginia Deans and Donahoes — What Changed from Version 1 to Version 2 (May 2026)"
- **Body:** ~11,000 chars after cleaning and condensing (~13 min TTS audio)
- **Result:** Speechify saved the note; tab navigated to the listening page; note appears in Brady's library across iOS, Mac, and web.

---

## Examples

### Example 1: send a heritage whitepaper to Speechify

> Brady: "Speechify the v2 whitepaper"

Skill:
- Resolves `deliverables/virginia-deans-and-donahoes-v2.md`
- Extracts text: ~95,000 chars (too large for one note in current Create Note path — flags split required)
- Asks Brady: "Body is 95K chars; split into Part 1 of 2 and Part 2 of 2? (yes/no)"
- On yes: splits at the sectioning H2 boundaries, produces two notes
- Titles: "Virginia Deans and Donahoes (v2 — Part 1 of 2)" and "(v2 — Part 2 of 2)"

### Example 2: send a Substack URL

> Brady: "Speechify https://example.substack.com/p/long-essay"

Skill:
- Fetches URL via `requests`
- Detects HTML, extracts readable content via reader-mode heuristics
- Saves as note with subject = article `<h1>` title

### Example 3: send a project research file

> Brady: "Send research file 23 to speechify"

Skill:
- Resolves `Project - Donahoe Heritage/research/23-susan-elzey-autobiography-findings.md`
- Standard process

### Example 4: chained from another skill

> Genie produces a v3 draft. Brady: "Speechify it before I read it"

Skill:
- Receives the v3 path from Genie's output
- Standard process

---

## Companion patterns

Skills that pair well with Speechify:
- **`weekly-os-recap`** — produces Friday-morning HTML/PDF; auto-speechify before email delivery so Brady can listen during the morning sweep
- **`exec-intel-brief`** — produces daily PDFs; auto-speechify the briefing the same morning
- **`genealogy-research` engine** — every new whitepaper version optionally auto-speechifies for Brady's review pass
- **`daily-whitepaper`** — same pattern

A future v2 of this skill could add a `--auto-on-publish` flag that other skills opt into, plus an automatic split-at-section-break helper for long content.
