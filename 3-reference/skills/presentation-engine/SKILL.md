---
name: presentation-engine
description: |
  Master orchestration skill for all slide deck and presentation creation. Sits on top of
  deck-generator (rendering) and adds: template selection, project context loading, agent
  mode switching, feedback iteration with changelog tracking, mception publishing, and
  Telly notification.

  TRIGGER when Brady says: "build a deck," "make slides," "deck for [client]," "pitch deck,"
  "presentation for," "slide deck," "board deck," "client pitch," "update the deck,"
  "iterate on the deck," "apply this feedback to the deck," "change X on the deck,"
  "add a slide," "cut that slide," or any variation requesting a slide-based deliverable
  or modification to an existing deck.

  This is the PRIMARY entry point for all deck work. deck-generator is the rendering
  sub-component called by this skill — Brady should not need to invoke it directly.

  Teaser 1-pager requests are routed to marketing-templates (single-page format).
trust_tier: T0
---

# Presentation Engine

Master orchestration skill. Selects the right template, loads project context, generates
content, injects the review changelog slide, renders via deck-generator, publishes to
mception, and Telly-notifies Brady with a link.

---

## Phase 0: Mode Detection

First, determine if Brady is requesting a **new deck** or **iterating on an existing one**.

**New deck signals:**
- Names a client, project, or audience ("deck for Panda", "client pitch for Mark", "board deck")
- Names a template type ("investor deck", "executive review", "innovation results")
- No prior deck context in the conversation

**Feedback/iteration signals:**
- References content that already exists ("too long", "move slide 3 after the market slide")
- Uses update language ("change X to Y", "add a stat", "cut the problem slide")
- Says "update the deck," "iterate," "apply this feedback," or gives a bulleted list of changes
- Points to a specific slide by name or number

**If ambiguous:** Ask — "Is this feedback on an existing deck, or starting a new one?"

---

## Template Menu

Show this table when Brady needs to choose, or infer from context:

| Template | File | Best For | Audience | Agent Mode |
|---|---|---|---|---|
| **VC / Partner Pitch** | `templates/vc-partner-pitch.md` | Investor decks, strategic partnerships, board intros | VCs, partners, boards | Standard |
| **Client Pitch — Generic** | `templates/client-pitch-generic.md` | Prospecting, cold or warm intros, capabilities overview | Any prospect | Standard |
| **Client Pitch — Project** | `templates/client-pitch-project.md` | Active engagement work — proposals, scoping, deliverable decks | Active client team | Project agent if active |
| **Executive Review** | `templates/executive-review.md` | Quarterly check-ins, steering committee, progress reviews | Client leadership | Project agent if active |
| **Innovation Results** | `templates/innovation-results.md` | Packaging innovation-workshop output for client delivery | Client teams | Standard |
| **Teaser 1-Pager** | → `marketing-templates` | Warm prospect handout, email attachment, quick leave-behind | Any prospect | Standard |
| **Build from Scratch** | — | Brady has a specific structure in mind | Varies | Varies |

**When to infer vs. ask:**
- "Pitch deck for the Fran meeting" → Client Pitch — Project (Fran context is live)
- "Client capabilities deck" → Client Pitch — Generic
- "Q2 review for Panda" → Executive Review
- "Package the innovation workshop" → Innovation Results
- If no clear match, show the table and ask Brady to pick

---

## Phase 1: Context Load

Load context relevant to the chosen template before generating content.

### Project-Specific Decks (Client Pitch — Project, Executive Review)

1. Read the project folder: `1-execution/areas/work-and-business/programs/Consulting/Project - [Client]/`
2. If a project agent is active for this client (OC Optimus = Panda, Fran = 1915 South), load their SKILL.md and any existing synthesis docs
3. Read the most recent exec-intel-brief output for the client if one exists
4. Scan Streaming Notes for any open To-Do items tagged to this client
5. Summarize what you loaded — ask Brady to confirm or add to the context before generating

### Brand/Generic Decks (VC / Partner Pitch, Client Pitch — Generic)

1. Load Brady's positioning from: `3-reference/skills/claudine-onboarding/` (Rules & Preferences)
2. For VC deck: read `3-reference/imported-skills-and-systems/pitch-deck-framework/SKILL.md`
3. Reference Brady's practice positioning: retail + foodservice + strategy + ops + AI OS
4. Confirm: Sycamore Lane brand or mception.ai brand? (both are fine, just needs to be consistent)

