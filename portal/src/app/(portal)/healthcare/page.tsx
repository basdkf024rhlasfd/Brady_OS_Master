"use client";

import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/* Data — sourced from the 1915 South Family Benefits Handbook (Jul 2026) */
/* ------------------------------------------------------------------ */

interface Contact {
  need: string;
  who: string;
  phone?: string;
  site?: string;
  email?: string;
  urgent?: boolean;
}

const CONTACTS: Contact[] = [
  {
    need: "A medical bill looks wrong / \"balance bill\"",
    who: "ClaimDOC (our advocates)",
    phone: "888-330-7295",
    email: "balancebills@claim-doc.com",
  },
  {
    need: "Find a doctor / introduce our plan to a new doctor",
    who: "ClaimDOC",
    phone: "888-330-7295",
    site: "portal.claim-doc.com",
  },
  {
    need: "Check medical coverage, deductible, claims",
    who: "HealthSCOPE Benefits (HSB)",
    phone: "844-600-0920",
    site: "healthscopebenefits.com",
  },
  {
    need: "Doctor's office wants to verify our insurance",
    who: "HSB provider line",
    phone: "844-600-0921",
  },
  {
    need: "Prescription questions / refills / mail order",
    who: "Optum Rx",
    site: "optumrx.com",
  },
  {
    need: "Sick now, need a doctor fast (non-emergency)",
    who: "Teladoc",
    phone: "800-835-2362",
    site: "teladochealth.com",
  },
  {
    need: "Dental",
    who: "Unum Dental",
    phone: "888-400-9304",
    site: "unumdentalcare.com",
  },
  {
    need: "Vision (eye exam / glasses)",
    who: "VSP (Sun Life)",
    phone: "800-877-7195",
    site: "vsp.com",
  },
  {
    need: "Accident insurance claim (cash payout)",
    who: "Sun Life",
    phone: "800-247-6875",
    site: "sunlife.com/us",
  },
  {
    need: "A real emergency",
    who: "911 / nearest ER — go, then call ClaimDOC after",
    phone: "911",
    urgent: true,
  },
];

const GOLDEN_RULES = [
  "NEVER pay a medical bill the moment it arrives. Wait for the EOB (Explanation of Benefits) from HealthSCOPE — it shows the real amount we owe.",
  "Only pay the \"Patient Responsibility\" amount on the EOB — not whatever the provider's invoice says. Anything above that is a \"balance bill\" and we do not owe it.",
  "If a bill and the EOB don't match, call ClaimDOC (888-330-7295). They fight the provider for us, for free. Don't argue with the provider yourself.",
  "Before seeing a NEW doctor, \"nominate\" them to ClaimDOC first (portal.claim-doc.com) so they \"Pave the Way\" with the office.",
  "There is no network. Any doctor, specialist, clinic, or hospital works — all covered care is paid at the same (highest) level, as long as they bill HealthSCOPE.",
];

interface Scenario {
  q: string;
  steps: string[];
}

