import {
  PageHeader,
  Panel,
  MetricCard,
  Tag,
} from "@/components/stihl/briefing-components";
import { digitalSignals, digitalFixes, socialMonitoring, geoLens } from "@/lib/stihl-data";

export default function DigitalPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Digital Commerce Intelligence"
        title="Digital"
        description="Surface performance, channel health, and digital opportunity analysis."
        updatedAt="Mar 14, 2026"
      />

      {/* Signal Cards */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Key Signals
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalSignals.map((signal) => (
            <MetricCard
              key={signal.label}
              label={signal.label}
              value={signal.value}
              detail={signal.detail}
            />
          ))}
        </div>
      </section>

      {/* Two Column: What to Fix + Social Monitoring */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* What to Fix First */}
        <Panel
          title="What to Fix First"
          subtitle="Prioritized digital improvements"
          accent="orange"
        >
          <div className="space-y-4">
            {digitalFixes.map((fix) => (
              <div
                key={fix.priority}
                className="flex gap-4 pb-4 border-b border-white/[0.08] last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {fix.priority}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {fix.area}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {fix.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Social Monitoring */}
        <Panel
          title="Social Monitoring"
          subtitle="Platform sentiment and themes"
          accent="blue"
        >
          <div className="space-y-4">
            {socialMonitoring.map((item) => (
              <div
                key={item.platform}
                className="pb-4 border-b border-white/[0.08] last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tag tone="neutral">{item.platform}</Tag>
                    <span className="text-xs text-muted-foreground">
                      {item.theme}
                    </span>
                  </div>
                  <Tag
                    tone={
                      item.sentiment === "Positive"
                        ? "green"
                        : item.sentiment === "Mixed"
                        ? "orange"
                        : "neutral"
                    }
                  >
                    {item.sentiment}
                  </Tag>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.insight}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Geographic Demand Lens */}
      <Panel
        title="Geographic Demand Lens"
        subtitle="Regional weather and seasonal context"
        accent="neutral"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {geoLens.map((region) => (
            <div
              key={region.region}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]"
            >
              <p className="text-sm font-semibold text-foreground mb-1">
                {region.region}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {region.conditions}
              </p>
              <div className="pt-3 border-t border-white/[0.08]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary mb-1">
                  Opportunity
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {region.opportunity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Channel Health Summary */}
      <Panel title="Channel Health Summary" accent="neutral">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              stihlusa.com
            </p>
            <p className="text-sm font-medium text-primary mb-1">
              Needs mobile UX work
            </p>
            <p className="text-xs text-muted-foreground">
              Category browse underperforms competitor benchmarks.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Mirakl B2B
            </p>
            <p className="text-sm font-medium text-secondary mb-1">
              Live, onboarding
            </p>
            <p className="text-xs text-muted-foreground">
              Dealer activation push critical through Q2.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Search / SEO
            </p>
            <p className="text-sm font-medium text-stihl-emerald mb-1">
              Strong positioning
            </p>
            <p className="text-xs text-muted-foreground">
              Brand search remains healthy across categories.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Social / Video
            </p>
            <p className="text-sm font-medium text-stihl-emerald mb-1">
              Positive sentiment
            </p>
            <p className="text-xs text-muted-foreground">
              YouTube reviews driving consideration. Maintain presence.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
