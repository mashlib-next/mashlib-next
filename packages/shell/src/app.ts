import { createStore } from '@mashlib-next/store'
import { findMatchingPanes } from '@mashlib-next/pane-registry'
import type { Pane } from '@mashlib-next/pane-registry'
import { sym } from 'rdflib'

// Side-effect imports: register panes in priority order (first = lowest)
import '@mashlib-next/source-pane'
import '@mashlib-next/outline-pane'
import '@mashlib-next/default-pane'
import '@mashlib-next/folder-pane'
import '@mashlib-next/html-pane'
import '@mashlib-next/audio-pane'
import '@mashlib-next/image-pane'
import '@mashlib-next/code-pane'
import '@mashlib-next/markdown-pane'
import '@mashlib-next/pdf-pane'
import '@mashlib-next/video-pane'
import '@mashlib-next/table-pane'
import '@mashlib-next/gallery-pane'
import '@mashlib-next/article-pane'
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
import '@mashlib-next/sharing-pane'
import '@mashlib-next/form-pane'
import '@mashlib-next/trusted-apps-pane'
import '@mashlib-next/dashboard-pane'
import '@mashlib-next/pad-pane'
import '@mashlib-next/microblog-pane'
import '@mashlib-next/chat-pane'
import '@mashlib-next/contacts-pane'
import '@mashlib-next/organization-pane'
import '@mashlib-next/profile-pane'
import '@mashlib-next/playlist-pane'

const { store, fetchDocument } = createStore()

const tabsNav = document.getElementById('pane-tabs')!

/**
 * Build the tab bar and render the active pane.
 */
function renderTabs(
  panes: Pane[],
  subject: ReturnType<typeof sym>,
  container: HTMLElement
): void {
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
      // Update tab states
      for (const tab of tabsNav.children) {
        (tab as HTMLElement).setAttribute('aria-selected', 'false')
      }
      btn.setAttribute('aria-selected', 'true')

      // Render selected pane
      container.innerHTML = ''
      pane.render(subject, store, container)
    })

    tabsNav.appendChild(btn)
  }

  // Render the first (highest-priority) pane
  container.innerHTML = ''
  panes[0].render(subject, store, container)
}

/**
 * Load a resource by URI, find matching panes, and render with tab switcher.
 */
export async function loadResource(
  uri: string,
  container: HTMLElement
): Promise<void> {
  container.innerHTML = '<p class="loading">Loading...</p>'
  tabsNav.innerHTML = ''
  tabsNav.hidden = true

  try {
    await fetchDocument(uri)

    const subject = sym(uri)
    const panes = findMatchingPanes(subject, store)

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

    renderTabs(panes, subject, container)
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
