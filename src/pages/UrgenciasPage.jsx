import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';
import StickyMobileCTA from '../components/StickyMobileCTA';
import { PhoneCall, ChevronDown } from 'lucide-react';

import UrgenciasSection from '../components/UrgenciasSection';
import ContactForm from '../components/ContactForm';

const urgenciasFAQ = [
  {
    q: '¿Cuánto tiempo tardan en llegar a una urgencia?',
    a: 'Nuestro objetivo es estar en su domicilio en menos de 60 minutos en Madrid capital y menos de 90 minutos en el área metropolitana y Toledo. El tiempo puede variar según el tráfico y la disponibilidad, pero siempre le confirmamos la hora de llegada al llamar.',
  },
  {
    q: '¿Cuánto cuesta el servicio de urgencias?',
    a: 'El coste de urgencia incluye el desplazamiento y el diagnóstico. Una vez evaluada la avería, le damos un presupuesto cerrado antes de empezar cualquier trabajo. Sin sorpresas en la factura final.',
  },
  {
    q: '¿Trabajan los fines de semana y festivos?',
    a: 'Sí, 365 días al año, 24 horas. Fines de semana, festivos nacionales y locales. El servicio de urgencias nunca se detiene.',
  },
  {
    q: '¿Qué tipo de averías pueden resolver en una urgencia?',
    a: 'Cortocircuitos, apagones totales o parciales, cuadros eléctricos disparados, quemado de cables, averías en enchufes o interruptores, problemas con la acometida y cualquier situación que comprometa la seguridad eléctrica del inmueble.',
  },
  {
    q: '¿Tienen material en el vehículo para reparar en el momento?',
    a: 'Nuestras furgonetas van equipadas con el material más habitual para resolver la mayoría de averías en una sola visita: automáticos, diferenciales, cable, canaletas, enchufes, bornes y más.',
  },
  {
    q: '¿Emiten factura oficial?',
    a: 'Sí, siempre. Todos nuestros trabajos tienen factura oficial con IVA detallado. Puede solicitarla directamente al electricista o a través de contacto@almelectricidad.com.',
  },
];

function UrgenciasFAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-dark py-20 lg:py-28">
      <div className="container-custom px-6">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-4">Preguntas frecuentes</p>
          <h2 className="font-heading font-extrabold text-white mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Todo lo que necesitas saber sobre <span className="text-brand">urgencias eléctricas</span>
          </h2>
          <div className="space-y-3">
            {urgenciasFAQ.map((item, i) => (
              <div
                key={i}
                className="border border-white/8 hover:border-brand/20 transition-colors duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-heading font-semibold text-white text-sm leading-snug">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-brand shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/55 font-body text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function UrgenciasPage() {
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-[72px]">
      <SeoHead
        title="Electricista de Urgencias 24h en Madrid — ALMelectricidad"
        description="Servicio de urgencias eléctricas 24h, 365 días en Madrid y Toledo. Respuesta rápida a cortocircuitos, averías y apagones. Llámanos ahora."
        canonical="/urgencias"
      />
      <UrgenciasSection />
      <UrgenciasFAQ />
      <ContactForm />
      <StickyMobileCTA />
    </div>
  );
}
