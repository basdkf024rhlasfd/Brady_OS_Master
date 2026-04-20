import { requireProjectAccess } from "@/lib/portal-access";

export default async function GroceryAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("grocery-assistant");

  return <>{children}</>;
}
