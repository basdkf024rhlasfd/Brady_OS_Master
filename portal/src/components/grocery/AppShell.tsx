"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingCart, UtensilsCrossed, Package } from "lucide-react";

const nav = [
  { href: "/grocery-assistant/order-list", label: "Order List", icon: ShoppingCart },
  { href: "/grocery-assistant/meal-plan", label: "Meal Plan", icon: UtensilsCrossed },
  { href: "/grocery-assistant/pantry", label: "Pantry", icon: Package },
];

export function GroceryShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-white/[0.08] bg-[#0a0a0f]">
        <div className="p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Family Logistics
          </p>
          <h1 className="text-lg font-semibold text-foreground">Grocery</h1>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {nav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
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
          <p className="text-[10px] text-muted-foreground">Personal use only</p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Family Logistics
            </p>
            <h1 className="text-sm font-semibold text-foreground">Grocery</h1>
          </div>
        </div>
        <nav className="flex overflow-x-auto px-4 pb-2 gap-1">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
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
        <div className="pt-28 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