const SCENARIOS: Scenario[] = [
  {
    q: "A medical bill shows up in the mail",
    steps: [
      "Don't pay yet. Wait for the EOB from HealthSCOPE (mail or healthscopebenefits.com).",
      "Compare the bill to the EOB. Pay only the \"Patient Responsibility\" amount on the EOB.",
      "If the bill is higher than the EOB says, it's a balance bill — forward it to balancebills@claim-doc.com or call 888-330-7295. Never argue with the provider yourself.",
    ],
  },
  {
    q: "We need to see a NEW doctor or specialist",
    steps: [
      "First nominate them to ClaimDOC (portal.claim-doc.com or 888-330-7295) so they \"Pave the Way\" — an advocate calls the office ahead of time.",
      "Then book the appointment. There's no network, so you can pick anyone.",
      "If the office asks \"what network?\" — it's open-access, no network; claims go to HealthSCOPE Benefits. If they hesitate, have them call ClaimDOC.",
    ],
  },
  {
    q: "Someone is sick tonight / on a weekend (not an emergency)",
    steps: [
      "Teladoc: 800-835-2362 or the Teladoc app — a doctor by phone/video, 24/7. They can prescribe if needed.",
      "Or use a local urgent care (nominate it to ClaimDOC first if you can).",
      "Good for: flu, colds, sinus infections, pink eye, rashes. Not for emergencies.",
    ],
  },
  {
    q: "It's a REAL emergency",
    steps: [
      "Call 911 or go straight to the nearest ER. Don't wait, don't call anyone first.",
      "Deal with billing afterward — the wait-for-the-EOB and balance-bill rules still apply, and ClaimDOC handles it.",
    ],
  },
  {
    q: "We need a prescription or a refill",
    steps: [
      "Use optumrx.com or the Optum Rx app (register with the member ID card).",
      "For daily/maintenance meds (blood pressure, cholesterol, etc.), switch to 90-day home delivery — free shipping, usually cheaper, auto-refills.",
      "Ask for generics / Tier 1 drugs to save. Some ACA-preventive meds are $0.",
    ],
  },
  {
    q: "Someone needs a cleaning, filling, or braces",
    steps: [
      "Unum Dental: unumdentalcare.com / 888-400-9304. You can see any dentist, but in-network costs less and they file claims for you.",
      "Preventive (cleanings, exams, x-rays) is covered 100% with no waiting period.",
      "Major work (crowns, bridges, implants) is 60% and has a 12-month waiting period. Kids' orthodontics: 50%, $1,000 lifetime max.",
    ],
  },
  {
    q: "Someone needs an eye exam or glasses",
    steps: [
      "VSP: find a doctor at vsp.com (choose the Choice network) or call 800-877-7195. No ID card needed in-network — just say you're a VSP member.",
      "Eye exam: $10 copay (1 per 12 months). Lenses: $25 copay. Frames: $150 allowance every 24 months.",
      "Contacts instead of glasses: $60 fitting + $150 allowance. Shop online at eyeconic.com. Stay in-network — out-of-network reimburses much less.",
    ],
  },
  {
    q: "Someone has an accident (broken bone, ER, stitches)",
    steps: [
      "Get treated first — medical plan rules apply as normal.",
      "Then file a Sun Life accident claim (sunlife.com/us / 800-247-6875) for a CASH payout paid directly to us, on top of everything else.",
      "Examples: hospital admission $1,000, ambulance $300, broken leg $1,000–$2,000, ER visit $200.",
      "Don't forget: $50 wellness benefit per person per year — claim it after any annual physical, bloodwork, or screening.",
    ],
  },
  {
    q: "A doctor's office says \"we don't take your insurance\"",
    steps: [
      "Tell them: it's an open-access, self-funded plan — no network. All covered services are paid at the highest benefit level.",
      "Claims go to HealthSCOPE Benefits (EDI Payor ID 40026; PO Box 30962, Salt Lake City, UT 84130). Eligibility: 844-600-0921.",
      "If they're still unsure, have them call ClaimDOC at 888-330-7295. ClaimDOC handles reluctant offices all the time.",
    ],
  },
];

interface Plan {
  icon: string;
  name: string;
  carrier: string;
  facts: { label: string; value: string }[];
  note?: string;
}

