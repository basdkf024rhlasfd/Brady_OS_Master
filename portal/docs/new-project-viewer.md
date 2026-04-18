# Adding a New Project Viewer

The portal shell is light-themed. All embedded project viewers use a dark theme.

## 1. Copy the dark theme template

```bash
mkdir -p public/{project-id}/viewer
cp public/templates/viewer-brand.css public/{project-id}/viewer/brand.css
```

Customize `--accent-primary` and `--accent-secondary` in `brand.css` to match your project's brand. Keep all other tokens consistent across viewers.

## 2. Create the viewer HTML

Create `public/{project-id}/viewer/index.html` referencing your `brand.css`:

```html
<link rel="stylesheet" href="brand.css" />
```

See `public/orlando/viewer/index.html` for a full example.

## 3. Register the project

1. Add the project ID to `ALL_PROJECTS` in `src/lib/access.ts`
2. Add the email env var to `PROJECT_EMAIL_ENV` in the same file
3. Add a label in `src/lib/project-registry.ts`
4. Set `MCEPTION_{PROJECT_ID}_EMAILS` in `.env.local`

## 4. Create the portal page

Create `src/app/(portal)/{project-id}/page.tsx`:

```tsx
import { requireProjectAccess } from "@/lib/portal-access";
import { ProjectFrame } from "@/components/portal/ProjectFrame";

export default async function Page() {
  await requireProjectAccess("{project-id}");
  return <ProjectFrame baseUrl="" path="/{project-id}/viewer/index.html" title="Project Name" />;
}
```

## 5. PostMessage bridge (optional)

If your viewer needs to communicate with the portal, implement the message protocol:

```js
// Listen for portal actions
window.addEventListener("message", (event) => {
  if (event.data?.source !== "mception-portal") return;
  const { type, requestId, payload } = event.data;
  // Handle: "navigate", "save_item", "get_state"
  window.parent.postMessage(
    { source: "mception-viewer", type: "action_response", requestId, payload: {} },
    "*"
  );
});

// Signal ready
window.parent.postMessage({ source: "mception-viewer", type: "ready", payload: {} }, "*");
```