### Innovation Results

1. Read the most recent innovation-workshop output from the relevant project folder
2. Identify the top ideas that should anchor the deck
3. Confirm which ideas Brady wants to feature before building slides

---

## Phase 2: Agent Mode

If the deck is for a project with an active agent, adopt that agent's perspective for content:

| Client | Agent | Context File |
|---|---|---|
| Panda Express | OC Optimus | `0-agents/custom-built-agents/oc-optimus-SKILL.md` |
| 1915 South | Fran | `0-agents/custom-built-agents/fran-SKILL.md` |
| Generic / new | — | Standard Brady OS consulting voice |

When in agent mode: frame content from that agent's depth of knowledge on the engagement.
Use the agent's synthesis, not generic consulting language.

---

## Phase 3: Content Generation

1. Open the selected template file from `templates/`
2. Replace all `{{PLACEHOLDER}}` variables with actual content
3. Apply data presentation rules from mception-design-system:
   - Label estimates as estimates: `(est.)`
   - Source every data table in small text
   - Flip stats for impact: "79% haven't acted" > "21% have acted"
   - Blockquotes = Brady's POV, not facts
4. Keep slide text tight — one assertion per slide, supporting bullets, no paragraphs on slides
5. Use mception slide classes correctly (see deck-generator SKILL.md for class reference)

---

## Phase 4: Changelog Slide Injection

**Every deck gets a changelog slide as Slide 1 during draft/review mode.**

Copy the template from `references/changelog-slide.md` and prepend it to the deck markdown
(before the title slide). Fill in:
- `{{VERSION}}` → `v1.0`
- `{{DATE}}` → today's date
- `{{FEEDBACK_RECEIVED}}` → `Initial draft`
- `{{CHANGES_MADE}}` → `—`

The changelog slide is Slide 1. The title slide is Slide 2. The changelog is visually
distinct — it signals to anyone opening the file that this is an internal working draft.

---

## Phase 5: Render

Call deck-generator commands from the project deck folder:

```bash
# HTML (primary — self-contained, dark mode)
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --html \
  [input].md \
  -o [Context]_Deck_[YYYY-MM-DD].html

# PDF
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --pdf \
  --allow-local-files \
  [input].md \
  -o [Context]_Deck_[YYYY-MM-DD].pdf

# PPTX (images embedded, not editable text)
npx @marp-team/marp-cli@latest \
  --theme 3-reference/skills/deck-generator/references/mception-marp-theme.css \
  --pptx \
  --allow-local-files \
  [input].md \
  -o [Context]_Deck_[YYYY-MM-DD].pptx
```

Save all outputs to the same folder as the source `.md`.

---

## Phase 6: Publish to mception

Deck HTML files are served as static assets from the portal's `public/` directory.

**Determine slug:** `[client-or-context]-[type]` (lowercase, hyphenated)
- Examples: `panda-executive-review`, `client-pitch-generic`, `fran-proposal`, `vc-pitch`
- Keep slugs stable — reuse the same slug on each iteration so the URL doesn't change

**Publish steps:**

```bash
# Copy rendered HTML to portal public directory
cp [Context]_Deck_[YYYY-MM-DD].html \
  /path/to/belgrade/portal/public/decks/[slug].html

# Stage and commit
git add portal/public/decks/[slug].html
git commit -m "Publish [context] deck to mception.ai/decks/[slug]"
git push
```

Vercel auto-deploys on push. Deck is live at: `https://mception.ai/decks/[slug].html`

**If push fails or deploy issues arise:** Hand off to Webster with the slug and error message.

---

## Phase 7: Telly Notify

Send Brady a Telly message after publish. Use the conductor-push skill or Telly bot token.

**New deck message:**
```
Deck ready for review: mception.ai/decks/[slug].html
[Template type] | [Slide count] slides | v1.0
```

**Updated deck message:**
```
Deck updated ([version]): mception.ai/decks/[slug].html
Changes: [1-2 sentence summary of what changed]
```

**Marked ready message:**
```
Deck marked ready for external sharing: mception.ai/decks/[slug].html
Changelog slide removed. [Slide count] slides.
```

---

## Feedback Processing Protocol

When Brady gives feedback on an existing deck:

### Step 1: Find the Source

