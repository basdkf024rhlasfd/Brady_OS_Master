"use client";

import { useState, useRef, useEffect, useMemo, useCallback, forwardRef, useImperativeHandle } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { ProjectNav } from "@/lib/nav-types";
import Markdown from "react-markdown";

interface Shortcut {
  label: string;
  command: string;
  source: "config" | "custom";
}

const STORAGE_KEY_PREFIX = "group-shortcuts-";

function loadCustomShortcuts(groupId: string): Shortcut[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + groupId);
    return raw ? (JSON.parse(raw) as Shortcut[]) : [];
  } catch {
    return [];
  }
}

function saveCustomShortcuts(groupId: string, items: Shortcut[]) {
  localStorage.setItem(STORAGE_KEY_PREFIX + groupId, JSON.stringify(items));
}

export interface GroupChatBarHandle {
  sendMessage: (text: string) => void;
}

export const GroupChatBar = forwardRef<GroupChatBarHandle, {
  groupId: string;
  groupLabel: string;
  shortcuts?: { label: string; command: string }[];
  welcomeMessage?: string;
}>(function GroupChatBar({
  groupId,
  groupLabel,
  shortcuts: configShortcuts = [],
  welcomeMessage = "",
}, ref) {
  const { isAdmin, chatMode, toggleChatMode, configData, projectConfigs } = useWorkspace();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<ProjectNav[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Shortcut CRUD state ---
  const [customShortcuts, setCustomShortcuts] = useState<Shortcut[]>([]);
  const [editing, setEditing] = useState<{ index: number; source: "config" | "custom" } | "new" | null>(null);
  const [formLabel, setFormLabel] = useState("");
  const [formCommand, setFormCommand] = useState("");
  const [managingShortcuts, setManagingShortcuts] = useState(false);

  // Load custom shortcuts from localStorage on mount
  useEffect(() => {
    setCustomShortcuts(loadCustomShortcuts(groupId));
  }, [groupId]);

  // Merge config + custom shortcuts
  const allShortcuts: Shortcut[] = useMemo(() => {
    const fromConfig: Shortcut[] = configShortcuts.map((s) => ({ ...s, source: "config" as const }));
    return [...fromConfig, ...customShortcuts];
  }, [configShortcuts, customShortcuts]);

  // Persist custom shortcuts
  const persistCustom = useCallback((next: Shortcut[]) => {
    setCustomShortcuts(next);
    saveCustomShortcuts(groupId, next);
  }, [groupId]);

  function openNewForm() {
    setFormLabel("");
    setFormCommand("");
    setEditing("new");
  }

  function openEditForm(index: number, source: "config" | "custom") {
    const list = source === "config"
      ? configShortcuts.map((s) => ({ ...s, source: "config" as const }))
      : customShortcuts;
    const item = list[index];
    if (!item) return;
    setFormLabel(item.label);
    setFormCommand(item.command);
    setEditing({ index, source });
  }

  function saveForm() {
    const label = formLabel.trim();
    const command = formCommand.trim();
    if (!label || !command) return;

    if (editing === "new") {
      persistCustom([...customShortcuts, { label, command, source: "custom" }]);
    } else if (editing && typeof editing === "object") {
      if (editing.source === "custom") {
        const next = [...customShortcuts];
        next[editing.index] = { label, command, source: "custom" };
        persistCustom(next);
      } else {
        // Editing a config shortcut — save as a custom override (add custom, config stays)
        // We'll replace: remove existing custom with same original command, add new
        const original = configShortcuts[editing.index];
        const next = customShortcuts.filter((s) => s.command !== original.command);
        next.push({ label, command, source: "custom" });
        persistCustom(next);
      }
    }
    setEditing(null);
  }

  function deleteShortcut(index: number, source: "config" | "custom") {
    if (source === "custom") {
      const next = customShortcuts.filter((_, i) => i !== index);
      persistCustom(next);
    }
    // Config shortcuts can't be deleted (they come from YAML) — but user can just ignore them
    setEditing(null);
  }

  function cancelForm() {
    setEditing(null);
  }

  // --- Chat logic ---
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

  const shortcutCommands = useMemo(
    () => new Set(allShortcuts.map((s) => s.command.replace(/^\//, "").toLowerCase())),
    [allShortcuts]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.startsWith("/")) {
      const query = val.slice(1).toLowerCase();
      if (shortcutCommands.has(query)) {
        setSuggestions([]);
      } else {
        setSuggestions(
          projectConfigs
            .filter(
              (p) =>
                p.slug.toLowerCase().includes(query) ||
                p.label.toLowerCase().includes(query)
            )
            .slice(0, 5)
        );
      }
    } else {
      setSuggestions([]);
    }
  };

  const navigateTo = useCallback((project: ProjectNav) => {
    router.push(project.href);
    setInput("");
    setSuggestions([]);
  }, [router]);

  const handleSend = useCallback((text?: string) => {
    const msg = text ?? input;
    if (!msg.trim() || isStreaming) return;
    if (msg.startsWith("/")) {
      const query = msg.slice(1).trim().toLowerCase();
      if (!shortcutCommands.has(query)) {
        const match = projectConfigs.find((p) => p.slug.toLowerCase() === query);
        if (match) { navigateTo(match); return; }
      }
    }
    sendMessage({ text: msg });
    setInput("");
    setSuggestions([]);
  }, [input, isStreaming, shortcutCommands, projectConfigs, navigateTo, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setSuggestions([]); return; }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (suggestions.length === 1) navigateTo(suggestions[0]);
      else handleSend();
    }
  };

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => handleSend(text) }), [handleSend]);

  const isEmpty = messages.length === 0 && !isStreaming;

  // Split shortcuts for rendering: config-origin vs custom-origin
  const configIndexed = configShortcuts.map((s, i) => ({ ...s, source: "config" as const, idx: i }));
  const customIndexed = customShortcuts.map((s, i) => ({ ...s, source: "custom" as const, idx: i }));
  const allIndexed = [...configIndexed, ...customIndexed];

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
          {messages.length > 0 ? `${messages.length} message${messages.length !== 1 ? "s" : ""}` : ""}
        </span>
      </div>

      {/* Messages — scrollable area */}
      <div className="max-h-72 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-2">
        {isEmpty && (
          <div className="py-2 space-y-3">
            {welcomeMessage && (
              <p className="text-xs text-text-secondary leading-relaxed">
                {welcomeMessage}
              </p>
            )}

            {/* Shortcut chips */}
            {allIndexed.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {allIndexed.map((s) => (
                  <div key={`${s.source}-${s.idx}`} className="group relative">
                    <button
                      onClick={() => !managingShortcuts && handleSend(s.command)}
                      disabled={isStreaming || managingShortcuts}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors disabled:opacity-50 ${
                        s.source === "custom"
                          ? "border-accent/30 bg-accent/5 text-accent hover:bg-accent/10"
                          : "border-border bg-background text-text-secondary hover:bg-surface-active hover:text-foreground"
                      }`}
                    >
                      {s.label}
                      <span className="ml-1 text-[9px] text-text-hint font-mono">{s.command}</span>
                    </button>
                    {/* Edit/delete overlay on manage mode */}
                    {managingShortcuts && (
                      <div className="absolute -top-1 -right-1 flex gap-0.5">
                        <button
                          onClick={() => openEditForm(s.idx, s.source)}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-surface border border-border text-[8px] text-text-muted hover:text-foreground hover:bg-surface-active shadow-sm"
                          title="Edit"
                        >
                          E
                        </button>
                        {s.source === "custom" && (
                          <button
                            onClick={() => deleteShortcut(s.idx, s.source)}
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-red-50 border border-red-200 text-[8px] text-red-500 hover:bg-red-100 shadow-sm"
                            title="Delete"
                          >
                            X
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {/* Add + Manage buttons */}
                <button
                  onClick={openNewForm}
                  className="rounded-full border border-dashed border-border bg-transparent px-2.5 py-1 text-[11px] font-medium text-text-hint hover:text-foreground hover:border-foreground transition-colors"
                  title="Add shortcut"
                >
                  +
                </button>
                <button
                  onClick={() => setManagingShortcuts((v) => !v)}
                  className={`rounded-full px-2 py-1 text-[9px] font-medium transition-colors ${
                    managingShortcuts
                      ? "bg-accent text-white"
                      : "text-text-hint hover:text-foreground"
                  }`}
                >
                  {managingShortcuts ? "Done" : "Manage"}
                </button>
              </div>
            )}

            {/* Empty state — no shortcuts at all */}
            {allIndexed.length === 0 && !welcomeMessage && (
              <div className="flex items-center gap-2">
                <p className="text-[11px] text-text-hint italic py-1">
                  No shortcuts yet.
                </p>
                <button
                  onClick={openNewForm}
                  className="rounded-full border border-dashed border-border px-2.5 py-1 text-[11px] font-medium text-text-hint hover:text-foreground hover:border-foreground transition-colors"
                >
                  + Add shortcut
                </button>
              </div>
            )}

            {/* Inline create/edit form */}
            {editing !== null && (
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {editing === "new" ? "New Shortcut" : "Edit Shortcut"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value)}
                    placeholder="Label (e.g. Bedtime check)"
                    className="flex-1 px-2.5 py-1 border border-border rounded-md bg-background text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter") saveForm(); if (e.key === "Escape") cancelForm(); }}
                  />
                  <input
                    type="text"
                    value={formCommand}
                    onChange={(e) => setFormCommand(e.target.value)}
                    placeholder="Command (e.g. /bedtime or full prompt)"
                    className="flex-1 px-2.5 py-1 border border-border rounded-md bg-background text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                    onKeyDown={(e) => { if (e.key === "Enter") saveForm(); if (e.key === "Escape") cancelForm(); }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveForm}
                    disabled={!formLabel.trim() || !formCommand.trim()}
                    className="rounded-md bg-accent px-3 py-1 text-[11px] font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelForm}
                    className="rounded-md px-3 py-1 text-[11px] font-medium text-text-muted hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  {editing !== "new" && editing.source === "custom" && (
                    <button
                      onClick={() => { deleteShortcut(editing.index, editing.source); }}
                      className="ml-auto rounded-md px-3 py-1 text-[11px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <p className="ml-auto text-[9px] text-text-hint">
                    {editing === "new" ? "Custom shortcuts persist in your browser" : editing.source === "config" ? "Config shortcut — edits saved as custom override" : ""}
                  </p>
                </div>
              </div>
            )}
          </div>
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
                  msg.role === "assistant" ? (
                    <div key={i} className="prose prose-xs prose-neutral dark:prose-invert max-w-none leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      <Markdown>{part.text}</Markdown>
                    </div>
                  ) : (
                    <p key={i} className="whitespace-pre-wrap leading-relaxed">{part.text}</p>
                  )
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
            placeholder={allShortcuts.length > 0 ? `Ask anything or try /today, /meals, /week…` : `Ask about ${groupLabel} or /navigate…`}
            className="flex-1 px-3 py-1.5 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent text-xs"
            disabled={isStreaming}
          />
          <button
            onClick={() => handleSend()}
            disabled={isStreaming || !input.trim()}
            className="px-3 py-1.5 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent-hover disabled:bg-text-hint disabled:cursor-not-allowed transition-colors shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
});
