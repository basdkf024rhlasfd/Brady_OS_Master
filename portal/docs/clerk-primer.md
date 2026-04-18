# Clerk Primer

This repo uses Clerk as the identity layer for a private, invite-only client portal.

## Current Rules

- Protected app routes live under `src/app/(portal)` and call `auth.protect()`.
- `brady.smallwood@gmail.com` is the built-in platform owner and always gets full portal visibility.
- `bradysmallz@gmail.com` is reserved as a non-admin test account and is explicitly filtered out of the admin allowlist.
- Extra admin users can be added through `MCEPTION_ADMIN_EMAILS`, but only when they are not the reserved test account.
- Project membership currently comes from environment-driven allowlists:
  `MCEPTION_STIHL_EMAILS`, `MCEPTION_ORLANDO_EMAILS`, and `MCEPTION_MOVING_EMAILS`.
- Owner/admin users automatically inherit access to all project workspaces.

The access helper for this lives in `src/lib/access.ts`.

## Required Clerk Setup

To keep the deployment invite-only:

1. Create a Clerk application for the environment.
2. Enable the sign-in methods you want to support.
3. Disable self-service sign-up in the Clerk dashboard.
4. Invite users manually from Clerk or through the Clerk invitations API.
5. Put the environment keys in `.env.local`.
6. Set `MCEPTION_PLATFORM_OWNER_EMAIL=brady.smallwood@gmail.com`.
7. Set `MCEPTION_RESERVED_TEST_EMAIL=bradysmallz@gmail.com`.

The app already redirects the `/sign-up` route back to `/sign-in`, but the real control point is Clerk's dashboard setting. That is what makes the portal genuinely invite-only.

## Why The Access Model Should Not Be "Layer 0,1,2,3"

For mception, a simple numeric layer system will become brittle once the app starts fronting multiple workflows, agents, and client workspaces.

Use three dimensions instead:

1. Global role
   Values: `owner`, `admin`, `member`, `client`, `test`
   Purpose: broad platform authority
2. Project membership
   Values per project: `viewer`, `editor`, `operator`, `client`
   Purpose: who can open a given client workspace
3. Workflow scopes
   Examples: `notion.read`, `notion.write`, `claude.run`, `shell.exec`, `deploy.trigger`
   Purpose: what backend actions the UI can trigger on a user's behalf

That model maps better to what you described:

- "project by project" is handled by project membership
- "who can see everything" is handled by the global role
- "who can touch the OS / agents / workflows" is handled by workflow scopes

## Recommended Next Step For mception

Treat mception as the control plane and keep permissions explicit:

- Owner
  Full platform visibility and policy control
- Admin
  Internal operator with broad access, but still scoped by assigned projects if needed
- Client
  Can only see invited workspaces and approved artifacts
- Test
  Safe non-admin account for verifying the user experience

Then add project records such as:

- `stihl`
- `internal-ops`
- `client-x`

And attach memberships plus workflow scopes to each user.

## Suggested Data Shape

Clerk metadata is a reasonable place to start:

```json
{
  "role": "client",
  "projects": {
    "stihl": "viewer",
    "internal-ops": "none"
  },
  "scopes": ["artifacts.read", "requests.write"]
}
```

As mception becomes a wrapper for backend workflows, move the project and scope matrix into your own database, and keep Clerk as the identity source plus top-level role bootstrap.

## Replication Checklist

- Add Clerk keys to the target environment
- Disable public sign-up in Clerk
- Set owner/test/admin env vars
- Invite users instead of allowing self-registration
- Keep all protected workspace routes under `(portal)`
- Add per-project membership checks before exposing future OS, agent, Notion, or deploy actions
