# App Playbook — Standalone Client Project Setup

How to spin up a new client-facing intelligence app and connect it to the mception.ai portal. Based on the STIHL Competitive Briefing build (March 2026).

---

## Architecture

```
mception.ai (portal)          Client App (standalone)
┌─────────────────────┐       ┌─────────────────────┐
│  Clerk auth         │       │  Next.js 16 + TW 4  │
│  Sidebar nav        │       │  App Router          │
│  ProjectFrame       │──────▶│  Static data layer   │
│  (iframe wrapper)   │       │  Component library   │
│                     │       │  No auth (portal     │
│  ENV: APP_URL ──────│───┐   │   handles it)        │
└─────────────────────┘   │   └─────────────────────┘
   munich repo            │      separate repo
   Vercel: munich         └──▶   Vercel: project-name
   Domain: mception.ai          Domain: auto-assigned
```

**Rule:** Each client project = its own repo, its own Vercel deploy. The portal just iframes it.

---

## Step 1: Scaffold the App

```bash
# From the Brady OS project folder
cd "1-execution/areas/work-and-business/programs/Consulting/Project - <Name>/"

npx create-next-app@latest app --typescript --tailwind --eslint --app --no-src-dir --no-import-alias
# When prompted: use App Router, no Turbopack, no customize import alias

cd app
```

Or copy from the STIHL template and modify:

### package.json

```json
{
  "name": "<project-slug>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 4100",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "^16.1.6",
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^16.1.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### .gitignore

```
node_modules/
.next/
out/
.vercel
.env*.local
.DS_Store
*.tsbuildinfo
next-env.d.ts
```

---

## Step 2: Set Up the Directory Structure

```
app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with AppShell
│   │   ├── page.tsx            # Redirect to default route
│   │   ├── globals.css         # Tailwind import + theme vars
│   │   ├── <route>/page.tsx    # One per section
│   │   └── ...
│   ├── components/
│   │   ├── AppShell.tsx        # Sidebar + iframe detection
│   │   └── <Project>UI.tsx     # Reusable component library
│   └── lib/
│       └── <project>-data.ts   # Static data layer
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Step 3: Core Files

### globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "<Project Name>",
  description: "<One line description>",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

### page.tsx (root redirect)

```tsx
import { redirect } from "next/navigation";
export default function Home() { redirect("/<default-route>"); }
```

### AppShell.tsx (iframe-aware layout)

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/<route1>", label: "<Label1>" },
  { href: "/<route2>", label: "<Label2>" },
  // ...
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    setEmbedded(window.self !== window.top);
  }, []);

  // When iframed by the portal, hide sidebar — portal provides nav
  if (embedded) {
    return <main className="h-screen w-full overflow-y-auto">{children}</main>;
  }

  return (
    <div className="flex h-screen">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="border-b border-gray-200 px-6 py-4">
          <span className="text-sm font-bold text-gray-900"><Project Name></span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm transition ${
                pathname === link.href
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
```

---

## Step 4: Component Library Pattern

Create a `<Project>UI.tsx` with reusable primitives. Start with these — they cover 90% of intelligence surfaces:

| Component | Purpose |
|-----------|---------|
| `PageHeader` | Title, eyebrow label, description, update timestamp |
| `Panel` | Section container with optional accent color |
| `MetricCard` | Label + big value + detail text |
| `Tag` | Small colored badge |
| `ListItem` | Kicker + title + optional body |
| `ActionLink` | Clickable card with arrow |

See `Project - Stihl Insights/app/src/components/StihlUI.tsx` for the reference implementation.

---

## Step 5: Data Layer Pattern

Create `<project>-data.ts` with:
- TypeScript interfaces for each data shape
- Named exports for each data group
- No API calls — static content, updated manually or by agents

```typescript
export interface SignalCard {
  label: string;
  value: string;
  detail: string;
}

export const projectMeta = {
  name: "<Project Name>",
  updatedAt: "March 23, 2026",
  summary: "<One sentence>",
};

export const keyMetrics: SignalCard[] = [
  { label: "...", value: "...", detail: "..." },
];
```

---

## Step 6: Create GitHub Repo and Deploy

```bash
# From the app/ directory
cd app
git init
git add .
git commit -m "Initial <project> app build"

# Create repo on GitHub
gh repo create <project-slug> --private --source=. --push

# Link to Vercel (interactive — select your team, accept defaults)
npx vercel link

# Deploy
npx vercel --prod
```

Note the production URL (e.g. `https://<project-slug>-xxx.vercel.app`).

---

## Step 7: Connect to the Portal

### Add iframe proxy pages in munich

For each route in the standalone app, create a thin proxy page in munich:

```
munich/src/app/(portal)/<project>/<route>/page.tsx
```

```tsx
import { ProjectFrame } from "@/components/portal/ProjectFrame";

const APP_URL = process.env.NEXT_PUBLIC_<PROJECT>_APP_URL ?? "http://localhost:4100";

export default function Page() {
  return <ProjectFrame baseUrl={APP_URL} path="/<route>" title="<Project> - <Route>" />;
}
```

### Add sidebar nav in munich

Edit `munich/src/components/portal/Sidebar.tsx`:

```typescript
const projectSubPages = [
  { href: "/<project>/<route1>", label: "<Label1>", short: "X" },
  { href: "/<project>/<route2>", label: "<Label2>", short: "Y" },
];
```

Add a collapsible group in the sidebar's "My Projects" section (copy the STIHL pattern).

### Set env var on munich Vercel project

```bash
echo "<production-url>" | npx vercel env add NEXT_PUBLIC_<PROJECT>_APP_URL production
```

### Redeploy munich

```bash
npx vercel --prod --force
```

---

## Step 8: Local Development

Run both apps simultaneously:

```bash
# Terminal 1: Standalone app
cd "Project - <Name>/app" && npm run dev  # runs on port 4100

# Terminal 2: Portal (optional — only if testing iframe)
cd munich && npm run dev  # runs on port 3000
```

The standalone app works on its own at `localhost:4100`. When iframed by the portal, AppShell auto-hides the sidebar.

---

## Checklist for New Projects

- [ ] Scaffold Next.js 16 + Tailwind 4 app in the project folder
- [ ] Create AppShell with iframe detection
- [ ] Create component library (`<Project>UI.tsx`)
- [ ] Create data layer (`<project>-data.ts`) with real content
- [ ] Set `dev` port to something unique (4100, 4200, etc.)
- [ ] Create GitHub repo, push, link to Vercel, deploy
- [ ] Add proxy pages in munich for each route
- [ ] Add sidebar nav entries in munich
- [ ] Set `NEXT_PUBLIC_<PROJECT>_APP_URL` env var on munich
- [ ] Redeploy munich
- [ ] Test: standalone app works alone
- [ ] Test: app works inside portal iframe
- [ ] Test: sidebar nav links work in portal

---

## Reference Implementation

- **STIHL app:** `1-execution/areas/work-and-business/programs/Consulting/Project - Stihl Insights/app/`
- **STIHL GitHub:** `github.com/basdkf024rhlasfd/stihl-insights`
- **STIHL Vercel:** project name `stihl-insights`
- **Portal proxy pages:** `munich/src/app/(portal)/stihl/`
- **Portal ProjectFrame:** `munich/src/components/portal/ProjectFrame.tsx`
