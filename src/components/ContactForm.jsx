import { useState, useEffect, useRef } from 'react';
import {
  User,
  Building,
  Mail,
  Phone,
  Wrench,
  Euro,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const installationTypes = [
  'Instalaci\u00F3n el\u00E9ctrica nueva',
  'Reforma/adecuaci\u00F3n',
  'Reparaci\u00F3n de aver\u00EDas',
  'Iluminaci\u00F3n LED',
  'Paneles solares/Autoconsumo',
  'Telecomunicaciones',
  'Punto de recarga VE',
  'Bolet\u00EDn/Certificado oficial',
  'Urgencia 24h',
  'Otro',
];

const budgetRanges = [
  'Menos de 5.000\u20AC',
  '5.000\u20AC\u201315.000\u20AC',
  '15.000\u20AC\u201350.000\u20AC',
  'M\u00E1s de 50.000\u20AC',
  'No tengo claro',
];

const stepMeta = [
  { num: 1, label: 'Dinos qui\u00E9n eres' },
  { num: 2, label: '\u00BFQu\u00E9 necesitas?' },
  { num: 3, label: 'Cu\u00E9ntanos m\u00E1s' },
];

export default function ContactForm() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipo: '',
    presupuesto: '',
    mensaje: '',
  });

  /* ── entrance animation ── */
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

  /* ── success animation ── */
  useEffect(() => {
    if (!submitted) return;
    gsap.from('.success-icon', {
      scale: 0,
      rotation: -180,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
    gsap.from('.success-text', { y: 20, opacity: 0, duration: 0.5, delay: 0.3 });
  }, [submitted]);

  /* ── helpers ── */
  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!formData.nombre.trim()) e.nombre = 'El nombre es obligatorio';
      if (!formData.email.trim()) e.email = 'Necesitamos un email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = 'Introduce un email v\u00E1lido';
    }
    if (step === 2) {
      if (!formData.telefono.trim()) e.telefono = 'El tel\u00E9fono es obligatorio';
      else if (!/^[0-9+\s()-]{6,}$/.test(formData.telefono))
        e.telefono = 'Introduce un tel\u00E9fono v\u00E1lido';
      if (!formData.tipo) e.tipo = 'Selecciona un tipo de instalaci\u00F3n';
    }
    if (step === 3) {
      if (!formData.mensaje.trim()) e.mensaje = 'Cu\u00E9ntanos algo sobre tu proyecto';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const slideOut = (dir, cb) => {
    const xOut = dir === 'next' ? -40 : 40;
    const xIn = dir === 'next' ? 40 : -40;
    gsap.to(formRef.current, {
      x: xOut,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        cb();
        gsap.set(formRef.current, { x: xIn });
        gsap.to(formRef.current, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      },
    });
  };

  const nextStep = () => {
    if (!validateStep()) return;
    slideOut('next', () => setStep((s) => s + 1));
  };

  const prevStep = () => {
    slideOut('prev', () => setStep((s) => s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    gsap.to(formRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSubmitted(true),
    });
  };

  /* ── reusable field renderers ── */
  const Field = ({ name, label, icon: Icon, required = true, placeholder = '', type = 'text' }) => (
    <div className="mb-5">
      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1.5 font-heading tracking-wide uppercase">
        <Icon size={15} className="text-brand" />
        {label}
        {!required && (
          <span className="text-ink-300 text-xs normal-case tracking-normal">(opcional)</span>
        )}
      </label>
      <input
        type={type}
        value={formData[name]}
        onChange={(e) => update(name, e.target.value)}
        placeholder={placeholder}
        className={`input-field-light w-full transition-all duration-200 focus:ring-2 focus:ring-brand/50 focus:border-brand ${errors[name] ? '!border-red-400' : ''}`}
      />
      {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const Select = ({ name, label, icon: Icon, options, placeholder }) => (
    <div className="mb-5">
      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1.5 font-heading tracking-wide uppercase">
        <Icon size={15} className="text-brand" />
        {label}
      </label>
      <select
        value={formData[name]}
        onChange={(e) => update(name, e.target.value)}
        className={`input-field-light w-full appearance-none transition-all duration-200 focus:ring-2 focus:ring-brand/50 focus:border-brand cursor-pointer ${errors[name] ? '!border-red-400' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const progressPct = ((step - 1) / 2) * 100;

  return (
    <section id="contacto" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-dark-800 via-dark-600 to-dark-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -z-10 hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/3 rounded-full blur-3xl -z-10 hidden lg:block" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <span className="section-label">Presupuesto</span>
          <h2 className="section-title text-white">Solicita tu presupuesto sin compromiso</h2>
          <p className="section-subtitle text-white/50">
            Cu&eacute;ntanos qu&eacute; necesitas y te respondemos en menos de 24&nbsp;horas con un presupuesto cerrado.
          </p>
        </div>

        {/* Card container */}
        <div className="contact-card card-elevated p-0 overflow-hidden border border-brand/25 shadow-2xl">
          {/* Top progress bar */}
          <div className="h-1 bg-surface-200 w-full">
            <div
              className="h-full bg-gradient-to-r from-brand via-brand to-brand/80 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(245,197,24,0.6)]"
              style={{ width: submitted ? '100%' : `${progressPct}%` }}
            />
          </div>

          {/* Step indicators */}
          {!submitted && (
            <div className="flex items-center justify-between px-8 pt-8 pb-2">
              {stepMeta.map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-sm font-heading font-bold transition-all duration-300 rounded-full ${
                      step >= s.num ? 'bg-brand text-white shadow-lg shadow-brand/50' : 'bg-surface-200 text-ink-400'
                    }`}
                  >
                    {step > s.num ? <CheckCircle size={16} /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:block text-xs font-heading tracking-wide uppercase transition-colors duration-300 ${
                      step >= s.num ? 'text-brand font-semibold' : 'text-ink-300'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="px-8 py-8">
            {submitted ? (
              /* ── Success state ── */
              <div className="text-center py-16">
                <div className="success-icon inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand/20 to-brand/5 text-brand mb-8 rounded-full shadow-[0_0_30px_rgba(245,197,24,0.3)]">
                  <CheckCircle size={48} strokeWidth={1.5} />
                </div>
                <h3 className="success-text text-3xl font-heading font-bold text-white mb-4">
                  ¡Mensaje enviado!
                </h3>
                <p className="success-text text-ink-400 max-w-md mx-auto leading-relaxed">
                  Hemos recibido tu solicitud. Te contactaremos en menos de 24&nbsp;horas con un presupuesto personalizado.
                </p>
                <div className="mt-8 pt-8 border-t border-brand/15">
                  <p className="text-brand text-sm font-semibold uppercase tracking-wider">
                    Gracias por confiar en ALMelectricidad
                  </p>
                </div>
              </div>
            ) : (
              /* ── Multi-step form ── */
              <form onSubmit={handleSubmit}>
                <div ref={formRef}>
                  {step === 1 && (
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink mb-6 flex items-center gap-2">
                        <User size={20} className="text-brand" />
                        Dinos qui&eacute;n eres
                      </h3>
                      <Field name="nombre" label="Nombre completo" icon={User} placeholder="Tu nombre" />
                      <Field name="empresa" label="Empresa" icon={Building} required={false} placeholder="Tu empresa (si aplica)" />
                      <Field name="email" label="Email" icon={Mail} type="email" placeholder="tu@email.com" />
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink mb-6 flex items-center gap-2">
                        <Wrench size={20} className="text-brand" />
                        &iquest;Qu&eacute; necesitas?
                      </h3>
                      <Field name="telefono" label="Tel&eacute;fono" icon={Phone} type="tel" placeholder="600 000 000" />
                      <Select name="tipo" label="Tipo de instalaci&oacute;n" icon={Wrench} options={installationTypes} placeholder="Selecciona una opci\u00F3n" />
                      <Select name="presupuesto" label="Presupuesto estimado" icon={Euro} options={budgetRanges} placeholder="Rango orientativo" />
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink mb-6 flex items-center gap-2">
                        <MessageSquare size={20} className="text-brand" />
                        Cu&eacute;ntanos m&aacute;s
                      </h3>
                      <div className="mb-5">
                        <label className="flex items-center gap-2 text-sm font-medium text-ink mb-1.5 font-heading tracking-wide uppercase">
                          <MessageSquare size={15} className="text-brand" />
                          Mensaje
                        </label>
                        <textarea
                          value={formData.mensaje}
                          onChange={(e) => update('mensaje', e.target.value)}
                          rows={5}
                          placeholder="Descr\u00EDbenos tu proyecto, direcci\u00F3n, plazos o cualquier detalle relevante..."
                          className={`input-field-light w-full resize-none transition-all duration-200 focus:ring-2 focus:ring-brand/50 focus:border-brand ${errors.mensaje ? '!border-red-400' : ''}`}
                        />
                        {errors.mensaje && (
                          <p className="text-red-600 text-xs mt-1">{errors.mensaje}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand/15">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-outline flex items-center gap-2 transition-all duration-200 hover:border-brand/50 hover:text-brand"
                    >
                      <ArrowLeft size={16} />
                      Anterior
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-brand flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-brand/40 active:scale-95"
                    >
                      Siguiente
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button type="submit" className="btn-brand flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-brand/40 active:scale-95">
                      <Send size={16} />
                      Enviar solicitud
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
