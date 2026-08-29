import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CaseStudy from "@/components/CaseStudy";
import { otherWorkServices, otherWorkProjects, profile } from "@/lib/content";

const title = "Shopify & WordPress Development";
const ogTitle = "Shopify & WordPress Development — Loai Amr";
const description =
  "eCommerce and CMS work: Shopify theme development, WordPress/Elementor builds, WooCommerce stores, and site performance rebuilds (16s → 1.2s case study).";
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

export const metadata: Metadata = {
  title,
  description,
  keywords,
  alternates: { canonical: "/shopify-and-wordpress" },
  openGraph: {
    title: ogTitle,
    description,
    type: "website",
    url: "/shopify-and-wordpress",
    siteName: "Loai Amr — Frontend Developer",
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

export default function ShopifyAndWordPress() {
  return (
    <main>
      <div className="mx-auto max-w-[1080px] px-6 pt-12">
        <Link href="/" className="text-sm font-medium text-[var(--accent-blue)]">
          ← back to frontend work
        </Link>
      </div>

      <section className="mx-auto max-w-[1080px] px-6 py-12">
        <p className="eyebrow">Also in the toolkit</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Shopify &amp; WordPress work.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-muted)]">
          Alongside React/Next.js product work, {profile.name.split(" ")[0]} has 50+ Upwork
          projects and 24+ independently-built WordPress sites — Shopify storefronts, WordPress/
          Elementor builds, and the performance work most agencies skip.
        </p>
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
          <p className="eyebrow">Projects</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Storefronts &amp; sites shipped.</h2>
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
            <p className="eyebrow">Proof, not a promise</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              16 seconds to 1.2. Here&apos;s what that&apos;s worth.
            </h2>
          </div>
          <CaseStudy />
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-raised)] p-6">
          <p className="text-[15px] text-[var(--text-muted)]">
            Have a Shopify or WordPress project? Let&apos;s talk.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              {profile.email}
            </a>
            <a href={profile.ecommerceResumeHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              eCommerce résumé.pdf
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
