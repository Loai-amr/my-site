import { caseStudy } from "@/lib/content";

export default function CaseStudy() {
  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-sm text-[var(--text-muted)]">
          <span className="text-[var(--text)]">{caseStudy.client}</span>
          <span className="mx-2 text-[var(--text-dim)]">·</span>
          {caseStudy.role}
        </p>
        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-[var(--accent-blue)]"
        >
          visit site →
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-raised)] p-5">
        <div className="flex items-center gap-4">
          <span className="w-16 font-mono text-[13px] text-[var(--text-dim)]">BEFORE</span>
          <div className="metric-bar-track">
            <div className="metric-bar-fill bad" style={{ width: "100%" }} />
          </div>
          <span className="w-14 text-right font-mono text-sm font-semibold text-[var(--accent-red)]">
            {caseStudy.before}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 font-mono text-[13px] text-[var(--text-dim)]">AFTER</span>
          <div className="metric-bar-track">
            <div className="metric-bar-fill good" style={{ width: "7.5%" }} />
          </div>
          <span className="w-14 text-right font-mono text-sm font-semibold text-[var(--accent-green)]">
            {caseStudy.after}
          </span>
        </div>
        <p className="font-mono text-[12px] text-[var(--text-dim)]">{caseStudy.footnote}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {caseStudy.fixes.map((fix) => (
          <div key={fix.num} className="flex gap-3">
            <span className="font-mono text-sm text-[var(--text-dim)]">{fix.num}</span>
            <div>
              <strong className="text-sm text-[var(--text)]">{fix.title}</strong>
              <p className="text-sm text-[var(--text-muted)]">{fix.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <details className="mt-6 rounded-[var(--radius)] border border-[var(--border)] p-4">
        <summary className="cursor-pointer font-mono text-sm text-[var(--text)]">
          Why this is a revenue number, not a vanity metric
        </summary>
        <div className="mt-4 text-sm text-[var(--text-muted)]">
          <p>
            Google&apos;s mobile UX research puts bounce probability at roughly{" "}
            <strong className="text-[var(--text)]">+90% when load time goes from 1s to 5s</strong>.
            Applying an 80% drop-off at the 2-second mark to a site running at 16 seconds means
            most traffic never saw the page at all.
          </p>
          <div className="calc-terminal mt-4">
            <p className="text-[var(--text-dim)]">// back-of-envelope, using the business&apos;s own numbers</p>
            <p>
              <span className="prompt">$</span> 1,000 monthly visits, 80% leave by second 2
            </p>
            <p className="term-out">→ at 16s: ~800 of 1,000 visits bounce before the page is usable</p>
            <p className="term-out">→ at 1.2s: those 800 visits become reachable</p>
            <p>
              <span className="prompt">$</span> even a modest 3% conversion on the newly-reachable traffic
            </p>
            <p className="term-out ok">→ ~24 additional leads/month, previously invisible to the funnel</p>
            <p className="mt-2 text-[var(--text-dim)]">
              // illustrative math based on a common industry bounce assumption — always validate
              against real analytics before quoting this to a client.
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}
