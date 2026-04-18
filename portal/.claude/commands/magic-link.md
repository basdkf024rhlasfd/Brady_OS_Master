Generate a magic link for sharing a project without login.

Arguments: $ARGUMENTS

Usage examples:
- "kroger Chad 30" → magic link for Kroger, recipient "Chad", 30-day expiry
- "mark-schmulen Mark" → defaults to 7-day expiry

## Steps

1. Parse arguments: project slug, recipient name, days (default 7).

2. Read `src/config/projects.yml` — only projects with `magic_link: true` are valid.
   Valid projects: list them for the user if the slug is invalid.

3. Run from the portal directory:
   ```bash
   cd portal && npx tsx scripts/generate-magic-link.ts \
     --project <slug> --recipient "<name>" --days <n>
   ```

4. Return the URL to the user.
