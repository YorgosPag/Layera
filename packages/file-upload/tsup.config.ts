import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled due to TypeScript errors
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@layera/constants',
    '@layera/tolgee',
    '@layera/theme-switcher',
    '@layera/error-boundary',
    '@layera/notifications',
    '@layera/loading',
    '@layera/buttons',
    '@layera/icons',
    '@layera/typography',
    '@layera/layout',
    '@layera/cards',
    '@layera/forms',
    '@layera/modals',
    '@layera/tables',
    '@layera/viewport',
    '@layera/auth-bridge'
  ],
});