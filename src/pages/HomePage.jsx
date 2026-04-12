import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';

import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Mistakes from '../components/Mistakes';
import FAQ from '../components/FAQ';
import MapLocation from '../components/MapLocation';
import ContactForm from '../components/ContactForm';
import FinalCTA from '../components/FinalCTA';
import StickyMobileCTA from '../components/StickyMobileCTA';

// gsap.registerPlugin ya registrado globalmente en App.jsx

export default function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "name": "ALM Electricidad",
    "telephone": "+34605333108",
    "areaServed": ["Madrid", "Toledo"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "18"
    }
  };

  return (
    <>
      <SeoHead
        title="ALMelectricidad — Instalaciones Eléctricas Profesionales en Madrid y Toledo"
        description="Electricistas profesionales para empresas y particulares en Madrid y Toledo. Instalaciones eléctricas, fotovoltaica y urgencias 24h. Presupuesto cerrado en menos de 24h."
        canonical="/"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. Primer impacto: vídeo + copy + formulario rápido */}
      <Hero />

      {/* 2. Autoridad numérica inmediata */}
      <Metrics />

      {/* 3. Qué hacemos — el usuario sabe si pueden ayudarle */}
      <Services />

      {/* 4. Por qué nosotros — diferenciación real */}
      <WhyUs />

      {/* 5. Trabajo real — galería de proyectos */}
      <Portfolio />

      {/* 6. Cómo trabajamos — elimina el miedo al proceso */}
      <Process />

      {/* 7. Prueba social — testimonios con ubicación */}
      <Testimonials />

      {/* 8. Derribo de objeciones — errores comunes */}
      <Mistakes />

      {/* 9. FAQ — últimas dudas antes de contactar */}
      <FAQ />

      {/* 10. Mapa — confianza por proximidad geográfica */}
      <MapLocation />

      {/* 11. Formulario principal de conversión */}
      <ContactForm />

      {/* 12. Última oportunidad de conversión directa */}
      <FinalCTA />
      
      {/* CTA de Urgencia Movil Fijo */}
      <StickyMobileCTA />
    </>
  );
}
