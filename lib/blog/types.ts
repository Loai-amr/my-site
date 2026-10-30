export type PostStatus = "draft" | "published";
export const POST_STATUSES: PostStatus[] = ["draft", "published"];

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  tags: string[];
  cover_image: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** A post without its body, for lists, the sitemap and RSS. */
export type PostSummary = Pick<Post, "id" | "title" | "slug" | "excerpt" | "tags" | "cover_image" | "published_at" | "updated_at">;

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Blog dates, e.g. "Oct 30, 2026" (Cairo time, so a post published late at night shows the local day). */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { timeZone: "Africa/Cairo", dateStyle: "medium" });
}

/** The post's image: its own cover_image, else the generated cover (versioned by updated_at). */
export function postImage(post: Pick<Post, "slug" | "cover_image" | "updated_at">): string {
  return post.cover_image ?? `/blog/${post.slug}/cover.png?v=${Math.floor(Date.parse(post.updated_at) / 1000)}`;
}
