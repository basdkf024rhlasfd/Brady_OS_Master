"use client";

import { useState, useEffect } from "react";
import { KIDS, KID_IDS } from "@/lib/school-hub-data";
import type { SchoolEvent } from "@/lib/school-hub-types";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";

function getWeekDates(offset: number): Date[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function formatDateShort(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function toDateStr(date: Date) {
  return date.toISOString().split("T")[0];
}

function isToday(date: Date) {
  const t = new Date();
  return date.getFullYear() === t.getFullYear() && date.getMonth() === t.getMonth() && date.getDate() === t.getDate();
}

// Detect scheduling conflicts: two+ events at overlapping times for different kids
function detectConflicts(dayEvents: SchoolEvent[]): string[] {
  const conflicts: string[] = [];
  for (let i = 0; i < dayEvents.length; i++) {
    for (let j = i + 1; j < dayEvents.length; j++) {
      const a = dayEvents[i];
      const b = dayEvents[j];
      if (!a.startTime || !b.startTime) continue;
      // Check if different kid sets
      const aKids = new Set(a.kidIds);
      const bKids = new Set(b.kidIds);
      const overlap = [...aKids].some((k) => bKids.has(k));
      if (overlap) continue; // Same kid(s), not a conflict for Brady
      // Check time overlap (rough)
      if (a.startTime === b.startTime || (a.endTime && b.startTime < a.endTime)) {
        if (a.location && b.location && a.location !== b.location) {
          conflicts.push(`${a.title} vs ${b.title}`);
        }
      }
    }
  }
  return conflicts;
}

export default function CalendarPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const weekDates = getWeekDates(weekOffset);

  const start = toDateStr(weekDates[0]);
  const end = toDateStr(weekDates[6]);

  useEffect(() => {
    fetch(`/api/school-hub/events?start=${start}&end=${end}`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events ?? []))
      .catch(() => {});
  }, [start, end]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
            School Hub
          </p>
          <h1 className="text-2xl font-semibold text-foreground">Calendar</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            This Week
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date) => {
          const dateStr = toDateStr(date);
          const dayEvents = events.filter((e) => e.date === dateStr);
          const today = isToday(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const conflicts = detectConflicts(dayEvents);

          return (
            <div
              key={dateStr}
              className={`min-h-[200px] p-3 rounded-xl border transition-colors ${
                today
                  ? "bg-indigo-500/5 border-indigo-500/30"
                  : isWeekend
                  ? "bg-white/[0.01] border-white/[0.04]"
                  : "bg-card border-white/[0.08]"
              }`}
            >
              <p
                className={`text-xs font-medium mb-2 ${
                  today ? "text-indigo-400" : "text-muted-foreground"
                }`}
              >
                {formatDateShort(date)}
              </p>

              {conflicts.length > 0 && (
                <div className="mb-2 px-1.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-1 text-[9px] text-amber-400 font-medium">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    Conflict
                  </div>
                </div>
              )}

              {dayEvents.length > 0 ? (
                <div className="space-y-1.5">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-[10px] p-1.5 rounded-md bg-white/[0.04]"
                    >
                      <div className="flex gap-1 mb-0.5">
                        {event.kidIds.map((kidId) => (
                          <span
                            key={kidId}
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: KIDS[kidId]?.color }}
                          />
                        ))}
                      </div>
                      <p className="text-foreground font-medium truncate">
                        {event.title}
                      </p>
                      {event.startTime && (
                        <p className="text-muted-foreground">{event.startTime}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                !isWeekend && (
                  <p className="text-[10px] text-muted-foreground/40 italic">
                    No events
                  </p>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Kid legend */}
      <div className="flex items-center gap-4">
        {KID_IDS.map((id) => (
          <span key={id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: KIDS[id].color }}
            />
            {KIDS[id].name}
          </span>
        ))}
      </div>
    </div>
  );
}
