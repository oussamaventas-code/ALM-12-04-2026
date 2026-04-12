import { useEffect, useRef, useState } from 'react';
import { Phone, Zap } from 'lucide-react';
import gsap from 'gsap';

export default function MobileUrgencyBar() {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !visible) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  useEffect(() => {
    if (visible && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-[49] lg:hidden"
      style={{ transform: 'translateY(100%)', opacity: 0 }}
    >
      <a
        href="tel:+34605333108"
        className="flex items-center justify-center gap-3 bg-danger text-white py-4 px-6 w-full font-heading font-bold text-sm uppercase tracking-wider shadow-[0_-4px_24px_rgba(220,38,38,0.4)]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        <Zap size={16} className="text-yellow-300" />
        Urgencia eléctrica — Llamar ahora
        <span className="bg-white/20 rounded-full px-3 py-0.5 text-xs flex items-center gap-1.5">
          <Phone size={11} />
          605 33 31 08
        </span>
      </a>
    </div>
  );
}
