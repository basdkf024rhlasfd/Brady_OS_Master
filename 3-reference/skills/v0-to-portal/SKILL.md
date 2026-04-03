# V0 to Portal Deploy

End-to-end checklist for deploying a V0-generated (or Stitch-generated) app into the mception.ai portal.

## Instructions

You are a deployment coordinator. When Brady has built (or is about to build) an app in V0 or Google Stitch and needs it live in the mception.ai portal, walk through this skill step by step. Each section is a gate — confirm completion before moving on.

Always read `3-reference/app-playbook.md` for the current patterns and `3-reference/skills/air-traffic-control/repo-registry.yml` for the repo map before starting.

---

## A0. Choose Your Deploy Path

Before building, decide which pattern fits. See `3-reference/app-playbook.md` for full details.

| Question | If yes → |
|----------|----------|
| Is the UI simple enough to hand-code? | **Skip V0.** Use Pattern 1 (HTML viewer). This skill doesn't apply. |
| Is it a complex UI that needs API routes or must stay private? | **Pattern 2: Portal-native.** Design in V0/Stitch, then copy components into mception-ai as native Next.js pages. Skip to section B-alt. |
| Is it a complex UI where the client needs a standalone URL? | **Pattern 3: Standalone deploy.** Build in V0, deploy to Vercel, iframe into portal. Continue to section A → B → C. |

**Default for internal/personal tools:** Pattern 2 (portal-native). No public URL, auth handled natively.

**Default for client-facing apps:** Pattern 3 (standalone deploy) if client needs direct access, otherwise Pattern 2.

---

## A. Pre-Flight Check

Before anything touches V0, confirm these exist in brady-os:

| Artifact | Location | Status |
|---|---|---|
| PROJECT.md | `1-execution/areas/.../Project - {{Name}}/PROJECT.md` | Must exist |
| Publishing allowlist entry | `3-reference/publishing/mception-ai-projects.yml` | Must have slug + approval date |
| Slug in ALL_PROJECTS | mception-ai `src/lib/access.ts` | Must be in the array |
| Sidebar entry | mception-ai `src/components/portal/Sidebar.tsx` | Must have conditional navLink |
| Env var for access | Vercel dashboard → mception-ai project → Environment Variables | `MCEPTION_{{SLUG}}_EMAILS` must exist |

If any are missing, create them before deploying. The project slug is the canonical key that connects everything: URL path, access control, sidebar, and allowlist.

---

## B. V0 Build Phase

### Step 1: Generate in V0

