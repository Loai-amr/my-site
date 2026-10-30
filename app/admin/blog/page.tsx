import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { listPosts } from "@/lib/blog/admin";
import { POST_STATUSES, type PostStatus } from "@/lib/blog/types";
import { deletePostAction, logout, publishPost } from "../actions";
import ConfirmButton from "../ConfirmButton";
import { badge, btn, btnDanger, btnPrimary, flashBox, fmt } from "../ui";

export const metadata: Metadata = { title: "Blog admin", robots: { index: false } };

const FLASH: Record<string, string> = {
  published: "Published. The post is live and the blog, sitemap and RSS are refreshed.",
  deleted: "Post deleted.",
  missing: "That post doesn't exist anymore.",
};

export default async function BlogAdmin({ searchParams }: { searchParams: Promise<{ status?: string; flash?: string }> }) {
  await requireAdmin();
  const { status: rawStatus, flash } = await searchParams;
  const status = POST_STATUSES.includes(rawStatus as PostStatus) ? (rawStatus as PostStatus) : undefined;
  const posts = await listPosts(status);
  const filter = (active: boolean) =>
    `kw-pill ${active ? "!border-[var(--text)] !bg-[var(--text)] !text-[var(--bg)]" : "hover:border-[var(--border-hover)]"}`;

  return (
    <main lang="en" dir="ltr" className="mx-auto max-w-[1080px] px-6 pb-20 pt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Blog posts</h1>
        <form action={logout}>
          <button type="submit" className={btn}>
            Sign out
          </button>
        </form>
      </div>

      {flash && FLASH[flash] && (
        <p role="status" className={`${flashBox} mt-4`}>
          {FLASH[flash]}
        </p>
      )}

      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
        <Link href="/admin/blog" className={filter(!status)}>
          all
        </Link>
        {POST_STATUSES.map((s) => (
          <Link key={s} href={`/admin/blog?status=${s}`} className={filter(status === s)}>
            {s}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-8 text-[var(--text-muted)]">No posts{status ? ` with status “${status}”` : ""}.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {posts.map((p) => (
            <li key={p.id} className="card p-5 hover:shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/blog/${p.id}`} className="font-semibold">
                  {p.title}
                </Link>
                <span className={badge(p.status)}>{p.status}</span>
                <span className="ms-auto text-sm text-[var(--text-dim)]">{fmt(p.created_at)}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{p.excerpt}</p>
              <p className="mt-1.5 break-words font-mono text-[13px] text-[var(--text-dim)]">
                /blog/{p.slug}
                {p.tags.length > 0 && ` · ${p.tags.join(", ")}`}
                {p.published_at && ` · published ${fmt(p.published_at)}`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/admin/blog/${p.id}`} className={btn}>
                  Review &amp; edit
                </Link>
                {p.status === "draft" ? (
                  <form action={publishPost}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className={btnPrimary}>
                      Publish
                    </button>
                  </form>
                ) : (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className={btn}>
                    View live
                  </a>
                )}
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton className={btnDanger} message={`Delete “${p.title}”? This can't be undone.`}>
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm text-[var(--text-dim)]">Showing the latest {posts.length} posts. Times are Cairo time.</p>
    </main>
  );
}
