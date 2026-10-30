import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

// Server-only Supabase clients. Neither keeps a session.
const options = { auth: { persistSession: false, autoRefreshToken: false } };
let publicClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

/** Anon key: RLS only lets it read published posts, so a query bug can never leak a draft. */
export function supabasePublic(): SupabaseClient {
  publicClient ??= createClient(env.supabaseUrl, env.supabaseAnonKey, options);
  return publicClient;
}

/** Service role: bypasses RLS. Never import this from a client component. */
export function supabaseAdmin(): SupabaseClient {
  adminClient ??= createClient(env.supabaseUrl, env.supabaseServiceRoleKey, options);
  return adminClient;
}
