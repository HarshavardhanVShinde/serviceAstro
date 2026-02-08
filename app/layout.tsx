import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "InterviewKit",
  description: "LeetCode-style interview prep with AI readiness checks."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteHeader />
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
