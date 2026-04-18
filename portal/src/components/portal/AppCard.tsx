"use client";

import Link from "next/link";
import type { AppEntry } from "@/lib/app-registry";

interface AppCardProps {
  app: AppEntry;
}

export function AppCard({ app }: AppCardProps) {
  const isExternal = app.embedType === "external";

  const content = (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-slate-600 transition group-hover:bg-slate-600 group-hover:text-white">
        {app.icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{app.name}</h3>
      <p className="mt-1 text-xs text-gray-500">{app.description}</p>
      {app.embedType === "iframe-proxy" && (
        <span className="mt-2 inline-block text-[10px] text-gray-400">
          port {app.proxyPort}
        </span>
      )}
    </div>
  );

  if (isExternal) {
    return (
      <a href={app.route} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={app.route}>{content}</Link>;
}
