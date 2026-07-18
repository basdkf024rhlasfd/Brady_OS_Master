---
name: webster
trust_tier: T0
description: >
  Deploy operations sub-routines for Musashi San. Canonical runbooks for publishing
  a project to mception.ai, managing Vercel env vars, diagnosing failed deploys,
  and navigating the portal ↔ Vercel ↔ Clerk ↔ GitHub plumbing.

  NOTE: Webster the agent persona has been absorbed by Musashi San (2026-04-27).
  This SKILL file remains active as Musashi's Deploy Mode sub-routine. Trigger via
  musashi-SKILL.md (Deploy Mode) or directly by referencing these runbooks.

  These runbooks do NOT own general Vercel app architecture decisions (vercel-plugin:nextjs),
  content generation for deliverables (project-specific skills), or Clerk auth code
  edits (use env vars to change access, not code).
trust_tier: T0
---

# Webster — Web Publishing Playbook (Musashi Deploy Sub-Routines)

Copy/paste-ready runbooks. Every command is verified against Brady's setup
as of 2026-04-22. Update this file when reality changes.

---

## Runbook 1 — Publish a new project slug to mception.ai

**Use when:** Brady says "publish [slug] to mception" for a new project.

**Prereqs to verify first:**
- `vercel whoami` returns `bradysmallwood-7504`
- `gh auth status` is clean
- The project's built deliverable (HTML + any assets) exists somewhere in
  the repo you can copy to `portal/public/<slug>/viewer/`

**Steps:**

1. **Create the slug asset directory**
   ```bash
   mkdir -p portal/public/<slug>/viewer
   cp <built-html> portal/public/<slug>/viewer/index.html
   cp -r <images-dir> portal/public/<slug>/viewer/
   ```

2. **Create the ProjectFrame page** at
   `portal/src/app/(portal)/<slug>/page.tsx`:
   ```tsx
   import { ProjectFrame } from "@/components/portal/ProjectFrame";
   import { requireProjectAccess } from "@/lib/portal-access";

   export default async function <PascalCase>Page() {
     await requireProjectAccess("<slug>");
     return (
       <ProjectFrame
         baseUrl="/<slug>/viewer"
         path="/index.html"
         title="<Human Label>"
       />
     );
   }
   ```

3. **Register the slug** in `portal/src/config/projects.yml`. Pick a unique
   `short` character (grep existing `short:` lines first):
   ```yaml
   - slug: <slug>
     label: "<Human Label>"
     short: "<X>"
     href: "/<slug>"
     description: "<one-liner>"
     approved: <YYYY-MM-DD>
     type: iframe-local
     magic_link: true
     frame:
       baseUrl: ""
       path: "/<slug>/viewer/index.html"
   ```

4. **Set the access allowlist env var** on Vercel (production + preview + dev):
   ```bash
   cd portal
   # link once per worktree
   [ -d .vercel ] || vercel link --yes --project mception-ai
   for env in production preview development; do
     printf "%s" "<email1>,<email2>" | vercel env add MCEPTION_<SLUG_UPPER>_EMAILS $env
   done
   vercel env ls production | grep MCEPTION_<SLUG_UPPER>_EMAILS  # verify
   ```
   Replace hyphens in slug with underscores for the env var name
   (e.g., slug `1915-south` → `MCEPTION_1915_SOUTH_EMAILS`).

5. **Commit and PR**
   ```bash
   git add portal/public/<slug>/ portal/src/app/\(portal\)/<slug>/ portal/src/config/projects.yml
   git commit -m "Publish <slug> to mception.ai (access: <emails>)"
   git push -u origin <branch>
   gh pr create --title "Publish <slug> to mception" --body "..."
   gh pr merge <pr-number> --squash
   ```

6. **Wait for the deploy + verify**
   ```bash
   # Poll until Ready (monitor pattern, or:)
   vercel ls --prod | head -5
   curl -sI https://mception.ai/<slug>  # expect 307 redirect (Clerk sign-in)
   curl -sI https://mception.ai/<slug>/viewer/index.html  # expect 200
   ```
   When authenticated via Clerk as an allowlisted email, the Next.js page
   renders the iframe wrapping the viewer.

