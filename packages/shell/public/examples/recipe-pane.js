export default {
  label: 'Recipe',
  icon: '🍝',
  canHandle(subject, store) {
    return store.match(subject, null, null, null)
      .some(s => s.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
              && s.object.value === 'https://schema.org/Recipe')
  },
  render(subject, store, container) {
    const stmts = store.match(subject, null, null, null)
    const get = (pred) => stmts.find(s => s.predicate.value.endsWith(pred))?.object?.value

    container.innerHTML = `
      <div style="max-width:600px;margin:2em auto;font-family:system-ui">
        <h1>${get('name') || 'Recipe'}</h1>
        <p style="color:#666">${get('description') || ''}</p>
        <p><strong>Prep:</strong> ${get('prepTime') || '?'} · <strong>Cook:</strong> ${get('cookTime') || '?'}</p>
        <h3>Ingredients</h3>
        <ul>${stmts.filter(s => s.predicate.value.endsWith('recipeIngredient')).map(s => '<li>' + s.object.value + '</li>').join('')}</ul>
        <h3>Instructions</h3>
        <p>${get('recipeInstructions') || ''}</p>
      </div>
    `
  }
}
