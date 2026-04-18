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
import { v4 as uuidv4 } from "uuid";
import type { ProjectId } from "@/lib/access";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  sessionId: string;
  messages: Message[];
  loading: boolean;
}

interface WorkspaceState {
  // Panel visibility
  chatOpen: boolean;
  configOpen: boolean;
  toggleChat: () => void;
  toggleConfig: () => void;

  // Per-project chat
  activeProject: ProjectId | null;
  chatScope: string;
  activeChatSession: ChatSession;
  sendMessage: (text: string) => Promise<void>;

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

  // Per-project chat sessions
  const sessionsRef = useRef<Map<string, ChatSession>>(new Map());
  const [, forceUpdate] = useState(0);

  const getOrCreateSession = useCallback((scope: string): ChatSession => {
    const existing = sessionsRef.current.get(scope);
    if (existing) return existing;

    const session: ChatSession = {
      sessionId: uuidv4(),
      messages: [
        {
          role: "assistant",
          content: `Welcome! I'm your assistant for this project. How can I help you today?`,
        },
      ],
      loading: false,
    };
    sessionsRef.current.set(scope, session);
    return session;
  }, []);

  const activeChatSession = getOrCreateSession(chatScope);

  // Config state per project
  const configRef = useRef<Record<string, Record<string, unknown>>>({});

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

  // Send message to the global chat API
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const session = getOrCreateSession(chatScope);
      session.messages.push({ role: "user", content: text.trim() });
      session.loading = true;
      forceUpdate((n) => n + 1);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: session.sessionId,
            message: text.trim(),
            projectContext: {
              project: chatScope,
              route: pathname,
              configState: activeProject ? (configRef.current[activeProject] ?? {}) : {},
              isAdmin,
              mode: chatMode,
            },
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Server error (${response.status})`);
        }

        session.messages.push({
          role: "assistant",
          content: data.response,
        });
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : String(error);
        session.messages.push({
          role: "assistant",
          content: `Sorry, something went wrong: ${errMsg}`,
        });
      } finally {
        session.loading = false;
        forceUpdate((n) => n + 1);
      }
    },
    [chatScope, activeProject, pathname, isAdmin, chatMode, getOrCreateSession]
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
        activeChatSession,
        sendMessage,
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
