import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhatsAppFloat() {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    const label = labelRef.current;

    // Start hidden
    gsap.set(wrap, { scale: 0, autoAlpha: 0 });
    gsap.set(label, { maxWidth: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 });

    // Appear after 3s
    gsap.to(wrap, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.65,
      delay: 3,
      ease: 'back.out(1.7)',
    });

    // At 50% scroll: expand label + continuous pulse
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -50%',
      once: true,
      onEnter: () => {
        // Expand "¿Hablamos?" label
        gsap.to(label, {
          maxWidth: 130,
          opacity: 1,
          paddingLeft: '0.75rem',
          paddingRight: '0.5rem',
          duration: 0.5,
          ease: 'power3.out',
        });
        // Heartbeat pulse on button
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id === 'wa-scroll')
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={wrapRef} className="fixed bottom-6 right-6 z-50">
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping pointer-events-none" />

      {/* Row: label + button */}
      <div className="relative flex items-center">
        {/* Expandable label */}
        <span
          ref={labelRef}
          className="overflow-hidden whitespace-nowrap font-heading text-sm font-semibold text-white bg-dark/90 py-2 rounded-l-full"
          style={{ maxWidth: 0 }}
        >
          ¿Hablamos?
        </span>

        {/* Button */}
        <a
          ref={btnRef}
          href="https://wa.me/34605333108"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-colors duration-200 shrink-0"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={26} />
        </a>
      </div>
    </div>
  );
}
