import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mception.ai",
  description: "AI-powered tools for the next generation of builders",
  manifest: "/manifest.webmanifest",
  applicationName: "mception",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Next emits the standards-track `mobile-web-app-capable`; older iOS only
  // reads the legacy spelling, so ship both to guarantee the standalone shell.
  other: { "apple-mobile-web-app-capable": "yes" },
  appleWebApp: {
    capable: true,
    title: "mception",
    // Translucent lets the app paint under the status bar; the shell adds
    // safe-area padding so nothing renders beneath the notch or home indicator.
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Fills the display cutout area on iPhone; requires the safe-area padding
  // applied in globals.css / the portal shell.
  viewportFit: "cover",
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasClerkKeys = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  // PostHog is mounted INSIDE ClerkProvider so Clerk identity is available to
  // the identify component. Both layers are independently env-gated: the
  // PostHogProvider is a no-op unless NEXT_PUBLIC_POSTHOG_KEY is set.
  const content = hasClerkKeys ? (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      signInFallbackRedirectUrl="/portal"
      signUpFallbackRedirectUrl="/portal"
    >
      <PostHogProvider>{children}</PostHogProvider>
    </ClerkProvider>
  ) : (
    children
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {content}
      </body>
    </html>
  );
}
