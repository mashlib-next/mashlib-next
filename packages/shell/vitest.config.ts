import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // solid-oidc imports jose from https://esm.sh which Node can't resolve
      'solid-oidc': path.resolve(__dirname, 'src/__mocks__/solid-oidc.ts'),
    },
  },
})
