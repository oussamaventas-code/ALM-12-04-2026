import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Shield } from 'lucide-react';

const COOKIE_KEY = 'alm_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Mostrar solo si no hay consentimiento previo
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Delay para no interferir con animaciones de entrada
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (type) => {
    localStorage.setItem(COOKIE_KEY, type); // 'all' | 'necessary'
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[9000] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
    >
      <div
        className="max-w-4xl mx-auto pointer-events-auto"
        style={{
          background: 'linear-gradient(135deg, #0F0F12 0%, #1A1A20 100%)',
          border: '1px solid rgba(245, 197, 24, 0.25)',
          boxShadow: '0 -4px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,197,24,0.08)',
        }}
      >
        {/* Stripe decorativa */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#F5C518] to-transparent" />

        <div className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">

            {/* Icono */}
            <div className="shrink-0 w-10 h-10 bg-[#F5C518]/10 flex items-center justify-center">
              <Cookie size={20} className="text-[#F5C518]" />
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-heading text-base font-bold text-white leading-tight">
                  Usamos cookies para mejorar tu experiencia
                </h2>
                <button
                  onClick={() => accept('necessary')}
                  className="shrink-0 text-white/30 hover:text-white/70 transition-colors p-1"
                  aria-label="Rechazar cookies opcionales y cerrar"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="font-body text-sm text-white/55 leading-relaxed mb-3">
                Utilizamos cookies propias y de terceros para el funcionamiento del sitio y, con tu
                consentimiento, para analítica anónima. Puedes aceptar todas o solo las necesarias.{' '}
                <Link
                  to="/cookies"
                  className="text-[#F5C518] hover:text-[#F7D04A] underline underline-offset-2 transition-colors"
                >
                  Política de Cookies
                </Link>
              </p>

              {/* Panel expandible de detalle */}
              {expanded && (
                <div className="mb-4 p-3 bg-white/[0.03] border border-white/8 text-xs text-white/50 font-body leading-relaxed space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield size={12} className="text-[#F5C518] mt-0.5 shrink-0" />
                    <span><strong className="text-white/70">Cookies necesarias:</strong> Siempre activas. Imprescindibles para el funcionamiento del sitio (preferencias de sesión, seguridad).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={12} className="text-[#F5C518] mt-0.5 shrink-0" />
                    <span><strong className="text-white/70">Cookies de analítica:</strong> Nos ayudan a entender qué secciones visitas más sin identificarte. Datos anónimos y agregados.</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-1">

            <button
              onClick={() => setExpanded(!expanded)}
              className="order-3 sm:order-1 sm:mr-auto font-body text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2 py-1"
            >
              {expanded ? 'Ocultar detalles' : 'Ver detalles'}
            </button>

            <button
              onClick={() => accept('necessary')}
              className="order-2 font-body text-sm font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-5 py-2.5 transition-all duration-200"
            >
              Solo necesarias
            </button>

            <button
              onClick={() => accept('all')}
              className="order-1 sm:order-3 font-body text-sm font-bold bg-[#F5C518] text-[#080809] px-6 py-2.5 hover:bg-[#F7D04A] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Check size={14} />
              Aceptar todas
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
