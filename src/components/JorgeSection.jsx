import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Heart, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { TEAM } from '../data/team';

// Mapea la fuente única al formato interno del componente
const team = TEAM.map((p) => ({
  name: p.nickname ? `${p.name} (${p.nickname})` : p.name,
  role: p.role,
  extra: p.badge,
  desc: p.desc,
  quote: p.quote,
  img: p.img,
}));

// ── Desktop: scroll horizontal con pin (mismo patrón que Portfolio) ─────────
function TeamDesktop() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Título con parallax horizontal sutil
      gsap.to(titleRef.current, {
        x: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Stagger reveal de cada tarjeta a medida que entra en viewport horizontal
      gsap.utils.toArray('.team-card-pin').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left 90%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipo"
      ref={sectionRef}
      aria-labelledby="equipo-heading"
      className="bg-dark overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="container-custom px-6 pt-16 pb-8 shrink-0">
          <div className="flex items-end justify-between gap-8">
            <div ref={titleRef}>
              <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
                <Heart size={14} className="text-brand" />
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">
                  Quién hay detrás
                </span>
              </div>
              <h2 id="equipo-heading" className="section-title text-white leading-tight">
                El equipo de{' '}
                <span className="text-gradient-gold">ALMelectricidad</span>
              </h2>
            </div>
            <p className="section-subtitle hidden md:block max-w-xs text-right">
              Personas reales detrás de cada instalación.
              <br />
              Nos gusta que sepas con quién trabajas.
            </p>
          </div>
        </div>

        {/* Track horizontal */}
        <div className="flex-1 flex items-center overflow-visible pl-8">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform pr-8"
            style={{ width: 'max-content' }}
          >
            {team.map((p, i) => (
              <article
                key={i}
                className="team-card-pin group relative overflow-hidden shrink-0 rounded-sm bg-white/[0.04] border border-white/10 hover:border-brand/40 transition-colors duration-300"
                style={{
                  width: 'clamp(280px, 30vw, 440px)',
                  height: '70vh',
                }}
              >
                {/* Imagen */}
                <img
                  src={p.img}
                  alt={p.name}
                  width="440"
                  height="700"
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: p.imgPosition || 'top' }}
                />

                {/* Gradiente permanente para legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                {/* Número grande arriba izquierda */}
                <div className="absolute top-5 left-5 font-heading font-black text-5xl text-white/[0.14] leading-none select-none pointer-events-none group-hover:text-brand/30 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Bloque inferior con info */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  {p.extra && (
                    <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-2.5 py-1 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <span className="text-brand text-[10px] font-body font-bold uppercase tracking-[0.15em]">
                        {p.extra}
                      </span>
                    </span>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-white leading-tight mb-1.5">
                    {p.name}
                  </h3>
                  <p className="font-body text-sm text-brand/90 leading-snug mb-3 line-clamp-2">
                    {p.role}
                  </p>
                  <p className="font-body text-sm text-white/65 leading-relaxed mb-4 line-clamp-2">
                    {p.desc}
                  </p>
                  <div className="flex gap-2.5 pt-4 border-t border-white/15">
                    <Quote
                      size={14}
                      className="text-brand/60 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-white/75 text-sm italic leading-snug line-clamp-2">
                      "{p.quote}"
                    </p>
                  </div>
                </div>

                {/* Borde de marca en hover */}
                <div className="absolute top-0 left-0 w-[3px] h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom bg-brand" />
              </article>
            ))}
            <div className="shrink-0 w-8" />
          </div>
        </div>

        {/* Footer con CTA */}
        <div className="container-custom px-6 pb-6 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-brand/40" />
            <span className="font-body text-xs text-white/50 uppercase tracking-[0.12em]">
              Desliza para conocer al equipo
            </span>
          </div>
          <Link
            to="/equipo"
            className="inline-flex items-center gap-2 bg-brand text-dark font-body font-bold text-sm px-6 py-3 hover:bg-white transition-colors duration-300"
          >
            Ver más sobre el equipo
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Mobile: stack vertical con animación de entrada (sin pin) ───────────────
function TeamMobile() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.team-card-mobile').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipo"
      ref={sectionRef}
      aria-labelledby="equipo-heading-mobile"
      className="bg-dark overflow-hidden py-16"
    >
      <div className="container-custom px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-3.5 py-1.5 mb-4">
            <Heart size={12} className="text-brand" />
            <span className="text-brand text-[11px] font-body font-bold uppercase tracking-[0.15em]">
              Quién hay detrás
            </span>
          </div>
          <h2 id="equipo-heading-mobile" className="section-title text-white leading-tight">
            El equipo de{' '}
            <span className="text-gradient-gold">ALMelectricidad</span>
          </h2>
          <p className="section-subtitle text-sm mt-4 text-white/60">
            Personas reales detrás de cada instalación.
          </p>
        </div>

        {/* Cards apiladas */}
        <div className="flex flex-col gap-5">
          {team.map((p, i) => (
            <article
              key={i}
              className="team-card-mobile group relative overflow-hidden rounded-sm bg-white/[0.04] border border-white/10"
              style={{ height: '50vh', minHeight: '420px' }}
            >
              <img
                src={p.img}
                alt={p.name}
                width="400"
                height="500"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

              <div className="absolute top-3 left-3 font-heading font-black text-4xl text-white/[0.10] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                {p.extra && (
                  <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-2 py-0.5 mb-2">
                    <span className="text-brand text-[9px] font-body font-bold uppercase tracking-[0.15em]">
                      {p.extra}
                    </span>
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-white leading-tight mb-1">
                  {p.name}
                </h3>
                <p className="font-body text-xs text-brand/90 leading-snug mb-2">
                  {p.role}
                </p>
                <div className="flex gap-2 pt-3 border-t border-white/15">
                  <Quote size={12} className="text-brand/60 shrink-0 mt-0.5" />
                  <p className="text-white/75 text-xs italic leading-snug">
                    "{p.quote}"
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/equipo"
          className="mt-8 inline-flex items-center justify-center gap-2 bg-brand text-dark font-body font-bold text-sm px-6 py-4 w-full hover:bg-white transition-colors duration-300"
        >
          Ver más sobre el equipo
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export default function JorgeSection() {
  return (
    <>
      <div className="hidden lg:block">
        <TeamDesktop />
      </div>
      <div className="lg:hidden">
        <TeamMobile />
      </div>
    </>
  );
}
