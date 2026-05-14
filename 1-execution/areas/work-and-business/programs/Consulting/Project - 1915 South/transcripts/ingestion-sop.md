# Transcript & Research Ingestion SOP

**Owner:** Fran
**Scope:** Every meeting transcript (Otter), research artifact, email thread, or document Brady hands Fran for the 1915 South engagement.
**Goal:** A repeatable, objective method for deciding which sentences are saved, where they're saved, and how they're tagged — so nothing decision-grade gets lost in a chat summary, and nothing trivial bloats the corpus.

---

## 1. Operating principle

A transcript is not a record. The **scored, classified, routed output** is the record. Otter retains the audio/text; Fran's job is to atomize it into durable governance, facts, questions, and actions.

**Never paste a transcript into the corpus.** Atomize → score → route → tag.

---

## 2. The four-KPI rubric (0–3 each, 12 max)

Every distinct utterance (one speaker turn, broken at topic shifts) gets four scores.

### KPI-1: Specificity (0–3)
*Does the utterance contain concrete, citable anchors?*

| Score | Signal |
|---|---|
| 0 | No anchor — filler, agreement, hedging ("yeah," "right," "kind of") |
| 1 | Generic topic mention with no anchor ("we should look at ops") |
| 2 | Topic + one named anchor (one person, number, date, system, dollar figure, KPI) |
| 3 | Topic + two or more independent anchors ("Avalara sales tax goes live June 1, Josh owns provisioning, four systems total") |

### KPI-2: Project relevance (0–3)
*Does the utterance bear on 1915 South strategy, ops, people, comp, deals, AI, systems, or Brady's role/onboarding?*

