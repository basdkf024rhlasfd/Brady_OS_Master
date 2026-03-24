import { competitors, financialSignals, launchRadar, stihlWorkspace } from "@/lib/stihl-data";
import { ListItem, MetricCard, PageHeader, Panel, Tag } from "@/components/StihlUI";

export default function StihlCompetitorsPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_28%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Competitors"
          title="Peer watch and financial pulse"
          description="A focused competitor section: who matters, what changed, and how STIHL should interpret it."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {competitors.map((item) => (
            <Panel
              key={item.name}
              title={item.name}
              subtitle={item.focus}
              accent={item.name.includes("Milwaukee") ? "blue" : "neutral"}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <MetricCard label="Revenue lens" value={item.revenue} detail={item.pressure} />
                <MetricCard label="Watch next" value={item.watch} detail={item.stance} />
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel
            title="Peer financial pulse"
            accent="blue"
          >
            <div className="grid gap-3">
              {financialSignals.map((item) => (
                <MetricCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  detail={item.detail}
                />
              ))}
            </div>
          </Panel>

          <Panel
            title="Launch and pricing watch"
          >
            <div className="space-y-4">
              {launchRadar.map((item) => (
                <div key={`${item.source}-${item.headline}`} className="rounded-2xl border border-white/8 bg-black/15 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone="blue">{item.source}</Tag>
                    <Tag>{item.time}</Tag>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{item.headline}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.implication}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

      </div>
    </div>
  );
}
