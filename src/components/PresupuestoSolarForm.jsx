import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Building2, Home, Users, Phone, User, MessageSquare } from 'lucide-react';

const TIPOS = [
  { id: 'residencial', label: 'Residencial', sub: 'Casa o piso', icon: Home },
  { id: 'empresa',     label: 'Empresa / Nave', sub: 'Industrial o comercial', icon: Building2 },
  { id: 'comunidad',  label: 'Comunidad', sub: 'Edificio de vecinos', icon: Users },
];

const FACTURAS = [
  { id: 'menos100',  label: 'Menos de 100 €',  range: '< 100 €' },
  { id: '100-300',   label: '100 – 300 €',     range: '100-300 €' },
  { id: '300-600',   label: '300 – 600 €',     range: '300-600 €' },
  { id: 'mas600',    label: 'Más de 600 €',    range: '+ 600 €' },
];

const CUBIERTAS = [
  { id: 'si',   label: 'Sí' },
  { id: 'no',   label: 'No' },
  { id: 'nosé', label: 'No sé' },
];

export default function PresupuestoSolarForm() {
  const [step, setStep]         = useState(1);
  const [tipo, setTipo]         = useState(null);
  const [factura, setFactura]   = useState(null);
  const [cubierta, setCubierta] = useState(null);
  const [nombre, setNombre]     = useState('');
  const [telefono, setTelefono] = useState('');
  const [nota, setNota]         = useState('');
  const [errors, setErrors]     = useState({});
  const [enviado, setEnviado]   = useState(false);

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const validateStep3 = () => {
    const e = {};
    if (!nombre.trim())   e.nombre   = 'El nombre es obligatorio';
    if (!telefono.trim()) e.telefono = 'El teléfono es obligatorio';
    else if (!/^[0-9+ ()-]{6,}$/.test(telefono)) e.telefono = 'Teléfono inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const tipoLabel     = TIPOS.find((t) => t.id === tipo)?.label    ?? '';
    const facturaLabel  = FACTURAS.find((f) => f.id === factura)?.range ?? '';
    const cubiertaLabel = cubierta === 'si' ? 'Sí' : cubierta === 'no' ? 'No' : 'No sé';

    const msg = [
      `👋 Hola, me interesa una instalación fotovoltaica.`,
      ``,
      `📌 Tipo: ${tipoLabel}`,
      `💡 Factura mensual: ${facturaLabel}`,
      `🏠 Cubierta propia: ${cubiertaLabel}`,
      `👤 Nombre: ${nombre}`,
      nota ? `💬 Consulta: ${nota}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/34605333108?text=${encodeURIComponent(msg)}`, '_blank');
    setEnviado(true);
  };

  const progress = ((step - 1) / 2) * 100;

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-brand" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-3">¡Solicitud enviada!</h3>
        <p className="text-white/60 max-w-sm">
          Te abrimos WhatsApp para que puedas enviar tu consulta directamente. Te respondemos en menos de 24h.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-white/40 mb-2">
          <span>Paso {step} de 3</span>
          <span>{step === 1 ? 'Tipo de instalación' : step === 2 ? 'Tu consumo' : 'Datos de contacto'}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-500"
            style={{ width: `${step === 1 ? 33 : step === 2 ? 66 : 100}%` }}
          />
        </div>
      </div>

      {/* PASO 1 — Tipo */}
      {step === 1 && (
        <div>
          <p className="text-white/70 text-sm mb-5">¿Qué tipo de instalación necesitas?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {TIPOS.map(({ id, label, sub, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => { setTipo(id); }}
                className={`flex flex-col items-center gap-3 p-5 border rounded-xl transition-all duration-200 min-h-[120px] justify-center
                  ${tipo === id
                    ? 'border-brand bg-brand/15 shadow-[0_0_20px_rgba(245,197,24,0.2)]'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
              >
                <Icon size={28} className={tipo === id ? 'text-brand' : 'text-white/50'} />
                <div className="text-center">
                  <p className={`font-heading font-bold text-sm ${tipo === id ? 'text-brand' : 'text-white'}`}>{label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{sub}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!tipo}
            onClick={goNext}
            className="w-full btn-brand justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Siguiente
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* PASO 2 — Factura + cubierta */}
      {step === 2 && (
        <div>
          <p className="text-white/70 text-sm mb-4">¿Cuánto pagas de luz al mes aproximadamente?</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {FACTURAS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFactura(id)}
                className={`p-4 border rounded-xl text-sm font-heading font-bold transition-all duration-200 min-h-[56px]
                  ${factura === id
                    ? 'border-brand bg-brand/15 text-brand shadow-[0_0_15px_rgba(245,197,24,0.15)]'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-white/70 text-sm mb-3">¿Tienes cubierta o tejado propio?</p>
          <div className="flex gap-3 mb-8">
            {CUBIERTAS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCubierta(id)}
                className={`flex-1 p-3 border rounded-xl text-sm font-bold transition-all duration-200 min-h-[48px]
                  ${cubierta === id
                    ? 'border-brand bg-brand/15 text-brand'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={goBack} className="btn-outline flex items-center gap-2 px-5">
              <ArrowLeft size={16} />
              Atrás
            </button>
            <button
              type="button"
              disabled={!factura || !cubierta}
              onClick={goNext}
              className="flex-1 btn-brand justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* PASO 3 — Datos de contacto */}
      {step === 3 && (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-white/70 text-sm mb-5">Casi listo. ¿Cómo te llamamos?</p>

          <div className="space-y-4 mb-6">
            {/* Nombre */}
            <div>
              <label htmlFor="sf-nombre" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                Nombre <span className="text-brand">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <input
                  id="sf-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value); if (errors.nombre) setErrors((p) => ({ ...p, nombre: '' })); }}
                  placeholder="Tu nombre"
                  className={`w-full bg-white/5 border ${errors.nombre ? 'border-red-400/60' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all`}
                />
              </div>
              {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="sf-telefono" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                Teléfono <span className="text-brand">*</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <input
                  id="sf-telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => { setTelefono(e.target.value); if (errors.telefono) setErrors((p) => ({ ...p, telefono: '' })); }}
                  placeholder="600 000 000"
                  className={`w-full bg-white/5 border ${errors.telefono ? 'border-red-400/60' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all`}
                />
              </div>
              {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
            </div>

            {/* Nota opcional */}
            <div>
              <label htmlFor="sf-nota" className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">
                ¿Alguna consulta? <span className="text-white/30">(opcional)</span>
              </label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none" />
                <textarea
                  id="sf-nota"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  placeholder="Ej: Tenemos una nave de 500m² con cubierta metálica..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/50 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={goBack} className="btn-outline flex items-center gap-2 px-5">
              <ArrowLeft size={16} />
              Atrás
            </button>
            <button type="submit" className="flex-1 btn-brand justify-center">
              Solicitar estudio gratuito
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="text-white/25 text-xs text-center mt-4">
            Al enviar se abrirá WhatsApp con tu consulta pre-rellenada.
          </p>
        </form>
      )}
    </div>
  );
}
