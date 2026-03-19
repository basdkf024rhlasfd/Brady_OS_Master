# Defaults and Customization

This is a post-setup reference. If you just finished the Activation Agent, everything below was set up for you with smart defaults. Come back here when you're ready to customize.

## Your Defaults

| Setting | Default | How to Change |
|---------|---------|---------------|
| Areas | Work & Business, Family & Relationships, Health & Energy, Wealth & Administration, Learning & Play | Edit the Area file and update the `name` field. Add or remove Area files as needed. |
| Starter Agents | Bo (chief of staff), Phil (coherence checker), Claudine (builder) | Edit agent files in `0-agents/`. See `STARTER-AGENTS.md` for additional roles to add. |
| Review Cadence | Weekly for Projects, Monthly for Programs | Change the `next-review` field in Program files. Adjust your calendar reminders. |
| Automation | None — manual first | See the automation rollout plan in `3-reference/` when you're ready. |
| System of Record | Notion (or whatever you chose) | Move your files to a different tool anytime. The markdown is portable. |
| Programs | 1 to start | Add more Program files using `templates/program-template.md` as the base. |
| Projects | 1 to start | Add more Project files using `templates/project-template.md` as the base. |

## When to Customize

**After 2 weeks**: Rename Areas if they don't feel right. The defaults are deliberately generic — make them yours once you know which words you actually think in.

**After 1 month**: Consider adding a 4th agent or a 2nd Program. You'll know by now whether the current structure is too narrow or just right.

**After 2 months**: Consider automation. If you've been running weekly reviews manually and they feel routine, that's a signal you're ready for automated reminders, email triage, or daily digests.

**After 3 months**: Full system review. Are the Areas still the right buckets? Are you using all 3 agents? Is the review cadence too frequent or too sparse? Adjust everything at once.

## Advanced Customization

These are deeper structural concepts. You don't need them on day one, but they exist when you're ready.

### The Sport / Team / Coach Model (Programs)

Each Program can be described with three lenses:
- **Sport**: the external game being played (e.g., "enterprise consulting," "kids' education")
- **Team**: the durable capability being built (e.g., "proposal pipeline," "homework support system")
- **Coach**: the system improvement owner (e.g., an agent, a review process, or you)

This model helps you distinguish between doing the work (sport), building the capacity to do it (team), and improving how you build capacity (coach).

### Custom Agent Design

When you're ready to add agents beyond the starter 3, use `templates/custom-agent-template.md`. Key principles:
- Each agent should have a distinct job that doesn't overlap with existing agents
- Define 3 "will NOT" guardrails so the agent stays in its lane
- Start with a clear seniority level: junior agents execute, senior agents advise and push back

### Additional Roles to Consider

- **Archivist / Operator**: routes notes and raw input to the right place, keeps the system clean
- **Domain Owner**: dedicated point of view for a specific vertical or project (e.g., board governance, a specific client)

See `STARTER-AGENTS.md` for full descriptions.

### Review Cadence Tuning

The default cadence (weekly Projects, monthly Programs) works for most people. If you want more structure:
- **Daily**: task-level check-in (what am I doing today, what's blocked)
- **Quarterly**: Area-level review (are these still the right life domains?)
- **Annual**: full system reset (start/stop Programs, redefine strategy)

Only add these layers if you'll actually do them. A review you skip is worse than no review.
