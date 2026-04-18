import { requireProjectAccess } from "@/lib/portal-access";
import { StihlShell } from "@/components/stihl/AppShell";

export default async function StihlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("stihl");

  return <StihlShell>{children}</StihlShell>;
}
