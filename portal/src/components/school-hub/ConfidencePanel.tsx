"use client";

import type { Kid, SchoolEvent } from "@/lib/school-hub-types";
import { getDayOfWeekInChicago } from "@/lib/school-hub-date";
import { cn } from "@/lib/utils";

interface ConfidencePanelProps {
  kids: Kid[];
  events: SchoolEvent[];
  today: string;
}

export function ConfidencePanel({ kids, events, today }: ConfidencePanelProps) {
  const dayName = getDayOfWeekInChicago();

  // Count rides on activities whose schedule mentions today's weekday. This is a
  // floor count — authoritative ride attribution will come once Google Calendar
  // events carry ride metadata.
  const ridesToday = kids.reduce((total, kid) => {
    return (
      total +
      kid.activities.reduce((sum, activity) => {
        if (!activity.rides || !activity.schedule) return sum;
        return activity.schedule.includes(dayName.slice(0, 3))
          ? sum + activity.rides.length
          : sum;
      }, 0)
    );
  }, 0);

  const unconfirmedRides = kids.reduce((total, kid) => {
    return (
      total +
      kid.activities.reduce((sum, activity) => {
        if (!activity.rides || !activity.schedule) return sum;
        if (!activity.schedule.includes(dayName.slice(0, 3))) return sum;
        return sum + activity.rides.filter((r) => !r.confirmed).length;
      }, 0)
    );
  }, 0);

  const homeworkPending = kids.reduce(
    (total, kid) =>
      total + (kid.homework?.filter((h) => h.status === "pending").length ?? 0),
    0,
  );

  const homeworkDueToday = kids.reduce(
    (total, kid) =>
      total +
      (kid.homework?.filter(
        (h) => h.status === "pending" && h.dueDate === today,
      ).length ?? 0),
    0,
  );

  const allConfirmed = unconfirmedRides === 0;

  return (
    <div className="p-5 rounded-xl bg-card border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Today at a glance
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border",
            allConfirmed
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {allConfirmed
            ? "All confirmed"
            : `${unconfirmedRides} unconfirmed`}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Events" value={events.length} />
        <Stat label="Rides" value={ridesToday} />
        <Stat
          label="Homework"
          value={homeworkPending}
          subtext={
            homeworkDueToday > 0 ? `${homeworkDueToday} due today` : undefined
          }
        />
        <Stat
          label="Unconfirmed"
          value={unconfirmedRides}
          tone={allConfirmed ? "ok" : "warn"}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  subtext,
  tone,
}: {
  label: string;
  value: number;
  subtext?: string;
  tone?: "ok" | "warn";
}) {
  return (
    <div>
      <div
        className={cn(
          "text-2xl font-semibold tabular-nums",
          tone === "warn" ? "text-amber-400" : "text-foreground",
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {subtext && (
        <div className="mt-0.5 text-[10px] text-amber-400">{subtext}</div>
      )}
    </div>
  );
}
