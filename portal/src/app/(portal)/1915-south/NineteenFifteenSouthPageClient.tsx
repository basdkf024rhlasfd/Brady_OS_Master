"use client";

import { useState } from "react";
import { EngagementHub } from "@/components/engagement/EngagementHub";
import { ProjectFrame } from "@/components/portal/ProjectFrame";
import type { EngagementHubConfig } from "@/components/engagement/EngagementHub";

const TABS = ["Overview", "Research Brief"] as const;
type Tab = (typeof TABS)[number];

export function NineteenFifteenSouthPageClient({ config }: { config: EngagementHubConfig }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="flex h-full flex-col">
      {/* Tab bar */}
      <div className="flex shrink-0 gap-1 border-b border-gray-800 bg-gray-950 px-4 pt-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-t px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-amber-500 text-amber-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1">
        {activeTab === "Overview" && <EngagementHub {...config} />}
        {activeTab === "Research Brief" && (
          <ProjectFrame
            baseUrl="/1915-south/viewer"
            path="/index.html"
            title="1915 South Research Brief"
          />
        )}
      </div>
    </div>
  );
}
