import SocialIcons from "@/components/SocialIcons";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";

export default async function ContactSection() {
  const { lang, t } = await getDict();
  const { profile } = getContent(lang);
  return (
    <section id="contact" className="mx-auto max-w-[1080px] px-6 py-20">
      <div className="mb-8">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{t.contact.title}</h2>
        <p className="mt-3 max-w-xl text-[15px] text-[var(--text-muted)]">{t.contact.lead}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          github
        </a>
        <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          {t.nav.resume}
        </a>
        <div className="flex gap-3">
          <SocialIcons size="lg" networks={["linkedin", "instagram", "tiktok"]} />
        </div>
      </div>
    </section>
  );
}
