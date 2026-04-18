"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { KIDS } from "@/lib/school-hub-data";
import type { KidId } from "@/lib/school-hub-types";
import { ArrowLeft } from "lucide-react";

export default function KidProfilePage() {
  const { kidId } = useParams<{ kidId: string }>();

  if (!kidId || !(kidId in KIDS)) {
    notFound();
  }

  const kid = KIDS[kidId as KidId];

  return (
    <div className="space-y-8">
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
            <h1 className="text-2xl font-semibold text-foreground">{kid.name}</h1>
            <p className="text-sm text-muted-foreground">
              {kid.grade} grade &middot; {kid.school}
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Activities */}
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Activities
          </h2>
          {kid.activities.length > 0 ? (
            <ul className="space-y-2">
              {kid.activities.map((activity) => (
                <li key={activity} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: kid.color }}
                  />
                  {activity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground/60 italic">No activities listed</p>
          )}
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

      {/* This Week — placeholder for calendar integration */}
      <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
          This Week
        </h2>
        <p className="text-xs text-muted-foreground/60 italic">
          Calendar events will appear here once connected
        </p>
      </div>
    </div>
  );
}
