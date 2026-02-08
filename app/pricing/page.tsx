import { razorpayPlans } from "../../lib/razorpay";

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold text-white">Choose your plan</h1>
        <p className="text-slate-400">Unlock premium problems, AI mock interviews, and analytics.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {razorpayPlans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-8 text-left"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{plan.name}</p>
            <p className="mt-4 text-4xl font-semibold text-white">₹{plan.price}</p>
            <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Subscribe with Razorpay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
