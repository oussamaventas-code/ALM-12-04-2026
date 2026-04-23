import { useEffect, useRef } from 'react';
import { AlertTriangle, XCircle, Ban, ShieldOff, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mistakes = [
  {
    icon: AlertTriangle,
    title: 'Sobrecargas por mala planificación',
    description:
      'Cuando alguien instala sin calcular bien, se sobrecargan los circuitos. Eso acaba en saltos de diferencial y riesgo de incendio.',
  },
  {
    icon: XCircle,
    title: 'Material barato que falla al año',
    description:
      'El cable o el diferencial más barato sale caro. Nosotros usamos material de primeras marcas que dura de verdad.',
  },
  {
    icon: Ban,
    title: 'Instalaciones que no pasan inspección',
    description:
      'Si no se hace bien, luego vienen las multas y los problemas con la aseguradora. Nosotros lo hacemos para que pase a la primera.',
  },
  {
    icon: ShieldOff,
    title: 'Chapuzas de otros que hay que rehacer',
    description:
      'Nos llegan muchos trabajos de arreglar lo que otros dejaron a medias. No somos los más baratos, pero tampoco te tocará pagar dos veces.',
  },
];

export default function Mistakes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mistake-card',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
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
    <section ref={sectionRef} className="section-padding bg-dark">
      <div className="container-custom px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label">Errores comunes</span>
          <h2 className="section-title mt-4 text-white">
            Errores que evitamos en cada instalación
          </h2>
          <p className="section-subtitle mt-2">
            Llevamos en esto desde 2018 y hemos visto de todo. Estas son las cosas que
            intentamos evitar en cada trabajo.
          </p>
        </div>

        {/* 2-col grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {mistakes.map((m, i) => (
            <div
              key={i}
              className="mistake-card card-dark bg-black/20 border border-white/[0.05] p-6 md:p-8 border-l-[4px] border-l-brand/50 hover:border-l-brand hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5 transition-all duration-400 group"
              style={{ visibility: 'hidden' }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-400">
                    <m.icon
                      size={20}
                      className="text-brand/70 group-hover:text-brand transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug group-hover:text-brand transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <a
            href="https://wa.me/34605333108"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand inline-flex items-center gap-2"
          >
            Quiero una instalación sin sorpresas
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
