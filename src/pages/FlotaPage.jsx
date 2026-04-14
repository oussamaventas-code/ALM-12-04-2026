import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Wrench, Shield, Package, Phone } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const vehicles = [
  {
    name: 'Furgoneta Técnica 01',
    type: 'Taller Móvil',
    desc: 'Equipada con herramienta de precisión y material de instalación completo para obras residenciales y comerciales.',
    specs: ['Material para cuadros eléctricos completos', 'Herramienta de verificación y certificación', 'Cable prefijado en bobinas para respuesta rápida'],
    image: '/images/flota/Professional_commercial_fleet_202604082305.png',
  },
  {
    name: 'Furgoneta Técnica 02',
    type: 'Urgencias y Averías',
    desc: 'Unidad de respuesta rápida 24h para urgencias. Equipada con material de reposición inmediata.',
    specs: ['Material de reposición inmediata', 'Diagnóstico de averías en campo', 'Operativa 24h / 365 días'],
    image: '/images/flota/Professional_3_4_side_202604082308.png',
  },
  {
    name: 'Furgoneta Técnica 03',
    type: 'Proyectos Especiales',
    desc: 'Para grandes obras, instalaciones industriales y proyectos fotovoltaicos que requieren material voluminoso.',
    specs: ['Capacidad de carga ampliada', 'Grúa de carga integrada', 'Material para instalaciones solares'],
    image: '/images/flota/Dynamic_3_4_front_202604082312.webp',
  },
];

const whyFleet = [
  { icon: Package, title: 'Material siempre disponible', desc: 'Cada furgoneta sale a obra con el material necesario. Sin esperas ni viajes de vuelta al almacén.' },
  { icon: Wrench, title: 'Herramienta profesional', desc: 'Equipos de medición, verificación y certificación propios. Herramienta de calidad industrial en cada trabajo.' },
  { icon: Shield, title: 'Uniformidad y seriedad', desc: 'Vehículos identificados con nuestra marca. Sabes perfectamente quién viene a tu casa o empresa.' },
  { icon: Truck, title: 'Capacidad de respuesta', desc: 'Con 3 unidades operativas podemos atender varios proyectos simultáneamente sin comprometer la calidad.' },
];

export default function FlotaPage() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    gsapCtx.current = gsap.context(() => {
      // Parallax hero content
      const heroContent = document.querySelector('.flota-hero-content');
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

      // Horizontal scroll gallery — igual que Patrocinios
      if (containerRef.current) {
        const slides = gsap.utils.toArray('.flota-slide');

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

      // Why fleet cards
      const whyGrid = document.querySelector('.why-grid');
      const whyCards = document.querySelectorAll('.why-card');

      if (whyGrid && whyCards.length > 0) {
        gsap.fromTo(
          whyCards,
          { x: -20, autoAlpha: 0 },
          {
            x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: whyGrid, start: 'top 85%', once: true },
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
        title="Nuestra Flota y Equipamiento — ALMelectricidad"
        description="Vehículos y herramientas especializadas para instalaciones eléctricas profesionales en Madrid y Toledo. Equipamiento de máxima calidad."
        canonical="/flota"
      />

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/flota/Professional_commercial_fleet_202604082305.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark z-10" />

        <div className="flota-hero-content relative z-20 text-center flex flex-col items-center px-6 mt-16 md:mt-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-8"
          >
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>
          <span className="text-brand font-body text-sm md:text-base tracking-[0.2em] uppercase font-semibold mb-6 flex items-center gap-3">
            <Truck className="text-brand w-5 h-5" />
            Nuestra Flota
            <Truck className="text-brand w-5 h-5" />
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tighter text-white mb-6 leading-none">
            EQUIPADOS PARA <span className="text-brand">CADA PROYECTO</span>
          </h1>
          <p className="text-xl md:text-2xl font-body font-light max-w-2xl text-white/70">
            Cada furgoneta sale a obra con el material completo y la herramienta adecuada. Organización y disponibilidad como parte del trabajo bien hecho.
          </p>
        </div>
      </div>

      {/* ── GALERÍA HORIZONTAL ── */}
      <div ref={containerRef} className="h-screen w-full flex overflow-hidden bg-dark relative z-30">
        <div className="flex h-full will-change-transform items-center">

          {vehicles.map((v, i) => (
            <div
              key={i}
              className="flota-slide w-screen h-full flex flex-col items-center justify-center px-4 md:px-12 shrink-0 relative"
            >
              <div className="slide-img-container relative w-full flex items-center justify-center aspect-[16/10] md:aspect-video rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-dark-800">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover md:object-contain relative z-0 transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 z-10">
                  <div className="slide-title">
                    <span className="text-brand font-body font-bold text-lg md:text-xl block mb-1">
                      {v.type}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white max-w-3xl leading-tight mb-3">
                      {v.name}
                    </h3>
                    <p className="text-white/60 font-body text-sm md:text-base max-w-lg mb-3 hidden md:block">
                      {v.desc}
                    </p>
                    <ul className="hidden md:flex flex-wrap gap-x-6 gap-y-1">
                      {v.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-1.5 text-xs text-white/50 font-body">
                          <span className="text-brand">✓</span> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide final — CTA */}
          <div className="flota-slide w-screen h-full flex flex-col items-center justify-center px-6 shrink-0 bg-brand text-dark relative">
            <div className="relative z-10 flex flex-col items-center text-center">
              <Truck size={60} className="mb-6" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-6 max-w-3xl tracking-tighter leading-none">
                LISTOS PARA TU PROYECTO
              </h2>
              <p className="text-dark/70 font-body text-xl md:text-2xl mb-10 max-w-2xl font-medium">
                3 unidades operativas, material completo y técnicos cualificados. Sin esperas.
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

      {/* ── POR QUÉ IMPORTA ── */}
      <section className="py-24 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Por qué importa</span>
            <h2 className="section-title mt-3 text-white">
              Una flota propia marca la diferencia
            </h2>
          </div>
          <div className="why-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFleet.map((w) => (
              <div
                key={w.title}
                className="why-card p-6 border border-white/8 hover:border-brand/40 bg-white/[0.02] hover:bg-brand/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <w.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2">{w.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
