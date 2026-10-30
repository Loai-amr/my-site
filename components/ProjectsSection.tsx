import Link from "next/link";
import Showcase from "@/components/Showcase";
import { getDict } from "@/lib/i18n";
import { getProjects, type Product } from "@/lib/projects";

type Dict = Awaited<ReturnType<typeof getDict>>["t"];

export default async function ProjectsSection() {
  const { lang, t } = await getDict();
  const { toolswift, products, clientSites, wordpressSites } = getProjects(lang);
  const p = t.projects;
  return (
    <section id="projects" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1080px] px-6 pt-20">
        <p className="eyebrow">{p.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{p.title}</h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{p.lead}</p>
      </div>

      {/* Featured case study: ToolSwift. */}
      <div className="mx-auto max-w-[1080px] px-6 pt-12">
        <article className="card overflow-hidden hover:shadow-sm">
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{p.featured}</span>
              <FullStackBadge text={p.fullStack} />
            </div>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{toolswift.name}</h3>
            <p className="mt-1 font-medium text-[var(--accent-blue)]">{toolswift.tagline}</p>
            <p className="mt-4 max-w-3xl text-[15px] text-[var(--text-muted)]">{toolswift.summary}</p>
            <Parts parts={toolswift.parts} />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {toolswift.details?.map((d) => (
                <div key={d.title} className="flex gap-3">
                  <span aria-hidden className="mt-[2px] font-bold text-[var(--accent-green)]">
                    ✓
                  </span>
                  <div>
                    <strong className="text-sm text-[var(--text)]">{d.title}</strong>
                    <p className="text-sm text-[var(--text-muted)]">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={toolswift.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {p.visitSite}
              </a>
              {toolswift.appUrl && (
                <a href={toolswift.appUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  {p.getApp}
                </a>
              )}
            </div>
          </div>
          <div className="border-t border-[var(--border)] bg-[var(--bg-raised)]/50 px-2 py-10 md:px-8">
            <Showcase sites={toolswift.shots} labels={t.showcase} />
          </div>
        </article>
      </div>

      {/* ONE MORE + Witan side by side: frontend for the website and the dashboards. */}
      <div className="mx-auto max-w-[1080px] px-6 pt-20">
        <p className="eyebrow">{p.moreEyebrow}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{p.moreTitle}</h3>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCase key={product.id} product={product} t={t} />
          ))}
        </div>
      </div>

      {/* Client sites (React / Next.js), then WordPress. */}
      <div className="mx-auto max-w-[1080px] px-6 pt-20">
        <p className="eyebrow">{p.sitesEyebrow}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{p.sitesTitle}</h3>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{p.sitesLead}</p>
        <div className="mt-8">
          <Showcase sites={clientSites} labels={t.showcase} />
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <p className="eyebrow">{p.wpEyebrow}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{p.wpTitle}</h3>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{p.wpLead}</p>
        <div className="mt-8">
          <Showcase sites={wordpressSites} labels={t.showcase} />
        </div>
        <Link href="/shopify-and-wordpress" className="mt-8 inline-block text-sm font-medium text-[var(--accent-blue)]">
          {p.wpMore}
        </Link>
      </div>
    </section>
  );
}

function ProductCase({ product, t }: { product: Product; t: Dict }) {
  return (
    <article className="card flex flex-col overflow-hidden hover:shadow-sm">
      <div className="flex-1 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="text-2xl font-bold tracking-tight">{product.name}</h4>
          <FullStackBadge text={t.projects.frontend} />
        </div>
        <p className="mt-1 font-medium text-[var(--accent-blue)]">{product.tagline}</p>
        <p className="mt-3 max-w-3xl text-[15px] text-[var(--text-muted)]">{product.summary}</p>
        <Parts parts={product.parts} />
      </div>
      <div className="border-t border-[var(--border)] bg-[var(--bg-raised)]/50 px-2 py-8 md:px-4">
        <Showcase sites={product.shots} labels={t.showcase} />
      </div>
    </article>
  );
}

function FullStackBadge({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full bg-[var(--accent-green)]/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-green)]">
      {text}
    </span>
  );
}

function Parts({ parts }: { parts: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {parts.map((part) => (
        <span key={part} className="kw-pill !py-1 !text-[12px]">
          {part}
        </span>
      ))}
    </div>
  );
}
