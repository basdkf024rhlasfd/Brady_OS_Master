"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Globe,
  FileText,
  Send,
  Info,
} from "lucide-react";

const navItems = [
  { href: "/stihl/today", label: "Today", icon: LayoutDashboard },
  { href: "/stihl/competitors", label: "Competitors", icon: Users },
  { href: "/stihl/digital", label: "Digital", icon: Globe },
  { href: "/stihl/artifacts", label: "Artifacts", icon: FileText },
  { href: "/stihl/requests", label: "Requests", icon: Send },
  { href: "/stihl/about", label: "About", icon: Info },
];

interface StihlShellProps {
  children: React.ReactNode;
}

export function StihlShell({ children }: StihlShellProps) {
  const pathname = usePathname();

  return (
    <div className="stihl-dark flex h-full flex-col overflow-hidden bg-background lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-white/[0.08] bg-sidebar">
        <div className="p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Competitive Intelligence
          </p>
          <h1 className="text-lg font-semibold text-foreground">
            STIHL Briefing
          </h1>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
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
        </nav>

        <div className="p-4 border-t border-white/[0.08]">
          <p className="text-[10px] text-muted-foreground">
            Internal use only
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden shrink-0 border-b border-white/[0.08] bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Competitive Intelligence
            </p>
            <h1 className="text-sm font-semibold text-foreground">
              STIHL Briefing
            </h1>
          </div>
        </div>
        <nav className="flex overflow-x-auto px-4 pb-2 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div>
          {/* Subtle radial glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
