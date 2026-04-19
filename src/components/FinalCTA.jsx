import { useEffect, useRef } from 'react';
import { Send, MessageCircle, Phone, Clock, ShieldCheck, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: Clock, text: 'Respondemos en <24h' },
  { icon: ShieldCheck, text: 'Sin compromiso' },
  { icon: FileText, text: 'Presupuesto cerrado' },
];

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.finalcta-heading', { y: 50, opacity: 0, duration: 0.8 })
        .from('.finalcta-btn', { y: 30, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.3')
        .from('.finalcta-badge', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-dark overflow-hidden">
      {/* Amber glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-glow/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-brand/6 blur-[60px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="finalcta-heading text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
          Convierte tu instalaci&oacute;n el&eacute;ctrica en una{' '}
          <span className="text-brand">ventaja competitiva</span>
        </h2>
        
        {/* Subtitle support */}
        <p className="finalcta-heading text-white/70 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10">
          Dejamos tu instalación lista para pasar cualquier inspección, sin chapuzas ni sobrecostes. Llámanos ahora y solucionamos tu problema.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="#contacto" className="finalcta-btn btn-brand flex items-center gap-2 text-base">
            <Send size={18} />
            Cu&eacute;ntanos qu&eacute; necesitas
          </a>
          <a
            href="https://wa.me/34605333108"
            target="_blank"
            rel="noopener noreferrer"
            className="finalcta-btn btn-whatsapp flex items-center gap-2 text-base"
          >
            <MessageCircle size={18} />
            WhatsApp r&aacute;pido
          </a>
          <a
            href="tel:+34605333108"
            className="finalcta-btn btn-outline flex items-center gap-2 text-base border-white/30 text-white hover:bg-white/10"
          >
            <Phone size={18} />
            Llamar
          </a>
        </div>

        {/* Bottom badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-6">
          {badges.map((badge) => (
            <div key={badge.text} className="finalcta-badge flex items-center gap-2.5 text-white/80">
              <badge.icon size={20} className="text-brand" />
              <span className="text-base font-heading font-medium tracking-wide">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
