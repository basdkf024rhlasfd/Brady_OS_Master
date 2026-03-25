# How It Works

> The architecture behind your AI OS — context files, memory, skills, and tool connections.

## The Stack

Your AI OS is built on a simple, portable architecture. No proprietary platform. No vendor lock-in. Everything is markdown files on your machine.

```
Your workspace/
├── AGENTS.md          # Who your agents are, what they know
├── MEMORY.md          # Index of learned preferences
├── memory/            # Individual memory files
│   ├── preferences.md
│   ├── contacts.md
│   └── ...
├── skills/            # Reusable process definitions
│   ├── email-draft.md
│   ├── meeting-prep.md
│   └── ...
└── context/           # Business context documents
    ├── manifesto.md
    ├── gtm-strategy.md
    ├── brand-voice.md
    └── ...
```

## AGENTS.md — The System Prompt

This is the master file that defines your agents. It tells the AI who it is, what it knows, and how it should behave. Think of it as the job description for your agent.

It includes:
- Your business context (what your company does, who your customers are)
- Communication preferences (tone, formality, sign-offs)
- Tool connections (which MCPs are available)
- Rules and boundaries (what the agent should and shouldn't do)
- Links to context files for deeper knowledge

## Memory — The Compounding Layer

Memory is what makes the system get smarter over time. Every correction, preference, and pattern gets captured in memory files.

**How it works:**
1. You correct the agent ("don't use that sign-off, use this one")
2. The agent saves that correction to a memory file
3. Next time, the agent checks memory before producing output
4. The correction is applied automatically

**Types of memory:**
- **Preferences** — How you like things done (email tone, formatting, scheduling rules)
- **Contacts** — Key people and your relationship with them
- **Decisions** — Past decisions that should inform future ones
- **Feedback** — Corrections that should persist

## Skills — Repeatable Processes

Skills are markdown files that define step-by-step procedures. When you type `/email-draft`, the agent reads the skill file and follows the instructions exactly.

See `kb/04-skills-library.md` for the full skills breakdown.

## MCPs — Tool Connections

MCPs (Model Context Protocol) are the connections between your agent and your tools. Each MCP gives the agent the ability to read from and write to an external service.

| MCP | What it connects | What it enables |
|-----|-----------------|-----------------|
| Gmail | Your email | Read, search, draft, send |
| Google Calendar | Your calendar | Read events, create events, find free time |
| Slack | Your Slack workspace | Read/post messages, search |
| Notion | Your Notion workspace | Read/write pages, query databases |
| QuickBooks | Your books (Phase 2) | Read transactions, accounts, reports |

MCPs are configured in your harness settings (Claude Code, Cowork, etc.). Once connected, the agent can use them like tools.

## Harness — Where You Run It

The harness is the application where you interact with your agents. Your AI OS is designed to work across multiple harnesses:

- **Claude Code** — Terminal-based, powerful, good for technical work
- **Cowork** — GUI-based, good for daily use and less technical workflows
- **Codex** — OpenAI's harness, if you prefer that ecosystem

The context files (AGENTS.md, memory, skills) are portable. Switch harnesses without losing your agent's knowledge.

## What's Not Included

- **No proprietary platform** — Everything is files on your machine
- **No monthly software fee** — The AI provider (Anthropic, OpenAI) is the only subscription
- **No vendor lock-in** — Context files work across any harness that reads markdown
- **No hosted service** — Your data stays on your machine
