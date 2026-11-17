import Image from "next/image";
import { socialIcons } from "@/components/SocialIcons";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

const networks = ["instagram", "tiktok"] as const;

/** "@loaiiiamr" from "https://www.instagram.com/loaiiiamr/" or "https://www.tiktok.com/@loaiiamr". */
function handleFrom(url: string) {
  const last = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
}

export default async function FollowSection() {
  const { lang, t } = await getDict();
  const { profile } = getContent(lang);
  return (
    <section id="follow" className="mx-auto max-w-[1080px] px-6 pt-20">
      <div className="mb-8">
        <p className="eyebrow">{t.follow.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{t.follow.title}</h2>
        <p className="mt-3 max-w-xl text-[15px] text-[var(--text-muted)]">{t.follow.lead}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {networks.map((key) => (
          <a
            key={key}
            href={profile[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-center gap-4 p-5"
          >
            <div className="relative shrink-0">
              <Image
                src="/profile.jpg"
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border border-[var(--border)] object-cover"
              />
              <span className="absolute -bottom-1 -end-1 grid h-7 w-7 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)]">
                {socialIcons[key]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[var(--text-dim)]">{t.social[key]}</p>
              <p className="truncate font-semibold text-[var(--text)]">
                <bdi>{handleFrom(profile[key])}</bdi>
              </p>
              <p className="mt-0.5 text-sm text-[var(--text-muted)]">{t.follow[key]}</p>
            </div>
            <span className="shrink-0 rounded-[var(--radius)] bg-[var(--accent-blue)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)] transition-colors group-hover:bg-[var(--accent-blue)]/90">
              {t.follow.cta}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
