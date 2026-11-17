import Image from "next/image";
import type { CSSProperties } from "react";
import { socialIcons } from "@/components/SocialIcons";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

const networks = ["instagram", "tiktok"] as const;

/** Each card wears its platform's own look, in both light and dark mode. */
const themes: Record<
  (typeof networks)[number],
  { card: CSSProperties; ring: CSSProperties; button: CSSProperties; handle?: CSSProperties }
> = {
  instagram: {
    card: {
      background: "linear-gradient(135deg, #4f5bd5 0%, #962fbf 30%, #d62976 60%, #fa7e1e 85%, #feda75 100%)",
    },
    // Story ring: white gap, then a soft white halo on the gradient.
    ring: { background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf)", padding: 3, boxShadow: "0 0 0 3px rgba(255,255,255,.9)" },
    button: { background: "#ffffff", color: "#262626" },
  },
  tiktok: {
    card: {
      background:
        "radial-gradient(120% 80% at 0% 0%, rgba(37,244,238,.18), transparent 55%), radial-gradient(120% 80% at 100% 100%, rgba(254,44,85,.22), transparent 55%), #010101",
    },
    // TikTok's offset cyan/red "glitch" around the avatar and handle.
    ring: { background: "#010101", padding: 3, boxShadow: "-3px -2px 0 #25f4ee, 3px 2px 0 #fe2c55" },
    button: { background: "#fe2c55", color: "#ffffff" },
    handle: { textShadow: "-1px -1px 0 #25f4ee, 1px 1px 0 #fe2c55" },
  },
};

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
      <div className="mb-10 text-center">
        <p className="eyebrow">{t.follow.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{t.follow.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-[var(--text-muted)]">{t.follow.lead}</p>
      </div>
      <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-5 sm:grid-cols-2">
        {networks.map((key) => {
          const theme = themes[key];
          return (
            <a
              key={key}
              href={profile[key]}
              target="_blank"
              rel="noopener noreferrer"
              style={theme.card}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl px-6 py-8 text-center text-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="absolute end-4 top-4 opacity-90 [&_svg]:h-5 [&_svg]:w-5">{socialIcons[key]}</span>
              <span className="rounded-full" style={theme.ring}>
                <Image
                  src="/profile.jpg"
                  alt=""
                  width={88}
                  height={88}
                  className="block h-[88px] w-[88px] rounded-full object-cover"
                />
              </span>
              <p className="mt-5 text-[13px] font-medium text-white/80">{t.social[key]}</p>
              <p className="mt-0.5 text-xl font-bold" style={theme.handle}>
                <bdi>{handleFrom(profile[key])}</bdi>
              </p>
              <p className="mt-2 text-sm text-white/85">{t.follow[key]}</p>
              <span
                style={theme.button}
                className="mt-6 inline-flex min-w-[140px] justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-opacity group-hover:opacity-90"
              >
                {t.follow.cta}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
