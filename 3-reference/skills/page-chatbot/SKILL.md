# Page Chatbot

Enable an AI chat interface on any mception.ai portal page. Config-only operation — no code changes required for new projects.

## When This Applies

Trigger phrases: "add chat to [project]", "enable chatbot on [page]", "set up chat for [slug]", "page chatbot"

## How It Works

Each portal page can have an AI chatbot powered by a per-project chat config. The system has three layers:

1. **System prompt** — a markdown file that defines the chatbot's personality, knowledge, and behavior (`portal/src/lib/chat/project-prompts/{slug}.md`)
2. **Chat config** — a YAML file that wires the prompt to KB sources, model settings, and tools (`portal/src/config/chat-configs/{slug}.yml`)
3. **KB files** (optional) — markdown files the chatbot can reference based on keyword routing or full injection

The chat engine uses AI SDK v6 with streaming. The GlobalChatPanel component automatically picks up the right config based on which portal page the user is on.

---

## Pre-Flight Check

Before enabling chat on a project, confirm:

| Artifact | Location | Required? |
|---|---|---|
| Portal route exists | `portal/src/app/(portal)/{slug}/` | Yes |
| Project in sidebar | `portal/src/components/portal/Sidebar.tsx` | Yes |
| Project derives in context | `portal/src/contexts/WorkspaceContext.tsx` `deriveProject()` | Yes |
| Allowlist entry | `3-reference/publishing/mception-ai-projects.yml` | Yes |

If any are missing, create them first using the v0-to-portal or app-playbook workflows.

**Important:** The `deriveProject()` function in `WorkspaceContext.tsx` must map the pathname to a project ID for chat scoping to work. Add your slug there if it isn't already listed.

---

## Step 1: Write the System Prompt

Create `portal/src/lib/chat/project-prompts/{slug}.md`.

This file is pure markdown that becomes the model's system prompt. Guidelines:

- **Lead with identity**: "You are a [role] embedded in the mception.ai portal."
- **Define scope**: What topics the assistant covers, what it doesn't
- **Set tone**: Be direct, practical, lead with answers
- **Add knowledge context**: Describe what data/KB the assistant has access to
- **Include guardrails**: What to say when asked about topics outside scope

See `templates/system-prompt-template.md` for a starter.

**Existing examples:**
- `orlando.md` — Full real estate expert with extensive KB context description
- `stihl.md` — Product specialist with specific model line knowledge
- `mark-schmulen.md` — Strategic assistant for a specific client
- `portal.md` — Generic fallback for unscoped pages

---

## Step 2: Create Chat Config

Create `portal/src/config/chat-configs/{slug}.yml`.

Minimal config (prompt only, no KB):

```yaml
enabled: true
prompt: {slug}.md
```

Full config with KB:

```yaml
enabled: true
prompt: {slug}.md
model: claude-sonnet-4-5
maxOutputTokens: 1024
welcomeMessage: "Ask me anything about [topic]."
operatorMode: true
configAware: true

kb:
  enabled: true
  directory: public/{slug}/kb
  maxFiles: 4
  routing: keyword
  routes:
    - keywords: [keyword1, keyword2, phrase with spaces]
      files: [01-section.md, 02-section.md]
    - keywords: [other, terms]
      files: [03-other.md]
```

See `templates/chat-config-template.yml` for the full schema with comments.

---

## Step 3: Add Knowledge Base (Optional)

If the chatbot needs to reference project-specific content:

1. Create a KB directory: `portal/public/{slug}/kb/`
2. Write markdown files — one topic per file, numbered for sort order
3. Add `kb` section to the chat config with routing rules

**Two routing modes:**
- `keyword` — Match user messages against keyword lists, inject only relevant files. Best for large KBs (10+ files).
- `all` — Inject all files up to `maxFiles` limit. Best for small KBs (1-4 files).

**Keyword routing tips:**
- Include variations: "cost", "afford", "how much", "price"
- Include proper nouns and jargon specific to the domain
- Each route can point to multiple files
- If nothing matches, the first 3 routes' files are used as fallback

---

## Step 4: Wire Project Routing

Add the project to `deriveProject()` in `portal/src/contexts/WorkspaceContext.tsx`:

