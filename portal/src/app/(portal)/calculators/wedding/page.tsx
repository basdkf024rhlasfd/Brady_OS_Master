import { requireAdminAccess } from "@/lib/portal-access";

export default async function WeddingSeatPage() {
  await requireAdminAccess();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mb-3 text-3xl">W</div>
        <h2 className="text-lg font-semibold text-gray-900">Wedding Seating Chart</h2>
        <p className="mt-2 text-sm text-gray-500">
          Start the service on port <code className="rounded bg-gray-100 px-1.5 py-0.5 text-slate-600">3004</code> to use this app.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          cd ~/Micro\ Services/wedding-seating-chart && npm run dev
        </p>
      </div>
    </div>
  );
}
