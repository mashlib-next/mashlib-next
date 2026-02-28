import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderRecipe } from './render.js'

const RECIPE_TYPES = [
  'Recipe',
  'HowTo',
]

function isRecipe(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const t of RECIPE_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true
  }

  // Duck-typing: has recipeIngredient or recipeInstructions
  if (store.any(subject, SCHEMA('recipeIngredient'), null, null)) return true
  if (store.any(subject, SCHEMA('recipeInstructions'), null, null)) return true

  return false
}

export const recipePane: Pane = {
  label: 'Recipe',
  icon: '\u{1F373}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isRecipe(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderRecipe(subject, store, container)
  },
}