7. **If the build fails with function-size error**, apply Runbook 3.

---

## Runbook 2 — Add/remove emails on a slug's allowlist

**Use when:** Brady says "give [email] access to [slug]" or "remove [email]
from [slug]."

**Steps:**

1. Link + read current value:
   ```bash
   cd portal
   [ -d .vercel ] || vercel link --yes --project mception-ai
   vercel env pull .env.mception-prod --environment=production --yes
   grep MCEPTION_<SLUG_UPPER>_EMAILS .env.mception-prod  # see current csv
   ```

2. Compute new csv (add or remove), then overwrite across envs:
   ```bash
   NEW="<comma-separated-emails>"
   for env in production preview development; do
     vercel env rm MCEPTION_<SLUG_UPPER>_EMAILS $env --yes 2>/dev/null || true
     printf "%s" "$NEW" | vercel env add MCEPTION_<SLUG_UPPER>_EMAILS $env
   done
   ```

3. Trigger redeploy to pick up new env vars. Env vars are read at runtime
   for `process.env.X` reads (no rebuild needed for env-var-only changes),
   BUT a redeploy is safer to verify. Easiest: push an empty commit to
   main, or run `vercel deploy --prod` from `portal/`.

4. Clean up: `rm portal/.env.mception-prod` (never commit env dumps).

**Special emails:**
- `brady.smallwood@gmail.com` already has access everywhere via platform-
  owner default — don't add him redundantly.
- `bradysmallz@gmail.com` is the RESERVED test account (no access, by design).
- For temporary "all projects" access, use `MCEPTION_ALL_PROJECTS_EMAILS`.

---

## Runbook 3 — Diagnose + fix a failed production deploy

**Use when:** A merge to main triggered a deploy and it shows `● Error` in
`vercel ls --prod`.

**Steps:**

1. Get the logs:
   ```bash
   cd portal
   [ -d .vercel ] || vercel link --yes --project mception-ai
   FAILED_URL=$(vercel ls --prod 2>&1 | grep -F 'Error' | head -1 | \
     grep -oE 'https://mception-[^ ]+')
   vercel inspect "$FAILED_URL" --logs 2>&1 | tail -80
   ```

2. Common failure modes + fixes:

   **a. Function size > 250 MB**
   Symptom: `Max serverless function size of 250 MB uncompressed reached`
   and a dependencies table showing large neighbor dirs.
   Fix: Add/extend `outputFileTracingExcludes` in `portal/next.config.ts`:
   ```ts
   outputFileTracingExcludes: {
     "*": ["../0-agents/**/*", "../1-execution/**/*",
           "../2-memory/**/*", "../3-reference/**/*"]
   }
   ```

   **b. Missing env var at build time**
   Symptom: `process.env.X is undefined` in a server component during
   prerender, or Clerk middleware 500ing.
   Fix: Add the env var via Runbook 2; redeploy.

   **c. Type error**
   Symptom: `Type error: ...` in build logs.
   Fix: Read the error, fix locally, commit, merge.

   **d. Clerk middleware breaks on new route**
   Symptom: Page hangs or redirects forever.
   Fix: Confirm `portal/src/app/(portal)/<slug>/page.tsx` uses
   `requireProjectAccess("<slug>")` — that helper handles the redirect.
   Don't reinvent auth per-page.

3. After fix: commit, PR, merge. Watch `vercel ls --prod` until `● Ready`.

---

## Runbook 4 — Set up a new API/token on an existing project

**Use when:** Brady says "wire up [API name] on mception" or "we need
[service] integrated."

**Steps:**

1. **Create / obtain the API key** on the service side (OpenAI, Anthropic,
   Notion, whatever). This is Brady's hands — Webster does not create
   third-party accounts.

