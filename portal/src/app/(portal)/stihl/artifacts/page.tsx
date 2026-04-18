import { PageHeader } from "@/components/stihl/briefing-components";
import { ArtifactCardEnhanced } from "@/components/stihl/artifact-card-enhanced";
import { artifacts } from "@/lib/stihl-data";

export default function ArtifactsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Deliverable Templates"
        title="Artifacts"
        description="Standard intelligence deliverables with automated scheduling and run history. Toggle schedules, view past runs, or kick off ad hoc requests."
        updatedAt="Mar 29, 2026"
      />

      {/* Artifact Cards - 2x3 Grid */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Available Templates
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {artifacts.map((artifact) => (
            <ArtifactCardEnhanced key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </section>

      {/* Usage Notes */}
      <div className="rounded-2xl border border-white/[0.08] bg-card p-6">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          How It Works
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Scheduled runs
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toggle the schedule switch to enable automated runs. Each artifact
              runs at the specified time and appears in your run history.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Ad hoc requests
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click &quot;Run Ad Hoc&quot; to trigger a one-time generation with custom
              context. Requests are processed and delivered within 2-4 hours.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              New badge
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unread runs are marked with a &quot;New&quot; badge. Click any run to view
              it and automatically mark it as read.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
