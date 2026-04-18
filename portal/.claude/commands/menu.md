View or reorder the mception.ai sidebar menu.

Arguments: $ARGUMENTS

Examples:
- (no args) → show current menu order
- "move kroger above panda"
- "move grocery-assistant to position 3"
- "remove incubator" (removes from YAML — deletes the project entry)

## How it works

The sidebar renders projects in the order they appear in `src/config/projects.yml`.
To reorder: move the YAML entry. To remove: delete the entry.

## Steps

1. Read `src/config/projects.yml`.

2. If no arguments, show the current order as a numbered list:
   ```
   1. STIHL USA (stihl)
   2. Mark Schmulen (mark-schmulen)
   ...
   ```

3. If reorder/remove instructions given, edit `projects.yml` accordingly.

4. Report the new order. Remind that changes take effect on next deploy.
