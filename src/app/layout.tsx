import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // stored as --font-inter so it doesn't conflict with the active font
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xentys — Specialist Procurement Recruitment",
  description:
    "We recruit exclusively in procurement and supply chain for industrial, construction, and offshore organisations in the Netherlands. Since 2010.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Floating contact FAB — round, icon only, 56px */}
        <button
          type="button"
          aria-label="Contact us"
          className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-amber text-navy flex items-center justify-center shadow-lg hover:bg-[#e89400] hover:shadow-xl transition-all duration-200"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>
      </body>
    </html>
  );
}
