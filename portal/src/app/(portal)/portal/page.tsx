"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DashboardHome() {
  const { user } = useUser();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Top row: Profile + Starred */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* Profile Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              {user?.imageUrl && (
                <div
                  aria-hidden="true"
                  className="h-14 w-14 rounded-full ring-2 ring-gray-200 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${user.imageUrl})` }}
                />
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.fullName ?? "Loading..."}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href="/user-profile"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-600 transition hover:border-slate-400 hover:text-gray-900"
              >
                Edit profile
              </Link>
            </div>
          </div>

          {/* Starred Content — Coming Soon */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Starred Insights
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl border border-gray-100 bg-gray-50"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
                Coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: Notes + Project Ideas */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* Notes & Feedback */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Quick Notes
            </div>
            <textarea
              placeholder="Capture a thought..."
              className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20"
              rows={3}
            />
            <div className="mt-3 space-y-2">
              {["Capture a thought...", "Add a quick note"].map(
                (note) => (
                  <div
                    key={note}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500"
                  >
                    {note}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Project Ideas — Coming Soon */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Project Ideas
            </div>
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl border border-gray-100 bg-gray-50"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
