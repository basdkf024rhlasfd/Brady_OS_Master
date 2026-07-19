import { requireProjectAccess } from "@/lib/portal-access";

// SPEC-008: gate the family benefits handbook to users granted the "healthcare"
// project. Without this, any signed-in portal user (including invited clients)
// could load Karissa's benefits handbook. Mirrors school-hub/layout.tsx.
export default async function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("healthcare");

  return <>{children}</>;
}
