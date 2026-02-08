import { submissions } from "../../lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400">Track your progress and subscription plan.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-400">Problems solved</p>
          <p className="mt-2 text-3xl font-semibold text-white">24</p>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-400">Current plan</p>
          <p className="mt-2 text-3xl font-semibold text-white">Pro</p>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6">
          <p className="text-sm text-slate-400">AI readiness score</p>
          <p className="mt-2 text-3xl font-semibold text-white">82%</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white">Recent submissions</h2>
        <div className="mt-4 space-y-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-900/50 p-4 text-sm"
            >
              <div>
                <p className="text-white">{submission.problemId}</p>
                <p className="text-slate-400">{submission.language}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-200">{submission.status}</p>
                <p className="text-slate-500">{submission.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
