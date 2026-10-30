// Absolute site URL. Resolves to the real deployment URL automatically (Vercel sets these env vars),
// so canonical, Open Graph, sitemap and RSS links never point at a guessed domain that 404s.
export const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/+$/, "");
