import Image from "next/image";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default async function Hero() {
  const { lang, t } = await getDict();
  const { heroKeywords, profile } = getContent(lang);
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[280px_1fr] md:py-24">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="h-56 w-56 overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              width={224}
              height={224}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
            {profile.location} · {t.hero.openTo}
          </div>
        </div>

        <div>
          <p className="eyebrow">
            {profile.title} · {profile.tagline}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {t.hero.titleA}
            <span className="text-[var(--accent-green)]">{t.hero.fast}</span>
            {t.hero.titleB}
            <span className="text-[var(--accent-blue)]">{t.hero.tested}</span>
            {t.hero.titleC}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] text-[var(--text-muted)]">{t.hero.lead}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {heroKeywords.map((kw) => (
              <span key={kw} className="kw-pill">
                {kw}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#work" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
