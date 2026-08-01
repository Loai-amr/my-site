# Loai Amr — Portfolio

A single-page portfolio site, built as static HTML/CSS (no build step, no dependencies) so it deploys straight to GitHub Pages for free.

## What's in here

- `index.html` — the whole site
- `style.css` — all styling
- `profile.jpg` — your headshot, compressed for fast load (58KB, down from 1.7MB)
- `Loai_Amr_CV_Senior.pdf` — linked from the nav and contact section

## Deploy to GitHub Pages (free)

1. **Create a new repo on GitHub.**
   - Go to github.com/Loai-amr → New repository
   - Name it either:
     - `loai-amr.github.io` → this makes your site live at `https://loai-amr.github.io` (root domain, cleanest option)
     - or any other name like `portfolio` → site will live at `https://loai-amr.github.io/portfolio`
   - Public repo, no need to initialize with a README (you already have one)

2. **Push these files to the repo.** From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Loai-amr/loai-amr.github.io.git
   git push -u origin main
   ```
   (swap the URL for whatever repo name you chose)

3. **Turn on GitHub Pages.**
   - In the repo: Settings → Pages
   - Under "Build and deployment" → Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → Save

4. **Wait ~1-2 minutes.** GitHub will give you a live URL at the top of that same Pages settings screen once it's built.

That's it — no server, no cost, no build pipeline. Any time you want to update content, edit `index.html` directly and push again; the live site updates automatically within a minute or two.

## Making changes later

- All copy lives directly in `index.html` — project descriptions, the case study numbers, contact links.
- Colors and fonts are CSS variables at the top of `style.css` (`:root`) if you want to retheme later.
- To swap the headshot, replace `profile.jpg` (keep it compressed — under ~150KB ideally) and keep the filename, or update the `src` in `index.html`.
