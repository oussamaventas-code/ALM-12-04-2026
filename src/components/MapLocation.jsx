import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight, Navigation, Map } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zones } from '../data/zones';

// gsap.registerPlugin ya registrado globalmente en App.jsx

// URL del iframe de Google Maps (centralizada para no repetirla)
const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=C.%20Lisboa,%203,%20NAVE%2010,%2045300%20Oca%C3%B1a,%20Toledo&t=&z=14&ie=UTF8&iwloc=&output=embed';

// URL de imagen estática de Google Maps para el facade
// Usamos un screenshot estático generado con la Static Maps API (sin API key, solo la URL embed en modo imagen)
const MAPS_STATIC_URL =
  'https://maps.googleapis.com/maps/api/staticmap?center=39.9577,-3.4997&zoom=14&size=800x460&scale=2&maptype=roadmap&markers=color:red%7C39.9577,-3.4997&style=feature:all%7Celement:geometry%7Csaturation:-40&style=feature:all%7Celement:labels%7Cvisibility:on&key=';

export default function MapLocation() {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Función para activar el mapa real
  const activateMap = useCallback(() => {
    if (!mapLoaded) setMapLoaded(true);
  }, [mapLoaded]);

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

  // MM-3: Facade — IntersectionObserver para cargar el mapa al acercarse
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activateMap();
          observer.disconnect();
        }
      },
      {
        // rootMargin: cargar cuando esté a 200px del viewport (preload suave)
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [mapLoaded, activateMap]);

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-dark overflow-hidden"
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
            de la zona. Te respondemos rápido.
          </p>
        </div>

        {/* Map + Info panel */}
        <div className="map-container invisible grid lg:grid-cols-[1fr_340px] gap-0 border border-white/10 overflow-hidden">
          {/* Google Maps — Facade Pattern (MM-3) */}
          <div
            ref={mapContainerRef}
            className="relative h-[380px] lg:h-[460px] bg-dark-800"
          >
            {mapLoaded ? (
              /* ── Mapa real: se carga solo tras interacción o IntersectionObserver ── */
              <iframe
                title="Ubicación ALM Electricidad"
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(40%) contrast(1.1)' }}
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              /* ── Facade: imagen estática + botón de activación ── */
              <button
                type="button"
                onClick={activateMap}
                className="group relative w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                aria-label="Cargar mapa interactivo de Google Maps"
              >
                {/* Fondo con patrón de mapa estilizado */}
                <div className="absolute inset-0 bg-dark-800">
                  {/* Grid pattern para simular un mapa estático */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* Punto central de ubicación */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {/* Pulse ring */}
                      <span className="absolute inset-0 w-16 h-16 -m-4 rounded-full bg-brand/20 animate-ping" />
                      <div className="relative w-8 h-8 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-brand/30">
                        <MapPin size={16} className="text-dark" />
                      </div>
                    </div>
                  </div>
                  {/* Líneas de carreteras estilizadas */}
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/[0.06]" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/[0.06]" />
                  <div className="absolute top-[30%] left-[20%] right-[40%] h-[1px] bg-white/[0.04] rotate-12" />
                  <div className="absolute top-[60%] left-[35%] right-[15%] h-[1px] bg-white/[0.04] -rotate-6" />
                </div>

                {/* Overlay con CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/50 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:from-dark/70 group-hover:via-dark/20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-brand/20 group-hover:border-brand/30 transition-all duration-300 group-hover:scale-110">
                    <Map size={28} className="text-white group-hover:text-brand transition-colors duration-300" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-white font-bold text-base group-hover:text-brand transition-colors duration-300">
                      Ver mapa interactivo
                    </p>
                    <p className="font-body text-white/40 text-xs mt-1">
                      C. Lisboa, 3 — Ocaña, Toledo
                    </p>
                  </div>
                </div>
              </button>
            )}
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
