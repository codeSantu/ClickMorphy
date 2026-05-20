# ClickMorphy

Modern, neon-orange brand website for **Clickmorphy** — a 360° brand-building agency.

**Live site:** [https://codesantu.github.io/ClickMorphy/](https://codesantu.github.io/ClickMorphy/)

## Features

- Dark neon theme matching brand logo colors
- Hero section with layered gradient + SVG background
- Glassmorphism service cards (9 services)
- Golden-ratio spacing and responsive layout
- Contact form with **pre-filled email template** to `clickmorphy@gmail.com`
- Smooth scroll, reveal animations, mobile navigation
- Deploy-ready for **Vercel**, **Netlify**, or any static host

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

Output is in the `dist/` folder.

## Deploy

### GitHub Pages (recommended)

Workflow: `.github/workflows/deploy.yml` — builds the site and pushes to the `gh-pages` branch.

**One-time setup (fixes the deploy-pages 404 error):**

1. Open [github.com/codeSantu/ClickMorphy/settings/pages](https://github.com/codeSantu/ClickMorphy/settings/pages)
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · **Save**
4. Push to `main` or re-run the workflow from the **Actions** tab

Live URL: [https://codesantu.github.io/ClickMorphy/](https://codesantu.github.io/ClickMorphy/)

Local production build matching GitHub Pages paths (PowerShell):

```powershell
$env:GITHUB_PAGES='true'; npm run build
```

### Vercel

1. Push this repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Framework preset: **Vite** (auto-detected via `vercel.json`)

### Netlify

1. Connect repo at [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Config is in `netlify.toml`

### Manual / any host

Upload the contents of `dist/` after running `npm run build`.

## Contact Form

Submitting the form opens the user's default email client with:

- **To:** clickmorphy@gmail.com
- **Subject:** `[Clickmorphy Website] New inquiry from {name}`
- **Body:** Structured template with name, email, phone, and message
- **CC:** Visitor's email (so you can reply directly)

### Optional: Server-side form (no mailto)

For forms that submit without opening an email app, use [Formspree](https://formspree.io):

1. Create a form at Formspree pointing to `clickmorphy@gmail.com`
2. Add your form ID to `.env`:

```
VITE_FORMSPREE_ID=your_form_id
```

3. Extend `src/main.js` to POST to `https://formspree.io/f/${id}` when the env var is set.

## Customize

| Item | Location |
|------|----------|
| Phone number | `index.html` → contact section |
| Social links | `index.html` → header & footer |
| Colors | `src/style.css` → `:root` variables |
| Services | `index.html` → services grid |

## Assets

- `public/assets/logo-full.png` — wordmark logo
- `public/assets/logo-icon.png` — icon mark
- `public/assets/hero-bg.svg` — hero background layer

## License

© Clickmorphy. All rights reserved.
