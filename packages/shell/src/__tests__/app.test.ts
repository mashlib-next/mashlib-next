import { describe, it, expect } from 'vitest'

describe('shell app', () => {
  it('module can be imported without error', async () => {
    const mod = await import('../app.js')
    expect(typeof mod.loadResource).toBe('function')
  })
})
