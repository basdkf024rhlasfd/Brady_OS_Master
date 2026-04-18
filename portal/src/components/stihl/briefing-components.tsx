import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SignalCard as SignalCardType, NewsItem, MarketItem, CompetitorEntry, ArtifactExample } from "@/lib/stihl-types";

// PageHeader Component
interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  updatedAt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  updatedAt,
  ctaLabel,
  ctaHref,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary mb-2">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {updatedAt && (
            <p className="text-xs text-muted-foreground">
              Updated {updatedAt}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Panel Component
interface PanelProps {
  title: string;
  subtitle?: string;
  accent?: "orange" | "blue" | "green" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export function Panel({
  title,
  subtitle,
  accent = "neutral",
  children,
  className,
}: PanelProps) {
  const accentColors = {
    orange: "border-l-primary",
    blue: "border-l-secondary",
    green: "border-l-stihl-emerald",
    neutral: "border-l-white/20",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-6",
        "border-l-2",
        accentColors[accent],
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// MetricCard Component
interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  className?: string;
}

export function MetricCard({ label, value, detail, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-5",
        className
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-primary mb-2">{value}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
    </div>
  );
}

// Tag/Badge Component
interface TagProps {
  children: React.ReactNode;
  tone?: "orange" | "blue" | "green" | "neutral" | "red";
  className?: string;
}

export function Tag({ children, tone = "neutral", className }: TagProps) {
  const toneStyles = {
    orange: "bg-primary/10 text-primary",
    blue: "bg-secondary/10 text-secondary",
    green: "bg-stihl-emerald/10 text-stihl-emerald",
    red: "bg-stihl-red/10 text-stihl-red",
    neutral: "bg-white/[0.08] text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

// ListItem Component
interface ListItemProps {
  kicker?: string;
  title: string;
  body?: string;
  className?: string;
}

export function ListItem({ kicker, title, body, className }: ListItemProps) {
  return (
    <div className={cn("py-3 border-b border-white/[0.08] last:border-0", className)}>
      {kicker && (
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {kicker}
        </p>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {body && (
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
      )}
    </div>
  );
}

// ActionLink Component
interface ActionLinkProps {
  href: string;
  label: string;
  detail?: string;
  className?: string;
}

export function ActionLink({ href, label, detail, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between py-3 border-b border-white/[0.08] last:border-0 hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors",
        className
      )}
    >
      <div>
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
        {detail && (
          <p className="text-xs text-muted-foreground">{detail}</p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

// SignalCard Component (for news items)
interface SignalCardProps {
  item: NewsItem;
  className?: string;
}

export function SignalCardNews({ item, className }: SignalCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-5",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Tag tone="orange">{item.source}</Tag>
        <span className="text-[10px] text-muted-foreground">{item.time}</span>
      </div>
      <p className="text-sm font-medium text-foreground mb-3 leading-relaxed">
        {item.headline}
      </p>
      <div className="pt-3 border-t border-white/[0.08]">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          So what
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {item.implication}
        </p>
      </div>
    </div>
  );
}

// TickerCard Component
interface TickerCardProps {
  item: MarketItem;
  className?: string;
}

export function TickerCard({ item, className }: TickerCardProps) {
  const isPositive = item.move.startsWith("+");
  const isNegative = item.move.startsWith("-");

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-4",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-foreground">{item.label}</p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {item.ticker}
          </p>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded",
            isPositive && "bg-stihl-emerald/10 text-stihl-emerald",
            isNegative && "bg-stihl-red/10 text-stihl-red",
            !isPositive && !isNegative && "bg-white/[0.08] text-muted-foreground"
          )}
        >
          {item.move}
        </span>
      </div>
      <p className="text-lg font-semibold text-foreground mb-1">{item.price}</p>
      <p className="text-[10px] text-muted-foreground">{item.note}</p>
    </div>
  );
}

// CompetitorCard Component
interface CompetitorCardProps {
  competitor: CompetitorEntry;
  className?: string;
}

export function CompetitorCard({ competitor, className }: CompetitorCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-5",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {competitor.name}
          </h3>
          <p className="text-xs text-muted-foreground">{competitor.revenue}</p>
        </div>
        <Tag tone="orange">{competitor.stance}</Tag>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Focus
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            {competitor.focus}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Pressure
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            {competitor.pressure}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Watch
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            {competitor.watch}
          </p>
        </div>
      </div>
    </div>
  );
}

// ArtifactCard Component
interface ArtifactCardProps {
  artifact: ArtifactExample;
  className?: string;
}

export function ArtifactCard({ artifact, className }: ArtifactCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-card p-5 hover:border-white/[0.16] transition-colors cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-foreground">
          {artifact.title}
        </h3>
        <Tag tone="blue">{artifact.format}</Tag>
      </div>

      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {artifact.audience}
      </p>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        {artifact.description}
      </p>

      <div className="pt-3 border-t border-white/[0.08]">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Sections
        </p>
        <div className="flex flex-wrap gap-1">
          {artifact.sections.map((section) => (
            <span
              key={section}
              className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-muted-foreground"
            >
              {section}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ActionCard Component (for top signal / action items)
interface ActionCardProps {
  label: string;
  content: string;
  accent?: "orange" | "blue";
  className?: string;
}

export function ActionCard({
  label,
  content,
  accent = "orange",
  className,
}: ActionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] p-6",
        accent === "orange" && "bg-primary/5 border-primary/20",
        accent === "blue" && "bg-secondary/5 border-secondary/20",
        className
      )}
    >
      <p
        className={cn(
          "text-[10px] font-medium uppercase tracking-[0.2em] mb-2",
          accent === "orange" && "text-primary",
          accent === "blue" && "text-secondary"
        )}
      >
        {label}
      </p>
      <p className="text-sm text-foreground leading-relaxed">{content}</p>
    </div>
  );
}
