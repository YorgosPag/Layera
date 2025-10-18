import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-leaflet',
    'leaflet',
    '@layera/constants',
    '@layera/i18n',
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
    '@layera/snap-engine',
    '@layera/snap-interactions'
  ],
});