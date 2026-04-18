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
            No somos para todos.{' '}
            <span className="text-gradient-gold">Y está bien.</span>
          </h2>
          <p className="section-subtitle">
            Si buscas el presupuesto más barato, seguramente hay alguien que te lo da.
            Nosotros no competimos por precio — competimos por tranquilidad.
          </p>
        </div>

        {/* Tabla comparativa */}
        <div className="pp-table max-w-4xl mx-auto mb-14">
          {/* Encabezados */}
          <div className="grid grid-cols-3 gap-2 mb-3 px-2">
            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold">Aspecto</div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 bg-brand/15 border border-brand/30 text-brand text-xs font-bold px-3 py-1.5 rounded-full">
                <CheckCircle size={12} />
                ALM Electricidad
              </span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/40 text-xs font-bold px-3 py-1.5 rounded-full">
                <X size={12} />
                El más barato
              </span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/8">
            {comparisons.map((row, i) => (
              <div
                key={row.aspect}
                className={`pp-row grid grid-cols-3 gap-2 p-4 ${
                  i % 2 === 0 ? 'bg-white/3' : 'bg-transparent'
                } border-b border-white/5 last:border-0`}
              >
                <div className="font-heading font-bold text-white/70 text-sm flex items-center">
                  {row.aspect}
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle size={14} className="text-brand flex-shrink-0 mt-0.5" />
                  {row.nosotros}
                </div>
                <div className="flex items-start gap-2 text-sm text-white/35">
                  <X size={14} className="text-red-400/60 flex-shrink-0 mt-0.5" />
                  {row.otros}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texto filosofía */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 mb-14">
          <div className="bg-white/4 border border-white/8 rounded-xl p-6">
            <h3 className="font-heading font-bold text-white mb-3">¿Somos para ti?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Trabajamos con personas que valoran la tranquilidad de saber que el trabajo está bien hecho.
              Que prefieren pagar un precio justo ahora antes que pagar dos veces después.
              Que quieren una instalación que pase inspección a la primera y no de problemas en cinco años.
            </p>
          </div>
          <div className="bg-brand/8 border border-brand/20 rounded-xl p-6">
            <h3 className="font-heading font-bold text-white mb-3">El coste real de lo barato</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Un cuadro mal hecho, un cable sin certificar, una instalación que no pasa la inspección —
              arreglarlo siempre cuesta más que haberlo hecho bien la primera vez.
              En el mundo eléctrico, "el dinero del pobre va dos veces" no es un dicho, es una realidad diaria.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pp-cta text-center">
          <p className="text-white/50 text-sm mb-5">
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
