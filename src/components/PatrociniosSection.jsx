import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Trophy, MapPin, Star, Heart, Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger ya está registrado globalmente en App.jsx

/* ─── DATOS ─────────────────────────────────────────────────────────────── */

const fotosCiclismo = [
  { img: '/imagenes patrocinios/imag 1.webp', caption: 'En plena ruta' },
  { img: '/imagenes patrocinios/imag 2.webp', caption: 'Esfuerzo y dedicación' },
  { img: '/imagenes patrocinios/imag 3.webp', caption: 'Trabajo en equipo' },
  { img: '/imagenes patrocinios/imag 4.webp', caption: 'Superando obstáculos' },
  { img: '/imagenes patrocinios/imag 5.webp', caption: 'Llegando a la meta' },
  { img: '/imagenes patrocinios/imag 6.webp', caption: 'Constancia diaria' },
];

const valoresFutbolSala = [
  { icon: Zap,   label: 'Energía',    desc: 'Un proyecto que comparte nuestra filosofía: hacer las cosas con potencia y precisión.' },
  { icon: Users, label: 'Equipo',     desc: 'Como en cada instalación, el resultado lo construye el equipo al completo.' },
  { icon: Heart, label: 'Compromiso', desc: 'Apoyar el deporte de cantera es apostar por el futuro de nuestra tierra.' },
];

/* ─── HERO ───────────────────────────────────────────────────────────────── */

function PatrociniosHero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroContent = heroRef.current?.querySelector('.patrocinios-hero-content');
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
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con foto ciclismo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('/imagenes patrocinios/imag 5.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark z-10" />

      <div className="patrocinios-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
        <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
          <Trophy className="text-brand w-5 h-5" />
          Nuestros patrocinios
          <Trophy className="text-brand w-5 h-5" />
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter text-white mb-6 leading-none">
          Apoyando al <span className="text-brand">deporte local</span>
        </h1>
        <p className="text-lg md:text-xl font-body font-light max-w-2xl text-white/70">
          El deporte enseña constancia, esfuerzo y compañerismo. Por eso
          aportamos nuestro granito de arena a los proyectos que tenemos cerca.
        </p>
      </div>
    </div>
  );
}

/* ─── SECCIÓN 1: CICLISMO ────────────────────────────────────────────────── */

