import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const CAT_LIST = ['Fotovoltaica', 'Industrial', 'Cuadros Eléctricos', 'Residencial'];
const FILTERS   = ['Todos', ...CAT_LIST];

const projectImages = [
  "0279e337-7741-4df3-9a96-b4c9ce509b6e.webp",
  "033bf65c-71aa-4c20-bdbe-ecd8b081c3c9.webp",
  "07cea9c8-e0be-4511-995a-0b5e6d68185d.webp",
  "09f34c1b-b1ed-4908-a773-241ccb1a45a2.webp",
  "0c1c3c06-f1d5-4f04-91a8-1381e29dd650.webp",
  "1602e3a4-4c93-43c2-8a96-e73be571c477.webp",
  "18c3ab31-a8d1-4d43-98a8-4b61e756a7d4.webp",
  "2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.webp",
  "2ed7b91e-22ff-4d4a-8003-a160d574fc01.webp",
  "2f3de869-3ac3-4cc7-b957-97450f9384c9.webp",
  "3723be01-4806-4063-bd6f-3aa15fe2bedc.webp",
  "39d3c613-20a3-4f21-8b28-1d3d7be8b678.webp",
  "3cc53ea7-819a-4836-bc3e-d0f54f2e3fd7.webp",
  "3d607bf1-5437-4c5f-8752-53a0977fb5f4.webp",
  "3e110a11-4235-4d36-bc83-c53c538dcf89.webp",
  "407b4ddd-a9aa-42b4-8ced-e72e50b828ae.webp",
  "4ab395fc-306b-49f2-b757-409c54f64ad8.webp",
  "4f8339dd-0f51-4846-99a9-cc31fb575400.webp",
  "50cfd711-4c99-4440-93af-db9cce11af95.webp",
  "524fa236-a813-4957-8daa-683d7fd7ea01.webp",
  "5c5f4e5e-ee9a-437a-9b4e-25a342b29d55.webp",
  "5d69509a-9c57-4b08-8223-b7dc2a980194.webp",
  "6494be73-7934-486b-bf98-37bed5b4ce92.webp",
  "685fcf32-c501-4b69-8649-380b9630371a.webp",
  "69adf53e-ceae-45ed-88a0-8ced7a2bb8f7.webp",
  "69f9be60-dd51-45ce-9fc3-3e3be2668995.webp",
  "6a0e33c5-1ab3-434d-8ad4-f959bd982f51.webp",
  "7448d2b8-3704-4555-8421-ccaf0be40817.webp",
  "74ab40b2-918e-4793-8520-4c45ce44b65b.webp",
  "7ef23bdc-5aa7-4fcd-abbb-ca1c9bc891b1.webp",
  "8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.webp",
  "8bdff42d-f1cd-4e6e-aeff-554965fb5c0f.webp",
  "8f6878c8-9c79-46a1-9f36-be87c1f0f8b9.webp",
  "91eade2c-21ef-482e-b34b-62229a342957.webp",
  "926a9428-6861-4de2-91d9-b3932929560f.webp",
  "9ad8caf2-e957-4e5d-b206-330dc821d3e9.webp",
  "a22a7691-4c20-43c6-bfa0-0b1c1e02924e.webp",
  "a2ab0819-bc0f-4d6e-bcb9-24ea2bd6e0a6.webp",
  "b572951c-3356-47ae-9b0d-e1a9f57b0c8b.webp",
  "b871f2bb-e4d7-4a42-903e-65a807e39964.webp",
  "b8eee358-1616-4add-9124-58b35f85d0b5.webp",
  "bbf912ac-5634-4e6f-ad8d-b83fdf356274.webp",
  "d615cb46-d323-4ffa-888c-a931463a6116.webp",
  "db9bc9a3-a772-4123-8556-729ae6d7676a.webp",
  "de6f9578-082c-4104-b71a-aec42f9a3778.webp",
  "e322f706-124e-401e-9b8c-34e0184d27e1.webp",
  "e6948f9c-0f62-4771-bf42-8c308b96c351.webp",
  "ed4be069-613d-4e87-96c2-7cf4795e8789.webp",
  "f015c7ac-f508-4a30-bde0-3dfdb7713f23.webp",
  "f1721ec8-97cb-4ea0-b323-04851be58c8a.webp",
  "fc27efb4-9468-4a1c-930d-64ff773b4404.webp",
].map((file, i) => ({
  file,
  id: i,
  category: CAT_LIST[i % CAT_LIST.length],
}));

