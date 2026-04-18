export type KidId = "lily" | "faith" | "isla" | "luke" | "quinn";

export interface Kid {
  id: KidId;
  name: string;
  grade: string;
  school: string;
  color: string;
  colorTw: string;
  activities: string[];
  teachers: { name: string; subject?: string }[];
  medicalNotes: string;
  dismissalTime: string;
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
