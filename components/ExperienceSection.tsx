import { experience } from "@/lib/content";

export default function ExperienceSection() {
  return (
    <section id="work" className="mx-auto max-w-[1080px] px-6 py-20">
      <div className="mb-10">
        <p className="eyebrow">Experience</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Where I&apos;ve shipped React &amp; Next.js.</h2>
      </div>

      <div className="flex flex-col gap-6">
        {experience.map((role) => (
          <article key={`${role.org}-${role.period}`} className="card p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold">{role.role}</h3>
              <span className="font-mono text-[13px] text-[var(--text-dim)]">{role.period}</span>
            </div>
            <p className="mt-1 font-mono text-[13px] text-[var(--accent-blue)]">
              {role.org} <span className="text-[var(--text-dim)]">· {role.location}</span>
            </p>
            <p className="mt-4 text-[15px] text-[var(--text-muted)]">{role.summary}</p>
            {role.highlights.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-[var(--text-muted)]">
                    <span className="mt-[2px] text-[var(--accent-green)]">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
