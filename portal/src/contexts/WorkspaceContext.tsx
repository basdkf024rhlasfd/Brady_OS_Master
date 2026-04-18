"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { ProjectId } from "@/lib/access";

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
  configData: Record<string, unknown>;
  updateConfig: (key: string, value: unknown) => void;
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
  return null;
}

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
}: {
  children: ReactNode;
  isAdmin: boolean;
  projects: ProjectId[];
}) {
  const pathname = usePathname();
  const activeProject = deriveProject(pathname);
  const chatScope = activeProject ?? "portal";

  // Panel visibility — persisted to localStorage
  const [chatOpen, setChatOpen] = useState(() =>
    readLocalStorage("workspace-chat-open", true)
  );
  const [configOpen, setConfigOpen] = useState(() =>
    readLocalStorage("workspace-config-open", true)
  );

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
  const [chatMode, setChatMode] = useState<"client" | "operator">(() =>
    readLocalStorage("workspace-chat-mode", "client")
  );

  const toggleChatMode = useCallback(() => {
    setChatMode((prev) => {
      const next = prev === "client" ? "operator" : "client";
      localStorage.setItem("workspace-chat-mode", JSON.stringify(next));
      return next;
    });
  }, []);

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
        configData,
        updateConfig,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
