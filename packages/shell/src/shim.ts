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
h1.textContent = 'mashlib-next'
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

session.addEventListener('sessionStateChange', () => {
  onAuthChange()
  updateAuthUI()

  const currentUri = input.value.trim()
  if (currentUri) {
    loadResource(currentUri, container, tabsNav)
  }
})

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

// --- Init ---
async function init(): Promise<void> {
  // Shim mode: use current page URL as the resource
  const params = new URLSearchParams(window.location.search)
  const initialUri = params.get('uri') || window.location.href

  input.value = initialUri

  await initAuth()
  updateAuthUI()

  // Try data islands first — no extra round trip needed
  const islands = document.querySelectorAll('script[type="application/ld+json"]')
  if (islands.length > 0) {
    const jsonld = Array.from(islands).map(el => el.textContent || '').filter(Boolean)
    loadFromStore(initialUri, jsonld, container, tabsNav)
  } else {
    window.history.replaceState({ uri: initialUri }, '', window.location.href)
    loadResource(initialUri, container, tabsNav)
  }
}

init()
