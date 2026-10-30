import type { MetadataRoute } from "next";
import { listRecentPublished } from "@/lib/blog/posts";
import type { PostSummary } from "@/lib/blog/types";
import { siteUrl } from "@/lib/site";

// ISR: regenerated on demand by revalidateBlog() when a post is published, hourly at most otherwise.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: PostSummary[] = [];
  try {
    posts = await listRecentPublished(1000);
  } catch (err) {
    console.error("sitemap: could not load posts", err); // e.g. no Supabase env at build time
  }

  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/shopify-and-wordpress`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/free-apps`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8, lastModified: posts[0]?.published_at ?? undefined },
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
