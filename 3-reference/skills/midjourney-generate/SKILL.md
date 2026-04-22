---
name: midjourney-generate
description: >
  One prompt (or many) in, finished Midjourney images out. Automates midjourney.com
  via Claude in Chrome: navigates, submits each prompt, polls until complete,
  downloads the selected variant to ~/Downloads. Batch mode submits all prompts
  first, then collects results as they finish.

  Trigger: "generate a midjourney image", "midjourney this", "create a midjourney
  of", "run this in midjourney", "imagine this on midjourney", "batch midjourney",
  "generate these images", or any variation requesting Midjourney image creation
  (not just prompt crafting — see midjourney-prompt for that).
trust_tier: T0
---

# Midjourney Generate

Prompt(s) in, PNG file(s) in ~/Downloads. Brady never opens midjourney.com.

## Why This Exists

`midjourney-prompt` gets Brady a good prompt. This skill actually runs it — and
runs many at once. Submitting 20 innovation-workshop prompts one at a time is
tedious; Midjourney already queues jobs server-side, so this skill fires them
all and collects the PNGs as they finish.

## Execution Environment

**Runs on:** Claude in Chrome (browser MCP)
**Does NOT run on:** Claude Code CLI without Chrome MCP, Claude Desktop, mobile
**Requires:** Active Midjourney subscription, logged in via Chrome
**Browser tools:** `tabs_context_mcp`, `tabs_create_mcp`, `navigate`, `read_page`,
`computer`, `gif_creator` (optional)

---

## Inputs

Accepts either a single prompt or a list:

- **Single:** `"robot serving orange chicken at a QSR, cinematic"`
- **Batch:** a newline-separated list, a markdown list, or an array from an
  upstream skill (e.g., innovation-workshop, full-stack-ideation)

Each prompt may include Midjourney parameters (`--ar 3:2 --v 7 --s 150 ...`).
Pass them through unchanged.

---

## Phase 1: SETUP

1. Call `tabs_context_mcp` to orient.
2. Call `tabs_create_mcp` for a fresh tab (do NOT hijack an existing Midjourney tab).
3. Navigate to `https://www.midjourney.com/imagine` (the Create page).
4. Call `read_page` with `filter: interactive` to locate the prompt textbox
   (placeholder "What will you imagine?") and confirm the user is logged in.
   If redirected to login → STOP and tell Brady to log in manually.
5. Optional: start `gif_creator` recording for session replay.

---

## Phase 2: SUBMIT (loop)

For each prompt in the batch:

1. `left_click` the prompt textbox.
2. `type` the prompt text exactly as given. Do not auto-edit, do not strip
   Midjourney flags, do not add a period.
3. `key: Return` to submit.
4. Wait ~2 seconds for the job to register (Midjourney shows `Create N/M` in the
   left sidebar).
5. Move to the next prompt — do NOT wait for completion yet.

Submitting all prompts first exploits Midjourney's server-side queue. For a
batch of 20, this takes ~1 minute instead of ~30 minutes of sequential waits.

**Rate guard:** If Midjourney shows a queue-full or fast-hours-exhausted warning,
pause and surface it to Brady before continuing.

---

## Phase 3: COLLECT (poll + download)

After all prompts are submitted, click "Create" in the sidebar to open the jobs
list. Each job renders as a 2x2 grid with a progress label: `Starting...` →
`N% Complete` → complete.

For each job (top-to-bottom, newest first):

1. Poll with `screenshot` every 10 seconds until the progress overlay disappears.
   Timeout: 5 minutes per job. If it times out, skip and note the failure.
2. Once complete, click the grid to open the single-job view (URL becomes
   `/jobs/<uuid>?index=<0-3>`).
3. Pick the best variant:
   - **Single prompt, Brady present:** ask Brady which variant (0-3) or default
     to the one with the clearest subject-matter match.
   - **Batch mode, unattended:** default to index 2 (bottom-left) unless the
     upstream skill (e.g., innovation-workshop) specifies a selection rule.
4. Right-click the large image → click "Save Image" from the context menu.
   - Do NOT use the toolbar download icon alone — it has been flaky in testing.
   - Confirm the file lands in `~/Downloads/` with `ls -lt ~/Downloads/*.png`.
5. Record the file path + which prompt it corresponds to.

---

## Phase 4: DELIVER

Output a compact summary:

```
══════════════════════════════════════════
MIDJOURNEY GENERATE — N of N complete
══════════════════════════════════════════
1. [prompt excerpt]
   → ~/Downloads/u<user>_<slug>_<uuid>_<idx>.png

2. [prompt excerpt]
   → ~/Downloads/u<user>_<slug>_<uuid>_<idx>.png
...

Failures: [none | list of prompts + reason]
Session GIF: ~/Downloads/midjourney-<slug>.gif (if recorded)
```

If the caller is another skill (innovation-workshop, content-publishing-kit),
return the list of `(prompt, file_path)` pairs programmatically so it can rename
files per its own convention.

---

## Filename Handling

Midjourney auto-names files as:
`u<userId>_<first-few-prompt-words>_<uuid>_<gridIndex>.png`

If Brady specified a desired filename (e.g., from `midjourney-prompt`'s "Save as"
line), `mv` the downloaded file to that name after each download.

---

## Edge Cases

- **Not logged in** → STOP, tell Brady to log in, do not attempt to auto-login.
- **Daily limit hit / "Fast hours exhausted"** → Surface the exact Midjourney
  warning, ask Brady whether to continue in Relax mode (slower) or abort.
- **Content moderation flag** → Note the flagged prompt, skip it, continue batch.
- **Browser tab closed mid-run** → Jobs still complete server-side. On resume,
  navigate to `/archive` or `/imagine` and pick up the completed grids.
- **Prompt contains image URLs (--cref, --sref)** → Paste as-is. Do NOT try to
  upload local files via this skill — use Midjourney's image upload flow
  manually for that.
- **Brady wants all 4 variants of one job** → Open each index (0-3) in turn
  and save each; name them `<slug>_v1.png` through `<slug>_v4.png`.

---

## What This Skill Does NOT Do

- Craft the prompts (that's `midjourney-prompt`)
- Upscale or remix after generation (separate flow)
- Generate via Discord (web UI only)
- Upload local images as style/character references
- Pay for subscription upgrades
