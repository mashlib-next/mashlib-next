import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3435,
    open: false,
  },
  resolve: {
    conditions: ['development', 'import'],
  },
})
