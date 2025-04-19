import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      'date-fns': 'date-fns',
    },
  },
  test: {
    globals: true, // Active les globales comme `test` et `expect`
    environment: 'jsdom', // Définit l'environnement DOM
    setupFiles: './src/setupTests.js', // Charge les fichiers de configuration
    css: true,
    coverage: {
      provider: 'c8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
    }
  },
})