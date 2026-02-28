import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'

const HTML_EXTENSIONS = ['.html', '.htm', '.xhtml']

/**
 * Check if the URI looks like an HTML file based on extension.
 */
function isHtmlUri(uri: string): boolean {
  try {
    const path = new URL(uri).pathname.toLowerCase()
    return HTML_EXTENSIONS.some(ext => path.endsWith(ext))
  } catch {
    return false
  }
}

export const htmlPane: Pane = {
  label: 'HTML',
  icon: '\u{1F310}',

  canHandle(subject: NamedNode, _store: Store): boolean {
    return isHtmlUri(subject.value)
  },

  render(subject: NamedNode, _store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'html-view'

    const iframe = document.createElement('iframe')
    iframe.className = 'html-frame'
    iframe.src = subject.value
    iframe.setAttribute('sandbox', 'allow-same-origin')
    iframe.title = 'HTML content'

    // Auto-resize iframe to fit content
    iframe.addEventListener('load', () => {
      try {
        const doc = iframe.contentDocument
        if (doc) {
          const height = doc.documentElement.scrollHeight
          iframe.style.height = `${Math.max(height, 200)}px`
        }
      } catch {
        // Cross-origin — can't measure, use default height
        iframe.style.height = '80vh'
      }
    })

    wrapper.appendChild(iframe)
    container.appendChild(wrapper)
  },
}
