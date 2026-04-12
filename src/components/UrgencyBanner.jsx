import { Phone, Zap } from 'lucide-react';

export default function UrgencyBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white overflow-hidden">
      <div className="container-custom px-6">
        <a
          href="tel:+34605333108"
          className="flex items-center justify-center gap-3 py-2.5 text-sm font-medium hover:gap-4 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-300 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-xs">Urgencias 24h</span>
          </span>
          <span className="hidden sm:inline text-white/80">|</span>
          <span className="hidden sm:inline">Llámanos ahora y lo resolvemos hoy</span>
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <Phone size={12} />
            <span className="font-bold">605 33 31 08</span>
          </span>
        </a>
      </div>
    </div>
  );
}
