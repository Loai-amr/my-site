import { getDict } from "@/lib/i18n";

export default async function Footer() {
  const { t } = await getDict();
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto max-w-[1080px] px-6">
        <p className="text-sm text-[var(--text-dim)]">{t.footer}</p>
      </div>
    </footer>
  );
}
