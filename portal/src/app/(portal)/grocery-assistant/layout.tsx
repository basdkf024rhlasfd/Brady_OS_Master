import { requireProjectAccess } from "@/lib/portal-access";
import { GroceryShell } from "@/components/grocery-assistant/AppShell";

export default async function GroceryAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProjectAccess("grocery-assistant");

  return <GroceryShell>{children}</GroceryShell>;
}
