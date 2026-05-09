# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint (0 errors = clean)
```

**Image conversion (Sharp already installed):**
```bash
node -e "require('sharp')('src.png').webp({quality:82,effort:6}).toFile('out.webp').then(console.log)"
```

**Video compression (ffmpeg-static in node_modules):**
```bash
./node_modules/ffmpeg-static/ffmpeg.exe -i input.mp4 -c:v libx264 -crf 26 -preset slow -profile:v main -an -movflags +faststart output.mp4
```

## Tech Stack

- **React 19** + **Vite 8** + **Tailwind CSS 4** (via `@tailwindcss/vite` — no `tailwind.config.js`)
- **GSAP 3** with ScrollTrigger for animations
- **Lenis** smooth scroll (desktop/non-touch only, dynamic import delayed 300ms off critical path)
- **React Router DOM 7** for client-side routing
- **react-helmet-async** (`<SeoHead />`) for per-page meta + schema

## Architecture

### App shell (`src/App.jsx`)
- Registers GSAP plugins once (`ScrollTrigger`)
- Initialises Lenis as a module-level singleton (`lenisInstance`) synced to GSAP ticker
- `useScrollTriggerCleanup` kills all ScrollTrigger instances with `kill(true)` **before** React unmounts DOM (prevents `removeChild` errors from pin spacers)
- All pages lazy-loaded except `HomePage` (above-the-fold critical path)
- `prefers-reduced-motion`: GSAP defaults set to `duration: 0, delay: 0` globally

### Routing
All routes defined in `src/App.jsx`. Pattern: `/servicios` (index) + `/servicios/:slug` (detail), `/zonas` + `/zonas/:slug`.

### Data layer (`src/data/`)
- **`services.js`** — array of 7 services with `slug`, `title`, `subtitle`, `shortDesc`, `heroDesc`, `image`, `icon` (string), `bullets[]`, `faq[]`. ServicePage and ServiciosPage consume this.
- **`zones.js`** — zone data consumed by ZonePage and ZonasPage.
- **`business.js`** — single source of truth for phone, email, hours, rating, founder. Exports `BUSINESS`, `TEL_HREF`, `whatsappUrl(text)`.

### SEO pattern (`src/components/SeoHead.jsx`)
```jsx
<SeoHead
  title="Page title"
  description="Meta description"
  canonical="/path"
  ogImage="/og/page-name.png"   // relative → prepended with BASE_URL automatically
  schema={schemaObject}          // or array of schemas
  noindex                        // for 404 etc
/>
```
- Absolute Schema (LocalBusiness/Electrician) lives in `index.html` (pre-hydration). Only FAQPage schema goes in React.
- Per-page og:images are in `public/og/*.png` (1200×630, generated with Sharp).

### GSAP pattern
Components use `useLayoutEffect` + `gsap.context()` for scoped cleanup:
```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, ref);
  return () => ctx.revert();
}, []);
```
Never call `ScrollTrigger.refresh()` synchronously on mount — use `setTimeout(..., 150)`.

### Assets
- All images: **WebP** in `public/images/`. Team photos in `public/images/team/EQUIPO PARA PAGINA/`.
- Videos: `public/videos/HERO PARA PC.mp4` (desktop) + `HERO MOVIL.mp4` (mobile), both ~3MB CRF 26.
- Urgencias video: `public/video  seccion de urgencias/Avería Urgente1.mp4`.
- `og-image.png` kept as PNG (OG doesn't support WebP). All other images WebP.
- `_archived/` folder is gitignored (originals before WebP conversion).

### Premium UX components
- `<CustomCursor />` — global cursor with spring physics. Toggle pointer style via `data-cursor="pointer"`.
- `<MagneticElement />` — GSAP magnet wrapper for CTAs.
- `<PageTransition />` — full-screen sweep overlay on route change (mounted in App.jsx).
- `<PageSkeleton />` — Suspense fallback for all lazy pages.
- `<StickyMobileCTA />` — floating mobile CTA (inside HomePage Suspense).

### Navbar
Dropdown items in `src/components/Navbar.jsx` `navLinks` array. Servicios dropdown has "Ver todos los servicios" → `/servicios` at top. Zonas dropdown has "Ver todas las zonas" → `/zonas` at top.

### WhatsApp integration
Use `whatsappUrl(text)` from `src/data/business.js`. **Critical Safari/iOS bug**: `window.open()` must be called synchronously in the click handler — never inside `setTimeout`.

## Deployment

Vercel reads from `main` branch. Push to `main` triggers deploy. SPA routing handled by Vercel default rewrites.

## Reference

`directivas/` — design directives for GSAP/Lenis integration, cursor system, page transitions. Consult before changing animation infrastructure.
