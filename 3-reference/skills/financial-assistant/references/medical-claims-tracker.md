# Medical Claims Tracker

Tracks medical and pharmacy expenses that may be eligible for UHC reimbursement, Aflac payouts, or other out-of-pocket claim submissions.

**Brady's UHC plan:** Choice Plus, Member ID 10875116500, Group 1747178 (via Food Innovations COBRA)  
**Aflac:** Supplemental — accident, illness, hospital confinement triggers  
**UHC claim deadline:** 1 year from date of service (flag at 9 months)

Finn populates new rows from Monarch CSV scans. Brady updates `claim_status` after submitting.

---

## Schema

| date | provider | amount | type | claim_status | insurer | submission_date | reimbursement_received | notes |
|------|----------|--------|------|-------------|---------|-----------------|----------------------|-------|
| YYYY-MM-DD | Merchant name | $X.XX | visit \| Rx \| copay \| lab \| therapy \| ER | pending \| submitted \| reimbursed \| ineligible | UHC \| Aflac \| N/A | YYYY-MM-DD or blank | $X.XX or blank | free text |

---

## Open Claims (pre-populated from Streaming Notes)

| date | provider | amount | type | claim_status | insurer | submission_date | reimbursement_received | notes |
|------|----------|--------|------|-------------|---------|-----------------|----------------------|-------|
| 2026-03-?? | Siloam Springs Clinic | $1,843.00 | visit | pending | UHC | — | — | Large March charge, specialty TBD. High priority. |
| 2026-02-01+ | Wellness & Courage (Jill) | ~$140/session | therapy | pending | UHC | — | — | Karissa's personal therapist. UHC Choice Plus covers outpatient mental health — need to ask Jill if she's in-network or will bill insurance directly. Action: call/email practice to request insurance billing setup. |
| 2026-02-01+ | Wellness & Courage (Johnna) | ~$140/session | therapy | pending | UHC | — | — | Couples therapist. Coverage varies — UHC may cover if coded as individual mental health. Ask Johnna about billing options. Couples therapy sometimes requires separate authorization. |
| 2026-?? | Walgreens | TBD | Rx | pending | UHC | — | — | Isla methylphenidate — confirm copay amount from Monarch |
| 2026-?? | Walmart Pharmacy | TBD | Rx | pending | UHC | — | — | Brady Vyvanse — currently Tier 3 ($70+), formulary exception in progress |
| TBD | Various | TBD | various | pending | Aflac | — | — | Open Aflac claim from Streaming Notes — Brady to identify qualifying event |

---

## How to submit to UHC

1. Gather EOB (Explanation of Benefits) from UHC member portal — log in at `uhc.com` with Member ID 10875116500
2. If no EOB exists (out-of-network or unpaid claim), gather: itemized bill from provider + proof of payment (Monarch screenshot or receipt)
3. Submit via UHC online portal → Claims → Submit a Claim → Medical
4. Track confirmation number here in `notes` column
5. Reimbursement typically 10–30 days by check or EFT

## How to submit to Aflac

1. Identify qualifying event: ER visit, hospital admission, surgery, cancer diagnosis, accident
2. Log in at `aflac.com` with Brady's policyholder credentials
3. Submit claim with: attending physician statement, hospital/ER records, itemized bill
4. Aflac pays Brady directly (not provider) — log reimbursement_received when check arrives

---

## Finn's standing watch rule

In every `morning-summary` and `weekly-summary`, surface any medical charges from the last 30 days (Monarch category = Medical, Pharmacy, Health & Fitness, amount > $20) that are not in this tracker with `claim_status` = submitted or reimbursed.

Flag URGENT for any row where date of service is > 9 months ago and status is still pending.
