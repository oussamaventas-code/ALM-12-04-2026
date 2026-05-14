import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Play, Film } from 'lucide-react';
import gsap from 'gsap';

// ── Datos: 3 vídeos. Editar título y categoría según convenga. ──────────────
// Si no existe el poster, el componente muestra un placeholder con icono.
const VIDEOS = [
  {
    src: '/videos/proyectos/proyecto-01.mp4',
    poster: '/videos/proyectos/proyecto-01-poster.webp',
    title: 'Cuadro eléctrico',
    category: 'Cuadros',
  },
  {
    src: '/videos/proyectos/proyecto-02.mp4',
    poster: '/videos/proyectos/proyecto-02-poster.webp',
    title: 'Instalación industrial',
    category: 'Industrial',
  },
  {
    src: '/videos/proyectos/proyecto-03.mp4',
    poster: '/videos/proyectos/proyecto-03-poster.webp',
    title: 'Fotovoltaica en cubierta',
    category: 'Fotovoltaica',
  },
];

// ── Tarjeta de vídeo con facade pattern ──────────────────────────────────────
// El <video> NO se renderiza hasta que el usuario le da play.
// Antes de eso, solo hay una imagen poster + botón. 0 KB de vídeo descargados.
function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = useCallback(() => {
    setPlaying(true);
    // Tras render del <video>, intentar reproducir
    requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Si el navegador bloquea autoplay, mostrar controles igual
        });
      }
    });
  }, []);

  return (
    <div className="video-card relative aspect-[9/16] sm:aspect-video lg:aspect-[3/4] overflow-hidden bg-surface-300 group">
      {!playing ? (
        <button
          type="button"
          onClick={handlePlay}
          data-cursor="pointer"
          className="absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={`Reproducir vídeo: ${video.title}`}
        >
          {/* Poster — imagen previa antes del play */}
          {!posterFailed ? (
            <img
              src={video.poster}
              alt={video.title}
              loading="lazy"
              decoding="async"
              onError={() => setPosterFailed(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            // Fallback estilizado si no hay poster aún
            <div className="absolute inset-0 bg-gradient-to-br from-surface-300 via-surface-200 to-dark flex items-center justify-center">
              <Film size={48} className="text-white/15" />
              <div
                className="absolute top-4 left-4 font-heading font-black text-6xl text-brand/10 leading-none select-none"
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          )}

          {/* Overlay degradado */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)',
            }}
          />

          {/* Botón play central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(245,197,24,0.5)]"
              style={{ background: 'var(--color-brand)' }}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: 'var(--color-brand)' }}
              />
              <Play
                size={26}
                className="text-dark ml-1"
                fill="currentColor"
                strokeWidth={0}
              />
            </div>
          </div>

          {/* Categoría arriba der. */}
          <div className="absolute top-4 right-4">
            <span
              className="text-[10px] font-body font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(245,197,24,0.18)', color: 'var(--color-brand)' }}
            >
              {video.category}
            </span>
          </div>

          {/* Título inferior */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-brand/90 mb-1.5">
              Vídeo {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-tight">
              {video.title}
            </h3>
          </div>
        </button>
      ) : (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover bg-dark"
          onEnded={() => setPlaying(false)}
        >
          <track kind="captions" />
          Tu navegador no soporta el formato de vídeo.
        </video>
      )}
    </div>
  );
}

// ── Sección completa ─────────────────────────────────────────────────────────
export default function VideoShowcase() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vshowcase-head > *',
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.video-card',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vshowcase-grid',
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-dark overflow-hidden"
      aria-labelledby="video-showcase-heading"
    >
      <div className="container-custom px-6">
        {/* Header */}
        <div className="vshowcase-head text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/8 px-3.5 py-1.5 rounded-full mb-5">
            <Film size={12} className="text-brand" />
            <span className="text-brand text-[11px] font-body font-bold uppercase tracking-[0.15em]">
              Trabajos en vídeo
            </span>
          </div>
          <h2 id="video-showcase-heading" className="section-title">
            Mira el oficio{' '}
            <span className="text-gradient-gold">en marcha.</span>
          </h2>
          <p className="section-subtitle mt-4">
            Tres vídeos cortos de instalaciones reales. Dale al play y verás
            cómo trabajamos: limpio, ordenado y sin atajos.
          </p>
        </div>

        {/* Grid 1/3 columnas */}
        <div className="vshowcase-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} video={v} index={i} />
          ))}
        </div>

        {/* Nota inferior */}
        <p className="text-center mt-8 font-body text-xs text-white/35 uppercase tracking-[0.15em]">
          Los vídeos se cargan solo al pulsar play
        </p>
      </div>
    </section>
  );
}
