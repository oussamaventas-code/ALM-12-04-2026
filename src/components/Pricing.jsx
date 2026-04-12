import { Check, X, Star } from 'lucide-react';

const plans = [
  {
    id: 'base',
    name: 'Infraestructura Base',
    price: 445,
    recommended: false,
  },
  {
    id: 'local',
    name: 'Motor de Captación Local',
    price: 745,
    recommended: false,
  },
  {
    id: 'b2b',
    name: 'Sistema Escalable B2B',
    price: 889,
    recommended: true,
  },
];

const sections = [
  {
    title: 'Fundamentos SEO',
    rows: [
      {
        label: 'Corrección Title Tags y H1 (SEO crítico)',
        values: [true, true, true],
      },
      {
        label: 'Meta descripciones optimizadas',
        values: [true, true, true],
      },
      {
        label: 'Marcado Schema LocalBusiness',
        values: [false, true, true],
      },
      {
        label: 'SEO local avanzado por zonas',
        values: [false, false, true],
      },
    ],
  },
  {
    title: 'Estructura Web',
    rows: [
      {
        label: 'Migración a web multipágina',
        values: [true, true, true],
      },
      {
        label: 'Página de contacto con formulario',
        values: [true, true, true],
      },
      {
        label: 'Sección CTA WhatsApp / llamada visible',
        values: [true, true, true],
      },
      {
        label: 'Franja urgencias 24h',
        values: [true, true, true],
      },
      {
        label: 'Páginas de servicio individuales',
        values: ['1 página', '3 páginas', '5 páginas'],
      },
      {
        label: 'Páginas por zona geográfica (Madrid/Toledo)',
        values: [false, '5 zonas', '10 zonas'],
      },
    ],
  },
  {
    title: 'Imagen de Empresa',
    rows: [
      {
        label: 'Copywriting orientado a empresa (no autónomo)',
        values: [true, true, true],
      },
      {
        label: 'Sección equipo, vehículos y herramientas',
        values: [false, true, true],
      },
      {
        label: 'Galería de trabajos reales (fotos)',
        values: ['Hasta 8', 'Hasta 15', 'Hasta 25'],
      },
      {
        label: 'Sección "¿Por qué elegirnos?"',
        values: [false, true, true],
      },
      {
        label: 'FAQ interactivo',
        values: [false, false, true],
      },
    ],
  },
  {
    title: 'Captación Avanzada',
    rows: [
      {
        label: 'Formulario solicitud de presupuesto unificado',
        values: [false, true, true],
      },
      {
        label: 'Página fotovoltaica / industrial en profundidad',
        values: [false, false, true],
      },
      {
        label: 'Calculadora de ahorro energético',
        values: [false, false, true],
      },
      {
        label: 'Migración a Hostinger incluida',
        values: [false, false, true],
      },
      {
        label: 'Garantía incluida',
        values: ['30 días', '30 días', '30 días'],
      },
    ],
  },
];

function CellValue({ value, isB2B }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check
          size={18}
          className={isB2B ? 'text-accent' : 'text-primary'}
          strokeWidth={2.5}
        />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X size={16} className="text-neutral-400/50" strokeWidth={2} />
      </div>
    );
  }
  return (
    <span className={`text-sm font-medium ${isB2B ? 'text-accent' : 'text-neutral-600'}`}>
      {value}
    </span>
  );
}

export default function Pricing() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Planes de inversión
          </span>
          <h2 className="section-title text-dark mt-3 mb-4">
            Tres niveles. Un solo pago.
          </h2>
          <p className="section-subtitle mx-auto text-neutral-600">
            Sin cuotas mensuales ni permanencias. Empieza en cualquier nivel y escala pagando solo la diferencia.
          </p>
        </div>

        {/* Table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '700px' }}>

            {/* Plan headers */}
            <thead>
              <tr>
                <th className="w-[42%] pb-6" />
                {plans.map((plan) => (
                  <th key={plan.id} className="w-[19%] pb-6 px-3 text-center">
                    <div
                      className={`rounded-2xl p-5 transition-all ${
                        plan.recommended
                          ? 'bg-dark text-white shadow-2xl scale-105 relative'
                          : 'bg-neutral border border-neutral-200'
                      }`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                          <Star size={11} fill="currentColor" />
                          Plan elegido
                        </div>
                      )}
                      <p
                        className={`text-sm font-semibold mb-3 leading-tight ${
                          plan.recommended ? 'text-white/70' : 'text-neutral-600'
                        }`}
                      >
                        {plan.name}
                      </p>
                      <p
                        className={`text-3xl font-bold font-clash ${
                          plan.recommended ? 'text-accent' : 'text-dark'
                        }`}
                      >
                        {plan.price}€
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          plan.recommended ? 'text-white/40' : 'text-neutral-400'
                        }`}
                      >
                        pago único
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sections.map((section, si) => (
                <>
                  {/* Section header row */}
                  <tr key={`section-${si}`}>
                    <td
                      colSpan={4}
                      className="pt-8 pb-2 px-4"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        — {section.title} —
                      </span>
                    </td>
                  </tr>

                  {/* Feature rows */}
                  {section.rows.map((row, ri) => (
                    <tr
                      key={`${si}-${ri}`}
                      className="border-b border-neutral-200/60 hover:bg-neutral/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-neutral-600 leading-snug">
                        {row.label}
                      </td>
                      {row.values.map((val, vi) => (
                        <td
                          key={vi}
                          className={`py-3 px-3 text-center ${
                            vi === 2 ? 'bg-dark/[0.03] relative' : ''
                          }`}
                        >
                          <CellValue value={val} isB2B={vi === 2} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-neutral-400 mt-10">
          Puedes comenzar con <span className="text-dark font-medium">Infraestructura Base</span> y escalar al siguiente nivel pagando únicamente la diferencia.
        </p>

      </div>
    </section>
  );
}
