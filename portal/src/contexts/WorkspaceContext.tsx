"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav, AccessMap } from "@/lib/nav-types";

interface WorkspaceState {
  // Panel visibility
  chatOpen: boolean;
  configOpen: boolean;
  toggleChat: () => void;
  toggleConfig: () => void;

  // Project context
  activeProject: ProjectId | null;
  chatScope: string;

  // Chat mode
  chatMode: "client" | "operator";
  toggleChatMode: () => void;

  // Config
  isAdmin: boolean;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
  accessMap: AccessMap | null;
  configData: Record<string, unknown>;
  updateConfig: (key: string, value: unknown) => void;
  agentMap: AgentMap;
}

const WorkspaceContext = createContext<WorkspaceState | null>(null);

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}

/** Derive the active project from the current pathname */
function deriveProject(pathname: string): ProjectId | null {
  if (pathname.startsWith("/calculators/moving")) return "moving";
  if (pathname.startsWith("/stihl")) return "stihl";
  if (pathname.startsWith("/orlando")) return "orlando";
  if (pathname.startsWith("/mark-schmulen")) return "mark-schmulen";
  if (pathname.startsWith("/panda")) return "panda";
  if (pathname.startsWith("/1915-south")) return "1915-south";
  if (pathname.startsWith("/group/family")) return "family";
  if (pathname.startsWith("/group/panda-engagement")) return "panda-engagement";
  if (pathname.startsWith("/grocery-assistant")) return "grocery-assistant";
  if (pathname.startsWith("/school-hub")) return "school-hub";
  if (pathname.startsWith("/financial-assistant")) return "financial-assistant";
  return null;
}

export interface AgentSummary {
  agentName: string;
  agentAvatar?: string;
}
export type AgentMap = Record<string, AgentSummary>;

function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export function WorkspaceProvider({
  children,
  isAdmin,
  projects,
  projectConfigs,
  agentMap = {},
}: {
  children: ReactNode;
  isAdmin: boolean;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
  agentMap?: AgentMap;
}) {
  const pathname = usePathname();
  const activeProject = deriveProject(pathname);
  const chatScope = "unified";

  // Panel visibility — start false (matches SSR), sync from localStorage after mount
  const [chatOpen, setChatOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  useEffect(() => {
    setChatOpen(readLocalStorage("workspace-chat-open", true));
    setConfigOpen(readLocalStorage("workspace-config-open", false));
  }, []);

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => {
      const next = !prev;
      localStorage.setItem("workspace-chat-open", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleConfig = useCallback(() => {
    setConfigOpen((prev) => {
      const next = !prev;
      localStorage.setItem("workspace-config-open", JSON.stringify(next));
      return next;
    });
  }, []);

  // Chat mode — client vs operator
  const [chatMode, setChatMode] = useState<"client" | "operator">("client");
  useEffect(() => {
    setChatMode(readLocalStorage("workspace-chat-mode", "client"));
  }, []);

  const toggleChatMode = useCallback(() => {
    setChatMode((prev) => {
      const next = prev === "client" ? "operator" : "client";
      localStorage.setItem("workspace-chat-mode", JSON.stringify(next));
      return next;
    });
  }, []);

  // Access map — fetched once for admins
  const [accessMap, setAccessMap] = useState<AccessMap | null>(null);
  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/access-map")
      .then((r) => r.json())
      .then((data) => setAccessMap(data.projects ?? null))
      .catch(() => {});
  }, [isAdmin]);

  // Config state per project
  const configRef = useRef<Record<string, Record<string, unknown>>>({});
  const [, forceUpdate] = useState(0);

  const configData = activeProject
    ? configRef.current[activeProject] ?? {}
    : {};

  const updateConfig = useCallback(
    (key: string, value: unknown) => {
      if (!activeProject) return;
      if (!configRef.current[activeProject]) {
        configRef.current[activeProject] = {};
      }
      configRef.current[activeProject][key] = value;
      forceUpdate((n) => n + 1);
    },
    [activeProject]
  );

  return (
    <WorkspaceContext.Provider
      value={{
        chatOpen,
        configOpen,
        toggleChat,
        toggleConfig,
        activeProject,
        chatScope,
        chatMode,
        toggleChatMode,
        isAdmin,
        projects,
        projectConfigs,
        accessMap,
        configData,
        updateConfig,
        agentMap,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
