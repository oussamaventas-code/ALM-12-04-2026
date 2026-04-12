import { useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  Phone,
  ArrowRight,
  Plug,
  Zap,
  Sun,
  Lightbulb,
  FileCheck,
} from 'lucide-react';
import { zones } from '../data/zones';
import { services } from '../data/services';
import SeoHead from '../components/SeoHead';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Plug,
  Zap,
  Sun,
  Lightbulb,
  FileCheck,
};

export default function ZonePage() {
  const { slug } = useParams();
  const zone = zones.find((z) => z.slug === slug);

  const heroRef = useRef(null);
  const descRef = useRef(null);
  const neighborhoodsRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const otherZonesRef = useRef(null);

  useEffect(() => {
    if (!zone) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.zone-hero-breadcrumb', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.zone-hero-title', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.zone-hero-meta', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
        ease: 'power3.out',
      });
      gsap.from('.zone-hero-rule', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.inOut',
      });

      // Description
      gsap.from('.zone-desc-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Neighborhoods
      gsap.from('.zone-neighborhood-tag', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: neighborhoodsRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Services grid
      gsap.from('.zone-service-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // CTA
      gsap.from('.zone-cta-content', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Other zones
      gsap.from('.zone-other-link', {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: otherZonesRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [zone, slug]);

  if (!zone) {
    return <Navigate to="/" replace />;
  }

  const otherZones = zones.filter((z) => z.slug !== slug);
  const displayServices = services.slice(0, 5);

  return (
    <main ref={heroRef}>
      <SeoHead
        title={`Electricista en ${zone.name} — ALMelectricidad`}
        description={`Electricistas en ${zone.name}. ${zone.description} Presupuesto sin compromiso en menos de 24h.`}
        canonical={`/zonas/${zone.slug}`}
      />
      {/* ══════ HERO ══════ */}
      <section
        className="relative min-h-[65vh] flex items-end overflow-hidden"
        style={{ background: 'var(--color-dark)' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container-custom px-6 relative z-10 pb-16 pt-40">
          {/* Breadcrumb */}
          <nav className="zone-hero-breadcrumb flex items-center gap-2 text-sm font-body mb-8">
            <Link to="/" className="text-white/40 hover:text-brand transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-white/40">Zonas</span>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-brand">{zone.name}</span>
          </nav>

          {/* Region tag */}
          <div className="zone-hero-meta flex items-center gap-4 mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(217, 119, 6, 0.1)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: 'var(--color-brand-light)',
              }}
            >
              <MapPin size={14} />
              {zone.region}
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                color: 'var(--color-accent-light)',
              }}
            >
              <Clock size={14} />
              {zone.responseTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="zone-hero-title font-heading font-bold text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Electricistas en{' '}
            <span className="text-gradient-gold">{zone.name}</span>
          </h1>

          {/* Short desc */}
          <p className="zone-hero-meta text-white/45 text-lg max-w-2xl leading-relaxed">
            {zone.description}
          </p>

          <hr className="zone-hero-rule rule mt-10" />
        </div>
      </section>

      {/* ══════ DESCRIPTION ══════ */}
      <section
        ref={descRef}
        className="section-padding"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Long description */}
            <div className="lg:col-span-3 zone-desc-content">
              <span className="section-label mb-4 block">Nuestra zona</span>
              <h2 className="section-title mb-6">{zone.name}</h2>
              <p
                className="text-lg leading-[1.8]"
                style={{ color: 'var(--color-ink-400)' }}
              >
                {zone.longDesc}
              </p>
            </div>

            {/* Response time card */}
            <div className="lg:col-span-2 zone-desc-content">
              <div
                className="p-8"
                style={{
                  background: 'var(--color-dark)',
                  border: '1px solid rgba(217, 119, 6, 0.15)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-brand" />
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-brand-light)' }}
                  >
                    Tiempo de respuesta
                  </span>
                </div>
                <p
                  className="font-heading font-bold leading-none mb-3"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    color: 'white',
                  }}
                >
                  {zone.responseTime}
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  Tiempo medio de llegada para urgencias en {zone.name}. Disponibles 24 horas, 7 d{'\u00ED'}as a la semana.
                </p>
                <hr
                  className="my-6"
                  style={{
                    border: 'none',
                    height: '1px',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
                <a
                  href="tel:+34605333108"
                  className="btn-brand w-full justify-center !py-3"
                >
                  <Phone size={18} />
                  Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ NEIGHBORHOODS ══════ */}
      <section
        ref={neighborhoodsRef}
        className="section-padding"
        style={{ background: 'var(--color-surface-200)' }}
      >
        <div className="container-custom px-6">
          <span className="section-label mb-4 block">Barrios y municipios</span>
          <h2 className="section-title mb-10">
            D{'\u00F3'}nde trabajamos en{' '}
            <span className="text-gradient-brand">{zone.name}</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            {zone.neighborhoods.map((n, i) => (
              <span
                key={i}
                className="zone-neighborhood-tag inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-surface-300)',
                  color: 'var(--color-ink)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-brand)';
                  e.currentTarget.style.color = 'var(--color-brand)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-surface-300)';
                  e.currentTarget.style.color = 'var(--color-ink)';
                }}
              >
                <MapPin size={14} className="text-brand opacity-60" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SERVICES IN THIS ZONE ══════ */}
      <section
        ref={servicesRef}
        className="section-padding"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="container-custom px-6">
          <span className="section-label mb-4 block">Servicios disponibles</span>
          <h2 className="section-title mb-4">
            Qu{'\u00E9'} hacemos en {zone.name}
          </h2>
          <p className="section-subtitle mb-12">
            Todos nuestros servicios el{'\u00E9'}ctricos disponibles en esta zona, con el mismo nivel de calidad y garant{'\u00ED'}a.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {displayServices.map((s) => {
              const Icon = iconMap[s.icon] || Zap;
              return (
                <Link
                  key={s.slug}
                  to={`/servicios/${s.slug}`}
                  className="zone-service-card card group p-6 block"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(217, 119, 6, 0.08)',
                      border: '1px solid var(--color-surface-300)',
                    }}
                  >
                    <Icon size={20} className="text-brand" />
                  </div>
                  <h3
                    className="font-heading font-bold text-sm mb-2 leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: 'var(--color-ink-400)' }}
                  >
                    {s.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:gap-2 transition-all">
                    Ver m{'\u00E1'}s
                    <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section
        ref={ctaRef}
        className="relative py-24 overflow-hidden"
        style={{ background: 'var(--color-dark)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/6 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

        <div className="container-custom px-6 relative z-10">
          <div className="zone-cta-content text-center max-w-3xl mx-auto">
            <span className="section-label justify-center mb-6 !text-brand-glow">
              Cont{'\u00E1'}ctanos
            </span>
            <h2
              className="font-heading font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {'\u00BF'}Necesitas un electricista en{' '}
              <span className="text-gradient-gold">{zone.name}</span>?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Estamos cerca. Ll{'\u00E1'}manos, escr{'\u00ED'}benos por WhatsApp o rellena el formulario. Presupuesto sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/34605333108"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-4 !px-8"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a
                href="tel:+34605333108"
                className="btn-brand !py-4 !px-8"
              >
                <Phone size={20} />
                Llamar
              </a>
              <a href="/#contacto" className="btn-accent !py-4 !px-8">
                Formulario
                <ArrowRight size={20} />
              </a>
            </div>

            {/* Response time reminder */}
            <div className="mt-10 inline-flex items-center gap-3 px-6 py-3" style={{
              background: 'rgba(217, 119, 6, 0.08)',
              border: '1px solid rgba(217, 119, 6, 0.15)',
            }}>
              <Clock size={16} className="text-brand" />
              <span className="text-white/60 text-sm">
                Tiempo de llegada en {zone.name}:{' '}
                <span className="text-brand font-semibold">{zone.responseTime}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ OTHER ZONES ══════ */}
      <section
        ref={otherZonesRef}
        className="section-padding"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="container-custom px-6">
          <span className="section-label mb-4 block">Otras zonas</span>
          <h2 className="section-title mb-10">
            Tambi{'\u00E9'}n trabajamos en
          </h2>

          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {otherZones.map((z) => (
                <Link
                  key={z.slug}
                  to={`/zonas/${z.slug}`}
                  className="zone-other-link group flex-shrink-0 block px-6 py-5"
                  style={{
                    background: 'var(--color-surface-200)',
                    border: '1px solid var(--color-surface-300)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    minWidth: '220px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-surface-300)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-heading font-bold text-sm"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {z.name}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-brand opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-ink-300)' }}
                    >
                      {z.region}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="flex items-center gap-1 text-xs text-brand">
                      <Clock size={11} />
                      {z.responseTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
