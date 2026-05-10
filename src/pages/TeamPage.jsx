import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Wrench, Star, Users, Phone, Quote } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM } from '../data/team';

// gsap.registerPlugin ya registrado globalmente en App.jsx

// Mapeo desde la fuente única (data/team.js).
// Para editar nombres/roles/citas, modifica src/data/team.js.
const teamMembers = TEAM.map((p) => ({
  displayName: p.nickname ? p.name : p.name,
  shortName: p.nickname || p.name.split(' ')[0],
  role: p.role,
  badge: p.badge,
  desc: p.desc,
  quote: p.quote,
  img: p.img,
}));

const values = [
  {
    icon: Award,
    title: 'Formación continua',
    desc: 'Cada año actualizamos nuestra formación en normativa eléctrica, nuevas tecnologías y sistemas de autoconsumo.',
  },
  {
    icon: Wrench,
    title: 'Trabajo bien hecho',
    desc: 'El estándar de calidad no varía entre un trabajo grande o pequeño. Cada instalación recibe el mismo nivel de atención.',
  },
  {
    icon: Star,
    title: 'Garantía real',
    desc: 'Todo nuestro trabajo tiene garantía por escrito. Si algo falla dentro del período garantizado, lo resolvemos sin coste.',
  },
  {
    icon: Users,
    title: 'Equipo coordinado',
    desc: 'Trabajamos como una unidad. El cliente siempre tiene un punto de contacto claro y sabe exactamente quién viene a su obra.',
  },
];

