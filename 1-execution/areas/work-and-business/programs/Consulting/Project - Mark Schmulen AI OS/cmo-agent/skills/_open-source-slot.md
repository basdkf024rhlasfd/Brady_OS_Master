# Open Source Slot: Unassigned Imported Agents

## Purpose

This slot holds imported marketing agents from Brady's GitHub repo that are not yet assigned to an active sub-agent. They are available for plug-in when Mark's needs evolve or when a specific use case emerges.

## Available Agents

These agents live at `/0-agents/imported-agents/marketing/` and are ready to be referenced by any sub-agent:

| Agent | File | Likely Home | Notes |
|-------|------|-------------|-------|
| Carousel Growth Engine | `marketing-carousel-growth-engine.md` | Content & MarComms | LinkedIn/Instagram carousel creation. Activate when Mark starts using visual content. |
| Instagram Curator | `marketing-instagram-curator.md` | Content & MarComms | Instagram content strategy and curation. Activate if Contour builds an Instagram presence. |
| Short Video Editing Coach | `marketing-short-video-editing-coach.md` | Content & MarComms | Video content guidance. Activate if Mark starts producing video (TikTok, Reels, YouTube Shorts). |

## How to Plug In

To assign an agent to an active sub-agent:

1. Open the target sub-agent file (e.g., `skills/content-marcomms.md`).
2. Add the agent to the "Specialist Agents Available" table.
3. Add a row with the agent name, file reference, and "Use When" description.
4. Remove the agent from this file's table.

Example addition to `skills/content-marcomms.md`:

```markdown
| Carousel Growth Engine | `marketing-carousel-growth-engine.md` | LinkedIn carousel posts, visual content series |
```

## Activation Criteria

Don't plug these in speculatively. Activate when:
- Mark explicitly asks for the capability (e.g., "I want to start posting carousels")
- Analytics show an opportunity in the channel (e.g., carousel posts getting 3x engagement)
- The hired marketer requests the tooling
