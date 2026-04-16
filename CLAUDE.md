# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Tech Stack

- **React 19** + **Vite 8** + **Tailwind CSS 4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **GSAP 3** with ScrollTrigger for animations
- **Lenis** for smooth scroll (desktop only — skipped on touch/coarse-pointer devices)
- **React Router DOM 7** for client-side routing
- **react-helmet-async** (`<SeoHead />`) for per-page meta tags

## Architecture

`src/App.jsx` is the application shell. It:
- Registers GSAP plugins once (`ScrollTrigger`)
- Initialises Lenis smooth scroll as a module-level singleton (`lenisInstance`) synced to GSAP ticker
- Runs `useScrollTriggerCleanup` on route change — kills all ScrollTrigger instances with `kill(true)` **before** React unmounts DOM to prevent `removeChild` errors from GSAP pin spacers
- Lazy-loads all pages except `HomePage` via `React.lazy`

**Routing:** `src/App.jsx` defines all routes. Pages live in `src/pages/`, reusable UI in `src/components/`, static data (services, zones) in `src/data/`.

**GSAP pattern:** Components use `useGSAP` or `useEffect`/`useLayoutEffect` with a `gsap.context()` for scoped cleanup. ScrollTrigger instances must not be created outside of this cleanup pattern — the app-level `useScrollTriggerCleanup` kills them all on navigation regardless.

**Lenis + ScrollTrigger sync:** `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(tickerFn)` keep them in sync. When adding scroll-triggered animations, do not call `ScrollTrigger.refresh()` synchronously on mount — use a `setTimeout(..., 150)` as done in the route-change handler.

**Premium UX components:** `<CustomCursor />` (global custom cursor with spring physics, toggled via `data-cursor="pointer"` on interactive elements), `<MagneticElement />` (GSAP magnet wrapper for CTAs — used in Hero and Navbar), `<PageTransition />` (GSAP-based route transition overlay mounted in `App.jsx`). The cursor is enabled via `cursor: none` in `index.css`.

**Deployment:** Vercel. `vercel.json` sets `buildCommand` and `outputDirectory`. SPA routing is handled by Vercel's default rewrites for Vite projects.

## Reference

`directivas/` contains design directives that defined the current architecture (GSAP/Lenis integration, cursor system, page transitions). Consult them when making significant changes to animation infrastructure.
