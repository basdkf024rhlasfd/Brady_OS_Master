"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  CalendarDays,
  Camera,
  DollarSign,
  ArrowLeftRight,
  MessageSquarePlus,
  Star,
  UtensilsCrossed,
  BookOpen,
} from "lucide-react";

const navItems = [
  { href: "/grocery-assistant/list", label: "Shopping List", icon: ShoppingCart },
  { href: "/grocery-assistant/meal-plan", label: "Meal Plan", icon: CalendarDays },
  { href: "/grocery-assistant/pantry", label: "Pantry Scan", icon: Camera },
  { href: "/grocery-assistant/budget", label: "Budget", icon: DollarSign },
  { href: "/grocery-assistant/prices", label: "Price Compare", icon: ArrowLeftRight },
  { href: "/grocery-assistant/requests", label: "Kid Requests", icon: MessageSquarePlus },
  { href: "/grocery-assistant/scores", label: "Meal Scores", icon: Star },
  { href: "/grocery-assistant/dining", label: "Dining Out", icon: UtensilsCrossed },
  { href: "/grocery-assistant/recipes", label: "Recipes", icon: BookOpen },
];

interface GroceryShellProps {
  children: React.ReactNode;
}

export function GroceryShell({ children }: GroceryShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-white/[0.08] bg-sidebar">
        <div className="p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Smallwood Family
          </p>
          <h1 className="text-lg font-semibold text-foreground">
            Grocery Assistant
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
            Walmart+ Delivery
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Smallwood Family
            </p>
            <h1 className="text-sm font-semibold text-foreground">
              Grocery Assistant
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
        <div className="pt-24 lg:pt-0">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
