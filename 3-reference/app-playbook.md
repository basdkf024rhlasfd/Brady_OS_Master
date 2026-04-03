# App Playbook — Project Setup & Deployment

How to build and deploy project apps on the mception.ai portal. Three patterns based on complexity.

---

## Choose Your Pattern

| Pattern | When to use | Examples | Build tool | Deploy |
|---------|-------------|----------|------------|--------|
| **1. Simple UI** | Static KB viewer, single-page display, minimal interactivity | PauletteAI, Baden Bagley, Orlando | Hand-code HTML | Standalone repo → Vercel static → iframe via ProjectFrame |
| **2. Complex UI, portal-native** | Rich interactive app, needs API routes, internal tools | STIHL, Content Engine | V0 or Stitch for design → copy components into portal | Native Next.js pages in mception-ai repo |
| **3. Complex UI, standalone deploy** | Client needs their own URL, or app must exist outside portal | Client-facing tools, public demos | V0 or Stitch → deploy directly | Standalone Vercel app → iframe via ProjectFrame |

### Decision guide

- **Is the UI simple enough to hand-code?** → Pattern 1 (HTML viewer)
- **Is it complex enough to warrant V0/Stitch?**
  - **Does it need API routes or should stay private?** → Pattern 2 (portal-native)
  - **Does the client/user need a standalone URL?** → Pattern 3 (standalone deploy)

All three patterns are valid. Pick based on the project's needs.

---

## Pattern 1: Simple UI (HTML Viewer)

### Architecture

```
mception.ai (portal)          Client App (standalone)
┌─────────────────────┐       ┌─────────────────────┐
│  Clerk auth         │       │  Single HTML file    │
│  Sidebar nav        │       │  Markdown KB files   │
│  ProjectFrame       │──────▶│  marked.js (CDN)     │
│  (iframe wrapper)   │       │  No build step       │
│                     │       │  No auth (portal     │
│                     │       │   handles it)        │
└─────────────────────┘       └─────────────────────┘
   mception-ai repo              separate repo
   Vercel: mception-ai            Vercel: static deploy
```

**Rule:** Each client project = its own repo, its own deploy. The portal embeds it via ProjectFrame.

**Default pattern:** Single HTML file + markdown KB directory. Zero build toolchain.

**No auth in standalone apps.** The portal handles authentication via Clerk.

### Scaffold

```bash
cd "1-execution/areas/work-and-business/programs/Consulting/Project - <Name>/"
mkdir viewer kb
```

Fork from the Orlando template (`orlando-v3/houston/viewer/index.html`) or the PauletteAI template. Then customize:

1. Replace branding (title, sidebar header, meta tags)
2. Replace accent color
3. Update the `files[]` and `sections[]` arrays
4. Write markdown KB files

No `package.json`, no `node_modules`, no build config.

### Directory Structure

```
Project - <Name>/
├── viewer/
│   └── index.html            # Single-file app (~900-1100 lines)
└── kb/
    ├── 00-<first-section>.md
    ├── 01-<second-section>.md
    └── NN-<last-section>.md
```

### Deploy

```bash
cd "Project - <Name>"
git init && git add viewer/ kb/
git commit -m "Initial <project> viewer build"
gh repo create <project-slug> --private --source=. --push
npx vercel link && npx vercel --prod
```

### Connect to Portal

Create one route in mception-ai:

```
src/app/(portal)/<project>/page.tsx
```

```tsx
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function Page() {
  await requireProjectAccess("<project>");
  return <ProjectFrame baseUrl="https://<deploy-url>" path="/viewer/" title="<Project Name>" />;
}
```

Add sidebar entry, access control env var, and allowlist entry (see Common Steps below).

---

## Pattern 2: Complex UI, Portal-Native

### Architecture

```
mception.ai (portal)
┌─────────────────────────────────────────┐
│  Clerk auth                             │
│  Sidebar nav                            │
│  ┌────────────────────────────────────┐ │
│  │  layout.tsx (requireProjectAccess) │ │
│  │  AppShell (sidebar + mobile nav)   │ │
│  │  /queue/page.tsx                   │ │
│  │  /editor/page.tsx                  │ │
│  │  /published/page.tsx               │ │
│  │  API routes (Claude, Notion, etc.) │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
   mception-ai repo — everything in one place
```

**When:** The app has complex interactivity, needs API routes, or should have no public URL. Design the UI in V0 or Google Stitch, then copy the generated components directly into the portal.

**No standalone URL exists.** Auth, routing, and API are all handled natively.

### Build Process

1. **Design in V0/Stitch** — iterate on the UI until it looks right
2. **Copy components** into `src/components/<project>/` and `src/app/(portal)/<project>/`
3. **Adapt to portal conventions** — use existing shadcn/ui components, `cn()` from utils, `lucide-react` icons, portal dark theme classes

### Directory Structure

```
src/app/(portal)/<project>/
├── layout.tsx              # Auth gate + AppShell wrapper
├── page.tsx                # Redirect to default sub-route
├── <view-1>/page.tsx
├── <view-2>/page.tsx
└── <view-3>/page.tsx

src/components/<project>/
├── AppShell.tsx            # Sidebar nav + mobile header
└── <domain-components>.tsx

src/lib/
├── <project>-types.ts
└── <project>-data.ts

src/app/api/<project>/      # Optional API routes
└── <endpoint>/route.ts
```

### Layout Pattern (follow STIHL)

```tsx
// layout.tsx
import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectShell } from "@/components/<project>/AppShell";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireProjectAccess("<project>");
  return <ProjectShell>{children}</ProjectShell>;
}
```

