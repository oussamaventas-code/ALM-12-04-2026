import { useEffect, lazy, Suspense } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SeoHead from '../components/SeoHead';

// Above the fold — carga inmediata
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import Services from '../components/Services';

// Below the fold — carga diferida
const WhyUs             = lazy(() => import('../components/WhyUs'));
const PricingPhilosophy = lazy(() => import('../components/PricingPhilosophy'));
const Process           = lazy(() => import('../components/Process'));
const JorgeSection      = lazy(() => import('../components/JorgeSection'));
const Portfolio         = lazy(() => import('../components/Portfolio'));
const Testimonials      = lazy(() => import('../components/Testimonials'));
const FAQ               = lazy(() => import('../components/FAQ'));
const MapLocation       = lazy(() => import('../components/MapLocation'));
const ContactForm       = lazy(() => import('../components/ContactForm'));
const StickyMobileCTA   = lazy(() => import('../components/StickyMobileCTA'));

// gsap.registerPlugin ya registrado globalmente en App.jsx

export default function HomePage() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // El schema LocalBusiness/Electrician vive en index.html para que esté
  // disponible incluso antes de hidratar React. Aquí solo añadimos el FAQPage.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta una instalación eléctrica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del tipo y tamaño del proyecto. Lo que sí hacemos siempre es darte un presupuesto cerrado antes de empezar, sin sorpresas ni costes ocultos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajáis en toda la Comunidad de Madrid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, cubrimos Madrid, Toledo y alrededores. Si tu proyecto está en la zona, nos desplazamos sin problema."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tenéis servicio de urgencias?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, 24 horas los 365 días del año. Nos llamas, respondemos y vamos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Pasáis las inspecciones de industria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos para que pase a la primera. Seguimos el REBT al detalle y nos tomamos el tiempo necesario para hacerlo bien. Si por alguna razón hubiera una revisión, la resolvemos sin coste para ti."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué garantía tienen vuestros trabajos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mínimo 30 días en cualquier trabajo. Según el tipo de instalación, la garantía puede llegar hasta 2 años. Todo queda por escrito."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto se tarda en recibir el presupuesto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Normalmente en menos de 24 horas. Dependiendo de la complejidad, a veces el mismo día."
        }
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Electricistas en Madrid y Toledo — ALM Electricidad | Presupuesto sin compromiso"
        description="Electricistas en Madrid y Toledo desde 2018. Instalaciones eléctricas, fotovoltaica y urgencias 24h. Precio cerrado antes de empezar, sin sorpresas."
        canonical="/"
        schema={[faqSchema]}
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

        {/* 5. Nosotros vs otros — tabla comparativa */}
        <PricingPhilosophy />

        {/* 6. Cómo trabajamos — elimina el miedo al proceso */}
        <Process />

        {/* 7. El equipo — humaniza la marca, genera confianza */}
        <JorgeSection />

        {/* 8. Trabajo real — galería de proyectos */}
        <Portfolio />

        {/* 9. Prueba social — testimonios con ubicación */}
        <Testimonials />

        {/* 10. FAQ — últimas dudas antes de contactar */}
        <FAQ />

        {/* 11. Mapa — confianza por proximidad geográfica */}
        <MapLocation />

        {/* 12. Formulario principal de conversión */}
        <ContactForm />

        {/* CTA flotante móvil */}
        <StickyMobileCTA />
      </Suspense>
    </>
  );
}
