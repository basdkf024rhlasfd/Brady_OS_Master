# Imported Skills & Systems

External frameworks, skill packs, and systems imported into Brady OS as standalone packages. These are NOT part of the core skill set — they can be summoned as-is or selectively promoted into core OS skills.

## Governance

- **Import:** Drop the package here with a `PROVENANCE.md` noting source, date, and commit/version. Keep original structure intact.
- **Reference:** Core OS skills can point to imports ("for pitch deck framework, see `imported-skills-and-systems/pitch-deck-framework`"). Imports do NOT modify core skills.
- **Promote:** To fold an import into the core OS, Brady decides which parts to absorb, which core skill owns them, and what gets adapted vs. used as-is. The import stays here as the archive copy.
- **Curate for clients:** When packaging imports for client agents (e.g., Schmulen CMO), select useful subsets — don't dump everything.

## Inventory

| Package | Source | Imported | Status |
|---------|--------|----------|--------|
| marketingskills | coreyhaines31/marketingskills | 2026-04-14 | Standalone |
| pitch-deck-framework | VC Corner Newsletter (Ruben) | 2026-04-14 | Standalone |
| infographic-builder | Charlie Hills (@charlie_hills) | 2026-04-14 | Standalone |
| claude-skill-libraries | anthropics/skills + 3 community lists | 2026-04-27 | Standalone — see `claude-skill-libraries/ABSORPTION-SHORTLIST.md` |
| agent-teams | wshobson/agents (34k★) | 2026-04-27 | Standalone — multi-agent orchestration; maps to Musashi/Yuki super-agent pattern |
| startup-business-analyst | wshobson/agents (34k★) | 2026-04-27 | Standalone — TAM/SAM, competitive landscape, financial modeling; promote for consulting engagements |
