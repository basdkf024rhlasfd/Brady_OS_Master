# Talent OS

**An AI-native operating kit for a People & Talent engagement.**
Built for Brandon. Runs in [Claude Code](https://claude.com/claude-code).

You drop raw material into an intake folder — interview notes, an old job posting, a
stack of resumes, a roster export — say one sentence, and Talent OS turns it into a
*shippable* deliverable: an optimized job description, a structured interview guide with
a scorecard, a ranked candidate shortlist, an autonomous phone-screen process, a
workforce plan, a culture read, a total-rewards design.

It is not a chatbot you argue with. It's a set of pre-built processes ("skills") plus a
resident People & Talent agent (**Hunter**) that already knows best-practice HR and the
engagement context, so your prompts can be one line and the output is 80% of the way to
done.

---

## The promise

| You have | You say | You get (in `deliverables/`) |
|---|---|---|
| Notes from interviewing the store/People team | `run the talent diagnostic` | Funnel diagnosis + prioritized fix roadmap + what to run next |
| A messy or thin job posting | `optimize the RSA job posting` | A conversion-optimized, bias-checked, ready-to-post JD + sponsored short version + pre-apply screener |
| A JD or a role | `build an interview guide for [role]` | Scorecard + competency/behavioral question bank + rubric + legal do-not-ask list |
| A folder of resumes / screening videos | `screen these candidates for [role]` | Transparent ranked shortlist + advance/hold/pass + a daily "reach out to these" digest |
| A role to screen at volume | `design a phone AI interviewer for [role]` | A deployable autonomous voice-screen: script, scoring, build spec, compliance, human handoff |
| A roster + a growth plan | `run a workforce plan` | Headcount model, backfill/turnover forecast, req plan, build-vs-buy |
| A new role's ramp | `build a 30/60/90 for [role]` | Onboarding + ramp-to-productivity plan + training checklist |
| Interview/survey/review data | `run a culture diagnostic` | Culture read, values, engagement action plan |
| Comp + benefits inputs | `run total rewards for [role]` | Total-rewards statement, comp band, commission-plan review, benefits benchmark |
| Roster / exit / funnel data | `run people analytics` | Turnover, quality-of-hire, time-to-fill, source & bonus-leakage views |

---

## Start here

**The one-word version:** open this folder in Claude Code and type **`go`**. Hunter introduces
itself, shows you the menu, and runs a live demo — producing a real, optimized job description from
a sample posting — so you see the kit work on your very first message. Then it points you at your
first real deliverable.

New to Claude Code? Read **[`START-HERE.md`](START-HERE.md)** first — it installs the
tools, explains the three moving parts (context / skills / intake), and walks you through
your first real deliverable in about 15 minutes.

Already fluent? The skills live in [`skills/`](skills/) — each has a `SKILL.md` that
tells the agent exactly what to do. Just drop your input in the right `intake/` folder
and name the skill.

---

## What's in the box

```
talent-os/
├── README.md            ← you are here
├── START-HERE.md        ← 15-minute onboarding + first run
├── CLAUDE.md            ← operating instructions Claude Code loads automatically
├── agents/hunter.md     ← the resident People & Talent intelligence agent
├── skills/              ← the pre-built processes (10 of them)
├── templates/           ← the fill-in scaffolds each skill produces
├── reference/           ← domain knowledge Hunter uses (HR playbook, retail hiring, engagement context)
├── examples/            ← a sample posting the "go" demo runs on
├── intake/              ← YOU DROP RAW INPUTS HERE (gitignored — safe for confidential data)
└── deliverables/        ← finished, shippable outputs land here (gitignored)
```

## The two rules that make this trustworthy

1. **Confidential in, confidential stays.** Everything you drop in `intake/` and everything
   generated in `deliverables/` is git-ignored. The kit itself carries no client secrets.
2. **A human owns every hiring decision.** Talent OS screens, ranks, drafts, and
   recommends. It never rejects a person or sends an external message on its own. You (or
   the store manager) always make the call. This isn't just ethics — it's how you stay on
   the right side of EEOC and adverse-action rules.

---

*Talent OS is modeled on Brady Smallwood's operating system and adapted for Brandon's
practice. Questions → Brady.*
