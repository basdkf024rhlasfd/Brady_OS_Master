# mception.ai Publishing Rule

`mception.ai` is not a mirror of Brady OS.

It should surface only consulting projects that are explicitly approved for public presentation.

## Rule

- Default state for every project is `private`.
- A project is publishable on `mception.ai` only if it is listed in [`mception-ai-projects.yml`](mception-ai-projects.yml).
- Folder placement alone does not make a project public.
- Brady OS operating docs, agent libraries, and internal reference material are never public by default.

## Publishing Flow

1. Create or update the project folder in `1-execution/areas/work-and-business/programs/Consulting/`.
2. Fill out the `Publishing` section in the project file.
3. Add the project to `mception-ai-projects.yml` only after approval.
4. Have `mception.ai` read only from that allowlist.

## Intended Outcome

This keeps Brady OS as the internal source of truth while making `mception.ai` an explicit, curated public layer for selected consulting projects.
