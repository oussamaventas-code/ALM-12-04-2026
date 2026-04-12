import { useState, useEffect, useRef } from 'react';
import { Zap, Sun, Leaf, ArrowRight, Calculator } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EnergyCalculator() {
  const [consumption, setConsumption] = useState(500);
  const sectionRef = useRef(null);
  const resultRef = useRef(null);

  const savings = Math.round(consumption * 0.35);
  const yearSavings = savings * 12;
  const co2 = (consumption * 0.385 * 0.35 / 1000).toFixed(1);

  // Slider fill percentage
  const fillPercent = ((consumption - 100) / (2000 - 100)) * 100;

  // Pulse results on change
  useEffect(() => {
    if (resultRef.current) {
      gsap.fromTo(
        resultRef.current.querySelectorAll('.result-value'),
        { scale: 0.95, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }, [consumption]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.calculator-block',
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-dark overflow-hidden relative">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-[15%] w-80 h-80 bg-brand/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-[10%] w-60 h-60 bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container-custom px-6 relative">
        <div
          className="calculator-block max-w-3xl mx-auto"
          style={{ visibility: 'hidden' }}
        >
          {/* Header */}
          <div className="text-center mb-14">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-4 py-2 mb-6">
              <Calculator size={15} className="text-brand" />
              <span className="text-brand text-xs font-semibold uppercase tracking-wider">
                Calculadora solar
              </span>
            </div>

            <h2 className="section-title text-white">
              ¿Cuánto podrías ahorrarte con placas solares?
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm mt-3 leading-relaxed">
              Estimación orientativa. Para un cálculo real, déjanos echar un ojo
              a tu factura.
            </p>
          </div>

          {/* Calculator card */}
          <div className="card-dark p-8 md:p-10">
            {/* Slider */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
                <label className="text-white/60 text-sm font-medium">
                  Tu consumo mensual
                </label>
                <span className="font-heading font-bold text-2xl text-brand-glow">
                  {consumption}€
                  <span className="text-white/30 text-sm font-body font-normal ml-1">
                    /mes
                  </span>
                </span>
              </div>

              {/* Custom range slider */}
              <div className="relative">
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full h-2 appearance-none cursor-pointer bg-transparent relative z-10"
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                {/* Track background */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-dark-700 pointer-events-none" />
                {/* Track fill (amber) */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-gradient-to-r from-brand to-brand-glow pointer-events-none"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-white/25 text-xs mt-2 font-body">
                <span>100€</span>
                <span>2.000€</span>
              </div>
            </div>

            {/* Results */}
            <div ref={resultRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Monthly savings */}
              <div className="bg-dark/50 border border-brand/10 p-6 text-center">
                <Zap
                  size={18}
                  className="text-brand mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-white/35 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold mb-2">
                  Ahorro mensual
                </p>
                <p className="result-value font-heading font-bold text-3xl text-white">
                  {savings}
                  <span className="text-lg text-white/40 ml-0.5">€</span>
                </p>
              </div>

              {/* Annual savings */}
              <div className="bg-dark/50 border border-brand/10 p-6 text-center">
                <Sun
                  size={18}
                  className="text-brand-light mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-white/35 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold mb-2">
                  Ahorro anual
                </p>
                <p className="result-value font-heading font-bold text-3xl text-brand-glow">
                  {yearSavings.toLocaleString()}
                  <span className="text-lg text-brand/50 ml-0.5">€</span>
                </p>
              </div>

              {/* CO2 avoided */}
              <div className="bg-dark/50 border border-brand/10 p-6 text-center">
                <Leaf
                  size={18}
                  className="text-success mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-white/35 text-[0.6875rem] uppercase tracking-[0.15em] font-semibold mb-2">
                  CO&#8322; evitado/año
                </p>
                <p className="result-value font-heading font-bold text-3xl text-success">
                  {co2}
                  <span className="text-lg text-success/50 ml-1">Tn</span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a href="#contacto" className="btn-brand">
                Pide un estudio personalizado
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Disclaimer */}
            <p className="text-center text-white/25 text-xs mt-6 leading-relaxed max-w-md mx-auto">
              * Estimación basada en un autoconsumo del 35%. El ahorro real
              depende de tu cubierta, orientación y consumo. Sin compromiso.
            </p>
          </div>
        </div>
      </div>

      {/* Slider thumb styling */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #fbbf24;
          border: 2px solid #060b18;
          cursor: pointer;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 12px rgba(251, 191, 36, 0.35);
          transition: box-shadow 0.3s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.55);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #fbbf24;
          border: 2px solid #060b18;
          border-radius: 0;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(251, 191, 36, 0.35);
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
          height: 8px;
        }
      `}</style>
    </section>
  );
}
