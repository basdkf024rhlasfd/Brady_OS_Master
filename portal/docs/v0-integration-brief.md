# v0 Integration Brief for mception.ai

Use this document as the standing reference when generating new `v0` builds for `mception.ai`.

The goal is not to let `v0` redesign the whole product. The goal is to generate standalone pages, tools, and microsurfaces that plug cleanly into the existing `mception.ai` shell with minimal cleanup.

## Project Summary

`mception.ai` is a private client portal and workflow shell built in Next.js with Clerk authentication.

Current stack:

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript
- Clerk for auth

This repo is intentionally lightweight. It is currently more of a polished portal shell and workspace framework than a heavy full-stack SaaS app.

Important characteristics:

- Protected portal experience behind Clerk auth
- Shared shell with a persistent left sidebar
- Main content area fills the rest of the screen
- Some surfaces are native Next.js pages inside this repo
- Some surfaces are standalone apps embedded through an iframe or local proxy
- Current product bias is static-first, trust-oriented, and client-presentable

Relevant source files:

- [package.json](/Users/bs/conductor/workspaces/mception-ai/cody/package.json)
- [src/app/(portal)/layout.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/app/(portal)/layout.tsx)
- [src/components/portal/AppShell.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/portal/AppShell.tsx)
- [src/components/portal/Sidebar.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/portal/Sidebar.tsx)
- [src/components/portal/IframeHost.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/portal/IframeHost.tsx)
- [src/lib/app-registry.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/lib/app-registry.ts)
- [src/lib/access.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/lib/access.ts)
- [src/proxy.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/proxy.ts)
- [src/components/stihl/StihlUI.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/stihl/StihlUI.tsx)

## What v0 Is Allowed To Own

`v0` should usually own one of these:

1. A native content page or workflow page that will live inside the existing portal.
2. A standalone app surface that will be embedded inside the portal via iframe or proxy.
3. A reusable content section, card system, dashboard body, intake flow, or artifact browser.

`v0` should not attempt to own:

- Global auth
- Global sidebar/navigation
- Portal layout shell
- User identity handling
- Role logic
- Route protection
- The top-level brand architecture of `mception.ai`

## Non-Negotiable Platform Rules

Every `v0` output must follow these rules unless explicitly told otherwise.

### 1. Do not recreate the shell

The existing app shell already provides:

- left sidebar
- protected routes
- account/user menu
- portal-level navigation

Do not generate:

- another app-wide sidebar
- a second global header
- a sign-in page
- a sign-up flow
- a separate account menu
- a duplicate home/dashboard shell

When building native pages, assume the page will render inside the main content area of the portal shell.

### 2. Do not add new auth

Auth is already handled by Clerk in the parent app.

Do not generate:

- custom auth logic
- NextAuth
- Supabase auth
- Firebase auth
- local session systems
- user tables unless explicitly requested

### 3. Match the visual language

The existing product language is:

- dark, editorial, executive-facing
- high-contrast but restrained
- orange used as the primary accent
- zinc / charcoal / near-black foundations
- rounded panels and cards
- clean hierarchy, not playful SaaS chrome

Good visual references in this repo:

- [src/app/(portal)/portal/page.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/app/(portal)/portal/page.tsx)
- [src/app/(portal)/stihl/today/page.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/app/(portal)/stihl/today/page.tsx)
- [src/components/stihl/StihlUI.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/stihl/StihlUI.tsx)

Avoid:

- generic white SaaS layouts
- purple gradients
- consumer-social styling
- toy-looking AI chat aesthetics
- excessive micro-animations
- cluttered KPI walls with no narrative structure

### 4. Respect embedding constraints

If the output is meant to be embedded, it must behave well inside an iframe.

That means:

- no dependency on owning the full browser chrome
- no fixed global nav
- no full-screen modal assumptions that escape the frame
- no auth redirects
- responsive layout at desktop and tablet widths
- clean internal scrolling
- no browser back-button dependence for core flow

### 5. Default to static/mock data unless told to wire live data

Most current surfaces are static-first or mock-data-first.

Unless explicitly requested, `v0` should:

- use realistic mock data
- structure components cleanly for later data wiring
- avoid inventing backend complexity
- avoid requiring a database just to render the first version

## Supported Integration Modes

There are two preferred ways for `v0` output to land in `mception.ai`.

## Mode A: Native Portal Route

Use this when the page should live directly inside the Next.js app.

Examples:

- client briefing page
- artifact library
- executive dashboard
- structured request intake page
- knowledge page

Requirements:

- build as a normal Next.js App Router page or a clean React component
- assume it renders inside the portal shell
- keep layout self-contained to the content area only
- do not include global nav/auth
- use Tailwind classes compatible with this repo

Preferred location pattern:

- `src/app/(portal)/<section>/page.tsx`
- optional supporting components under `src/components/...`
- optional mock content in `src/lib/...`

## Mode B: Standalone Embedded App

Use this when the tool is better treated as an independent app surface.

Examples:

- calculator
- structured estimator
- visual configurator
- mini workflow tool
- sandboxed prototype

Requirements:

- build as a standalone app or page that can run independently
- make it responsive inside an iframe-sized container
- keep its own local header/subnav only if needed for that tool
- do not implement separate auth
- avoid cross-origin assumptions unless explicitly planned

Current embedded patterns:

- static file embedded with `IframeHost`
- local dev app proxied by port and linked through `app-registry`

Examples:

- [src/app/(portal)/notes/quick/page.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/app/(portal)/notes/quick/page.tsx)
- [src/app/(portal)/calculators/moving/page.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/app/(portal)/calculators/moving/page.tsx)

