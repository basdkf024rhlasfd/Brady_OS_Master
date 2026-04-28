"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, ChevronRight, X, Plus, Loader2, Check } from "lucide-react";

type ProjectMeta = { slug: string; label: string; short: string };
type GroupMeta = { id: string; label: string; slugs: string[] };

type UserRecord = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  isOwner: boolean;
  isTest: boolean;
  allowedProjects: string[];
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function AccessControlClient({
  projects,
  groups,
  ungroupedSlugs,
}: {
  projects: ProjectMeta[];
  groups: GroupMeta[];
  ungroupedSlugs: string[];
}) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [saveState, setSaveState] = useState<Record<string, SaveState>>({});
  const [filter, setFilter] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [addMessage, setAddMessage] = useState<string | null>(null);
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        setUsers(d.users ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const saveProjects = useCallback(
    (userId: string, newProjects: string[]) => {
      clearTimeout(saveTimers.current[userId]);
      setSaveState((s) => ({ ...s, [userId]: "saving" }));

      saveTimers.current[userId] = setTimeout(async () => {
        try {
          const res = await fetch(`/api/admin/users/${userId}/access`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ allowedProjects: newProjects }),
          });
          if (!res.ok) throw new Error("Save failed");
          setSaveState((s) => ({ ...s, [userId]: "saved" }));
          setTimeout(() => setSaveState((s) => ({ ...s, [userId]: "idle" })), 1500);
        } catch {
          setSaveState((s) => ({ ...s, [userId]: "error" }));
        }
      }, 400);
    },
    []
  );

  function toggleProject(userId: string, slug: string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const has = u.allowedProjects.includes(slug);
        const next = has
          ? u.allowedProjects.filter((s) => s !== slug)
          : [...u.allowedProjects, slug];
        saveProjects(userId, next);
        return { ...u, allowedProjects: next };
      })
    );
  }

  function toggleExpanded(userId: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    });
  }

  function grantAll(userId: string) {
    const allSlugs = projects.map((p) => p.slug);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, allowedProjects: allSlugs } : u))
    );
    saveProjects(userId, allSlugs);
  }

  function revokeAll(userId: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, allowedProjects: [] } : u))
    );
    saveProjects(userId, []);
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    const email = addEmail.trim().toLowerCase();
    if (!email) return;

    const existing = users.find((u) => u.email.toLowerCase() === email);
    if (existing) {
      setExpanded((prev) => new Set([...prev, existing.id]));
      setAddEmail("");
      setAdding(false);
      setAddMessage(null);
      return;
    }

    setAddMessage(
      `"${email}" hasn't signed in yet. Send them a magic link — they'll appear here once they've authenticated.`
    );
  }

  const visibleUsers = users.filter((u) => {
    if (u.isOwner) return false;
    if (!filter) return true;
    return u.email.toLowerCase().includes(filter.toLowerCase());
  });

  const clientUsers = visibleUsers.filter((u) => !u.isTest);
  const testUsers = visibleUsers.filter((u) => u.isTest);

  function renderProjectGroups(user: UserRecord) {
    const renderGroup = (label: string, slugs: string[]) => {
      const groupProjects = slugs
        .map((s) => projectBySlug[s])
        .filter(Boolean);
      if (groupProjects.length === 0) return null;

      return (
        <div key={label} className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-hint mb-2">
            {label}
          </p>
          <div className="flex flex-wrap gap-2">
            {groupProjects.map((p) => {
              const granted = user.allowedProjects.includes(p.slug);
              return (
                <button
                  key={p.slug}
                  onClick={() => toggleProject(user.id, p.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-all ${
                    granted
                      ? "bg-accent-brand/15 border-accent-brand/40 text-foreground"
                      : "bg-surface border-border text-text-secondary hover:border-border-light hover:text-foreground"
                  }`}
                  title={p.slug}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                      granted
                        ? "bg-accent-brand border-accent-brand"
                        : "border-border-light"
                    }`}
                  >
                    {granted && <Check className="w-2.5 h-2.5 text-white" />}
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className="pt-4 pb-3 px-4 border-t border-border-light">
        {groups.map((g) => renderGroup(g.label, g.slugs))}
        {ungroupedSlugs.length > 0 && renderGroup("Other", ungroupedSlugs)}

        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border-light">
          <button
            onClick={() => grantAll(user.id)}
            className="text-xs text-text-muted hover:text-foreground transition"
          >
            Grant all
          </button>
          <span className="text-border-light">·</span>
          <button
            onClick={() => revokeAll(user.id)}
            className="text-xs text-text-muted hover:text-red-400 transition"
          >
            Revoke all
          </button>
        </div>
      </div>
    );
  }

  function renderUser(user: UserRecord) {
    const isExpanded = expanded.has(user.id);
    const count = user.allowedProjects.length;
    const state = saveState[user.id] ?? "idle";

    return (
      <div
        key={user.id}
        className="border border-border rounded-lg overflow-hidden"
      >
        {/* Header row */}
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface transition select-none"
          onClick={() => toggleExpanded(user.id)}
        >
          <button className="text-text-hint shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">{user.email}</p>
            {(user.firstName || user.lastName) && (
              <p className="text-xs text-text-muted truncate">
                {[user.firstName, user.lastName].filter(Boolean).join(" ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Save state indicator */}
            {state === "saving" && (
              <Loader2 className="w-3.5 h-3.5 text-text-hint animate-spin" />
            )}
            {state === "saved" && (
              <Check className="w-3.5 h-3.5 text-green-500" />
            )}
            {state === "error" && (
              <span className="text-[10px] text-red-400">Error</span>
            )}

            <span className="text-xs text-text-secondary">
              {count === 0
                ? "No access"
                : count === projects.length
                  ? "All projects"
                  : `${count} project${count === 1 ? "" : "s"}`}
            </span>

            {user.isTest && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-900/30 text-amber-400 font-medium">
                test
              </span>
            )}
          </div>
        </div>

        {isExpanded && renderProjectGroups(user)}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-secondary py-12">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading users…</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400 py-4">{error}</p>;
  }

  return (
    <div className="max-w-3xl space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by email…"
          className="flex-1 h-9 rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-text-hint focus:outline-none focus:ring-1 focus:ring-accent-brand"
        />
        <button
          onClick={() => setAdding((a) => !a)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-border text-sm text-text-secondary hover:text-foreground hover:bg-surface transition"
        >
          {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {adding ? "Cancel" : "Add user"}
        </button>
      </div>

      {/* Add user form */}
      {adding && (
        <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
          <form onSubmit={handleAddUser} className="flex items-center gap-3">
            <input
              type="email"
              value={addEmail}
              onChange={(e) => { setAddEmail(e.target.value); setAddMessage(null); }}
              placeholder="user@example.com"
              autoFocus
              className="flex-1 h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-text-hint focus:outline-none focus:ring-1 focus:ring-accent-brand"
            />
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-accent-brand text-white text-sm font-medium hover:opacity-90 transition"
            >
              Find user
            </button>
          </form>
          {addMessage ? (
            <p className="text-xs text-amber-400">{addMessage}</p>
          ) : (
            <p className="text-xs text-text-hint">
              User must have signed in at least once to appear here.
            </p>
          )}
        </div>
      )}

      {/* Users list */}
      {clientUsers.length === 0 && testUsers.length === 0 ? (
        <p className="text-sm text-text-secondary py-4">
          {filter ? "No users match that filter." : "No users with access yet."}
        </p>
      ) : (
        <div className="space-y-2">
          {clientUsers.map(renderUser)}
          {testUsers.length > 0 && (
            <>
              <div className="pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-hint mb-2">
                  Test Accounts
                </p>
              </div>
              {testUsers.map(renderUser)}
            </>
          )}
        </div>
      )}

      <p className="text-xs text-text-hint pt-2">
        Toggles save automatically. Grants take effect on next page load — no deployment required.
        Env-var grants (set in Vercel) are not shown here but also apply.
      </p>
    </div>
  );
}
