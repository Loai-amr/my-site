import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent, type FreeApp } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  const title = t.freeApps.metaTitle;
  const description = t.freeApps.metaDescription;
  return {
    title,
    description,
    alternates: { canonical: "/free-apps" },
    openGraph: {
      title: `${title} — ${t.meta.siteName.split(" — ")[0]}`,
      description,
      type: "website",
      url: "/free-apps",
      siteName: t.meta.siteName,
    },
  };
}

type Labels = { open: string; source: string };

export default async function FreeAppsPage() {
  const { lang, t } = await getDict();
  const { freeApps } = getContent(lang);
  return (
    <main>
      <div className="mx-auto max-w-[1080px] px-6 pt-12">
        <Link href="/" className="text-sm font-medium text-[var(--accent-blue)]">
          {t.back}
        </Link>
      </div>

      <section className="mx-auto max-w-[1080px] px-6 py-12">
        <p className="eyebrow">{t.freeApps.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {t.freeApps.titleA}
          <span className="text-[var(--accent-green)]">{t.freeApps.free}</span>
          {t.freeApps.titleB}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{t.freeApps.lead}</p>
      </section>

      <div className="mx-auto max-w-[1080px] space-y-10 px-6 pb-20">
        {freeApps.map((app) => (
          <AppShowcase key={app.slug} app={app} labels={t.freeApps} />
        ))}
      </div>
    </main>
  );
}

function AppShowcase({ app, labels }: { app: FreeApp; labels: Labels }) {
  const [left, center, right] = app.screenshots;
  return (
    <article className="card overflow-hidden hover:shadow-sm">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {app.tags.map((tag) => (
              <span key={tag} className="kw-pill !py-1 !text-[12px]">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{app.name}</h2>
          <p className="mt-1 font-medium text-[var(--accent-blue)]">{app.tagline}</p>
          <p className="mt-4 text-[15px] text-[var(--text-muted)]">{app.description}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {app.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden className="font-bold text-[var(--accent-green)]">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {labels.open}
            </a>
            {app.source && (
              <a href={app.source} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {labels.source}
              </a>
            )}
          </div>
        </div>

        {/* Three phones fanned out over a soft glow; they straighten up on hover. Same fan in Arabic. */}
        <div dir="ltr" className="group relative flex items-end justify-center overflow-hidden px-4 pb-12 pt-2 lg:py-14">
          <div
            aria-hidden
            className="absolute inset-0 -z-0 bg-[radial-gradient(60%_55%_at_50%_55%,rgba(37,99,235,0.18),rgba(22,163,74,0.08)_55%,transparent_75%)]"
          />
          {left && (
            <Phone
              shot={left}
              className="-mr-8 w-[34%] max-w-[190px] translate-y-6 -rotate-[8deg] group-hover:-rotate-[4deg] group-hover:translate-y-3"
            />
          )}
          {center && (
            <Phone shot={center} className="z-10 w-[40%] max-w-[225px] group-hover:-translate-y-2" priority />
          )}
          {right && (
            <Phone
              shot={right}
              className="-ml-8 w-[34%] max-w-[190px] translate-y-6 rotate-[8deg] group-hover:rotate-[4deg] group-hover:translate-y-3"
            />
          )}
        </div>
      </div>
    </article>
  );
}

function Phone({
  shot,
  className = "",
  priority = false,
}: {
  shot: { src: string; alt: string };
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[2rem] bg-slate-900 p-[5px] shadow-2xl shadow-slate-900/30 ring-1 ring-slate-900/10 dark:ring-white/15 transition-transform duration-500 ease-out ${className}`}
    >
      <div aria-hidden className="absolute left-1/2 top-[11px] z-10 h-[10px] w-[28%] -translate-x-1/2 rounded-full bg-slate-900" />
      {/* Status-bar strip in the app's background colour keeps the screenshot clear of the
          rounded corners and the notch, like a real phone. */}
      <div className="overflow-hidden rounded-[1.7rem] bg-[#f4f5f7] pt-[11%]">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1170}
          height={2532}
          sizes="(min-width: 1024px) 225px, 40vw"
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
