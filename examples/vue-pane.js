/**
 * Vue compatibility pane — PoC
 *
 * Lazy-loads Vue 3 from CDN and renders a component
 * that reads RDF triples from the store. Zero changes to core.
 */

let Vue = null
let loaded = false
let loadError = null

async function ensureLoaded() {
  if (loaded) return
  if (loadError) throw loadError
  try {
    Vue = await import('https://esm.sh/vue@3/dist/vue.esm-browser.js')
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

export default {
  label: 'Vue',
  icon: '💚',

  canHandle(subject) {
    return subject.termType === 'NamedNode'
  },

  render(subject, store, container) {
    container.innerHTML = ''

    const status = document.createElement('div')
    status.style.cssText = 'padding:1.5em;color:#666;font-style:italic;'
    status.textContent = 'Loading Vue 3...'
    container.appendChild(status)

    ensureLoaded()
      .then(() => {
        status.remove()

        const mountEl = document.createElement('div')
        container.appendChild(mountEl)

        const triples = triplesFor(subject, store)
        const name =
          triples.find((t) => t.predicate.includes('name'))?.object ??
          subject.value
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

        const app = Vue.createApp({
          setup() {
            const count = Vue.ref(0)
            const expanded = Vue.ref(false)
            const shown = Vue.computed(() =>
              expanded.value ? triples : triples.slice(0, 5)
            )

            return {
              subject: subject.value,
              name,
              image,
              desc,
              triples,
              shown,
              count,
              expanded,
              shorten,
            }
          },

          template: `
            <div style="font-family:system-ui,sans-serif;padding:1em;">
              <div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
                <img
                  v-if="image"
                  :src="image"
                  :alt="name"
                  style="width:64px;height:64px;border-radius:50%;object-fit:cover;"
                />
                <div>
                  <h3 style="margin:0;color:#42b883;">{{ name }}</h3>
                  <p v-if="desc" style="margin:0.2em 0 0;color:#666;font-size:0.85em;">{{ desc }}</p>
                  <code style="font-size:0.7em;color:#999;">{{ subject }}</code>
                </div>
              </div>

              <div style="display:flex;align-items:center;gap:0.5em;padding:0.5em 0;">
                <button @click="count--" style="width:32px;height:32px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:1em;">−</button>
                <span style="min-width:2em;text-align:center;">{{ count }}</span>
                <button @click="count++" style="width:32px;height:32px;border:1px solid #d1d5db;border-radius:6px;background:#fff;cursor:pointer;font-size:1em;">+</button>
                <span style="color:#888;font-size:0.8em;margin-left:0.5em;">← Vue ref() works</span>
              </div>

              <table style="width:100%;border-collapse:collapse;font-size:0.85em;margin-top:1em;">
                <thead>
                  <tr>
                    <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding:0.4em 0.6em;color:#666;">Predicate</th>
                    <th style="text-align:left;border-bottom:2px solid #e5e7eb;padding:0.4em 0.6em;color:#666;">Object</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(t, i) in shown" :key="i">
                    <td style="border-bottom:1px solid #f0f0f0;padding:0.4em 0.6em;">
                      <code style="font-size:0.85em;">{{ shorten(t.predicate) }}</code>
                    </td>
                    <td style="border-bottom:1px solid #f0f0f0;padding:0.4em 0.6em;">
                      <a v-if="t.type === 'NamedNode'" :href="t.object" target="_blank" rel="noopener">{{ shorten(t.object) }}</a>
                      <span v-else>{{ t.object }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                v-if="triples.length > 5"
                @click="expanded = !expanded"
                style="margin-top:0.5em;background:none;border:1px solid #d1d5db;border-radius:6px;padding:0.3em 0.8em;cursor:pointer;color:#42b883;font-size:0.8em;"
              >
                {{ expanded ? 'Show less' : 'Show all ' + triples.length + ' triples' }}
              </button>
            </div>
          `,
        })

        app.mount(mountEl)
      })
      .catch((e) => {
        status.textContent = `Failed to load Vue: ${e.message}`
        status.style.color = '#dc2626'
        status.style.fontStyle = 'normal'
      })
  },
}
