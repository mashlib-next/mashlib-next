import { createStore } from '@mashlib-next/store'
import { findPane } from '@mashlib-next/pane-registry'
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

/**
 * Load a resource by URI, find the appropriate pane, and render it
 * into the given container element.
 */
export async function loadResource(
  uri: string,
  container: HTMLElement
): Promise<void> {
  container.innerHTML = '<p class="loading">Loading...</p>'

  try {
    await fetchDocument(uri)

    const subject = sym(uri)
    const pane = findPane(subject, store)

    if (!pane) {
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

    container.innerHTML = ''
    pane.render(subject, store, container)
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
