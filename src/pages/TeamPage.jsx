import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Wrench, Star, Users, Phone } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Alejandro M.',
    role: 'Instalador Jefe / Fundador',
    specialty: 'Instalaciones industriales · Fotovoltaica',
    experience: '+15 años',
    cert: 'Instalador Autorizado REBT',
    initial: 'A',
  },
  {
    name: 'Luis P.',
    role: 'Electricista Senior',
    specialty: 'Domótica · Cuadros eléctricos',
    experience: '+10 años',
    cert: 'Certificado SEC · Nivel 2',
    initial: 'L',
  },
  {
    name: 'Marcos R.',
    role: 'Técnico Especialista',
    specialty: 'Renovaciones · Alarmas · VE',
    experience: '+7 años',
    cert: 'Formación continua AMPERE',
    initial: 'M',
  },
  {
    name: 'Carlos D.',
    role: 'Técnico de Instalaciones',
    specialty: 'Residencial · Telecomunicaciones',
    experience: '+5 años',
    cert: 'Habilitado RITE',
    initial: 'C',
  },
];

const values = [
  {
    icon: Award,
    title: 'Formación continua',
    desc: 'Cada año actualizamos nuestra formación en normativa eléctrica, nuevas tecnologías y sistemas de autoconsumo.',
  },
  {
    icon: Wrench,
    title: 'Trabajo bien hecho',
    desc: 'El estándar de calidad no varía entre un trabajo grande o pequeño. Cada instalación recibe el mismo nivel de atención.',
  },
  {
    icon: Star,
    title: 'Garantía real',
    desc: 'Todo nuestro trabajo tiene garantía por escrito. Si algo falla dentro del período garantizado, lo resolvemos sin coste.',
  },
  {
    icon: Users,
    title: 'Equipo coordinado',
    desc: 'Trabajamos como una unidad. El cliente siempre tiene un punto de contacto claro y sabe exactamente quién viene a su obra.',
  },
];

export default function TeamPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-hero-content',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.team-card',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.value-card',
        { x: -20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <SeoHead
        title="Nuestro Equipo — ALMelectricidad"
        description="Conoce al equipo de electricistas profesionales de ALMelectricidad. Más de 10 años de experiencia en instalaciones eléctricas en Madrid y Toledo."
        canonical="/equipo"
      />
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="team-hero-content invisible max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-8"
            >
              <ArrowRight size={14} className="rotate-180" />
              Volver al inicio
            </Link>
            <span className="section-label">Nuestro equipo</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-4">
              Las personas detrás
              <br />
              <span className="text-gradient-brand">de cada instalación</span>
            </h1>
            <p className="font-body text-lg text-white/55 max-w-2xl leading-relaxed mt-6">
              No somos una franquicia ni una plataforma de intermediación.
              Somos un equipo de técnicos especializados que trabaja cada
              proyecto con el mismo nivel de exigencia, independientemente del
              tamaño.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="team-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="team-card invisible group card border border-surface-300 hover:border-brand transition-all duration-300 text-center p-8"
              >
                {/* Avatar */}
                <div className="w-20 h-20 bg-brand/15 border-2 border-brand/30 group-hover:border-brand rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                  <span className="font-heading text-3xl font-black text-brand">
                    {member.initial}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-ink group-hover:text-brand transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-brand font-semibold mt-1">
                  {member.role}
                </p>
                <p className="font-body text-xs text-ink-400 mt-3 leading-relaxed">
                  {member.specialty}
                </p>

                <div className="mt-5 pt-5 border-t border-surface-300 space-y-1.5">
                  <p className="font-body text-xs text-white/40">
                    🏅 {member.cert}
                  </p>
                  <p className="font-body text-xs text-white/40">
                    ⏱ {member.experience} de experiencia
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Cómo trabajamos</span>
            <h2 className="section-title mt-3 text-white">
              Los valores que nos definen
            </h2>
          </div>
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card invisible p-6 border border-white/8 hover:border-brand/40 bg-white/[0.02] hover:bg-brand/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <v.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="font-body text-white/50 mb-8">
            Habla directamente con el equipo. Sin intermediarios, sin bots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contacto"
              className="btn-brand !py-3.5 !px-8 justify-center"
            >
              Pedir presupuesto gratis
            </a>
            <a
              href="tel:+34605333108"
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-brand text-white/70 hover:text-brand font-heading font-semibold text-sm uppercase tracking-wide px-8 py-3.5 transition-all duration-300"
            >
              <Phone size={16} />
              605 33 31 08
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
