# V0 Prompt — Content Engine Standalone App

Paste the prompt below into V0 to generate the app. This is a single-page React app with 3 views (Queue, Editor, Published Log) using the Obsidian Architect design system.

---

## V0 Prompt

```
Build a single-page React content engine app with 3 tab views: Queue, Editor, and Published Log. This is a content pipeline tool for managing LinkedIn and Substack posts. Use React 19, Tailwind CSS, and shadcn/ui components. Dark theme only.

## Design System: "Obsidian Architect"

Apply these design tokens throughout:

### Colors
- Background/Surface: #0e0e0e
- Surface Container Low: #131313
- Surface Container: #1a1919
- Surface Container High: #201f1f
- Surface Container Highest: #262626
- Surface Bright: #2c2c2c
- Primary Accent: #69daff (neon blue — use sparingly, like a laser)
- Secondary Accent: #17c0fd
- Primary Container: #00cffc
- On Surface (primary text): #ffffff
- On Surface Variant (secondary text): #adaaaa
- Outline: #777575
- Outline Variant: #494847

### Typography
- Headlines: font-family "Manrope", weight 600-800, tight tracking
- Body/Labels: font-family "Inter", weight 300-500
- Display headers: white (#ffffff) on dark background
- Secondary text/metadata: #adaaaa

### Design Rules
- NO standard 1px borders for sections. Use tonal shifts (background color changes) to define boundaries.
- Cards: background #131313, no divider lines, hover shifts to #1a1919
- Floating elements: rgba(44,44,44,0.4) background with backdrop-blur: 20px
- Primary CTAs: gradient from #69daff to #00cffc at 135deg
- Ghost borders where needed: outline_variant (#494847) at 15% opacity
- Rounded corners: max 0.75rem. Precision, not bubbly.
- Icons: Material Symbols Outlined, 2px weight (font-variation-settings: 'FILL' 0, 'wght' 200)
- Scrollbar: 4px wide, track #0e0e0e, thumb #262626, thumb hover #69daff

### Layout
- Full viewport height, no sidebar (this app is iframe'd inside a parent portal)
- Tab navigation at top: Queue | Editor | Published
- Active tab: neon blue underline + white text. Inactive: #adaaaa text.
- Content area with generous padding (2.5rem)
- Responsive — works at any width since it's in an iframe

## View 1: Queue (Default Tab)

### Header Section
- Title: "Content Engine" in Manrope 2xl bold
- Subtitle: "Draft → Publish → Repeat" in #adaaaa
- Two stat cards side by side:
  - "LinkedIn" card: shows "0 / 12" (published / target) with a progress ring
  - "Substack" card: shows "0 / 3" (published / target) with a progress ring
- Streak counter: "0 day streak" with a flame icon

### Queue Table
A list/table of content pieces. Each row shows:
- Status badge (color-coded pill):
  - Idea = #494847 bg, #adaaaa text
  - Drafting = #00cffc bg at 15% opacity, #00cffc text
  - Ready = #69daff bg at 15% opacity, #69daff text
  - Published = green (#4ade80) bg at 15% opacity, green text
- Title (white, truncated if long)
- Series tag (small colored pill):
  - "The COO Who Quit" = orange
  - "AI for the Rest of Us" = blue
  - "Building with ADHD" = purple
  - "Dad Journal" = pink
  - "Arm the Rebels" = red
- Channel badges: "LI" (LinkedIn, blue) and/or "SS" (Substack, orange)
- Priority indicator: High = bright dot, Med = dim dot
- "Draft Now" button (primary gradient, small) — clicking navigates to Editor tab with this piece loaded

### Seed Data (hardcode these 12 items)

```json
[
  {"id": "001", "title": "Why I'm Building This System Now", "series": "The COO Who Quit", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "Family-facing language about leaving COO role. 'I'd rather spend time now building adaptability than scramble later.'"},
  {"id": "002", "title": "Isla on My Childhood — Quick Note from Stairs", "series": "Dad Journal", "channel": ["LinkedIn"], "priority": "High", "status": "Idea", "sourceText": "Short-form gold. 'Bro you had an awesome life when you were a kid.' Isla said this while sitting on the stairs. Pure kid wisdom about perspective."},
  {"id": "003", "title": "OS Structure & Philosophy", "series": "Building with ADHD", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'Any system that only works on good days is not a system.' Ready-made series starter about building personal operating systems."},
  {"id": "004", "title": "Hierarchical Agent Orchestration Thesis", "series": "AI for the Rest of Us", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "Original framework: McKinsey vs Gas Town vs Brady approach to AI agent governance. Thread + essay potential."},
  {"id": "005", "title": "Narrative as Architecture — Story Is Not Decoration", "series": "AI for the Rest of Us", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'You're not debugging, you're editing. You're not configuring, you're casting.' Story as system design, not just communication."},
  {"id": "006", "title": "Number2.AI + Salt/Umami Framework", "series": "The COO Who Quit", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'I am the umami.' Identity as product. ADHD + #2 seat operator positioning."},
  {"id": "007", "title": "Morning Mantra — Handwritten", "series": "Building with ADHD", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'I can be good at anything, though not everything.' Permission manifesto. Handwritten morning ritual."},
  {"id": "008", "title": "Batman — What Happens When a Hero Quits Too Early?", "series": "Building with ADHD", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "Reframes burnout as rehab not verdict. Dark Knight as mirror for career transition."},
  {"id": "009", "title": "Daddy Passed Away — 12/10/14", "series": "Dad Journal", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'The only thing I ever really wanted from him was more.' Universally resonant piece about fatherhood and loss."},
  {"id": "010", "title": "Umami Operator Origin Story", "series": "The COO Who Quit", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "WSJ-caliber origin story. LinkedIn About rewrite. One-liner. 4 polished deliverables from one source."},
  {"id": "011", "title": "North Star Articulation — Brady's Real Goal", "series": "The COO Who Quit", "channel": ["LinkedIn", "Substack"], "priority": "High", "status": "Idea", "sourceText": "'The end game is thought leadership with a credible story behind it.' Articulating what the whole thing is for."},
  {"id": "012", "title": "The Most Non-Controversial Manifesto Ever", "series": "Building with ADHD", "channel": ["Substack"], "priority": "High", "status": "Idea", "sourceText": "Most complete philosophical doc in system. Extract frameworks only. Very personal — needs heavy editing before publishing."}
]
```

Store all data in localStorage under key "contentEngine". Initialize with this seed data on first load.

## View 2: Editor

When a piece is selected (via "Draft Now" or clicking a row), show the Editor view:

### Top Bar
- Back arrow to return to Queue
- Piece title (editable)
- Channel selector: toggle between "LinkedIn" and "Substack" (styled as pills)
- Format selector dropdown with these options:
  - Opinion Post (150-300 words)
  - Story Post (150-400 words)
  - Proof Post (150-350 words)
  - Origin Essay (1500-3000 words)
  - Case Study (1000-2500 words)
  - Thought Leadership (1500-2500 words)
  - Raw-to-Draft (auto-detect)
  - Repurpose (Substack → LinkedIn)

### Source Material Panel
- Collapsible panel showing the sourceText for the selected piece
- Label: "Source Material" with a chevron toggle
- #131313 background

### Main Editor Area (Split Pane)
- Left side (60%): Large textarea/contenteditable area for the draft
  - Placeholder: "Click 'Generate Draft' to create an AI-drafted post from your source material..."
  - Monospace or Inter font, #adaaaa text, generous line height
  - Word count at bottom left
  - Character count at bottom (with LinkedIn's 3000 char limit indicator when LinkedIn is selected)
- Right side (40%): Platform Preview
  - Toggle between "LinkedIn Preview" and "Substack Preview"
  - LinkedIn Preview: Mimics LinkedIn post card (dark bg, avatar, name "Brady Smallwood", headline "Former COO | AI Consultant | Building Number2.AI", post text, engagement bar)
  - Substack Preview: Clean editorial layout (title, date, body text in serif-ish display)

### Action Bar (bottom of editor)
- "Generate Draft" button (primary gradient, large) — This will eventually call an API. For now, show a loading state for 2 seconds, then populate the editor with placeholder text: "[AI draft will appear here when connected to the drafting API. For now, write your draft manually or paste from Claude.]"
- "Voice Check" button (secondary/ghost) — Shows a mock result panel: score 85/100, with 2 sample issues: "Line 3: 'leverage' is an anti-pattern word" and "Closing paragraph is too soft — needs a punchier one-liner"
- "Copy Formatted" button — Copies the editor content to clipboard, shows a toast "Copied to clipboard!"
- "Open LinkedIn" / "Open Substack" button — Opens linkedin.com/feed or substack.com in new tab (based on channel selection)
- "Mark Published" button (appears after copy) — Prompts for URL input, then moves piece to Published status with timestamp

### Voice Check Panel (slide-in from right when triggered)
- Score: large number (e.g., "85") with "/100" and a circular progress indicator
- Issues list: each issue is a card with the flagged text highlighted and a suggestion
- "Anti-patterns detected" section listing any matches against these terms: "In today's fast-paced world", "Let's dive in", "Here's the thing", "Excited to announce", "Humbled and grateful", "Game-changer", "disruptive", "revolutionary", "unlock", "leverage"

## View 3: Published Log

### Header
- Title: "Published" in Manrope
- Stats row: "X LinkedIn posts" | "Y Substack posts" | "Z total" with progress toward targets

### Timeline List
- Reverse chronological list of published pieces
- Each entry: publish date, title, channel badge (LI or SS), URL (clickable), series tag
- Empty state: "Nothing published yet. Draft your first piece from the Queue."

## PostMessage API

This app will be embedded in an iframe. Implement a postMessage bridge:

```javascript
// Listen for messages from parent portal
window.addEventListener('message', (event) => {
  if (event.data?.source === 'mception-portal') {
    switch (event.data.type) {
      case 'DRAFT_RESULT':
        // Populate editor with AI-generated draft
        break;
      case 'VOICE_CHECK_RESULT':
        // Show voice check results
        break;
    }
  }
});

// Send messages to parent portal
function requestDraft(pieceId, channel, format, sourceText) {
  window.parent.postMessage({
    source: 'content-engine',
    type: 'REQUEST_DRAFT',
    payload: { pieceId, channel, format, sourceText }
  }, '*');
}

function requestVoiceCheck(draft) {
  window.parent.postMessage({
    source: 'content-engine',
    type: 'REQUEST_VOICE_CHECK',
    payload: { draft }
  }, '*');
}
```

## Additional Details
- All state persisted in localStorage
- Smooth transitions between views (fade or slide)
- Loading states: pulsing dots animation (3 dots, staggered bounce) with "Processing..." text in #adaaaa
- Toast notifications for actions (copied, published, etc.) — slide in from bottom right, auto-dismiss after 3s
- The app should feel premium, like a luxury instrument. Not a startup dashboard.
```
