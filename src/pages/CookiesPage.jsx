import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import { ArrowRight, Cookie, Mail } from 'lucide-react';

const cookieTypes = [
  {
    nombre: 'Cookies técnicas / estrictamente necesarias',
    finalidad: 'Permiten el funcionamiento básico del sitio web (sesión, navegación, preferencias de idioma). No requieren consentimiento del usuario.',
    gestion: 'No desactivables — son imprescindibles para el funcionamiento.',
    ejemplos: 'Sesión de navegación, preferencias básicas del sitio.',
  },
  {
    nombre: 'Cookies analíticas',
    finalidad: 'Nos permiten conocer el número de visitas y las fuentes de tráfico para mejorar el rendimiento del sitio. Toda la información que recogen es agregada y, por lo tanto, anónima.',
    gestion: 'Puede rechazarlas sin que el sitio deje de funcionar.',
    ejemplos: 'Google Analytics (si está activado), estadísticas de navegación.',
  },
  {
    nombre: 'Cookies de personalización',
    finalidad: 'Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.',
    gestion: 'Opcionales — puede gestionarlas desde las preferencias del navegador.',
    ejemplos: 'Idioma preferido, región seleccionada.',
  },
];

const browsers = [
  { name: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Mozilla Firefox', link: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
  { name: 'Safari', link: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
  { name: 'Microsoft Edge', link: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406' },
];

export default function CookiesPage() {
  return (
    <>
      <SeoHead
        title="Política de Cookies — ALMelectricidad"
        description="Política de cookies de ALM Electricidad. Información sobre qué cookies usamos, para qué y cómo puede gestionarlas."
        canonical="/cookies"
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
              <Cookie size={20} className="text-brand" />
            </div>
            <span className="section-label">Documento legal</span>
          </div>

          <h1 className="font-heading font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Política de Cookies
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
          <div className="max-w-3xl mx-auto space-y-12">

            {/* What are cookies */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 bg-brand/15 flex items-center justify-center text-brand font-heading font-bold text-xs">01</span>
                <h2 className="font-heading font-bold text-white text-lg">¿Qué son las cookies?</h2>
              </div>
              <div className="pl-9 space-y-3">
                <p className="text-white/55 font-body text-sm leading-relaxed">
                  Las cookies son pequeños archivos de texto que los sitios web almacenan en su ordenador o dispositivo móvil cuando usted los visita. Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                </p>
                <p className="text-white/55 font-body text-sm leading-relaxed">
                  En ALM Electricidad utilizamos cookies propias y de terceros con diferentes finalidades, siempre respetando su privacidad y de acuerdo con la normativa vigente (RGPD y LOPDGDD).
                </p>
              </div>
            </div>

            {/* Cookie types table */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-6 bg-brand/15 flex items-center justify-center text-brand font-heading font-bold text-xs">02</span>
                <h2 className="font-heading font-bold text-white text-lg">Tipos de cookies que utilizamos</h2>
              </div>
              <div className="pl-9 space-y-4">
                {cookieTypes.map((c, i) => (
                  <div key={i} className="bg-dark border border-white/6 p-5 hover:border-brand/20 transition-colors duration-300">
                    <h3 className="font-heading font-bold text-brand text-sm mb-3">{c.nombre}</h3>
                    <div className="space-y-2">
                      <p className="text-white/55 text-xs leading-relaxed"><span className="text-white/40 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">Finalidad</span>{c.finalidad}</p>
                      <p className="text-white/55 text-xs leading-relaxed"><span className="text-white/40 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">Gestión</span>{c.gestion}</p>
                      <p className="text-white/55 text-xs leading-relaxed"><span className="text-white/40 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">Ejemplos</span>{c.ejemplos}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to manage */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 bg-brand/15 flex items-center justify-center text-brand font-heading font-bold text-xs">03</span>
                <h2 className="font-heading font-bold text-white text-lg">Cómo gestionar las cookies</h2>
              </div>
              <div className="pl-9 space-y-4">
                <p className="text-white/55 font-body text-sm leading-relaxed">
                  Puede configurar su navegador para aceptar, rechazar o eliminar las cookies. Tenga en cuenta que desactivar algunas cookies puede afectar a la funcionalidad de nuestro sitio web.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {browsers.map((b) => (
                    <a
                      key={b.name}
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-dark border border-white/6 px-4 py-3 hover:border-brand/30 hover:text-brand transition-all duration-300 group text-sm text-white/60"
                    >
                      <span>{b.name}</span>
                      <ArrowRight size={14} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Changes */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 bg-brand/15 flex items-center justify-center text-brand font-heading font-bold text-xs">04</span>
                <h2 className="font-heading font-bold text-white text-lg">Actualizaciones de esta política</h2>
              </div>
              <div className="pl-9">
                <p className="text-white/55 font-body text-sm leading-relaxed">
                  Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o reglamentarias. Le recomendamos revisar esta página periódicamente para estar informado sobre nuestro uso de cookies.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-dark border border-white/8 p-6 md:p-8">
              <h3 className="font-heading font-bold text-white mb-3">¿Preguntas sobre cookies?</h3>
              <p className="text-white/50 text-sm mb-4">Si tiene alguna duda sobre cómo usamos las cookies, puede contactarnos directamente.</p>
              <a
                href="mailto:contacto@almelectricidad.com"
                className="inline-flex items-center gap-2 text-brand text-sm font-semibold hover:gap-3 transition-all"
              >
                <Mail size={14} />
                contacto@almelectricidad.com
              </a>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/privacidad" className="text-white/30 hover:text-brand text-xs transition-colors">Política de Privacidad</Link>
              <span className="text-white/15">·</span>
              <Link to="/aviso-legal" className="text-white/30 hover:text-brand text-xs transition-colors">Aviso Legal</Link>
              <span className="text-white/15">·</span>
              <Link to="/" className="text-white/30 hover:text-brand text-xs transition-colors">Inicio</Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
