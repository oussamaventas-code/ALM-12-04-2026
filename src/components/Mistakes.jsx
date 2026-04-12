import { useEffect, useRef } from 'react';
import { AlertTriangle, XCircle, Ban, ShieldOff } from 'lucide-react';
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
    <section ref={sectionRef} className="section-padding bg-surface">
      <div className="container-custom px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label text-danger">Errores comunes</span>
          <h2 className="section-title mt-4">
            Errores que evitamos en cada instalación
          </h2>
          <p className="section-subtitle mt-2">
            Después de 10 años, hemos visto de todo. Estas son las cosas que
            nunca vas a encontrar en nuestro trabajo.
          </p>
        </div>

        {/* 2-col grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {mistakes.map((m, i) => (
            <div
              key={i}
              className="mistake-card bg-surface border border-surface-300 p-6 md:p-8 border-l-[4px] border-l-danger/70 hover:border-l-danger transition-all duration-400 group"
              style={{ visibility: 'hidden' }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <m.icon
                    size={22}
                    className="text-danger/70 group-hover:text-danger transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-ink mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-ink-400 text-sm leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
