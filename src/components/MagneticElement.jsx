import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * MagneticElement — efecto magnético de alta agencia en hover.
 *
 * Capas de movimiento (lo que diferencia Awwwards del resto):
 *  1. Wrapper outer  → translación magnética X/Y (sigue al cursor)
 *  2. Inner span     → translación contraria suave (parallax interno)
 *  3. Tilt 3D        → rotationX/Y leve basado en posición dentro del botón
 *
 * Solo activo en pointer:fine (desktop). En táctil: render directo, cero overhead.
 *
 * Props:
 *  strength  {number}  — potencia del efecto magnético externo (default 0.5)
 *  tilt      {number}  — grados máximos de tilt 3D (default 8)
 *  release   {number}  — duración del retorno elástico en segundos (default 0.7)
 *  className {string}  — clase extra para el wrapper outer
 */
export default function MagneticElement({
  children,
  strength  = 0.5,
  tilt      = 8,
  release   = 0.7,
  className = '',
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // quickTo para outer (magnet) e inner (parallax contra-movimiento)
    const oxTo = gsap.quickTo(outer, 'x',          { duration: 0.5,  ease: 'power3.out' });
    const oyTo = gsap.quickTo(outer, 'y',          { duration: 0.5,  ease: 'power3.out' });
    const ixTo = gsap.quickTo(inner, 'x',          { duration: 0.65, ease: 'power3.out' });
    const iyTo = gsap.quickTo(inner, 'y',          { duration: 0.65, ease: 'power3.out' });
    const rxTo = gsap.quickTo(outer, 'rotationY',  { duration: 0.5,  ease: 'power3.out' });
    const ryTo = gsap.quickTo(outer, 'rotationX',  { duration: 0.5,  ease: 'power3.out' });

    // Perspectiva para que el tilt se vea
    gsap.set(outer, { transformPerspective: 600, transformStyle: 'preserve-3d' });

    const onMove = (e) => {
      const rect = outer.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;

      // Offset relativo al centro del botón
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Outer: magnet
      oxTo(dx * strength);
      oyTo(dy * strength);

      // Inner: parallax leve en dirección contraria (da sensación de profundidad)
      ixTo(dx * -0.12);
      iyTo(dy * -0.12);

      // Tilt 3D: mapear posición a rotación (invertida para efecto natural)
      const normX = dx / (rect.width  / 2); // -1 → +1
      const normY = dy / (rect.height / 2);
      rxTo(-normY * tilt); // rotationX: cursor arriba → inclinación hacia el user
      ryTo( normX * tilt); // rotationY: cursor derecha → inclinación derecha
    };

    const onLeave = () => {
      gsap.to(outer, {
        x: 0, y: 0, rotationX: 0, rotationY: 0,
        duration: release,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(inner, {
        x: 0, y: 0,
        duration: release * 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    outer.addEventListener('mousemove',  onMove);
    outer.addEventListener('mouseleave', onLeave);

    return () => {
      outer.removeEventListener('mousemove',  onMove);
      outer.removeEventListener('mouseleave', onLeave);
      gsap.set([outer, inner], { x: 0, y: 0, rotationX: 0, rotationY: 0 });
    };
  }, [strength, tilt, release]);

  return (
    <span
      ref={outerRef}
      className={`inline-flex ${className}`}
      style={{ willChange: 'transform' }}
    >
      <span ref={innerRef} className="inline-flex" style={{ willChange: 'transform' }}>
        {children}
      </span>
    </span>
  );
}
