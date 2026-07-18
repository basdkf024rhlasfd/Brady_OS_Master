"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { ProjectNav } from "@/lib/nav-types";
import Markdown from "react-markdown";

export function GlobalChatPanel() {
  const {
    chatOpen,
    toggleChat,
    chatScope,
    activeProject,
    isAdmin,
    chatMode,
    toggleChatMode,
    configData,
    projectConfigs,
    agentMap,
  } = useWorkspace();

  // Active agent persona for the current project, if any
  const activeAgent = activeProject ? agentMap[activeProject] : undefined;

  const router = useRouter();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<ProjectNav[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K (or Ctrl+K) toggles the panel from anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleChat();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggleChat]);

  // Focus input whenever panel opens
  useEffect(() => {
    if (chatOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [chatOpen]);

  const projectContext = useMemo(
    () => ({
      project: activeProject ?? "portal",
      authorizedProjects: projectConfigs.map((p) => p.slug),
      route: typeof window !== "undefined" ? window.location.pathname : "/",
      configState: configData,
      isAdmin,
      mode: chatMode,
    }),
    [activeProject, projectConfigs, configData, isAdmin, chatMode]
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ projectContext }),
      }),
    [projectContext]
  );

  const { messages, sendMessage, status } = useChat({
    id: chatScope,
    transport,
  });

  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming]);

  const prevStreaming = useRef(false);
  useEffect(() => {
    if (prevStreaming.current && !isStreaming) {
      inputRef.current?.focus();
    }
    prevStreaming.current = isStreaming;
  }, [isStreaming]);

  // Slash command autocomplete
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.startsWith("/")) {
      const query = val.slice(1).toLowerCase();
      const matches = projectConfigs.filter(
        (p) =>
          p.slug.toLowerCase().includes(query) ||
          p.label.toLowerCase().includes(query)
      );
      setSuggestions(matches.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const navigateTo = (project: ProjectNav) => {
    router.push(project.href);
    setInput("");
    setSuggestions([]);
  };

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;

    // Exact slash match → navigate, zero tokens burned
    if (input.startsWith("/")) {
      const query = input.slice(1).trim().toLowerCase();
      const match = projectConfigs.find(
        (p) => p.slug.toLowerCase() === query
      );
      if (match) {
        navigateTo(match);
        return;
      }
    }

    sendMessage({ text: input });
    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSuggestions([]);
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // If exactly one suggestion, navigate directly
      if (suggestions.length === 1) {
        navigateTo(suggestions[0]);
      } else {
        handleSend();
      }
    }
  };

  return (
    <>
      {/* Pull tab — visible when panel is collapsed */}
      {!chatOpen && (
        <button
          onClick={toggleChat}
          title="Open chat (⌘K)"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-accent text-white w-8 h-14 rounded-l-lg shadow-lg hover:bg-accent-hover transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      )}

      <aside
        className={`flex flex-col border-l border-border bg-background transition-all duration-200 shrink-0 ${
          chatOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider truncate">
              Chat
            </span>
            <span className="text-xs text-text-hint">|</span>
            <span className="text-xs text-text-secondary truncate">
              {projectConfigs.find((p) => p.slug === chatScope)?.label ?? chatScope}
            </span>
            {isAdmin && (
              <button
                onClick={toggleChatMode}
                className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors shrink-0 ${
                  chatMode === "operator"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-surface text-text-muted hover:bg-surface-active"
                }`}
                title={
                  chatMode === "operator"
                    ? "Switch to Client mode"
                    : "Switch to Operator mode"
                }
              >
                {chatMode === "operator" ? "Operator" : "Client"}
              </button>
            )}
          </div>
          <button
            onClick={toggleChat}
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition hover:bg-surface-active hover:text-foreground shrink-0"
            title="Collapse chat (⌘K)"
          >
            &rarr;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && !isStreaming && activeAgent && (
            <div className="flex items-center gap-3 px-1 pb-1">
              {activeAgent.agentAvatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeAgent.agentAvatar}
                  alt={activeAgent.agentName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-border shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">{activeAgent.agentName}</p>
                <p className="text-[10px] text-text-hint">Engagement intelligence agent</p>
              </div>
            </div>
          )}
          {messages.length === 0 && !isStreaming && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 rounded-2xl text-xs bg-surface text-foreground rounded-bl-sm">
                <p className="whitespace-pre-wrap">
                  Ask me anything, or type{" "}
                  <span className="font-mono bg-surface-active px-1 rounded">/</span>{" "}
                  to navigate to a project without burning tokens.
                </p>
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-sm"
                    : "bg-surface text-foreground rounded-bl-sm"
                }`}
              >
                {msg.parts.map((part, i) =>
                  part.type === "text" ? (
                    msg.role === "assistant" ? (
                      <div key={i} className="prose prose-xs prose-neutral dark:prose-invert max-w-none leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        <Markdown>{part.text}</Markdown>
                      </div>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                    )
                  ) : null
                )}
              </div>
            </div>
          ))}
          {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex justify-start">
              <div className="bg-surface px-3 py-2 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 shrink-0">
          <div className="relative">
            {/* Slash command suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute bottom-full mb-2 left-0 right-0 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10">
                {suggestions.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => navigateTo(p)}
                    className="flex items-center w-full px-3 py-2 text-xs text-left hover:bg-surface-active transition-colors gap-2"
                  >
                    <span className="text-text-hint font-mono w-4 text-center text-[10px] shrink-0">
                      {p.short}
                    </span>
                    <span className="text-foreground">{p.label}</span>
                    <span className="ml-auto text-text-hint truncate">{p.href}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything or /navigate…"
                className="flex-1 px-3 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent text-xs"
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={isStreaming || !input.trim()}
                className="px-3 py-2 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent-hover disabled:bg-text-hint disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
