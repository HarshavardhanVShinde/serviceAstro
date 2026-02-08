import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-800/60 bg-slate-900/60 p-8">
        <h1 className="text-2xl font-semibold text-white">Sign in to InterviewKit</h1>
        <p className="mt-2 text-sm text-slate-400">
          Use your email to access your coding dashboard.
        </p>
        <form className="mt-6 space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          New here? <Link href="/pricing" className="text-indigo-300">Choose a plan</Link>
        </p>
      </div>
    </div>
  );
}
