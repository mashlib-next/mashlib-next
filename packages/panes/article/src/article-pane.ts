import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderArticle } from './render.js'

const ARTICLE_TYPES = [
  'Article',
  'BlogPosting',
  'NewsArticle',
  'ScholarlyArticle',
  'TechArticle',
  'SocialMediaPosting',
  'Report',
]

function isArticle(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const t of ARTICLE_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true
  }

  // Duck-typing: has schema:articleBody or schema:headline
  if (store.any(subject, SCHEMA('articleBody'), null, null)) return true
  if (store.any(subject, SCHEMA('headline'), null, null)) return true

  return false
}

export const articlePane: Pane = {
  label: 'Article',
  icon: '\u{1F4F0}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isArticle(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderArticle(subject, store, container)
  },
}
