import { useLayoutEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const testimonials = [
  {
    text: 'Excelente servicio. Puntual, profesional y muy cuidadoso con el trabajo. Explica todo claramente y deja todo limpio y en orden. 100% recomendable',
    name: 'Melisa Hernando Rodríguez',
    role: 'Clienta particular',
    timeAgo: 'Hace 7 meses',
    reviews: 1,
  },
  {
    text: 'Muy contenta con el servicio recibido. Trato profesional y de calidad. Me aconsejó sobre distintas opciones a realizar y sin duda lo recomiendo!',
    name: 'Sara Muñoz',
    role: 'Clienta particular',
    timeAgo: 'Hace 6 meses',
    reviews: 8,
  },
  {
    text: 'Profesional serio y de confianza. Trabajo rápido, limpio y bien hecho. Muy recomendable.',
    name: 'Daniel González Camuñas',
    role: 'Cliente particular',
    timeAgo: 'Hace 7 meses',
    reviews: 4,
  },
  {
    text: 'Muy buen profesional, me recomendó cómo hacer el trabajo por el que le llamé, realizó el trabajo en poco tiempo y cuando terminó, me explicó de nuevo todo el trabajo realizado y dejó todo muy limpio, gracias!!',
    name: 'Gonzalo Barajas',
    role: 'Cliente particular',
    timeAgo: 'Hace 7 meses',
    reviews: 3,
  },
  {
    text: 'Muy buen profesional. Te asesora y recomienda lo que necesitas, es un profesional de confianza.',
    name: 'Juan A. Estrada Montalvo',
    role: 'Cliente particular',
    timeAgo: 'Hace 7 meses',
    reviews: 3,
  },
];

// Duplicate for seamless marquee
const doubled = [...testimonials, ...testimonials];

const logoRatings = [
  { label: 'Google', stars: 5 },
  { label: 'Habitissimo', stars: 5 },
  { label: 'Certicalia', stars: 5 },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.testimonials-header',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Big bg number
      gsap.fromTo(
        '.testimonials-big-number',
        { scale: 0.8, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Infinite marquee
      tweenRef.current = gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 60,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4 });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
  };

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="pt-2 pb-24 md:pt-4 md:pb-32 bg-dark overflow-hidden relative"
      aria-label="Testimonios de clientes"
    >
      {/* Big decorative "5.0" in background */}
      <div className="testimonials-big-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" aria-hidden="true">
        <span className="font-heading text-[12rem] md:text-[18rem] font-black text-white/[0.03] leading-none">
          5.0
        </span>
      </div>

      {/* Contenido accesible oculto visualmente (lectores de pantalla) */}
      <ul className="sr-only" aria-label="Lista de opiniones de clientes">
        {testimonials.map((t, i) => (
          <li key={i}>
            <blockquote>
              <p>{t.text}</p>
              <footer>
                <cite>{t.name}</cite> — {t.role}, {t.timeAgo}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>

      <div className="relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-10 px-6">
          <span className="section-label">Lo que dicen nuestros clientes</span>
          <h2 className="section-title text-white mt-3">
            Opiniones de clientes reales
          </h2>

          {/* Rating row */}
          <div className="flex items-center justify-center gap-8 mt-6 flex-wrap">
            {logoRatings.map((lr) => (
              <div
                key={lr.label}
                className="flex flex-col items-center gap-1.5"
                aria-label={`Valoración en ${lr.label}: 5 de 5 estrellas`}
              >
                <span className="font-heading font-bold text-white/50 text-xs uppercase tracking-widest">
                  {lr.label}
                </span>
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {[...Array(lr.stars)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand fill-brand" />
                  ))}
                </div>
                <span className="font-heading font-extrabold text-brand text-sm" aria-hidden="true">
                  5.0
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee — decorativo, datos accesibles en sr-only arriba */}
        <div
          className="overflow-hidden"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={marqueeRef}
            className="flex gap-6 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {doubled.map((t, idx) => (
              <div
                key={idx}
                className="card-dark p-6 md:p-8 flex flex-col relative border border-white/[0.06] shrink-0"
                style={{ width: 'clamp(280px, 28vw, 400px)' }}
              >
                {/* Decorative quote */}
                <Quote size={32} className="text-brand/20 mb-4 shrink-0" aria-hidden="true" />

                {/* Quote text */}
                <p className="text-white/80 font-body text-base leading-relaxed italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Stars + attribution */}
                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <div className="flex items-center gap-0.5 mb-3" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-brand fill-brand" />
                    ))}
                  </div>
                  <p className="text-white font-heading font-bold text-base">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/40 font-body text-xs">{t.timeAgo}</span>
                    <span className="text-white/20 text-xs" aria-hidden="true">&middot;</span>
                    <span className="text-white/40 font-body text-xs">{t.reviews} reseña{t.reviews !== 1 ? 's' : ''} en Google</span>
                  </div>
                </div>

                {/* Left brand accent */}
                <div
                  className="absolute top-0 left-0 w-[3px] h-full"
                  aria-hidden="true"
                  style={{ background: 'var(--color-brand)', opacity: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
