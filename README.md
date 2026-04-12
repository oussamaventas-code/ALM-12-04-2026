# ALMelectricidad - Sitio Web Profesional

Sitio web moderno y responsivo para ALMelectricidad, empresa de instalaciones eléctricas autorizadas.

**🌐 Tech Stack:**
- React 19
- Vite
- Tailwind CSS 4
- GSAP 3 (animaciones y smooth scroll)
- React Router DOM 7
- Lucide Icons

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/oussamaventas-code/ALM-12-04-2026.git
cd ALM-12-04-2026

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor inicia en `http://localhost:5173`

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint
```

---

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes React reutilizables
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/          # Páginas/vistas
│   ├── HomePage.jsx
│   ├── ServicePage.jsx
│   ├── ZonePage.jsx
│   ├── TeamPage.jsx
│   ├── FlotaPage.jsx
│   └── ...
├── data/           # Datos estáticos (servicios, zonas)
├── App.jsx         # Componente raíz
├── main.jsx        # Entrada de la aplicación
└── index.css       # Estilos globales
```

---

## 🎨 Características

✅ **Responsive Design** - Optimizado para desktop, tablet y móvil
✅ **Animaciones Suave** - GSAP para animaciones fluidas
✅ **SEO Optimizado** - Etiquetas meta, Open Graph
✅ **Dark Theme** - Tema oscuro profesional
✅ **Accesible** - Cumple estándares WCAG
✅ **Rápido** - Carga lazy de componentes, optimización de imágenes

---

## 🌐 Desplegar en Vercel

### Opción 1: Con GitHub (Recomendado)

El repositorio ya está conectado. Solo ve a [vercel.com](https://vercel.com) y:

1. Click en "New Project"
2. Selecciona el repositorio `ALM-12-04-2026`
3. Vercel detecta automáticamente que es Vite
4. Click en "Deploy"

Tu sitio estará en vivo en: `https://almelectricidad.vercel.app`

### Opción 2: Deploy Directo desde Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## ✅ Checklist Pre-Deploy

- [x] ✅ Código limpio y sin errores
- [x] ✅ Build genera sin warnings: `npm run build`
- [x] ✅ Todas las imágenes y assets están en `public/`
- [x] ✅ .gitignore incluye `node_modules`, `dist`, `.env.local`
- [x] ✅ Repositorio en GitHub: `oussamaventas-code/ALM-12-04-2026`

---

## 🔧 Configuración Vercel

El archivo `vercel.json` ya está configurado:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## 📧 Contacto & Soporte

**Teléfono:** 605 33 31 08  
**Email:** info@almelectricidad.es  
**WhatsApp:** +34 605 33 31 08

---

## 📄 Licencia

Proyecto privado de ALMelectricidad © 2026

---

## 🎯 Cambios Recientes (12 Abril 2026)

- ✅ Navbar restaurado con estructura correcta
  - Sobre mí, Servicios, Zonas, Nosotros, Contacto
  - Nosotros con dropdown: Equipo, Flota, Patrocinios
  - Zonas con dropdown: Todas las zonas de Madrid
- ✅ Eliminada barra roja de urgencias (solo en mobile)
- ✅ Configuración de Vercel agregada
- ✅ Documentación actualizada
