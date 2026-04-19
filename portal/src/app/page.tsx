import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const isDevBypass =
  process.env.NODE_ENV === "development" &&
  process.env.MCEPTION_DEV_BYPASS === "true";

export default async function HomePage() {
  if (isDevBypass) redirect("/portal");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  redirect("/portal");
}
