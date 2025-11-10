import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // Disable DTS για browser compatibility
  clean: true,
  minify: false,
  sourcemap: true,
  target: 'es2020',
  platform: 'neutral',
  external: ['firebase/firestore'],
  esbuildOptions: (options) => {
    options.conditions = ['module', 'import', 'require', 'default'];
  }
});