1. Go to [v0.dev](https://v0.dev)
2. Paste the V0 prompt from the project directory (usually `v0-prompt.md`)
3. Iterate in V0 until the UI is right — V0 supports multi-turn conversation
4. When satisfied, click **"Add to Codebase"** or **"Deploy"**

### Step 2: Deploy to Vercel from V0

V0 has native Vercel deployment. Two paths:

**Path A — Direct Deploy (fastest, for standalone apps):**
1. In V0, click **"Deploy"** in the top right
2. V0 creates a Vercel project and deploys automatically
3. Note the URL: `https://{{project-name}}.vercel.app`
4. This is your `baseUrl` for ProjectFrame

**Path B — Export to GitHub first (preferred for ongoing maintenance):**
1. In V0, click **"Open in GitHub"** or use the **"npx"** command V0 provides
2. This creates a new GitHub repo under your account with the generated code
3. Connect that repo to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the GitHub repo
   - Deploy with defaults (Framework: Next.js, no env vars needed for static apps)
4. Note the URL: `https://{{project-name}}.vercel.app`
5. Optionally add a custom domain later

**Path C — Export to existing standalone repo:**
1. In V0, click the **code icon** to copy the generated code
2. Clone or open the target repo (e.g., `content-engine`)
3. Paste/merge the V0 output into the repo
4. Push to GitHub
5. If already connected to Vercel, it auto-deploys
6. If not, connect at [vercel.com/new](https://vercel.com/new)

### Step 3: Verify Standalone Deploy

Before portal integration, confirm the app works on its own:
- Visit `https://{{project-name}}.vercel.app` directly
- Test all views/interactions
- Check mobile responsiveness (portal iframe can be narrow)
- Confirm localStorage persistence works

---

## B-alt. Portal-Native Path (Copy V0 Code into Portal)

Use this instead of B + C when you chose Pattern 2 (portal-native) in A0.

### Step 1: Design in V0/Stitch

1. Build and iterate on the UI in V0 or Google Stitch
2. Get the design to a state you're happy with
3. You do NOT need to deploy from V0 — the code is going into the portal

### Step 2: Create the Portal Structure

Follow the STIHL pattern. Create these files in mception-ai:

```
src/app/(portal)/{{slug}}/
├── layout.tsx              # requireProjectAccess + AppShell wrapper
├── page.tsx                # redirect to default sub-route
├── {{view-1}}/page.tsx
├── {{view-2}}/page.tsx
└── {{view-3}}/page.tsx

src/components/{{slug}}/
├── AppShell.tsx            # Sidebar nav + mobile header (copy STIHL pattern)
└── {{components}}.tsx

src/lib/
├── {{slug}}-types.ts
└── {{slug}}-data.ts
```

### Step 3: Copy and Adapt V0 Components

1. From V0, copy the generated component code (click code icon or view source)
2. Adapt to portal conventions:
   - Replace any custom UI components with existing shadcn/ui components
   - Use `cn()` from `@/lib/utils` for conditional classes
   - Use `lucide-react` for icons
   - Use portal dark theme classes (`bg-card`, `text-foreground`, `text-muted-foreground`, `text-primary`, etc.)
   - Use `usePathname()` from `next/navigation` for active nav state
   - Use `useSearchParams()` wrapped in `Suspense` for URL params
3. Wire data layer: create types file + static data file (can migrate to API later)
4. Wire localStorage for persistence (same pattern as STIHL RSS state)

### Step 4: Verify

```bash
cd mception-ai && npx next build
```

All routes must compile. Then test locally with `npm run dev`.

### Step 5: Connect to Portal

Ensure the common portal setup is complete (same as Pre-Flight Check in section A):
- Slug in `ALL_PROJECTS` + `PROJECT_EMAIL_ENV` in `src/lib/access.ts`
- Sidebar entry in `Sidebar.tsx`
- Env var `MCEPTION_{{SLUG_UPPER}}_EMAILS` on Vercel
- Allowlist entry in `mception-ai-projects.yml`

Then commit, push, and Vercel auto-deploys.

### Reference

- STIHL layout: `src/app/(portal)/stihl/layout.tsx`
- STIHL AppShell: `src/components/stihl/AppShell.tsx`
- Content Engine: `src/app/(portal)/content-engine/` + `src/components/content-engine/`
- App Playbook Pattern 2: `3-reference/app-playbook.md`

---

## C. Portal Integration (mception-ai repo)

**For Pattern 3 (standalone deploy) only.** Once the standalone app is deployed and working, wire it into the portal.

### Step 1: Create or Update the Portal Page

**File:** `src/app/(portal)/{{slug}}/page.tsx`

```typescript
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function {{PascalName}}Page() {
  await requireProjectAccess("{{slug}}");
  return (
    <ProjectFrame
      baseUrl="https://{{project-name}}.vercel.app"
      path="/"
      title="{{Display Name}}"
    />
  );
}
```

**Pattern reference:**
- External Vercel/GitHub Pages app: `baseUrl="https://..."`, `path="/"`
- External with `/viewer/` subpath: `baseUrl="https://..."`, `path="/viewer/"`
- Embedded in portal's `public/` dir: `baseUrl=""`, `path="/{{slug}}/viewer/index.html"`

### Step 2: Verify Access Control

Confirm these are already set (from Pre-Flight):

1. **`src/lib/access.ts`** — `ALL_PROJECTS` array includes `"{{slug}}"`
2. **`src/lib/access.ts`** — `PROJECT_EMAIL_ENV` map includes `{{slug}}: "MCEPTION_{{SLUG_UPPER}}_EMAILS"`
3. **Vercel env vars** — `MCEPTION_{{SLUG_UPPER}}_EMAILS` is set with Brady's email (and any client emails)

### Step 3: Verify Sidebar Entry

**File:** `src/components/portal/Sidebar.tsx`

Confirm there's a conditional navLink in the "My Projects" section:
```typescript
{projects.includes("{{slug}}") && navLink({ href: "/{{slug}}", label: "{{Display Name}}", ... })}
```

### Step 4: Add API Routes (if needed)

If the standalone app needs server-side functionality (Claude API, Notion API, image gen, etc.), add API routes in the portal:

**Directory:** `src/app/api/{{slug}}/`

Each route should:
- Import and check auth/access as needed
- Handle CORS for the iframe origin
- Return appropriate response format

The standalone app communicates with these via `postMessage` to the parent portal, which then calls the API routes. OR, if the Vercel app has its own API routes, it can call them directly (simpler, but needs its own API keys).

### Step 5: Deploy Portal

1. Commit and push mception-ai changes
2. Vercel auto-deploys from the main branch
3. Wait for deploy to complete (~1-2 min)

---

## D. Verification Checklist

Run through these in order:

| # | Check | How |
|---|---|---|
| 1 | Standalone app loads | Visit `https://{{project-name}}.vercel.app` directly |
| 2 | Portal page loads | Visit `https://mception.ai/{{slug}}` while logged in |
| 3 | Access control works | Visit while logged in as Brady — should load. Visit as unauthorized user — should redirect |
| 4 | Sidebar shows entry | Check "My Projects" section in portal sidebar |
| 5 | App renders in iframe | The standalone app should appear inside the portal chrome |
| 6 | PostMessage bridge works | If applicable, test any parent↔iframe communication |
| 7 | API routes work | If applicable, test AI generation, data fetching, etc. through the iframe |
| 8 | Mobile/responsive | Resize browser to verify iframe content adapts |

---

## E. Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Blank iframe | Wrong `baseUrl` or CORS blocking | Check URL in browser directly. Vercel apps allow iframe embedding by default. Check `X-Frame-Options` header. |
| 404 on portal page | Missing route file | Confirm `src/app/(portal)/{{slug}}/page.tsx` exists and exports a default function |
| Redirected to /portal | Access denied | Check `MCEPTION_{{SLUG_UPPER}}_EMAILS` env var in Vercel. Must contain the user's email. |
| Missing from sidebar | Sidebar not updated | Add the conditional navLink in `Sidebar.tsx` |
| API route 401/403 | Auth not configured | Ensure API route checks auth correctly. If calling from iframe, may need to use postMessage bridge instead of direct fetch. |
| localStorage not persisting | iframe storage partitioned | Some browsers partition localStorage for iframes. App should still work — data persists per origin. |
| PostMessage not received | Origin mismatch or wrong event format | Check `event.origin` matches. Ensure both sides use `event.data.source` to identify messages. |

---

## F. Reference Files

- **ProjectFrame component:** `mception-ai/src/components/portal/ProjectFrame.tsx`
- **Access control:** `mception-ai/src/lib/access.ts`
- **Sidebar:** `mception-ai/src/components/portal/Sidebar.tsx`
- **Publishing allowlist:** `brady-os/3-reference/publishing/mception-ai-projects.yml`
- **Repo registry:** `brady-os/3-reference/skills/air-traffic-control/repo-registry.yml`
- **App playbook:** `brady-os/3-reference/app-playbook.md`
- **Existing examples:**
  - External (GitHub Pages): `mception-ai/src/app/(portal)/baden-bagley/page.tsx`
  - External with /viewer/: `mception-ai/src/app/(portal)/mark-schmulen/page.tsx`
  - Embedded: `mception-ai/src/app/(portal)/orlando/page.tsx`

---

## G. Quick Reference Card

```
V0 → Deploy → Portal in 5 steps:

1. PRE-FLIGHT: Slug in allowlist + ALL_PROJECTS + sidebar + env var
2. V0 BUILD:   Generate → iterate → deploy to Vercel
3. GET URL:    https://{{project-name}}.vercel.app
4. PORTAL:     Update page.tsx with ProjectFrame baseUrl → push → deploy
5. VERIFY:     Direct URL ✓ → Portal URL ✓ → Access ✓ → Sidebar ✓ → Iframe ✓
```
