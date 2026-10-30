import { getPublishedPost } from "@/lib/blog/posts";
import { SLUG_RE } from "@/lib/blog/schema";
import { renderCover } from "@/lib/blog/cover";

// The generated cover image for a published post (see lib/blog/cover.tsx). Links to it carry
// ?v=<updated_at>, so the CDN can keep each version for a long time and edits get a fresh URL.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = slug.length <= 120 && SLUG_RE.test(slug) ? await getPublishedPost(slug) : null;
  if (!post) return new Response("Not found", { status: 404 });
  return renderCover(post, { "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400" });
}
