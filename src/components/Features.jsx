import { useEffect, useRef } from 'react';
import { Shield, Wrench, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: 'Todo en regla, sin atajos',
    description:
      'Cada instalación cumple normativa. No hacemos ñapas ni dejamos nada a medias. Cuando llega la inspección, ya está todo preparado.',
    detail: 'REBT, BT, ITC... lo que haga falta',
  },
  {
    icon: Wrench,
    title: 'Lo hacemos como necesitas',
    description:
      'No tenemos una plantilla que sirva para todo el mundo. Vamos, vemos qué necesitas y te proponemos algo que tenga sentido para tu negocio.',
    detail: 'Cada proyecto es diferente',
  },
  {
    icon: Leaf,
    title: 'Que no se te vaya la luz (ni el dinero)',
    description:
      'Instalamos equipos que consumen lo justo. Te ayudamos a bajar la factura y, si quieres, te ponemos placas solares que realmente merecen la pena.',
    detail: 'Ahorro real, no promesas',
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-card',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Split: first feature = hero card (spans 2 cols), other two stacked right */
  const hero = features[0];
  const rest = features.slice(1);

  return (
    <section ref={sectionRef} className="section-padding bg-surface overflow-hidden">
      <div className="container-custom px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label mb-4">Por qué nos eligen</span>
          <h2 className="section-title mt-4">Lo hacemos bien y punto</h2>
          <p className="section-subtitle mt-2">
            Sin discursos bonitos. Esto es lo que nos diferencia de los que van
            con prisas y dejan cables sueltos.
          </p>
        </div>

        {/* Broken grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero card — left, full height */}
          <div className="feat-card card rounded-xl p-8 md:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group invisible min-h-[380px]">
            {/* Diagonal accent stripe */}
            <div
              className="absolute -right-16 -top-16 w-48 h-48 rotate-45 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-brand-glow), var(--color-brand))',
              }}
            />

            {/* Big decorative number */}
            <span className="big-number absolute -bottom-4 -right-2 opacity-30 !text-[10rem] leading-none select-none pointer-events-none">
              01
            </span>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors duration-400">
                <hero.icon size={28} className="text-brand" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-4 leading-tight">
                {hero.title}
              </h3>
              <p className="font-body text-ink-400 leading-relaxed mb-6 max-w-md text-[0.9375rem]">
                {hero.description}
              </p>
            </div>

            <span className="relative z-10 font-body text-brand text-sm font-semibold uppercase tracking-wider">
              {hero.detail}
            </span>
          </div>

          {/* Right column — 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {rest.map((f, i) => (
              <div
                key={i}
                className="feat-card card rounded-xl p-8 md:p-10 relative overflow-hidden group invisible flex-1"
              >
                {/* Subtle decorative number */}
                <span className="big-number absolute -bottom-2 -right-1 opacity-20 !text-[8rem] leading-none select-none pointer-events-none">
                  {String(i + 2).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors duration-400">
                      <f.icon size={24} className="text-brand" />
                    </div>

                    <div>
                      <h3 className="font-heading text-xl font-bold text-ink mb-2 leading-snug">
                        {f.title}
                      </h3>
                      <p className="font-body text-ink-400 leading-relaxed text-sm mb-3">
                        {f.description}
                      </p>
                      <span className="font-body text-brand text-xs font-semibold uppercase tracking-wider">
                        {f.detail}
                      </span>
                    </div>
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
