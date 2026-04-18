import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * PageTransition — barrido de pantalla completa entre rutas.
 *
 * El overlay muestra el logo centrado + letras de marca durante el pause
 * entre el sweep-in y el sweep-out. Esto da el efecto "agencia premium"
 * en lugar de un simple corte de color.
 *
 * Flujo por cambio de ruta:
 *  1. Panel negro azulado sube desde abajo (cubre la vieja página)
 *  2. Logo y texto "ALMelectricidad" aparecen con fade
 *  3. Panel baja hacia abajo (revela la nueva página)
 *  4. Logo se desvanece
 */
export default function PageTransition() {
  const overlayRef   = useRef(null);
  const logoRef      = useRef(null);
  const labelRef     = useRef(null);
  const location     = useLocation();
  const isFirst      = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo    = logoRef.current;
    const label   = labelRef.current;
    if (!overlay) return;

    if (isFirst.current) {
      isFirst.current = false;
      gsap.to(overlay, { 
        autoAlpha: 0, 
        duration: 0.8, 
        ease: 'power2.inOut', 
        delay: 0.2,
        onComplete: () => {
          // Reset state for future sweep transitions
          gsap.set(overlay, { yPercent: 100, autoAlpha: 1 });
        }
      });
      return;
    }

    window.scrollTo(0, 0);

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    // Reset
    gsap.set(overlay, { yPercent: 100 });
    gsap.set([logo, label], { autoAlpha: 0, y: 16 });

    tl
      // — Sweep IN (sube cubriendo la página vieja) —
      .to(overlay, { yPercent: 0, duration: 0.55 })

      // — Logo aparece mientras el overlay está visible —
      .to([logo, label], { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, '-=0.1')

      // — Breve pausa con marca visible —
      .to({}, { duration: 0.18 })

      // — Logo se desvanece —
      .to([logo, label], { autoAlpha: 0, y: -10, duration: 0.2, ease: 'power2.in' })

      // — Sweep OUT (baja revelando la nueva página) —
      .to(overlay, { yPercent: -100, duration: 0.55, ease: 'power4.inOut' });

    return () => {
      tl.kill();
      // Ensure overlay is always pushed off-screen on cleanup
      gsap.set(overlay, { yPercent: -100 });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9990] pointer-events-none flex flex-col items-center justify-center gap-4"
      style={{ background: 'linear-gradient(135deg, #080809 0%, #0F0F12 60%, #161619 100%)' }}
    >
      {/* Logo */}
      <img
        ref={logoRef}
        src="/LOGO Y JORGE/LOGO.JPG"
        alt=""
        className="h-16 w-auto object-contain opacity-0"
        style={{ filter: 'brightness(1.1)' }}
      />

      {/* Letras de marca */}
      <span
        ref={labelRef}
        className="font-heading font-bold uppercase tracking-[0.25em] text-brand/80 text-xs opacity-0"
      >
        ALMelectricidad
      </span>

      {/* Línea animada bajo el logo */}
      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-brand to-transparent opacity-60" />
    </div>
  );
}
