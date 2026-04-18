## mception.ai

Private client portal and workflow shell built with Next.js and Clerk.

## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` into `.env.local` and fill in your Clerk keys.

Important auth vars:

- `MCEPTION_PLATFORM_OWNER_EMAIL`: bootstrap full-access owner account
- `MCEPTION_RESERVED_TEST_EMAIL`: protected non-admin test account
- `MCEPTION_ADMIN_EMAILS`: optional comma-separated additional admin emails
- `MCEPTION_STIHL_EMAILS`: comma-separated emails allowed into the STIHL workspace
- `MCEPTION_ORLANDO_EMAILS`: comma-separated emails allowed into the Orlando workspace
- `MCEPTION_MOVING_EMAILS`: comma-separated emails allowed into the Moving workspace

## Auth and Permissions

The current repo is set up so:

- `brady.smallwood@gmail.com` is the built-in full-access owner
- `bradysmallz@gmail.com` stays a non-admin test account
- the portal requires sign-in before loading protected routes
- project routes enforce membership server-side, not just in the sidebar
- owner/admin accounts inherit access to every project workspace

The full auth and permission model lives in [docs/clerk-primer.md](docs/clerk-primer.md).

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`

## Notes

Protected pages live under `src/app/(portal)`.

The broader Notes / Tools / External surface still exists, but the sidebar only exposes it to the owner/admin accounts.
