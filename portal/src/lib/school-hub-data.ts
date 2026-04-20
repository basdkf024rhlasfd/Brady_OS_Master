import type { Kid, KidId, SchoolContact } from "./school-hub-types";

export const KIDS: Record<KidId, Kid> = {
  lily: {
    id: "lily",
    name: "Lily",
    fullName: "Lily Kay",
    age: 17,
    grade: "11th",
    school: "Bentonville High School",
    color: "#8B5CF6",
    colorTw: "violet",
    activities: [
      {
        name: "Chamber Choir / Overtones",
        schedule: "Rehearsals per BHS choir calendar",
        location: "Bentonville High School",
        type: "extracurricular",
        notes: "Director: Terry Hicks",
      },
      {
        name: "Genesis Gymnastics",
        schedule: "Mon & Thu, 4:00 PM",
        type: "work",
        notes: "Work shifts — check Lily's schedule for exact hours",
      },
    ],
    teachers: [{ name: "Terry Hicks", subject: "Choir Director" }],
    medicalNotes: "",
    dismissalTime: "3:15 PM",
    weeklySchedule: [
      { day: "Monday", time: "4:00 PM", event: "Work — Genesis Gymnastics" },
      { day: "Thursday", time: "4:00 PM", event: "Work — Genesis Gymnastics" },
    ],
    upcomingEvents: [
      {
        title: "Overtones Concert",
        date: "2026-04-20",
        time: "7:00 PM",
        location: "Arend Arts Center (BHS campus)",
      },
    ],
  },
  faith: {
    id: "faith",
    name: "Faith",
    fullName: "Faith Riley",
    age: 14,
    grade: "9th",
    school: "Bentonville High School",
    color: "#EC4899",
    colorTw: "pink",
    activities: [
      {
        name: "Advanced Choir",
        schedule: "Rehearsals per BHS choir calendar",
        location: "Bentonville High School",
        type: "extracurricular",
        notes: "Director: Terry Hicks",
      },
      {
        name: "Switch Youth Group",
        schedule: "Wed 6:00–9:00 PM",
        location: "Life.Church Rogers, 5350 S 28th St, Rogers, AR",
        type: "extracurricular",
        notes: "Pickup at 8:50 PM",
      },
      {
        name: "Voice Lessons",
        schedule: "Thu 5:30–6:00 PM",
        type: "extracurricular",
      },
    ],
    teachers: [{ name: "Terry Hicks", subject: "Choir Director" }],
    medicalNotes: "",
    dismissalTime: "3:15 PM",
    weeklySchedule: [
      { day: "Wednesday", time: "6:00 PM", event: "Switch Youth Group (pickup 8:50 PM)" },
      { day: "Thursday", time: "5:30 PM", event: "Voice Lessons" },
    ],
    upcomingEvents: [],
  },
  isla: {
    id: "isla",
    name: "Isla",
    fullName: "Isla Kate",
    age: 9,
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#06B6D4",
    colorTw: "cyan",
    activities: [
      {
        name: "Piano",
        schedule: "10 min daily practice",
        type: "extracurricular",
        notes: "Currently learning",
      },
    ],
    teachers: [{ name: "Mrs. Whitfield", subject: "3rd Grade" }],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
    weeklySchedule: [],
    upcomingEvents: [
      {
        title: "Olivia's 9th Birthday Party",
        date: "2026-04-25",
        time: "12:00–1:30 PM",
        location: "Bentonville Community Center Pool",
      },
    ],
  },
  luke: {
    id: "luke",
    name: "Luke",
    fullName: "Luke Brady",
    age: 9,
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#F59E0B",
    colorTw: "amber",
    activities: [
      {
        name: "BJJ / Martial Arts",
        schedule: "Mon & Thu, 4:15–5:00 PM",
        type: "extracurricular",
        notes: "Green/orange belt. Drive at 3:55 PM, home ~5:20 PM.",
      },
    ],
    teachers: [{ name: "Mrs. Whitfield", subject: "3rd Grade" }],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
    weeklySchedule: [
      { day: "Monday", time: "3:55 PM", event: "Drive to BJJ (class 4:15–5:00, home ~5:20)" },
      { day: "Thursday", time: "3:55 PM", event: "Drive to BJJ (class 4:15–5:00, home ~5:20)" },
    ],
    upcomingEvents: [],
  },
  quinn: {
    id: "quinn",
    name: "Quinn",
    fullName: "Quinn Elaine",
    age: 9,
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#10B981",
    colorTw: "emerald",
    activities: [
      {
        name: "Piano",
        schedule: "Self-directed practice",
        type: "extracurricular",
        notes: "Self-teaching via YouTube",
      },
      {
        name: "Triathlon Training",
        schedule: "TBD",
        type: "extracurricular",
        notes: "Training with Harper",
      },
      {
        name: "TREC Boomtown",
        type: "school-project",
        notes: "Mrs. Whitfield's class. Needs: shoeboxes (all sizes) and empty paper towel/toilet paper rolls.",
      },
    ],
    teachers: [{ name: "Mrs. Whitfield", subject: "3rd Grade" }],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
    weeklySchedule: [],
    upcomingEvents: [],
  },
};

export const KID_IDS = Object.keys(KIDS) as KidId[];

export const SCHOOLS = [
  {
    name: "Bentonville High School",
    shortName: "BHS",
    address: "1801 SE J St, Bentonville, AR 72712",
    phone: "(479) 254-5074",
    website: "https://www.bentonvillek12.org/bhs",
    kids: ["lily", "faith"] as KidId[],
  },
  {
    name: "Apple Glen Elementary",
    shortName: "Apple Glen",
    address: "3200 SW Bright Rd, Bentonville, AR 72712",
    phone: "(479) 254-5052",
    website: "https://www.bentonvillek12.org/appleglen",
    kids: ["isla", "luke", "quinn"] as KidId[],
  },
];

export const CONTACTS: SchoolContact[] = [
  {
    name: "Terry Hicks",
    role: "Choir Director",
    school: "Bentonville High School",
  },
  {
    name: "Mrs. Whitfield",
    role: "3rd Grade Teacher",
    school: "Apple Glen Elementary",
  },
  {
    name: "BHS Front Office",
    role: "Front Office",
    school: "Bentonville High School",
    phone: "(479) 254-5100",
  },
  {
    name: "Apple Glen Front Office",
    role: "Front Office",
    school: "Apple Glen Elementary",
    phone: "(479) 254-5580",
  },
];
