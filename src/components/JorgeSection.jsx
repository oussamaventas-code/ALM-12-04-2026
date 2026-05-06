import { useLayoutEffect, useRef } from 'react';
import { Quote, Heart } from 'lucide-react';
import gsap from 'gsap';

const team = [
  {
    name: 'Jorge Hernández García',
    role: 'Fundador y responsable de proyectos',
    extra: 'Instalador autorizado',
    desc: 'Supervisa y participa en cada instalación para asegurar que todo se haga correctamente desde el inicio hasta el final.',
    quote: 'No dejo un trabajo hasta que está como debe estar.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/JORGE.webp',
  },
  {
    name: 'Ismael Barbero',
    role: 'Técnico en instalaciones eléctricas, puntos de recarga y telecomunicaciones',
    desc: 'Trabajo preciso, ordenado y con acabados cuidados.',
    quote: 'Orden, limpieza y trabajo bien hecho en cada detalle.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/ISMA.webp',
  },
  {
    name: 'Daniel González',
    role: 'Técnico en instalaciones eléctricas, programaciones y puestas en marcha',
    desc: 'Experiencia en instalaciones y soluciones adaptadas a cada cliente.',
    quote: 'Un buen trabajo no da problemas, y ese es el objetivo.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/DANI.webp',
  },
  {
    name: 'Miguel Ángel Vélez (Melo)',
    role: 'Especialista en energía solar',
    desc: 'Optimización y montaje de sistemas fotovoltaicos.',
    quote: 'Que produzca bien no es suerte, es hacerlo bien desde el principio.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/MELO.webp',
  },
  {
    name: 'Jefferson',
    role: 'Especialista en energía solar',
    desc: 'Instalaciones eficientes y bien ejecutadas.',
    quote: 'La calidad se nota en el resultado final.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/JEFFERSON.webp',
  },
  {
    name: 'Melisa Hernando',
    role: 'Administración y RRHH',
    desc: 'Organización, gestión y atención al cliente.',
    quote: 'La clave está en que todo esté bien gestionado desde el principio.',
    img: '/images/team/EQUIPO%20PARA%20PAGINA/MELISA.webp',
  },
];

export default function JorgeSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-head', {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.team-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-dark overflow-hidden"
      aria-labelledby="equipo-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand/4 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom px-6 relative z-10">
        <div className="team-head text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
            <Heart size={14} className="text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">
              Quién hay detrás
            </span>
          </div>
          <h2 id="equipo-heading" className="section-title">
            El equipo de ALMelectricidad
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Personas reales detrás de cada instalación. Nos gusta que sepas con quién trabajas.
          </p>
        </div>

        <div className="team-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {team.map((p) => (
            <article
              key={p.name}
              className="team-card group flex flex-col bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-brand/40 transition-colors duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                <img
                  src={p.img}
                  alt={p.name}
                  width="600"
                  height="750"
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 scale-[1.02] group-hover:scale-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark via-dark/40 to-transparent" aria-hidden="true" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {p.name}
                </h3>
                {p.extra && (
                  <p className="text-brand text-xs font-semibold uppercase tracking-widest mt-1">
                    {p.extra}
                  </p>
                )}
                <p className="text-white/60 text-sm mt-2 leading-snug">{p.role}</p>
                <p className="text-white/55 text-sm mt-3 leading-relaxed">{p.desc}</p>

                <div className="mt-5 pt-5 border-t border-white/10 flex gap-3">
                  <Quote size={16} className="text-brand/60 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white/75 text-sm italic leading-snug">"{p.quote}"</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
