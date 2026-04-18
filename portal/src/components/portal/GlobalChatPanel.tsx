"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { getProjectLabel } from "@/lib/project-registry";

export function GlobalChatPanel() {
  const {
    chatOpen,
    toggleChat,
    chatScope,
    isAdmin,
    chatMode,
    toggleChatMode,
    configData,
  } = useWorkspace();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build project context sent with every request
  const projectContext = useMemo(
    () => ({
      project: chatScope,
      route: typeof window !== "undefined" ? window.location.pathname : "/",
      configState: configData,
      isAdmin,
      mode: chatMode,
    }),
    [chatScope, configData, isAdmin, chatMode]
  );

  // AI SDK useChat — one instance per chatScope
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

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming]);

  // Auto-focus after streaming completes
  const prevStreaming = useRef(false);
  useEffect(() => {
    if (prevStreaming.current && !isStreaming) {
      inputRef.current?.focus();
    }
    prevStreaming.current = isStreaming;
  }, [isStreaming]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside
      className={`flex flex-col border-r border-border bg-background transition-all duration-200 ${
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
            {getProjectLabel(chatScope)}
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
          title="Collapse chat"
        >
          &larr;
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !isStreaming && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-3 py-2 rounded-2xl text-xs bg-surface text-foreground rounded-bl-sm">
              <p className="whitespace-pre-wrap">
                Welcome! I&apos;m your assistant for this project. How can I help you today?
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
                  <p key={i} className="whitespace-pre-wrap">
                    {part.text}
                  </p>
                ) : null
              )}
            </div>
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-surface px-3 py-2 rounded-2xl rounded-bl-sm">
              <div className="flex space-x-1">
                <div
                  className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
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
    </aside>
  );
}
