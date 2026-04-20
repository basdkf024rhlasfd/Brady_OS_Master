export type KidId = "lily" | "faith" | "isla" | "luke" | "quinn";

export interface Activity {
  name: string;
  schedule?: string;
  location?: string;
  type: "extracurricular" | "work" | "school-project";
  notes?: string;
}

export interface WeeklyEvent {
  day: string;
  time: string;
  event: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  time?: string;
  location?: string;
}

export interface Kid {
  id: KidId;
  name: string;
  fullName: string;
  age: number;
  grade: string;
  school: string;
  color: string;
  colorTw: string;
  activities: Activity[];
  teachers: { name: string; subject?: string }[];
  medicalNotes: string;
  dismissalTime: string;
  weeklySchedule: WeeklyEvent[];
  upcomingEvents: UpcomingEvent[];
}

export interface SchoolEvent {
  id: string;
  kidIds: KidId[];
  title: string;
  date: string; // ISO date
  startTime?: string; // HH:mm
  endTime?: string;
  location?: string;
  type: "school" | "activity" | "appointment" | "deadline";
  source: "google-calendar" | "manual";
}

export interface ActionItem {
  id: string;
  kidIds: KidId[];
  title: string;
  category: "forms" | "supplies" | "fees" | "volunteer" | "other";
  status: "pending" | "done" | "snoozed";
  dueDate?: string;
  source: "manual" | "email";
  notes?: string;
  createdAt: string;
}

export interface SchoolContact {
  name: string;
  role: string;
  school: string;
  phone?: string;
  email?: string;
}

export interface MorningPulse {
  summary: string;
  weather: {
    temp: number;
    condition: string;
    icon: string;
  };
  alerts: string[];
  generatedAt: string;
}
