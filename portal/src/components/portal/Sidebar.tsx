"use client";

import { useState, useCallback, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GripVertical, Star } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav, AccessEntry } from "@/lib/nav-types";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useSidebarLayout } from "@/hooks/useSidebarLayout";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-groups";

const miscResources = [
  { href: "/notes/quick", label: "Quick Notes", short: "N" },
  { href: "/notes/advanced", label: "Advanced Queue", short: "Q" },
  { href: "/dashboards/command-console", label: "Command Console", short: "C" },
  { href: "/calculators/birthday", label: "Birthday Planner", short: "B" },
  { href: "/calculators/wedding", label: "Wedding Seating", short: "W" },
  { href: "/calculators/garage-sale", label: "Garage Sale Pricer", short: "G" },
  { href: "/calculators/fence-bid", label: "Fence Bid Checker", short: "F" },
  { href: "/dashboards/portfolio", label: "Portfolio Scorecard", short: "P" },
  { href: "/dashboards/vendor-portal", label: "Vendor Portal", short: "V" },
];

const externalLinks = [
  { href: "http://localhost:3000", label: "BradyOS", short: "O" },
];

const adminLinks = [
  { href: "/admin/access", label: "Access Control", short: "A" },
];

const bottomLinks = [
  { href: "/user-profile", label: "My Profile", short: "U" },
  { href: "/about", label: "About", short: "?" },
];

const roleColors: Record<AccessEntry["role"], string> = {
  owner: "bg-purple-100 text-purple-700",
  admin: "bg-amber-100 text-amber-700",
  "all-projects": "bg-blue-100 text-blue-700",
  viewer: "bg-surface-active text-text-secondary",
};

