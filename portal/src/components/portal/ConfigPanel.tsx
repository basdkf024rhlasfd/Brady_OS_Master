"use client";

import { useWorkspace } from "@/contexts/WorkspaceContext";

const PROJECT_LABELS: Record<string, string> = {
  moving: "Moving Calculator",
  stihl: "STIHL USA",
  orlando: "Orlando RE KB",
  "mark-schmulen": "Mark Schmulen",
};

const PROJECT_DESCRIPTIONS: Record<string, string> = {
  moving:
    "Cost estimation, company recommendations, and planning tools for residential moves.",
  stihl:
    "Product knowledge base and dealer support tools for STIHL USA equipment.",
  orlando:
    "Real estate knowledge base and property analysis for the Orlando market.",
  "mark-schmulen":
    "Personal AI workspace and project management tools.",
};

function MovingConfig() {
  const { configData, updateConfig } = useWorkspace();

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-medium text-text-secondary mb-1">
          Origin City
        </label>
        <input
          type="text"
          value={(configData.originCity as string) ?? ""}
          onChange={(e) => updateConfig("originCity", e.target.value)}
          placeholder="e.g. Austin, TX"
          className="w-full px-2 py-1.5 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent-ring"
        />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-text-secondary mb-1">
          Destination City
        </label>
        <input
          type="text"
          value={(configData.destinationCity as string) ?? ""}
          onChange={(e) => updateConfig("destinationCity", e.target.value)}
          placeholder="e.g. Denver, CO"
          className="w-full px-2 py-1.5 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent-ring"
        />
      </div>
      <div>
        <label className="block text-[11px] font-medium text-text-secondary mb-1">
          Home Size
        </label>
        <select
          value={(configData.homeSize as string) ?? ""}
          onChange={(e) => updateConfig("homeSize", e.target.value)}
          className="w-full px-2 py-1.5 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent-ring"
        >
          <option value="">Select...</option>
          <option value="studio">Studio</option>
          <option value="1BR">1 Bedroom</option>
          <option value="2BR">2 Bedrooms</option>
          <option value="3BR">3 Bedrooms</option>
          <option value="4BR">4 Bedrooms</option>
          <option value="house">House (5BR+)</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-medium text-text-secondary mb-1">
          Move Month
        </label>
        <input
          type="month"
          value={(configData.moveDate as string) ?? ""}
          onChange={(e) => updateConfig("moveDate", e.target.value)}
          className="w-full px-2 py-1.5 border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-accent-ring"
        />
      </div>
    </div>
  );
}

function AdminSection() {
  const { activeProject, configData, updateConfig } = useWorkspace();

  return (
    <div className="border-t border-border-light pt-3 mt-3">
      <h4 className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider mb-2">
        Admin
      </h4>
      <div className="space-y-2">
        <div className="p-2 bg-amber-50 rounded-md">
          <p className="text-[11px] text-amber-700 font-medium mb-2">
            Chat Settings
          </p>
          {activeProject === "orlando" && (
            <label className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-amber-700">KB-grounded chat</span>
              <input
                type="checkbox"
                checked={configData.kbEnabled !== false}
                onChange={(e) => updateConfig("kbEnabled", e.target.checked)}
                className="rounded"
              />
            </label>
          )}
          <label className="flex items-center justify-between">
            <span className="text-[11px] text-amber-700">Show chat to clients</span>
            <input
              type="checkbox"
              checked={configData.chatVisible !== false}
              onChange={(e) => updateConfig("chatVisible", e.target.checked)}
              className="rounded"
            />
          </label>
        </div>
        <div className="p-2 bg-surface rounded-md">
          <p className="text-[11px] text-text-secondary font-medium">
            Usage Stats
          </p>
          <p className="text-[10px] text-text-secondary mt-0.5">
            Coming soon: chat volume, token usage, active sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ConfigPanel() {
  const { configOpen, toggleConfig, activeProject, isAdmin } = useWorkspace();

  const projectLabel = activeProject
    ? PROJECT_LABELS[activeProject] ?? activeProject
    : "Portal";

  const projectDesc = activeProject
    ? PROJECT_DESCRIPTIONS[activeProject]
    : null;

  return (
    <aside
      className={`flex flex-col border-l border-border bg-background transition-all duration-200 ${
        configOpen ? "w-80" : "w-0"
      } overflow-hidden`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider truncate">
            Config
          </span>
          <span className="text-xs text-text-hint">|</span>
          <span className="text-xs text-text-secondary truncate">
            {projectLabel}
          </span>
        </div>
        <button
          onClick={toggleConfig}
          className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition hover:bg-surface-active hover:text-foreground shrink-0"
          title="Collapse config"
        >
          &rarr;
        </button>
      </div>

      {/* Content */}
      {activeProject ? (
        <div className="flex-1 overflow-y-auto p-3">
          {/* Project info */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              {projectLabel}
            </h3>
            {projectDesc && (
              <p className="text-[11px] text-text-secondary mt-1">{projectDesc}</p>
            )}
          </div>

          {/* Project-specific config */}
          {activeProject === "moving" && <MovingConfig />}

          {activeProject !== "moving" && (
            <div className="p-3 bg-surface rounded-md">
              <p className="text-[11px] text-text-secondary">
                Project-specific configuration options will appear here.
              </p>
            </div>
          )}

          {/* Admin section */}
          {isAdmin && <AdminSection />}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-xs text-text-muted text-center">
            Select a project to see configuration options.
          </p>
        </div>
      )}
    </aside>
  );
}
