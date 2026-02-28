import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { marked } from 'marked'

const MARKDOWN_EXTENSIONS = ['.md', '.markdown', '.mdown', '.mkd', '.mkdn']

/**
 * Check if the URI looks like a markdown file based on extension.
 */
function isMarkdownUri(uri: string): boolean {
  try {
    const path = new URL(uri).pathname.toLowerCase()
    return MARKDOWN_EXTENSIONS.some(ext => path.endsWith(ext))
  } catch {
    return false
  }
}

/**
 * Extract the raw text content of a fetched document from the store.
 * rdflib stores the source text for non-RDF resources that it fetched.
 */
function getSourceText(subject: NamedNode, store: Store): string | undefined {
  // For text resources, rdflib may not parse them into triples.
  // We try to fetch the raw content via the fetcher's requested resource.
  // The source is available through the response text stored by the fetcher.
  // As a fallback we serialize what we have.
  const stmts = store.match(null, null, null, subject.doc())
  if (stmts.length === 0) return undefined

  // Collect all literal values — rdflib stores plain text content as
  // a single triple: <doc> <content> "text"
  for (const st of stmts) {
    if (
      st.predicate.value === 'http://www.w3.org/ns/solid/terms#content' ||
      st.predicate.value === 'http://purl.org/dc/terms/content'
    ) {
      return st.object.value
    }
  }

  return undefined
}

export const markdownPane: Pane = {
  label: 'Markdown',
  icon: '\u{1F4DD}',

  canHandle(subject: NamedNode, _store: Store): boolean {
    return isMarkdownUri(subject.value)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'markdown-view'

    const sourceText = getSourceText(subject, store)

    if (sourceText) {
      wrapper.innerHTML = marked.parse(sourceText) as string
    } else {
      // If we can't extract the text from the store, fetch it directly
      const fallback = document.createElement('p')
      fallback.className = 'loading'
      fallback.textContent = 'Loading markdown...'
      wrapper.appendChild(fallback)

      fetch(subject.value)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.text()
        })
        .then(text => {
          wrapper.innerHTML = marked.parse(text) as string
        })
        .catch(() => {
          wrapper.innerHTML = ''
          const err = document.createElement('p')
          err.className = 'error'
          err.textContent = 'Failed to load markdown content.'
          wrapper.appendChild(err)
        })
    }

    container.appendChild(wrapper)
  },
}
