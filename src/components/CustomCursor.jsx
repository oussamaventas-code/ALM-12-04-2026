import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — cursor personalizado de alta agencia.
 *
 * Capas de comportamiento:
 *  1. Dot     → posición instantánea (quickTo 0.06s)
 *  2. Ring    → posición retardada con inercia (quickTo 0.55s)
 *  3. Hover   → event delegation: scale + label contextual
 *  4. Click   → micro-squeeze del anillo
 *  5. Scroll  → el anillo se elonga verticalmente y rota 45° mientras
 *               la rueda está activa; rebota al soltarla
 *
 * Solo activo en pointer:fine. El DOM no se monta en móvil (hidden md:*).
 */
export default function CustomCursor() {
  const circleRef = useRef(null);
  const dotRef    = useRef(null);
  const labelRef  = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const circle = circleRef.current;
    const dot    = dotRef.current;
    const label  = labelRef.current;

    gsap.set([circle, dot], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    // ── Setters de posición (sin pasar por React state) ────────────────
    const cxTo = gsap.quickTo(circle, 'x', { duration: 0.55, ease: 'power3.out' });
    const cyTo = gsap.quickTo(circle, 'y', { duration: 0.55, ease: 'power3.out' });
    const dxTo = gsap.quickTo(dot,    'x', { duration: 0.06 });
    const dyTo = gsap.quickTo(dot,    'y', { duration: 0.06 });

    let visible      = false;
    let currentScale = 1;

    // ── Movimiento ──────────────────────────────────────────────────────
    const onMove = (e) => {
      if (!visible) {
        gsap.to([circle, dot], { autoAlpha: 1, duration: 0.4 });
        visible = true;
      }
      cxTo(e.clientX);
      cyTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    // ── Event delegation para hover states ──────────────────────────────
    const getTarget = (el) => {
      let node = el;
      while (node && node !== document.body) {
        if (node.matches('.service-card-h'))                                                       return { scale: 2.8, text: 'VER →' };
        if (node.matches('a[href^="tel:"]'))                                                       return { scale: 2.2, text: '☎ LLAMAR' };
        if (node.matches('.btn-brand,.btn-whatsapp,.btn-outline,.btn-primary,.btn-secondary'))     return { scale: 1.65, text: null };
        if (node.matches('a[href],button'))                                                        return { scale: 1.25, text: null };
        node = node.parentElement;
      }
      return null;
    };

    const onOver = (e) => {
      const match = getTarget(e.target);
      if (!match) return;
      currentScale = match.scale;
      gsap.to(circle, { scale: match.scale, duration: 0.35, ease: 'power2.out' });
      if (match.text) {
        label.textContent = match.text;
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    };

    const onOut = (e) => {
      const match = getTarget(e.target);
      if (!match) return;
      if (e.relatedTarget && getTarget(e.relatedTarget)) return; // todavía dentro
      currentScale = 1;
      gsap.to(circle, { scale: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(label,  { opacity: 0, duration: 0.15 });
    };

    // ── Click feedback ──────────────────────────────────────────────────
    const onDown = () => {
      gsap.to(circle, { scale: currentScale * 0.75, duration: 0.1 });
      gsap.to(dot,    { scale: 1.8, duration: 0.1 });
    };
    const onUp = () => {
      gsap.to(circle, { scale: currentScale, duration: 0.3, ease: 'back.out(2)' });
      gsap.to(dot,    { scale: 1, duration: 0.2 });
    };

    // ── Scroll state: elongar + rotar el anillo ─────────────────────────
    let scrollTimer = null;
    let isScrolling = false;

    const enterScroll = () => {
      if (isScrolling) return;
      isScrolling = true;
      gsap.to(circle, {
        scaleX:   0.55,
        scaleY:   1.55,
        rotation: 45,
        borderColor: 'rgba(96,165,250,0.9)', // brand-glow
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2, overwrite: 'auto' });
    };

    const exitScroll = () => {
      isScrolling = false;
      gsap.to(circle, {
        scaleX:      currentScale,
        scaleY:      currentScale,
        rotation:    0,
        borderColor: 'rgba(37,99,235,0.7)',  // brand/70
        duration:    0.55,
        ease:        'elastic.out(1, 0.5)',
        overwrite:   'auto',
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: 'auto' });
    };

    const onWheel = () => {
      enterScroll();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(exitScroll, 220);
    };

    // ── Listeners ───────────────────────────────────────────────────────
    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('wheel',      onWheel, { passive: true });
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('wheel',      onWheel);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
    };
  }, []);

  return (
    <>
      {/* Anillo retardado */}
      <div
        ref={circleRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-brand/70 bg-brand/[0.04]"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="text-brand font-heading font-bold uppercase tracking-wide opacity-0 select-none whitespace-nowrap leading-none"
          style={{ fontSize: '0.5rem' }}
        />
      </div>

      {/* Dot instantáneo */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block w-1.5 h-1.5 rounded-full bg-brand"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
