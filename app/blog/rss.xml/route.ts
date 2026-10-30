import { siteUrl } from "@/lib/site";
import { listRecentPublished } from "@/lib/blog/posts";
import type { PostSummary } from "@/lib/blog/types";

// ISR: regenerated on demand by revalidateBlog(), hourly at most otherwise.
export const revalidate = 3600;

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const site = siteUrl;
  let posts: PostSummary[] = [];
  try {
    posts = await listRecentPublished(30);
  } catch (err) {
    console.error("rss: could not load posts", err); // e.g. no Supabase env at build time
  }

  const items = posts
    .map((p) => {
      const link = `${site}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(p.excerpt)}</description>
      ${p.published_at ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>` : ""}
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Loai Amr · Blog</title>
    <link>${site}/blog</link>
    <description>Practical notes on React, Next.js, WordPress, CSS, performance and AI-assisted dev tools.</description>
    <language>en</language>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml" />
${posts[0]?.published_at ? `    <lastBuildDate>${new Date(posts[0].published_at).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