## Navigation and Routing Contract

If the new feature is a native portal page:

- it should receive a route under the protected `(portal)` group
- it should feel like a section of `mception.ai`, not a separate product

If the new feature is an embedded tool:

- it still needs a parent route inside `mception.ai`
- it may need an entry added in [src/lib/app-registry.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/lib/app-registry.ts)
- the route page may simply render an `IframeHost`

Do not assume `v0` should generate the registry wiring unless asked. It should generate the app/page itself cleanly enough that the wiring is easy.

## Access and Permissions Contract

Portal access is managed centrally. Admin visibility is determined in:

- [src/lib/access.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/lib/access.ts)

Sidebar visibility is controlled in:

- [src/components/portal/Sidebar.tsx](/Users/bs/conductor/workspaces/mception-ai/cody/src/components/portal/Sidebar.tsx)

Route protection is handled in:

- [src/proxy.ts](/Users/bs/conductor/workspaces/mception-ai/cody/src/proxy.ts)

Implications for `v0`:

- do not build role systems unless requested
- do not hardcode user gating into feature UI unless specified
- do not assume public access
- if a feature has admin-only controls, keep the UI easy to conditionally hide

## Content and Product Posture

The current product posture is:

- private
- trust-sensitive
- concise
- operator-friendly
- executive-readable
- more “briefing workspace” than “AI playground”

That means generated experiences should prefer:

- clear headings
- curated summaries
- action-oriented sections
- restrained use of metrics
- layouts that support decision-making

Avoid defaulting to:

- open-ended chat UI
- “ask anything” AI framing
- flashy assistant widgets
- noisy dashboard patterns with weak narrative structure

## UI Guidance for v0

Use these defaults unless the specific brief says otherwise.

- Backgrounds: near-black, zinc, charcoal, subtle gradients
- Accent: orange first, blue or green only as secondary states
- Cards: rounded, high polish, low clutter
- Type: sharp, editorial, executive-friendly
- Motion: subtle only
- Density: medium; avoid giant empty hero sections
- Mobile: should still work, but desktop presentation quality matters most

For native pages, page sections should usually follow a pattern like:

1. Strong page header
2. One or two primary decision blocks
3. Supporting cards, lists, or artifacts
4. Clean actions or navigation onward

## Code Guidance for v0 Output

Unless explicitly requested otherwise:

- use TypeScript
- use React function components
- use Tailwind utility classes
- keep components reasonably decomposed
- avoid unnecessary state
- avoid placeholder libraries that are not already needed
- avoid adding backend code when static data is enough

For native builds, prefer:

- one page file
- one or more local reusable UI components if needed
- one mock data file if the content is long

For embedded builds, prefer:

- a self-contained app that can be served cleanly
- minimal external dependencies
- no assumptions about global CSS from the parent shell

## Handoff Requirements

Every `v0` output should be easy to hand off into this repo.

An acceptable handoff should include:

- what the feature is
- whether it is a native page or embedded app
- expected route
- whether mock data is used
- any required assets or dependencies
- any assumptions about container width/height

If generating code for direct repo use, the output should be organized so it can be dropped into the current Next.js structure with minimal cleanup.

## Acceptance Checklist

Before accepting a `v0` output, verify:

- it does not recreate auth
- it does not recreate the global sidebar or shell
- it matches the dark/orange `mception.ai` visual language
- it works as a content-area page or clean embedded surface
- it is static/mock-data-first unless live wiring was requested
- it feels like a serious client workspace, not a generic AI app demo
- it can be mapped to a route inside the current repo

## Copy-Paste Prompt Template for Future v0 Builds

Use this as the baseline prompt, then append the specific feature brief below it.

```text
You are designing a feature for an existing product called mception.ai.

mception.ai is a private client portal and workflow shell built with Next.js, React, Tailwind, TypeScript, and Clerk auth. Your job is to create a page or standalone app surface that plugs into the existing shell cleanly. Do not redesign the entire product.

Non-negotiable rules:
- Do not create auth, sign-in, sign-up, or account systems.
- Do not create a global sidebar, top-level app shell, or duplicate dashboard layout.
- Assume the parent product already provides protected routing and persistent navigation.
- Match a dark, executive-facing visual style with near-black/zinc backgrounds and orange as the main accent.
- Keep the result polished, restrained, and client-presentable.
- Default to static/mock data unless live data wiring is explicitly requested.
- Avoid generic AI chat-app aesthetics.

You must build in one of these modes:
1. Native portal page: a page that will live inside the existing Next.js app's main content area.
2. Embedded standalone app: an independent app/tool that will be shown inside the parent portal, often in an iframe or proxied local app.

For native portal pages:
- Build a self-contained content-area experience only.
- No global nav or auth.
- Use Tailwind and TypeScript.

For embedded apps:
- Make the layout iframe-friendly.
- No global auth or browser-chrome assumptions.
- Keep scrolling and responsiveness clean.

The output should feel like part of a serious private client workspace, not a generic startup SaaS template.

At the end, clearly label:
- mode: native portal page or embedded standalone app
- intended route
- mock/live data assumptions
- any dependencies or integration notes
```

## Feature Brief Template

Append this after the base prompt when requesting a specific build:

```text
Feature name:

Mode:
- native portal page
- embedded standalone app

Purpose:

Primary user:

What this feature must help them do:

Required sections:

Important content or data points:

Actions/CTAs:

What to avoid:

Visual notes:

Integration notes:
- expected route:
- should this appear in sidebar or app registry:
- static/mock data or live wiring:
```
