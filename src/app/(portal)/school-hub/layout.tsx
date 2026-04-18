import { requireProjectAccess } from "@/lib/portal-access";
import { SchoolHubShell } from "@/components/school-hub/AppShell";

export default async function SchoolHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("school-hub");

  return <SchoolHubShell>{children}</SchoolHubShell>;
}
