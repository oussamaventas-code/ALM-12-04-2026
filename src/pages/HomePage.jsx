import { useEffect, lazy, Suspense } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';

// Above the fold — carga inmediata
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import Services from '../components/Services';

// Below the fold — carga diferida
const WhyUs        = lazy(() => import('../components/WhyUs'));
const Portfolio    = lazy(() => import('../components/Portfolio'));
const Process      = lazy(() => import('../components/Process'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Mistakes     = lazy(() => import('../components/Mistakes'));
const FAQ          = lazy(() => import('../components/FAQ'));
const MapLocation  = lazy(() => import('../components/MapLocation'));
const ContactForm  = lazy(() => import('../components/ContactForm'));
const FinalCTA     = lazy(() => import('../components/FinalCTA'));
const StickyMobileCTA = lazy(() => import('../components/StickyMobileCTA'));

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

      {/* Below the fold — carga diferida */}
      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
}
