"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { KIDS } from "@/lib/school-hub-data";
import type { KidId, Activity } from "@/lib/school-hub-types";
import { ArrowLeft, Briefcase, BookOpen, FlaskConical, Calendar, Clock, MapPin } from "lucide-react";

const activityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "work": return <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />;
    case "school-project": return <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />;
    default: return <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />;
  }
};

const activityLabel = (type: Activity["type"]) => {
  switch (type) {
    case "work": return "Work";
    case "school-project": return "School Project";
    default: return "Extracurricular";
  }
};

function formatEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function KidProfilePage() {
  const { kidId } = useParams<{ kidId: string }>();

  if (!kidId || !(kidId in KIDS)) {
    notFound();
  }

  const kid = KIDS[kidId as KidId];

  return (
    <div className="space-y-6">
      {/* Back link + Header */}
      <div>
        <Link
          href="/school-hub/today"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Today
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: kid.color }}
          >
            {kid.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{kid.fullName}</h1>
            <p className="text-sm text-muted-foreground">
              Age {kid.age} &middot; {kid.grade} grade &middot; {kid.school}
            </p>
          </div>
        </div>
      </div>

      {/* Top row: School + Teachers */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* School Info */}
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            School
          </h2>
          <p className="text-sm font-medium text-foreground">{kid.school}</p>
          <p className="text-xs text-muted-foreground mt-1">Grade {kid.grade}</p>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Dismissal</span>
              <span className="text-sm font-medium text-foreground">{kid.dismissalTime}</span>
            </div>
          </div>
        </div>

        {/* Teachers */}
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Teachers
          </h2>
          {kid.teachers.length > 0 ? (
            <ul className="space-y-2">
              {kid.teachers.map((teacher) => (
                <li key={teacher.name} className="text-sm text-foreground">
                  {teacher.name}
                  {teacher.subject && (
                    <span className="text-xs text-muted-foreground ml-2">({teacher.subject})</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground/60 italic">No teachers added yet</p>
          )}
        </div>
      </div>

      {/* Activities */}
      <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Activities
        </h2>
        {kid.activities.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {kid.activities.map((activity) => (
              <div
                key={activity.name}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {activityIcon(activity.type)}
                  <span className="text-sm font-medium text-foreground">{activity.name}</span>
                </div>
                <span className="inline-block px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded bg-white/[0.06] text-muted-foreground mb-2">
                  {activityLabel(activity.type)}
                </span>
                {activity.schedule && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock className="h-3 w-3 text-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground">{activity.schedule}</span>
                  </div>
                )}
                {activity.location && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground">{activity.location}</span>
                  </div>
                )}
                {activity.notes && (
                  <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">
                    {activity.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic">No activities listed</p>
        )}
      </div>

      {/* Weekly Schedule */}
      {kid.weeklySchedule.length > 0 && (
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Weekly Schedule
          </h2>
          <div className="space-y-2">
            {kid.weeklySchedule.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-xs font-medium text-muted-foreground w-24 shrink-0 pt-0.5">
                  {entry.day}
                </span>
                <span className="text-xs text-muted-foreground/70 w-16 shrink-0 pt-0.5">
                  {entry.time}
                </span>
                <span className="text-sm text-foreground">{entry.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {kid.upcomingEvents.length > 0 && (
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {kid.upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-start gap-3">
                <div
                  className="mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: kid.color + "20" }}
                >
                  <Calendar className="h-4 w-4" style={{ color: kid.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatEventDate(event.date)}
                    {event.time && <> &middot; {event.time}</>}
                  </p>
                  {event.location && (
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{event.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical Notes */}
      <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Medical Notes
        </h2>
        {kid.medicalNotes ? (
          <p className="text-sm text-foreground leading-relaxed">{kid.medicalNotes}</p>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic">No medical notes</p>
        )}
      </div>
    </div>
  );
}
