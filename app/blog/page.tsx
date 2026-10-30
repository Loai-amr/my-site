import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listPublishedPosts, listTags, PAGE_SIZE } from "@/lib/blog/posts";
import { TAG_RE } from "@/lib/blog/schema";
import { getDict } from "@/lib/i18n";
import PostCard from "./PostCard";

type Search = Promise<{ page?: string; tag?: string }>;

function parse(search: Awaited<Search>) {
  const page = /^[1-9][0-9]{0,3}$/.test(search.page ?? "") ? Number(search.page) : 1;
  const tag = search.tag && search.tag.length <= 32 && TAG_RE.test(search.tag) ? search.tag : null;
  return { page, tag };
}

function href(page: number, tag: string | null) {
  const qs = new URLSearchParams();
  if (tag) qs.set("tag", tag);
  if (page > 1) qs.set("page", String(page));
  const s = qs.toString();
  return s ? `/blog?${s}` : "/blog";
}

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const [{ t }, { page, tag }] = await Promise.all([getDict(), searchParams.then(parse)]);
  const base = tag ? `${t.blog.metaTitle}: ${tag}` : t.blog.metaTitle;
  const title = page > 1 ? `${base} (${page})` : base;
  return {
    title,
    description: t.blog.metaDescription,
    alternates: { canonical: href(page, tag), types: { "application/rss+xml": "/blog/rss.xml" } },
    openGraph: { title, description: t.blog.metaDescription, type: "website", url: href(page, tag), siteName: t.meta.siteName },
  };
}

export default async function BlogIndex({ searchParams }: { searchParams: Search }) {
  const [{ t }, { page, tag }] = await Promise.all([getDict(), searchParams.then(parse)]);
  const [{ posts, total }, tags] = await Promise.all([listPublishedPosts(page, tag), listTags()]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) notFound();

  const pill = (active: boolean) =>
    `kw-pill transition-colors hover:border-[var(--border-hover)] ${active ? "!border-[var(--text)] !bg-[var(--text)] !text-[var(--bg)]" : ""}`;

  return (
    <main className="mx-auto max-w-[1080px] px-6 pb-20 pt-12">
      <header className="max-w-2xl">
        <p className="eyebrow">{t.blog.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t.blog.title}</h1>
        <p className="mt-3 text-[15px] text-[var(--text-muted)]">
          {t.blog.lead}{" "}
          <a href="/blog/rss.xml" className="font-medium">
            {t.blog.rss}
          </a>
        </p>
      </header>

      {tags.length > 0 && (
        <nav aria-label={t.blog.filterLabel} className="mt-8 flex flex-wrap gap-2" dir="ltr">
          <Link href="/blog" className={pill(!tag)} aria-current={!tag ? "page" : undefined}>
            {t.blog.all}
          </Link>
          {tags.map(({ tag: name }) => (
            <Link key={name} href={href(1, name)} className={pill(tag === name)} aria-current={tag === name ? "page" : undefined}>
              {name}
            </Link>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <p className="mt-10 text-[var(--text-muted)]">{tag ? t.blog.emptyTag.replace("{tag}", tag) : t.blog.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.id}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label={t.blog.pagination} className="mt-10 flex items-center justify-between gap-3">
          {page > 1 ? (
            <Link href={href(page - 1, tag)} rel="prev" className="btn-ghost px-4 py-2">
              {t.blog.newer}
            </Link>
          ) : (
            <span />
          )}
          <span className="font-mono text-sm text-[var(--text-dim)]" dir="ltr">
            {page} / {pages}
          </span>
          {page < pages ? (
            <Link href={href(page + 1, tag)} rel="next" className="btn-ghost px-4 py-2">
              {t.blog.older}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}
