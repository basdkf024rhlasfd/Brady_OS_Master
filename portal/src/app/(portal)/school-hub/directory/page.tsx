"use client";

import { SCHOOLS, CONTACTS, KIDS, KID_IDS } from "@/lib/school-hub-data";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export default function DirectoryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          School Hub
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quick reference for schools, contacts, and schedules
        </p>
      </div>

      {/* Schools */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Schools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SCHOOLS.map((school) => (
            <div
              key={school.name}
              className="p-5 rounded-xl bg-card border border-white/[0.08]"
            >
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {school.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{school.shortName}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{school.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <a href={`tel:${school.phone}`} className="hover:text-foreground transition-colors">
                    {school.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Website
                  </a>
                </div>
              </div>

              {/* Kids at this school */}
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground mr-1">Students:</span>
                {school.kids.map((kidId) => (
                  <span key={kidId} className="flex items-center gap-1 text-xs text-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: KIDS[kidId].color }}
                    />
                    {KIDS[kidId].name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dismissal Schedule */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Dismissal Schedule
        </h2>
        <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
          <div className="space-y-3">
            {KID_IDS.map((id) => (
              <div key={id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: KIDS[id].color }}
                  />
                  <span className="text-sm text-foreground">{KIDS[id].name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({KIDS[id].school.includes("High") ? "BHS" : "Apple Glen"})
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{KIDS[id].dismissalTime}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Contacts
        </h2>
        {CONTACTS.length > 0 ? (
          <div className="space-y-2">
            {CONTACTS.map((contact, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-card border border-white/[0.08]"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {contact.role} &middot; {contact.school}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="text-muted-foreground hover:text-foreground">
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-foreground">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-card border border-white/[0.08]">
            <p className="text-xs text-muted-foreground/60 italic">
              No contacts added yet. Update school-hub-data.ts with teachers, coaches, and front office contacts.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
