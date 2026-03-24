# App Playbook — Standalone Client Project Setup

How to spin up a new client-facing intelligence app and connect it to the mception.ai portal. Based on the Orlando and STIHL builds (March 2026).

---

## Architecture

```
mception.ai (portal)          Client App (standalone)
┌─────────────────────┐       ┌─────────────────────┐
│  Clerk auth         │       │  Single HTML file    │
│  Sidebar nav        │       │  Markdown KB files   │
│  ProjectFrame       │──────▶│  marked.js (CDN)     │
│  (iframe wrapper)   │       │  No build step       │
│                     │       │  No auth (portal     │
│  ENV: APP_URL ──────│───┐   │   handles it)        │
└─────────────────────┘   │   └─────────────────────┘
   munich repo            │      separate repo
   Vercel: munich         └──▶   Vercel: static deploy
   Domain: mception.ai          Domain: auto-assigned
```

**Rule:** Each client project = its own repo, its own deploy. The portal just iframes it.

**Default pattern:** Single HTML file + markdown KB directory. Zero build toolchain.

---

## Step 1: Scaffold the App

```bash
# From the Brady OS project folder
cd "1-execution/areas/work-and-business/programs/Consulting/Project - <Name>/"

# Create the two directories — that's it
mkdir viewer kb
```

Fork from the Orlando template at `orlando-v3/houston/viewer/index.html` or the STIHL template at `Project - Stihl Insights/viewer/index.html`. Then customize:

1. Replace branding (title, sidebar header, meta tags)
2. Replace accent color (Orlando = blue `#7aa2f7`, STIHL = orange `#f97316`)
3. Update the `files[]` array to match your KB files
4. Update the `sections[]` array to match your nav groups
5. Set the password in the gate check

No `package.json`, no `node_modules`, no build config.

---

## Step 2: Directory Structure

```
Project - <Name>/
├── viewer/
│   └── index.html            # Single-file app (~900-1100 lines)
└── kb/
    ├── 00-<first-section>.md
    ├── 01-<second-section>.md
    ├── ...
    └── NN-<last-section>.md
```

---

## Step 3: Core File — `viewer/index.html`

Single HTML file with three embedded sections:

### `<style>` block
- Dark theme: `#0a0a0a` body, `#111` nav, `#222` borders
- 280px fixed left sidebar with collapsible section groups
- Markdown rendering styles (h1–h4, tables, code, blockquotes)
- Search results styling
- Saved items + Request Inbox styles

### `<body>` structure
```html
<div id="gate">...</div>     <!-- Password gate -->
<nav>                         <!-- 280px sidebar -->
  <div class="brand">...</div>
  <div class="search-box"><input id="search" /></div>
  <div id="search-results"></div>
  <div id="nav-links"></div>
</nav>
<main>                        <!-- Content area -->
  <div class="content-wrap" id="content"></div>
</main>
```

### `<script>` block — key components

**Data layer:**
```javascript
const files = [
  { id: 'section-id', file: '../kb/00-section.md', label: 'Display Name' },
  // ...
];

const sections = [
  { name: 'Group Name', ids: ['section-id', ...], defaultOpen: true },
  // ...
];
```

**Navigation:**
- `buildNavSection(name, buildLinks, defaultOpen)` — creates collapsible group with chevron toggle
- Collapse state persisted in `localStorage` via `<project>-navCollapsed`
- Special sections for Requests (inline form) and Saved (localStorage CRUD)

**Content loading:**
- `fetchFile(id)` — fetch + cache markdown content
- `loadFile(id)` — render markdown via `marked.parse()`, auto-link `kb/*.md` references
- `loadFileWithAnchor(id, anchorText)` — load file then scroll to heading

**Search:**
- 200ms debounce, preloads all files, searches across all cached content
- Replaces nav with inline search results
- Click result → load file

**Interactive features:**
- `renderRequestInbox()` — localStorage-backed form for capturing requests
- `renderSaved()` — CRUD for saved snippets, notes, and templates
- `addSaveButton()` — adds "+ Save snippet" button to KB pages

**Routing:**
- Hash-based: `#section-id`, `#requests`, `#saved`
- `history.replaceState()` updates URL without page reload
- `handleHash()` on page load restores correct view

**Embedded detection:**
```javascript
if (window.self !== window.top) {
  // Hide sidebar — portal provides nav
}
```

---

## Step 4: Content as Markdown

Write each section's content as a standalone markdown file in `kb/`. Guidelines:

