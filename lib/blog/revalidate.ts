import { revalidatePath, revalidateTag } from "next/cache";

/** Cache tag on every blog query (lib/blog/posts.ts). */
export const POSTS_TAG = "posts";

/**
 * Called after any write that could change what the public sees. `expire: 0` makes the next
 * request fetch fresh data instead of serving stale, so a just-published URL works right away.
 */
export function revalidateBlog(...slugs: (string | null | undefined)[]) {
  revalidateTag(POSTS_TAG, { expire: 0 });
  revalidatePath("/blog");
  for (const slug of new Set(slugs)) if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog/rss.xml");
  revalidatePath("/sitemap.xml");
}
