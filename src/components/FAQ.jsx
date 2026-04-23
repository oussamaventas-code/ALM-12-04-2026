import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const faqs = [
  {
    question: '¿Cuánto cuesta una instalación eléctrica?',
    answer:
      'Depende del tipo y tamaño del proyecto. Lo que sí hacemos siempre es darte un presupuesto cerrado antes de empezar, sin sorpresas ni costes ocultos.',
  },
  {
    question: '¿Trabajáis en toda la Comunidad de Madrid?',
    answer:
      'Sí, cubrimos Madrid, Toledo y alrededores. Si tu proyecto está en la zona, nos desplazamos sin problema.',
  },
  {
    question: '¿Tenéis servicio de urgencias?',
    answer:
      'Sí, 24 horas los 365 días del año. Nos llamas, respondemos y vamos.',
  },
  {
    question: '¿Pasáis las inspecciones de industria?',
    answer:
      'Trabajamos para que pase a la primera. Seguimos el REBT al detalle y nos tomamos el tiempo necesario para hacerlo bien. Si por alguna razón hubiera una revisión, la resolvemos sin coste para ti.',
  },
  {
    question: '¿Qué garantía tienen vuestros trabajos?',
    answer:
      'Mínimo 30 días en cualquier trabajo. Según el tipo de instalación, la garantía puede llegar hasta 2 años. Todo queda por escrito.',
  },
  {
    question: '¿Hacéis boletines eléctricos?',
    answer:
      'Sí, emitimos boletines CIE/BIE y gestionamos todos los trámites con la administración. Tú no te preocupas de nada.',
  },
  {
    question: '¿Instaláis paneles solares?',
    answer:
      'Sí, diseñamos e instalamos sistemas fotovoltaicos completos con legalización incluida. Desde el estudio inicial hasta la puesta en marcha.',
  },
  {
    question: '¿Cuánto se tarda en recibir el presupuesto?',
    answer:
      'Normalmente en menos de 24 horas. Dependiendo de la complejidad, a veces el mismo día.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  /* IDs únicos para aria-controls / id pairs */
  const qId = (i) => `faq-question-${i}`;
  const aId = (i) => `faq-answer-${i}`;

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
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

      gsap.fromTo(
        '.faq-item',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding bg-dark relative overflow-hidden"
    >
      {/* Editorial background number */}
      <div className="absolute top-8 left-8 big-number-dark select-none pointer-events-none hidden lg:block">
        FAQ
      </div>

      <div className="container-custom px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="faq-header invisible mb-14">
            <span className="section-label mb-6">Preguntas frecuentes</span>
            <h2
              className="section-title mt-4 text-white"
            >
              Lo que nos preguntan{' '}
              <span className="text-gradient-brand">siempre</span>
            </h2>
            <p className="section-subtitle mt-4 text-white/50">
              Respuestas directas, sin rodeos. Si no encuentras tu duda, escríbenos.
            </p>
            <div className="mt-6 h-[3px] w-12 bg-brand" />
          </div>

          {/* FAQ List */}
          <div className="faq-list space-y-0" role="list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="faq-item invisible rounded-lg overflow-hidden transition-all duration-300"
                  role="listitem"
                  style={{
                    backgroundColor: isOpen
                      ? 'rgba(245, 197, 24, 0.08)'
                      : 'rgba(245, 197, 24, 0.03)',
                    border: isOpen
                      ? '1px solid rgba(245, 197, 24, 0.3)'
                      : '1px solid rgba(245, 197, 24, 0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {/* Question button */}
                  <button
                    id={qId(i)}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={aId(i)}
                    className="w-full flex items-center justify-between gap-4 py-6 px-6 text-left cursor-pointer group transition-all duration-300 hover:bg-white/[0.03] active:bg-white/[0.08]"
                    style={{
                      borderLeft: isOpen
                        ? '4px solid var(--color-brand)'
                        : '4px solid transparent',
                      paddingLeft: '1.5rem',
                    }}
                  >
                    <span
                      className="font-heading text-base font-semibold leading-snug transition-colors duration-300"
                      style={{
                        color: isOpen
                          ? 'var(--color-brand)'
                          : 'var(--color-ink)',
                      }}
                    >
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="flex-shrink-0 transition-transform duration-400"
                      style={{
                        color: isOpen
                          ? 'var(--color-brand)'
                          : 'var(--color-ink-600)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {/* Answer panel — grid-template-rows para expand/collapse sin reflow */}
                  <div
                    id={aId(i)}
                    role="region"
                    aria-labelledby={qId(i)}
                    className="border-t border-brand/20"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.35s ease',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-5 bg-brand/5">
                        <p className="font-body text-sm leading-relaxed max-w-xl text-white/70">
                          {faq.answer}
                        </p>
                      </div>
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
