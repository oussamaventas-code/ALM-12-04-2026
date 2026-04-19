import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const patrociniosSteps = [
  { img: "/imagenes patrocinios/imag 1.webp", title: "Inauguración de Temporada" },
  { img: "/imagenes patrocinios/imag 2.webp", title: "Encuentro en el Estadio" },
  { img: "/imagenes patrocinios/imag 3.webp", title: "Comprometidos desde la base" },
  { img: "/imagenes patrocinios/imag 4.webp", title: "Victoria Local" },
  { img: "/imagenes patrocinios/imag 5.webp", title: "Momento Clave" },
  { img: "/imagenes patrocinios/imag 6.webp", title: "Entrega de Trofeos" }
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
          }
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
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
  );
}

function PatrociniosDesktop() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.patrocinios-slide-desktop');
      if (slides.length > 0 && containerRef.current) {
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
            end: () => `+=${containerRef.current.offsetWidth * slides.length}`
          }
        });

        slides.forEach((slide) => {
          const title = slide.querySelector('.slide-title');
          const imgContainer = slide.querySelector('.slide-img-container');
          if (title && imgContainer) {
            gsap.fromTo(title,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1,
                scrollTrigger: { trigger: slide, start: 'left center', containerAnimation: pinAnimation, toggleActions: "play none none reverse" }
              }
            );
            gsap.fromTo(imgContainer,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1,
                scrollTrigger: { trigger: slide, start: 'left 80%', containerAnimation: pinAnimation, toggleActions: "play none none reverse" }
              }
            );
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="hidden lg:block w-full">
      <div ref={containerRef} className="h-screen w-full flex overflow-hidden bg-ink relative z-30">
        <div ref={trackRef} className="flex h-full will-change-transform items-center">
          {patrociniosSteps.map((step, i) => (
            <div key={i} className="patrocinios-slide-desktop w-screen h-full flex flex-col items-center justify-center px-12 shrink-0 relative">
              <div className="slide-img-container relative w-full flex items-center justify-center aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-surface/10 bg-dark-800">
                <img
                  src={step.img}
                  alt={step.title}
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain relative z-0 transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12 z-10">
                  <div className="slide-title">
                    <span className="text-brand font-body font-bold text-xl mb-1 block">Foto 0{i+1}</span>
                    <h3 className="text-5xl font-heading font-bold text-surface max-w-3xl leading-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* FINAL CARD */}
          <div className="patrocinios-slide-desktop w-screen h-full flex flex-col items-center justify-center px-6 shrink-0 bg-brand text-ink relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <Trophy size={60} className="mb-6" />
              <h2 className="text-7xl font-heading font-black mb-6 max-w-3xl tracking-tighter leading-none">
                MUCHO MÁS QUE INSTALACIONES ELÉCTRICAS
              </h2>
              <p className="text-ink/80 font-body text-2xl mb-10 max-w-2xl font-medium">
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
    </div>
  );
}

function PatrociniosMobile() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.patrocinios-slide-mobile');
      slides.forEach((slide) => {
        gsap.fromTo(slide,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="block lg:hidden w-full bg-ink px-4 py-16 relative z-30">
      <div className="flex flex-col gap-8">
        {patrociniosSteps.map((step, i) => (
          <div key={i} className="patrocinios-slide-mobile relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-surface/10 bg-dark-800">
            <img
              src={step.img}
              alt={step.title}
              width="400"
              height="300"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 z-10">
              <span className="text-brand font-body font-bold text-lg mb-1 block">Foto 0{i+1}</span>
              <h3 className="text-2xl font-heading font-bold text-surface leading-tight">
                {step.title}
              </h3>
            </div>
          </div>
        ))}
        
        {/* FINAL CARD */}
        <div className="patrocinios-slide-mobile w-full rounded-2xl flex flex-col items-center justify-center p-8 bg-brand text-ink text-center">
          <Trophy size={48} className="mb-4" />
          <h2 className="text-3xl font-heading font-black mb-4 tracking-tighter leading-tight">
            MUCHO MÁS QUE INSTALACIONES ELÉCTRICAS
          </h2>
          <p className="text-ink/80 font-body text-lg mb-8 font-medium">
            Alm Electricidad patrocina proyectos con la misma excelencia técnica que entregamos todos los días a nuestros clientes.
          </p>
          <a
            href="/#contacto"
            className="bg-ink text-brand px-6 py-3 rounded-full font-body text-lg font-bold uppercase tracking-wide inline-flex items-center gap-2 group w-full justify-center"
          >
            Cuenta con nosotros
            <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PatrociniosSection() {
  return (
    <section className="w-full bg-ink text-surface overflow-hidden relative">
      <PatrociniosHero />
      <PatrociniosDesktop />
      <PatrociniosMobile />
    </section>
  );
}
