import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

const icons = {
  instagram: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  tiktok: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V3c0 2.8 2.2 5 5 5" />
    </svg>
  ),
};

/** Instagram + TikTok icon links. `size="lg"` matches the contact section's buttons. */
export default async function SocialIcons({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { lang, t } = await getDict();
  const { profile } = getContent(lang);
  const box = size === "lg" ? "h-[46px] w-[46px]" : "h-8 w-8";
  return (
    <>
      {(["instagram", "tiktok"] as const).map((key) => (
        <a
          key={key}
          href={profile[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.social[key]}
          title={t.social[key]}
          className={`grid ${box} shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)]`}
        >
          {icons[key]}
        </a>
      ))}
    </>
  );
}
