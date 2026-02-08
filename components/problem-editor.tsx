"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { runJudge0Code } from "../lib/judge0";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const languageOptions = [
  { id: 63, label: "JavaScript" },
  { id: 71, label: "Python" },
  { id: 54, label: "C++" }
];

export function ProblemEditor() {
  const [languageId, setLanguageId] = useState(languageOptions[0].id);
  const [code, setCode] = useState("function solution() {\n  return 0;\n}");
  const [status, setStatus] = useState<string | null>(null);

  const languageLabel = useMemo(
    () => languageOptions.find((option) => option.id === languageId)?.label ?? "",
    [languageId]
  );

  async function handleRunCode() {
    setStatus("Running code on Judge0...");
    try {
      const result = await runJudge0Code(code, languageId);
      setStatus(`Submitted! Token: ${result.token}`);
    } catch (error) {
      setStatus("Failed to run code. Check Judge0 credentials.");
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Language</p>
          <select
            value={languageId}
            onChange={(event) => setLanguageId(Number(event.target.value))}
            className="mt-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          >
            {languageOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleRunCode}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
          >
            Run Code
          </button>
          <button
            type="button"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
        <MonacoEditor
          height="360px"
          theme="vs-dark"
          language={languageLabel.toLowerCase()}
          value={code}
          onChange={(value) => setCode(value ?? "")}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>

      {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
    </div>
  );
}
