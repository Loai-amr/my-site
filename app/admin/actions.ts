"use server";

import { redirect } from "next/navigation";
import { requireAdmin, signIn, signOut } from "@/lib/adminAuth";
import { deletePost, getPost, uniqueSlug, updatePost } from "@/lib/blog/admin";
import { revalidateBlog } from "@/lib/blog/revalidate";
import { baseSlug, issuesToMessages, postInputSchema } from "@/lib/blog/schema";
import { UUID_RE, type PostStatus } from "@/lib/blog/types";

// Every action re-checks the admin session; server actions are public endpoints.

const str = (form: FormData, key: string) => {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
};

function postId(formData: FormData): string {
  const id = str(formData, "id");
  if (!UUID_RE.test(id)) throw new Error("Invalid post id");
  return id;
}

export async function login(formData: FormData) {
  const ok = await signIn(String(formData.get("password") ?? ""));
  redirect(ok ? "/admin/blog" : "/admin/login?error=1");
}

export async function logout() {
  await signOut();
  redirect("/admin/login");
}

/** Save the editor form. `intent` = save (keep status) | publish | unpublish. */
export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = postId(formData);
  const current = await getPost(id);
  if (!current) redirect("/admin/blog?flash=missing");

  const parsed = postInputSchema.safeParse({
    title: str(formData, "title"),
    slug: str(formData, "slug"),
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    tags: str(formData, "tags").split(",").map((t) => t.trim()).filter(Boolean),
    cover_image: str(formData, "cover_image") || null,
  });
  if (!parsed.success) {
    const qs = new URLSearchParams({ error: issuesToMessages(parsed.error).join(" · ").slice(0, 500) });
    redirect(`/admin/blog/${id}?${qs}`);
  }

  const intent = str(formData, "intent");
  const status: PostStatus = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : current.status;
  const wanted = baseSlug(parsed.data);
  const slug = await uniqueSlug(wanted, id);
  const saved = await updatePost(current, parsed.data, slug, status);

  // Refresh the public pages if the post is (or was) visible; also covers a slug rename.
  if (current.status === "published" || saved.status === "published") revalidateBlog(current.slug, saved.slug);

  const flash = intent === "publish" ? "published" : intent === "unpublish" ? "unpublished" : slug !== wanted ? "saved-slug" : "saved";
  redirect(`/admin/blog/${id}?flash=${flash}`);
}

/** Publish a draft as-is from the list page. */
export async function publishPost(formData: FormData) {
  await requireAdmin();
  const current = await getPost(postId(formData));
  if (!current) redirect("/admin/blog?flash=missing");
  if (current.status !== "published") {
    const saved = await updatePost(current, current, current.slug, "published");
    revalidateBlog(saved.slug);
  }
  redirect("/admin/blog?flash=published");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const deleted = await deletePost(postId(formData));
  if (deleted?.status === "published") revalidateBlog(deleted.slug);
  redirect(`/admin/blog?flash=${deleted ? "deleted" : "missing"}`);
}
