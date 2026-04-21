import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap-vendor';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-helmet-async')) {
            return 'ui-vendor';
          }
        },
      },
    },
  },
})
