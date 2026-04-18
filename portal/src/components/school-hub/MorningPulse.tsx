"use client";

import { useState, useEffect } from "react";
import type { MorningPulse as PulseType } from "@/lib/school-hub-types";

export function MorningPulse() {
  const [pulse, setPulse] = useState<PulseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/school-hub/pulse")
      .then((res) => res.json())
      .then((data) => {
        setPulse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🌡️</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-400">
            Morning Pulse
          </span>
        </div>
        <div className="h-4 bg-white/[0.06] rounded w-3/4" />
        <div className="h-4 bg-white/[0.06] rounded w-1/2 mt-2" />
      </div>
    );
  }

  if (!pulse) return null;

  return (
    <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{pulse.weather.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-400">
            Morning Pulse
          </span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {pulse.weather.temp}°F · {pulse.weather.condition}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {pulse.summary}
      </p>
      {pulse.alerts.length > 0 && (
        <div className="mt-3 space-y-1">
          {pulse.alerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-amber-400"
            >
              <span>⚠️</span>
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
