import { NextResponse } from "next/server";
import { google } from "googleapis";
import type { SchoolEvent, KidId } from "@/lib/school-hub-types";

// Calendar IDs from Brady's morning sweep config
const CALENDAR_IDS = [
  "primary",
  "bradysmallz@gmail.com",
  "family13834007621771747799@group.calendar.google.com",
];

// Map event titles to kid IDs using keyword matching
function detectKids(title: string): KidId[] {
  const lower = title.toLowerCase();

  const patterns: [string | RegExp, KidId[]][] = [
    ["triplets", ["isla", "luke", "quinn"]],
    ["lily & faith", ["lily", "faith"]],
    ["lily and faith", ["lily", "faith"]],
    [/\blily\b/, ["lily"]],
    [/\bfaith\b/, ["faith"]],
    [/\bisla\b/, ["isla"]],
    [/\bluke\b/, ["luke"]],
    [/\bquinn\b/, ["quinn"]],
    [/bjj|martial art/, ["luke"]],
    [/voice lesson/, ["faith"]],
    [/\bchurch\b|switch youth/, ["faith"]],
    [/overtones|choir concert/, ["lily", "faith"]],
    [/trec|boomtown/, ["quinn"]],
    [/family meeting|family dinner/, ["lily", "faith", "isla", "luke", "quinn"]],
  ];

  for (const [pattern, ids] of patterns) {
    if (typeof pattern === "string" ? lower.includes(pattern) : pattern.test(lower)) {
      return ids;
    }
  }
  return [];
}

function formatTime(dateTime: string | undefined): string | undefined {
  if (!dateTime) return undefined;
  const d = new Date(dateTime);
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return m === 0 ? `${h12}:00 ${ampm}` : `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function classifyEvent(title: string): SchoolEvent["type"] {
  const lower = title.toLowerCase();
  if (lower.includes("birthday") || lower.includes("party") || lower.includes("concert") || lower.includes("church")) return "activity";
  if (lower.includes("due") || lower.includes("deadline") || lower.includes("permission")) return "deadline";
  if (lower.includes("appointment") || lower.includes("doctor") || lower.includes("dentist")) return "appointment";
  return "school";
}

async function fetchGoogleCalendarEvents(startDate: string, endDate: string): Promise<SchoolEvent[]> {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) return [];

  const credentials = JSON.parse(serviceAccountJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const calendar = google.calendar({ version: "v3", auth });
  const events: SchoolEvent[] = [];
  const seen = new Set<string>();

  const timeMin = new Date(startDate + "T00:00:00-05:00").toISOString();
  const timeMax = new Date(endDate + "T23:59:59-05:00").toISOString();

  for (const calendarId of CALENDAR_IDS) {
    try {
      const res = await calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: "startTime",
        timeZone: "America/Chicago",
        maxResults: 100,
      });

      for (const item of res.data.items ?? []) {
        if (!item.summary || !item.id) continue;
        // Deduplicate across calendars
        const dedupeKey = `${item.summary}-${item.start?.dateTime ?? item.start?.date}`;
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);

        const kidIds = detectKids(item.summary);
        // Only include events that mention a kid or family
        if (kidIds.length === 0) continue;

        const dateStr = item.start?.dateTime
          ? new Date(item.start.dateTime).toISOString().split("T")[0]
          : item.start?.date?.split("T")[0] ?? "";

        events.push({
          id: item.id,
          kidIds,
          title: item.summary,
          date: dateStr,
          startTime: formatTime(item.start?.dateTime ?? undefined),
          endTime: formatTime(item.end?.dateTime ?? undefined),
          location: item.location ?? undefined,
          type: classifyEvent(item.summary),
          source: "google-calendar",
        });
      }
    } catch (err) {
      console.error(`Failed to fetch calendar ${calendarId}:`, err);
    }
  }

  return events;
}

// Static fallback events when Google credentials aren't configured
function getStaticEvents(): SchoolEvent[] {
  const events: SchoolEvent[] = [];
  const now = new Date();

  for (let d = 0; d < 14; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split("T")[0];

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      events.push({
        id: `triplets-home-${dateStr}`, kidIds: ["isla", "luke", "quinn"],
        title: "Triplets home — snack, homework, chores", date: dateStr,
        startTime: "3:00 PM", endTime: "4:00 PM", type: "school", source: "manual",
      });
      events.push({
        id: `lf-home-${dateStr}`, kidIds: ["lily", "faith"],
        title: "Lily & Faith home", date: dateStr,
        startTime: "2:30 PM", endTime: "3:00 PM", type: "school", source: "manual",
      });
    }
    if (dayOfWeek === 1 || dayOfWeek === 4) {
      events.push({
        id: `luke-bjj-${dateStr}`, kidIds: ["luke"],
        title: "Luke BJJ (4:15–5:00)", date: dateStr,
        startTime: "3:55 PM", endTime: "5:20 PM", type: "activity", source: "manual",
      });
    }
    if (dayOfWeek === 3) {
      events.push({
        id: `faith-church-${dateStr}`, kidIds: ["faith"],
        title: "Faith — church (pickup 8:50)", date: dateStr,
        startTime: "6:00 PM", endTime: "9:00 PM", type: "activity", source: "manual",
      });
    }
    if (dayOfWeek === 4) {
      events.push({
        id: `faith-voice-${dateStr}`, kidIds: ["faith"],
        title: "Faith Voice Lessons", date: dateStr,
        startTime: "5:30 PM", endTime: "6:00 PM", type: "activity", source: "manual",
      });
    }
    if (dayOfWeek === 0) {
      events.push({
        id: `faith-church-sun-${dateStr}`, kidIds: ["faith"],
        title: "Life Church → Bring Faith Home", date: dateStr,
        startTime: "11:10 AM", endTime: "1:00 PM", location: "Life.Church Rogers",
        type: "activity", source: "manual",
      });
      events.push({
        id: `family-dinner-${dateStr}`, kidIds: ["lily", "faith", "isla", "luke", "quinn"],
        title: "Family Meeting & Dinner", date: dateStr,
        startTime: "5:00 PM", endTime: "6:00 PM", type: "school", source: "manual",
      });
    }
  }
  return events;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start") ?? new Date().toISOString().split("T")[0];
  const end = searchParams.get("end") ?? start;
  const kidId = searchParams.get("kidId");

  // Try live Google Calendar first, fall back to static
  let events = await fetchGoogleCalendarEvents(start, end);
  if (events.length === 0) {
    events = getStaticEvents();
    // Apply date filter to static events
    events = events.filter((e) => e.date >= start && e.date <= end);
  }

  if (kidId) {
    events = events.filter((e) => e.kidIds.includes(kidId as KidId));
  }

  events.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.startTime ?? "").localeCompare(b.startTime ?? "");
  });

  return NextResponse.json({
    events,
    source: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? "google-calendar" : "static-fallback",
  });
}
