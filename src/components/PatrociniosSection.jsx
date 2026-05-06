import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Trophy, Bike, MapPin, Shirt, Palette, Sparkles } from 'lucide-react';
import gsap from 'gsap';

// ScrollTrigger ya está registrado globalmente en App.jsx

const fotosFutbolSala = [
  { img: '/imagenes patrocinios/imag 1.webp', caption: 'Inauguración de temporada' },
  { img: '/imagenes patrocinios/imag 2.webp', caption: 'Encuentro en el estadio' },
  { img: '/imagenes patrocinios/imag 3.webp', caption: 'Comprometidos desde la base' },
  { img: '/imagenes patrocinios/imag 4.webp', caption: 'Victoria local' },
  { img: '/imagenes patrocinios/imag 5.webp', caption: 'Momento clave' },
  { img: '/imagenes patrocinios/imag 6.webp', caption: 'Entrega de trofeos' },
];

function PatrociniosHero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroContent = document.querySelector('.patrocinios-hero-content');
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
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('/imagenes patrocinios/imag 5.webp')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink z-10" />

      <div className="patrocinios-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
        <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
          <Trophy className="text-brand w-5 h-5" />
          Nuestros patrocinios
          <Trophy className="text-brand w-5 h-5" />
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter text-surface mb-6 leading-none">
          Apoyando al <span className="text-brand">deporte local</span>
        </h1>
        <p className="text-lg md:text-xl font-body font-light max-w-2xl text-surface-200">
          El deporte enseña constancia, esfuerzo y compañerismo. Por eso intentamos
          aportar nuestro granito de arena a los proyectos cercanos.
        </p>
      </div>
    </div>
  );
}

