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
- **`team.js`** — single source of truth: 6 team members con name, role, badge, desc, quote, img. Campo opcional `imgPosition` (string CSS `object-position`) para reencuadre per-photo cuando la foto descentra al sujeto (ej. Melisa: `'center 15%'`). Consumed by JorgeSection (home) + TeamPage (`/equipo`).
- **`portfolio.js`** — 92 projects with slug, title, desc, category. Exports `FEATURED_PROJECTS` + `ALL_PROJECTS` (with auto-category via modulo + `CATEGORY_OVERRIDES` map for manual overrides).
- **`zones.js`** — 13 zonas (Ocaña, Aranjuez, Madrid N/S/E/O, Getafe, Alcorcón, Toledo, Talavera, Illescas, Nacional). Cada una con `coords: { lat, lng, zoom }` + `bbox: 'minLng,minLat,maxLng,maxLat'` consumidos por `ZonePage` para embed OpenStreetMap. Si añades zona al menú, sincroniza también `Navbar.jsx`.

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

**Critical: `gsap.from({ opacity: 0 })` + React StrictMode = elementos invisibles.**
StrictMode ejecuta `useEffect` dos veces. Si el cleanup `ctx.revert()` cae a mitad de animación, los elementos pueden quedar en `opacity: 0` permanentemente. Mitigación:
- Para elementos **críticos visibles** (CTAs, trust strip): no animar opacidad, solo `y/x` translate. Si la animación falla, siguen visibles. Ver `Hero.jsx:39-44` (CTAs y trust strip sin `opacity` en `from()`)
- Añadir la clase al safety list de `prefers-reduced-motion` en `index.css` (`opacity: 1 !important`)
- Prefer `gsap.fromTo()` con estado final explícito sobre `gsap.from()` cuando el destino debe ser garantizado

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

**ZonePage** (`/zonas/:slug`)
- Mapa OpenStreetMap embebido (iframe sin API key) usando `coords.lat/lng` + `bbox` de `zones.js`
- CSS dark filter: `invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(0.95)` para integrar con tema oscuro
- Layout: descripción larga + tarjeta tiempo de respuesta + mapa en columna derecha
- Sin dependencias, solo HTML/CSS

**PatrociniosSection** (ruta `/patrocinios`)
- Sección fútbol sala: 2 fotos en columna derecha (`futbol-sala-equipo.webp` + `futbol-sala-jorge.webp`)
- Sección ciclismo: galería 3×2 de imágenes

**ServiciosPage** (`/servicios`)
- Combina `services` (7 entradas dinámicas con slug) + `extras` array (Urgencias 24h → `/urgencias`, Fotovoltaica Industrial → `/fotovoltaica`)
- Los 2 extras tienen página propia (no usan `ServicePage` dinámica), pero se renderizan juntos en el grid

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
- Videos hero: `public/videos/hero-desktop.mp4` y `hero-movil.mp4` (renombrados desde `HERO PARA PC.mp4` / `HERO MOVIL.mp4`). Proyectos: `public/videos/proyectos/proyecto-{01,02,03}.mp4` (sin audio, CRF 26-28)
- Video posters: auto-generated first frame (`.webp`)
- `og-image.png` is PNG (legacy, OG doesn't support WebP). All else WebP.
- Service images: optimized (recarga 2.03MB→93KB, telecomunicaciones 2.89MB→356KB via Sharp)

### Premium UX components
- `<CustomCursor />` — global cursor with spring physics. Toggle pointer style via `data-cursor="pointer"`.
- `<MagneticElement />` — GSAP magnet wrapper for CTAs. Renderiza `<span inline-flex>` que NO aplica efecto en touch devices (early return en `pointer: coarse`).
- `<PageTransition />` — full-screen sweep overlay on route change (mounted in App.jsx).
- `<PageSkeleton />` — Suspense fallback for all lazy pages.
- `<StickyMobileCTA />` — floating mobile CTA (inside HomePage Suspense). Usa `pb-[max(env(safe-area-inset-bottom),1rem)]` para iPhones.

### CSS custom utility classes (`src/index.css`)
- `.btn-brand` — botón amarillo principal (gradient amarillo + sombra)
- `.btn-whatsapp` — botón verde WhatsApp
- `.btn-outline` — botón outline transparente
- `.btn-urgencias` — botón rojo carmesí con `linear-gradient(180deg, #C42626 → #A11717)` + `inset shadow` arriba/abajo para relieve 3D. Usar en lugar de `bg-danger` plano
- `.mobile-nav-glass` — fondo del menú hamburguesa móvil con `linear-gradient` 3-stop + `backdrop-filter: blur(24px) saturate(140%)`
- `.text-gradient-gold` — gradiente dorado para énfasis en headings

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

**Si Vercel se "salta" commits y no actualiza:** push un commit vacío para forzar el rebuild:
```bash
git commit --allow-empty -m "chore: trigger Vercel redeploy"
git push origin main
```
Verifica qué bundle sirve Vercel comparando el hash JS:
```bash
curl -s https://alm-12-04-2026.vercel.app/ | grep -o 'index-[A-Za-z0-9_-]*\.js'
# vs local: npm run build (output muestra el hash actual)
```

## Mobile-specific considerations

- Hero section heights: `h-[32vh] md:h-screen` (team), `h-[28vh] md:h-[70vh]` (equipo)
- Hero text sizes step down: `text-4xl md:text-7xl` vs `text-5xl md:text-7xl`
- Video sections: shrink on mobile to conserve space
- Horizontal pin scroll: **always gate with `matchMedia`** or use `hidden md:flex` to prevent mobile pin weirdness
- Contact form: 2-field design for mobile speed (nombre + telefono, directo WhatsApp)

## Reference

`directivas/` — design directives (GSAP/Lenis, cursor, transitions). Consult before animation refactor.
