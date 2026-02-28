import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/shim.ts'),
      name: 'mashlib',
      fileName: () => 'mashlib.js',
      formats: ['iife'],
      cssFileName: 'mashlib',
    },
    outDir: 'dist-shim',
    cssCodeSplit: false,
    rollupOptions: {
      external: ['https://esm.sh/jose@5'],
      output: {
        globals: {
          'https://esm.sh/jose@5': 'jose',
        },
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    conditions: ['development', 'import'],
  },
})
