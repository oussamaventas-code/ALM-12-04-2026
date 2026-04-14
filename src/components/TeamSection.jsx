import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Dani',
    role: 'Especialista Técnico',
    image: '/images/team/EQUIPO PARA PAGINA/DANI.png',
  },
  {
    name: 'Isma',
    role: 'Técnico Senior',
    image: '/images/team/EQUIPO PARA PAGINA/ISMA.png',
  },
  {
    name: 'Jefferson',
    role: 'Instalador',
    image: '/images/team/EQUIPO PARA PAGINA/JEFFERSON.png',
  },
  {
    name: 'Jorge',
    role: 'Instalador Jefe',
    image: '/images/team/EQUIPO PARA PAGINA/JORGE.png',
  },
  {
    name: 'Melo',
    role: 'Técnico Especialista',
    image: '/images/team/EQUIPO PARA PAGINA/MELO.png',
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-section-heading',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.team-member-card',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-members-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipo"
      ref={sectionRef}
      className="py-24 md:py-32 bg-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="team-section-heading text-center mb-16 invisible">
          <span className="section-label">Nuestro Equipo</span>
          <h2 className="section-title mt-3">
            Las manos expertas{' '}
            <span className="text-brand">de cada proyecto</span>
          </h2>
          <p className="font-body text-lg text-ink/70 max-w-2xl mx-auto mt-6">
            Profesionales comprometidos con la calidad y la excelencia en cada instalación
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-members-grid grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="team-member-card invisible group"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-heading font-bold text-lg text-ink group-hover:text-brand transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-brand font-semibold mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
