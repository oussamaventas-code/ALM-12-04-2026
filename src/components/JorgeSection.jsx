import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { jorgeValues, jorgeFacts } from '../data/history';
import { ArrowRight, Quote, Bike, CheckCircle, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function JorgeSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.js-left', {
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.from('.js-right', {
        x: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.from('.js-value', {
        y: 20, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.js-values-grid', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-dark overflow-hidden" aria-labelledby="jorge-heading">
      {/* Fondo sutil */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand/4 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom px-6 relative z-10">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
            <Heart size={14} className="text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">Quién hay detrás</span>
          </div>
          <h2 id="jorge-heading" className="section-title">
            El electricista y la persona
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            No contratás a una empresa anónima. Contratás a Jorge. Y merece que sepas quién es.
          </p>
        </div>

        {/* Layout principal */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda — texto */}
          <div className="js-left">
            {/* Cita destacada */}
            <div className="relative bg-white/4 border border-white/10 rounded-2xl p-7 mb-8">
              <Quote size={28} className="text-brand/40 mb-4" aria-hidden="true" />
              <p className="font-heading text-xl font-bold text-white leading-snug mb-2">
                "No seré el mejor, pero me gusta hacer lo mejor que sé en cada trabajo."
              </p>
              <p className="text-white/40 text-sm">— Jorge, fundador de ALM Electricidad</p>
              {/* Acento decorativo */}
              <div className="absolute top-0 left-7 w-12 h-0.5 bg-brand" aria-hidden="true" />
            </div>

            <p className="text-white/65 leading-relaxed mb-5">
              Jorge lleva más de seis años en el sector eléctrico — no porque no encontrara otra cosa,
              sino porque le apasiona resolver problemas reales con las manos. Empezó solo, sin red de contactos,
              y construyó la empresa a base de que los clientes volvieran y recomendaran.
            </p>
            <p className="text-white/65 leading-relaxed mb-5">
              Fuera del trabajo, pedalea. El ciclismo le enseñó que constancia y paciencia son más valiosas
              que la velocidad. Esa mentalidad es exactamente cómo aborda cada instalación: sin atajos,
              sin materiales de segunda.
            </p>
            <p className="text-white/65 leading-relaxed mb-8">
              ALM lleva las iniciales de Alicia, Lucia y Melisa — su familia. Eso no es marketing.
              Es el estándar que se autoimpone: una empresa que lleva el nombre de tu familia
              no puede permitirse hacer las cosas mal.
            </p>

            {/* Facts rápidos */}
            <div className="space-y-3 mb-8">
              {jorgeFacts.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-white font-semibold text-sm">{f.label}:</span>{' '}
                    <span className="text-white/55 text-sm">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/sobre-nosotros" className="btn-brand">
                Nuestra historia completa
                <ArrowRight size={16} />
              </Link>
              <Link to="/contacto" className="btn-outline !border-white/20 !text-white hover:!border-brand hover:!text-brand">
                Habla con Jorge
              </Link>
            </div>
          </div>

          {/* Columna derecha — valores */}
          <div className="js-right">
            {/* Tarjeta visual "ciclismo" */}
            <div className="relative bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-2xl p-7 mb-6 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand/8 rounded-full blur-2xl" aria-hidden="true" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-brand/15 border border-brand/30 rounded-xl flex items-center justify-center">
                  <Bike size={22} className="text-brand" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white">La mentalidad del ciclismo</p>
                  <p className="text-white/45 text-sm">aplicada al trabajo eléctrico</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                No gana el más rápido. Gana el que no para. Las cuestas del ciclismo le enseñaron
                a Jorge que el esfuerzo sostenido siempre llega más lejos que el sprint puntual.
                Cada proyecto es una ascensión: se planifica, se ejecuta y se termina sin dejar nada a medias.
              </p>
            </div>

            {/* Grid de valores */}
            <div className="js-values-grid grid grid-cols-2 gap-3">
              {jorgeValues.map((v) => (
                <div
                  key={v.title}
                  className="js-value bg-white/4 border border-white/8 rounded-xl p-5 hover:border-brand/30 hover:bg-white/7 transition-all duration-300 group"
                >
                  <p className="font-heading font-bold text-white mb-2 group-hover:text-brand transition-colors">
                    {v.title}
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
