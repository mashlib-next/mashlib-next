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

        // Demo solid-ui widgets
        try {
          const btnSection = document.createElement('div')
          btnSection.style.cssText = 'display:flex;gap:0.5em;flex-wrap:wrap;margin-bottom:1em;'

          if (UI.widgets && typeof UI.widgets.button === 'function') {
            // Primary button
            const btn1 = UI.widgets.button(
              document,
              null,
              'Hello from solid-ui',
              () => alert('solid-ui button clicked!')
            )
            btnSection.appendChild(btn1)

            // Cancel button
            if (typeof UI.widgets.cancelButton === 'function') {
              const btn2 = UI.widgets.cancelButton(
                document,
                () => alert('Cancel clicked!')
              )
              btnSection.appendChild(btn2)
            }

            // Continue button
            if (typeof UI.widgets.continueButton === 'function') {
              const btn3 = UI.widgets.continueButton(
                document,
                () => alert('Continue clicked!')
              )
              btnSection.appendChild(btn3)
            }

            wrapper.appendChild(btnSection)
          } else {
            // Fallback: list available widget functions
            const avail = document.createElement('p')
            avail.style.cssText = 'color:#888;font-size:0.85em;'
            const widgetKeys = UI.widgets
              ? Object.keys(UI.widgets).filter(k => typeof UI.widgets[k] === 'function').sort().join(', ')
              : 'no widgets namespace found'
            avail.textContent = `Widget functions: ${widgetKeys}`
            wrapper.appendChild(avail)
          }
        } catch (e) {
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
