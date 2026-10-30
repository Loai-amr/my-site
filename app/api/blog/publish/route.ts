import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import { siteUrl } from "@/lib/site";
import { hasBearer } from "@/lib/bearer";
import { baseSlug, issuesToMessages, postInputSchema } from "@/lib/blog/schema";
import { createPost } from "@/lib/blog/admin";
import { revalidateBlog } from "@/lib/blog/revalidate";

export const dynamic = "force-dynamic";

// Called by the daily blog automation with `Authorization: Bearer <BLOG_PUBLISH_SECRET>`.
// Unless BLOG_AUTO_PUBLISH=true, every post lands as a draft (whatever `status` says) and waits
// for review in /admin/blog.
export async function POST(request: NextRequest) {
  if (!hasBearer(request, env.blogPublishSecret)) return NextResponse.json({ ok: false }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["body: invalid JSON"] }, { status: 400 });
  }

  const parsed = postInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: issuesToMessages(parsed.error) }, { status: 400 });
  }

  const { status: requested, ...input } = parsed.data;
  const status = env.blogAutoPublish ? (requested ?? "published") : "draft";

  try {
    const post = await createPost(input, baseSlug(parsed.data), status);
    if (post.status === "published") revalidateBlog(post.slug);
    return NextResponse.json(
      {
        ok: true,
        id: post.id,
        slug: post.slug,
        status: post.status,
        url: `${siteUrl}/blog/${post.slug}`,
        review_url: `${siteUrl}/admin/blog/${post.id}`,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("blog publish failed", err);
    return NextResponse.json({ ok: false, errors: ["server: could not save the post"] }, { status: 500 });
  }
}
