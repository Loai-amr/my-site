# Loai Amr — Portfolio

A frontend-focused portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## What's in here

- `app/` — routes: `/` (frontend work — experience, stack, contact) and `/shopify-and-wordpress` (Shopify & WordPress work)
- `components/` — Nav, Hero, ExperienceSection, StackSection, ContactSection, ProjectCard, ServiceCard, CaseStudy, Footer
- `lib/content.ts` — all copy (experience, stack, projects, services) in one place — edit this file to update content
- `public/` — headshot, favicons, résumé PDFs

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
5. Once you know your real domain (e.g. `my-site.vercel.app` or a custom domain), set the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel project settings to `https://<your-domain>`. This is used for SEO metadata (canonical URLs, Open Graph image links) — until it's set, it falls back to a placeholder.

## Making changes later

- Copy (experience, skills, projects) lives in `lib/content.ts`.
- Colors and design tokens are CSS variables at the top of `app/globals.css` (`:root`).
- To swap the headshot, replace `public/profile.jpg` and keep the filename.
- To update the résumé, replace `public/Loai_Amr_Frontend_Developer.pdf` and keep the filename, or update `resumeHref` in `lib/content.ts`.
