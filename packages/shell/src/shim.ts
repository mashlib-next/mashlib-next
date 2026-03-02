/**
 * mashlib.js shim — drop-in replacement for the classic mashlib.
 *
 * Usage on a Solid server page:
 *   <script src="mashlib.js"></script>
 *
 * Or with a target element:
 *   <div id="mashlib"></div>
 *   <script src="mashlib.js"></script>
 */
import { loadResource, initAuth, onAuthChange, session, loadFromStore } from './app.js'
import { register } from '@mashlib-next/pane-registry'
import { NAVIGATE_EVENT } from '@mashlib-next/utils'
import type { NavigateDetail } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'
import './style.css'

// --- Create shell DOM ---
const root = document.getElementById('mashlib') || document.body

// Header
const header = document.createElement('header')
header.id = 'chrome'

const headerRow = document.createElement('div')
headerRow.id = 'header-row'

const h1 = document.createElement('h1')
h1.innerHTML = '<svg width="40" height="40" viewBox="0 0 100 100" aria-label="Solid" fill="none"><path d="M91 37.88Q98 50 91 62.12L81 79.45Q74 91.57 60 91.57L40 91.57Q26 91.57 19 79.45L9 62.12Q2 50 9 37.88L19 20.55Q26 8.43 40 8.43L60 8.43Q74 8.43 81 20.55Z" fill="#7C4DFF"/><g transform="translate(50 50) scale(.323) translate(-176 -161)"><path d="M118.47 142.23h117.53c1.48 0 2.65-1.2 2.65-2.65v-22.04c0-14.65-11.89-26.54-26.54-26.54h-70.57c-20.53-.03-37.16 16.6-37.16 37.13 0 7.83 6.27 14.1 14.08 14.1zM130 239.6h70.23c21.2 0 38.43-17.23 38.43-38.43 0-7.08-5.72-12.83-12.83-12.83H106.94c-1.46 0-2.55 1.17-2.55 2.55v23.05c-.03 14.18 11.48 25.66 25.6 25.66z" fill="#F7F7F7"/><path d="M109.6 139.32l87.66 87.66c5.8 5.8 15.2 5.8 21 0l15.2-15.2c5.8-5.8 5.8-15.2 0-21l-87.64-87.66c-5.8-5.8-15.2-5.8-21 0l-15.2 15.2c-5.85 5.8-5.85 15.22-.02 21z" fill="#F7F7F7"/></g></svg> SolidOS Browser'
headerRow.appendChild(h1)

// Auth controls
const authControls = document.createElement('div')
authControls.id = 'auth-controls'

const loginBtn = document.createElement('button')
loginBtn.id = 'login-btn'
loginBtn.textContent = 'Login'
authControls.appendChild(loginBtn)

const userInfo = document.createElement('span')
userInfo.id = 'user-info'
userInfo.hidden = true
authControls.appendChild(userInfo)

const logoutBtn = document.createElement('button')
logoutBtn.id = 'logout-btn'
logoutBtn.hidden = true
logoutBtn.textContent = 'Logout'
authControls.appendChild(logoutBtn)

headerRow.appendChild(authControls)
header.appendChild(headerRow)

// URL form
const form = document.createElement('form')
form.id = 'url-form'

const label = document.createElement('label')
label.htmlFor = 'url-input'
label.textContent = 'Resource URL:'
form.appendChild(label)

const input = document.createElement('input')
input.id = 'url-input'
input.type = 'url'
input.placeholder = 'https://example.org/resource'
input.required = true
form.appendChild(input)

const goBtn = document.createElement('button')
goBtn.type = 'submit'
goBtn.textContent = 'Go'
form.appendChild(goBtn)

header.appendChild(form)
root.appendChild(header)

// Tab bar
const tabsNav = document.createElement('nav')
tabsNav.id = 'pane-tabs'
tabsNav.setAttribute('role', 'tablist')
tabsNav.setAttribute('aria-label', 'View selector')
tabsNav.hidden = true
root.appendChild(tabsNav)

// Pane container
const container = document.createElement('main')
container.id = 'pane-container'
root.appendChild(container)

// --- Navigation ---
async function navigateTo(uri: string, pushHistory: boolean): Promise<void> {
  input.value = uri

  if (pushHistory) {
    const url = new URL(window.location.href)
    url.searchParams.set('uri', uri)
    window.history.pushState({ uri }, '', url.toString())
  }

  await loadResource(uri, container, tabsNav)
}

// --- Auth UI ---
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

// sessionStateChange listener is added in init() after the initial render,
// to avoid a double-render race when initAuth() fires during startup.

loginBtn.addEventListener('click', () => {
  const idp = prompt('Solid identity provider:', 'https://solidcommunity.net')
  if (idp) {
    session.login(idp, window.location.href)
  }
})

logoutBtn.addEventListener('click', () => {
  session.logout()
})

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const uri = input.value.trim()
  if (!uri) return
  navigateTo(uri, true)
})

// Custom event from panes
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

// --- Expose register globally for external panes ---
;(window as any).mashlib = { register }

// --- Load external panes from <script data-pane src="..."> ---
async function loadExternalPanes(): Promise<void> {
  const scripts = document.querySelectorAll('script[data-pane]')
  const imports = Array.from(scripts).map(async (el) => {
    const src = (el as HTMLScriptElement).src
    if (!src) return
    try {
      const mod = await import(/* @vite-ignore */ src)
      const pane = mod.default || mod.pane
      if (pane && typeof pane.canHandle === 'function') {
        register(pane)
      }
    } catch {
      // Skip panes that fail to load
    }
  })
  await Promise.all(imports)
}

// --- Init ---
async function init(): Promise<void> {
  // Shim mode: use current page URL as the resource
  const params = new URLSearchParams(window.location.search)
  const initialUri = params.get('uri') || window.location.href

  input.value = initialUri

  // Load external panes before auth/render
  await loadExternalPanes()

  await initAuth()
  updateAuthUI()

  // Now that init is done, listen for future auth changes
  session.addEventListener('sessionStateChange', () => {
    onAuthChange()
    updateAuthUI()

    const currentUri = input.value.trim()
    if (currentUri) {
      loadResource(currentUri, container, tabsNav)
    }
  })

  // Try data islands first — no extra round trip needed
  const islands = document.querySelectorAll('script[type="application/ld+json"]')
  if (islands.length > 0) {
    const jsonld = Array.from(islands).map(el => el.textContent || '').filter(Boolean)
    await loadFromStore(initialUri, jsonld, container, tabsNav)
  } else {
    window.history.replaceState({ uri: initialUri }, '', window.location.href)
    loadResource(initialUri, container, tabsNav)
  }
}

init()
