import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3435,
    open: false,
  },
  resolve: {
    conditions: ['development', 'import'],
  },
  optimizeDeps: {
    // solid-oidc imports jose from https://esm.sh — let the browser resolve it
    exclude: ['solid-oidc'],
  },
})
