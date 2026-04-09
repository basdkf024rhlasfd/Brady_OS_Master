# Claude Instructions to Paste

Canonical source files for every Claude instruction surface that requires manual paste or copy.

**Why this exists:** Claude Code auto-loads `CLAUDE.md` files, but other Claude surfaces (CoWork, Claude Projects, ChatGPT projects) require manual paste. This folder is the single source of truth — edit here, then paste into the target surface.

## Surfaces

| File | Where to Paste | How to Get There |
|------|----------------|------------------|
| `global-claude-code.md` | `~/.claude/CLAUDE.md` | Run `./install.sh` or copy manually |
| `cowork-global.md` | Claude Desktop → Settings → Cowork → Global Instructions → Edit | Manual paste |
| `claude-chat-projects.md` | Claude.ai → any Project → Instructions | Manual paste per project (base template) |
| `innovation-lab-project.md` | Claude.ai → "Innovation Lab" Project → Instructions | Manual paste + upload 9 skill files as Project Knowledge |

## Keeping These Fresh

The weekly sweep skill checks whether these files have drifted from the live surfaces. When you update a file here:
1. Edit the file in this folder (source of truth)
2. Paste into the target surface
3. If it's `global-claude-code.md`, run `./install.sh` instead of pasting

## Install Script

`install.sh` copies `global-claude-code.md` to `~/.claude/CLAUDE.md` automatically. Run it after any edits:
```bash
cd 3-reference/claude-instructions-to-paste && ./install.sh
```
