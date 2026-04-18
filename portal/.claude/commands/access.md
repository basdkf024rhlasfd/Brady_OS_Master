Manage user access for the mception.ai portal.

Arguments: $ARGUMENTS

Examples:
- "give jane@acme.com access to panda and kroger"
- "remove mark@example.com from stihl"
- "make bob@example.com an admin"
- "give jane@acme.com access to everything"
- "who has access to orlando?"

## How access works

- **Admin** (`MCEPTION_ADMIN_EMAILS`): all projects + misc tools
- **All-projects** (`MCEPTION_ALL_PROJECTS_EMAILS`): all projects, no misc
- **Per-project** (`MCEPTION_<SLUG>_EMAILS`): only that project

All env vars are CSV email lists on the Vercel project "munich".
Env var naming convention: `MCEPTION_<SLUG_UPPER_UNDERSCORED>_EMAILS`

## Steps

1. Read `src/config/projects.yml` to validate project slugs.

2. Determine action (grant/revoke/check), email(s), and scope.

3. Map scope to env var(s):
   - "everything" / "all projects" → `MCEPTION_ALL_PROJECTS_EMAILS`
   - "admin" → `MCEPTION_ADMIN_EMAILS`
   - specific project → `MCEPTION_<SLUG>_EMAILS`

4. Use `mcp__claude_ai_Vercel__get_project` to find munich.
   Then update the env var(s) — append or remove the email from the CSV.

5. **Trigger redeployment** via `mcp__claude_ai_Vercel__deploy_to_vercel` for munich.
   Access changes don't take effect until the site redeploys.

6. Report: env var(s) changed, what access the user now has, deploy status.
   Remind that the user needs a Clerk account at mception.ai to log in.
