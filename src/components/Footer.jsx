import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  ArrowUp,
  Heart,
  Wrench,
  Shield,
  CheckCircle,
  Accessibility,
} from 'lucide-react';
import { services } from '../data/services';
import { zones } from '../data/zones';

const humanPromises = [
  { icon: Clock, text: 'Llegamos puntuales' },
  { icon: Wrench, text: 'No dejamos cables sueltos' },
  { icon: Shield, text: 'Presupuesto sin sorpresas' },
  { icon: CheckCircle, text: 'Limpiamos al terminar' },
  { icon: Heart, text: 'Tratamos tu casa como nuestra' },
  { icon: Accessibility, text: 'Web accesible WCAG AA' },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 text-white/70">
      {/* Human promises bar */}
      <div className="border-b border-white/5" aria-label="Nuestros compromisos">
        <ul className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 list-none">
          {humanPromises.map((p) => (
            <li key={p.text} className="flex items-center gap-2 text-sm">
              <p.icon size={14} className="text-brand-light" aria-hidden="true" />
              <span className="font-heading tracking-wide">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main 4-column grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <img
              src="/LOGO Y JORGE/LOGO.JPG"
              alt="ALM Electricidad"
              loading="lazy"
              className="h-16 w-auto object-contain mb-5 brightness-110"
            />
            <p className="text-sm leading-relaxed mb-4">
              Electricistas profesionales en Madrid y Toledo. Instalaciones, reformas, aver&iacute;as y energ&iacute;a solar con garant&iacute;a.
            </p>

          </div>

          {/* Services */}
          <nav aria-label="Servicios">
            <h4 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-5">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/servicios/${s.slug}`}
                    className="text-sm hover:text-brand-light transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zones */}
          <nav aria-label="Zonas de servicio">
            <h4 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-5">
              Zonas
            </h4>
            <ul className="space-y-2.5">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link
                    to={`/zonas/${z.slug}`}
                    className="text-sm hover:text-brand-light transition-colors duration-200"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address>
            <h4 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-5 not-italic">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+34605333108"
                  aria-label="Llamar al 605 333 108"
                  className="flex items-center gap-2.5 text-sm hover:text-brand-light transition-colors"
                >
                  <Phone size={15} className="text-brand-light shrink-0" aria-hidden="true" />
                  605 333 108
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@almelectricidad.com"
                  aria-label="Enviar email a contacto@almelectricidad.com"
                  className="flex items-center gap-2.5 text-sm hover:text-brand-light transition-colors"
                >
                  <Mail size={15} className="text-brand-light shrink-0" aria-hidden="true" />
                  contacto@almelectricidad.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Clock size={15} className="text-brand-light shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p>Lun&ndash;Vie: 8:00&ndash;20:00</p>
                  <p>S&aacute;b: 9:00&ndash;14:00</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-brand-light">
                <AlertTriangle size={15} className="shrink-0" aria-hidden="true" />
                Urgencias 24h / 365 d&iacute;as
              </li>
            </ul>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            &copy; {currentYear} ALM Electricidad. Todos los derechos reservados.
            <span className="mx-2 text-white/20" aria-hidden="true">&middot;</span>
            Dise&ntilde;o web por <span className="text-brand/70 font-semibold">SOMSYNGULAR</span>
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/aviso-legal"
              className="text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              Aviso legal
            </Link>
            <Link
              to="/privacidad"
              className="text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/cookies"
              className="text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              Cookies
            </Link>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
              aria-label="Volver arriba"
            >
              <ArrowUp size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
