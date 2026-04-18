import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import UrgencyBanner from './components/UrgencyBanner';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileUrgencyBar from './components/MobileUrgencyBar';
import PageTransition from './components/PageTransition';
import CookieBanner from './components/CookieBanner';

// HomePage carga inmediata (primera pantalla)
import HomePage from './pages/HomePage';

// Resto de páginas: carga diferida (solo se descargan si el usuario navega a ellas)
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

    // Diferir Lenis hasta después de la carga inicial para no bloquear el TBT
    const timer = setTimeout(() => {
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
      clearTimeout(timer);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      lenisInstance = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

// ── Fallback loader ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        <span className="text-white/40 text-sm font-body">Cargando...</span>
      </div>
    </div>
  );
}

// ── Kill ScrollTrigger pins synchronously before React unmounts DOM ──────────
// GSAP pin:true reparents nodes into .pin-spacer wrappers.
// React then fails with "removeChild: not a child of this node" because the
// DOM no longer matches React's virtual tree.  useLayoutEffect cleanup runs
// BEFORE React commits deletions, giving us a window to revert GSAP changes.
function useScrollTriggerCleanup() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useLayoutEffect(() => {
    if (prevPath.current !== location.pathname) {
      // Revert all ScrollTrigger instances: removes pin-spacers,
      // restores original DOM positions, kills tweens.
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
      gsap.killTweensOf('*');
      prevPath.current = location.pathname;
    }
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
      {/* <UrgencyBanner /> */}
      <main id="main-content" className="pb-[72px] lg:pb-0">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                element={<HomePage />} />
            <Route path="/urgencias"       element={<UrgenciasPage />} />
            <Route path="/patrocinios"     element={<PatrociniosPage />} />
            <Route path="/proyectos"       element={<ProyectosPage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="/zonas/:slug"     element={<ZonePage />} />
            <Route path="/fotovoltaica"    element={<FotovoltaicaPage />} />
            <Route path="/equipo"          element={<TeamPage />} />
            <Route path="/flota"           element={<FlotaPage />} />
            <Route path="/privacidad"      element={<PrivacidadPage />} />
            <Route path="/aviso-legal"     element={<AvisoLegalPage />} />
            <Route path="/cookies"         element={<CookiesPage />} />
            <Route path="*"                element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileUrgencyBar />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
