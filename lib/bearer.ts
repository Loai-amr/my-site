import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Constant-time check of `Authorization: Bearer <secret>`. Both sides are hashed first, so the
 * comparison doesn't leak the secret's length either. Fails closed when the secret is unset.
 */
export function hasBearer(request: Request, secret: string): boolean {
  if (!secret) return false;
  const digest = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(digest(request.headers.get("authorization") ?? ""), digest(`Bearer ${secret}`));
}
