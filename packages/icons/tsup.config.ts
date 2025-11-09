import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    // Ensure proper export ordering
    options.keepNames = true
    options.treeShaking = true
  }
})