### AppShell Pattern (follow STIHL)

- Desktop: 56-width sidebar with nav items, icons, active state via `usePathname()`
- Mobile: fixed top header with horizontal scrolling tab pills
- Footer: "Internal use only" or "Personal use only"
- Use portal's existing dark theme classes (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-white/[0.08]`, `text-primary`, `bg-primary/10`)

### Connect to Portal

No ProjectFrame needed — the pages are native. Just ensure:
- Slug is in `ALL_PROJECTS` array in `src/lib/access.ts`
- Slug has entry in `PROJECT_EMAIL_ENV` map
- Sidebar entry exists in `Sidebar.tsx`
- Env var `MCEPTION_<SLUG>_EMAILS` is set on Vercel
- Allowlist entry in `mception-ai-projects.yml`

### Reference Implementations

- **STIHL:** `src/app/(portal)/stihl/` + `src/components/stihl/` + `src/lib/stihl-data.ts`
- **Content Engine:** `src/app/(portal)/content-engine/` + `src/components/content-engine/` + `src/lib/content-engine-data.ts`

---

## Pattern 3: Complex UI, Standalone Deploy

### Architecture

```
mception.ai (portal)          Standalone App (Vercel)
┌─────────────────────┐       ┌─────────────────────┐
│  Clerk auth         │       │  Next.js / React     │
│  Sidebar nav        │       │  V0-generated        │
│  ProjectFrame       │──────▶│  Own API routes      │
│  (iframe wrapper)   │       │  Own domain           │
│                     │       │  Accessible by URL    │
└─────────────────────┘       └─────────────────────┘
   mception-ai repo              separate Vercel project
```

**When:** Client needs direct access, app needs its own domain, or the app is a product that lives outside the portal.

**Note:** The standalone URL is publicly accessible. If this is a concern, use Pattern 2 instead, or add Vercel Password Protection (Pro plan).

### Build Process

1. **Build in V0** — iterate until the UI is right
2. **Deploy from V0** — click Publish, optionally create GitHub repo
3. **Note the production URL** (e.g., `https://<project>.vercel.app`)
4. **Wire into portal** via ProjectFrame

### Connect to Portal

```tsx
// src/app/(portal)/<project>/page.tsx
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function Page() {
  await requireProjectAccess("<project>");
  return <ProjectFrame baseUrl="https://<project>.vercel.app" path="/" title="<Project Name>" />;
}
```

### PostMessage Bridge (optional)

If the standalone app needs to call portal API routes:

```javascript
// Standalone app → portal
window.parent.postMessage({ source: '<project>', type: 'REQUEST', payload: {...} }, '*');

// Portal → standalone app
window.addEventListener('message', (event) => {
  if (event.data?.source === 'mception-portal') { ... }
});
```

---

## Common Steps (All Patterns)

### Access Control Setup

1. Add slug to `ALL_PROJECTS` in `src/lib/access.ts`
2. Add slug to `PROJECT_EMAIL_ENV` map: `"<slug>": "MCEPTION_<SLUG>_EMAILS"`
3. Add sidebar entry in `src/components/portal/Sidebar.tsx`
4. Set `MCEPTION_<SLUG>_EMAILS` env var on Vercel with allowed email addresses
5. Add entry to `3-reference/publishing/mception-ai-projects.yml` with approval date

### Publishing Rules

Portal hookup is not publication approval. Wiring a project into the portal does not make it publicly visible. New slugs require approval plus inclusion in the allowlist YAML. Existing public slugs may be updated without re-approval as long as visibility is not broadened. If the allowlist cannot be read, fail closed on new publication decisions.

### Content as Markdown (Pattern 1)

- Start each file with `# H1` title
- Use `## H2` for major sections, `### H3` for items
- Use markdown tables for structured data
- Cross-reference files with inline code: `` `kb/01-section.md` ``
- Keep files focused: one topic per file

### Theming (Pattern 1)

| Element | Use your accent color |
|---------|----------------------|
| Active nav text + left border | `#ACCENT` |
| Code text, links | `#ACCENT` |
| Blockquote border | `#ACCENT` |
| Table header text | `#ACCENT` |
| Search input focus border | `#ACCENT` |

Base dark theme: `#0a0a0a` body, `#111` nav/cards, `#222` borders.

---

## Checklist

### Pattern 1 (Simple UI)
- [ ] Create `viewer/` and `kb/` directories
- [ ] Fork viewer HTML from Orlando or PauletteAI template
- [ ] Customize branding and accent color
- [ ] Write markdown KB files
- [ ] Create GitHub repo, push, deploy to Vercel (static)
- [ ] Add ProjectFrame page in portal
- [ ] Add sidebar entry, access control, allowlist

### Pattern 2 (Portal-Native)
- [ ] Design UI in V0 or Stitch
- [ ] Create layout.tsx with requireProjectAccess
- [ ] Create AppShell component (follow STIHL pattern)
- [ ] Create page routes for each view
- [ ] Create data layer (types + static data)
- [ ] Add API routes if needed
- [ ] Add sidebar entry, access control, allowlist
- [ ] Build passes (`npx next build`)

### Pattern 3 (Standalone Deploy)
- [ ] Build and iterate in V0
- [ ] Deploy to Vercel (note production URL)
- [ ] Optionally create GitHub repo for maintenance
- [ ] Add ProjectFrame page in portal
- [ ] Add sidebar entry, access control, allowlist
- [ ] Consider iframe guard or Vercel password protection if private
