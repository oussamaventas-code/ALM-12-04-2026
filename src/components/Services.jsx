import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';

const allServices = services.map((s) => ({ ...s, isLink: true }));

function ServiceCard({ s, className, style }) {
  const cardContent = (
    <>
      {/* Image — full card */}
      <img
        src={s.image}
        alt={s.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7 z-10">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-brand">
          {s.subtitle}
        </span>
        <h3 className="font-heading text-xl font-bold text-white mt-2 leading-snug">
          {s.title}
        </h3>
        <p className="font-body text-sm text-white/60 mt-2 leading-relaxed">
          {s.shortDesc}
        </p>
        <span className="inline-flex items-center gap-1.5 text-brand font-body text-sm font-semibold mt-4 group-hover:gap-3 transition-all duration-300">
          {s.isLink ? 'Ver servicio' : 'Consultar'}
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Always-visible bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-dark/85 backdrop-blur-sm px-5 py-3 group-hover:opacity-0 transition-opacity duration-300 z-10">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
            {s.subtitle}
          </span>
          <span className="font-heading text-sm font-semibold text-white/90">
            {s.title}
          </span>
        </div>
      </div>

      {/* Left brand accent on hover */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-brand scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-20" />
    </>
  );

  return s.isLink ? (
    <Link to={`/servicios/${s.slug}`} className={className} style={style}>
      {cardContent}
    </Link>
  ) : (
    <a href={s.href} className={className} style={style}>
      {cardContent}
    </a>
  );
}

function ServicesDesktop() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount())}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      const cards = gsap.utils.toArray('.service-card-h');
      if (cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { clipPath: 'inset(100% 0 0 0)', autoAlpha: 0 },
            {
              clipPath: 'inset(0% 0 0 0)',
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 90%',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-surface overflow-hidden h-screen"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-6 pt-[82px] pb-8 shrink-0">
          <div className="flex items-end justify-between">
            <div ref={titleRef}>
              <span className="section-label mb-4 block">Especialistas en</span>
              <h2 className="section-title">
                Nuestros <span className="text-gradient-brand">servicios</span>
              </h2>
            </div>
            <p className="section-subtitle hidden md:block max-w-xs text-right">
              Materiales de máxima calidad,
              <br />
              normativa al día y trato cercano.
            </p>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-visible pl-6 md:pl-10">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform pr-6 md:pr-10 w-max"
          >
            {allServices.map((s, i) => (
              <div key={s.slug || s.title} className="relative group">
                <ServiceCard
                  s={s}
                  className="service-card-h relative shrink-0 overflow-hidden cursor-pointer block"
                  style={{ width: 'clamp(300px, 35vw, 520px)', height: '70vh' }}
                />
                {/* Card number */}
                <div className="absolute top-4 left-4 font-heading font-black text-5xl text-white/[0.07] leading-none select-none pointer-events-none group-hover:text-white/[0.12] transition-colors duration-500 z-10">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}

            {/* Trailing space */}
            <div className="shrink-0 w-10" />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="max-w-7xl mx-auto w-full px-6 pb-6 shrink-0 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-brand/40" />
          <span className="font-body text-xs text-white/30 uppercase tracking-[0.12em]">
            Desliza para ver todos los servicios
          </span>
        </div>
      </div>
    </section>
  );
}

function ServicesMobile() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card-v');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0 0 0)', autoAlpha: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-16">
      <div className="px-6 flex flex-col">
        {/* Header */}
        <div className="mb-10">
          <span className="section-label mb-3 block">Especialistas en</span>
          <h2 className="section-title text-3xl">
            Nuestros <span className="text-gradient-brand">servicios</span>
          </h2>
        </div>

        {/* Vertical grid */}
        <div className="grid grid-cols-1 gap-5">
          {allServices.map((s, i) => (
            <div key={s.slug || s.title} className="relative group">
              <ServiceCard
                s={s}
                className="service-card-v relative shrink-0 overflow-hidden cursor-pointer block w-full h-[320px]"
              />
              <div className="absolute top-4 left-4 font-heading font-black text-5xl text-white/[0.07] leading-none select-none pointer-events-none group-hover:text-white/[0.12] transition-colors duration-500 z-10">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <div className="hidden lg:block">
        <ServicesDesktop />
      </div>
      <div className="lg:hidden">
        <ServicesMobile />
      </div>
    </>
  );
}
