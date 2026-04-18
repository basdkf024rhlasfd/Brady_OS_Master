import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-6 py-12">
      <div className="relative w-full max-w-md">
        <SignIn
          path="/sign-in"
          routing="path"
          appearance={{
            elements: {
              card: "rounded-2xl border border-gray-200 bg-white shadow-sm",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary:
                "bg-slate-600 hover:bg-slate-700 shadow-none text-white",
              formFieldInput:
                "border-gray-300 bg-white text-gray-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20",
              footerActionLink: "text-slate-600 hover:text-slate-700",
              socialButtonsBlockButton:
                "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-400",
              formFieldLabel: "text-gray-600",
              identityPreviewText: "text-gray-600",
              formResendCodeLink: "text-slate-600 hover:text-slate-700",
            },
          }}
        />
      </div>
    </main>
  );
}
