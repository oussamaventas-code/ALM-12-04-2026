import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { historyMilestones, jorgeValues, jorgeFacts } from '../data/history';
import {
  Zap, TrendingUp, Heart, Shield, ArrowRight,
  Quote, Bike, Users, Star, CheckCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Mapa de iconos del timeline
const ICONS = { Zap, TrendingUp, Heart, Shield, Star };
function TimelineIcon({ name, size = 20, className }) {
  const Comp = ICONS[name] || Zap;
  return <Comp size={size} className={className} />;
}

export default function HistoriaPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from('.hs-hero > *', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.2,
      });
      // Timeline items
      gsap.from('.hs-milestone', {
        x: -40, opacity: 0, duration: 0.65, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.hs-timeline', start: 'top 75%', once: true },
      });
      // Values cards
      gsap.from('.hs-value', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.hs-values', start: 'top 78%', once: true },
      });
      // Jorge section
      gsap.from('.hs-jorge > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.hs-jorge', start: 'top 75%', once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SeoHead
        title="Nuestra Historia — ALM Electricidad | Madrid y Toledo"
        description="De AMelectric a ALM Electricidad: la historia de Jorge, sus valores, su familia y la visión de una empresa que trabaja sin límites. Electricistas con propósito en Madrid y Toledo."
        canonical="/sobre-nosotros"
        ogImage="https://almelectricidad.com/og-historia.png"
      />

      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative bg-dark pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

          <div className="container-custom px-6 relative z-10">
            <div className="hs-hero max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 font-body" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-brand transition-colors">Inicio</Link>
                <span>/</span>
                <span className="text-white/70">Nuestra historia</span>
              </nav>

              <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-2 mb-7">
                <Heart size={14} className="text-brand" />
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">ALM — Alicia, Lucia, Melisa</span>
              </div>

              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Una empresa construida{' '}
                <span className="text-gradient-gold">sobre lo que importa</span>
              </h1>
              <p className="font-body text-xl text-white/55 leading-relaxed max-w-2xl">
                Esta no es la historia de una empresa más. Es la historia de un electricista que decidió que hacer
                las cosas bien era más importante que hacerlas rápido. Y que puso a su familia en el nombre para
                que nunca lo olvidara.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="section-padding bg-surface hs-timeline">
          <div className="container-custom px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="section-title">Del primer cable al presente</h2>
                <p className="section-subtitle">Seis años que explican quiénes somos hoy</p>
              </div>

              <div className="relative">
                {/* Línea vertical */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/8" aria-hidden="true" />

                <div className="space-y-12">
                  {historyMilestones.map((m, i) => (
                    <div key={i} className="hs-milestone relative flex gap-8 md:gap-12">
                      {/* Nodo */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border ${
                          m.color === 'brand'
                            ? 'bg-brand/15 border-brand/40'
                            : 'bg-white/5 border-white/20'
                        }`}>
                          <TimelineIcon
                            name={m.icon}
                            size={20}
                            className={m.color === 'brand' ? 'text-brand' : 'text-white/60'}
                          />
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="pb-4 flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="font-heading text-brand font-extrabold text-lg">{m.year}</span>
                          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/50">{m.tag}</span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2">{m.title}</h3>
                        <p className="font-body text-white/60 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Por qué "ALM" ── */}
        <section className="relative py-24 bg-dark overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="container-custom px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-2 mb-6">
                    <Heart size={14} className="text-brand" />
                    <span className="text-brand text-xs font-semibold uppercase tracking-widest">El nombre lo dice todo</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                    ALM no es un acrónimo de empresa.{' '}
                    <span className="text-gradient-gold">Es una declaración.</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Cada vez que Jorge firma un presupuesto, sube a una cubierta o revisa una instalación,
                    lleva encima las iniciales de las tres personas que hacen que tenga sentido: su hija Alicia,
                    su hija Lucia y Melisa, su pareja y el pilar que sostiene todo lo demás.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Una empresa que lleva el nombre de tu familia no puede permitirse hacer las cosas a medias.
                    Ese es el estándar real detrás de cada trabajo que firma ALM Electricidad.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { letra: 'A', nombre: 'Alicia', rol: 'Su hija mayor — el primer motor' },
                    { letra: 'L', nombre: 'Lucia', rol: 'Su hija pequeña — la constancia diaria' },
                    { letra: 'M', nombre: 'Melisa', rol: 'Su pareja — pilar y mejor persona' },
                  ].map(({ letra, nombre, rol }) => (
                    <div key={letra} className="flex items-center gap-5 bg-white/4 border border-white/8 rounded-xl p-5">
                      <div className="w-14 h-14 bg-brand/15 border border-brand/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-2xl font-extrabold text-brand">{letra}</span>
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-lg">{nombre}</p>
                        <p className="text-white/50 text-sm">{rol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Valores de Jorge ── */}
        <section className="section-padding bg-surface hs-values">
          <div className="container-custom px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/8 px-4 py-2 mb-5">
                <Shield size={14} className="text-brand" />
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">Valores reales</span>
              </div>
              <h2 className="section-title">Lo que aprendí en la bicicleta,<br/>lo aplico en cada instalación</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                El ciclismo enseña una cosa muy simple: la constancia gana a la velocidad.
                En el trabajo eléctrico es exactamente igual.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {jorgeValues.map((v) => (
                <div key={v.title} className="hs-value card-dark p-6 text-center group hover:border-brand/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/20 transition-colors">
                    <Bike size={20} className="text-brand" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cita de Jorge ── */}
        <section className="py-20 bg-dark">
          <div className="container-custom px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Quote size={40} className="text-brand/30 mx-auto mb-6" />
              <blockquote className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
                "No seré el mejor electricista del mundo. Pero me gusta hacer lo mejor que sé en cada trabajo.
                Y si algo no lo hago bien, vuelvo hasta que quede bien."
              </blockquote>
              <cite className="text-white/40 text-sm not-italic">
                — Jorge, fundador de ALM Electricidad
              </cite>
            </div>
          </div>
        </section>

        {/* ── Jorge persona ── */}
        <section className="section-padding bg-surface hs-jorge">
          <div className="container-custom px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/8 px-4 py-2 mb-6">
                    <Users size={14} className="text-brand" />
                    <span className="text-brand text-xs font-semibold uppercase tracking-widest">Fuera del trabajo</span>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-white leading-tight mb-5">
                    Un electricista que también{' '}
                    <span className="text-gradient-gold">pedalea cuestas arriba</span>
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    El ciclismo no es solo un hobby para Jorge. Es donde recarga la cabeza, donde aprende a gestionar
                    el esfuerzo y donde entiende que las metas grandes se consiguen pedaleando, no esperando.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Fuera del trabajo está con Melisa y sus hijas. La familia no es una motivación de fondo —
                    es la razón principal de todo lo que construye con ALM.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    Esta combinación de disciplina deportiva y arraigo familiar es lo que hace que Jorge
                    trate cada proyecto con una seriedad que no es habitual en el gremio.
                  </p>
                </div>

                <div className="space-y-3">
                  {jorgeFacts.map((f) => (
                    <div key={f.label} className="flex items-start gap-4 bg-white/4 border border-white/8 rounded-xl p-4">
                      <CheckCircle size={18} className="text-brand flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-heading font-bold text-white text-sm mb-0.5">{f.label}</p>
                        <p className="text-white/50 text-sm">{f.desc}</p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 pt-2">
                    <Link to="/contacto" className="btn-brand">
                      Habla directamente con Jorge
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Visión futura ── */}
        <section className="relative py-24 bg-dark overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/6 rounded-full blur-[130px] pointer-events-none" />
          <div className="container-custom px-6 relative z-10 max-w-2xl mx-auto">
            <Star size={32} className="text-brand mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              La visión: ser una marca grande,{' '}
              <span className="text-gradient-gold">sin límites</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10">
              ALM no es el destino, es el punto de partida. La meta es que dentro de diez años, cuando alguien
              en Madrid o Toledo piense en electricidad de calidad, piense en ALM. Sin anuncios agresivos,
              sin descuentos de saldo. Solo reputación ganada trabajo a trabajo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto" className="btn-brand">
                Trabaja con nosotros
                <ArrowRight size={17} />
              </Link>
              <Link to="/proyectos" className="btn-outline !border-white/20 !text-white hover:!border-brand hover:!text-brand">
                Ver nuestros proyectos
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
