import { PageHeader, Panel } from "@/components/stihl/briefing-components";
import { sourceGroups } from "@/lib/stihl-data";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Method & Sources"
        title="About"
        description="Documentation of intelligence sources, methodology, and update cadence."
        updatedAt="Mar 14, 2026"
      />

      {/* Source Groups */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Intelligence Sources
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sourceGroups.map((group) => (
            <div
              key={group.name}
              className="rounded-2xl border border-white/[0.08] bg-card p-5"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {group.name}
              </h3>
              <ul className="space-y-2">
                {group.sources.map((source) => (
                  <li
                    key={source}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">&#8226;</span>
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <Panel title="Methodology" accent="neutral">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Signal &#8594; Context &#8594; Action
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every piece of intelligence is processed through a three-tier
              framework: identify the signal, provide market context, and
              recommend concrete action.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Competitive Battlecard
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Peer analysis follows a consistent structure: focus area, revenue
              scale, pressure points, watch items, and strategic stance.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Attribution &amp; Recency
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All signals include source attribution and timestamp. No anonymous
              data. Recency clearly indicated on all intelligence items.
            </p>
          </div>
        </div>
      </Panel>

      {/* Update Cadence */}
      <Panel title="Update Cadence" accent="orange">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Today Dashboard
            </p>
            <p className="text-sm font-medium text-primary mb-1">Daily</p>
            <p className="text-xs text-muted-foreground">
              Updated by 8:45 AM ET each trading day.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Competitors
            </p>
            <p className="text-sm font-medium text-primary mb-1">Weekly</p>
            <p className="text-xs text-muted-foreground">
              Battlecards refreshed each Monday morning.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Digital
            </p>
            <p className="text-sm font-medium text-primary mb-1">Weekly</p>
            <p className="text-xs text-muted-foreground">
              Channel health and social monitoring refreshed weekly.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Ad Hoc Analysis
            </p>
            <p className="text-sm font-medium text-primary mb-1">On request</p>
            <p className="text-xs text-muted-foreground">
              Custom analysis typically delivered within 24-48 hours.
            </p>
          </div>
        </div>
      </Panel>

      {/* Contact */}
      <div className="rounded-2xl border border-white/[0.08] bg-card p-6">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Contact
        </h3>
        <p className="text-sm text-foreground mb-2">
          For questions about methodology, source access, or custom requirements:
        </p>
        <p className="text-xs text-muted-foreground">
          Submit via the Requests page or contact the competitive intelligence team directly.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Disclaimer
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This portal contains proprietary competitive intelligence intended
          solely for internal STIHL executive decision support. Information is
          compiled from public sources and does not represent investment advice.
          Market data is delayed and provided for directional context only.
          Distribution outside the authorized user group is prohibited.
        </p>
      </div>
    </div>
  );
}
