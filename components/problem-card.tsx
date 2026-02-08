import Link from "next/link";
import type { Problem } from "../types";

const difficultyColors: Record<Problem["difficulty"], string> = {
  Easy: "text-emerald-300",
  Medium: "text-amber-300",
  Hard: "text-rose-300"
};

export function ProblemCard({ problem, locked }: { problem: Problem; locked: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
      <div>
        <Link href={`/problems/${problem.slug}`} className="text-lg font-semibold text-white">
          {problem.title}
        </Link>
        <p className="mt-1 text-sm text-slate-400">{problem.shortDescription}</p>
        <p className={`mt-2 text-xs font-semibold ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </p>
      </div>
      <div className="text-sm text-slate-300">
        {locked ? "Locked" : `${problem.acceptanceRate}% acceptance`}
      </div>
    </div>
  );
}
