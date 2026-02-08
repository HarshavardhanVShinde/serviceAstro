import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "LeetCode-style practice",
    description: "Solve curated interview problems with an integrated Monaco editor.",
    icon: Code2
  },
  {
    title: "AI readiness checks",
    description: "Get instant feedback, interview insights, and personalized prep plans.",
    icon: Sparkles
  },
  {
    title: "Secure subscriptions",
    description: "Unlock premium problems and analytics with Razorpay-backed plans.",
    icon: ShieldCheck
  }
];

export default function HomePage() {
  return (
    <div className="container py-16">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
            InterviewKit SaaS
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Practice coding interviews, track submissions, and get AI-powered readiness insights.
          </h1>
          <p className="text-lg text-slate-300">
            InterviewKit turns your Astro marketing site into a full SaaS platform with authentication,
            payments, and real-time coding evaluation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Start practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100"
            >
              View pricing
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-8 shadow-2xl">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-200">Realtime dashboard preview</p>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase text-slate-500">Today</p>
              <p className="text-3xl font-semibold text-white">12</p>
              <p className="text-sm text-slate-400">Problems solved this week</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">Mock interviews</p>
                <p className="text-xl font-semibold text-white">3 scheduled</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500">Plan</p>
                <p className="text-xl font-semibold text-white">Pro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-6">
            <item.icon className="h-8 w-8 text-indigo-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
