import { ProblemCard } from "../../components/problem-card";
import { problems } from "../../lib/mock-data";

export default function ProblemsPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">Problem library</h1>
        <p className="text-slate-400">
          Solve curated coding challenges with integrated execution and premium unlocks.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} locked={problem.premium} />
        ))}
      </div>
    </div>
  );
}
