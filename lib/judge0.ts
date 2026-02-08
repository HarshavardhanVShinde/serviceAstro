export interface Judge0Response {
  token: string;
}

export async function runJudge0Code(sourceCode: string, languageId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_JUDGE0_URL}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.NEXT_PUBLIC_JUDGE0_API_KEY ?? ""
    },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin: ""
    })
  });

  if (!response.ok) {
    throw new Error("Failed to submit code to Judge0");
  }

  return (await response.json()) as Judge0Response;
}