2. **Store the secret as a Vercel env var** (never in code):
   ```bash
   cd portal
   [ -d .vercel ] || vercel link --yes --project mception-ai
   for env in production preview development; do
     printf "%s" "<secret-value>" | vercel env add <ENV_VAR_NAME> $env
   done
   ```
   Name conventions:
   - Service prefix + purpose, e.g. `NOTION_API_KEY`, `OPENAI_API_KEY`,
     `ANTHROPIC_API_KEY_MCEPTION`
   - Public client-side vars MUST start with `NEXT_PUBLIC_` (don't put
     secrets in those)

3. **Add the name to `portal/.env.example`** so future devs know it exists.

4. **Reference in code** as `process.env.X` (server components/API routes
   only for secrets; `NEXT_PUBLIC_X` for client-side).

5. **Pull locally for dev** if needed:
   ```bash
   cd portal
   vercel env pull .env.local --environment=development
   ```

---

## Runbook 5 — UAT (MANDATORY after every publish)

**Use when:** Any publish, redeploy, or visible change to a mception.ai slug.
Runs immediately after Runbook 1 or 2 before declaring "done."

### 5a — Broken image check

```bash
SLUG=<slug>
# Fetch the rendered viewer HTML and extract every img src
curl -sL "https://mception.ai/${SLUG}/viewer/index.html" | \
  grep -oE '<img[^>]+src="[^"]+"' | \
  sed -E 's/.*src="([^"]+)".*/\1/' | \
  while read src; do
    # Resolve relative URLs to absolute
    case "$src" in
      http*) url="$src" ;;
      /*)    url="https://mception.ai$src" ;;
      *)     url="https://mception.ai/${SLUG}/viewer/$src" ;;
    esac
    code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    echo "$code  $url"
  done | tee /tmp/image-check.log
grep -vE "^200" /tmp/image-check.log  # any non-200 = broken = STOP
```

**Action on failure:** If any image returns non-200, do NOT declare the
publish complete. Options:
- Re-upload: if the PNG exists locally but not on the server, copy to
  `portal/public/<slug>/viewer/<path>` and redeploy
- Rename: if the HTML references the wrong path, fix the HTML/renderer
  and redeploy
- Explicitly flag: if the image is intentionally missing (e.g., coming
  later), report it to Brady and get `explicitly approved missing image`
  confirmation before moving on

### 5b — Chatbot functional check (if applicable)

Applies when the slug has an embedded chatbot or AI endpoint. Look for:
- `portal/src/config/chat/<slug>.yml` (page-chatbot config)
- `/api/chat/<slug>` or similar route
- Any `<iframe>` in the viewer that embeds a chat widget

```bash
SLUG=<slug>
# 1. Confirm chat config file exists and references valid KB
test -f "portal/src/config/chat/${SLUG}.yml" && \
  grep -E "knowledge_base|system_prompt|kb_path" "portal/src/config/chat/${SLUG}.yml"
# 2. Verify each referenced KB file exists
for kb in $(grep "kb_path:" "portal/src/config/chat/${SLUG}.yml" | awk '{print $2}'); do
  test -f "portal/${kb}" && echo "OK: $kb" || echo "MISSING: $kb"
done
# 3. End-to-end test message — authenticated Brady session required
# Use Claude in Chrome with the live URL, send a KB-specific question,
# confirm the response references specific KB content (not a generic answer)
```

**Action on failure:** Chat endpoint 500 = block publish until fixed.
Response generic / ignores KB = flag to Brady with the test transcript and
the config file path; likely a system prompt or KB path fix needed.

### 5c — Permissions audit report

After every publish — and weekly across ALL slugs — pull the current
allowlist and surface it to Brady.

**Single slug after publish:**
```bash
SLUG_UPPER=$(echo "<slug>" | tr 'a-z-' 'A-Z_')
cd portal
[ -d .vercel ] || vercel link --yes --project mception-ai
vercel env ls production 2>/dev/null | grep "MCEPTION_${SLUG_UPPER}_EMAILS"
# Pull actual value (env ls shows "Encrypted" only)
vercel env pull /tmp/env-check --environment=production --yes >/dev/null 2>&1
grep "MCEPTION_${SLUG_UPPER}_EMAILS" /tmp/env-check | head -1
rm /tmp/env-check
```

