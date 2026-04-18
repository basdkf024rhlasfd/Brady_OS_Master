import type { Kid, KidId, SchoolContact } from "./school-hub-types";

export const KIDS: Record<KidId, Kid> = {
  lily: {
    id: "lily",
    name: "Lily",
    grade: "11th",
    school: "Bentonville High School",
    color: "#8B5CF6",
    colorTw: "violet",
    activities: ["Choir", "Genesis Gymnastics"],
    teachers: [],
    medicalNotes: "",
    dismissalTime: "3:15 PM",
  },
  faith: {
    id: "faith",
    name: "Faith",
    grade: "9th",
    school: "Bentonville High School",
    color: "#EC4899",
    colorTw: "pink",
    activities: ["Choir", "Life Church / Switch Youth"],
    teachers: [],
    medicalNotes: "",
    dismissalTime: "3:15 PM",
  },
  isla: {
    id: "isla",
    name: "Isla",
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#06B6D4",
    colorTw: "cyan",
    activities: ["Piano Lessons"],
    teachers: [],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
  },
  luke: {
    id: "luke",
    name: "Luke",
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#F59E0B",
    colorTw: "amber",
    activities: ["Martial Arts"],
    teachers: [],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
  },
  quinn: {
    id: "quinn",
    name: "Quinn",
    grade: "3rd",
    school: "Apple Glen Elementary",
    color: "#10B981",
    colorTw: "emerald",
    activities: ["Piano (Self-Taught)", "Triathlon Training"],
    teachers: [],
    medicalNotes: "",
    dismissalTime: "2:45 PM",
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
  // Placeholder — Brady to fill in teachers, coaches, front office contacts
];
