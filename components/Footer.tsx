import Link from "next/link";
import { getDict } from "@/lib/i18n";

export default async function Footer() {
  const { t } = await getDict();
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-3 px-6">
        <p className="text-sm text-[var(--text-dim)]">{t.footer}</p>
        <Link href="/free-apps" className="text-sm font-medium text-[var(--accent-blue)]">
          {t.nav.freeApps}
        </Link>
      </div>
    </footer>
  );
}