Report back to Brady in this exact format:
```
ACCESS REPORT — <slug>
  Platform owner: brady.smallwood@gmail.com (default, always has access)
  Allowlisted: <list emails from env var, or "none beyond platform owner">

Confirm this is correct? If anyone on this list should NOT have access,
say so now — Webster removes them.
```

**Weekly audit across all slugs** (trigger: "permissions audit" or
"review who has access"):
```bash
cd portal
[ -d .vercel ] || vercel link --yes --project mception-ai
vercel env pull /tmp/env-audit --environment=production --yes >/dev/null 2>&1
grep -E '^MCEPTION_.*_EMAILS=' /tmp/env-audit | \
  while IFS='=' read name value; do
    # Strip surrounding quotes + show csv
    value=${value#\"}; value=${value%\"}
    echo "${name}: ${value}"
  done | tee /tmp/access-report.txt
rm /tmp/env-audit
```

Report format:
```
WEEKLY PERMISSIONS AUDIT — <date>
  <SLUG_1>: <emails, or "(none — only platform owner)">
  <SLUG_2>: <emails>
  ...
  ADMIN: <emails from MCEPTION_ADMIN_EMAILS>
  ALL-PROJECTS: <emails from MCEPTION_ALL_PROJECTS_EMAILS>

Anything here that shouldn't be? Webster can trim — just say which slug
and which email.
```

**Reminder cadence:** Webster surfaces the weekly audit during the
Sunday weekly-sweep by default, and on-demand any time Brady says
"permissions check," "who can see what," or similar. If Webster hasn't
surfaced an audit in 8+ days, he proactively offers one.

---

## Runbook 6 — Add a new Vercel project (separate app, not a mception slug)

**Use when:** Brady wants a standalone Vercel app (like innovation-lab,
ops-lab) instead of a mception.ai iframe slug.

**Steps:**

1. Create the repo (either a new GitHub repo or a subdirectory on an
   existing one).
2. `cd <app-dir> && vercel` — interactive first-time deploy; answers are
   usually: link new, scope = bradysmallwood-7504s-projects, framework =
   auto-detected, root dir = current, override = no.
3. Add production domain via `vercel domains add <domain>` or the
   dashboard.
4. Set env vars per Runbook 4 but against the new project.
5. If Brady wants this app embedded in mception.ai, follow Runbook 1 but
   use `type: iframe-external` and the external Vercel URL:
   ```yaml
   type: iframe-external
   frame:
     baseUrl: "https://<app>.vercel.app"
     path: "/"
   ```
   **Important — see Runbook 7** if the app has API routes or any server
   work that needs auth. *.vercel.app cannot be a Clerk satellite, so
   iframe-in-portal won't share session.

---

## Runbook 7 — Standalone Next.js app with Clerk + Blob (the ShellPrint pattern)

**Use when:** Spinning up a new standalone Next.js micro-app (like
shellprint-web). This is the canonical pattern that handles the four
gotchas hit during ShellPrint v1: vercel.app must NOT be public, Clerk
middleware default isn't enforcing, *.vercel.app isn't satellite-eligible,
Blob store needs a one-time dashboard click.

### 7a — Required packages

```bash
cd <app-dir>
npm install @clerk/nextjs @vercel/blob
```

### 7b — Middleware (MUST enforce auth, not just attach context)

```typescript
// middleware.ts (note: Next.js 16 deprecates this filename in favor of
// proxy.ts but middleware.ts still works; rename later)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jte?|tpl?|txt|xml|ico|ttf|woff2?|png|jpg|jpeg|gif|webp|svg|mp4|mp3|pdf|csv|zip)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

**The trap:** `clerkMiddleware()` alone is permissive — it makes the auth
context available but does NOT enforce auth on routes. Pages render for
anonymous users; API routes that call `auth()` get `userId: null` and
return 401. Symptom: "saving isn't working" / inconsistent 401s when
the user appears signed in. Fix: the `auth.protect()` call inside the
callback above.

### 7c — Wire Clerk env vars (cross-project copy from mception-ai)

Brady's Clerk dev keys live on `mception-ai`. Copy them to the new
project via Vercel REST API (not vercel env pull — those keys are
`sensitive` type, so the value comes back as ""):

```bash
TOKEN=$(python3 -c "import json; print(list(json.load(open('$HOME/Library/Application Support/com.vercel.cli/auth.json'))['tokens'].values())[0]['token'])")
TEAM="team_Ijh6EC5B5J5eOAC4F1EA3Ivo"
DST_PROJECT="<new-project-id>"  # from .vercel/project.json after `vercel link`

