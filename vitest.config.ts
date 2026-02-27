import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'packages/core/*/vitest.config.ts',
      'packages/pane-registry/vitest.config.ts',
      'packages/panes/*/vitest.config.ts',
      'packages/shell/vitest.config.ts',
    ],
  },
})
