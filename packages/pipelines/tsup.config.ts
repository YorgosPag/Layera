import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [/^@layera\//], // Make all @layera packages external
  tsconfig: 'tsconfig.build.json',
  banner: {
    js: '"use client";',
  },
});