const PLANS: Plan[] = [
  {
    icon: "🩺",
    name: "Medical",
    carrier: "1915 South self-funded · HealthSCOPE + ClaimDOC",
    facts: [
      { label: "Deductible", value: "$2,500 person / $5,000 family" },
      { label: "Out-of-pocket max", value: "$7,000 person / $14,000 family (includes pharmacy)" },
      { label: "Copays", value: "None — everything runs through deductible + coinsurance" },
      { label: "Preventive care", value: "$0 — covered 100%" },
      { label: "Network", value: "None — open access, any provider" },
      { label: "Plan year resets", value: "October 1" },
    ],
    note: "Still to confirm with HR: exact coinsurance % and monthly premium.",
  },
  {
    icon: "💊",
    name: "Pharmacy",
    carrier: "Optum Rx",
    facts: [
      { label: "Retail", value: "Most major pharmacies (93%+ of U.S.)" },
      { label: "Home delivery", value: "90-day supply of daily meds, free shipping — usually cheapest" },
      { label: "Counts toward", value: "The same medical out-of-pocket max (integrated)" },
      { label: "Save money", value: "Ask for generics / Tier 1; some preventive meds are $0" },
    ],
  },
  {
    icon: "📱",
    name: "Teladoc",
    carrier: "24/7 phone/video doctor",
    facts: [
      { label: "Treats", value: "Flu, colds, sinus infections, pink eye, rashes — non-emergencies" },
      { label: "Prescriptions", value: "Yes, they can send one if needed" },
      { label: "Contact", value: "800-835-2362 · Teladoc app" },
      { label: "Not for", value: "Emergencies or international travel" },
    ],
  },
  {
    icon: "🦷",
    name: "Dental",
    carrier: "Unum Dental",
    facts: [
      { label: "Preventive (cleanings, exams, x-rays)", value: "100%, no waiting period" },
      { label: "Basic (fillings, extractions, root canals)", value: "100% (PPO) or 80% (MAC)" },
      { label: "Major (crowns, bridges, implants)", value: "60% — 12-month waiting period" },
      { label: "Orthodontics (kids to 19)", value: "50%, $1,000 lifetime max" },
      { label: "Deductible", value: "$50 (waived for preventive; max 3/family)" },
    ],
    note: "Confirm which plan we elected — PPO ($2,000/yr max) vs MAC ($1,000/yr max).",
  },
  {
    icon: "👓",
    name: "Vision",
    carrier: "VSP / Sun Life · Plan 3 · Policy #956845",
    facts: [
      { label: "Eye exam", value: "$10 copay · 1 per 12 months" },
      { label: "Lenses", value: "$25 copay · 1 per 12 months" },
      { label: "Frames", value: "$150 allowance + 20% off the rest · every 24 months" },
      { label: "Contacts (instead of lenses)", value: "$60 fitting + $150 allowance" },
      { label: "Dependents", value: "Covered to age 26" },
    ],
    note: "Use VSP Choice network doctors (vsp.com) — out-of-network pays far less back.",
  },
  {
    icon: "🩹",
    name: "Accident",
    carrier: "Sun Life · Policy #956845",
    facts: [
      { label: "What it is", value: "Cash paid to US (not the doctor) after a covered accident — on top of all other coverage" },
      { label: "Hospital admission / per day", value: "$1,000 / $250 per day" },
      { label: "Ambulance ground / air", value: "$300 / $1,000" },
      { label: "Broken leg", value: "$1,000–$2,000" },
      { label: "Wellness benefit", value: "$50 per person per year — claim after any physical or screening" },
    ],
    note: "File at sunlife.com/us or 800-247-6875. Covers accidents 24/7 — work, home, or away.",
  },
];

const PLAN_IDS = [
  { label: "Medical Member ID", value: "54473495" },
  { label: "Medical Group #", value: "76417782 (1915 South Co)" },
  { label: "HealthSCOPE member portal", value: "member-hsb.tpa.com" },
  { label: "Dental / Vision / Accident policy #", value: "956845 (Sun Life)" },
  { label: "Claims address", value: "PO Box 30962, Salt Lake City, UT 84130" },
  { label: "EDI Payor ID", value: "40026" },
];

const CHECKLIST = [
  "Create HealthSCOPE account (app + web) and add ID card to phone wallet",
  "Register on the ClaimDOC portal and add all family members",
  "Nominate our current doctors/dentist so they're \"paved\" before the next visit",
  "Set up Optum Rx account; move daily meds to 90-day home delivery",
  "Save all the numbers from the quick-reference card into both our phones",
  "Confirm the coinsurance % and monthly premium (HR/payroll or 844-600-0920)",
  "Confirm which dental plan (PPO vs MAC) we elected",
  "Set a reminder to claim the $50 Sun Life wellness benefit after each annual physical",
];

