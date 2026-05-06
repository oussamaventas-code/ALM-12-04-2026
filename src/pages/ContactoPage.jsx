import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  Phone, Mail, Clock, ArrowRight, User, MessageSquare,
  MapPin, CheckCircle, AlertTriangle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const SERVICIOS = [
  'Instalación eléctrica completa',
  'Reforma eléctrica',
  'Cuadro eléctrico / ampliación',
  'Urgencia eléctrica 24h',
  'Boletín eléctrico (BIE/CIE)',
  'Paneles solares (fotovoltaica)',
  'Puntos de recarga vehículo eléctrico',
  'Telecomunicaciones',
  'Otro (lo explico en el mensaje)',
];

export default function ContactoPage() {
  const heroRef  = useRef(null);
  const formRef  = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors]   = useState({});
  const [form, setForm]       = useState({
    nombre:   '',
    telefono: '',
    email:    '',
    servicio: '',
    mensaje:  '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-hero > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.15,
      });
      gsap.from('.ct-animate', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())   e.nombre   = 'El nombre es obligatorio';
    if (!form.telefono.trim()) e.telefono = 'El teléfono es obligatorio';
    else if (!/^[0-9+ ()-]{6,}$/.test(form.telefono)) e.telefono = 'Teléfono inválido';
    if (!form.servicio)        e.servicio = 'Elige un servicio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const lines = [
      `👋 Hola, me gustaría solicitar información.`,
      ``,
      `👤 Nombre: ${form.nombre}`,
      form.email    ? `📧 Email: ${form.email}`          : '',
      `🔧 Servicio: ${form.servicio}`,
      form.mensaje  ? `💬 Mensaje: ${form.mensaje}`       : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/34605333108?text=${encodeURIComponent(lines)}`, '_blank');
    setEnviado(true);
  };

  return (
    <>
      <SeoHead
        title="Contacto — ALMelectricidad | Electricistas Madrid y Toledo"
        description="Contacta con ALM Electricidad para solicitar presupuesto de instalación eléctrica, urgencias 24h o paneles solares en Madrid y Toledo. Solemos responder en menos de 24h."
        canonical="/contacto"
        ogImage="https://almelectricidad.com/og-contacto.png"
      />

      {/* Hero */}
      <section ref={heroRef} className="relative bg-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom px-6 relative z-10">
          <div className="ct-hero max-w-2xl">
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-8 font-body" aria-label="Migas de pan">
              <Link to="/" className="hover:text-brand transition-colors">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">Contacto</span>
            </nav>

            <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-2 mb-6">
              <Phone size={15} className="text-brand" />
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Hablemos</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Cuéntanos qué{' '}
              <span className="text-gradient-gold">necesitas</span>
            </h1>
            <p className="font-body text-lg text-white/55 leading-relaxed">
              Presupuesto cerrado en menos de 24h. Sin sorpresas, sin letras pequeñas.
              Técnicos autorizados en Madrid y Toledo.
            </p>
          </div>
        </div>
        <hr className="rule w-full mt-10 opacity-20" />
      </section>

      {/* Contenido principal */}
      <section ref={formRef} className="section-padding bg-surface">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Columna izquierda — info de contacto */}
            <div className="lg:col-span-2 space-y-8">
              <div className="ct-animate">
                <h2 className="font-heading text-2xl font-bold mb-6">Datos de contacto</h2>
                <address className="not-italic space-y-5">
                  <a href="tel:+34605333108" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <Phone size={18} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Teléfono</p>
                      <p className="font-heading font-bold text-white text-lg group-hover:text-brand transition-colors">+34 605 33 31 08</p>
                    </div>
                  </a>

                  <a href="mailto:contacto@almelectricidad.com" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <Mail size={18} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="font-heading font-bold text-white group-hover:text-brand transition-colors">contacto@almelectricidad.com</p>
                    </div>
                  </a>

                  <a href="https://www.instagram.com/almelectricidad/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <InstagramIcon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Instagram</p>
                      <p className="font-heading font-bold text-white group-hover:text-brand transition-colors">@almelectricidad</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Horario</p>
                      <p className="text-white/80 text-sm">Lun–Vie: 8:00–20:00</p>
                      <p className="text-white/80 text-sm">Sáb: 9:00–14:00</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-yellow-400 font-bold text-sm">Urgencias 24h / 365 días</p>
                      <p className="text-white/50 text-xs">Llamamos y vamos</p>
                    </div>
                  </div>
                </address>
              </div>

              {/* Zonas */}
              <div className="ct-animate">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-brand" />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white/70">Zona de cobertura</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Madrid Centro','Madrid Norte','Madrid Sur','Madrid Este','Madrid Oeste','Getafe','Alcorcón','Toledo','Talavera','Illescas'].map((zona) => (
                    <span key={zona} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/60">
                      {zona}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha — formulario */}
            <div className="lg:col-span-3 ct-animate">
              {enviado ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-brand" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">¡Solicitud enviada!</h3>
                  <p className="text-white/60 max-w-sm mb-6">
                    Se abrió WhatsApp con tu consulta. Te respondemos en menos de 24h.
                  </p>
                  <button
                    onClick={() => { setEnviado(false); setForm({ nombre:'', telefono:'', email:'', servicio:'', mensaje:'' }); }}
                    className="btn-outline"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <div className="bg-dark/60 border border-white/8 rounded-2xl p-7 md:p-10">
                  <h2 className="font-heading text-xl font-bold text-white mb-1">Solicita tu presupuesto</h2>
                  <p className="text-white/50 text-sm mb-7">Te respondemos en menos de 24h, normalmente antes.</p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5 font-body">

                    {/* Nombre */}
                    <div>
                      <label htmlFor="ct-nombre" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                        Nombre completo <span className="text-brand">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                        <input
                          id="ct-nombre"
                          type="text"
                          value={form.nombre}
                          onChange={set('nombre')}
                          placeholder="Juan García"
                          className={`w-full bg-white/5 border ${errors.nombre ? 'border-red-400/60' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all`}
                        />
                      </div>
                      {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
                    </div>

                    {/* Teléfono + Email en fila */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ct-telefono" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                          Teléfono <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                          <input
                            id="ct-telefono"
                            type="tel"
                            value={form.telefono}
                            onChange={set('telefono')}
                            placeholder="600 000 000"
                            className={`w-full bg-white/5 border ${errors.telefono ? 'border-red-400/60' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all`}
                          />
                        </div>
                        {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                          Email <span className="text-white/30">(opcional)</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                          <input
                            id="ct-email"
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="juan@empresa.com"
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Servicio */}
                    <div>
                      <label htmlFor="ct-servicio" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                        ¿Qué necesitas? <span className="text-brand">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                        <select
                          id="ct-servicio"
                          value={form.servicio}
                          onChange={set('servicio')}
                          className={`w-full bg-white/5 border ${errors.servicio ? 'border-red-400/60' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-brand/50 transition-all appearance-none cursor-pointer`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M1 3.5L6 8l5-4.5'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '2.5rem',
                          }}
                        >
                          <option value="">Selecciona un servicio...</option>
                          {SERVICIOS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.servicio && <p className="text-red-400 text-xs mt-1">{errors.servicio}</p>}
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="ct-mensaje" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                        Mensaje <span className="text-white/30">(opcional)</span>
                      </label>
                      <textarea
                        id="ct-mensaje"
                        value={form.mensaje}
                        onChange={set('mensaje')}
                        rows={4}
                        placeholder="Cuéntanos más detalles sobre tu proyecto..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-brand justify-center text-base py-4"
                    >
                      Solicitar presupuesto gratuito
                      <ArrowRight size={18} />
                    </button>

                    <p className="text-white/25 text-xs text-center">
                      Al enviar se abrirá WhatsApp con tu consulta pre-rellenada. Sin spam.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
