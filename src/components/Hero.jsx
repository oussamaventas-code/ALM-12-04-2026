import { useEffect, useRef, useState } from 'react';
import { Send, Phone, MessageCircle, ChevronDown, ArrowDown, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';

const projectTypes = [
  'Instalación eléctrica nueva',
  'Reforma / adecuación',
  'Reparación de averías',
  'Iluminación LED',
  'Paneles solares / Autoconsumo',
  'Telecomunicaciones',
  'Punto de recarga VE',
  'Boletín / Certificado oficial',
  'Urgencia 24h',
  'Otro',
];



export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    tipo: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // ── QW-2: Defer GSAP hero timeline until after the browser is idle ─────
    // requestIdleCallback cede el control al navegador para que calcule el LCP
    // antes de que GSAP ocupe el main thread con clip-path y easings.
    // Fallback a setTimeout(300) para Safari que no soporta rIC.
    const scheduleAnim = (cb) =>
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(cb, { timeout: 800 })
        : setTimeout(cb, 300);

    let idleHandle;
    let ctx;

    idleHandle = scheduleAnim(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8 });

        // Clip-path reveal en cada línea del título
        gsap.utils.toArray('.hero-title-line').forEach((line, i) => {
          tl.fromTo(
            line,
            { clipPath: 'inset(100% 0 0 0)', y: 40 },
            { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.1, ease: 'power4.out' },
            `-=${i === 0 ? 0 : 0.8}`
          );
        });

        tl.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
          .from('.hero-cta-btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
          .from('.hero-form', { y: 50, opacity: 0, duration: 0.9 }, '-=0.6')
          .from('.hero-scroll', { y: 15, opacity: 0, duration: 0.6 }, '-=0.2');

        // Parallax en el video/fondo — solo desktop donde el video existe
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }, heroRef);
    });

    return () => {
      if (typeof requestIdleCallback !== 'undefined') {
        cancelIdleCallback(idleHandle);
      } else {
        clearTimeout(idleHandle);
      }
      if (ctx) ctx.revert();
    };
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!formData.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!formData.telefono.trim()) errs.telefono = 'El teléfono es obligatorio';
    else if (!/^[0-9+\s()-]{6,}$/.test(formData.telefono.trim())) errs.telefono = 'Introduce un teléfono válido';
    if (!formData.tipo) errs.tipo = 'Selecciona el tipo de proyecto';
    return errs;
  };

  const clearFieldError = (field) => {
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const parts = [`Hola, soy ${formData.nombre}`];
      if (formData.empresa) parts[0] += ` de ${formData.empresa}`;
      parts.push(`Necesito info sobre: ${formData.tipo}`);
      parts.push(`Mi teléfono: ${formData.telefono}`);
      const msg = parts.join('. ') + '.';
      window.open(
        `https://wa.me/34605333108?text=${encodeURIComponent(msg)}`,
        '_blank',
        'noopener,noreferrer'
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Video Background ── */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* ── QW-1: Imagen de fallback — visible en móvil y como placeholder en desktop ── */}
        {/* QW-6: fetchpriority="high" acelera el LCP en móvil donde no hay video */}
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          width="1920"
          height="1080"
        />

        {/* ── QW-1: preload="none" — el video NO bloquea el bandwidth inicial ── */}
        {/* Solo se descarga cuando el navegador lo decide, no en el critical path */}
        {/* La image tag de arriba actúa como poster de alta calidad mientras carga */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover scale-110 hidden md:block"
        >
          <source
            src="/videos/HERO PARA PC.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/40 to-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/20" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-custom px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          {/* ── Left — Copy ── */}
          <div>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 border border-brand/30 bg-brand/10 px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="text-brand-glow text-xs font-body font-semibold uppercase tracking-[0.12em]">
                Instaladores eléctricos autorizados del REBT
              </span>
            </div>

            {/* Headline — each line has clip-path reveal */}
            <h1 className="font-heading font-extrabold text-white leading-[1.06] tracking-tight mb-7 overflow-hidden" style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)' }}>
              <span className="hero-title-line block">
                Instalaciones eléctricas
              </span>
              <span className="hero-title-line block text-gradient-gold">
                bien hechas
              </span>
              <span className="hero-title-line block text-white/90">
                sin sorpresas ni líos raros
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle font-body text-lg text-white/75 max-w-lg leading-relaxed mb-10">
              Somos electricistas de verdad. Hacemos instalaciones seguras,
              limpias y que pasan inspección a la primera. Si algo no queda
              perfecto, volvemos sin coste. Así de simple.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <MagneticElement strength={0.3}>
                <a
                  href="https://wa.me/34605333108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn btn-whatsapp !py-3.5 !px-7"
                >
                  <MessageCircle size={18} />
                  Escríbenos por WhatsApp
                </a>
              </MagneticElement>
              <MagneticElement strength={0.3}>
                <a
                  href="tel:+34605333108"
                  className="hero-cta-btn btn-outline !border-white/25 !text-white hover:!border-brand hover:!text-brand !py-3.5 !px-7"
                >
                  <Phone size={18} />
                  605 33 31 08
                </a>
              </MagneticElement>
            </div>
          </div>

          {/* ── Right — Contact form ── */}
          {/* Solo visible en desktop (≥ lg) donde el grid de 2 cols está activo */}
          {/* En móvil/tablet: el copy y sus CTAs de WhatsApp/llamada son suficientes */}
          <div className="hero-form hidden lg:block" style={{ minHeight: '480px' }}>
            <div className="bg-black/15 backdrop-blur-sm border border-white/[0.08] p-6 md:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center gap-5 py-8 text-center animate-fadeInUp">
                  <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-success" />
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-white">¡Enviado!</p>
                    <p className="text-white/65 text-sm font-body mt-2 leading-relaxed">
                      Se ha abierto WhatsApp con tu consulta.<br />
                      Te respondemos en menos de 24h.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormErrors({});
                      setFormData({ nombre: '', empresa: '', telefono: '', tipo: '' });
                    }}
                    className="text-brand text-sm font-body hover:text-brand-light transition-colors underline underline-offset-2"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Form header */}
                  <div className="mb-2">
                    <p className="font-heading text-xl font-bold text-white">
                      Cuéntanos qué necesitas
                    </p>
                    <p className="text-white/65 text-sm font-body mt-1">
                      Te respondemos en menos de 24h. De verdad.
                    </p>
                  </div>

                  {/* Nombre */}
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className={`input-field ${formErrors.nombre ? '!border-red-400/60' : ''}`}
                      value={formData.nombre}
                      onChange={(e) => { setFormData({ ...formData, nombre: e.target.value }); clearFieldError('nombre'); }}
                    />
                    {formErrors.nombre && <p className="text-red-400 text-xs mt-1 animate-fadeInUp">{formErrors.nombre}</p>}
                  </div>

                  {/* Empresa */}
                  <input
                    type="text"
                    placeholder="Empresa (opcional)"
                    className="input-field"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  />

                  {/* Teléfono */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono de contacto"
                      className={`input-field ${formErrors.telefono ? '!border-red-400/60' : ''}`}
                      value={formData.telefono}
                      onChange={(e) => { setFormData({ ...formData, telefono: e.target.value }); clearFieldError('telefono'); }}
                    />
                    {formErrors.telefono && <p className="text-red-400 text-xs mt-1 animate-fadeInUp">{formErrors.telefono}</p>}
                  </div>

                  {/* Tipo de proyecto */}
                  <div>
                    <div className="relative">
                      <label htmlFor="tipo-proyecto" className="sr-only">Tipo de proyecto</label>
                      <select
                        id="tipo-proyecto"
                        className={`input-field appearance-none cursor-pointer ${formErrors.tipo ? '!border-red-400/60' : ''}`}
                        value={formData.tipo}
                        onChange={(e) => { setFormData({ ...formData, tipo: e.target.value }); clearFieldError('tipo'); }}
                      >
                        <option value="" disabled>
                          Tipo de proyecto
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t} className="bg-dark text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                      />
                    </div>
                    {formErrors.tipo && <p className="text-red-400 text-xs mt-1 animate-fadeInUp">{formErrors.tipo}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-brand w-full justify-center !py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:!transform-none disabled:!shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar por WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-white/50 text-xs text-center font-body">
                    Sin compromiso. Respondemos incluso fuera de horario si es urgente.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/60 text-xs font-body uppercase tracking-[0.15em]">
          Descubre más
        </span>
        <ArrowDown size={18} className="text-brand animate-bounce" />
      </div>
    </section>
  );
}
