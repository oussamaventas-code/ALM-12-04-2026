import { useLayoutEffect, useRef } from 'react';
import { Shield, X, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const comparisons = [
  {
    aspect: 'Precio',
    nosotros: 'Precio cerrado, sin sorpresas posteriores',
    otros: 'Precio inicial bajo, costes extras al final',
  },
  {
    aspect: 'Materiales',
    nosotros: 'Primeras marcas (Schneider, Legrand, ABB)',
    otros: 'Lo más barato que encuentran ese día',
  },
  {
    aspect: 'Garantía',
    nosotros: 'Volvemos si algo falla, sin preguntas',
    otros: 'El número ya no coge cuando hay problemas',
  },
  {
    aspect: 'Certificación',
    nosotros: 'Todo legalizado y con documentación',
    otros: 'Sin papeles ni certificados de instalación',
  },
  {
    aspect: 'Relación',
    nosotros: 'Relación a largo plazo, cliente de confianza',
    otros: 'Trabajo puntual, no vuelves a saber de ellos',
  },
];

export default function PricingPhilosophy() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-header > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });
      gsap.from('.pp-row', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-table', start: 'top 80%', once: true },
      });
      gsap.from('.pp-cta', {
        y: 25, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-cta', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-surface overflow-hidden"
      aria-labelledby="pricing-philosophy-heading"
    >
      <div className="container-custom px-6">

        {/* Header */}
        <div className="pp-header text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
            <Shield size={14} className="text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">Transparencia total</span>
          </div>
          <h2 id="pricing-philosophy-heading" className="section-title">
            Cómo entendemos{' '}
            <span className="text-gradient-gold">el precio.</span>
          </h2>
          <p className="section-subtitle">
            Trabajamos con precios cerrados desde el principio. Lo que te decimos
            es lo que pagas, sin sorpresas a mitad de obra.
          </p>
        </div>

        {/* Tabla comparativa */}
        <div className="pp-table max-w-4xl mx-auto mb-14">
          {/* Encabezados */}
          <div className="grid grid-cols-3 gap-2 mb-3 px-2">
            <div className="text-white/60 text-xs uppercase tracking-wider font-semibold">Aspecto</div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 bg-brand/15 border border-brand/30 text-brand text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle size={12} />
                ALM Electricidad
              </span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/15 text-white/60 text-xs font-bold px-3 py-1.5 rounded-full">
                <X size={12} />
                El más barato
              </span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10">
            {comparisons.map((row, i) => (
              <div
                key={row.aspect}
                className={`pp-row grid grid-cols-3 gap-2 p-4 ${
                  i % 2 === 0 ? 'bg-white/[0.04]' : 'bg-transparent'
                } border-b border-white/8 last:border-0`}
              >
                <div className="font-heading font-bold text-white/90 text-sm flex items-center">
                  {row.aspect}
                </div>
                <div className="flex items-start gap-2 text-sm text-white/90 leading-snug">
                  <CheckCircle size={14} className="text-brand flex-shrink-0 mt-0.5" />
                  {row.nosotros}
                </div>
                <div className="flex items-start gap-2 text-sm text-white/60 leading-snug">
                  <X size={14} className="text-red-400/75 flex-shrink-0 mt-0.5" />
                  {row.otros}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pp-cta text-center">
          <p className="text-white/70 text-sm mb-5">
            Si encajamos con lo que buscas, estaremos encantados de hablar.
          </p>
          <Link to="/contacto" className="btn-brand">
            Solicitar presupuesto
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
}
