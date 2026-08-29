import type { Service } from "@/lib/content";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] font-mono text-sm font-bold text-[var(--text)]">
        {service.icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{service.desc}</p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {service.tags.map((tag) => (
          <li key={tag} className="flex gap-2 text-sm text-[var(--text-muted)]">
            <span className="text-[var(--accent-green)]">▸</span>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
