import { createStore } from '@mashlib-next/store'
import type { MashlibStore } from '@mashlib-next/store'
import { findMatchingPanes } from '@mashlib-next/pane-registry'
import type { Pane } from '@mashlib-next/pane-registry'
import { sym, parse } from 'rdflib'
import { Session } from 'solid-oidc'

// Side-effect imports: register panes in priority order (first = lowest)
// --- Utility panes (lowest priority, always available) ---
import '@mashlib-next/source-pane'
import '@mashlib-next/outline-pane'
import '@mashlib-next/default-pane'
import '@mashlib-next/sharing-pane'
import '@mashlib-next/table-pane'
// --- Content-type panes ---
import '@mashlib-next/html-pane'
import '@mashlib-next/audio-pane'
import '@mashlib-next/image-pane'
import '@mashlib-next/code-pane'
import '@mashlib-next/markdown-pane'
import '@mashlib-next/pdf-pane'
import '@mashlib-next/video-pane'
import '@mashlib-next/gallery-pane'
import '@mashlib-next/article-pane'
// --- Domain-specific panes ---
import '@mashlib-next/map-pane'
import '@mashlib-next/trip-pane'
import '@mashlib-next/schedule-pane'
import '@mashlib-next/event-pane'
import '@mashlib-next/bookmarks-pane'
import '@mashlib-next/activity-pane'
import '@mashlib-next/transaction-pane'
import '@mashlib-next/product-pane'
import '@mashlib-next/recipe-pane'
import '@mashlib-next/issue-pane'
import '@mashlib-next/meeting-pane'
import '@mashlib-next/notification-pane'
import '@mashlib-next/form-pane'
import '@mashlib-next/trusted-apps-pane'
import '@mashlib-next/pad-pane'
import '@mashlib-next/microblog-pane'
import '@mashlib-next/playlist-pane'
// --- Primary panes (highest priority) ---
import '@mashlib-next/folder-pane'
import '@mashlib-next/dashboard-pane'
import '@mashlib-next/chat-pane'
import '@mashlib-next/contacts-pane'
import '@mashlib-next/organization-pane'
import '@mashlib-next/profile-pane'

// --- Auth session ---
export const session = new Session()

// --- Store (recreated on auth state change) ---
let mashlibStore: MashlibStore = createStore()

function rebuildStore(): void {
  const fetchFn = session.isActive
    ? session.authFetch.bind(session) as typeof globalThis.fetch
    : undefined
  mashlibStore = createStore(fetchFn ? { fetch: fetchFn } : undefined)
}

/**
 * Build the tab bar and render the active pane.
 */
function renderTabs(
  panes: Pane[],
  subject: ReturnType<typeof sym>,
  container: HTMLElement,
  tabsNav: HTMLElement
): void {
  const { store } = mashlibStore
  tabsNav.innerHTML = ''

  if (panes.length <= 1) {
    tabsNav.hidden = true
  } else {
    tabsNav.hidden = false
  }

  for (let i = 0; i < panes.length; i++) {
    const pane = panes[i]
    const btn = document.createElement('button')
    btn.className = 'pane-tab'
    btn.role = 'tab'
    btn.textContent = `${pane.icon} ${pane.label}`
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false')

    btn.addEventListener('click', () => {
      for (const tab of tabsNav.children) {
        (tab as HTMLElement).setAttribute('aria-selected', 'false')
      }
      btn.setAttribute('aria-selected', 'true')

      container.innerHTML = ''
      pane.render(subject, store, container)
    })

    tabsNav.appendChild(btn)
  }

  container.innerHTML = ''
  panes[0].render(subject, store, container)
}

// --- WebSocket live updates ---
let liveSocket: WebSocket | null = null
let liveDocUri: string | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

function subscribeLive(
  docUri: string,
  container: HTMLElement,
  tabsNav: HTMLElement
): void {
  unsubscribeLive()

  let origin: string
  try {
    origin = new URL(docUri).origin
  } catch {
    return
  }

  const wsUrl = origin.replace(/^http/, 'ws')
  liveDocUri = docUri

  try {
    const ws = new WebSocket(wsUrl)
    liveSocket = ws

    ws.addEventListener('open', () => {
      ws.send(`sub ${docUri}`)
    })

    ws.addEventListener('message', (e) => {
      const data = String(e.data)
      if (data.startsWith('pub') && data.includes(docUri)) {
        // Resource changed — re-fetch and re-render the active tab
        reloadCurrentPane(docUri, container, tabsNav)
      }
    })

    ws.addEventListener('close', () => {
      // Reconnect after 5s if we're still viewing this resource
      if (liveDocUri === docUri) {
        reconnectTimer = setTimeout(() => {
          if (liveDocUri === docUri) {
            subscribeLive(docUri, container, tabsNav)
          }
        }, 5000)
      }
    })

    ws.addEventListener('error', () => {
      // Silently close — the close handler will reconnect
      ws.close()
    })
  } catch {
    // WebSocket not supported or blocked — no live updates
  }
}

