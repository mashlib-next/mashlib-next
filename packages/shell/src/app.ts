import { createStore } from '@mashlib-next/store'
import { findPane } from '@mashlib-next/pane-registry'
import { sym } from 'rdflib'

// Side-effect import: registers the playlist pane
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
