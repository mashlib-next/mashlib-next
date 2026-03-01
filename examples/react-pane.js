/**
 * React compatibility pane — PoC
 *
 * Lazy-loads React + ReactDOM from CDN and renders a component
 * that reads RDF triples from the store. Zero changes to core.
 */

let React = null
let ReactDOM = null
let loaded = false
let loadError = null

async function ensureLoaded() {
  if (loaded) return
  if (loadError) throw loadError
  try {
    const [reactMod, domMod] = await Promise.all([
      import('https://esm.sh/react@19'),
      import('https://esm.sh/react-dom@19/client'),
    ])
    React = reactMod
    ReactDOM = domMod
    loaded = true
  } catch (e) {
    loadError = e
    throw e
  }
}

/**
 * Pull all (predicate, object) pairs for a subject from the rdflib store.
 */
function triplesFor(subject, store) {
  return store
    .statementsMatching(subject, undefined, undefined)
    .map((st) => ({
      predicate: st.predicate.value,
      object: st.object.value,
      type: st.object.termType,
    }))
}

/**
 * A small React component that renders a resource card.
 */
function ResourceCard({ subject, triples }) {
  const h = React.createElement

  const name =
    triples.find((t) => t.predicate.includes('name'))?.object ?? subject

  const image = triples.find(
    (t) =>
      t.predicate.includes('img') ||
      t.predicate.includes('image') ||
      t.predicate.includes('photo')
  )?.object

  return h(
    'div',
    { style: { fontFamily: 'system-ui, sans-serif' } },

    // Header
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          marginBottom: '1em',
        },
      },
      image &&
        h('img', {
          src: image,
          alt: name,
          style: {
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
          },
        }),
      h(
        'div',
        null,
        h(
          'h3',
          { style: { margin: 0, color: '#2563eb' } },
          name
        ),
        h(
          'code',
          { style: { fontSize: '0.75em', color: '#888' } },
          subject
        )
      )
    ),

    // Counter — proves React state works
    h(Counter, null),

    // Property table
    h(
      'table',
      {
        style: {
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85em',
          marginTop: '1em',
        },
      },
      h(
        'thead',
        null,
        h(
          'tr',
          null,
          h('th', { style: thStyle }, 'Predicate'),
          h('th', { style: thStyle }, 'Object')
        )
      ),
      h(
        'tbody',
        null,
        triples.map((t, i) =>
          h(
            'tr',
            { key: i },
            h(
              'td',
              { style: tdStyle },
              h(
                'code',
                { style: { fontSize: '0.85em' } },
                shorten(t.predicate)
              )
            ),
            h(
              'td',
              { style: tdStyle },
              t.type === 'NamedNode'
                ? h('a', { href: t.object, target: '_blank', rel: 'noopener' }, shorten(t.object))
                : t.object
            )
          )
        )
      )
    )
  )
}

const thStyle = {
  textAlign: 'left',
  borderBottom: '2px solid #e5e7eb',
  padding: '0.4em 0.6em',
  color: '#666',
}

const tdStyle = {
  borderBottom: '1px solid #f0f0f0',
  padding: '0.4em 0.6em',
}

/**
 * Tiny counter component — proves React state/hooks work inside the pane.
 */
function Counter() {
  const h = React.createElement
  const [count, setCount] = React.useState(0)

  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5em',
        padding: '0.5em 0',
      },
    },
    h(
      'button',
      {
        onClick: () => setCount((c) => c - 1),
        style: btnStyle,
      },
      '−'
    ),
    h('span', { style: { minWidth: '2em', textAlign: 'center' } }, count),
    h(
      'button',
      {
        onClick: () => setCount((c) => c + 1),
        style: btnStyle,
      },
      '+'
    ),
    h(
      'span',
      { style: { color: '#888', fontSize: '0.8em', marginLeft: '0.5em' } },
      '← React useState works'
    )
  )
}

const btnStyle = {
  width: 32,
  height: 32,
  border: '1px solid #d1d5db',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
  fontSize: '1em',
}

function shorten(uri) {
  const i = Math.max(uri.lastIndexOf('#'), uri.lastIndexOf('/'))
  return i > 0 ? uri.slice(i + 1) : uri
}

export default {
  label: 'React',
  icon: '⚛️',

  canHandle(subject, store) {
    return subject.termType === 'NamedNode'
  },

  render(subject, store, container) {
    container.innerHTML = ''

    const status = document.createElement('div')
    status.style.cssText = 'padding:1.5em;color:#666;font-style:italic;'
    status.textContent = 'Loading React 19...'
    container.appendChild(status)

    ensureLoaded()
      .then(() => {
        status.remove()

        const root = ReactDOM.createRoot(container)
        const triples = triplesFor(subject, store)

        root.render(
          React.createElement(ResourceCard, {
            subject: subject.value,
            triples,
          })
        )
      })
      .catch((e) => {
        status.textContent = `Failed to load React: ${e.message}`
        status.style.color = '#dc2626'
        status.style.fontStyle = 'normal'
      })
  },
}
