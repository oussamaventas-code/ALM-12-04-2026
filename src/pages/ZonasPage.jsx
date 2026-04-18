import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { zones } from '../data/zones';
import {
  MapPin, Clock, Phone, ArrowRight, Zap, CheckCircle,
  MessageCircle, Building, Home, AlertTriangle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Coordenadas aproximadas (SVG 800×600, España centrada en Madrid)
const ZONE_COORDS = {
  'madrid-centro':   { cx: 390, cy: 270 },
  'madrid-norte':    { cx: 390, cy: 195 },
  'madrid-sur':      { cx: 390, cy: 355 },
  'madrid-este':     { cx: 475, cy: 270 },
  'madrid-oeste':    { cx: 300, cy: 270 },
  'getafe':          { cx: 410, cy: 380 },
  'alcorcon':        { cx: 340, cy: 330 },
  'toledo-capital':  { cx: 360, cy: 460 },
  'talavera':        { cx: 220, cy: 450 },
  'illescas':        { cx: 390, cy: 415 },
};

const REGION_COLOR = { Madrid: '#F5C518', Toledo: '#f59e0b' };

const highlights = [
  { icon: Zap,           title: 'Urgencias 24h',       desc: 'Respuesta garantizada en cualquier zona de cobertura' },
  { icon: Clock,         title: 'Presupuesto en 24h',  desc: 'Estudio y propuesta económica en menos de un día laborable' },
  { icon: CheckCircle,   title: 'Precio cerrado',       desc: 'Sin sorpresas al finalizar. Lo que acordamos es lo que pagas' },
  { icon: Building,      title: 'Industrial y residencial', desc: 'Misma calidad tanto para una nave como para un piso' },
];

export default function ZonasPage() {
  const pageRef    = useRef(null);
  const [active, setActive] = useState(null);
  const activeZone = active ? zones.find((z) => z.slug === active) : null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.zp-hero > *', {
        y: 35, opacity: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.zp-card', {
        y: 28, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.zp-grid', start: 'top 78%', once: true },
      });
      gsap.from('.zp-highlight', {
        y: 22, opacity: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: '.zp-highlights', start: 'top 80%', once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ALM Electricidad',
    telephone: '+34605333108',
    email: 'contacto@almelectricidad.com',
    areaServed: zones.map((z) => ({ '@type': 'City', name: z.name })),
  };

  return (
    <>
      <SeoHead
        title="Zonas de Cobertura — ALM Electricidad | Madrid y Toledo"
        description="Electricistas profesionales en Madrid (Centro, Norte, Sur, Este, Oeste, Getafe, Alcorcón) y Toledo (capital, Talavera, Illescas). Urgencias 24h y presupuesto en 24h."
        canonical="/zonas"
        schema={schema}
        ogImage="https://almelectricidad.com/og-zonas.png"
      />

      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative bg-dark pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-transparent pointer-events-none" />
          <div className="container-custom px-6 relative z-10">
            <div className="zp-hero max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 font-body" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-brand transition-colors">Inicio</Link>
                <span>/</span>
                <span className="text-white/70">Zonas de cobertura</span>
              </nav>

              <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-2 mb-7">
                <MapPin size={14} className="text-brand" />
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">Madrid y Toledo</span>
              </div>

              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Trabajamos en tu{' '}
                <span className="text-gradient-gold">zona</span>
              </h1>
              <p className="font-body text-xl text-white/55 leading-relaxed max-w-2xl mb-10">
                Cubrimos Madrid capital, municipios del sur, norte, este y oeste, y la provincia de Toledo.
                Urgencias 24h en todas las zonas. Tiempo de respuesta garantizado.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="tel:+34605333108" className="btn-brand">
                  <Phone size={17} />
                  Llamar ahora — 605 33 31 08
                </a>
                <a href="https://wa.me/34605333108?text=Hola%2C%20necesito%20un%20electricista%20en%20mi%20zona" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mapa SVG Interactivo ── */}
        <section className="section-padding bg-surface" aria-label="Mapa de cobertura">
          <div className="container-custom px-6">
            <div className="text-center mb-12">
              <h2 className="section-title">Selecciona tu zona</h2>
              <p className="section-subtitle">Haz clic en cualquier punto del mapa para ver los detalles</p>
            </div>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">

              {/* SVG Map */}
              <div className="lg:col-span-3">
                <div className="relative bg-white/3 border border-white/8 rounded-2xl p-4 overflow-hidden">
                  <svg
                    viewBox="150 150 450 380"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Mapa interactivo de zonas de cobertura"
                  >
                    {/* Fondo oscuro */}
                    <rect x="150" y="150" width="450" height="380" fill="#0b0f1a" />

                    {/* Líneas de cuadrícula sutil */}
                    {[200,250,300,350,400,450,500].map((x) => (
                      <line key={`v${x}`} x1={x} y1="150" x2={x} y2="530" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>
                    ))}
                    {[200,250,300,350,400,450,500].map((y) => (
                      <line key={`h${y}`} x1="150" y1={y} x2="600" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1"/>
                    ))}

                    {/* Área Madrid aprox */}
                    <ellipse cx="390" cy="270" rx="130" ry="110" fill="#F5C518" fillOpacity="0.05" stroke="#F5C518" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4"/>
                    {/* Área Toledo aprox */}
                    <ellipse cx="330" cy="445" rx="160" ry="80" fill="#f59e0b" fillOpacity="0.04" stroke="#f59e0b" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 4"/>

                    {/* Labels regiones */}
                    <text x="510" y="215" fill="#F5C518" fillOpacity="0.4" fontSize="10" fontFamily="sans-serif">Madrid</text>
                    <text x="160" y="470" fill="#f59e0b" fillOpacity="0.4" fontSize="10" fontFamily="sans-serif">Toledo</text>

                    {/* Puntos de zona */}
                    {zones.map((z) => {
                      const coord = ZONE_COORDS[z.slug];
                      if (!coord) return null;
                      const isActive = active === z.slug;
                      const color = REGION_COLOR[z.region];
                      return (
                        <g
                          key={z.slug}
                          className="cursor-pointer"
                          onClick={() => setActive(isActive ? null : z.slug)}
                          role="button"
                          aria-label={`Ver zona ${z.name}`}
                          aria-pressed={isActive}
                        >
                          {/* Halo animado */}
                          {isActive && (
                            <circle cx={coord.cx} cy={coord.cy} r="22" fill={color} fillOpacity="0.15">
                              <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite"/>
                              <animate attributeName="fill-opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>
                            </circle>
                          )}
                          <circle
                            cx={coord.cx}
                            cy={coord.cy}
                            r={isActive ? 12 : 9}
                            fill={color}
                            fillOpacity={isActive ? 1 : 0.7}
                            stroke={isActive ? '#fff' : color}
                            strokeWidth={isActive ? 2 : 1}
                            strokeOpacity={isActive ? 1 : 0.4}
                            style={{ transition: 'all 0.2s ease' }}
                          />
                          <circle cx={coord.cx} cy={coord.cy} r="3" fill="#fff" fillOpacity={isActive ? 1 : 0.6}/>
                          <text
                            x={coord.cx}
                            y={coord.cy + 22}
                            textAnchor="middle"
                            fill="white"
                            fillOpacity={isActive ? 1 : 0.55}
                            fontSize="8"
                            fontFamily="sans-serif"
                            fontWeight={isActive ? 'bold' : 'normal'}
                          >
                            {z.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Leyenda */}
                  <div className="flex items-center justify-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand" />
                      <span className="text-white/40 text-xs">Madrid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="text-white/40 text-xs">Toledo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel de zona activa */}
              <div className="lg:col-span-2">
                {activeZone ? (
                  <div className="bg-white/4 border border-brand/20 rounded-2xl p-6 sticky top-24">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs text-brand uppercase tracking-widest font-bold">{activeZone.region}</span>
                        <h3 className="font-heading text-xl font-bold text-white mt-0.5">{activeZone.name}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-brand/10 border border-brand/20 px-3 py-1.5 rounded-full">
                        <Clock size={12} className="text-brand" />
                        <span className="text-brand text-xs font-bold">{activeZone.responseTime}</span>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-5">{activeZone.longDesc}</p>

                    <div className="mb-5">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Zonas que cubrimos</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeZone.neighborhoods.map((n) => (
                          <span key={n} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/60">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/zonas/${activeZone.slug}`}
                        className="btn-brand w-full justify-center text-sm"
                      >
                        Ver página de {activeZone.name}
                        <ArrowRight size={15} />
                      </Link>
                      <a
                        href={`https://wa.me/34605333108?text=Hola%2C%20necesito%20un%20electricista%20en%20${encodeURIComponent(activeZone.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp w-full justify-center text-sm"
                      >
                        <MessageCircle size={15} />
                        Pedir presupuesto en {activeZone.name}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center">
                    <MapPin size={32} className="text-white/20 mx-auto mb-4" />
                    <p className="text-white/40 text-sm">Haz clic en cualquier punto del mapa para ver los detalles de esa zona</p>
                    <div className="mt-6 space-y-2">
                      {zones.slice(0, 4).map((z) => (
                        <button
                          key={z.slug}
                          onClick={() => setActive(z.slug)}
                          className="w-full text-left flex items-center justify-between px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl hover:border-brand/30 hover:bg-white/7 transition-all group"
                        >
                          <span className="text-white/70 text-sm group-hover:text-white transition-colors">{z.name}</span>
                          <span className="text-brand/60 text-xs">{z.responseTime}</span>
                        </button>
                      ))}
                      <p className="text-white/30 text-xs pt-1">+{zones.length - 4} zonas más en el mapa</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Grid de zonas ── */}
        <section className="section-padding bg-dark">
          <div className="container-custom px-6">
            <div className="text-center mb-14">
              <h2 className="section-title">Todas las zonas</h2>
              <p className="section-subtitle">Tiempo de respuesta orientativo desde nuestra base</p>
            </div>

            <div className="zp-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {zones.map((z) => (
                <Link
                  key={z.slug}
                  to={`/zonas/${z.slug}`}
                  className="zp-card group bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-brand/30 hover:bg-white/6 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-brand text-[10px] uppercase tracking-widest font-bold">{z.region}</span>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-brand transition-colors mt-0.5">
                        {z.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-brand/8 border border-brand/15 px-2.5 py-1 rounded-full flex-shrink-0">
                      <Clock size={11} className="text-brand" />
                      <span className="text-brand text-[10px] font-bold">{z.responseTime}</span>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{z.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {z.neighborhoods.slice(0, 3).map((n) => (
                      <span key={n} className="text-[10px] bg-white/5 border border-white/8 px-2 py-0.5 rounded-full text-white/40">
                        {n}
                      </span>
                    ))}
                    {z.neighborhoods.length > 3 && (
                      <span className="text-[10px] text-white/30">+{z.neighborhoods.length - 3} más</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-brand text-sm font-semibold group-hover:gap-3 transition-all">
                    Ver zona
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Garantías de cobertura ── */}
        <section className="section-padding bg-surface zp-highlights">
          <div className="container-custom px-6">
            <div className="text-center mb-12">
              <h2 className="section-title">Lo mismo en todas las zonas</h2>
              <p className="section-subtitle">La calidad no cambia según dónde estés</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="zp-highlight card-dark p-6 text-center hover:border-brand/25 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/20 transition-colors">
                      <Icon size={20} className="text-brand" />
                    </div>
                    <h3 className="font-heading font-bold text-white mb-2">{h.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Urgencias banner ── */}
        <section className="py-16 bg-dark border-t border-white/5">
          <div className="container-custom px-6">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-brand/10 to-transparent border border-brand/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand/15 border border-brand/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={24} className="text-brand" />
                </div>
                <div>
                  <p className="font-heading font-extrabold text-white text-xl">Urgencias 24h / 365 días</p>
                  <p className="text-white/55 text-sm">Avería eléctrica en cualquier zona — respondemos siempre</p>
                </div>
              </div>
              <a href="tel:+34605333108" className="btn-brand flex-shrink-0">
                <Phone size={18} />
                605 33 31 08
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-20 bg-surface text-center">
          <div className="container-custom px-6 max-w-2xl mx-auto">
            <Home size={32} className="text-brand mx-auto mb-5" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              ¿Tu zona no aparece en el mapa?
            </h2>
            <p className="text-white/55 leading-relaxed mb-8">
              Esta lista no es definitiva. Si tu municipio no aparece, escríbenos igualmente.
              Valoramos cada caso y si podemos llegar, lo haremos.
            </p>
            <Link to="/contacto" className="btn-brand">
              Consultar cobertura en tu zona
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
