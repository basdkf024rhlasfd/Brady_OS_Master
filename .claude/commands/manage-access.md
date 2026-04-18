Manage user access for the mception.ai portal.

Arguments: $ARGUMENTS

Examples:
- "give baden.bagley@gmail.com access to everything"
- "add mark@example.com to mark-schmulen and orlando"
- "remove jane@example.com from stihl"
- "make bob@example.com an admin"
- "who has access to orlando?"
- "what access does baden.bagley@gmail.com have?"
- "list all users"

## How access works

Read `src/lib/access.ts` to get the current project list and env var mapping. Here's the model:

- **Platform owner** (`MCEPTION_PLATFORM_OWNER_EMAIL`): sees everything including misc tools. Default: brady.smallwood@gmail.com
- **Admin** (`MCEPTION_ADMIN_EMAILS`): sees all projects + miscellaneous tools
- **All-projects user** (`MCEPTION_ALL_PROJECTS_EMAILS`): sees all projects, NO misc tools — this is the right level for most external users
- **Per-project** (`MCEPTION_<PROJECT>_EMAILS`): sees only that project

All env vars are CSV lists of emails. They live on the Vercel project, not in code.

## Instructions

1. Parse the user's request to determine:
   - **Action**: grant, revoke, check, or list
   - **Email(s)**: the user(s) to manage
   - **Scope**: "everything" (all projects), "admin" (all + misc), specific project names, or query

2. Read `src/lib/access.ts` to confirm the current `ALL_PROJECTS` array and `PROJECT_EMAIL_ENV` mapping. Do not hardcode — always read the file.

3. Determine which Vercel env var(s) need to change:

   | Request | Env var |
   |---------|---------|
   | "access to everything" / "all projects" | `MCEPTION_ALL_PROJECTS_EMAILS` |
   | "make admin" | `MCEPTION_ADMIN_EMAILS` |
   | specific project (e.g. "orlando") | Look up in `PROJECT_EMAIL_ENV` |
   | "remove from everything" | Check and remove from ALL relevant env vars |

4. Use the Vercel MCP tools to update environment variables:

   a. Use `mcp__claude_ai_Vercel__get_project` to find the munich project.

   b. For each env var to update:
      - Read the current value from the project's environment variables
      - If granting: append the email to the CSV list (or create the var if it doesn't exist)
      - If revoking: remove the email from the CSV list
      - If the email is already present (for grants) or already absent (for revokes), skip and note it

   c. If Vercel MCP tools can't edit env vars directly, fall back to Chrome browser automation:
      - Call `mcp__claude-in-chrome__tabs_context_mcp` to get current tabs
      - Navigate to: `https://vercel.com/bradysmallwood-7504s-projects/munich/settings/environment-variables`
      - Edit/create the env var with all environments checked (Production, Preview, Development)

5. **MANDATORY — Trigger a redeployment** so changes take effect immediately:
   - Use `mcp__claude_ai_Vercel__deploy_to_vercel` to redeploy the munich project to production, OR
   - Run `npx vercel --prod` from the munich project directory as a fallback
   - Do NOT skip this step. The user's access won't work until the site redeploys.
   - Wait for deployment confirmation before reporting success.

6. Report a summary:
   - What env var(s) were changed and what the new values are
   - What access the user now has (list the specific projects they can see)
   - Whether redeployment was triggered and its status
   - Remind that the user must have a Clerk account (sign up at mception.ai) to log in
