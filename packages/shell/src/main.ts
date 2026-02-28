import { loadResource, initAuth, onAuthChange, session } from './app.js'
import { NAVIGATE_EVENT } from '@mashlib-next/utils'
import type { NavigateDetail } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

const form = document.getElementById('url-form') as HTMLFormElement
const input = document.getElementById('url-input') as HTMLInputElement
const container = document.getElementById('pane-container') as HTMLElement
const tabsNav = document.getElementById('pane-tabs') as HTMLElement
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement
const userInfo = document.getElementById('user-info') as HTMLSpanElement

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

  await loadResource(uri, container, tabsNav)
}

/**
 * Update the auth UI based on session state.
 */
function updateAuthUI(): void {
  if (session.isActive) {
    loginBtn.hidden = true
    logoutBtn.hidden = false
    userInfo.hidden = false
    userInfo.textContent = session.webId ? labelFromUri(session.webId) : 'Logged in'
    userInfo.title = session.webId ?? ''
  } else {
    loginBtn.hidden = false
    logoutBtn.hidden = true
    userInfo.hidden = true
    userInfo.textContent = ''
  }
}

// --- Auth ---
session.addEventListener('sessionStateChange', () => {
  onAuthChange()
  updateAuthUI()

  // Reload current resource with new auth state
  const currentUri = input.value.trim()
  if (currentUri) {
    loadResource(currentUri, container, tabsNav)
  }
})

loginBtn.addEventListener('click', () => {
  const idp = prompt('Solid identity provider:', 'https://solidcommunity.net')
  if (idp) {
    // Store current resource URI so we can restore it after login redirect
    const currentUri = input.value.trim()
    if (currentUri) {
      sessionStorage.setItem('mashlib_pre_login_uri', currentUri)
    }
    // Use clean redirect URI (origin + pathname only) so it matches the token exchange
    const redirectUri = window.location.origin + window.location.pathname
    session.login(idp, redirectUri)
  }
})

logoutBtn.addEventListener('click', () => {
  session.logout()
})

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

// Quick links — intercept clicks to navigate via JS
document.querySelectorAll('.quick-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const href = (link as HTMLAnchorElement).href
    const url = new URL(href)
    const uri = url.searchParams.get('uri')
    if (uri) navigateTo(uri, true)
  })
})

// --- Init ---
async function init(): Promise<void> {
  await initAuth()
  updateAuthUI()

  const params = new URLSearchParams(window.location.search)
  let initialUri = params.get('uri') || input.value.trim()

  // Restore resource URI after login redirect
  const preLoginUri = sessionStorage.getItem('mashlib_pre_login_uri')
  if (preLoginUri && !initialUri) {
    initialUri = preLoginUri
    sessionStorage.removeItem('mashlib_pre_login_uri')
  }

  if (initialUri) {
    input.value = initialUri
    const url = new URL(window.location.href)
    url.searchParams.set('uri', initialUri)
    window.history.replaceState({ uri: initialUri }, '', url.toString())
    loadResource(initialUri, container, tabsNav)
  }
}

init()
