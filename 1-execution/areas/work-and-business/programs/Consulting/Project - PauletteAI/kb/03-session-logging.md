# Session Logging System

PauletteAI captures working sessions as structured emails that route to Brady for processing and follow-up.

## How It Triggers

- **Explicit:** Paulette says "log it", "save that", or similar
- **Automatic:** At the end of a substantive session with decisions or outputs

## What Paulette Does

Nothing extra. PauletteAI composes a summary email. Paulette taps "send." That's it.

## Email Format

**Subject:** `[PAULETTEAI-LOG] [YYYY-MM-DD] [Topic] #log`

**Body structure:**
- Session summary (what was discussed, what was produced)
- Decisions made
- Action items (tagged with owner)
- Documents produced or referenced
- Machine-readable hashtags for automated parsing

**Hashtag taxonomy:**
- `#source:pauletteai` — bookends (start and end) for parser validation
- `#topic:[x]` — session topic category
- `#priority:[low|medium|high|urgent]`
- `#mood:[x]` — Paulette's emotional state during session
- `#needs_brady_review:[yes|no]`
- `#has_action_items` / `#has_documents` / `#has_decisions`
- Action item owners: `#owner:[paulette|brady|staff|board]`

## Downstream Pipeline (Designed)

| Step | System | Status |
|------|--------|--------|
| 1. Email sent | Paulette taps "send" via `message_compose_v1` tool | Production |
| 2. Gmail filter | `[PAULETTEAI-LOG]` → label `PauletteAI/Logs` | Designed, needs configuration |
| 3. Zapier/Claudine parser | Parse hashtags → create Notion page | Designed, not built |
| 4. Notion DB | Session logs with multi-select properties, priority, checkboxes, date | DB exists (`eae5c710-99fc-4be7-86cb-4f193e0980d2`), partial population |

## Design Principles

- **Invisible to Paulette** — hashtags and structure are backend concerns; she just taps send
- **Machine-readable** — structured enough for automated parsing
- **Human-readable** — Brady can scan the email directly without the automation
- **Complete** — every substantive session generates a log, even if Paulette doesn't explicitly request it
