import { tool } from "ai";
import { z } from "zod";
import { google } from "googleapis";

/**
 * Factory: returns an AI SDK tool for querying Google Calendar,
 * or null if credentials are not configured.
 */
export function createCalendarTool(params?: Record<string, string>) {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) return null;

  let googleAuth;
  try {
    const credentials = JSON.parse(serviceAccountJson);
    googleAuth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });
  } catch {
    console.warn("[TOOLS] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON");
    return null;
  }

  const calendarId = params?.calendarId ?? "primary";

  const inputSchema = z.object({
    startDate: z
      .string()
      .describe("Start of date range in ISO 8601 format (e.g., 2026-04-19T00:00:00-05:00)"),
    endDate: z
      .string()
      .describe("End of date range in ISO 8601 format (e.g., 2026-04-25T23:59:59-05:00)"),
    query: z
      .string()
      .optional()
      .describe("Optional text search within event titles and descriptions"),
    maxResults: z
      .number()
      .optional()
      .default(20)
      .describe("Maximum number of events to return (default 20)"),
  });

  return tool({
    description:
      "Query Google Calendar for upcoming events. Use this when the user asks about schedule, calendar, events, or what's happening on a specific date.",
    inputSchema,
    execute: async (input: z.infer<typeof inputSchema>) => {
      try {
        const calendar = google.calendar({
          version: "v3",
          auth: googleAuth as never,
        });
        const response = await calendar.events.list({
          calendarId,
          timeMin: input.startDate,
          timeMax: input.endDate,
          maxResults: input.maxResults ?? 20,
          singleEvents: true,
          orderBy: "startTime",
          q: input.query || undefined,
        });

        const events = (response.data.items ?? []).map((event) => ({
          title: event.summary ?? "(no title)",
          start: event.start?.dateTime ?? event.start?.date ?? "",
          end: event.end?.dateTime ?? event.end?.date ?? "",
          location: event.location ?? "",
          description: event.description
            ? event.description.slice(0, 200)
            : "",
          allDay: !event.start?.dateTime,
        }));

        return {
          calendarId,
          count: events.length,
          dateRange: { start: input.startDate, end: input.endDate },
          events,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return { error: `Calendar query failed: ${message}`, events: [] };
      }
    },
  });
}