# Read keys from a portal worktree's .env.local (mception keys live there)
PK=$(grep '^NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=' \
  /Users/bs/conductor/workspaces/brady_os_master/rabat/portal/.env.local | cut -d= -f2)
SK=$(grep '^CLERK_SECRET_KEY=' \
  /Users/bs/conductor/workspaces/brady_os_master/rabat/portal/.env.local | cut -d= -f2)

# Set as ENCRYPTED (not sensitive) so the next app can copy from this one
for k in "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:$PK" "CLERK_SECRET_KEY:$SK"; do
  KEY="${k%%:*}"; VAL="${k#*:}"
  curl -s -X POST "https://api.vercel.com/v10/projects/$DST_PROJECT/env?teamId=$TEAM" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d "{\"key\":\"$KEY\",\"value\":\"$VAL\",\"type\":\"encrypted\",\"target\":[\"production\",\"preview\",\"development\"]}"
done
```

### 7d — Vercel Blob store (the one manual dashboard step)

There's no CLI command to create a Blob store. Brady has to click through
once per project:

1. Vercel dashboard → the new project → **Storage** tab
2. **Create** → Blob → name it `<project>-blob` → defaults are fine
3. **Connect Project** → select the project → leave all 3 envs checked,
   prefix `BLOB` → **Connect**

This auto-injects `BLOB_READ_WRITE_TOKEN` into the project. The
`@vercel/blob` SDK picks it up automatically.

### 7e — Wrap layout in ClerkProvider

```typescript
// app/layout.tsx
import { ClerkProvider, UserButton } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html><body>
        {/* nav with <UserButton /> */}
        {children}
      </body></html>
    </ClerkProvider>
  )
}
```

### 7f — Deploy + verify

```bash
cd <app-dir> && vercel deploy --prod --yes
# Sanity:
curl -sI https://<app>.vercel.app/  # expect 307 → Clerk hosted sign-in
curl -sI https://<app>.vercel.app/api/<some-route>  # expect 401 (correct: protected)
```

### 7g — Embed in mception.ai portal — TWO PATHS

**Path A: launcher card (default, always works).** *.vercel.app cannot
be a Clerk satellite (Clerk blocks shared subdomain hosts for security),
so iframe + auth doesn't work cleanly without a custom subdomain. Use
this pattern unless/until Brady sets up a subdomain:

```typescript
// portal/src/app/(portal)/<slug>/page.tsx
import { requireProjectAccess } from "@/lib/portal-access";
const APP_URL = "https://<app>.vercel.app";

