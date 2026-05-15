import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plug, Zap, Sun, Lightbulb, FileCheck, Wifi, BatteryCharging,
  AlertCircle, Factory, ArrowRight, CheckCircle, Phone,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';
import { services } from '../data/services';

const iconMap = { Plug, Zap, Sun, Lightbulb, FileCheck, Wifi, BatteryCharging };

// Servicios especiales (no están en services.js porque tienen página propia)
const extras = [
  {
    slug: null,
    to: '/urgencias',
    title: 'Urgencias 24h',
    subtitle: 'Respuesta en 30–60 min',
    shortDesc: 'Cortocircuitos, apagones y averías graves a cualquier hora del día o la noche.',
    icon: AlertCircle,
    highlight: true,
    image: '/video  seccion de urgencias/img 1.webp',
    bullets: ['Atención 24h, 365 días', 'Madrid en 30–60 min', 'Sin recargo si lo decimos antes'],
  },
  {
    slug: null,
    to: '/fotovoltaica',
    title: 'Fotovoltaica Industrial',
    subtitle: 'Autoconsumo a gran escala',
    shortDesc: 'Diseño e instalación de plantas fotovoltaicas para naves, polígonos y grandes consumidores.',
    icon: Factory,
    highlight: false,
    image: '/images/services/solares.webp',
    bullets: ['Desde 50 kWp', 'Legalización completa', 'Monitorización en tiempo real'],
  },
];

export default function ServiciosPage() {
  const heroRef  = useRef(null);
  const gridRef  = useRef(null);
  const gsapCtx  = useRef(null);

  useLayoutEffect(() => {
    gsapCtx.current = gsap.context(() => {
      // Hero parallax
      gsap.to('.servicios-hero-content', {
        y: '25%', opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Cards entrada
      gsap.fromTo('.service-card', { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      });
    });

    return () => {
      if (gsapCtx.current) gsapCtx.current.revert();
    };
  }, []);

  const allServices = [
    ...services.map(s => ({ ...s, to: `/servicios/${s.slug}`, icon: iconMap[s.icon] || Plug, highlight: false })),
    ...extras,
  ];

  return (
    <div className="overflow-x-hidden">
      <SeoHead
        title="Servicios de Electricista en Madrid y Toledo — ALMelectricidad"
        description="Instalaciones eléctricas, urgencias 24h, paneles solares, iluminación LED, boletines, telecomunicaciones, recarga de VE y fotovoltaica industrial. Instaladores autorizados REBT."
        canonical="/servicios"
        ogImage="/og/instalaciones-electricas.png"
      />

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative w-full h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/70 to-dark z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent" />

        <div className="servicios-hero-content relative z-20 text-center px-6 mt-16">
          <Link to="/" className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-8">
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>
          <span className="block text-brand font-body text-sm tracking-[0.2em] uppercase font-semibold mb-5">
            Lo que hacemos
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-white mb-6 leading-none">
            NUESTROS <span className="text-brand">SERVICIOS</span>
          </h1>
          <p className="text-lg md:text-xl font-body font-light max-w-2xl mx-auto text-white/65">
            Instaladores autorizados REBT desde 2018. Precio cerrado, sin sorpresas.
          </p>
        </div>
      </div>

      {/* ── GRID DE SERVICIOS ── */}
      <section className="bg-dark py-20 px-6">
        <div ref={gridRef} className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className={`service-card group relative flex flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
                  ${s.highlight
                    ? 'border-danger/40 bg-danger/5 hover:border-danger/70'
                    : 'border-white/8 bg-white/[0.02] hover:border-brand/40 hover:bg-brand/[0.04]'
                  }`}
              >
                {/* Imagen */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                  {s.highlight && (
                    <span className="absolute top-3 right-3 bg-danger text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping inline-block" />
                      24h
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-9 h-9 flex items-center justify-center shrink-0 ${s.highlight ? 'bg-danger/15' : 'bg-brand/10'}`}>
                      <Icon size={18} className={s.highlight ? 'text-danger' : 'text-brand'} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-white leading-tight">{s.title}</h2>
                      <p className={`text-xs font-body mt-0.5 ${s.highlight ? 'text-danger/70' : 'text-brand/70'}`}>{s.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-white/55 text-sm font-body leading-relaxed mb-5">{s.shortDesc}</p>

                  <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                    {s.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/50 font-body">
                        <CheckCircle size={12} className={`shrink-0 mt-0.5 ${s.highlight ? 'text-danger/60' : 'text-brand/60'}`} aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className={`inline-flex items-center gap-2 text-sm font-body font-semibold transition-all duration-300 group-hover:gap-3 ${s.highlight ? 'text-danger' : 'text-brand'}`}>
                    Ver servicio
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-dark border-t border-white/5 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-4 tracking-tighter">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/55 font-body mb-8">
            Cuéntanos qué necesitas. Si está relacionado con la electricidad, seguramente podemos ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contacto" className="btn-brand !py-3.5 !px-8">
              Pedir presupuesto
            </a>
            <a
              href="tel:+34605333108"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 px-8 py-3.5 font-body font-semibold transition-all duration-300"
            >
              <Phone size={16} className="text-brand" />
              605 33 31 08
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
