import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight, Phone } from 'lucide-react';
import { ALL_PROJECTS, PORTFOLIO_CATEGORIES } from '../data/portfolio';
import { TEL_HREF } from '../data/business';

// ── Filtros ──────────────────────────────────────────────────────────────────
const FILTERS = ['Todos', ...PORTFOLIO_CATEGORIES];

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const overlayRef  = useRef(null);
  const imgRef      = useRef(null);
  const controlsRef = useRef(null);

  useLayoutEffect(() => {
    const overlay  = overlayRef.current;
    const img      = imgRef.current;
    const controls = controlsRef.current;

    gsap.set(overlay, { opacity: 0 });
    gsap.set(img, { opacity: 0, scale: 0.92, y: 16 });
    gsap.set(controls, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(overlay, { opacity: 1, duration: 0.3 })
      .to(img,      { opacity: 1, scale: 1, y: 0, duration: 0.4 }, '-=0.15')
      .to(controls, { opacity: 1, y: 0, duration: 0.25 }, '-=0.2');

    return () => tl.kill();
  }, [index]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
      defaults: { ease: 'power2.in' },
    });
    tl.to(imgRef.current,    { opacity: 0, scale: 0.94, duration: 0.2 })
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.05');
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      handleClose();
      if (e.key === 'ArrowRight')  onNext();
      if (e.key === 'ArrowLeft')   onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(5,5,8,0.96)', backdropFilter: 'blur(16px)' }}
      onClick={handleClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          key={current.id}
          src={current.src}
          alt={`Proyecto ${current.category} – ALM Electricidad`}
          className="w-full h-auto max-h-[80vh] object-contain rounded-sm shadow-2xl"
          style={{ willChange: 'transform, opacity' }}
        />

        <div ref={controlsRef} className="mt-5 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-body font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(245,197,24,0.15)', color: 'var(--color-brand)' }}
            >
              {current.category}
            </span>
            <span className="text-white/40 font-body text-sm">
              {index + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-brand hover:text-dark text-white transition-all duration-300 shadow-lg"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-brand hover:text-dark text-white transition-all duration-300 shadow-lg"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────
export default function ProyectosPage() {
  const galleryRef    = useRef(null);
  const scrollCtxRef  = useRef(null);

  const [activeFilter,  setActiveFilter]  = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Conteo por categoría
  const categoryCounts = useMemo(() => {
    const counts = { Todos: ALL_PROJECTS.length };
    PORTFOLIO_CATEGORIES.forEach((c) => {
      counts[c] = ALL_PROJECTS.filter((p) => p.category === c).length;
    });
    return counts;
  }, []);

  // Imágenes filtradas
  const visibleImages = useMemo(() => {
    return activeFilter === 'Todos'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  // ── Animación inicial: stagger fade-in al hacer scroll ─────────────────────
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      scrollCtxRef.current?.revert();

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.gallery-card', galleryRef.current);
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: { amount: 0.8, from: 'start' },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }, galleryRef);

      scrollCtxRef.current = ctx;
    }, 150);

    return () => {
      clearTimeout(timer);
      scrollCtxRef.current?.revert();
    };
  }, []);

  // ── Filtro: fade + reflow ──────────────────────────────────────────────────
  const handleFilter = useCallback((newFilter) => {
    if (newFilter === activeFilter) return;
    setActiveFilter(newFilter);

    requestAnimationFrame(() => {
      const items = gsap.utils.toArray('.gallery-card', galleryRef.current);
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.025, ease: 'power2.out' }
      );
    });
  }, [activeFilter]);

  // ── Lightbox helpers ───────────────────────────────────────────────────────
  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % visibleImages.length);
  }, [visibleImages.length]);

  return (
    <div className="pt-24 bg-dark min-h-screen text-white">
      <Helmet>
        <title>Proyectos realizados — Catálogo | ALM Electricidad</title>
        <meta
          name="description"
          content="Más de 90 trabajos eléctricos realizados por ALM Electricidad. Catálogo de proyectos industriales, fotovoltaicos, cuadros y residenciales en Madrid y Toledo."
        />
        <link rel="canonical" href="/proyectos" />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-14 px-6 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-dark to-dark" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/25 text-brand px-3.5 py-1.5 rounded-full font-body text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
              <Camera size={12} />
              Catálogo de proyectos
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.05] tracking-tight mb-6">
              {ALL_PROJECTS.length} trabajos reales,{' '}
              <span className="text-gradient-gold">documentados.</span>
            </h1>
            <p className="text-white/65 font-body text-base md:text-lg leading-relaxed max-w-2xl">
              Cada foto es de un proyecto que hicimos nosotros. Sin renders, sin imágenes
              de banco. Filtra por categoría para ver lo que más se parezca a lo tuyo.
            </p>

            {/* Métricas inline */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-body text-white/50">
              <div>
                <span className="block text-2xl font-heading font-extrabold text-brand leading-none">
                  {ALL_PROJECTS.length}
                </span>
                <span className="text-xs uppercase tracking-widest">Proyectos</span>
              </div>
              <div className="hidden sm:block w-[1px] bg-white/10" />
              <div>
                <span className="block text-2xl font-heading font-extrabold text-brand leading-none">
                  {PORTFOLIO_CATEGORIES.length}
                </span>
                <span className="text-xs uppercase tracking-widest">Categorías</span>
              </div>
              <div className="hidden sm:block w-[1px] bg-white/10" />
              <div>
                <span className="block text-2xl font-heading font-extrabold text-brand leading-none">
                  100%
                </span>
                <span className="text-xs uppercase tracking-widest">Trabajos propios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Barra de filtros ─────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-dark/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="container-custom px-6 py-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const count = categoryCounts[f] ?? 0;
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => handleFilter(f)}
                    data-cursor="pointer"
                    className={[
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs md:text-sm font-semibold',
                      'transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                      active
                        ? 'bg-brand text-dark shadow-[0_0_20px_rgba(245,197,24,0.3)]'
                        : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]',
                    ].join(' ')}
                  >
                    {f}
                    <span
                      className={[
                        'text-[10px] tabular-nums font-bold px-1.5 py-0.5 rounded-full leading-none',
                        active ? 'bg-dark/15 text-dark' : 'bg-white/[0.06] text-white/45',
                      ].join(' ')}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="hidden md:inline-flex items-center gap-2 text-xs font-body text-white/35 uppercase tracking-[0.12em]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Mostrando {visibleImages.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Galería ──────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-6" ref={galleryRef}>
        <div className="container-custom">

          {visibleImages.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-white/40 font-body">
                No hay proyectos en esta categoría todavía.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {visibleImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(idx)}
                  data-cursor="pointer"
                  className="gallery-card group relative aspect-[4/5] overflow-hidden bg-surface-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  style={{ willChange: 'transform, opacity' }}
                  aria-label={`Ver proyecto ${idx + 1} de ${visibleImages.length} — categoría ${img.category}`}
                >
                  <img
                    src={img.src}
                    alt={`Proyecto ${img.category} — ALM Electricidad`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Numeración esquina superior izq. */}
                  <div className="absolute top-3 left-3 font-heading font-black text-xs tabular-nums text-white/40 group-hover:text-brand transition-colors duration-300">
                    {String(idx + 1).padStart(3, '0')}
                  </div>

                  {/* Categoría esquina superior der. */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-[9px] md:text-[10px] font-body font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: 'rgba(245,197,24,0.18)', color: 'var(--color-brand)' }}
                    >
                      {img.category}
                    </span>
                  </div>

                  {/* Overlay hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    }}
                  />

                  {/* Botón Ampliar */}
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out">
                    <span className="font-heading text-white text-xs md:text-sm font-bold">
                      Proyecto {String(idx + 1).padStart(3, '0')}
                    </span>
                    <div
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--color-brand)' }}
                    >
                      <ZoomIn className="text-dark" size={15} />
                    </div>
                  </div>

                  {/* Borde de marca en hover */}
                  <div
                    className="absolute inset-0 ring-0 group-hover:ring-2 ring-brand/50 transition-all duration-300 pointer-events-none"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 bg-surface-200 border-t border-white/[0.06]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 leading-tight">
              ¿El siguiente proyecto es <span className="text-gradient-gold">el tuyo?</span>
            </h2>
            <p className="text-white/55 font-body text-base md:text-lg mb-8 max-w-xl mx-auto">
              Te respondemos en menos de 24h con presupuesto cerrado y sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contacto"
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-2 bg-brand text-dark font-body font-bold text-sm px-7 py-4 hover:bg-white transition-colors duration-300"
              >
                Solicitar presupuesto
                <ArrowRight size={16} />
              </Link>
              <a
                href={TEL_HREF}
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-brand text-white/80 hover:text-brand font-body font-semibold text-sm px-7 py-4 transition-colors duration-300"
              >
                <Phone size={16} />
                605 33 31 08
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={visibleImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
