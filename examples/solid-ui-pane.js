/**
 * solid-ui compatibility pane — PoC
 *
 * Lazy-loads solid-ui from CDN and delegates rendering to its widget system.
 * This is a proof-of-concept showing that solid-ui can run as a data-pane
 * inside mashlib-next with zero changes to the core architecture.
 */

let UI = null
let loaded = false
let loadError = null

async function ensureLoaded() {
  if (loaded) return
  if (loadError) throw loadError
  try {
    // Load rdflib first (solid-ui expects it)
    if (!window.$rdf) {
      const rdflib = await import('https://esm.sh/rdflib@2.3.5')
      window.$rdf = rdflib
    }
    // Load solid-ui
    const mod = await import('https://esm.sh/solid-ui@3.0.4?bundle-deps')
    UI = mod.default || mod
    loaded = true
  } catch (e) {
    loadError = e
    throw e
  }
}

// Build a minimal DataBrowserContext from our store
function buildContext(store) {
  return {
    dom: document,
    getOutliner: () => ({
      GotoSubject: () => {},
      showSource: () => {},
    }),
    session: {
      store,
      paneRegistry: {
        list: [],
        byName: () => null,
        register: () => {},
        paneForIcon: () => null,
        paneForPredicate: () => null,
      },
      logic: {
        store,
        me: () => null,
        findAppInstances: async () => [],
      },
    },
  }
}

export default {
  label: 'SolidOS',
  icon: '🔷',

  canHandle(subject, store) {
    // Fallback pane — offer to render anything, but show last
    return true
  },

  render(subject, store, container) {
    container.innerHTML = ''

    const status = document.createElement('div')
    status.className = 'solidui-status'
    status.textContent = 'Loading solid-ui...'
    status.style.cssText = 'padding:1.5em;color:#666;font-style:italic;'
    container.appendChild(status)

    ensureLoaded()
      .then(() => {
        status.remove()

        const context = buildContext(store)

        // Try using solid-ui widgets to render a basic property table
        const wrapper = document.createElement('div')
        wrapper.className = 'solidui-wrapper'
        wrapper.style.cssText = 'padding:1em;'

        const heading = document.createElement('h3')
        heading.textContent = 'solid-ui view'
        heading.style.cssText = 'margin:0 0 0.5em;color:#7C4DFF;font-size:1.1em;'
        wrapper.appendChild(heading)

        const info = document.createElement('p')
        info.style.cssText = 'font-size:0.85em;color:#888;margin:0 0 1em;'
        info.textContent = `Loaded solid-ui ${UI.versionInfo || ''} — rendering ${subject.value}`
        wrapper.appendChild(info)

        // Use solid-ui's widgets if available
        try {
          if (UI.widgets && UI.widgets.propertyTrig) {
            // Try the property table widget
            const table = UI.widgets.propertyTrig(
              document,
              store,
              subject,
              [],
              false
            )
            if (table) wrapper.appendChild(table)
          }
        } catch (e) {
          // Fallback: just show what we loaded
          const err = document.createElement('p')
          err.style.cssText = 'color:#e07a2f;font-size:0.85em;'
          err.textContent = `Widget render skipped: ${e.message}`
          wrapper.appendChild(err)
        }

        // Show what solid-ui exports
        const exports = document.createElement('details')
        exports.style.cssText = 'margin-top:1em;font-size:0.85em;'
        const summary = document.createElement('summary')
        summary.textContent = 'solid-ui exports'
        summary.style.cssText = 'cursor:pointer;color:#7C4DFF;font-weight:600;'
        exports.appendChild(summary)
        const list = document.createElement('pre')
        list.style.cssText = 'background:#f6f8fa;padding:0.75em;border-radius:6px;overflow-x:auto;font-size:0.8em;'
        list.textContent = Object.keys(UI).sort().join(', ')
        exports.appendChild(list)
        wrapper.appendChild(exports)

        container.appendChild(wrapper)
      })
      .catch((e) => {
        status.textContent = `Failed to load solid-ui: ${e.message}`
        status.style.color = '#dc2626'
        status.style.fontStyle = 'normal'
      })
  },
}
