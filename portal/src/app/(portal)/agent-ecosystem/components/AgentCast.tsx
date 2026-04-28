interface Agent {
  role: string;
  oneLiner: string;
  signature: string;
}

const AGENTS: Agent[] = [
  {
    role: "Strategic Partner",
    oneLiner: "Orchestrates the cast. Owns the user's context, surfaces the next move, books the work.",
    signature: "All-aware. Sets the tempo.",
  },
  {
    role: "Project Intelligence",
    oneLiner: "One per active engagement. Knows the corpus, sizes problems, writes data requests, runs the synthesis.",
    signature: "Cycle-horizon coach.",
  },
  {
    role: "Research & Recon",
    oneLiner: "Autonomous web research with planner-executor-publisher pattern. Closes data requests without supervision.",
    signature: "Sources or it didn't happen.",
  },
  {
    role: "Financial Cockpit",
    oneLiner: "Personal and business cash flow, runway, and pipeline. Refreshes from primary sources, not vibes.",
    signature: "The numbers don't lie.",
  },
  {
    role: "Web Publishing",
    oneLiner: "Owns deploy, env vars, allowlists, and slug publishing. Three-check UAT before anything goes live.",
    signature: "Images, chatbots, permissions.",
  },
  {
    role: "Capture & Dispatch",
    oneLiner: "Inbound voice / text / files into the system. Outbound notifications when work completes.",
    signature: "Nothing falls through.",
  },
  {
    role: "Dissent",
    oneLiner: "Pressure-tests pitches and recommendations for being too timid. On call when the stakes are high.",
    signature: "What if this is wrong?",
  },
  {
    role: "Hygiene",
    oneLiner: "Weekly compliance check on the agents themselves. Scoring, drift detection, purgatory clearance.",
    signature: "The agents that watch the agents.",
  },
];

export function AgentCast() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {AGENTS.map((agent) => (
        <div
          key={agent.role}
          className="rounded-lg border border-gray-800 bg-gray-900/40 p-4 transition hover:border-gray-700 hover:bg-gray-900/60"
        >
          <h3 className="text-sm font-semibold text-white">{agent.role}</h3>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">{agent.oneLiner}</p>
          <p className="mt-3 border-t border-gray-800 pt-2 font-mono text-[10px] uppercase tracking-wider text-amber-500/70">
            {agent.signature}
          </p>
        </div>
      ))}
    </div>
  );
}