- Start each file with an `# H1` title
- Use `## H2` for major sections, `### H3` for items
- Use markdown tables for structured data
- Use blockquotes for implications or callouts
- Cross-reference other files with inline code: `` `kb/01-section.md` `` — the viewer auto-links these
- Keep files focused: one topic per file, easy to search and navigate independently

---

## Step 5: Deploy

### Option A: Static hosting (recommended)

```bash
# Push to GitHub
cd "Project - <Name>"
git init
git add viewer/ kb/
git commit -m "Initial <project> viewer build"
gh repo create <project-slug> --private --source=. --push

# Deploy to Vercel as static site
npx vercel link
npx vercel --prod
```

No build command needed — Vercel serves static files directly.

### Option B: Any static host

GitHub Pages, S3, Netlify, or any static file server works. Just point it at the directory containing `viewer/` and `kb/`.

### Option C: Local only

```bash
# For local development (fetch() needs a server for markdown files)
cd "Project - <Name>"
python3 -m http.server 4100

# Then open http://localhost:4100/viewer/
```

Or just `open viewer/index.html` — works for everything except cross-origin fetch (markdown loading).

---

## Step 6: Connect to the Portal

### Add iframe proxy page in munich

Unlike the old multi-route pattern, you only need **one** proxy page since the viewer handles its own routing via hash:

```
munich/src/app/(portal)/<project>/page.tsx
```

```tsx
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const APP_URL = process.env.NEXT_PUBLIC_<PROJECT>_APP_URL ?? "http://localhost:4100";

export default function Page() {
  return <ProjectFrame baseUrl={APP_URL} path="/viewer/" title="<Project Name>" />;
}
```

### Add sidebar nav in munich

Edit `munich/src/components/portal/Sidebar.tsx`:

```typescript
const projectSubPages = [
  { href: "/<project>", label: "<Project Name>", short: "P" },
];
```

### Set env var on munich Vercel project

```bash
echo "<production-url>" | npx vercel env add NEXT_PUBLIC_<PROJECT>_APP_URL production
```

### Redeploy munich

```bash
npx vercel --prod --force
```

---

## Step 7: Local Development

```bash
# Terminal 1: Standalone app (Python HTTP server for fetch() support)
cd "Project - <Name>" && python3 -m http.server 4100
# Open http://localhost:4100/viewer/

# Terminal 2: Portal (optional — only if testing iframe)
cd munich && npm run dev  # runs on port 3000
```

The standalone app works on its own. When iframed by the portal, the viewer auto-hides the sidebar.

---

## Checklist for New Projects

- [ ] Create `viewer/` and `kb/` directories
- [ ] Fork viewer HTML from Orlando or STIHL template
- [ ] Customize branding, accent color, password
- [ ] Update `files[]` and `sections[]` arrays
- [ ] Write markdown KB files with real content
- [ ] Create GitHub repo, push, deploy to Vercel (static)
- [ ] Add proxy page in munich
- [ ] Add sidebar nav entry in munich
- [ ] Set `NEXT_PUBLIC_<PROJECT>_APP_URL` env var on munich
- [ ] Redeploy munich
- [ ] Test: standalone app works alone
- [ ] Test: app works inside portal iframe
- [ ] Test: search, nav groups, saved items, requests all work

---

## Theming Quick Reference

| Element | Use your accent color |
|---------|----------------------|
| Active nav text + left border | `#ACCENT` |
| Active nav background | darken accent heavily |
| Code text, links | `#ACCENT` (slightly lighter) |
| Blockquote border | `#ACCENT` |
| Table header text | `#ACCENT` |
| h2 color | light tint of accent |
| Search input focus border | `#ACCENT` |

Base dark theme (don't change): `#0a0a0a` body, `#111` nav/cards, `#222` borders, `#e0e0e0` text, `#bbb` paragraphs.

---

## When to Use Next.js Instead

Use the React/Next.js pattern (see git history for the old version of this playbook) when:

- App needs server-side logic (auth, API routes, database queries)
- App needs real-time or dynamic data fetching
- App needs complex interactivity beyond forms + localStorage
- Team is already in a React/Next.js codebase and the app will grow

For pure intelligence surfaces with static or manually-updated content → **always use the HTML viewer pattern.**

---

## Reference Implementations

- **STIHL viewer:** `Project - Stihl Insights/viewer/index.html` (orange theme)
- **STIHL KB:** `Project - Stihl Insights/kb/` (9 files)
- **Orlando viewer:** `orlando-v3/houston/viewer/index.html` (blue theme)
- **Orlando KB:** `orlando-v3/houston/kb/` (23 files)
- **Portal ProjectFrame:** `munich/src/components/portal/ProjectFrame.tsx`
