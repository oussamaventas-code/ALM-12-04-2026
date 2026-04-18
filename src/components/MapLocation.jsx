import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zones } from '../data/zones';

// gsap.registerPlugin ya registrado globalmente en App.jsx

export default function MapLocation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.map-header',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.map-container',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.zone-chip',
        { y: 15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.zone-chips',
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="py-24 md:py-32 bg-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="map-header text-center mb-14 invisible">
          <span className="section-label">Dónde estamos</span>
          <h2 className="section-title mt-3 text-white">
            Cubrimos toda la región y alrededores
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Nuestra base está en el centro, pero llegamos a todos los rincones
            de la zona. Respuesta rápida garantizada.
          </p>
        </div>

        {/* Map + Info panel */}
        <div className="map-container invisible grid lg:grid-cols-[1fr_340px] gap-0 border border-white/10 overflow-hidden">
          {/* Google Maps Embed */}
          <div className="relative h-[380px] lg:h-[460px] bg-surface">
            <iframe
              title="Ubicación ALM Electricidad"
              src="https://maps.google.com/maps?q=C.%20Lisboa,%203,%20NAVE%2010,%2045300%20Oca%C3%B1a,%20Toledo&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(40%) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay gradient on sides */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface/30 to-transparent pointer-events-none lg:hidden" />
          </div>

          {/* Info Panel */}
          <div className="bg-surface-200 border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col justify-between gap-8">
            {/* Nave */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-brand" />
                </div>
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand">
                  Sede Central
                </span>
              </div>
              <p className="font-heading text-white font-semibold text-base leading-snug mb-1">
                C. Lisboa, 3, NAVE 10
              </p>
              <p className="font-body text-sm text-white/50">
                45300 Ocaña, Toledo
              </p>
            </div>

            {/* Horario */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm text-white/80 font-medium">
                    Lun – Vie: 8:00 – 20:00
                  </p>
                  <p className="font-body text-sm text-white/80 font-medium">
                    Sáb: 9:00 – 14:00
                  </p>
                  <p className="font-body text-xs text-brand-glow mt-1">
                    ⚡ Urgencias 24h / 365 días
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-brand shrink-0" />
                <a
                  href="tel:+34605333108"
                  className="font-body text-sm text-white/80 font-medium hover:text-brand transition-colors duration-200"
                >
                  605 33 31 08
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=C.+Lisboa,+3,+NAVE+10,+45300+Oca%C3%B1a,+Toledo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-glow text-dark font-heading font-bold text-sm uppercase tracking-wide px-5 py-3 transition-all duration-300"
              >
                <Navigation size={15} />
                Cómo llegar
              </a>
              <a
                href="#contacto"
                className="flex items-center justify-center gap-2 border border-white/15 hover:border-brand text-white/70 hover:text-brand font-heading font-semibold text-sm uppercase tracking-wide px-5 py-3 transition-all duration-300"
              >
                Pedir presupuesto
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Zone chips */}
        <div className="zone-chips mt-10 flex flex-wrap gap-2 justify-center">
          {zones.map((z) => (
            <Link
              key={z.slug}
              to={`/zonas/${z.slug}`}
              className="zone-chip invisible inline-flex items-center gap-1.5 border border-white/10 hover:border-brand/50 bg-white/[0.03] hover:bg-brand/5 text-white/50 hover:text-brand-glow text-xs font-body px-3.5 py-1.5 transition-all duration-300"
            >
              <MapPin size={10} />
              {z.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
