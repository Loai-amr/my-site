import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import SocialIcons from "@/components/SocialIcons";
import ThemeToggle from "@/components/ThemeToggle";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default async function Nav() {
  const { lang, t } = await getDict();
  const { profile } = getContent(lang);
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6">
        <Link href="/" className="font-mono text-lg font-semibold text-[var(--text)]" dir="ltr">
          loai<span className="text-[var(--accent-blue)]">_</span>
        </Link>
        <div className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-[var(--text-muted)] sm:gap-5">
          <Link href="/#projects" className="hidden hover:text-[var(--text)] sm:inline">
            {t.nav.projects}
          </Link>
          <Link href="/#work" className="hidden hover:text-[var(--text)] md:inline">
            {t.nav.work}
          </Link>
          <Link href="/#stack" className="hidden hover:text-[var(--text)] lg:inline">
            {t.nav.stack}
          </Link>
          <Link href="/#contact" className="hidden hover:text-[var(--text)] sm:inline">
            {t.nav.contact}
          </Link>
          <Link href="/shopify-and-wordpress" className="hidden hover:text-[var(--accent-blue)] lg:inline">
            {t.nav.shopifyWp}
          </Link>
          <Link href="/free-apps" className="hidden hover:text-[var(--text)] min-[400px]:inline">
            {t.nav.freeApps}
          </Link>
          <Link href="/blog" className="hover:text-[var(--text)]">
            {t.nav.blog}
          </Link>
          <a href="https://shop.loaiamr.com" className="text-[var(--accent-blue)] hover:text-[var(--text)]">
            {t.nav.shop} ↗&#xFE0E;
          </a>
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-[var(--radius)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)] sm:inline"
          >
            {t.nav.resume}
          </a>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SocialIcons />
            <LangToggle lang={lang} label={t.langToggleLabel} text={t.langToggle} />
            <ThemeToggle toLight={t.themeToLight} toDark={t.themeToDark} />
          </div>
        </div>
      </div>
    </nav>
  );
}
