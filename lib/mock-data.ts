import type { Problem, Submission } from "../types";

export const problems: Problem[] = [
  {
    id: "prob-1",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    shortDescription: "Find indices of two numbers that add up to a target.",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    premium: false,
    acceptanceRate: 62
  },
  {
    id: "prob-2",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    shortDescription: "Merge overlapping intervals into a concise output.",
    description:
      "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
    premium: true,
    acceptanceRate: 48
  },
  {
    id: "prob-3",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    shortDescription: "Find the median of two sorted arrays in log time.",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    premium: true,
    acceptanceRate: 37
  }
];

export const submissions: Submission[] = [
  {
    id: "sub-1",
    problemId: "prob-1",
    language: "TypeScript",
    status: "Accepted",
    runtime: "52 ms",
    createdAt: "2025-02-05"
  },
  {
    id: "sub-2",
    problemId: "prob-2",
    language: "Python",
    status: "Wrong Answer",
    runtime: "-",
    createdAt: "2025-02-02"
  }
];
