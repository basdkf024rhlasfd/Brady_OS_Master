import { IntakeForm } from "./IntakeForm";

export interface Deliverable {
  id: string;
  name: string;
  format: string;
  dateSent?: string;
  sentTo: string;
  acknowledged: "Y" | "Pending" | "Holstered" | "—";
}

export interface EngagementHubConfig {
  clientName: string;
  bradyRole: string;
  phase: string;
  phaseSteps: string[];
  currentPhaseIndex: number;
  deliverables: Deliverable[];
  nextTouch: { label: string; isoDate: string };
  projectSlug: string;
}

function isHot(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const d = new Date(isoDate);
  d.setHours(0, 0, 0, 0);
  return d <= tomorrow;
}

function AckChip({ ack }: { ack: Deliverable["acknowledged"] }) {
  const map: Record<Deliverable["acknowledged"], string> = {
    Y: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
    Pending: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
    Holstered: "bg-gray-700 text-gray-400 border border-gray-600",
    "—": "bg-gray-800 text-gray-500 border border-gray-700",
  };
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${map[ack]}`}>
      {ack}
    </span>
  );
}

export function EngagementHub({
  clientName,
  bradyRole,
  phase,
  phaseSteps,
  currentPhaseIndex,
  deliverables,
  nextTouch,
  projectSlug,
}: EngagementHubConfig) {
  const hot = isHot(nextTouch.isoDate);

  return (
    <div className="h-full overflow-auto bg-gray-950 px-6 py-8 text-gray-100">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{clientName}</h1>
            <p className="mt-1 text-sm text-gray-400">{bradyRole}</p>
          </div>
          <span className="mt-1 rounded-full bg-blue-900/60 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-700 whitespace-nowrap">
            {phase}
          </span>
        </div>

        {/* Phase Timeline */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Engagement Progress
          </h2>
          <div className="flex items-center gap-0">
            {phaseSteps.map((step, i) => {
              const isComplete = i < currentPhaseIndex;
              const isCurrent = i === currentPhaseIndex;
              const isLast = i === phaseSteps.length - 1;
              return (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5 min-w-0">
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isComplete
                          ? "bg-emerald-700 text-white"
                          : isCurrent
                          ? "bg-blue-600 text-white ring-2 ring-blue-500/40"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {isComplete ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-center text-[10px] leading-tight ${
                        isCurrent ? "font-semibold text-blue-300" : isComplete ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`h-px flex-1 mx-1 mb-4 ${
                        i < currentPhaseIndex ? "bg-emerald-700" : "bg-gray-800"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Touch */}
        <div
          className={`rounded-xl border p-5 ${
            hot
              ? "border-amber-700 bg-amber-950/40"
              : "border-gray-800 bg-gray-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Next Touch
              </h2>
              <p className="mt-1 text-base font-medium text-gray-100">
                {nextTouch.label}
              </p>
            </div>
            {hot && (
              <span className="rounded-full bg-amber-700/60 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-600">
                HOT
              </span>
            )}
          </div>
        </div>

        {/* Deliverables */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Deliverables Sent
          </h2>
          {deliverables.length === 0 ? (
            <p className="text-sm text-gray-600">No deliverables sent yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="pb-2 pr-4 text-xs font-semibold text-gray-500">#</th>
                    <th className="pb-2 pr-4 text-xs font-semibold text-gray-500">Deliverable</th>
                    <th className="pb-2 pr-4 text-xs font-semibold text-gray-500">Format</th>
                    <th className="pb-2 pr-4 text-xs font-semibold text-gray-500">Sent</th>
                    <th className="pb-2 pr-4 text-xs font-semibold text-gray-500">To</th>
                    <th className="pb-2 text-xs font-semibold text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliverables.map((d) => (
                    <tr key={d.id} className="border-b border-gray-800/60 last:border-0">
                      <td className="py-2.5 pr-4 text-gray-600 text-xs">{d.id}</td>
                      <td className="py-2.5 pr-4 text-gray-200">{d.name}</td>
                      <td className="py-2.5 pr-4 text-gray-400 text-xs">{d.format}</td>
                      <td className="py-2.5 pr-4 text-gray-400 text-xs whitespace-nowrap">
                        {d.dateSent ?? "—"}
                      </td>
                      <td className="py-2.5 pr-4 text-gray-400 text-xs">{d.sentTo}</td>
                      <td className="py-2.5">
                        <AckChip ack={d.acknowledged} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Intake */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Message Brady
          </h2>
          <p className="mb-4 text-xs text-gray-600">
            Questions, blockers, or anything that needs attention — goes straight to Brady's review queue.
          </p>
          <IntakeForm projectSlug={projectSlug} source="engagement-hub" />
        </div>

      </div>
    </div>
  );
}
