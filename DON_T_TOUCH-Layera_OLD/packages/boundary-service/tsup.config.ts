import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // Disable DTS για τώρα για να αποφύγουμε τα external package errors
  clean: true,
  minify: false,
  sourcemap: true,
  target: 'es2020',
  platform: 'neutral', // Support both browser and node
  external: ['@layera/database-core', '@layera/geo-core'], // Mark as external
  esbuildOptions: (options) => {
    options.conditions = ['module', 'import', 'require', 'default'];
  }
});