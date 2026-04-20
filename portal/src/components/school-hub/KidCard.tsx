"use client";

import Link from "next/link";
import type { Kid, SchoolEvent, ActionItem } from "@/lib/school-hub-types";

interface KidCardProps {
  kid: Kid;
  events?: SchoolEvent[];
  actionItemCount?: number;
}

export function KidCard({ kid, events = [], actionItemCount = 0 }: KidCardProps) {
  return (
    <Link
      href={`/school-hub/kids/${kid.id}`}
      className="block p-5 rounded-xl bg-card border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: kid.color }}
        >
          {kid.name[0]}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
            {kid.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {kid.grade} grade &middot; {kid.school.includes("High") ? "BHS" : "Apple Glen"}
          </p>
        </div>
        {actionItemCount > 0 && (
          <span
            className="ml-auto px-2 py-0.5 text-[10px] font-medium rounded-full text-white"
            style={{ backgroundColor: kid.color }}
          >
            {actionItemCount} to-do{actionItemCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Today's Events */}
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: kid.color }}
              />
              <span>
                {event.startTime && (
                  <span className="text-foreground font-medium mr-1">{event.startTime}</span>
                )}
                {event.title}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-muted-foreground/60 italic">No events today</p>
      )}

      {/* Activities */}
      {kid.activities.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
          {kid.activities.map((activity) => (
            <span
              key={activity.name}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/[0.06] text-muted-foreground"
            >
              {activity.name}
            </span>
          ))}
        </div>
      )}

      {/* Dismissal pill */}
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Dismissal
          </span>
          <span className="font-semibold text-foreground tabular-nums">
            {kid.dismissalTime}
          </span>
        </span>
      </div>
    </Link>
  );
}
