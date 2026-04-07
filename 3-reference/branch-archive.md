# Branch Archive

Unmerged branches archived here before deletion. SOP: branches sit 30 days before remote refs are deleted. Content is preserved in this log.

---

## Archive — 2026-04-07

**Delete after: 2026-05-07**

| # | Branch | Last Commit | Commits | Summary |
|---|--------|-------------|---------|---------|
| 1 | `OS-overall` | 2026-03-19 | 1 | Redesign activation agent with Express/Standard modes, add content engine project and automation rollout |
| 2 | `add-gsd-consulting-project` | 2026-03-27 | 1 | Add IVFH HR Strategy Agent consulting project scaffold (4 files, 863 lines) |
| 3 | `brady-os-nav` | 2026-03-27 | 1 | Add os-viewer standalone app (1 file, 851 lines) |
| 4 | `cmo-agent-scaffold` | 2026-03-27 | 1 | Add CMO agent scaffold, SOW, and updated viewer nav (17 files) |
| 5 | `consulting-project-steps` | 2026-03-27 | 1 | Add PauletteAI consulting project, relocate DiCaprio agent, add Project Creator skill (17 files) |
| 6 | `dicaprio-agent` | 2026-03-27 | 2 | Add Mark Schmulen SOW and DiCaprio agent scaffold (11 files) |
| 7 | `linking-impact-analysis` | 2026-03-26 | 1 | Remove save snippet from Schmulen viewer, add ATC skill (4 files) |
| 8 | `pauletteai-viewer` | 2026-03-30 | 1 | Add PauletteAI viewer with embedded Google Drive folders (1 file) |
| 9 | `recap-recent-changes` | 2026-04-03 | 1 | Add platform architecture table and Notion governance link to README |
| 10 | `schmulen-cmo-agent-build` | 2026-03-30 | 1 | Fix remaining Contour references in CMO agent demand-gen skill |
| 11 | `schmulen-discussion` | 2026-03-30 | 1 | Add Drive manifest for PauletteAI viewer (3/11 folders synced) |
| 12 | `schmulen-feedback` | 2026-03-27 | 1 | Revise Schmulen SOW viewer: prominent banner, clipboard feedback, specific asks |
| 13 | `schmulen-nav-restructure` | 2026-03-27 | 1 | Merge main and resolve conflicts in viewer index.html |

### Notes

- All branches are 1-commit feature branches (except `dicaprio-agent` with 2)
- Most content from these branches was later landed via different PRs — the branches themselves were superseded
- `recap-recent-changes` is the most recent (Apr 3) — README update only
- Schmulen/CMO branches largely contain client viewer and agent work that shipped via other branches

### Recovery

If any branch is needed before deletion, restore from remote:
```
git fetch origin <branch-name>
git checkout -b <branch-name> origin/<branch-name>
```

After 2026-05-07, remote refs will be deleted and recovery requires reflog or backup.
