import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Página no encontrada — ALMelectricidad"
        description="La página que buscas no existe. Vuelve al inicio."
        canonical="/404"
        noindex
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-8">
        {/* Número 404 grande */}
        <div className="text-[120px] md:text-[180px] font-heading font-bold bg-gradient-to-r from-brand via-brand/60 to-transparent bg-clip-text text-transparent leading-none">
          404
        </div>

        {/* Heading */}
        <div className="space-y-4 max-w-md">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white">
            Página no encontrada
          </h1>
          <p className="text-gray-400 text-lg">
            Parece que el camino termina aquí. Vuelve al inicio o explora nuestros servicios.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            to="/"
            className="btn-brand inline-flex items-center justify-center gap-2"
          >
            Volver al inicio
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/servicios"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            Ver servicios
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Decorative line */}
        <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      </div>
    </>
  );
}
