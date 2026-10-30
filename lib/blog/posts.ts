import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase";
import { POSTS_TAG } from "@/lib/blog/revalidate";
import type { Post, PostSummary } from "@/lib/blog/types";

// Public reads. Every query is cached in the Next.js Data Cache under POSTS_TAG and refreshed on
// demand by revalidateBlog() when a post is published, edited or deleted (hourly as a fallback).
// The anon client plus RLS means only published posts are ever visible here.

export const PAGE_SIZE = 9;
const SUMMARY = "id, title, slug, excerpt, tags, cover_image, published_at, updated_at";
const CACHE = { tags: [POSTS_TAG], revalidate: 3600 };

export const listPublishedPosts = unstable_cache(
  async (page: number, tag: string | null): Promise<{ posts: PostSummary[]; total: number }> => {
    const from = (page - 1) * PAGE_SIZE;
    let query = supabasePublic()
      .from("posts")
      .select(SUMMARY, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);
    if (tag) query = query.contains("tags", [tag]);
    const { data, count, error } = await query;
    if (error?.code === "PGRST103") return { posts: [], total: count ?? 0 }; // page past the end
    if (error) throw error;
    return { posts: (data ?? []) as PostSummary[], total: count ?? 0 };
  },
  ["blog-list"],
  CACHE,
);

export const getPublishedPost = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const { data, error } = await supabasePublic()
      .from("posts")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data as Post | null;
  },
  ["blog-post"],
  CACHE,
);

/** Up to `limit` posts sharing a tag with this one (newest first), topped up with the latest posts. */
export const getRelatedPosts = unstable_cache(
  async (slug: string, tags: string[], limit = 3): Promise<PostSummary[]> => {
    const base = () =>
      supabasePublic()
        .from("posts")
        .select(SUMMARY)
        .eq("status", "published")
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(limit);

    const related: PostSummary[] = [];
    if (tags.length) {
      const { data, error } = await base().overlaps("tags", tags);
      if (error) throw error;
      related.push(...((data ?? []) as PostSummary[]));
    }
    if (related.length < limit) {
      const { data, error } = await base();
      if (error) throw error;
      for (const p of (data ?? []) as PostSummary[]) {
        if (related.length >= limit) break;
        if (!related.some((r) => r.slug === p.slug)) related.push(p);
      }
    }
    return related;
  },
  ["blog-related"],
  CACHE,
);

/** Every tag on a published post, most used first. */
export const listTags = unstable_cache(
  async (): Promise<{ tag: string; count: number }[]> => {
    const { data, error } = await supabasePublic().from("posts").select("tags").eq("status", "published").limit(1000);
    if (error) throw error;
    const counts = new Map<string, number>();
    for (const row of data ?? []) for (const t of row.tags as string[]) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  },
  ["blog-tags"],
  CACHE,
);

/** Newest published posts without bodies, for the sitemap and RSS. */
export const listRecentPublished = unstable_cache(
  async (limit: number): Promise<PostSummary[]> => {
    const { data, error } = await supabasePublic()
      .from("posts")
      .select(SUMMARY)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []) as PostSummary[];
  },
  ["blog-recent"],
  CACHE,
);

/** ~230 words per minute; code blocks count like prose, which is close enough for skimming readers. */
export function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
