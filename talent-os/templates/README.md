# Templates

Fill-in scaffolds the skills produce. You rarely touch these directly — a skill loads the
relevant template, fills the `{{placeholders}}`, and writes the finished artifact to
`deliverables/`. They're here so outputs are consistent and so you can tune the house format once.

| Template | Used by |
|---|---|
| `jd-template.md` | `jd-optimizer` |
| `scorecard-template.md` | `interview-guide-builder`, `candidate-screener` |
| `interview-guide-template.md` | `interview-guide-builder` |
| `phone-screen-script-template.md` | `phone-ai-interviewer` |
| `30-60-90-template.md` | `onboarding-ramp` |
| `comp-band-template.md` | `total-rewards` |

**To change the house format** (e.g. add a field to every JD), edit the template — every future
run inherits it. Placeholders are `{{like this}}`; `<!-- comments -->` are guidance the skill
deletes from the final artifact.
