import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const metrics = [
  { value: 8, suffix: '+', prefix: '', label: 'Años en el oficio', sub: 'Desde 2018, segunda generación' },
  { value: 500, suffix: '+', prefix: '', label: 'Proyectos terminados', sub: 'Residencial e industrial' },
  { value: 100, suffix: '%', prefix: '', label: 'Precio cerrado siempre', sub: 'Sin costes que no esperabas' },
  { value: 24, suffix: 'h', prefix: '<', label: 'Te respondemos (o antes)', sub: 'Urgencias 365 días' },
];

export default function Metrics() {
  const sectionRef = useRef(null);
  const gsapCtx = useRef(null);

  useEffect(() => {
    gsapCtx.current = gsap.context(() => {
      /* Counter animation */
      metrics.forEach((m, i) => {
        const el = document.querySelector(`.metric-num-${i}`);
        if (!el) return;

        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: m.value,
              duration: 2.2,
              ease: 'power2.out',
              delay: i * 0.18,
              onUpdate: () => {
                el.textContent = `${m.prefix}${Math.round(obj.val)}${m.suffix}`;
              },
            });
          },
        });
      });

      /* Stagger columns in */
      gsap.fromTo(
        '.metric-col',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* Underline width grow */
      gsap.fromTo(
        '.metric-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
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
    <section
      ref={sectionRef}
      className="relative bg-dark py-20 md:py-24 lg:py-20 overflow-hidden"
      aria-label="Métricas de confianza"
    >
      {/* Ambient amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-brand/3 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container-custom px-6">
        {/* Dashboard-style horizontal strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-white/[0.06]">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="metric-col px-6 lg:px-10 first:pl-0 last:pr-0"
            >
              {/* Big number — aria-hidden: el lector no ve la animación */}
              <span
                className={`metric-num-${i} block font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white`}
                aria-hidden="true"
              >
                {m.prefix}0{m.suffix}
              </span>

              {/* Valor estático para lectores de pantalla */}
              <span className="sr-only">
                {m.prefix}{m.value}{m.suffix} — {m.label}
              </span>

              {/* Thin amber underline */}
              <div
                className="metric-rule mt-4 mb-4 h-[2px] origin-left"
                aria-hidden="true"
                style={{
                  background: 'linear-gradient(90deg, var(--color-brand), var(--color-brand-glow))',
                }}
              />

              {/* Label */}
              <p className="font-body text-sm font-semibold text-white/80 tracking-wide uppercase" aria-hidden="true">
                {m.label}
              </p>
              <p className="font-body text-xs text-white/50 mt-1" aria-hidden="true">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
