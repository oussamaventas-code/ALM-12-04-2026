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
git clone https://github.com/tu-usuario/almelectricidad.git
cd almelectricidad

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

1. **Crea un repositorio en GitHub**
   ```bash
   # En GitHub: New Repository > almelectricidad
   ```

2. **Sube el código a GitHub**
   ```bash
   git remote add origin https://github.com/tu-usuario/almelectricidad.git
   git branch -M main
   git push -u origin main
   ```

3. **Conecta a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Selecciona el repositorio `almelectricidad`
   - Vercel detectará automáticamente que es Vite
   - Click en "Deploy"

### Opción 2: Deploy Directo desde Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

---

## ✅ Checklist Pre-Deploy

- [ ] ✅ Código limpio y sin errores
- [ ] ✅ Build genera sin warnings: `npm run build`
- [ ] ✅ Todas las imágenes y assets están en `public/`
- [ ] ✅ Variables de entorno configuradas si es necesario
- [ ] ✅ .gitignore incluye `node_modules`, `dist`, `.env.local`
- [ ] ✅ Commit inicial hecho: `git log`

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

Proyecto privado de ALMelectricidad © 2024

---

## 🎯 Próximas Mejoras

- [ ] Integración con formulario de contacto (backend)
- [ ] Blog/Artículos
- [ ] Sistema de testimonios dinámico
- [ ] Integración con Google Analytics
- [ ] Certificado SSL automático
