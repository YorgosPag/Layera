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
      '@layera/auth-bridge': resolve(__dirname, '../../packages/auth-bridge/src/index.ts'),
      '@layera/i18n': resolve(__dirname, '../../packages/i18n/src/index.ts'),
    },
  },
})