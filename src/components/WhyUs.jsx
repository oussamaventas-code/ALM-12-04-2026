import { useLayoutEffect, useRef } from 'react';
import { MessageCircle, Users, ClipboardCheck, Wallet, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reasons = [
  {
    num: '01',
    icon: Users,
    title: 'Segunda generación de electricistas',
    desc: 'Esto no lo aprendimos ayer. Llevamos el oficio en la familia y cada año sumamos formación nueva.',
  },
  {
    num: '02',
    icon: ClipboardCheck,
    title: 'Instalaciones que pasan inspección',
    desc: 'Seguimos el REBT al detalle y tomamos el tiempo que hace falta. Sin atajos que luego dan problemas con la aseguradora.',
  },
  {
    num: '03',
    icon: Wallet,
    title: 'Precio cerrado sin sorpresas',
    desc: 'Te damos un número antes de empezar y es ese. Nada de "me ha surgido un imprevisto" a mitad de obra.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Garantía por escrito en cada trabajo',
    desc: 'Todo queda firmado. Si algo falla dentro de la garantía, volvemos y lo arreglamos sin coste.',
  },
  {
    num: '05',
    icon: Zap,
    title: 'Urgencias 24h los 365 días',
    desc: 'Da igual que sea domingo a las tres de la mañana. Nos llamas, respondemos y vamos.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const bigNumRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.whyus-left',
        { x: -40, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.reason-row',
        { x: 30, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reason-list',
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (bigNumRef.current) {
        gsap.to(bigNumRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      const rowEls = gsap.utils.toArray('.reason-row');
      ScrollTrigger.create({
        trigger: '.reason-list',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          rowEls.forEach((row, i) => {
            const threshold = i / (rowEls.length - 1);
            if (p >= threshold - 0.08) {
              row.classList.add('reason-active');
            } else {
              row.classList.remove('reason-active');
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-surface overflow-hidden">
      <div
        ref={bigNumRef}
        className="absolute top-8 right-8 big-number-dark opacity-30 select-none pointer-events-none hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        8+
      </div>

      <div className="container-custom px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          {/* Left side */}
          <div className="whyus-left lg:sticky lg:top-32">
            <span className="section-label mb-6">Por qué elegirnos</span>

            <h2 className="section-title mt-4">
              Instalaciones eléctricas
              <br />
              <span className="text-brand">en Madrid y Toledo</span>
            </h2>

            <p className="section-subtitle mt-6">
              En ALMelectricidad ofrecemos soluciones eléctricas integrales para viviendas, empresas
              e industria, con un enfoque claro: seguridad, eficiencia y cuidado en cada instalación.
              Somos instaladores autorizados y trabajamos conforme al Reglamento Electrotécnico
              de Baja Tensión (REBT), para que la instalación quede segura, legal y duradera.
            </p>

            <p className="font-body text-base text-ink-500 mt-5 leading-relaxed max-w-md">
              Trabajamos con un objetivo sencillo: cuidar cada detalle desde el inicio hasta la
              puesta en marcha. No solo instalamos — intentamos que tu instalación consuma menos,
              funcione mejor y te dé tranquilidad a largo plazo.
            </p>

            <div className="mt-8 h-[3px] w-12 bg-brand" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">24h</span>
                <span className="font-body text-xs text-ink-600 uppercase tracking-widest font-bold">Disponibilidad real</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">100%</span>
                <span className="font-body text-xs text-ink-600 uppercase tracking-widest font-bold">Precio cerrado</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">&lt;60 MIN</span>
                <span className="font-body text-xs text-ink-600 uppercase tracking-widest font-bold">Respuesta urgencia</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">2ª GEN</span>
                <span className="font-body text-xs text-ink-600 uppercase tracking-widest font-bold">De electricistas</span>
              </div>
            </div>

            {/* CTA */}
            <div className="hidden lg:block mt-12">
              <a
                href="https://wa.me/34605333108"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-3 !px-6 inline-flex"
              >
                <MessageCircle size={16} />
                ¿Hablamos? Escríbenos ya
              </a>
            </div>
          </div>

          {/* Right side — reason list with icons */}
          <div className="reason-list space-y-0">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className="reason-row group border-l-[3px] border-transparent transition-all duration-400 pl-6 py-6 cursor-default [&.reason-active]:border-brand [&.reason-active]:bg-brand/[0.04] [&.reason-active]:[box-shadow:-4px_0_16px_-4px_var(--color-brand)]"
                  style={{ borderBottom: '1px solid var(--color-surface-300)' }}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon box + number */}
                    <div className="shrink-0 mt-0.5 flex flex-col items-center gap-1.5">
                      <div className="w-9 h-9 border border-surface-400 flex items-center justify-center transition-all duration-400 group-hover:border-brand group-hover:bg-brand/10 [.reason-active_&]:border-brand [.reason-active_&]:bg-brand/10">
                        <Icon
                          size={17}
                          className="text-surface-400 transition-colors duration-400 group-hover:text-brand [.reason-active_&]:text-brand"
                        />
                      </div>
                      <span className="font-heading text-xs font-extrabold text-surface-400 transition-colors duration-400 group-hover:text-brand [.reason-active_&]:text-brand">
                        {r.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink transition-colors duration-400 leading-snug group-hover:text-brand [.reason-active_&]:text-brand">
                        {r.title}
                      </h3>
                      <p className="font-body text-sm text-ink-400 mt-1.5 leading-relaxed max-w-md">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
