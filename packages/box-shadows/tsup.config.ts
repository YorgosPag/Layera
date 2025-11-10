import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react'],
  banner: {
    js: '/* @layera/box-shadows - Enterprise Box Shadow System */',
  },
});