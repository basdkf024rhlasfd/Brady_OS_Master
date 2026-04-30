# Insurance Source Documents

Authoritative source documents for Brady's insurance coverage. The indexed
benefit schedules in `../aflac-coverage.md` (and future `uhc-coverage.md`,
`dental-coverage.md`) are derived from these PDFs. Always cross-reference these
sources for legal/contractual specifics.

## Aflac (Group Voluntary, via Food Innovations Inc / TriNet PEO)

`aflac/`
- `Accident_High_Plan-COC-01.01.2025-12.31.2025.pdf` — Full Certificate of
  Coverage for Accident High Plan (42 pp). Authoritative legal contract.
  Use for: exclusions, definitions, state-specific provisions, claim filing
  procedures, exact benefit-trigger language.
- `Accident_High_Plan-SBC-01.01.2025-12.31.2025.pdf` — Summary of Benefits and
  Coverage for Accident High Plan (11 pp). Use for: at-a-glance benefit
  schedule. Quoted in `aflac-coverage.md`.
- `Critical_Illness_40k-SBC-01.01.2025-12.31.2025.pdf` — Summary of Benefits
  and Coverage for Critical Illness $40K Plan (10 pp). Use for: condition list
  and payout percentages. Quoted in `aflac-coverage.md`.
- `OVERVIEW OF BENEFITS.v2.docx` — Food Innovations Inc employer-level
  benefits overview. Identifies Food Innovations as the employer (TriNet is
  the PEO administrator).
- `TriNet_III_Open Enrollment Guide.pdf` — TriNet 2022 enrollment guide
  (16 pp). Historical reference for plan structure; current plan year
  follows calendar year.

## How Finn uses these

When Brady asks an Aflac/medical coverage question:
1. **First check** `../aflac-coverage.md` for the answer (markdown index, fast)
2. **If missing or ambiguous**, read the relevant page(s) of the source PDF
   here using the Read tool with PDF page ranges
3. **For exclusions/legal language**, always cite the COC, not the SBC
4. **For benefit amounts**, the SBC summary is sufficient and is what's
   indexed in `aflac-coverage.md`
