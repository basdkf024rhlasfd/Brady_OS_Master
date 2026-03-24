import { digitalSignals, geoSignals, socialSignals, stihlWorkspace } from "@/lib/stihl-data";
import { ListItem, MetricCard, PageHeader, Panel, Tag } from "@/components/StihlUI";

export default function StihlDigitalPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_30%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Digital"
          title="Digital and product intelligence"
          description="Browse quality, marketplace storytelling, social signals, and regional demand context."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {digitalSignals.map((item) => (
            <MetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              detail={item.detail}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Panel
            title="What to fix first"
          >
            <div className="grid gap-4">
              <ListItem
                kicker="Browse"
                title="Repair category and search surfaces before rebuilding PDPs."
                body="The browse layer is the underperforming discovery surface; the expensive PDP work is largely already there."
              />
              <ListItem
                kicker="Marketplace"
                title="Explain the dealer-first commerce model more explicitly."
                body="Use the site to reduce channel confusion and show how Mirakl strengthens dealers instead of bypassing them."
              />
              <ListItem
                kicker="Battery story"
                title="Make platform compatibility and performance claims easier to understand."
                body="The biggest digital upside is in clearer translation of battery systems into decision-ready customer language."
              />
            </div>
          </Panel>

          <Panel
            title="Social monitoring"
            accent="blue"
          >
            <div className="space-y-4">
              {socialSignals.map((item) => (
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

        <div className="mt-6">
          <Panel
            title="Geography and weather lens"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {geoSignals.map((item) => (
                <ListItem
                  key={`${item.source}-${item.headline}`}
                  kicker={item.source}
                  title={item.headline}
                  body={item.implication}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
