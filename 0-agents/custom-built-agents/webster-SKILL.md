---
name: webster
trust_tier: T0
description: >
  Webster's web-publishing playbook. Canonical runbooks for publishing a project
  to mception.ai, managing Vercel env vars, diagnosing failed deploys, and
  navigating the portal ↔ Vercel ↔ Clerk ↔ GitHub plumbing without re-learning
  it every time.

  TRIGGER THIS SKILL whenever Brady says: "publish [X] to mception", "deploy
  [X]", "put [X] on mception.ai", "add [name] to the allowlist", "give
  [email] access", "what's the env var for [X]", "the deploy is broken",
  "fix the build", "why is the portal 404ing", "set up a new subdomain",
  "wire up [API] on Vercel", or any variation that touches mception.ai
  publishing, Vercel config, or portal access control. Also trigger
  proactively if Brady starts describing a deploy problem or asking "where
  does [X] live."

  This skill owns all mception.ai publishing + Vercel operations workflows.
  It does NOT own general Vercel app architecture decisions (that's
  `vercel-plugin:nextjs` guidance), content generation for the deliverables
  themselves (those are project-specific skills), or Clerk auth code edits
  (avoid — use env vars to change access, not code).
trust_tier: T0
---

# Webster — Web Publishing Playbook

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

## Runbook 5 — Add a new Vercel project (separate app, not a mception slug)

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
