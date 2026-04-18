---
trust_tier: T0
---

# Agent Debate — Skill

**Trigger:** "stage a debate", "agent debate", "war room"
**Owner:** Brady
**Last Updated:** 2026-04-11

---

## What This Skill Does

Stages a vigorous, structured debate between Brady OS agents on a strategic question. Produces a war room transcript where agents argue in their canonical voices, pressure-test ideas, and drive toward a sharpened recommendation.

---

## Debate Structure

### Cast Selection (5-10 agents)

Every debate needs:
1. **A Protagonist** — the agent who brings the thesis and defends it. Accepts feedback to strengthen, not just deflect.
2. **A Devil's Advocate** — finds holes so the protagonist can patch them before the real audience does. Constructive, not destructive.
3. **A Moderator** — frames rounds, enforces scope, drives toward verdict. Default: Project Shepherd (imported agent, `0-agents/imported-agents/project-management/project-management-project-shepherd.md`).
4. **The Panel** — remaining agents selected for their relevant expertise and likely disagreements.

### Recommended Panel by Debate Type

| Debate Type | Protagonist | Devil's Advocate | Key Panel Members |
|------------|-------------|-----------------|-------------------|
| Client pitch / positioning | Claudine | Phil | Burt, Bo, Musashi San, Mason, Bertha, DiCaprio |
| Product / build decision | Musashi San | Phil | Claudine, Yuki Ronin, Bo, Mason |
| Personal / career | Bertha | Burt | Phil, Bo, Claudine |
| OS philosophy / governance | Phil | Burt | Claudine, Mason, Cornelius |
| Packaging / external comms | Mason | Musashi San | Claudine, Burt, Content Drafter |

### Round Structure

**Opening — Moderator**
- Frames the question and ground rules
- Introduces each panelist's stance in one line

**Round 1: The Thesis**
- Protagonist presents their full argument
- Each agent responds — building on what works, flagging what needs strengthening
- Devil's advocate finds the holes

**Round 2: Sharpening**
- Protagonist incorporates Round 1 feedback and refines
- Panel focuses on: How do we make this land? What does the audience actually need?
- Devil's advocate stress-tests the refined version

**Round 3: What Do We Ship?**
- Drive toward concrete deliverables and scope
- Each agent contributes their piece of the recommendation
- Protagonist synthesizes the improved thesis

**Closing — Protagonist's Final Position**
- Revised thesis incorporating all feedback
- What changed and why / what held firm and why

**Verdict — Moderator**
- Summarizes where the panel landed
- Flags unresolved tensions
- Recommends next action

---

## Ground Rules

1. **Everyone is building toward the best version of the idea, not killing it.** The goal is to sharpen, not destroy.
2. **The devil's advocate is constructive.** They find weak spots so the protagonist can fix them before the real audience finds them.
3. **Every agent speaks in their canonical voice.** Read agent profiles before writing. Burt is cocky and blunt. Phil is calm and non-motivational. Bo is short sentences, ops radio. Claudine is precise and threshold-based. Etc.
4. **Reference real data.** Agents pull from the full knowledge base — specific numbers, names, deal details, timeline pressure. No vague hand-waving.
5. **Agents can reason beyond the docs** — market dynamics, industry logic, psychology, competitive positioning, web research.
6. **The debate should feel genuinely contentious** — real tension, not staged agreement.

---

## Knowledge Base Protocol

Before staging a debate, the orchestrator must:

1. **Identify all relevant project files** and read them fully
2. **Build a file inventory table** mapping each file to its debate relevance
3. **Extract key facts** agents should reference (specific numbers, names, dates, quotes)
4. **Identify web research topics** agents can invoke for independent reasoning
5. **Surface the protagonist's existing work** — if they've already written a pitch/analysis, the debate starts from that, not from scratch

---

## Output

- **Format:** Single markdown document, war room transcript style
- **Location:** `.context/[topic]-debate.md`
- **Length:** ~4,000-5,000 words (substantial but readable)
- **Voice:** Each agent's documented personality and speech patterns
- **Reusability:** Debates can be refreshed by re-running with updated knowledge base / new intel

---

## Example: Kroger / Foran Debate (April 2026)

**Question:** "Is Brady OS exactly what Greg Foran needs?"

**Cast:** Project Shepherd (moderator), Claudine (protagonist), Phil (devil's advocate), Burt, Bo, Musashi San, Mason, Bertha, DiCaprio

**Knowledge base:** 19 files across Project - Kroger/ + retail ecosystem whitepaper

**Three angles argued:**
1. Should we pitch the OS itself to Foran — not just the playbook?
2. Is the playbook actually operator-grade, or consultant theater in OS language?
3. Does Brady OS give us a structural edge over McKinsey/BCG, or is that a story we tell ourselves?

**Central document:** `claudine-pitch-to-greg.md` — Claudine's three-part "Simplicity → Complexity → Simplicity" argument

**Key tension surfaced:** Brady OS system analysis rates governance as "best-in-class" but multi-user scalability as "weak" and financial ops as "missing." How does a solo-operator OS scale to a $150B company?
