import { redirect } from "next/navigation";

export default function GroceryAssistantRoot() {
  redirect("/grocery-assistant/order-list");
}
