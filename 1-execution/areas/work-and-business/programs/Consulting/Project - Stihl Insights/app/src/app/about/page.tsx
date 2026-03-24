import { sourceGroups, stihlWorkspace } from "@/lib/stihl-data";
import { PageHeader, Panel, Tag } from "@/components/StihlUI";

export default function StihlAboutPage() {
  return (
    <div className="h-full overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_32%),linear-gradient(180deg,#09090b_0%,#09090b_100%)] p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="About"
          title="Method and sources"
          description="Where signals come from and what the service covers."
          updatedAt={stihlWorkspace.updatedAt}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel
            title="Operating model"
          >
            <div className="space-y-4 text-sm leading-6 text-zinc-400">
              <p>
                This is a private competitive briefing layer focused on curated
                outputs and repeatable artifacts rather than deep system
                integrations.
              </p>
              <p>
                It focuses on the highest-signal questions for STIHL: competitor
                moves, tariff exposure, digital commerce quality, launch activity,
                and category interpretation.
              </p>
            </div>
          </Panel>

          <Panel
            title="Source stack"
            accent="blue"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {sourceGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/8 bg-black/15 p-4">
                  <div className="text-sm font-semibold text-white">{group.title}</div>
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
      </div>
    </div>
  );
}
