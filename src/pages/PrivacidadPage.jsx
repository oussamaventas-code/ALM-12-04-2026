import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Mail, Phone, MapPin } from 'lucide-react';

const sections = [
  {
    title: 'Sus Derechos',
    content: `Dependiendo de la legislación aplicable, usted puede tener derecho a acceder, rectificar o eliminar sus datos personales, recibir una copia de sus datos, restringir u oponerse al procesamiento activo de sus datos, solicitarnos compartir (portar) su información personal a otra entidad, retirar cualquier consentimiento que nos haya otorgado para procesar sus datos, presentar una queja ante una autoridad competente y otros derechos relevantes bajo las leyes aplicables.

Para ejercer estos derechos, puede escribirnos a contacto@almelectricidad.com. Responderemos a su solicitud de acuerdo con la ley aplicable.

Tenga en cuenta que si no nos permite recopilar o procesar la información personal requerida, o retira su consentimiento para procesarla con los fines necesarios, es posible que no pueda acceder o utilizar los servicios para los que se solicitó su información.`,
  },
  {
    title: 'Cookies',
    content: `Para obtener más información sobre cómo usamos estas tecnologías de seguimiento y sus opciones en relación con ellas, consulte nuestra Política de Cookies.`,
    link: { label: 'Ver Política de Cookies', to: '/cookies' },
  },
  {
    title: 'Seguridad',
    content: `La seguridad de su información es importante para nosotros y utilizaremos medidas de seguridad razonables para prevenir la pérdida, el mal uso o la alteración no autorizada de su información bajo nuestro control.

Sin embargo, dado los riesgos inherentes, no podemos garantizar una seguridad absoluta y, en consecuencia, no podemos asegurar ni garantizar la seguridad de la información que nos transmita, por lo que lo hace bajo su propio riesgo.`,
  },
  {
    title: 'Responsable de Reclamaciones / Delegado de Protección de Datos',
    content: `Si tiene alguna consulta o preocupación sobre el procesamiento de su información que tengamos, puede escribir a nuestro Responsable de Reclamaciones en Jorge Hernández García (ALM Electricidad), C. Lisboa, 3, NAVE 10, 45300 Ocaña, Toledo, email: contacto@almelectricidad.com. Atenderemos sus inquietudes de acuerdo con la legislación aplicable.`,
  },
  {
    title: 'Modificaciones de esta Política',
    content: `Podemos modificar esta Política de Privacidad en cualquier momento sin previo aviso y publicaremos la Política revisada en el Servicio. La Política revisada será efectiva 180 días después de ser publicada en el Servicio y su acceso o uso continuado del Servicio después de dicho tiempo constituirá su aceptación de la Política de Privacidad revisada. Por lo tanto, le recomendamos revisar esta página periódicamente.`,
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <SeoHead
        title="Política de Privacidad — ALMelectricidad"
        description="Política de privacidad de ALM Electricidad. Información sobre cómo recopilamos, usamos y protegemos sus datos personales."
        canonical="/privacidad"
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark pt-36 pb-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="container-custom px-6 relative z-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:gap-3 transition-all duration-300 mb-10"
          >
            <ArrowRight size={14} className="rotate-180" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Shield size={20} className="text-brand" />
            </div>
            <span className="section-label">Documento legal</span>
          </div>

          <h1 className="font-heading font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Política de Privacidad
          </h1>

          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs font-body uppercase tracking-wider">Última actualización</span>
              <span className="text-white/70 text-sm font-medium">01 de octubre de 2025</span>
            </div>
            <div className="w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs font-body uppercase tracking-wider">Entrada en vigor</span>
              <span className="text-white/70 text-sm font-medium">01 de octubre de 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">

            {/* Intro box */}
            <div className="bg-dark border border-brand/10 p-6 md:p-8 mb-12">
              <h2 className="font-heading font-bold text-white text-lg mb-3">¿Qué cubre esta política?</h2>
              <p className="text-white/55 font-body text-sm leading-relaxed">
                Esta Política de Privacidad describe las políticas de <strong className="text-white/80">Jorge Hernández García (ALM Electricidad)</strong>, C. Lisboa, 3, NAVE 10, 45300 Ocaña, Toledo, sobre la recopilación, uso y divulgación de su información que recopilamos cuando utiliza nuestro sitio web{' '}
                <a href="https://almelectricidad.com" className="text-brand hover:text-brand-light transition-colors" target="_blank" rel="noopener noreferrer">
                  almelectricidad.com
                </a>{' '}
                (el "Servicio"). Al acceder o utilizar el Servicio, usted acepta la recopilación, el uso y la divulgación de su información de acuerdo con esta Política de Privacidad.
              </p>
            </div>

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
                  <div className="pl-9">
                    {s.content.split('\n\n').map((para, pi) => (
                      <p key={pi} className="text-white/55 font-body text-sm leading-relaxed mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                    {s.link && (
                      <Link
                        to={s.link.to}
                        className="inline-flex items-center gap-2 text-brand text-sm font-semibold hover:gap-3 transition-all mt-3"
                      >
                        {s.link.label}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact block */}
            <div className="mt-14 bg-dark border border-white/8 p-6 md:p-8">
              <h3 className="font-heading font-bold text-white mb-5">Contáctenos</h3>
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

            {/* Legal links footer */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/aviso-legal" className="text-white/30 hover:text-brand text-xs transition-colors">Aviso Legal</Link>
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
