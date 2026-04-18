# mception.ai Publishing Rule

`mception.ai` is not a mirror of Brady OS.

It should surface only consulting projects that are explicitly approved for public presentation.

## Rule

- Default state for every new project or slug is `private`.
- The enforcement source of truth for new publication eligibility is [`portal/src/config/projects.yml`](../../portal/src/config/projects.yml).
- "Publish to `mception.ai`" means both policy approval and inclusion in that allowlist.
- A project may be newly published on `mception.ai` only if it is a consulting project, its project file has a completed `Publishing` section, and it is listed in [`portal/src/config/projects.yml`](../../portal/src/config/projects.yml).
- Existing public slugs may be maintained without being treated as new publication requests only when the same slug is already live in production and the work does not broaden visibility beyond what is already public.
- If a project is not listed in the allowlist, it is private for any new publication or visibility expansion.
- If an already-live public slug is missing from the allowlist, treat that as documentation drift to reconcile rather than a reason to block maintenance of that same live slug.
- If the allowlist cannot be read, parsed, or validated, `mception.ai` must fail closed for new publication decisions and visibility expansions.
- Folder placement alone does not make a project public.
- Brady OS operating docs, agent libraries, and internal reference material are never public by default.

## Publishing Flow

1. Create or update the project folder in `1-execution/areas/work-and-business/programs/Consulting/`.
2. Fill out the `Publishing` section in the project file.
3. If this is a new public slug or a visibility expansion, approve the project for publication.
4. Add the project slug to `mception-ai-projects.yml` only after approval.
5. Existing production slugs may be maintained at the same route without re-approval if they are already live and the update does not broaden visibility.
6. Have `mception.ai` use the allowlist as the gate for new publication decisions.
7. If the allowlist is unavailable or invalid, surface no newly publishable projects until it is fixed.

## Intended Outcome

This keeps Brady OS as the internal source of truth while making `mception.ai` an explicit, curated public layer for selected consulting projects, without blocking maintenance of production slugs that are already public.
