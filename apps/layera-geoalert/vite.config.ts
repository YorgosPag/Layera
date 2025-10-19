import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Enterprise LEGO Styles
      '@layera/styles': resolve(__dirname, '../../packages/styles/index.css'),
      // LEGO Component Aliases
      '@layera/auth-bridge': resolve(__dirname, '../../packages/auth-bridge/src/index.ts'),
      '@layera/i18n': resolve(__dirname, '../../packages/i18n/src/index.ts'),
      '@layera/buttons': resolve(__dirname, '../../packages/buttons/src/index.ts'),
      '@layera/typography': resolve(__dirname, '../../packages/typography/src/index.ts'),
      '@layera/theme-switcher': resolve(__dirname, '../../packages/theme-switcher/src/index.ts'),
      '@layera/layout': resolve(__dirname, '../../packages/layout/src/index.ts'),
      '@layera/constants': resolve(__dirname, '../../packages/constants/src'),
      '@layera/viewport': resolve(__dirname, '../../packages/viewport/src'),
      '@layera/notifications': resolve(__dirname, '../../packages/notifications/src'),
      '@layera/loading': resolve(__dirname, '../../packages/loading/src'),
      '@layera/icons': resolve(__dirname, '../../packages/icons/src'),
    },
  },
})