/**
 * Preact compatibility pane — PoC
 *
 * Lazy-loads Preact + HTM from CDN for JSX-like templates without a build step.
 * Renders a component that reads RDF triples from the store. Zero changes to core.
 */

let h = null
let render = null
let useState = null
let htm = null
let html = null
let loaded = false
let loadError = null

async function ensureLoaded() {
  if (loaded) return
  if (loadError) throw loadError
  try {
    const [preactMod, hooksMod, htmMod] = await Promise.all([
      import('https://esm.sh/preact@10'),
      import('https://esm.sh/preact@10/hooks'),
      import('https://esm.sh/htm@3'),
    ])
    h = preactMod.h
    render = preactMod.render
    useState = hooksMod.useState
    htm = htmMod.default
    html = htm.bind(h)
    loaded = true
  } catch (e) {
    loadError = e
    throw e
  }
}

function triplesFor(subject, store) {
  return store
    .statementsMatching(subject, undefined, undefined)
    .map((st) => ({
      predicate: st.predicate.value,
      object: st.object.value,
      type: st.object.termType,
    }))
}

function shorten(uri) {
  const i = Math.max(uri.lastIndexOf('#'), uri.lastIndexOf('/'))
  return i > 0 ? uri.slice(i + 1) : uri
}

function ResourceCard({ subject, triples }) {
  const [expanded, setExpanded] = useState(false)

  const name =
    triples.find((t) => t.predicate.includes('name'))?.object ?? subject

  const image = triples.find(
    (t) =>
      t.predicate.includes('img') ||
      t.predicate.includes('image') ||
      t.predicate.includes('photo')
  )?.object

  const desc = triples.find(
    (t) =>
      t.predicate.includes('description') ||
      t.predicate.includes('jobTitle') ||
      t.predicate.includes('abstract')
  )?.object

  const shown = expanded ? triples : triples.slice(0, 5)

  return html`
    <div style="font-family:system-ui,sans-serif;padding:1em;">
      <div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
        ${image && html`
          <img
            src=${image}
            alt=${name}
            style="width:64px;height:64px;border-radius:50%;object-fit:cover;"
          />
        `}
        <div>
          <h3 style="margin:0;color:#673ab7;">${name}</h3>
          ${desc && html`<p style="margin:0.2em 0 0;color:#666;font-size:0.85em;">${desc}</p>`}
          <code style="font-size:0.7em;color:#999;">${subject}</code>
        </div>
      </div>

      <${Counter} />

      <table style="width:100%;border-collapse:collapse;font-size:0.85em;margin-top:1em;">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding:0.4em 0.6em;color:#666;">Predicate</th>
            <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding:0.4em 0.6em;color:#666;">Object</th>
          </tr>
        </thead>
        <tbody>
          ${shown.map(
            (t, i) => html`
              <tr key=${i}>
                <td style="border-bottom:1px solid #f0f0f0;padding:0.4em 0.6em;">
                  <code style="font-size:0.85em;">${shorten(t.predicate)}</code>
                </td>
                <td style="border-bottom:1px solid #f0f0f0;padding:0.4em 0.6em;">
                  ${t.type === 'NamedNode'
                    ? html`<a href=${t.object} target="_blank" rel="noopener">${shorten(t.object)}</a>`
                    : t.object}
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>

      ${triples.length > 5 && html`
        <button
          onClick=${() => setExpanded(!expanded)}
          style="margin-top:0.5em;background:none;border:1px solid #d1d5db;border-radius:6px;padding:0.3em 0.8em;cursor:pointer;color:#673ab7;font-size:0.8em;"
        >
          ${expanded ? 'Show less' : `Show all ${triples.length} triples`}
        </button>
      `}
    </div>
  `
}

function Counter() {
  const [count, setCount] = useState(0)

  return html`
    <div style="display:flex;align-items:center;gap:0.5em;padding:0.5em 0;">
      <button onClick=${() => setCount((c) => c - 1)} style=${btnStyle}>−</button>
      <span style="min-width:2em;text-align:center;">${count}</span>
      <button onClick=${() => setCount((c) => c + 1)} style=${btnStyle}>+</button>
      <span style="color:#888;font-size:0.8em;margin-left:0.5em;">← Preact useState works</span>
    </div>
  `
}

const btnStyle =
  'width:32px;height:32px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:1em;'

export default {
  label: 'Preact',
  icon: '⚡',

  canHandle(subject) {
    return subject.termType === 'NamedNode'
  },

  render(subject, store, container) {
    container.innerHTML = ''

    const status = document.createElement('div')
    status.style.cssText = 'padding:1.5em;color:#666;font-style:italic;'
    status.textContent = 'Loading Preact + HTM...'
    container.appendChild(status)

    ensureLoaded()
      .then(() => {
        status.remove()
        const triples = triplesFor(subject, store)
        render(
          html`<${ResourceCard} subject=${subject.value} triples=${triples} />`,
          container
        )
      })
      .catch((e) => {
        status.textContent = `Failed to load Preact: ${e.message}`
        status.style.color = '#dc2626'
        status.style.fontStyle = 'normal'
      })
  },
}
