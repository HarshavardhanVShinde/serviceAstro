# InterviewKit SaaS (Next.js 14)

InterviewKit is a LeetCode-style coding interview SaaS with authentication, subscriptions, and a Monaco-powered editor.

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + shadcn/ui-ready styling
- Supabase (Auth, Postgres, Storage)
- Monaco Editor
- Judge0 API
- Razorpay subscriptions
- Zustand state management

## Folder Structure

```
app/
  (auth)/
  dashboard/
  problems/
  pricing/
components/
lib/
store/
supabase/
types/
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_JUDGE0_URL`
- `NEXT_PUBLIC_JUDGE0_API_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Supabase Schema

Run the SQL in `supabase/schema.sql` to create the required tables and triggers.

## Notes

- `/problems` lists available questions.
- `/problems/[slug]` includes Monaco editor and Judge0 run button.
- `/dashboard` is protected via middleware (Supabase auth cookie required).
- `/pricing` lists Razorpay-backed plans.

## Next Steps

- Connect real Supabase queries in server actions.
- Implement Razorpay checkout session and webhook handling.
- Store submissions in Supabase on submit.
