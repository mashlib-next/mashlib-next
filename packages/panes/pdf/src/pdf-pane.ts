import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Check if the URI looks like a PDF file.
 */
function isPdfUri(uri: string): boolean {
  try {
    const path = new URL(uri).pathname.toLowerCase()
    return path.endsWith('.pdf')
  } catch {
    return false
  }
}

export const pdfPane: Pane = {
  label: 'PDF',
  icon: '\u{1F4C4}',

  canHandle(subject: NamedNode, _store: Store): boolean {
    return isPdfUri(subject.value)
  },

  render(subject: NamedNode, _store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'pdf-view'

    // Title
    const titleEl = document.createElement('h3')
    titleEl.className = 'pdf-title'
    titleEl.textContent = labelFromUri(subject.value)
    wrapper.appendChild(titleEl)

    // Embed PDF using object tag with iframe fallback
    const obj = document.createElement('object')
    obj.className = 'pdf-embed'
    obj.data = subject.value
    obj.type = 'application/pdf'

    // Fallback for browsers that can't embed PDFs
    const fallback = document.createElement('div')
    fallback.className = 'pdf-fallback'

    const msg = document.createElement('p')
    msg.textContent = 'Unable to display PDF inline.'
    fallback.appendChild(msg)

    const link = document.createElement('a')
    link.href = subject.value
    link.textContent = 'Download PDF'
    link.target = '_blank'
    link.rel = 'noopener'
    fallback.appendChild(link)

    obj.appendChild(fallback)
    wrapper.appendChild(obj)

    container.appendChild(wrapper)
  },
}