1. Identify context (client name, template type, or slide content referenced)
2. Search for the most recent `.md` file matching that context:
   - Project decks: `1-execution/areas/work-and-business/programs/Consulting/Project - [Client]/decks/`
   - Generic decks: `3-reference/skills/presentation-engine/output/`
3. Sort by modification date. Take the most recent match.
4. **If 2+ candidates exist within 7 days of each other:** Show Brady the filenames + dates and ask "Which deck are you referring to?" before proceeding.
5. Confirm with Brady: "Found `[filename]` (last modified [date]). Applying your feedback to that version."

### Step 2: Apply Feedback

- Open the source `.md`
- Apply each feedback item precisely — don't rewrite slides Brady didn't mention
- If feedback is ambiguous ("the stat slide"), ask for clarification before changing

### Step 3: Update Changelog Slide

Add a new row to the changelog table:

```
| {{NEW_VERSION}} | {{TODAY}} | {{FEEDBACK_SUMMARY}} | {{WHAT_CHANGED}} |
```

- Increment version: v1.0 → v1.1 → v1.2, etc.
- `FEEDBACK_SUMMARY`: Brady's feedback in 10 words or less
- `WHAT_CHANGED`: What was actually modified in 10 words or less

### Step 4: Re-render and Republish

- Run the same render commands from Phase 5
- Overwrite `portal/public/decks/[slug].html` with the new HTML
- Commit: `"Update [slug] deck to [version]"`
- Push → Telly notify

---

## "Mark Ready" Command

**Triggers:** "mark deck ready," "mark ready for external," "strip the changelog," "deck is approved," "ready to share," "remove the internal slide"

1. Find the source `.md` (same lookup as feedback — most recent matching context)
2. Delete the entire first slide block from the markdown (everything from the top of the file through the first `---` separator that follows the changelog table)
3. Verify the title slide is now Slide 1 after deletion
4. Re-render all three formats
5. Overwrite `portal/public/decks/[slug].html`
6. Commit: `"Mark [slug] deck ready for external sharing — changelog removed"`
7. Push → Telly notify

**Note:** Keep the pre-release `.md` with the changelog intact as an archive. Save a copy as
`[Context]_Deck_[YYYY-MM-DD]_reviewed.md` before stripping the changelog.

---

## File Conventions

**Source markdown + rendered outputs live together:**

- Project-specific:
  `1-execution/areas/work-and-business/programs/Consulting/Project - [Client]/decks/`
- Generic/brand decks:
  `3-reference/skills/presentation-engine/output/`

**Naming:**
- `[Client]_[Type]_Deck_[YYYY-MM-DD].md` — source
- `[Client]_[Type]_Deck_[YYYY-MM-DD].html` — rendered dark HTML
- `[Client]_[Type]_Deck_[YYYY-MM-DD].pdf` — rendered PDF
- `[Client]_[Type]_Deck_[YYYY-MM-DD].pptx` — rendered PPTX
- `[Client]_[Type]_Deck_[YYYY-MM-DD]_reviewed.md` — pre-release archive (after mark ready)

**mception published files:**
- `portal/public/decks/[slug].html`
- URL: `mception.ai/decks/[slug].html`

---

## Integration Map

| Dependency | What It Provides |
|---|---|
| `deck-generator` | Marp rendering commands + mception-marp-theme.css |
| `pitch-deck-framework` | Content structure for vc-partner-pitch template |
| `marketing-templates` | Handles teaser 1-pager requests |
| `mception-design-system` | Design token reference, slide class semantics |
| `OC Optimus` | Panda project context for project-specific decks |
| `Fran` | 1915 South context for project-specific decks |
| `conductor-push` / Telly | Notification delivery after publish |
| `Webster` | Fallback for Vercel deploy issues, Clerk/env ops |

---

## Reference Files

- `templates/vc-partner-pitch.md` — VC / partner pitch (12-section framework)
- `templates/client-pitch-generic.md` — Sycamore Lane / mception capabilities
- `templates/client-pitch-project.md` — Active engagement / project-scoped pitch
- `templates/executive-review.md` — Quarterly check-in / steering committee
- `templates/innovation-results.md` — Innovation workshop output for client delivery
- `references/changelog-slide.md` — Internal review slide (prepend to all drafts)
- `output/` — Rendered outputs for generic/brand decks

Design system source: `3-reference/skills/mception-design-system/SKILL.md`
Rendering engine: `3-reference/skills/deck-generator/SKILL.md`
