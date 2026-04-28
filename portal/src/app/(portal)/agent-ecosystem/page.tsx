import { requireProjectAccess } from "@/lib/portal-access";
import { RecursiveLearningArc } from "./components/RecursiveLearningArc";
import { AgentCast } from "./components/AgentCast";
import { CompoundingSignal } from "./components/CompoundingSignal";

export default async function AgentEcosystemPage() {
  await requireProjectAccess("agent-ecosystem");

  return (
    <div className="h-full overflow-y-auto bg-gray-950">
      <div className="mx-auto max-w-5xl px-6 py-12 text-gray-100">
        {/* Hero */}
        <header className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            mception · platform overview
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Narrow + deep + early.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            One operator, a small ensemble of agents, and a working platform that gets sharper every time it runs.
            What started as a research note compounds into a workshop, then an ops engine, then a live engagement.
            Each iteration hardens the platform, deepens the research, and saves more of the data the next run will need.
          </p>
        </header>

        {/* Centerpiece — Recursive Learning Arc */}
        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              The recursive learning arc
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              How one idea hardens into a platform.
            </h2>
          </div>
          <RecursiveLearningArc />
        </section>

        {/* Agent Cast */}
        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              The agent cast
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              A small ensemble that handles the work.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Each agent owns a lane. None are general-purpose. The strategic partner orchestrates;
              everyone else specializes.
            </p>
          </div>
          <AgentCast />
        </section>

        {/* Compounding Signal */}
        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              The compounding signal
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Three axes that deepen with every run.
            </h2>
          </div>
          <CompoundingSignal />
        </section>

        {/* Close */}
        <section className="border-t border-gray-800 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            What it looks like in practice
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
            Pick any active engagement in the sidebar. Each one runs on the same platform — same agents,
            same arc, different problem. The fastest way to feel the difference is to open one and look at
            what got built, then look at how much of it still needed a human in the loop.
          </p>
          <p className="mt-6 text-xs italic text-gray-500">
            Working preview · shared 1:1 · please don&apos;t forward.
          </p>
        </section>
      </div>
    </div>
  );
}