export default function TeamPage() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    gsapCtx.current = gsap.context(() => {
      // Parallax hero content
      const heroContent = document.querySelector('.team-hero-content');
      if (heroContent && heroRef.current) {
        gsap.to(heroContent, {
          y: '30%',
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Horizontal scroll gallery — solo en desktop
      if (containerRef.current && window.innerWidth >= 1024) {
        const slides = gsap.utils.toArray('.team-slide-desktop');

        if (slides.length > 0) {
          const pinAnimation = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              pinType: 'transform',
              scrub: 1,
              snap: {
                snapTo: 1 / (slides.length - 1),
                duration: 0.1,
                ease: 'power1.inOut',
              },
              end: () => `+=${containerRef.current?.offsetWidth * slides.length}`,
            },
          });

          // Animación dentro de cada slide
          slides.forEach((slide) => {
            const title = slide.querySelector('.slide-title');
            const imgContainer = slide.querySelector('.slide-img-container');

            if (title && imgContainer) {
              gsap.fromTo(
                title,
                { y: 50, opacity: 0 },
                {
                  y: 0, opacity: 1, duration: 1,
                  scrollTrigger: {
                    trigger: slide,
                    start: 'left center',
                    containerAnimation: pinAnimation,
                    toggleActions: 'play none none reverse',
                  },
                }
              );
              gsap.fromTo(
                imgContainer,
                { scale: 0.8, opacity: 0 },
                {
                  scale: 1, opacity: 1, duration: 1,
                  scrollTrigger: {
                    trigger: slide,
                    start: 'left 80%',
                    containerAnimation: pinAnimation,
                    toggleActions: 'play none none reverse',
                  },
                }
              );
            }
          });
        }
      }

      // Values cards
      const valuesGrid = document.querySelector('.values-grid');
      const valueCards = document.querySelectorAll('.value-card');

      if (valuesGrid && valueCards.length > 0) {
        gsap.fromTo(
          valueCards,
          { x: -20, autoAlpha: 0 },
          {
            x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: valuesGrid, start: 'top 85%', once: true },
          }
        );
      }
    });

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (gsapCtx.current) {
        gsapCtx.current.revert();
        gsapCtx.current = null;
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <SeoHead
        title="Nuestro Equipo — ALMelectricidad"
        description="Conoce al equipo de electricistas profesionales de ALMelectricidad. Más de 10 años de experiencia en instalaciones eléctricas en Madrid y Toledo."
        canonical="/equipo"
        ogImage="/og/equipo.png"
      />

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative w-full h-[28vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Foto del equipo completo, desenfocada y oscurecida de fondo */}
        <img
          src="/images/team/equipo-completo.webp"
          alt=""
          aria-hidden="true"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover lg:scale-110"
          style={{
            filter: 'blur(3px) brightness(0.75) saturate(1.05)',
            willChange: 'transform',
          }}
        />

        {/* Overlays para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/45 via-dark/25 to-dark z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/8 via-transparent to-transparent z-10" />

        <div className="team-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-8"
          >
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>
          <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
            <Users className="text-brand w-5 h-5" />
            Nuestro Equipo
            <Users className="text-brand w-5 h-5" />
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-white mb-6 leading-none">
            LAS PERSONAS DETRÁS{' '}
            <span className="text-brand">DE CADA OBRA</span>
          </h1>
          <p className="text-xl md:text-2xl font-body font-light max-w-2xl text-white/70">
            No somos una franquicia. Somos un equipo de técnicos especializados que trabaja cada proyecto con el mismo nivel de exigencia.
          </p>
        </div>
      </div>

      {/* ── GALERÍA MÓVIL (< lg) — Cards verticales con overlay ── */}
      <div className="lg:hidden bg-dark py-10">
        <div className="px-4 space-y-4">
          {teamMembers.map((member, i) => (
            <article
              key={i}
              className="relative overflow-hidden border border-white/10"
              style={{ height: '72vw', minHeight: '260px', maxHeight: '360px' }}
            >
              {/* Foto de fondo */}
              <img
                src={member.img}
                alt={member.displayName}
                loading="lazy"
                decoding="async"
                width="600"
                height="750"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/10" />

              {/* Número */}
              <div className="absolute top-3.5 left-4 font-heading font-black text-4xl text-white/[0.12] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Acento de marca izquierdo */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-brand" />

              {/* Info en la parte inferior */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                {member.badge && (
                  <span className="inline-flex items-center gap-1.5 border border-brand/30 bg-brand/10 px-2 py-0.5 mb-2 backdrop-blur-sm">
                    <span className="w-1 h-1 rounded-full bg-brand" />
                    <span className="text-brand text-[9px] font-body font-bold uppercase tracking-[0.15em]">
                      {member.badge}
                    </span>
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {member.displayName}
                </h3>
                <p className="font-body text-xs text-brand/90 mt-0.5 mb-2 leading-snug">
                  {member.role}
                </p>
                <div className="flex gap-2 pt-2 border-t border-white/15">
                  <Quote size={11} className="text-brand/60 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white/70 text-xs italic leading-snug font-body line-clamp-2">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA móvil */}
        <div className="px-4 mt-8 flex flex-col gap-3">
          <a
            href="/#contacto"
            className="flex items-center justify-center gap-2 bg-brand text-dark font-heading font-bold text-sm uppercase tracking-wide px-6 py-4 w-full"
          >
            Pedir presupuesto
            <ArrowRight size={16} />
          </a>
          <a
            href="tel:+34605333108"
            className="flex items-center justify-center gap-2 border border-white/15 text-white/70 font-heading font-semibold text-sm uppercase tracking-wide px-6 py-4 w-full"
          >
            <Phone size={15} />
            605 33 31 08
          </a>
        </div>
      </div>

      {/* ── GALERÍA DESKTOP (≥ lg) — GSAP horizontal pin ── */}
      <div ref={containerRef} className="hidden lg:flex h-screen w-full overflow-hidden bg-dark relative z-30">
        <div className="flex h-full will-change-transform items-center">

          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="team-slide-desktop w-screen h-full flex shrink-0 relative"
            >
              {/* Texto izquierda */}
              <div className="slide-title flex flex-col justify-center px-10 md:px-16 lg:px-20 w-1/2 shrink-0 z-10">
                {member.badge && (
                  <span className="self-start inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-3 py-1 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-brand text-[11px] font-body font-bold uppercase tracking-[0.18em]">
                      {member.badge}
                    </span>
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-white leading-[1.05] mb-5 tracking-tight">
                  {member.displayName}
                </h3>
                <p className="text-brand font-body font-semibold text-sm md:text-base max-w-md mb-6 leading-snug">
                  {member.role}
                </p>
                <p className="text-white/65 font-body text-base max-w-md mb-8 leading-relaxed">
                  {member.desc}
                </p>
                {/* Cita */}
                <div className="flex gap-3 max-w-md pt-5 border-t border-white/10">
                  <Quote size={18} className="text-brand/60 shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-white/75 text-base italic leading-snug font-body">
                    "{member.quote}"
                  </p>
                </div>
              </div>

              {/* Foto derecha */}
              <div className="slide-img-container w-1/2 h-full shrink-0 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.displayName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}

          {/* Slide final — CTA */}
          <div className="team-slide-desktop w-screen h-full flex flex-col items-center justify-center px-6 shrink-0 bg-brand text-dark relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <Users size={60} className="mb-6" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 max-w-3xl tracking-tighter leading-none">
                HABLEMOS DE TU PROYECTO
              </h2>
              <p className="text-dark/70 font-body text-xl md:text-2xl mb-10 max-w-2xl font-medium">
                6 profesionales especializados listos para atenderte. Sin intermediarios, sin bots.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#contacto"
                  className="bg-dark text-brand px-10 py-5 rounded-full font-body text-xl font-bold uppercase tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-3 group"
                >
                  Pedir presupuesto
                  <ArrowRight className="group-hover:-rotate-45 transition-transform" />
                </a>
                <a
                  href="tel:+34605333108"
                  className="bg-dark/10 text-dark px-10 py-5 rounded-full font-body text-xl font-bold uppercase tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-3"
                >
                  <Phone size={20} />
                  605 33 31 08
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── VALORES ── */}
      <section className="py-24 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Cómo trabajamos</span>
            <h2 className="section-title mt-3 text-white">
              Los valores que nos definen
            </h2>
          </div>
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card p-6 border border-white/8 hover:border-brand/40 bg-white/[0.02] hover:bg-brand/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <v.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="font-body text-sm text-white/65 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
