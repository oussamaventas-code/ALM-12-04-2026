import { useState, useEffect, useRef, useCallback } from 'react';
import { User, Building, Mail, Phone, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.contact-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!submitted) return;
    gsap.from('.success-icon', { scale: 0, rotation: -180, duration: 0.6, ease: 'back.out(1.7)' });
    gsap.from('.success-text', { y: 20, opacity: 0, duration: 0.5, delay: 0.3 });
  }, [submitted]);

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
    if (!formData.mensaje.trim()) e.mensaje = 'Cuéntanos tu necesidad';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }, [validate]);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-dark-800 via-dark-600 to-dark-800 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -z-10 hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/3 rounded-full blur-3xl -z-10 hidden lg:block" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="contact-header text-center mb-12">
          <span className="inline-flex items-center gap-2 text-brand text-sm font-heading font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand" />
            Diagnóstico Eléctrico
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Cuéntanos tu necesidad eléctrica
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Completa el formulario y te contactaremos en menos de 24h con un diagnóstico personalizado y presupuesto cerrado.
          </p>
        </div>

        <div className="contact-card card-elevated p-8 md:p-10 border border-brand/25">
          {submitted ? (
            <div className="text-center py-12">
              <div className="success-icon inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand/20 to-brand/5 text-brand mb-8 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <h3 className="success-text text-3xl font-heading font-bold text-white mb-4">¡Solicitud recibida!</h3>
              <p className="success-text text-white/60 max-w-md mx-auto leading-relaxed">
                Hemos recibido tu mensaje. Nos pondremos en contacto en menos de 24 horas.
              </p>
              <div className="mt-8 pt-8 border-t border-brand/15">
                <p className="text-brand text-sm font-semibold uppercase tracking-wider">Gracias por confiar en ALMelectricidad</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nombre y Email en fila */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium text-ink mb-2 font-heading tracking-wide uppercase">
                    <User size={16} className="text-brand" />
                    Nombre completo <span className="text-brand/60 text-xs">*</span>
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    className={`input-field-light w-full focus:ring-2 focus:ring-brand/50 ${errors.nombre ? '!border-red-400' : ''}`}
                  />
                  {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-ink mb-2 font-heading tracking-wide uppercase">
                    <Mail size={16} className="text-brand" />
                    Email <span className="text-brand/60 text-xs">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className={`input-field-light w-full focus:ring-2 focus:ring-brand/50 ${errors.email ? '!border-red-400' : ''}`}
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Empresa y Teléfono */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="empresa" className="flex items-center gap-2 text-sm font-medium text-ink mb-2 font-heading tracking-wide uppercase">
                    <Building size={16} className="text-brand" />
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    placeholder="Mi Empresa S.L."
                    className="input-field-light w-full focus:ring-2 focus:ring-brand/50"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium text-ink mb-2 font-heading tracking-wide uppercase">
                    <Phone size={16} className="text-brand" />
                    Teléfono <span className="text-brand/60 text-xs">*</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    placeholder="600 000 000"
                    className={`input-field-light w-full focus:ring-2 focus:ring-brand/50 ${errors.telefono ? '!border-red-400' : ''}`}
                  />
                  {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="flex items-center gap-2 text-sm font-medium text-ink mb-2 font-heading tracking-wide uppercase">
                  <MessageSquare size={16} className="text-brand" />
                  ¿Qué necesitas? <span className="text-brand/60 text-xs">*</span>
                </label>
                <textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={(e) => handleChange('mensaje', e.target.value)}
                  placeholder="Ej. Gestión de leads, respuestas automáticas a clientes, integración con CRM..."
                  rows={5}
                  className={`input-field-light w-full resize-none focus:ring-2 focus:ring-brand/50 ${errors.mensaje ? '!border-red-400' : ''}`}
                />
                {errors.mensaje && <p className="text-red-600 text-xs mt-1">{errors.mensaje}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-brand flex items-center justify-center gap-2 py-3 mt-8 transition-all duration-200 hover:shadow-lg hover:shadow-brand/40 active:scale-95"
              >
                Solicitar Diagnóstico IA
                <ArrowRight size={18} />
              </button>

              {/* Social Proof */}
              <p className="text-center text-sm text-white/50 mt-6">
                ✓ +120 empresas ya han automatizado su éxito
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
