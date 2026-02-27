import { loadResource } from './app.js'

const form = document.getElementById('url-form') as HTMLFormElement
const input = document.getElementById('url-input') as HTMLInputElement
const container = document.getElementById('pane-container') as HTMLElement

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const uri = input.value.trim()
  if (!uri) return

  // Update the browser URL bar for bookmarkability
  const url = new URL(window.location.href)
  url.searchParams.set('uri', uri)
  window.history.pushState({}, '', url.toString())

  await loadResource(uri, container)
})

// On page load, check if there is a ?uri= parameter
const params = new URLSearchParams(window.location.search)
const initialUri = params.get('uri')
if (initialUri) {
  input.value = initialUri
  loadResource(initialUri, container)
}
