import Link from "next/link";
import { Sparkles } from "lucide-react";

const navLinks = [
  { href: "/problems", label: "Problems" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
            <Sparkles className="h-5 w-5" />
          </span>
          InterviewKit
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </header>
  );
}
