interface KnowledgeDomain {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "active" | "coming-soon";
}

const domains: KnowledgeDomain[] = [
  {
    id: "pricing",
    name: "Pricing & Category Performance",
    description:
      "Deep analysis of pricing strategies, elasticity modeling, and category-level performance benchmarking across retail channels.",
    icon: "$",
    status: "active",
  },
  {
    id: "tariff",
    name: "Tariff & Regulatory Analysis",
    description:
      "Real-time tariff tracking, regulatory impact assessment, and compliance monitoring for cross-border trade.",
    icon: "T",
    status: "active",
  },
  {
    id: "demand",
    name: "Demand Forecasting & Velocity",
    description:
      "AI-driven demand prediction, velocity tracking, and inventory optimization across distribution networks.",
    icon: "D",
    status: "active",
  },
  {
    id: "commodity",
    name: "Commodity Markets & Trends",
    description:
      "Commodity price intelligence, market trend analysis, and supply chain cost forecasting.",
    icon: "C",
    status: "coming-soon",
  },
  {
    id: "retailer",
    name: "Retailer Requirements & Compliance",
    description:
      "Retailer-specific requirements databases, compliance checklists, and onboarding protocol intelligence.",
    icon: "R",
    status: "coming-soon",
  },
  {
    id: "buyer",
    name: "Buyer Psychology & Positioning",
    description:
      "Buyer behavior modeling, positioning strategy frameworks, and negotiation intelligence.",
    icon: "B",
    status: "coming-soon",
  },
];

export default function KnowledgePage() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Sources</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Curated intelligence and domain expertise. Each module encodes the
          judgment of its respective expert — not just the data, but the decision
          logic, the heuristics, the &ldquo;here&rsquo;s what I&rsquo;d actually
          recommend and why.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-slate-600 transition group-hover:bg-slate-600 group-hover:text-white">
                {domain.icon}
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider ${
                  domain.status === "active"
                    ? "text-emerald-600"
                    : "text-amber-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    domain.status === "active"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                {domain.status === "active" ? "Active" : "Coming Soon"}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{domain.name}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              {domain.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
