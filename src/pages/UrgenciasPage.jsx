import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';

import UrgenciasSection from '../components/UrgenciasSection';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';

export default function UrgenciasPage() {
  useEffect(() => {
    // Esperar al siguiente frame para que GSAP calcule posiciones correctas
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
      
      {/* Sección adicional para asegurar que tienen un punto de contacto fácil si no hicieron click en el botón de la sección. */}
      <ContactForm />
      
      {/* Las FAQs generales o de urgencias podrían ir aquí para resolver dudas finales */}
      <FAQ />
    </div>
  );
}
