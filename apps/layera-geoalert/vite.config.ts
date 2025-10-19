import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // CSS aliases ΠΡΩΤΑ - για να μην τα override τα TypeScript aliases
      '@layera/buttons/styles': resolve(__dirname, '../../packages/buttons/dist/styles.css'),
      '@layera/typography/styles': resolve(__dirname, '../../packages/typography/dist/styles.css'),
      '@layera/theme-switcher/styles': resolve(__dirname, '../../packages/theme-switcher/dist/styles.css'),
      '@layera/layout/styles': resolve(__dirname, '../../packages/layout/dist/styles.css'),
      // TypeScript aliases ΜΕΤΑ
      '@layera/auth-bridge': resolve(__dirname, '../../packages/auth-bridge/src/index.ts'),
      '@layera/i18n': resolve(__dirname, '../../packages/i18n/src/index.ts'),
      '@layera/buttons': resolve(__dirname, '../../packages/buttons/src/index.ts'),
      '@layera/typography': resolve(__dirname, '../../packages/typography/src/index.ts'),
      '@layera/theme-switcher': resolve(__dirname, '../../packages/theme-switcher/src/index.ts'),
      '@layera/layout': resolve(__dirname, '../../packages/layout/src/index.ts'),
      '@layera/constants': resolve(__dirname, '../../packages/constants/src'),
    },
  },
})