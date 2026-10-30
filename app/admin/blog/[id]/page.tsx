import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPost } from "@/lib/blog/admin";
import { readingMinutes } from "@/lib/blog/posts";
import { UUID_RE } from "@/lib/blog/types";
import MarkdownContent from "@/components/Markdown";
import { deletePostAction, savePost } from "../../actions";
import ConfirmButton from "../../ConfirmButton";
import { badge, btn, btnDanger, btnPrimary, errorBox, flashBox, hint, input, label } from "../../ui";

export const metadata: Metadata = { title: "Edit post", robots: { index: false } };

const FLASH: Record<string, string> = {
  saved: "Saved.",
  "saved-slug": "Saved. That slug was taken, so a number was added to it.",
  published: "Published. The post is live and the blog, sitemap and RSS are refreshed.",
  unpublished: "Unpublished. The post is a draft again and no longer public.",
};

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ flash?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ id }, { flash, error }] = await Promise.all([params, searchParams]);
  if (!UUID_RE.test(id)) notFound();
  const post = await getPost(id);
  if (!post) notFound();
  const live = post.status === "published";
  const words = post.content.split(/\s+/).filter(Boolean).length;

  return (
    <main lang="en" dir="ltr" className="mx-auto max-w-[1080px] px-6 pb-20 pt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{live ? "Edit post" : "Review draft"}</h1>
        <div className="flex items-center gap-2">
          <span className={badge(post.status)}>{post.status}</span>
          <Link href="/admin/blog" className={btn}>
            ← All posts
          </Link>
        </div>
      </div>

      {flash && FLASH[flash] && (
        <p role="status" className={`${flashBox} mt-4`}>
          {FLASH[flash]}{" "}
          {live && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
              View live →
            </a>
          )}
        </p>
      )}
      {error && (
        <p role="alert" className={`${errorBox} mt-4`}>
          {error}
        </p>
      )}

      <form action={savePost} className="card mt-6 grid gap-5 p-6 hover:shadow-sm">
        <input type="hidden" name="id" value={post.id} />
        <div className="grid gap-1.5">
          <label htmlFor="title" className={label}>
            Title
          </label>
          <input id="title" name="title" defaultValue={post.title} required minLength={3} maxLength={200} className={input} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label htmlFor="slug" className={label}>
              Slug
            </label>
            <input id="slug" name="slug" defaultValue={post.slug} maxLength={120} className={`${input} font-mono`} />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="tags" className={label}>
              Tags
            </label>
            <input id="tags" name="tags" defaultValue={post.tags.join(", ")} className={input} />
            <span className={hint}>Comma-separated, up to 10.</span>
          </div>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="excerpt" className={label}>
            Excerpt
          </label>
          <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post.excerpt} required maxLength={300} className={input} />
          <span className={hint}>Used as the meta description. Keep it under 160 characters ({post.excerpt.length} now).</span>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="cover_image" className={label}>
            Cover image URL (optional, https)
          </label>
          <input id="cover_image" name="cover_image" type="url" defaultValue={post.cover_image ?? ""} className={input} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="content" className={label}>
            Content (markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={24}
            defaultValue={post.content}
            required
            className={`${input} resize-y font-mono text-sm leading-relaxed`}
          />
          <span className={hint}>
            {words} words · {readingMinutes(post.content)} min read (as last saved)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="submit" name="intent" value="save" className={btn}>
            Save
          </button>
          {live ? (
            <button type="submit" name="intent" value="unpublish" className={btn}>
              Save &amp; unpublish
            </button>
          ) : (
            <button type="submit" name="intent" value="publish" className={btnPrimary}>
              Save &amp; publish
            </button>
          )}
        </div>
      </form>

      <form action={deletePostAction} className="mt-3">
        <input type="hidden" name="id" value={post.id} />
        <ConfirmButton className={btnDanger} message={`Delete “${post.title}”? This can't be undone.`}>
          Delete post
        </ConfirmButton>
      </form>

      <section aria-labelledby="preview-heading" className="mt-12 border-t border-dashed border-[var(--border-hover)] pt-8">
        <p id="preview-heading" className="eyebrow">
          Preview (last saved version)
        </p>
        <div className="mx-auto mt-4 max-w-[712px]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">{post.title}</h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">{post.excerpt}</p>
          <div className="mt-8">
            <MarkdownContent source={post.content} />
          </div>
        </div>
      </section>
    </main>
  );
}