function unsubscribeLive(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
  if (liveSocket) {
    liveDocUri = null
    liveSocket.close()
    liveSocket = null
  }
}

async function reloadCurrentPane(
  docUri: string,
  container: HTMLElement,
  tabsNav: HTMLElement
): Promise<void> {
  // Find the currently active tab
  const activeTab = tabsNav.querySelector('.pane-tab[aria-selected="true"]')
  const activeLabel = activeTab?.textContent ?? ''

  try {
    // Re-fetch the document (fetcher.load with force refresh)
    await mashlibStore.fetcher.load(sym(docUri), { force: true })

    // Re-find panes and re-render
    const subject = sym(liveDocUri?.includes('#') ? liveDocUri : docUri)
    const panes = findMatchingPanes(subject, mashlibStore.store)
    if (panes.length === 0) return

    // Try to stay on the same tab
    const matchIdx = panes.findIndex(p => `${p.icon} ${p.label}` === activeLabel)
    const pane = matchIdx >= 0 ? panes[matchIdx] : panes[0]

    container.innerHTML = ''
    pane.render(subject, mashlibStore.store, container)
  } catch {
    // Silent failure — next pub will retry
  }
}

/**
 * Load a resource from inline JSON-LD data islands (no fetch needed).
 */
export function loadFromStore(
  uri: string,
  jsonldBlocks: string[],
  container: HTMLElement,
  tabsNav: HTMLElement
): void {
  container.innerHTML = ''
  tabsNav.innerHTML = ''
  tabsNav.hidden = true

  const { store } = mashlibStore
  const docUri = uri.replace(/#.*$/, '')

  for (const block of jsonldBlocks) {
    try {
      parse(block, store, docUri, 'application/ld+json')
    } catch {
      // Skip malformed blocks
    }
  }

  const subject = sym(uri)
  const panes = findMatchingPanes(subject, store)

  if (panes.length === 0) {
    container.innerHTML = `
      <div class="error">
        <p><strong>No pane available</strong> for this resource.</p>
        <p>URI: <code>${escapeHtml(uri)}</code></p>
      </div>
    `
    return
  }

  renderTabs(panes, subject, container, tabsNav)
}

/**
 * Load a resource by URI, find matching panes, and render with tab switcher.
 */
export async function loadResource(
  uri: string,
  container: HTMLElement,
  tabsNav: HTMLElement
): Promise<void> {
  container.innerHTML = '<p class="loading">Loading...</p>'
  tabsNav.innerHTML = ''
  tabsNav.hidden = true

  // Unsubscribe from previous resource
  unsubscribeLive()

  try {
    await mashlibStore.fetchDocument(uri)

    const subject = sym(uri)
    const panes = findMatchingPanes(subject, mashlibStore.store)

    if (panes.length === 0) {
      container.innerHTML = `
        <div class="error">
          <p><strong>No pane available</strong> for this resource.</p>
          <p>URI: <code>${escapeHtml(uri)}</code></p>
          <p>The resource was fetched successfully, but no registered pane
          knows how to display it.</p>
        </div>
      `
      return
    }

    renderTabs(panes, subject, container, tabsNav)

    // Subscribe to live updates for this document
    const docUri = uri.replace(/#.*$/, '')
    subscribeLive(docUri, container, tabsNav)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    container.innerHTML = `
      <div class="error">
        <p><strong>Failed to load resource</strong></p>
        <p>${escapeHtml(message)}</p>
      </div>
    `
  }
}

/**
 * Initialize auth: restore session and handle redirects.
 */
export async function initAuth(): Promise<void> {
  try {
    await session.handleRedirectFromLogin()
  } catch { /* not a redirect */ }

  try {
    await session.restore()
  } catch { /* no stored session */ }

  if (session.isActive) {
    rebuildStore()
  }
}

/**
 * Called when auth state changes. Rebuilds store and reloads current resource.
 */
export function onAuthChange(): void {
  rebuildStore()
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
