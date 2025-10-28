import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@layera/styles': path.resolve(__dirname, '../../packages/styles/index.css'),
      '@layera/forms': path.resolve(__dirname, '../../packages/forms/src'),
      '@layera/constants': path.resolve(__dirname, '../../packages/constants/src'),
      '@layera/notifications': path.resolve(__dirname, '../../packages/notifications/src'),
      '@layera/layout': path.resolve(__dirname, '../../packages/layout/src'),
      '@layera/cards': path.resolve(__dirname, '../../packages/cards/src'),
      '@layera/buttons': path.resolve(__dirname, '../../packages/buttons/src'),
      '@layera/tolgee': path.resolve(__dirname, '../../packages/tolgee/src'),
      '@layera/theme-switcher': path.resolve(__dirname, '../../packages/theme-switcher/src'),
      '@layera/auth-bridge': path.resolve(__dirname, '../../packages/auth-bridge/src'),
      '@layera/viewport': path.resolve(__dirname, '../../packages/viewport/src')
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
