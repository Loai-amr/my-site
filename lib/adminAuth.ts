import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

// Simple password auth for /admin/blog: one password (BLOG_ADMIN_PASSWORD), and a session cookie
// holding "<expiry>.<HMAC of the expiry, keyed by the password>". Changing the password signs
// everyone out.

const COOKIE = "blog_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const digest = (s: string) => createHash("sha256").update(s).digest();
const same = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));
const sign = (exp: number, password: string) => createHmac("sha256", password).update(`blog-admin:${exp}`).digest("base64url");

export async function isAdmin(): Promise<boolean> {
  const password = env.blogAdminPassword;
  if (!password) return false; // fail closed
  const [expRaw, sig] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  const exp = Number(expRaw);
  if (!sig || !Number.isInteger(exp) || exp < Date.now() / 1000) return false;
  return same(sig, sign(exp, password));
}

/** For admin pages and server actions: redirects to the login page unless signed in. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

/** Checks the password and starts a session. Wrong passwords are slowed down. */
export async function signIn(input: string): Promise<boolean> {
  const password = env.blogAdminPassword;
  if (!password || !same(input, password)) {
    await new Promise((r) => setTimeout(r, 1000));
    return false;
  }
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  (await cookies()).set(COOKIE, `${exp}.${sign(exp, password)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function signOut() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
