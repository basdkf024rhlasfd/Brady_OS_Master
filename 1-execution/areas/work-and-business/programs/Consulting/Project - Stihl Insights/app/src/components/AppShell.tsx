"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/today", label: "Today" },
  { href: "/competitors", label: "Competitors" },
  { href: "/digital", label: "Digital" },
  { href: "/artifacts", label: "Artifacts" },
  { href: "/requests", label: "Requests" },
  { href: "/about", label: "About" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-[#09090b] lg:flex lg:flex-col">
        <div className="border-b border-white/8 px-5 py-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Competitive Intelligence
          </div>
          <div className="mt-2 text-lg font-semibold text-white">STIHL Briefing</div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
