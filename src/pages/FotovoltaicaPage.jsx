import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import PresupuestoSolarForm from '../components/PresupuestoSolarForm';
import {
  Sun, Zap, Shield, TrendingUp, CheckCircle, ArrowRight,
  Phone, MessageCircle, Calculator, Leaf, Building, Home,
  ChevronDown,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin ya registrado globalmente en App.jsx

const benefits = [
  { icon: TrendingUp, title: 'Ahorro del 30-50%', desc: 'En tu factura eléctrica desde el primer mes de funcionamiento.' },
  { icon: Shield, title: 'Garantía de 25 años', desc: 'Paneles Tier 1 con rendimiento garantizado durante más de dos décadas.' },
  { icon: Leaf, title: '0 emisiones', desc: 'Energía 100% limpia. Reduce tu huella de carbono real.' },
  { icon: Zap, title: 'Amortización 4-6 años', desc: 'Retorno de inversión rápido con los precios actuales de la electricidad.' },
];

const processSteps = [
  { num: '01', title: 'Estudio personalizado', desc: 'Analizamos tu cubierta, orientación, consumo y factura actual. Sin compromiso.' },
  { num: '02', title: 'Diseño del sistema', desc: 'Dimensionamos la instalación óptima para maximizar tu ahorro real.' },
  { num: '03', title: 'Instalación profesional', desc: 'Montaje por electricistas autorizados con material certificado Tier 1.' },
  { num: '04', title: 'Legalización completa', desc: 'Nos encargamos de todos los trámites: ayuntamiento, distribuidora, compensación de excedentes.' },
  { num: '05', title: 'Monitorización', desc: 'Sistema de seguimiento en tiempo real para que veas tu producción y ahorro.' },
];

const industrialFeatures = [
  'Instalaciones de 10kW a 500kW+',
  'Estructuras para cubierta plana, inclinada y suelo',
  'Inversores trifásicos de alta potencia',
  'Sistemas de monitorización industrial',
  'Mantenimiento preventivo incluido primer año',
  'Gestión de subvenciones y bonificaciones',
  'Estudio de viabilidad financiera',
  'Compensación de excedentes',
];

const faqs = [
  { q: '¿Cuántos paneles necesito para mi empresa?', a: 'Depende de tu consumo. Una nave de tamaño medio suele necesitar entre 40-100 paneles. Lo calculamos exacto con tu factura.' },
  { q: '¿Puedo instalar paneles en una cubierta de uralita?', a: 'No directamente. Primero hay que retirar la uralita (contiene amianto) y sustituirla. Podemos coordinar ambos trabajos.' },
  { q: '¿Qué pasa con el excedente de energía?', a: 'Se vierte a la red y te lo compensan en la factura. Con la regulación actual, es muy ventajoso.' },
  { q: '¿Necesito baterías?', a: 'Para empresas con horario diurno, normalmente no merece la pena. Aprovechas la producción directamente. Para uso nocturno, sí puede ser interesante.' },
  { q: '¿Hay subvenciones disponibles?', a: 'Sí, existen fondos europeos Next Generation y bonificaciones del IBI en muchos municipios. Te asesoramos sobre las que aplican en tu caso.' },
  { q: '¿Cuánto tarda la instalación completa?', a: 'Desde el estudio hasta la puesta en marcha, entre 4-8 semanas según el tamaño. La instalación física suele ser 1-3 semanas.' },
];

const TIPO_MULTIPLICADOR = { residencial: 0.35, empresa: 0.45, comunidad: 0.30 };

export default function FotovoltaicaPage() {
  const heroRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [consumption, setConsumption] = useState(800);
  const [calcTipo, setCalcTipo] = useState('empresa');

  const mult       = TIPO_MULTIPLICADOR[calcTipo];
  const savings    = Math.round(consumption * mult);
  const yearSavings = savings * 12;
  const co2        = (consumption * 0.385 * mult / 1000).toFixed(1);
  // Coste estimado del sistema ≈ factura mensual × 15 (heurística sencilla)
  const costeEstimado = consumption * 15;
  const amortizacion  = yearSavings > 0 ? (costeEstimado / yearSavings).toFixed(1) : '—';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fv-hero-content > *', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  return (
    <>
      <SeoHead
        title="Paneles Solares e Instalaciones Fotovoltaicas en Madrid — ALMelectricidad"
        description="Diseño e instalación de sistemas fotovoltaicos completos en Madrid y Toledo. Autoconsumo residencial e industrial. Legalización incluida. Presupuesto sin compromiso."
        canonical="/fotovoltaica"
        ogImage="https://almelectricidad.com/og-fotovoltaica.png"
      />
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative bg-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/service-solar.webp" alt="" className="w-full h-full object-cover" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />

        <div className="container-custom px-6 relative z-10">
          <div className="fv-hero-content max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-white/65 mb-8 font-body" aria-label="Migas de pan">
              <Link to="/" className="hover:text-brand transition-colors">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link to="/servicios/paneles-solares" className="hover:text-brand transition-colors">Paneles Solares</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">Fotovoltaica en profundidad</span>
            </nav>

            <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/10 px-4 py-2 mb-6">
              <Sun size={16} className="text-brand" />
              <span className="text-brand-glow text-xs font-body font-semibold uppercase tracking-[0.12em]">
                Energía solar para empresas e industria
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.06] mb-6">
              Fotovoltaica que{' '}
              <span className="text-gradient-gold">se paga sola</span>
            </h1>

            <p className="font-body text-lg text-white/55 leading-relaxed mb-8 max-w-2xl">
              Instalamos sistemas fotovoltaicos para empresas, industria y particulares en Madrid y Toledo.
              Desde el estudio de tu cubierta hasta la legalización completa. Ahorro real desde el primer mes.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contacto-solar" className="btn-brand">
                Pide estudio gratuito
                <ArrowRight size={18} />
              </a>
              <a href="https://wa.me/34605333108?text=Hola%2C%20me%20interesa%20una%20instalaci%C3%B3n%20fotovoltaica" target="_blank" rel="noopener" className="btn-whatsapp">
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <hr className="rule w-full mt-0 opacity-30" />
      </section>

      {/* ── Benefits ── */}
      <section className="section-padding bg-surface">
        <div className="container-custom px-6">
          <div className="mb-14">
            <span className="section-label">Ventajas reales</span>
            <h2 className="section-title mt-3">Por qué merece la pena invertir en solar</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="card p-6 group hover:border-brand transition-all duration-300">
                <div className="w-12 h-12 bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <b.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Business + Industrial ── */}
      <section className="section-padding bg-dark">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label !text-brand-glow">Fotovoltaica industrial</span>
              <h2 className="section-title text-white mt-3 mb-6">
                Instalaciones solares para{' '}
                <span className="text-gradient-gold">naves, fábricas y empresas</span>
              </h2>
              <p className="text-white/55 font-body leading-relaxed mb-8">
                Las cubiertas industriales son ideales para fotovoltaica: grandes superficies, consumo diurno
                que coincide con la producción solar, y amortización más rápida que en residencial. Diseñamos
                cada instalación a medida para maximizar tu retorno.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {industrialFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/service-solar.webp"
                alt="Instalación fotovoltaica industrial"
                loading="lazy"
                className="w-full h-80 lg:h-[450px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-brand" />
                    <span className="text-white/70 text-sm font-medium">Empresas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home size={16} className="text-brand" />
                    <span className="text-white/70 text-sm font-medium">Residencial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section-padding bg-surface-200">
        <div className="container-custom px-6">
          <div className="text-center mb-14">
            <span className="section-label justify-center">Nuestro proceso</span>
            <h2 className="section-title mt-3">De tu factura a producir tu propia energía</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="relative">
                <span className="font-heading text-5xl font-extrabold text-surface-300">{s.num}</span>
                <h3 className="font-heading text-base font-bold mt-2 mb-2">{s.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-3 text-surface-400">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="section-padding bg-dark">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/10 px-4 py-2 mb-4">
                <Calculator size={16} className="text-brand" />
                <span className="text-brand text-sm font-medium">Calculadora de ahorro solar</span>
              </div>
              <h2 className="section-title text-white">¿Cuánto podrías ahorrarte?</h2>
            </div>

            <div className="card-dark p-8">
              {/* Selector de tipo */}
              <div className="mb-7">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Tipo de instalación</p>
                <div className="flex gap-2 flex-wrap">
                  {[['residencial','Residencial'],['empresa','Empresa / Nave'],['comunidad','Comunidad']].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCalcTipo(id)}
                      className={`px-4 py-2 text-sm font-heading font-bold rounded-lg border transition-all duration-200
                        ${calcTipo === id ? 'border-brand bg-brand/15 text-brand' : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-white/60 text-sm">Tu factura mensual</label>
                  <span className="text-brand font-heading font-bold text-xl">{consumption}€/mes</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full h-2 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F5C518 ${((consumption - 100) / 1900) * 100}%, #162036 ${((consumption - 100) / 1900) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-white/25 text-xs mt-1">
                  <span>100€</span>
                  <span>2.000€</span>
                </div>
              </div>

              {/* Métricas — ahora 4 tarjetas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-dark/50 p-4 text-center border border-brand/10 rounded-lg">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Ahorro/mes</p>
                  <p className="text-white font-heading font-bold text-2xl">{savings}€</p>
                </div>
                <div className="bg-dark/50 p-4 text-center border border-brand/10 rounded-lg">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Ahorro/año</p>
                  <p className="text-brand font-heading font-bold text-2xl">{yearSavings.toLocaleString()}€</p>
                </div>
                <div className="bg-dark/50 p-4 text-center border border-brand/10 rounded-lg">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">CO₂ evitado</p>
                  <p className="text-green-400 font-heading font-bold text-2xl">{co2} Tn</p>
                </div>
                <div className="bg-dark/50 p-4 text-center border border-brand/10 rounded-lg">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Amortización</p>
                  <p className="text-yellow-300 font-heading font-bold text-2xl">{amortizacion} años</p>
                </div>
              </div>

              <p className="text-white/25 text-xs text-center mb-5">
                * Estimación orientativa. El ahorro real depende de cubierta, orientación y consumo.
              </p>

              <a href="#presupuesto-solar" className="btn-brand w-full justify-center">
                Quiero un presupuesto exacto
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FinLight — Financiación ── */}
      <section className="section-padding bg-surface">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Texto */}
              <div>
                <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-6">
                  <TrendingUp size={14} className="text-brand" />
                  <span className="text-brand text-xs font-semibold uppercase tracking-widest">Financiación disponible</span>
                </div>
                <h2 className="font-heading text-3xl font-bold text-white leading-tight mb-5">
                  Sin dinero por adelantado{' '}
                  <span className="text-gradient-gold">con FinLight</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-5">
                  Trabajamos con <strong className="text-white">FinLight</strong>, empresa especializada en financiación
                  de instalaciones fotovoltaicas. El proceso es transparente: nosotros te presentamos la propuesta
                  técnica, y FinLight evalúa tu caso sin compromiso.
                </p>
                <p className="text-white/60 leading-relaxed mb-7">
                  La mayoría de nuestros clientes empiezan a ahorrar desde el primer mes de cuota —
                  porque el ahorro en factura suele superar el coste de la financiación.
                  Las placas se pagan prácticamente solas.
                </p>

                <ul className="space-y-3 mb-7">
                  {[
                    'Sin entrada mínima en la mayoría de casos',
                    'Evaluación rápida (respuesta en 24-48h)',
                    'Cuotas mensuales inferiores al ahorro generado',
                    'Compatible con instalaciones residenciales e industriales',
                    'Gestionamos el proceso completo contigo',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                      <CheckCircle size={15} className="text-brand flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#presupuesto-solar"
                  className="btn-brand"
                >
                  Consultar financiación
                  <ArrowRight size={17} />
                </a>
              </div>

              {/* Cards FinLight */}
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Solicitamos tu estudio',
                    desc: 'Hacemos el análisis técnico de tu instalación y calculamos el ahorro real esperado.',
                  },
                  {
                    step: '02',
                    title: 'FinLight evalúa tu caso',
                    desc: 'Con los datos técnicos, FinLight analiza tu perfil financiero y te ofrece las condiciones en 24-48h.',
                  },
                  {
                    step: '03',
                    title: 'Instalamos sin esperas',
                    desc: 'Con la financiación aprobada, instalamos. Tú empiezas a ahorrar mientras pagas la cuota.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 bg-white/4 border border-white/8 rounded-xl p-5">
                    <div className="w-10 h-10 bg-brand/15 border border-brand/25 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-heading font-extrabold text-brand text-sm">{s.step}</span>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white mb-1">{s.title}</p>
                      <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-brand/8 border border-brand/20 rounded-xl p-5 mt-2">
                  <p className="text-white/70 text-sm leading-relaxed">
                    <strong className="text-brand">Ejemplo real:</strong> Instalación de 20 paneles (10kW)
                    con ahorro estimado de 280€/mes. Cuota de financiación: ~180€/mes.
                    <strong className="text-white"> Beneficio neto desde el día 1: +100€/mes.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Asesoramiento Incluido — Filtro de Clientes ── */}
      <section className="py-20 bg-dark">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-4 py-2 mb-5">
                <Shield size={14} className="text-brand" />
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">Honestidad ante todo</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                No instalamos paneles a todo el mundo.{' '}
                <span className="text-gradient-gold">Y es lo correcto.</span>
              </h2>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
                Antes de instalar, evaluamos si realmente merece la pena en tu caso concreto.
                Si los números no cuadran, te lo decimos. Preferimos perder una venta que hacerte
                una instalación que no te va a rentar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                {
                  icon: CheckCircle,
                  color: 'brand',
                  title: 'Cuándo SÍ te recomendamos',
                  items: [
                    'Cubierta con buena orientación (Sur/SE/SO)',
                    'Consumo eléctrico significativo (+300€/mes)',
                    'Baja factura en fin de semana (buen candidato solar)',
                    'Empresa con horario diurno intensivo',
                    'Edificio propio o con permiso de comunidad',
                  ],
                },
                {
                  icon: Shield,
                  color: 'yellow',
                  title: 'Cuándo necesitas más estudio',
                  items: [
                    'Cubierta orientada al Norte',
                    'Mucho sombreado en horas de sol',
                    'Consumo muy bajo (< 200€/mes)',
                    'Edificio de alquiler sin permiso del propietario',
                    'Instalación eléctrica muy antigua',
                  ],
                },
                {
                  icon: Building,
                  color: 'green',
                  title: 'Industrial — nuestro punto fuerte',
                  items: [
                    'Naves con actividad diurna: retorno en 4-5 años',
                    'Cubiertas grandes = mayor rentabilidad',
                    'Compensación por excedentes muy favorable',
                    'Compatible con tarifas industriales',
                    'Subvenciones específicas para industria',
                  ],
                },
              ].map((col) => {
                const Icon = col.icon;
                const colorMap = { brand: 'text-brand border-brand/25 bg-brand/10', yellow: 'text-yellow-400 border-yellow-400/25 bg-yellow-400/10', green: 'text-green-400 border-green-400/25 bg-green-400/10' };
                return (
                  <div key={col.title} className="bg-white/4 border border-white/8 rounded-xl p-6">
                    <div className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded-full mb-4 ${colorMap[col.color]}`}>
                      <Icon size={13} />
                      <span className="text-xs font-bold">{col.title}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-white/60 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="text-center bg-white/4 border border-white/8 rounded-2xl p-8">
              <Leaf size={28} className="text-green-400 mx-auto mb-4" />
              <p className="font-heading text-xl font-bold text-white mb-3">
                El asesoramiento es parte del servicio
              </p>
              <p className="text-white/55 text-sm max-w-lg mx-auto mb-6">
                Hacemos el estudio previo gratis. Si vemos que no te va a rentabilizar, te lo decimos
                claramente. Sin presiones, sin ventas forzadas. Si te interesa seguir adelante, perfecto.
                Si no, al menos sabrás la verdad.
              </p>
              <a href="#presupuesto-solar" className="btn-brand">
                Pide tu estudio (sin compromiso)
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-surface">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <span className="section-label">Preguntas frecuentes</span>
              <h2 className="section-title mt-3">Dudas sobre fotovoltaica</h2>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className={`border-b border-surface-300 ${openFaq === i ? 'border-l-[3px] border-l-brand pl-4' : 'pl-[15px]'} transition-all`}>
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="font-heading font-bold text-ink pr-4">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-ink-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-brand' : ''}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                    <p className="text-ink-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Formulario Embudo ── */}
      <section id="presupuesto-solar" className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Columna izquierda — contexto */}
              <div>
                <div className="inline-flex items-center gap-2 border border-brand/20 bg-brand/10 px-4 py-2 mb-6">
                  <Sun size={15} className="text-brand" />
                  <span className="text-brand text-xs font-semibold uppercase tracking-wider">Estudio gratuito</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Solicita tu estudio{' '}
                  <span className="text-gradient-gold">sin compromiso</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  En menos de 24h te enviamos una propuesta con números reales: paneles necesarios,
                  ahorro estimado y tiempo de amortización para tu caso concreto.
                </p>

                <ul className="space-y-3">
                  {[
                    'Estudio de cubierta y orientación',
                    'Dimensionado personalizado',
                    'Cálculo de amortización exacto',
                    'Gestión de subvenciones incluida',
                    'Sin coste ni compromiso',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <CheckCircle size={16} className="text-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3">
                  <a href="https://wa.me/34605333108?text=Hola%2C%20quiero%20un%20estudio%20fotovoltaico" target="_blank" rel="noopener" className="btn-whatsapp text-sm">
                    <MessageCircle size={16} />
                    WhatsApp directo
                  </a>
                  <a href="tel:+34605333108" className="btn-outline !border-white/25 !text-white text-sm">
                    <Phone size={16} />
                    605 33 31 08
                  </a>
                </div>
              </div>

              {/* Columna derecha — embudo */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <PresupuestoSolarForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
