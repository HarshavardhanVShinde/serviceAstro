export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  plan: "free" | "pro" | "elite";
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  shortDescription: string;
  description: string;
  premium: boolean;
  acceptanceRate: number;
}

export interface Submission {
  id: string;
  problemId: string;
  language: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Pending";
  runtime: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  plan: "pro" | "elite";
  status: "active" | "past_due" | "canceled";
  currentPeriodEnd: string;
}