```typescript
if (pathname.startsWith("/{slug}")) return "{slug}";
```

This ensures the chat panel scopes to the right project config when the user navigates to that page.

---

## Step 5: Test

Verification checklist:

- [ ] Navigate to the project page in the portal
- [ ] Chat panel header shows the correct project label
- [ ] Send a message — response streams back token-by-token
- [ ] If KB is configured, ask a domain-specific question and verify relevant KB content is injected
- [ ] If operator mode is enabled, toggle to Operator and verify cross-project context loads
- [ ] Build passes: `cd portal && npx next build`

---

## Config Reference

| Field | Type | Default | Description |
|---|---|---|---|
| `enabled` | boolean | `false` | Enable chat for this project |
| `prompt` | string | `"portal.md"` | Filename in `project-prompts/` |
| `model` | string | `"claude-sonnet-4-5"` | Anthropic model ID |
| `maxOutputTokens` | number | `1024` | Max response length |
| `streaming` | boolean | `true` | Stream responses (always true in current impl) |
| `welcomeMessage` | string | Generic welcome | Shown when chat opens with no messages |
| `operatorMode` | boolean | `false` | Allow admin operator mode toggle |
| `configAware` | boolean | `false` | Inject user's config state into prompt |
| `kb.enabled` | boolean | `false` | Enable KB injection |
| `kb.directory` | string | — | Path to KB markdown files (relative to portal root) |
| `kb.maxFiles` | number | `4` | Max KB files to inject per message |
| `kb.routing` | `"keyword"` / `"all"` | `"keyword"` | How to select which KB files to inject |
| `kb.routes` | array | — | Keyword-to-file routing rules |
| `tools` | array | — | Tool definitions (future — not yet wired) |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Chat shows generic welcome, not project-specific | `deriveProject()` doesn't map the pathname | Add mapping in `WorkspaceContext.tsx` |
| "portal" shows in chat header instead of project name | Missing project label | Add to `getProjectLabel()` in `project-registry.ts` |
| Chat sends but no response streams | Missing `ANTHROPIC_API_KEY` env var | Set in `.env.local` and Vercel dashboard |
| KB content not injecting | Config missing `kb.enabled: true` or wrong `directory` path | Check config YAML and verify KB files exist at path |
| Keyword routing not matching | Keywords too specific | Add more keyword variations, check lowercase matching |
| Operator mode button missing | `operatorMode: false` or user isn't admin | Set `operatorMode: true` in config, check admin email |

---

## Examples

### Orlando (Full KB + Keyword Routing)
- Config: `portal/src/config/chat-configs/orlando.yml`
- Prompt: `portal/src/lib/chat/project-prompts/orlando.md`
- KB: `portal/public/orlando/kb/` (23 markdown files)
- 16 keyword routes covering neighborhoods, costs, buying, investment, etc.

### STIHL (Prompt Only, No KB)
- Config: `portal/src/config/chat-configs/stihl.yml`
- Prompt: `portal/src/lib/chat/project-prompts/stihl.md`
- No KB — model knowledge is sufficient for product guidance

### Portal Default (Fallback)
- Config: `portal/src/config/chat-configs/portal.yml`
- Prompt: `portal/src/lib/chat/project-prompts/portal.md`
- Generic assistant for pages without project-specific config

---

## Architecture

```
portal/
  src/
    config/chat-configs/          # Per-project YAML configs
      orlando.yml
      stihl.yml
      portal.yml
    lib/chat/
      chat-config.ts              # Types + YAML loader
      global-chat-engine.ts       # System prompt builder
      kb-loader.ts                # Config-driven KB file loader
      project-prompts/            # System prompt markdown files
        orlando.md
        stihl.md
        portal.md
        operator.md
      viewer-bridge.ts            # PostMessage bridge (unchanged)
    app/api/chat/route.ts         # AI SDK streamText endpoint
    components/portal/
      GlobalChatPanel.tsx          # useChat-powered chat UI
    contexts/
      WorkspaceContext.tsx          # Project scoping + panel state
```

Flow: User sends message -> `useChat` sends to `/api/chat` -> route loads chat config -> builds system prompt (+ KB if configured) -> `streamText` with Anthropic -> streams back to UI.
