import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sycamore Lane Holdings | Operator-Led Strategy for CPG, Retail & Foodservice",
  description:
    "Operator-led acquisitions and strategy for CPG, retail, and foodservice businesses.",
};

export default function SycamoreLaneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
