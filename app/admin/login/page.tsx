import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { env } from "@/lib/env";
import { login } from "../actions";
import { btnPrimary, errorBox, input, label } from "../ui";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdmin()) redirect("/admin/blog");
  const { error } = await searchParams;
  return (
    <main lang="en" dir="ltr" className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight">Blog admin</h1>
      {!env.blogAdminPassword && (
        <p className={`${errorBox} mt-4`}>BLOG_ADMIN_PASSWORD isn&apos;t set (min. 12 characters), so nobody can sign in.</p>
      )}
      {error && (
        <p role="alert" className={`${errorBox} mt-4`}>
          Wrong password.
        </p>
      )}
      <form action={login} className="mt-6 grid gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
        </div>
        <button type="submit" className={`${btnPrimary} justify-center`}>
          Sign in
        </button>
      </form>
    </main>
  );
}
