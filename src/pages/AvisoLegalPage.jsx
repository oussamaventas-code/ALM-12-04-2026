import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Mail, Phone, MapPin } from 'lucide-react';

const sections = [
  {
    title: 'Datos del Titular',
    content: [
      'En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), así como de la normativa vigente de protección de datos, se facilitan los siguientes datos identificativos del titular del sitio web:',
      '• Denominación social: Jorge Hernández García (ALM Electricidad)\n• Dirección: C. Lisboa, 3, NAVE 10, 45300 Ocaña, Toledo\n• Teléfono: +34 605 333 108\n• Email: contacto@almelectricidad.com\n• Sitio web: https://almelectricidad.com',
    ],
  },
  {
    title: 'Objeto y Ámbito de Aplicación',
    content: [
      'El presente Aviso Legal regula el acceso y uso del sitio web almelectricidad.com (en adelante, "el Sitio Web"), del que es titular ALM Electricidad.',
      'El acceso al Sitio Web implica la aceptación plena y sin reservas de todas las condiciones incluidas en este Aviso Legal. Si no está de acuerdo con alguna de las condiciones aquí establecidas, le rogamos que no acceda ni utilice el Sitio Web.',
    ],
  },
  {
    title: 'Propiedad Intelectual e Industrial',
    content: [
      'Todos los contenidos del Sitio Web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente) son propiedad intelectual de ALM Electricidad o de terceros que han autorizado su uso.',
      'Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos del Sitio Web sin autorización expresa y por escrito de ALM Electricidad.',
    ],
  },
  {
    title: 'Responsabilidad',
    content: [
      'ALM Electricidad no se hace responsable de los daños y perjuicios de cualquier naturaleza derivados del acceso o uso del Sitio Web, incluyendo los causados a los sistemas informáticos o los derivados de la introducción de virus, ni tampoco por los errores en los contenidos del Sitio Web.',
      'ALM Electricidad no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web. En cualquier caso, ALM Electricidad llevará a cabo las actuaciones razonables para que se produzca la menor interrupción posible.',
    ],
  },
  {
    title: 'Política de Privacidad y Protección de Datos',
    content: [
      'El tratamiento de los datos personales que el usuario facilite al navegar por el Sitio Web se rige por lo dispuesto en la Política de Privacidad de ALM Electricidad, que el usuario puede consultar en el enlace correspondiente.',
    ],
    link: { label: 'Ver Política de Privacidad', to: '/privacidad' },
  },
  {
    title: 'Legislación Aplicable y Fuero',
    content: [
      'El presente Aviso Legal se rige en todos sus extremos por la legislación española. Las partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales del domicilio del titular del Sitio Web para la resolución de todos los conflictos que se deriven del acceso o uso del mismo.',
    ],
  },
];

export default function AvisoLegalPage() {
  return (
    <>
      <SeoHead
        title="Aviso Legal — ALMelectricidad"
        description="Aviso legal de ALM Electricidad. Información sobre el titular del sitio web, condiciones de uso y responsabilidades."
        canonical="/aviso-legal"
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="container-custom px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-10"
          >
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand/10 border border-brand/20 flex items-center justify-center">
              <FileText size={20} className="text-brand" />
            </div>
            <span className="section-label">Documento legal</span>
          </div>

          <h1 className="font-heading font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Aviso Legal
          </h1>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs font-body uppercase tracking-wider">Última actualización</span>
              <span className="text-white/70 text-sm font-medium">01 de octubre de 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-10 last:border-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 bg-brand/15 flex items-center justify-center text-brand font-heading font-bold text-xs">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading font-bold text-white text-lg">{s.title}</h2>
                  </div>
                  <div className="pl-9 space-y-3">
                    {s.content.map((para, pi) => (
                      <p key={pi} className="text-white/55 font-body text-sm leading-relaxed whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                    {s.link && (
                      <Link
                        to={s.link.to}
                        className="inline-flex items-center gap-2 text-brand text-sm font-semibold hover:gap-3 transition-all mt-2"
                      >
                        {s.link.label}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-14 bg-dark border border-white/8 p-6 md:p-8">
              <h3 className="font-heading font-bold text-white mb-5">Contacto</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="mailto:contacto@almelectricidad.com" className="flex items-center gap-3 text-white/50 hover:text-brand transition-colors text-sm">
                  <Mail size={16} className="text-brand shrink-0" />
                  contacto@almelectricidad.com
                </a>
                <a href="tel:+34605333108" className="flex items-center gap-3 text-white/50 hover:text-brand transition-colors text-sm">
                  <Phone size={16} className="text-brand shrink-0" />
                  +34 605 333 108
                </a>
                <span className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin size={16} className="text-brand shrink-0" />
                  C. Lisboa, 3, NAVE 10 — 45300 Ocaña, Toledo
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/privacidad" className="text-white/30 hover:text-brand text-xs transition-colors">Política de Privacidad</Link>
              <span className="text-white/15">·</span>
              <Link to="/cookies" className="text-white/30 hover:text-brand text-xs transition-colors">Política de Cookies</Link>
              <span className="text-white/15">·</span>
              <Link to="/" className="text-white/30 hover:text-brand text-xs transition-colors">Inicio</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
