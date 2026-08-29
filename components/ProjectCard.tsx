import type { Project } from "@/lib/content";

const tagStyles: Record<Project["tagClass"], string> = {
  shopify: "bg-[var(--shopify)]/15 text-[var(--shopify)]",
  wp: "bg-[var(--wp)]/15 text-[var(--wp)]",
  b2b: "bg-[var(--accent-yellow)]/15 text-[var(--accent-yellow)]",
  scale: "bg-[var(--text-muted)]/15 text-[var(--text-muted)]",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card p-6">
      <span
        className={`inline-block rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${tagStyles[project.tagClass]}`}
      >
        {project.tag}
      </span>
      <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 font-mono text-[13px] text-[var(--text-dim)]">{project.stackLine}</p>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{project.desc}</p>
    </article>
  );
}
