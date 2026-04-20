const CHICAGO = "America/Chicago";

export function getTodayInChicago(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CHICAGO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatHeaderDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
}

export function getDayOfWeekInChicago(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO,
    weekday: "long",
  }).format(now);
}
