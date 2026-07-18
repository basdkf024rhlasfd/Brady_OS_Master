# Local Records Pointer

Sensitive family/kid records (ATLAS scores, report cards, medical, etc.) are stored **outside this repo** for two reasons:
1. They must never be pushed to GitHub.
2. They must persist across Conductor worktrees — anything saved inside `/Users/bs/conductor/workspaces/...` is at risk when worktrees are cleaned.

## Where to find them

```
~/brady-os-local/family/kids/<kid-slug>/records/
```

Kid slugs: `lily-kay`, `faith-riley`, `isla-kate`, `luke-brady`, `quinn-elaine`.

Categories under each kid: `atlas/`, `report-cards/`, `medical/` (add more as needed).

## Filing convention

- Originals saved untouched: `YYYY-MM-DD-<descriptor>-<kid>.<ext>`
- Agent-generated summary as sibling: `YYYY-MM-DD-<descriptor>-<kid>.md`
- Append a row to `~/brady-os-local/family/kids/<kid-slug>/records/index.md` for every file added.

## Rules for agents

- **Never** copy contents of `~/brady-os-local/` into this repo.
- **Never** save kid records inside the workspace, even gitignored.
- When asked to file an uploaded record, write directly to the absolute path above.
