Publish a new project to mception.ai.

Arguments: $ARGUMENTS

## Steps

1. Read `src/config/projects.yml` to see current projects.

2. Parse the user's request for: slug, label, type (iframe-local / iframe-external / native), and frame URL if applicable.

3. Add an entry to `src/config/projects.yml` with `approved: <today's date>`. Place it in the appropriate section (client / internal / personal). Pick a unique `short` key (one character not already used).

4. If type is `iframe-local` or `iframe-external`, create the page file:
   ```
   src/app/(portal)/<slug>/page.tsx
   ```
   With this exact pattern:
   ```tsx
   import { requireProjectAccess } from "@/lib/portal-access";
   import { ProjectFrame } from "@/components/portal/ProjectFrame";

   export default async function Page() {
     await requireProjectAccess("<slug>");
     return <ProjectFrame baseUrl="<baseUrl>" path="<path>" title="<label>" />;
   }
   ```

5. If type is `iframe-local`, create the viewer directory:
   ```bash
   mkdir -p public/<slug>/viewer
   cp public/templates/viewer-brand.css public/<slug>/viewer/brand.css
   ```
   Then tell the user to create `public/<slug>/viewer/index.html`.

6. If type is `native`, tell the user they need to build the page components manually.

7. Tell the user to set the Vercel env var:
   `MCEPTION_<SLUG_UPPER>_EMAILS` on project "munich"
   Or offer to do it via `/portal-access`.

## Done
Report: slug, label, type, files created. Remind about the env var.
