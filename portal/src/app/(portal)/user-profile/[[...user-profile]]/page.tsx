import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            Manage profile and security
          </h1>
        </div>

        <UserProfile
          path="/user-profile"
          routing="path"
          appearance={{
            elements: {
              cardBox: "w-full",
              card:
                "w-full rounded-2xl border border-gray-200 bg-white shadow-sm",
              navbar: "bg-gray-50",
              navbarButton:
                "text-gray-500 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900",
              pageScrollBox: "bg-transparent",
              profilePage: "bg-transparent",
              formButtonPrimary:
                "bg-slate-600 hover:bg-slate-700 shadow-none text-white",
              formFieldInput:
                "border-gray-300 bg-white text-gray-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20",
              formFieldLabel: "text-gray-600",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              accordionTriggerButton: "text-gray-700",
              badge: "bg-gray-100 text-gray-600",
              footerActionLink: "text-slate-600 hover:text-slate-700",
            },
          }}
        />
      </div>
    </div>
  );
}