function AccessTooltip({ entries, label }: { entries: AccessEntry[]; label: string }) {
  return (
    <div className="absolute left-full top-0 ml-2 z-50 w-64 rounded-lg border border-border bg-background shadow-lg p-3 pointer-events-none">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
        {label}
      </p>
      {entries.length === 0 ? (
        <p className="text-xs text-text-hint italic">Only you</p>
      ) : (
        <div className="space-y-1.5">
          {entries.map((e) => (
            <div key={e.email} className="flex items-center justify-between gap-2">
              <span className="text-xs text-foreground truncate">{e.email}</span>
              <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${roleColors[e.role]}`}>
                {e.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ShareCount({ entries, label }: { entries: AccessEntry[]; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node && hovered) {
        const rect = node.getBoundingClientRect();
        setPos({ top: rect.top, left: rect.right + 8 });
      }
    },
    [hovered]
  );

  return (
    <span
      ref={ref}
      className="hidden md:flex items-center justify-center w-5 h-7 shrink-0 text-[10px] text-text-hint cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {entries.length}
      {hovered && (
        <div
          className="fixed z-50 w-64 rounded-lg border border-border bg-background shadow-lg p-3 pointer-events-none"
          style={{ top: pos.top, left: pos.left }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            {label}
          </p>
          <div className="space-y-1.5">
            {entries.map((e) => (
              <div key={e.email} className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground truncate">{e.email}</span>
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${roleColors[e.role]}`}>
                  {e.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

function SortableNavItem({
  p,
  isAdmin,
  collapsed,
  dragEnabled,
  accessMap,
  isStarred,
  onToggleStar,
}: {
  p: ProjectNav;
  isAdmin: boolean;
  collapsed: boolean;
  /** Off on touch — a pointer-drag sensor would swallow drawer scrolling. */
  dragEnabled: boolean;
  accessMap: ReturnType<typeof useWorkspace>["accessMap"];
  isStarred?: boolean;
  onToggleStar?: (slug: string) => void;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === p.href || pathname.startsWith(`${p.href}/`);
  const entries = accessMap?.[p.slug] ?? null;
  const sharedEntries = entries?.filter(
    (e) => e.email !== "brady.smallwood@gmail.com" && e.email !== "bradysmallz@gmail.com"
  ) ?? [];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: p.slug, disabled: !dragEnabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex items-center"
    >
      {/* Drag handle — admin + expanded + pointer input only */}
      {dragEnabled && (
        <button
          {...attributes}
          {...listeners}
          tabIndex={-1}
          className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-3 h-7 text-text-hint cursor-grab active:cursor-grabbing shrink-0 mr-0.5 transition-opacity"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-3 w-3" />
        </button>
      )}

      <Link
        href={p.href}
        className={`flex flex-1 h-9 md:h-7 items-center rounded-md px-2 text-xs transition min-w-0 ${
          isActive
            ? "bg-surface-active text-foreground"
            : "text-text-secondary hover:bg-surface hover:text-foreground"
        }`}
      >
        {!collapsed && <span className="truncate">{p.label}</span>}
      </Link>

      {/* Share count + tooltip */}
      {isAdmin && !collapsed && sharedEntries.length > 0 && (
        <ShareCount entries={sharedEntries} label={p.label} />
      )}

      {/* Star toggle — admin + expanded + hovered. Hidden on touch, where a
          hover-revealed control is an invisible tap target. */}
      {isAdmin && !collapsed && onToggleStar && (
        <button
          tabIndex={-1}
          onClick={(e) => { e.preventDefault(); onToggleStar(p.slug); }}
          className={`opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-5 h-7 shrink-0 transition-opacity ${
            isStarred ? "!opacity-100 text-amber-400" : "text-text-hint hover:text-amber-400"
          }`}
          aria-label={isStarred ? "Unstar" : "Star"}
        >
          <Star className="h-3 w-3" fill={isStarred ? "currentColor" : "none"} />
        </button>
      )}

    </div>
  );
}

export function Sidebar({
  isAdmin,
  projects,
  projectConfigs,
  mobileOpen = false,
  onMobileClose,
}: {
  isAdmin: boolean;
  projects: ProjectId[];
  projectConfigs: ProjectNav[];
  /** Below md the sidebar is an off-canvas drawer driven by AppShell. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const { accessMap } = useWorkspace();

  const [collapsedPref, setCollapsedPref] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsedPref(JSON.parse(saved));
  }, []);

  // Defaults to true so SSR renders the desktop tree and hydration matches.
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Icon-rail mode is a desktop affordance — the mobile drawer is always full
  // width, so it must always render labels regardless of the saved preference.
  const collapsed = collapsedPref && isDesktop;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    projects: true,
    misc: false,
    "dev-tools": false,
    "unfinished-work": true,
    family: true,
    "vc-startup": true,
    "panda-engagement": true,
    "1915-south-engagement": true,
    incubator: false,
  });

  const { allSlugs, starredItems, starred, toggleStar, getUngroupedItems, getGroupItems, move, resetLayout } = useSidebarLayout(
    projectConfigs,
    projects,
    SIDEBAR_GROUPS
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function toggleCollapse() {
    const next = !collapsedPref;
    setCollapsedPref(next);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(next));
  }

  function toggleGroup(key: string) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        move(String(active.id), String(over.id));
      }
    },
    [move]
  );

  function navLink(link: { href: string; label: string; short: string; matches?: string[] }) {
    const matches = link.matches ?? [link.href];
    const isActive = matches.some(
      (m) => pathname === m || pathname.startsWith(`${m}/`)
    );
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex h-9 md:h-7 items-center rounded-md px-2 text-xs transition ${
          isActive
            ? "bg-surface-active text-foreground"
            : "text-text-secondary hover:bg-surface hover:text-foreground"
        }`}
      >
        {collapsed ? "" : link.label}
      </Link>
    );
  }

  return (
    <aside
      className={`sidebar-dark pt-safe pl-safe fixed inset-y-0 left-0 z-40 flex h-dvh w-64 flex-col border-r border-border bg-background transition-transform duration-200 md:static md:z-auto md:w-56 md:translate-x-0 md:transition-all ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "md:w-14" : "md:w-56"}`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        {!collapsed && (
          <Link href="/portal" className="text-sm font-bold text-foreground">
            mception<span className="text-accent-brand">.ai</span>
          </Link>
        )}
        <button
          onClick={isDesktop ? toggleCollapse : onMobileClose}
          aria-label={isDesktop ? "Toggle sidebar" : "Close navigation"}
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition hover:bg-surface-active hover:text-foreground"
        >
          {!isDesktop ? "\u00d7" : collapsed ? "\u2261" : "\u2190"}
        </button>
      </div>

      <div className="space-y-0.5 px-2 pt-3">
        <Link
          href="/portal"
          className={`flex h-8 items-center rounded-md px-2 text-sm transition ${
            pathname === "/portal"
              ? "bg-surface-active text-foreground"
              : "text-text-secondary hover:bg-surface hover:text-foreground"
          }`}
        >
          {collapsed ? "H" : "Home"}
        </Link>
      </div>

      <div className="mx-2 my-2 border-t border-border-light" />

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-1">
        {/* My Projects */}
        <div className="mb-1">
          <div className="flex items-center">
            <button
              onClick={() => toggleGroup("projects")}
              className="flex h-7 flex-1 items-center rounded-md px-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted transition hover:text-text-secondary"
            >
              {collapsed ? (
                "P"
              ) : (
                <>
                  <span className="flex-1 text-left">My Projects</span>
                  <span className="text-[10px]">
                    {openGroups.projects ? "\u25BE" : "\u25B8"}
                  </span>
                </>
              )}
            </button>
          </div>

          {openGroups.projects && (
            <div className="ml-1 space-y-0.5">
              {/* Starred section — shown above DnD list */}
              {!collapsed && starredItems.length > 0 && (
                <div className="mb-1">
                  <div className="flex h-6 items-center px-2">
                    <Star className="h-2.5 w-2.5 text-amber-400 mr-1.5" fill="currentColor" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-hint">Starred</span>
                  </div>
                  <div className="space-y-0.5">
                    {starredItems.map((p) => (
                      <Link
                        key={p.slug}
                        href={p.href}
                        className={`flex h-9 md:h-7 items-center rounded-md px-2 text-xs transition min-w-0 ${
                          pathname === p.href || pathname.startsWith(`${p.href}/`)
                            ? "bg-surface-active text-foreground"
                            : "text-text-secondary hover:bg-surface hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{p.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mx-1 mt-1 border-t border-border-light" />
                </div>
              )}

              {/* One DndContext covers all projects — enables cross-group dragging */}
              <DndContext
                id="sidebar-projects"
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={allSlugs} strategy={verticalListSortingStrategy}>
                  {/* Ungrouped items */}
                  {getUngroupedItems().map((p) => (
                    <SortableNavItem
                      key={p.slug}
                      p={p}
                      isAdmin={isAdmin}
                      collapsed={collapsed}
                      dragEnabled={isAdmin && !collapsed && isDesktop}
                      accessMap={accessMap}
                      isStarred={starred.includes(p.slug)}
                      onToggleStar={toggleStar}
                    />
                  ))}

                  {/* Groups */}
                  {SIDEBAR_GROUPS.map((group) => {
                    const groupItems = getGroupItems(group.id);
                    if (groupItems.length === 0) return null;
                    const isOpen = openGroups[group.id] ?? true;
                    return (
                      <div key={group.id} className="mt-1">
                        <div className="flex h-6 w-full items-center rounded-md text-[10px] font-semibold uppercase tracking-wider text-text-hint">
                          {collapsed ? (
                            <button
                              onClick={() => toggleGroup(group.id)}
                              className="flex h-6 w-full items-center justify-center rounded-md transition hover:text-text-secondary"
                            >
                              {group.label[0]}
                            </button>
                          ) : (
                            <>
                              <Link
                                href={`/group/${group.id}`}
                                className="flex-1 px-2 truncate transition hover:text-text-secondary leading-6"
                              >
                                {group.label}
                              </Link>
                              <button
                                onClick={() => toggleGroup(group.id)}
                                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:text-text-secondary shrink-0"
                              >
                                <span className="text-[9px]">{isOpen ? "\u25BE" : "\u25B8"}</span>
                              </button>
                            </>
                          )}
                        </div>
                        {isOpen && (
                          <div className="ml-2 space-y-0.5 border-l border-border-light pl-1">
                            {groupItems.map((p) => (
                              <SortableNavItem
                                key={p.slug}
                                p={p}
                                isAdmin={isAdmin}
                                collapsed={collapsed}
                                dragEnabled={isAdmin && !collapsed && isDesktop}
                                accessMap={accessMap}
                                isStarred={starred.includes(p.slug)}
                                onToggleStar={toggleStar}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </SortableContext>
              </DndContext>

              {/* Reset layout — admin only, expanded only */}
              {isAdmin && !collapsed && (
                <button
                  onClick={resetLayout}
                  className="mt-1 flex h-6 w-full items-center rounded-md px-2 text-[10px] text-text-hint hover:text-text-secondary transition"
                >
                  Reset order
                </button>
              )}
            </div>
          )}
        </div>

        {/* Developers — admin only */}
        {isAdmin && (
          <div className="mb-1">
            <button
              onClick={() => toggleGroup("misc")}
              className="flex h-7 w-full items-center rounded-md px-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted transition hover:text-text-secondary"
            >
              {collapsed ? (
                "R"
              ) : (
                <>
                  <span className="flex-1 text-left">Developers</span>
                  <span className="text-[10px]">
                    {openGroups.misc ? "\u25BE" : "\u25B8"}
                  </span>
                </>
              )}
            </button>

            {openGroups.misc && !collapsed && (
              <div className="ml-1 space-y-0.5">
                {/* Admin links */}
                {adminLinks.map((link) => navLink(link))}

                {/* Dev Tools sub-group */}
                <button
                  onClick={() => toggleGroup("dev-tools")}
                  className="flex h-6 w-full items-center rounded-md px-2 text-[10px] font-semibold uppercase tracking-wider text-text-hint transition hover:text-text-secondary"
                >
                  <span className="flex-1 text-left">Dev Tools</span>
                  <span className="text-[9px]">{openGroups["dev-tools"] ? "\u25BE" : "\u25B8"}</span>
                </button>
                {openGroups["dev-tools"] && (
                  <div className="ml-2 space-y-0.5 border-l border-border-light pl-1">
                    {externalLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 md:h-7 items-center rounded-md px-2 text-xs text-text-secondary transition hover:bg-surface hover:text-foreground"
                      >
                        {link.label}
                        <span className="ml-auto text-[10px] text-text-hint">&nearr;</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Unfinished Work sub-group */}
                <button
                  onClick={() => toggleGroup("unfinished-work")}
                  className="flex h-6 w-full items-center rounded-md px-2 text-[10px] font-semibold uppercase tracking-wider text-text-hint transition hover:text-text-secondary"
                >
                  <span className="flex-1 text-left">Unfinished Work</span>
                  <span className="text-[9px]">{openGroups["unfinished-work"] ? "\u25BE" : "\u25B8"}</span>
                </button>
                {openGroups["unfinished-work"] && (
                  <div className="ml-2 space-y-0.5 border-l border-border-light pl-1">
                    {miscResources.map((link) => navLink(link))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom links */}
        <div className="mt-2 border-t border-border-light pt-2 space-y-0.5">
          {bottomLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-9 md:h-7 items-center rounded-md px-2 text-xs transition ${
                  isActive
                    ? "bg-surface-active text-foreground"
                    : "text-text-secondary hover:bg-surface hover:text-foreground"
                }`}
              >
                {collapsed ? "" : link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="pb-safe border-t border-border px-2 py-2">
        <div
          className={`flex items-center rounded-md px-2 py-1.5 transition ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Account
            </span>
          )}
          <UserButton
            showName={!collapsed}
            userProfileMode="navigation"
            userProfileUrl="/user-profile"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-9 w-9 ring-1 ring-border",
                userButtonBox: collapsed
                  ? "justify-center"
                  : "w-full flex-row-reverse justify-between gap-3 text-foreground",
                userButtonOuterIdentifier: "max-w-[120px] truncate text-sm",
              },
            }}
          />
        </div>
      </div>
    </aside>
  );
}
