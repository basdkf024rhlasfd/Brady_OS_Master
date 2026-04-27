# Claude Skill Libraries — Provenance

Four community + official Claude skill libraries cloned for selective absorption into Brady OS. Treated as standalone packages per `imported-skills-and-systems/` governance: do not modify in place, mine for patterns, promote selectively into core OS.

## Packages

| Folder | Source | License | Imported | Notes |
|--------|--------|---------|----------|-------|
| `anthropics-skills/` | github.com/anthropics/skills | Apache 2.0 (per LICENSE in repo) | 2026-04-27 | Official Anthropic skill library. 17 skills under `skills/`. Highest signal-to-noise. |
| `awesome-claude-code/` | github.com/hesreallyhim/awesome-claude-code | MIT | 2026-04-27 | Curated list (CSV + tools), not a skills package. Reference only. |
| `travisvn-awesome-claude-skills/` | github.com/travisvn/awesome-claude-skills | MIT | 2026-04-27 | README-only list. Low value, kept for completeness. |
| `composio-awesome-claude-skills/` | github.com/ComposioHQ/awesome-claude-skills | MIT | 2026-04-27 | ~30 community skills, business/integration heavy. Mixed quality; see absorption shortlist. |

## How Imported

```bash
git clone --depth 1 <repo-url> <folder>
rm -rf <folder>/.git
```

`.git` directories were removed so these don't become git submodules of brady-os. Each remains the original upstream content as of 2026-04-27. Re-import quarterly per `imported-skills-and-systems/README.md` governance.

## Absorption Shortlist

See `ABSORPTION-SHORTLIST.md` in this directory for the verdict on each candidate skill (absorb / mine pattern / skip).