function FutbolSalaBlock() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fs-head', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
      gsap.from('.fs-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.fs-grid', start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-ink py-20 md:py-28 overflow-hidden">
      <div className="container-custom px-6">
        <div className="fs-head max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
            <Trophy size={14} className="text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">
              Patrocinio activo
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-surface leading-tight mb-4">
            Equipo de Fútbol Sala de{' '}
            <span className="text-brand">Bargas (Toledo)</span>
          </h2>
          <div className="flex items-center gap-2 text-surface-200/70 mb-5">
            <MapPin size={16} className="text-brand" />
            <span className="font-body text-sm">Bargas, Toledo</span>
          </div>
          <p className="text-surface-200 font-body text-lg leading-relaxed max-w-2xl">
            Acompañamos a un equipo de fútbol sala de Bargas. Es una manera de
            estar cerca de la gente del pueblo y apoyar el deporte de cantera, que
            al final es el que mantiene viva la afición.
          </p>
        </div>

        <div className="fs-grid grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotosFutbolSala.map((f, i) => (
            <figure
              key={i}
              className="fs-card relative aspect-[4/3] rounded-xl overflow-hidden border border-surface/10 bg-dark-800 group"
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
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-surface text-xs md:text-sm font-body">
                {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CiclismoBlock() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cic-fade', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-ink via-dark-800 to-ink"
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/8 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-custom px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="cic-fade inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
              <Sparkles size={14} className="text-brand" />
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">
                Próximamente — proyecto propio
              </span>
            </div>

            <h2 className="cic-fade font-heading text-3xl md:text-5xl font-bold text-surface leading-tight mb-5">
              Equipación de ciclismo{' '}
              <span className="text-brand">ALM Electricidad</span>
            </h2>

            <p className="cic-fade text-surface-200 font-body text-lg leading-relaxed mb-5">
              El ciclismo enseña paciencia, constancia y trabajo en equipo —
              valores que intentamos llevar también a cada instalación. Por eso
              estamos diseñando nuestra propia equipación, para rodar y dar
              visibilidad al oficio.
            </p>

            <p className="cic-fade text-surface-200/70 font-body text-base leading-relaxed mb-8">
              Es un proyecto que nace pequeño: empezar con un grupo, salir los fines
              de semana y, poco a poco, hacerlo realidad sobre la carretera.
            </p>

            <ul className="cic-fade space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Shirt size={18} className="text-brand mt-0.5 shrink-0" />
                <span className="text-surface-200 text-sm leading-relaxed">
                  <strong className="text-surface">Maillot:</strong> negro principal
                  con franjas amarillas en hombros y costados — logo ALM al pecho.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Palette size={18} className="text-brand mt-0.5 shrink-0" />
                <span className="text-surface-200 text-sm leading-relaxed">
                  <strong className="text-surface">Colores:</strong> negro grafito y
                  amarillo eléctrico — los mismos de la marca.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Bike size={18} className="text-brand mt-0.5 shrink-0" />
                <span className="text-surface-200 text-sm leading-relaxed">
                  <strong className="text-surface">Filosofía:</strong> "no gana el más
                  rápido, gana el que no para" — la misma mentalidad que aplicamos al
                  trabajo eléctrico.
                </span>
              </li>
            </ul>

            <a
              href="/contacto"
              className="cic-fade inline-flex items-center gap-2 text-brand font-body font-semibold hover:gap-3 transition-all group"
            >
              ¿Te apetece rodar con nosotros?
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mockup visual */}
          <div className="cic-fade relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-brand/30 bg-gradient-to-br from-dark-800 via-ink to-dark-800 p-8 flex items-center justify-center shadow-2xl shadow-brand/10">
              {/* Maillot mockup */}
              <div className="relative w-full max-w-[280px] aspect-[3/4]">
                {/* Cuerpo */}
                <div className="absolute inset-x-[15%] inset-y-0 bg-gradient-to-b from-[#0F0F12] via-[#1A1A20] to-[#0F0F12] rounded-t-[40%] rounded-b-2xl border border-white/10">
                  {/* Cuello */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-brand rounded-b-full" />
                  {/* Franja diagonal amarilla */}
                  <div className="absolute top-[20%] left-0 right-0 h-3 bg-brand opacity-90" />
                  <div className="absolute top-[24%] left-0 right-0 h-1 bg-brand-glow opacity-70" />
                  {/* Logo ALM */}
                  <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-center">
                    <span className="font-heading font-black text-3xl text-brand tracking-tight">ALM</span>
                    <p className="text-white/50 text-[9px] uppercase tracking-[0.3em] mt-0.5">Electricidad</p>
                  </div>
                  {/* Franja inferior */}
                  <div className="absolute bottom-[8%] left-0 right-0 h-2 bg-brand opacity-80" />
                  <div className="absolute bottom-[5%] left-0 right-0 h-px bg-brand-glow" />
                </div>
                {/* Mangas */}
                <div className="absolute top-[5%] left-0 w-[20%] h-[35%] bg-gradient-to-br from-brand to-brand-glow rounded-tl-2xl rounded-br-xl" />
                <div className="absolute top-[5%] right-0 w-[20%] h-[35%] bg-gradient-to-bl from-brand to-brand-glow rounded-tr-2xl rounded-bl-xl" />
              </div>

              {/* Etiqueta esquina */}
              <div className="absolute top-4 right-4 bg-brand text-ink text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Mockup
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white/50 text-xs font-body italic">
                  Diseño preliminar · pendiente de fabricación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CierreBlock() {
  return (
    <section className="relative py-20 md:py-24 bg-brand text-ink overflow-hidden">
      <div className="container-custom px-6 text-center max-w-3xl mx-auto">
        <Trophy size={48} className="mx-auto mb-6" />
        <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 leading-tight">
          Apoyamos lo que tenemos cerca
        </h2>
        <p className="font-body text-lg md:text-xl text-ink/80 mb-8 leading-relaxed">
          No somos una multinacional patrocinando equipos famosos. Somos una empresa
          local apoyando proyectos de nuestra zona — con honestidad y dentro de
          nuestras posibilidades.
        </p>
        <a
          href="/contacto"
          className="inline-flex items-center gap-3 bg-ink text-brand px-8 py-4 rounded-full font-body text-base font-bold uppercase tracking-wide hover:scale-105 transition-transform group"
        >
          Habla con nosotros
          <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform" />
        </a>
      </div>
    </section>
  );
}

export default function PatrociniosSection() {
  return (
    <section className="w-full bg-ink text-surface overflow-hidden relative">
      <PatrociniosHero />
      <FutbolSalaBlock />
      <CiclismoBlock />
      <CierreBlock />
    </section>
  );
}
