import Link from "next/link";
import { formatPostDate, type PostSummary } from "@/lib/blog/types";

// Posts are written in English, so cards stay LTR inside the Arabic layout too.
export default function PostCard({ post, headingLevel = "h2" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article lang="en" dir="ltr" className="card relative flex h-full flex-col overflow-hidden">
      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element -- cover images can come from any host
        <img
          src={post.cover_image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[1200/630] w-full border-b border-[var(--border)] bg-[var(--bg-raised)] object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        {post.published_at && (
          <time dateTime={post.published_at} className="font-mono text-[13px] text-[var(--text-dim)]">
            {formatPostDate(post.published_at)}
          </time>
        )}
        <Heading className="text-lg font-semibold leading-snug tracking-tight">
          {/* The ::after overlay makes the whole card clickable. */}
          <Link href={`/blog/${post.slug}`} className="text-[var(--text)] after:absolute after:inset-0 hover:text-[var(--accent-blue)]">
            {post.title}
          </Link>
        </Heading>
        <p className="flex-1 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="kw-pill px-2.5 py-0.5 text-[12px]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
