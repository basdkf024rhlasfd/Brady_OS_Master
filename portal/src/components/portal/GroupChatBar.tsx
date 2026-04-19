"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { ProjectNav } from "@/lib/nav-types";

export function GroupChatBar({
  groupId,
  groupLabel,
}: {
  groupId: string;
  groupLabel: string;
}) {
  const { isAdmin, chatMode, toggleChatMode, configData, projectConfigs } = useWorkspace();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<ProjectNav[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatId = `group-${groupId}`;

  const projectContext = useMemo(
    () => ({
      project: groupId,
      route: typeof window !== "undefined" ? window.location.pathname : "/",
      configState: configData,
      isAdmin,
      mode: chatMode,
    }),
    [groupId, configData, isAdmin, chatMode]
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ projectContext }),
      }),
    [projectContext]
  );

  const { messages, sendMessage, status } = useChat({ id: chatId, transport });
  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming]);

  const prevStreaming = useRef(false);
  useEffect(() => {
    if (prevStreaming.current && !isStreaming) inputRef.current?.focus();
    prevStreaming.current = isStreaming;
  }, [isStreaming]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.startsWith("/")) {
      const query = val.slice(1).toLowerCase();
      setSuggestions(
        projectConfigs
          .filter(
            (p) =>
              p.slug.toLowerCase().includes(query) ||
              p.label.toLowerCase().includes(query)
          )
          .slice(0, 5)
      );
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
    if (input.startsWith("/")) {
      const query = input.slice(1).trim().toLowerCase();
      const match = projectConfigs.find((p) => p.slug.toLowerCase() === query);
      if (match) { navigateTo(match); return; }
    }
    sendMessage({ text: input });
    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setSuggestions([]); return; }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (suggestions.length === 1) navigateTo(suggestions[0]);
      else handleSend();
    }
  };

  return (
    <div className="shrink-0 border-b border-border bg-surface">
      {/* Bar header */}
      <div className="flex h-9 items-center justify-between border-b border-border-light px-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Chat
          </span>
          <span className="text-text-hint text-[11px]">·</span>
          <span className="text-[11px] text-text-secondary">{groupLabel}</span>
          {isAdmin && (
            <button
              onClick={toggleChatMode}
              className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition ${
                chatMode === "operator"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-surface-active text-text-muted hover:text-foreground"
              }`}
            >
              {chatMode === "operator" ? "Operator" : "Client"}
            </button>
          )}
        </div>
        <span className="text-[10px] text-text-hint">
          {messages.length > 0 ? `${messages.length} message${messages.length !== 1 ? "s" : ""}` : "No messages yet"}
        </span>
      </div>

      {/* Messages — compact scrollable area */}
      <div className="max-h-40 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length === 0 && !isStreaming && (
          <p className="text-[11px] text-text-hint italic py-1">
            Ask about these projects, or type{" "}
            <span className="font-mono bg-surface-active px-1 rounded">/</span>{" "}
            to navigate without burning tokens.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-1.5 rounded-xl text-xs ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-sm"
                  : "bg-background border border-border text-foreground rounded-bl-sm"
              }`}
            >
              {msg.parts.map((part, i) =>
                part.type === "text" ? (
                  <p key={i} className="whitespace-pre-wrap leading-relaxed">{part.text}</p>
                ) : null
              )}
            </div>
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-background border border-border px-3 py-2 rounded-xl rounded-bl-sm">
              <div className="flex space-x-1">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <div className="relative px-4 py-2.5">
        {suggestions.length > 0 && (
          <div className="absolute bottom-full mb-1 left-4 right-4 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10">
            {suggestions.map((p) => (
              <button
                key={p.slug}
                onClick={() => navigateTo(p)}
                className="flex items-center w-full px-3 py-2 text-xs text-left hover:bg-surface-active transition-colors gap-2"
              >
                <span className="font-mono text-text-hint w-4 text-center text-[10px] shrink-0">{p.short}</span>
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
            placeholder={`Ask about ${groupLabel} or /navigate…`}
            className="flex-1 px-3 py-1.5 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent text-xs"
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="px-3 py-1.5 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent-hover disabled:bg-text-hint disabled:cursor-not-allowed transition-colors shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
