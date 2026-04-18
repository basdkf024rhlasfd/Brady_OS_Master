import MovingChat from "@/components/moving/MovingChat";
import { requireProjectAccess } from "@/lib/portal-access";

export default async function MovingCalculatorPage() {
  await requireProjectAccess("moving");

  return <MovingChat />;
}
