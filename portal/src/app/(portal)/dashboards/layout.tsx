import { requireAdminAccess } from "@/lib/portal-access";

export default async function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminAccess();

  return children;
}
