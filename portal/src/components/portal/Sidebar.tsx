"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProjectId } from "@/lib/access";
import type { ProjectNav } from "@/lib/nav-types";

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

const bottomLinks = [
  { href: "/user-profile", label: "My Profile", short: "U" },
  { href: "/about", label: "About", short: "?" },
];

export function Sidebar({ isAdmin, projects, projectConfigs }: { isAdmin: boolean; projects: ProjectId[]; projectConfigs: ProjectNav[] }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    projects: true,
    misc: false,
  });

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(next));
  }

  function toggleGroup(key: string) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function navLink(link: {
    href: string;
    label: string;
    short: string;
    matches?: string[];
  }) {
    const matches = link.matches ?? [link.href];
    const isActive = matches.some((match) =>
      pathname === match || pathname.startsWith(`${match}/`)
    );

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex h-7 items-center rounded-md px-2 text-xs transition ${
          isActive
            ? "bg-surface-active text-foreground"
            : "text-text-secondary hover:bg-surface hover:text-foreground"
        }`}
      >
        <span className="mr-2 w-4 text-center text-[10px] text-text-hint">
          {link.short}
        </span>
        {collapsed ? "" : link.label}
      </Link>
    );
  }

  return (
    <aside
      className={`flex h-screen flex-col border-r border-border bg-background transition-all ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        {!collapsed && (
          <Link href="/portal" className="text-sm font-bold text-foreground">
            mception<span className="text-accent-brand">.ai</span>
          </Link>
        )}
        <button
          onClick={toggleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition hover:bg-surface-active hover:text-foreground"
        >
          {collapsed ? "\u2261" : "\u2190"}
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
          <button
            onClick={() => toggleGroup("projects")}
            className="flex h-7 w-full items-center rounded-md px-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted transition hover:text-text-secondary"
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

          {openGroups.projects && !collapsed && (
            <div className="ml-1 space-y-0.5">
              {projectConfigs
                .filter((p) => projects.includes(p.slug))
                .map((p) =>
                  navLink({
                    href: p.href,
                    label: p.label,
                    short: p.short,
                    matches: [p.href],
                  })
                )}
            </div>
          )}
        </div>

        {/* Miscellaneous Resources — admin only */}
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
                  <span className="flex-1 text-left">
                    Miscellaneous Resources
                  </span>
                  <span className="text-[10px]">
                    {openGroups.misc ? "\u25BE" : "\u25B8"}
                  </span>
                </>
              )}
            </button>

            {openGroups.misc && !collapsed && (
              <div className="ml-1 space-y-0.5">
                {miscResources.map((link) => navLink(link))}
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 items-center rounded-md px-2 text-xs text-text-secondary transition hover:bg-surface hover:text-foreground"
                  >
                    <span className="mr-2 w-4 text-center text-[10px] text-text-hint">
                      {link.short}
                    </span>
                    {link.label}
                    <span className="ml-auto text-[10px] text-text-hint">
                      &nearr;
                    </span>
                  </a>
                ))}
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
                className={`flex h-7 items-center rounded-md px-2 text-xs transition ${
                  isActive
                    ? "bg-surface-active text-foreground"
                    : "text-text-secondary hover:bg-surface hover:text-foreground"
                }`}
              >
                <span className="mr-2 w-4 text-center text-[10px] text-text-hint">
                  {link.short}
                </span>
                {collapsed ? "" : link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-2 py-2">
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
                userButtonAvatarBox:
                  "h-9 w-9 ring-1 ring-border",
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
