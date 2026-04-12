import { useEffect, useRef } from 'react';
import { Phone, Eye, BadgeCheck, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const steps = [
  {
    num: '01',
    icon: Phone,
    tag: 'Primer contacto',
    title: 'Nos llamas o escribes',
    body: 'Te hacemos 4 preguntas claras, sin marearte. Queremos entender qué necesitas sin darte la chapa. En menos de 24 horas tienes respuesta.',
    highlight: '< 24 h de respuesta',
  },
  {
    num: '02',
    icon: Eye,
    tag: 'Diagnóstico',
    title: 'Vamos a verlo in situ',
    body: 'Si el proyecto lo requiere, nos acercamos a la instalación. Sin compromiso, sin presiones. Solo queremos entender bien el trabajo antes de presupuestar.',
    highlight: 'Sin coste de visita',
  },
  {
    num: '03',
    icon: BadgeCheck,
    tag: 'Presupuesto',
    title: 'Precio cerrado, sin sorpresas',
    body: 'Te damos un presupuesto detallado y cerrado. Lo que te decimos es lo que pagas. Trabajamos sin letra pequeña.',
    highlight: 'Precio fijo garantizado',
  },
  {
    num: '04',
    icon: Sparkles,
    tag: 'Entrega',
    title: 'Limpio, acabado y certificado',
    body: 'Hacemos el trabajo, recogemos todo y te dejamos los papeles en orden. Si algo falla después, volvemos sin preguntas.',
    highlight: 'Garantía post-instalación',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const lineTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal ──
      gsap.fromTo(
        '.process-headline',
        { y: 50, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      // ── Vertical progress line scrub ──
      if (lineRef.current && lineTrackRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: lineTrackRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1.2,
            },
          }
        );
      }

      // ── Each step row ──
      gsap.utils.toArray('.process-step').forEach((step) => {

        // Number animation
        const numEl = step.querySelector('.step-num');
        if (numEl) {
          gsap.fromTo(
            numEl,
            { y: 40, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 1.1, ease: 'power4.out',
              scrollTrigger: { trigger: step, start: 'top 80%', once: true },
            }
          );
        }

        // Content block slide in from left (linear layout)
        const content = step.querySelector('.step-content');
        if (content) {
          gsap.fromTo(
            content,
            { x: -40, autoAlpha: 0 },
            {
              x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 78%', once: true },
            }
          );
        }

        // Highlight badge with scaleX
        const badge = step.querySelector('.step-badge');
        if (badge) {
          gsap.fromTo(
            badge,
            { scaleX: 0, autoAlpha: 0 },
            {
              scaleX: 1, autoAlpha: 1, duration: 0.6, delay: 0.4, ease: 'power2.out',
              transformOrigin: 'left center',
              scrollTrigger: { trigger: step, start: 'top 75%', once: true },
            }
          );
        }

        // Node dot pulse on enter
        const dot = step.querySelector('.step-dot');
        if (dot) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            once: true,
            onEnter: () => {
              gsap.fromTo(dot,
                { scale: 0, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' }
              );
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="pt-20 pb-4 md:pt-28 md:pb-6 lg:pt-36 lg:pb-8 bg-dark overflow-hidden"
    >
      <div className="container-custom px-6">

        {/* ── Header ── */}
        <div className="process-headline mb-20 md:mb-28 max-w-3xl">
          <span className="section-label mb-5 block">Cómo trabajamos</span>
          <h2 className="section-title text-white leading-tight">
            Sin líos raros,{' '}
            <span className="text-gradient-gold">te lo explicamos fácil</span>
          </h2>
          <p className="section-subtitle mt-5">
            Nada de procesos con 15 reuniones. Así funciona trabajar con nosotros — rápido, limpio y sin sorpresas.
          </p>
        </div>

        {/* ── Steps layout ── */}
        <div ref={lineTrackRef} className="relative">

          {/* Vertical line track */}
          <div className="hidden md:block absolute top-0 bottom-0 w-[1px] bg-white/[0.05]" style={{ left: '50px' }}>
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-brand via-brand/60 to-brand/10"
              style={{ transformOrigin: 'top center', scaleY: 0 }}
            />
          </div>

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="process-step relative grid md:grid-cols-[100px_1fr] gap-8 md:gap-12 items-stretch md:min-h-[260px]"
                >
                  {/* ── Columna Izquierda: Número + Punto ── */}
                  <div className="flex flex-col items-center pt-10 md:pt-16">
                    {/* Número del paso */}
                    <div
                      className="step-num font-heading font-black leading-none select-none pointer-events-none mb-6"
                      style={{
                        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                        color: 'rgba(245,197,24,0.15)',
                        lineHeight: 0.85,
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Punto del timeline */}
                    <div
                      className="step-dot w-12 h-12 rounded-full border-2 border-brand bg-dark flex items-center justify-center shadow-[0_0_24px_rgba(245,197,24,0.25)]"
                      style={{ opacity: 0 }}
                    >
                      <Icon size={28} className="text-brand" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* ── Columna Derecha: Contenido ── */}
                  <div className="step-content relative flex flex-col justify-center py-10 md:py-16 pl-8">
                    {/* Mobile icon */}
                    <div className="md:hidden mb-4 w-10 h-10 rounded-full border-2 border-brand/40 bg-surface-300 flex items-center justify-center">
                      <Icon size={18} className="text-brand" strokeWidth={1.8} />
                    </div>

                    {/* Step tag */}
                    <span className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand/70 mb-3 block">
                      {step.tag}
                    </span>

                    {/* Título */}
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
                      {step.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-white/50 font-body text-base leading-relaxed max-w-md mb-6">
                      {step.body}
                    </p>

                    {/* Highlight badge */}
                    <div
                      className="step-badge inline-flex items-center gap-2 px-4 py-2 border border-brand/25 bg-brand/5 w-fit"
                      style={{ transformOrigin: 'left center' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="font-body text-xs font-semibold text-brand uppercase tracking-wider">
                        {step.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Separator line (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden col-span-2 h-[1px] bg-white/[0.06] my-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-20 md:mt-28 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/[0.06] pt-12">
          <div>
            <p className="text-white font-heading text-xl font-bold mb-1">
              ¿Listo para empezar?
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              El proceso completo — desde la primera llamada hasta el trabajo acabado — suele resolverse en menos tiempo del que piensas.
            </p>
          </div>
          <a
            href="#contacto"
            className="btn-brand shrink-0 group flex items-center gap-3 !px-8 !py-4"
          >
            Pide presupuesto ahora
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
