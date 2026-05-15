import { useLayoutEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Plug,
  Zap,
  Sun,
  Lightbulb,
  FileCheck,
  Wifi,
  BatteryCharging,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Users,
} from 'lucide-react';
import { services } from '../data/services';
import SeoHead from '../components/SeoHead';

// ScrollTrigger ya está registrado globalmente en App.jsx

const iconMap = {
  Plug,
  Zap,
  Sun,
  Lightbulb,
  FileCheck,
  Wifi,
  BatteryCharging,
};

const trustIconMap = {
  Shield,
  CheckCircle,
  Clock,
  Award,
  Users,
  Zap,
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const processRef = useRef(null);
  const faqRef = useRef(null);
  const trustRef = useRef(null);
  const ctaRef = useRef(null);
  const relatedRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);

  useLayoutEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.service-hero-breadcrumb',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.1, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.service-hero-title',
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.service-hero-subtitle',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.service-hero-rule',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, delay: 0.5, ease: 'power3.inOut' },
      );

      // Content section
      gsap.fromTo(
        '.service-content-item',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // Process section
      gsap.fromTo(
        '.service-process-item',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      // FAQ section
      gsap.fromTo(
        '.service-faq-item',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // Trust section
      gsap.fromTo(
        '.service-trust-item',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trustRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // CTA section
      gsap.fromTo(
        '.service-cta-content',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // Related services
      gsap.fromTo(
        '.service-related-card',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: relatedRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, mainRef);

    return () => ctx.revert();
  }, [service, slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const ServiceIcon = iconMap[service.icon] || Zap;
  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 4);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.heroDesc,
    provider: {
      '@type': 'Electrician',
      name: 'ALMelectricidad',
      telephone: '+34605333108',
      url: 'https://almelectricidad.com',
    },
    areaServed: [
      { '@type': 'State', name: 'Comunidad de Madrid' },
      { '@type': 'State', name: 'Castilla-La Mancha' },
    ],
    url: `https://almelectricidad.com/servicios/${service.slug}`,
  };

  return (
    <main ref={mainRef}>
      <SeoHead
        title={`${service.title} en Madrid — ALMelectricidad`}
        description={service.metaDesc || service.heroDesc.slice(0, 155)}
        canonical={`/servicios/${service.slug}`}
        schema={serviceSchema}
        ogImage={`/og/${service.slug}.png`}
      />
      {/* ══════ HERO ══════ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: 'var(--color-dark)' }}
      >
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt=""
            className="w-full h-full object-cover opacity-25"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        </div>

        {/* Decorative glow */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-brand/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

        <div className="container-custom px-6 relative z-10 pb-16 pt-40">
          {/* Breadcrumb */}
          <nav className="service-hero-breadcrumb flex items-center gap-2 text-sm font-body mb-8">
            <Link to="/" className="text-white/40 hover:text-brand transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-white/40">Servicios</span>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-brand">{service.title}</span>
          </nav>

          {/* Icon + label */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 flex items-center justify-center"
              style={{
                background: 'rgba(217, 119, 6, 0.1)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
              }}
            >
              <ServiceIcon size={24} className="text-brand" />
            </div>
            <span className="section-label !text-brand-light">{service.subtitle}</span>
          </div>

          {/* Title */}
          <h1
            className="service-hero-title font-heading font-bold text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            {service.title}
          </h1>

          {/* Subtitle */}
          <p className="service-hero-subtitle text-white/50 text-lg max-w-2xl leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Rule */}
          <hr className="service-hero-rule rule mt-10" />
        </div>
      </section>

      {/* ══════ CONTENT SECTION ══════ */}
      <section
        ref={contentRef}
        className="section-padding"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Description */}
            <div className="service-content-item">
              <span className="section-label mb-4 block">Sobre este servicio</span>
              <h2 className="section-title mb-6">{service.title}</h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: 'var(--color-ink-400)' }}
              >
                {service.heroDesc}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-ink-400)' }}>
                  <Shield size={16} className="text-brand" />
                  Material certificado
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-ink-400)' }}>
                  <Clock size={16} className="text-brand" />
                  Plazo cerrado
                </div>
              </div>
            </div>

            {/* Bullet list */}
            <div className="service-content-item">
              <div
                className="p-8 lg:p-10"
                style={{
                  background: 'var(--color-surface-200)',
                  border: '1px solid var(--color-surface-300)',
                }}
              >
                <h3
                  className="font-heading font-bold text-xl mb-6"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Lo que incluye
                </h3>
                <ul className="space-y-4">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        className="text-brand flex-shrink-0 mt-0.5"
                      />
                      <span
                        className="text-base leading-relaxed"
                        style={{ color: 'var(--color-ink-600, #44403c)' }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PROCESS SECTION — Cómo trabajamos ══════ */}
      {service.process && service.process.length > 0 && (
        <section
          ref={processRef}
          className="section-padding"
          style={{ background: 'var(--color-dark)' }}
        >
          <div className="container-custom px-6">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 !text-brand-glow">Nuestro proceso</span>
              <h2
                className="font-heading font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                Cómo trabajamos
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {service.process.map((item, i) => (
                <div
                  key={item.step}
                  className="service-process-item relative"
                >
                  {/* Big background number */}
                  <div
                    className="font-heading font-black text-5xl leading-none mb-4"
                    style={{ color: 'rgba(245, 197, 24, 0.12)' }}
                    aria-hidden="true"
                  >
                    {item.step}
                  </div>
                  {/* Small legible step number */}
                  <span className="text-brand text-sm font-bold tracking-wider mb-2 block">
                    PASO {item.step}
                  </span>
                  <h3
                    className="font-heading font-bold text-base text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {item.desc}
                  </p>

                  {/* Desktop separator */}
                  {i < service.process.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-0 right-0 w-px h-full"
                      style={{ background: 'rgba(245, 197, 24, 0.12)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ FAQ SECTION ══════ */}
      <section
        ref={faqRef}
        className="section-padding"
        style={{ background: 'var(--color-surface-200)' }}
      >
        <div className="container-custom px-6 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4">Preguntas frecuentes</span>
            <h2 className="section-title">
              Dudas sobre{' '}
              <span className="text-gradient-brand">{service.title.toLowerCase()}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className="service-faq-item"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-surface-300)',
                  transition: 'border-color 0.3s',
                  borderColor:
                    openFaq === i
                      ? 'var(--color-brand)'
                      : 'var(--color-surface-300)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span
                    className="font-heading font-semibold text-base"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="text-brand flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === i ? '300px' : '0',
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p
                    className="px-6 pb-5 leading-relaxed"
                    style={{ color: 'var(--color-ink-400)' }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TRUST SECTION — Por qué elegirnos ══════ */}
      {service.trustPoints && service.trustPoints.length > 0 && (
        <section
          ref={trustRef}
          className="section-padding"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-custom px-6">
            <div className="text-center mb-12">
              <span className="section-label justify-center mb-4">Confianza</span>
              <h2 className="section-title">
                Por qué elegirnos para{' '}
                <span className="text-gradient-brand">{service.title.toLowerCase()}</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {service.trustPoints.map((point, i) => {
                const TrustIcon = trustIconMap[point.icon] || CheckCircle;
                return (
                  <div
                    key={i}
                    className="service-trust-item p-6 text-center"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: 'rgba(245, 197, 24, 0.08)',
                        border: '1px solid rgba(245, 197, 24, 0.15)',
                      }}
                    >
                      <TrustIcon size={24} className="text-brand" />
                    </div>
                    <p
                      className="text-sm leading-relaxed font-medium"
                      style={{ color: 'var(--color-ink-600)' }}
                    >
                      {point.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* REBT Badge */}
            <div className="mt-10 text-center">
              <div
                className="inline-flex items-center gap-3 px-6 py-3"
                style={{
                  background: 'rgba(245, 197, 24, 0.06)',
                  border: '1px solid rgba(245, 197, 24, 0.15)',
                }}
              >
                <Shield size={18} className="text-brand" />
                <span className="text-brand font-semibold text-sm tracking-wide uppercase">
                  Instaladores autorizados REBT
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ CTA SECTION ══════ */}
      <section
        ref={ctaRef}
        className="relative py-24 overflow-hidden"
        style={{ background: 'var(--color-dark)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />

        <div className="container-custom px-6 relative z-10">
          <div className="service-cta-content text-center max-w-3xl mx-auto" style={{ visibility: 'hidden' }}>
            <span className="section-label justify-center mb-6 !text-brand-glow">
              Hablemos
            </span>
            <h2
              className="font-heading font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {'\u00BF'}Necesitas{' '}
              <span className="text-gradient-gold">
                {service.title.toLowerCase()}
              </span>
              ?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Cuéntanos qué necesitas. Te damos presupuesto sin compromiso en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#contacto" className="btn-brand !py-4 !px-8 !text-base">
                Pedir presupuesto
                <ArrowRight size={20} />
              </a>
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
                className="btn-secondary !border-white/25 !text-white hover:!bg-white/10 hover:!text-white !py-4 !px-8"
              >
                <Phone size={20} />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ RELATED SERVICES ══════ */}
      <section
        ref={relatedRef}
        className="section-padding"
        style={{ background: 'var(--color-surface)' }}
      >
        <div className="container-custom px-6">
          <div className="mb-12">
            <span className="section-label mb-4 block">Otros servicios</span>
            <h2 className="section-title">
              Puede que tambi{'\u00E9'}n necesites
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((s) => {
              const Icon = iconMap[s.icon] || Zap;
              return (
                <Link
                  key={s.slug}
                  to={`/servicios/${s.slug}`}
                  className="service-related-card card group p-6 block"
                  style={{ textDecoration: 'none', visibility: 'hidden' }}
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
                    className="font-heading font-bold text-base mb-2"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--color-ink-400)' }}
                  >
                    {s.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                    Ver servicio
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
