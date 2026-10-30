# Loai Amr — Portfolio

A frontend-focused portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## What's in here

- `app/` — routes: `/` (frontend work — experience, stack, contact), `/shopify-and-wordpress` (Shopify & WordPress work) and `/free-apps` (free apps showcase; add apps to `freeApps` in `lib/content.ts`, screenshots in `public/apps/<slug>/`)
- `components/` — Nav, Hero, ExperienceSection, StackSection, ContactSection, ProjectCard, ServiceCard, CaseStudy, Footer
- `lib/content.ts` — all content (experience, stack, projects, services) in English and Arabic — edit this file to update content
- `lib/i18n.ts` — UI strings in English and Arabic; the language toggle stores the choice in a `lang` cookie (English by default, Arabic renders right-to-left)
- `lib/projects.ts` — projects on the home page (ToolSwift case study, ONE MORE + Witan, client sites, WordPress sites) in English and Arabic; screenshots in `public/projects/<slug>-desktop.webp` / `-mobile.webp`, heights in `lib/shots.json`
- `lib/theme.ts` + `components/ThemeToggle.tsx` — light/dark toggle; follows the system setting until the visitor picks one (saved in localStorage)
- `public/` — headshot, favicons, résumé PDFs
- `app/blog/`, `app/admin/`, `app/api/blog/`, `lib/blog/` — the blog (see below)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub (already done: `github.com/Loai-amr/my-site`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as Next.js — no config needed. Deploy.
4. Every push to `main` redeploys automatically; PRs get preview URLs.
5. SEO metadata (canonical URLs, Open Graph image links) resolves automatically to whatever domain Vercel deploys to — no setup needed. If you attach a custom domain later, set the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel project settings to `https://<your-domain>` so metadata points at that instead.

## Making changes later

- Copy (experience, skills, projects) lives in `lib/content.ts` (`en` and `ar` objects); UI labels live in `lib/i18n.ts`.
- Colors and design tokens are CSS variables at the top of `app/globals.css` (`:root` for light, `[data-theme="dark"]` for dark).
- To swap the headshot, replace `public/profile.jpg` and keep the filename.
- To update the résumé, replace `public/Loai_Amr_Frontend_Developer.pdf` and keep the filename, or update `resumeHref` in `lib/content.ts`.

## Blog

`/blog` (paginated, tag filter), `/blog/[slug]` (markdown with highlighted code, reading time, related posts, Open Graph tags, `BlogPosting` JSON-LD), `/blog/rss.xml` and `/sitemap.xml`. Posts live in a `posts` table in the **same Supabase project as shop.loaiamr.com**. Queries are cached in the Next.js Data Cache under the `posts` tag and refreshed on demand whenever a post is published, edited or deleted, so new posts go live without a redeploy. (Blog pages render per request because the layout reads the language cookie, but they read from that cache. RSS and the sitemap are ISR.) Posts are written in English, so post content stays left-to-right in the Arabic layout.

### Cover images

Every post gets an image without storing anything. If `cover_image` is empty, `/blog/[slug]/cover.png` draws a 1200×630 cover on request (`lib/blog/cover.tsx`, cached by the CDN). It shows the title, tags and a syntax-highlighted "screenshot" of the post's first code block. Posts tagged `about`, or with no code, show the author photo (`public/blog/avatar.jpg`) instead. The cover is used on the blog cards, at the top of the post, and as the Open Graph / Twitter image. Set `cover_image` to an https URL to use your own image instead. Markdown images (`![alt](https://...)`) also work inside posts.

### Set in Vercel

Add these to the project (Production, plus Preview if you want it there), then redeploy. `.env.example` has the details.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | the shop's Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the shop's anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | the shop's service_role / secret key (server only) |
| `BLOG_PUBLISH_SECRET` | `openssl rand -hex 32` (min. 32 chars). The same value goes into the daily automation's environment. |
| `BLOG_AUTO_PUBLISH` | `false` to review drafts first, `true` to publish straight away |
| `BLOG_ADMIN_PASSWORD` | a long password for `/admin/blog` (min. 12 chars) |
| `SITE_URL` | optional, e.g. `https://www.loaiamr.com` |

### Run the migration (once)

Supabase → SQL Editor → paste [`supabase/migrations/0001_blog_posts.sql`](supabase/migrations/0001_blog_posts.sql) → Run. It creates `posts` with RLS: `anon`/`authenticated` can only `select` rows where `status = 'published'`, and every write goes through the service role on the server. It doesn't touch the shop's tables.

### Review drafts

Go to `/admin/blog` and sign in with `BLOG_ADMIN_PASSWORD`. You can edit, preview, publish, unpublish or delete posts.

### Test the API

```bash
export SITE=https://www.loaiamr.com BLOG_PUBLISH_SECRET=...   # same value as in Vercel

curl -s "$SITE/api/blog/titles" -H "Authorization: Bearer $BLOG_PUBLISH_SECRET"

curl -s -X POST "$SITE/api/blog/publish" \
  -H "Authorization: Bearer $BLOG_PUBLISH_SECRET" -H "Content-Type: application/json" \
  -d '{"title":"Hello blog","slug":"hello-blog","excerpt":"A first test post.","content":"## Hi\n\n```ts\nconsole.log(1)\n```","tags":["test"],"status":"published"}'
```

Use `https://www.loaiamr.com`, not the bare domain: `loaiamr.com` redirects to `www`, and curl drops the `Authorization` header on a cross-host redirect.

`POST /api/blog/publish` takes `title`, `excerpt` (≤ 300, aim for < 160), `content` (markdown), and optionally `slug`, `tags` (≤ 10, normalized to lowercase-kebab), `cover_image` (https URL) and `status`. A taken slug gets `-2`, `-3`, …. It returns `201` with `slug`, `status`, `url` and `review_url`, `400` with `errors` for invalid input, and `401` for a wrong token. With `BLOG_AUTO_PUBLISH=false` the post is always saved as a draft, whatever `status` says.

### Daily posts

A Claude Code scheduled task runs every morning (Cairo time). It checks `/api/blog/titles`, researches a current topic, and posts to `/api/blog/publish`. Its cloud environment needs `BLOG_PUBLISH_SECRET` as an environment variable and network access to `www.loaiamr.com`.
