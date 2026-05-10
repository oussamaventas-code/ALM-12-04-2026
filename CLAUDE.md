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
- **`business.js`** — phone, email, hours, rating (5.0 · 25), founder. Exports `BUSINESS`, `TEL_HREF`, `whatsappUrl(text)`.
- **`services.js`** — 7 services with slug, title, shortDesc, heroDesc, image, icon, bullets[], faq[].
- **`team.js`** — single source of truth: 6 team members with name, role, badge, desc, quote, img. Consumed by JorgeSection (home) + TeamPage (/equipo).
- **`portfolio.js`** — 92 projects with slug, title, desc, category. Exports `FEATURED_PROJECTS` + `ALL_PROJECTS` (with auto-category via modulo + `CATEGORY_OVERRIDES` map for manual overrides).
- **`zones.js`** — zone data (ZonePage, ZonasPage).

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

### GSAP patterns

**Standard scroll reveal** (`useLayoutEffect` + `gsap.context()`):
```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, ref);
  return () => ctx.revert();
}, []);
```
Never call `ScrollTrigger.refresh()` synchronously — use `setTimeout(..., 150)`.

**Horizontal pin scroll** (Portfolio, JorgeSection, TeamPage desktop):
- Pattern: `pin: true`, `scrub: 0.5`, `anticipatePin: 1`, `invalidateOnRefresh: true`
- Card reveals use `containerAnimation: pinAnimation` to sync with horizontal scroll
- `getScrollAmount()` calculates scroll distance dynamically
- Mobile alternative: vertical stack (no pin, natural scroll flow)
- Example in `JorgeSection.jsx` lines 26–77 (desktop) + `TeamMobile()` (mobile)

**Facade pattern** (heavy media):
- Videos in `Hero`, `VideoShowcase`, `UrgenciasSection` use placeholder image/button until user click
- `mapLoaded` state toggles between static facade + live iframe
- Prevents viewport clogging on load, improves LCP

### Key components

**JorgeSection** — team carousel on home
- Desktop: GSAP horizontal pin scroll (pin entire section, slides move left)
- Mobile: vertical stacked cards with stagger reveal
- Data source: `src/data/team.js`

**TeamPage** (`/equipo`)
- Hero: mosaic grid 3×2 of 6 team member photos (real faces, not AI)
- Desktop: horizontal pin scroll gallery (left text, right photo)
- Mobile: vertical card stack with gradient overlay + info at bottom
- GSAP animations gate with `matchMedia` — only desktop runs pin

**ProyectosPage** (`/proyectos`)
- Hero with live project count
- Sticky filter bar per category with counts
- 4-column grid (responsive, aspect-ratio 4/5)
- Lightbox with keyboard nav (arrow keys, ESC)
- Data: auto-categorized via modulo, override with `CATEGORY_OVERRIDES` map

**VideoShowcase** (home section)
- 3 video cards with facade pattern (poster image → click → autoPlay video)
- `onError` fallback to styled placeholder if poster fails
- GSAP reveal on scroll

**UrgenciasSection** (home + dedicated area)
- Hero video: `32vh` mobile, `h-screen` desktop
- Desktop: GSAP horizontal pin scroll (5 timeline steps + CTA slide)
- Mobile: vertical card stack (image + step number + title)
- GSAP gate: `matchMedia('(min-width: 768px)')` prevents pin on mobile

**Hero**
- Form: 2 fields (nombre + telefono) — built to WhatsApp
- Trust strip: Google rating (★5,0 · 25) + badges (Autorizado REBT, Urgencias 24h)
- WhatsApp link uses `BUSINESS.whatsapp` from data

### Assets
- All images: **WebP** in `public/images/`. Team photos: `public/images/team/EQUIPO PARA PAGINA/`
- Portfolio: 92 images (`proyecto-01.webp` through `proyecto-99.webp`)
- Videos: `public/videos/HERO PARA PC/MOVIL.mp4` (~1.9MB each, CRF 26), `Avería Urgente1.mp4` (~1.5MB)
- Video posters: auto-generated first frame (`.webp`)
- `og-image.png` is PNG (legacy, OG doesn't support WebP). All else WebP.
- Service images: optimized (recarga 2.03MB→93KB, telecomunicaciones 2.89MB→356KB via Sharp)

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

### Mobile-first component patterns

Many components have **dual JSX** for mobile vs desktop (not just CSS `hidden`):
- `JorgeSection`: `TeamDesktop()` (pin scroll) + `TeamMobile()` (vertical stack)
- `TeamPage`: mobile uses `md:hidden` with vertical cards; desktop uses `hidden md:flex` with pin scroll
- `UrgenciasSection`: mobile timeline is vertical (`md:hidden`); desktop is pinned horizontal (`hidden md:flex`)

This prevents GSAP from pinning hidden sections on mobile, which breaks scroll coherence.

## Scripts

**`scripts/` folder** — utility scripts (not in build, run manually):
- `compress-videos.cjs` — compress 3 proyecto videos (CRF 28, H.264, faststart)
- `dedupe-portfolio-v2.cjs` — find duplicate images via dHash (Hamming distance), delete, rename remainder
- `rename-videos.cjs` — rename video files to sequential
- Run: `node scripts/compress-videos.cjs` (requires ffmpeg-static + ffprobe)

## Deployment

Vercel reads from `main` branch. Push triggers auto-deploy. SPA routing via Vercel rewrites.

## Mobile-specific considerations

- Hero section heights: `h-[32vh] md:h-screen` (team), `h-[28vh] md:h-[70vh]` (equipo)
- Hero text sizes step down: `text-4xl md:text-7xl` vs `text-5xl md:text-7xl`
- Video sections: shrink on mobile to conserve space
- Horizontal pin scroll: **always gate with `matchMedia`** or use `hidden md:flex` to prevent mobile pin weirdness
- Contact form: 2-field design for mobile speed (nombre + telefono, directo WhatsApp)

## Reference

`directivas/` — design directives (GSAP/Lenis, cursor, transitions). Consult before animation refactor.
