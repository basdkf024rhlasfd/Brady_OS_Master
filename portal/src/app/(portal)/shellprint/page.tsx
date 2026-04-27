import { requireProjectAccess } from "@/lib/portal-access";

const SHELLPRINT_URL = "https://shellprint-web.vercel.app";

export default async function ShellPrintPage() {
  await requireProjectAccess("shellprint");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5 text-center">
        <div className="text-6xl">🐢</div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Shell<span className="text-emerald-400">Print</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Turtle ID + neighborhood sighting registry. Multi-image species
            identification, age estimate, and a private map of every turtle
            you've logged.
          </p>
        </div>

        <a
          href={SHELLPRINT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors"
        >
          Launch ShellPrint →
        </a>

        <p className="text-xs text-gray-500 leading-relaxed">
          Opens in a new tab. ShellPrint runs on its own Clerk-protected domain;
          your portal sign-in carries over after the first visit.
        </p>
      </div>
    </div>
  );
}