const CHECKLIST_KEY = "healthcare-setup-checklist";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HealthcarePage() {
  const [openScenario, setOpenScenario] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST.map(() => false));

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  function toggleChecked(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const doneCount = checked.filter(Boolean).length;

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Family
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Healthcare</h1>
        <p className="text-sm text-muted-foreground mt-1">
          The Smallwood family benefits, in plain English — medical, prescriptions, dental,
          vision &amp; accident. Plan year resets every October 1.
        </p>
      </div>

      {/* The One Rule banner */}
      <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5">
        <p className="text-sm font-semibold text-foreground">
          ⚠️ The one rule that matters most
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          Our plan has <span className="text-foreground font-medium">no insurance network</span>,
          so bills sometimes look scary at first.{" "}
          <span className="text-foreground font-medium">
            Never pay a medical bill the moment it arrives.
          </span>{" "}
          Wait for the EOB from HealthSCOPE, pay only the &ldquo;Patient Responsibility&rdquo;
          amount, and send anything that doesn&rsquo;t match to ClaimDOC (
          <a href="tel:888-330-7295" className="underline underline-offset-2 text-foreground">
            888-330-7295
          </a>
          ). They fight bills for us, for free.
        </p>
      </div>

      {/* What do I do when… */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Start here
        </h2>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          &ldquo;What do I do when&hellip;&rdquo;
        </h3>
        <div className="space-y-2">
          {SCENARIOS.map((s, i) => {
            const open = openScenario === i;
            return (
              <div
                key={s.q}
                className="rounded-xl bg-card border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenScenario(open ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">&hellip;{s.q}?</span>
                  <span className="text-muted-foreground text-xs shrink-0">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <ol className="px-5 pb-4 space-y-2">
                    {s.steps.map((step, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-foreground">
                          {j + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick-reference card */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Who to call — quick reference
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div
              key={c.need}
              className={`rounded-xl p-4 border ${
                c.urgent
                  ? "border-red-400/40 bg-red-400/10"
                  : "bg-card border-white/10"
              }`}
            >
              <p className="text-xs text-muted-foreground">{c.need}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{c.who}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs">
                {c.phone && (
                  <a
                    href={`tel:${c.phone}`}
                    className="text-accent-brand underline underline-offset-2"
                  >
                    {c.phone}
                  </a>
                )}
                {c.site && (
                  <a
                    href={`https://${c.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-brand underline underline-offset-2"
                  >
                    {c.site}
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="text-accent-brand underline underline-offset-2 break-all"
                  >
                    {c.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Golden rules */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          The 5 golden rules
        </h2>
        <div className="rounded-xl bg-card border border-white/10 p-5">
          <ol className="space-y-3">
            {GOLDEN_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-300">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{rule}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Coverage at a glance */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Coverage at a glance
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-xl bg-card border border-white/10 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl leading-none">{p.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{p.carrier}</p>
                </div>
              </div>
              <dl className="space-y-1.5">
                {p.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-3 text-xs">
                    <dt className="text-muted-foreground shrink-0">{f.label}</dt>
                    <dd className="text-foreground font-medium text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {p.note && (
                <p className="mt-3 text-[11px] text-amber-300/90 leading-relaxed">💡 {p.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Plan IDs */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Plan IDs — what the front desk asks for
        </h2>
        <div className="rounded-xl bg-card border border-white/10 p-5">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {PLAN_IDS.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-3 text-xs">
                <dt className="text-muted-foreground shrink-0">{f.label}</dt>
                <dd className="text-foreground font-medium text-right font-mono">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Rx routing (BIN / PCN / GRP) is on the back of the medical ID card.
          </p>
        </div>
      </section>

      {/* Setup checklist */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            One-time setup checklist
          </h2>
          <span className="text-xs text-muted-foreground">
            {doneCount}/{CHECKLIST.length} done
          </span>
        </div>
        <div className="rounded-xl bg-card border border-white/10 p-5 space-y-2.5">
          {CHECKLIST.map((item, i) => (
            <label
              key={item}
              className="flex items-start gap-3 text-sm cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checked[i] ?? false}
                onChange={() => toggleChecked(i)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-400"
              />
              <span
                className={`leading-relaxed transition-colors ${
                  checked[i]
                    ? "text-muted-foreground/60 line-through"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Built from the 1915 South Family Benefits Handbook (July 2026), verified against the
        HealthSCOPE member portal. Plain-language summary only — if anything here conflicts with
        the official plan documents, the official documents govern. When in doubt, call ClaimDOC
        (888-330-7295) or HealthSCOPE (844-600-0920). Questions? Ask the chat — it knows this
        whole handbook.
      </p>
    </div>
  );
}
