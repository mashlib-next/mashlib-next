export default {
  label: 'Recipe',
  icon: '🍳',
  canHandle(subject, store) {
    return store.match(subject, null, null, null)
      .some(s => s.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
              && s.object.value === 'https://schema.org/Recipe')
  },
  render(subject, store, container) {
    const stmts = store.match(subject, null, null, null)
    const get = (pred) => stmts.find(s => s.predicate.value.endsWith(pred))?.object?.value
    const getAll = (pred) => stmts.filter(s => s.predicate.value.endsWith(pred)).map(s => s.object.value)

    const name = get('name') || 'Recipe'
    const description = get('description') || ''
    const image = get('image')
    const prepTime = formatDuration(get('prepTime'))
    const cookTime = formatDuration(get('cookTime'))
    const totalTime = formatDuration(get('totalTime'))
    const yield_ = get('recipeYield') || ''
    const category = get('recipeCategory') || ''
    const cuisine = get('recipeCuisine') || ''
    const ingredients = getAll('recipeIngredient')
    const instructions = getAll('recipeInstructions')

    // Author may be a blank node
    const authorNode = stmts.find(s => s.predicate.value.endsWith('author'))?.object
    const authorName = authorNode
      ? store.match(authorNode, null, null, null).find(s => s.predicate.value.endsWith('name'))?.object?.value
        || authorNode.value
      : ''

    const meta = [
      prepTime && `<span>🕐 Prep: <strong>${prepTime}</strong></span>`,
      cookTime && `<span>🔥 Cook: <strong>${cookTime}</strong></span>`,
      totalTime && `<span>⏱ Total: <strong>${totalTime}</strong></span>`,
      yield_ && `<span>🍽 Yield: <strong>${yield_}</strong></span>`,
    ].filter(Boolean).join('<span style="opacity:.3"> · </span>')

    const tags = [
      category && `<span class="rp-tag">${category}</span>`,
      cuisine && `<span class="rp-tag">${cuisine}</span>`,
    ].filter(Boolean).join(' ')

    const ingredientList = ingredients.map(i =>
      `<li><label><input type="checkbox"> ${esc(i)}</label></li>`
    ).join('')

    const stepList = instructions.length > 1
      ? '<ol class="rp-steps">' + instructions.map(s => `<li>${esc(s)}</li>`).join('') + '</ol>'
      : `<p>${esc(instructions[0] || '')}</p>`

    container.innerHTML = `
      <style>
        .rp { max-width:640px; margin:0 auto; font-family:system-ui,sans-serif; color:#1a1a1a }
        .rp img { width:100%; max-height:320px; object-fit:cover; border-radius:12px }
        .rp h1 { margin:.6em 0 .2em; font-size:1.8em }
        .rp .rp-desc { color:#555; font-size:1.05em; margin:0 0 .8em }
        .rp .rp-author { color:#888; font-size:.9em; margin-bottom:.8em }
        .rp .rp-meta { display:flex; flex-wrap:wrap; gap:.5em; font-size:.9em; color:#444; margin-bottom:.6em }
        .rp .rp-tag { display:inline-block; background:#f0e6d3; color:#8b6914; padding:2px 10px; border-radius:99px; font-size:.8em; font-weight:500 }
        .rp h2 { font-size:1.15em; margin:1.4em 0 .4em; border-bottom:2px solid #eee; padding-bottom:.2em }
        .rp ul { list-style:none; padding:0 }
        .rp ul li { padding:6px 0; border-bottom:1px solid #f0f0f0 }
        .rp ul label { cursor:pointer }
        .rp ul input[type=checkbox] { margin-right:8px; accent-color:#e07a2f }
        .rp .rp-steps { padding-left:1.4em }
        .rp .rp-steps li { padding:6px 0; line-height:1.5 }
        .rp .rp-steps li::marker { color:#e07a2f; font-weight:700 }
      </style>
      <div class="rp">
        ${image ? `<img src="${esc(image)}" alt="${esc(name)}">` : ''}
        <h1>${esc(name)}</h1>
        ${authorName ? `<p class="rp-author">by ${esc(authorName)}</p>` : ''}
        ${description ? `<p class="rp-desc">${esc(description)}</p>` : ''}
        ${meta ? `<div class="rp-meta">${meta}</div>` : ''}
        ${tags ? `<div style="margin-bottom:.8em">${tags}</div>` : ''}
        <h2>Ingredients</h2>
        <ul>${ingredientList}</ul>
        <h2>Instructions</h2>
        ${stepList}
      </div>
    `
  }
}

function formatDuration(iso) {
  if (!iso) return ''
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i)
  if (!m) return iso // not ISO, return as-is
  const parts = []
  if (m[1]) parts.push(m[1] + ' hr')
  if (m[2]) parts.push(m[2] + ' min')
  if (m[3]) parts.push(m[3] + ' sec')
  return parts.join(' ') || iso
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
