import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@layera/forms': path.resolve(__dirname, '../../packages/forms/src'),
      '@layera/forms/styles': path.resolve(__dirname, '../../packages/forms/dist/index.css'),
      '@layera/constants': path.resolve(__dirname, '../../packages/constants/src'),
      '@layera/notifications': path.resolve(__dirname, '../../packages/notifications/src'),
      '@layera/layout': path.resolve(__dirname, '../../packages/layout/src'),
      '@layera/layout/styles': path.resolve(__dirname, '../../packages/layout/dist/styles.css'),
      '@layera/cards': path.resolve(__dirname, '../../packages/cards/src'),
      '@layera/cards/styles': path.resolve(__dirname, '../../packages/cards/dist/styles.css'),
      '@layera/buttons': path.resolve(__dirname, '../../packages/buttons/src'),
      '@layera/buttons/styles': path.resolve(__dirname, '../../packages/buttons/dist/styles.css'),
      '@layera/i18n': path.resolve(__dirname, '../../packages/i18n/src'),
      '@layera/theme-switcher': path.resolve(__dirname, '../../packages/theme-switcher/src'),
      '@layera/theme-switcher/styles': path.resolve(__dirname, '../../packages/theme-switcher/dist/styles.css'),
      '@layera/auth-bridge': path.resolve(__dirname, '../../packages/auth-bridge/src')
    }
  },
  server: {
    port: 3000,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.js']
  }
})
