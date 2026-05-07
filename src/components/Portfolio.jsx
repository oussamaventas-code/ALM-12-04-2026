import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const projects = [
  {
    image: '/images/portfolio/bbf912ac-5634-4e6f-ad8d-b83fdf356274.webp',
    title: 'Revisión de armario exterior',
    type: 'Mantenimiento',
    result: 'Medición y diagnóstico en armario de distribución exterior. Trabajo certificado.',
  },
  {
    image: '/images/portfolio/f015c7ac-f508-4a30-bde0-3dfdb7713f23.webp',
    title: 'Instalación fotovoltaica residencial',
    type: 'Autoconsumo',
    result: 'Paneles solares de alta eficiencia en cubierta inclinada. Legalización incluida.',
  },
  {
    image: '/images/portfolio/8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.webp',
    title: 'Cuadros eléctricos en nave industrial',
    type: 'Industrial',
    result: 'Instalación de cuadros de mando y protecciones en nave. Certificado REBT.',
  },
  {
    image: '/images/portfolio/e6948f9c-0f62-4771-bf42-8c308b96c351.webp',
    title: 'Autoconsumo en vivienda unifamiliar',
    type: 'Autoconsumo',
    result: 'Sistema fotovoltaico en tejado. Ahorro desde el primer mes.',
  },
  {
    image: '/images/portfolio/2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.webp',
    title: 'Cuadro de distribución exterior',
    type: 'Alta potencia',
    result: 'Cuadro eléctrico con protecciones de última generación instalado en exterior.',
  },
  {
    image: '/images/portfolio/0c1c3c06-f1d5-4f04-91a8-1381e29dd650.webp',
    title: 'Solar en cubierta plana comercial',
    type: 'Autoconsumo',
    result: 'Instalación fotovoltaica para autoconsumo en cubierta de edificio comercial.',
  },
];

function PortfolioDesktop() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    // No registrar ScrollTriggers en móvil — el componente está oculto (hidden lg:block)
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      // Total horizontal distance to scroll
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

      // Title parallax
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

      // Card stagger reveal — triggered by horizontal progress
      gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
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
      id="portfolio"
      ref={sectionRef}
      className="bg-surface-200 overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="container-custom px-6 pt-16 pb-8 shrink-0">
          <div className="flex items-end justify-between">
            <div ref={titleRef}>
              <span className="section-label mb-4 block">Proyectos reales</span>
              <h2 className="section-title">
                Esto no son renders.
                <br />
                <span className="text-gradient-brand">Son trabajos nuestros.</span>
              </h2>
            </div>
            <p className="section-subtitle hidden md:block max-w-xs text-right">
              Cada foto es de un proyecto real.
              <br />
              Sin retoques ni imágenes de banco.
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-visible pl-8">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform pr-8"
            style={{ width: 'max-content' }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                className="portfolio-card group relative overflow-hidden cursor-pointer shrink-0 rounded-sm"
                style={{
                  width: 'clamp(280px, 35vw, 520px)',
                  height: '70vh',
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  width="520"
                  height="700"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7">
                  <span
                    className="font-body text-xs font-semibold uppercase tracking-[0.15em]"
                    style={{ color: 'var(--color-brand-light)' }}
                  >
                    {p.type}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white mt-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mt-2 leading-relaxed">
                    {p.result}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-dark/85 backdrop-blur-sm px-5 py-3 group-hover:opacity-0 transition-opacity duration-400">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-body text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: 'var(--color-brand)' }}
                    >
                      {p.type}
                    </span>
                    <span className="font-heading text-sm font-semibold text-white/90">
                      {p.title}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-0 left-0 w-[3px] h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"
                  style={{ background: 'var(--color-brand)' }}
                />
                <div className="absolute top-4 left-4 font-heading font-black text-5xl text-white/[0.12] leading-none select-none pointer-events-none group-hover:text-white/20 transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
            <div className="shrink-0 w-8" />
          </div>
        </div>

        <div className="container-custom px-6 pb-6 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-brand/40" />
            <span className="font-body text-xs text-white/50 uppercase tracking-[0.12em]">
              Desliza para ver más proyectos
            </span>
          </div>
          <Link 
            to="/proyectos" 
            className="hidden md:inline-flex items-center justify-center bg-brand text-dark font-body font-bold text-sm px-6 py-3 hover:bg-white transition-colors duration-300"
          >
            Ver más trabajos realizados
          </Link>
        </div>
      </div>
    </section>
  );
}

function PortfolioMobile() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.portfolio-card-mobile');
      if (cards.length > 0) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, autoAlpha: 0, rotation: -2 + (i % 2 === 0 ? -1 : 1) * 0.8 },
            {
              y: 0,
              autoAlpha: 1,
              rotation: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="bg-surface-200 overflow-hidden py-16"
    >
      <div className="container-custom px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label mb-4 block">Proyectos reales</span>
          <h2 className="section-title">
            Esto no son renders.
            <br />
            <span className="text-gradient-brand">Son trabajos nuestros.</span>
          </h2>
          <p className="section-subtitle text-sm mt-4 text-white/60">
            Cada foto es de un proyecto real. Sin retoques ni imágenes de banco.
          </p>
        </div>

        {/* Vertical carousel */}
        <div className="flex flex-col gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className="portfolio-card-mobile group relative overflow-hidden cursor-pointer rounded-sm"
              style={{
                width: '100%',
                height: '45vh',
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                width="400"
                height="300"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                <span
                  className="font-body text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: 'var(--color-brand-light)' }}
                >
                  {p.type}
                </span>
                <h3 className="font-heading text-lg font-bold text-white mt-2 leading-snug">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-white/60 mt-2 leading-relaxed">
                  {p.result}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-dark/85 backdrop-blur-sm px-4 py-2 group-hover:opacity-0 [@media(hover:none)]:hidden transition-opacity duration-400">
                <div className="flex items-center justify-between">
                  <span
                    className="font-body text-[9px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    {p.type}
                  </span>
                  <span className="font-heading text-xs font-semibold text-white/90">
                    {p.title}
                  </span>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-[2px] h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"
                style={{ background: 'var(--color-brand)' }}
              />
              <div className="absolute top-3 left-3 font-heading font-black text-4xl text-white/[0.07] leading-none select-none pointer-events-none group-hover:text-white/[0.12] transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-brand/40" />
            <span className="font-body text-xs text-white/30 uppercase tracking-[0.12em]">
              Desplázate para ver más proyectos
            </span>
          </div>
          <Link 
            to="/proyectos" 
            className="inline-flex items-center justify-center bg-brand text-dark font-body font-bold text-sm px-6 py-4 w-full text-center hover:bg-white transition-colors duration-300"
          >
            Ver más trabajos realizados
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <div className="hidden lg:block">
        <PortfolioDesktop />
      </div>
      <div className="lg:hidden">
        <PortfolioMobile />
      </div>
    </>
  );
}
