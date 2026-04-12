import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';

import PatrociniosSection from '../components/PatrociniosSection';
import FinalCTA from '../components/FinalCTA';

export default function PatrociniosPage() {
  useEffect(() => {
    // Esperar al siguiente frame para que GSAP calcule posiciones correctas
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-[72px]">
      <SeoHead
        title="Patrocinios y Compromisos — ALMelectricidad"
        description="ALMelectricidad, comprometidos con la comunidad de Madrid y Toledo. Conoce nuestros patrocinios y colaboraciones locales."
        canonical="/patrocinios"
      />
      <PatrociniosSection />
      
      {/* Sección adicional para asegurar que siempre haya un cierre directo comercial. */}
      <FinalCTA />
    </div>
  );
}
