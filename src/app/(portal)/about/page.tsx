export default function AboutPage() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            mception<span className="text-slate-600">.ai</span>
          </h1>
          <blockquote className="border-l-2 border-slate-500 pl-5">
            <p className="text-lg leading-relaxed text-gray-600">
              &ldquo;An AI-first fractional consulting agency. We encode domain
              expertise into systems that think with the judgment of your best
              people &mdash; available on demand, without the full-time
              headcount. The result doesn&rsquo;t feel like consulting an expert.{" "}
              <span className="font-semibold text-gray-900">
                It feels like being one.
              </span>
              &rdquo;
            </p>
          </blockquote>
        </div>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            What We Do
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-500">
            <p>
              The best thinking in any industry lives inside people&rsquo;s
              heads &mdash; accumulated judgment from thousands of decisions in a
              specific domain. We capture that expertise and embed it into AI
              systems so our clients get{" "}
              <span className="text-gray-700">
                fractional access to elite thinking on demand.
              </span>
            </p>
            <p>
              Expert judgment without the right data is intuition. The right data
              without expert judgment is noise.{" "}
              <span className="text-gray-700">
                We bring both together.
              </span>
            </p>
          </div>
        </section>

        {/* Trust Architecture */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Trust Architecture
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-500">
            <p>
              Our architecture protects the experts who power the system:{" "}
              <span className="text-gray-700">
                you get the answer, you don&rsquo;t get the recipe.
              </span>{" "}
              Methodology is never exposed &mdash; only the output. Contribution
              is permissioned, usage is logged, and ownership is preserved.
            </p>
          </div>
        </section>

        {/* Why It Works */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Why It Works
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-500">
            <p>
              Traditional consulting ends when the engagement does &mdash; the
              expertise walks away. We encode it so it outlasts any single
              engagement.{" "}
              <span className="text-gray-700">
                The expert doesn&rsquo;t disappear &mdash; they compound.
              </span>{" "}
              Every use extends the ledger. Every correction sharpens the system.
              The asset appreciates with use rather than depreciating with time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
