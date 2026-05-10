import { useEffect, useRef, useState } from 'react';
import { Send, Phone, MessageCircle, ArrowDown, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';
import { BUSINESS } from '../data/business';



export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const [formData, setFormData] = useState({ nombre: '', telefono: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const imgFallbackRef = useRef(null);

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

        // Parallax solo en desktop — en móvil es overhead sin beneficio visual
        if (bgRef.current && window.matchMedia('(min-width: 1024px)').matches) {
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

    // ── Construir mensaje y abrir WhatsApp SÍNCRONO ───────────────────────
    // Safari/iOS bloquea window.open() si se llama desde un setTimeout,
    // porque pierde la "user activation". Por eso disparamos el open
    // inmediatamente dentro del handler y el feedback visual va aparte.
    const msg = `Hola, soy ${formData.nombre}. Quiero pedir presupuesto. Mi teléfono: ${formData.telefono}.`;
    window.open(
      `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );

    // Feedback visual breve después
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
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
          ref={imgFallbackRef}
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-[62%_center] transition-opacity duration-700"
          style={{ opacity: videoReady ? 0 : 1 }}
          width="1920"
          height="1080"
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-[62%_center] lg:scale-110"
        >
          <source
            media="(max-width: 1023px)"
            src="/videos/HERO MOVIL.mp4"
            type="video/mp4"
          />
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
      <div className="relative z-10 container-custom px-6 pt-32 pb-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          <div>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 border border-brand/30 bg-brand/10 px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="text-brand-glow text-xs font-body font-semibold uppercase tracking-[0.12em]">
                Instaladores eléctricos autorizados del REBT
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-white leading-[1.06] tracking-tight overflow-hidden mb-8 lg:mb-10" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}>
              <span className="hero-title-line block">
                Instalaciones eléctricas
              </span>
              <span className="hero-title-line block text-gradient-gold">
                bien hechas
              </span>
              <span className="hero-title-line block text-white/90">
                en Madrid y Toledo
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle font-body text-lg text-white/75 max-w-lg leading-relaxed mb-8">
              Hacemos instalaciones seguras, limpias y conformes a la normativa.
              Si algo no queda como esperabas, volvemos a revisarlo sin coste.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <MagneticElement strength={0.3}>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
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
                  href={`tel:${BUSINESS.phone}`}
                  className="hero-cta-btn btn-outline !border-white/25 !text-white hover:!border-brand hover:!text-brand !py-3.5 !px-7"
                >
                  <Phone size={18} />
                  {BUSINESS.phoneDisplay}
                </a>
              </MagneticElement>
            </div>

            {/* Trust strip */}
            <div className="hero-cta-btn mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* Google rating */}
              <div className="flex items-center gap-2">
                <span className="text-brand text-base leading-none tracking-tight">★★★★★</span>
                <span className="font-heading font-bold text-white text-sm">{BUSINESS.rating.value}</span>
                <span className="text-white/45 text-xs font-body">
                  · {BUSINESS.rating.count} reseñas Google
                </span>
              </div>
              <span className="hidden sm:block w-px h-4 bg-white/15" />
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <ShieldCheck size={13} className="text-brand shrink-0" />
                Instalador autorizado REBT
              </div>
              <span className="hidden sm:block w-px h-4 bg-white/15" />
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-body">
                <Zap size={13} className="text-brand shrink-0" />
                Urgencias 24h / 365
              </div>
            </div>
          </div>

          {/* Contact form — desktop only */}
          <div className="hero-form hidden lg:block group">
            <div className="bg-black/20 backdrop-blur-md border border-white/[0.14] p-6 md:p-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
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
                      setFormData({ nombre: '', telefono: '' });
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
                      Pide presupuesto gratis
                    </p>
                    <p className="text-white/65 text-sm font-body mt-1">
                      Solo 2 campos. Te llamamos nosotros.
                    </p>
                  </div>

                  {/* Nombre */}
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      className={`input-field ${formErrors.nombre ? '!border-red-400/60' : ''}`}
                      aria-invalid={!!formErrors.nombre}
                      aria-describedby={formErrors.nombre ? 'err-nombre' : undefined}
                      value={formData.nombre}
                      onChange={(e) => { setFormData({ ...formData, nombre: e.target.value }); clearFieldError('nombre'); }}
                    />
                    {formErrors.nombre && <p id="err-nombre" className="text-red-400 text-xs mt-1 animate-fadeInUp">{formErrors.nombre}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono de contacto"
                      autoComplete="tel"
                      inputMode="tel"
                      className={`input-field ${formErrors.telefono ? '!border-red-400/60' : ''}`}
                      aria-invalid={!!formErrors.telefono}
                      aria-describedby={formErrors.telefono ? 'err-telefono' : undefined}
                      value={formData.telefono}
                      onChange={(e) => { setFormData({ ...formData, telefono: e.target.value }); clearFieldError('telefono'); }}
                    />
                    {formErrors.telefono && <p id="err-telefono" className="text-red-400 text-xs mt-1 animate-fadeInUp">{formErrors.telefono}</p>}
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
                    Sin compromiso · Respuesta en menos de 24h
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