export default async function <Slug>Page() {
  await requireProjectAccess("<slug>");
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5 text-center">
        <div className="text-6xl">🐢</div>
        <h1 className="text-2xl font-bold">App Name</h1>
        <p className="text-sm text-gray-400">Short description.</p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl">
          Launch →
        </a>
      </div>
    </div>
  );
}
```

**Path B: iframe with Clerk satellite domain (custom subdomain required).**
Requires a one-time DNS + Clerk setup so the portal session passes through:

1. **DNS** (Brady, manual): add CNAME `<slug>.mception.ai` →
   `cname.vercel-dns.com`
2. **Vercel domain**: add `<slug>.mception.ai` to the standalone project
   ```bash
   vercel domains add <slug>.mception.ai --project <project-name>
   ```
3. **Clerk satellite registration** (custom subdomain only — *.vercel.app
   is rejected with `provider_domain_operation_not_allowed`):
   ```bash
   curl -X POST "https://api.clerk.com/v1/domains" \
     -H "Authorization: Bearer $CLERK_SECRET_KEY" \
     -H "Content-Type: application/json" \
     -d '{"name":"<slug>.mception.ai","is_satellite":true}'
   ```
4. **Env vars** on the standalone project:
   ```
   NEXT_PUBLIC_CLERK_IS_SATELLITE=true
   NEXT_PUBLIC_CLERK_DOMAIN=<slug>.mception.ai
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=https://mception.ai/sign-in
   ```
5. **ClerkProvider** props in `app/layout.tsx`:
   ```tsx
   <ClerkProvider isSatellite domain="<slug>.mception.ai"
                  signInUrl="https://mception.ai/sign-in">
   ```
6. **Portal page** swaps from launcher back to `<ProjectFrame>`:
   ```tsx
   <ProjectFrame baseUrl="https://<slug>.mception.ai" path="/" title="..." />
   ```

---

## Quick reference — all mception-family env var names

Per-slug access allowlists (csv of emails, lowercase):
- `MCEPTION_ADMIN_EMAILS` — admin role for all projects
- `MCEPTION_ALL_PROJECTS_EMAILS` — access to all slugs (no admin)
- `MCEPTION_PLATFORM_OWNER_EMAIL` — owner override (defaults to brady)
- `MCEPTION_RESERVED_TEST_EMAIL` — excluded by design (defaults to bradysmallz)
- `MCEPTION_<SLUG_UPPER>_EMAILS` — per-slug allowlist

Current slugs (verified from projects.yml on 2026-04-22):
kroger, content-engine, innovation-lab, baden-bagley, mark-schmulen,
panda, ops-lab, grocery-assistant, 1915-south, (+ others)

Verify the canonical list: `grep '^\s*- slug:' portal/src/config/projects.yml`

---

## What NOT to do

- Don't set env vars on the legacy `munich` project. Use `mception-ai`.
- Don't bypass Clerk auth or modify `requireProjectAccess`. Change access
  via env vars.
- Don't commit `.env*` files. `.env.example` only.
- Don't promote a preview URL to production manually — merge a PR instead
  so the audit trail holds.
- Don't add projects to `projects.yml` without a page.tsx and either an
  iframe target OR `type: native` with built-out pages. Half-wired slugs
  cause the sidebar to render dead links.

---

## Known sharp edges (and how to recognize them)

| Symptom | Cause | Fix |
|---|---|---|
| `vercel ls` shows no deployments | Project not linked in cwd | `vercel link --yes --project mception-ai` |
| Env var set but app still 404s | Linked to wrong project (munich vs mception-ai) | `cat .vercel/project.json`, relink |
| Build fails on function size | New public/ assets tipped trace over 250 MB | Extend `outputFileTracingExcludes` |
| `gh pr merge --delete-branch` fails "already used by worktree" | Running inside Conductor worktree | Drop `--delete-branch` |
| New slug 404s even for Brady | `page.tsx` missing or `projects.yml` has typo in slug | Grep both files; verify match |
| Allowlist set but user blocked | Email not lowercase in csv | Re-set lowercased |
| Portal shows slug in sidebar but iframe blank | `portal/public/<slug>/viewer/index.html` not committed | `git ls-files portal/public/<slug>` |
| Clerk loop on a new slug | Middleware runs on `(portal)/` but page not using `requireProjectAccess` | Add the helper call |
| Standalone vercel.app POST returns 401 when signed in | `clerkMiddleware()` is permissive by default — auth context attached but not enforced | Use `clerkMiddleware(async (auth, req) => { await auth.protect() })` per Runbook 7b |
| Iframed standalone app shows `*.accounts.dev refused to connect` | Clerk's hosted sign-in blocks iframe embedding; satellite domain not configured | Use launcher card (Runbook 7g Path A) or set up custom subdomain + satellite (Path B). *.vercel.app cannot be a satellite. |
| `provider_domain_operation_not_allowed` from Clerk API when adding satellite | Clerk blocks shared subdomain hosts (*.vercel.app) | Custom subdomain only (e.g., `<slug>.mception.ai`) |
| Blob upload fails with no token | Forgot the dashboard step — there's no CLI to create a Blob store | Vercel dashboard → Storage → Create → Connect Project (Runbook 7d) |
