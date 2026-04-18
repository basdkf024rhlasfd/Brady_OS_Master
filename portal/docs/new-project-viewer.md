# Adding a New Project

## Quick version (3 steps)

1. Add entry to `src/config/projects.yml`
2. Create page file at `src/app/(portal)/<slug>/page.tsx`
3. Set `MCEPTION_<SLUG>_EMAILS` env var in Vercel (project "munich")

Or use the slash command: `/portal-publish`

## Details

### 1. Add to projects.yml

Add an entry to `src/config/projects.yml`. This single file drives the sidebar, access control, magic links, and project registry.

```yaml
- slug: acme
  label: "Acme Corp"
  short: "A"              # unique 1-char sidebar key
  href: "/acme"
  approved: 2026-04-18
  type: iframe-external    # iframe-local | iframe-external | native
  magic_link: false
  frame:
    baseUrl: "https://acme-viewer.vercel.app"
    path: "/"
```

Types:
- `iframe-local` — static HTML in `public/<slug>/viewer/`
- `iframe-external` — hosted on a separate Vercel/GitHub Pages URL
- `native` — full Next.js pages built directly in this repo

### 2. Create the page file

For iframe projects, create `src/app/(portal)/<slug>/page.tsx`:

```tsx
import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function Page() {
  await requireProjectAccess("<slug>");
  return <ProjectFrame baseUrl="<baseUrl>" path="<path>" title="<label>" />;
}
```

For native projects, build your components under `src/app/(portal)/<slug>/`.

For iframe-local projects, also create:
```bash
mkdir -p public/<slug>/viewer
cp public/templates/viewer-brand.css public/<slug>/viewer/brand.css
```

### 3. Set the env var

In Vercel (project "munich"), add:
```
MCEPTION_ACME_EMAILS=client@acme.com
```

Or use `/portal-access give client@acme.com access to acme`.

## Other operations

- **Reorder menu:** `/portal-menu` — sidebar renders in YAML order
- **Manage access:** `/portal-access`
- **Magic links:** `/portal-magic-link` — set `magic_link: true` in YAML first
