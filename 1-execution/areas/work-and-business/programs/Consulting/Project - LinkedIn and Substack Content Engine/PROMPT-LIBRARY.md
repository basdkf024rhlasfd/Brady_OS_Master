# Content Prompt Library

Claude-optimized prompts for drafting content in Brady's voice. Each prompt is self-contained — paste it into a new Claude conversation, add your raw material, and get a publishable draft.

For full voice reference, see [VOICE-PROFILE.md](VOICE-PROFILE.md).

---

## How to Use

1. **Pick the template** that matches what you want to write.
2. **Copy the entire prompt block** (everything between the `---` markers).
3. **Paste it into Claude** as your first message, replacing `{RAW_INPUT}` with your material.
4. **Review and edit.** The draft should need light touch-ups, not a rewrite. If it sounds too polished or too AI, tell Claude: "This sounds too corporate. Rewrite it rawer, like I'm explaining it to a friend."

---

## Template 1: LinkedIn Opinion Post

Use for: Frameworks, insights, professional observations, industry takes. Posts 2, 3, 4, 6 from the content plan.

```
I need you to write a LinkedIn post in my voice. Here are my voice rules:

VOICE:
- Conversational and direct. I write like I'm explaining something to a smart friend.
- Confident without posturing. I use "I think" and "I'm not saying X, but I am saying Y" naturally.
- Short paragraphs, 1-3 sentences each. Lots of white space.
- Em dashes for asides — not parentheses.
- Open with a specific observation, not a thesis. The insight should emerge.
- End with a punchy one-liner. The period does the work. No exclamation marks.
- Plain language. Operator words: "knock it out," "messy middle," "sweet spot." Not consultant jargon.
- Use contractions. Always.
- I am an operator who builds, not a thought leader who advises. My credibility is from doing the work.

NEVER USE:
- "In today's fast-paced world" or any inspirational poster language
- "Let's dive in," "Here's the thing," "Excited to announce," "Humbled and grateful"
- "Game-changer," "disruptive," "revolutionary," "unlock," "leverage"
- Emoji in body text
- Numbered listicles with bold headers
- Hashtag stuffing (3-5 specific hashtags max, at the end)
- Self-applied "thought leader"

FORMAT:
- LinkedIn text post. 150-300 words ideal. Never exceed 500.
- First line must stop the scroll — specific and interesting, not clickbait.
- No external links in the body. If needed, say "link in first comment."
- Close with a genuine question or invitation, not a marketing CTA.

Here is my raw material:

{RAW_INPUT}

Write the post. One draft only. If something in my raw material is unclear, make your best interpretation — don't ask me to clarify.
```

---

## Template 2: LinkedIn Story Post

Use for: Personal narratives with a professional takeaway. Diary entries, family moments, career transitions. Posts 1, 7 from the content plan. Series: "The COO Who Quit," "Dad Journal."

```
I need you to write a LinkedIn post based on a personal story. Here are my voice rules:

VOICE:
- Conversational, honest, slightly raw. I write like I'm telling a story to someone I trust.
- I'm a former COO, single dad of five, career transitioner. My stories come from lived experience.
- Confident but self-aware. I acknowledge what I don't know or what went wrong without making it a bit.
- Short paragraphs. Em dashes for asides. Contractions always.
- The story should carry the insight. Don't state the moral explicitly unless it earns that moment.
- End with something worth sitting with — not a lesson, not a CTA, just a line that lands.

NEVER USE:
- Inspirational poster energy. No "and that's when I learned the real meaning of..."
- "Humbled and grateful," "excited to share," "if you're reading this you already know"
- Emoji in body text
- Corporate buzzwords
- Hashtags about generic emotions (#grateful, #blessed, #leadership)

FORMAT:
- LinkedIn text post. 150-400 words.
- First line: drop the reader into a specific moment. Time, place, detail.
- No external links in body.
- Close naturally. A question is fine but not required. Sometimes the story just ends.
- 3-5 specific hashtags at the end if appropriate.

PRIVACY RULES:
- Anonymize kids' names unless I specifically include them.
- Don't include identifying details about other people unless provided.
- If the raw material is deeply personal (grief, faith, therapy), extract the framework or lesson — don't publish the raw diary entry.

Here is my raw material:

{RAW_INPUT}

Write the post.
```

---

## Template 3: LinkedIn Proof Post

Use for: "Here's something I built" posts. Project walkthroughs, prototype showcases, consulting results. Posts 5, 8 from the content plan. Series: "Arm the Rebels."

