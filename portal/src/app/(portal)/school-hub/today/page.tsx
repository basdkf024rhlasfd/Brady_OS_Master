"use client";

import { useState, useEffect } from "react";
import { KidCard } from "@/components/school-hub/KidCard";
import { MorningPulse } from "@/components/school-hub/MorningPulse";
import { ConfidencePanel } from "@/components/school-hub/ConfidencePanel";
import { KIDS, KID_IDS } from "@/lib/school-hub-data";
import { formatHeaderDate, getTodayInChicago } from "@/lib/school-hub-date";
import type { SchoolEvent } from "@/lib/school-hub-types";

export default function TodayPage() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const today = getTodayInChicago();
  const currentDate = formatHeaderDate();

  useEffect(() => {
    fetch(`/api/school-hub/events?start=${today}&end=${today}`)
      .then((res) => res.json())
      .then((data) => setEvents(data.events ?? []))
      .catch(() => {});
  }, [today]);

  const eventsForKid = (kidId: string) =>
    events.filter((e) => e.kidIds.includes(kidId as never));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          School Hub
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Today</h1>
        <p className="text-sm text-muted-foreground mt-1">{currentDate}</p>
      </div>

      {/* Today at a glance — counts + confirmation state */}
      <ConfidencePanel
        kids={KID_IDS.map((id) => KIDS[id])}
        events={events}
        today={today}
      />

      {/* Morning Pulse — live from API */}
      <MorningPulse />

      {/* School Groups */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Bentonville High School
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {KID_IDS.filter((id) => KIDS[id].school.includes("High")).map((id) => (
            <KidCard key={id} kid={KIDS[id]} events={eventsForKid(id)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Apple Glen Elementary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KID_IDS.filter((id) => KIDS[id].school.includes("Apple")).map((id) => (
            <KidCard key={id} kid={KIDS[id]} events={eventsForKid(id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
