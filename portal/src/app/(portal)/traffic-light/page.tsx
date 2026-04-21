import { requireAdminAccess } from "@/lib/portal-access";
import { getTrafficLightTiles } from "@/lib/traffic-light/sources";
import type { TrafficColor } from "@/lib/traffic-light/rubric";

export const revalidate = 300;

const COLOR_BG: Record<TrafficColor, string> = {
  green: "rgba(16, 185, 129, 0.12)",
  yellow: "rgba(234, 179, 8, 0.12)",
  red: "rgba(239, 68, 68, 0.15)",
  unknown: "rgba(148, 163, 184, 0.1)",
};

const COLOR_BAND: Record<TrafficColor, string> = {
  green: "#10b981",
  yellow: "#eab308",
  red: "#ef4444",
  unknown: "#94a3b8",
};

const COLOR_LABEL: Record<TrafficColor, string> = {
  green: "🟢 Green",
  yellow: "🟡 Yellow",
  red: "🔴 Red",
  unknown: "⚪ Unknown",
};

export default async function TrafficLightPage() {
  await requireAdminAccess();
  const tiles = await getTrafficLightTiles();

  return (
    <main
      style={{
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Inter, sans-serif",
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          🚦 Traffic Light
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>
          At-a-glance status across the five domains. Refreshes every 5 minutes.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {tiles.map((tile) => (
          <section
            key={tile.id}
            style={{
              background: COLOR_BG[tile.color],
              border: "1px solid rgba(255,255,255,0.05)",
              borderLeft: `4px solid ${COLOR_BAND[tile.color]}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>{tile.name}</h2>
              <span
                style={{
                  fontSize: 12,
                  color: COLOR_BAND[tile.color],
                  fontWeight: 600,
                }}
              >
                {COLOR_LABEL[tile.color]}
              </span>
            </div>
            <p
              style={{
                fontSize: 15,
                marginBottom: 12,
                color: "#e2e8f0",
              }}
            >
              {tile.headline}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              {tile.signals.map((signal, i) => (
                <li
                  key={i}
                  style={{
                    padding: "4px 0",
                    borderTop: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  · {signal}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer
        style={{
          marginTop: 32,
          fontSize: 11,
          color: "#64748b",
          textAlign: "center",
        }}
      >
        Rubric: <code>portal/src/lib/traffic-light/rubric.ts</code> · Sources:
        Notion (Client Projects, Internal Projects, Streaming Notes, Routing Log)
        + financial-assistant/data.js + git log + family KB
      </footer>
    </main>
  );
}
