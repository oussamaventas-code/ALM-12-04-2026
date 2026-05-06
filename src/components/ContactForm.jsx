import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, User, Mail, Phone, MessageSquare, CheckCircle, Star } from 'lucide-react';
import gsap from 'gsap';
import { BUSINESS } from '../data/business';

export default function ContactForm() {
  const sectionRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    servicio: '',
  });

  const servicios = [
    'Instalación eléctrica completa',
    'Reforma eléctrica',
    'Cuadro eléctrico',
    'Urgencia eléctrica 24h',
    'Boletín eléctrico (BIE/CIE)',
    'Paneles solares (fotovoltaica)',
    'Puntos de recarga VE',
    'Telecomunicaciones',
    'Otro (especificar en mensaje)',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }, [errors]);

  const validate = useCallback(() => {
    const e = {};
    if (!formData.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) e.email = 'Necesitamos un email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido';
    if (!formData.telefono.trim()) e.telefono = 'El teléfono es obligatorio';
    else if (!/^[0-9+\s()-]{6,}$/.test(formData.telefono)) e.telefono = 'Teléfono inválido';
    if (!formData.servicio.trim()) e.servicio = 'Por favor elige un servicio';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData]);

  const handleWhatsApp = useCallback(() => {
    const message = `Hola, me gustaría solicitar un presupuesto. Nombre: ${formData.nombre}, Email: ${formData.email}, Teléfono: ${formData.telefono}${formData.empresa ? `, Empresa: ${formData.empresa}` : ''}, Servicio: ${formData.servicio}`;
    const whatsappUrl = `https://wa.me/34605333108?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validate()) return;
    // Abrir WhatsApp síncrono — Safari iOS bloquea window.open si va dentro
    // de un setTimeout (pierde la "user activation"). Feedback visual aparte.
    handleWhatsApp();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  }, [validate, handleWhatsApp]);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 md:py-32 overflow-hidden bg-dark relative"
    >

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Pill */}
        <div className="contact-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
          <span className="text-[var(--color-brand)] text-xs font-semibold tracking-wide uppercase">
            Presupuesto Eléctrico
          </span>
        </div>

        {/* Split Layout: Left Content + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: Headlines & Benefits */}
          <div className="flex flex-col justify-center">
            <h2 className="contact-animate text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-ink)] mb-6 leading-[1.15] tracking-tight font-heading">
              ¿Necesitas un presupuesto rápido?
            </h2>

            <p className="contact-animate text-[var(--color-ink-400)] text-base md:text-lg leading-relaxed mb-10 font-body">
              Te respondemos en menos de 24 horas con presupuesto cerrado, sin sorpresas.
            </p>

            {/* Benefits with Checkmarks */}
            <div className="space-y-5">
              <div className="contact-animate flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center mt-0.5">
                  <span className="text-[var(--color-dark)] font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1">Presupuesto cerrado</h3>
                  <p className="text-[var(--color-ink-400)] text-sm">Sin sorpresas ni costes ocultos en la factura final.</p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center mt-0.5">
                  <span className="text-[var(--color-dark)] font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1">Respuesta en menos de 24h</h3>
                  <p className="text-[var(--color-ink-400)] text-sm">Nos pondremos en contacto rápidamente con tu propuesta.</p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center mt-0.5">
                  <span className="text-[var(--color-dark)] font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1">Instalador autorizado</h3>
                  <p className="text-[var(--color-ink-400)] text-sm">Damos de alta el boletín y los certificados oficiales.</p>
                </div>
              </div>
            </div>

            {/* Footer — rating real Google */}
            <div className="contact-animate mt-12 flex items-center gap-3">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} className="text-[var(--color-brand)] fill-[var(--color-brand)]" />
                ))}
              </div>
              <p className="text-[var(--color-ink-400)] text-sm font-medium">
                <span className="text-[var(--color-ink)] font-bold">{BUSINESS.rating.value}</span>
                {' · '}
                <span className="text-[var(--color-ink-400)]">{BUSINESS.rating.count} reseñas en Google</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Form in Elevated Card */}
          <div className="contact-animate">
            <div
                className="bg-gradient-to-br from-[var(--color-surface-300)]/80 to-[var(--color-surface-400)]/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-[var(--color-brand)]/20 shadow-[0_0_40px_rgba(245,197,24,0.15),inset_0_0_20px_rgba(245,197,24,0.05)]"
                style={{
                  boxShadow: '0 0 40px rgba(245, 197, 24, 0.15), inset 0 0 20px rgba(245, 197, 24, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center gap-5 py-10 text-center animate-fadeInUp">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <div>
                      <p className="font-heading text-2xl font-bold text-[var(--color-ink)] mb-2">¡Solicitud enviada!</p>
                      <p className="font-body text-[var(--color-ink-400)] text-sm leading-relaxed">
                        Se ha abierto WhatsApp con tu consulta.<br />
                        Te respondemos en menos de 24h.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setIsSubmitted(false); setFormData({ nombre: '', email: '', telefono: '', empresa: '', servicio: '' }); }}
                      className="text-[var(--color-brand)] text-sm font-body hover:text-[var(--color-brand-light)] transition-colors underline underline-offset-2"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 font-body">

                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nombre" className="text-xs font-semibold text-[var(--color-ink-600)] uppercase tracking-wider">
                      Nombre completo <span className="text-[var(--color-brand)]">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-3.5 text-[var(--color-ink-400)]" />
                      <input
                        id="nombre"
                        type="text"
                        autoComplete="name"
                        value={formData.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
                        placeholder="Juan García"
                        className={`w-full bg-[var(--color-dark-800)]/50 border ${errors.nombre ? 'border-red-400/50' : 'border-[var(--color-brand)]/20'} rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/50 focus:bg-[var(--color-dark-800)]/70 transition-all`}
                      />
                    </div>
                    {errors.nombre && <span className="text-red-400 text-xs">{errors.nombre}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-semibold text-[var(--color-ink-600)] uppercase tracking-wider">
                      Email <span className="text-[var(--color-brand)]">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-3.5 text-[var(--color-ink-400)]" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="juan@empresa.com"
                        className={`w-full bg-[var(--color-dark-800)]/50 border ${errors.email ? 'border-red-400/50' : 'border-[var(--color-brand)]/20'} rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/50 focus:bg-[var(--color-dark-800)]/70 transition-all`}
                      />
                    </div>
                    {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
                  </div>

                  {/* Telefono */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="telefono" className="text-xs font-semibold text-[var(--color-ink-600)] uppercase tracking-wider">
                      Teléfono <span className="text-[var(--color-brand)]">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-3.5 text-[var(--color-ink-400)]" />
                      <input
                        id="telefono"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.telefono}
                        onChange={(e) => handleChange('telefono', e.target.value)}
                        placeholder="600 000 000"
                        className={`w-full bg-[var(--color-dark-800)]/50 border ${errors.telefono ? 'border-red-400/50' : 'border-[var(--color-brand)]/20'} rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/50 focus:bg-[var(--color-dark-800)]/70 transition-all`}
                      />
                    </div>
                    {errors.telefono && <span className="text-red-400 text-xs">{errors.telefono}</span>}
                  </div>

                  {/* Empresa */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="empresa" className="text-xs font-semibold text-[var(--color-ink-600)] uppercase tracking-wider">
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      autoComplete="organization"
                      value={formData.empresa}
                      onChange={(e) => handleChange('empresa', e.target.value)}
                      placeholder="Mi Empresa S.L. (opcional)"
                      className="w-full bg-[var(--color-dark-800)]/50 border border-[var(--color-brand)]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/50 focus:bg-[var(--color-dark-800)]/70 transition-all"
                    />
                  </div>

                  {/* Servicio Select */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="servicio" className="text-xs font-semibold text-[var(--color-ink-600)] uppercase tracking-wider">
                      ¿Qué proceso eléctrico necesitas? <span className="text-[var(--color-brand)]">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-4 top-3.5 text-[var(--color-ink-400)] pointer-events-none" />
                      <select
                        id="servicio"
                        value={formData.servicio}
                        onChange={(e) => handleChange('servicio', e.target.value)}
                        className={`w-full bg-[var(--color-dark-800)]/50 border ${errors.servicio ? 'border-red-400/50' : 'border-[var(--color-brand)]/20'} rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/50 focus:bg-[var(--color-dark-800)]/70 transition-all appearance-none cursor-pointer`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M1 3.5L6 8l5-4.5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="">Elige un servicio...</option>
                        {servicios.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.servicio && <span className="text-red-400 text-xs">{errors.servicio}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] text-[var(--color-dark)] font-bold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(245,197,24,0.4)] hover:-translate-y-1 active:translate-y-0 mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
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
                        Solicitar Presupuesto
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
                )}
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
