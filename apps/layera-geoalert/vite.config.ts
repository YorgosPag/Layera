import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.json'],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
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
      '@layera/tolgee': resolve(__dirname, '../../packages/tolgee/src/index.ts'),
      '@layera/tolgee/locales': resolve(__dirname, '../../packages/tolgee/src/locales'),
      '@layera/buttons': resolve(__dirname, '../../packages/buttons/src/index.ts'),
      '@layera/typography': resolve(__dirname, '../../packages/typography/src/index.ts'),
      '@layera/theme-switcher': resolve(__dirname, '../../packages/theme-switcher/src/index.ts'),
      '@layera/layout': resolve(__dirname, '../../packages/layout/src/index.ts'),
      '@layera/forms': resolve(__dirname, '../../packages/forms/src/index.ts'),
      '@layera/cards': resolve(__dirname, '../../packages/cards/src/index.ts'),
      '@layera/constants': resolve(__dirname, '../../packages/constants/src'),
      '@layera/viewport': resolve(__dirname, '../../packages/viewport/src'),
      '@layera/notifications': resolve(__dirname, '../../packages/notifications/src'),
      '@layera/loading': resolve(__dirname, '../../packages/loading/src'),
      '@layera/icons': resolve(__dirname, '../../packages/icons/src'),
      '@layera/osm': resolve(__dirname, '../../packages/osm/src'),
      '@layera/geo-mapping': resolve(__dirname, '../../packages/geo-mapping/src'),
      // 🔥 ΚΡΙΣΙΜΑ ALIASES ΓΙΑ FAB DRAG FUNCTIONALITY - ΜΗΝ ΑΦΑΙΡΕΣΕΙΣ ΠΟΤΕ!
      '@layera/floating-action-buttons': resolve(__dirname, '../../packages/floating-action-buttons/src'),
      '@layera/draggable-fab': resolve(__dirname, '../../packages/draggable-fab/src'),
      '@layera/device-layouts': resolve(__dirname, '../../packages/device-layouts/src'),
      '@layera/navigation-handlers': resolve(__dirname, '../../packages/navigation-handlers/src'),
    },
  },
})