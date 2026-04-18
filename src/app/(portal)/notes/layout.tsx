import { requireAdminAccess } from "@/lib/portal-access";

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminAccess();

  return children;
}
