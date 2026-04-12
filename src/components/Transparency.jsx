import { useEffect, useRef } from 'react';
import { XOctagon, Clock, FileWarning } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: XOctagon,
    title: 'Si buscas lo más barato del mercado',
    description:
      'Usamos material bueno y trabajamos con tiempo para hacerlo bien. Si priorizas precio por encima de todo, seguramente no somos tu mejor opción.',
  },
  {
    icon: Clock,
    title: 'Si necesitas algo urgente sin ninguna planificación',
    description:
      'Atendemos urgencias, pero si la urgencia es porque no se planificó bien, necesitamos un mínimo de organización para hacer un trabajo serio.',
  },
  {
    icon: FileWarning,
    title: 'Si prefieres no cumplir la normativa',
    description:
      'No hacemos instalaciones "de cualquier manera". Todo lo que hacemos cumple el REBT y pasa inspección. Es nuestra manera de trabajar.',
  },
];

export default function Transparency() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header entrance */
      gsap.fromTo(
        '.transparency-header',
        { y: -20, autoAlpha: 0 },
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

      /* Stagger reason rows */
      gsap.fromTo(
        '.transparency-row',
        { x: -30, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.transparency-list',
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* Closing text */
      gsap.fromTo(
        '.transparency-closing',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.transparency-closing',
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-surface relative overflow-hidden">
      <div className="container-custom px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="transparency-header invisible mb-14">
            <span className="section-label mb-6">Siendo sinceros</span>
            <h2 className="section-title mt-4">
              Cuándo <span className="text-gradient-brand">NO</span> somos tu mejor opción
            </h2>
            <p className="section-subtitle mt-4">
              Preferimos ser claros desde el principio. No queremos hacerte perder el tiempo
              ni perdérnoslo nosotros.
            </p>
            <div className="mt-6 h-[3px] w-12 bg-brand" />
          </div>

          {/* Reason list */}
          <div className="transparency-list space-y-0">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="transparency-row invisible group border-l-[3px] border-transparent hover:border-brand transition-all duration-400 cursor-default"
                style={{ borderBottom: '1px solid var(--color-surface-300)' }}
              >
                <div className="flex items-start gap-5 pl-6 py-7">
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-surface-200 group-hover:bg-brand/10 transition-colors duration-400">
                    <r.icon
                      size={20}
                      strokeWidth={1.8}
                      className="text-ink-400 group-hover:text-brand transition-colors duration-400"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink group-hover:text-brand transition-colors duration-400 leading-snug">
                      {r.title}
                    </h3>
                    <p className="font-body text-sm text-ink-400 mt-1.5 leading-relaxed max-w-lg">
                      {r.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing text */}
          <p className="transparency-closing invisible font-body text-ink-400 mt-10 text-sm leading-relaxed text-center max-w-xl mx-auto">
            Si después de leer esto piensas{' '}
            <span className="font-semibold text-ink">"estos son los míos"</span>, entonces sí,
            probablemente lo somos.
          </p>
        </div>
      </div>
    </section>
  );
}
