import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: 'src/index.ts',
    resolve: true
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  // Χωρίς external για να περιλάβει όλα τα dependencies
  tsconfig: 'tsconfig.build.json',
  banner: {
    js: '"use client";',
  },
  // Skip packages που προκαλούν προβλήματα στο DTS build
  onSuccess: async () => {
    console.log('✅ Pipeline package built successfully');
  },
});