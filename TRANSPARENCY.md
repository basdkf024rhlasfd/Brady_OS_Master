# Brady OS — Transparency Map

Everything this system touches externally, every autonomous behavior, every secret it needs, and every file that must never be committed. If it's not on this page, it doesn't exist.

Last audited: 2026-04-16

---

## 1. External Service Connections

| Service | Scripts / Skills That Use It | Access Type | Auth Method | Secret Location |
|---------|------------------------------|-------------|-------------|-----------------|
| **Notion API** | telly-archive, email-classifier, morning-sweep, evening-sweep, pipeline-dashboard, client-project-cleanup, exec-intel-brief | Read + Write | API key (Bearer token) | GAS PropertiesService / ~/telly-bot/.env.production.local |
| **Gmail** | email-classifier (GAS), os-recap-mailer (GAS), morning-sweep | Read + Label + Archive + Send | OAuth2 (GAS scopes) | GAS project credentials |
| **Google Calendar** | morning-sweep, evening-sweep | Read-only | OAuth2 (MCP) | Claude MCP connection |
| **Google Drive** | os-recap-mailer, PauletteAI sync-drive | Read + Write | API key / OAuth2 | .env (local) / GAS scopes |
| **Google Sheets** | email-classifier (logging) | Write (append) | OAuth2 (GAS scopes) | GAS project credentials |
| **Anthropic Claude API** | email-classifier (GAS) | API call | API key | GAS PropertiesService |
| **Telegram** | Telly bot | Webhook receive | Bot token | Vercel env vars |
| **Vercel Blob** | Telly bot, telly-archive | Read + Write + Delete | Token | ~/telly-bot/.env.production.local |
| **Otter.ai** | morning-sweep | Read-only | OAuth2 (MCP) | Claude MCP connection |
| **iMessage** | morning-sweep, evening-sweep | Read-only | Local (MCP) | N/A |
| **GitHub** | morning-sweep (via Conductor) | Read-only | Git credentials | Local git config |

### Imported Skills — External API Surface

51 marketing CLI tools in `3-reference/imported-skills-and-systems/marketingskills/tools/clis/` each connect to a different SaaS API (Amplitude, Mixpanel, Mailchimp, Apollo, etc.). These are imported third-party tools, not Brady-authored. Full registry: `marketingskills/.claude-plugin/marketplace.json`. Each requires its own API key passed at invocation time.

---

## 2. Autonomous Behaviors

These systems take action without per-action human approval:

| System | Trigger | What It Does | Guard Conditions | Audit Trail | How to Stop | Trust Tier |
|--------|---------|--------------|------------------|-------------|-------------|------------|
| **Email Classifier** | Every 15 min (GAS timer) | Classifies emails via Claude, applies Gmail labels, auto-archives Low+Bot+Archive emails | Three-condition guard: `priority=Low AND person_or_bot=Bot AND action_type=Archive`. High priority NEVER archived. Expert network emails ALWAYS High. | Google Sheets: `email-classifier` tab (general log) + `auto-archive-audit` tab (every archived email) | Delete trigger in GAS editor | T1 |
| **Telly Bot** | On Telegram message (webhook) | Routes message to Notion Streaming Notes based on prefix (`task:`, `pulse:`, `bug:`, `idea:`, `log:`) | `TELEGRAM_CHAT_ID` env var gates who can send; files require button tap for public/private choice | Telegram reply confirms each capture; Notion page created | Remove Vercel deployment | T1 |
| **OS Recap Mailer** | Friday 7:15 AM CT (GAS timer) | Finds latest recap in Google Drive, emails HTML + PDF to Brady | Requires prior Conductor run to generate recap; sends notice if no recap exists | Email in inbox | Delete trigger in GAS editor | T1 |
| **Telly Archive** | Manual (called from sweeps) | Downloads pending-archive files from Vercel Blob to local disk, deletes public blob, updates Notion | Only processes blocks marked "PENDING ARCHIVE" | Console output during run | Don't invoke it | T1 |

### Skills That Are NOT Autonomous

These require Brady to trigger them and review output before anything goes external:

- **Morning/Evening Sweeps** — manually triggered, log to local files + Notion
- **Daily Whitepaper** — manually triggered, PDF for Brady only
- **Exec Intel Brief** — generates brief, presents to Brady, Brady sends manually
- **Content Publishing Kit** — "Nothing ships without Brady's sign-off"
- **Innovation Workshop** — stage gates require Brady approval before expensive steps
- **DiCaprio** — read-only recon, advisory output only

### Trust Tier Registry

Every skill carries a `trust_tier` field in its YAML frontmatter. Tiers define what a skill can do without Brady present. See Amendment 5 in `3-reference/governance/amendments-2026-01.md` for full definitions.

