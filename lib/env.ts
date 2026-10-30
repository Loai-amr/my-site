// Server-side env access for the blog. Throws a clear error when a required variable is missing.

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  get supabaseUrl() {
    return required("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseAnonKey() {
    return required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  /** SERVER ONLY. Bypasses RLS; used for blog writes and for listing drafts. */
  get supabaseServiceRoleKey() {
    return required("SUPABASE_SERVICE_ROLE_KEY");
  },
  /** Bearer token for /api/blog/publish and /api/blog/titles. Shorter than 32 chars counts as unset (fail closed). */
  get blogPublishSecret() {
    const v = process.env.BLOG_PUBLISH_SECRET ?? "";
    return v.length >= 32 ? v : "";
  },
  /** When false (the default), posts from the publish API always arrive as drafts for review in /admin/blog. */
  get blogAutoPublish() {
    return process.env.BLOG_AUTO_PUBLISH === "true";
  },
  /** Password for /admin/blog. Shorter than 12 chars counts as unset, and nobody can sign in. */
  get blogAdminPassword() {
    const v = process.env.BLOG_ADMIN_PASSWORD ?? "";
    return v.length >= 12 ? v : "";
  },
};
