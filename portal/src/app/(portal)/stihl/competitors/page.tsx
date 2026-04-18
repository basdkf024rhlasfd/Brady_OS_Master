import {
  PageHeader,
  Panel,
  CompetitorCard,
  Tag,
} from "@/components/stihl/briefing-components";
import { competitors, earningsCalendar, launchRadar } from "@/lib/stihl-data";

export default function CompetitorsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Peer Intelligence"
        title="Competitors"
        description="Competitive battlecard framework: who they are, where they're pressured, and what to watch."
        updatedAt="Mar 14, 2026"
      />

      {/* Competitor Cards - 2x2 Grid */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Key Competitors
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {competitors.map((competitor) => (
            <CompetitorCard key={competitor.name} competitor={competitor} />
          ))}
        </div>
      </section>

      {/* Two Column: Earnings Calendar + Launch & Pricing Watch */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Financial Signals Timeline */}
        <Panel
          title="Earnings Calendar"
          subtitle="Upcoming releases to watch"
          accent="orange"
        >
          <div className="space-y-4">
            {earningsCalendar.map((item) => (
              <div
                key={item.company}
                className="pb-4 border-b border-white/[0.08] last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.company}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <Tag tone="neutral">Earnings</Tag>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    What to watch
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.watch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Launch & Pricing Watch */}
        <Panel
          title="Launch & Pricing Watch"
          subtitle="Recent competitor moves"
          accent="blue"
        >
          <div className="space-y-4">
            {launchRadar.map((item, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/[0.08] last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Tag tone="orange">{item.source}</Tag>
                  <span className="text-[10px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2 leading-relaxed">
                  {item.headline}
                </p>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    Implication
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.implication}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Strategic Summary */}
      <Panel title="Strategic Summary" accent="neutral">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Husqvarna
            </p>
            <p className="text-sm font-medium text-primary mb-1">
              Wounded but still dangerous
            </p>
            <p className="text-xs text-muted-foreground">
              Window for share capture while they struggle operationally.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Milwaukee / TTI
            </p>
            <p className="text-sm font-medium text-primary mb-1">
              Biggest storytelling threat
            </p>
            <p className="text-xs text-muted-foreground">
              Platform ecosystem narrative requires counter-positioning.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              DeWalt / SBD
            </p>
            <p className="text-sm font-medium text-primary mb-1">
              Price moves = talking points
            </p>
            <p className="text-xs text-muted-foreground">
              Every tariff-driven price increase creates value positioning.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
              John Deere
            </p>
            <p className="text-sm font-medium text-primary mb-1">
              Useful macro proxy
            </p>
            <p className="text-xs text-muted-foreground">
              Dealer sentiment and regional demand signals.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
