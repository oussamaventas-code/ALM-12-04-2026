import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/PageSkeleton';
import Analytics from './components/Analytics';

// Diferidos: no bloquean el primer render ni el LCP
const WhatsAppFloat    = lazy(() => import('./components/WhatsAppFloat'));
const CookieBanner     = lazy(() => import('./components/CookieBanner'));

// HomePage carga inmediata (primera pantalla)
import HomePage from './pages/HomePage';

// Resto de páginas: carga diferida (solo se descargan si el usuario navega a ellas)
const ServiciosPage    = lazy(() => import('./pages/ServiciosPage'));
const ServicePage      = lazy(() => import('./pages/ServicePage'));
const ZonePage         = lazy(() => import('./pages/ZonePage'));
const FotovoltaicaPage = lazy(() => import('./pages/FotovoltaicaPage'));
const TeamPage         = lazy(() => import('./pages/TeamPage'));
const FlotaPage        = lazy(() => import('./pages/FlotaPage'));
const UrgenciasPage    = lazy(() => import('./pages/UrgenciasPage'));
const PatrociniosPage  = lazy(() => import('./pages/PatrociniosPage'));
const ProyectosPage    = lazy(() => import('./pages/ProyectosPage'));
const PrivacidadPage   = lazy(() => import('./pages/PrivacidadPage'));
const AvisoLegalPage   = lazy(() => import('./pages/AvisoLegalPage'));
const CookiesPage      = lazy(() => import('./pages/CookiesPage'));
const ContactoPage     = lazy(() => import('./pages/ContactoPage'));
const HistoriaPage     = lazy(() => import('./pages/HistoriaPage'));
const ZonasPage        = lazy(() => import('./pages/ZonasPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

// GSAP registrado una única vez aquí — los componentes no necesitan volver a registrarlo
gsap.registerPlugin(ScrollTrigger);
// Reducir lagSmoothing global para no bloquear el main thread
gsap.ticker.lagSmoothing(500, 33);

// ── prefers-reduced-motion ──────────────────────────────────────────────────
// Si el usuario tiene "Reducir movimiento" activado en su SO, todas las
// animaciones GSAP se ejecutan instantáneamente (duration/delay → 0).
// Los demás usuarios no se ven afectados en absoluto.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0, delay: 0 });
  gsap.globalTimeline.timeScale(100);
}

// ── Lenis smooth scroll ─────────────────────────────────────────────────────
// Singleton instance shared via module scope so ScrollTrigger can always
// reference the live Lenis object.
let lenisInstance = null;

function useLenis() {
  const location = useLocation();

  useEffect(() => {
    // Skip on touch/coarse-pointer devices — Lenis would add overhead with no benefit
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Skip if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let tickerFn;
    let lenis;
    let cancelled = false;

    // Diferir Lenis hasta después de la carga inicial para no bloquear el TBT
    // Dynamic import: Lenis sale del critical path y se descarga solo cuando hace falta
    const timer = setTimeout(async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      lenisInstance = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }, 300); // 300ms tras el primer render — fuera del critical path

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      lenisInstance = null;
    };
  }, []); // init once

  // On route change scroll to top via Lenis (avoids position carry-over)
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);
}

// ── Fallback loader — skeleton por página ────────────────────────────────────
// PageSkeleton reemplaza el spinner genérico con un placeholder visual
// que mantiene la estructura de la página para evitar Layout Shift.

// ── Kill ScrollTrigger pins synchronously before React unmounts DOM ──────────
// GSAP pin:true reparents nodes into .pin-spacer wrappers.
// React then fails with "removeChild: not a child of this node" because the
// DOM no longer matches React's virtual tree.  useLayoutEffect cleanup runs
// BEFORE React commits deletions, giving us a window to revert GSAP changes.
//
// CRITICAL: kill logic lives in the CLEANUP function (return () => {...}),
// NOT in the setup body.  React guarantees: all cleanups from the previous
// render fire BEFORE any setups of the new render.  If the kill were in the
// setup body it would run AFTER child components (pages) have already
// created their GSAP tweens — leaving elements stuck at autoAlpha:0.
function useScrollTriggerCleanup() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Cleanup fires before the next render's effects — safe to kill here.
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
      gsap.killTweensOf('*');
    };
  }, [location.pathname]);
}

// ── App shell ───────────────────────────────────────────────────────────────
function AppShell() {
  useLenis();
  useScrollTriggerCleanup();

  return (
    <div className="overflow-x-hidden">
      {/* Skip-to-content para accesibilidad por teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#F5C518] focus:text-[#080809] focus:px-4 focus:py-2 focus:font-bold focus:font-body focus:text-sm"
      >
        Saltar al contenido principal
      </a>

      <PageTransition />
      <Navbar />
      <main id="main-content" className="pb-[72px] lg:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/"                element={<HomePage />} />
            <Route path="/urgencias"       element={<UrgenciasPage />} />
            <Route path="/patrocinios"     element={<PatrociniosPage />} />
            <Route path="/proyectos"       element={<ProyectosPage />} />
            <Route path="/servicios"       element={<ServiciosPage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="/zonas"           element={<ZonasPage />} />
            <Route path="/zonas/:slug"     element={<ZonePage />} />
            <Route path="/fotovoltaica"    element={<FotovoltaicaPage />} />
            <Route path="/equipo"          element={<TeamPage />} />
            <Route path="/flota"           element={<FlotaPage />} />
            <Route path="/privacidad"      element={<PrivacidadPage />} />
            <Route path="/aviso-legal"     element={<AvisoLegalPage />} />
            <Route path="/cookies"         element={<CookiesPage />} />
            <Route path="/contacto"        element={<ContactoPage />} />
            <Route path="/sobre-nosotros"  element={<HistoriaPage />} />
            <Route path="*"                element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppFloat />
        <CookieBanner />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Analytics />
      <AppShell />
    </>
  );
}
