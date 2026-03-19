import { sourceGroups, stihlWorkspace } from "@/lib/stihl-data";
import { PageHeader, Panel, Tag } from "@/components/stihl/StihlUI";

export default function StihlAboutPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_32%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="About"
          title="Method, sources, and trust posture"
          description="Where signals come from, what the system covers, and what it does not touch."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Operating model">
            <div className="space-y-4 text-sm leading-6 text-zinc-400">
              <p>
                This workspace is a private competitive briefing layer,
                not a heavy software deployment. The first version favors curated
                outputs, lightweight modules, and repeatable artifacts over deep
                system integrations.
              </p>
              <p>
                It focuses on the highest-signal questions for STIHL: competitor
                moves, tariff exposure, digital commerce quality, launch activity,
                and category interpretation.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag tone="orange">No internal STIHL integrations</Tag>
              <Tag tone="blue">Static-first content model</Tag>
              <Tag>Low-friction pilot</Tag>
            </div>
          </Panel>

          <Panel title="Source stack" accent="blue">
            <div className="grid gap-4 sm:grid-cols-2">
              {sourceGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-white/8 bg-black/15 p-4"
                >
                  <div className="text-sm font-semibold text-white">
                    {group.title}
                  </div>
                  <div className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <div key={item} className="text-sm text-zinc-400">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Design notes — moved here from inline annotations on other pages */}
        <div className="mt-6">
          <Panel title="Design notes" accent="neutral">
            <div className="space-y-3 text-sm leading-6 text-zinc-500">
              <p>
                <strong className="text-zinc-400">Reading order:</strong> Signal → action → peers → market data → tariff → launches.
                Designed to orient in under 90 seconds.
              </p>
              <p>
                <strong className="text-zinc-400">News feed:</strong> Every item follows source → what happened → so what for STIHL.
                Judgment, not scraped headlines.
              </p>
              <p>
                <strong className="text-zinc-400">Market pulse:</strong> Compact signal cards.
                Prices show exchange, timestamp, and source. Ready for live feed integration without layout changes.
              </p>
              <p>
                <strong className="text-zinc-400">Tariff watch:</strong> One of the cleanest differentiated signal streams.
                Built as a repeatable section for board-facing deliverables.
              </p>
              <p>
                <strong className="text-zinc-400">Source visibility:</strong> A visible source map makes the product feel grounded instead of magical.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