| Score | Signal |
|---|---|
| 0 | Off-topic (weather, family chitchat) |
| 1 | Adjacent (Brady's background, generic industry observation) |
| 2 | Relevant context (peer comp, market, AGR-era story that informs 1915 South pattern) |
| 3 | Direct project impact (org change, deal, system, policy, person joining/leaving) |

### KPI-3: Durability (0–3)
*Will this still matter in 30+ days?*

| Score | Signal |
|---|---|
| 0 | Ephemeral (scheduling chatter, today-only logistics) |
| 1 | Transient (1–4 week horizon, will resolve on its own) |
| 2 | Medium-term (1–3 months — onboarding artifacts, system go-lives) |
| 3 | Structural (governance, doctrine, org design, M&A thesis, comp philosophy) |

### KPI-4: Decision influence (0–3)
*Does this change a recommendation Fran or Brady would make?*

| Score | Signal |
|---|---|
| 0 | No bearing on any decision |
| 1 | Sharpens an existing recommendation (more confidence, same direction) |
| 2 | Closes an open question or opens a new one (SFDR-worthy) |
| 3 | Creates a new directive, constraint, or scope change (Decision-Log-worthy) |

---

## 3. Save threshold

Two-gate logic — the second gate catches high-signal facts that would otherwise miss on aggregate.

**Save if either:**
- **Sum ≥ 5 across the four KPIs**, OR
- **Any single KPI scored 3** on Specificity or Decision-influence (high-signal anchor or directive-grade content)

**Discard otherwise.** Tag discards with one of:
- `discard:pleasantry` — greetings, agreement, social
- `discard:brady-self` — Brady talking about himself (only save when it reveals positioning Brady wants to standardize)
- `discard:filler` — verbal pauses, restating the prior speaker
- `discard:redundant` — duplicates a saved item earlier in the same call

---

## 4. Source-quality grade

Every save also gets a one-letter grade. Auxiliary, not part of the save/discard decision — used downstream to know how hard to lean on the cite.

| Grade | Meaning |
|---|---|
| A | Verbatim quote with speaker + timestamp |
| B | Close paraphrase from transcript |
| C | General sense extracted across multiple turns |
| D | Speaker's claim about a third party (Leah quoting Russell, Frank quoting Justin) — treat as **reported**, not confirmed, until corroborated |

Always prefer A; downgrade only when needed.

---

## 5. Destination routing

A saved utterance goes to one or more destinations. **Order of operations matters:** per-person corpus is the default; everything else is additive when applicable.

| Save type | Destination | Trigger |
|---|---|---|
| **Speaker's doctrine / preference / operating style** | `<speaker>-corpus.md` | Speaker is Justin / Russell / Frank / Leah / Amanda / Alyson / etc., AND Durability ≥ 2, AND Decision-influence ≥ 1 |
| **Fact about company / market / deal / system** | Notion Context Vault row | Specificity ≥ 2, Source grade A or B |
| **Brady-side decision or scope change** | `negotiation/` memo + Notion Decision Log | Decision-influence = 3, Brady is the actor |
| **New person or new role/title for known person** | Notion People DB | Person mentioned by name with role/relationship anchor |
| **Knowledge gap / follow-up needed** | Project SFDR + Notion Data Requests | Decision-influence ≥ 2 AND no current answer in corpus |
| **Action Brady owes** | Streaming Notes (Type=To Do, Next Action populated) | Action verb + Brady-owner + clear deliverable |
| **Artifact sent or requested** | Deliverable Log (Notion + `fran-SKILL.md` §L) | Artifact transmission mentioned by either party |

A single utterance can fan out to multiple destinations (e.g., a Justin quote in someone else's mouth → `justin-corpus.md` Reported tier + Context Vault row + potential SFDR for confirmation).

---

## 6. Closed taxonomy — tags

Pick from these. Don't invent new tags without appending them here first.

### People tags
`justin` · `russell` · `scott-turner` (founder, deceased) · `frank` · `leah` · `amanda` · `alyson` · `bo` (Dir Strategic Planning & Finance) · `josh` (IT/inventory) · `wayne` (analytics director) · `christie-grieve` (Frank's early manager) · `steve-king` (Frank's exec mentor) · `scott-training` (Director of Training) · `chad` (former CFO) · `kim` (former Merchandising, departed) · `melanie` (former exec, departed) · `todd-wanek` · `theo` (FrontlineIQ AI sales coach)

### Domain tags
`comp` · `org-design` · `onboarding` · `systems-erp` · `distribution` · `ai-analytics` · `sales` · `gmroi` · `m&a` · `financial` · `legal-hr` · `culture` · `strategy` · `brady-positioning` · `family-governance` · `real-estate`

### Type tags
`doctrine` · `fact` · `question` · `action` · `date` · `person` · `risk-flag` · `precedent`

### Status tags
`confirmed` · `asserted` · `reported` · `speculated`

---

## 7. Per-person corpus file template

Mirrors `justin-corpus.md` structure. One file per durable 1915 South operating exec (Justin, Russell, Frank, Leah, Amanda, Alyson).

Sections to maintain per person (only populate the ones with content):

1. Identity & tenure
2. Operating philosophy / leadership style
3. Domain ownership (what this person owns inside 1915 South)
4. Comp / org views (their statements about how the org should work)
5. AI / systems / tech posture
6. Relationships (Justin / Russell / peer-execs / Brady)
7. Brady-relevant signals (where they affect Brady's role, scope, or onboarding)
8. Outside-1915-South context (family, location, prior career)

Rules per `justin-corpus.md`:
- Append-only within each section, newer entries on top
- Every entry: date, source (Otter ID / email / doc), close-paraphrase or verbatim quote, **implication line**
- If corpus and Fran's recommendation conflict, corpus wins unless Brady overrides

---

## 8. Workflow per transcript

1. **Fetch transcript** via Otter (`get_user_info` → `search` → `fetch`).
2. **Identify speakers** explicitly. Otter often masks one side as "Unknown Speaker(s)" — cross-reference the calendar participants and content cues (name mentions, role mentions) to pin identity. **Never publish a corpus entry under a misidentified speaker.**
3. **Walk turn-by-turn.** A "turn" is one speaker-block in the transcript, optionally split at internal topic shifts. Score each turn with the four KPIs.
4. **Batch discards.** Don't enumerate every "yeah" — group consecutive low-scoring turns as one discard line.
5. **Route saves** to destinations per §5.
6. **Write per-person corpus updates** as the primary durable artifact. Cite Otter ID + timestamp on every entry.
7. **Open SFDRs** for any Decision-influence-2 gap (something the speaker asserted that Fran can't verify, or a fact that affects strategy and isn't in the corpus yet).
8. **Surface to Brady** at session end: top saves, new SFDRs, decisions worth logging, and items needing Brady's eyes.

---

## 9. What this SOP is NOT

- Not a summary tool — Otter already summarizes. Fran's atomization is the value-add.
- Not a sentiment analysis — keep it factual. Don't tag "Leah seems happy" or "Frank seems cynical." Tag what they said.
- Not a transcript editor — never alter the underlying transcript. The corpus references back to it via Otter ID.
- Not an auto-publish path. Corpus updates are private. Nothing here goes outside Brady's local + Notion private surfaces without explicit ask.

---

## 10. First application

`2026-05-14-classification.md` — Leah (32m) + Frank Pina (48m) intro calls. First trial of this rubric end-to-end.
