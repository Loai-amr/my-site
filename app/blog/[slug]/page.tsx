import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, getRelatedPosts, readingMinutes } from "@/lib/blog/posts";
import { SLUG_RE } from "@/lib/blog/schema";
import { formatPostDate, postImage } from "@/lib/blog/types";
import { getDict } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import MarkdownContent from "@/components/Markdown";
import PostCard from "../PostCard";

type Params = Promise<{ slug: string }>;

// No generateStaticParams on purpose: posts come from the Data Cache on request, so a newly
// published post is live without a redeploy.
async function load(slug: string) {
  if (slug.length > 120 || !SLUG_RE.test(slug)) return null;
  return getPublishedPost(slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await load((await params).slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  const url = `/blog/${post.slug}`;
  const images = [{ url: postImage(post), width: 1200, height: 630, alt: post.title }];
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url, types: { "application/rss+xml": "/blog/rss.xml" } },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      locale: "en_US",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: ["Loai Amr"],
      tags: post.tags,
      images,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = await load((await params).slug);
  if (!post) notFound();

  const [{ t }, related] = await Promise.all([getDict(), getRelatedPosts(post.slug, post.tags)]);
  const url = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
    image: new URL(postImage(post), siteUrl).toString(),
    author: { "@type": "Person", name: "Loai Amr", url: siteUrl },
    publisher: { "@type": "Person", name: "Loai Amr", url: siteUrl },
  };

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-20 pt-12">
      <script
        type="application/ld+json"
        // Escape "<" so post text can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Link href="/blog" className="text-sm font-medium text-[var(--accent-blue)]">
        {t.blog.allPosts}
      </Link>

      <article lang="en" dir="ltr" className="mt-8">
        <header>
          <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-[var(--text-dim)]">
            {post.published_at && <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>}
            <span>{readingMinutes(post.content)} min read</span>
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--text-muted)]">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`} className="kw-pill hover:border-[var(--border-hover)]">
                  {tag}
                </Link>
              ))}
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element -- generated covers and external cover URLs */}
          <img
            src={postImage(post)}
            alt=""
            width={1200}
            height={630}
            className="mt-8 aspect-[1200/630] w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-raised)] object-cover"
          />
        </header>

        <div className="mt-10">
          <MarkdownContent source={post.content} />
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16 border-t border-[var(--border)] pt-10">
          <h2 id="related-heading" className="text-xl font-bold tracking-tight">
            {t.blog.related}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.slice(0, 2).map((p) => (
              <li key={p.id}>
                <PostCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
