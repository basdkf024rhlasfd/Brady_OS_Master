# PROVENANCE — startup-business-analyst

**Source:** https://github.com/wshobson/agents  
**Plugin path:** `plugins/startup-business-analyst/`  
**Author:** wshobson  
**Imported:** 2026-04-27  
**Commit/version:** latest main as of import date  
**License:** see parent repo

## What this is

Expert-level startup business analysis: TAM/SAM/SOM sizing, 3–5 year financial modeling, competitive landscape, startup metrics frameworks, and team composition analysis. Packaged as Claude Code skills with an interactive analyst agent.

Relevant to Brady OS because: plugs directly into consulting engagements (prospect-research-kit, client-engagement-kit, deep-research) and provides structured frameworks that complement Brady's strategy + ops background.

## Skills included

- `market-sizing-analysis` — TAM/SAM/SOM with multiple methodologies (bottom-up, top-down, value-theory)
- `startup-financial-modeling` — 3–5 year projections with scenario analysis
- `competitive-landscape` — market positioning, SWOT, differentiation mapping
- `startup-metrics-framework` — SaaS, marketplace, e-commerce, and consumer metrics
- `team-composition-analysis` — org design, headcount planning, compensation benchmarks

## Agents included

- `startup-analyst.md` — specialized analyst agent for early-stage startup work

## Commands included

- `market-opportunity` — generates market opportunity analysis doc
- `financial-projections` — creates financial models with scenarios
- `business-case` — comprehensive business case document

## Brady OS integration notes

- **Market sizing**: complements `prospect-research-kit` for sizing a prospect's market before engagement
- **Competitive landscape**: complements `exec-intel-brief` and `deep-research` for competitive positioning work
- **Financial modeling**: useful for 1915 South franchise economics, Panda unit economics, any M&A thesis work
- **Startup metrics**: relevant for Schmulen/PropMatic (real estate tech), Broker Platform, Consulting OS Platform clients
- **Engagement Router**: `competitive-landscape` and `market-sizing-analysis` skills feed the Growth and Competitive Response archetypes in the framework router

## Status

Standalone — imported for reference. Promote `market-sizing-analysis` and `competitive-landscape` to active use first; they have the highest consulting leverage.