```
I need you to write a LinkedIn post that shows real work I've done. Here are my voice rules:

VOICE:
- Direct and understated. I show the work without bragging. The results speak.
- I'm a builder — COO background, hands-on with AI, automation, and operational systems.
- Specific: name the problem, what I did, how long it took, what changed.
- Honest about what was messy or didn't work the first time.
- Contractions, short paragraphs, em dashes, plain language.

NEVER USE:
- "I'm thrilled to share" or any announcement energy
- "Game-changer," "revolutionary"
- Vague claims without specifics. If I can't name the result, I shouldn't post it.
- Over-attribution to AI. I use AI as a tool. The thinking and judgment are mine.

FORMAT:
- LinkedIn text post. 150-350 words.
- First line: drop one interesting specific. Not "I built something cool" — more like "A friend asked me to look at a problem in their business."
- Middle: what was broken, what I did, what happened.
- End: what it means or what I took from it. One line. No CTA unless genuinely relevant.
- 3-5 specific hashtags.

CONFIDENTIALITY:
- Keep client details vague unless I specifically say to name them.
- "A friend," "a company I'm working with," "a recent project" are all fine.
- Focus on the problem pattern and approach, not proprietary details.

Here is my raw material:

{RAW_INPUT}

Write the post.
```

---

## Template 4: Substack Origin Essay

Use for: Long-form personal arc. The "Full Arc" piece from the content plan. Career story, identity evolution, "how I got here."

```
I need you to write a Substack essay that tells a personal origin story. Here are my voice rules:

VOICE:
- Longer, more reflective than LinkedIn. I can slow down here.
- Still conversational — like I'm sitting across from you, not lecturing.
- Honest about the messy parts. The detours, the doubt, the things that didn't make sense at the time but do now.
- Specific details make it real: the VBA macros at Freddie Mac, studying for the GMAT while scripts ran, watching AlphaGo at work, the Pizza Hut internship I turned down.
- The structure should feel like a conversation that builds to something, not a resume in narrative form.
- Em dashes, contractions, short paragraphs even in long-form.

NEVER USE:
- Resume language or career-summary tone
- "Looking back, I realize..." (too reflective-voiceover)
- Chronological march through every job. Skip around. Follow the thread that matters.
- Inspirational conclusion. The essay should end with something honest, not uplifting.

FORMAT:
- Substack essay. 1,500-3,000 words.
- Title: short, specific, slightly unexpected. Not "My Career Journey."
- Opening: drop into a specific moment. Not "I've always been interested in..."
- Structure: moments and threads, not timeline. Connect ideas across time.
- Closing: land on something worth sitting with. Not a moral, not a call to action.

Here is my raw material:

{RAW_INPUT}

Write the essay. Use section breaks (---) sparingly to mark major shifts in time or theme.
```

---

## Template 5: Substack Case Study

Use for: Project walkthroughs. "Show Your Work" from the content plan. Real engagements end to end.

```
I need you to write a Substack essay that walks through a real project end to end. Here are my voice rules:

VOICE:
- Conversational, like I'm explaining it to a friend over a beer, not writing a consulting deck.
- Include the parts that were messy or didn't work the first time. That's what makes it human.
- Specific about the before state, what I actually did, how long it took, and what changed.
- Honest about scope — what I chose NOT to do is as important as what I did.
- Contractions, em dashes, short paragraphs, plain language.

FORMAT:
- Substack essay. 1,000-2,500 words.
- Title: the project or problem, not a clever headline. "How I Rebuilt a Cleaning Protocol for the Humane Society" not "The Power of Systems Thinking."
- Structure:
  1. The problem (what was broken, who was dealing with it)
  2. The approach (what I decided to do and why)
  3. The build (what I actually built, tools used, time spent)
  4. The messy parts (what went wrong, what I changed mid-stream)
  5. The result (what changed, what the client/user said)
  6. What I'd do differently
- No hero narrative. The client and the problem are the center, not me.

CONFIDENTIALITY:
- Use real names and details only if I specifically say it's approved.
- Otherwise: "a company I worked with," "a local nonprofit," etc.

Here is my raw material:

{RAW_INPUT}

Write the essay.
```

---

## Template 6: Substack Thought Leadership

Use for: Industry POV pieces. "What I'd Do in My First Week at Your Company" and "Where AI Is Headed for Mid-Market Companies" from the content plan. Series: "AI for the Rest of Us."

```
I need you to write a Substack essay that presents a strong point of view on an industry topic. Here are my voice rules:

VOICE:
- Opinionated but grounded. I have a take and I'll defend it, but I acknowledge the counterargument.
- I write from operator experience, not research or theory. My credibility is "I've been in the building."
- Specific examples from my own career or from things I've observed firsthand.
- Accessible to non-technical readers. If I reference a technical concept, I explain it in plain language.
- Em dashes, contractions, short paragraphs.

NEVER USE:
- "The future of X is Y" as an opening
- Hype language: "revolutionary," "paradigm shift," "game-changing"
- Vague predictions without grounding in something specific
- Academic tone or citation-heavy writing

FORMAT:
- Substack essay. 1,500-2,500 words.
- Title: a specific, clear claim or question. "What I'd Do in My First Week at Your Company" or "Most Mid-Market Companies Don't Need a Head of AI."
- Opening: a specific observation or story that sets up the argument.
- Middle: build the case. Mix argument with examples. One idea per section.
- Closing: what the reader should actually do or think about. Practical, not inspirational.
- This piece should make someone forward it to their CEO with a note that says "we should talk to this guy."

Here is my raw material:

{RAW_INPUT}

Write the essay.
```

