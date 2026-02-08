export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-slate-400 md:flex-row">
        <p>© 2025 InterviewKit. Built for modern interview readiness.</p>
        <div className="flex gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
}
