import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const StatCounter = ({ end, suffix = '', label }) => {
  const nodeRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    const obj = { val: 0 };
    
    gsapCtx.current = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          node.textContent = Math.floor(obj.val) + suffix;
        }
      });
    });
    return () => {};
  }, [end, suffix]);

  useLayoutEffect(() => {
    return () => {
      if (gsapCtx.current) {
        gsapCtx.current.revert();
        gsapCtx.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <span ref={nodeRef} className="font-heading text-4xl lg:text-5xl font-extrabold text-brand">
        0{suffix}
      </span>
      <span className="font-body text-xs text-ink-300 uppercase tracking-widest font-bold">
        {label}
      </span>
    </div>
  );
};

const reasons = [
  {
    num: '01',
    title: 'Segunda generación de electricistas',
    desc: 'Esto no lo aprendimos ayer. Llevamos el oficio en la familia y cada año sumamos formación nueva.',
  },
  {
    num: '02',
    title: '100% inspecciones aprobadas',
    desc: 'Ni una sola inspección fallida. Trabajamos para que pase a la primera, sin dramas ni revisitas.',
  },
  {
    num: '03',
    title: 'Precio cerrado sin sorpresas',
    desc: 'Te damos un número antes de empezar y es ese. Nada de "me ha surgido un imprevisto" a mitad de obra.',
  },
  {
    num: '04',
    title: 'Garantía por escrito en cada trabajo',
    desc: 'Todo queda firmado. Si algo falla dentro de la garantía, volvemos y lo arreglamos sin coste.',
  },
  {
    num: '05',
    title: 'Urgencias 24h los 365 días',
    desc: 'Da igual que sea domingo a las tres de la mañana. Nos llamas, respondemos y vamos.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const bigNumRef = useRef(null);
  const progressBarRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    gsapCtx.current = gsap.context(() => {
      /* Left column entrance */
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

      /* Stagger reason rows */
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

      /* Big number parallax */
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

      /* Scrub: highlight active reason + fill progress bar */
      const rowEls = gsap.utils.toArray('.reason-row');
      ScrollTrigger.create({
        trigger: '.reason-list',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Progress bar height
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleY(${p})`;
          }

          // Activate each row as the scroll reaches it
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

    return () => {};
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (gsapCtx.current) {
        gsapCtx.current.revert();
        gsapCtx.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-surface overflow-hidden">
      {/* Decorative big number with parallax */}
      <div
        ref={bigNumRef}
        className="absolute top-8 right-8 big-number-dark opacity-30 select-none pointer-events-none hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        10+
      </div>

      <div className="container-custom px-6">
        {/* Asymmetric grid: left headline, right reasons */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          {/* Left side — headline block */}
          <div className="whyus-left lg:sticky lg:top-32">
            <span className="section-label mb-6">Por qué elegirnos</span>

            <h2 className="section-title mt-4">
              No somos los más baratos.
              <br />
              <span className="text-gradient-brand">Somos los que no fallan.</span>
            </h2>

            <p className="section-subtitle mt-6">
              Lo que nos diferencia no es una promesa bonita — es que cada inspección pasa, cada plazo se
              cumple y cada cliente repite.
            </p>

            <div className="mt-8 h-[3px] w-12 bg-brand" />

            {/* Trust pillars — distintos a los de Metrics */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">24h</span>
                <span className="font-body text-xs text-ink-300 uppercase tracking-widest font-bold">Disponibilidad real</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">0</span>
                <span className="font-body text-xs text-ink-300 uppercase tracking-widest font-bold">Inspecciones fallidas</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">60'</span>
                <span className="font-body text-xs text-ink-300 uppercase tracking-widest font-bold">Tiempo respuesta urgencia</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-3xl lg:text-4xl font-extrabold text-brand">2ª</span>
                <span className="font-body text-xs text-ink-300 uppercase tracking-widest font-bold">Generación de electricistas</span>
              </div>
            </div>

            {/* Vertical progress bar */}
            <div className="hidden lg:block mt-12 relative">
              <div className="relative h-32 w-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="absolute inset-0 origin-top rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, var(--color-brand), var(--color-brand-light))',
                    transform: 'scaleY(0)',
                    willChange: 'transform',
                  }}
                />
              </div>
              <p className="mt-3 text-xs font-body text-white/25 uppercase tracking-widest">
                Progreso
              </p>
            </div>
          </div>

          {/* Right side — numbered reason list */}
          <div className="reason-list space-y-0">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="reason-row group border-l-[3px] border-transparent transition-all duration-400 pl-6 py-6 cursor-default [&.reason-active]:border-brand [&.reason-active]:[box-shadow:-4px_0_12px_-4px_var(--color-brand)]"
                style={{ borderBottom: '1px solid var(--color-surface-300)' }}
              >
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <span className="font-heading text-2xl font-extrabold text-surface-400 transition-colors duration-400 shrink-0 mt-0.5 group-hover:text-brand [.reason-active_&]:text-brand">
                    {r.num}
                  </span>

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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