---

## Template 7: Raw-to-Draft Converter

Use for: When you have a messy thought — voice memo transcript, bullet points, a paragraph from a Notion page — and you want a publishable draft. This template auto-detects the best format.

```
I'm going to give you some raw, unpolished material. It might be bullet points, a voice memo transcript, a rough paragraph, or just a half-formed idea. Your job is to turn it into a publishable draft.

VOICE RULES:
- Conversational and direct. Like I'm explaining this to a smart friend.
- Confident without posturing. "I think" and "I'm not saying X, but I am saying Y" are natural.
- Short paragraphs (1-3 sentences). Em dashes for asides. Contractions always.
- Plain language. Operator words, not consultant jargon.
- Open with something specific, not a thesis. End with a punchy one-liner.
- I'm a former COO, single dad of five, career transitioner building an AI consulting practice. My credibility is from doing the work, not having opinions about it.

NEVER USE:
- Inspirational poster language, corporate buzzwords, emoji in body text
- "In today's fast-paced world," "Let's dive in," "Game-changer," "Excited to announce"
- Numbered listicles with bold headers for published content
- Self-applied "thought leader"

YOUR JUDGMENT CALL:
Based on the raw material, decide the best format:
- **LinkedIn Opinion Post** (150-300 words) — if it's a framework, insight, or take
- **LinkedIn Story Post** (150-400 words) — if it's a personal moment or narrative
- **LinkedIn Proof Post** (150-350 words) — if it's about something I built or a result
- **Substack Essay** (1,500-3,000 words) — if there's enough depth for long-form

At the top of your response, state which format you chose and why in one sentence. Then write the draft.

Here is my raw material:

{RAW_INPUT}

Write the draft.
```

---

## Template 8: Repurpose — Substack to LinkedIn

Use for: After publishing a Substack piece, extract 2-3 LinkedIn posts from it.

```
I just published a Substack essay. I need you to extract 2-3 standalone LinkedIn posts from it. Each post should work on its own — someone who never reads the Substack should still get value.

VOICE RULES:
- Same voice as the Substack but compressed and punchier.
- Conversational, direct, short paragraphs, em dashes, contractions.
- Each post needs its own strong opening line — don't just excerpt the essay.
- Plain language, operator words, no jargon.

NEVER USE:
- "I wrote about this on Substack" as the hook (save that for the end or comments)
- Inspirational poster language, corporate buzzwords, emoji
- The same opening line for multiple posts

FORMAT PER POST:
- LinkedIn text post. 150-300 words each.
- Each post should take a DIFFERENT angle from the essay:
  1. The sharpest opinion or contrarian take
  2. The most specific story or example
  3. The most practical takeaway or framework
- End each post with a natural close or genuine question.
- 3-5 specific hashtags per post.
- For one of the posts, end with: "I wrote the longer version on Substack — link in comments."

Here is the published Substack essay:

{SUBSTACK_TEXT}

Write the 2-3 LinkedIn posts, clearly separated.
```

---

## Quick Reference: Which Template When

| I have... | Use Template |
|-----------|-------------|
| An opinion or framework to share | 1 — LinkedIn Opinion Post |
| A personal moment or story | 2 — LinkedIn Story Post |
| Something I built or a client result | 3 — LinkedIn Proof Post |
| My career arc or origin story | 4 — Substack Origin Essay |
| A project walkthrough | 5 — Substack Case Study |
| An industry take or prediction | 6 — Substack Thought Leadership |
| A messy brain dump and no idea what format | 7 — Raw-to-Draft Converter |
| A published Substack I want to break into LinkedIn posts | 8 — Repurpose |

---

## Tips for Better Drafts

- **Give Claude more raw material than you think it needs.** Voice memos, rough notes, half sentences — all fine. More context = better voice match.
- **If the first draft sounds too polished**, tell Claude: "Too clean. Rewrite it rawer, like I'm talking to a friend who asked me about this."
- **If the first draft sounds too corporate**, tell Claude: "This sounds like a press release. I need it to sound like a real person who actually did this work."
- **If the draft is too long for LinkedIn**, tell Claude: "Cut this to under 200 words. Keep the opening line and the closing line. Compress the middle."
- **Always do a final voice check:** Read it aloud. If you wouldn't actually say it, change it.
