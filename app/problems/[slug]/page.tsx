import { notFound } from "next/navigation";
import { ProblemEditor } from "../../../components/problem-editor";
import { problems } from "../../../lib/mock-data";

interface ProblemPageProps {
  params: { slug: string };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = problems.find((item) => item.slug === params.slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{problem.difficulty}</p>
          <h1 className="text-3xl font-semibold text-white">{problem.title}</h1>
          <p className="text-slate-300">{problem.description}</p>
          {problem.premium ? (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
              Premium problem. Upgrade to unlock submissions and official solutions.
            </div>
          ) : null}
        </div>
        <ProblemEditor />
      </div>
    </div>
  );
}
