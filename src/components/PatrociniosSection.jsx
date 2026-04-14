import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const patrociniosSteps = [
  { img: "/imagenes patrocinios/imag 1.webp", title: "Inauguración de Temporada" },
  { img: "/imagenes patrocinios/imag 2.webp", title: "Encuentro en el Estadio" },
  { img: "/imagenes patrocinios/imag 3.webp", title: "Comprometidos desde la base" },
  { img: "/imagenes patrocinios/imag 4.webp", title: "Victoria Local" },
  { img: "/imagenes patrocinios/imag 5.webp", title: "Momento Clave" },
  { img: "/imagenes patrocinios/imag 6.webp", title: "Entrega de Trofeos" }
];

export default function PatrociniosSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const heroRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    gsapCtx.current = gsap.context(() => {
      // 1. Efecto Parallax para el Hero
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
          }
        });
      }

      // 2. Horizontal Scroll para el Timeline (Carrusel de fotos)
      if (containerRef.current) {
        const slides = gsap.utils.toArray('.patrocinios-slide');

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

          // Animations for items inside the slide as it appears
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
                    start: 'left center',
                    containerAnimation: pinAnimation,
                    toggleActions: "play none none reverse"
                  }
                }
              );

              gsap.fromTo(imgContainer,
                { scale: 0.8, opacity: 0 },
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
    <section className="w-full bg-ink text-surface overflow-hidden relative">
      
      {/* 1. HERO PATROCINIOS */}
      <div ref={heroRef} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Usamos una de las imágenes como fondo principal */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url('/imagenes patrocinios/imag 5.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink z-10"></div>
        
        <div className="patrocinios-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
          <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
            <Trophy className="text-brand w-5 h-5" />
            Nuestros Patrocinios
            <Trophy className="text-brand w-5 h-5" />
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-surface mb-6 leading-none">
            APOYO AL <span className="text-brand">DEPORTE LOCAL</span>
          </h2>
          <p className="text-xl md:text-2xl font-body font-light max-w-2xl text-surface-200">
            Creemos en los valores comunitarios, el esfuerzo en equipo y en impulsar el talento de nuestra tierra hacia el futuro.
          </p>
        </div>
      </div>

      {/* 2. TIMELINE SCROLL HORIZONTAL (GALERÍA) */}
      <div ref={containerRef} className="h-screen w-full flex overflow-hidden bg-ink relative z-30">
        <div ref={trackRef} className="flex h-full will-change-transform items-center">
          
          {patrociniosSteps.map((step, i) => (
            <div key={i} className="patrocinios-slide w-screen h-full flex flex-col items-center justify-center px-4 md:px-12 shrink-0 relative">
              <div className="slide-img-container relative w-full flex items-center justify-center aspect-[16/10] md:aspect-video rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-surface/10 bg-dark-800">
                <img 
                  src={step.img} 
                  alt={step.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover md:object-contain relative z-0 transition-transform duration-700 hover:scale-[1.03]" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 z-10">
                   <div className="slide-title">
                     <span className="text-brand font-body font-bold text-lg md:text-xl md:mb-1 block">Foto 0{i+1}</span>
                     <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-surface max-w-3xl leading-tight">
                       {step.title}
                     </h3>
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* FINAL CARD */}
          <div className="patrocinios-slide w-screen h-full flex flex-col items-center justify-center px-6 shrink-0 bg-brand text-ink relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <Trophy size={60} className="mb-6" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 max-w-3xl tracking-tighter leading-none">
                MUCHO MÁS QUE INSTALACIONES ELÉCTRICAS
              </h2>
              <p className="text-ink/80 font-body text-xl md:text-2xl mb-10 max-w-2xl font-medium">
                Alm Electricidad patrocina proyectos con la misma excelencia técnica que entregamos todos los días a nuestros clientes.
              </p>
              <a 
                href="/#contacto" 
                className="bg-ink text-brand px-10 py-5 rounded-full font-body text-xl font-bold uppercase tracking-wide hover:scale-105 transition-transform inline-flex items-center gap-3 group"
              >
                Cuenta con nosotros
                <ArrowRight className="group-hover:-rotate-45 transition-transform" />
              </a>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
}
