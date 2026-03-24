import { artifactExamples, stihlWorkspace } from "@/lib/stihl-data";
import { ListItem, PageHeader, Panel, Tag } from "@/components/StihlUI";

export default function StihlArtifactsPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_28%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Artifacts"
          title="Real example deliverables"
          description="Finished examples of the deliverables this service produces."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {artifactExamples.map((item) => (
            <Panel
              key={item.title}
              title={item.title}
              subtitle={item.description}
              accent={item.title.includes("Kantar") ? "orange" : "neutral"}
            >
              <div className="flex flex-wrap gap-2">
                <Tag tone="orange">{item.format}</Tag>
                <Tag>{item.audience}</Tag>
              </div>
              <div className="mt-4 space-y-3">
                {item.sections.map((section) => (
                  <div key={section} className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-zinc-300">
                    {section}
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel
            title="Kantar-style category snapshot"
            accent="orange"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ListItem
                kicker="Category headline"
                title="Battery handheld equipment is moving from product story to platform story."
                body="The brands that explain ecosystem compatibility, runtime, and value most clearly will shape share perceptions."
              />
              <ListItem
                kicker="Pressure point"
                title="Import-heavy brands still have to defend price and margin at the same time."
                body="That gives STIHL room to tell a cleaner value story if the digital surfaces support it."
              />
              <ListItem
                kicker="Commercial implication"
                title="The dealer moat needs stronger online translation."
                body="Service, setup, and support are real advantages, but they need to appear as part of the purchase narrative."
              />
              <ListItem
                kicker="Recommended move"
                title="Pair tariff advantage with digital clarity."
                body="Own the value narrative while peers are forced into price and promo complexity."
              />
            </div>
          </Panel>

          <Panel
            title="Easy on-the-fly report types"
            accent="blue"
          >
            <div className="grid gap-3">
              {[
                "Morning brief",
                "Weekly competitive fact set",
                "Peer financial pulse",
                "Tariff and regulation watch",
                "Digital benchmark snapshot",
                "Launch tracker",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-zinc-300">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
