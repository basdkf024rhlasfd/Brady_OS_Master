import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  formatHeaderDate,
  getDayOfWeekInChicago,
  getTodayInChicago,
} from "@/lib/school-hub-date";

const BENTONVILLE_LAT = 36.3729;
const BENTONVILLE_LON = -94.2088;

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

async function getWeather(): Promise<WeatherData> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${BENTONVILLE_LAT}&longitude=${BENTONVILLE_LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago`,
      { next: { revalidate: 1800 } }
    );
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    const conditions: Record<number, { text: string; icon: string }> = {
      0: { text: "Clear", icon: "☀️" },
      1: { text: "Mostly Clear", icon: "🌤️" },
      2: { text: "Partly Cloudy", icon: "⛅" },
      3: { text: "Overcast", icon: "☁️" },
      45: { text: "Foggy", icon: "🌫️" },
      48: { text: "Freezing Fog", icon: "🌫️" },
      51: { text: "Light Drizzle", icon: "🌦️" },
      53: { text: "Drizzle", icon: "🌦️" },
      55: { text: "Heavy Drizzle", icon: "🌧️" },
      61: { text: "Light Rain", icon: "🌧️" },
      63: { text: "Rain", icon: "🌧️" },
      65: { text: "Heavy Rain", icon: "🌧️" },
      71: { text: "Light Snow", icon: "🌨️" },
      73: { text: "Snow", icon: "❄️" },
      75: { text: "Heavy Snow", icon: "❄️" },
      80: { text: "Rain Showers", icon: "🌦️" },
      81: { text: "Showers", icon: "🌧️" },
      82: { text: "Heavy Showers", icon: "⛈️" },
      95: { text: "Thunderstorm", icon: "⛈️" },
      96: { text: "Hail Storm", icon: "⛈️" },
      99: { text: "Severe Storm", icon: "🌪️" },
    };

    const match = conditions[code] ?? { text: "Unknown", icon: "🌡️" };
    return { temp, condition: match.text, icon: match.icon };
  } catch {
    return { temp: 0, condition: "Unknown", icon: "🌡️" };
  }
}

// In-memory cache keyed by Chicago-local date (survives instance reuse, not day rollover)
let cachedPulse: { data: unknown; expiry: number; dayKey: string } | null = null;

export async function GET() {
  const now = Date.now();
  const dayKey = getTodayInChicago();
  if (cachedPulse && cachedPulse.expiry > now && cachedPulse.dayKey === dayKey) {
    return NextResponse.json(cachedPulse.data);
  }

  const weather = await getWeather();

  const today = formatHeaderDate();
  const dayOfWeek = getDayOfWeekInChicago();

  const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";

  try {
    const anthropic = new Anthropic();
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a family logistics assistant for a single dad (Brady) with 5 kids:
- Lily (11th grade, Bentonville High School, dismissal 3:15 PM) — choir, Genesis Gymnastics
- Faith (9th grade, Bentonville High School, dismissal 3:15 PM) — choir, Life Church/Switch youth, voice lessons
- Isla (3rd grade, Apple Glen Elementary, dismissal 2:45 PM) — piano lessons
- Luke (3rd grade, Apple Glen Elementary, dismissal 2:45 PM) — martial arts/BJJ
- Quinn (3rd grade, Apple Glen Elementary, dismissal 2:45 PM) — piano, triathlon training

Today is ${today}. Weather in Bentonville AR: ${weather.temp}°F, ${weather.condition}.
${isWeekend ? "It's the weekend — no school today." : "It's a school day."}

Write a 2-3 sentence morning pulse summary for Brady. Be concise, practical, and warm. Mention weather if it affects outdoor activities or school (rain, cold, heat). Mention any notable day-of-week patterns (e.g., Monday = Luke BJJ, Wednesday = Faith church). Don't list every kid unless relevant. End with something actionable or encouraging.`,
        },
      ],
    });

    const summary =
      msg.content[0].type === "text"
        ? msg.content[0].text
        : "All five kids have regular school days today.";

    const pulse = {
      summary,
      weather: {
        temp: weather.temp,
        condition: weather.condition,
        icon: weather.icon,
      },
      alerts: [] as string[],
      generatedAt: new Date().toISOString(),
    };

    // Cache for 30 min (matches weather revalidate) — dayKey invalidates at midnight CT
    cachedPulse = { data: pulse, expiry: now + 1800000, dayKey };

    return NextResponse.json(pulse);
  } catch {
    // Fallback if Anthropic fails
    const fallback = {
      summary: isWeekend
        ? "Weekend mode — no school today. Enjoy the downtime."
        : `All five kids have regular school days. Triplets dismiss at 2:45 PM from Apple Glen, Lily and Faith at 3:15 PM from BHS. ${weather.temp}°F and ${weather.condition.toLowerCase()} in Bentonville.`,
      weather: {
        temp: weather.temp,
        condition: weather.condition,
        icon: weather.icon,
      },
      alerts: [] as string[],
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(fallback);
  }
}
