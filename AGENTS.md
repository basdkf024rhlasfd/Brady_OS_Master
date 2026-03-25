# Repo Instructions

## mception.ai Publishing

- `mception.ai` is a curated client-facing layer, not a mirror of Brady OS.
- All projects are private by default unless they are already live on `mception.ai`.
- A project may be newly published on `mception.ai` only if:
  1. it is a consulting project,
  2. its project file includes a completed `Publishing` section,
  3. its slug is added to `3-reference/publishing/mception-ai-projects.yml` after approval.
- Agents may update an already-live `mception.ai` slug without treating it as a new publication request only if:
  1. the same slug already exists publicly in production,
  2. the work updates that same slug rather than creating a new slug or public surface,
  3. the change does not broaden visibility beyond what is already live.
- Folder placement alone does not make a project public.
- Brady OS operating docs, agent libraries, and internal reference material are never public by default.
- If an already-live slug is missing from the allowlist, treat that as documentation drift to reconcile, not a reason to block maintenance of that same live slug.
- When an agent is asked to "publish to mception.ai" or "make this available on mception.ai", it must check the allowlist in `3-reference/publishing/mception-ai-projects.yml` and treat absence from that allowlist as `private` for any new publication or visibility expansion.
- If the allowlist cannot be read or validated, agents must fail closed for any new publication or visibility expansion. Existing production maintenance may proceed only when the slug is independently verified as already live and the work does not broaden visibility.
