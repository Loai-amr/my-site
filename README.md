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
