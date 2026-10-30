import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import { hasBearer } from "@/lib/bearer";
import { listTitles } from "@/lib/blog/admin";

export const dynamic = "force-dynamic";

// Lets the daily blog automation see every existing post (drafts included) before picking a topic.
export async function GET(request: NextRequest) {
  if (!hasBearer(request, env.blogPublishSecret)) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const posts = await listTitles();
    return NextResponse.json({ ok: true, count: posts.length, posts });
  } catch (err) {
    console.error("blog titles failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
