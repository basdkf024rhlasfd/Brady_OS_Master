import { requireAdminAccess } from "@/lib/portal-access";

export default async function FenceBidPage() {
  await requireAdminAccess();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mb-3 text-3xl">F</div>
        <h2 className="text-lg font-semibold text-gray-900">Fence Bid Checker</h2>
        <p className="mt-2 text-sm text-gray-500">
          Start the service on port <code className="rounded bg-gray-100 px-1.5 py-0.5 text-slate-600">3002</code> to use this app.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          cd ~/Micro\ Services/fence-bid-checker && npm run dev
        </p>
      </div>
    </div>
  );
}