| Tier | Name | Authority | Skills |
|------|------|-----------|--------|
| **T0** | Observation | Read + report. No writes beyond Streaming Notes/Routing Log. Can run unattended. | daily-whitepaper, pipeline-dashboard, deep-research, doctrine-sync, config-sync, project-standup-kit, air-traffic-control, os-context-pack, agent-debate, prospect-research-kit, deck-generator, mception-design-system, infographic-template, midjourney-prompt, full-stack-ideation, marketing-templates, cascading-accountability, weekly-os-recap, innovation-workshop, operations-innovation-engine, dicaprio |
| **T1** | Internal Modification | T0 + update Notion properties, create Tasks, route items. Log every modification. | morning-sweep, evening-sweep, weekly-sweep, client-project-cleanup, daily-operating-rhythm, recursive-learning, claudine-onboarding, telly, email-classifier, os-recap-mailer |
| **T2** | Drafting with Review | T1 + draft emails/messages/calendar events. Nothing sends without Brady review. | exec-intel-brief, content-publishing-kit, client-engagement-kit, v0-to-portal, project-creator |
| **T3** | Outbound with Approval | Sends to external humans/systems. Requires per-instance Brady approval via Agent Question. Never cron-scheduled. | (none assigned yet — all outbound actions require T3 gate) |

---

## 3. Infrastructure IDs

All Notion database IDs, Google Drive folder IDs, and service identifiers are centralized in:

**`3-reference/infrastructure-registry.yml`** (canonical source)

CLAUDE.md duplicates the most-used Notion IDs for agent convenience but points to the registry as the source of truth.

---

## 4. Secrets Inventory

Full inventory with provisioning instructions: `3-reference/infrastructure-registry.yml` under `secrets:`.

Summary:

| Secret | Used By | Stored In |
|--------|---------|-----------|
| `ANTHROPIC_API_KEY` | email-classifier (GAS) | GAS PropertiesService |
| `NOTION_API_KEY` | email-classifier (GAS), telly-archive | GAS PropertiesService / ~/telly-bot/.env.production.local |
| `NOTION_SYNC_ENABLED` | email-classifier (GAS) | GAS PropertiesService |
| `BLOB_READ_WRITE_TOKEN` | telly-archive | ~/telly-bot/.env.production.local |
| `TELEGRAM_BOT_TOKEN` | Telly bot | Vercel env vars |
| `TELEGRAM_CHAT_ID` | Telly bot | Vercel env vars |
| `GOOGLE_API_KEY` | PauletteAI sync-drive | viewer/.env (local) |
| `LOG_SHEET_ID` | email-classifier (GAS) | GAS PropertiesService |

No secrets are hardcoded in tracked files. API keys are stored in GAS PropertiesService or environment files that are gitignored.

---

## 5. Sensitive Data Policy

These files contain PII, financial data, or family information and must NEVER be committed to git:

| Pattern | What It Contains | Enforcement |
|---------|-----------------|-------------|
| `os-cockpit/data.js` | Bank balance, medical appts, family schedules, client details | `.gitignore` |
| `3-reference/skills/*/references/family-data.md` | Family member details | `.gitignore` |
| `3-reference/skills/*/references/school-calendar.md` | School schedules | `.gitignore` |
| `.env` / `.env.*` | API keys, tokens | `.gitignore` |

**Principle:** Live operational data (cockpit snapshots, financial details, family logistics) belongs in Notion or behind mception.ai auth — not in git.

A sanitized template exists at `os-cockpit/data.example.js` showing the expected schema without real values.

---

## 6. Governance Guardrails

These amendments constrain what agents and automations can do:

- **Amendment 1:** ChatGPT agents cannot directly operate Notion. No background execution claims.
- **Amendment 2:** Cornelius (Notion AI agent) is a role + SOP executor only, not autonomous.
- **Amendment 3:** Any action affecting system state must reference a named SOP. No SOP = no execution.
- **Amendment 4:** No canonical SOP for voice-to-task yet. Advisory/paste-ready only until one exists.
- **Amendment 5:** Trust Tiers govern autonomous execution. T0-T2 can run unattended; T3 (outbound to humans) requires per-instance approval. Permanent T3 gates: email send, calendar invites with attendees, social posting, client resource access, financial transactions.
- **Publication Allowlist:** `3-reference/publishing/mception-ai-projects.yml` is fail-closed. Missing from allowlist = private.

---

## 7. GAS Deployment

Email classifier and OS recap mailer are Google Apps Scripts deployed via `clasp`. Changes to these files in the repo do NOT auto-deploy — Brady must manually run:

```bash
cd 3-reference/scripts/gas && ./build.sh
# Then clasp push for the specific script
```

The GAS projects have their own `.clasp.json` linking to the Google Apps Script project IDs.
