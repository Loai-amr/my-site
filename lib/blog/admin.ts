import { supabaseAdmin } from "@/lib/supabase";
import type { PostInput } from "@/lib/blog/schema";
import type { Post, PostStatus } from "@/lib/blog/types";

// Service-role writes. Server only: used by /api/blog/* (Bearer token) and /admin/blog (admin session).

const UNIQUE_VIOLATION = "23505";

/** `base`, or `base-2`, `base-3`, … whichever is free (ignoring the post being edited). */
export async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const { data, error } = await supabaseAdmin().from("posts").select("id, slug").like("slug", `${base}%`);
  if (error) throw error;
  const taken = new Set((data ?? []).filter((r) => r.id !== excludeId).map((r) => r.slug as string));
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) if (!taken.has(`${base}-${n}`)) return `${base}-${n}`;
}

/** Inserts with a free slug. Retries if another insert grabbed the same slug in between. */
export async function createPost(input: Omit<PostInput, "status">, slugBase: string, status: PostStatus): Promise<Post> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const slug = await uniqueSlug(slugBase);
    const { data, error } = await supabaseAdmin()
      .from("posts")
      .insert({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        tags: input.tags,
        cover_image: input.cover_image,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select("*")
      .single();
    if (!error) return data as Post;
    if (error.code !== UNIQUE_VIOLATION) throw error;
  }
  throw new Error(`Could not find a free slug for "${slugBase}"`);
}

export async function listPosts(status?: PostStatus): Promise<Post[]> {
  let query = supabaseAdmin().from("posts").select("*").order("created_at", { ascending: false }).limit(200);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin().from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Post | null;
}

/** Every post, drafts included, so the daily automation doesn't pick a topic that's already waiting for review. */
export async function listTitles() {
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .select("title, slug, status, tags, published_at, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return data ?? [];
}

/** Saves edits and optionally changes status. Keeps the first publish date when re-publishing. */
export async function updatePost(
  current: Post,
  input: Omit<PostInput, "status">,
  slug: string,
  status: PostStatus,
): Promise<Post> {
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .update({
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      tags: input.tags,
      cover_image: input.cover_image,
      status,
      published_at: status === "published" ? (current.published_at ?? new Date().toISOString()) : current.published_at,
    })
    .eq("id", current.id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin().from("posts").delete().eq("id", id).select("*").maybeSingle();
  if (error) throw error;
  return data as Post | null;
}
