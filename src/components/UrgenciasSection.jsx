import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const timelineSteps = [
  { img: "/video  seccion de urgencias/img 1.webp", title: "Nos llamas, recibimos el aviso" },
  { img: "/video  seccion de urgencias/img 2.webp", title: "Melisa activa al equipo" },
  { img: "/video  seccion de urgencias/img 3.webp", title: "Salimos de inmediato" },
  { img: "/video  seccion de urgencias/img 4.webp", title: "Llegamos al lugar" },
  { img: "/video  seccion de urgencias/img 5.webp", title: "Diagnosticamos y reparamos" },
  { img: "/video  seccion de urgencias/img 6.webp", title: "Problema resuelto" },
];

export default function UrgenciasSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const heroRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    gsapCtx.current = gsap.context(() => {
      // 1. Efecto Parallax / Fade para el Hero
      const heroContent = document.querySelector('.urgencias-hero-content');
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
          }
        });
      }

      // 2. Horizontal Scroll para el Timeline — SOLO desktop.
      // En móvil renderizamos un stack vertical (sin pin) para que el scroll sea coherente.
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (containerRef.current && isDesktop) {
        const slides = gsap.utils.toArray('.timeline-slide');

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
                ease: "power1.inOut"
              },
              end: () => `+=${containerRef.current?.offsetWidth * slides.length}`
            }
          });

          // Animaciones de revelado dentro de cada slide individual
          slides.forEach((slide) => {
            const title = slide.querySelector('.slide-title');
            const imgContainer = slide.querySelector('.slide-img-container');

            if (title && imgContainer) {
              gsap.fromTo(title,
                { y: 50, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  scrollTrigger: {
                    trigger: slide,
                    start: 'left center', // Cuando el inicio del slide cruza el centro
                    containerAnimation: pinAnimation,
                    toggleActions: "play none none reverse"
                  }
                }
              );

              gsap.fromTo(imgContainer,
                { scale: 0.8, opacity: 0.5 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 1,
                  scrollTrigger: {
                    trigger: slide,
                    start: 'left 80%',
                    containerAnimation: pinAnimation,
                    toggleActions: "play none none reverse"
                  }
                }
              );
            }
          });
        }
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
    <section id="urgencias" className="w-full bg-ink text-surface overflow-hidden relative">
      
      {/* 1. HERO URGENCIAS */}
      <div ref={heroRef} className="relative w-full h-[32vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src="/video  seccion de urgencias/emergencia.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/90 z-10"></div>
        
        {/* Hero Content */}
        <div className="urgencias-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
          <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            Disponibilidad Inmediata
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-surface mb-8 leading-none">
            URGENCIAS<br/> <span className="text-brand">24H, 7 DÍAS</span>
          </h2>
          
          {/* Tagline Animado visual */}
          <div className="bg-surface/10 backdrop-blur-md rounded-full py-3 px-6 md:px-10 flex border border-surface/10 items-center overflow-hidden">
            <div className="flex items-center gap-4 md:gap-6 text-lg md:text-2xl font-body font-light text-surface-200">
              <span className="font-semibold text-surface">Conduciendo</span>
              <div className="flex items-center text-brand">
                  <div className="h-[2px] w-8 md:w-16 bg-brand relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 w-full h-full bg-white/50 animate-[shimmer_2s_infinite]"></div>
                  </div>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -ml-1" />
              </div>
              <span className="font-semibold text-surface">Resuelto</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TIMELINE SCROLL HORIZONTAL — SOLO DESKTOP */}
      {/* Contenedor PIN que ocupa todo el alto pero permite hacer slide horizontal */}
      <div ref={containerRef} className="hidden md:flex h-screen w-full overflow-hidden bg-ink relative z-30">
        <div ref={trackRef} className="flex h-full will-change-transform items-center">
          
          {/* Tarjetas de paso */}
          {timelineSteps.map((step, i) => (
            <div key={i} className="timeline-slide w-screen h-full flex flex-col items-center justify-center px-4 md:px-12 shrink-0 relative">
              
              <div className="slide-img-container relative w-full max-w-5xl aspect-[16/10] md:aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-surface/5">
                <img 
                  src={step.img} 
                  alt={step.title} 
                  width="1280"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover scale-105" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                   <div className="slide-title">
                     <span className="text-brand font-body font-bold text-xl md:text-2xl mb-2 block">Paso 0{i+1}</span>
                     <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface max-w-3xl leading-tight">
                       {step.title}
                     </h3>
                   </div>
                </div>
              </div>
              
            </div>
          ))}
          
          {/* FINAL CTA SLIDE */}
          <div className="timeline-slide w-screen h-full flex flex-col items-center justify-center px-6 shrink-0 bg-brand text-ink relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8 max-w-4xl tracking-tighter leading-none">
                SOLUCIÓN INMEDIATA A TU AVERÍA
              </h2>
              <p className="text-ink/70 font-body text-xl md:text-2xl mb-12 max-w-2xl">
                No esperes más. Nuestro equipo está listo para intervenir. Llegamos rápido, diagnosticamos con precisión y reparamos con garantía.
              </p>
              <a 
                href="#contacto" 
                className="bg-ink text-brand px-12 py-6 rounded-full font-body text-xl font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300 inline-flex items-center gap-4 group hover:shadow-2xl hover:bg-surface"
              >
                Solicitar servicio ahora
                <span className="bg-brand text-ink rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight size={24} strokeWidth={3} />
                </span>
              </a>
            </div>
            
            {/* Elemento gráfico de fondo interactivo */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
               <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
               </svg>
            </div>
          </div>

        </div>
      </div>

      {/* 3. TIMELINE MÓVIL — Pila vertical coherente con el scroll de página */}
      <div className="md:hidden bg-ink py-10">
        <div className="px-4 space-y-4">
          {timelineSteps.map((step, i) => (
            <article
              key={i}
              className="relative overflow-hidden border border-surface/10 rounded-lg"
              style={{ height: '60vw', minHeight: '220px', maxHeight: '320px' }}
            >
              <img
                src={step.img}
                alt={step.title}
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              <div className="absolute top-0 left-0 w-[3px] h-full bg-brand" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-brand font-body font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">
                  Paso 0{i + 1}
                </span>
                <h3 className="text-lg font-heading font-bold text-surface leading-tight">
                  {step.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* CTA móvil */}
        <div className="mx-4 mt-8 bg-brand text-ink p-6 rounded-lg text-center">
          <h2 className="text-2xl font-heading font-black uppercase tracking-tighter leading-none mb-3">
            SOLUCIÓN INMEDIATA A TU AVERÍA
          </h2>
          <p className="text-ink/70 font-body text-sm mb-5">
            No esperes más. Llegamos rápido y reparamos con garantía.
          </p>
          <a
            href="#contacto"
            className="bg-ink text-brand px-6 py-3.5 rounded-full font-body font-bold uppercase tracking-wide inline-flex items-center justify-center gap-2 w-full text-sm"
          >
            Solicitar servicio
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

    </section>
  );
}
