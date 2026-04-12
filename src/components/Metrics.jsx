import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 10, suffix: '+', prefix: '', label: 'Años currando sin parar', sub: 'Segunda generación' },
  { value: 500, suffix: '+', prefix: '', label: 'Proyectos terminados', sub: 'Residencial e industrial' },
  { value: 100, suffix: '%', prefix: '', label: 'Pasan inspección a la primera', sub: 'Sin repetir visitas' },
  { value: 24, suffix: 'h', prefix: '<', label: 'Te respondemos (o antes)', sub: 'Urgencias 365 días' },
];

export default function Metrics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-dark py-24 md:py-32 overflow-hidden">
      {/* Ambient amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-brand/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom px-6">
        {/* Dashboard-style horizontal strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-white/[0.06]">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="metric-col px-6 lg:px-10 first:pl-0 last:pr-0 invisible"
            >
              {/* Big number */}
              <span
                className={`metric-num-${i} block font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white`}
              >
                {m.prefix}0{m.suffix}
              </span>

              {/* Thin amber underline */}
              <div
                className="metric-rule mt-4 mb-4 h-[2px] origin-left"
                style={{
                  background: 'linear-gradient(90deg, var(--color-brand), var(--color-brand-glow))',
                }}
              />

              {/* Label */}
              <p className="font-body text-sm font-semibold text-white/80 tracking-wide uppercase">
                {m.label}
              </p>
              <p className="font-body text-xs text-white/35 mt-1">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
