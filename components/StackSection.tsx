import { education, stack } from "@/lib/content";

export default function StackSection() {
  return (
    <section id="stack" className="border-t border-[var(--border)] bg-[var(--bg-raised)]/40">
      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <div className="mb-10">
          <p className="eyebrow">Tools</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">What I actually ship with.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((col) => (
            <div
              key={col.label}
              className={`rounded-[var(--radius)] border p-5 ${
                col.featured
                  ? "border-[var(--accent-blue)]/40 bg-[var(--bg-card)] shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg-card)]"
              }`}
            >
              <h4 className="font-mono text-sm font-semibold text-[var(--text)]">{col.label}</h4>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{col.items.join(" · ")}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-8">
          <p className="eyebrow">Education</p>
          <div className="mt-4 flex flex-col gap-3">
            {education.map((e) => (
              <div key={e.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-[var(--text)]">
                  {e.title} <span className="text-[var(--text-dim)]">— {e.org}</span>
                </span>
                <span className="font-mono text-[13px] text-[var(--text-dim)]">{e.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
