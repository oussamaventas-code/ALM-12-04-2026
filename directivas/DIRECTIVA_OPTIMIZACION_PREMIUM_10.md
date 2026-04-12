# DIRECTIVA: OPTIMIZACION_PREMIUM_UX_10

> **ID:** OPT-GSAP-LENIS-001
> **Punto de Entrada:** `src/App.jsx`, `src/index.css`
> **Última Actualización:** 2026-04-09
> **Estado:** ACTIVO

---

## 1. Objetivos y Alcance
Esta directiva es para un agente avanzado (Claude Code) especializado en frontend pesado y GSAP. 
- **Objetivo Principal:** Elevar la experiencia visual actual (calificada en 9.5) a un "10/10" estilo Awwwards mediante la integración de físicas reales de scroll, transiciones de rutas magnéticas y la reimplementación del sistema de "cursor" de forma global, garantizando al mismo tiempo un rendimiento inmaculado.
- **Criterio de Éxito:** 
  1. `<CustomCursor />` reactivo implementado (con fricción/spring) para elementos interactivos en toda la web.
  2. Smooth Scrolling activo a nivel base usando Lenis interconectado a `ScrollTrigger` de GSAP.
  3. `<PageTransition />` implementado para que el cambio de rutas no sea de "corte seco".
  4. Ningún error de consola por dependencias o eventos atascados (memory leaks) de GSAP.

## 2. Especificaciones de Entrada/Salida (I/O)

### Entradas (Inputs)
- **Archivos Fuente:**
  - `src/App.jsx`: Añadir el Wrapper de Lenis y el Wrapper de PageTransitions.
  - `src/index.css`: Donde ya se oculta el cursor (`cursor: none`). Retocar para asegurar que los nuevos elementos funcionen.
  - `src/components/Navbar.jsx` / `src/components/Hero.jsx`: Integrar interacciones de hover especiales (Magnéticas) para los CTA.

### Salidas (Outputs)
- **Artefactos Generados:**
  - `src/components/CustomCursor.jsx`: Controlador lúdico/magnético del ratón.
  - `src/components/MagneticElement.jsx`: Wrapper reutilizable.
  - `src/components/PageTransition.jsx`: Animación GSAP de entrada/salida entre las diferentes rutas del Layout.
- **Comandos Previos Necesarios:** `npm i @studio-freight/lenis` (o el equivalente moderno de `lenis` actualmente disponible)

## 3. Flujo Lógico (Algoritmo)

1. **Inicialización e Instalación:** 
   - Ejecutar la instalación de `lenis`.
   - Validar de ser necesario `framer-motion` o usar directamente `gsap` (preferido GSAP debido a que ya existe en el stack).
2. **Contexto de Scroll (Lenis):** 
   - Envolver el router o la estructura raíz en `App.jsx` con una capa que inicialice el motor Lenis.
   - Sincronizar el loop de Lenis con el `gsap.ticker` para que ScrollTrigger recalcule sin saltos. Funcionalidad base de `Lenis`:
     ```js
     const lenis = new Lenis()
     lenis.on('scroll', ScrollTrigger.update)
     gsap.ticker.add((time) => { lenis.raf(time * 1000) })
     ```
3. **Desarrollo del Cursor Personalizado:**
   - Crear el componente `CustomCursor` con dos divs (un punto interior y un anillo exterior con inercia, o similar estilo de alta agencia).
   - Agregar "event listeners" globales (`mousemove`, `mousedown`) atados a un `requestAnimationFrame` para alto impacto y 60/120 fps.
   - Crear lógica para mutar el estado del cursor si el ratón pasa sobre un elemento `[data-cursor="pointer"]` o enlaces (`a`, `button`).
4. **Enriquecimiento Interactivo:**
   - Crear un componente envoltorio que aplique GSAP "Magnet" logic: tomar las coordenadas X/Y del ratón dentro del botón y aplicar leves traslaciones (`gsap.to({x, y})`). Aplicarlo en el "Call To Action" del Hero y el Navbar.
5. **Transiciones de Página:**
   - Implementar un interceptor (o `AnimatePresence` equivalente) sobre el `React Router` para generar pantallas de carga fluidas al desmontar `Routes`.

## 4. Herramientas y Librerías
- **Librerías Permitidas:** `gsap` (ya instalada), `lenis` (por instalar) y `lucide-react`. 
- **Restricción Específica:** No utilizar Framer Motion si es posible lograrlo de forma limpia con `gsap` (para mantener el bundle de librerías más liviano y consistencia de motor de animaciones).

## 5. Restricciones y Casos Borde (Edge Cases)

### Limitaciones Conocidas
- **Dispositivos Móviles / Táctiles:** Lenis y `CustomCursor` deben desactivarse completamente o tener soporte amigable (`pointer-events: none`, detección via `window.matchMedia('(pointer: coarse)')`). No penalizar rendimiento móvil por calculos de un ratón que no existe.
- **Rendimiento ScrollTrigger:** Cuidado con inicializar ScrollTrigger ANTES que el DOM completo de cada página cargue. `useGSAP` o Hooks con `gsap.context` son obligatorios para limpiar la recolección de basura correctamente.

### Errores Comunes y Soluciones
- **Error**: *El cursor se queda trabado o produce lags.* 
  - **Causa**: Uso de dependencias de React state para calcular la posición X/Y del ratón.
  - **Solución**: Usar `useRef` combinado con GSAP `quickSetter` o `quickTo`, saltando el virtual DOM de React para actualizar física pura a +60 FPS.
- **Error**: *La página "brinca" cuando se navega a otra URL y queda abajo.*
  - **Causa**: Lenis retiene el valor del Scroll previo.
  - **Solución**: Asegurarse de ejecutar `lenis.scrollTo(0)` al desmontar la ruta o forzar `window.scrollTo(0,0)` coordinado con la nueva página.

## 6. Historial de Aprendizaje
*Reservado para que Claude Code documente errores técnicos encontrados durante la implementación y cómo fueron sorteados en el ecosistema actual del stack (Vite + React 19).*

## 7. Ejemplos de Uso
*(Comando de inicio sugerido para Claude)*

```bash
# Para ejecutar esta directiva:
> "Claude, lee el archivo directivas/DIRECTIVA_OPTIMIZACION_PREMIUM_10.md, inicializa la instalación de lenis e implementa el CustomCursor iterativamente, asegurando los commits en pasos cautelosos"
```

## 8. Checklist de Pre-Ejecución
- [ ] Chequeo visual en el branch del proyecto: no hay compilaciones rotas.
- [ ] Entendimiento claro del estilo y color de ALMelectricidad (Dark theme = Navy + Marca Azul + Glow + Letras claras).

## 9. Checklist Post-Ejecución
- [ ] Lenis funciona suave sin parpadeos.
- [ ] En pantallas pequeñas el Cursor no obstaculiza clics.
- [ ] Se verifica en log que todos los contexts de GSAP hagan "revert()" en unmount.
