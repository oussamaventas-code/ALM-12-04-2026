import { PhoneCall } from 'lucide-react';

export default function StickyMobileCTA() {
  return (
    <div
      role="complementary"
      aria-label="Botón de llamada rápida"
      className="sticky-cta-mobile fixed bottom-0 left-0 right-0 z-[100] md:hidden"
    >
      <div className="bg-dark/95 backdrop-blur-md border-t border-white/5 px-4 pt-3 pb-5 flex items-center justify-between shadow-[0_-12px_40px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col">
          <span className="text-white font-heading font-bold text-[0.95rem] tracking-wide flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            Urgencia
          </span>
          <span className="text-white/50 font-body text-[0.7rem] uppercase tracking-wider mt-0.5">
            Servicio Rápido 24h
          </span>
        </div>
        <a
          href="tel:+34605333108"
          aria-label="Llamar ahora al 605 33 31 08 — urgencias eléctricas 24h"
          className="btn-brand hover:brightness-110 active:scale-95 transition-all shadow-lg !py-3 !px-6"
        >
          <PhoneCall size={18} aria-hidden="true" />
          Llamar
        </a>
      </div>
    </div>
  );
}
