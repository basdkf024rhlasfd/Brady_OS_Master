import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  updatedAt,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="mb-8 rounded-[28px] border border-white/8 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(24,24,27,0.95)_38%,rgba(15,23,42,0.92))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            {eyebrow}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
            {description}
          </p>
        </div>
        <div className="space-y-3">
          {updatedAt ? (
            <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-zinc-300">
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Last updated
              </div>
              <div className="mt-1 font-medium text-white">{updatedAt}</div>
            </div>
          ) : null}
          {cta}
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  children,
  accent = "orange",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accent?: "orange" | "blue" | "neutral";
}) {
  const accentStyles =
    accent === "blue"
      ? "border-sky-400/20 bg-sky-400/8"
      : accent === "neutral"
        ? "border-white/8 bg-zinc-950/70"
        : "border-orange-400/20 bg-zinc-950/80";

  return (
    <section className={`rounded-[24px] border ${accentStyles} p-5`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm leading-6 text-zinc-400">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "orange" | "blue" | "green";
}) {
  const toneStyles =
    tone === "orange"
      ? "border-orange-400/20 bg-orange-400/10 text-orange-200"
      : tone === "blue"
        ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
        : tone === "green"
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-zinc-300";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${toneStyles}`}>
      {children}
    </span>
  );
}

export function ListItem({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        {kicker}
      </div>
      <div className="mt-2 text-sm font-semibold text-white">{title}</div>
      {body ? <p className="mt-2 text-sm leading-6 text-zinc-400">{body}</p> : null}
    </div>
  );
}

export function ActionLink({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/8 bg-black/20 p-4 transition hover:border-orange-300/30 hover:bg-black/30"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{label}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
        </div>
        <div className="text-lg text-zinc-500 transition group-hover:text-orange-200">
          →
        </div>
      </div>
    </Link>
  );
}
