import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { Camera } from 'lucide-react';

const projectImages = [
  "033bf65c-71aa-4c20-bdbe-ecd8b081c3c9.JPG",
  "07cea9c8-e0be-4511-995a-0b5e6d68185d.JPG",
  "0c1c3c06-f1d5-4f04-91a8-1381e29dd650.JPG",
  "1602e3a4-4c93-43c2-8a96-e73be571c477.JPG",
  "2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.JPG",
  "2f3de869-3ac3-4cc7-b957-97450f9384c9.JPG",
  "3723be01-4806-4063-bd6f-3aa15fe2bedc.JPG",
  "3cc53ea7-819a-4836-bc3e-d0f54f2e3fd7.JPG",
  "3d607bf1-5437-4c5f-8752-53a0977fb5f4.JPG",
  "3e110a11-4235-4d36-bc83-c53c538dcf89.JPG",
  "4ab395fc-306b-49f2-b757-409c54f64ad8.JPG",
  "4f8339dd-0f51-4846-99a9-cc31fb575400.JPG",
  "524fa236-a813-4957-8daa-683d7fd7ea01.JPG",
  "5c5f4e5e-ee9a-437a-9b4e-25a342b29d55.JPG",
  "5d69509a-9c57-4b08-8223-b7dc2a980194.JPG",
  "6494be73-7934-486b-bf98-37bed5b4ce92.JPG",
  "685fcf32-c501-4b69-8649-380b9630371a.JPG",
  "69adf53e-ceae-45ed-88a0-8ced7a2bb8f7.JPG",
  "6a0e33c5-1ab3-434d-8ad4-f959bd982f51.JPG",
  "7448d2b8-3704-4555-8421-ccaf0be40817.JPG",
  "74ab40b2-918e-4793-8520-4c45ce44b65b.JPG",
  "7ef23bdc-5aa7-4fcd-abbb-ca1c9bc891b1.JPG",
  "8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.JPG",
  "8bdff42d-f1cd-4e6e-aeff-554965fb5c0f.JPG",
  "8f6878c8-9c79-46a1-9f36-be87c1f0f8b9.JPG",
  "91eade2c-21ef-482e-b34b-62229a342957.JPG",
  "926a9428-6861-4de2-91d9-b3932929560f.JPG",
  "9ad8caf2-e957-4e5d-b206-330dc821d3e9.JPG",
  "a22a7691-4c20-43c6-bfa0-0b1c1e02924e.JPG",
  "b871f2bb-e4d7-4a42-903e-65a807e39964.JPG",
  "bbf912ac-5634-4e6f-ad8d-b83fdf356274.JPG",
  "db9bc9a3-a772-4123-8556-729ae6d7676a.JPG",
  "de6f9578-082c-4104-b71a-aec42f9a3778.JPG",
  "e322f706-124e-401e-9b8c-34e0184d27e1.JPG",
  "e6948f9c-0f62-4771-bf42-8c308b96c351.JPG",
  "ed4be069-613d-4e87-96c2-7cf4795e8789.JPG",
  "f015c7ac-f508-4a30-bde0-3dfdb7713f23.JPG",
  "f1721ec8-97cb-4ea0-b323-04851be58c8a.JPG",
  "fc27efb4-9468-4a1c-930d-64ff773b4404.JPG"
];

export default function ProyectosPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.gallery-item',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gallery-grid',
              start: 'top 85%',
            },
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 bg-dark min-h-screen text-white" ref={containerRef}>
      <Helmet>
        <title>Nuestros Proyectos | ALM Electricidad</title>
        <meta
          name="description"
          content="Galería de trabajos realizados por ALM Electricidad. Descubre nuestros proyectos industriales, comerciales y residenciales sin filtros ni fotos de stock."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-surface-200" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full font-body text-xs font-bold uppercase tracking-wider mb-6">
              <Camera size={14} />
              Portfolio Real
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Sin renders ni fotos de stock. <br />
              <span className="text-gradient-brand">Solo nuestro trabajo.</span>
            </h1>
            <p className="text-white/60 font-body text-lg md:text-xl leading-relaxed">
              Explora una selección de nuestras instalaciones reales en naves industriales, locales comerciales, reformas integrales y proyectos fotovoltaicos.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6">
        <div className="container-custom">
          {/* Masonry CSS implementation using standard Tailwind columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 gallery-grid">
            {projectImages.map((img, i) => (
              <div 
                key={i} 
                className="gallery-item break-inside-avoid relative group rounded-sm overflow-hidden bg-surface cursor-pointer"
              >
                <img 
                  src={`/images/portfolio/${img}`} 
                  alt={`Proyecto eléctrico realizado por ALM - ${i+1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <Camera className="text-dark" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-surface-200">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            ¿Quieres que tu proyecto sea el siguiente?
          </h2>
          <a
            href="/#contacto"
            className="inline-flex items-center justify-center bg-brand text-dark font-body font-bold text-sm px-8 py-4 hover:bg-white transition-colors duration-300"
          >
            Solicitar Presupuesto sin compromiso
          </a>
        </div>
      </section>
    </div>
  );
}
