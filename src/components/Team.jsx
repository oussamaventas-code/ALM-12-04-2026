import { useEffect, useRef } from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  'Seriedad absoluta',
  'Puntualidad británica',
  'Soluciones rápidas',
  'Materiales de calidad',
];

export default function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-photo',
        { x: -60, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.team-text',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.team-value',
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.team-values-grid',
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
      id="sobre-mi"
      ref={sectionRef}
      className="py-24 md:py-32 bg-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ---- Left: Editorial Photo ---- */}
          <div className="team-photo lg:col-span-5 relative">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src="/LOGO Y JORGE/JORGE.PNG"
                alt="Jorge Hernández García — Instalador Electricista Autorizado"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Gradient veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />

              {/* Glass badge */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-4">
                  <h3 className="text-white font-heading font-bold text-xl tracking-tight">
                    Jorge Hernández
                  </h3>
                  <p className="text-brand-light font-body text-sm font-medium mt-0.5">
                    Instalador Autorizado
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial accent line */}
            <div className="h-1 w-16 bg-brand mt-4" />
          </div>

          {/* ---- Right: Copy ---- */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Label + Heading */}
            <div className="team-text">
              <span className="section-label">Sobre mí</span>
              <h2 className="section-title mt-3 text-left">
                De tal palo,{' '}
                <span className="text-brand">tal astilla</span>
              </h2>
            </div>

            {/* Story */}
            <div className="space-y-5 text-ink/80 font-body leading-relaxed">
              <p className="team-text text-lg border-l-4 border-brand pl-5">
                Soy <strong className="text-ink">Jorge Hernández García</strong>,
                instalador electricista autorizado y orgulloso de ser la segunda
                generación de electricistas en mi familia, continuando la tradición
                y enseñanzas de mi padre y mi hermano, a quienes les dedico en
                especial este proyecto.
              </p>

              <p className="team-text">
                Llevo años ayudando a familias, comunidades y negocios a tener
                instalaciones seguras, eficientes y bien hechas. Si buscas un
                profesional que cuide cada detalle y te dé tranquilidad, cuenta
                conmigo.
              </p>

              <p className="team-text">
                Me gusta tratar a cada cliente de forma cercana, explicar cada paso
                del trabajo y usar materiales de alta calidad,{' '}
                <span className="text-ink font-bold">
                  para que todo quede como si fuera para mi propia casa
                </span>
                .
              </p>
            </div>

            {/* Quote box */}
            <div className="team-text relative bg-surface-200 border-l-4 border-brand p-6 md:p-8">
              <Quote className="absolute top-4 right-5 text-brand/10 h-14 w-14" />
              <p className="font-heading text-2xl md:text-3xl font-semibold italic text-ink relative z-10 leading-snug">
                &ldquo;Tu confianza,{' '}
                <span className="text-brand">nuestra mejor conexión.</span>&rdquo;
              </p>
            </div>

            {/* Values grid */}
            <div className="team-values-grid grid sm:grid-cols-2 gap-4 mt-2">
              {values.map((v) => (
                <div
                  key={v}
                  className="team-value flex items-center gap-3 py-2"
                >
                  <CheckCircle2 className="text-brand h-5 w-5 shrink-0" />
                  <span className="font-body font-semibold text-ink">{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
