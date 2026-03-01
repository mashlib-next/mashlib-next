import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/shim.ts'),
      name: 'mashlib',
      fileName: () => 'mashlib.js',
      formats: ['es'],
      cssFileName: 'mashlib',
    },
    outDir: 'dist-shim',
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      'https://esm.sh/jose@5': 'jose',
    },
    conditions: ['development', 'import'],
  },
})
