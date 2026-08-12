"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  User,
  ClipboardList,
  BookOpen,
} from "lucide-react";
import { KIDS, KID_IDS } from "@/lib/school-hub-data";

const mainNav = [
  { href: "/school-hub/today", label: "Today", icon: LayoutDashboard },
  { href: "/school-hub/calendar", label: "Calendar", icon: Calendar },
  { href: "/school-hub/action-items", label: "Action Items", icon: ClipboardList },
  { href: "/school-hub/directory", label: "Directory", icon: BookOpen },
];

interface SchoolHubShellProps {
  children: React.ReactNode;
}

export function SchoolHubShell({ children }: SchoolHubShellProps) {
  const pathname = usePathname();

  const kidNavItems = KID_IDS.map((id) => ({
    href: `/school-hub/kids/${id}`,
    label: KIDS[id].name,
    color: KIDS[id].color,
  }));

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-white/[0.08] bg-[#0a0a0f]">
        <div className="p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Family Logistics
          </p>
          <h1 className="text-lg font-semibold text-foreground">
            School Hub
          </h1>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Kids section */}
          <div className="mt-6">
            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Kids
            </p>
            <ul className="space-y-1">
              {kidNavItems.map((kid) => {
                const isActive = pathname === kid.href;
                return (
                  <li key={kid.href}>
                    <Link
                      href={kid.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/[0.08] text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                      )}
                    >
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: kid.color }}
                      />
                      {kid.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-white/[0.08]">
          <p className="text-[10px] text-muted-foreground">
            Personal use only
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden shrink-0 border-b border-white/[0.08] bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Family Logistics
            </p>
            <h1 className="text-sm font-semibold text-foreground">
              School Hub
            </h1>
          </div>
        </div>
        <nav className="flex overflow-x-auto px-4 pb-2 gap-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {kidNavItems.map((kid) => {
            const isActive = pathname === kid.href;
            return (
              <Link
                key={kid.href}
                href={kid.href}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                  isActive
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: kid.color }}
                />
                {kid.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
