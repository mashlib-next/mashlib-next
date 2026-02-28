// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { navigate, createNavLink, NAVIGATE_EVENT } from '../navigation.js'
import type { NavigateDetail } from '../navigation.js'

describe('navigation utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('navigate', () => {
    it('dispatches a custom event on window', () => {
      const handler = vi.fn()
      window.addEventListener(NAVIGATE_EVENT, handler)

      navigate('https://example.org/resource')

      expect(handler).toHaveBeenCalledOnce()
      const event = handler.mock.calls[0][0] as CustomEvent<NavigateDetail>
      expect(event.detail.uri).toBe('https://example.org/resource')

      window.removeEventListener(NAVIGATE_EVENT, handler)
    })

    it('uses the correct event name', () => {
      expect(NAVIGATE_EVENT).toBe('mashlib:navigate')
    })
  })

  describe('createNavLink', () => {
    it('creates an anchor element', () => {
      const link = createNavLink('https://example.org/thing', 'My Thing')
      expect(link.tagName).toBe('A')
      expect(link.textContent).toBe('My Thing')
    })

    it('sets href with uri query param for right-click open in new tab', () => {
      const link = createNavLink('https://example.org/thing', 'My Thing')
      expect(link.href).toContain('?uri=')
      expect(link.href).toContain(encodeURIComponent('https://example.org/thing'))
    })

    it('dispatches navigate event on click', () => {
      const link = createNavLink('https://example.org/resource', 'Resource')
      const handler = vi.fn()
      window.addEventListener(NAVIGATE_EVENT, handler)

      link.click()

      expect(handler).toHaveBeenCalledOnce()
      const event = handler.mock.calls[0][0] as CustomEvent<NavigateDetail>
      expect(event.detail.uri).toBe('https://example.org/resource')

      window.removeEventListener(NAVIGATE_EVENT, handler)
    })

    it('prevents default on click', () => {
      const link = createNavLink('https://example.org/resource', 'Resource')
      const clickEvent = new MouseEvent('click', { cancelable: true, bubbles: true })
      const spy = vi.spyOn(clickEvent, 'preventDefault')

      link.dispatchEvent(clickEvent)

      expect(spy).toHaveBeenCalled()
    })
  })
})
