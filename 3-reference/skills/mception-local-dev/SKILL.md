# mception Local Dev

**Trigger:** "spin up mception locally", "local dev server", "iterate on mception UI", "run the portal locally"

**Purpose:** Get the mception.ai portal running on localhost for rapid UI iteration — no Clerk sign-in, no Vercel env dance, no auth friction.

---

## What This Skill Does

Sets up `portal/` to run at `http://localhost:3000/portal` with auth fully bypassed. You're loaded as the platform owner with full admin access. HMR via Turbopack reflects changes instantly.

---

## Steps

### 1. Check if already running

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/portal
```

If you get `200`, it's already up — skip to "Navigate."

### 2. Check prerequisites

```bash
cd portal
ls node_modules/.package-lock.json 2>/dev/null && echo "DEPS OK" || echo "NEEDS INSTALL"
ls .env.local 2>/dev/null && echo "ENV OK" || echo "NEEDS ENV"
```

### 3. Install dependencies (if needed)

```bash
cd portal && npm install
```

### 4. Create `.env.local` (if needed)

Write this exact file — do NOT use `vercel env pull` (it doesn't have the Clerk keys):

```
# Dev bypass — skip Clerk auth on localhost
MCEPTION_DEV_BYPASS=true

# Clerk Auth (dev instance — works on localhost)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dXB3YXJkLXRocnVzaC04OS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=<get sk_test_… from the Clerk dashboard → API keys; never commit the real value>  # SPEC-008: rotate the previously-committed dev key in Clerk
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/portal
CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/portal
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/portal
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/portal

# Platform
MCEPTION_PLATFORM_OWNER_EMAIL=brady.smallwood@gmail.com
MCEPTION_RESERVED_TEST_EMAIL=bradysmallz@gmail.com
MCEPTION_ADMIN_EMAILS=
MCEPTION_STIHL_EMAILS=
MCEPTION_ORLANDO_EMAILS=
MCEPTION_MOVING_EMAILS=
NEXT_PUBLIC_STIHL_APP_URL=http://localhost:4100
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAGIC_LINK_SECRET=
```

### 5. Start the dev server

```bash
cd portal && npm run dev
```

Run in background. Server is ready when you see `Ready in XXXms`.

### 6. Navigate

Open `http://localhost:3000/portal` — NOT `/sign-in`. Auth is bypassed, you land directly in the portal as owner.

---

## Known Traps (Do NOT Repeat)

| Trap | Why it fails | What to do instead |
|---|---|---|
| `vercel env pull` | Clerk keys are injected by Marketplace integration at deploy time — they are NOT stored as Vercel env vars | Use the `.env.local` template above |
| `pk_live_` / `sk_live_` keys | Production keys are domain-locked to `mception.ai` — they reject `localhost` | Use `pk_test_` / `sk_test_` dev keys |
| Signing in on dev instance | Dev Clerk has a separate user directory — Brady's account doesn't exist there | Use `MCEPTION_DEV_BYPASS=true` to skip auth entirely |
| Going to `/sign-in` | Even with dev keys, requires creating a separate dev account | Go to `/portal` directly with bypass enabled |

## How the Bypass Works

Two files were modified to support `MCEPTION_DEV_BYPASS=true`:

- **`src/proxy.ts`** — When bypass is on, middleware returns `NextResponse.next()` instead of running `clerkMiddleware`. No auth check on any route.
- **`src/lib/portal-access.ts`** — When bypass is on, `getPortalAccess()` returns a synthetic owner user with full admin + all projects, instead of calling `auth.protect()` / `currentUser()`.

The bypass only activates when BOTH conditions are true:
1. `NODE_ENV === "development"`
2. `MCEPTION_DEV_BYPASS === "true"`

It has zero effect in production.

## Cleanup

The dev bypass code is committed to the repo but is inert unless both env conditions are met. No cleanup needed before deploying.