// ── Lightbox Component ────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const overlayRef  = useRef(null);
  const imgRef      = useRef(null);
  const controlsRef = useRef(null);

  // Animate in on mount
  useLayoutEffect(() => {
    const overlay  = overlayRef.current;
    const img      = imgRef.current;
    const controls = controlsRef.current;

    gsap.set(overlay, { opacity: 0 });
    gsap.set(img, { opacity: 0, scale: 0.88, y: 20 });
    gsap.set(controls, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(overlay, { opacity: 1, duration: 0.35 })
      .to(img,      { opacity: 1, scale: 1, y: 0, duration: 0.45 }, '-=0.2')
      .to(controls, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2');

    return () => tl.kill();
  }, [index]); // re-runs on index change to re-animate

  // Animate out then call onClose
  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const img     = imgRef.current;
    const tl = gsap.timeline({
      onComplete: onClose,
      defaults: { ease: 'power2.in' },
    });
    tl.to(img,     { opacity: 0, scale: 0.92, y: -10, duration: 0.25 })
      .to(overlay, { opacity: 0, duration: 0.3 }, '-=0.1');
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      handleClose();
      if (e.key === 'ArrowRight')  onNext();
      if (e.key === 'ArrowLeft')   onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose, onNext, onPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const current = images[index];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={handleClose}
    >
      {/* Main image container */}
      <div
        className="relative max-w-5xl w-full mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          key={current.id}
          src={`/images/portfolio/${current.file}`}
          alt={`Proyecto ${current.category} – ${current.id + 1}`}
          className="w-full h-auto max-h-[80vh] object-contain rounded-sm shadow-2xl"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Info + controls */}
        <div ref={controlsRef} className="mt-5 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-body font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700' }}
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

      {/* Prev / Next */}
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ProyectosPage() {
  const containerRef  = useRef(null);
  const galleryRef    = useRef(null);
  const colRefs       = [useRef(null), useRef(null), useRef(null)];
  const scrollCtxRef  = useRef(null);

  const [activeFilter,  setActiveFilter]  = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Visible images for lightbox navigation (derived from activeFilter)
  const visibleImages = activeFilter === 'Todos'
    ? projectImages
    : projectImages.filter((img) => img.category === activeFilter);

  // ── Scroll animations: stagger reveal + column-level parallax ────────────
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      scrollCtxRef.current?.revert();

      const ctx = gsap.context(() => {
        // Stagger fade-in for all visible items
        const items = gsap.utils.toArray('.gallery-item', galleryRef.current);
        gsap.fromTo(items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: { amount: 1.2, from: 'start' },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        // Parallax on column containers — left drifts down, right drifts up
        // This never interferes with internal layout since it's the whole column
        const parallaxMap = [60, 0, -60];
        colRefs.forEach((ref, i) => {
          if (!ref.current || parallaxMap[i] === 0) return;
          gsap.to(ref.current, {
            y: parallaxMap[i],
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        });
      }, galleryRef);

      scrollCtxRef.current = ctx;
    }, 150);

    return () => {
      clearTimeout(timer);
      scrollCtxRef.current?.revert();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Filter: fade items out/in, columns reflow naturally ───────────────────
  const handleFilter = useCallback((newFilter) => {
    if (newFilter === activeFilter) return;

    const allItems = gsap.utils.toArray('.gallery-item', galleryRef.current);

    allItems.forEach((el) => {
      const visible = newFilter === 'Todos' || el.dataset.category === newFilter;
      if (visible) {
        el.style.display = '';
        gsap.fromTo(el,
          { opacity: 0, y: 12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power2.out', overwrite: true }
        );
      } else {
        gsap.to(el, {
          opacity: 0, scale: 0.94, duration: 0.22, ease: 'power2.in', overwrite: true,
          onComplete: () => { el.style.display = 'none'; },
        });
      }
    });

    setActiveFilter(newFilter);
  }, [activeFilter]);

  // ── Lightbox helpers ───────────────────────────────────────────────────────
  const openLightbox = useCallback((visibleIndex) => {
    setLightboxIndex(visibleIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + visibleImages.length) % visibleImages.length);
  }, [visibleImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % visibleImages.length);
  }, [visibleImages.length]);

  return (
    <div className="pt-24 bg-dark min-h-screen text-white" ref={containerRef}>
      <Helmet>
        <title>Nuestros Proyectos | ALM Electricidad</title>
        <meta
          name="description"
          content="Galería de trabajos realizados por ALM Electricidad. Proyectos industriales, fotovoltaicos y residenciales reales, sin filtros ni fotos de stock."
        />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-surface-200" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full font-body text-xs font-bold uppercase tracking-wider mb-6">
              <Camera size={14} />
              Portfolio Real
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Sin renders ni fotos de stock. <br />
              <span className="text-gradient-brand">Solo nuestro trabajo.</span>
            </h1>
            <p className="text-white/60 font-body text-lg md:text-xl leading-relaxed">
              Explora una selección de nuestras instalaciones reales en naves industriales,
              locales comerciales, reformas integrales y proyectos fotovoltaicos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-dark/85 backdrop-blur-md border-b border-white/[0.06]">
        <div className="container-custom py-4 flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              data-cursor="pointer"
              className={[
                'px-5 py-2 rounded-full font-body text-sm font-semibold',
                'transition-all duration-300 focus:outline-none',
                activeFilter === f
                  ? 'bg-brand text-dark shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                  : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Gallery ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" ref={galleryRef}>
        <div className="container-custom">
          {/* 3 explicit column divs — parallax targets the containers, not individual items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx} ref={colRefs[colIdx]} className="flex flex-col gap-6">
                {projectImages
                  .filter((_, i) => i % 3 === colIdx)
                  .map((img) => {
                    const visibleIdx = visibleImages.findIndex((v) => v.id === img.id);
                    return (
                      <div
                        key={img.id}
                        data-category={img.category}
                        className="gallery-item relative group rounded-sm overflow-hidden bg-surface cursor-pointer"
                        style={{ willChange: 'transform, opacity' }}
                        onClick={() => visibleIdx !== -1 && openLightbox(visibleIdx)}
                        data-cursor="pointer"
                      >
                        <img
                          src={`/images/portfolio/${img.file}`}
                          alt={`Proyecto ${img.category} realizado por ALM – ${img.id + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Hover overlay — brand gradient from bottom */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(255,215,0,0.08) 60%, transparent 100%)',
                          }}
                        />

                        {/* CTA badge */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ease-out">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
                            style={{ background: '#FFD700' }}
                          >
                            <ZoomIn className="text-dark" size={19} />
                          </div>
                          <span className="text-white font-body text-xs font-bold uppercase tracking-widest">
                            Ampliar
                          </span>
                        </div>

                        {/* Category pill */}
                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            className="text-[10px] font-body font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(255,215,0,0.18)', color: '#FFD700' }}
                          >
                            {img.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-surface-200">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            ¿Quieres que tu proyecto sea el siguiente?
          </h2>
          <a
            href="/#contacto"
            data-cursor="pointer"
            className="inline-flex items-center justify-center bg-brand text-dark font-body font-bold text-sm px-8 py-4 hover:bg-white transition-colors duration-300"
          >
            Solicitar Presupuesto sin compromiso
          </a>
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
