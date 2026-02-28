import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, DCT } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Format an ISO 8601 duration (PT1H30M) to human-readable text.
 */
function formatDuration(iso: string): string {
  const match = iso.match(/^PT?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i)
  if (!match) return iso

  const parts: string[] = []
  if (match[1]) parts.push(`${match[1]} hr`)
  if (match[2]) parts.push(`${match[2]} min`)
  if (match[3]) parts.push(`${match[3]} sec`)
  return parts.join(' ') || iso
}

/**
 * Render a recipe into the container.
 */
export function renderRecipe(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'recipe-view'

  // Image
  const imageUrl =
    store.any(subject, SCHEMA('image'), null, null)?.value ??
    store.any(subject, SCHEMA('thumbnailUrl'), null, null)?.value
  if (imageUrl) {
    const img = document.createElement('img')
    img.className = 'recipe-image'
    img.src = imageUrl
    img.alt = 'Recipe photo'
    wrapper.appendChild(img)
  }

  // Name
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const nameEl = document.createElement('h2')
  nameEl.className = 'recipe-name'
  nameEl.textContent = name
  wrapper.appendChild(nameEl)

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'recipe-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Meta bar: prep time, cook time, total time, yield, servings
  const meta: { label: string; value: string }[] = []

  const prepTime = store.any(subject, SCHEMA('prepTime'), null, null)?.value
  if (prepTime) meta.push({ label: 'Prep', value: formatDuration(prepTime) })

  const cookTime = store.any(subject, SCHEMA('cookTime'), null, null)?.value
  if (cookTime) meta.push({ label: 'Cook', value: formatDuration(cookTime) })

  const totalTime = store.any(subject, SCHEMA('totalTime'), null, null)?.value
  if (totalTime) meta.push({ label: 'Total', value: formatDuration(totalTime) })

  const recipeYield = store.any(subject, SCHEMA('recipeYield'), null, null)?.value
  if (recipeYield) meta.push({ label: 'Yield', value: recipeYield })

  const servings = store.any(subject, SCHEMA('recipeServings'), null, null)?.value
  if (servings) meta.push({ label: 'Servings', value: servings })

  if (meta.length > 0) {
    const metaBar = document.createElement('div')
    metaBar.className = 'recipe-meta'
    for (const item of meta) {
      const chip = document.createElement('span')
      chip.className = 'recipe-meta-item'
      chip.innerHTML = `<strong>${item.label}</strong> ${item.value}`
      metaBar.appendChild(chip)
    }
    wrapper.appendChild(metaBar)
  }

  // Rating
  const ratingNode = store.any(subject, SCHEMA('aggregateRating'), null, null)
  if (ratingNode) {
    const ratingValue = store.any(ratingNode as NamedNode, SCHEMA('ratingValue'), null, null)?.value
    const reviewCount = store.any(ratingNode as NamedNode, SCHEMA('reviewCount'), null, null)?.value
    if (ratingValue) {
      const ratingEl = document.createElement('div')
      ratingEl.className = 'recipe-rating'

      const stars = Math.round(parseFloat(ratingValue))
      const starText = '\u2605'.repeat(Math.min(stars, 5)) +
                       '\u2606'.repeat(Math.max(5 - stars, 0))

      const starsEl = document.createElement('span')
      starsEl.className = 'recipe-stars'
      starsEl.textContent = starText
      ratingEl.appendChild(starsEl)

      const scoreEl = document.createElement('span')
      scoreEl.className = 'recipe-score'
      scoreEl.textContent = `${ratingValue}/5`
      if (reviewCount) {
        scoreEl.textContent += ` (${reviewCount} reviews)`
      }
      ratingEl.appendChild(scoreEl)

      wrapper.appendChild(ratingEl)
    }
  }

  // Category / cuisine
  const category = store.any(subject, SCHEMA('recipeCategory'), null, null)?.value
  const cuisine = store.any(subject, SCHEMA('recipeCuisine'), null, null)?.value
  if (category || cuisine) {
    const tagsEl = document.createElement('div')
    tagsEl.className = 'recipe-tags'
    if (category) {
      const tag = document.createElement('span')
      tag.className = 'recipe-tag'
      tag.textContent = category
      tagsEl.appendChild(tag)
    }
    if (cuisine) {
      const tag = document.createElement('span')
      tag.className = 'recipe-tag'
      tag.textContent = cuisine
      tagsEl.appendChild(tag)
    }
    wrapper.appendChild(tagsEl)
  }

  // Ingredients
  const ingredients = store.each(subject, SCHEMA('recipeIngredient'), null, null)
  if (ingredients.length > 0) {
    const section = document.createElement('div')
    section.className = 'recipe-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Ingredients'
    section.appendChild(heading)

    const list = document.createElement('ul')
    list.className = 'recipe-ingredients'
    for (const ing of ingredients) {
      const li = document.createElement('li')
      li.textContent = ing.value
      list.appendChild(li)
    }
    section.appendChild(list)
    wrapper.appendChild(section)
  }

  // Instructions
  const instructions = store.each(subject, SCHEMA('recipeInstructions'), null, null)
  if (instructions.length > 0) {
    const section = document.createElement('div')
    section.className = 'recipe-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Instructions'
    section.appendChild(heading)

    const ol = document.createElement('ol')
    ol.className = 'recipe-instructions'
    for (const step of instructions) {
      // Each step might be a HowToStep node or a literal string
      const stepText = store.any(step as NamedNode, SCHEMA('text'), null, null)?.value ?? step.value
      if (stepText && !stepText.startsWith('http')) {
        const li = document.createElement('li')
        li.textContent = stepText
        ol.appendChild(li)
      }
    }
    section.appendChild(ol)
    wrapper.appendChild(section)
  }

  // Nutrition
  const nutritionNode = store.any(subject, SCHEMA('nutrition'), null, null)
  if (nutritionNode) {
    const nutritionProps = [
      ['calories', 'Calories'],
      ['fatContent', 'Fat'],
      ['carbohydrateContent', 'Carbs'],
      ['proteinContent', 'Protein'],
      ['fiberContent', 'Fiber'],
      ['sugarContent', 'Sugar'],
      ['sodiumContent', 'Sodium'],
    ]

    const items: { label: string; value: string }[] = []
    for (const [prop, label] of nutritionProps) {
      const val = store.any(nutritionNode as NamedNode, SCHEMA(prop), null, null)?.value
      if (val) items.push({ label, value: val })
    }

    if (items.length > 0) {
      const section = document.createElement('div')
      section.className = 'recipe-section'

      const heading = document.createElement('h3')
      heading.textContent = 'Nutrition'
      section.appendChild(heading)

      const grid = document.createElement('div')
      grid.className = 'recipe-nutrition'
      for (const item of items) {
        const cell = document.createElement('div')
        cell.className = 'recipe-nutrition-item'
        cell.innerHTML = `<span class="recipe-nutrition-value">${item.value}</span><span class="recipe-nutrition-label">${item.label}</span>`
        grid.appendChild(cell)
      }
      section.appendChild(grid)
      wrapper.appendChild(section)
    }
  }

  // Author
  const authorNode = store.any(subject, SCHEMA('author'), null, null)
  if (authorNode) {
    const authorName =
      store.any(authorNode as NamedNode, SCHEMA('name'), null, null)?.value ??
      authorNode.value
    if (authorName && !authorName.startsWith('http')) {
      const authorEl = document.createElement('p')
      authorEl.className = 'recipe-author'
      authorEl.textContent = `Recipe by ${authorName}`
      wrapper.appendChild(authorEl)
    }
  }

  container.appendChild(wrapper)
}
