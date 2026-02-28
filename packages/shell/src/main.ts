import { loadResource } from './app.js'
import { NAVIGATE_EVENT } from '@mashlib-next/utils'
import type { NavigateDetail } from '@mashlib-next/utils'

const form = document.getElementById('url-form') as HTMLFormElement
const input = document.getElementById('url-input') as HTMLInputElement
const container = document.getElementById('pane-container') as HTMLElement

/**
 * Core navigation: update URL bar, update input, load resource.
 */
async function navigateTo(uri: string, pushHistory: boolean): Promise<void> {
  input.value = uri

  if (pushHistory) {
    const url = new URL(window.location.href)
    url.searchParams.set('uri', uri)
    window.history.pushState({ uri }, '', url.toString())
  }

  await loadResource(uri, container)
}

// Form submit — user types URL and presses Go
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const uri = input.value.trim()
  if (!uri) return
  navigateTo(uri, true)
})

// Custom event from panes — navigate without knowing shell DOM
window.addEventListener(NAVIGATE_EVENT, ((e: CustomEvent<NavigateDetail>) => {
  const uri = e.detail.uri
  if (uri) navigateTo(uri, true)
}) as EventListener)

// Browser back/forward
window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search)
  const uri = params.get('uri')
  if (uri) {
    navigateTo(uri, false)
  } else {
    input.value = ''
    container.innerHTML =
      '<p class="placeholder">Enter a URL above to browse a Linked Data resource.</p>'
  }
})

// On page load, check for ?uri= parameter
const params = new URLSearchParams(window.location.search)
const initialUri = params.get('uri')
if (initialUri) {
  input.value = initialUri
  window.history.replaceState({ uri: initialUri }, '', window.location.href)
  loadResource(initialUri, container)
}
