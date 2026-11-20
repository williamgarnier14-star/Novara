import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const pages = ['index.html', 'automatisations', 'a-propos', 'mentions-legales', 'confidentialite', 'cgv']

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((p) => [p === 'index.html' ? 'home' : p, resolve(__dirname, p === 'index.html' ? p : `${p}/index.html`)]),
      ),
    },
  },
})
