import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default async function CaseStudy() {
  const { lang, t } = await getDict();
  const { caseStudy } = getContent(lang);
  const term = caseStudy.terminal;
  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-muted)]">
          <span className="font-semibold text-[var(--text)]">{caseStudy.client}</span>
          <span className="mx-2 text-[var(--text-dim)]">·</span>
          {caseStudy.role}
        </p>
        <a
          href={caseStudy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--accent-blue)]"
        >
          {t.caseStudy.visit}
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-raised)] p-5">
        <div className="flex items-center gap-4">
          <span className="w-16 font-mono text-[13px] text-[var(--text-dim)]">{t.caseStudy.before}</span>
          <div className="metric-bar-track">
            <div className="metric-bar-fill bad" style={{ width: "100%" }} />
          </div>
          <span className="w-16 text-end font-mono text-sm font-semibold text-[var(--accent-red)]">
            {caseStudy.before}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 font-mono text-[13px] text-[var(--text-dim)]">{t.caseStudy.after}</span>
          <div className="metric-bar-track">
            <div className="metric-bar-fill good" style={{ width: "7.5%" }} />
          </div>
          <span className="w-16 text-end font-mono text-sm font-semibold text-[var(--accent-green)]">
            {caseStudy.after}
          </span>
        </div>
        <p className="text-[12px] text-[var(--text-dim)]">{caseStudy.footnote}</p>
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
        <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
          {t.caseStudy.whyTitle}
        </summary>
        <div className="mt-4 text-sm text-[var(--text-muted)]">
          <p>
            {t.caseStudy.whyA}
            <strong className="text-[var(--text)]">{t.caseStudy.whyStrong}</strong>
            {t.caseStudy.whyB}
          </p>
          <div className="calc-terminal mt-4">
            <p className="text-[var(--text-dim)]">{term.comment}</p>
            <p>
              <span className="prompt">$</span> {term.visits}
            </p>
            <p className="term-out">{term.at16}</p>
            <p className="term-out">{term.at12}</p>
            <p>
              <span className="prompt">$</span> {term.conversion}
            </p>
            <p className="term-out ok">{term.leads}</p>
            <p className="mt-2 text-[var(--text-dim)]">{term.disclaimer}</p>
          </div>
        </div>
      </details>
    </div>
  );
}
