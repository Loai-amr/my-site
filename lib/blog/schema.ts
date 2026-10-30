import { z } from "zod";

export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const TAG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "Next.js 16: What's New?" → "nextjs-16-whats-new". Empty for titles with no Latin letters or digits. */
export function slugify(input: string, max = 100): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, max)
    .replace(/^-+|-+$/g, "");
}

const tag = z
  .string()
  .transform((t) => slugify(t, 32))
  .pipe(z.string().regex(TAG_RE, "Tags need at least one letter or digit"));

/** Shared by the publish API and the /admin/blog editor. */
export const postInputSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().max(120).optional(),
  excerpt: z.string().trim().min(1).max(300),
  content: z.string().trim().min(1).max(100_000),
  tags: z
    .array(tag)
    .max(10)
    .default([])
    .transform((tags) => [...new Set(tags)]),
  cover_image: z
    .url({ protocol: /^https$/ })
    .max(2048)
    .nullish()
    .transform((v) => v ?? null),
  status: z.enum(["draft", "published"]).optional(),
});

export type PostInput = z.infer<typeof postInputSchema>;

/** The slug to start from: the given one (normalized), else one made from the title. */
export function baseSlug(input: Pick<PostInput, "slug" | "title">): string {
  return slugify(input.slug ?? "") || slugify(input.title) || `post-${Date.now().toString(36)}`;
}

export function issuesToMessages(error: z.ZodError): string[] {
  return error.issues.map((i) => `${i.path.join(".") || "body"}: ${i.message}`);
}