function CiclismoBlock() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const head = ref.current ? ref.current.querySelector('.ciclismo-head') : null;
      if (head) {
        gsap.from(head, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        });
      }
      const cards = ref.current ? gsap.utils.toArray('.ciclismo-card', ref.current) : [];
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current.querySelector('.ciclismo-grid'), start: 'top 85%', once: true },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-dark-800/30 py-20 md:py-28 overflow-hidden">
      {/* Separador visual */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand/40 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="ciclismo-head max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
            <Trophy size={14} className="text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">
              Patrocinio activo
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tighter">
            Pasión por el{' '}
            <span className="text-brand">Ciclismo Local</span>
          </h2>
          <div className="flex items-center gap-2 text-white/50 mb-5">
            <MapPin size={16} className="text-brand" />
            <span className="font-body text-sm">Carreteras de la región</span>
          </div>
          <p className="text-white/65 font-body text-lg leading-relaxed max-w-2xl">
            Acompañamos a los ciclistas de nuestra zona. Es una manera de
            estar cerca del deporte, fomentando la resistencia, el esfuerzo diario y el afán de superación, 
            valores fundamentales que también aplicamos en cada uno de nuestros proyectos eléctricos.
          </p>
        </div>

        {/* Galería fotos */}
        <div className="ciclismo-grid grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotosCiclismo.map((f, i) => (
            <figure
              key={i}
              className="ciclismo-card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/8 bg-dark-800 group"
            >
              <img
                src={f.img}
                alt={f.caption}
                width="600"
                height="450"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-xs md:text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECCIÓN 2: FÚTBOL SALA ─────────────────────────────────────────────── */

function FutbolSalaBlock() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current ? gsap.utils.toArray('.fs-fade', ref.current) : [];
      if (items.length > 0) {
        gsap.from(items, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        });
      }
      const cards = ref.current ? gsap.utils.toArray('.fs-value-card', ref.current) : [];
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.fs-value-cards', start: 'top 85%', once: true },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-dark via-dark-800/60 to-dark"
    >
      {/* Glow brand */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Columna texto */}
          <div>
            <div className="fs-fade inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-6">
              <Star size={14} className="text-brand" />
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">
                Patrocinio activo
              </span>
            </div>

            <h2 className="fs-fade font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter mb-6">
              Fútbol Sala
              <span className="block text-brand">x ALM Electricidad</span>
            </h2>

            <div className="fs-fade flex items-center gap-2 text-white/50 mb-6">
              <MapPin size={16} className="text-brand" />
              <span className="font-body text-sm">Bargas, Toledo</span>
            </div>

            <p className="fs-fade text-white/70 font-body text-lg leading-relaxed mb-4">
              Estamos orgullosos de apoyar al equipo de fútbol sala de Bargas, un proyecto deportivo de cantera con el
              que compartimos valores: trabajo bien hecho, compañerismo y orgullo
              de pertenecer a nuestro pueblo.
            </p>

            <p className="fs-fade text-white/50 font-body text-base leading-relaxed mb-10">
              Un patrocinio que nace de la cercanía y del convencimiento de que
              las empresas locales tenemos que empujar a los equipos locales para mantener viva la afición.
            </p>

            {/* Cards valores */}
            <div className="fs-value-cards grid sm:grid-cols-3 gap-4">
              {valoresFutbolSala.map((v) => (
                <div
                  key={v.label}
                  className="fs-value-card p-4 border border-white/8 hover:border-brand/30 bg-white/[0.02] hover:bg-brand/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-brand/10 flex items-center justify-center mb-3 group-hover:bg-brand/20 transition-colors">
                    <v.icon size={16} className="text-brand" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-white mb-1">{v.label}</h3>
                  <p className="font-body text-xs text-white/55 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna imágenes Futsal */}
          <div className="fs-fade relative flex flex-col gap-4">
            {/* Foto equipo */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-dark-800 shadow-2xl shadow-brand/10 group">
              <img
                src="/imagenes patrocinios/futbol-sala-equipo.webp"
                alt="Equipo AD Bargas F.S. — Patrocinado por ALM Electricidad"
                width="800" height="450"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-brand text-dark text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                Patrocinador oficial
              </div>
            </div>

            {/* Foto Jorge + jugador con bufanda */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-dark-800 shadow-xl shadow-black/30 group">
              <img
                src="/imagenes patrocinios/futbol-sala-jorge.webp"
                alt="Jorge Hernández con jugador del AD Bargas F.S."
                width="800" height="600"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-body text-xs text-white/80 font-semibold uppercase tracking-widest">
                Jorge Hernández · Fundador ALM Electricidad
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── CIERRE ─────────────────────────────────────────────────────────────── */

function CierreBlock() {
  return (
    <section className="relative py-20 md:py-24 bg-brand text-dark overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Trophy size={48} className="mx-auto mb-6" />
        <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tighter">
          Apoyamos lo que tenemos cerca
        </h2>
        <p className="font-body text-lg md:text-xl text-dark/70 mb-8 leading-relaxed">
          No somos una multinacional patrocinando equipos famosos. Somos una
          empresa local apoyando proyectos de nuestra zona — con honestidad y
          dentro de nuestras posibilidades.
        </p>
        <a
          href="/contacto"
          className="inline-flex items-center gap-3 bg-dark text-brand px-8 py-4 font-body text-base font-bold uppercase tracking-wide hover:scale-105 transition-transform group"
        >
          Habla con nosotros
          <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform" />
        </a>
      </div>
    </section>
  );
}

/* ─── EXPORT ─────────────────────────────────────────────────────────────── */

export default function PatrociniosSection() {
  return (
    <section className="w-full bg-dark text-white overflow-hidden relative">
      <PatrociniosHero />
      <CiclismoBlock />
      <FutbolSalaBlock />
      <CierreBlock />
    </section>
  );
}
