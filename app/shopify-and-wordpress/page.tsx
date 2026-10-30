import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CaseStudy from "@/components/CaseStudy";
import Showcase from "@/components/Showcase";
import { getContent } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

const keywords = [
  "Loai Amr",
  "Shopify Developer",
  "WordPress Developer",
  "Elementor Developer",
  "WooCommerce",
  "Shopify Theme Development",
  "Liquid",
  "Headless WordPress",
  "Site Performance Optimization",
];

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  const title = t.shopifyWp.metaTitle;
  const ogTitle = `${title} — ${t.meta.siteName.split(" — ")[0]}`;
  const description = t.shopifyWp.metaDescription;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: "/shopify-and-wordpress" },
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      url: "/shopify-and-wordpress",
      siteName: t.meta.siteName,
      images: [
        { url: "/shopify-and-wordpress/opengraph-image", width: 1200, height: 630, alt: ogTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/shopify-and-wordpress/opengraph-image"],
    },
  };
}

export default async function ShopifyAndWordPress() {
  const { lang, t } = await getDict();
  const { otherWorkServices, otherWorkProjects, profile } = getContent(lang);
  const { wordpressSites } = getProjects(lang);
  return (
    <main>
      <div className="mx-auto max-w-[1080px] px-6 pt-12">
        <Link href="/" className="text-sm font-medium text-[var(--accent-blue)]">
          {t.back}
        </Link>
      </div>

      <section className="mx-auto max-w-[1080px] px-6 py-12">
        <p className="eyebrow">{t.shopifyWp.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t.shopifyWp.title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{t.shopifyWp.lead}</p>
      </section>

      {/* Featured: every WordPress site, scrolling on desktop and mobile. */}
      <section className="mx-auto max-w-[1080px] px-6 pb-20">
        <p className="eyebrow">{t.projects.wpEyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">{t.projects.wpTitle}</h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">{t.projects.wpLead}</p>
        <div className="mt-8">
          <Showcase sites={wordpressSites} labels={t.showcase} />
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {otherWorkServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 pb-20">
        <div className="mb-8">
          <p className="eyebrow">{t.shopifyWp.projectsEyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{t.shopifyWp.projectsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherWorkProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-raised)]/40">
        <div className="mx-auto max-w-[1080px] px-6 py-20">
          <div className="mb-8">
            <p className="eyebrow">{t.shopifyWp.proofEyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{t.shopifyWp.proofTitle}</h2>
          </div>
          <CaseStudy />
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-raised)] p-6">
          <p className="text-[15px] text-[var(--text-muted)]">{t.shopifyWp.ctaText}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              {profile.email}
            </a>
            <a href={profile.ecommerceResumeHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {t.shopifyWp.ctaResume}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
