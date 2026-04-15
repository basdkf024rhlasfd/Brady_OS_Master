# Rebuild Guide

This is the compact implementation guide for the starter pack.

## Build Order

1. Pick your tools.
2. Define your Areas.
3. Define one Program.
4. Define one Project.
5. Create one intake path for notes and email.
6. Add a tiny starter-agent pack.
7. Define 1-2 starter skills (repeatable workflows like a morning sweep or weekly review).
8. Run the system manually for 2-3 weeks.
9. Only then add automation.

## Folder Shape

Use this scaffold:

```text
your-os/
├── 0-agents/
├── 1-execution/
│   └── areas/
├── 2-memory/
└── 3-reference/
    ├── skills/
    └── imported-skills/
```

## Execution Model

Use these levels:

- **Areas**: durable life domains
- **Programs**: standing commitments inside an Area
- **Projects**: temporary upgrades to a Program
- **Tasks**: atomic moves

Do not skip straight from life domains to tasks. That is how meaning disappears.

## Authority Horizons

Protect these three levels:

- **Day**: execution
- **Cycle**: project and scope changes
- **ARC**: strategy and Program-level direction

If a bad day is trying to rewrite the system, the horizon is wrong.

## Minimal Databases or Lists

You need, at minimum:

- Areas
- Programs
- Projects
- Tasks
- one Memory Inbox

If your tool supports relations, use them. If not, use links and naming discipline.

## Starter Agent Pack

Start with abstract roles, not a giant roster:

- gatekeeper
- archivist
- philosopher
- builder
- trusted advisor
- optional domain owner

See [STARTER-AGENTS.md](STARTER-AGENTS.md).

## Starter Skills

Skills are reusable SOPs without agent identity. If it has a personality, it is an agent. If it is a repeatable procedure any agent can run, it is a skill.

Start with 1-2:

- a daily or morning sweep (scan inboxes, surface priorities, flag action items)
- a weekly review (check project status, clear stale items, set next-week priorities)

Each skill gets its own folder with a `SKILL.md` as the entry point. See [templates/skill-template.md](templates/skill-template.md).

Skills can orchestrate other skills. A daily operating rhythm skill might sequence a morning sweep, client briefings, and an evening archive. Build the small skills first; compose them later.

## Imported Skills

External SOP packs, frameworks, and playbooks can be imported as standalone packages in `imported-skills/`.

- Keep the original structure intact. Add a note with source and date.
- Core skills can reference imports, but imports do not modify core skills.
- To promote an import into a core skill, decide which parts to absorb and which skill owns them.
- Curate useful subsets for specific agents. Do not dump an entire library on every agent.

## Recursive Learning (Advanced)

If a skill runs repeatedly — daily, weekly — consider adding a learning log.

Track what methods or approaches worked, what did not, and what gaps remain. A simple YAML or markdown file appended after each run is enough.

Future runs can reference the log to auto-suggest improvements. This turns a static SOP into a system that gets smarter over time. You do not need this on day one.

## First Success Condition

The first version is good enough when:

- the user can tell what matters this week
- one real Project has a home
- raw notes stop leaking directly into the task list
- AI roles are distinct enough to be useful
- at least one repeatable workflow runs as a named skill, not as ad-hoc instructions

## What To Customize

The package deliberately leaves these open:

- Area names
- Program definitions
- tool stack
- review cadence
- agent names and tone
- local automation choices

That customization is required. Do not try to avoid it.
